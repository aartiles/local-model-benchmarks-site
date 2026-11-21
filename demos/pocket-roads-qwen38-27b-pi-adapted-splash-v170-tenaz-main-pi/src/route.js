// Procedural 3.20 km centerline for Midnight Pass.
//
// Pure module: no DOM, no three.js. Builds a Catmull-Rom spline through a
// fixed set of control points (x, z, elevation) in a fixed world frame,
// scales it so the total arclength is exactly TARGET_LENGTH meters, then
// resamples to a uniform arclength table. stage.js (T003) builds geometry
// from the `at(d)` helper; vehicle/camera consume position/tangent/up.
//
// Shape: long straight start, gentle S-curves up the first climb, one long
// hairpin near the crest, a second S on the descent, rolling finish.

const TARGET_LENGTH = 3200; // meters (config.routeLength)
const SPACING = 0.2; // meters, uniform resample spacing

// Control points: [x, z, elevation]. One long hairpin at P8..P12.
const CONTROL = [
  [    0,    0,    0], // start, valley floor
  [  300,    0,    8],
  [  600,    0,   16], // straight start
  [  850,   80,   24], // first S
  [ 1100,   40,   30],
  [ 1300,  120,   38],
  [ 1500,   80,   45], // crest one
  [ 1700,  140,   40],
  [ 1900,  200,   34], // hairpin entry
  [ 2050,  300,   28],
  [ 2050,  450,   22],
  [ 1900,  520,   16], // hairpin apex
  [ 1750,  480,   12],
  [ 1600,  420,   10], // hairpin exit
  [ 1450,  460,   14], // second S
  [ 1300,  540,   20],
  [ 1250,  680,   26],
  [ 1350,  800,   32], // crest two
  [ 1550,  850,   36],
  [ 1750,  820,   30],
  [ 1950,  860,   25],
  [ 2150,  900,   22],
  [ 2350,  940,   18],
  [ 2550,  900,   14], // rolling finish
  [ 2750,  860,   10],
  [ 2950,  840,    8],
  [ 3150,  830,    6],
];

// --- Catmull-Rom (uniform parameter, clamped endpoints) -------------------

function cr(a, b, c, d, t) {
  const t2 = t * t, t3 = t2 * t;
  return 0.5 * (2 * b + (c - a) * t +
    (2 * a - 5 * b + 4 * c - d) * t2 +
    (-a + 3 * b - 3 * c + d) * t3);
}

// Sample the raw spline: returns dense points {x, y, z} (y = elevation).
function rawSample(samplesPerSeg) {
  const n = CONTROL.length;
  const pts = [];
  for (let i = 0; i < n - 1; i++) {
    const p0 = CONTROL[Math.max(0, i - 1)];
    const p1 = CONTROL[i];
    const p2 = CONTROL[i + 1];
    const p3 = CONTROL[Math.min(n - 1, i + 2)];
    const last = i === n - 2;
    for (let s = 0; s < samplesPerSeg; s++) {
      const t = s / samplesPerSeg;
      pts.push({
        x: cr(p0[0], p1[0], p2[0], p3[0], t),
        y: cr(p0[2], p1[2], p2[2], p3[2], t),
        z: cr(p0[1], p1[1], p2[1], p3[1], t),
      });
    }
    if (last) {
      // include the final endpoint
      pts.push({ x: p2[0], y: p2[2], z: p2[1] });
    }
  }
  return pts;
}

// Total arclength of a polyline.
function polyLength(pts) {
  let L = 0;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x;
    const dy = pts[i].y - pts[i - 1].y;
    const dz = pts[i].z - pts[i - 1].z;
    L += Math.hypot(dx, dy, dz);
  }
  return L;
}

// --- Build the scaled, uniformly-resampled route ---------------------------

function build() {
  // Scale x/z so total arclength (including elevation) hits TARGET_LENGTH.
  // Arclength is monotonic in the horizontal scale, so fixed-point
  // iteration converges quickly.
  let pts = rawSample(48);
  for (let i = 0; i < 8; i++) {
    const L = polyLength(pts);
    const k = TARGET_LENGTH / L;
    if (Math.abs(k - 1) < 1e-7) break;
    for (const p of pts) { p.x *= k; p.z *= k; }
  }

  // Resample to uniform arclength spacing.
  const cum = [0];
  for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + dist(pts[i - 1], pts[i]));
  const total = cum[cum.length - 1];

  const samples = [];
  let j = 0;
  for (let s = 0; s <= total; s += SPACING) {
    while (j < cum.length - 2 && cum[j + 1] < s) j++;
    const seg = cum[j + 1] - cum[j] || 1;
    const t = (s - cum[j]) / seg;
    samples.push({
      x: pts[j].x + (pts[j + 1].x - pts[j].x) * t,
      y: pts[j].y + (pts[j + 1].y - pts[j].y) * t,
      z: pts[j].z + (pts[j + 1].z - pts[j].z) * t,
    });
  }
  return { samples, total };
}

function dist(a, b) {
  return Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);
}

const { samples, total } = build();

// --- Public API -------------------------------------------------------------

/** Total route length in meters (~3200). */
export const length = total;

const N = samples.length;

function sub(d) {
  // Index range covering arclength d, clamped to the table.
  const s = Math.max(0, Math.min(total, d));
  let i = Math.min(N - 2, Math.max(0, Math.round(s / SPACING)));
  return { s, i };
}

/**
 * Sample the route at arclength d (meters, clamped to [0, length]).
 * Returns { position, tangent, up, left, right, curvature }.
 * position/tangent/up/left/right are plain {x, y, z}; tangent is unit
 * length; up is the road-surface normal; left/right span the lateral plane.
 */
export function at(d) {
  const { s, i } = sub(d);
  const p0 = samples[Math.max(0, i - 1)];
  const p1 = samples[Math.min(N - 1, i + 1)];
  const p2 = samples[Math.min(N - 1, i + 2)];

  // Position: linear interp between i and i+1 (spacing is uniform).
  const a = samples[i];
  const b = samples[i + 1] ?? a;
  const t = (s - i * SPACING) / SPACING;
  const position = {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    z: a.z + (b.z - a.z) * t,
  };

  // Tangent: central difference, normalized.
  let tx = p1.x - p0.x, ty = p1.y - p0.y, tz = p1.z - p0.z;
  const tl = Math.hypot(tx, ty, tz) || 1;
  tx /= tl; ty /= tl; tz /= tl;

  // Lateral basis: right = normalize(worldUp x tangent), up = tangent x right.
  // worldUp=(0,1,0); worldUp x t = (tz, 0, -tx)
  let rx = tz, ry = 0, rz = -tx;
  const rl = Math.hypot(rx, ry, rz) || 1;
  rx /= rl; rz /= rl;
  const up = {
    x: ty * rz - tz * ry,
    y: tz * rx - tx * rz,
    z: tx * ry - ty * rx,
  };
  const ul = Math.hypot(up.x, up.y, up.z) || 1;
  up.x /= ul; up.y /= ul; up.z /= ul;

  const right = { x: rx, y: ry, z: rz };
  const left = { x: -rx, y: -ry, z: -rz };

  // Curvature (1/m): magnitude of tangent change per meter.
  let cx = p2.x - p0.x, cy = p2.y - p0.y, cz = p2.z - p0.z;
  const cl = Math.hypot(cx, cy, cz) || 1;
  cx /= cl; cy /= cl; cz /= cl;
  const dtheta = Math.hypot(cx - tx, cy - ty, cz - tz); // ~2*SPACING*kappa
  const curvature = dtheta / (2 * SPACING);

  return { position, tangent: { x: tx, y: ty, z: tz }, up, left, right, curvature };
}

/** Curvature (1/m) at arclength d. */
export function curvatureAt(d) {
  return at(d).curvature;
}

/** Elevation (m) at arclength d. */
export function elevationAt(d) {
  return at(d).position.y;
}

/** Control points (read-only copy), for debugging / stage props. */
export const controlPoints = CONTROL.map(([x, z, y]) => ({ x, y, z }));
