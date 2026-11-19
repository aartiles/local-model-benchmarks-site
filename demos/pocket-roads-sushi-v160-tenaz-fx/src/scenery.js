// src/scenery.js — the stage around Midnight Pass: the spruce forest (R5), and later
// the mountain silhouettes and chalets (T008) and the avalanche gallery (T009).
//
// Everything here is placed FROM THE ROAD GEOMETRY: a tree's position is
// roadSample(s) pushed along roadSide(s) by a lateral offset, so the forest follows
// the winding centreline and the elevation profile instead of sitting in a grid of
// hard-coded coordinates. The route length is read from road.js, never copied.
//
// Placement is deterministic: a seeded PRNG (mulberry32) drives every scatter, so the
// tree count and its distribution are the same on every load and the checks can rely
// on them. No Math.random() anywhere in this file.
//
// The trees are billboards: the supplied spruce-0/1/2.webp cut-outs (they carry real
// alpha channels) on a two-quad cross — a plane facing +z and one facing +x, sharing
// the texture, so the silhouette reads as 3-dimensional from any heading without
// having to rotate each tree toward the camera every frame. The cross is built once
// per texture with its width taken from that image's own aspect ratio, so the tree is
// never stretched, and it is drawn with an alpha cut-out (alphaTest) rather than
// blending, which keeps the depth order correct inside the forest.

import * as THREE from '../vendor/three.module.min.js';
import { ROAD_LENGTH_M, ROAD_HALF_WIDTH, SHOULDER_WIDTH_M, roadSample } from './road.js';

// The three supplied spruce cut-outs, in the order assets.js hands them over.
export const SPRUCE_KEYS = ['spruce-0', 'spruce-1', 'spruce-2'];

// Trees stand outside the shoulder so the drivable corridor stays clear (R4/R5) and
// the opening frame still reads as a view down the asphalt (T005).
export const TREE_MIN_LATERAL_M = ROAD_HALF_WIDTH + SHOULDER_WIDTH_M + 1.2; // 8.0 m

// The forest stops short of both ends: the start line and the finish keep their view.
export const FOREST_MARGIN_M = 14;

// One row per depth band. `lateral` is the distance from the centreline in metres,
// `wobble` scatters it, `step` is the spacing along the route, `height` the billboard
// height in metres (the width follows the texture's aspect). Near rows are dense and
// short, far rows sparse and tall, which is what gives the hillside its depth.
export const FOREST_ROWS = [
  { lateral: 10.5, wobble: 2.5, step: 19, height: [10, 16] },
  { lateral: 18.0, wobble: 4.5, step: 25, height: [13, 21] },
  { lateral: 29.0, wobble: 7.5, step: 33, height: [16, 27] },
];

// The spruce photos are daylight shots of a near-black tree; at dusk they must be
// dimmed and cooled to sit in the scene, and MeshBasicMaterial is unlit, so this tint
// IS the lighting. Fog (sky.js) finishes the depth.
const TREE_TINT = 0x6f7ea6;
const TREE_SINK_M = 0.45; // the trunk base drops just under the ground line
const SEED = 0x5052_4f5d; // 'PRos' — fixed, so the forest is the same every load

/** Small deterministic PRNG (mulberry32). Returns floats in [0, 1). */
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

/**
 * A two-quad billboard cross: unit height, base at y = 0, width = the image's own
 * aspect ratio, so a `scaleY` of h metres gives an undistorted tree.
 */
function billboardGeometry(THREE, aspect) {
  const hw = Math.max(0.05, aspect) / 2;
  // Two quads, +z-facing and +x-facing, both with the full image on them.
  const pos = new Float32Array([
    -hw, 0, 0, hw, 0, 0, hw, 1, 0, -hw, 1, 0, //
    0, 0, -hw, 0, 0, hw, 0, 1, hw, 0, 1, -hw,
  ]);
  const uv = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1]);
  const nor = new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0]);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  g.setIndex([0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7]);
  g.computeBoundingSphere();
  g.computeBoundingBox();
  return g;
}

/**
 * The spruce forest of R5: one InstancedMesh per supplied texture, holding every tree
 * that uses it (3.2 km of forest is ~800 billboards, which stays cheap that way).
 * @param {object} THREE the vendored Three.js namespace
 * @param {number} lengthM arc length the forest runs along
 * @param {object} textures { 'spruce-0': Texture, 'spruce-1': …, 'spruce-2': … }
 * @returns {{ group: object, trees: object[], count: number }}
 */
function buildForest(THREE, lengthM, textures) {
  const group = new THREE.Group();
  group.name = 'spruce-forest';
  group.userData = { requirement: 'R5', lengthM: lengthM, minLateralM: TREE_MIN_LATERAL_M };

  const random = makeRandom(SEED);
  let trees = []; // { s, lateral, side, x, y, z, height, texture }
  // The image aspect per cut-out: a billboard `h` metres tall is `aspect * h` wide,
  // so its crown reaches `aspect * h / 2` toward the road from the trunk.
  const imageAspect = (key) => {
    const img = textures && textures[key] && textures[key].image;
    return img && img.width && img.height ? img.width / img.height : 0.5;
  };
  // A spruce that stands inside the shed's footprint would poke through its roof
  // (the trees are 10–27 m tall, the deck is 7 m up), so the near row gives way to
  // the gallery. The span comes from the same constants buildGallery() uses.
  const shed = gallerySpanFor(lengthM);
  const shedS0 = shed.sStart - GALLERY_ROOF_CAP_M;
  const shedS1 = shed.sEnd + GALLERY_ROOF_CAP_M;
  const shedLat = GALLERY_ROOF_HALF_WIDTH_M + 2.2; // trunk clear of the eaves

  for (let side = 0; side < 2; side++) {
    const sign = side === 0 ? 1 : -1; // +1 = left of the centreline, -1 = right
    for (let r = 0; r < FOREST_ROWS.length; r++) {
      const row = FOREST_ROWS[r];
      const span = Math.max(0, lengthM - 2 * FOREST_MARGIN_M);
      if (span <= 0) continue;
      const n = Math.max(1, Math.floor(span / row.step));
      for (let i = 0; i < n; i++) {
        // Jittered along the route so the rows do not read as a fence.
        const s = FOREST_MARGIN_M + (i + random() * 0.85) * (span / n);
        const p = roadSample(s);
        const lateral = row.lateral + (random() * 2 - 1) * row.wobble;
        if (Math.abs(lateral) < TREE_MIN_LATERAL_M) continue;
        const off = sign * lateral;
        if (s > shedS0 && s < shedS1 && Math.abs(off) < shedLat) continue; // under the shed
        // roadSide(s): the horizontal left normal, y = 0 (road.js convention).
        const sx = -Math.cos(p.heading);
        const sz = Math.sin(p.heading);
        const x = p.x + sx * off;
        const z = p.z + sz * off;
        const y = p.y - TREE_SINK_M - random() * 0.5;
        const height = row.height[0] + random() * (row.height[1] - row.height[0]);
        // Turn the cross so one of its planes faces back toward the road, with a
        // little scatter so the stand does not look machined.
        const yaw = Math.atan2(-sx * off, -sz * off) + (random() - 0.5) * 0.6;
        const key = SPRUCE_KEYS[Math.floor(random() * SPRUCE_KEYS.length) % SPRUCE_KEYS.length];
        trees.push({ s, lateral: off, x, y, z, height, yaw, key });
      }
    }
  }

  // The trunk rule above cannot see the crown: the lateral-facing quad of a tall
  // spruce reaches inward by aspect * height / 2, so a tree whose trunk stands past
  // the eave still has its top through the deck. Drop those, measured from the inner
  // edge of the quad. (Done after placement so the seeded draw order, and with it the
  // whole rest of the forest, is unchanged.)
  trees = trees.filter((t) => {
    if (!(t.s > shedS0 && t.s < shedS1)) return true;
    const innerEdge = Math.abs(t.lateral) - (imageAspect(t.key) * t.height) / 2;
    return innerEdge >= GALLERY_ROOF_HALF_WIDTH_M;
  });

  const dummy = new THREE.Object3D();
  for (const key of SPRUCE_KEYS) {
    const texture = textures && textures[key];
    if (!texture || !texture.isTexture) {
      throw new Error(`buildScenery: the ${key} texture is missing — pass assets.textures (R5)`);
    }
    const aspect = imageAspect(key);
    const mine = trees.filter((t) => t.key === key);

    const material = new THREE.MeshBasicMaterial({
      name: `spruce-billboard-${key}`,
      map: texture,
      color: TREE_TINT,
      alphaTest: 0.5, // the cut-outs have real alpha; no blending, so depth is right
      transparent: false,
      side: THREE.DoubleSide,
      depthWrite: true,
      fog: true,
    });
    const mesh = new THREE.InstancedMesh(billboardGeometry(THREE, aspect), material, Math.max(1, mine.length));
    mesh.name = key;
    mesh.userData = { spruce: `${key}.webp`, aspect: aspect, treeCount: mine.length };
    mesh.frustumCulled = false; // the stand spans the whole route; per-instance culling is off
    for (let i = 0; i < mine.length; i++) {
      const t = mine[i];
      dummy.position.set(t.x, t.y, t.z);
      dummy.rotation.set(0, t.yaw, 0);
      // The geometry is one unit tall and `aspect` wide, so the height scale must be
      // uniform: scaling y alone would keep the width in metres and turn every spruce
      // into a pole.
      dummy.scale.set(t.height, t.height, t.height);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.count = mine.length;
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
    group.add(mesh);
  }

  return { group, trees, count: trees.length };
}

// ------------------------------------------------------- mountains (R6) -------
// The valley is ringed by jagged silhouette ridges: flat curtains of triangles that
// follow the centreline at a large lateral offset, drawn unlit (MeshBasicMaterial)
// with fog OFF, so they stay readable as distant rock instead of dissolving into the
// dusk fog (sky.js fogs everything out by 560 m, which would erase the range).
//
// The height of every ridge station is capped twice over:
//   * by its own lateral distance from the road (0.14 ×), so a ridge reads as a slope
//     rising out of the valley rather than a wall of one fixed height; and
//   by its distance from the OPENING eye (RIDGE_PEAK_TAN ×), which is what keeps the
//     peaks below the top fifth of the first frame — the dusk sky band that
//     T006.dusk-sky measures — and out of the lower half T005.road-rendered needs.
// The second cap is a property of the start pose, not a fudge: main.js derives that
// pose from roadSample(-2) / roadSample(26), so it is recomputed from the geometry.
export const MOUNTAIN_MIN_LATERAL_M = 180; // nothing here counts as a mountain nearer
export const RIDGE_PEAK_TAN = 0.105; // 6° above the eye: the highest peak in the frame
export const RIDGE_BASE_TAN = 0.0875; // 5° below it: the ridge foot, under the horizon
export const RIDGE_LATERAL_TAN = 0.14; // height as a fraction of distance from the road
export const RIDGE_FOOT_MAX_M = 30; // how far below the local road a ridge foot may sink
export const RIDGE_MIN_HEIGHT_M = 12; // every silhouette station is at least this tall

// One entry per depth band. `lateral` is the mean distance from the centreline,
// `wobble` scatters it, `step` the spacing of the silhouette stations, `dropFrac` how
// far below the local road elevation the foot sits, and `color` the hand-painted
// atmospheric perspective: near rock darkest, far rock closest to the dusk sky.
export const MOUNTAIN_BANDS = [
  { lateral: 210, wobble: 34, step: 74, dropFrac: 0.1, color: 0x191f35 },
  { lateral: 430, wobble: 52, step: 96, dropFrac: 0.1, color: 0x202741 },
  { lateral: 700, wobble: 74, step: 122, dropFrac: 0.11, color: 0x27304d },
  { lateral: 1050, wobble: 96, step: 150, dropFrac: 0.11, color: 0x2e3857 },
];

/**
 * A smooth-but-jagged ridge profile in 0..1: a few sine harmonics with seeded phases,
 * so the skyline has long slopes and sharp tops and is the same on every load.
 */
function ridgeProfile(random) {
  const harmonics = [];
  let sum = 0;
  for (let k = 0; k < 4; k++) {
    const amp = 1 / (k + 1);
    sum += amp;
    harmonics.push({ freq: (0.03 + 0.11 * random()) * (k + 1), phase: random() * Math.PI * 2, amp });
  }
  return function profile(i) {
    let v = 0;
    for (const h of harmonics) v += h.amp * Math.sin(i * h.freq + h.phase);
    return 0.5 + 0.5 * (v / sum);
  };
}

/**
 * The starting eye position, derived the same way main.js derives the start camera
 * pose (roadSample(-2), 1.6 m above the tarmac). Used only to cap how high a peak may
 * stand in the opening frame; nothing here moves the camera.
 */
function openingEye() {
  const e = roadSample(-2);
  return { x: e.x, y: e.y + 1.6, z: e.z };
}

/**
 * A coarse centreline table plus a nearest-point search, so a ridge station can be
 * measured against EVERY stretch of the winding route.
 */
const ROAD_TABLE_STEP_M = 8;

function makeRoadTable(lengthM, step = ROAD_TABLE_STEP_M) {
  const table = [];
  for (let s = 0; s <= lengthM + 0.001; s += step) {
    const p = roadSample(s);
    table.push({ s, x: p.x, z: p.z });
  }
  return table;
}

/** Push (x, z) outward along the direction away from the nearest road point. */
function clearOfRoad(table, step, x, z, minM) {
  let px = x;
  let pz = z;
  const last = table[table.length - 1].s;
  for (let pass = 0; pass < 3; pass++) {
    let best = table[0];
    let bd = Infinity;
    for (const c of table) {
      const d = (c.x - px) * (c.x - px) + (c.z - pz) * (c.z - pz);
      if (d < bd) {
        bd = d;
        best = c;
      }
    }
    let dist = Math.sqrt(bd);
    let s = best.s;
    for (let t = Math.max(0, best.s - step); t <= Math.min(last, best.s + step); t += step / 4) {
      const p = roadSample(t);
      const d = Math.hypot(p.x - px, p.z - pz);
      if (d < dist) {
        dist = d;
        s = t;
      }
    }
    if (dist >= minM) return { x: px, z: pz, s, dist };
    const p = roadSample(s);
    const ux = dist > 1e-6 ? (px - p.x) / dist : -Math.cos(p.heading);
    const uz = dist > 1e-6 ? (pz - p.z) / dist : Math.sin(p.heading);
    const push = minM - dist + 0.5;
    px += ux * push;
    pz += uz * push;
  }
  return { x: px, z: pz, s: 0, dist: minM };
}

/**
 * The mountain silhouettes of R6: one jagged ridge curtain per band per side, ringing
 * the valley well outside the forest.
 * @returns {{ group: object, ridges: object[], peaks: object[] }}
 */
function buildMountains(THREE, lengthM) {
  const group = new THREE.Group();
  group.name = 'mountains';
  group.userData = { requirement: 'R6', minLateralM: MOUNTAIN_MIN_LATERAL_M, bands: MOUNTAIN_BANDS.length };

  const eye = openingEye();
  const table = makeRoadTable(lengthM);
  const ridges = [];
  const peaks = []; // { x, y, z, s, lateral } for the chalet/hazard planners and checks

  for (let side = 0; side < 2; side++) {
    const sign = side === 0 ? 1 : -1;
    for (let b = 0; b < MOUNTAIN_BANDS.length; b++) {
      const band = MOUNTAIN_BANDS[b];
      const random = makeRandom((SEED ^ (b * 0x9e3779b9) ^ (side * 0x85ebca6b)) >>> 0);
      const profile = ridgeProfile(random);
      const n = Math.max(2, Math.floor(lengthM / band.step));
      const pos = [];
      const idx = [];
      let minRoad = Infinity;
      for (let i = 0; i <= n; i++) {
        const s = Math.min(lengthM, i * band.step);
        const p = roadSample(s);
        const lateral = band.lateral + (random() * 2 - 1) * band.wobble;
        const sx = -Math.cos(p.heading);
        const sz = Math.sin(p.heading);
        // Clear of the WHOLE route, not just this station: on the inside of a bend a
        // large normal offset can fold back toward the road further along.
        const placed = clearOfRoad(
          table,
          ROAD_TABLE_STEP_M,
          p.x + sx * sign * lateral,
          p.z + sz * sign * lateral,
          MOUNTAIN_MIN_LATERAL_M
        );
        const x = placed.x;
        const z = placed.z;
        const fromRoad = Math.max(placed.dist, Math.hypot(x - p.x, z - p.z));
        const fromEye = Math.max(1, Math.hypot(x - eye.x, z - eye.z));
        // The peak stands ABOVE the local road elevation — that is what makes it read
        // as a mountain against the sky — and the ceiling keeps it under the top fifth
        // of the opening frame (the dusk sky band T006.dusk-sky measures).
        const peakCeil = eye.y + RIDGE_PEAK_TAN * fromEye;
        const rise = Math.min(RIDGE_LATERAL_TAN * fromRoad, RIDGE_PEAK_TAN * fromEye) * (0.35 + 0.65 * profile(i));
        const topY = Math.min(p.y + Math.max(4, rise), peakCeil);
        // The foot drops below the road, but never below the eye's own horizon cone, so
        // the curtain has no gap under the skyline.
        const floor = Math.max(
          eye.y - RIDGE_BASE_TAN * fromEye,
          p.y - Math.min(band.dropFrac * fromRoad, RIDGE_FOOT_MAX_M)
        );
        const baseY = Math.min(floor, topY - RIDGE_MIN_HEIGHT_M);
        pos.push(x, baseY, z, x, topY, z);
        if (i > 0) {
          const a = (i - 1) * 2;
          idx.push(a, a + 1, a + 3, a, a + 3, a + 2);
        }
        if (i % 3 === 0) peaks.push({ x, y: topY, z, s, lateral: sign * lateral, roadDist: placed.dist });
        minRoad = Math.min(minRoad, placed.dist);
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3));
      geometry.setIndex(idx);
      geometry.computeBoundingSphere();
      geometry.computeBoundingBox();
      const material = new THREE.MeshBasicMaterial({
        name: `mountain-ridge-${b}-${side}`,
        color: band.color,
        side: THREE.DoubleSide, // the curtain is seen from both sides as the pass winds
        fog: false, // distant rock must stay readable, so it opts out of the dusk fog
        depthWrite: true,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = `mountain-ridge-${b}-${side}`;
      mesh.userData = {
        band: b,
        side: side === 0 ? 'left' : 'right',
        meanLateralM: band.lateral,
        stations: n + 1,
        minLateralM: MOUNTAIN_MIN_LATERAL_M,
      };
      mesh.frustumCulled = false; // the ridge spans the whole route
      group.add(mesh);
      ridges.push(mesh);
    }
  }
  return { group, ridges, peaks };
}

// ---------------------------------------------------------- chalets (R7) ------
// Simple alpine houses beside the road: a box of walls with a two-slope gable roof on
// top, placed from roadSample() and pushed along the left normal, outside the
// shoulder, the same way the forest is. They are lit (unlike the silhouettes), so the
// dusk sun and hemisphere light give the roofs and walls some form.
export const CHALET_MIN_LATERAL_M = TREE_MIN_LATERAL_M + 4; // 12 m from the centreline
export const CHALET_LATERAL_RANGE = [12, 24];
export const CHALET_FIRST_S = 55; // clear of the start line and of the opening frame
export const CHALET_END_MARGIN_M = 40;
export const CHALET_COUNT = 12;

const CHALET_WALL_COLOR = 0x8d7d68;
const CHALET_ROOF_COLOR = 0x39415f;

/**
 * A gable roof: two sloping quads and two triangular gables, base at y = 0, ridge
 * along z at y = rise. Built non-indexed with DoubleSide, so the winding is free.
 */
function roofGeometry(THREE, width, depth, rise) {
  const hw = width / 2;
  const hd = depth / 2;
  const A = [-hw, 0, -hd];
  const B = [hw, 0, -hd];
  const C = [hw, 0, hd];
  const D = [-hw, 0, hd];
  const E = [0, rise, -hd];
  const F = [0, rise, hd];
  const tri = (a, b, c) => [...a, ...b, ...c];
  const pos = new Float32Array([
    ...tri(A, D, F), ...tri(A, F, E), // left slope
    ...tri(B, E, F), ...tri(B, F, C), // right slope
    ...tri(A, B, E), // back gable
    ...tri(D, F, C), // front gable
  ]);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.computeVertexNormals();
  g.computeBoundingSphere();
  g.computeBoundingBox();
  return g;
}

/**
 * The chalets of R7: `count` houses scattered beside the road, each a group holding a
 * `chalet-N-wall` box and a `chalet-N-roof` prism, turned to face the centreline.
 * @returns {{ group: object, chalets: object[], placements: object[] }}
 */
function buildChalets(THREE, lengthM) {
  const group = new THREE.Group();
  group.name = 'chalets';
  group.userData = { requirement: 'R7', minLateralM: CHALET_MIN_LATERAL_M };

  const random = makeRandom((SEED ^ 0x1b873593) >>> 0);
  const span = Math.max(0, lengthM - CHALET_FIRST_S - CHALET_END_MARGIN_M);
  const n = span > 0 ? CHALET_COUNT : 0;
  const chalets = [];
  const placements = [];

  for (let i = 0; i < n; i++) {
    const s = CHALET_FIRST_S + ((i + 0.15 + random() * 0.7) * span) / n;
    const p = roadSample(s);
    const sign = i % 2 === 0 ? 1 : -1;
    const lateral = CHALET_LATERAL_RANGE[0] + random() * (CHALET_LATERAL_RANGE[1] - CHALET_LATERAL_RANGE[0]);
    if (lateral < CHALET_MIN_LATERAL_M) continue;
    const sx = -Math.cos(p.heading);
    const sz = Math.sin(p.heading);
    const x = p.x + sx * sign * lateral;
    const z = p.z + sz * sign * lateral;
    const y = p.y - 0.3; // the footings sit just under the ground line
    const yaw = Math.atan2(p.x - x, p.z - z); // the gable end looks at the road

    const width = 5.2 + random() * 3.4;
    const depth = 6.4 + random() * 4.2;
    const wallHeight = 3.4 + random() * 1.6;
    const rise = 2.2 + random() * 1.4;

    const house = new THREE.Group();
    house.name = `chalet-${i}`;
    house.userData = { s, lateral: sign * lateral, width, depth, wallHeight, roofRise: rise };
    house.position.set(x, y, z);
    house.rotation.set(0, yaw, 0);

    const wall = new THREE.Mesh(
      new THREE.BoxGeometry(width, wallHeight, depth),
      new THREE.MeshLambertMaterial({ name: `chalet-wall-${i}`, color: CHALET_WALL_COLOR, fog: true })
    );
    wall.name = `chalet-${i}-wall`;
    wall.position.set(0, wallHeight / 2, 0);
    const roof = new THREE.Mesh(
      roofGeometry(THREE, width + 0.9, depth + 0.7, rise),
      new THREE.MeshLambertMaterial({
        name: `chalet-roof-${i}`,
        color: CHALET_ROOF_COLOR,
        fog: true,
        side: THREE.DoubleSide,
      })
    );
    roof.name = `chalet-${i}-roof`;
    roof.position.set(0, wallHeight, 0);
    house.add(wall);
    house.add(roof);

    group.add(house);
    chalets.push(house);
    placements.push({ s, lateral: sign * lateral, x, y, z, height: wallHeight + rise, yaw, key: 'chalet' });
  }
  return { group, chalets, placements };
}

// ------------------------------------------------- avalanche gallery (R8) -----
// A snow shed: the road runs under a roof carried on rows of posts, with both sides
// left open. It is built from the centreline the same way the forest is — every
// station is roadSample(s), and the roof and posts are placed along the left normal
// — so it follows the bends and the grade instead of standing in a straight box.
//
// The span sits in the middle of the pass (s 1500–1760), where the route is far
// enough from the opening camera that the structure does not cover the dusk sky band
// T006.dusk-sky measures, and the roof height is measured from the LOCAL road
// elevation, so it stays the same distance above the tarmac through the 18 % climb.
export const GALLERY_S_START = 1500;
export const GALLERY_SPAN_M = 260; // "a stretch of a few hundred metres" (R8)
export const GALLERY_MIN_SPAN_M = 120; // the shortest span the card accepts
export const GALLERY_CLEARANCE_M = 7.0; // roof underside above the tarmac at its station
export const GALLERY_ROOF_HALF_WIDTH_M = 8.8; // eaves: past the posts, past the shoulder
export const GALLERY_ROOF_THICKNESS_M = 0.55;
export const GALLERY_ROOF_PITCH_M = 0.95; // the deck rises toward the mountain-side eave
export const GALLERY_ROOF_STEP_M = 4; // ribbon station spacing along the span
export const GALLERY_ROOF_CAP_M = 2.5; // the deck overhangs both portal ends
export const GALLERY_POST_LATERAL_M = 7.6; // outside asphalt (5) + shoulder (1.8)
export const GALLERY_POST_STEP_M = 8; // frame spacing along the span
export const GALLERY_POST_SECTION_M = 0.62;
export const GALLERY_POST_HEIGHT_M = 7.6; // top at the roof underside, foot sunk 0.6 m

const GALLERY_ROOF_COLOR = 0x333a55;
const GALLERY_TIMBER_COLOR = 0x5d5142;
const GALLERY_PLATE_COLOR = 0x453f52;

/** The road frame at `s`: the centreline sample plus its horizontal left normal. */
function galleryFrame(s) {
  const p = roadSample(s);
  return { s, p, sx: -Math.cos(p.heading), sz: Math.sin(p.heading), yaw: p.heading };
}

/**
 * The span the shed covers, clamped to stay inside a route of `lengthM` metres.
 * buildForest() reads it too, so the trees and the structure never disagree.
 */
export function gallerySpanFor(lengthM) {
  const sStart = Math.max(40, Math.min(GALLERY_S_START, lengthM - GALLERY_MIN_SPAN_M - 60));
  const sEnd = Math.min(lengthM - 40, sStart + GALLERY_SPAN_M);
  return { sStart, sEnd };
}

/** A point `lateral` metres along the left normal, at height `y`. */
function galleryPlace(f, lateral, y) {
  return [f.p.x + f.sx * lateral, y, f.p.z + f.sz * lateral];
}

/**
 * A closed tube swept through a list of cross-section rings (each an array of
 * [x, y, z] points, in a consistent order). Non-indexed-free: one vertex per ring
 * point per station, quads between consecutive stations.
 */
function ribbonGeometry(THREE, rings) {
  const n = rings[0].length;
  const pos = [];
  const idx = [];
  for (const ring of rings) for (const pt of ring) pos.push(pt[0], pt[1], pt[2]);
  for (let i = 0; i + 1 < rings.length; i++) {
    const a = i * n;
    const b = (i + 1) * n;
    for (let j = 0; j < n; j++) {
      const k = (j + 1) % n;
      idx.push(a + j, b + j, b + k, a + j, b + k, a + k);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  g.computeBoundingBox();
  g.computeBoundingSphere();
  return g;
}

/**
 * The open-sided avalanche gallery of R8: a roof ribbon on posts, with wall-plates,
 * rafters and portal headers, all placed from roadSample(). Nothing closes the
 * sides: the only geometry nearer the centreline than the posts is the roof, and it
 * is `GALLERY_CLEARANCE_M` above the tarmac.
 * @returns {{ group, roof, span, placements }} placements is one record per post
 */
function buildGallery(THREE, lengthM) {
  const group = new THREE.Group();
  group.name = 'avalanche-gallery';

  // Keep the structure on the route even if the road is shorter than planned.
  const span = gallerySpanFor(lengthM);
  const sStart = span.sStart;
  const sEnd = span.sEnd;
  group.userData = {
    requirement: 'R8',
    sStart,
    sEnd,
    spanM: sEnd - sStart,
    clearanceM: GALLERY_CLEARANCE_M,
    postLateralM: GALLERY_POST_LATERAL_M,
    openSides: true,
  };
  const placements = [];
  if (sEnd - sStart < GALLERY_MIN_SPAN_M) return { group, roof: null, span, placements };

  const hw = GALLERY_ROOF_HALF_WIDTH_M;
  const clear = GALLERY_CLEARANCE_M;

  // ---- the deck: a closed ribbon, so the underside the driver sees is real ----
  const bottom = [-hw, -hw / 2, 0, hw / 2, hw]; // vertices over the asphalt, too
  const rings = [];
  for (let s = sStart - GALLERY_ROOF_CAP_M; s <= sEnd + GALLERY_ROOF_CAP_M + 1e-6; s += GALLERY_ROOF_STEP_M) {
    const f = galleryFrame(Math.min(lengthM, s));
    const y0 = f.p.y + clear; // underside, level across the road
    const top = (l) => y0 + GALLERY_ROOF_THICKNESS_M + GALLERY_ROOF_PITCH_M * ((l + hw) / (2 * hw));
    rings.push([
      ...bottom.map((l) => galleryPlace(f, l, y0)), // soffit, left to right
      galleryPlace(f, hw, top(hw)), // right eave
      ...[hw / 2, 0, -hw / 2].map((l) => galleryPlace(f, l, top(l))), // deck, right to left
      galleryPlace(f, -hw, top(-hw)), // left eave
    ]);
  }
  const roof = new THREE.Mesh(
    ribbonGeometry(THREE, rings),
    new THREE.MeshLambertMaterial({ name: 'gallery-roof', color: GALLERY_ROOF_COLOR, fog: true, side: THREE.DoubleSide })
  );
  roof.name = 'gallery-roof-slab';
  roof.userData = { sStart: rings.length ? sStart - GALLERY_ROOF_CAP_M : 0, spanM: sEnd - sStart };
  group.add(roof);

  // ---- the frames: posts on both sides, a rafter each, wall-plates on top -----
  const frameS = [];
  for (let s = sStart + 1; s <= sEnd - 1 + 1e-6; s += GALLERY_POST_STEP_M) frameS.push(s);
  if (frameS[0] > sStart + 3) frameS.unshift(sStart + 1);
  if (sEnd - 1 - frameS[frameS.length - 1] > 3) frameS.push(sEnd - 1);

  const postHeight = GALLERY_POST_HEIGHT_M;
  const dummy = new THREE.Object3D();
  const postGeo = new THREE.BoxGeometry(GALLERY_POST_SECTION_M, postHeight, GALLERY_POST_SECTION_M);
  const postMat = new THREE.MeshLambertMaterial({ name: 'gallery-post', color: GALLERY_TIMBER_COLOR, fog: true });
  const posts = new THREE.InstancedMesh(postGeo, postMat, frameS.length * 2);
  posts.name = 'gallery-posts';
  posts.frustumCulled = false; // the shed spans a long stretch of a winding route
  let pi = 0;
  for (const s of frameS) {
    const f = galleryFrame(s);
    const y0 = f.p.y + clear; // the post head meets the roof underside
    for (const sign of [1, -1]) {
      const lateral = sign * GALLERY_POST_LATERAL_M;
      const x = f.p.x + f.sx * lateral;
      const z = f.p.z + f.sz * lateral;
      const y = y0 - postHeight / 2; // foot sinks 0.6 m under the ground line
      dummy.position.set(x, y, z);
      dummy.rotation.set(0, f.yaw, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      posts.setMatrixAt(pi++, dummy.matrix);
      placements.push({ s, lateral, x, y, z, height: postHeight, yaw: f.yaw, key: 'gallery-post' });
    }
  }
  posts.count = pi;
  posts.instanceMatrix.needsUpdate = true;
  posts.computeBoundingSphere();
  group.add(posts);

  // Wall-plates: a beam along the heads of each row of posts, tying them together.
  const frames = frameS.map(galleryFrame);
  const rectRing = (f, lateral, y, halfAcross, halfTall) => {
    const pt = (dl, dy) => [f.p.x + f.sx * (lateral + dl), y + dy, f.p.z + f.sz * (lateral + dl)];
    const w = halfAcross, t = halfTall;
    return [pt(-w, -t), pt(w, -t), pt(w, t), pt(-w, t)];
  };
  for (const sign of [1, -1]) {
    const plate = new THREE.Mesh(
      ribbonGeometry(
        THREE,
        frames.map((f) => rectRing(f, sign * GALLERY_POST_LATERAL_M, f.p.y + clear - 0.3, 0.34, 0.3))
      ),
      new THREE.MeshLambertMaterial({ name: 'gallery-plate', color: GALLERY_PLATE_COLOR, fog: true, side: THREE.DoubleSide })
    );
    plate.name = `gallery-plate-beam-${sign > 0 ? 'left' : 'right'}`;
    group.add(plate);
  }

  // Rafters: a cross-beam under the deck at every frame, so the roof reads as
  // carried rather than floating.
  const rafter = new THREE.InstancedMesh(
    new THREE.BoxGeometry(2 * hw + 0.5, 0.32, 0.42),
    new THREE.MeshLambertMaterial({ name: 'gallery-rafter', color: GALLERY_PLATE_COLOR, fog: true }),
    frameS.length
  );
  rafter.name = 'gallery-rafters';
  rafter.frustumCulled = false;
  for (let i = 0; i < frameS.length; i++) {
    const f = galleryFrame(frameS[i]);
    dummy.position.set(f.p.x, f.p.y + clear - 0.16, f.p.z);
    // rotation.y = yaw puts the box's local +x on the road's lateral axis (the same
    // convention as the posts above) and its 0.42 m depth along the route, so the
    // rafter is a CROSS-beam under the deck. Math.PI/2 - yaw would turn it lengthwise
    // into the shed, where it hangs over the asphalt.
    dummy.rotation.set(0, f.yaw, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    rafter.setMatrixAt(i, dummy.matrix);
  }
  rafter.count = frameS.length;
  rafter.instanceMatrix.needsUpdate = true;
  rafter.computeBoundingSphere();
  group.add(rafter);

  // Portal headers at both ends: the entrance frames the road passes through.
  for (const s of [sStart, sEnd]) {
    const f = galleryFrame(s);
    const header = new THREE.Mesh(
      new THREE.BoxGeometry(2 * GALLERY_POST_LATERAL_M + GALLERY_POST_SECTION_M, 0.6, 0.5),
      new THREE.MeshLambertMaterial({ name: 'gallery-portal', color: GALLERY_TIMBER_COLOR, fog: true })
    );
    header.name = `gallery-portal-beam-${Math.round(s)}`;
    header.position.set(f.p.x, f.p.y + clear - 0.45, f.p.z);
    header.rotation.set(0, f.yaw, 0); // across the road, joining the two posts of the frame
    group.add(header);
  }

  return { group, roof, span, placements };
}

// ---------------------------------------------------------- terrain (T034) ----
// The valley floor and the hillside beside the road. Before this there was NO ground
// mesh at all: the sky panorama's own below-horizon band showed through as "ground"
// (measured: 76–91 % of the pixels below the horizon line were unchanged when the
// backdrop was hidden), which is what read as a flat slab with a hard straight edge.
//
// The surface is a grid swept along the route: one row per lateral offset, one station
// every TERRAIN_STEP_M metres, on both sides. Heights follow the LOCAL road elevation
// and rise outward, capped by the same 6° ceiling as the ridges (RIDGE_PEAK_TAN) so the
// skyline stays the mountains and the top fifth of the opening frame stays sky (T005 /
// T006 / T008 all measure that frame). Colour is per-vertex, so the ground has real
// variation instead of one flat tint, and it is lit (Lambert) so the dusk sun rakes it.
export const TERRAIN_STEP_M = 6; // fine enough that the near ground reads as texture, not facets
export const TERRAIN_END_MARGIN_M = 45; // matches road.js's ribbon extension, no cut-off
export const TERRAIN_INNER_LATERAL_M = ROAD_HALF_WIDTH + SHOULDER_WIDTH_M - 0.1; // 6.7 m
export const TERRAIN_OUTER_LATERAL_M = 215; // meets the first ridge band's foot
export const TERRAIN_SINK_M = 0.35; // the inner edge tucks under the shoulder
export const TERRAIN_PEAK_TAN = RIDGE_PEAK_TAN; // 6° above the local road, like the ridges
// lateral offset (m) and the rise above the local road it is allowed to reach (m).
export const TERRAIN_ROWS = [
  { lateral: 6.7, rise: 0 },
  { lateral: 11, rise: 0.5 },
  { lateral: 18, rise: 1.3 },
  { lateral: 28, rise: 2.4 },
  { lateral: 42, rise: 3.7 },
  { lateral: 60, rise: 5.2 },
  { lateral: 85, rise: 6.8 },
  { lateral: 120, rise: 8.5 },
  { lateral: 165, rise: 10 },
  { lateral: 215, rise: 11.5 },
];

// Dusk ground palette, mixed per vertex: shadowed earth under the treeline, snow that
// still holds the last light on the open slope, and cool scree between them.
const TERRAIN_PALETTE = [
  [0x3d, 0x45, 0x5e], // earth / shade — kept clearly lighter than the tarmac, whose
  [0x53, 0x5c, 0x76], //   measured signature T033 must stay 25 apart from (per-ch RMS)
  [0x7b, 0x7a, 0x92], // lit snowfield
  [0x4a, 0x4e, 0x66], // scree
];

/**
 * A smooth 2-D seeded bump field in -1..1 (station x row), so the hillside has long
 * folds rather than per-vertex jitter. No Math.random: same ground every load.
 */
function terrainBumps(random) {
  const waves = [];
  for (let k = 0; k < 5; k++) {
    waves.push({
      fs: (0.05 + 0.13 * random()) * (k + 1),
      fr: (0.15 + 0.5 * random()),
      phase: random() * Math.PI * 2,
      amp: 1 / (k + 1),
    });
  }
  let sum = 0;
  for (const w of waves) sum += w.amp;
  return (i, r) => {
    let v = 0;
    for (const w of waves) v += w.amp * Math.sin(i * w.fs + r * w.fr + w.phase);
    return v / sum;
  };
}

/**
 * The ground beside the road, both sides, for the whole route.
 * @returns {{ group: object, panels: object[], vertices: number }}
 */
function buildTerrain(THREE, lengthM) {
  const group = new THREE.Group();
  group.name = 'terrain';
  group.userData = {
    requirement: 'R6',
    stepM: TERRAIN_STEP_M,
    innerLateralM: TERRAIN_INNER_LATERAL_M,
    outerLateralM: TERRAIN_OUTER_LATERAL_M,
    rows: TERRAIN_ROWS.length,
  };
  const eye = openingEye();
  const panels = [];
  let vertices = 0;

  for (let side = 0; side < 2; side++) {
    const sign = side === 0 ? 1 : -1;
    const random = makeRandom((SEED ^ (side * 0x85ebca6b) ^ 0x2f1b3d) >>> 0);
    const bumps = terrainBumps(random);
    const n = Math.max(2, Math.ceil((lengthM + 2 * TERRAIN_END_MARGIN_M) / TERRAIN_STEP_M));
    const rows = TERRAIN_ROWS.length;
    const pos = new Float32Array((n + 1) * rows * 3);
    const col = new Float32Array((n + 1) * rows * 3);
    const idx = [];
    let v = 0;
    for (let i = 0; i <= n; i++) {
      const s = Math.min(lengthM, -TERRAIN_END_MARGIN_M + i * TERRAIN_STEP_M);
      const p = roadSample(s);
      const sx = -Math.cos(p.heading);
      const sz = Math.sin(p.heading);
      for (let r = 0; r < rows; r++) {
        const row = TERRAIN_ROWS[r];
        const lateral = row.lateral;
        const x = p.x + sx * sign * lateral;
        const z = p.z + sz * sign * lateral;
        // The bump grows with distance from the road, so the near ground stays flat
        // and the far hillside gets its folds.
        const amp = 0.25 + 0.02 * lateral;
        let y = p.y - TERRAIN_SINK_M + row.rise + amp * bumps(i, r + sign * 0.37);
        // Two ceilings, both relative to the local road / the opening eye.
        y = Math.min(y, p.y + TERRAIN_PEAK_TAN * lateral);
        const fromEye = Math.max(1, Math.hypot(x - eye.x, z - eye.z));
        y = Math.min(y, eye.y + TERRAIN_PEAK_TAN * fromEye);
        pos[v * 3] = x;
        pos[v * 3 + 1] = y;
        pos[v * 3 + 2] = z;
        // Colour: a seeded mix, biased toward snow the higher and farther out it gets,
        // with a fine speckle so no two neighbouring patches are the same tint.
        const t = Math.max(0, Math.min(1, 0.5 + 0.5 * bumps(i * 2 + 1, r * 3 + 2)));
        const altitude = Math.max(0, Math.min(1, (y - p.y) / Math.max(1, row.rise || 1)));
        const pick = t * 0.55 + altitude * 0.3 + 0.15 * random();
        const pal = TERRAIN_PALETTE;
        const f = Math.max(0, Math.min(pal.length - 1.001, pick * (pal.length - 1)));
        const k = Math.floor(f);
        const mix = f - k;
        const a = pal[k];
        const b = pal[k + 1];
        const speck = 0.78 + 0.44 * random();
        col[v * 3] = ((a[0] + (b[0] - a[0]) * mix) / 255) * speck;
        col[v * 3 + 1] = ((a[1] + (b[1] - a[1]) * mix) / 255) * speck;
        col[v * 3 + 2] = ((a[2] + (b[2] - a[2]) * mix) / 255) * speck;
        v++;
      }
    }
    for (let i = 0; i < n; i++) {
      for (let r = 0; r < rows - 1; r++) {
        const a = i * rows + r;
        const b = a + rows;
        idx.push(a, b, a + 1, a + 1, b, b + 1);
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(col, 3));
    geometry.setIndex(idx);
    geometry.computeVertexNormals();
    geometry.computeBoundingSphere();
    geometry.computeBoundingBox();
    const material = new THREE.MeshLambertMaterial({
      name: `terrain-ground-${side === 0 ? 'left' : 'right'}`,
      color: 0xffffff, // the per-vertex colour IS the tint
      vertexColors: true,
      fog: true,
      side: THREE.DoubleSide, // the hillside is seen from both sides as the pass winds
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = `terrain-ground-${side === 0 ? 'left' : 'right'}`;
    mesh.userData = { side: side === 0 ? 'left' : 'right', stations: n + 1, rows, vertices: v };
    mesh.frustumCulled = false; // the strip spans the whole route
    group.add(mesh);
    panels.push(mesh);
    vertices += v;
  }
  return { group, panels, vertices };
}

/**
 * Build the scenery around the road. Returns the pieces by name so later cards can
 * add to the same group.
 * @param {object|number} road the main.js road handle (its lengthM is used) or a
 *        route length in metres; the default is road.js's ROAD_LENGTH_M
 * @param {object} textures the spruce cut-outs from assets.textures
 * @returns {{ group, forest, mountains, chalets, gallery, treeCount, placements }}
 */
export function buildScenery(road, textures) {
  const lengthM =
    typeof road === 'number' && road > 0
      ? road
      : road && typeof road.lengthM === 'number' && road.lengthM > 0
        ? road.lengthM
        : ROAD_LENGTH_M;

  const group = new THREE.Group();
  group.name = 'scenery';
  group.userData = { roadLengthM: lengthM };

  // T034: the hillside the road is cut into. Built first so it sits under the trees.
  const terrain = buildTerrain(THREE, lengthM);
  group.add(terrain.group);

  const forest = buildForest(THREE, lengthM, textures);
  group.add(forest.group);

  // T009: the avalanche gallery, placed from roadSample() the same way.
  const mountains = buildMountains(THREE, lengthM);
  group.add(mountains.group);
  const chalets = buildChalets(THREE, lengthM);
  group.add(chalets.group);
  const gallery = buildGallery(THREE, lengthM);
  group.add(gallery.group);

  return {
    group,
    forest: forest.group,
    terrain: terrain.group,
    mountains: mountains.group,
    chalets: chalets.group,
    gallery: gallery.group,
    // The covered arc length, exposed so the checks and the later hazard /
    // checkpoint cards can reason about the shed without parsing meshes.
    gallerySpan: gallery.span,
    galleryPostCount: gallery.placements.length,
    treeCount: forest.count,
    mountainCount: mountains.ridges.length,
    chaletCount: chalets.chalets.length,
    placements: forest.trees.concat(chalets.placements, gallery.placements),
    mountainPeaks: mountains.peaks,
    chaletPlacements: chalets.placements,
    lengthM,
  };
}
