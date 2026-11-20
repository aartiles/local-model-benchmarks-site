// src/audio.js — all sound is synthesized with WebAudio (no audio assets).
// Engine hum, wind, skid, collision thud, checkpoint chime, UI clicks, medal.
export class GameAudio {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
    this.engine = null;
    this.wind = null;
    this._started = false;
  }

  // must be called from a user gesture
  start() {
    if (this._started) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.9;
      this.master.connect(this.ctx.destination);
      this._started = true;
      this._buildEngine();
      this._buildWind();
    } catch { /* audio unavailable — game stays playable */ }
  }

  setMuted(m) {
    this.muted = m;
    if (this.master) this.master.gain.setTargetAtTime(m ? 0 : 0.9, this.ctx.currentTime, 0.03);
  }

  _noiseBuffer(seconds = 1) {
    const sr = this.ctx.sampleRate;
    const buf = this.ctx.createBuffer(1, sr * seconds, sr);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  _buildEngine() {
    const ctx = this.ctx;
    const osc1 = ctx.createOscillator(); osc1.type = 'sawtooth'; osc1.frequency.value = 70;
    const osc2 = ctx.createOscillator(); osc2.type = 'square'; osc2.frequency.value = 35;
    const sub = ctx.createOscillator(); sub.type = 'sine'; sub.frequency.value = 52;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 420; lp.Q.value = 2;
    const g = ctx.createGain(); g.gain.value = 0;
    const gSub = ctx.createGain(); gSub.gain.value = 0.5;
    osc1.connect(lp); osc2.connect(lp); sub.connect(gSub); gSub.connect(lp);
    lp.connect(g); g.connect(this.master);
    osc1.start(); osc2.start(); sub.start();
    this.engine = { osc1, osc2, sub, lp, g };
  }

  _buildWind() {
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this._noiseBuffer(2); src.loop = true;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 600; bp.Q.value = 0.6;
    const g = ctx.createGain(); g.gain.value = 0;
    src.connect(bp); bp.connect(g); g.connect(this.master);
    src.start();
    this.wind = { src, bp, g };
  }

  // called every frame while driving
  update(speed, throttle, sliding) {
    if (!this._started || !this.engine) return;
    const t = this.ctx.currentTime;
    const v = Math.max(0, speed);
    const f = 55 + v * 5.2;
    this.engine.osc1.frequency.setTargetAtTime(f, t, 0.06);
    this.engine.osc2.frequency.setTargetAtTime(f * 0.5 + 2, t, 0.06);
    this.engine.sub.frequency.setTargetAtTime(40 + v * 3.4, t, 0.08);
    this.engine.lp.frequency.setTargetAtTime(300 + v * 26 + throttle * 500, t, 0.1);
    const load = 0.05 + throttle * 0.10 + Math.min(0.12, v * 0.0016);
    this.engine.g.gain.setTargetAtTime(load, t, 0.09);
    if (this.wind) {
      this.wind.g.gain.setTargetAtTime(Math.min(0.16, (v / 46) * (v / 46) * 0.2), t, 0.15);
      this.wind.bp.frequency.setTargetAtTime(400 + v * 22, t, 0.2);
      if (sliding) this.wind.g.gain.setTargetAtTime(0.2, t, 0.05);
    }
  }

  idle() {
    if (!this._started || !this.engine) return;
    const t = this.ctx.currentTime;
    this.engine.g.gain.setTargetAtTime(0.035, t, 0.2);
    this.engine.osc1.frequency.setTargetAtTime(62, t, 0.2);
    this.engine.osc2.frequency.setTargetAtTime(31, t, 0.2);
    if (this.wind) this.wind.g.gain.setTargetAtTime(0, t, 0.2);
  }

  _burst(dur, freq, type, gain, when = 0) {
    if (!this._started) return;
    const ctx = this.ctx, t = ctx.currentTime + when;
    const src = ctx.createBufferSource(); src.buffer = this._noiseBuffer(dur);
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(f); f.connect(g); g.connect(this.master);
    src.start(t); src.stop(t + dur + 0.02);
  }

  _tone(freq, dur, type = 'sine', gain = 0.2, when = 0, slide = 0) {
    if (!this._started) return;
    const ctx = this.ctx, t = ctx.currentTime + when;
    const o = ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(this.master);
    o.start(t); o.stop(t + dur + 0.02);
  }

  crash() { this._burst(0.28, 160, 'lowpass', 0.5); this._tone(70, 0.3, 'sine', 0.4, 0, -40); }
  chime() { this._tone(660, 0.16, 'sine', 0.22); this._tone(990, 0.24, 'sine', 0.2, 0.09); }
  click() { this._tone(520, 0.06, 'triangle', 0.16); }
  go() { this._tone(880, 0.3, 'triangle', 0.25); }
  penalty() { this._tone(220, 0.25, 'square', 0.14, 0, -80); }
  medal(kind) {
    const seq = kind === 'gold' ? [523, 659, 784, 1047] : kind === 'silver' ? [440, 554, 659] : [330, 392, 494];
    seq.forEach((f, i) => this._tone(f, 0.22, 'triangle', 0.22, i * 0.11));
  }
}
