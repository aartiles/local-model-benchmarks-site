// src/audio.js — fully synthesized Web Audio (DECISIONS D05).
// No external assets. The AudioContext is created only after the START
// gesture so browser autoplay policy is respected.

export class Audio {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.windGain = null;
    this.pianoTimer = 0;
    this.enabled = false;
  }

  /** Call from a user gesture (START button). Safe to call twice. */
  unlock() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return; // game remains fully playable without audio
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.5;
    this.master.connect(this.ctx.destination);
    this._startWind();
    this.enabled = true;
  }

  _noiseBuffer(seconds) {
    const len = Math.floor(this.ctx.sampleRate * seconds);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  _startWind() {
    // Looped, heavily filtered noise = desert wind bed.
    const src = this.ctx.createBufferSource();
    src.buffer = this._noiseBuffer(2.5);
    src.loop = true;
    const filt = this.ctx.createBiquadFilter();
    filt.type = 'lowpass';
    filt.frequency.value = 320;
    this.windGain = this.ctx.createGain();
    this.windGain.gain.value = 0.05;
    src.connect(filt).connect(this.windGain).connect(this.master);
    src.start();
  }

  _env(gainNode, t0, peak, decay) {
    gainNode.gain.setValueAtTime(0.0001, t0);
    gainNode.gain.exponentialRampToValueAtTime(peak, t0 + 0.012);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, t0 + decay);
  }

  _tone({ type = 'sine', freq, freqEnd, t0 = 0, dur = 0.2, peak = 0.3, filter = null }) {
    if (!this.enabled) return;
    const t = this.ctx.currentTime + t0;
    const o = this.ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (freqEnd) o.frequency.exponentialRampToValueAtTime(freqEnd, t + dur);
    const g = this.ctx.createGain();
    this._env(g, t, peak, dur);
    let node = o;
    if (filter) { node.connect(filter); node = filter; }
    node.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  _burst({ t0 = 0, dur = 0.2, peak = 0.4, freq = 900, q = 1 }) {
    if (!this.enabled) return;
    const t = this.ctx.currentTime + t0;
    const src = this.ctx.createBufferSource();
    src.buffer = this._noiseBuffer(Math.max(dur, 0.05));
    const f = this.ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.setValueAtTime(freq, t);
    f.frequency.exponentialRampToValueAtTime(Math.max(80, freq * 0.15), t + dur);
    f.Q.value = q;
    const g = this.ctx.createGain();
    this._env(g, t, peak, dur);
    src.connect(f).connect(g).connect(this.master);
    src.start(t);
    src.stop(t + dur + 0.05);
  }

  // --- game cues -------------------------------------------------------------

  shot() {
    this._burst({ dur: 0.22, peak: 0.55, freq: 1400 });
    this._tone({ type: 'sine', freq: 130, freqEnd: 50, dur: 0.18, peak: 0.5 });
  }

  dryFire() {
    this._burst({ dur: 0.03, peak: 0.25, freq: 5000, q: 3 });
  }

  duelStart() {
    this._tone({ type: 'triangle', freq: 392, dur: 0.16, peak: 0.25 });
    this._tone({ type: 'triangle', freq: 330, t0: 0.18, dur: 0.22, peak: 0.25 });
  }

  draw() {
    this._tone({ type: 'square', freq: 660, dur: 0.09, peak: 0.22 });
    this._tone({ type: 'square', freq: 990, t0: 0.1, dur: 0.28, peak: 0.26 });
  }

  hit() {
    this._tone({ type: 'sine', freq: 160, freqEnd: 60, dur: 0.25, peak: 0.5 });
    this._burst({ dur: 0.12, peak: 0.3, freq: 500 });
  }

  miss() {
    this._burst({ dur: 0.1, peak: 0.18, freq: 400 });
  }

  reward() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((f, i) => this._tone({ type: 'triangle', freq: f, t0: i * 0.09, dur: 0.16, peak: 0.22 }));
  }

  defeat() {
    this._tone({ type: 'triangle', freq: 330, freqEnd: 196, dur: 0.5, peak: 0.28 });
  }

  victory() {
    const notes = [392, 523, 659, 784, 1047, 1319];
    notes.forEach((f, i) => this._tone({ type: 'triangle', freq: f, t0: i * 0.13, dur: 0.3, peak: 0.24 }));
  }

  coin() {
    this._tone({ type: 'square', freq: 988, dur: 0.07, peak: 0.15 });
    this._tone({ type: 'square', freq: 1319, t0: 0.07, dur: 0.12, peak: 0.15 });
  }

  /**
   * Ambient update: wind swells, and a sparse "piano" plays when the player
   * is near the saloon. Call every frame with the player position.
   */
  update(dt, playerPos) {
    if (!this.enabled) return;
    const t = this.ctx.currentTime;
    // Slow wind swell.
    if (this.windGain) {
      this.windGain.gain.setTargetAtTime(0.04 + 0.025 * Math.sin(t * 0.13), t, 1.5);
    }
    // Saloon piano: sparse random notes within 26 m of the saloon.
    const saloon = { x: -20, z: -12.5 };
    const d = Math.hypot(playerPos.x - saloon.x, playerPos.z - saloon.z);
    if (d < 26) {
      this.pianoTimer -= dt;
      if (this.pianoTimer <= 0) {
        this.pianoTimer = 1.2 + Math.random() * 2.4;
        const scale = [262, 294, 330, 392, 440, 523];
        const f = scale[(Math.random() * scale.length) | 0];
        this._tone({ type: 'triangle', freq: f, dur: 0.5, peak: 0.07 });
        if (Math.random() < 0.5) this._tone({ type: 'triangle', freq: f * 1.5, t0: 0.12, dur: 0.4, peak: 0.05 });
      }
    } else {
      this.pianoTimer = Math.min(this.pianoTimer, 0.4);
    }
  }
}
