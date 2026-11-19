// src/checkpoints.js — the four checkpoints of R24: the gates along Midnight Pass,
// the finish line that is the fourth of them, and the crossing test that ends a run.
//
// R24 says four checkpoints are placed along the route, the fourth being the finish
// line. The gates are arc-length stations on the same centreline road.js publishes,
// so they follow the geometry rather than a list of coordinates: the first stands on
// the opening straight, the second and third just outside the avalanche gallery
// (whose portals come from scenery.js's gallerySpanFor(), never copied here) and the
// fourth is the finish at ROAD_LENGTH_M.
//
// Crossing is a PURE function of the car state: checkCross(car, race, run) compares
// the station the car is at now against the gates it had not reached when the last
// step was looked at, so a fast step that moves through two gates reports both, in
// order. It keeps no clock of its own and reads nothing outside its arguments, which
// is what lets T002 replay a stepped trace twice and get the same answer. reset()
// clears the counter (run.reset()), so a replayed run crosses them again.
//
// The markers are the visible half: a gate arch beside the road at each station, with
// a painted band across the tarmac, and a checkered band and banner on the finish.
// This module imports THREE and road.js/scenery.js at module level, so buildCheckpointMarkers()
// is browser-only; the gate list and the crossing test are pure.

import * as THREE from '../vendor/three.module.min.js';
import { ROAD_LENGTH_M, ROAD_HALF_WIDTH, SHOULDER_WIDTH_M, roadSample } from './road.js';
import { gallerySpanFor } from './scenery.js';

// R24: four gates, the last one the finish line.
export const CHECKPOINT_COUNT = 4;

// Where the three intermediate gates go, as fractions of the route and as clear
// distances from the gallery portals. The first is on the opening straight (the
// forest starts at FOREST_MARGIN_M and the gallery at s = 1500), the second and third
// bracket the shed so the covered stretch is itself a checkpoint-to-checkpoint leg.
export const GATE_FIRST_FRACTION = 0.22;
export const GATE_GALLERY_CLEAR_M = 60;
export const GATE_MIN_GAP_M = 40;

// Gate arch. The posts stand outside the shoulder, so nothing in a gate is drivable
// or in the car's path (EDGE_LIMIT_M in physics.js is inside these numbers).
export const GATE_POST_LATERAL_M = ROAD_HALF_WIDTH + SHOULDER_WIDTH_M + 0.55; // 7.35 m
export const GATE_POST_HEIGHT_M = 5.4;
export const GATE_POST_SECTION_M = 0.34;
export const GATE_BANNER_HEIGHT_M = 1.15;
export const GATE_BANNER_DROP_M = 0.7; // its top hangs this far below the beam
export const GATE_LINE_WIDTH_M = 0.8; // the painted band across the tarmac
export const GATE_CHECK_SQUARE_M = 0.4; // one checker of the finish band

const GATE_POST_COLOR = 0xb9c2d6;
const GATE_BANNER_COLOR = 0x8fb4e8;
const GATE_LINE_COLOR = 0xdfe6f5; // the same paint as road.js's edge lines
const CHECKER_LIGHT = 0xf2f4f8;
const CHECKER_DARK = 0x151a26;

// T035: the board the banner hangs on. It used to be a flat UNLIT plane the colour of
// the checker's light squares, so from the road it read as one blank blown-out white
// sheet — the marking on it was a second plane set 1 cm in front, which the board's own
// depth hid from the other side. Now the board is a thin shaded panel in the dark paint
// and the marking straddles it, so both faces carry it.
export const GATE_BOARD_COLOR = 0x1b2233;
export const GATE_BOARD_DEPTH_M = 0.08;
export const GATE_STRIPE_LIGHT = 0xa8c4ea; // a checkpoint's marking: never near-white
const CHECKER_RAISE_M = 0.012; // how far a marking cell stands proud of the board

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
const num = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0);

/**
 * The four gate stations for a route of `lengthM` metres whose gallery covers
 * `span`. Pure and deterministic: the same numbers in Node and in the page, so the
 * hazard layout (T017) and the HUD (T019) can read the same gates.
 * @returns {Array<{index:number,s:number,name:string,label:string,finish:boolean}>}
 */
export function checkpointGates(lengthM = ROAD_LENGTH_M, span = gallerySpanFor(lengthM)) {
  const L = num(lengthM) > 0 ? num(lengthM) : ROAD_LENGTH_M;
  const shed = span && Number.isFinite(span.sStart) && Number.isFinite(span.sEnd)
    ? span
    : gallerySpanFor(L);
  const gap = Math.max(GATE_GALLERY_CLEAR_M, GATE_MIN_GAP_M);

  // Candidates: the opening straight, then one gate each side of the shed, then the
  // finish. A gate that would fall under the gallery is pushed out to the nearer
  // portal, so the arch is always in the open.
  const candidates = [
    Math.round(L * GATE_FIRST_FRACTION),
    shed.sStart - gap,
    shed.sEnd + gap,
    L,
  ];

  const gates = [];
  let prev = 0;
  for (let i = 0; i < CHECKPOINT_COUNT; i++) {
    const finish = i === CHECKPOINT_COUNT - 1;
    let s = finish ? L : num(candidates[i]);
    if (!finish && s > shed.sStart - gap && s < shed.sEnd + gap) {
      s = s < (shed.sStart + shed.sEnd) / 2 ? shed.sStart - gap : shed.sEnd + gap;
    }
    if (!finish) {
      // Strictly increasing, inside the route, and never on top of the finish.
      s = clamp(s, prev + GATE_MIN_GAP_M, L - GATE_MIN_GAP_M);
      if (s <= prev) s = Math.min(prev + GATE_MIN_GAP_M, L - GATE_MIN_GAP_M);
      s = Math.round(s);
    }
    if (finish && s <= prev) s = L; // the finish is the route length, always last
    prev = s;
    gates.push({
      index: i + 1,
      s,
      name: `checkpoint-${i + 1}`,
      label: finish ? 'FINISH' : String(i + 1),
      finish,
    });
  }
  return gates;
}

/** The gates of the route as built (road.js's length, scenery.js's gallery span). */
export const CHECKPOINTS = checkpointGates(ROAD_LENGTH_M, gallerySpanFor(ROAD_LENGTH_M));

/**
 * The run main.js drives: checkCross(car, race) with no third argument uses this
 * record, and __pr.reset() clears it. A check that wants a clean slate of its own
 * calls createCheckpointRun() and passes it in.
 */
export const checkpointRun = createCheckpointRun(CHECKPOINTS);

/**
 * A fresh crossing record for a run. main.js keeps one and clears it on reset(); a
 * check can make its own to test checkCross() without touching the page's run.
 */
export function createCheckpointRun(gates = CHECKPOINTS) {
  const list = Array.isArray(gates) && gates.length ? gates : checkpointGates();
  const run = {
    gates: list,
    total: list.length,
    /** How many gates the car has passed, which is the HUD's `n` in `n/4` (T019). */
    crossed: 0,
    /** The station the car was at the last time checkCross() looked. */
    lastS: null,
    /** One record per gate crossed this run, in order. */
    events: [],
    /** True from the moment the fourth (finish) gate is crossed. */
    finished: false,
    // R24 progress for the HUD: crossed / total, 0…1.
    get progress() {
      return run.total ? run.crossed / run.total : 0;
    },
    reset() {
      run.crossed = 0;
      run.lastS = null;
      run.events = [];
      run.finished = false;
      return run;
    },
    snapshot() {
      return {
        crossed: run.crossed,
        total: run.total,
        progress: run.progress,
        finished: run.finished,
        events: run.events.map((e) => ({ ...e })),
      };
    },
  };
  return run;
}

/**
 * R24: look at where the car is now and cross every gate it has come to or gone
 * through since the last call. Crossing the fourth ends the run through race.finish().
 *
 * Pure in the car state: no clock, no DOM, no renderer, and nothing accumulated that
 * a reset() does not clear. `race` may be null (a check that only wants the count).
 * @param {{s:number}} car the physics state step() advanced
 * @param {{finish?:function}} race the run machine, finished at the line
 * @param {object} [run] record from createCheckpointRun(); the default is the run
 *        main.js drives
 * @returns {{crossed:object[], total:number, progress:number, finished:boolean}}
 */
export function checkCross(car, race, run = checkpointRun) {
  const rec = run || null;
  const s = num(car && car.s);
  const empty = { crossed: [], total: rec ? rec.crossed : 0, progress: rec ? rec.progress : 0, finished: false };
  if (!rec) return empty;
  // The first look at a run starts from where the car already is, so a car placed
  // past a gate does not "cross" it on frame one; from then on every station between
  // the two looks is covered, however far the step moved.
  const from = Number.isFinite(rec.lastS) ? rec.lastS : s;
  rec.lastS = s;
  const crossed = [];
  while (rec.crossed < rec.total && s >= rec.gates[rec.crossed].s) {
    const gate = rec.gates[rec.crossed];
    rec.crossed += 1;
    const event = {
      index: gate.index,
      s: gate.s,
      name: gate.name,
      finish: !!gate.finish,
      crossed: rec.crossed,
      // Did the car actually drive through this station this step (a fast step can
      // cover several gates at once — none of them is skipped).
      through: gate.s > from && gate.s <= s,
    };
    rec.events.push(event);
    crossed.push(event);
    if (gate.finish) {
      rec.finished = true;
      if (race && typeof race.finish === 'function') race.finish();
    }
  }
  return { crossed, total: rec.crossed, progress: rec.progress, finished: rec.finished };
}

// ------------------------------------------------------------------- the markers
/**
 * The visible gates (R24): one arch beside the road at each station, with a painted
 * band across the tarmac, and a checkered band and banner on the finish.
 * @param {object|number} road main.js's road handle (only its lengthM is read) or a
 *        route length in metres
 * @param {Array} gates the stations, default CHECKPOINTS
 * @returns {{ group, markers:object[], gates, finishMarker }}
 */
export function buildCheckpointMarkers(road, gates = CHECKPOINTS) {
  if (!THREE || !THREE.BufferGeometry) {
    throw new Error('buildCheckpointMarkers needs the Three.js namespace');
  }
  const lengthM =
    typeof road === 'number' && road > 0 ? road : road && num(road.lengthM) > 0 ? num(road.lengthM) : ROAD_LENGTH_M;
  const list = (Array.isArray(gates) && gates.length ? gates : CHECKPOINTS).filter(
    (g) => g && num(g.s) > 0 && num(g.s) <= lengthM
  );

  const group = new THREE.Group();
  group.name = 'checkpoints';
  group.userData = {
    requirement: 'R24',
    count: list.length,
    stations: list.map((g) => num(g.s)),
    finishS: list.length ? num(list[list.length - 1].s) : lengthM,
  };

  const markers = [];
  for (const gate of list) {
    const marker = buildGate(THREE, gate, lengthM);
    group.add(marker);
    markers.push(marker);
  }
  return { group, markers, gates: list, finishMarker: markers.length ? markers[markers.length - 1] : null };
}

/** One gate: two posts, a beam, a banner, and the band painted on the asphalt. */
function buildGate(THREE, gate, lengthM) {
  const s = clamp(num(gate.s), 0, lengthM);
  const finish = !!gate.finish;
  const p = roadSample(s);
  const yaw = p.heading;

  const marker = new THREE.Group();
  marker.name = gate.name || `checkpoint-${gate.index}`;
  // The marker sits ON the centreline and is turned with the road, so a check can
  // compare marker.position with roadSample(gate.s) and its rotation.y with heading.
  marker.position.set(p.x, p.y, p.z);
  marker.rotation.set(0, yaw, 0);
  marker.userData = {
    requirement: 'R24',
    index: gate.index,
    s,
    label: gate.label,
    finish,
    lateralM: GATE_POST_LATERAL_M,
    postHeightM: GATE_POST_HEIGHT_M,
    roadElevationM: p.y,
  };

  const timber = new THREE.MeshLambertMaterial({ name: 'gate-post', color: GATE_POST_COLOR, fog: true });

  // Posts, one each side, outside the shoulder.
  for (const side of [1, -1]) {
    const post = new THREE.Mesh(
      new THREE.BoxGeometry(GATE_POST_SECTION_M, GATE_POST_HEIGHT_M, GATE_POST_SECTION_M),
      timber
    );
    post.name = `gate-post-${gate.index}-${side > 0 ? 'right' : 'left'}`;
    post.position.set(side * GATE_POST_LATERAL_M, GATE_POST_HEIGHT_M / 2, 0);
    marker.add(post);
  }

  // The beam that carries the banner, spanning the road between the post heads.
  const beam = new THREE.Mesh(
    new THREE.BoxGeometry(2 * GATE_POST_LATERAL_M + GATE_POST_SECTION_M, 0.34, 0.42),
    timber
  );
  beam.name = `gate-beam-${gate.index}`;
  beam.position.set(0, GATE_POST_HEIGHT_M - 0.17, 0);
  marker.add(beam);

  // Banner: a thin shaded board hung under the beam, facing back down the pass at the
  // driver, carrying its marking on BOTH faces (T035). Lit, unlike the old unlit plane,
  // so at dusk it reads as a structure the sky is behind rather than as a light source.
  const bannerWidth = 2 * (GATE_POST_LATERAL_M - 0.6);
  const banner = new THREE.Mesh(
    new THREE.BoxGeometry(bannerWidth, GATE_BANNER_HEIGHT_M, GATE_BOARD_DEPTH_M),
    new THREE.MeshLambertMaterial({ name: finish ? 'gate-banner-finish' : 'gate-banner', color: GATE_BOARD_COLOR, fog: true })
  );
  banner.name = `gate-banner-${gate.index}`;
  banner.position.set(0, GATE_POST_HEIGHT_M - 0.34 - GATE_BANNER_DROP_M - GATE_BANNER_HEIGHT_M / 2, 0);
  marker.add(banner);

  // The marking, standing proud of both faces of the board: a checkered band on the
  // finish, a stripe of checkpoint squares on the three intermediate gates. Both sides,
  // because the driver sees the front approaching the line and the back after it.
  const face = GATE_BOARD_DEPTH_M / 2 + CHECKER_RAISE_M;
  if (finish) {
    for (const z of [face, -face]) {
      marker.add(checkerPlane(THREE, {
        name: `gate-banner-checkers${z > 0 ? '-front' : '-back'}`,
        width: bannerWidth,
        height: GATE_BANNER_HEIGHT_M,
        squares: 10,
        rows: 2,
        y: banner.position.y,
        z,
      }));
    }
  } else {
    for (const z of [face, -face]) {
      marker.add(checkerPlane(THREE, {
        name: `gate-banner-stripe${z > 0 ? '-front' : '-back'}`,
        width: bannerWidth,
        height: GATE_BANNER_HEIGHT_M * 0.62,
        squares: 12,
        rows: 1,
        colours: [GATE_STRIPE_LIGHT, GATE_BANNER_COLOR],
        y: banner.position.y,
        z,
      }));
    }
  }

  // The band across the tarmac: plain paint at a checkpoint, checkered at the finish.
  if (finish) {
    marker.add(checkerStrip(THREE, {
      name: 'finish-line-band',
      halfWidth: ROAD_HALF_WIDTH,
      depth: GATE_LINE_WIDTH_M,
      squares: 12,
      rows: 2,
      y: 0.035, // just above the asphalt, like road.js's edge lines
    }));
  } else {
    const line = new THREE.Mesh(
      new THREE.BoxGeometry(2 * ROAD_HALF_WIDTH, 0.04, GATE_LINE_WIDTH_M),
      new THREE.MeshBasicMaterial({ name: 'gate-line', color: GATE_LINE_COLOR, fog: true })
    );
    line.name = `gate-line-${gate.index}`;
    line.position.set(0, 0.035, 0);
    marker.add(line);
  }

  return marker;
}

/**
 * A checkered band laid across the road in the marker's local frame: `squares`
 * columns over the asphalt width, `rows` deep along the route. Two InstancedMeshes
 * (light and dark) so no per-instance colour attribute is needed.
 */
function checkerStrip(THREE, o) {
  const group = new THREE.Group();
  group.name = o.name;
  const halfWidth = o.halfWidth;
  const cols = Math.max(2, Math.round(o.squares));
  const rows = Math.max(1, Math.round(o.rows));
  const w = (2 * halfWidth) / cols;
  const d = o.depth / rows;
  const geo = new THREE.BoxGeometry(w * 0.98, 0.04, d * 0.98);
  const cells = [[], []];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = -halfWidth + w * (c + 0.5);
      const z = -o.depth / 2 + d * (r + 0.5);
      cells[(r + c) % 2].push([x, z]);
    }
  }
  const colours = [CHECKER_LIGHT, CHECKER_DARK];
  for (let parity = 0; parity < 2; parity++) {
    const mesh = new THREE.InstancedMesh(
      geo,
      new THREE.MeshBasicMaterial({ name: `${o.name}-${parity}`, color: colours[parity], fog: true }),
      cells[parity].length
    );
    mesh.name = `${o.name}-${parity ? 'dark' : 'light'}`;
    const dummy = new THREE.Object3D();
    cells[parity].forEach(([x, z], i) => {
      dummy.position.set(x, o.y, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
    group.add(mesh);
  }
  group.userData = { cells: cells[0].length + cells[1].length, cols, rows };
  return group;
}

/** The same checkers on a vertical plane (the finish banner). */
function checkerPlane(THREE, o) {
  const group = new THREE.Group();
  group.name = o.name;
  const cols = Math.max(2, Math.round(o.squares));
  const rows = Math.max(1, Math.round(o.rows));
  const w = o.width / cols;
  const h = o.height / rows;
  const geo = new THREE.PlaneGeometry(w * 0.98, h * 0.98);
  const cells = [[], []];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = -o.width / 2 + w * (c + 0.5);
      const y = -o.height / 2 + h * (r + 0.5);
      cells[(r + c) % 2].push([x, y]);
    }
  }
  const colours = o.colours || [CHECKER_LIGHT, CHECKER_DARK];
  for (let parity = 0; parity < 2; parity++) {
    const mesh = new THREE.InstancedMesh(
      geo,
      new THREE.MeshBasicMaterial({ name: `${o.name}-${parity}`, color: colours[parity], fog: true, side: THREE.DoubleSide }),
      cells[parity].length
    );
    mesh.name = `${o.name}-${parity ? 'dark' : 'light'}`;
    const dummy = new THREE.Object3D();
    cells[parity].forEach(([x, y], i) => {
      dummy.position.set(x, o.y + y, o.z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
    group.add(mesh);
  }
  return group;
}
