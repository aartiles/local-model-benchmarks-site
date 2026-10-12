// src/npcs.js — ambient town life (M09): wandering/blocky townsfolk with
// chat bubbles, plus the atmosphere pass (drifting dust, tumbleweeds,
// chimney smoke, distant birds). All lightweight: merged/instanced where
// possible, a handful of draw calls, no extra lights (DECISIONS D06).

import * as THREE from '../vendor/three.module.js';
import { buildCowboy } from './player.js';

const R = (a, b) => a + Math.random() * (b - a);

const PALETTES = [
  [0x8a6a4a, 0x5a4632, 0x5a4a3a],
  [0x7a5a6a, 0x4a3a4a, 0x4a3a4a],
  [0x6a7a5a, 0x4a5a3a, 0x3a4a3a],
  [0x9a7a5a, 0x6a5a3a, 0x5a4a3a],
  [0x5a6a7a, 0x3a4a5a, 0x3a4a5a],
  [0x8a5a4a, 0x5a3a2a, 0x4a3a2a],
];

const CHAT = ['Howdy!', 'Hot today...', 'Heard a new gun\u2019s in town.', 'My mule\u2019s spooked again.',
  'Careful out there.', 'Whiskey\u2019s on the house!', 'That wind...', 'Bless your heart.'];

// Waypoints around the town (open ground only).
const WAYPOINTS = [
  { x: -20, z: -6 }, { x: -8, z: -6 }, { x: 8, z: -6 }, { x: 20, z: -6 },
  { x: -14, z: 2 }, { x: 14, z: 2 }, { x: -28, z: 10 }, { x: 28, z: 2 },
  { x: -6, z: 14 }, { x: 8, z: 18 }, { x: -24, z: 26 }, { x: 26, z: 26 },
  { x: 0, z: 26 }, { x: -30, z: -20 }, { x: 30, z: -20 },
];

function chatSprite(text) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 96;
  const g = c.getContext('2d');
  g.fillStyle = 'rgba(255,248,225,0.95)';
  const w = 200, h = 56;
  g.beginPath();
  g.roundRect(28, 8, w, h, 12);
  g.fill();
  g.beginPath(); // tail
  g.moveTo(118, 64); g.lineTo(138, 64); g.lineTo(128, 84);
  g.closePath();
  g.fill();
  g.fillStyle = '#3a2a18';
  g.font = 'bold 30px Georgia, serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(text, 128, 38);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthTest: false }));
  s.scale.set(1.9, 0.72, 1);
  return s;
}

class Townsfolk {
  constructor(scene) {
    const [duster, hat, pants] = PALETTES[(Math.random() * PALETTES.length) | 0];
    const { group, parts } = buildCowboy(duster, hat, pants);
    group.name = 'townsfolk';
    scene.add(group);
    this.group = group;
    this.parts = parts;
    this.target = { ...WAYPOINTS[(Math.random() * WAYPOINTS.length) | 0] };
    this.wait = R(1, 5);
    this.chatTimer = R(4, 12);
    this.chatT = 0;
    this.bubble = null;
    this.speed = R(1.2, 1.8);
    this.facing = R(0, Math.PI * 2);
    this._scatter = 0;
    this._scatterDir = new THREE.Vector3();
  }

  update(dt, t, playerPos, duel) {
    const p = this.group.position;
    // React to duels: nearby folk turn to watch; some scatter when it gets loud.
    if (duel && duel.active) {
      const spot = duel.opponent.group.position;
      const d = Math.hypot(p.x - spot.x, p.z - spot.z);
      if (d < 22) {
        const want = Math.atan2(spot.x - p.x, spot.z - p.z);
        let dd = (want - this.facing) % (Math.PI * 2);
        if (dd > Math.PI) dd -= Math.PI * 2;
        if (dd < -Math.PI) dd += Math.PI * 2;
        this.facing += dd * Math.min(1, dt * 5);
        if (duel.state === 'shooting' && d < 16 && this._scatter <= 0 && Math.random() < dt * 0.8) {
          this._scatter = 2.5;
          this._scatterDir.set(-Math.sin(this.facing), 0, -Math.cos(this.facing)); // run away
        }
      }
    }
    let vx = 0, vz = 0;
    if (this._scatter > 0) {
      this._scatter -= dt;
      vx = this._scatterDir.x * 3.2;
      vz = this._scatterDir.z * 3.2;
    } else {
      const dx = this.target.x - p.x, dz = this.target.z - p.z;
      const d = Math.hypot(dx, dz);
      if (d > 0.6) {
        vx = (dx / d) * this.speed;
        vz = (dz / d) * this.speed;
        const want = Math.atan2(dx, dz);
        let dd = (want - this.facing) % (Math.PI * 2);
        if (dd > Math.PI) dd -= Math.PI * 2;
        if (dd < -Math.PI) dd += Math.PI * 2;
        this.facing += dd * Math.min(1, dt * 8);
      } else {
        this.wait -= dt;
        if (this.wait <= 0) {
          this.wait = R(2, 8);
          const wp = WAYPOINTS[(Math.random() * WAYPOINTS.length) | 0];
          this.target = { ...wp };
        }
      }
    }
    p.x = Math.max(-33, Math.min(33, p.x + vx * dt));
    p.z = Math.max(-33, Math.min(33, p.z + vz * dt));
    this.group.rotation.y = this.facing;
    // Walk cycle.
    const moving = Math.hypot(vx, vz) > 0.1;
    if (moving) {
      this._phase = (this._phase || 0) + dt * Math.hypot(vx, vz) * 2.2;
      const s = Math.sin(this._phase) * 0.6;
      this.parts.legL.rotation.x = s;
      this.parts.legR.rotation.x = -s;
      this.parts.armL.rotation.x = -s * 0.8;
      this.parts.armR.rotation.x = s * 0.8;
    } else {
      this.parts.legL.rotation.x *= 1 - Math.min(1, dt * 8);
      this.parts.legR.rotation.x *= 1 - Math.min(1, dt * 8);
      this.parts.armL.rotation.x *= 1 - Math.min(1, dt * 8);
      this.parts.armR.rotation.x *= 1 - Math.min(1, dt * 8);
    }
    // Chat bubbles.
    this.chatTimer -= dt;
    if (this.chatTimer <= 0 && !this.bubble) {
      this.chatTimer = R(9, 20);
      this.chatT = 2.6;
      this.bubble = chatSprite(CHAT[(Math.random() * CHAT.length) | 0]);
      this.bubble.position.set(0, 2.9, 0);
      this.group.add(this.bubble);
    }
    if (this.bubble) {
      this.chatT -= dt;
      this.bubble.material.opacity = Math.min(1, this.chatT);
      if (this.chatT <= 0) {
        this.group.remove(this.bubble);
        this.bubble.material.map.dispose();
        this.bubble.material.dispose();
        this.bubble = null;
      }
    }
  }
}

export class NpcTown {
  constructor(scene, town) {
    this.scene = scene;
    this.town = town;
    this.folk = [];
    for (let i = 0; i < 6; i++) {
      const f = new Townsfolk(scene);
      const wp = WAYPOINTS[(Math.random() * WAYPOINTS.length) | 0];
      f.group.position.set(wp.x + R(-2, 2), 0, wp.z + R(-2, 2));
      this.folk.push(f);
    }
    this._buildAtmosphere();
  }

  _buildAtmosphere() {
    const scene = this.scene;
    // Drifting dust: one Points cloud that wraps around the player.
    const N = 110;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = R(-30, 30);
      pos[i * 3 + 1] = R(0.1, 6);
      pos[i * 3 + 2] = R(-30, 30);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.dust = new THREE.Points(geo, new THREE.PointsMaterial({
      color: 0xd8c49a, size: 0.14, transparent: true, opacity: 0.55, sizeAttenuation: true,
    }));
    scene.add(this.dust);

    // Tumbleweeds: little rolling ball of sticks.
    this.weeds = [];
    for (let i = 0; i < 3; i++) {
      const g = new THREE.Group();
      const mat = new THREE.MeshLambertMaterial({ color: 0xa8905a });
      const parts = [];
      for (let k = 0; k < 5; k++) {
        const b = new THREE.BoxGeometry(0.5, 0.05, 0.05);
        b.rotateZ((k / 5) * Math.PI);
        b.rotateY(R(0, Math.PI));
        parts.push(b);
      }
      const m = new THREE.Mesh(mergeParts(parts), mat);
      m.castShadow = true;
      g.add(m);
      g.position.set(R(-30, 30), 0.28, R(-8, 8));
      scene.add(g);
      this.weeds.push({ g, speed: R(2.5, 4.5), spin: R(3, 6), dir: Math.random() < 0.5 ? 1 : -1 });
    }

    // Chimney smoke from the saloon (chimney world pos ≈ (-16.8, 4.6, -12.5)).
    this.smoke = [];
    for (let i = 0; i < 6; i++) {
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshBasicMaterial({ color: 0xcfc8bc, transparent: true, opacity: 0 }),
      );
      scene.add(m);
      this.smoke.push({ m, phase: i / 6 });
    }

    // Distant birds: tiny V shapes circling high.
    this.birds = [];
    for (let i = 0; i < 4; i++) {
      const g = new THREE.Group();
      const mat = new THREE.MeshBasicMaterial({ color: 0x3a3a3a });
      const wl = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.03, 0.12), mat);
      wl.position.x = -0.25;
      const wr = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.03, 0.12), mat);
      wr.position.x = 0.25;
      g.add(wl, wr);
      scene.add(g);
      this.birds.push({ g, wl, wr, r: R(45, 70), h: R(24, 36), a: R(0, 7), speed: R(0.05, 0.1), flap: R(0, 7) });
    }
  }

  update(dt, t, playerPos, duel) {
    for (const f of this.folk) f.update(dt, t, playerPos, duel);
    // Dust drifts with the wind and wraps around the player.
    const p = this.dust.geometry.attributes.position;
    const arr = p.array;
    for (let i = 0; i < p.count; i++) {
      arr[i * 3] += dt * 1.2;
      arr[i * 3 + 1] += Math.sin(t * 0.7 + i) * dt * 0.15;
      if (arr[i * 3] > playerPos.x + 30) arr[i * 3] -= 60;
      if (arr[i * 3] < playerPos.x - 30) arr[i * 3] += 60;
      if (arr[i * 3 + 2] > playerPos.z + 30) arr[i * 3 + 2] -= 60;
      if (arr[i * 3 + 2] < playerPos.z - 30) arr[i * 3 + 2] += 60;
    }
    p.needsUpdate = true;
    // Tumbleweeds roll across the street.
    for (const w of this.weeds) {
      w.g.position.x += w.speed * w.dir * dt;
      w.g.position.y = 0.28 + Math.abs(Math.sin(t * 3 + w.speed)) * 0.12;
      w.g.rotation.z -= w.spin * w.dir * dt;
      if (w.g.position.x > 34) w.g.position.x = -34;
      if (w.g.position.x < -34) w.g.position.x = 34;
    }
    // Chimney smoke loop.
    for (const s of this.smoke) {
      const k = (t * 0.25 + s.phase) % 1;
      s.m.position.set(-16.8 + Math.sin(t + s.phase * 9) * 0.3, 4.6 + k * 2.6, -12.5 + Math.cos(t * 0.8 + s.phase * 7) * 0.3);
      s.m.material.opacity = 0.5 * (1 - k) * Math.min(1, k * 5);
      s.m.scale.setScalar(0.6 + k * 1.4);
    }
    // Birds circle far overhead.
    for (const b of this.birds) {
      b.a += b.speed * dt;
      b.g.position.set(Math.cos(b.a) * b.r, b.h + Math.sin(t + b.flap) * 1.5, Math.sin(b.a) * b.r);
      b.g.rotation.y = -b.a;
      const f = Math.sin(t * 6 + b.flap) * 0.5;
      b.wl.rotation.z = f;
      b.wr.rotation.z = -f;
    }
  }
}

// Tiny local merge (avoids importing BufferGeometryUtils from the vendored build).
function mergeParts(geos) {
  let vc = 0, ic = 0;
  for (const g of geos) { vc += g.attributes.position.count; ic += g.index.count; }
  const pos = new Float32Array(vc * 3);
  const nor = new Float32Array(vc * 3);
  const idx = new Uint32Array(ic);
  let vo = 0, io = 0, base = 0;
  for (const g of geos) {
    pos.set(g.attributes.position.array, vo * 3);
    nor.set(g.attributes.normal.array, vo * 3);
    const gi = g.index.array;
    for (let i = 0; i < gi.length; i++) idx[io++] = base + gi[i];
    vo += g.attributes.position.count;
    base = vo;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  out.setIndex(new THREE.BufferAttribute(idx, 1));
  return out;
}
