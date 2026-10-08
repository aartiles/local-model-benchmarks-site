/* OBBY 3D — a complete 10-stage vertical obstacle course.
   Runs with a vendored Three.js (assets/three.min.js). Open index.html in a browser. */
'use strict';

// ============================================================
// TUNING CONSTANTS — the level is designed around these values.
//   max jump height  = JUMP_VEL^2 / (2*GRAV)   ≈ 2.41
//   flat jump dist   = MOVE_SPEED * 2*JUMP_VEL/GRAV ≈ 6.7
//   jump w/ +1.5 rise needs dist < ~5.6  → required gaps are ≤ 5
// ============================================================
const GRAV      = -38;
const MOVE_SPEED = 9.5;
const GROUND_RESPONSE = 9;  // horizontal control response (ground) — snappy
const AIR_RESPONSE = 4;     // horizontal control response (air) — floaty but controllable
const JUMP_VEL = 13.5;
const COYOTE_TIME = 0.12;
const JUMP_BUFFER = 0.14;
const CONVEYOR_SPEED = 6;
const P_HALF = new THREE.Vector3(0.4, 0.85, 0.4); // player half extents
const EPS = 0.001;

// ============================================================
// Renderer / scene / camera
// ============================================================
const canvas = document.getElementById('game-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8fd3ff);
scene.fog = new THREE.Fog(0x8fd3ff, 60, 220);

const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 400);

function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();

// Lights
scene.add(new THREE.HemisphereLight(0xbfe8ff, 0x59a05e, 1.15));
const sun = new THREE.DirectionalLight(0xfff2cc, 1.6);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
sun.shadow.camera.left = -16; sun.shadow.camera.right = 16;
sun.shadow.camera.top = 16;  sun.shadow.camera.bottom = -16;
sun.shadow.camera.near = 1;  sun.shadow.camera.far = 60;
sun.shadow.bias = -0.0015;
scene.add(sun);
scene.add(sun.target);

// Decorative sun disc + clouds
{
  const sunBall = new THREE.Mesh(new THREE.SphereGeometry(10, 16, 12),
    new THREE.MeshBasicMaterial({ color: 0xfff2a8, fog: false }));
  sunBall.position.set(-120, 90, -160);
  scene.add(sunBall);

  const cloudMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const cloudGeo = new THREE.SphereGeometry(1, 8, 6);
  for (let i = 0; i < 26; i++) {
    const g = new THREE.Group();
    const n = 3 + (i % 3);
    for (let j = 0; j < n; j++) {
      const m = new THREE.Mesh(cloudGeo, cloudMat);
      const s = 2.2 + Math.random() * 2.4;
      m.scale.set(s * 1.5, s, s * 1.5);
      m.position.set((j - n / 2) * s * 1.3 + Math.random(), Math.random() * 0.6, (Math.random() - 0.5) * 1.5);
      g.add(m);
    }
    const a = Math.random() * Math.PI * 2;
    const r = 90 + Math.random() * 80;
    g.position.set(Math.cos(a) * r, -18 + Math.random() * 55, Math.sin(a) * r);
    scene.add(g);
  }
}

// ============================================================
// Input state
// ============================================================
const keys = { f: 0, b: 0, l: 0, r: 0, jump: false };
const keysDown = new Set();
function refreshKeys() {
  keys.f = (keysDown.has('KeyW') || keysDown.has('ArrowUp') ? 1 : 0) - (keysDown.has('KeyS') || keysDown.has('ArrowDown') ? 1 : 0);
  keys.r = (keysDown.has('KeyD') || keysDown.has('ArrowRight') ? 1 : 0) - (keysDown.has('KeyA') || keysDown.has('ArrowLeft') ? 1 : 0);
}
window.addEventListener('keydown', e => {
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code)) e.preventDefault();
  if (e.code === 'Space') { jumpHeld = true; if (!keysDown.has('Space')) jumpRequested = true; }
  keysDown.add(e.code);
  refreshKeys();
});
window.addEventListener('keyup', e => { keysDown.delete(e.code); refreshKeys(); });

// Joystick (dynamic, spawns where the left half is touched)
const joyBase = document.getElementById('joystick-base');
const joyKnob = document.getElementById('joystick-knob');
const jumpBtn = document.getElementById('jump-btn');
const JOY_MAX = 52; // px travel for full deflection
const pointers = {}; // pointerId -> { role: 'joy'|'cam', ... }
let joyInput = { x: 0, y: 0, active: false };
let jumpHeld = false;
let jumpRequested = false;
let camDrag = { active: false, id: -1, x: 0, y: 0 };
const isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
if (isTouchDevice) {
  jumpBtn.style.display = 'block';
  document.getElementById('hint-desktop').style.display = 'none';
} else {
  document.getElementById('hint-touch').style.display = 'none';
}

canvas.style.touchAction = 'none';
canvas.addEventListener('pointerdown', e => {
  if (gameState !== 'playing') return;
  canvas.setPointerCapture(e.pointerId);
  if (e.pointerType === 'touch' && e.clientX < window.innerWidth * 0.45) {
    // joystick
    const p = { role: 'joy', id: e.pointerId, ox: e.clientX, oy: e.clientY };
    pointers[e.pointerId] = p;
    joyInput.active = true;
    joyBase.style.display = 'block';
    joyKnob.style.display = 'block';
    placeJoy(e.clientX, e.clientY, 0, 0);
  } else {
    // camera drag (mouse anywhere, touch right side)
    const p = { role: 'cam', id: e.pointerId, x: e.clientX, y: e.clientY };
    pointers[e.pointerId] = p;
    camDrag = { active: true, id: e.pointerId, x: e.clientX, y: e.clientY };
  }
});
canvas.addEventListener('pointermove', e => {
  const p = pointers[e.pointerId];
  if (!p) return;
  if (p.role === 'joy') {
    let dx = e.clientX - p.ox, dy = e.clientY - p.oy;
    const len = Math.hypot(dx, dy);
    if (len > JOY_MAX) { dx *= JOY_MAX / len; dy *= JOY_MAX / len; }
    joyInput.x = dx / JOY_MAX;
    joyInput.y = -dy / JOY_MAX;
    placeJoy(p.ox, p.oy, dx, dy);
  } else if (p.role === 'cam' && camDrag.id === e.pointerId) {
    rotateCamera(e.clientX - p.x, e.clientY - p.y);
    p.x = e.clientX; p.y = e.clientY;
  }
});
function endPointer(e) {
  const p = pointers[e.pointerId];
  if (!p) return;
  if (p.role === 'joy') {
    joyInput = { x: 0, y: 0, active: false };
    joyBase.style.display = 'none';
    joyKnob.style.display = 'none';
  } else if (p.role === 'cam' && camDrag.id === e.pointerId) {
    camDrag.active = false;
  }
  delete pointers[e.pointerId];
}
canvas.addEventListener('pointerup', endPointer);
canvas.addEventListener('pointercancel', endPointer);

function placeJoy(ox, oy, dx, dy) {
  joyBase.style.left = (ox - 65) + 'px';
  joyBase.style.top = (oy - 65) + 'px';
  joyKnob.style.left = (ox + dx - 31) + 'px';
  joyKnob.style.top = (oy + dy - 31) + 'px';
}

// Jump button (its own pointer capture so a 3rd finger can press it anytime)
jumpBtn.addEventListener('pointerdown', e => {
  e.preventDefault();
  jumpBtn.setPointerCapture(e.pointerId);
  jumpBtn.classList.add('pressed');
  jumpHeld = true;
  jumpRequested = true;
});
const releaseJump = () => { jumpHeld = false; jumpBtn.classList.remove('pressed'); };
jumpBtn.addEventListener('pointerup', releaseJump);
jumpBtn.addEventListener('pointercancel', releaseJump);

// Block page-level gestures
document.addEventListener('touchmove', e => { if (e.target === canvas || e.target === jumpBtn) e.preventDefault(); }, { passive: false });
document.addEventListener('gesturestart', e => e.preventDefault());
window.addEventListener('blur', () => { keysDown.clear(); refreshKeys(); jumpHeld = false; });

// ============================================================
// Audio (tiny synth blips)
// ============================================================
let audioCtx = null;
function beep(freq, dur, type = 'sine', vol = 0.15, slide = 0) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const t = audioCtx.currentTime;
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(audioCtx.destination);
    o.start(t); o.stop(t + dur);
  } catch (e) { /* audio is optional */ }
}

// ============================================================
// Level data
// ============================================================
const solids = [];      // physics boxes (platforms)
const hazards = [];     // kill volumes
const movers = [];      // platforms that move / disappear / conveyor
const bars = [];        // rotating bars
const checkpoints = [];
let finishPortal = null;

const palette = {
  s1: [0x4fc3f7, 0x81d4fa, 0x4dd0e1, 0x29b6f6, 0x03a9f4, 0x0288d1],
  s2: [0x9575cd, 0xb39ddb, 0x7e57c2, 0x9575cd],
  s3: [0xffd54f, 0xffb300, 0xffca28],
  s4: [0x66bb6a, 0x81c784, 0x43a047, 0x66bb6a],
  s5: [0xff8a65, 0xff7043, 0xff8a65],
  s6: [0xf06292, 0xf48fb1, 0xf06292],
  s7: [0x7c4dff, 0xb388ff, 0x9c27b0, 0xb388ff, 0x7c4dff],
  s8: [0x26c6da, 0x00acc1, 0x26c6da],
  s9: [0xef5350, 0xff7043, 0xef5350, 0xff5722, 0xef5350, 0xff5252],
  s10: [0xffb300, 0xff6f00, 0xffd740, 0xff9800, 0xffb300, 0xff6f00],
};

function boxMat(color, opts = {}) {
  return new THREE.MeshLambertMaterial(Object.assign({ color }, opts));
}

/** Add a box. topY = y of its top surface. kind drives behavior. */
function addPlatform(x, topY, z, sx, sz, stage, opts = {}) {
  const sy = opts.thick ?? 0.8;
  const geo = new THREE.BoxGeometry(sx, sy, sz);
  const mat = boxMat(opts.color ?? palette['s' + stage][0]);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = mesh.receiveShadow = true;
  const s = {
    kind: opts.kind || 'normal',
    stage, mesh,
    sx, sy, sz,
    hx: sx / 2, hy: sy / 2, hz: sz / 2,
    base: new THREE.Vector3(x, topY - sy / 2, z),
    pos: new THREE.Vector3(x, topY - sy / 2, z),
    delta: new THREE.Vector3(),
    amp: opts.amp || 0, axis: opts.axis || 'x', omega: opts.omega || 0, phase: opts.phase || 0,
    // blinking
    period: opts.period || 0, onTime: opts.onTime || 0, warnTime: opts.warnTime || 0,
    active: true,
    conv: opts.conv || null,
  };
  s.topY = () => s.pos.y + s.hy;
  mesh.position.copy(s.pos);
  scene.add(mesh);
  solids.push(s);
  if (opts.kind === 'normal') return s;
  movers.push(s);
  // top accent stripe for visual variety
  if (opts.stripe) {
    const sm = new THREE.Mesh(new THREE.BoxGeometry(sx * 0.9, 0.06, sz * 0.9), boxMat(opts.stripe));
    sm.position.y = s.hy + 0.03;
    mesh.add(sm);
    sm.castShadow = sm.receiveShadow = true;
  }
  return s;
}

function addHazard(x, y, z, sx, sz, opts = {}) {
  const sy = opts.thick ?? 0.5;
  const mat = new THREE.MeshLambertMaterial({ color: opts.color ?? 0xff3d00, emissive: 0x992000, emissiveIntensity: 0.9 });
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
  const h = { sx, sy, sz, hx: sx / 2, hy: sy / 2, hz: sz / 2, pos: new THREE.Vector3(x, y, z), mesh };
  mesh.position.copy(h.pos);
  scene.add(mesh);
  hazards.push(h);
  return h;
}

function addBar(x, y, z, halfLen, radius, revSec) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  const bar = new THREE.Mesh(new THREE.BoxGeometry(halfLen * 2, radius * 2, radius * 2),
    new THREE.MeshLambertMaterial({ color: 0xd50000, emissive: 0x600000, emissiveIntensity: 0.8 }));
  bar.castShadow = true;
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(radius * 1.5, radius * 1.5, 1.2, 12),
    boxMat(0xffb300));
  group.add(bar); group.add(hub);
  scene.add(group);
  bars.push({ group, bar, halfLen, radius, omega: (Math.PI * 2) / revSec, angle: 0,
    pos: new THREE.Vector3(x, y, z) });
}

function addCheckpoint(x, topY, z, stage) {
  const g = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 3, 8), boxMat(0xffffff));
  pole.position.y = 1.5; pole.castShadow = true;
  const flagGeo = new THREE.BoxGeometry(1.1, 0.6, 0.1);
  const flagMat = new THREE.MeshLambertMaterial({ color: 0x888888, emissive: 0x222222 });
  const flag = new THREE.Mesh(flagGeo, flagMat);
  flag.position.set(0.6, 2.6, 0); flag.castShadow = true;
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, 0.3, 16), boxMat(0xffffff));
  base.position.y = 0.15; base.castShadow = base.receiveShadow = true;
  g.add(pole, flag, base);
  g.position.set(x, topY, z);
  scene.add(g);
  const cp = { pos: new THREE.Vector3(x, topY + 1, z), stage, activated: false, flag, group: g, ring: null };
  cp.group.userData.cp = cp;
  checkpoints.push(cp);
  return cp;
}

function activateCheckpointVisual(cp) {
  cp.activated = true;
  cp.flag.material = new THREE.MeshLambertMaterial({ color: 0x00e676, emissive: 0x00c853, emissiveIntensity: 1 });
  cp.group.children[2].material = new THREE.MeshLambertMaterial({ color: 0x00e676, emissive: 0x00562f, emissiveIntensity: 0.8 });
  spawnBurst(cp.pos, 0x00e676, 18, 5);
}

// ============================================================
// Build the course (all gaps verified against jump physics above)
// ============================================================
function buildLevel() {
  // --- Stage 1: basic jumps
  addPlatform(0, 0, 0, 9, 9, 1, { kind: 'start', color: 0x4fc3f7, thick: 1, stripe: 0x0288d1 });
  addPlatform(0, 0.5, 5, 3, 3, 1, { color: palette.s1[0], stripe: 0x0288d1 });
  addPlatform(1.5, 1, 9, 3, 3, 1, { color: palette.s1[1], stripe: 0x0288d1 });
  addPlatform(-1, 1.5, 13, 3, 3, 1, { color: palette.s1[2], stripe: 0x0288d1 });
  addPlatform(1, 2, 17, 3, 3, 1, { color: palette.s1[3], stripe: 0x0288d1 });
  addPlatform(0, 2.5, 21, 4, 4, 1, { color: palette.s1[4], stripe: 0x01579b });

  // --- Stage 2: longer jumps, heights
  addPlatform(2, 4, 25, 3, 3, 2, { color: palette.s2[0] });
  addPlatform(-1, 5.5, 28, 3, 3, 2, { color: palette.s2[1] });
  addPlatform(1, 7, 32, 3, 3, 2, { color: palette.s2[2] });
  addPlatform(0, 7, 37, 5, 5, 2, { color: palette.s2[3], stripe: 0x4527a0 });
  addCheckpoint(0, 7, 37, 3);

  // --- Stage 3: narrow beams
  addPlatform(0, 7.5, 43, 3, 5, 3, { color: palette.s3[0], stripe: 0xe65100 });
  addPlatform(1.5, 8, 49, 3, 5, 3, { color: palette.s3[1], stripe: 0xe65100 });
  addPlatform(0, 8.5, 55, 3, 5, 3, { color: palette.s3[2], stripe: 0xe65100 });
  addPlatform(0, 8.5, 61, 4, 4, 3, { color: palette.s3[0], stripe: 0xe65100 });

  // --- Stage 4: hazards / lava
  const hzPad = addPlatform(0, 8.5, 66.5, 7, 7, 4, { color: palette.s4[0], stripe: 0x1b5e20 });
  addHazard(0, 8.5, 66.5, 2.5, 2.5, { thick: 1 });
  addPlatform(3.5, 9, 72, 3.5, 3.5, 4, { color: palette.s4[1] });
  addHazard(6.3, 9, 72, 1.6, 1.6, { thick: 1 });
  addPlatform(0, 9.5, 78, 9, 9, 4, { color: 0x33691e }); // lava pool rim
  addHazard(0, 9.5, 78, 6.4, 6.4, { thick: 0.2, color: 0xff5722 });
  addPlatform(0, 9.62, 78, 2.5, 2.5, 4, { color: palette.s4[2], stripe: 0x1b5e20 }); // safe island
  addPlatform(0, 10, 84, 5, 5, 4, { color: palette.s4[3], stripe: 0x1b5e20 });
  addCheckpoint(0, 10, 84, 5);

  // --- Stage 5: moving platforms
  addPlatform(0, 10, 90, 4, 4, 5, { color: palette.s5[0], stripe: 0xbf360c });
  addPlatform(0, 10.5, 95, 5, 5, 5, { kind: 'moving', color: palette.s5[1], amp: 1.5, axis: 'x', omega: Math.PI * 2 / 7 });
  addPlatform(0, 11, 101, 5, 5, 5, { color: palette.s5[2], stripe: 0xbf360c });

  // --- Stage 6: rotating bars
  addPlatform(0, 12, 111, 9, 9, 6, { color: palette.s6[0], stripe: 0x880e4f });
  addBar(0, 12.85, 111, 1.2, 0.35, 5.0);
  addPlatform(0, 12.5, 119.5, 8, 8, 6, { color: palette.s6[1], stripe: 0x880e4f });
  addBar(0, 13.35, 119.5, 1.2, 0.35, 5.0);
  addPlatform(0, 13, 127, 5, 5, 6, { color: palette.s6[2], stripe: 0x880e4f });
  addCheckpoint(0, 13, 127, 7);

  // --- Stage 7: disappearing platforms (mostly-on, staggered so you can chain across)
  const blink = (ph) => ({ kind: 'blink', period: 10, onTime: 9.5, warnTime: 0.5, phase: ph });
  addPlatform(0, 13, 133, 5, 5, 7, { color: palette.s7[0], glow: 0xb388ff });
  addPlatform(0, 13.5, 139, 5, 5, 7, { color: palette.s7[1], glow: 0xb388ff });
  addPlatform(0, 14, 145, 5, 5, 7, { color: palette.s7[2], glow: 0xb388ff });
  addPlatform(0, 14.5, 151, 6, 6, 7, { color: palette.s7[4], stripe: 0x4a148c });

  // --- Stage 8: conveyors (they push you along the course)
  addPlatform(0, 14.5, 156, 5, 11, 8, { kind: 'conveyor', color: palette.s8[0], conv: new THREE.Vector3(0, 0, 1), stripe: 0x006064 });
  addPlatform(0, 14.5, 163, 9, 11, 8, { kind: 'conveyor', color: palette.s8[1], conv: new THREE.Vector3(0, 0, 1), stripe: 0x006064 });
  addPlatform(0, 15, 172, 6, 6, 8, { color: palette.s8[2], stripe: 0x006064 });
  addCheckpoint(0, 15.5, 172, 9);

  // --- Stage 9: the climb (gentle drifting steps, mostly stable)
  addPlatform(0, 16, 178, 6, 6, 9, { kind: 'moving', color: palette.s9[0], stripe: 0x7f0000, amp: 0.5, axis: 'z', omega: Math.PI * 2 / 8 });
  addPlatform(0, 17, 185, 6, 6, 9, { kind: 'moving', color: palette.s9[1], stripe: 0x7f0000, amp: 0.5, axis: 'z', omega: Math.PI * 2 / 8, phase: Math.PI });
  addPlatform(0, 18, 192, 6, 6, 9, { kind: 'moving', color: palette.s9[2], stripe: 0x7f0000, amp: 0.5, axis: 'z', omega: Math.PI * 2 / 8 });
  addPlatform(0, 19, 199, 6, 6, 9, { color: palette.s9[3], stripe: 0x7f0000 });
  addPlatform(0, 20, 206, 8, 8, 9, { color: palette.s9[5], stripe: 0x7f0000 });
  addCheckpoint(0, 20, 206, 10);

  // --- Stage 10: the run home (mix of everything, all forgiving)
  addPlatform(0, 21, 213, 6, 6, 10, { kind: 'moving', color: palette.s10[0], stripe: 0x4a148c, amp: 0.5, axis: 'z', omega: Math.PI * 2 / 8 });
  addPlatform(0, 21.5, 219, 6, 6, 10, Object.assign({ kind: 'blink', color: palette.s10[1], stripe: 0x4a148c }, blink(0.5)));
  addPlatform(0, 22, 225, 6, 6, 10, Object.assign({ kind: 'blink', color: palette.s10[2], stripe: 0x4a148c }, blink(2.0)));
  addPlatform(0, 22.5, 231, 8, 5, 10, { kind: 'conveyor', color: palette.s8[1], conv: new THREE.Vector3(0, 0, 1), stripe: 0x006064 });
  addPlatform(0, 23, 238, 7, 7, 10, { color: palette.s10[4], stripe: 0x4a148c });
  addHazard(3, 23, 238, 1.5, 1.5, { thick: 1 });
  addPlatform(0, 23.5, 246, 9, 9, 10, { color: palette.s10[5], stripe: 0x4a148c });
  addPlatform(0, 24, 255, 9, 9, 10, { color: 0xffffff, thick: 1, stripe: 0xffb300 });
  // finish portal
  const portal = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.28, 12, 28),
    new THREE.MeshLambertMaterial({ color: 0x3d5afe, emissive: 0x1a3fd8, emissiveIntensity: 1 }));
  ring.position.y = 1.6;
  const disc = new THREE.Mesh(new THREE.CircleGeometry(1.35, 24),
    new THREE.MeshBasicMaterial({ color: 0x82b1ff, transparent: true, opacity: 0.45, side: THREE.DoubleSide }));
  disc.position.y = 1.6;
  portal.add(ring, disc);
  portal.position.set(0, 24, 257);
  scene.add(portal);
  finishPortal = { pos: new THREE.Vector3(0, 25, 257), ring, disc };
}
buildLevel();

// ============================================================
// Player character
// ============================================================
const player = new THREE.Group();
{
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.95, 0.5), boxMat(0xff7043));
  body.position.y = 0.45; body.castShadow = true;
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.55), boxMat(0xffcc80));
  head.position.y = 1.18; head.castShadow = true;
  player.add(body, head);
  const eyeGeo = new THREE.BoxGeometry(0.1, 0.12, 0.05);
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x222222 });
  const e1 = new THREE.Mesh(eyeGeo, eyeMat); e1.position.set(-0.12, 1.28, 0.29);
  const e2 = new THREE.Mesh(eyeGeo, eyeMat); e2.position.set(0.12, 1.28, 0.29);
  player.add(e1, e2);
  const cap = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.18, 0.6), boxMat(0x4fc3f7));
  cap.position.y = 1.53; cap.castShadow = true;
  player.add(cap);
}
scene.add(player);

// Blob shadow helper (cheap depth cue) — real shadows also on
const blob = new THREE.Mesh(new THREE.CircleGeometry(0.55, 16),
  new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.22, depthWrite: false }));
blob.rotation.x = -Math.PI / 2;
scene.add(blob);

// ============================================================
// Game state
// ============================================================
const pos = new THREE.Vector3(0, 1.2, 0);   // player center
const vel = new THREE.Vector3();
let grounded = false;
let groundSolid = null;
let coyoteTimer = 0, jumpBufferTimer = 0;

let gameState = 'menu'; // menu | playing | dead | complete
let deathTimer = 0;
let deaths = 0;
let elapsed = 0;
let currentStage = 1;
let respawnPoint = new THREE.Vector3(0, 1.2, 0);
let respawnKillY = -8;
let respawnStage = 1;
let camYaw = Math.PI;      // camera behind, looking toward +z (course direction)
let camPitch = 0.45;
let camDist = 8;
let camPos = new THREE.Vector3(0, 3, -10);
let playerFace = 0;

function rotateCamera(dx, dy) {
  camYaw -= dx * 0.005;
  camPitch = THREE.MathUtils.clamp(camPitch + dy * 0.004, 0.05, 1.1);
}

function resetToCheckpoint(cpPos, killY, stage) {
  pos.copy(cpPos);
  vel.set(0, 0, 0);
  grounded = false;
  groundSolid = null;
  coyoteTimer = 0; jumpBufferTimer = 0;
  respawnPoint.copy(cpPos);
  respawnKillY = killY;
  respawnStage = stage;
  currentStage = stage;
  camPitch = 0.45;
  const cp = Math.cos(camPitch), sp = Math.sin(camPitch);
  camPos.set(
    pos.x + Math.sin(camYaw) * camDist * cp,
    pos.y + sp * camDist + 0.5,
    pos.z + Math.cos(camYaw) * camDist * cp
  );
}

function startGame() {
  deaths = 0; elapsed = 0;
  checkpoints.forEach(cp => {
    cp.activated = false;
    cp.flag.material = new THREE.MeshLambertMaterial({ color: 0x888888, emissive: 0x222222 });
  });
  resetToCheckpoint(new THREE.Vector3(0, 1.2, 0), -8, 1);
  gameState = 'playing';
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('complete-screen').classList.add('hidden');
  document.getElementById('hud').style.display = 'flex';
  jumpBtn.style.display = isTouchDevice ? 'block' : 'none';
  updateHud();
  beep(520, 0.12, 'square', 0.12); beep(780, 0.18, 'square', 0.12);
}

function die() {
  if (gameState !== 'playing') return;
  gameState = 'dead';
  deathTimer = 0.55;
  deaths++;
  spawnBurst(pos, 0xff5252, 22, 7);
  beep(300, 0.3, 'sawtooth', 0.2, -200);
  player.visible = false;
  updateHud();
}

function complete() {
  gameState = 'complete';
  spawnBurst(pos, 0xffe14d, 40, 9);
  spawnBurst(pos, 0x4fc3f7, 40, 9);
  beep(660, 0.15, 'square', 0.15); beep(880, 0.2, 'square', 0.15); beep(1100, 0.4, 'square', 0.15);
  document.getElementById('final-time').textContent = fmtTime(elapsed);
  document.getElementById('final-deaths').textContent = deaths;
  document.getElementById('complete-screen').classList.remove('hidden');
  document.getElementById('hud').style.display = 'none';
  jumpBtn.style.display = 'none';
}

document.getElementById('start-btn').addEventListener('click', () => {
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  startGame();
});
document.getElementById('restart-btn').addEventListener('click', startGame);
// Allow touch start too (button covers it, but be generous):
document.getElementById('start-screen').addEventListener('pointerdown', e => {
  if (e.target.id === 'start-screen') startGame();
});

// ============================================================
// HUD
// ============================================================
const hudStage = document.getElementById('hud-stage');
const hudTime = document.getElementById('hud-time');
const hudDeaths = document.getElementById('hud-deaths');
const stageFlashEl = document.getElementById('stage-flash');
let stageFlashTimer = 0;

function fmtTime(t) {
  const m = Math.floor(t / 60), s = Math.floor(t % 60);
  return m + ':' + String(s).padStart(2, '0');
}
function updateHud() {
  hudStage.textContent = currentStage;
  hudTime.textContent = fmtTime(elapsed);
  hudDeaths.textContent = deaths;
}
function flashStage(n) {
  currentStage = n;
  hudStage.textContent = n;
  stageFlashEl.textContent = 'STAGE ' + n;
  stageFlashEl.style.opacity = 1;
  stageFlashEl.style.transform = 'translate(-50%, 0) scale(1)';
  stageFlashTimer = 1.4;
}

// ============================================================
// Particles
// ============================================================
const particles = [];
const particleGeo = new THREE.BoxGeometry(0.16, 0.16, 0.16);
for (let i = 0; i < 120; i++) {
  const m = new THREE.Mesh(particleGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
  m.visible = false;
  scene.add(m);
  particles.push({ mesh: m, vel: new THREE.Vector3(), life: 0, maxLife: 1 });
}
function spawnBurst(center, color, n, speed) {
  let spawned = 0;
  for (const p of particles) {
    if (p.life > 0) continue;
    p.mesh.visible = true;
    p.mesh.material.color.setHex(color);
    p.mesh.position.copy(center);
    p.vel.set(Math.random() - 0.5, Math.random() * 0.7 + 0.2, Math.random() - 0.5).normalize().multiplyScalar(speed * (0.5 + Math.random()));
    p.life = p.maxLife = 0.5 + Math.random() * 0.5;
    if (++spawned >= n) break;
  }
}
function updateParticles(dt) {
  for (const p of particles) {
    if (p.life <= 0) continue;
    p.life -= dt;
    if (p.life <= 0) { p.mesh.visible = false; continue; }
    p.vel.y += GRAV * 0.4 * dt;
    p.mesh.position.addScaledVector(p.vel, dt);
    p.mesh.scale.setScalar(Math.max(0.05, p.life / p.maxLife));
    p.mesh.rotation.x += dt * 6; p.mesh.rotation.y += dt * 5;
  }
}

// ============================================================
// Dynamic platform updates (moving / blinking / conveyor look)
// ============================================================
function updateMovers(t, dt) {
  for (const s of movers) {
    const prev = s.pos.clone();
    if (s.kind === 'moving') {
      const off = Math.sin(t * s.omega + s.phase) * s.amp;
      s.pos.copy(s.base);
      if (s.axis === 'x') s.pos.x += off; else s.pos.z += off;
    } else if (s.kind === 'blink') {
      const ph = ((t + s.phase) % s.period + s.period) % s.period;
      s.active = ph < s.onTime;
      if (ph >= s.onTime && ph < s.onTime + s.warnTime) {
        s.mesh.visible = true;
        s.mesh.material.opacity = 1;
        s.mesh.material.transparent = true;
        s.mesh.material.opacity = 0.35 + 0.5 * (1 - Math.sin(t * 20) * 0.5);
      } else if (s.active) {
        s.mesh.visible = true;
        s.mesh.material.transparent = false;
        s.mesh.material.opacity = 1;
      } else {
        s.mesh.visible = false;
      }
    } else if (s.kind === 'conveyor') {
      // subtle animated stripe offset for readability of direction
      s.mesh.children.forEach(c => { if (c.isMesh) c.position.y = s.hy + 0.03 + Math.sin(t * 3) * 0.01; });
    }
    s.delta.subVectors(s.pos, prev);
    s.mesh.position.copy(s.pos);
  }
}

// ============================================================
// Physics — axis-separated AABB vs platform boxes
// ============================================================
function aabbOverlap(s) {
  return Math.abs(pos.x - s.pos.x) < s.hx + P_HALF.x &&
         Math.abs(pos.y - s.pos.y) < s.hy + P_HALF.y &&
         Math.abs(pos.z - s.pos.z) < s.hz + P_HALF.z;
}
function solidEnabled(s) {
  return s.kind !== 'blink' || s.active;
}

function moveAxis(axis, amount) {
  if (amount === 0) return;
  pos[axis] += amount;
  for (const s of solids) {
    if (!solidEnabled(s)) continue;
    if (!aabbOverlap(s)) continue;
    if (axis === 'y') {
      if (amount > 0) { // hit ceiling
        pos.y = s.pos.y - s.hy - P_HALF.y - EPS;
        if (vel.y > 0) vel.y = 0;
      } else { // landed on top
        pos.y = s.pos.y + s.hy + P_HALF.y + EPS;
        if (vel.y < 0) vel.y = 0;
        grounded = true;
        groundSolid = s;
      }
    } else if (axis === 'x') {
      pos.x = amount > 0 ? s.pos.x - s.hx - P_HALF.x - EPS : s.pos.x + s.hx + P_HALF.x + EPS;
      vel.x = 0;
    } else {
      pos.z = amount > 0 ? s.pos.z - s.hz - P_HALF.z - EPS : s.pos.z + s.hz + P_HALF.z + EPS;
      vel.z = 0;
    }
  }
}

function physicsStep(dt) {
  // --- input direction (camera relative)
  let ix = joyInput.active ? joyInput.x : keys.r;
  let iy = joyInput.active ? joyInput.y : keys.f;
  const il = Math.hypot(ix, iy);
  if (il > 1) { ix /= il; iy /= il; }

  const fwd = new THREE.Vector3(-Math.sin(camYaw), 0, -Math.cos(camYaw));
  const right = new THREE.Vector3(-fwd.z, 0, fwd.x);
  const wish = new THREE.Vector3()
    .addScaledVector(fwd, iy)
    .addScaledVector(right, ix);
  if (wish.lengthSq() > 1) wish.normalize();

  // exponential approach toward wish speed: can accelerate AND brake, in air too
  const k = Math.min(1, (grounded ? GROUND_RESPONSE : AIR_RESPONSE) * dt);
  vel.x += (wish.x * MOVE_SPEED - vel.x) * k;
  vel.z += (wish.z * MOVE_SPEED - vel.z) * k;
  const hsp = Math.hypot(vel.x, vel.z);
  if (hsp > MOVE_SPEED) { vel.x *= MOVE_SPEED / hsp; vel.z *= MOVE_SPEED / hsp; }

  // carry by moving platform under feet (consume this frame's delta once)
  if (grounded && groundSolid && groundSolid.kind === 'moving') {
    pos.add(groundSolid.delta);
    groundSolid.delta.set(0, 0, 0);
  }
  if (grounded && groundSolid && groundSolid.kind === 'conveyor' && groundSolid.conv) {
    vel.x += groundSolid.conv.x * CONVEYOR_SPEED * dt;
    vel.z += groundSolid.conv.z * CONVEYOR_SPEED * dt;
  }

  // jump (buffer + coyote + hold-to-rejump)
  jumpBufferTimer = jumpRequested ? JUMP_BUFFER : Math.max(0, jumpBufferTimer - dt);
  jumpRequested = false;
  coyoteTimer = grounded ? COYOTE_TIME : Math.max(0, coyoteTimer - dt);
  const canJump = (jumpBufferTimer > 0 && (grounded || coyoteTimer > 0)) || (jumpHeld && grounded && vel.y <= 0.01);
  if (canJump) {
    vel.y = JUMP_VEL;
    grounded = false;
    groundSolid = null;
    jumpBufferTimer = 0;
    coyoteTimer = 0;
    jumpRequested = false;
    spawnBurst(new THREE.Vector3(pos.x, pos.y - P_HALF.y, pos.z), 0xffffff, 6, 3);
    beep(400, 0.12, 'sine', 0.12, 200);
  }

  vel.y = Math.max(vel.y + GRAV * dt, -30);

  // move + resolve, axis separated
  grounded = false;
  groundSolid = null;
  moveAxis('x', vel.x * dt);
  moveAxis('z', vel.z * dt);
  moveAxis('y', vel.y * dt);
  // probe ground (keeps grounded stable when vy≈0)
  if (!grounded && Math.abs(vel.y) < 0.01) {
    const probeY = pos.y;
    pos.y -= 0.02;
    for (const s of solids) {
      if (!solidEnabled(s)) continue;
      if (aabbOverlap(s) && probeY > s.pos.y + s.hy) {
        pos.y = s.pos.y + s.hy + P_HALF.y + EPS;
        grounded = true; groundSolid = s;
        break;
      }
    }
    if (!grounded) pos.y = probeY;
  }

  // face movement direction
  if (hsp > 0.5) playerFace = Math.atan2(vel.x, vel.z);

  // hazards
  for (const h of hazards) {
    if (Math.abs(pos.x - h.pos.x) < h.hx + P_HALF.x * 0.8 &&
        Math.abs(pos.y - h.pos.y) < h.hy + P_HALF.y * 0.8 &&
        Math.abs(pos.z - h.pos.z) < h.hz + P_HALF.z * 0.8) { die(); return; }
  }
  // rotating bars (capsule: distance from player center to bar segment)
  for (const b of bars) {
    const dir = new THREE.Vector3(Math.sin(b.angle), 0, Math.cos(b.angle));
    const rel = new THREE.Vector3().subVectors(pos, b.pos);
    const t = THREE.MathUtils.clamp(rel.dot(dir), -b.halfLen, b.halfLen);
    const closest = new THREE.Vector3().copy(dir).multiplyScalar(t).add(b.pos);
    if (closest.distanceTo(pos) < b.radius + 0.42) { die(); return; }
  }
  // checkpoints
  for (const cp of checkpoints) {
    if (!cp.activated && pos.distanceTo(cp.pos) < 1.6) {
      activateCheckpointVisual(cp);
      respawnPoint.copy(cp.pos);
      respawnKillY = cp.pos.y - 9;
      respawnStage = cp.stage;
      if (cp.stage > currentStage) { currentStage = cp.stage; flashStage(cp.stage); }
      beep(660, 0.1, 'square', 0.15); beep(990, 0.2, 'square', 0.15);
    }
  }
  // finish
  if (finishPortal && pos.distanceTo(finishPortal.pos) < 1.8) { complete(); return; }

  // fell out
  if (pos.y < respawnKillY) die();

  // stage tracking: nearest platform within range
  let best = null, bestD = 9;
  for (const s of solids) {
    const dx = pos.x - s.pos.x, dz = pos.z - s.pos.z;
    const d = Math.hypot(dx, dz);
    if (d < bestD && Math.abs(pos.y - s.pos.y) < 5) { bestD = d; best = s; }
  }
  if (best && best.stage > currentStage) {
    currentStage = best.stage;
    flashStage(best.stage);
  }
}

// ============================================================
// Camera update
// ============================================================
function updateCamera(dt) {
  const look = new THREE.Vector3(pos.x, pos.y + 1.1, pos.z);
  const cp = Math.cos(camPitch), sp = Math.sin(camPitch);
  let desired = new THREE.Vector3(
    pos.x + Math.sin(camYaw) * camDist * cp,
    pos.y + sp * camDist + 0.5,
    pos.z + Math.cos(camYaw) * camDist * cp
  );
  // cheap collision: shorten if a platform is between look and camera
  let maxD = camDist;
  const dir = new THREE.Vector3().subVectors(desired, look).normalize();
  for (const s of solids) {
    if (!solidEnabled(s)) continue;
    const o = new THREE.Vector3().subVectors(look, s.pos);
    const r = new THREE.Vector3(s.hx, s.hy, s.hz);
    const t = rayBox(o, dir, r);
    if (t !== null && t < maxD) maxD = Math.min(maxD, Math.max(1.2, t - 0.3));
  }
  desired = new THREE.Vector3().copy(dir).multiplyScalar(maxD).add(look);
  const k = 1 - Math.exp(-12 * dt);
  camPos.lerp(desired, k);
  camera.position.copy(camPos);
  camera.lookAt(look);
  // keep sun + shadow frustum near action
  sun.position.set(pos.x + 20, pos.y + 35, pos.z + 15);
  sun.target.position.copy(pos);
}

function rayBox(o, d, r) {
  let tmin = -Infinity, tmax = Infinity;
  for (const a of ['x', 'y', 'z']) {
    if (Math.abs(d[a]) < 1e-8) {
      if (o[a] < -r[a] || o[a] > r[a]) return null;
    } else {
      let t1 = (-r[a] - o[a]) / d[a];
      let t2 = (r[a] - o[a]) / d[a];
      if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; }
      tmin = Math.max(tmin, t1);
      tmax = Math.min(tmax, t2);
      if (tmin > tmax) return null;
    }
  }
  return tmin > 0 ? tmin : null;
}

// ============================================================
// Main loop (fixed-step physics)
// ============================================================
let last = performance.now();
let acc = 0;
const STEP = 1 / 60;
let simTime = 0;

function loop(now) {
  requestAnimationFrame(loop);
  let dt = Math.min((now - last) / 1000, 0.1);
  last = now;
  simTime += dt;

  updateMovers(simTime, dt);
  for (const b of bars) b.angle = (b.angle + b.omega * dt) % (Math.PI * 2);
  if (finishPortal) {
    finishPortal.ring.rotation.y += dt * 1.2;
    finishPortal.disc.material.opacity = 0.3 + 0.2 * Math.sin(simTime * 3);
  }

  if (gameState === 'playing') {
    acc += dt;
    let n = 0;
    while (acc >= STEP && n < 4) {
      physicsStep(STEP);
      acc -= STEP;
      n++;
      if (gameState !== 'playing') { acc = 0; break; }
    }
    if (n === 4) acc = 0; // don't spiral
    elapsed += dt;
    if (hudTime.textContent !== fmtTime(elapsed)) {
      hudTime.textContent = fmtTime(elapsed);
      hudStage.textContent = currentStage;
    }
  } else if (gameState === 'dead') {
    deathTimer -= dt;
    if (deathTimer <= 0) {
      player.visible = true;
      resetToCheckpoint(respawnPoint, respawnKillY, respawnStage);
      gameState = 'playing';
      currentStage = respawnStage;
      flashStage(respawnStage);
      beep(500, 0.1, 'sine', 0.1, 150);
    }
  }

  // player mesh follows physics body (bottom of body at pos.y - P_HALF.y)
  player.position.set(pos.x, pos.y - P_HALF.y, pos.z);
  player.rotation.y = playerFace;
  // squash & stretch juice
  const sy = grounded ? 1 : (vel.y > 4 ? 1.12 : vel.y < -4 ? 1.08 : 1);
  player.scale.set(2 - sy, sy, 2 - sy);
  blob.position.set(pos.x, (grounded ? findGroundY() : pos.y - 6), pos.z);
  blob.visible = grounded;
  blob.scale.setScalar(Math.max(0.3, 1 - Math.max(0, pos.y - findGroundY()) * 0.15));

  if (stageFlashTimer > 0) {
    stageFlashTimer -= dt;
    stageFlashEl.style.opacity = Math.min(1, stageFlashTimer / 0.4);
    stageFlashEl.style.transform = `translate(-50%, 0) scale(${1 + (1.4 - stageFlashTimer) * 0.12})`;
  }

  updateCamera(dt);
  updateParticles(dt);
  renderer.render(scene, camera);
}
requestAnimationFrame(loop);

// keep blob glued to the surface it stands on
function findGroundY() {
  if (!grounded || !groundSolid) return pos.y - P_HALF.y;
  return groundSolid.pos.y + groundSolid.hy;
}

// handle holding space for repeat jumps
window.addEventListener('keydown', e => { if (e.code === 'Space' && e.repeat) jumpHeld = true; });
window.addEventListener('keyup', e => { if (e.code === 'Space') jumpHeld = false; });

// ============================================================
// Debug / test hooks (harmless in normal play)
// ============================================================
window.__obby = {
  get state() { return gameState; },
  get pos() { return pos; },
  get vel() { return vel; },
  get camYaw() { return camYaw; },
  get grounded() { return grounded; },
  get groundSolid() { return groundSolid; },
  get deaths() { return deaths; },
  get elapsed() { return elapsed; },
  get currentStage() { return currentStage; },
  get solids() { return solids; },
  get checkpoints() { return checkpoints; },
  get finish() { return finishPortal; },
  setMove(x, y) { joyInput = { x, y, active: true }; },
  jump() { jumpRequested = true; },
  holdJump(h) { jumpHeld = h; },
  start: startGame,
};
