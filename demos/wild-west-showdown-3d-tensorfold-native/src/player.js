// src/player.js — blocky cowboy: rig, movement, walk animation (M02),
// draw pose / hit reaction / cosmetics (M04+).
// Character local forward is +Z; group origin is at the feet.
//
// Performance (DECISIONS D06): every rig part is merged into a single
// vertex-colored geometry, so each cowboy costs 7 draw calls (body, hat
// crown, 2 arms, gun, 2 legs) with ONE shared material. Recoloring a part
// (cosmetics) rewrites its vertex colors — no new materials.

import * as THREE from '../vendor/three.module.js';

const WALK_SPEED = 4.2; // m/s
const RUN_SPEED = 7.0;  // m/s
const ACCEL = 11;       // exponential damping stiffness (snappy, arcade)

const SKIN = 0xe8b88a;
const BELT = 0x4a3826;
const EYE = 0x2a1c10;
const BOOT = 0x3a2c1c;

/** One shared material for every vertex-colored rig part in the game. */
export const RIG_MAT = new THREE.MeshLambertMaterial({ vertexColors: true });

/** A box with a solid vertex color, translated into place. */
function part(name, size, pos, color) {
  const g = new THREE.BoxGeometry(size[0], size[1], size[2]);
  g.translate(pos[0], pos[1], pos[2]);
  const c = new THREE.Color(color);
  const n = g.attributes.position.count;
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b; }
  g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  return { name, geo: g };
}

/** Merge vertex-colored parts into one geometry; records per-part vertex
 *  ranges in the mesh's userData so parts can be recolored later. */
function mergedPartMesh(parts) {
  let vc = 0, ic = 0;
  for (const p of parts) { vc += p.geo.attributes.position.count; ic += p.geo.index.count; }
  const pos = new Float32Array(vc * 3);
  const nor = new Float32Array(vc * 3);
  const col = new Float32Array(vc * 3);
  const idx = new Uint32Array(ic);
  const ranges = [];
  let vo = 0, io = 0, base = 0;
  for (const p of parts) {
    pos.set(p.geo.attributes.position.array, vo * 3);
    nor.set(p.geo.attributes.normal.array, vo * 3);
    col.set(p.geo.attributes.color.array, vo * 3);
    const gi = p.geo.index.array;
    for (let i = 0; i < gi.length; i++) idx[io++] = base + gi[i];
    ranges.push({ name: p.name, start: vo, count: p.geo.attributes.position.count });
    vo += p.geo.attributes.position.count;
    base = vo;
    p.geo.dispose();
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  g.setIndex(new THREE.BufferAttribute(idx, 1));
  const m = new THREE.Mesh(g, RIG_MAT);
  m.castShadow = true;
  m.userData.parts = ranges;
  return m;
}

/** Rewrite the vertex colors of one named part (cosmetic upgrades). */
export function recolorPart(mesh, name, hex) {
  const c = new THREE.Color(hex);
  const attr = mesh.geometry.attributes.color;
  for (const p of mesh.userData.parts) {
    if (p.name !== name) continue;
    for (let i = p.start; i < p.start + p.count; i++) {
      attr.array[i * 3] = c.r; attr.array[i * 3 + 1] = c.g; attr.array[i * 3 + 2] = c.b;
    }
  }
  attr.needsUpdate = true;
}

/**
 * Build the chunky blocky figure. Returns { group, parts } where parts hold
 * the pivots the animation code swings (local +Z is the face). The right
 * hand carries a small blocky revolver; the draw animation raises the arm.
 */
export function buildCowboy(dusterColor, hatColor, pantsColor = 0x6b5644, gunColor = 0x3a3a3a) {
  const g = new THREE.Group();

  // Upper body, merged: torso + belt + head + eyes + hat brim.
  // Pivots at (0, 1.32, 0) so the whole upper body bobs together.
  const torso = mergedPartMesh([
    part('duster', [0.9, 0.95, 0.55], [0, 0, 0], dusterColor),
    part('belt', [0.92, 0.12, 0.58], [0, -0.41, 0], BELT),
    part('head', [0.62, 0.5, 0.55], [0, 0.68, 0], SKIN),
    part('eyeL', [0.09, 0.1, 0.05], [-0.15, 0.74, 0.28], EYE),
    part('eyeR', [0.09, 0.1, 0.05], [0.15, 0.74, 0.28], EYE),
    part('hat', [1.05, 0.08, 1.0], [0, 0.96, 0.04], hatColor),
  ]);
  torso.position.set(0, 1.32, 0);

  // Hat crown: separate so a hit can pop it off.
  const hatCrown = mergedPartMesh([part('hat', [0.55, 0.26, 0.55], [0, 0, 0], hatColor)]);
  hatCrown.position.set(0, 2.44, 0.02);

  // Arms — pivots at the shoulders, hanging down.
  const mkArm = (side) => {
    const pivot = new THREE.Group();
    pivot.position.set(0.56 * side, 1.68, 0);
    const arm = mergedPartMesh([
      part('duster', [0.22, 0.75, 0.26], [0, -0.36, 0], dusterColor),
      part('hand', [0.16, 0.14, 0.18], [0, -0.76, 0], SKIN),
    ]);
    pivot.add(arm);
    return pivot;
  };
  const armL = mkArm(-1);
  const armR = mkArm(1);

  // Revolver in the right hand: barrel forward (+Z).
  const gun = mergedPartMesh([
    part('gun', [0.1, 0.12, 0.34], [0, -0.78, 0.2], gunColor),
    part('grip', [0.08, 0.16, 0.1], [0, -0.72, 0.02], gunColor),
  ]);
  gun.name = 'gun';
  armR.add(gun);

  // Legs — pivots at the hips.
  const mkLeg = (side) => {
    const pivot = new THREE.Group();
    pivot.position.set(0.24 * side, 0.88, 0);
    const leg = mergedPartMesh([
      part('pants', [0.3, 0.85, 0.32], [0, -0.43, 0], pantsColor),
      part('boot', [0.3, 0.14, 0.4], [0, -0.8, 0.04], BOOT),
    ]);
    pivot.add(leg);
    return pivot;
  };
  const legL = mkLeg(-1);
  const legR = mkLeg(1);

  g.add(torso, hatCrown, armL, armR, legL, legR);
  return { group: g, parts: { torso, head: torso, hatBrim: torso, hatCrown, armL, armR, legL, legR } };
}

function dampAngle(a, b, t) {
  let d = (b - a) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return a + d * t;
}

export class Player {
  constructor(scene, dusterColor = 0x4a6b8a, hatColor = 0x5a4632, town = null, gunColor = 0x3a3a3a) {
    const { group, parts } = buildCowboy(dusterColor, hatColor, 0x6b5644, gunColor);
    scene.add(group);
    this.group = group;
    this.parts = parts;
    this.velocity = new THREE.Vector3();
    this.facing = Math.PI; // start facing -Z (local +Z forward)
    this.animPhase = 0;
    this.speedNow = 0;
    this._fall = 0;
    this._recoil = 0;
    // The fenced town square is 70×70 m (M03); the player stops just inside
    // the fence posts (±35) so it never visually clips the boundary fence.
    this.bounds = { minX: -34.5, maxX: 34.5, minZ: -34.5, maxZ: 34.5 };
    this.town = town; // optional: provides isBlocked(x, z)
  }

  /** Apply cosmetic upgrades (hat / duster / gun colors). */
  setCosmetics({ hat, duster, gun }) {
    if (hat !== undefined) {
      recolorPart(this.parts.torso, 'hat', hat);
      recolorPart(this.parts.hatCrown, 'hat', hat);
    }
    if (duster !== undefined) {
      recolorPart(this.parts.torso, 'duster', duster);
      for (const arm of [this.parts.armL, this.parts.armR]) recolorPart(arm.children[0], 'duster', duster);
    }
    if (gun !== undefined) {
      const gunMesh = this.parts.armR.getObjectByName('gun');
      if (gunMesh) { recolorPart(gunMesh, 'gun', gun); recolorPart(gunMesh, 'grip', gun); }
    }
  }

  /** World-space muzzle position (for shot rays + FX). */
  muzzleWorld(out) {
    const gun = this.parts.armR.getObjectByName('gun');
    return gun.getWorldPosition(out);
  }

  /** Snap the rig into a clean standing pose, facing `facing` (radians). */
  place(x, z, facing) {
    this.group.position.set(x, 0, z);
    this.group.rotation.set(0, facing, 0);
    this.facing = facing;
    this.velocity.set(0, 0, 0);
    this._fall = 0;
    this._recoil = 0;
    this.parts.torso.position.y = 1.32;
    this.parts.armL.rotation.set(0, 0, 0);
    this.parts.armR.rotation.set(0, 0, 0);
    this.parts.legL.rotation.set(0, 0, 0);
    this.parts.legR.rotation.set(0, 0, 0);
  }

  /** Raise the gun arm to aim straight ahead (duel draw pose). */
  setDrawPose() {
    this.parts.armR.rotation.x = -Math.PI / 2 - 0.12;
    this.parts.armR.rotation.z = -0.15;
  }

  /** Cartoon hit reaction: stagger and fall backward. */
  playHit() {
    this._fall = 0.0001;
  }

  /** Per-frame fall animation (called by the duel while down). */
  animateHit(dt) {
    if (this._fall > 0) {
      this._fall = Math.min(1, this._fall + dt * 2.2);
      const e = 1 - (1 - this._fall) * (1 - this._fall); // easeOut
      this.group.rotation.x = -e * Math.PI / 2;
      this.group.position.y = -e * 0.55;
    }
  }

  /**
   * Move toward inputVec (-1..1, camera-relative) at walk/run speed.
   * cameraYaw: current orbit yaw, so W always means "away from the camera".
   */
  update(dt, moveX, moveY, running, cameraYaw) {
    const speed = running ? RUN_SPEED : WALK_SPEED;
    const sin = Math.sin(cameraYaw);
    const cos = Math.cos(cameraYaw);
    // Camera sits at (sin, 0, cos)*d behind the player, so forward is its negation.
    const fx = -sin, fz = -cos;
    const rx = cos, rz = -sin;
    let dx = fx * moveY + rx * moveX;
    let dz = fz * moveY + rz * moveX;
    const len = Math.hypot(dx, dz);
    if (len > 1) { dx /= len; dz /= len; }

    const t = 1 - Math.exp(-ACCEL * dt);
    this.velocity.x += (dx * speed - this.velocity.x) * t;
    this.velocity.z += (dz * speed - this.velocity.z) * t;
    if (Math.abs(this.velocity.x) < 0.01 && Math.abs(this.velocity.z) < 0.01) {
      this.velocity.x = 0;
      this.velocity.z = 0;
    }

    const p = this.group.position;
    const nx = p.x + this.velocity.x * dt;
    const nz = p.z + this.velocity.z * dt;
    if (this.town?.isBlocked(nx, p.z)) this.velocity.x = 0;
    if (this.town?.isBlocked(p.x, nz)) this.velocity.z = 0;
    p.x += this.velocity.x * dt;
    p.z += this.velocity.z * dt;
    p.x = Math.max(this.bounds.minX, Math.min(this.bounds.maxX, p.x));
    p.z = Math.max(this.bounds.minZ, Math.min(this.bounds.maxZ, p.z));

    // Face the way we're going (smooth, shortest arc).
    this.speedNow = Math.hypot(this.velocity.x, this.velocity.z);
    if (this.speedNow > 0.2) {
      const target = Math.atan2(this.velocity.x, this.velocity.z);
      this.facing = dampAngle(this.facing, target, 1 - Math.exp(-12 * dt));
    }
    this.group.rotation.y = this.facing;

    // Walk cycle: swing arms/legs, bob the body.
    const amp = Math.min(1, this.speedNow / WALK_SPEED);
    if (this.speedNow > 0.2) {
      this.animPhase += dt * this.speedNow * 1.9;
    } else {
      this.animPhase += dt * 2; // idle sway
    }
    const s = Math.sin(this.animPhase);
    const swing = 0.65 * amp + 0.06; // small idle sway
    this.parts.legL.rotation.x = s * swing;
    this.parts.legR.rotation.x = -s * swing;
    this.parts.armL.rotation.x = -s * swing * 0.8;
    this.parts.armR.rotation.x = s * swing * 0.8;
    this.parts.torso.position.y = 1.32 + Math.abs(Math.cos(this.animPhase)) * 0.05 * amp;
    this.group.position.y = 0; // feet stay grounded; bob is in the torso
    this.group.rotation.x = 0;
  }

  teleport(x, z) {
    this.group.position.set(x, 0, z);
    this.velocity.set(0, 0, 0);
  }
}
