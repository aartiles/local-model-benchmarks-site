// src/town.js — composed desert town (M03).
//
// One Group containing: main street, named buildings (saloon, sheriff's
// office, bank, general store, stable, water tower, two cabins), a boundary
// fence at ±35 m, a corral, props (barrels, crates, hitching post + horse,
// cactus, rocks, sway plants) and a distant mesa/mountain ring.
//
// Performance (DECISIONS D06): repeated props of the same material are merged
// into single geometries at build time, so the whole town renders in a few
// dozen draw calls. Collision is arcade-simple: one circle per building/prop
// (buildings are axis-aligned, so a circle of radius 0.5*sqrt(w²+d²) works).

import * as THREE from '../vendor/three.module.js';

const R = (a, b) => a + Math.random() * (b - a);

// --- small geometry helper -------------------------------------------------
// Merges geometries that all have position/normal/index (Box, Plane, Cone,
// Cylinder) into one. (No BufferGeometryUtils in the vendored three build.)
function mergeGeos(geos) {
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

// Bake a transform into a geometry so it can be merged later.
function baked(geo, x = 0, y = 0, z = 0, rotY = 0, s = 1) {
  if (s !== 1) geo.scale(s, s, s);
  if (rotY) geo.rotateY(rotY);
  geo.translate(x, y, z);
  return geo;
}

function mergedMesh(geos, mat, { cast = true, receive = true } = {}) {
  const m = new THREE.Mesh(mergeGeos(geos), mat);
  m.castShadow = cast;
  m.receiveShadow = receive;
  return m;
}

// Like baked(), but the point is in a parent group's local space: rotate the
// geometry first (about its own center), then translate to world space.
function bakedW(geo, wp, x = 0, y = 0, z = 0, rotY = 0) {
  if (rotY) geo.rotateY(rotY);
  const v = new THREE.Vector3(x, y, z).applyMatrix4(wp);
  geo.translate(v.x, v.y, v.z);
  return geo;
}

// --- canvas textures (≤1024px, D06) -----------------------------------------

function speckleCanvas(base, spots, size = 512, spotR = 1.6) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  g.fillStyle = base;
  g.fillRect(0, 0, size, size);
  for (let i = 0; i < spots; i++) {
    g.fillStyle = Math.random() < 0.5 ? 'rgba(0,0,0,0.10)' : 'rgba(255,245,225,0.10)';
    g.beginPath();
    g.arc(Math.random() * size, Math.random() * size, R(0.6, spotR), 0, 7);
    g.fill();
  }
  return c;
}

function woodCanvas(size = 512) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  g.fillStyle = '#8a6a48';
  g.fillRect(0, 0, size, size);
  const ph = size / 8; // 8 planks
  for (let i = 0; i < 8; i++) {
    const y = i * ph;
    g.fillStyle = i % 2 ? 'rgba(255,240,200,0.06)' : 'rgba(0,0,0,0.06)';
    g.fillRect(0, y, size, ph);
    g.fillStyle = 'rgba(40,26,14,0.5)';
    g.fillRect(0, y, size, 2);
  }
  for (let i = 0; i < 60; i++) {
    g.fillStyle = Math.random() < 0.5 ? 'rgba(40,26,14,0.12)' : 'rgba(255,235,200,0.08)';
    g.fillRect(Math.random() * size, Math.random() * size, R(8, 60), R(1, 3));
  }
  return c;
}

function streetCanvas() {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 172;
  const g = c.getContext('2d');
  g.fillStyle = '#b58a52';
  g.fillRect(0, 0, 1024, 172);
  for (let i = 0; i < 900; i++) {
    g.fillStyle = Math.random() < 0.5 ? 'rgba(90,60,30,0.18)' : 'rgba(255,230,190,0.12)';
    g.beginPath();
    g.arc(Math.random() * 1024, Math.random() * 172, R(0.6, 2.4), 0, 7);
    g.fill();
  }
  g.strokeStyle = 'rgba(80,55,28,0.35)';
  g.lineWidth = 5;
  g.beginPath(); g.moveTo(0, 52); g.lineTo(1024, 50); g.stroke();
  g.beginPath(); g.moveTo(0, 121); g.lineTo(1024, 124); g.stroke();
  g.fillStyle = 'rgba(70,48,25,0.5)';
  g.fillRect(0, 0, 1024, 6);
  g.fillRect(0, 166, 1024, 6);
  return c;
}

function skyCanvas() {
  const c = document.createElement('canvas');
  c.width = 16; c.height = 128;
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0.0, '#4f88c2');
  grad.addColorStop(0.55, '#8fc7e8');
  grad.addColorStop(0.82, '#d9c49a');
  grad.addColorStop(1.0, '#c9a878');
  g.fillStyle = grad;
  g.fillRect(0, 0, 16, 128);
  return c;
}

function windowCanvas() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = '#5a4632';
  g.fillRect(0, 0, 128, 128);
  for (const px of [10, 70]) {
    g.fillStyle = '#efe2ae';
    g.fillRect(px, 16, 48, 96);
    g.fillStyle = '#5a4632';
    g.fillRect(px + 22, 16, 4, 96);
    g.fillRect(px, 58, 48, 4);
  }
  return c;
}

function signCanvas(text) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = '#6b4a2e';
  g.fillRect(0, 0, 256, 128);
  g.fillStyle = 'rgba(40,26,14,0.6)';
  for (let y = 0; y < 128; y += 32) g.fillRect(0, y, 256, 2);
  g.strokeStyle = '#3a2a18';
  g.lineWidth = 8;
  g.strokeRect(4, 4, 248, 120);
  g.fillStyle = '#e8d5a8';
  g.font = 'bold 40px Georgia, serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(text, 128, 68);
  return c;
}

function tex(canvas, { repeat = null, srgb = true } = {}) {
  const t = new THREE.CanvasTexture(canvas);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  if (repeat) t.repeat.set(repeat[0], repeat[1]);
  t.anisotropy = 4;
  return t;
}

// A swinging hanging sign (pivot at its top). Registered in updates[].
function hangingSign(text, updates, w = 1.5, h = 0.85) {
  const g = new THREE.Group();
  const board = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, 0.08),
    new THREE.MeshLambertMaterial({ map: tex(signCanvas(text)) }),
  );
  board.position.y = -h / 2 - 0.35;
  board.castShadow = true;
  g.add(board);
  for (const cx of [-w / 3, w / 3]) {
    const chain = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.4, 0.05),
      new THREE.MeshLambertMaterial({ color: 0x3a3a3a }));
    chain.position.set(cx, -0.2, 0);
    g.add(chain);
  }
  const ph = Math.random() * 6;
  updates.push((t) => { g.rotation.z = Math.sin(t * 1.3 + ph) * 0.13; });
  return g;
}

// A fixed name board (box + textured front plane as one mesh is fine: use a
// thin box with the sign texture — text shows on all faces, acceptable).
function fixedSign(text, x, y, z, w, h) {
  const m = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, 0.1),
    new THREE.MeshLambertMaterial({ map: tex(signCanvas(text)) }),
  );
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}

// --- town ------------------------------------------------------------------

export class Town {
  constructor(scene) {
    this.group = new THREE.Group();
    this.group.name = 'town';
    scene.add(this.group);
    this.circles = [];      // {x, z, r} arcade colliders (props)
    this.boxes = [];        // {x, z, hw, hd} axis-aligned building colliders
    this.buildings = [];    // {name, x, z, w, d, rotY, group} — for checks/M04
    this.props = [];        // {name, x, z} repeated props (clipping checks)
    this.updates = [];      // fns(t) — wind / ambient motion
    this.landmarks = [];
    this.boundary = { minX: -35, maxX: 35, minZ: -35, maxZ: 35 };
    this._build();
  }

  circle(x, z, r) { this.circles.push({ x, z, r }); }

  /**
   * Returns the first collider blocking (x,z) for a body of radius R.
   * Buildings are axis-aligned (rotY 0 or π), so an AABB lets the player
   * walk right up to the walls — a circle of 0.5*sqrt(w²+d²) would block
   * the street in front of every facade.
   */
  isBlocked(x, z, R = 0.45) {
    for (const b of this.boxes) {
      const dx = Math.max(Math.abs(x - b.x) - b.hw, 0);
      const dz = Math.max(Math.abs(z - b.z) - b.hd, 0);
      if (dx * dx + dz * dz < R * R) return b;
    }
    for (const c of this.circles) {
      const dx = x - c.x, dz = z - c.z, rr = c.r + R;
      if (dx * dx + dz * dz < rr * rr) return c;
    }
    return null;
  }

  update(t) { for (const fn of this.updates) fn(t); }

  _build() {
    const root = this.group;
    const self = this; // building() is a plain fn; capture for callbacks

    // --- ground / street / sky ---
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(400, 400),
      new THREE.MeshLambertMaterial({ map: tex(speckleCanvas('#cfa878', 700), { repeat: [50, 50] }) }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    root.add(ground);
    this.landmarks.push('ground');

    const street = new THREE.Mesh(
      new THREE.PlaneGeometry(70, 12),
      new THREE.MeshLambertMaterial({ map: tex(streetCanvas()) }),
    );
    street.rotation.x = -Math.PI / 2;
    street.position.y = 0.05;
    street.receiveShadow = true;
    root.add(street);
    this.landmarks.push('main-street');

    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(300, 16, 12),
      new THREE.MeshBasicMaterial({ map: tex(skyCanvas()), side: THREE.BackSide, fog: false }),
    );
    root.add(sky);

    const matWood = new THREE.MeshLambertMaterial({ map: tex(woodCanvas()), color: 0xd8c8b0 });
    const matFence = new THREE.MeshLambertMaterial({ color: 0x8f6e4a });
    const matCactus = new THREE.MeshLambertMaterial({ color: 0x5c7d4a });
    const matRock = new THREE.MeshLambertMaterial({ color: 0x9a8d78 });
    const matBarrel = new THREE.MeshLambertMaterial({ color: 0x8a6238 });
    const matWindow = new THREE.MeshLambertMaterial({ map: tex(windowCanvas()) });
    const matDoor = new THREE.MeshLambertMaterial({ color: 0x5a3d26 });
    const matDark = new THREE.MeshLambertMaterial({ color: 0x2a1c10 });
    const paint = (c) => new THREE.MeshLambertMaterial({ color: c });

    const fences = [], cacti = [], rocks = [], barrels = [];
    const windows = [], doors = [];

    // --- buildings -----------------------------------------------------------
    function building(spec) {
      const g = new THREE.Group();
      g.name = spec.name + '-' + self.buildings.length;
      g.position.set(spec.x, 0, spec.z);
      g.rotation.y = spec.rotY ?? 0;
      const { w, d, h } = spec;
      const wp = new THREE.Matrix4()
        .makeTranslation(spec.x, 0, spec.z)
        .multiply(new THREE.Matrix4().makeRotationY(spec.rotY ?? 0));

      const walls = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), paint(spec.paint));
      walls.position.y = h / 2;
      walls.castShadow = walls.receiveShadow = true;
      g.add(walls);
      const slab = new THREE.Mesh(new THREE.BoxGeometry(w + 0.5, 0.4, d + 0.5), matWood);
      slab.position.y = 0.2;
      slab.castShadow = slab.receiveShadow = true;
      g.add(slab);
      if (spec.collide !== false) {
        self.boxes.push({ x: spec.x, z: spec.z, hw: w / 2, hd: d / 2 });
      }
      self.buildings.push({ name: spec.name, x: spec.x, z: spec.z, w, d, rotY: spec.rotY ?? 0, group: g });

      // Gabled roof.
      const roofG = new THREE.Group();
      if (spec.roof !== false) {
        const ang = Math.atan2(spec.rh, d / 2);
        const len = Math.sqrt((d / 2) ** 2 + spec.rh ** 2) * 1.04 + 0.1;
        const rm = paint(spec.roofPaint ?? 0x6e4a2c);
        for (const s of [1, -1]) {
          const m = new THREE.Mesh(new THREE.BoxGeometry(w + 1.2, 0.15, len), rm);
          m.position.set(0, h + spec.rh / 2, s * d / 4);
          m.rotation.x = s * ang;
          m.castShadow = m.receiveShadow = true;
          roofG.add(m);
        }
        const cap = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1, 3), rm);
        cap.scale.set(w + 0.9, spec.rh, d / 2 + 0.12);
        cap.rotation.y = -Math.PI / 6;
        cap.position.y = h + spec.rh / 2 + 0.05;
        cap.castShadow = true;
        roofG.add(cap);
      }
      g.add(roofG);

      // Door on local +Z face.
      if (spec.door !== false) {
        const door = new THREE.Mesh(new THREE.BoxGeometry(1.3, 2.2, 0.12), matDoor);
        door.position.set(0, 1.1, d / 2 + 0.06);
        door.castShadow = true;
        g.add(door);
        doors.push(bakedW(new THREE.BoxGeometry(1.3, 2.2, 0.12), wp, 0, 1.1, d / 2 + 0.06, spec.rotY ?? 0));
      }

      // Windows.
      for (const win of spec.windows ?? []) {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), matWindow);
        m.scale.set(win.w, win.h, 1);
        const zOff = win.face === 'b' ? -d / 2 - 0.03 : d / 2 + 0.03;
        m.position.set(win.dx, win.wy, zOff);
        if (win.face === 'b') m.rotation.y = Math.PI;
        g.add(m);
        windows.push(
          bakedW(new THREE.PlaneGeometry(win.w, win.h), wp, win.dx, win.wy, zOff,
            (spec.rotY ?? 0) + (win.face === 'b' ? Math.PI : 0)),
        );
      }

      if (spec.decorate) spec.decorate(g, this, wp);
      root.add(g);
      self.landmarks.push(spec.name);
    }

    // The north row sits on the street: facades ~2 m off the street edge
    // (street spans z −6..6), so the town reads as a main street, not a
    // row of buildings floating in the desert.

    // Saloon — the town's showpiece.
    building({
      name: 'saloon', x: -20, z: -12.5, w: 12, h: 3.6, d: 9, rh: 1.7,
      paint: 0x9c4a3a, roofPaint: 0x6e3a2e,
      windows: [
        { dx: -3.4, wy: 2.2, w: 2.4, h: 1.3, face: 'f' },
        { dx: 3.4, wy: 2.2, w: 2.4, h: 1.3, face: 'f' },
        { dx: 0, wy: 2.2, w: 3.2, h: 1.3, face: 'b' },
      ],
      decorate: (g, town, wp) => {
        const h = 3.6, d = 9;
        const add = (geo) => {
          const m = new THREE.Mesh(geo, matWood);
          m.castShadow = m.receiveShadow = true;
          g.add(m);
          return m;
        };
        // Balcony: slab, rail, posts.
        add(new THREE.BoxGeometry(4.2, 0.16, 1.7)).position.set(0, h + 0.55, d / 2 + 0.85);
        add(new THREE.BoxGeometry(4.2, 0.9, 0.12)).position.set(0, h + 1.05, d / 2 + 1.62);
        for (const px of [-2.0, 2.0]) {
          const p = new THREE.Mesh(new THREE.BoxGeometry(0.22, h + 0.55, 0.22), matWood);
          p.position.set(px, (h + 0.55) / 2, d / 2 + 1.5);
          p.castShadow = true;
          g.add(p);
        }
        // Chimney poking through the roof.
        const chim = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.6, 0.7), matRock);
        chim.position.set(3.2, h + 0.8, 0);
        chim.castShadow = true;
        g.add(chim);
        // Swinging sign + name board.
        const sign = hangingSign('MOON', self.updates);
        sign.position.set(0, h + 0.5, d / 2 + 1.4);
        g.add(sign);
        g.add(fixedSign('CACTUS MOON', 0, 2.75, d / 2 + 0.12, 2.7, 0.62));
        void wp;
      },
    });

    // Sheriff's office.
    building({
      name: 'sheriffs-office', x: -8, z: -11.75, w: 8, h: 3.2, d: 7.5, rh: 1.3,
      paint: 0x5f8fc9, roofPaint: 0x5c4632,
      windows: [
        { dx: -2.6, wy: 2.0, w: 2.0, h: 1.2, face: 'f' },
        { dx: 2.6, wy: 2.0, w: 2.0, h: 1.2, face: 'f' },
      ],
      decorate: (g) => {
        const g2 = 3.2 + 1.3; // gable height
        const base = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.5, 1.7), paint(0x5f8fc9));
        base.position.y = g2 + 0.75;
        base.castShadow = true;
        g.add(base);
        const cap = new THREE.Mesh(new THREE.ConeGeometry(1.5, 1.1, 4), paint(0x5c4632));
        cap.rotation.y = Math.PI / 4;
        cap.position.y = g2 + 1.5 + 0.5;
        cap.castShadow = true;
        g.add(cap);
        g.add(fixedSign('SHERIFF', 0, 2.45, 7.5 / 2 + 0.1, 2.2, 0.55));
      },
    });

    // Bank.
    building({
      name: 'bank', x: 8, z: -12, w: 9, h: 3.8, d: 8, rh: 1.2,
      paint: 0x8a8272, roofPaint: 0x55504a,
      windows: [
        { dx: -2.9, wy: 2.3, w: 2.2, h: 1.3, face: 'f' },
        { dx: 2.9, wy: 2.3, w: 2.2, h: 1.3, face: 'f' },
      ],
      decorate: (g) => g.add(fixedSign('BANK', 0, 2.9, 8 / 2 + 0.1, 2.4, 0.6)),
    });

    // General store.
    building({
      name: 'general-store', x: 20, z: -11.75, w: 8, h: 3.2, d: 7.5, rh: 1.3,
      paint: 0x7aa04e, roofPaint: 0x6e4a2c,
      windows: [
        { dx: -2.5, wy: 2.0, w: 2.0, h: 1.2, face: 'f' },
        { dx: 2.5, wy: 2.0, w: 2.0, h: 1.2, face: 'f' },
      ],
      decorate: (g) => g.add(fixedSign('GENERAL STORE', 0, 2.5, 7.5 / 2 + 0.1, 3.0, 0.6)),
    });

    // Stable (rotated so its door/opening faces the street).
    building({
      name: 'stable', x: 24, z: 19, w: 7, h: 3.0, d: 7, rh: 1.3,
      paint: 0x8a6238, roofPaint: 0x6e4a2c, rotY: Math.PI,
      windows: [{ dx: 0, wy: 2.0, w: 2.6, h: 1.3, face: 'b' }],
    });

    // Cabins.
    building({
      name: 'house', x: -14, z: 21, w: 5, h: 2.6, d: 5, rh: 1.0,
      paint: 0x7a5c3e, roofPaint: 0x6e4a2c,
      windows: [{ dx: 0, wy: 1.5, w: 1.8, h: 1.1, face: 'f' }],
    });
    building({
      name: 'house', x: 1, z: 22, w: 5, h: 2.6, d: 5, rh: 1.0,
      paint: 0x6e5a40, roofPaint: 0x5f4630,
      windows: [{ dx: -0.8, wy: 1.5, w: 1.4, h: 1.0, face: 'f' }],
    });

    // Water tower (posts merged into one geometry).
    {
      const [x, z] = [-26, 22];
      const g = new THREE.Group();
      g.position.set(x, 0, z);
      const posts = [];
      for (const px of [-1.6, 1.6]) for (const pz of [-1.6, 1.6]) {
        posts.push(baked(new THREE.BoxGeometry(0.4, 6, 0.4), px, 3, pz));
      }
      g.add(mergedMesh(posts, matWood));
      const platform = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.3, 5.2), matWood);
      platform.position.y = 6.1;
      platform.castShadow = platform.receiveShadow = true;
      g.add(platform);
      const tank = new THREE.Mesh(new THREE.BoxGeometry(4.6, 2.6, 4.6), paint(0x6a8a92));
      tank.position.y = 7.6;
      tank.castShadow = true;
      g.add(tank);
      const cap = new THREE.Mesh(new THREE.ConeGeometry(3.9, 1.6, 4), paint(0x5c4632));
      cap.rotation.y = Math.PI / 4;
      cap.position.y = 9.8;
      cap.castShadow = true;
      g.add(cap);
      root.add(g);
      this.circle(x, z, 3.0);
      this.landmarks.push('water-tower');
    }

    // --- boundary fence (merged) ----------------------------------------------
    {
      const B = 35;
      const postGeo = () => new THREE.BoxGeometry(0.35, 1.7, 0.35);
      const railGeo = () => new THREE.BoxGeometry(5.35, 0.14, 0.18);
      const postSeen = new Set();
      const addPost = (x, z2) => {
        const key = x.toFixed(1) + '|' + z2.toFixed(1);
        if (postSeen.has(key)) return;
        postSeen.add(key);
        fences.push(baked(postGeo(), x, 0.85, z2));
      };
      for (let i = 0; i <= 14; i++) {
        const t = -B + i * 5;
        addPost(t, B); addPost(t, -B);
        addPost(B, t); addPost(-B, t);
        fences.push(baked(railGeo(), -B + i * 5 + 2.5, 0.55, B));
        fences.push(baked(railGeo(), -B + i * 5 + 2.5, 1.15, B));
        fences.push(baked(railGeo(), -B + i * 5 + 2.5, 0.55, -B));
        fences.push(baked(railGeo(), -B + i * 5 + 2.5, 1.15, -B));
        fences.push(baked(railGeo(), B, 0.55, -B + i * 5 + 2.5, Math.PI / 2));
        fences.push(baked(railGeo(), B, 1.15, -B + i * 5 + 2.5, Math.PI / 2));
        fences.push(baked(railGeo(), -B, 0.55, -B + i * 5 + 2.5, Math.PI / 2));
        fences.push(baked(railGeo(), -B, 1.15, -B + i * 5 + 2.5, Math.PI / 2));
      }
      root.add(mergedMesh(fences, matFence));
      fences.length = 0;
      this.landmarks.push('fence');
    }

    // Corral near the stable (fence merged into the fence material).
    {
      const cx = 17.5, cz = 12.5, w = 6, d = 5;
      const addSeg = (x0, z0, x1, z1) => {
        const len = Math.hypot(x1 - x0, z1 - z0);
        const ang = Math.atan2(x1 - x0, z1 - z0);
        const mx = (x0 + x1) / 2, mz = (z0 + z1) / 2;
        for (const off of [0.55, 1.1]) {
          fences.push(baked(new THREE.BoxGeometry(len + 0.4, 0.14, 0.16), mx, off, mz, ang));
        }
        for (const t of [0, 0.5, 1]) {
          fences.push(baked(new THREE.BoxGeometry(0.3, 1.6, 0.3),
            x0 + (x1 - x0) * t, 0.8, z0 + (z1 - z0) * t));
        }
      };
      addSeg(cx - w / 2, cz - d / 2, cx + w / 2, cz - d / 2);
      addSeg(cx - w / 2, cz + d / 2, cx + w / 2, cz + d / 2);
      addSeg(cx - w / 2, cz - d / 2, cx - w / 2, cz + d / 2);
      addSeg(cx + w / 2, cz - d / 2, cx + w / 2, cz + d / 2);
      // NOTE: corral fence geos get added below with the boundary fence? No —
      // the boundary fence was already merged above, so merge these separately.
      root.add(mergedMesh(fences, matFence));
      fences.length = 0;
      this.circle(cx, cz, 4.4);
      this.landmarks.push('corral');
    }

    // --- props ----------------------------------------------------------------
    // Hitching post just outside the corral (inside it, the corral collider
    // would make the post and horse unreachable).
    {
      const [hx, hz] = [22.5, 12.5];
      fences.push(baked(new THREE.BoxGeometry(2.2, 0.14, 0.22), hx, 1.0, hz));
      fences.push(baked(new THREE.BoxGeometry(0.22, 1.05, 0.22), hx - 0.95, 0.52, hz));
      fences.push(baked(new THREE.BoxGeometry(0.22, 1.05, 0.22), hx + 0.95, 0.52, hz));
      this.landmarks.push('hitching-post');
    }

    // A blocky horse tied at the hitching post.
    {
      const [hx, hz] = [23, 11];
      const horse = new THREE.Group();
      horse.position.set(hx, 0, hz);
      horse.rotation.y = -0.6;
      const hm = new THREE.MeshLambertMaterial({ color: 0x8a5a38 });
      const parts = [
        baked(new THREE.BoxGeometry(1.5, 0.75, 0.55), 0, 1.0, 0),                 // body
        baked(new THREE.BoxGeometry(0.28, 0.6, 0.28), 0.85, 1.45, 0.1, -0.5),      // neck
        baked(new THREE.BoxGeometry(0.45, 0.4, 0.32), 1.08, 1.78, 0.14, -0.25),    // head
        baked(new THREE.BoxGeometry(0.09, 0.18, 0.1), 1.14, 2.02, 0.1, -0.25),     // ear
        baked(new THREE.BoxGeometry(0.1, 0.6, 0.14), -0.78, 0.3, 0.05),             // tail
      ];
      for (const lx of [-0.5, 0.45]) for (const lz of [-0.16, 0.16]) {
        parts.push(baked(new THREE.BoxGeometry(0.16, 0.62, 0.16), lx, 0.31, lz));
      }
      const body = mergedMesh(parts, hm);
      horse.add(body);
      // Tail as its own mesh so it can sway.
      const tail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.6, 0.14),
        new THREE.MeshLambertMaterial({ color: 0x4a3320 }));
      tail.position.set(-0.78, 0.3, 0.05);
      tail.castShadow = true;
      horse.add(tail);
      const ph = Math.random() * 6;
      this.updates.push((t) => {
        tail.rotation.z = Math.sin(t * 2.1 + ph) * 0.25;
        tail.position.y = 0.3 + Math.sin(t * 2.1 + ph) * 0.03;
      });
      horse.updateMatrixWorld();
      root.add(horse);
      this.circle(hx, hz, 0.95);
      this.props.push({ name: 'horse', x: hx, z: hz });
      this.landmarks.push('horse');
    }

    // Cactus (all arms merged into one mesh; one collider each).
    for (const [cx, cz, s] of [
      [-31, 8, 1.1], [-26, 29, 0.9], [-4, 31, 1.2], [12, 29, 1.0],
      [30, 5, 1.3], [31, -10, 1.0], [-31, -12, 1.1], [10, -24, 0.8],
    ]) {
      const rot = R(0, Math.PI * 2);
      const wp = new THREE.Matrix4().makeTranslation(cx, 0, cz);
      cacti.push(bakedW(new THREE.BoxGeometry(0.5, 1.9, 0.5), wp, 0, 0.95, 0, rot, s));
      cacti.push(bakedW(new THREE.BoxGeometry(0.3, 0.6, 0.3), wp, -0.45, 1.15, 0, rot, s));
      cacti.push(bakedW(new THREE.BoxGeometry(0.3, 0.3, 0.3), wp, -0.5, 1.5, 0, rot, s));
      cacti.push(bakedW(new THREE.BoxGeometry(0.3, 0.5, 0.3), wp, 0.4, 0.8, 0, rot, s));
      this.circle(cx, cz, 0.55 * s);
      this.props.push({ name: 'cactus', x: cx, z: cz });
    }
    root.add(mergedMesh(cacti, matCactus));
    this.landmarks.push('cactus');

    // Rocks.
    for (const [rx, rz, s] of [
      [-11, 28, 1.0], [24, 28, 1.3], [32, 17, 0.8], [-30, -8, 1.1],
      [-12, -26, 0.9], [16, -25, 1.2], [-3, 15, 0.8],
    ]) {
      const rot = R(0, Math.PI * 2);
      const wp = new THREE.Matrix4().makeTranslation(rx, 0, rz);
      rocks.push(bakedW(new THREE.ConeGeometry(0.8, 1.1, 5), wp, 0, 0.4, 0, rot, s));
      rocks.push(bakedW(new THREE.ConeGeometry(0.5, 0.8, 5), wp, 0.7 * s, 0.25, 0.2 * s, rot, s));
      this.props.push({ name: 'rock', x: rx, z: rz });
    }
    root.add(mergedMesh(rocks, matRock));
    this.landmarks.push('rocks');

    // Barrels (merged cylinders) — a few on the sidewalk in front of the
    // north row, the rest scattered in open ground (never inside buildings).
    for (const [bx, bz] of [
      [-11, -7.5], [11, -7.5], [22, -7.5], [13, 9], [-27, 15.5], [31, -22],
    ]) {
      barrels.push(baked(new THREE.CylinderGeometry(0.42, 0.36, 1.0, 8),
        bx, 0.5, bz, R(0, Math.PI * 2), R(0.85, 1.1)));
      this.props.push({ name: 'barrel', x: bx, z: bz });
    }
    root.add(mergedMesh(barrels, matBarrel));
    this.landmarks.push('barrels');

    // Crates (merged boxes) — stacked by the general store and the bank.
    const crates = [];
    for (const [cx, cz, s, ry] of [
      [16.5, -7.5, 1, 0.3], [17.6, -7.2, 0.8, -0.4], [16.9, -6.6, 0.7, 0.9],
      [4.3, -7.2, 1, -0.2], [5.8, -7.2, 0.8, 0.5],
    ]) {
      crates.push(baked(new THREE.BoxGeometry(0.9 * s, 0.9 * s, 0.9 * s), cx, 0.45 * s, cz, ry));
      this.props.push({ name: 'crate', x: cx, z: cz });
    }
    root.add(mergedMesh(crates, matWood));
    this.landmarks.push('crates');

    // A second hitching post by the general store.
    {
      const [hx, hz] = [14.5, -8.5];
      fences.push(baked(new THREE.BoxGeometry(2.2, 0.14, 0.22), hx, 1.0, hz));
      fences.push(baked(new THREE.BoxGeometry(0.22, 1.05, 0.22), hx - 0.95, 0.52, hz));
      fences.push(baked(new THREE.BoxGeometry(0.22, 1.05, 0.22), hx + 0.95, 0.52, hz));
      this.landmarks.push('hitching-post-2');
    }

    // Hitching-post wood collected above renders with the fence if we merge
    // now (it was pushed after the last fence merge).
    if (fences.length) root.add(mergedMesh(fences, matFence));

    // Merged doors + windows for the whole town.
    root.add(mergedMesh(doors, matDoor, { receive: false }));
    root.add(mergedMesh(windows, matWindow, { cast: false }));

    // Sway plants (small grass tufts that move with the wind).
    for (const [sx, sz] of [[-4, -6], [8, 7], [26, 10]]) {
      const ph = Math.random() * 6;
      const blade = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.8, 4),
        new THREE.MeshLambertMaterial({ color: 0x8a9a5a }));
      blade.position.set(sx, 0.4, sz);
      blade.castShadow = true;
      root.add(blade);
      this.updates.push((t) => { blade.rotation.z = Math.sin(t * 1.8 + ph) * 0.18; });
    }
    this.landmarks.push('sway-plants');

    // --- the Showdown Ground (M10) -------------------------------------------
    // A rock-ringed arena north of the street where the final gunslinger
    // waits. The ring is decorative (no colliders) so the player can walk
    // right up to him.
    {
      const [ax, az] = [0, -26];
      const ring = [];
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2 + R(-0.1, 0.1);
        const rr = 6.5;
        const s = R(0.7, 1.3);
        ring.push(bakedW(new THREE.ConeGeometry(0.8, 1.1, 5),
          new THREE.Matrix4().makeTranslation(ax + Math.cos(a) * rr, 0, az + Math.sin(a) * rr),
          0, 0.4, 0, R(0, Math.PI * 2), s));
      }
      root.add(mergedMesh(ring, matRock));
      const sign = fixedSign('SHOWDOWN', ax, 2.2, az - 7.5, 3.2, 0.8);
      sign.position.y = 2.2;
      const postL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.2, 0.2), matFence);
      postL.position.set(ax - 1.5, 1.1, az - 7.5);
      postL.castShadow = true;
      const postR = postL.clone();
      postR.position.x = ax + 1.5;
      root.add(sign, postL, postR);
      this.landmarks.push('showdown-ground');
    }

    // --- distant scenery ---------------------------------------------------------
    // Mesa ring (mid-distance, half-lost in fog).
    const mesaCols = [0xc07a4e, 0xb97350, 0xc98d63, 0xb5653f];
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2 + R(-0.15, 0.15);
      const rad = R(140, 185);
      const m = new THREE.Mesh(
        new THREE.ConeGeometry(R(28, 55), R(16, 30), 6),
        paint(mesaCols[i % mesaCols.length]),
      );
      m.position.set(Math.cos(a) * rad, -2, Math.sin(a) * rad);
      m.rotation.x = R(-0.06, 0.06);
      m.rotation.z = R(-0.06, 0.06);
      root.add(m);
    }
    this.landmarks.push('mesa-range');
    // Mountain ring (far, blue-ish silhouettes).
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + R(-0.2, 0.2);
      const rad = R(190, 215);
      const m = new THREE.Mesh(
        new THREE.ConeGeometry(R(60, 90), R(55, 85), 5),
        paint(0x8a7887),
      );
      m.position.set(Math.cos(a) * rad, -4, Math.sin(a) * rad);
      m.rotation.x = R(-0.08, 0.08);
      root.add(m);
    }
    this.landmarks.push('mountain-ring');
  }
}
