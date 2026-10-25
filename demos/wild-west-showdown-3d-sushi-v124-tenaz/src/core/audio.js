/**
 * Synthesized western audio (R63/R64). No asset files: every sound is built from
 * oscillators plus one shared noise buffer, at play time.
 *
 * R64 shapes the whole module, so read the three rules before touching it:
 *
 *  - The AudioContext is created ONLY by `start()`, which main.js calls from the
 *    START gesture. Nothing else in this file touches the constructor, so a page
 *    that never pressed Start has no context at all (T018.audio-after-start
 *    counts real `new AudioContext()` calls to prove it).
 *  - Every entry point is fire-and-forget and swallows its own failure. If
 *    WebAudio is missing or throws once, `broken` latches and the module goes
 *    silent for the rest of the session: the game keeps running, which is what
 *    "stays polished if audio is unavailable" means.
 *  - A cue never resumes the context. Chrome only allows that from a gesture,
 *    and a rejected resume() inside a shot handler would be a console error on
 *    every duel. Cues are scheduled whatever the context state, so they cannot
 *    throw while suspended (T018.cues-play asserts exactly that) and they are
 *    audible the moment the context does run. Note that a SUSPENDED context
 *    freezes `currentTime`, so its voices cannot drain and the budget is the only
 *    thing keeping a parked game from piling up nodes — which is why `cue()`
 *    reports refusals honestly instead of counting them as played.
 *
 * Positional cues take the world point they came from and are attenuated against
 * `listener()`, so an opponent's shot across the street is quieter than your own.
 */

/** The named cues R63 asks for. `ambient` is a bed, not a cue, so it is not here. */
export const CUES = Object.freeze([
  'gunshot', 'dryfire', 'duel-start', 'draw', 'hit', 'miss', 'reward', 'defeat',
]);

/** Per-cue output level, before distance. Tuned so a shot is the loudest thing. */
export const LEVEL = Object.freeze({
  gunshot: 0.95, dryfire: 0.35, 'duel-start': 0.55, draw: 0.7,
  hit: 0.6, miss: 0.4, reward: 0.55, defeat: 0.5,
});

/** Ambient bed level, and the reference distance for cue attenuation (metres). */
export const AMBIENT = Object.freeze({ level: 0.13, fade: 2.5, ref: 20 });
/**
 * Above this many live voices a cue is dropped rather than queued (R66/R73).
 * The number is set from the LOUDERST legal sequence, not by taste: a won duel
 * asks for duel-start(4) + draw(3) + gunshot(3) + hit(3) + reward(4) = 17 voices
 * inside about a second, and a trimmed reward chime is a worse bug than 24
 * short-lived nodes. Voices are freed by their own `onended`, so this only
 * bounds a burst; it is not a pool.
 */
export const MAX_VOICES = 24;

export function createAudio({ window = globalThis, listener = null } = {}) {
  const AC = window.AudioContext || window.webkitAudioContext || null;
  const counts = Object.create(null);
  for (const name of CUES) counts[name] = 0;

  let ctx = null;
  let master = null;
  let noise = null;
  let ambient = null;
  let broken = !AC;      // no WebAudio, or one failure: stay silent, stay playable
  let started = false;
  let played = 0;        // cues actually SCHEDULED (see cue())
  let dropped = 0;       // cues refused by the voice budget — never counted as played
  let voices = 0;

  const num = (v) => (Number.isFinite(v) ? v : 0);
  const state = () => (ctx ? ctx.state : null);

  function ensure() {
    if (ctx || broken) return !!ctx;
    try {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.9;
      master.connect(ctx.destination);
      // One shared second of white noise, reused by every burst at a random
      // offset — cheaper than a buffer per shot and it never sounds looped.
      const len = Math.max(1, Math.floor(ctx.sampleRate * 1.2));
      noise = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = noise.getChannelData(0);
      for (let i = 0; i < len; i += 1) data[i] = Math.random() * 2 - 1;
      return true;
    } catch {
      broken = true;
      ctx = null;
      master = null;
      return false;
    }
  }

  /** One filtered, enveloped noise burst. Self-disconnecting when it ends. */
  function burst(c, out, o) {
    const src = c.createBufferSource();
    src.buffer = noise;
    src.loop = true;
    const filt = c.createBiquadFilter();
    filt.type = o.type || 'bandpass';
    filt.frequency.setValueAtTime(o.freq, o.at);
    filt.Q.value = o.q || 0.9;
    if (Number.isFinite(o.sweep)) {
      filt.frequency.exponentialRampToValueAtTime(Math.max(40, o.sweep), o.at + o.dur);
    }
    const env = c.createGain();
    env.gain.setValueAtTime(0.0001, o.at);
    env.gain.linearRampToValueAtTime(o.gain, o.at + Math.min(0.012, o.dur * 0.3));
    env.gain.exponentialRampToValueAtTime(0.0001, o.at + o.dur);
    src.connect(filt); filt.connect(env); env.connect(out);
    src.start(o.at, Math.random());
    src.stop(o.at + o.dur + 0.02);
    voices += 1;
    src.onended = () => {
      voices -= 1;
      try { src.disconnect(); filt.disconnect(); env.disconnect(); } catch { /* gone */ }
    };
  }

  /** One enveloped tone, optionally gliding from `freq` to `to`. */
  function tone(c, out, o) {
    const osc = c.createOscillator();
    osc.type = o.type || 'triangle';
    osc.frequency.setValueAtTime(o.freq, o.at);
    if (Number.isFinite(o.to)) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, o.to), o.at + o.dur);
    }
    const env = c.createGain();
    env.gain.setValueAtTime(0.0001, o.at);
    env.gain.linearRampToValueAtTime(o.gain, o.at + (o.attack || 0.008));
    env.gain.exponentialRampToValueAtTime(0.0001, o.at + o.dur);
    osc.connect(env); env.connect(out);
    osc.start(o.at);
    osc.stop(o.at + o.dur + 0.02);
    voices += 1;
    osc.onended = () => {
      voices -= 1;
      try { osc.disconnect(); env.disconnect(); } catch { /* gone */ }
    };
  }

  /** The voice table: one function per R63 cue, all relative to `t` and `g`. */
  const VOICES = {
    // The revolver: a high crack, a sweeping body, a low thump under it.
    gunshot(c, out, t, g) {
      burst(c, out, { at: t, dur: 0.05, gain: 0.9 * g, type: 'highpass', freq: 1400 });
      burst(c, out, { at: t, dur: 0.24, gain: 0.55 * g, freq: 900, q: 0.7, sweep: 170 });
      tone(c, out, { at: t, dur: 0.16, gain: 0.5 * g, freq: 170, to: 48, type: 'sine' });
    },
    // An empty chamber: a tiny click and a metallic tick, nothing else.
    dryfire(c, out, t, g) {
      burst(c, out, { at: t, dur: 0.02, gain: 0.5 * g, freq: 3200, q: 2.5 });
      tone(c, out, { at: t, dur: 0.03, gain: 0.16 * g, freq: 1500, to: 900, type: 'square' });
    },
    // "Duel called!" — three low notes over a soft rumble, the town going quiet.
    'duel-start'(c, out, t, g) {
      [196, 233.1, 293.7].forEach((f, i) => tone(c, out, {
        at: t + i * 0.15, dur: 0.3, gain: 0.34 * g, freq: f, type: 'sawtooth',
      }));
      burst(c, out, { at: t, dur: 0.5, gain: 0.1 * g, type: 'lowpass', freq: 300 });
    },
    // DRAW!: unmistakable. A short note then a rising bright one.
    draw(c, out, t, g) {
      tone(c, out, { at: t, dur: 0.1, gain: 0.4 * g, freq: 880, type: 'square' });
      tone(c, out, { at: t + 0.09, dur: 0.26, gain: 0.42 * g, freq: 1318.5, to: 1760, type: 'square' });
      burst(c, out, { at: t, dur: 0.06, gain: 0.3 * g, type: 'highpass', freq: 2400 });
    },
    // A bullet landing: body thud plus a short metallic ring.
    hit(c, out, t, g) {
      tone(c, out, { at: t, dur: 0.14, gain: 0.5 * g, freq: 140, to: 55, type: 'sine' });
      tone(c, out, { at: t, dur: 0.24, gain: 0.22 * g, freq: 560, to: 420 });
      burst(c, out, { at: t, dur: 0.1, gain: 0.3 * g, freq: 700, q: 1.2 });
    },
    // A miss: the whizz past the ear, nothing landing.
    miss(c, out, t, g) {
      burst(c, out, { at: t, dur: 0.26, gain: 0.34 * g, freq: 3000, q: 4, sweep: 700 });
    },
    // The purse moving: four rising coins.
    reward(c, out, t, g) {
      [784, 1046.5, 1318.5, 1568].forEach((f, i) => tone(c, out, {
        at: t + i * 0.085, dur: 0.3, gain: 0.26 * g, freq: f,
      }));
    },
    // Losing: a long falling sawdust groan.
    defeat(c, out, t, g) {
      tone(c, out, { at: t, dur: 0.7, gain: 0.3 * g, freq: 330, to: 82, type: 'sawtooth' });
      burst(c, out, { at: t, dur: 0.6, gain: 0.14 * g, type: 'lowpass', freq: 500, sweep: 120 });
    },
  };

  /** 1 at the listener's ear, falling to 0.15 across the street (AMBIENT.ref). */
  function distanceGain(at) {
    if (!at || typeof listener !== 'function') return 1;
    const p = listener();
    if (!p) return 1;
    const d = Math.hypot(num(at.x) - num(p.x), num(at.y) - num(p.y), num(at.z) - num(p.z));
    if (!Number.isFinite(d)) return 1;
    return Math.max(0.15, Math.min(1, AMBIENT.ref / (AMBIENT.ref + d)));
  }

  /** Dry wind plus a low drone: the desert under the town, forever quiet. */
  function startAmbient() {
    if (!ctx || ambient || broken) return;
    try {
      const t = ctx.currentTime;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(AMBIENT.level, t + AMBIENT.fade);
      g.connect(master);

      const wind = ctx.createBufferSource();
      wind.buffer = noise;
      wind.loop = true;
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 420;
      const wg = ctx.createGain();
      wg.gain.value = 0.7;
      // Two very slow LFOs: one breathes the level, one moves the gust colour.
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.07;
      const lfoAmt = ctx.createGain();
      lfoAmt.gain.value = 0.3;
      lfo.connect(lfoAmt); lfoAmt.connect(wg.gain);
      const lfo2 = ctx.createOscillator();
      lfo2.frequency.value = 0.031;
      const lfo2Amt = ctx.createGain();
      lfo2Amt.gain.value = 150;
      lfo2.connect(lfo2Amt); lfo2Amt.connect(lp.frequency);
      wind.connect(lp); lp.connect(wg); wg.connect(g);

      const drone = ctx.createGain();
      drone.gain.value = 0.18;
      drone.connect(g);
      const oscs = [55, 82.4, 110.2].map((f, i) => {
        const o = ctx.createOscillator();
        o.type = i === 2 ? 'sine' : 'triangle';
        o.frequency.value = f;
        o.detune.value = i * 4 - 4;
        o.connect(drone);
        o.start(t);
        return o;
      });
      wind.start(t, 0); lfo.start(t); lfo2.start(t);
      ambient = { g, wind, lfo, lfo2, oscs };
    } catch {
      // The bed is atmosphere, not a feature: lose it and carry on (R64).
      ambient = null;
    }
  }

  function stopAmbient() {
    if (!ctx || !ambient) return;
    const a = ambient;
    ambient = null;
    try {
      const t = ctx.currentTime;
      a.gain.gain.cancelScheduledValues(t);
      a.gain.gain.setValueAtTime(Math.max(0.0001, a.gain.gain.value), t);
      a.gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
      for (const s of [a.wind, ...a.oscs, a.lfo, a.lfo2]) s.stop(t + 0.45);
      setTimeout(() => {
        try {
          a.gain.disconnect(); a.wind.disconnect(); a.lfo.disconnect();
          a.lfo2.disconnect(); a.oscs.forEach((o) => o.disconnect());
        } catch { /* gone */ }
      }, 600);
    } catch { /* already gone */ }
  }

  /** Settle a suspend()/resume() promise into the resulting state, never reject. */
  const settle = (p) => (p
    ? Promise.resolve(p).then(state, state)
    : Promise.resolve(state()));

  const audio = {
    /**
     * R64: the ONE initializer. Call it from a user gesture (START). Idempotent,
     * so PLAY AGAIN re-arms the bed without ever building a second context.
     */
    start() {
      if (!ensure()) return false;
      started = true;
      audio.resume();
      startAmbient();
      return true;
    },

    /**
     * Play a named cue. Returns true ONLY when the cue was actually scheduled —
     * and `counts()`/`played` count the same thing, so a reader can never be told
     * a sound happened when the voice budget refused it. Safe to call before
     * start() (nothing exists yet — R64), while suspended, and after a failure.
     */
    cue(name, at = null) {
      const play = VOICES[name];
      if (!play || !ctx || !master || broken) return false;
      if (voices > MAX_VOICES) {   // drop it, never build a backlog
        dropped += 1;
        return false;
      }
      try {
        play(ctx, master, ctx.currentTime + 0.005, LEVEL[name] * distanceGain(at));
      } catch {
        broken = true;   // one failure and the rest of the run is silent (R64)
        return false;
      }
      counts[name] += 1;
      played += 1;
      return true;
    },

    /** Park everything (pause) / let it run again. Both safe before start(). */
    suspend() {
      return settle(ctx && ctx.state === 'running' ? ctx.suspend() : null);
    },
    resume() {
      return settle(ctx && ctx.state !== 'running' ? ctx.resume() : null);
    },
    stop() {
      stopAmbient();
      started = false;
      return state();
    },

    get context() { return ctx; },
    get started() { return started; },
    get state() { return state(); },
    get available() { return !broken && !!AC; },
    get ambient() { return !!ambient; },
    get voices() { return voices; },
    get played() { return played; },
    get dropped() { return dropped; },
    counts: () => ({ ...counts }),

    /** What the checks read: everything above in one plain object. */
    snapshot() {
      return {
        available: !broken && !!AC,
        created: !!ctx,
        started,
        state: state(),
        ambient: !!ambient,
        voices,
        played,
        dropped,
        cues: { ...counts },
      };
    },
  };

  return audio;
}
