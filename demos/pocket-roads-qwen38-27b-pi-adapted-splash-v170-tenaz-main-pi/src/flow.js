// Pocket Roads — Midnight Pass: flow state machine (T010).
// Pure, node-importable (no DOM/three). Owns the state enum, legal
// transitions, the R7 clock rule, R11 medals, and the R12 auto-pause rule.
//
// States: ready -> driving <-> paused; driving -> finished -> ready.
// The clock starts on the first throttle input, not on leaving "ready".

export const FLOW_STATES = ["ready", "driving", "paused", "finished"];

export const FLOW_TRANSITIONS = {
  ready: ["driving"],
  driving: ["paused", "finished"],
  paused: ["driving", "ready"],
  finished: ["ready"],
};

// R11: gold ≤ 1:55 (115 s), silver ≤ 2:15 (135 s), bronze otherwise.
export function medalFor(time, cfg) {
  if (!Number.isFinite(time) || time < 0) return "bronze";
  const gold = cfg.medalGold ?? 115;
  const silver = cfg.medalSilver ?? 135;
  if (time <= gold) return "gold";
  if (time <= silver) return "silver";
  return "bronze";
}

export function canTransition(from, to) {
  return (FLOW_TRANSITIONS[from] ?? []).includes(to);
}

// Create a flow controller. `cfg` supplies medal thresholds + routeLength.
// `hooks` are optional callbacks the host (main.js) wires to its rendering.
//   hooks.onStart()    — first transition out of ready into driving
//   hooks.onTick(dt)   — call each driving tick to advance the vehicle
//   hooks.onFinish(r)  — run complete; r = {time, medal, penalties}
//   hooks.onAutoPause()— visibilitychange while driving
//   hooks.onState(s)   — any state change
export function createFlow({ cfg, hooks = {} } = {}) {
  const flow = {
    state: "ready",
    time: 0, // drive clock (s) — only advances while driving AND started
    started: false, // R7: set true on first throttle input
    distance: 0,
    penalties: 0,
    medal: null,
    routeLength: cfg.routeLength ?? 3200,
  };

  function setState(next) {
    if (!canTransition(flow.state, next)) {
      throw new Error(`illegal flow transition: ${flow.state} -> ${next}`);
    }
    flow.state = next;
    if (next === "finished") {
      flow.medal = medalFor(flow.time, cfg);
    }
    hooks.onState?.(flow.state);
  }

  // R7: start the clock on the first throttle input.
  function startClock() {
    if (!flow.started && flow.state === "driving") {
      flow.started = true;
    }
  }

  return {
    get state() { return flow.state; },
    get time() { return flow.time; },
    get started() { return flow.started; },
    get distance() { return flow.distance; },
    get medal() { return flow.medal; },
    get penalties() { return flow.penalties; },

    setState,
    // ready -> driving (fresh run)
    start() {
      flow.time = 0;
      flow.started = false;
      flow.distance = 0;
      flow.penalties = 0;
      flow.medal = null;
      setState("driving");
      hooks.onStart?.();
    },
    // driving <-> paused
    pause() { if (flow.state === "driving") setState("paused"); },
    resume() { if (flow.state === "paused") setState("driving"); },
    // R12: auto-pause only while driving.
    onVisibilityChange(hidden) {
      if (hidden && flow.state === "driving") setState("paused");
    },
    // driving -> finished when the car reaches the route length.
    finish() {
      if (flow.state !== "driving") return null;
      setState("finished");
      const result = { time: flow.time, medal: flow.medal, penalties: flow.penalties };
      hooks.onFinish?.(result);
      return result;
    },
    // finished -> ready (replay resets to a fresh ready screen)
    toReady() {
      if (flow.state === "finished" || flow.state === "paused") {
        flow.time = 0;
        flow.started = false;
        flow.distance = 0;
        flow.penalties = 0;
        flow.medal = null;
        flow.state = "ready";
        hooks.onState?.(flow.state);
      }
    },
    // Per driving tick: advance the clock only once started, then the vehicle.
    tick(dt, input) {
      if (flow.state !== "driving") return;
      if (input.throttle > 0) startClock();
      if (flow.started) flow.time += dt;
      hooks.onTick?.(dt, input);
    },
    // Host advances distance/penalties from the vehicle each tick.
    setProgress(distance, penalties) {
      flow.distance = distance;
      if (typeof penalties === "number") flow.penalties = penalties;
    },
    // Add extra seconds to the drive clock (e.g. penalty time on finish).
    addTime(seconds) {
      if (Number.isFinite(seconds) && seconds > 0) flow.time += seconds;
    },
    reset() {
      flow.time = 0;
      flow.started = false;
      flow.distance = 0;
      flow.penalties = 0;
      flow.medal = null;
      if (flow.state !== "ready") flow.state = "ready";
      hooks.onState?.(flow.state);
    },
  };
}

export default createFlow;
