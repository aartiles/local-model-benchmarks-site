// src/physics.js — the kinematic driving model for Midnight Pass (R2, R26).
//
// A toy car on a fixed route, so there is no tyre simulation and no world-space
// velocity: the state lives in the ROAD's own frame (src/road.js).
//   s        arc length along the centreline, metres (ROAD_LENGTH_M is the finish)
//   lateral  metres off the centreline, POSITIVE LEFT — the same sign car.js's
//            applyCarPose() uses when it pushes the car along roadSide(s)
//   alpha    the car's heading RELATIVE to the centreline heading at s, so
//            heading = roadSample(s).heading + alpha is the absolute yaw the
//            meshes are turned by (car.js body.heading)
//   speedKmh what the HUD shows; v = speedKmh / 3.6 is the forward speed
//
// Advancing is then the bicycle model written in that frame:
//   ds      = v cos(alpha) dt
//   dlat    = -v sin(alpha) dt      (alpha > 0 points RIGHT, which is -side)
//   dalpha  = steer rate - self-centring
// which is exact to first order, needs no projection back onto the curve, and
// means a car pointed down the pass stays down the pass through a bend — the
// behaviour T013–T018 rely on being predictable.
//
// Two speed limits shape the longitudinal model: the top speed the coupe can
// reach on the straight, and the corner limit `sqrt(latAccel / curvature)`
// evaluated over the road AHEAD, so the steepest windings of the pass (measured:
// tightest radius 57 m) force the car down the way a real one has to brake.
// Grades (measured: +18 % / -15 %) cost and give speed directly.
//
// Pure math: it imports road.js only (no THREE, no car.js, no DOM), so the checks
// can run it in Node as well as in the page. main.js owns the frame order and
// hands the result to car.place().

import { ROAD_LENGTH_M, ROAD_HALF_WIDTH, SHOULDER_WIDTH_M, roadSample } from './road.js';

// --------------------------------------------------------------- the numbers --
// All of them are the model's, not the road's: road.js is fixed by the DONE T004
// checks and must not be touched to tune the driving feel.
export const MAX_SPEED_KMH = 160; // throttle asymptote on the straight
export const ACCEL_KMH_S = 14; // km/h per second at rest, tapering to 0 at MAX_SPEED
export const BRAKE_KMH_S = 34; // km/h per second of full brake
export const COAST_KMH_S = 5.5; // engine braking + rolling resistance, throttle off
export const GRADE_KMH_S = 32; // km/h per second per unit of grade (3.6 * g = 35.3)
export const OVER_LIMIT_KMH_S = 24; // drag back down when the corner limit is passed
export const MIN_SPEED_KMH = 0; // no reverse: the toy car only goes forward

// Corner limit: lateral grip available before the car has to come off the line.
export const LAT_ACCEL_M_S2 = 10.5;
export const CORNER_LOOKAHEAD_M = 45; // how far ahead the limit is read
export const CORNER_SAMPLES = 7; // curvature stations across that window
export const CURV_WINDOW_M = 4; // central-difference width for dheading/ds
export const MIN_CORNER_SPEED_KMH = 35; // never demand a crawl

// Steering: a yaw rate that needs the car to be rolling and falls off with speed.
export const YAW_RATE_MAX = 1.5; // rad/s at full lock, just rolling
export const YAW_FALLOFF_KMH = 90; // halving distance for that rate
export const YAW_ROLL_SPEED_KMH = 6; // below this the car barely turns
export const ALPHA_MAX_RAD = 0.85; // ~49 deg: the car slides, it does not spin
export const ALPHA_RETURN_PER_S = 3.2; // self-centring once the wheel is released

// The car leaves the asphalt at the shoulder and is stopped by the edge (R25:
// the road edges are hazards; whether an impact is scored is collision.js, T018).
export const EDGE_LIMIT_M = ROAD_HALF_WIDTH + SHOULDER_WIDTH_M;

// R26: an impact slows the car. collision.js applies this to the speed.
export const IMPACT_KEEP = 0.35; // of the speed that survives an impact
export const IMPACT_MIN_CUT_KMH = 18; // and at least this much, when there is that much

export const PHYSICS = {
  MAX_SPEED_KMH, ACCEL_KMH_S, BRAKE_KMH_S, COAST_KMH_S, GRADE_KMH_S, OVER_LIMIT_KMH_S,
  MIN_SPEED_KMH, LAT_ACCEL_M_S2, CORNER_LOOKAHEAD_M, CORNER_SAMPLES, MIN_CORNER_SPEED_KMH,
  YAW_RATE_MAX, YAW_FALLOFF_KMH, YAW_ROLL_SPEED_KMH, ALPHA_MAX_RAD, ALPHA_RETURN_PER_S,
  EDGE_LIMIT_M, IMPACT_KEEP, IMPACT_MIN_CUT_KMH,
};

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
const num = (v) => (Number.isFinite(v) ? v : 0);
const wrapAngle = (a) => {
  let x = a;
  while (x > Math.PI) x -= 2 * Math.PI;
  while (x < -Math.PI) x += 2 * Math.PI;
  return x;
};

/**
 * Normalise whatever main.js hands over as `road` into { sample, lengthM }.
 * Defaults to road.js itself, so the model is usable with no argument (Node checks).
 */
export function roadApi(road) {
  const r = road || {};
  const sample = typeof r === 'function' ? r : r.sample || r.roadSample || roadSample;
  const lengthM = num(r.lengthM) || num(r.roadLengthM) || num(r.length) || ROAD_LENGTH_M;
  return { sample, lengthM };
}

/**
 * The car's own state at the start of a run: on the centreline at `s`, pointed
 * down the pass, standing still. main.js passes `s: CAR_START_S` (car.js's staging
 * station); the default is the start line so the model needs no car.js.
 */
export function initialCarState(options = {}) {
  const api = roadApi(options.road);
  const s = clamp(num(options.s === undefined ? options.startS : options.s), 0, api.lengthM);
  const at = api.sample(s);
  return {
    s,
    startS: s,
    lateral: 0,
    alpha: 0,
    heading: at.heading,
    grade: at.grade,
    speedKmh: 0,
    x: at.x,
    y: at.y,
    z: at.z,
    distanceM: 0,
    progress: 0,
    finished: false,
    edgeContact: false,
    edgeSide: 0,
    roadLengthM: api.lengthM,
  };
}

/** Curvature |dheading/ds| at station s, from two samples either side of it. */
export function curvatureAt(s, road) {
  const api = roadApi(road);
  const d = clamp(num(s), 0, api.lengthM);
  const half = CURV_WINDOW_M / 2;
  const a = clamp(d - half, 0, api.lengthM);
  const b = clamp(d + half, 0, api.lengthM);
  const span = b - a;
  if (span <= 0) return 0;
  return Math.abs(wrapAngle(api.sample(b).heading - api.sample(a).heading)) / span;
}

/** The tightest bend from `s` to `s + CORNER_LOOKAHEAD_M`. */
export function maxCurvatureAhead(s, road, options = {}) {
  const api = roadApi(road);
  const lookahead = num(options.lookaheadM) || CORNER_LOOKAHEAD_M;
  const n = Math.max(2, num(options.samples) || CORNER_SAMPLES);
  const from = clamp(num(s), 0, api.lengthM);
  let k = 0;
  for (let i = 0; i < n; i++) {
    k = Math.max(k, curvatureAt(from + (lookahead * i) / (n - 1), api));
  }
  return k;
}

/**
 * The speed the model will hold at station s: the corner limit for the bend
 * ahead, capped by the top speed and floored so a hairpin never asks for a crawl.
 */
export function cornerSpeedLimitKmh(s, road, options = {}) {
  const k = maxCurvatureAhead(s, road, options);
  if (k <= 1e-6) return MAX_SPEED_KMH;
  const vKmh = (Math.sqrt(LAT_ACCEL_M_S2 / k) * 3.6);
  return clamp(vKmh, MIN_CORNER_SPEED_KMH, num(options.maxKmh) || MAX_SPEED_KMH);
}

/** The limit the model enforces at station s (top speed and corner limit). */
export function speedLimitKmh(s, road, options = {}) {
  return Math.min(num(options.maxKmh) || MAX_SPEED_KMH, cornerSpeedLimitKmh(s, road, options));
}

/**
 * R26: the speed that is left after an impact. Returns the NEW speed in km/h, so
 * collision.js can do `car.speedKmh = impactSpeedCut(car.speedKmh)`.
 */
export function impactSpeedCut(speedKmh, options = {}) {
  const v = Math.max(0, num(options.from === undefined ? speedKmh : options.from));
  const keep = clamp(num(options.keep) || IMPACT_KEEP, 0, 1);
  const minCut = Math.min(num(options.minCutKmh === undefined ? IMPACT_MIN_CUT_KMH : options.minCutKmh), v);
  const cut = Math.min(v, Math.max(v * (1 - keep), minCut));
  return Math.max(0, v - cut);
}

/**
 * Advance the car by dt seconds. Mutates and returns `car`, so main.js can pass
 * `car.body` straight through to `car.place(next)`.
 * @param {object} car    state from initialCarState() (or car.js's carBody)
 * @param {object} input  { steer, throttle, brake } — the shape input.js (T013) writes
 * @param {number} dt     seconds
 * @param {object} road   optional { sample, lengthM }; defaults to road.js
 */
export function stepPhysics(car, input, dt, road) {
  const api = roadApi(road);
  const d = num(dt) > 0 ? num(dt) : 0;
  const state = car || initialCarState({ road: api });

  const steer = clamp(num(input && input.steer), -1, 1);
  const throttle = clamp(num(input && input.throttle), 0, 1);
  const brake = clamp(num(input && input.brake), 0, 1);

  const at = api.sample(state.s);
  const hRoad = at.heading;
  const grade = num(at.grade);
  // alpha is the model's own angle; a state that only carries the absolute
  // heading (car.js's carBody) is converted once, here.
  let alpha = Number.isFinite(state.alpha) ? wrapAngle(state.alpha) : wrapAngle(num(state.heading) - hRoad);
  let v = Math.max(0, num(state.speedKmh));
  let lateral = num(state.lateral);
  let s = clamp(num(state.s), 0, api.lengthM);

  state.edgeContact = false;
  state.edgeSide = 0;

  // ---------------------------------------------------------- longitudinal ----
  const limit = speedLimitKmh(s, api);
  let accel = 0;
  if (throttle > 0) accel += throttle * ACCEL_KMH_S * Math.max(0, 1 - v / MAX_SPEED_KMH);
  if (brake > 0) accel -= brake * BRAKE_KMH_S;
  if (throttle <= 0 && brake <= 0) accel -= COAST_KMH_S;
  // The pass climbs and falls: gravity is paid for directly (R3).
  accel -= grade * GRADE_KMH_S;
  v += accel * d;
  // Over the limit the car is dragged back to it, gently if the driver is doing
  // nothing, hard if they are on the brake.
  if (v > limit) {
    const back = OVER_LIMIT_KMH_S + (brake > 0 ? BRAKE_KMH_S * brake : 0);
    v = Math.max(limit, v - back * d);
  }
  v = clamp(v, MIN_SPEED_KMH, MAX_SPEED_KMH);

  // --------------------------------------------------------------- steering --
  // A yaw rate that needs the car to be rolling and drops with speed, plus
  // self-centring once the wheel is let go.
  const roll = Math.min(1, v / YAW_ROLL_SPEED_KMH);
  const rate = steer * YAW_RATE_MAX * roll * (1 / (1 + v / YAW_FALLOFF_KMH));
  alpha += rate * d;
  if (steer === 0) alpha -= alpha * ALPHA_RETURN_PER_S * d;
  alpha = clamp(alpha, -ALPHA_MAX_RAD, ALPHA_MAX_RAD);

  // --------------------------------------------------------------- advance ---
  const ms = v / 3.6;
  s = clamp(s + ms * Math.cos(alpha) * d, 0, api.lengthM);
  lateral += -ms * Math.sin(alpha) * d;
  // The edge stops the car crossing it: the outward angle is taken away, so the
  // car scrapes along the shoulder instead of sliding through the trees.
  if (lateral > EDGE_LIMIT_M) {
    lateral = EDGE_LIMIT_M;
    state.edgeContact = true;
    state.edgeSide = 1;
    alpha = Math.min(alpha, 0);
  } else if (lateral < -EDGE_LIMIT_M) {
    lateral = -EDGE_LIMIT_M;
    state.edgeContact = true;
    state.edgeSide = -1;
    alpha = Math.max(alpha, 0);
  }

  // ------------------------------------------------------------- write back --
  const here = api.sample(s);
  if (!Number.isFinite(state.startS)) state.startS = num(car && car.s) || 0;
  state.s = s;
  state.lateral = lateral;
  state.alpha = alpha;
  state.heading = wrapAngle(hRoad + alpha);
  state.grade = here.grade;
  state.speedKmh = v;
  // Position: the centreline pushed `lateral` metres along the left normal, and
  // the HEIGHT from the road elevation, so the car follows the climb (R3).
  state.x = here.x - Math.cos(here.heading) * lateral;
  state.y = here.y;
  state.z = here.z + Math.sin(here.heading) * lateral;
  state.distanceM = clamp(s - state.startS, 0, api.lengthM);
  state.progress = api.lengthM ? clamp(state.distanceM / api.lengthM, 0, 1) : 0;
  state.finished = s >= api.lengthM;
  state.roadLengthM = api.lengthM;
  return state;
}
