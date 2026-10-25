/**
 * Desert shell the town sits in (R15/R16).
 *
 * Static scenery, built once, animated never:
 *   desert-ground — one big plane. Flat at y = 0 across the whole play area
 *     (DECISIONS.md D6: the cowboy must stay on the ground plane at every wall),
 *     undulating only outside the limits, so the far desert reads as dunes.
 *   mesa-ring     — one InstancedMesh of flat-topped mesas and nearer buttes,
 *     110-190m out, i.e. well past every wall but inside the fog and camera range.
 *   sky-dome      — inside-out sphere with a baked vertical gradient whose
 *     horizon band is exactly the fog colour, so the fogged ground edge melts
 *     into the sky instead of ending.
 *   desert-props  — scattered rocks and cactus (R13): two InstancedMeshes, one
 *     seeded PRNG, a quarter of them inside the town rim and the rest out in the
 *     desert, so the world reads as desert past the buildings.
 *
 * Fog and `scene.background` also live here: engine.js deliberately owns neither.
 * Everything is raycast-free (noOcclude) so the camera rig can keep its default
 * whole-scene occlusion scan without terrain costing it a hit every frame.
 *
 * Placement is deterministic by construction (fixed seed, no Math.random), which
 * is what lets T006c compare two loads, and it is zone-driven: every play-area
 * wall gets props on both sides, the main street corridor and the spawn point
 * stay clear, and the middle of town is left empty for T026's buildings.
 */

import { PLAY_AREA } from './bounds.js';

export const TERRAIN = Object.freeze({
  groundSize: 400, groundSegX: 64, groundSegZ: 80,
  /** Relief starts outside this pad, which is the play area plus a border. */
  flatPadX: 36, flatPadZ: 54, relief: 4.6,
  fogColor: 0xd9c096, fogNear: 55, fogFar: 320,
  skyColor: 0x8ec7e8, skyZenith: 0x5f9ed6, skyRadius: 300,
  /**
   * Lighting (R18/R21) — one warm directional sun, one blue-sky-over-sand
   * hemisphere fill, and nothing else. T006d owns this pair and a check asserts
   * the count, so later tasks cannot quietly add a third light.
   */
  sunColor: 0xffe0b0, sunIntensity: 2.1, sunX: 18, sunY: 30, sunZ: 12,
  hemiSky: 0x9fc6ef, hemiGround: 0xb08a55, hemiIntensity: 1.05,
  mesaCount: 16, mesaFarMin: 150, mesaFarMax: 190, mesaNearMin: 110, mesaNearMax: 138,
  /** Desert scatter (R13/R15). Fixed seed => identical props on every load. */
  propSeed: 0x5eed1a, rockCount: 30, cactusCount: 16,
  propCorridorX: 9.5,   // the main street (and the track past it) stays prop-free
  propSpawnClear: 11,   // > the 10m T006c asserts, measured from the spawn point
  propGap: 3.6,         // props never overlap
  propOutsideMaxR: 95,  // stop before the mesa ring (110m) so nothing clips inside it
  propRockBias: 0.62,   // rocks outnumber cactus
  /** Where the player spawns (src/player/player.js PLAYER.startX/startZ). */
  spawnX: 0, spawnZ: 12,
});

/**
 * Placement zones, in metres. Inside zones hug the town rim so the middle of
 * town stays free for T026's buildings; outside zones sit past each wall, which
 * is what guarantees props on both sides of every play-area limit.
 */
export const PROP_ZONES = Object.freeze([
  { inside: true, minX: -31, maxX: -23, minZ: -49, maxZ: 49, rocks: 3, cactus: 1 },
  { inside: true, minX: 23, maxX: 31, minZ: -49, maxZ: 49, rocks: 3, cactus: 1 },
  { inside: true, minX: -23, maxX: 23, minZ: 37, maxZ: 49, rocks: 2, cactus: 1 },
  { inside: true, minX: -23, maxX: 23, minZ: -49, maxZ: -37, rocks: 2, cactus: 1 },
  { inside: false, minX: -92, maxX: -36, minZ: -92, maxZ: 92, rocks: 5, cactus: 2 },
  { inside: false, minX: 36, maxX: 92, minZ: -92, maxZ: 92, rocks: 5, cactus: 2 },
  { inside: false, minX: -92, maxX: 92, minZ: 56, maxZ: 92, rocks: 4, cactus: 2 },
  { inside: false, minX: -92, maxX: 92, minZ: -92, maxZ: -56, rocks: 4, cactus: 2 },
]);

/** mulberry32: a tiny seeded PRNG, so the desert is the same on every load. */
function makeRng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Concatenate transformed geometries (position + normal) into one low-poly mesh. */
function mergeGeos(THREE, parts) {
  let count = 0;
  const prepared = parts.map(({ geo, matrix }) => {
    const g = geo.toNonIndexed();
    if (matrix) g.applyMatrix4(matrix);
    count += g.getAttribute('position').count;
    geo.dispose();
    return g;
  });
  const position = new Float32Array(count * 3);
  const normal = new Float32Array(count * 3);
  let o = 0;
  for (const g of prepared) {
    position.set(g.getAttribute('position').array, o * 3);
    normal.set(g.getAttribute('normal').array, o * 3);
    o += g.getAttribute('position').count;
    g.dispose();
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(position, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(normal, 3));
  out.computeBoundingSphere();
  return out;
}

const mat4 = (T, x, y, z, rotZ = 0) => new T.Matrix4()
  .makeRotationZ(rotZ)
  .multiply(new T.Matrix4().makeTranslation(x, y, z));

/** One chunky saguaro: trunk plus two up-turned arms, merged into one geometry. */
function cactusGeometry(THREE) {
  const C = (rt, rb, h, seg = 6) => new THREE.CylinderGeometry(rt, rb, h, seg);
  return mergeGeos(THREE, [
    { geo: C(0.30, 0.36, 2.0, 7), matrix: mat4(THREE, 0, 1.0, 0) },
    { geo: C(0.14, 0.16, 0.45), matrix: mat4(THREE, -0.42, 1.25, 0, Math.PI / 2) },
    { geo: C(0.13, 0.15, 0.85), matrix: mat4(THREE, -0.62, 1.72, 0) },
    { geo: C(0.13, 0.15, 0.40), matrix: mat4(THREE, 0.38, 1.55, 0.02, Math.PI / 2) },
    { geo: C(0.12, 0.14, 0.70), matrix: mat4(THREE, 0.56, 1.95, 0.02) },
  ]);
}


const num = (v, fallback) => (Number.isFinite(v) ? v : fallback);

/** Deterministic 0..1 hash — no Math.random, so every run draws the same desert. */
function hash(a, b) {
  const s = Math.sin(a * 127.1 + b * 311.7 + 13.7) * 43758.5453;
  return s - Math.floor(s);
}

/** Smooth value noise on a 1-unit lattice, 0..1. */
function noise(x, z) {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x - ix, fz = z - iz;
  const sx = fx * fx * (3 - 2 * fx), sz = fz * fz * (3 - 2 * fz);
  const a = hash(ix, iz), b = hash(ix + 1, iz), c = hash(ix, iz + 1), d = hash(ix + 1, iz + 1);
  return (a + (b - a) * sx) * (1 - sz) + (c + (d - c) * sx) * sz;
}

/**
 * Make a subtree invisible to raycasts. The camera rig raycasts the scene every
 * frame for occlusion (R26); terrain is scenery, never cover, and T005's check
 * relies on the rig's default whole-scene scan finding a test wall.
 */
export function noOcclude(obj) {
  const noop = () => {};
  obj.traverse((o) => { if (o.isMesh || o.isInstancedMesh) o.raycast = noop; });
  return obj;
}

/**
 * @param {object} opts.engine  engine (owns scene, camera and THREE)
 * @param {object} opts.area    play-area footprint to keep flat (default PLAY_AREA)
 * @param {object} opts.config  overrides for TERRAIN constants
 */
export function createTerrain({ engine, area = PLAY_AREA, config = {} } = {}) {
  const THREE = engine.THREE;
  const cfg = { ...TERRAIN, ...config };
  const scene = engine.scene;
  const half = cfg.groundSize / 2;

  // The flat pad must swallow the whole footprint, or a wall the cowboy pins to
  // would sit on a slope and T004/T006a's y === 0 assertions would fail.
  const padX = Math.max(cfg.flatPadX, num(area.maxX, 0) + 4, -num(area.minX, 0) + 4);
  const padZ = Math.max(cfg.flatPadZ, num(area.maxZ, 0) + 4, -num(area.minZ, 0) + 4);

  const group = new THREE.Group();
  group.name = 'terrain';

  // --- ground ----------------------------------------------------------------
  const geo = new THREE.PlaneGeometry(cfg.groundSize, cfg.groundSize, cfg.groundSegX, cfg.groundSegZ);
  geo.rotateX(-Math.PI / 2); // local +y -> world -z; vertices are now world-aligned
  const pos = geo.getAttribute('position');
  const colors = new Float32Array(pos.count * 3);
  const ramp = (v, pad) => Math.max(0, Math.min(1, (v - pad) / (half - pad)));

  /** Ground height at (x,z). Shared by the mesh and by prop placement, so a
   *  rock or cactus always sits on the surface the ground actually draws. */
  function reliefAt(x, z) {
    const t = Math.max(ramp(Math.abs(x), padX), ramp(Math.abs(z), padZ));
    if (t <= 0) return 0; // inside the pad: exactly flat, exactly zero (D6)
    const n = noise(x / 26, z / 26);
    const n2 = noise(x / 9 + 40, z / 9 - 20);
    // t*t keeps the join at the pad edge tangent-flat, so nothing creeps inward.
    return t * t * (cfg.relief * (n - 0.42) * 2 + cfg.relief * 0.5 * t) + t * 2.2 * (n2 - 0.5);
  }

  for (let i = 0; i < pos.count; i += 1) {
    const x = pos.getX(i), z = pos.getZ(i);
    const t = Math.max(ramp(Math.abs(x), padX), ramp(Math.abs(z), padZ));
    const n = noise(x / 26, z / 26);
    const n2 = noise(x / 9 + 40, z / 9 - 20);
    const y = reliefAt(x, z);
    pos.setY(i, y);

    // Warm sand, paler on the ridges, reddening out towards the mesas.
    const h = Math.max(0, Math.min(1, 0.5 + y / (cfg.relief * 2)));
    const out = Math.min(1, t * 1.4);
    const grain = 0.94 + 0.12 * n2;
    colors[i * 3] = (0.78 + 0.12 * h) * grain * (1 + 0.10 * out);
    colors[i * 3 + 1] = (0.63 + 0.11 * h) * grain * (1 - 0.10 * out);
    colors[i * 3 + 2] = (0.40 + 0.10 * h) * grain * (1 - 0.22 * out);
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  geo.computeBoundingSphere();

  const ground = new THREE.Mesh(
    geo,
    new THREE.MeshLambertMaterial({ color: 0xffffff, vertexColors: true }),
  );
  ground.name = 'desert-ground';
  ground.matrixAutoUpdate = false;
  group.add(ground);

  // --- mesas and buttes ------------------------------------------------------
  // One low-poly prism, 16 instances: 1 draw call for the whole horizon (R21).
  const mesaGeo = new THREE.CylinderGeometry(0.58, 1, 1, 6, 1);
  const mesaMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const mesas = new THREE.InstancedMesh(mesaGeo, mesaMat, cfg.mesaCount);
  mesas.name = 'mesa-ring';
  mesas.instanceMatrix.setUsage(THREE.StaticDrawUsage);
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const v = new THREE.Vector3();
  const s = new THREE.Vector3();
  const col = new THREE.Color();
  for (let i = 0; i < cfg.mesaCount; i += 1) {
    const far = i < cfg.mesaCount - 6;
    const ang = (i / cfg.mesaCount) * Math.PI * 2 + hash(i, 7) * 0.42;
    const ring = far
      ? cfg.mesaFarMin + hash(i, 3) * (cfg.mesaFarMax - cfg.mesaFarMin)
      : cfg.mesaNearMin + hash(i, 5) * (cfg.mesaNearMax - cfg.mesaNearMin);
    const height = (far ? 26 : 12) + hash(i, 11) * (far ? 26 : 12);
    const radius = height * (0.55 + hash(i, 17) * 0.45); // steep-sided butte
    v.set(Math.cos(ang) * ring, height / 2 - 7, Math.sin(ang) * ring);
    s.set(radius, height, radius * (0.8 + hash(i, 23) * 0.4));
    e.set(0, hash(i, 29) * Math.PI, 0);
    m4.compose(v, q.setFromEuler(e), s);
    mesas.setMatrixAt(i, m4);
    // Weathered red-brown, bluer with distance so the fog does the rest.
    const shade = 0.78 + hash(i, 31) * 0.22;
    col.setRGB(0.55 * shade, 0.40 * shade, 0.34 * shade);
    mesas.setColorAt(i, col);
  }
  mesas.instanceMatrix.needsUpdate = true;
  if (mesas.instanceColor) mesas.instanceColor.needsUpdate = true;
  mesas.frustumCulled = false;
  mesas.matrixAutoUpdate = false;
  group.add(mesas);

  // --- sky -------------------------------------------------------------------
  const skyGeo = new THREE.SphereGeometry(cfg.skyRadius, 24, 12);
  const skyPos = skyGeo.getAttribute('position');
  const skyCol = new Float32Array(skyPos.count * 3);
  const zenith = new THREE.Color(cfg.skyZenith);
  const horizon = new THREE.Color(cfg.fogColor);
  const c = new THREE.Color();
  for (let i = 0; i < skyPos.count; i += 1) {
    // 0 at the horizon band, 1 at the zenith; below the horizon stays haze.
    const k = Math.max(0, Math.min(1, skyPos.getY(i) / cfg.skyRadius * 1.6));
    c.copy(horizon).lerp(zenith, k * k * (3 - 2 * k) * 0.92);
    skyCol[i * 3] = c.r; skyCol[i * 3 + 1] = c.g; skyCol[i * 3 + 2] = c.b;
  }
  skyGeo.setAttribute('color', new THREE.BufferAttribute(skyCol, 3));
  const sky = new THREE.Mesh(skyGeo, new THREE.MeshBasicMaterial({
    vertexColors: true,
    side: THREE.BackSide,
    fog: false,
    depthWrite: false,
    depthTest: false,
  }));
  sky.name = 'sky-dome';
  sky.renderOrder = -1000; // painted first; everything else draws over it
  sky.frustumCulled = false;
  sky.matrixAutoUpdate = false;
  group.add(sky);

  // --- lighting --------------------------------------------------------------
  // Exactly one warm directional sun and one blue-sky-over-sand hemisphere fill
  // (R18/R21), living next to the fog and sky colours they are tuned with. No
  // shadow maps: a single sun lighting a low-poly town is the whole budget.
  const sun = new THREE.DirectionalLight(cfg.sunColor, cfg.sunIntensity);
  sun.name = 'sun';
  sun.position.set(cfg.sunX, cfg.sunY, cfg.sunZ);
  sun.castShadow = false;
  group.add(sun);
  const fill = new THREE.HemisphereLight(cfg.hemiSky, cfg.hemiGround, cfg.hemiIntensity);
  fill.name = 'sky-fill';
  group.add(fill);

  // --- rocks and cactus ------------------------------------------------------
  // Two InstancedMeshes (2 draw calls for the whole scatter, R21), placed by one
  // seeded PRNG over the zones above. Decorative only: no collision, no shadows,
  // and noOcclude keeps them out of the camera's raycast.
  const rnd = makeRng(cfg.propSeed);
  const placed = [];

  const fits = (x, z) => {
    if (Math.abs(x) < cfg.propCorridorX) return false;                 // main street corridor
    if (Math.hypot(x - cfg.spawnX, z - cfg.spawnZ) < cfg.propSpawnClear) return false;
    if (Math.hypot(x, z) > cfg.propOutsideMaxR) return false;          // stay clear of the mesas
    for (const p of placed) if (Math.hypot(p.x - x, p.z - z) < cfg.propGap) return false;
    return true;
  };

  const addProp = (x, z, kind) => {
    const scale = kind === 'rock' ? 0.55 + rnd() * 1.15 : 0.75 + rnd() * 0.6;
    const p = {
      kind, x, z, scale,
      squash: kind === 'rock' ? 0.45 + rnd() * 0.5 : 1,
      rotY: rnd() * Math.PI * 2,
      tiltX: kind === 'rock' ? (rnd() - 0.5) * 0.5 : 0,
      tiltZ: kind === 'rock' ? (rnd() - 0.5) * 0.5 : 0,
      // Sink them slightly so the seam with the sand never shows.
      y: reliefAt(x, z) - (kind === 'rock' ? 0.35 * scale : 0.08),
      shade: 0.78 + rnd() * 0.34,
    };
    placed.push(p);
    return p;
  };

  for (const zone of PROP_ZONES) {
    for (let k = 0; k < zone.rocks + zone.cactus; k += 1) {
      const kind = k < zone.rocks ? 'rock' : 'cactus';
      for (let attempt = 0; attempt < 80; attempt += 1) {
        const x = zone.minX + rnd() * (zone.maxX - zone.minX);
        const z = zone.minZ + rnd() * (zone.maxZ - zone.minZ);
        if (!fits(x, z)) continue;
        addProp(x, z, kind);
        break;
      }
    }
  }

  const props = new THREE.Group();
  props.name = 'desert-props';
  const pe = new THREE.Euler();

  const buildInstances = (name, geometry, list, tint) => {
    const mesh = new THREE.InstancedMesh(geometry, new THREE.MeshLambertMaterial({
      color: 0xffffff, flatShading: true,
    }), Math.max(1, list.length));
    mesh.name = name;
    mesh.count = list.length;
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    mesh.frustumCulled = false; // instances spread over 200m; the geometry sphere is 1m
    mesh.matrixAutoUpdate = false;
    mesh.instanceMatrix.setUsage(THREE.StaticDrawUsage);
    for (let i = 0; i < list.length; i += 1) {
      const p = list[i];
      const sy = p.kind === 'rock' ? p.scale * p.squash : p.scale;
      v.set(p.x, p.y, p.z);
      s.set(p.scale, sy, p.scale * (0.85 + rnd() * 0.3));
      pe.set(p.tiltX, p.rotY, p.tiltZ);
      m4.compose(v, q.setFromEuler(pe), s);
      mesh.setMatrixAt(i, m4);
      col.setRGB(tint[0] * p.shade, tint[1] * p.shade, tint[2] * p.shade);
      mesh.setColorAt(i, col);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    return mesh;
  };

  const rockList = placed.filter((p) => p.kind === 'rock');
  const cactusList = placed.filter((p) => p.kind === 'cactus');
  const rockGeo = new THREE.DodecahedronGeometry(1, 0);
  const cactusGeo = cactusGeometry(THREE);
  const rocks = buildInstances('desert-rocks', rockGeo, rockList, [0.52, 0.47, 0.41]);
  const cactus = buildInstances('desert-cactus', cactusGeo, cactusList, [0.33, 0.47, 0.26]);
  props.add(rocks, cactus);
  group.add(props);

  noOcclude(group);
  scene.add(group);

  // The world's atmosphere belongs to the world, not to the renderer scaffolding.
  scene.background = new THREE.Color(cfg.skyColor);
  scene.fog = new THREE.Fog(cfg.fogColor, cfg.fogNear, cfg.fogFar);
  if (engine.camera.far < cfg.skyRadius + 80) {
    engine.camera.far = cfg.skyRadius + 80;
    engine.camera.updateProjectionMatrix();
  }

  const terrain = {
    group, ground, mesas, sky, props, rocks, cactus, sun, fill, placements: placed, config: cfg,
    get fog() { return scene.fog; },
    get background() { return scene.background; },
    dispose() {
      noOcclude(group);
      group.parent && group.parent.remove(group);
      geo.dispose(); mesaGeo.dispose(); skyGeo.dispose();
      rockGeo.dispose(); cactusGeo.dispose();
      rocks.material.dispose(); cactus.material.dispose();
      ground.material.dispose(); mesaMat.dispose(); sky.material.dispose();
      if (scene.fog && scene.fog.far === cfg.fogFar) scene.fog = null;
      if (scene.background) scene.background = null;
      return terrain;
    },
  };
  return terrain;
}
