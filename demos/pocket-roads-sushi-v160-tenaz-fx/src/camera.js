// src/camera.js — the cameras of the pass (R21, R31).
//
// Three views, one entry point:
//   'ready'    the staging pose main.js derives from roadSample() at install time,
//              so the first frame looks down the pass before anything moves (T005,
//              T006, T008, T010 all measure THAT frame — it must stay untouched);
//   'chase'    the virtual-mode follow camera: behind and above the car, aimed along
//              the road heading, so the coupe and the tarmac ahead of it fill the
//              frame (R21);
//   'anchored' the physical-mode view of the toy on the tablet. That is T023's
//              branch; selectCamera() reserves the name and returns null for it until
//              the anchor exists, and main.js keeps the ready pose in the meantime.
//
// The chase camera follows the state stepPhysics() produces (physics.js owns the
// motion; nothing here re-derives distance or heads down a scripted path). It is
// smoothed — the heading and the height are damped toward their targets — but the
// damping is a function of the dt passed to update(), never of the wall clock, so a
// check can settle the camera with __pr.step(dt) and get the same pose every run.
//
// THREE is handed in rather than imported (like buildRoadMesh), so this module can be
// read and unit-reasoned about without a bundle.

import { roadSample, ROAD_LENGTH_M } from './road.js';

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
const num = (v, fallback = 0) => (Number.isFinite(v) ? v : fallback);

/** Shortest signed difference between two angles. */
export function angleDelta(from, to) {
  let d = (to - from) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
}

// ------------------------------------------------------------------- chase view --
// The numbers below were fitted against this road (tightest radius 57 m at s 2204,
// grades +18 % / -15 %) so that the coupe's centre stays inside the middle third of
// the viewport on the straight, in the corners and over the crests. The view axis is
// the line from the eye THROUGH the car, extended ahead, which is what makes the
// framing independent of the road's grade and curvature: the pitch is set by
// height / back, not by the hill.
export const CHASE_BACK_M = 9; // metres behind the car, along the view heading
export const CHASE_HEIGHT_M = 2.4; // metres above the road surface under the car
export const CHASE_LOOK_AHEAD_M = 14; // how far ahead the aim point is
export const CHASE_AIM_HEIGHT_M = 1.0; // the axis passes this far above the road under the car
export const CHASE_FOV = 60; // vertical field of view, degrees
export const CHASE_HEADING_RATE_PER_S = 8; // damping of the follow heading
export const CHASE_HEIGHT_RATE_PER_S = 6; // damping of the follow height
export const CHASE_MAX_STEP_S = 0.05; // one update() never integrates more than this

/**
 * A follow camera for virtual mode (R21).
 *
 * `car` is main.js's car state — the object stepPhysics() mutates — which carries
 * `s`, `lateral` (metres, positive LEFT, the same sign car.js uses), `heading`
 * (ABSOLUTE yaw, whose forward is (sin h, 0, cos h)) and the world `x/y/z` of the
 * point on the tarmac under the car. The eye is that point pushed straight back
 * along the camera's own heading and lifted above the road surface, and the aim
 * point travels along that same heading on the line from the eye through the car.
 * So the car sits dead centre in x and just under centre in y, and the tarmac ahead
 * of it runs up through the middle of the view — on a curve as well as on a straight,
 * because the offset is along the heading the car has, not along the centreline.
 *
 * @param {object} car  the live car state (read every update, never copied)
 * @param {object} road { sample, lengthM }; defaults to road.js
 */
export function chaseCamera(car, road = null) {
  const lengthM = num(road && road.lengthM) || ROAD_LENGTH_M;
  const sample = (s) => ((road && road.sample) || roadSample)(clamp(num(s), 0, lengthM));

  const state = car || {};
  const at = sample(state.s);
  const heading0 = num(state.heading, at.heading);

  const cam = {
    mode: 'chase',
    /** What the camera follows; main.js passes its live car state here. */
    car: state,
    road: { sample, lengthM },
    /** The damped heading the eye is offset along (absolute yaw, road convention). */
    heading: heading0,
    /** The damped eye height above the road surface under the car. */
    height: CHASE_HEIGHT_M,
    /** Where the eye is and what it looks at, in world metres. */
    position: { x: 0, y: 0, z: 0 },
    lookAt: { x: 0, y: 0, z: 0 },
    up: { x: 0, y: 1, z: 0 },
    fov: CHASE_FOV,
    /** The numbers the view is built from, for checks and for tuning. */
    settings: {
      backM: CHASE_BACK_M,
      heightM: CHASE_HEIGHT_M,
      lookAheadM: CHASE_LOOK_AHEAD_M,
      aimHeightM: CHASE_AIM_HEIGHT_M,
      fov: CHASE_FOV,
      headingRatePerS: CHASE_HEADING_RATE_PER_S,
      heightRatePerS: CHASE_HEIGHT_RATE_PER_S,
    },
    /**
     * Advance the smoothing by dt seconds and re-place the eye. Deterministic: the
     * same (car, dt) sequence always gives the same pose, so a check can settle the
     * camera by calling step() rather than waiting for frames.
     */
    update(dt = 1 / 60) {
      const d = clamp(num(dt), 0, CHASE_MAX_STEP_S);
      const c = cam.car;
      const here = sample(c.s);
      const wantHeading = num(c.heading, here.heading);
      const wantHeight = clamp(num(c.height, CHASE_HEIGHT_M), 0, 12);

      // Exponential damping toward the target, in dt — frame-rate independent.
      const k = 1 - Math.exp(-CHASE_HEADING_RATE_PER_S * d);
      cam.heading += angleDelta(cam.heading, wantHeading) * k;
      const kh = 1 - Math.exp(-CHASE_HEIGHT_RATE_PER_S * d);
      cam.height += (wantHeight - cam.height) * kh;

      const h = cam.heading;
      const fx = Math.sin(h);
      const fz = Math.cos(h);
      // The car's own position, which already carries its lateral offset (physics.js
      // and car.js agree on that point), and the road surface under it.
      const x = num(c.x, here.x + roadSideX(here) * lateralOf(c));
      const z = num(c.z, here.z + roadSideZ(here) * lateralOf(c));
      const ground = num(c.y, here.y);

      // The eye is the car pushed straight back along the CAMERA's heading, so the
      // car lies on the view axis (see the note above): its centre lands dead middle
      // of the frame in x, on a curve as well as on a straight.
      const back = clamp(CHASE_BACK_M, 0, lengthM);
      cam.position.x = x - fx * back;
      cam.position.z = z - fz * back;
      cam.position.y = ground + cam.height;

      // The aim point travels along the same heading, so it never swings the car off
      // centre. Its height keeps the view axis on the line from the eye through the
      // car (raised to CHASE_AIM_HEIGHT_M over the tarmac), so the pitch depends on
      // the rig and not on the grade: the car sits in the same place in the frame on
      // a climb, a crest and a straight.
      const ahead = back + CHASE_LOOK_AHEAD_M;
      const slope = (cam.height - CHASE_AIM_HEIGHT_M) / back;
      cam.lookAt.x = cam.position.x + fx * ahead;
      cam.lookAt.z = cam.position.z + fz * ahead;
      cam.lookAt.y = cam.position.y - slope * ahead;

      // Up: world up, tipped back by the road grade, so the frame stays level on the
      // climb instead of rolling with the hill.
      const grade = clamp(num(here.grade), -1, 1);
      const ux = fx * grade * 0.5;
      const uy = 1;
      const uz = fz * grade * 0.5;
      const ul = Math.hypot(ux, uy, uz) || 1;
      cam.up.x = ux / ul;
      cam.up.y = uy / ul;
      cam.up.z = uz / ul;
      return cam;
    },
    /** Snap the smoothing to the car's current pose (used on mode entry). */
    settle() {
      const c = cam.car;
      const here = sample(c.s);
      cam.heading = num(c.heading, here.heading);
      cam.height = CHASE_HEIGHT_M;
      return cam.update(0);
    },
    /** Copy the pose onto a THREE.PerspectiveCamera and aim it. */
    apply(THREE, camera) {
      cam.update(0);
      camera.up.set(cam.up.x, cam.up.y, cam.up.z);
      camera.position.set(cam.position.x, cam.position.y, cam.position.z);
      camera.fov = cam.fov;
      camera.lookAt(cam.lookAt.x, cam.lookAt.y, cam.lookAt.z);
      camera.updateProjectionMatrix();
      return camera;
    },
    /** The distance from the eye to the car, in metres — what "behind" means here. */
    distanceToCar() {
      const c = cam.car;
      const here = sample(c.s);
      const p = carPosition(c, here);
      return Math.hypot(cam.position.x - p.x, cam.position.y - p.y, cam.position.z - p.z);
    },
  };

  cam.settle();
  return cam;
}

// The centreline's left normal at a sample: heading is a yaw with forward
// (sin h, 0, cos h), so the left normal is (-cos h, 0, sin h) — roadSide() of
// road.js, read from the sample so no second lookup is needed.
function roadSideX(at) {
  return -Math.cos(num(at.heading));
}
function roadSideZ(at) {
  return Math.sin(num(at.heading));
}

/** The car's world position, derived from its state if physics.js has not set x/z. */
function carPosition(c, here) {
  return {
    x: num(c.x, here.x + roadSideX(here) * lateralOf(c)),
    z: num(c.z, here.z + roadSideZ(here) * lateralOf(c)),
    y: num(c.y, here.y),
  };
}
function lateralOf(c) {
  return num(c && c.lateral);
}

// ------------------------------------------------------------- anchored view --
// Physical mode (R20): the toy sits still on the glass and the road moves under it.
// The rig is a low first-person view down the pass — the eye just behind and above the
// point of tarmac under the toy, aimed along the road heading — and the ANCHORING is
// done by camera.setViewOffset(): every frame the contact point is projected through
// the un-offset view and the frustum is slid by exactly the difference to the saved
// anchor pixel. So the marker never moves over a static frame; the world moves under
// the marker, and the pinning holds through steering, through the camera's own yaw and
// across a viewport resize, because all three go through this one code path.
//
// The pitch is solved from the anchor row (see anchorPitch) so the horizon stays just
// above the marker and the tarmac fills the rest of the frame; setViewOffset then does
// the exact pinning in BOTH axes, which is what makes the residual a few pixels rather
// than a whole corner of the view.
export const ANCHOR_FOV = 58; // vertical field of view, degrees
export const ANCHOR_BACK_M = 5.0; // metres the eye sits behind the contact point
export const ANCHOR_HEIGHT_M = 2.4; // metres the eye sits above the tarmac
export const ANCHOR_LOOK_AHEAD_M = 22; // how far down the pass the aim point is
export const ANCHOR_HEADING_RATE_PER_S = 8; // damping of the view heading
export const ANCHOR_MAX_OFFSET_F = 1.6; // the frustum never slides more than this
// T033 framing: the view is aimed DOWN THE ROAD, not along the toy's own yaw. The
// rig cannot see how a physical toy car is pointed (R17 draws no digital coupe), and
// what R20 promises is that the ROAD stays under the marker — so the tarmac, not the
// toy's heading, decides where the camera looks. ANCHOR_AHEAD_BLEND_M samples the
// centreline that far ahead and blends its heading in, which anticipates a corner
// instead of running straight at the guardrail; ANCHOR_LATERAL_FOLLOW_M slides the eye
// back toward the centreline so a toy near the edge still has road around the pin.
export const ANCHOR_AHEAD_BLEND_M = 18;
export const ANCHOR_CURVE_BLEND = 0.75;
export const ANCHOR_LATERAL_FOLLOW_M = 0.55;

/**
 * The point of road the toy appears to be driving on: roadSample(car.s) pushed by the
 * car's lateral offset — the same point car.js places the body on (notes/T010.md).
 */
export function contactPoint(car, road = null) {
  const lengthM = num(road && road.lengthM) || ROAD_LENGTH_M;
  const s = clamp(num(car && car.s), 0, lengthM);
  const at = ((road && road.sample) || roadSample)(s);
  return carPosition(car, at);
}

/** The pitch (radians, nose down) that puts the contact point on the anchor's row. */
function anchorPitch(anchorY01, fovDeg, back, height) {
  const half = Math.tan((num(fovDeg, ANCHOR_FOV) * Math.PI) / 360);
  const ndcY = 1 - 2 * clamp(num(anchorY01, 0.5), 0, 1); // row 0 = top of the frame
  const alpha = Math.atan2(height, Math.max(back, 1e-3)); // contact below horizontal
  return alpha + Math.atan(clamp(ndcY * half, -4, 4));
}

/**
 * The physical-mode camera (R20).
 * @param {object} car    the live car state stepPhysics() mutates
 * @param {object} road   { sample, lengthM }; defaults to road.js
 * @param {object} anchor the saved normalized {x,y} of the viewport (R18), or null
 * @param {number} w      viewport CSS width in px
 * @param {number} h      viewport CSS height in px
 */
export function anchoredCamera(car, road = null, anchor = null, w = 0, h = 0) {
  const lengthM = num(road && road.lengthM) || ROAD_LENGTH_M;
  const sample = (s) => ((road && road.sample) || roadSample)(clamp(num(s), 0, lengthM));
  const state = car || {};

  const cam = {
    mode: 'anchored',
    car: state,
    road: { sample, lengthM },
    /** The saved anchor, normalized to the viewport (R18). */
    anchor: anchor && isNum2(anchor) ? { x: anchor.x, y: anchor.y } : null,
    /** The viewport the anchor and the offset are measured in, CSS px. */
    viewport: { w: Math.max(1, num(w, 1)), h: Math.max(1, num(h, 1)) },
    heading: num(state.heading, sample(state.s).heading),
    /** An extra yaw the view carries — what "the camera turns" means for R20. */
    yaw: 0,
    pitch: 0,
    position: { x: 0, y: 0, z: 0 },
    lookAt: { x: 0, y: 0, z: 0 },
    up: { x: 0, y: 1, z: 0 },
    fov: ANCHOR_FOV,
    /** The frustum slide that pins the contact point, in CSS px (null = no offset). */
    viewOffset: null,
    settings: {
      fov: ANCHOR_FOV,
      backM: ANCHOR_BACK_M,
      heightM: ANCHOR_HEIGHT_M,
      lookAheadM: ANCHOR_LOOK_AHEAD_M,
      headingRatePerS: ANCHOR_HEADING_RATE_PER_S,
      maxOffsetFrac: ANCHOR_MAX_OFFSET_F,
      aheadBlendM: ANCHOR_AHEAD_BLEND_M,
      curveBlend: ANCHOR_CURVE_BLEND,
      lateralFollowM: ANCHOR_LATERAL_FOLLOW_M,
    },

    setAnchor(next) {
      cam.anchor = next && isNum2(next) ? { x: next.x, y: next.y } : null;
      return cam.update(0);
    },
    setViewport(width, height) {
      cam.viewport.w = Math.max(1, num(width, cam.viewport.w));
      cam.viewport.h = Math.max(1, num(height, cam.viewport.h));
      return cam.update(0);
    },
    /** The road contact point for this frame, in world metres. */
    contact() {
      return contactPoint(cam.car, cam.road);
    },

    update(dt = 1 / 60) {
      const d = clamp(num(dt), 0, CHASE_MAX_STEP_S);
      const c = cam.car;
      const here = sample(c.s);
      // R20 framing (T033): aim down the CENTRELINE, blended with the heading a little
      // further along it, so a corner is anticipated instead of driven straight into.
      // The toy's own yaw is not used: nothing draws the car in physical mode, and a
      // view that followed it would point at the hillside while the pin stayed correct.
      const aheadS = clamp(num(c.s) + ANCHOR_AHEAD_BLEND_M, 0, lengthM);
      const there = sample(aheadS);
      const roadHeading = here.heading + angleDelta(here.heading, there.heading) * ANCHOR_CURVE_BLEND;
      const k = 1 - Math.exp(-ANCHOR_HEADING_RATE_PER_S * d);
      cam.heading += angleDelta(cam.heading, roadHeading) * k;

      const p = cam.contact();
      const ground = here.y;
      const h = cam.heading + cam.yaw;
      const fx = Math.sin(h);
      const fz = Math.cos(h);
      const back = clamp(ANCHOR_BACK_M, 0, lengthM);
      const height = clamp(ANCHOR_HEIGHT_M, 0.2, 12);
      // The eye tracks a point pulled toward the centreline, so the tarmac runs up the
      // middle of the frame even when the toy sits near an edge. The contact point is
      // offset from that point SIDEWAYS only (the forward distance stays `back`), so
      // anchorPitch still solves the row it lands on, and pinOffset slides the frustum
      // the rest of the way — the pin stays exact.
      const follow = clamp(ANCHOR_LATERAL_FOLLOW_M, 0, 1);
      const ex = p.x + (here.x - p.x) * follow;
      const ez = p.z + (here.z - p.z) * follow;
      cam.position.x = ex - fx * back;
      cam.position.z = ez - fz * back;
      cam.position.y = ground + height;

      // Pitch: solved from the anchor row so the contact point lands on the marker's
      // row and the horizon stays just above it (see anchorPitch).
      const a = cam.anchor || { x: 0.5, y: 0.5 };
      cam.pitch = anchorPitch(a.y, cam.fov, back, height);
      const cp = Math.cos(cam.pitch);
      const sp = Math.sin(cam.pitch);
      const ahead = clamp(ANCHOR_LOOK_AHEAD_M, 1, lengthM);
      cam.lookAt.x = cam.position.x + fx * cp * ahead;
      cam.lookAt.z = cam.position.z + fz * cp * ahead;
      cam.lookAt.y = cam.position.y - sp * ahead;

      // Up: world up, tipped back by the grade, so the frame stays level on the climb.
      const grade = clamp(num(here.grade), -1, 1);
      const ux = fx * grade * 0.5;
      const uy = 1;
      const uz = fz * grade * 0.5;
      const ul = Math.hypot(ux, uy, uz) || 1;
      cam.up.x = ux / ul;
      cam.up.y = uy / ul;
      cam.up.z = uz / ul;

      cam.viewOffset = pinOffset(cam, p);
      return cam;
    },
    settle() {
      const c = cam.car;
      // The toy's own yaw seeds the view so the FIRST drawn frame matches where the toy
      // was put, and update() then damps it onto the road heading (T033: the road, not the
      // yaw, is what the anchored view aims along). The pin does not depend on either:
      // anchorPitch + pinOffset put the contact point on the anchor every frame.
      cam.heading = num(c.heading, sample(c.s).heading);
      return cam.update(0);
    },
    /** Copy the pose AND the anchoring frustum slide onto a THREE.PerspectiveCamera. */
    apply(THREE, camera) {
      cam.update(0);
      camera.up.set(cam.up.x, cam.up.y, cam.up.z);
      camera.position.set(cam.position.x, cam.position.y, cam.position.z);
      camera.fov = cam.fov;
      camera.lookAt(cam.lookAt.x, cam.lookAt.y, cam.lookAt.z);
      const v = cam.viewport;
      const o = cam.viewOffset;
      if (o) camera.setViewOffset(v.w, v.h, o.x, o.y, v.w, v.h);
      else if (camera.view && camera.view.enabled) camera.clearViewOffset();
      camera.updateProjectionMatrix();
      return camera;
    },
  };

  cam.settle();
  return cam;
}

/** The view basis of a pose, without needing THREE. */
function viewBasis(cam) {
  const f = norm3(cam.lookAt.x - cam.position.x, cam.lookAt.y - cam.position.y, cam.lookAt.z - cam.position.z);
  const u0 = norm3(cam.up.x, cam.up.y, cam.up.z);
  const r = norm3(cross3(f, u0));
  const u = norm3(cross3(r, f)); // re-orthogonalised up, so the roll is exact
  return { f, r, u };
}

/**
 * Where a world point lands on the screen, in CSS px with the origin at the TOP-LEFT,
 * through the camera's live projection — including any view offset.
 */
function projectPx(cam, b, point, w, h) {
  const dx = point.x - cam.position.x;
  const dy = point.y - cam.position.y;
  const dz = point.z - cam.position.z;
  const zc = dx * b.f.x + dy * b.f.y + dz * b.f.z;
  if (!(zc > 1e-4)) return null;
  const xc = dx * b.r.x + dy * b.r.y + dz * b.r.z;
  const yc = dx * b.u.x + dy * b.u.y + dz * b.u.z;
  const half = Math.tan((cam.fov * Math.PI) / 360);
  const ndcX = xc / zc / (half * (w / h));
  const ndcY = yc / zc / half;
  return { x: (ndcX * 0.5 + 0.5) * w, y: (0.5 - ndcY * 0.5) * h, depth: zc };
}

/** The frustum slide that puts the contact point on the anchor pixel. */
function pinOffset(cam, point) {
  const a = cam.anchor;
  if (!a) return null;
  const w = cam.viewport.w;
  const h = cam.viewport.h;
  const q = projectPx(cam, viewBasis(cam), point, w, h);
  if (!q) return null;
  const ax = clamp(num(a.x), 0, 1) * w;
  const ay = clamp(num(a.y), 0, 1) * h;
  const lim = ANCHOR_MAX_OFFSET_F * Math.max(w, h);
  return {
    x: clamp(q.x - ax, -lim, lim),
    y: clamp(q.y - ay, -lim, lim),
    fullWidth: w,
    fullHeight: h,
    natural: q,
    anchorPx: { x: ax, y: ay },
  };
}

/**
 * The screen position of the road contact point (R20), measured through the camera the
 * game is actually using, so a check asserts the projection instead of the pixels:
 * { x, y, anchor: {x,y}, dx, dy, depth } in CSS px from the top-left of the viewport.
 */
export function contactScreenPx(camera, road, car, anchor, w, h) {
  const width = Math.max(1, num(w, 1));
  const height = Math.max(1, num(h, 1));
  if (camera && camera.updateMatrixWorld) camera.updateMatrixWorld(true);
  const vm = camera && camera.matrixWorldInverse ? camera.matrixWorldInverse.elements : null;
  const pm = camera && camera.projectionMatrix ? camera.projectionMatrix.elements : null;
  const point = contactPoint(car, road);
  const a = anchor && isNum2(anchor) ? anchor : { x: 0.5, y: 0.5 };
  const anchorPx = { x: clamp(num(a.x), 0, 1) * width, y: clamp(num(a.y), 0, 1) * height };
  if (!vm || !pm) return { ...point, anchor: anchorPx, x: null, y: null, dx: null, dy: null, depth: null };
  const vx = vm[0] * point.x + vm[4] * point.y + vm[8] * point.z + vm[12];
  const vy = vm[1] * point.x + vm[5] * point.y + vm[9] * point.z + vm[13];
  const vz = vm[2] * point.x + vm[6] * point.y + vm[10] * point.z + vm[14];
  const cw = pm[3] * vx + pm[7] * vy + pm[11] * vz + pm[15];
  if (!(cw > 0)) return { ...point, anchor: anchorPx, x: null, y: null, dx: null, dy: null, depth: null };
  const x = ((pm[0] * vx + pm[4] * vy + pm[8] * vz + pm[12]) / cw) * 0.5 * width + width / 2;
  const y = height / 2 - ((pm[1] * vx + pm[5] * vy + pm[9] * vz + pm[13]) / cw) * 0.5 * height;
  return { x, y, anchor: anchorPx, dx: x - anchorPx.x, dy: y - anchorPx.y, depth: cw, point };
}

function isNum2(v) {
  return Number.isFinite(v.x) && Number.isFinite(v.y);
}
function norm3(x, y, z) {
  if (y === undefined) {
    z = x.z;
    y = x.y;
    x = x.x;
  }
  const l = Math.hypot(x, y, z) || 1;
  return { x: x / l, y: y / l, z: z / l };
}
function cross3(a, b) {
  return { x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x };
}

/**
 * The staging pose: the eye main.js derived from roadSample(-2) / roadSample(26),
 * put on the camera. Used on load and again after reset(), so the first-frame checks
 * (T005, T006, T008, T010) measure the view they were written against.
 */
export function readyCamera(pose) {
  const p = pose || null;
  const cam = {
    mode: 'ready',
    pose: p,
    update() {
      return cam;
    },
    settle() {
      return cam;
    },
    apply(THREE, camera) {
      if (!p) return camera;
      camera.up.set(p.up.x, p.up.y, p.up.z);
      camera.position.set(p.eye.x, p.eye.y, p.eye.z);
      camera.lookAt(p.look.x, p.look.y, p.look.z);
      return camera;
    },
  };
  return cam;
}

/**
 * The one entry point main.js uses: which view is live for this mode.
 * @param {'ready'|'chase'|'anchored'} mode
 */
export function selectCamera(mode) {
  if (mode === 'chase' || mode === 'ready' || mode === 'anchored') return mode;
  return 'ready';
}

/**
 * Keep the viewport, the projection and the renderer size in sync (R39).
 *
 * The camera aspect is the CSS size of the stage, while the drawing buffer is that
 * size times the device pixel ratio, capped so a tablet at 2x does not render four
 * times the pixels. Everything is set from the same (w, h, dpr), so a viewport change
 * — a rotation, a resize, a check calling page.setViewport — cannot leave the frame
 * stretched or the buffer at the old size.
 *
 * @param {object} camera  the THREE.PerspectiveCamera
 * @param {number} w       CSS width in px
 * @param {number} h       CSS height in px
 * @param {number} dpr     device pixel ratio (already capped by the caller or here)
 * @param {object} renderer optional THREE.WebGLRenderer to resize as well
 */
export function resizeCamera(camera, w, h, dpr = 1, renderer = null) {
  const width = Math.max(1, num(w, 1));
  const height = Math.max(1, num(h, 1));
  const ratio = Math.max(0.1, num(dpr, 1));
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  if (renderer) {
    renderer.setPixelRatio(ratio);
    renderer.setSize(width, height, false);
  }
  return { width, height, dpr: ratio, aspect: camera.aspect };
}
