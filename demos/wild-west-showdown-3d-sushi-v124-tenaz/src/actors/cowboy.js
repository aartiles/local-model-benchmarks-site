import * as THREE from 'three';

/**
 * Blocky cowboy character builder (R17) — code-only, no external assets, so the
 * identity stays original (R20). One builder is shared by the player, the roster,
 * the boss and ambient NPCs; only the palette changes.
 *
 * Geometry and materials are cached module-wide (R21): every cowboy reuses the
 * same BoxGeometry instances and one material per colour, so a full roster costs
 * almost no GPU memory and no per-character allocation.
 *
 * Orientation: a cowboy faces +Z. `setYaw(rad)` turns it, with yaw matching
 * Math.atan2(dir.x, dir.z) so movement code and facing use one convention.
 * The root group's origin is between the feet at ground level, so
 * `group.position.y = 0` plants the character on flat ground.
 */

/** Shared dimensions — world layout (T006) and camera framing (T005) build on these. */
export const DIM = {
  legH: 0.56, legW: 0.26, legD: 0.28,
  torsoH: 0.64, torsoW: 0.62, torsoD: 0.34,
  neck: 0.04,
  headH: 0.40, headW: 0.42, headD: 0.38,
  armH: 0.56, armW: 0.20, armD: 0.22,
  brimW: 0.86, brimD: 0.80, brimH: 0.05,
  crownW: 0.46, crownH: 0.26, crownD: 0.46,
};

/** Overall height (feet to hat top) and a comfortable collision radius. */
export const COWBOY_HEIGHT = DIM.legH + DIM.torsoH + DIM.neck + DIM.headH + DIM.brimH + DIM.crownH;
export const COWBOY_RADIUS = 0.42;

const DEFAULT_PALETTE = {
  skin: 0xd9a066,
  shirt: 0x6b8f71,
  pants: 0x4a3a2c,
  boots: 0x2f2418,
  hat: 0x6e4b2a,
  hatBand: 0x3c2f22,
  vest: 0x3c2f22,
  belt: 0x2f2418,
  bandana: 0xa8322c,
  eyes: 0x1a1410,
  mouth: 0x35211a,
  gun: 0x8d8f94,
  gunGrip: 0x4a2f1b,
};

const geoCache = new Map();
function box(w, h, d) {
  const key = `${w}|${h}|${d}`;
  let g = geoCache.get(key);
  if (!g) {
    g = new THREE.BoxGeometry(w, h, d);
    geoCache.set(key, g);
  }
  return g;
}

const matCache = new Map();
function paint(color) {
  let m = matCache.get(color);
  if (!m) {
    m = new THREE.MeshLambertMaterial({ color });
    matCache.set(color, m);
  }
  return m;
}

function block(w, h, d, color, name, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(box(w, h, d), paint(color));
  m.name = name;
  m.position.set(x, y, z);
  return m;
}

/** Parts a pose is allowed to rotate. Anything not listed stays at zero. */
const POSEABLE = ['torso', 'head', 'hat', 'face', 'armL', 'armR', 'legL', 'legR', 'gun'];

/**
 * T014b (R51/R52): the slots a cosmetic purchase may repaint, and the meshes
 * each one owns. The slot names are the store's `kind` minus its `cosmetic-`
 * prefix, so the shelf in progress/store.js drives the rig without a branch.
 * Repainting swaps a mesh's material for the cached one of the new colour
 * rather than mutating the shared material — R21 caches one material per
 * colour, so mutating it would recolour every cowboy in town.
 */
const TINTABLE = Object.freeze({
  hat: ['brim', 'crown'],
  outfit: ['chest', 'vest'],
  gun: ['barrel'],
});

/**
 * Static pose targets, in radians. `walk`/`run` are computed from the gait phase
 * instead (see applyGait), so they are absent here.
 */
const POSES = {
  idle: { torso: { x: 0.02 }, armL: { x: 0.06, z: 0.08 }, armR: { x: -0.04, z: -0.08 } },
  /**
   * T020b (R73): the face-off hover. The shooting hand hangs over the holster and
   * the body cocks toward it, but the gun is still IN it — `draw` is the reach,
   * `aim` the exchange. This is the beat that makes the pre-DRAW wait readable.
   */
  ready: {
    torso: { x: 0.05, y: -0.12 },
    head: { y: -0.10 },
    armR: { x: 0.42, z: -0.30 },
    armL: { x: 0.10, z: 0.14 },
    legL: { x: -0.06 },
    legR: { x: 0.10 },
  },
  aim: {
    torso: { x: -0.04, y: 0.06 },
    head: { x: 0.10 },
    armL: { x: -1.30, z: 0.30 },
    armR: { x: -1.45, z: -0.12 },
    legL: { x: -0.14 },
    legR: { x: 0.16 },
    // The arm pitches -1.45 rad; without this counter-rotation the barrel
    // points straight up and parts.muzzle floats by the face (T009/T016
    // anchor flash, smoke and aim at the muzzle, so it must sit forward).
    gun: { x: 1.45 },
  },
  draw: {
    torso: { x: 0.06, y: -0.24 },
    head: { y: -0.14 },
    armR: { x: 0.85, z: -0.55 },
    armL: { x: -0.35, z: 0.2 },
    legL: { x: -0.22 },
    legR: { x: 0.20 },
    gun: { x: 0.5 },
  },
  recoil: {
    torso: { x: -0.10 },
    head: { x: -0.16 },
    hat: { x: -0.12 },
    armL: { x: -1.20 },
    armR: { x: -1.95, z: -0.10 },
    // Cancels most of the -1.95 arm pitch so the barrel stays forward and
    // only kicks up ~0.15 rad — a snap, not a spin into the sky.
    gun: { x: 1.80 },
  },
  hit: {
    torso: { x: -0.34, y: 0.10 },
    head: { x: -0.26, y: 0.20 },
    hat: { x: -0.20, z: 0.12 },
    armL: { x: 0.50, z: 0.90 },
    armR: { x: 0.30, z: -1.00 },
    legL: { x: 0.26 },
    legR: { x: -0.16 },
  },
  celebrate: {
    torso: { x: -0.06 },
    armL: { x: -2.40, z: 0.35 },
    armR: { x: -2.55, z: -0.35 },
    head: { x: -0.18 },
    hat: { x: -0.10 },
  },
};

// A typo in the pose table is a programming error, caught when the module loads
// rather than mid-duel when the pose is requested.
for (const [name, target] of Object.entries(POSES)) {
  for (const part of Object.keys(target)) {
    if (!POSEABLE.includes(part)) {
      throw new Error(`cowboy.js: pose "${name}" targets unknown part "${part}"`);
    }
  }
}

/** Limb swing amplitude for the animated gaits. */const GAIT = {
  walk: { freq: 7.0, arm: 0.62, leg: 0.72, twist: 0.06, bob: 0.030 },
  run: { freq: 11.0, arm: 0.95, leg: 1.05, twist: 0.10, bob: 0.055 },
};

let nextId = 0;

/**
 * Build a cowboy.
 * @param {object} palette colour overrides over DEFAULT_PALETTE
 * @param {object} options { scene } adds the character to that scene immediately
 * @returns the character handle
 */
export function createCowboy(palette = {}, options = {}) {
  const pal = { ...DEFAULT_PALETTE, ...palette };
  const id = `cowboy-${nextId + 1}`;
  nextId += 1;

  const group = new THREE.Group();
  group.name = id;

  // --- legs: pivot at the hip, geometry hangs below it -------------------
  const legL = new THREE.Group();
  legL.name = 'legL';
  legL.position.set(-DIM.legW, DIM.legH, 0);
  legL.add(block(DIM.legW, DIM.legH, DIM.legD, pal.pants, 'legL.thigh', 0, -DIM.legH / 2, 0));
  legL.add(block(DIM.legW + 0.03, 0.14, DIM.legD + 0.08, pal.boots, 'legL.boot', 0, -DIM.legH + 0.07, 0.02));

  const legR = new THREE.Group();
  legR.name = 'legR';
  legR.position.set(DIM.legW, DIM.legH, 0);
  legR.add(block(DIM.legW, DIM.legH, DIM.legD, pal.pants, 'legR.thigh', 0, -DIM.legH / 2, 0));
  legR.add(block(DIM.legW + 0.03, 0.14, DIM.legD + 0.08, pal.boots, 'legR.boot', 0, -DIM.legH + 0.07, 0.02));

  // --- torso: pivot at the hip so leaning twists the whole upper body ----
  const torso = new THREE.Group();
  torso.name = 'torso';
  torso.position.set(0, DIM.legH, 0);
  const chest = block(DIM.torsoW, DIM.torsoH, DIM.torsoD, pal.shirt, 'chest', 0, DIM.torsoH / 2, 0);
  torso.add(chest);
  torso.add(block(DIM.torsoW + 0.04, DIM.torsoH * 0.55, DIM.torsoD + 0.05, pal.vest, 'vest', 0, DIM.torsoH * 0.32, 0));
  torso.add(block(DIM.torsoW + 0.02, 0.10, DIM.torsoD + 0.02, pal.belt, 'belt', 0, 0.06, 0));
  torso.add(block(DIM.torsoW * 0.7, 0.12, DIM.torsoD + 0.06, pal.bandana, 'bandana', 0, DIM.torsoH - 0.06, 0));

  // --- head + face + hat: pivot at the neck ------------------------------
  const head = new THREE.Group();
  head.name = 'head';
  head.position.set(0, DIM.torsoH + DIM.neck, 0);
  const skull = block(DIM.headW, DIM.headH, DIM.headD, pal.skin, 'skull', 0, DIM.headH / 2, 0);
  head.add(skull);

  const face = new THREE.Group();
  face.name = 'face';
  face.position.set(0, DIM.headH / 2, DIM.headD / 2);
  face.add(block(0.09, 0.10, 0.03, pal.eyes, 'eyeL', -0.10, 0.05, 0.01));
  face.add(block(0.09, 0.10, 0.03, pal.eyes, 'eyeR', 0.10, 0.05, 0.01));
  face.add(block(0.18, 0.04, 0.03, pal.mouth, 'mouth', 0, -0.09, 0.01));
  head.add(face);

  const hat = new THREE.Group();
  hat.name = 'hat';
  hat.position.set(0, DIM.headH, 0);
  hat.add(block(DIM.brimW, DIM.brimH, DIM.brimD, pal.hat, 'brim', 0, DIM.brimH / 2, 0));
  hat.add(block(DIM.crownW, DIM.crownH, DIM.crownD, pal.hat, 'crown', 0, DIM.brimH + DIM.crownH / 2, 0));
  hat.add(block(DIM.crownW + 0.02, 0.07, DIM.crownD + 0.02, pal.hatBand, 'hatBand', 0, DIM.brimH + 0.05, 0));
  head.add(hat);
  torso.add(head);

  // --- arms: pivot at the shoulder, geometry hangs below -----------------
  const shoulderY = DIM.torsoH - 0.06;
  const shoulderX = DIM.torsoW / 2 + DIM.armW / 2 - 0.02;

  const armL = new THREE.Group();
  armL.name = 'armL';
  armL.position.set(-shoulderX, shoulderY, 0);
  armL.add(block(DIM.armW, DIM.armH, DIM.armD, pal.shirt, 'armL.sleeve', 0, -DIM.armH / 2, 0));
  armL.add(block(DIM.armW, 0.14, DIM.armD, pal.skin, 'armL.hand', 0, -DIM.armH + 0.07, 0));
  torso.add(armL);

  const armR = new THREE.Group();
  armR.name = 'armR';
  armR.position.set(shoulderX, shoulderY, 0);
  armR.add(block(DIM.armW, DIM.armH, DIM.armD, pal.shirt, 'armR.sleeve', 0, -DIM.armH / 2, 0));
  armR.add(block(DIM.armW, 0.14, DIM.armD, pal.skin, 'armR.hand', 0, -DIM.armH + 0.07, 0));

  // The revolver lives in the right hand, so it follows every arm pose.
  const gun = new THREE.Group();
  gun.name = 'gun';
  gun.position.set(0, -DIM.armH + 0.02, 0.04);
  gun.add(block(0.08, 0.11, 0.32, pal.gun, 'barrel', 0, 0, 0.16));
  gun.add(block(0.07, 0.16, 0.10, pal.gunGrip, 'grip', 0, -0.10, -0.02));
  const muzzle = new THREE.Object3D();
  muzzle.name = 'muzzle';
  muzzle.position.set(0, 0.02, 0.34);
  gun.add(muzzle);
  armR.add(gun);
  torso.add(armR);

  group.add(legL, legR, torso);

  const parts = { torso, chest, head, skull, face, hat, armL, armR, legL, legR, gun, muzzle };

  // --- cosmetics (T014b) ---------------------------------------------------
  /** slot -> the meshes a purchase repaints, resolved once at build time. */
  const tintable = {};
  /** slot -> the colour the store last bought (null = the rig's own palette). */
  const tints = {};
  for (const [slot, names] of Object.entries(TINTABLE)) {
    const meshes = names.map((n) => group.getObjectByName(n)).filter((m) => !!m);
    for (const m of meshes) m.userData.baseMaterial = m.material;
    tintable[slot] = meshes;
    tints[slot] = null;
  }

  /**
   * Repaint one slot on THIS rig only. `color` is a 0xRRGGBB integer, or null
   * to hand the meshes back to the palette they were built with (R59: a new
   * run must not keep last run's hat).
   */
  function tint(slot, color = null) {
    const meshes = tintable[slot];
    if (!meshes) throw new Error(`tint: unknown cosmetic slot "${slot}"`);
    if (color !== null && (!Number.isInteger(color) || color < 0 || color > 0xffffff)) {
      throw new Error(`tint: not a colour: ${color}`);
    }
    for (const m of meshes) m.material = color === null ? m.userData.baseMaterial : paint(color);
    tints[slot] = color;
    return api;
  }

  /** What a check reads: the live material colour of each repaintable slot. */
  function colors() {
    const out = {};
    for (const [slot, meshes] of Object.entries(tintable)) {
      out[slot] = meshes.length ? meshes[0].material.color.getHex() : null;
    }
    return out;
  }

  // --- posing -----------------------------------------------------------
  let pose = 'idle';
  let phase = Math.PI / 2; // start mid-stride so a walk pose reads instantly
  let breath = 0;
  let gaitSpeed = 1;

  function zeroPosables() {
    for (const name of POSEABLE) {
      parts[name].rotation.set(0, 0, 0);
    }
  }

  function applyGait() {
    const g = GAIT[pose];
    if (!g) return;
    const s = Math.sin(phase);
    parts.armL.rotation.x = g.arm * s;
    parts.armR.rotation.x = -g.arm * s;
    parts.legL.rotation.x = -g.leg * s;
    parts.legR.rotation.x = g.leg * s;
    parts.torso.rotation.y = -g.twist * s;
    torso.position.y = DIM.legH + Math.abs(Math.sin(phase)) * g.bob;
  }

  /** Snap to a named pose. Unknown names are a programming error. */
  function setPose(name) {
    if (name !== 'walk' && name !== 'run' && !POSES[name]) {
      throw new Error(`createCowboy: unknown pose "${name}"`);
    }
    pose = name;
    zeroPosables();
    if (name === 'walk' || name === 'run') {
      applyGait();
      return api;
    }
    const target = POSES[name];
    for (const part of Object.keys(target)) {
      const r = target[part];
      parts[part].rotation.set(r.x || 0, r.y || 0, r.z || 0);
    }
    torso.position.y = DIM.legH;
    return api;
  }

  /**
   * Advance the gait / idle breathing.
   * @param {number} dt seconds
   * @param {object} opts { speed: 0..1 } how fast the character is moving
   */
  function update(dt, opts = {}) {
    // A bad frame delta (NaN/Infinity) must not poison the gait phase and
    // every limb rotation with it — clamp to a no-op step instead.
    const step = Number.isFinite(dt) ? Math.max(0, dt) : 0;
    const raw = opts.speed === undefined ? gaitSpeed : opts.speed;
    gaitSpeed = Number.isFinite(raw) ? Math.max(0, Math.min(1, raw)) : gaitSpeed;
    if (pose === 'walk' || pose === 'run') {
      phase += step * GAIT[pose].freq * (0.2 + gaitSpeed);
      if (phase > Math.PI * 2) phase -= Math.PI * 2;
      applyGait();
    } else if (pose === 'idle') {
      breath += step;
      parts.torso.rotation.x = POSES.idle.torso.x + Math.sin(breath * 1.6) * 0.02;
      parts.head.rotation.y = Math.sin(breath * 0.5) * 0.05;
    }
    return api;
  }

  const api = {
    id,
    group,
    parts,
    palette: pal,
    height: COWBOY_HEIGHT,
    radius: COWBOY_RADIUS,
    get pose() { return pose; },
    get yaw() { return group.rotation.y; },
    setPose,
    update,
    /** T014b (R51): repaint a cosmetic slot; null restores the built palette. */
    tint,
    colors,
    /** Which slots a purchase has repainted, and to what (null = untouched). */
    tinted: () => ({ ...tints }),
    setYaw(rad) { group.rotation.y = rad; return api; },
    turnTo(dx, dz) { group.rotation.y = Math.atan2(dx, dz); return api; },
    moveTo(x, y, z) { group.position.set(x, y, z); return api; },
    addTo(scene) { scene.add(group); return api; },
    /** Detach this character. Geometry/materials are shared, so they stay alive. */
    dispose() {
      group.removeFromParent();
      return api;
    },
  };

  if (options.scene) options.scene.add(group);
  setPose('idle');
  return api;
}
