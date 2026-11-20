// src/route.js — the Midnight Pass route: a 3.20 km winding alpine road.
// Builds a Catmull-Rom centreline, normalises it to exactly 3200 m of arc
// length, and precomputes per-metre tables (position, tangent, signed
// curvature, superelevation). Also derives the deterministic placement of
// checkpoints, hazards, chalets and the avalanche gallery from the curvature.
import * as THREE from '../vendor/three.module.min.js';
import { ROUTE_LENGTH, ROAD_HALF, SHOULDER, CHECKPOINTS } from './config.js';

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Control points: x = lateral (m), y = elevation (m), z = "north" (m).
// Winding climb from the valley to the pass, with a dip in the middle.
const CONTROL_POINTS = [
  [0, 1418, 0], [-46, 1428, 128], [-118, 1452, 252], [-158, 1486, 392],
  [-118, 1522, 528], [-18, 1552, 648], [64, 1580, 768], [142, 1604, 888],
  [182, 1638, 1018], [120, 1668, 1148], [-2, 1694, 1272], [-92, 1660, 1396],
  [-182, 1686, 1520], [-232, 1722, 1648], [-180, 1748, 1776], [-58, 1772, 1896],
  [64, 1790, 2016], [142, 1812, 2136], [172, 1838, 2264], [118, 1862, 2392],
  [18, 1882, 2512], [-82, 1900, 2636], [-172, 1922, 2756], [-224, 1946, 2876],
  [-158, 1972, 2996], [-38, 1992, 3104], [0, 2004, 3200],
];

export function buildRoute() {
  let pts = CONTROL_POINTS.map(([x, y, z]) => new THREE.Vector3(x, y, z));
  let curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.5);
  const total = curve.getLength();
  const scale = ROUTE_LENGTH / total; // normalise to exactly 3.20 km of arc length
  pts = pts.map((p) => p.clone().multiplyScalar(scale));
  curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.5);

  const N = ROUTE_LENGTH; // 1 m resolution
  const pos = new Float64Array((N + 1) * 3);
  const tan = new Float64Array((N + 1) * 3);
  const up = new THREE.Vector3(0, 1, 0);
  const p = new THREE.Vector3(), t = new THREE.Vector3();
  for (let i = 0; i <= N; i++) {
    const u = i / N;
    curve.getPointAt(u, p);
    curve.getTangentAt(u, t);
    pos.set([p.x, p.y, p.z], i * 3);
    tan.set([t.x, t.y, t.z], i * 3);
  }
  // signed curvature (1/m), positive = turning left (centre on +left side)
  const curv = new Float64Array(N + 1);
  for (let i = 0; i <= N; i++) {
    const a = Math.max(0, i - 2), b = Math.min(N, i + 2);
    const t0x = tan[a * 3], t0z = tan[a * 3 + 2];
    const t1x = tan[b * 3], t1z = tan[b * 3 + 2];
    const cross = t0x * t1z - t0z * t1x; // y of cross(t0, t1)
    const dot = t0x * t1x + t0z * t1z;
    const ang = Math.atan2(cross, dot);
    curv[i] = ang / (b - a);
  }
  // superelevation (bank) into the curve
  const bank = new Float64Array(N + 1);
  for (let i = 0; i <= N; i++) bank[i] = THREE.MathUtils.clamp(-curv[i] * 300, -0.11, 0.11);

  const route = {
    length: ROUTE_LENGTH,
    curve, pos, tan, curv, bank,
    // interpolated sample at arbitrary distance s (m)
    sample(s, out = {}) {
      const f = THREE.MathUtils.clamp(s, 0, N);
      const i = Math.floor(f), g = f - i, j = Math.min(N, i + 1);
      out.p = out.p || new THREE.Vector3();
      out.t = out.t || new THREE.Vector3();
      out.p.set(
        pos[i * 3] + (pos[j * 3] - pos[i * 3]) * g,
        pos[i * 3 + 1] + (pos[j * 3 + 1] - pos[i * 3 + 1]) * g,
        pos[i * 3 + 2] + (pos[j * 3 + 2] - pos[i * 3 + 2]) * g,
      );
      out.t.set(
        tan[i * 3] + (tan[j * 3] - tan[i * 3]) * g,
        tan[i * 3 + 1] + (tan[j * 3 + 1] - tan[i * 3 + 1]) * g,
        tan[i * 3 + 2] + (tan[j * 3 + 2] - tan[i * 3 + 2]) * g,
      ).normalize();
      out.k = curv[i] + (curv[j] - curv[i]) * g;
      out.b = bank[i] + (bank[j] - bank[i]) * g;
      // left vector (lateral +x is to the left of travel)
      out.left = out.left || new THREE.Vector3();
      out.left.crossVectors(up, out.t).normalize();
      return out;
    },
    // world position of a point at distance s, lateral offset x (x>0 = left)
    pointAt(s, x, out = new THREE.Vector3()) {
      const sm = this.sample(s, {});
      return out.copy(sm.p).addScaledVector(sm.left, x);
    },
  };
  return route;
}

// Deterministic value noise for terrain shaping.
function vnoise(x, z) {
  return (
    Math.sin(x * 0.013 + z * 0.021) * 0.55 +
    Math.sin(x * 0.031 - z * 0.017) * 0.3 +
    Math.sin(x * 0.0071 + z * 0.043) * 0.15
  );
}

// Terrain height at (s, x). Matches the road at the centre, drops at the
// shoulder, then rises into forested slopes and rocky peaks.
export function terrainHeight(route, s, x) {
  const sm = route.sample(s, {});
  const ax = Math.abs(x);
  const roadY = sm.p.y;
  if (ax <= ROAD_HALF + SHOULDER + 0.6) return roadY - 0.22 * Math.max(0, ax - (ROAD_HALF + SHOULDER));
  const d = ax - (ROAD_HALF + SHOULDER);
  const side = x > 0 ? 1 : -1;
  // uphill side rises faster
  const uphill = Math.max(0, -sm.k * side) * 0.5; // bank tells which side is uphill-ish
  const rise = 0.34 + 0.30 * uphill + 0.12 * vnoise(s * 0.01, x * 0.01);
  const h = roadY - 0.25 + d * rise + (vnoise(s * 0.05, x * 0.05) * 4.5 + vnoise(s * 0.013, x * 0.017) * 14) * Math.min(1, d / 45);
  return h;
}

// Layout of everything placed along the route, derived from the tables.
export function buildLayout(route) {
  const rng = mulberry32(20261120);
  const hazards = [];   // {id, type:'cone'|'barrier', s, x}
  const chalets = [];   // {s, x, rot}
  let hazardId = 0;

  // --- barriers on the outside of sustained sharp curves ---
  const usedCurve = new Set();
  for (let s = 60; s < ROUTE_LENGTH - 60; s += 10) {
    const k = Math.abs(route.curv[Math.round(s)]);
    if (k > 0.0052 && !usedCurve.has(Math.floor(s / 160))) {
      usedCurve.add(Math.floor(s / 160));
      const side = -Math.sign(route.curv[Math.round(s)]); // outside of the curve
      const x = side * (ROAD_HALF + 0.95);
      const n = 3 + Math.floor(rng() * 3);
      for (let i = 0; i < n; i++) {
        hazards.push({ id: 'h' + hazardId++, type: 'barrier', s: s - (n - 1) * 3.2 + i * 6.4, x });
      }
    }
  }
  // --- cone slaloms on a few gentler bends ---
  const slalomSeeds = [520, 1180, 2140, 2760];
  for (const s0 of slalomSeeds) {
    const n = 6;
    for (let i = 0; i < n; i++) {
      const side = i % 2 === 0 ? 1 : -1;
      hazards.push({ id: 'h' + hazardId++, type: 'cone', s: s0 + i * 11, x: side * 1.55 });
    }
  }
  // --- a few stray cones near the edge line ---
  for (let i = 0; i < 14; i++) {
    const s = 200 + rng() * (ROUTE_LENGTH - 400);
    hazards.push({ id: 'h' + hazardId++, type: 'cone', s, x: (rng() < 0.5 ? -1 : 1) * (ROAD_HALF - 0.4 - rng() * 0.6) });
  }
  hazards.sort((a, b) => a.s - b.s);

  // --- chalets on lay-bys ---
  const chaletSpots = [340, 1060, 1740, 2620, 2980];
  for (const s of chaletSpots) {
    const side = rng() < 0.5 ? 1 : -1;
    chalets.push({ s, x: side * (ROAD_HALF + SHOULDER + 9 + rng() * 7), seed: rng() });
  }

  // --- avalanche gallery (open on the valley side) ---
  const gallery = { s0: 1900, s1: 2016, side: 1 }; // pillars on +x side, open on -x side

  return { hazards, chalets, gallery, checkpoints: CHECKPOINTS.slice() };
}
