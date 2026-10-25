import { noOcclude } from './terrain.js';
import { PALETTE, TOWN, chimneyTops } from './town.js';

/**
 * T020a (R19) — the atmosphere's visible SOLIDS and the wind that moves them.
 *
 * One shared wind field drives everything in the module, so the town breathes in
 * one rhythm instead of six unrelated ones: tumbleweeds roll down main street on
 * the wind, and the sign boards hung off the porches swing on their own pivots
 * when a gust lands. T020c adds the MOTES (dust, smoke, birds) to this same
 * module and pushes them with `windAt()` here.
 *
 * VISIBILITY GATE (inherited by T020c). Every family lives in its own sub-group
 * of `atmosphere.group`, both registered in `families`, and `setVisible(name,
 * flag)` is the one way to hide a family. A check can therefore hide/show ONE
 * family and diff the rendered frame, which is what makes "present" mean "seen"
 * — both failed T020 attempts simulated atmosphere that never reached the screen
 * (measured pixel diffs of 1547 and 1292 out of 921600). T020c adds a `motes`
 * family and gets the same gate for free.
 *
 * BUDGETS (D7/R21): three draw calls total — one merged static bracket/post mesh,
 * one InstancedMesh of tumbleweeds, one InstancedMesh of sign boards. Nothing is
 * a cowboy rig, so nothing goes through the T010a culler (maxVisible 2 already
 * counts the player); the whole set is `noOcclude`'d so the camera's per-frame
 * scene scan stays bounded (T026cc).
 *
 * TIME: `update(dt)` only. No setTimeout, no Date.now(), no Math.random — the
 * wind is a deterministic function of accumulated game time, so a check can
 * sample across WWS.engine.frames or drive fixed steps with `run()` and get the
 * same answer (R36/R66). main.js calls update() from the pause-gated gameplay
 * callback, so a paused game freezes the weather too.
 *
 * TRAP avoided: `town.js` merges EVERY town sign face into one `town-signs` mesh
 * (one draw call), so an individual town sign cannot be rotated. The boards here
 * are the atmosphere's OWN instanced boards hung on their own pivots; nothing
 * touches `town.signs`.
 */

/** The wind, as data. Blows down the street (toward -Z) with a periodic gust. */
export const WIND = Object.freeze({
  base: 2.1,          // m/s steady breeze
  gustAmp: 3.6,       // m/s added at the peak of a gust
  gustPeriod: 6.5,    // s between gusts
  gustWidth: 0.36,    // fraction of the period a gust lasts
  dirX: 0.22,         // cross-street lean of the steady flow
  swayHz: 0.11,       // slow wander of the direction
});

/** Tumbleweed family: radius, count, and how much of the wind each one takes. */
export const TUMBLEWEEDS = Object.freeze({
  count: 5,
  radius: 0.62,
  speedMin: 0.55,
  speedMax: 1.15,
  laneX: 6.5,         // tumbleweeds stay inside the street corridor
  minZ: -44,
  maxZ: 44,
});

/**
 * T020c (R19) — the MOTES. These numbers are the reviewers' measurements from the
 * two failed attempts, not guesses: dust at size 0.14 is ~1.7 px at 30 m and 180
 * motes spread over a 120 m area read as nothing, so the dust is LARGER (>= 0.4),
 * FEWER metres wide (the street corridor, not the whole desert) and LOW (y 0..4,
 * where the player actually looks). Smoke peaks at >= 0.5 alpha and GROWS with age.
 */
export const DUST = Object.freeze({
  count: 220,
  minSize: 0.40, maxSize: 0.80,
  minX: -12, maxX: 12,          // the street corridor, per the review
  minZ: -40, maxZ: 40,
  minY: 0.15, maxY: 4.0,        // a low column, not high sky
  lifeMin: 9, lifeMax: 19,
  rise: 0.13,
  peakAlpha: 0.62,
});

/**
 * Chimney smoke (REVIEW V3 / C2, fixed by T025c).
 *
 * The stacks used to be three hand-typed coordinates that did not match any
 * chimney in the manifest: the saloon plume rose at x=-11 over the porch, two
 * metres off the street and ten metres from its own brick stack, and the cabin
 * plumes emitted 2m ABOVE the top of their stack, in clear sky. From the duel
 * camera those read as sourceless dark blobs hanging in the sky.
 *
 * They are now DERIVED from the town manifest through `chimneyTops()` — every
 * `chimney: true` building, at the exact world position and height storefront()
 * draws it, plus a small lip so the first puff is not inside the cap. Delete a
 * chimney from TOWN and its plume goes away; move a building and the smoke
 * follows. Never hardcode a stack coordinate again.
 */
const STACK_LIP = 0.35;

export const SMOKE = Object.freeze({
  perStack: 14,
  minSize: 0.55, maxSize: 2.9,
  life: 5.0,
  rise: 1.75,
  windK: 0.55,
  peakAlpha: 0.85,
  stacks: Object.freeze(chimneyTops(TOWN).map((c) => Object.freeze({
    name: c.name, x: c.x, y: c.y + STACK_LIP, z: c.z,
  }))),
});

/** Distant birds: one V flock crossing the sky along X, recycling at the far edge. */
export const BIRDS = Object.freeze({
  count: 9,
  y: 21, span: 92, speed: 7.5, size: 1.35, lapZ: -22, alpha: 0.9,
});

/** Sign boards: own geometry, own pivots, damped pendulum on each. */
export const SIGNS = Object.freeze({
  boardW: 1.05,
  boardH: 0.72,
  omega0: 3.6,        // rad/s natural frequency of the hanging board
  damp: 3.2,          // 1/s — clearly damped: it settles, it does not ring
  windK: 0.055,       // rad/s^2 per (m/s)^2 of wind pressure
  maxAngle: 0.85,     // rad, the arm's mechanical stop
});

const rgb = (T, hex) => { const c = new T.Color(hex); return [c.r, c.g, c.b]; };

/** One merged part: a box, optionally rotated about an axis, then placed. */
function part(T, w, h, d, x, y, z, axis, angle) {
  const geo = new T.BoxGeometry(w, h, d);
  const m = new T.Matrix4();
  if (axis) m.makeRotationAxis(new T.Vector3(axis[0], axis[1], axis[2]).normalize(), angle || 0);
  m.setPosition(x, y, z);
  return { geo, matrix: m };
}

/** Merge parts into ONE position/normal/colour geometry (same contract as town.js). */
function mergeColored(T, parts) {
  let count = 0;
  const prepared = parts.map(({ geo, matrix, color }) => {
    const g = geo.toNonIndexed();
    if (matrix) g.applyMatrix4(matrix);
    geo.dispose();
    g.computeVertexNormals();
    count += g.getAttribute('position').count;
    return { g, color };
  });
  const position = new Float32Array(count * 3);
  const normal = new Float32Array(count * 3);
  const colArr = new Float32Array(count * 3);
  let o = 0;
  for (const { g, color } of prepared) {
    const n = g.getAttribute('position').count;
    position.set(g.getAttribute('position').array, o * 3);
    normal.set(g.getAttribute('normal').array, o * 3);
    for (let i = 0; i < n; i += 1) {
      colArr[(o + i) * 3] = color[0];
      colArr[(o + i) * 3 + 1] = color[1];
      colArr[(o + i) * 3 + 2] = color[2];
    }
    o += n;
    g.dispose();
  }
  const out = new T.BufferGeometry();
  out.setAttribute('position', new T.BufferAttribute(position, 3));
  out.setAttribute('normal', new T.BufferAttribute(normal, 3));
  out.setAttribute('color', new T.BufferAttribute(colArr, 3));
  out.computeBoundingSphere();
  return out;
}

/**
 * The wind vector at game time `t` (seconds). Pure and deterministic: a check can
 * ask what the wind was at any moment without having been there.
 * @returns {{x:number,z:number,speed:number,gust:number}}
 */
export function windAt(t) {
  const ph = ((t % WIND.gustPeriod) + WIND.gustPeriod) % WIND.gustPeriod / WIND.gustPeriod;
  const gust = ph < WIND.gustWidth ? Math.pow(Math.sin((ph / WIND.gustWidth) * Math.PI), 2) : 0;
  const speed = WIND.base + WIND.gustAmp * gust;
  const sway = Math.sin(t * WIND.swayHz * Math.PI * 2) * 0.35
    + Math.sin(t * 0.37 + 1.1) * 0.12;
  return {
    x: (WIND.dirX + sway) * speed,
    z: -speed,
    speed,
    gust,
  };
}

/**
 * @param {object} opts.engine  owns scene/camera/THREE
 * @param {object} opts.town    the built town (palette + shared material)
 */
export function createAtmosphere({ engine, town } = {}) {
  if (!engine || !engine.scene) throw new Error('createAtmosphere: needs an engine');
  if (!town || !town.material) throw new Error('createAtmosphere: needs the built town');

  const T = engine.THREE;
  const mat = town.material;
  const C = {
    straw: rgb(T, 0xa8874f),
    twig: rgb(T, PALETTE.beam),
    plank: rgb(T, PALETTE.plank),
    trim: rgb(T, PALETTE.paintRed),
    iron: rgb(T, PALETTE.stone),
  };

  const group = new T.Group();
  group.name = 'atmosphere';
  const families = new Map();

  // --- tumbleweeds: one ball of twigs, instanced down the street --------------
  const R = TUMBLEWEEDS.radius;
  const weedParts = [];
  const AXES = [[1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, 0], [1, 0, 1], [0, 1, 1], [1, -1, 1]];
  for (let i = 0; i < AXES.length; i += 1) {
    const a = AXES[i];
    weedParts.push(part(T, R * 2, 0.07, 0.07, 0, 0, 0, [a[1], a[2], a[0]], i * 0.7));
    weedParts.push(part(T, R * 1.6, 0.06, 0.06, 0, 0, 0, [a[2], a[0], a[1]], 1.2 + i * 0.5));
  }
  const weedGeo = mergeColored(T, weedParts.map((p, i) => ({ ...p, color: i % 2 ? C.straw : C.twig })));
  const weedMesh = new T.InstancedMesh(weedGeo, mat, TUMBLEWEEDS.count);
  weedMesh.name = 'atmo-tumbleweeds';
  weedMesh.castShadow = false;
  weedMesh.receiveShadow = false;
  weedMesh.instanceMatrix.setUsage(T.DynamicDrawUsage);
  noOcclude(weedMesh);

  const weeds = [];
  for (let i = 0; i < TUMBLEWEEDS.count; i += 1) {
    // Spread down the street and across the corridor, deterministic (no random).
    const span = TUMBLEWEEDS.maxZ - TUMBLEWEEDS.minZ;
    // `scale` is the instance's transform scale; `r` is its WORLD-space radius
    // (base geometry radius R times that scale). Ground contact uses `r` alone —
    // multiplying by `scale` again would sink small weeds and float large ones.
    const scale = 0.85 + 0.08 * i;
    weeds.push({
      x: ((i * 2.7) % TUMBLEWEEDS.laneX) - TUMBLEWEEDS.laneX / 2 + 0.6,
      y: R * scale,
      z: TUMBLEWEEDS.maxZ - ((i + 0.5) / TUMBLEWEEDS.count) * span,
      r: R * scale,
      mul: TUMBLEWEEDS.speedMin + (i * 0.13),
      phase: i * 1.7,
      roll: 0,
      q: new T.Quaternion(),
      scale,
    });
  }

  const weedGroup = new T.Group();
  weedGroup.name = 'atmo-tumbleweed-family';
  weedGroup.add(weedMesh);
  group.add(weedGroup);
  families.set('tumbleweeds', weedGroup);

  // --- sign boards: the atmosphere's OWN boards on their OWN pivots -----------
  // Hung off the porch posts of three buildings, just proud of the street-side
  // edge so they read from the sidewalk. town.js's merged `town-signs` mesh is
  // untouched (TRAP 1): these are extra boards, not the painted town faces.
  const PIVOTS = [
    { name: 'atmo-sign-saloon', x: -9.7, y: 3.05, z: 21.4, dir: 1 },
    { name: 'atmo-sign-store', x: 9.9, y: 2.85, z: 16.6, dir: -1 },
    { name: 'atmo-sign-stable', x: 9.9, y: 2.75, z: -0.6, dir: -1 },
  ];
  const bracketParts = [];
  for (const p of PIVOTS) {
    // Vertical post from the ground to the pivot, plus the horizontal arm. Both
    // are static; only the board rotates, and the board is instanced below.
    bracketParts.push({ ...part(T, 0.14, p.y, 0.14, p.x, p.y / 2, p.z + p.dir * 0.9), color: C.twig });
    bracketParts.push({ ...part(T, 1.5, 0.12, 0.12, p.x - p.dir * 0.6, p.y, p.z), color: C.twig });
    bracketParts.push({ ...part(T, 0.1, 0.5, 0.1, p.x - p.dir * 1.25, p.y - 0.25, p.z + 0.4), color: C.iron });
    bracketParts.push({ ...part(T, 0.1, 0.5, 0.1, p.x - p.dir * 1.25, p.y - 0.25, p.z - 0.4), color: C.iron });
  }
  const bracketMesh = new T.Mesh(mergeColored(T, bracketParts), mat);
  bracketMesh.name = 'atmo-sign-brackets';
  bracketMesh.castShadow = false;
  bracketMesh.receiveShadow = false;
  noOcclude(bracketMesh);

  const boardParts = [];
  const bw = SIGNS.boardW; const bh = SIGNS.boardH;
  boardParts.push({ ...part(T, 0.06, bh, bw, 0, -bh / 2 - 0.05, 0), color: C.plank });
  boardParts.push({ ...part(T, 0.09, 0.09, bw + 0.1, 0, -0.02, 0), color: C.trim });
  boardParts.push({ ...part(T, 0.09, 0.1, bw + 0.1, 0, -bh - 0.05, 0), color: C.trim });
  for (const cz of [-bw * 0.28, bw * 0.28]) {
    boardParts.push({ ...part(T, 0.05, 0.5, 0.05, 0, -bh / 2, cz), color: C.iron });
  }
  const boardGeo = mergeColored(T, boardParts);
  const boardMesh = new T.InstancedMesh(boardGeo, mat, PIVOTS.length);
  boardMesh.name = 'atmo-sign-boards';
  boardMesh.castShadow = false;
  boardMesh.receiveShadow = false;
  boardMesh.instanceMatrix.setUsage(T.DynamicDrawUsage);
  noOcclude(boardMesh);

  const signGroup = new T.Group();
  signGroup.name = 'atmo-sign-family';
  signGroup.add(bracketMesh);
  signGroup.add(boardMesh);
  group.add(signGroup);
  families.set('signs', signGroup);

  const signs = PIVOTS.map((p, i) => ({
    ...p, index: i, angle: 0.04 * (i + 1), vel: 0, peak: 0,
  }));

  // ==========================================================================
  // T020c — THE MOTES: dust, chimney smoke, distant birds. One pooled THREE.Points
  // per family (R21: 3 draw calls, and `isPoints` is not `isMesh`, so T020a's
  // 3-mesh/3-draw-call solid accounting and the T010a raycast bound are untouched).
  // All three are pushed by the SAME windAt() vector as the weeds and the boards,
  // so the town breathes in one rhythm. Zero per-frame allocation: the position,
  // size and alpha buffers are written in place.
  // ==========================================================================
  const motes = new T.Group();
  motes.name = 'atmo-mote-family';
  group.add(motes);
  families.set('motes', motes);

  const VERT = `
    attribute float aSize; attribute float aAlpha;
    uniform float uScale; varying float vA;
    void main() {
      vA = aAlpha;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = min(110.0, max(1.0, aSize * (uScale / max(0.25, -mv.z))));
      gl_Position = projectionMatrix * mv;
    }`;
  const FRAG = `
    uniform vec3 uColor; varying float vA;
    void main() {
      vec2 d = gl_PointCoord - 0.5;
      float r = dot(d, d);
      if (r > 0.25) discard;
      float a = vA * (1.0 - r * 4.0);
      if (a < 0.02) discard;
      gl_FragColor = vec4(uColor, a);
    }`;
  const moteMat = (hex) => new T.ShaderMaterial({
    uniforms: { uColor: { value: new T.Color(hex) }, uScale: { value: 360 } },
    vertexShader: VERT, fragmentShader: FRAG,
    transparent: true, depthWrite: false,
  });
  const noop = () => {};
  const cloud = (name, n, hex) => {
    const geo = new T.BufferGeometry();
    const pos = new Float32Array(n * 3);
    const size = new Float32Array(n);
    const alpha = new Float32Array(n);
    geo.setAttribute('position', new T.BufferAttribute(pos, 3).setUsage(T.DynamicDrawUsage));
    geo.setAttribute('aSize', new T.BufferAttribute(size, 1).setUsage(T.DynamicDrawUsage));
    geo.setAttribute('aAlpha', new T.BufferAttribute(alpha, 1).setUsage(T.DynamicDrawUsage));
    const pts = new T.Points(geo, moteMat(hex));
    pts.name = name;
    pts.frustumCulled = false;   // the buffer moves; a stale sphere would cull it
    pts.raycast = noop;
    motes.add(pts);
    return { pts, pos, size, alpha, n, geo };
  };
  /** Deterministic per-item stream, so two runs of the game look identical. */
  const mkRand = (seed) => {
    let s = (seed * 2654435761 + 1013904223) >>> 0;
    return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  };

  // --- dust: big, low, concentrated in the street corridor -------------------
  const dust = cloud('atmo-dust', DUST.count, 0xf0dcb4);
  const dustState = [];
  {
    const rnd = mkRand(7);
    for (let i = 0; i < DUST.count; i += 1) {
      const p = { x: 0, y: 0, z: 0, age: 0, life: 1, size: 0.5, mul: 1, ph: 0, rnd: mkRand(i + 1) };
      dustState.push(p);
      respawnDust(p, i, 0);
      p.age = p.life * rnd();   // stagger the lifetimes so the cloud is full at t=0
    }
  }
  function respawnDust(p, i, age) {
    const r = p.rnd;
    p.x = DUST.minX + (DUST.maxX - DUST.minX) * r();
    p.z = DUST.minZ + (DUST.maxZ - DUST.minZ) * r();
    // Bias the column toward the ground: y^1.8 keeps most motes under 2.5 m.
    p.y = DUST.minY + (DUST.maxY - DUST.minY) * Math.pow(r(), 1.8);
    p.life = DUST.lifeMin + (DUST.lifeMax - DUST.lifeMin) * r();
    p.age = age || 0;
    p.size = DUST.minSize + (DUST.maxSize - DUST.minSize) * r();
    p.mul = 0.35 + 0.55 * r();
    p.ph = r() * 6.283;
  }

  // --- smoke: rising, GROWING puffs off three stacks -------------------------
  const smokeN = SMOKE.stacks.length * SMOKE.perStack;
  const smoke = cloud('atmo-smoke', smokeN, 0x5c554e);
  const smokeState = [];
  for (let s = 0; s < SMOKE.stacks.length; s += 1) {
    for (let j = 0; j < SMOKE.perStack; j += 1) {
      const rnd = mkRand(s * 31 + j + 5);
      smokeState.push({
        idx: s * SMOKE.perStack + j,
        stack: s, age: rnd() * SMOKE.life, x: 0, y: 0, z: 0,
        dx: (rnd() - 0.5) * 0.5, dz: (rnd() - 0.5) * 0.5, wob: rnd() * 6.283, rnd,
      });
    }
  }
  function respawnSmoke(p) {
    p.age = 0;
    p.dx = (p.rnd() - 0.5) * 0.6;
    p.dz = (p.rnd() - 0.5) * 0.6;
    p.wob = p.rnd() * 6.283;
    smokeRespawns += 1;
  }

  // --- birds: one V flock traversing the sky along X -------------------------
  const birds = cloud('atmo-birds', BIRDS.count, 0x241f1a);
  const birdState = [];
  for (let i = 0; i < BIRDS.count; i += 1) {
    const arm = i === 0 ? 0 : (i % 2 ? 1 : -1) * Math.ceil(i / 2);
    birdState.push({ arm, x: 0, y: 0, z: 0, ph: i * 0.9 });
  }

  let dustRecycles = 0;
  let smokeRespawns = 0;
  let birdLaps = 0;
  let birdX = -BIRDS.span / 2;

  const m4 = new T.Matrix4();
  const pivotM = new T.Matrix4();
  const rotM = new T.Matrix4();
  const posV = new T.Vector3();
  const scaleV = new T.Vector3();
  const axisV = new T.Vector3();
  const dq = new T.Quaternion();

  let t = 0;          // accumulated GAME time, seconds (never wall clock)
  let gustCount = 0;  // how many gust fronts have landed
  let gustUp = false;

  /** Push the current wind into one instance matrix per tumbleweed. */
  function writeWeeds() {
    for (let i = 0; i < weeds.length; i += 1) {
      const w = weeds[i];
      posV.set(w.x, w.y, w.z);
      scaleV.set(w.scale, w.scale, w.scale);
      m4.compose(posV, w.q, scaleV);
      weedMesh.setMatrixAt(i, m4);
    }
    weedMesh.instanceMatrix.needsUpdate = true;
  }

  /** Hang each board on its pivot: translate to the arm, rotate, drop the board. */
  function writeBoards() {
    for (const s of signs) {
      pivotM.makeTranslation(s.x, s.y, s.z);
      rotM.makeRotationZ(s.dir * s.angle);
      m4.multiplyMatrices(pivotM, rotM);
      boardMesh.setMatrixAt(s.index, m4);
    }
    boardMesh.instanceMatrix.needsUpdate = true;
  }

  /** Step the three mote families on the same wind vector and fill the buffers. */
  function stepMotes(step, w) {
    // dust: carried by the wind, bobbing, recycling when it dies or leaves the box
    for (let i = 0; i < dustState.length; i += 1) {
      const p = dustState[i];
      p.age += step;
      p.x += (w.x * p.mul + Math.sin(t * 1.1 + p.ph) * 0.35) * step;
      p.y += (DUST.rise * p.mul + Math.sin(t * 0.7 + p.ph * 2) * 0.12) * step;
      p.z += (w.z * p.mul + Math.cos(t * 0.9 + p.ph) * 0.3) * step;
      const dead = p.age >= p.life
        || p.y > DUST.maxY || p.x < DUST.minX - 2 || p.x > DUST.maxX + 2
        || p.z < DUST.minZ - 2 || p.z > DUST.maxZ + 2;
      if (dead) { respawnDust(p, i, 0); dustRecycles += 1; }
      const k = p.age / p.life;
      const fade = Math.min(1, k * 6) * Math.min(1, (1 - k) * 4);
      dust.pos[i * 3] = p.x; dust.pos[i * 3 + 1] = p.y; dust.pos[i * 3 + 2] = p.z;
      dust.size[i] = p.size;
      dust.alpha[i] = DUST.peakAlpha * fade;
    }

    // smoke: rises, GROWS with age, drifts downwind, respawns at the stack
    for (let i = 0; i < smokeState.length; i += 1) {
      const p = smokeState[i];
      p.age += step;
      if (p.age >= SMOKE.life) respawnSmoke(p);
      const k = p.age / SMOKE.life;
      const st = SMOKE.stacks[p.stack];
      const rise = SMOKE.rise * (1 - 0.35 * k);
      p.y = st.y + SMOKE.rise * p.age - 0.35 * rise * p.age * k;
      p.x = st.x + p.dx + w.x * SMOKE.windK * p.age * 0.5 + Math.sin(t * 0.6 + p.wob) * 0.25;
      p.z = st.z + p.dz + w.z * SMOKE.windK * p.age * 0.35;
      smoke.pos[i * 3] = p.x; smoke.pos[i * 3 + 1] = p.y; smoke.pos[i * 3 + 2] = p.z;
      smoke.size[i] = SMOKE.minSize + (SMOKE.maxSize - SMOKE.minSize) * k;
      // Peak alpha >= 0.5 (the review: 0.15 over a bright sky reads as nothing).
      smoke.alpha[i] = SMOKE.peakAlpha * Math.min(1, k * 5) * (1 - k * k);
    }

    // birds: the flock traverses along X, arms in a V, wings flapping
    birdX += (BIRDS.speed + w.x * 0.25) * step;
    if (birdX > BIRDS.span / 2) { birdX -= BIRDS.span; birdLaps += 1; }
    for (let i = 0; i < birdState.length; i += 1) {
      const b = birdState[i];
      b.x = birdX - Math.abs(b.arm) * 2.6;
      b.z = BIRDS.lapZ + b.arm * 2.2 + w.z * 0.4;
      b.y = BIRDS.y + Math.sin(t * 0.5 + b.arm) * 1.2;
      const flap = 0.55 + 0.45 * Math.abs(Math.sin(t * 6 + b.ph));
      birds.pos[i * 3] = b.x; birds.pos[i * 3 + 1] = b.y; birds.pos[i * 3 + 2] = b.z;
      birds.size[i] = BIRDS.size * flap;
      birds.alpha[i] = BIRDS.alpha;
    }

    dust.geo.attributes.position.needsUpdate = true;
    dust.geo.attributes.aSize.needsUpdate = true;
    dust.geo.attributes.aAlpha.needsUpdate = true;
    smoke.geo.attributes.position.needsUpdate = true;
    smoke.geo.attributes.aSize.needsUpdate = true;
    smoke.geo.attributes.aAlpha.needsUpdate = true;
    birds.geo.attributes.position.needsUpdate = true;
    birds.geo.attributes.aSize.needsUpdate = true;
    birds.geo.attributes.aAlpha.needsUpdate = true;
  }

  /** One frame of weather. `dt` is game time in seconds. */
  function update(dt) {
    const step = Number.isFinite(dt) ? Math.max(0, Math.min(dt, 0.05)) : 0;
    if (step <= 0) return;
    t += step;
    const w = windAt(t);

    // Count gust fronts, so "the wind gusts" is a fact a check can read.
    if (w.gust > 0.5 && !gustUp) { gustUp = true; gustCount += 1; }
    else if (w.gust < 0.2) gustUp = false;

    const span = TUMBLEWEEDS.maxZ - TUMBLEWEEDS.minZ;
    for (const tw of weeds) {
      const vx = w.x * tw.mul + Math.sin(t * 0.8 + tw.phase) * 0.5;
      const vz = w.z * tw.mul;
      const sp = Math.hypot(vx, vz);
      tw.x += vx * step;
      tw.z += vz * step;
      // Rolling, not sliding: the ball turns about the horizontal axis that is
      // perpendicular to its travel, by exactly arc-length / radius.
      if (sp > 1e-4) {
        axisV.set(0, -vz, vx).normalize();
        tw.roll += (sp * step) / tw.r;
        dq.setFromAxisAngle(axisV, (sp * step) / tw.r);
        tw.q.premultiply(dq);
      }
      // A weed that has left the town comes back round the other end.
      if (tw.z < TUMBLEWEEDS.minZ) {
        tw.z += span;
        tw.x = ((tw.phase * 3.1) % TUMBLEWEEDS.laneX) - TUMBLEWEEDS.laneX / 2 + 0.6;
      } else if (tw.x > TUMBLEWEEDS.laneX) tw.x = TUMBLEWEEDS.laneX;
      else if (tw.x < -TUMBLEWEEDS.laneX) tw.x = -TUMBLEWEEDS.laneX;
      // A little bob, so it reads as a lumpy ball and not a sphere on a rail.
      // tw.r is already the world-space radius (R * scale), so the ball's lowest
      // point sits on the sand: contact height is tw.r, not tw.r * tw.scale.
      tw.y = tw.r + Math.abs(Math.sin(tw.roll * 1.3)) * 0.1;
    }

    const pressure = w.speed * w.speed * SIGNS.windK;
    for (const s of signs) {
      // Damped pendulum toward the wind's steady deflection: the board swings,
      // and settles. It is never free-swinging (R19's "subtle wind movement").
      const rest = Math.min(SIGNS.maxAngle, pressure * 0.06);
      const acc = -SIGNS.omega0 * SIGNS.omega0 * Math.sin(s.angle - rest)
        - SIGNS.damp * s.vel
        + w.gust * 1.2 * Math.sin(t * 1.3 + s.index);
      s.vel += acc * step;
      s.angle += s.vel * step;
      if (s.angle > SIGNS.maxAngle) { s.angle = SIGNS.maxAngle; s.vel *= -0.3; }
      if (s.angle < -SIGNS.maxAngle) { s.angle = -SIGNS.maxAngle; s.vel *= -0.3; }
      const a = Math.abs(s.angle);
      s.peak = a > s.peak ? a : s.peak * Math.exp(-step * 0.5);
    }

    writeWeeds();
    writeBoards();
    // gl_PointSize is set by hand, so the fov has to be folded in: a world-space
    // size s at distance d covers s * h / (2*d*tan(fov/2)) device pixels.
    const h = engine.renderer?.domElement?.height || 720;
    const fov = (engine.camera?.fov || 60) * Math.PI / 180;
    const scale = h / (2 * Math.tan(fov / 2));
    dust.pts.material.uniforms.uScale.value = scale;
    smoke.pts.material.uniforms.uScale.value = scale;
    birds.pts.material.uniforms.uScale.value = scale;
    stepMotes(step, w);
  }

  /**
   * Kick the weather: a gust that hits the signs and shoves the weeds. This is
   * the deterministic handle a check uses to watch a swing decay without waiting
   * for the wind's own gust cycle (same idiom as `saloon.swing`).
   */
  function gust(strength = 1) {
    const s = Math.max(0, Math.min(2, strength));
    for (const sg of signs) sg.vel += 1.6 * s * (sg.index % 2 ? -1 : 1);
    gustCount += 1;
  }

  /** Advance the weather in fixed steps inside one synchronous call. */
  function run(seconds, dt = 1 / 60) {
    const step = Number.isFinite(dt) ? Math.max(0.001, Math.min(dt, 0.05)) : 1 / 60;
    const n = Math.max(1, Math.min(7200, Math.round((Number(seconds) || 0) / step)));
    const samples = [];
    for (let i = 0; i < n; i += 1) {
      update(step);
      if (i % 6 === 5 || i === n - 1) samples.push(snapshot());
    }
    return { samples, snapshot: snapshot() };
  }

  /**
   * The visibility gate. `name` is a family key ('tumbleweeds', 'signs', or
   * 'all' for the whole atmosphere). Returns what is now visible.
   */
  function setVisible(name, flag) {
    const on = flag !== false;
    if (!name || name === 'all') group.visible = on;
    else {
      const f = families.get(name);
      if (!f) throw new Error(`atmosphere: no family "${name}" (${[...families.keys()].join(',')})`);
      f.visible = on;
    }
    return visibleState();
  }
  function visibleState() {
    const out = { all: group.visible };
    for (const [k, f] of families) out[k] = f.visible;
    return out;
  }

  const r3 = (v) => +v.toFixed(3);
  const r4 = (v) => +v.toFixed(4);

  function snapshot() {
    const w = windAt(t);
    return {
      time: r3(t),
      gusts: gustCount,
      wind: { x: r3(w.x), z: r3(w.z), speed: r3(w.speed), gust: r4(w.gust) },
      visible: visibleState(),
      families: [...families.keys()],
      tumbleweeds: weeds.map((tw, i) => ({
        i, x: r3(tw.x), y: r3(tw.y), z: r3(tw.z),
        roll: r4(tw.roll),
        // The quaternion is the real rotation; a check asserts it changed too,
        // so a faked `roll` counter cannot pass.
        q: [r4(tw.q.x), r4(tw.q.y), r4(tw.q.z), r4(tw.q.w)],
      })),
      signs: signs.map((s) => ({
        name: s.name, x: s.x, y: s.y, z: s.z, dir: s.dir,
        angle: r4(s.angle), vel: r4(s.vel), peak: r4(s.peak),
        maxAngle: SIGNS.maxAngle,
      })),
      // T020c: the mote families, as sampled state a check can diff across frames.
      dust: {
        count: DUST.count, recycles: dustRecycles,
        box: { x: [DUST.minX, DUST.maxX], y: [DUST.minY, DUST.maxY], z: [DUST.minZ, DUST.maxZ] },
        items: dustState.slice(0, 8).map((p, i) => ({
          i, x: r3(p.x), y: r3(p.y), z: r3(p.z), age: r3(p.age), life: r3(p.life),
          size: r3(p.size), alpha: r4(dust.alpha[i]),
        })),
      },
      smoke: {
        count: smokeN, respawns: smokeRespawns, life: SMOKE.life,
        stacks: SMOKE.stacks.map((s) => ({ ...s })),
        items: smokeState.map((p, i) => ({
          i, stack: p.stack, x: r3(p.x), y: r3(p.y), z: r3(p.z),
          age: r3(p.age), size: r3(smoke.size[i]), alpha: r4(smoke.alpha[i]),
        })),
      },
      birds: {
        count: BIRDS.count, laps: birdLaps, span: BIRDS.span, x: r3(birdX),
        items: birdState.map((b, i) => ({
          i, x: r3(b.x), y: r3(b.y), z: r3(b.z),
          size: r3(birds.size[i]), alpha: r4(birds.alpha[i]),
        })),
      },
      motes: { dust: dustRecycles, smoke: smokeRespawns, birds: birdLaps },
      meshes: ['atmo-tumbleweeds', 'atmo-sign-brackets', 'atmo-sign-boards',
        'atmo-dust', 'atmo-smoke', 'atmo-birds'],
      drawCalls: 6,
    };
  }

  writeWeeds();
  writeBoards();
  stepMotes(1 / 60, windAt(0));   // fill the mote buffers before the first frame
  engine.scene.add(group);

  return {
    group,
    families,
    weeds,
    signs,
    wind: windAt,
    get time() { return t; },
    get gusts() { return gustCount; },
    update,
    run,
    gust,
    setVisible,
    visibleState,
    snapshot,
    dispose() {
      weedGeo.dispose();
      boardGeo.dispose();
      bracketMesh.geometry.dispose();
      for (const c of [dust, smoke, birds]) { c.geo.dispose(); c.pts.material.dispose(); }
      group.parent?.remove(group);
      return group;
    },
  };
}
