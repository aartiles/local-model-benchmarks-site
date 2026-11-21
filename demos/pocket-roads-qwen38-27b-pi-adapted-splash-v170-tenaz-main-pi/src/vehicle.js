// Vehicle physics for Midnight Pass — pure module, no DOM, no three.js.
//
// State: { distance (m along route), speed (m/s), lateral (m, + = right),
//          heading (rad, 0 = aligned with route tangent), penaltyTime (s),
//          time (s, elapsed drive clock), collisions: Map<key, {cooldownUntil}> }
//
// step(state, input, dt, hazards, cfg) mutates state and returns it.
// Hazards: array of { type: "cone"|"barrier"|"edge", key, distance, lateral }
//   — caller (main.js) resolves route fractions into concrete hazards near
//   the car. A hazard collides when the car is within its lateral band and
//   its longitudinal window. Impact: speed *= impactSlowdown, penaltyTime +=
//   impactPenalty once per distinct collision. A hazard re-arms after
//   cfg.penaltyCooldown seconds (wall clock) have elapsed.

import { config as defaultConfig } from "./config.js";

const CONE_RADIUS = 0.4;   // m, lateral half-width of a cone hit
const BARRIER_WIDTH = 3.0; // m, half-width of a barrier hit (full 6 m)
const EDGE_BAND = 0.3;     // m, band at the road edge
const HAZARD_WINDOW = 1.5; // m, longitudinal half-window for a hit
const CAR_HALF = 0.5;      // m, car half-width added to every band

export function createVehicle(state) {
  const s = state ?? {};
  return {
    distance: s.distance ?? 0,
    speed: s.speed ?? 0,
    lateral: s.lateral ?? 0,
    heading: s.heading ?? 0,
    penaltyTime: s.penaltyTime ?? 0,
    time: s.time ?? 0,
    collisions: s.collisions ?? new Map(),
  };
}

/**
 * Advance the vehicle by dt seconds.
 * @param {object} state   vehicle state (mutated and returned)
 * @param {object} input   { steer: -1..1, throttle: 0..1, brake: 0..1 }
 * @param {number} dt      seconds
 * @param {Array}  hazards hazards near the car (see module docs)
 * @param {object} [cfg]   config overrides (defaults to config.js)
 */
export function step(state, input, dt, hazards = [], cfg = defaultConfig) {
  const steer = clamp(input?.steer ?? 0, -1, 1);
  const throttle = clamp(input?.throttle ?? 0, 0, 1);
  const brake = clamp(input?.brake ?? 0, 0, 1);

  state.time += dt;

  // --- Longitudinal: throttle / brake / drag ---
  if (brake > 0) {
    state.speed -= cfg.brakeDecel * brake * dt;
  } else if (throttle > 0) {
    // Acceleration fades as speed approaches max.
    const accel = 14 * throttle * Math.max(0, 1 - state.speed / cfg.maxSpeed);
    state.speed += accel * dt;
  } else {
    state.speed -= cfg.dragDecel * dt;
  }
  state.speed = clamp(state.speed, cfg.minSpeed, cfg.maxSpeed);

  // --- Heading: steer rotates the car, relaxes back toward the tangent ---
  if (Math.abs(steer) > 0.001) {
    state.heading += steer * cfg.steerRate * dt;
  } else {
    const relax = 4 * dt;
    state.heading = Math.abs(state.heading) <= relax ? 0 :
      state.heading - Math.sign(state.heading) * relax;
  }
  state.heading = clamp(state.heading, -1.2, 1.2);

  // --- Lateral motion: speed projected onto the heading ---
  state.lateral += Math.sin(state.heading) * state.speed * dt;
  state.lateral = clamp(state.lateral, -cfg.lateralLimit, cfg.lateralLimit);

  // --- Advance along the route ---
  state.distance += state.speed * dt;

  // --- Hazards: impact => slowdown + penalty, once per distinct collision ---
  for (const h of hazards) {
    const band = h.type === "barrier" ? BARRIER_WIDTH :
      h.type === "edge" ? EDGE_BAND : CONE_RADIUS;
    const latHit = Math.abs(state.lateral - (h.lateral ?? 0)) <= band + CAR_HALF;
    const distHit = Math.abs(state.distance - h.distance) <= HAZARD_WINDOW;
    if (!latHit || !distHit) continue;

    const key = h.key ?? `${h.type}@${h.distance}`;
    let rec = state.collisions.get(key);
    if (!rec) {
      rec = { cooldownUntil: -1 };
      state.collisions.set(key, rec);
    }
    // While the cooldown is active (wall clock), this hazard cannot hit again.
    if (rec.cooldownUntil >= 0 && state.time < rec.cooldownUntil) continue;

    state.speed *= cfg.impactSlowdown;
    state.penaltyTime += cfg.impactPenalty;
    rec.cooldownUntil = state.time + cfg.penaltyCooldown;
  }

  return state;
}

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

export default { createVehicle, step };
