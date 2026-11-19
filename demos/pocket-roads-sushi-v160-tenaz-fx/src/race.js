// src/race.js — the run state machine: ready → driving → paused → finished.
// Spec: R22 (the clock starts on the first throttle input, not at scene load or on
// the ready screen), R31 (ready / driving / pause-resume / restart flows), R32 (the
// run pauses automatically when the document goes into the background and resumes
// from the pause screen, never by itself).
//
// It is pure bookkeeping: no DOM, no THREE, no clock. Time is accumulated from the
// dt that main.js's frame loop hands to tick(), so a check that drives step() by
// hand gets exactly the same elapsed time as a player on a real display, and a
// paused run provably stops advancing rather than merely being hidden.
//
// main.js owns WHEN tick() is called (the rAF gate) and owns the input object this
// reads; race.js owns only what the run's state means.

// R27: one distinct collision costs 2 s. collision.js decides what "distinct" is
// and calls addPenalty() once per impact; this file only accumulates.
export const PENALTY_MS = 2000;

// The four states of R31, in the order a run visits them.
export const RACE_STATES = ['ready', 'driving', 'paused', 'finished'];

// R28: the medal boundaries, in milliseconds of FINAL time — elapsed time plus the
// collision penalties. The brief's 1:55 and 2:15 are binding, and "or faster" makes
// them inclusive: 115 000 ms is gold, 115 001 ms is silver, 135 000 ms is silver,
// 135 001 ms is bronze.
export const MEDAL_GOLD_MS = 115_000; // 1:55
export const MEDAL_SILVER_MS = 135_000; // 2:15
export const MEDALS = ['gold', 'silver', 'bronze'];

/** R28: the medal for a final time in milliseconds. */
export function medalFor(ms) {
  const t = Number(ms);
  if (!Number.isFinite(t) || t < 0) return 'bronze';
  if (t <= MEDAL_GOLD_MS) return 'gold';
  if (t <= MEDAL_SILVER_MS) return 'silver';
  return 'bronze';
}

// createRace(options) → the machine. options:
//   onState(next, prev, reason) — called after every transition (main.js mirrors
//       `paused` into its own state and would update an overlay here).
//   throttle() — where to read the throttle when startOnFirstThrottle() is called
//       with no argument (main.js passes the live input object instead).
//   getMode() / recordBest(mode, ms) — the personal best of R34/R35. The machine
//       still owns no storage: main.js hands it persist.js's getMode and saveBest, so
//       finishing records the final time into the CURRENT mode's slot and this file
//       stays importable by a Node check that has no localStorage.
export function createRace(options = {}) {
  const onState = typeof options.onState === 'function' ? options.onState : null;
  const readThrottle = typeof options.throttle === 'function' ? options.throttle : () => 0;
  const getMode = typeof options.getMode === 'function' ? options.getMode : () => 'virtual';
  const recordBest = typeof options.recordBest === 'function' ? options.recordBest : null;

  let state = 'ready';
  // Where pause() returns on resume(): a run interrupted before it started goes back
  // to 'ready', one interrupted while driving goes back to 'driving'.
  let resumeTo = 'ready';
  let elapsedMs = 0;
  let penaltyMs = 0;
  // The frozen clock at the moment finish() ran, so finalTimeMs() stays put while the
  // result screen is up and the loop keeps stepping the car for the replay.
  let finishMs = null;
  // R28: the medal and the final time it was awarded for, both taken at the line.
  let finishMedal = null;
  let medalMs = null;
  // R32 bookkeeping: the last pause came from the document going to the background,
  // and the run has not been seen in the foreground since.
  let autoPaused = false;
  let backgrounded = false;
  let transitionCount = 0;
  // R34/R35: what the last finish() recorded — { mode, ms, best, improved } — or
  // null before a finish has been written. Kept so the result screen (T020) and a
  // check can see that the recording happened without reading storage again.
  let bestRecord = null;

  function set(next, reason) {
    if (next === state) return false;
    if (!RACE_STATES.includes(next)) throw new Error('unknown race state: ' + next);
    const prev = state;
    state = next;
    transitionCount += 1;
    if (onState) onState(next, prev, reason || 'api');
    return true;
  }

  const race = {
    states: RACE_STATES,
    penaltyStepMs: PENALTY_MS,

    get state() {
      return state;
    },
    get penaltyMs() {
      return penaltyMs;
    },
    get autoPaused() {
      return autoPaused;
    },
    get backgrounded() {
      return backgrounded;
    },
    get transitions() {
      return transitionCount;
    },

    // R22: the only thing that leaves 'ready' for a player is throttle. Returns true
    // when this call is the one that started the clock.
    startOnFirstThrottle(throttle) {
      const value = throttle === undefined ? readThrottle() : Number(throttle);
      if (state !== 'ready' || !(value > 0)) return false;
      autoPaused = false;
      return set('driving', 'throttle');
    },

    // An explicit start (a ready-screen button, or a check) — same transition, and it
    // does not touch the clock beyond starting it.
    start() {
      if (state !== 'ready') return false;
      autoPaused = false;
      return set('driving', 'start');
    },

    // dt in SECONDS, from the frame loop. The clock advances in 'driving' and
    // nowhere else: paused, ready and finished all freeze it (R31, R32).
    tick(dt) {
      const d = Number(dt) > 0 ? Number(dt) : 0;
      if (state === 'driving') elapsedMs += d * 1000;
      return elapsedMs;
    },

    elapsedMs() {
      return elapsedMs;
    },

    // R27: collision.js calls this once per distinct impact.
    addPenalty(ms = PENALTY_MS) {
      const add = Number(ms) > 0 ? Number(ms) : 0;
      penaltyMs += add;
      return penaltyMs;
    },

    // Back to no penalties, without touching the run's state or its clock. reset()
    // (main.js) calls this together with collision.clear(), so a replayed run starts
    // with an empty penalty and an empty set of charged ids; restart() is the player's
    // replay, which is this plus a fresh clock and the ready line.
    clearPenalties() {
      penaltyMs = 0;
      return penaltyMs;
    },

    // R28: the medal is computed from this — elapsed time plus collision penalties.
    finalTimeMs() {
      return (finishMs === null ? elapsedMs : finishMs) + penaltyMs;
    },

    // R28: the medal for the final time. Before the line it is the medal the run
    // would get if it finished now (so a live HUD can show it); from finish() it is
    // the medal awarded at the line, and it does not move when penalties arrive after.
    get medal() {
      return state === 'finished' ? finishMedal : medalFor(race.finalTimeMs());
    },
    // The final time medal() was computed from, for the result screen (T020).
    get medalTimeMs() {
      return state === 'finished' ? medalMs : race.finalTimeMs();
    },

    finish() {
      if (state === 'finished') return false;
      if (state !== 'driving') return false;
      finishMs = elapsedMs;
      // R28: elapsed + penalties, frozen here, decides the medal.
      medalMs = race.finalTimeMs();
      finishMedal = medalFor(medalMs);
      const changed = set('finished', 'finish');
      // R34/R35: the final time of THIS run goes into the personal best of the mode
      // it was run in. Once, on the transition that finished the run — a second
      // finish() call (or a replay that never got to the line) records nothing.
      if (changed && recordBest) {
        bestRecord = recordBest(getMode(), medalMs) || null;
      }
      return changed;
    },

    // What the last finish recorded (persist.js's saveBest result), or null.
    get bestRecord() {
      return bestRecord;
    },

    pause(reason) {
      if (state !== 'ready' && state !== 'driving') return false;
      resumeTo = state === 'driving' ? 'driving' : 'ready';
      return set('paused', reason || 'api');
    },

    // R31: resume from the pause screen. Never called by the machine itself.
    resume(reason) {
      if (state !== 'paused') return false;
      autoPaused = false;
      return set(resumeTo, reason || 'resume');
    },

    // R32: the document went into the background. Pause the run and remember that
    // this pause was automatic, so coming back to the foreground shows the pause
    // screen instead of silently driving on.
    autoPause() {
      backgrounded = true;
      if (state !== 'ready' && state !== 'driving') return false;
      const started = state === 'driving';
      const changed = race.pause('background');
      if (changed && started) autoPaused = true;
      return changed;
    },

    // R32: the document is in the foreground again. The state does NOT change here;
    // the run waits on the pause screen for resume() or restart().
    markVisible() {
      backgrounded = false;
      return state;
    },

    // R31 / R30: an immediate replay — a fresh run back on the ready line, with the
    // clock and the penalties cleared.
    restart() {
      elapsedMs = 0;
      penaltyMs = 0;
      finishMs = null;
      finishMedal = null;
      medalMs = null;
      // A fresh run has not recorded anything yet (R34): the result screen must not
      // show last run's "new best" after a replay.
      bestRecord = null;
      resumeTo = 'ready';
      autoPaused = false;
      backgrounded = false;
      set('ready', 'restart');
      return state;
    },

    // A plain readout for the debug handle and the HUD.
    snapshot() {
      return {
        state,
        elapsedMs,
        penaltyMs,
        finalTimeMs: race.finalTimeMs(),
        autoPaused,
        backgrounded,
      };
    },
  };

  return race;
}
