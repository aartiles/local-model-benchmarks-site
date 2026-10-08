// ===================================================================
// OBBY 3D — game code (Three.js)
// ===================================================================
import * as THREE from 'three';
import { MOVEMENT, platforms, SWEEPERS } from './level.js';
import { ROUTE } from './level.js';

const SPEED = MOVEMENT.SPEED, JUMP_V = MOVEMENT.JUMP_V, GRAV = MOVEMENT.GRAVITY;
const HW = MOVEMENT.PLAYER_HALF_W, PH = MOVEMENT.PLAYER_HEIGHT;
const EPS = 0.001, FIXED_DT = 1 / 60;

// ------------------------------------------------------------------
// Renderer / scene
// ------------------------------------------------------------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8fd6f2);
scene.fog = new THREE.Fog(0x8fd6f2, 90, 320);

const camera = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.1, 500);

scene.add(new THREE.HemisphereLight(0xffffff, 0x9db8d6, 0.85));
const sun = new THREE.DirectionalLight(0xfff3d0, 1.6);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
const sc = sun.shadow.camera;
sc.left = -35; sc.right = 35; sc.top = 35; sc.bottom = -35; sc.near = 5; sc.far = 90;
sun.shadow.bias = -0.0008;
scene.add(sun); scene.add(sun.target);

// ------------------------------------------------------------------
// Materials / geometry cache
// ------------------------------------------------------------------
const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const cylGeo = new THREE.CylinderGeometry(1, 1, 1, 16);
const sphereGeo = new THREE.SphereGeometry(1, 12, 10);
const matCache = new Map();
function mat(color, opts = {}) {
  const key = color + JSON.stringify(opts);
  if (!matCache.has(key)) matCache.set(key, new THREE.MeshLambertMaterial({ color, ...opts }));
  return matCache.get(key);
}
function makeBox(w, h, d, color, opts = {}) {
  const m = new THREE.Mesh(boxGeo, mat(color, opts));
  m.scale.set(w, h, d);
  m.castShadow = true; m.receiveShadow = true;
  return m;
}

// ------------------------------------------------------------------
// Build platforms from level data
// ------------------------------------------------------------------
const P = []; // runtime platform records
for (const def of platforms) {
  const rec = { def, id: def.id, kind: def.kind, solid: true, off: { x: 0, y: 0, z: 0 } };
  const mesh = makeBox(def.w, def.h, def.d, def.color);
  mesh.position.set(def.x, def.top - def.h / 2, def.z);
  scene.add(mesh);
  rec.mesh = mesh;

  if (def.kind === 'mover') rec.move = { ...def.move };
  if (def.kind === 'vanish') {
    mesh.material = new THREE.MeshLambertMaterial({ color: def.color, transparent: true });
    rec.blink = def.blink;
  }
  if (def.kind === 'hazard') {
    mesh.material = new THREE.MeshLambertMaterial({ color: 0xff4a2b, emissive: 0xc81800 });
    // glow lip
    const lip = makeBox(def.w + 0.15, 0.12, def.d + 0.15, 0xffa040, { emissive: 0xff7a00 });
    lip.position.set(def.x, def.top + 0.02, def.z);
    scene.add(lip);
  }
  if (def.kind === 'conveyor') {
    rec.stripes = [];
    for (let i = 0; i < 5; i++) {
      const s = makeBox(def.push.x >= 0 ? 0.35 : 0.35, 0.06, def.d - 0.6, 0x6b4a00);
      s.castShadow = false;
      s.position.set(def.x - def.w / 2 + (i + 0.5) * def.w / 5, def.top + 0.03, def.z);
      scene.add(s);
      rec.stripes.push(s);
    }
    const arrow = makeBox(0.9, 0.08, 0.9, 0xffffff, { emissive: 0x888800 });
    arrow.castShadow = false;
    arrow.position.set(def.x, def.top + 0.05, def.z);
    arrow.rotation.y = def.push.x >= 0 ? -Math.PI / 4 : Math.PI / 4;
    scene.add(arrow);
  }
  if (def.checkpoint !== undefined) buildCheckpointFlag(rec, def);
  if (def.finish) buildFinish(rec, def);
  P.push(rec);
}
const byId = Object.fromEntries(P.map(r => [r.id, r]));

// Sweepers (rotating bars)
const sweeperRigs = SWEEPERS.map(s => {
  const g = new THREE.Group();
  g.position.set(s.x, s.y, s.z);
  const hub = new THREE.Mesh(cylGeo, mat(0x777d8c));
  hub.scale.set(0.6, 1.6, 0.6); hub.position.y = 0.8;
  hub.castShadow = true; g.add(hub);
  const barMat = new THREE.MeshLambertMaterial({ color: 0xff3b30, emissive: 0x8a0000 });
  for (let a = 0; a < s.arms; a++) {
    const bar = new THREE.Mesh(boxGeo, barMat);
    bar.scale.set(s.length, 0.9, 0.5);
    bar.position.set((a === 0 ? 1 : -1) * s.length / 2, 0.8, 0);
    bar.castShadow = true;
    g.add(bar);
    const tip = new THREE.Mesh(sphereGeo, mat(0xffd24d, { emissive: 0xaa6600 }));
    tip.scale.setScalar(0.3);
    tip.position.set((a === 0 ? 1 : -1) * s.length, 0.8, 0);
    g.add(tip);
  }
  scene.add(g);
  return { s, g };
});

// Checkpoint flags
function buildCheckpointFlag(rec, def) {
  const g = new THREE.Group();
  g.position.set(def.x + def.w / 2 - 1.2, def.top, def.z - def.d / 2 + 1.2);
  const pole = new THREE.Mesh(cylGeo, mat(0xf5f7fa));
  pole.scale.set(0.09, 2.6, 0.09); pole.position.y = 1.3; pole.castShadow = true;
  g.add(pole);
  const cloth = new THREE.Mesh(boxGeo, mat(0xb0b8c4));
  cloth.scale.set(1.1, 0.7, 0.05); cloth.position.set(0.6, 2.2, 0);
  g.add(cloth);
  rec.flag = { group: g, cloth };
  scene.add(g);
}

// Finish portal
function buildFinish(rec, def) {
  const g = new THREE.Group();
  g.position.set(def.x, def.top, def.z);
  const torus = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.28, 12, 40),
    new THREE.MeshLambertMaterial({ color: 0xffd700, emissive: 0xb8860b }));
  torus.position.y = 3.2; g.add(torus);
  const beam = new THREE.Mesh(cylGeo, new THREE.MeshLambertMaterial({
    color: 0xfff2a8, emissive: 0xffdf60, transparent: true, opacity: 0.45 }));
  beam.scale.set(1.6, 8, 1.6); beam.position.y = 4; g.add(beam);
  rec.portal = { torus, beam };
  scene.add(g);
}

// ------------------------------------------------------------------
// Environment: clouds + distant floating rocks
// ------------------------------------------------------------------
const clouds = [];
for (let i = 0; i < 26; i++) {
  const g = new THREE.Group();
  const n = 3 + (i % 3);
  for (let j = 0; j < n; j++) {
    const s = new THREE.Mesh(sphereGeo, mat(0xffffff));
    s.scale.set(3 + Math.random() * 4, 1.6 + Math.random() * 1.4, 2.4 + Math.random() * 2.5);
    s.position.set(j * 4 - n * 1.5, Math.random() * 1.2, Math.random() * 2);
    g.add(s);
  }
  g.position.set((Math.random() - 0.5) * 300, 25 + Math.random() * 45, Math.random() * 520 - 60);
  g.userData.speed = 0.4 + Math.random() * 0.8;
  scene.add(g); clouds.push(g);
}
for (let i = 0; i < 14; i++) {
  const r = makeBox(6 + Math.random() * 14, 4 + Math.random() * 10, 6 + Math.random() * 14,
    [0xa7c4dd, 0xb8d0e8, 0x9dbdd8][i % 3]);
  r.castShadow = false;
  r.position.set((Math.random() - 0.5) * 220, -14 - Math.random() * 22, Math.random() * 520 - 40);
  r.rotation.y = Math.random() * Math.PI;
  scene.add(r);
}

// ------------------------------------------------------------------
// Player character (primitives)
// ------------------------------------------------------------------
const player = new THREE.Group();
const skin = 0xffd9a0, shirt = 0x2f7bff, pants = 0x37476b;
const torso = makeBox(0.62, 0.62, 0.4, shirt); torso.position.y = 0.81;
const head = makeBox(0.5, 0.5, 0.5, skin); head.position.y = 1.37;
const eyeGeoM = mat(0x22262e);
for (const ex of [-0.12, 0.12]) {
  const eye = new THREE.Mesh(boxGeo, eyeGeoM);
  eye.scale.set(0.09, 0.13, 0.04); eye.position.set(ex, 1.42, 0.26);
  player.add(eye);
}
const legL = makeBox(0.22, 0.5, 0.24, pants); legL.position.set(-0.17, 0.25, 0);
const legR = makeBox(0.22, 0.5, 0.24, pants); legR.position.set(0.17, 0.25, 0);
const armL = makeBox(0.16, 0.55, 0.2, shirt); armL.position.set(-0.42, 0.85, 0);
const armR = makeBox(0.16, 0.55, 0.2, shirt); armR.position.set(0.42, 0.85, 0);
player.add(torso, head, legL, legR, armL, armR);
scene.add(player);

// ------------------------------------------------------------------
// Particles
// ------------------------------------------------------------------
const PN = 240;
const pPos = new Float32Array(PN * 3), pCol = new Float32Array(PN * 3);
const pVel = new Float32Array(PN * 3), pLife = new Float32Array(PN);
const pGeo = new THREE.BufferGeometry();
pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
const points = new THREE.Points(pGeo, new THREE.PointsMaterial({
  size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, depthWrite: false }));
points.frustumCulled = false;
scene.add(points);
let pHead = 0;
function burst(x, y, z, color, n, spd, life = 0.8) {
  const c = new THREE.Color(color);
  for (let i = 0; i < n; i++) {
    const k = pHead; pHead = (pHead + 1) % PN;
    pPos[k * 3] = x; pPos[k * 3 + 1] = y; pPos[k * 3 + 2] = z;
    pCol[k * 3] = c.r; pCol[k * 3 + 1] = c.g; pCol[k * 3 + 2] = c.b;
    const th = Math.random() * Math.PI * 2, ph = Math.random() * Math.PI;
    const v = spd * (0.4 + Math.random() * 0.6);
    pVel[k * 3] = Math.sin(ph) * Math.cos(th) * v;
    pVel[k * 3 + 1] = Math.abs(Math.cos(ph)) * v;
    pVel[k * 3 + 2] = Math.sin(ph) * Math.sin(th) * v;
    pLife[k] = life;
  }
}
function updateParticles(dt) {
  for (let i = 0; i < PN; i++) {
    if (pLife[i] <= 0) { pPos[i * 3 + 1] = -999; continue; }
    pLife[i] -= dt;
    pVel[i * 3 + 1] -= 9 * dt;
    pPos[i * 3] += pVel[i * 3] * dt;
    pPos[i * 3 + 1] += pVel[i * 3 + 1] * dt;
    pPos[i * 3 + 2] += pVel[i * 3 + 2] * dt;
  }
  pGeo.attributes.position.needsUpdate = true;
  pGeo.attributes.color.needsUpdate = true;
}

// ------------------------------------------------------------------
// Game state
// ------------------------------------------------------------------
const state = {
  mode: 'start',            // start | play | dead | complete
  wt: 0,                    // world time (physics clock)
  playTime: 0,
  deaths: 0,
  stage: 1,
  respawn: { x: 0, y: 0.05, z: 0, yaw: Math.PI, stage: 1 },
  cpActive: platforms.filter(p => p.checkpoint !== undefined).map(() => false),
  deadT: 0,
};
const playerState = {
  pos: new THREE.Vector3(0, 0.05, 0),
  vel: new THREE.Vector3(),
  grounded: false, ground: null,
  groundCx: 0, groundCz: 0, lastGroundPos: new THREE.Vector3(),
  coyote: -9, jumpBuf: -9,
  facing: Math.PI, maxY: 0, walkPhase: 0,
};
const cam = { yaw: Math.PI, pitch: 0.42, dist: 9.5, pos: new THREE.Vector3() };

// ------------------------------------------------------------------
// Input
// ------------------------------------------------------------------
const keys = {};
addEventListener('keydown', e => {
  if (e.code === 'Space') { e.preventDefault(); if (state.mode === 'play') playerState.jumpBuf = state.wt; }
  keys[e.code] = true;
});
addEventListener('keyup', e => { keys[e.code] = false; });

const input = { x: 0, y: 0 };          // joystick (-1..1), y = forward
const pointers = new Map();
const joyBase = document.getElementById('joy-base');
const joyKnob = document.getElementById('joy-knob');
const jumpBtn = document.getElementById('jump-btn');
const JOY_R = 55;

function isTouchDevice() { return 'ontouchstart' in window || navigator.maxTouchPoints > 0; }

jumpBtn.addEventListener('pointerdown', e => {
  e.preventDefault(); e.stopPropagation();
  if (state.mode === 'play') playerState.jumpBuf = state.wt;
  jumpBtn.classList.add('pressed');
  if (isTouchDevice()) document.body.classList.add('touch-ui');
}, { passive: false });
jumpBtn.addEventListener('pointerup', () => jumpBtn.classList.remove('pressed'));
jumpBtn.addEventListener('pointercancel', () => jumpBtn.classList.remove('pressed'));

addEventListener('pointerdown', e => {
  if (e.target.closest('.screen') || e.target === jumpBtn) return;
  const touchish = e.pointerType === 'touch';
  if (isTouchDevice() && touchish) document.body.classList.add('touch-ui');
  const inJoyZone = touchish && e.clientX < innerWidth * 0.38 && e.clientY > innerHeight * 0.52;
  if (inJoyZone) {
    pointers.set(e.pointerId, { type: 'joy', ox: e.clientX, oy: e.clientY });
    const bx = Math.min(Math.max(e.clientX, 90), innerWidth - 90);
    const by = Math.min(Math.max(e.clientY, 90), innerHeight - 90);
    joyBase.style.display = 'block'; joyKnob.style.display = 'block';
    joyBase.style.left = (bx - 75) + 'px'; joyBase.style.top = (by - 75) + 'px';
    joyKnob.style.left = (bx - 32) + 'px'; joyKnob.style.top = (by - 32) + 'px';
    pointers.get(e.pointerId).bx = bx; pointers.get(e.pointerId).by = by;
  } else {
    pointers.set(e.pointerId, { type: 'cam', lx: e.clientX, ly: e.clientY });
  }
  if (e.target.tagName !== 'BUTTON') e.preventDefault();
}, { passive: false });

addEventListener('pointermove', e => {
  const p = pointers.get(e.pointerId);
  if (!p) return;
  if (p.type === 'joy') {
    let dx = e.clientX - p.bx, dy = e.clientY - p.by;
    const len = Math.hypot(dx, dy);
    if (len > JOY_R) { dx = dx / len * JOY_R; dy = dy / len * JOY_R; }
    joyKnob.style.left = (p.bx + dx - 32) + 'px'; joyKnob.style.top = (p.by + dy - 32) + 'px';
    input.x = dx / JOY_R; input.y = -dy / JOY_R;
    if (Math.hypot(input.x, input.y) < 0.18) { input.x = 0; input.y = 0; }
  } else {
    const sens = e.pointerType === 'mouse' ? 0.0042 : 0.0055;
    cam.yaw -= (e.clientX - p.lx) * sens;
    cam.pitch = Math.min(1.25, Math.max(0.02, cam.pitch - (e.clientY - p.ly) * sens * 0.7));
    p.lx = e.clientX; p.ly = e.clientY;
  }
});
function endPointer(e) {
  const p = pointers.get(e.pointerId);
  if (p && p.type === 'joy') { input.x = 0; input.y = 0; joyBase.style.display = 'none'; joyKnob.style.display = 'none'; }
  pointers.delete(e.pointerId);
}
addEventListener('pointerup', endPointer);
addEventListener('pointercancel', endPointer);
addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('gesturestart', e => e.preventDefault()); // iOS pinch

// ------------------------------------------------------------------
// Physics
// ------------------------------------------------------------------
const SOLIDS = [];
function rebuildSolids() {
  SOLIDS.length = 0;
  for (const r of P) {
    if (r.kind === 'hazard') { SOLIDS.push(solidFrom(r)); continue; }
    if (r.kind === 'vanish' && !r.active) continue;
    SOLIDS.push(solidFrom(r));
  }
}
function solidFrom(r) {
  const d = r.def;
  const cx = d.x + r.off.x, cy = d.top - d.h / 2 + r.off.y, cz = d.z + r.off.z;
  return { cx, cy, cz, hx: d.w / 2, hy: d.h / 2, hz: d.d / 2, rec: r };
}
function updateWorld() {
  for (const r of P) {
    if (r.kind === 'mover') {
      const s = Math.sin(r.move.speed * state.wt + (r.move.phase || 0));
      r.off.x = r.move.axis === 'x' ? r.move.amp * s : 0;
      r.off.y = r.move.axis === 'y' ? r.move.amp * s : 0;
      r.off.z = r.move.axis === 'z' ? r.move.amp * s : 0;
      r.mesh.position.set(r.def.x + r.off.x, r.def.top - r.def.h / 2 + r.off.y, r.def.z + r.off.z);
    } else if (r.kind === 'vanish') {
      const b = r.blink;
      const prev = r.active;
      r.active = (((state.wt - b.phase) % b.cycle) + b.cycle) % b.cycle < b.on;
      const m = r.mesh.material;
      m.opacity = r.active ? 1 : 0.13;
      r.mesh.visible = true;
      const sc2 = r.active ? 1 : 0.92;
      r.mesh.scale.set(r.def.w * sc2, r.def.h, r.def.d * sc2);
      if (r.active && !prev) burst(r.def.x, r.def.top + 0.3, r.def.z, r.def.color, 6, 2, 0.4);
    } else if (r.kind === 'conveyor') {
      const d = r.def;
      for (const s of r.stripes) {
        s.position.x += d.push.x * FIXED_DT;
        if (s.position.x > d.x + d.w / 2) s.position.x -= d.w;
        if (s.position.x < d.x - d.w / 2) s.position.x += d.w;
      }
    }
  }
  for (const { s, g } of sweeperRigs) g.rotation.y = s.speed * state.wt + s.phase;
}

function overlaps(s) {
  const p = playerState.pos;
  return Math.abs(p.x - s.cx) < HW + s.hx - EPS &&
         Math.abs(p.z - s.cz) < HW + s.hz - EPS &&
         p.y < s.cy + s.hy - EPS && p.y + PH > s.cy - s.hy + EPS;
}
function moveAxis(axis, d) {
  if (d === 0) return;
  const p = playerState.pos;
  p[axis] += d;
  for (const s of SOLIDS) {
    if (!overlaps(s)) continue;
    if (axis === 'y') {
      if (d < 0) {
        p.y = s.cy + s.hy + EPS;
        if (!playerState.grounded) {
          burst(p.x, p.y, p.z, 0xffffff, 5, 1.5, 0.35); // landing dust
        }
        playerState.grounded = true; playerState.ground = s.rec;
        playerState.groundCx = s.cx; playerState.groundCz = s.cz;
        playerState.lastGroundPos.copy(playerState.pos);
        playerState.vel.y = 0;
      } else {
        p.y = s.cy - s.hy - PH - EPS;
        playerState.vel.y = Math.min(playerState.vel.y, 0);
      }
    } else {
      const c = axis === 'x' ? s.cx : s.cz;
      const half = axis === 'x' ? s.hx : s.hz;
      p[axis] = d > 0 ? c - half - HW - EPS : c + half + HW + EPS;
      playerState.vel[axis] = 0;
    }
  }
}

function stepPhysics() {
  state.wt += FIXED_DT;
  const prevOff = {};
  for (const r of P) if (r.kind === 'mover') prevOff[r.id] = { ...r.off };
  updateWorld();
  rebuildSolids();

  const p = playerState.pos, v = playerState.vel;

  // carried by moving platform
  if (playerState.grounded && playerState.ground && playerState.ground.kind === 'mover') {
    const r = playerState.ground, po = prevOff[r.id];
    if (po) { p.x += r.off.x - po.x; p.y += r.off.y - po.y; p.z += r.off.z - po.z; }
  }

  // input -> target velocity (camera-relative)
  let ix = input.x, iz = input.y;
  if (keys.KeyA || keys.ArrowLeft) ix -= 1;
  if (keys.KeyD || keys.ArrowRight) ix += 1;
  if (keys.KeyW || keys.ArrowUp) iz += 1;
  if (keys.KeyS || keys.ArrowDown) iz -= 1;
  const mag = Math.hypot(ix, iz);
  if (mag > 1) { ix /= mag; iz /= mag; }
  const f = { x: -Math.sin(cam.yaw), z: -Math.cos(cam.yaw) };
  const rt = { x: f.z, z: -f.x };
  let tx = (f.x * iz + rt.x * ix) * SPEED;
  let tz = (f.z * iz + rt.z * ix) * SPEED;
  if (playerState.grounded && playerState.ground && playerState.ground.kind === 'conveyor') {
    const pu = playerState.ground.def.push;
    tx += pu.x || 0;
    tz += pu.z || 0;
  }
  const rate = playerState.grounded ? 14 : 7;
  const k = 1 - Math.exp(-rate * FIXED_DT);
  v.x += (tx - v.x) * k;
  v.z += (tz - v.z) * k;

  // jump (coyote + buffer)
  const canJump = playerState.grounded || (state.wt - playerState.coyote) < 0.12;
  if ((state.wt - playerState.jumpBuf) < 0.15 && canJump) {
    v.y = JUMP_V; playerState.grounded = false; playerState.coyote = -9; playerState.jumpBuf = -9;
    burst(p.x, p.y + 0.1, p.z, 0xffffff, 6, 2, 0.3);
  }
  v.y = Math.max(v.y - GRAV * FIXED_DT, -42);

  const wasGrounded = playerState.grounded;
  playerState.grounded = false; playerState.ground = null;
  moveAxis('x', v.x * FIXED_DT);
  moveAxis('z', v.z * FIXED_DT);
  moveAxis('y', v.y * FIXED_DT);
  if (playerState.grounded) playerState.coyote = state.wt;
  else if (wasGrounded && v.y <= 0) { /* walked off edge — coyote covers it */ }

  if (playerState.grounded && playerState.ground) {
    state.stage = Math.max(1, playerState.ground.def.stage);
    playerState.maxY = Math.max(playerState.maxY, p.y);
  }

  // ---- deaths ----
  for (const s of SOLIDS) {
    if (s.rec.kind === 'hazard' && overlaps(s)) return die('MAGMA!');
  }
  for (const { s } of sweeperRigs) {
    const th = s.speed * state.wt + s.phase;
    const yTop = s.y + 1.25, yBot = s.y + 0.35;
    if (p.y < yTop && p.y + PH > yBot) {
      for (let a = 0; a < s.arms; a++) {
        const sign = a === 0 ? 1 : -1;
        const ex = s.x + Math.cos(th) * s.length * sign;
        const ez = s.z - Math.sin(th) * s.length * sign;
        if (segDist(p.x, p.z, s.x, s.z, ex, ez) < 0.3 + HW) return die('SWEEPER!');
      }
      if (Math.hypot(p.x - s.x, p.z - s.z) < 0.6 + HW) return die('SWEEPER!');
    }
  }
  if (p.y < playerState.maxY - MOVEMENT.KILL_DROP) return die('OUT OF THE MAP! (fell from ' + playerState.lastGroundPos.x.toFixed(1) + ',' + playerState.lastGroundPos.y.toFixed(1) + ',' + playerState.lastGroundPos.z.toFixed(1) + ')');

  // ---- checkpoints ----
  for (const r of P) {
    if (r.def.checkpoint === undefined) continue;
    const i = r.def.checkpoint;
    const dx = p.x - r.def.x, dz = p.z - r.def.z;
    if (!state.cpActive[i] && Math.abs(dx) < r.def.w / 2 + 0.5 && Math.abs(dz) < r.def.d / 2 + 0.5
        && Math.abs(p.y - r.def.top) < 1.2) {
      state.cpActive[i] = true;
      state.respawn = { x: r.def.x, y: r.def.top + 0.05, z: r.def.z, yaw: cam.yaw, stage: Math.max(1, r.def.stage) };
      r.flag.cloth.material = mat(0xffd700, { emissive: 0x9a7a00 });
      burst(r.def.x, r.def.top + 1.5, r.def.z, 0xffd700, 24, 5, 1);
      toast('CHECKPOINT!');
    }
  }

  // ---- finish ----
  const fin = P.find(r => r.def.finish);
  if (fin && Math.hypot(p.x - fin.def.x, p.z - fin.def.z) < 3 && p.y > fin.def.top - 0.5) complete();
}

function segDist(px, pz, ax, az, bx, bz) {
  const dx = bx - ax, dz = bz - az, l2 = dx * dx + dz * dz;
  let t = l2 ? ((px - ax) * dx + (pz - az) * dz) / l2 : 0;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (ax + t * dx), pz - (az + t * dz));
}

function die(reason) {
  if (state.mode !== 'play') return;
  state.mode = 'dead'; state.deadT = 0;
  state.deaths++;
  state.lastDeath = reason + ' @' + playerState.pos.x.toFixed(1) + ',' + playerState.pos.y.toFixed(1) + ',' + playerState.pos.z.toFixed(1);
  burst(playerState.pos.x, playerState.pos.y + 0.8, playerState.pos.z, 0xff5544, 30, 6, 0.9);
  player.visible = false;
  toast(reason);
  updateHUD();
}
function respawn() {
  const r = state.respawn;
  const p = playerState.pos;
  p.set(r.x, r.y, r.z);
  playerState.vel.set(0, 0, 0);
  playerState.grounded = false; playerState.ground = null;
  playerState.coyote = -9; playerState.jumpBuf = -9;
  playerState.facing = r.yaw; playerState.maxY = r.y;
  cam.yaw = r.yaw; cam.pitch = 0.42;
  snapCamera();
  player.visible = true;
  state.mode = 'play';
}
function complete() {
  if (state.mode === 'complete') return;
  state.mode = 'complete';
  burst(playerState.pos.x, playerState.pos.y + 1.5, playerState.pos.z, 0xffd700, 60, 8, 1.5);
  document.getElementById('stats').innerHTML =
    `Time&nbsp;&nbsp; ${fmtTime(state.playTime)}<br>Deaths&nbsp;&nbsp; ${state.deaths}`;
  document.getElementById('complete-screen').classList.remove('hidden');
}

// ------------------------------------------------------------------
// Camera
// ------------------------------------------------------------------
function updateCamera(dt) {
  const t = camTarget();
  const k = 1 - Math.exp(-10 * dt);
  cam.pos.lerp(t, k);
  camera.position.copy(cam.pos);
  camera.lookAt(playerState.pos.x, playerState.pos.y + 1.15, playerState.pos.z);
}
function camTarget() {
  const p = playerState.pos, cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
  return new THREE.Vector3(
    p.x + Math.sin(cam.yaw) * cam.dist * cp,
    p.y + 1.3 + cam.dist * sp,
    p.z + Math.cos(cam.yaw) * cam.dist * cp);
}
function snapCamera() { cam.pos.copy(camTarget()); camera.position.copy(cam.pos); }

// ------------------------------------------------------------------
// Player visuals
// ------------------------------------------------------------------
function updatePlayerVisual(dt) {
  const p = playerState.pos;
  player.position.set(p.x, p.y, p.z);
  const hv = Math.hypot(playerState.vel.x, playerState.vel.z);
  if (hv > 0.5) {
    const want = Math.atan2(playerState.vel.x, playerState.vel.z);
    let d = want - playerState.facing;
    while (d > Math.PI) d -= 2 * Math.PI;
    while (d < -Math.PI) d += 2 * Math.PI;
    playerState.facing += d * Math.min(1, 12 * dt);
  }
  player.rotation.y = playerState.facing;
  // walk cycle
  if (playerState.grounded && hv > 1) {
    playerState.walkPhase += hv * dt * 3.2;
    const s = Math.sin(playerState.walkPhase) * 0.55;
    legL.rotation.x = s; legR.rotation.x = -s;
    armL.rotation.x = -s * 0.7; armR.rotation.x = s * 0.7;
  } else {
    legL.rotation.x = legR.rotation.x = 0;
    armL.rotation.x = !playerState.grounded ? -1.2 : 0;
    armR.rotation.x = !playerState.grounded ? -1.2 : 0;
  }
}

// ------------------------------------------------------------------
// HUD / toast
// ------------------------------------------------------------------
const hud = document.getElementById('hud');
function fmtTime(t) {
  const m = Math.floor(t / 60), s = Math.floor(t % 60), d = Math.floor((t % 1) * 10);
  return `${m}:${String(s).padStart(2, '0')}.${d}`;
}
function updateHUD() {
  document.getElementById('hud-stage').textContent = `Stage ${state.stage} / 10`;
  document.getElementById('hud-time').textContent = fmtTime(state.playTime);
  document.getElementById('hud-deaths').textContent = `Deaths ${state.deaths}`;
}
let toastTimer = null;
function toast(text) {
  const el = document.getElementById('toast');
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 1300);
}

// ------------------------------------------------------------------
// Start / restart
// ------------------------------------------------------------------
function resetGame() {
  state.wt = 0; state.playTime = 0; state.deaths = 0; state.stage = 1;
  state.mode = 'play';
  state.cpActive.fill(false);
  state.respawn = { x: 0, y: 0.05, z: 0, yaw: Math.PI, stage: 1 };
  for (const r of P) {
    if (r.flag) r.flag.cloth.material = mat(0xb0b8c4);
    if (r.kind === 'vanish') r.active = undefined;
  }
  const p = playerState.pos;
  p.set(0, 0.05, 2);
  playerState.vel.set(0, 0, 0);
  playerState.maxY = 0; playerState.facing = Math.PI;
  playerState.grounded = false; playerState.ground = null;
  playerState.coyote = -9; playerState.jumpBuf = -9;
  cam.yaw = Math.PI; cam.pitch = 0.42;
  player.visible = true;
  snapCamera();
  updateHUD();
}
document.getElementById('start-btn').addEventListener('click', () => {
  if (isTouchDevice()) document.body.classList.add('touch-ui');
  document.getElementById('start-screen').classList.add('hidden');
  hud.style.display = 'flex';
  resetGame();
});
document.getElementById('again-btn').addEventListener('click', () => {
  document.getElementById('complete-screen').classList.add('hidden');
  resetGame();
});

// ------------------------------------------------------------------
// Main loop
// ------------------------------------------------------------------
let last = performance.now(), acc = 0;
function loop(now) {
  requestAnimationFrame(loop);
  let dt = Math.min((now - last) / 1000, 0.1);
  last = now;

  if (state.mode === 'play') {
    state.playTime += dt;
    acc += dt;
    let n = 0;
    while (acc >= FIXED_DT && n < 6) { stepPhysics(); acc -= FIXED_DT; n++; if (state.mode !== 'play') { acc = 0; break; } }
    updateHUD();
  } else if (state.mode === 'dead') {
    state.deadT += dt;
    acc += dt;
    let n = 0;
    while (acc >= FIXED_DT && n < 6) { updateWorld(); acc -= FIXED_DT; n++; } // world keeps moving
    if (state.deadT > 0.6) respawn();
  } else {
    // idle animation on menus + slow cinematic camera orbit at the start pad
    for (const { s, g } of sweeperRigs) g.rotation.y = s.speed * (now / 1000) + s.phase;
    if (state.mode === 'start') {
      cam.yaw += dt * 0.12;
      updateCamera(dt);
    }
  }

  if (state.mode === 'complete') {
    const fin = P.find(r => r.def.finish);
    if (fin && fin.portal) {
      fin.portal.torus.rotation.y += dt * 2;
      fin.portal.beam.material.opacity = 0.35 + 0.15 * Math.sin(now / 300);
    }
  } else {
    for (const r of P) if (r.def.finish && r.portal) { r.portal.torus.rotation.y += dt * 2; }
  }

  updatePlayerVisual(dt);
  updateParticles(dt);
  for (const c of clouds) {
    c.position.x += c.userData.speed * dt;
    if (c.position.x > 170) c.position.x = -170;
  }
  // sun follows player for tight shadow frustum
  const pp = playerState.pos;
  sun.position.set(pp.x + 14, pp.y + 26, pp.z - 10);
  sun.target.position.set(pp.x, pp.y, pp.z);
  updateCamera(dt);
  renderer.render(scene, camera);
}
requestAnimationFrame(loop);

addEventListener('resize', () => {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
});

// debug/test hook
function solidAt(x, z, feetY) {
  for (const s of SOLIDS) {
    if (Math.abs(x - s.cx) < s.hx + 0.25 && Math.abs(z - s.cz) < s.hz + 0.25 &&
        s.cy + s.hy >= feetY - 0.6 && s.cy + s.hy <= feetY + 0.3) return true;
  }
  return false;
}
window.__game = { state, playerState, cam, input, respawn, toast,
  route: ROUTE, byId, sweepers: SWEEPERS, solidAt };
