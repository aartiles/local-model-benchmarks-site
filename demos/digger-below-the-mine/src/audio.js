// src/audio.js — synthesized Web Audio SFX and the ambient bed (R32, R35).
//
// R35 is the rule that shapes this whole file: nothing here may touch Web Audio
// until the person playing has actually interacted. So the AudioContext is
// built inside `unlock()`, which is only ever called from a gesture handler
// armed by `arm()`, and `play()` before that moment is a recorded no-op. There
// is no `new AudioContext()` at module load and none in the constructor.
//
// R32 is the mute flag, and it is NOT owned here: `Game.muted` (T011) is the
// single source of truth, the `mute` key edge is consumed there, and the HUD
// indicator (T014) reads that same flag. `setMuted()` follows it — it only
// silences the master gain. Silence while muted is valid (R35).
//
// Every sound is synthesized from oscillators and one deterministic noise
// buffer (src/rng.js, never Math.random), so the game ships no audio files and
// a headless browser with no audio device can still prove the graph is built
// and torn down without a console error.

import { mulberry32 } from './rng.js';

// The events that ask for a sound. The names interaction.js plays (pickup,
// pump, crystal, lift) are here, plus the miner's own and the state changes.
export const VOICES = {
  dig: { type: 'square', from: 190, to: 80, dur: 0.09, gain: 0.16, noise: 0.35 },
  pickup: { type: 'triangle', from: 520, to: 880, dur: 0.16, gain: 0.2 },
  battery: { type: 'sine', from: 640, to: 990, dur: 0.2, gain: 0.18 },
  hurt: { type: 'sawtooth', from: 240, to: 70, dur: 0.24, gain: 0.22, noise: 0.2 },
  pump: { type: 'sine', from: 110, to: 300, dur: 0.5, gain: 0.18, noise: 0.5 },
  crystal: { type: 'sine', from: 880, to: 1320, dur: 0.4, gain: 0.2 },
  lift: { type: 'triangle', from: 330, to: 660, dur: 0.5, gain: 0.22 },
  ui: { type: 'square', from: 440, to: 440, dur: 0.06, gain: 0.1 },
  start: { type: 'triangle', from: 330, to: 660, dur: 0.25, gain: 0.18 },
  victory: { type: 'sine', from: 523, to: 1046, dur: 0.8, gain: 0.22 },
  defeat: { type: 'sawtooth', from: 220, to: 55, dur: 0.9, gain: 0.22 },
};

export const DEFAULT_VOICE = 'ui';
export const MASTER_LEVEL = 0.9;
export const AMBIENT_LEVEL = 0.05;

// The events that count as "the user has interacted" (R35). Capture phase, so
// a sound is unlocked even by a key the game itself does not map.
export const GESTURES = ['keydown', 'pointerdown', 'mousedown', 'touchstart'];

export class AudioSystem {
  constructor(options = {}) {
    this.win = options.window ?? (typeof window !== 'undefined' ? window : null);
    this.doc = options.doc ?? (typeof document !== 'undefined' ? document : null);
    this.level = MASTER_LEVEL;
    // The mirror of Game.muted. Never read as truth by anything but the gain.
    this.muted = false;
    // Both stay null until unlock() runs inside a gesture handler (R35).
    this.ctx = null;
    this.master = null;
    this.ambient = null;
    this.armed = false;
    this.gestures = 0;
    this.played = 0;
    this.blocked = 0;
    this.plays = [];
    this.errors = [];
    this._noise = null;
    this._seen = { digs: 0, pickups: 0, hits: 0 };
    this._bound = [];
  }

  get unlocked() {
    return this.ctx !== null;
  }

  // Listen for the first interaction. Called once from src/main.js; the
  // listeners remove themselves the moment one fires.
  arm(target = this.doc) {
    if (this.armed || !target || typeof target.addEventListener !== 'function') return false;
    this.armed = true;
    const on = (type) => {
      const handler = () => {
        this.gestures += 1;
        this.unlock();
        this.disarm();
      };
      target.addEventListener(type, handler, { capture: true, passive: true });
      this._bound.push([target, type, handler]);
    };
    for (const type of GESTURES) on(type);
    return true;
  }

  disarm() {
    for (const [target, type, handler] of this._bound) target.removeEventListener(type, handler, { capture: true });
    this._bound.length = 0;
    this.armed = false;
    return this;
  }

  // R35: the ONLY place an AudioContext is constructed, and it is only ever
  // reached from a gesture handler.
  unlock() {
    if (this.ctx) return this.ctx;
    const Ctor = this.win && (this.win.AudioContext || this.win.webkitAudioContext);
    if (!Ctor) {
      this.errors.push('no AudioContext constructor');
      return null;
    }
    try {
      const ctx = new Ctor();
      const master = ctx.createGain();
      master.gain.value = this.muted ? 0 : this.level;
      master.connect(ctx.destination);
      this.ctx = ctx;
      this.master = master;
      this.startAmbient();
      // A context created outside a gesture starts suspended; resuming it here
      // is allowed because we are inside one.
      if (ctx.state === 'suspended' && typeof ctx.resume === 'function') {
        ctx.resume().catch(() => {});
      }
    } catch (err) {
      this.errors.push(`unlock: ${(err && err.message) || err}`);
    }
    return this.ctx;
  }

  // One deterministic noise buffer, shared by every noisy voice and the bed.
  noise() {
    if (this._noise) return this._noise;
    const ctx = this.ctx;
    const len = Math.max(1, Math.floor(ctx.sampleRate * 0.5));
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    const rnd = mulberry32(0x5eed);
    for (let i = 0; i < len; i++) data[i] = rnd() * 2 - 1;
    this._noise = buf;
    return buf;
  }

  // The ambient bed: a low drone and a filtered rumble that breathe slowly.
  // Started with the context, so it is never heard before an interaction.
  startAmbient() {
    const ctx = this.ctx;
    const gain = ctx.createGain();
    gain.gain.value = AMBIENT_LEVEL;
    gain.connect(this.master);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 220;
    filter.Q.value = 0.7;
    filter.connect(gain);

    const rumble = ctx.createBufferSource();
    rumble.buffer = this.noise();
    rumble.loop = true;
    rumble.connect(filter);
    rumble.start();

    const drone = ctx.createOscillator();
    drone.type = 'sine';
    drone.frequency.value = 55;
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.5;
    drone.connect(droneGain);
    droneGain.connect(gain);
    drone.start();

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = AMBIENT_LEVEL * 0.6;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    lfo.start();

    this.ambient = { gain, nodes: [rumble, drone, lfo] };
    return this.ambient;
  }

  // Ask for a sound. Before the first gesture this records a blocked request and
  // touches nothing (R35); while muted it is silence, which is valid.
  play(name = DEFAULT_VOICE, options = {}) {
    const key = VOICES[name] ? String(name) : DEFAULT_VOICE;
    if (!this.ctx || !this.master) {
      this.blocked += 1;
      return { name: key, ok: false, reason: 'locked' };
    }
    if (this.muted) {
      this.blocked += 1;
      return { name: key, ok: false, reason: 'muted' };
    }
    const voice = VOICES[key];
    const at = this.ctx.currentTime + Number(options.delay || 0);
    try {
      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0.0001, at);
      env.gain.exponentialRampToValueAtTime(Math.max(0.0002, voice.gain), at + 0.012);
      env.gain.exponentialRampToValueAtTime(0.0001, at + voice.dur);
      env.connect(this.master);

      const osc = this.ctx.createOscillator();
      osc.type = voice.type;
      osc.frequency.setValueAtTime(Math.max(1, voice.from), at);
      osc.frequency.exponentialRampToValueAtTime(Math.max(1, voice.to), at + voice.dur);
      osc.connect(env);
      osc.start(at);
      osc.stop(at + voice.dur + 0.02);

      if (voice.noise) {
        const src = this.ctx.createBufferSource();
        src.buffer = this.noise();
        const ng = this.ctx.createGain();
        ng.gain.setValueAtTime(voice.noise, at);
        ng.gain.exponentialRampToValueAtTime(0.0001, at + voice.dur);
        src.connect(ng);
        ng.connect(this.master);
        src.start(at);
        src.stop(at + voice.dur + 0.02);
      }

      this.played += 1;
      this.plays.push(key);
      if (this.plays.length > 32) this.plays.shift();
      return { name: key, ok: true, at };
    } catch (err) {
      this.errors.push(`${key}: ${(err && err.message) || err}`);
      return { name: key, ok: false, reason: 'error' };
    }
  }

  // R32: silence the master gain. The flag itself belongs to Game, which calls
  // this from Game.setMuted(); nothing here decides whether the game is muted.
  setMuted(on = true) {
    this.muted = on !== false;
    if (this.ctx && this.master) {
      const t = this.ctx.currentTime;
      const g = this.master.gain;
      g.cancelScheduledValues(t);
      // Assign .value as well as scheduling it: the scheduled write is only
      // visible on the next render quantum, and the mute state must be readable
      // the instant it is set (R32).
      g.value = this.muted ? 0 : this.level;
      g.setValueAtTime(g.value, t);
    }
    return this.muted;
  }

  // The miner's own sounds, diffed off the counters the layers already keep, so
  // no gameplay code has to remember to ask for a noise.
  events(game) {
    const p = game && game.player;
    if (!p) return null;
    const seen = this._seen;
    let name = null;
    const digs = p.digs || 0;
    const pickups = p.pickups || 0;
    const hits = p.hits || 0;
    if (digs > seen.digs) name = 'dig';
    if (pickups > seen.pickups) name = 'battery';
    if (hits > seen.hits) name = 'hurt';
    seen.digs = digs;
    seen.pickups = pickups;
    seen.hits = hits;
    if (name) this.play(name);
    return name;
  }

  // Plain data only, so a check can read it through page.evaluate.
  status() {
    return {
      unlocked: this.ctx !== null,
      state: this.ctx ? this.ctx.state : null,
      muted: this.muted,
      level: this.master ? Number(this.master.gain.value) : null,
      ambient: this.ambient !== null,
      armed: this.armed,
      gestures: this.gestures,
      played: this.played,
      blocked: this.blocked,
      plays: this.plays.slice(-8),
      errors: this.errors.slice(-4),
      voices: Object.keys(VOICES),
    };
  }
}
