// src/audio.js — R33: synthesized sound effects and a mute toggle that silences them.
//
// Spec: "Sound effects are synthesized and played for at least engine/impact/
// checkpoint or finish events, and a mute toggle silences them and is itself
// persisted."
//
// Three things this module owns, and nothing else:
//
//   * the WebAudio graph — every sound here is SYNTHESIZED (oscillators and gain
//     envelopes), so no audio asset is needed and `assets/` stays untouched (R11);
//   * an in-memory LOG of the events that were played, which is how R33 is checked.
//     Headless Chrome has no audio device, so "it made a sound" cannot be listened
//     to; the log is the measurement, and the graph behind it is real (a device
//     would hear it).
//   * the mute switch: `setMuted()` silences NEW events and parks the engine hum.
//     The FLAG is not stored here — persist.js is the only door to localStorage
//     (R34), so main.js hands the stored value in at boot and writes it back on
//     every change.
//
// Two rules that keep the rest of the game untouched:
//
//   * the AudioContext is never constructed at module load. Browsers start it
//     suspended until a user gesture, and Safari wants the resume INSIDE the
//     gesture handler, so `arm()` is called from a real pointer/key handler in
//     main.js. Before the first gesture there is no context at all.
//   * no sound changes the simulation. Every play method is a leaf: it reads the
//     numbers it is handed and returns whether it played. The DONE
//     T002.page-boots check replays a stepped trace and requires it byte-identical,
//     so a blip must never be able to nudge physics, the race machine or a gate.
//
// Everything is wrapped: a browser that refuses to create a context (or has no
// output device at all) leaves `hasContext()` false and the game plays on in
// silence — sound is an effect, never a dependency of a run.

/** The events R33 names, in the order a run meets them. */
export const AUDIO_EVENTS = ['engine', 'impact', 'checkpoint', 'finish'];

/** Engine hum pitch: the fundamental at a standstill and at the speed limit. */
export const ENGINE_HZ_IDLE = 46;
export const ENGINE_HZ_MAX = 190;

/** How many events the log keeps (a full run is a few hundred frames of engine). */
export const LOG_LIMIT = 400;

/**
 * R33 "pitch follows speed": the hum's fundamental rises with the car's speed and
 * with nothing else, so a check can assert the number instead of listening.
 * `maxKmh` is physics.js's speed limit, passed in by main.js — this module does not
 * import the driving model.
 */
export function engineHzFor(speedKmh, maxKmh = 160) {
  const s = Number(speedKmh);
  const m = Number(maxKmh) > 0 ? Number(maxKmh) : 160;
  const frac = Number.isFinite(s) ? Math.min(1, Math.max(0, s / m)) : 0;
  return ENGINE_HZ_IDLE + frac * (ENGINE_HZ_MAX - ENGINE_HZ_IDLE);
}

const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

/** A small AudioContext wrapper, so every node creation is guarded in one place. */
function Graph(context) {
  const live = () => !!context && context.state !== 'closed';
  return {
    context,
    live,
    osc(type, hz) {
      if (!live()) return null;
      try {
        const o = context.createOscillator();
        o.type = type;
        o.frequency.value = hz;
        return o;
      } catch {
        return null;
      }
    },
    gain(value) {
      if (!live()) return null;
      try {
        const g = context.createGain();
        g.gain.value = value;
        return g;
      } catch {
        return null;
      }
    },
    filter(type, hz) {
      if (!live()) return null;
      try {
        const f = context.createBiquadFilter();
        f.type = type;
        f.frequency.value = hz;
        return f;
      } catch {
        return null;
      }
    },
    now() {
      if (!live()) return 0;
      try {
        return context.currentTime;
      } catch {
        return 0;
      }
    },
  };
}

/**
 * Build the game's sound. `options.muted` is the flag persist.js stored at boot;
 * `options.Ctor` lets a check substitute a stub context (the page uses the real one).
 */
export function createAudio(options = {}) {
  const Ctor = options.Ctor || (typeof globalThis !== 'undefined'
    ? globalThis.AudioContext || globalThis.webkitAudioContext
    : null);
  const logLimit = Number(options.logLimit) > 0 ? Number(options.logLimit) : LOG_LIMIT;

  let muted = !!options.muted;
  let context = null;
  let graph = null;
  let master = null;
  let armed = false;
  let failed = false;

  // The engine hum: two detuned oscillators through one lowpass, kept alive while
  // the run is driving so its pitch can follow the speed frame by frame.
  let engine = null;

  const events = [];
  let seq = 0;

  function record(type, detail) {
    const entry = { type, n: seq++, detail: detail || null };
    events.push(entry);
    if (events.length > logLimit) events.shift();
    return entry;
  }

  /** The master bus, created with the context. Mute is a gain of 0 on it. */
  function output() {
    if (!graph) return null;
    if (!master) {
      master = graph.gain(muted ? 0 : 1);
      const ctx = graph.context;
      if (master && ctx && ctx.destination) {
        try {
          master.connect(ctx.destination);
        } catch {
          return null;
        }
      }
    }
    return master;
  }

  /**
   * Create the context, or wake it up. Called from a real user-gesture handler
   * (main.js), because a context made outside one starts suspended and Safari keeps
   * it there. Returns whether a context exists afterwards.
   */
  function arm() {
    if (!context && Ctor && !failed) {
      try {
        context = new Ctor();
        graph = Graph(context);
      } catch {
        failed = true;
        context = null;
        graph = null;
        return false;
      }
    }
    if (!context) return false;
    armed = true;
    output();
    // R33: resume INSIDE the gesture, which is what makes the hum audible after a
    // tap on a phone. A context that is already running says so by itself.
    if (context.state !== 'running' && typeof context.resume === 'function') {
      try {
        const p = context.resume();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      } catch {
        /* a browser that will not resume: the log still records the run's sounds */
      }
    }
    return true;
  }

  /** A sound can only be played once a gesture has armed the context and it is live. */
  function ready() {
    return armed && !!graph && graph.live() && !!output() && context.state !== 'closed';
  }

  function stopEngine() {
    if (!engine) return;
    const e = engine;
    engine = null;
    try {
      const t = graph.now();
      e.gain.gain.cancelScheduledValues(t);
      e.gain.gain.setTargetAtTime(0, t, 0.05);
      for (const o of e.oscs) o.stop(t + 0.2);
    } catch {
      /* already gone */
    }
  }

  /**
   * Start the engine hum (the run has begun to drive). Idempotent: a second call
   * while it is running only keeps the pitch current.
   */
  function engineStart(detail) {
    if (engine) return { played: false, reason: 'already-running' };
    if (!ready() || muted) return { played: false, reason: muted ? 'muted' : 'no-context' };
    const oscs = [];
    const gain = graph.gain(0.0);
    const lp = graph.filter('lowpass', 900);
    if (!gain || !lp) return { played: false, reason: 'graph-unavailable' };
    // A sawtooth plus a square an octave below: an engine, not a test tone.
    const hz = engineHzFor(detail && detail.speedKmh, detail && detail.maxKmh);
    for (const [type, mult, level] of [['sawtooth', 1, 0.5], ['square', 0.5, 0.35]]) {
      const o = graph.osc(type, hz * mult);
      if (!o) continue;
      const og = graph.gain(level);
      if (!og) {
        try { o.disconnect(); } catch { /* ignore */ }
        continue;
      }
      o.connect(og);
      og.connect(lp);
      oscs.push(o);
    }
    if (!oscs.length) return { played: false, reason: 'graph-unavailable' };
    lp.connect(gain);
    gain.connect(output());
    const t = graph.now();
    for (const o of oscs) {
      try { o.start(t); } catch { /* ignore */ }
    }
    gain.gain.setTargetAtTime(0.09, t, 0.12);
    engine = { oscs, gain, lp, hz };
    record('engine', { action: 'start', speedKmh: num(detail && detail.speedKmh), hz: Math.round(hz * 100) / 100 });
    return { played: true, hz };
  }

  /**
   * Follow the speed. Only the pitch moves; nothing else in the game is read, and no
   * event is logged per frame (the log would be the frame count). `hz` is returned so
   * a check can see the pitch rise with the speed without listening.
   */
  function engineFollow(speedKmh, maxKmh) {
    const hz = engineHzFor(speedKmh, maxKmh);
    if (engine) {
      try {
        const t = graph.now();
        for (const [i, mult] of [1, 0.5].entries()) {
          engine.oscs[i].frequency.setTargetAtTime(hz * mult, t, 0.08);
        }
        engine.hz = hz;
      } catch {
        /* a node the browser already dropped: the hum is cosmetic */
      }
    }
    return hz;
  }

  /** One short tone burst through the master bus. */
  function blip(specs, level) {
    if (!ready()) return false;
    const t0 = graph.now();
    let started = 0;
    for (const [i, spec] of specs.entries()) {
      const [type, hz, at, dur, peak] = spec;
      const o = graph.osc(type, hz);
      const g = graph.gain(0.0);
      if (!o || !g) continue;
      o.connect(g);
      g.connect(output());
      const t = t0 + at;
      try {
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(peak * level, t + 0.012);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.start(t);
        o.stop(t + dur + 0.02);
        o.onended = () => {
          try { o.disconnect(); g.disconnect(); } catch { /* ignore */ }
        };
        started += 1;
        void i;
      } catch {
        /* ignore this tone */
      }
    }
    return started > 0;
  }

  /** R33 impact: a low thud that drops away fast, plus a short body knock. */
  function impact(detail) {
    if (!ready() || muted) return { played: false, reason: muted ? 'muted' : 'no-context' };
    const cut = Math.max(1, num(detail && detail.cutKmh));
    const depth = Math.min(1, cut / 60);
    const played = blip([
      ['sine', 150 - 60 * depth, 0, 0.26, 0.55],
      ['triangle', 90, 0.005, 0.18, 0.4],
      ['square', 220, 0, 0.05, 0.12],
    ], 0.6 + 0.4 * depth);
    if (!played) return { played: false, reason: 'graph-unavailable' };
    record('impact', {
      id: (detail && detail.id) || null,
      kind: (detail && detail.kind) || null,
      cutKmh: Math.round(cut * 100) / 100,
    });
    return { played: true };
  }

  /** R33 checkpoint: a short two-tone confirmation blip. */
  function checkpoint(detail) {
    if (!ready() || muted) return { played: false, reason: muted ? 'muted' : 'no-context' };
    const index = num(detail && detail.index);
    const base = 620 + 60 * index;
    const played = blip([
      ['triangle', base, 0, 0.09, 0.3],
      ['triangle', base * 1.5, 0.07, 0.11, 0.28],
    ], 1);
    if (!played) return { played: false, reason: 'graph-unavailable' };
    record('checkpoint', {
      index,
      name: (detail && detail.name) || null,
      crossed: num(detail && detail.crossed),
      finish: !!(detail && detail.finish),
    });
    return { played: true };
  }

  /** R33 finish: a rising three-note fanfare. */
  function finish(detail) {
    if (!ready() || muted) return { played: false, reason: muted ? 'muted' : 'no-context' };
    const played = blip([
      ['triangle', 523, 0, 0.14, 0.32],
      ['triangle', 659, 0.11, 0.14, 0.32],
      ['triangle', 784, 0.22, 0.3, 0.34],
    ], 1);
    if (!played) return { played: false, reason: 'graph-unavailable' };
    record('finish', {
      timeMs: Math.round(num(detail && detail.timeMs)),
      medal: (detail && detail.medal) || null,
    });
    return { played: true };
  }

  /**
   * R33: the mute switch. Muted means NEW events are not played and not logged, and
   * the engine hum is parked (its gain goes to 0 and its nodes are stopped).
   * Returns the flag now in force; storing it is persist.js' job, done by main.js.
   */
  function setMuted(value) {
    muted = !!value;
    if (muted) {
      stopEngine();
      if (master) {
        try {
          master.gain.cancelScheduledValues(graph ? graph.now() : 0);
          master.gain.value = 0;
        } catch {
          /* ignore */
        }
      }
    } else if (master) {
      try {
        master.gain.value = 1;
      } catch {
        /* ignore */
      }
    }
    return muted;
  }

  function toggleMute() {
    return setMuted(!muted);
  }

  /** What the game's sound is doing right now — the check reads this, not the air. */
  function status() {
    return {
      hasContext: !!context,
      armed,
      failed,
      state: context ? context.state : null,
      sampleRate: context && context.sampleRate ? context.sampleRate : null,
      muted,
      engineRunning: !!engine,
      engineHz: engine ? Math.round(engine.hz * 100) / 100 : null,
      events: events.length,
      supported: !!Ctor,
    };
  }

  /** A copy of the played-event log, oldest first. */
  function log() {
    return events.map((e) => ({ type: e.type, n: e.n, detail: e.detail }));
  }

  /** The types in the log, in order — what a check counts. */
  function types() {
    return events.map((e) => e.type);
  }

  function clearLog() {
    events.length = 0;
    seq = 0;
    return true;
  }

  /** Put the hum away at the end of a run (a reset, or the line). */
  function halt() {
    stopEngine();
    return true;
  }

  return {
    AUDIO_EVENTS,
    ENGINE_HZ_IDLE,
    ENGINE_HZ_MAX,
    engineHzFor,
    arm,
    ready: () => ready(),
    engineStart,
    engine: engineFollow,
    impact,
    checkpoint,
    finish,
    halt,
    setMuted,
    toggleMute,
    get muted() {
      return muted;
    },
    status,
    log,
    types,
    clearLog,
  };
}

/** The module as one object, for a Node check that wants the pure helpers. */
export const audio = { AUDIO_EVENTS, ENGINE_HZ_IDLE, ENGINE_HZ_MAX, LOG_LIMIT, engineHzFor, createAudio };
