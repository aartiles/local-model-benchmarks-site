// src/road.js — the Midnight Pass centreline (R2, R3). Pure geometry: no meshes,
// no Three.js, no assets. This module is the SINGLE SOURCE OF TRUTH for distance
// along the route: ROAD_LENGTH_M is what physics, race, HUD and every check read,
// and the curve below is scaled so that its own arc length equals that number.
//
// Shape: an analytic centreline in (u in [0,1]) built from a few sine terms —
// lateral wiggle for the windings, sine terms plus a steady rise for the pass's
// elevation. It is then parameterised by arc length with a table computed once at
// load, so roadSample(s) is a lookup plus a few sin/cos calls: cheap, smooth and
// deterministic (same s, same answer, every frame and in every check).
//
// Coordinate convention (three.js, y up): the road runs mainly along +z, x is
// lateral (positive to the right when driving forward), y is elevation.
// `heading` is the yaw such that the forward direction is
// (sin h, 0, cos h); `grade` is dy/ds, i.e. rise over arc length (0.06 = 6 %).

export const ROAD_LENGTH_M = 3200; // R2: the route is 3.20 km long
export const ROAD_HALF_WIDTH = 5; // asphalt half-width, ~10 m of road

// ------------------------------------------------------------------ the shape
// Amplitudes in metres, `cycles` = whole sine periods over the route.
const LATERAL = [
  { amp: 150, cycles: 2.5, phase: 0.0 },
  { amp: 85, cycles: 4.0, phase: 1.1 },
  { amp: 38, cycles: 7.0, phase: 0.45 },
];
const ELEVATION = [
  { amp: 34, cycles: 1.5, phase: 0.3 },
  { amp: 15, cycles: 3.0, phase: 2.0 },
  { amp: 6.5, cycles: 5.5, phase: 1.2 },
];
const NET_RISE_M = 46; // the pass climbs overall
const Z_SPAN_M = 3200; // forward extent in shape space (scaled away below)

const TAU = Math.PI * 2;

// Offsets so the route starts at the origin with zero elevation.
const X0 = LATERAL.reduce((a, t) => a + t.amp * Math.sin(t.phase), 0);
const Y0 = ELEVATION.reduce((a, t) => a + t.amp * Math.sin(t.phase), 0);

function shapeX(u) {
  let v = -X0;
  for (const t of LATERAL) v += t.amp * Math.sin(TAU * t.cycles * u + t.phase);
  return v;
}
function shapeY(u) {
  let v = -Y0 + NET_RISE_M * u;
  for (const t of ELEVATION) v += t.amp * Math.sin(TAU * t.cycles * u + t.phase);
  return v;
}
function shapeZ(u) {
  return Z_SPAN_M * u;
}
// d/du of the three shape functions.
function shapeDX(u) {
  let v = 0;
  for (const t of LATERAL) v += t.amp * TAU * t.cycles * Math.cos(TAU * t.cycles * u + t.phase);
  return v;
}
function shapeDY(u) {
  let v = NET_RISE_M;
  for (const t of ELEVATION) v += t.amp * TAU * t.cycles * Math.cos(TAU * t.cycles * u + t.phase);
  return v;
}
const shapeDZ = () => Z_SPAN_M;

// ------------------------------------------------- arc-length parameterisation
// Cumulative arc length is integrated on a fine grid of u, then the whole curve
// is scaled by k = ROAD_LENGTH_M / total so that the route is exactly as long as
// the number we publish. `CUM[i]` is the arc length (in metres) at u = i / FINE.
const FINE = 8192;
const CUM = new Float64Array(FINE + 1);

{
  let len = 0;
  let prev = Math.hypot(shapeDX(0), shapeDY(0), shapeDZ(0)); // |dP/du| at u = 0
  for (let i = 1; i <= FINE; i++) {
    const u = i / FINE;
    const cur = Math.hypot(shapeDX(u), shapeDY(u), shapeDZ(u));
    len += ((prev + cur) / 2) * (1 / FINE); // trapezoid
    prev = cur;
    CUM[i] = len;
  }
}
const K = ROAD_LENGTH_M / CUM[FINE]; // shape space -> metres along the road
for (let i = 0; i <= FINE; i++) CUM[i] *= K;

// u for an arc length s (clamped to the route), by binary search + linear blend.
function uAtDistance(s) {
  const target = Math.min(Math.max(s, 0), ROAD_LENGTH_M);
  let lo = 0;
  let hi = FINE;
  if (target <= 0) return 0;
  if (target >= CUM[FINE]) return 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (CUM[mid] < target) lo = mid;
    else hi = mid;
  }
  const span = CUM[hi] - CUM[lo] || 1;
  const frac = (target - CUM[lo]) / span;
  return (lo + frac) / FINE;
}

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

/**
 * Sample the centreline at arc length `s` metres from the start (R2, R3).
 * @returns {{x:number,y:number,z:number,heading:number,grade:number,halfWidth:number}}
 */
export function roadSample(s) {
  const d = clamp(Number(s) || 0, 0, ROAD_LENGTH_M);
  const u = uAtDistance(d);
  const dx = shapeDX(u);
  const dy = shapeDY(u);
  const dz = shapeDZ(u);
  const speed = Math.hypot(dx, dy, dz); // |dP/du|, > 0 everywhere
  return {
    x: K * shapeX(u),
    y: K * shapeY(u),
    z: K * shapeZ(u),
    heading: Math.atan2(dx, dz), // yaw; forward = (sin h, 0, cos h)
    grade: speed > 0 ? dy / speed : 0, // dy/ds
    halfWidth: ROAD_HALF_WIDTH,
  };
}

/**
 * Evenly spaced centreline samples from 0 to ROAD_LENGTH_M, for checks and for
 * scenery/hazard placement. `step` is metres of arc length (default 10).
 * Each entry is roadSample(s) plus its `s`.
 */
export function roadPoints(step = 10) {
  const d = Math.max(Number(step) || 10, 0.1);
  const n = Math.max(1, Math.round(ROAD_LENGTH_M / d));
  const out = [];
  for (let i = 0; i <= n; i++) {
    const s = Math.min(i * (ROAD_LENGTH_M / n), ROAD_LENGTH_M);
    out.push(Object.assign({ s }, roadSample(s)));
  }
  return out;
}

/** Unit forward direction at arc length s, as {x, y, z} (no THREE needed). */
export function roadForward(s) {
  const d = clamp(Number(s) || 0, 0, ROAD_LENGTH_M);
  const u = uAtDistance(d);
  const dx = shapeDX(u);
  const dy = shapeDY(u);
  const dz = shapeDZ(u);
  const len = Math.hypot(dx, dy, dz) || 1;
  return { x: dx / len, y: dy / len, z: dz / len };
}

/** Horizontal left-normal at arc length s (unit, y = 0), for edges and scenery. */
export function roadSide(s) {
  const f = roadForward(s);
  return { x: -f.z, y: 0, z: f.x };
}

// =============================================================== the road mesh
// buildRoadMesh() is the only part of this file that touches Three.js, and it is
// handed the THREE namespace and the loaded asphalt texture instead of importing
// them: everything above stays import-free so Node and the geometry checks can use
// roadSample() directly (T004). R4: the surface is textured with the supplied
// assets/road-grain.webp, tiled by arc length and across the width.

export const ROAD_TILE_M = 8; // one road-grain tile covers an 8 m x 8 m patch
export const SHOULDER_WIDTH_M = 1.8; // gravel band outside the asphalt, each side
export const EDGE_LINE_WIDTH_M = 0.22; // painted edge line
export const EDGE_LINE_INSET_M = 0.45; // its outer edge, this far in from the asphalt edge
export const ROAD_END_EXTENSION_M = 45; // straight tangent continuation past both ends

const MESH_STEP_M = 2; // one ring of vertices every 2 m of arc length

/**
 * Centreline sample that keeps going past the ends of the route, so the ribbon has
 * no visible cut-off under the starting camera. Beyond [0, ROAD_LENGTH_M] it walks
 * the tangent (and the grade) of the nearest end.
 */
function roadSampleExtended(s) {
  if (s >= 0 && s <= ROAD_LENGTH_M) return roadSample(s);
  const at = s < 0 ? 0 : ROAD_LENGTH_M;
  const a = roadSample(at);
  const d = s - at;
  const fx = Math.sin(a.heading);
  const fz = Math.cos(a.heading);
  return {
    x: a.x + fx * d,
    y: a.y + a.grade * d,
    z: a.z + fz * d,
    heading: a.heading,
    grade: a.grade,
    halfWidth: a.halfWidth,
  };
}

/**
 * A ribbon strip between lateral offsets, triangulated along the centreline.
 * `offsets` are metres along roadSide() (positive = left) and must run from the
 * leftmost to the rightmost column, which is the winding that faces the strip up.
 * UVs are metres divided by `tile`, so a RepeatWrapping texture tiles by arc length
 * (v) and across the width (u) with no per-mesh repeat scaling.
 * @param {object} THREE the vendored Three.js namespace
 * @param {{offsets:number[], from?:number, to?:number, step?:number,
 *   rise?: number|((s:number, offset:number)=>number), tile?:number}} o
 */
function buildStrip(THREE, o) {
  const offsets = o.offsets;
  if (!Array.isArray(offsets) || offsets.length < 2) {
    throw new Error('buildStrip needs at least two lateral offsets');
  }
  for (let i = 1; i < offsets.length; i++) {
    if (!(offsets[i] < offsets[i - 1])) throw new Error('buildStrip offsets must run left to right (decreasing)');
  }
  const from = o.from === undefined ? -ROAD_END_EXTENSION_M : Number(o.from);
  const to = o.to === undefined ? ROAD_LENGTH_M + ROAD_END_EXTENSION_M : Number(o.to);
  const step = Number(o.step) > 0 ? Number(o.step) : MESH_STEP_M;
  const tile = Number(o.tile) > 0 ? Number(o.tile) : ROAD_TILE_M;
  const rise = o.rise === undefined ? 0 : o.rise;
  const cols = offsets.length;
  const rows = Math.max(2, Math.round((to - from) / step) + 1);

  const pos = new Float32Array(rows * cols * 3);
  const uv = new Float32Array(rows * cols * 2);
  for (let i = 0; i < rows; i++) {
    const s = from + ((to - from) * i) / (rows - 1);
    const p = roadSampleExtended(s);
    const fx = Math.sin(p.heading);
    const fz = Math.cos(p.heading);
    const sx = -fz; // roadSide(s): left normal, y = 0
    const sz = fx;
    for (let j = 0; j < cols; j++) {
      const off = offsets[j];
      const k = i * cols + j;
      pos[k * 3] = p.x + sx * off;
      pos[k * 3 + 1] = p.y + (typeof rise === 'function' ? rise(s, off) : rise);
      pos[k * 3 + 2] = p.z + sz * off;
      uv[k * 2] = off / tile;
      uv[k * 2 + 1] = s / tile;
    }
  }

  const index = [];
  for (let i = 0; i < rows - 1; i++) {
    for (let j = 0; j < cols - 1; j++) {
      const a = i * cols + j;
      const b = a + 1;
      const c = a + cols;
      const d = c + 1;
      index.push(a, c, b, b, c, d);
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setIndex(index);
  g.computeVertexNormals();
  g.computeBoundingSphere();
  g.computeBoundingBox();
  return g;
}

/**
 * The asphalt ribbon, edge lines and shoulders of Midnight Pass (R4).
 * @param {object} THREE the vendored Three.js namespace (r170)
 * @param {object} asphalt the loaded `assets/road-grain.webp` THREE.Texture
 * @returns {object} THREE.Group named "road", holding "road-asphalt",
 *          "road-shoulder-left", "road-shoulder-right", "road-edge-left",
 *          "road-edge-right"
 */
export function buildRoadMesh(THREE, asphalt) {
  if (!THREE || !THREE.BufferGeometry) {
    throw new Error('buildRoadMesh(THREE, asphalt) needs the Three.js namespace');
  }
  if (!asphalt || !asphalt.isTexture) {
    throw new Error('buildRoadMesh(THREE, asphalt) needs the road-grain texture, e.g. assets.textures["road-grain"]');
  }

  // Tile by arc length and across the width: the UVs are metres / ROAD_TILE_M, so
  // the wrapping mode alone does the repeating (no stretch over the 3.2 km route).
  asphalt.wrapS = THREE.RepeatWrapping;
  asphalt.wrapT = THREE.RepeatWrapping;
  asphalt.repeat.set(1, 1);
  asphalt.offset.set(0, 0);
  if (asphalt.colorSpace !== THREE.SRGBColorSpace) asphalt.colorSpace = THREE.SRGBColorSpace;
  asphalt.needsUpdate = true;

  const hw = ROAD_HALF_WIDTH;
  const group = new THREE.Group();
  group.name = 'road';
  group.userData = { roadLengthM: ROAD_LENGTH_M, tileM: ROAD_TILE_M, halfWidthM: hw };

  const surface = new THREE.Mesh(
    buildStrip(THREE, { offsets: [hw, -hw] }),
    new THREE.MeshStandardMaterial({
      name: 'asphalt-road-grain',
      map: asphalt,
      color: 0x4b4f57, // the supplied grain is bright noise; tint it down to dusk asphalt
      roughness: 0.95,
      metalness: 0,
    })
  );
  surface.name = 'road-asphalt';
  group.add(surface);

  // Gravel shoulder, dropping away from the edge of the tarmac.
  const shoulderMat = new THREE.MeshStandardMaterial({
    name: 'shoulder-gravel',
    color: 0x2f343c,
    roughness: 1,
    metalness: 0,
  });
  for (const side of [1, -1]) {
    const outer = hw + SHOULDER_WIDTH_M;
    const shoulder = new THREE.Mesh(
      buildStrip(THREE, {
        offsets: side > 0 ? [outer, hw] : [-hw, -outer],
        rise: (s, off) => -0.16 * (Math.abs(off) - hw) / SHOULDER_WIDTH_M,
        tile: ROAD_TILE_M,
      }),
      shoulderMat
    );
    shoulder.name = side > 0 ? 'road-shoulder-left' : 'road-shoulder-right';
    group.add(shoulder);
  }

  // Painted edge lines, just above the tarmac so they never z-fight.
  const lineMat = new THREE.MeshBasicMaterial({ name: 'edge-line', color: 0xdfe6f5 });
  const lineOut = hw - EDGE_LINE_INSET_M;
  const lineIn = lineOut - EDGE_LINE_WIDTH_M;
  for (const side of [1, -1]) {
    const line = new THREE.Mesh(
      buildStrip(THREE, { offsets: side > 0 ? [lineOut, lineIn] : [-lineIn, -lineOut], rise: 0.03 }),
      lineMat
    );
    line.name = side > 0 ? 'road-edge-left' : 'road-edge-right';
    group.add(line);
  }

  return group;
}
