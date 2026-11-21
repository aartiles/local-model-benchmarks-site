// Stage geometry for Midnight Pass — road ribbon, edges, barriers, cones,
// sky, spruce forest, mountains, chalets, avalanche gallery.
//
// Two layers:
//   1. Pure math core (computeRoad, hazardFractions) — no DOM, no three.js,
//      node-importable. Produces a flat vertex list for the ribbon and the
//      cone/barrier placement fractions. Checks exercise this layer.
//   2. buildStage(scene, route, cfg) — three.js scene construction, called
//      from main.js.
//
// The ribbon is a flat strip sampled every ROAD_STEP meters of arclength:
// at each sample the centerline position is offset laterally by
// ±roadWidth/2 along route.at(d).right. UVs map road-grain.webp with the
// v coordinate advancing 1 per ROAD_TEX_REPEAT meters so the grain scales
// with distance, not segment count.

import { config } from "./config.js";

export const ROAD_WIDTH = config.roadWidth; // meters, full width
const ROAD_STEP = 2; // meters of arclength per ribbon vertex pair
const ROAD_TEX_REPEAT = 8; // meters of route per one texture tile in v

// --- Hazard placement -------------------------------------------------------
// Cones line the hairpin (fractions 0.55..0.66 of the route) and a second
// S entry (0.80..0.84). Barriers sit at fixed hazard spots.
// Single source of truth: config.coneFractions / config.barrierFractions.

export const CONE_FRACTIONS = config.coneFractions;
export const BARRIER_FRACTIONS = config.barrierFractions;

// Terrain profile constants (shared by buildTerrain + groundHeightAt so the
// pure core and the three.js build agree on where the ground is).
export const TERRAIN = {
  valleyDepth: 4,      // m the road centerline sits below the surrounding ground
  valleyHalfWidth: 11, // m: ground reaches full height at this lateral distance
  ridgeHeight: 16,     // m: plateau height above the road at the ridge
  ridgeDistance: 46,   // m: lateral distance where the ridge/plateau begins
  margin: 160,         // m: how far the terrain extends beyond the route bbox
  step: 24,            // m: grid sampling step for the terrain surface
  // Fixed low valley floor. The pass climbs ~45 m over 3.2 km, so a floor that
  // tracked route.y would make the road ride a raised spine in the void. A
  // constant floor keeps the road reading as a cut through a valley whose
  // floor sits low; the ridge (which DOES track route.y) is what surrounds it.
  floorBase: -6,       // m: constant valley-floor elevation (world y)
};

// --- Pure vector helpers ------------------------------------------------------

function vadd(a, b, s = 1) {
  return { x: a.x + b.x * s, y: a.y + b.y * s, z: a.z + b.z * s };
}

/**
 * Compute the road ribbon vertex list for a route.
 *
 * @param {object} route  module exposing at(d) -> {position, right, ...} and length
 * @param {object} opts   { width, step }
 * @returns {{ vertices: Array<{x,y,z}>, uvs: Array<{u,v}>, count: number }}
 *   vertices: 2 per sample, left then right edge, ordered along arclength.
 */
export function computeRoad(route, opts = {}) {
  const width = opts.width ?? ROAD_WIDTH;
  const step = opts.step ?? ROAD_STEP;
  const half = width / 2;
  const vertices = [];
  const uvs = [];
  const n = Math.max(1, Math.floor(route.length / step));
  for (let k = 0; k <= n; k++) {
    const dd = Math.min(k * step, route.length);
    const s = route.at(dd);
    const v = s.position;
    const r = s.right;
    // left first, then right (consistent winding)
    vertices.push(vadd(v, r, -half));
    uvs.push({ u: 0, v: dd / ROAD_TEX_REPEAT });
    vertices.push(vadd(v, r, half));
    uvs.push({ u: 1, v: dd / ROAD_TEX_REPEAT });
  }
  return { vertices, uvs, count: vertices.length, samples: n + 1 };
}

/**
 * Height of the ground surface at world point (x, z). The road centerline is
 * the valley floor; ground rises to a plateau (ridge) a few dozen meters out,
 * so the road reads as a cut through a valley rather than a floating ribbon.
 * Pure — node-importable. Uses route.at for the local elevation/tangent/right.
 *
 * @param {object} route  route module with at(d)/length
 * @param {number} x  world x
 * @param {number} z  world z
 * @param {object} opts  overrides for TERRAIN profile
 * @returns {number} ground height (world y) at (x, z)
 */
export function groundHeightAt(route, x, z, opts = {}) {
  const p = opts.profile ?? TERRAIN;
  // Nearest centerline sample (coarse search, then local refine).
  let bestD = 0, bestSq = Infinity;
  for (let d = 0; d <= route.length; d += 8) {
    const s = route.at(d);
    const dx = x - s.position.x, dz = z - s.position.z;
    const sq = dx * dx + dz * dz;
    if (sq < bestSq) { bestSq = sq; bestD = d; }
  }
  // Refine around the coarse winner.
  const lo = Math.max(0, bestD - 8), hi = Math.min(route.length, bestD + 8);
  for (let d = lo; d <= hi; d += 0.5) {
    const s = route.at(d);
    const dx = x - s.position.x, dz = z - s.position.z;
    const sq = dx * dx + dz * dz;
    if (sq < bestSq) { bestSq = sq; bestD = d; }
  }
  const s = route.at(bestD);
  // Lateral signed distance from centerline, in the road's right frame.
  const dx = x - s.position.x, dz = z - s.position.z;
  const lateral = dx * s.right.x + dz * s.right.z;
  const ad = Math.abs(lateral);
  // Valley floor: a FIXED low elevation (does not track route.y), so the road
  // reads as a cut through a valley whose floor is low and constant. The
  // surrounding ridge/plateau DOES track the local route elevation, so the
  // ground always rises above the road as the pass climbs.
  const floorY = p.floorBase;
  const ridgeY = s.position.y + p.ridgeHeight;
  // Smoothstep valley floor -> ridge plateau.
  const edge0 = p.valleyHalfWidth;
  const edge1 = p.ridgeDistance;
  let t = (ad - edge0) / (edge1 - edge0);
  t = t < 0 ? 0 : t > 1 ? 1 : t;
  const rise = t * t * (3 - 2 * t); // smoothstep
  return floorY + rise * (ridgeY - floorY);
}

/** Ribbon samples cover the full route: last sample at route.length. */
export function roadCoverage(route, opts = {}) {
  const { vertices } = computeRoad(route, opts);
  if (vertices.length < 2) return { full: false, lastD: -1 };
  const end = route.at(route.length).position;
  const lastL = vertices[vertices.length - 2];
  const dx = lastL.x - end.x, dy = lastL.y - end.y, dz = lastL.z - end.z;
  const off = Math.hypot(dx, dy, dz);
  return { full: off < (opts.width ?? ROAD_WIDTH) / 2 + 1e-3, lastD: route.length };
}

// --- Scenery helpers ----------------------------------------------------------

/** Seeded PRNG (mulberry32) for deterministic scenery placement. */
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// --- three.js scene construction ---------------------------------------------

/**
 * Build the drivable road + full alpine scenery into a three.js scene.
 * @param {object} scene  THREE.Scene
 * @param {object} route  the route module (at/length)
 * @param {object} cfg    config object (uses roadWidth if present)
 * @returns {{ road, cones, barriers, coneCount, barrierCount, sky, forest, mountains, chalets, gallery, groups }}
 */
export function buildStage(scene, route, cfg = config) {
  const THREE = scene.__THREE ?? globalThis.THREE;
  if (!THREE) throw new Error("buildStage: no THREE available (pass scene.__THREE or set globalThis.THREE)");

  const width = cfg.roadWidth ?? ROAD_WIDTH;
  const half = width / 2;
  const step = ROAD_STEP;
  const rng = mulberry32(42);

  // --- Road ribbon ---
  const { vertices, uvs } = computeRoad(route, { width });
  const positions = new Float32Array(vertices.length * 3);
  const uvArr = new Float32Array(uvs.length * 2);
  const indices = [];
  for (let i = 0; i < vertices.length; i++) {
    positions[i * 3] = vertices[i].x;
    positions[i * 3 + 1] = vertices[i].y;
    positions[i * 3 + 2] = vertices[i].z;
    uvArr[i * 2] = uvs[i].u;
    uvArr[i * 2 + 1] = uvs[i].v;
  }
  for (let i = 0; i + 1 < vertices.length; i += 2) {
    indices.push(i, i + 2, i + 1, i + 1, i + 2, i + 3);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("uv", new THREE.BufferAttribute(uvArr, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  const loader = new THREE.TextureLoader();
  const asphalt = loader.load("assets/road-grain.webp");
  asphalt.wrapS = THREE.RepeatWrapping;
  asphalt.wrapT = THREE.RepeatWrapping;
  const roadMat = new THREE.MeshStandardMaterial({
    map: asphalt,
    roughness: 0.9,
    metalness: 0.0,
    side: THREE.DoubleSide,
  });
  const road = new THREE.Mesh(geo, roadMat);
  road.name = "road";
  scene.add(road);

  // --- Road edges (raised strips along both boundaries) ---
  const edgeGeo = buildEdgeGeometry(THREE, route, half, step, -1);
  const edgeGeoR = buildEdgeGeometry(THREE, route, half, step, 1);
  const edgeMat = new THREE.MeshStandardMaterial({ color: 0x9a9a92, roughness: 0.8 });
  const edgeL = new THREE.Mesh(edgeGeo, edgeMat);
  edgeL.name = "road-edge-left";
  const edgeR = new THREE.Mesh(edgeGeoR, edgeMat);
  edgeR.name = "road-edge-right";
  scene.add(edgeL, edgeR);

  // --- Cones ---
  const cones = new THREE.Group();
  cones.name = "cones";
  const coneGeo = new THREE.ConeGeometry(0.18, 0.55, 12);
  const coneMat = new THREE.MeshStandardMaterial({ color: 0xff6a00, roughness: 0.6 });
  for (let ci = 0; ci < CONE_FRACTIONS.length; ci++) {
    const f = CONE_FRACTIONS[ci];
    const d = f * route.length;
    const s = route.at(d);
    const side = (ci % 2 === 0) ? -1 : 1;
    const lat = side * (half - 0.6);
    const cone = new THREE.Mesh(coneGeo, coneMat);
    cone.position.set(
      s.position.x + s.right.x * lat,
      s.position.y + 0.275,
      s.position.z + s.right.z * lat
    );
    cone.name = `cone-${f}`;
    cones.add(cone);
  }
  scene.add(cones);

  // --- Barriers at hazard spots ---
  const barriers = new THREE.Group();
  barriers.name = "barriers";
  const barGeo = new THREE.BoxGeometry(3, 0.9, 0.15);
  const barMat = new THREE.MeshStandardMaterial({ color: 0xd8d8d0, roughness: 0.5 });
  for (const f of BARRIER_FRACTIONS) {
    const d = f * route.length;
    const s = route.at(d);
    const bar = new THREE.Mesh(barGeo, barMat);
    bar.position.set(s.position.x, s.position.y + 0.45, s.position.z);
    const yaw = Math.atan2(s.tangent.x, s.tangent.z);
    bar.rotation.y = yaw;
    bar.name = `barrier-${f}`;
    barriers.add(bar);
  }
  scene.add(barriers);

  // --- Scenery (sky, forest, mountains, chalets, gallery, dusk lighting) ---
  // Guarded: the T003 stub-THREE check only provides minimal constructors.
  // Full scenery requires SphereGeometry (only present in real three.js).
  let sky = null, forest = null, mountains = null, chalets = null, gallery = null, ground = null;
  if (THREE.SphereGeometry && THREE.PlaneGeometry && THREE.InstancedMesh &&
      THREE.MeshBasicMaterial && THREE.HemisphereLight && THREE.DirectionalLight) {
    // --- Sky dome (alpine-sky.webp) ---
    const skyTex = loader.load("assets/alpine-sky.webp");
    const skyGeo = new THREE.SphereGeometry(1500, 32, 16);
    const skyMat = new THREE.MeshBasicMaterial({
      map: skyTex,
      side: THREE.BackSide,
      fog: false,
    });
    sky = new THREE.Mesh(skyGeo, skyMat);
    sky.name = "sky";
    scene.add(sky);
    scene.background = skyTex;

    // --- Ground / terrain surface (road sits in a valley) ---
    ground = buildTerrain(THREE, route);
    scene.add(ground);

    // --- Dusk lighting: low warm sun + cool ambient ---
    const hemi = new THREE.HemisphereLight(0x4a6a9a, 0x1a2a1a, 0.6);
    hemi.name = "dusk-hemi";
    scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xffaa55, 1.8);
    sun.name = "dusk-sun";
    sun.position.set(-300, 60, 200);
    scene.add(sun);
    const fillLight = new THREE.DirectionalLight(0x6688bb, 0.3);
    fillLight.name = "dusk-fill";
    fillLight.position.set(200, 100, -150);
    scene.add(fillLight);

    // --- Spruce forest (instanced meshes) ---
    forest = buildForest(THREE, route, loader, rng);
    scene.add(forest);

    // --- Mountain silhouettes ---
    mountains = buildMountains(THREE, route, rng);
    scene.add(mountains);

    // --- Chalets ---
    chalets = buildChalets(THREE, route, rng);
    scene.add(chalets);

    // --- Avalanche gallery (open-sided roofed structure) ---
    gallery = buildGallery(THREE, route, half);
    scene.add(gallery);
  }

  return {
    road,
    edges: [edgeL, edgeR],
    cones,
    barriers,
    coneCount: CONE_FRACTIONS.length,
    barrierCount: BARRIER_FRACTIONS.length,
    coneFractions: CONE_FRACTIONS,
    barrierFractions: BARRIER_FRACTIONS,
    sky,
    ground,
    forest,
    mountains,
    chalets,
    gallery,
    groups: { road, edges: [edgeL, edgeR], ground, forest, mountains, chalets, gallery },
  };
}

/** Raised edge strip: a thin wall chain along one side of the ribbon. */
function buildEdgeGeometry(THREE, route, half, step, side) {
  const w = 0.3;
  const h = 0.12;
  const off = half + w / 2 - 0.05;
  const hw = w / 2;
  const verts = [];
  const idx = [];
  for (let k = 0; k <= Math.max(1, Math.floor(route.length / step)); k++) {
    const dd = Math.min(k * step, route.length);
    const s = route.at(dd);
    const p = s.position;
    const r = s.right;
    const bx = p.x + r.x * off * side;
    const by = p.y + 0.02;
    const bz = p.z + r.z * off * side;
    verts.push(
      { x: bx - r.x * hw, y: by, z: bz - r.z * hw },
      { x: bx + r.x * hw, y: by, z: bz + r.z * hw },
      { x: bx + r.x * hw, y: by + h, z: bz + r.z * hw },
      { x: bx - r.x * hw, y: by + h, z: bz - r.z * hw },
    );
  }
  for (let q = 1; q < verts.length / 4; q++) {
    const a = (q - 1) * 4, b = q * 4;
    idx.push(a, b, b + 1, a, b + 1, a + 1);
    idx.push(a + 2, b + 2, b + 3, a + 2, b + 3, a + 3);
    idx.push(a + 1, b + 1, b + 2, a + 1, b + 2, a + 2);
    idx.push(a, b, b + 3, a, b + 3, a + 3);
  }
  const pos = new Float32Array(verts.length * 3);
  for (let k = 0; k < verts.length; k++) {
    pos[k * 3] = verts[k].x;
    pos[k * 3 + 1] = verts[k].y;
    pos[k * 3 + 2] = verts[k].z;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

// --- Scenery builders ---------------------------------------------------------

/**
 * Ground/terrain surface: a grid over the route's x/z extent, with each vertex
 * lifted to groundHeightAt() so the road runs through a shallow valley flanked
 * by a low plateau. Pure geometry (no textures) — MeshStandardMaterial with a
 * muted dusk-green/rock color.
 */
function buildTerrain(THREE, route) {
  const p = TERRAIN;
  // Cover the route's full x/z bounding box plus a margin, so the whole road
  // sits on the terrain (the route winds ~1900 m, far larger than any local
  // window). Sample the route densely to get the bbox.
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (let d = 0; d <= route.length; d += 10) {
    const s = route.at(d);
    const x = s.position.x, z = s.position.z;
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
  }
  minX -= p.margin; maxX += p.margin;
  minZ -= p.margin; maxZ += p.margin;
  const step = p.step;
  const nx = Math.max(2, Math.floor((maxX - minX) / step));
  const nz = Math.max(2, Math.floor((maxZ - minZ) / step));
  const positions = new Float32Array((nx + 1) * (nz + 1) * 3);
  const uvs = new Float32Array((nx + 1) * (nz + 1) * 2);
  let vi = 0;
  for (let iz = 0; iz <= nz; iz++) {
    for (let ix = 0; ix <= nx; ix++) {
      const x = minX + (ix / nx) * (maxX - minX);
      const z = minZ + (iz / nz) * (maxZ - minZ);
      const y = groundHeightAt(route, x, z, { profile: p });
      positions[vi * 3] = x;
      positions[vi * 3 + 1] = y;
      positions[vi * 3 + 2] = z;
      uvs[vi * 2] = ix / nx;
      uvs[vi * 2 + 1] = iz / nz;
      vi++;
    }
  }
  const indices = [];
  for (let iz = 0; iz < nz; iz++) {
    for (let ix = 0; ix < nx; ix++) {
      const a = iz * (nx + 1) + ix;
      const b = a + 1;
      const c = a + (nx + 1);
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({
    color: 0x6f815c, // visible dusk-green grass/rock (lighter so it doesn't read as void)
    roughness: 0.95,
    metalness: 0.0,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.name = "ground";
  return mesh;
}

/**
 * Instanced spruce forest using spruce-0/1/2.webp as alpha-tested textures.
 * Trees are placed on both sides of the road at random distances, skipping
 * the gallery stretch and cone/barrier zones.
 */
function buildForest(THREE, route, loader, rng) {
  const group = new THREE.Group();
  group.name = "forest";

  const texFiles = ["assets/spruce-0.webp", "assets/spruce-1.webp", "assets/spruce-2.webp"];
  const textures = texFiles.map((f) => {
    const t = loader.load(f);
    t.wrapS = THREE.ClampToEdgeWrapping;
    t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  });

  // Tree geometry: a simple plane (billboard-style) or a small cone.
  // Using a plane with alpha test for the texture.
  const planeGeo = new THREE.PlaneGeometry(4, 8);
  const TREE_COUNT_PER_TEX = 80;
  const totalTrees = TREE_COUNT_PER_TEX * 3;

  // Determine gallery stretch to avoid: fractions 0.10..0.18
  const galleryStart = 0.10;
  const galleryEnd = 0.18;

  const dummy = new THREE.Object3D();
  for (let ti = 0; ti < 3; ti++) {
    const mat = new THREE.MeshStandardMaterial({
      map: textures[ti],
      alphaTest: 0.5,
      side: THREE.DoubleSide,
      roughness: 1.0,
      metalness: 0.0,
    });
    const inst = new THREE.InstancedMesh(planeGeo, mat, TREE_COUNT_PER_TEX);
    inst.name = `trees-variant-${ti}`;
    for (let i = 0; i < TREE_COUNT_PER_TEX; i++) {
      // Pick a route fraction, avoid gallery and very start/end
      let f;
      do {
        f = rng();
      } while ((f > galleryStart - 0.02 && f < galleryEnd + 0.02) || f < 0.01 || f > 0.99);
      const d = f * route.length;
      const s = route.at(d);
      // Lateral offset: 6 to 30 m from centerline, either side
      const side = rng() < 0.5 ? -1 : 1;
      const lat = side * (6 + rng() * 24);
      const x = s.position.x + s.right.x * lat;
      const z = s.position.z + s.right.z * lat;
      // Sit the tree on the terrain surface (not floating at route elevation).
      const y = groundHeightAt(route, x, z);
      const scale = 0.7 + rng() * 0.8;
      dummy.position.set(x, y + 4 * scale, z);
      dummy.scale.set(scale, scale, scale);
      // Face the road: rotate to face centerline
      dummy.rotation.set(0, Math.atan2(s.tangent.x, s.tangent.z) + Math.PI / 2, 0);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }
    inst.instanceMatrix.needsUpdate = true;
    group.add(inst);
  }
  return group;
}

/**
 * Mountain silhouettes: rings of large dark cones at distance around the route.
 * Uses a few concentric rings of cones with a dark flat material.
 */
function buildMountains(THREE, route, rng) {
  const group = new THREE.Group();
  group.name = "mountains";

  const mat = new THREE.MeshBasicMaterial({ color: 0x3a4a66, fog: false });
  const mat2 = new THREE.MeshBasicMaterial({ color: 0x4a5a78, fog: false });

  // Ring 1: 800–1200 m out, 300–550 m tall
  // Ring 2: 1500–2000 m out, 450–800 m tall
  const rings = [
    { count: 14, rMin: 800, rMax: 1200, hMin: 300, hMax: 550, mat },
    { count: 10, rMin: 1500, rMax: 2000, hMin: 450, hMax: 800, mat2 },
  ];

  // Center of the route bounding box (approx); base the range at the valley
  // floor so peaks rise from the horizon rather than from y=0 in the void.
  const start = route.at(0).position;
  const end = route.at(route.length).position;
  // Base the range at the fixed valley floor so peaks rise from the horizon
  // (not from a climbing spine, and not from y=-10 in the void).
  const midY = TERRAIN.floorBase;
  const mid = {
    x: (start.x + end.x) / 2,
    y: midY,
    z: (start.z + end.z) / 2,
  };

  for (const ring of rings) {
    for (let i = 0; i < ring.count; i++) {
      const angle = (i / ring.count) * Math.PI * 2 + (rng() - 0.5) * 0.3;
      const radius = ring.rMin + rng() * (ring.rMax - ring.rMin);
      const h = ring.hMin + rng() * (ring.hMax - ring.hMin);
      const r = h * (0.3 + rng() * 0.3); // base radius
      const geo = new THREE.ConeGeometry(r, h, 5 + Math.floor(rng() * 4));
      const mesh = new THREE.Mesh(geo, ring.mat);
      // Base the cone at the valley floor so its peak reads on the horizon.
      mesh.position.set(
        mid.x + Math.cos(angle) * radius,
        midY + h / 2,
        mid.z + Math.sin(angle) * radius
      );
      mesh.rotation.y = rng() * Math.PI;
      group.add(mesh);
    }
  }
  return group;
}

/**
 * Chalets: simple box + pyramid roof primitives placed near the road at
 * a few scenic spots.
 */
function buildChalets(THREE, route, rng) {
  const group = new THREE.Group();
  group.name = "chalets";

  const wallMat = new THREE.MeshStandardMaterial({ color: 0x8b5e3c, roughness: 0.8 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x4a3020, roughness: 0.7 });

  // Place 5 chalets at specific fractions, offset laterally
  const chaletFractions = [0.12, 0.32, 0.58, 0.72, 0.92];
  for (const f of chaletFractions) {
    const d = f * route.length;
    const s = route.at(d);
    const side = rng() < 0.5 ? -1 : 1;
    const lat = side * (8 + rng() * 6);
    const x = s.position.x + s.right.x * lat;
    const z = s.position.z + s.right.z * lat;
    // Sit the chalet on the terrain surface.
    const y = groundHeightAt(route, x, z);

    const chalet = new THREE.Group();
    // Body: 4m x 3m x 5m
    const body = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 5), wallMat);
    body.position.y = 1.5;
    chalet.add(body);
    // Roof: pyramid (4-sided cone)
    const roof = new THREE.Mesh(new THREE.ConeGeometry(3.2, 2.5, 4), roofMat);
    roof.position.y = 4.25;
    roof.rotation.y = Math.PI / 4;
    chalet.add(roof);

    chalet.position.set(x, y, z);
    chalet.rotation.y = Math.atan2(s.tangent.x, s.tangent.z);
    group.add(chalet);
  }
  return group;
}

/**
 * Avalanche gallery: an open-sided roofed structure over a stretch of road
  (fractions 0.10..0.18). Two rows of posts + a flat roof slab.
 */
function buildGallery(THREE, route, half) {
  const group = new THREE.Group();
  group.name = "gallery";

  const postMat = new THREE.MeshStandardMaterial({ color: 0x666666, roughness: 0.6 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.7, side: THREE.DoubleSide });

  const gStart = 0.10;
  const gEnd = 0.18;
  const dStart = gStart * route.length;
  const dEnd = gEnd * route.length;
  const gLen = dEnd - dStart;
  const postSpacing = 5; // meters
  const postCount = Math.floor(gLen / postSpacing) + 1;
  const postH = 3.5; // post height
  const roofOverhang = 1.0; // extend beyond road edges
  const roofW = half * 2 + roofOverhang * 2;
  const roofH = 0.15;

  const postGeo = new THREE.BoxGeometry(0.2, postH, 0.2);
  const roofGeo = new THREE.BoxGeometry(roofW, roofH, gLen + 1);

  // Roof: single slab spanning the whole gallery
  const roof = new THREE.Mesh(roofGeo, roofMat);
  const midD = (dStart + dEnd) / 2;
  const sMid = route.at(midD);
  roof.position.set(sMid.position.x, sMid.position.y + postH, sMid.position.z);
  const yaw = Math.atan2(sMid.tangent.x, sMid.tangent.z);
  roof.rotation.y = yaw;
  group.add(roof);

  // Posts along both edges
  for (let i = 0; i < postCount; i++) {
    const d = dStart + i * postSpacing;
    const s = route.at(d);
    for (const side of [-1, 1]) {
      const lat = side * (half + 0.5);
      const post = new THREE.Mesh(postGeo, postMat);
      post.position.set(
        s.position.x + s.right.x * lat,
        s.position.y + postH / 2,
        s.position.z + s.right.z * lat
      );
      post.rotation.y = yaw;
      group.add(post);
    }
  }
  return group;
}

export default buildStage;
