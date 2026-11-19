// src/hazards.js — the things the car can collide with on Midnight Pass (R25):
// cones, barriers and the road edges.
//
// Like the scenery, the road and the gates, every hazard is placed FROM THE ROAD
// GEOMETRY: a hazard's position is roadSample(s) pushed along the left normal by a
// lateral offset, so the layout follows the winding centreline and the elevation
// profile instead of a list of coordinates. Placement is deterministic — a seeded
// mulberry32 drives every scatter (the same pattern scenery.js uses, no
// Math.random()) — so the same route has the same hazards on every load and a
// replayed trace collides with the same ids.
//
// The centreline stays clear everywhere: the closest a hazard may stand to it is
// CONE_MIN_LATERAL_M, which is more than twice the car's own reach, so the DONE
// T002 stepped trace (throttle held, steer = 0 from s = 10 for 600 steps) keeps
// advancing and stays identical between replays. Cones sit on the tarmac edge and
// the shoulder, barriers on the shoulder outside the corners, and the edge itself
// (physics.js's EDGE_LIMIT_M) is the third hazard of R25.
//
// Nothing stands at a checkpoint gate (checkpoints.js's stations) or under the
// avalanche gallery (scenery.js's span): the racing line into a gate and the covered
// stretch are hazard-free, and both numbers are READ from those modules, never copied.
//
// Two halves, deliberately:
//   - the layout and hazardQuery() are pure (road.js / physics.js / checkpoints.js /
//     scenery.js), so a Node check can drive physics and ask what it hit;
//   - buildHazards() is the visible half and imports THREE, like road.js's mesh
//     section and checkpoints.js's markers.
//
// hazardQuery() is called every frame, so it is a windowed scan of a sorted array:
// one roadSample() and a handful of comparisons per frame, no allocation on the
// common (no hit) path beyond the returned record.

import * as THREE from '../vendor/three.module.min.js';
import { ROAD_LENGTH_M, ROAD_HALF_WIDTH, SHOULDER_WIDTH_M, roadSample } from './road.js';
import { EDGE_LIMIT_M, curvatureAt } from './physics.js';
import { CHECKPOINTS } from './checkpoints.js';
import { gallerySpanFor, GALLERY_ROOF_CAP_M } from './scenery.js';

// ------------------------------------------------------------------ numbers --
// The car's own reach: half its width plus a little, so a wheel that is over a cone
// counts as a hit. Kept well under CONE_MIN_LATERAL_M so the centreline is never in
// reach of anything.
export const CAR_HIT_RADIUS_M = 0.85;

// Cones: on the tarmac edge and on the shoulder, never nearer the centreline than
// this (the asphalt edge is ROAD_HALF_WIDTH = 5 m, so 3.9 m is inside the lane by
// 1.1 m — enough to be a hazard you must steer around, far enough to leave the
// centreline clear).
export const CONE_MIN_LATERAL_M = ROAD_HALF_WIDTH - 1.1; // 3.9 m
export const CONE_MAX_LATERAL_M = EDGE_LIMIT_M - 0.35; // 6.45 m, on the shoulder
export const CONE_SPACING_M = 3.2; // along the route, inside a taper
export const CONE_CLUSTER_STEP_M = 130; // mean gap between tapers
export const CONE_CLUSTER_JITTER_M = 45;
export const CONE_COUNT_RANGE = [3, 5];
export const CONE_RADIUS_M = 0.2; // base radius
export const CONE_HEIGHT_M = 0.72;
// The white band sits on the cone's surface: its radius is the cone's own radius at
// that height (ConeGeometry tapers linearly from the base), so it never stands off it.
export const CONE_BAND_Y_M = 0.42;
export const CONE_BAND_HEIGHT_M = 0.13;
/** The cone's radius at height `y` above its base (CONE_RADIUS_M at 0, 0 at the tip). */
export function coneRadiusAt(y) {
  const t = 1 - num(y) / CONE_HEIGHT_M;
  return CONE_RADIUS_M * (t > 0 ? t : 0);
}

// Barriers: a guardrail on the OUTSIDE of the corners, on the shoulder.
export const BARRIER_STEP_M = 11; // one segment every 11 m along a barrier run
export const BARRIER_LENGTH_M = 9; // a run is at least this long
export const BARRIER_CURV_MIN = 0.009; // ~111 m radius: a corner worth a rail
export const BARRIER_LATERAL_M = EDGE_LIMIT_M - 0.55; // 6.25 m
export const BARRIER_HEIGHT_M = 0.86; // the face of the rail
export const BARRIER_DEPTH_M = 0.2;

// Clear zones (see the header): gates, the gallery, and both ends of the route.
export const GATE_CLEAR_M = 26;
export const GALLERY_HAZARD_CLEAR_M = 10;
export const HAZARD_FIRST_S = 45;
export const HAZARD_LAST_MARGIN_M = 35;

// The edge hazard: the same limit physics.js clamps the car at, so the query and the
// model cannot disagree about where the road ends.
export const EDGE_HAZARD_LIMIT_M = EDGE_LIMIT_M;

// The largest distance along the route a hazard can be felt at: the car's reach plus
// half the longest object. hazardQuery() scans the sorted layout and stops there,
// which is what keeps it cheap enough to run every frame.
export const REACH_ALONG_M = CAR_HIT_RADIUS_M + BARRIER_STEP_M / 2;

const SEED = 0x4841_5a44; // 'HAZD'
const SCAN_STEP_M = 10; // curvature sampling for the barrier runs

const CONE_COLOR = 0xe4562a; // traffic orange
const CONE_BAND_COLOR = 0xf3f1ea; // the reflective band
const RAIL_COLOR = 0xa8b0bd; // galvanised steel
const RAIL_POST_COLOR = 0x4a5060;

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
const num = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0);

/** Small deterministic PRNG (mulberry32), the same shape scenery.js uses. */
function makeRandom(seed) {
  let a = seed >>> 0;
  return function random() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The road frame at `s`: the centreline sample plus its horizontal left normal. */
function roadFrame(s, sample) {
  const p = sample(s);
  return { p, sx: -Math.cos(p.heading), sz: Math.sin(p.heading), yaw: p.heading };
}

/**
 * The stations no hazard may stand at: each checkpoint gate (the racing line into a
 * gate is clear, R24) and the avalanche gallery span plus its roof overhang (R8).
 * @returns {Array<[number, number]>} closed [from, to] intervals, sorted
 */
export function hazardClearZones(lengthM = ROAD_LENGTH_M, gates = CHECKPOINTS) {
  const L = num(lengthM) > 0 ? num(lengthM) : ROAD_LENGTH_M;
  const zones = [[0, HAZARD_FIRST_S], [L - HAZARD_LAST_MARGIN_M, L]];
  const span = gallerySpanFor(L);
  zones.push([
    span.sStart - GALLERY_ROOF_CAP_M - GALLERY_HAZARD_CLEAR_M,
    span.sEnd + GALLERY_ROOF_CAP_M + GALLERY_HAZARD_CLEAR_M,
  ]);
  for (const g of gates || []) {
    const s = num(g && g.s);
    if (s > 0 && s <= L) zones.push([s - GATE_CLEAR_M, s + GATE_CLEAR_M]);
  }
  return zones
    .map(([a, b]) => [Math.max(0, a), Math.min(L, b)])
    .filter(([a, b]) => b > a)
    .sort((a, b) => a[0] - b[0]);
}

/** Is `s` inside one of the clear intervals? */
function inClearZone(s, zones) {
  for (let i = 0; i < zones.length; i++) {
    if (s >= zones[i][0] && s <= zones[i][1]) return true;
  }
  return false;
}

/**
 * The whole layout of R25 for a route: cone tapers, barrier runs and the two road
 * edges, as plain records sorted by arc length. Pure and seeded, so the meshes and
 * the query agree with each other and with every later load.
 * @param {object|number} road main.js's road handle, a route length, or nothing
 * @param {object} options { sample, gates, lengthM }
 * @returns {{ lengthM, items, cones, barriers, edges, clearZones, counts }}
 */
export function hazardLayout(road = null, options = {}) {
  const sample = options.sample || roadSample;
  const L =
    typeof road === 'number' && num(road) > 0
      ? num(road)
      : road && num(road.lengthM) > 0
        ? num(road.lengthM)
        : num(options.lengthM) > 0
          ? num(options.lengthM)
          : ROAD_LENGTH_M;
  const gates = options.gates || CHECKPOINTS;
  const zones = hazardClearZones(L, gates);
  const random = makeRandom(SEED);

  const cones = [];
  const barriers = [];

  // --- cone tapers: a short diagonal row closing one side of the road ----------
  let s = HAZARD_FIRST_S + 20 + random() * 40;
  while (s < L - HAZARD_LAST_MARGIN_M) {
    if (!inClearZone(s, zones)) {
      const side = random() < 0.5 ? 1 : -1; // +1 = left of the centreline
      const n = CONE_COUNT_RANGE[0] + Math.floor(random() * (CONE_COUNT_RANGE[1] - CONE_COUNT_RANGE[0] + 1));
      // The taper starts near the tarmac edge and walks out onto the shoulder, so
      // the row narrows the lane without ever standing on the centreline.
      const from = CONE_MIN_LATERAL_M + random() * 0.7;
      const to = clamp(from + 1.1 + random() * 1.3, from, CONE_MAX_LATERAL_M);
      for (let i = 0; i < n; i++) {
        const t = n > 1 ? i / (n - 1) : 0;
        const cs = s + i * CONE_SPACING_M;
        if (cs >= L - HAZARD_LAST_MARGIN_M || inClearZone(cs, zones)) break;
        cones.push(hazardRecord('cone', cones.length, cs, side * (from + (to - from) * t), sample));
      }
    }
    s += CONE_CLUSTER_STEP_M + (random() - 0.5) * 2 * CONE_CLUSTER_JITTER_M;
  }

  // --- barrier runs: a rail on the outside of every corner ---------------------
  let run = null;
  const closeRun = () => {
    if (run && run.stations.length * BARRIER_STEP_M >= BARRIER_LENGTH_M) {
      for (const st of run.stations) {
        barriers.push(hazardRecord('barrier', barriers.length, st.s, run.side * BARRIER_LATERAL_M, sample));
      }
    }
    run = null;
  };
  for (let c = HAZARD_FIRST_S; c < L - HAZARD_LAST_MARGIN_M; c += SCAN_STEP_M) {
    const clear = inClearZone(c, zones);
    const k = clear ? 0 : curvatureAt(c, { sample, lengthM: L });
    const corner = Math.abs(k) > BARRIER_CURV_MIN;
    if (corner) {
      // The car runs wide on the OUTSIDE of the turn, and the outside is the side
      // the centreline bows away from: k > 0 bows left, so the rail goes right.
      const side = k > 0 ? -1 : 1;
      if (!run || run.side !== side || c - run.lastS > BARRIER_STEP_M * 1.5) {
        closeRun();
        run = { side, stations: [], lastS: c };
      }
      run.stations.push({ s: c, yaw: sample(c).heading });
      run.lastS = c;
    } else if (run && (c - run.lastS > BARRIER_STEP_M * 1.5 || !corner)) {
      closeRun();
    }
  }
  closeRun();

  // A cone taper that ends where a corner rail starts would leave the two bodies
  // overlapping on the shoulder. Drop those cones — the rail is the sturdier hazard —
  // and keep each surviving cone's own id, so the numbering still matches the seeded
  // draw order and a replayed trace collides with the same objects.
  const RAIL_PAD_M = 0.6;
  const overlaps = (a, b) =>
    Math.abs(a.s - b.s) <= a.alongM + b.alongM + RAIL_PAD_M &&
    Math.abs(a.lateral - b.lateral) <= a.acrossM + b.acrossM + RAIL_PAD_M;
  const placedCones = cones.filter((c) => !barriers.some((b) => b.side === c.side && overlaps(c, b)));

  // --- the road edges (R25): one hazard per side, for the whole route ----------
  const edges = [
    { id: 'edge-left', kind: 'edge', side: 1, name: 'road-edge-left', limitM: EDGE_HAZARD_LIMIT_M },
    { id: 'edge-right', kind: 'edge', side: -1, name: 'road-edge-right', limitM: EDGE_HAZARD_LIMIT_M },
  ];

  const items = placedCones.concat(barriers).sort((a, b) => a.s - b.s);
  return {
    lengthM: L,
    items,
    cones: placedCones,
    barriers,
    edges,
    clearZones: zones,
    counts: { cones: placedCones.length, barriers: barriers.length, edges: edges.length, total: items.length },
  };
}

/** One placed object, in the road frame and in world space. */
function hazardRecord(kind, index, s, lateral, sample) {
  const f = roadFrame(s, sample);
  const along = kind === 'cone' ? CONE_RADIUS_M : BARRIER_STEP_M / 2;
  const across = kind === 'cone' ? CONE_RADIUS_M : BARRIER_DEPTH_M / 2;
  return {
    kind,
    id: `${kind}-${index}`,
    name: `${kind}-${index}`,
    s,
    lateral,
    side: lateral >= 0 ? 1 : -1,
    yaw: f.yaw,
    x: f.p.x + f.sx * lateral,
    y: f.p.y,
    z: f.p.z + f.sz * lateral,
    elevationM: f.p.y,
    alongM: along,
    acrossM: across,
    // How far from the centreline the hazard still reaches, sideways: > 0 means the
    // centreline itself is clear of it, which is what keeps a steered-straight trace
    // from colliding (see the header).
    reachM: Math.abs(lateral) - across - CAR_HIT_RADIUS_M,
    mesh: null,
  };
}

// ------------------------------------------------------------------- query ---
/**
 * What the car is colliding with right now (R25).
 *
 * `road` is forgiving, because the caller is the frame loop: it may be the layout
 * from hazardLayout(), the built handle from buildHazards(), main.js's road handle,
 * a physics road api ({sample, lengthM}), or nothing at all — the layout of the
 * route as built is used then. The car's own {s, lateral} (physics.js's state) is
 * what is tested; a car that only carries world x/z is projected onto the
 * centreline first.
 *
 * @returns {{hit:boolean, kind:string|null, id:string|null, s, lateral, distanceM}}
 */
export function hazardQuery(car, road = null) {
  const layout = resolveLayout(road);
  const sample = (road && road.sample) || (layout.road && layout.road.sample) || roadSample;
  const s = num(car && car.s);
  let lateral = num(car && car.lateral);
  if (!Number.isFinite(car && car.lateral) && car && Number.isFinite(car.x)) {
    const f = roadFrame(s, sample);
    lateral = (car.x - f.p.x) * f.sx + (car.z - f.p.z) * f.sz;
  }

  const out = { hit: false, kind: null, id: null, s, lateral, distanceM: Infinity };

  // 1. cones and barriers, nearest first within a short window of the car.
  let best = null;
  let bestD = Infinity;
  const items = layout.items;
  for (let i = 0; i < items.length; i++) {
    const h = items[i];
    if (h.s - s > REACH_ALONG_M) break; // sorted by s: everything past the window is farther
    const ds = s - h.s;
    if (ds > REACH_ALONG_M) continue;
    const dl = lateral - h.lateral;
    if (Math.abs(dl) > CAR_HIT_RADIUS_M + h.acrossM) continue;
    const d = Math.hypot(ds, dl);
    if (d < bestD) {
      bestD = d;
      best = h;
    }
  }
  if (best) {
    out.hit = true;
    out.kind = best.kind;
    out.id = best.id;
    out.distanceM = bestD;
    return out;
  }

  // 2. the road edges: past the shoulder, on either side.
  for (const e of layout.edges) {
    if (e.side * lateral >= EDGE_HAZARD_LIMIT_M - 1e-6 || (car && car.edgeContact && car.edgeSide === e.side)) {
      out.hit = true;
      out.kind = 'edge';
      out.id = e.id;
      out.distanceM = Math.abs(Math.abs(lateral) - EDGE_HAZARD_LIMIT_M);
      return out;
    }
  }
  return out;
}

let DEFAULT_LAYOUT = null;
function resolveLayout(road) {
  if (road && Array.isArray(road.items) && Array.isArray(road.edges)) return road; // layout
  if (road && road.layout && Array.isArray(road.layout.items)) return road.layout; // built handle
  if (road && !Array.isArray(road.items) && (road.lengthM || road.sample)) {
    // a road handle / physics api: the layout of that length
    return hazardLayout(road.lengthM || ROAD_LENGTH_M, { sample: road.sample });
  }
  if (typeof road === 'number' && road > 0) return hazardLayout(road);
  if (!DEFAULT_LAYOUT) DEFAULT_LAYOUT = hazardLayout(ROAD_LENGTH_M);
  return DEFAULT_LAYOUT;
}

// ------------------------------------------------------------------- meshes --
/**
 * The visible half of R25: the cone tapers and the corner rails, as meshes placed
 * from roadSample() and turned with the road, each carrying its hazard id in
 * userData so a check (and T018's collision log) can tie a mesh to a query result.
 * @param {object|number} road main.js's road handle, a route length, or nothing
 * @param {object} layout the records to draw, default hazardLayout(road)
 * @returns {{ group, items, layout, cones, barriers, edges, counts }}
 */
export function buildHazards(road = null, layout = null) {
  if (!THREE || !THREE.BufferGeometry) throw new Error('buildHazards needs the Three.js namespace');
  const lay = layout && Array.isArray(layout.items) ? layout : hazardLayout(road);

  const group = new THREE.Group();
  group.name = 'hazards';
  group.userData = {
    requirement: 'R25',
    lengthM: lay.lengthM,
    counts: lay.counts,
    clearZones: lay.clearZones,
    edgeLimitM: EDGE_HAZARD_LIMIT_M,
  };

  const coneGeo = new THREE.ConeGeometry(CONE_RADIUS_M, CONE_HEIGHT_M, 10);
  coneGeo.translate(0, CONE_HEIGHT_M / 2, 0); // base on the ground
  const coneMat = new THREE.MeshLambertMaterial({ name: 'cone', color: CONE_COLOR, fog: true });
  const bandMat = new THREE.MeshLambertMaterial({ name: 'cone-band', color: CONE_BAND_COLOR, fog: true });
  const railMat = new THREE.MeshLambertMaterial({ name: 'barrier-rail', color: RAIL_COLOR, fog: true });
  const postMat = new THREE.MeshLambertMaterial({ name: 'barrier-post', color: RAIL_POST_COLOR, fog: true });
  // A node is turned by `rotation.y = heading`, which puts its local +z on the road's
  // FORWARD axis and its local +x on the LATERAL axis (scenery.js uses the same
  // convention; road.js defines forward as (sin h, 0, cos h)). So the rail is long on
  // local z: it runs ALONG the shoulder, 0.2 m across the road, and never lies sideways
  // over the asphalt. The posts at local z ± 5.2 stand along the run for the same reason.
  const railGeo = new THREE.BoxGeometry(BARRIER_DEPTH_M, 0.24, BARRIER_STEP_M);
  const postGeo = new THREE.BoxGeometry(0.12, BARRIER_HEIGHT_M, 0.12);
  // The reflective band, sized to the cone's own taper at its height, so it reads as
  // paint on the cone and not as a hoop standing off its surface.
  const bandRadiusM = coneRadiusAt(CONE_BAND_Y_M) + 0.006;
  const bandGeo = new THREE.CylinderGeometry(bandRadiusM, bandRadiusM, CONE_BAND_HEIGHT_M, 10, 1, true);

  for (const h of lay.items) {
    const node = new THREE.Group();
    node.name = h.name;
    node.position.set(h.x, h.y, h.z);
    node.rotation.set(0, h.yaw, 0); // local +x is the road's lateral axis
    node.userData = {
      requirement: 'R25',
      hazardId: h.id,
      kind: h.kind,
      s: h.s,
      lateral: h.lateral,
      side: h.side,
      reachM: h.reachM,
    };
    if (h.kind === 'cone') {
      const cone = new THREE.Mesh(coneGeo, coneMat);
      cone.name = `${h.id}-body`;
      node.add(cone);
      const band = new THREE.Mesh(bandGeo, bandMat);
      band.name = `${h.id}-band`;
      band.position.y = CONE_BAND_Y_M;
      node.add(band);
      h.mesh = node;
    } else {
      const rail = new THREE.Mesh(railGeo, railMat);
      rail.name = `${h.id}-rail`;
      rail.position.y = BARRIER_HEIGHT_M - 0.12;
      node.add(rail);
      for (const off of [-BARRIER_STEP_M / 2 + 0.3, BARRIER_STEP_M / 2 - 0.3]) {
        const post = new THREE.Mesh(postGeo, postMat);
        post.name = `${h.id}-post`;
        post.position.set(0, BARRIER_HEIGHT_M / 2, off);
        node.add(post);
      }
      h.mesh = node;
    }
    group.add(node);
  }

  return {
    group,
    items: lay.items,
    layout: lay,
    cones: lay.cones,
    barriers: lay.barriers,
    edges: lay.edges,
    counts: lay.counts,
    query: (car) => hazardQuery(car, lay),
  };
}
