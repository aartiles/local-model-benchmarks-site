// src/main.js — boot: renderer, scene, camera, the single rAF loop, and the
// `window.__pr` debug handle every check drives. It owns the frame ORDER only
// (input → physics → collision → race → camera → HUD → render); the behaviour of
// each step belongs to its own module (road.js, physics.js, race.js, …), which is
// why this file stays thin. Three.js is imported from ./vendor/ so the app and
// vendor/GLTFLoader.js share one r170 instance (R36).

import * as THREE from '../vendor/three.module.min.js';
import { assetUrl, loadAssets, PREVIEW } from './assets.js';
import { ROAD_LENGTH_M, roadSample, buildRoadMesh } from './road.js';
import { buildSky } from './sky.js';
import { buildScenery } from './scenery.js';
import { loadCoupe, CAR_START_S } from './car.js';
import { initialCarState, stepPhysics, impactSpeedCut, speedLimitKmh, MAX_SPEED_KMH, PHYSICS } from './physics.js';
import { chaseCamera, anchoredCamera, contactScreenPx, readyCamera, selectCamera, resizeCamera, CHASE_FOV } from './camera.js';
import { installInput } from './input.js';
import { createRace, PENALTY_MS, RACE_STATES, medalFor, MEDALS, MEDAL_GOLD_MS, MEDAL_SILVER_MS } from './race.js';
import * as persist from './persist.js';
import { createCalibration } from './calibration.js';
import { CHECKPOINTS, checkpointGates, checkpointRun, createCheckpointRun, checkCross, buildCheckpointMarkers } from './checkpoints.js';
import { buildHazards, hazardLayout, hazardQuery, EDGE_HAZARD_LIMIT_M } from './hazards.js';
import { createCollision, applyCollision, clearCollisions, COLLISION_PENALTY_MS } from './collision.js';
import { createAudio } from './audio.js';
import {
  createHud,
  hudText,
  formatSpeed,
  formatElapsedMs,
  formatDistance,
  formatCheckpoints,
  HUD_IDS,
  createOverlays,
  showOverlay,
  resultText,
  visiblePanels,
  OVERLAY_IDS,
  OVERLAY_NONE,
  RESULT_IDS,
  installStagePreview,
  stagePreviewVisible,
  STAGE_PREVIEW_ID,
  STAGE_PREVIEW_ASSET,
} from './hud.js';

const canvas = document.getElementById('gl');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'default' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
// The dusk sky, lighting and fog (R9) are installed on the boot frame: the lights,
// fog and background need no asset. sky.js adds the alpine-sky backdrop below, as
// soon as the texture has loaded.
const sky = buildSky(null);
scene.add(sky.group);
scene.fog = sky.fog;
scene.background = sky.background;

const camera = new THREE.PerspectiveCamera(CHASE_FOV, 16 / 9, 0.1, 2000);
// The route runs along +z at the start (road.js convention), so the camera looks
// down the pass from the very first frame. camera.js owns the moving views; this
// literal pose is only the pre-asset boot frame, and road.js replaces it with the
// start pose derived from roadSample() as soon as the asphalt is in the scene.
camera.up.set(0, 1, 0);
camera.position.set(0, 2.6, -14);
camera.lookAt(0, 1.6, 26);

// ------------------------------------------------------- the road (R2, R4) ----
// The asphalt ribbon is built once the supplied road-grain texture has loaded, and
// the starting camera pose is derived from the centreline. Until then the boot
// camera above is aimed down the pass at an empty scene.
let road = null;
// The camera rig (camera.js). `cameraMode` is 'ready' until the car leaves the
// staging station, then 'chase' (virtual mode, R21); reset() puts it back.
let readyCam = null;
let chaseCam = null;
// The physical-mode view of the toy on the tablet (R20, T023). It is built with the
// road, but it only becomes the live view when the mode is 'physical' AND an anchor has
// been saved (R18) — otherwise the run keeps the virtual framing.
let anchoredCam = null;
let cameraMode = 'ready';

function installRoad(assets) {
  if (road) return road;
  const group = buildRoadMesh(THREE, assets.textures['road-grain']);
  scene.add(group);

  // Start pose: the eye sits on the centreline 2 m back from the line, low over
  // the tarmac and 1.6 m up, aimed at a point 26 m ahead along the same sample.
  // Everything is derived from roadSample(), so it follows the geometry (R1, R4).
  const eye = roadSample(-2);
  const ahead = roadSample(26);
  const fx = Math.sin(eye.heading);
  const fz = Math.cos(eye.heading);
  const up = new THREE.Vector3(0, 1, 0).lerp(new THREE.Vector3(-fx * eye.grade, 1, -fz * eye.grade).normalize(), 0.5).normalize();
  road = {
    group,
    asphalt: group.getObjectByName('road-asphalt'),
    lengthM: ROAD_LENGTH_M,
    start: {
      eye: new THREE.Vector3(eye.x, eye.y + 1.6, eye.z),
      look: new THREE.Vector3(ahead.x, ahead.y + 1.2, ahead.z),
      up,
    },
  };
  // camera.js owns the views from here on: the ready pose is this start pose, and
  // the chase camera follows the car state step() advances.
  readyCam = readyCamera(road.start);
  chaseCam = chaseCamera(carState, { sample: roadSample, lengthM: ROAD_LENGTH_M });
  anchoredCam = anchoredCamera(carState, { sample: roadSample, lengthM: ROAD_LENGTH_M }, calibration, window.innerWidth, window.innerHeight);
  return road;
}

// ---------------------------------------------------------- the scenery (R5) --
// The spruce forest is placed from the same centreline the asphalt is, so it is built
// after the road and with the three spruce textures in hand. Trees stand outside the
// shoulder, which keeps the drivable corridor and the opening view down the pass.
let scenery = null;

function installScenery(assets) {
  if (scenery) return scenery;
  const built = buildScenery(road, {
    'spruce-0': assets.textures['spruce-0'],
    'spruce-1': assets.textures['spruce-1'],
    'spruce-2': assets.textures['spruce-2'],
  });
  scene.add(built.group);
  scenery = built;
  return scenery;
}

// -------------------------------------------------------------- the car (R21) --
// The supplied textured coupe, for virtual mode. It is built from the same
// centreline the asphalt is, so it stands on the tarmac at the staging station;
// car.js owns its scale and seating, and physics.js (T012) owns its motion.
// Physical mode never draws it (R17) — that switch is T022.
let car = null;

function installCar(assets) {
  if (car) return car;
  const built = loadCoupe(assets);
  scene.add(built.group);
  car = built;
  // The mode survived the reload (R34), so the coupe lands in the state the run is
  // in: physical mode never draws it (R17). loadCoupe builds it visible, so this is
  // only a change when the stored mode is 'physical'.
  if (mode !== 'virtual') built.setMode(mode);
  return car;
}

// --------------------------------------------------------- the checkpoints (R24) --
// The four gates — the last one the finish line — are placed from the same
// centreline, so their arches appear with the rest of the stage. Their stations come
// from checkpoints.js, which reads the gallery span from scenery.js rather than
// copying it, and the crossing test is driven from step().
let checkpoints = null;

function installCheckpoints() {
  if (checkpoints) return checkpoints;
  const built = buildCheckpointMarkers(road || ROAD_LENGTH_M, CHECKPOINTS);
  scene.add(built.group);
  checkpoints = built;
  return built;
}

// ------------------------------------------------------------- hazards (R25) --
// Cones, corner barriers and the road edges the car can collide with. The layout is
// pure and seeded, so it exists from the boot frame — before the assets land — and
// hazardQuery() can run every step; the meshes are installed with the rest of the
// stage. collision.js (T018) turns a hit into the speed cut and the 2 s penalty.
const hazards = hazardLayout(ROAD_LENGTH_M, { sample: roadSample });
let hazardMeshes = null;

function installHazards() {
  if (hazardMeshes) return hazardMeshes;
  const built = buildHazards(ROAD_LENGTH_M, hazards);
  scene.add(built.group);
  hazardMeshes = built;
  return hazardMeshes;
}

// ------------------------------------------------------------- assets (R11) --
// The supplied runtime assets are loaded once, from relative URLs (R37). The boot
// frame renders the dusk-lit empty stage while they arrive, so it is never blank;
// road.js / scenery.js / car.js / sky.js consume `assets` when they land.
const assets = { promise: null, value: null, error: null, progress: 0, requested: false };

function bootAssets() {
  assets.requested = true;
  assets.promise = loadAssets((fraction, url) => {
    assets.progress = fraction;
    setLoadingNote(fraction, url);
  });
  assets.promise.then(
    (loaded) => {
      assets.value = loaded;
      sky.installDome(loaded.sky); // the dusk backdrop from assets/alpine-sky.webp (R9)
      installRoad(loaded);
      installScenery(loaded); // the spruce forest from assets/spruce-*.webp (R5)
      installCar(loaded); // the textured coupe from assets/coupe.glb (R21)
      installCheckpoints(); // the four gates and the finish line (R24)
      installHazards(); // the cones and corner rails of R25
      // R10: the ready screen's stage preview, painted from the same decoded bitmap —
      // no second request for assets/midnight-pass.webp (R11).
      installStagePreview(loaded.preview, { url: assetUrl(PREVIEW) });
      setOverlayNote(readyNote);
    },
    (error) => {
      assets.error = String((error && error.message) || error);
      setOverlayNote('Assets failed to load: ' + assets.error);
    }
  );
}

const readyNote = document.getElementById('overlay-ready')
  ? document.querySelector('#overlay-ready .overlay-note').textContent
  : '';
function setOverlayNote(text) {
  const el = document.querySelector('#overlay-ready .overlay-note');
  if (el) el.textContent = text;
}
function setLoadingNote(fraction, url) {
  const pct = Math.round(Math.max(0, Math.min(1, fraction)) * 100);
  const name = url ? String(url).split('/').pop() : '';
  setOverlayNote(`Loading ${pct}%${name ? ' — ' + name : ''}`);
}
bootAssets();

// --------------------------------------------------------------- game state --
// Only the fields this card owns. Later cards add their own (mode, race, input,
// car, road) through the modules that define them.
const state = {
  frame: 0,
  renderFrame: 0,
  simTimeMs: 0,
  distanceM: 0,
  speedKmh: 0,
  paused: false,
  // R24: how many of the four gates have been crossed, and the n/4 progress the HUD
  // (T019) shows. Both are cleared by reset(), like the run clock.
  checkpointsCrossed: 0,
  checkpointProgress: 0,
  // R25 / R26 / R27: what the car touched in the last step, and what that did to it.
  // Both are the objects their modules keep live (hazardQuery's record, collision.js's
  // reused status), so a check reads them without asking again.
  hazard: null,
  collision: null,
  // The route length is read from road.js, never copied here (R2).
  roadLengthM: ROAD_LENGTH_M,
  get progress() {
    return this.roadLengthM ? Math.min(1, Math.max(0, this.distanceM / this.roadLengthM)) : 0;
  },
};

// -------------------------------------------------------------- input (R15) --
// Unified control state. This object is THE control state: input.js writes a
// field only when a pointer starts or ends (never rebuilds it from the DOM each
// frame), so a hand-written `__pr.input.throttle = 1` still moves the car.
// Keyboard (T015) merges into the same object.
const input = { steer: 0, throttle: 0, brake: 0 };
// Multi-touch: left half = steering, right half = throttle/brake, one pointer
// captured per control so a release or cancel clears only that control (R12–R14).
// The same call also installs the keyboard (R15) and Escape (R16): WASD and the
// arrows drive the same four controls through per-source held state, so a key
// release never lifts a thumb and a thumb lift never releases a key.
const controls = installInput(input, { onPause: () => togglePause('escape') });
const touchInput = controls;

// R16: Escape toggles the run through the race machine, and `onState` mirrors the
// pause into the frame-loop gate. A finished run refuses both, so Escape on the
// result screen does nothing. The event itself is left alone by input.js, so the
// overlays (T020) can handle the same key press.
function togglePause(reason) {
  if (race.state === 'paused') race.resume(reason);
  else race.pause(reason);
  return race.state;
}

// ------------------------------------------------- persisted state (R34, R35) --
// What the game remembers across a reload lives in ONE namespaced localStorage
// record, read and written by persist.js. main.js keeps the live mirror of the three
// fields and the only setters; nothing else touches storage.
//   * `muted`     — T024's audio reads this (and setMuted writes it back), so a
//                   reload restores silence without waiting for the audio module.
//   * `calibration` — T022's anchor; setCalibration() is the one door that saves it.
//   * `mode`      — 'virtual' | 'physical'. Owned HERE (R35 needs a current mode to
//                   record a best into before the mode switch UI exists); T022's
//                   switch calls setMode(), it does not add a second flag.
// They are read once, at boot, before the run machine is built.
const persisted = persist.read();
let muted = persisted.muted;
let calibration = persisted.calibration;
let mode = persisted.mode;

// R33: the sound of the run. The flag lives in persist.js (main.js' setters below are
// the only door); this module only plays, and never changes physics or race state, so
// the DONE T002.page-boots trace replay stays byte-identical.
const audio = createAudio({ muted });
// The context is created on the FIRST user gesture, never at module load (Safari
// wants the resume inside the handler too). One capture listener, removed once armed.
let audioArmed = false;
function armAudio() {
  if (audioArmed) return;
  audioArmed = audio.arm();
  if (audioArmed) {
    window.removeEventListener('pointerdown', armAudio, true);
    window.removeEventListener('keydown', armAudio, true);
    window.removeEventListener('touchstart', armAudio, true);
  }
}
window.addEventListener('pointerdown', armAudio, true);
window.addEventListener('keydown', armAudio, true);
window.addEventListener('touchstart', armAudio, true);

function setMuted(value) {
  muted = persist.saveMute(!!value);
  audio.setMuted(muted);
  paintMuteButton();
  return muted;
}
function toggleMute() {
  return setMuted(!muted);
}
// The mute toggle (R33): a real button beside the top-left mode switch, so the T025
// layout gate measures it like every other control. Its label matches neither
// /steer|wheel/ nor /throttle|brake|pedal|gas|accel/, so the probe classifies it
// 'other' and it is not pulled into R12's half-of-screen rule.
function paintMuteButton() {
  const el = typeof document !== 'undefined' ? document.getElementById('btn-mute') : null;
  if (!el) return;
  el.setAttribute('aria-pressed', muted ? 'true' : 'false');
  el.dataset.active = muted ? 'off' : 'on';
  el.textContent = muted ? 'Sound off' : 'Sound on';
  return el;
}
function wireMuteButton() {
  const el = paintMuteButton();
  if (!el) return null;
  el.addEventListener('click', (e) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    armAudio();
    toggleMute();
    return true;
  });
  return el;
}
const muteButton = wireMuteButton();

// The physical-mode setup screen (R17, R18, R19): the mode switch, the play area and
// the mark.svg marker. Declared before the two setters so they can keep it in step.
// It never touches storage and never hides the car itself — these setters are the only
// doors, so the mode, the anchor and the bests slot cannot disagree after a reload.
let calibrationSetup = null;

function setCalibration(anchor) {
  calibration = persist.saveCalibration(anchor);
  if (calibrationSetup) calibrationSetup.setAnchor(calibration);
  // R20: the anchored camera pins the road contact point to THIS pixel, so a new
  // placement moves the frustum slide on the next frame, not on a reload.
  if (anchoredCam) anchoredCam.setAnchor(calibration);
  return calibration;
}
// R17/R35: switching mode is one call — it persists the choice, and it is what hides
// the digital coupe. T022's switch UI and the camera branch (T023) read `mode`.
//
// R31: entering physical mode OPENS the setup, and a thumb on the play area is placing
// a toy, not driving. If a timed run is driving at that moment it goes through the
// existing pause path, so the clock freezes instead of burning dead time on a car that
// cannot be driven (R28/R29 would otherwise score a medal off that dead time). The run
// comes back from the pause screen, never by itself — leaving physical mode only puts
// the setup away. `race` exists by the time any caller can reach this (the switch and
// __pr.setMode are both after boot); the setup's own setMode() is a different function.
function setMode(next) {
  mode = persist.setMode(next);
  if (car) car.setMode(mode);
  // R17/R18: physical mode is where the toy gets placed, so entering it opens the
  // setup and leaving it puts the screen away. The setup reads the mode from here.
  if (calibrationSetup) calibrationSetup.setMode(mode);
  if (mode === 'physical' && race && race.state === 'driving') race.pause('setup');
  return mode;
}

// Built once, from the markup in index.html, with the stored anchor and mode as its
// starting state — so a reload in physical mode comes back with the setup open and the
// marker on the saved anchor (R34). Its callbacks go through the setters above.
calibrationSetup = createCalibration({
  anchor: calibration,
  mode,
  onAnchor: (a) => setCalibration(a),
  onMode: (m) => setMode(m),
});
if (mode !== 'virtual') calibrationSetup.setMode(mode);

// ---------------------------------------------------------------- the run ----
// race.js owns the ready → driving → paused → finished machine (R22, R31, R32);
// main.js owns only when its clock advances and what the frame loop does about it.
// The clock is advanced inside step(), not in the rAF gate, so a check that drives
// step() by hand measures the same elapsed time as a player on a real display — and
// so "the clock stops while paused" holds for both paths. `state.simTimeMs` stays a
// separate placeholder sim clock.
// The overlays (R29, R30, R31): one panel per run state, driven from the SAME
// onState callback that mirrors `paused` — there is no second state subscription.
// Declared before the machine because onState closes over it; assigned right after.
let overlays = null;

const race = createRace({
  throttle: () => input.throttle,
  // R34/R35: the finish records its final time into the best of the mode that was
  // live at the line. persist.js does the storing; race.js only asks.
  getMode: () => mode,
  recordBest: (m, ms) => persist.saveBest(m, ms),
  onState(next, prev, reason) {
    // `state.paused` is the frame-loop gate, and it is deliberately NOT the machine's
    // state: __pr.reset() restarts the run without lifting a check's pause (T011–T013
    // pause, then reset, and still expect the loop to hold). Only a pause closes it,
    // and only a resume — never a restart — opens it again.
    if (next === 'paused') state.paused = true;
    else if (prev === 'paused' && reason !== 'restart') state.paused = false;
    // R31: the visible panel changes with the state, in this one event. 'driving'
    // shows no panel; 'finished' shows the result with the figures frozen at the line.
    if (overlays) overlays.show(next, race, { collisions: collision.count });
  },
});

// ------------------------------------------------------------- simulation ----
// dt is in seconds. Deterministic: the same (state, input, dt) always gives the
// same result, and nothing here reads the clock or touches the renderer.
// The car's own state (s, lateral, alpha, speedKmh) lives in physics.js's model;
// it exists from the boot frame, before the coupe has loaded, so step() drives the
// same object whether or not the assets have landed.
let carState = initialCarState({ s: CAR_START_S, road: { sample: roadSample, lengthM: ROAD_LENGTH_M } });

// R26 / R27: the collision tracker for this run. It owns the set of hazard ids
// already charged (so one continuing contact pays one 2 s penalty) and applies
// physics.js's impactSpeedCut() on the frame a distinct collision starts.
// reset() clears it together with the run clock and the penalties.
const collision = createCollision(race);

// R33: the sounds of one frame, called at the END of step() so it reads the finished
// collision / race / gate results of THIS frame. Log-only by construction: it never
// writes carState, race or checkpointRun, so a replayed trace is unchanged.
let finishPlayed = false;
function playFrameSounds(gates) {
  const driving = race.state === 'driving';
  if (driving) {
    if (!audio.status().engineRunning) audio.engineStart({ speedKmh: carState.speedKmh, maxKmh: MAX_SPEED_KMH });
    else audio.engine(carState.speedKmh, MAX_SPEED_KMH);
  } else if (audio.status().engineRunning) {
    audio.halt(); // paused / ready / finished: the hum parks with the clock
  }
  const hit = state.collision;
  if (hit && hit.impact) audio.impact({ id: hit.id, kind: hit.kind, cutKmh: hit.cutKmh });
  if (gates && gates.crossed) {
    for (const g of gates.crossed) {
      if (g.finish) continue; // the line gets the fanfare below, not a gate blip
      audio.checkpoint({ index: g.index, name: g.name, crossed: g.crossed, finish: false });
    }
  }
  if (race.state === 'finished' && !finishPlayed) {
    finishPlayed = true;
    audio.finish({ timeMs: race.finalTimeMs(), medal: race.medal });
  }
}

function step(dt, drive = input) {
  const d = Number(dt) > 0 ? Number(dt) : 0;
  stepPhysics(carState, drive, d, { sample: roadSample, lengthM: ROAD_LENGTH_M });
  // R25 → R26 → R27: the collision half of the frame order (input → physics →
  // collision → race → camera → HUD → render). It reads the state physics just
  // produced, so the hit is THIS frame's, and the speed an impact takes off is in
  // the state the cameras, the HUD and the run clock see below. Everything is a
  // function of stepped state, never of the wall clock, so a replayed trace collides
  // with the same ids and gets the same penalties.
  state.hazard = hazardQuery(carState, hazards);
  state.collision = collision.apply(carState, state.hazard);
  // The mesh follows the model, never the other way round (T010's note).
  if (car) car.place(carState);
  // The chase camera's damping advances with the simulation, not the wall clock, so
  // a check that drives step() also settles the camera.
  if (chaseCam) {
    chaseCam.car = carState;
    chaseCam.update(d);
  }
  // The anchored view follows the same state, so a check that drives step() also moves
  // the road under the marker (R20) and re-pins the contact point on the same frame.
  if (anchoredCam) {
    anchoredCam.car = carState;
    anchoredCam.update(d);
  }
  pickCameraMode();
  state.speedKmh = carState.speedKmh;
  state.distanceM = carState.distanceM;
  // R22: the first throttle of a ready run starts the clock, in this same step.
  race.startOnFirstThrottle(drive.throttle);
  // race.tick() only advances while the state is 'driving', so a paused or finished
  // run freezes its clock here even though the physics above keeps moving (T002).
  race.tick(d);
  // R24: cross every gate the car moved through this step. Crossing the fourth —
  // the finish line — is what calls race.finish() and freezes the run clock (R28).
  const gates = checkCross(carState, race, checkpointRun);
  state.checkpointsCrossed = checkpointRun.crossed;
  state.checkpointProgress = checkpointRun.progress;
  // R33: the sound half of the frame, LAST, after collision → race → gates. It only
  // READS what those calls produced and logs what it played; it never writes physics,
  // race or gate state, so the DONE T002.page-boots replayed trace stays identical.
  playFrameSounds(gates);
  state.simTimeMs += d * 1000;
  state.frame += 1;
  return state;
}

// The frame-loop gate. step() itself never refuses — T002 drives 600 steps while
// paused and requires the car to move — so the loop is what stops simulating a
// paused or finished run.
//
// While the physical-mode setup is open (R18) a thumb on the glass is placing the toy,
// not driving: the loop feeds the simulation a neutral control set, so a placement tap
// in the right half cannot start the clock (R22) or move the hidden car. The taps still
// reach input.js like every other control's (the T025 gate measures that); only their
// effect on the run is held until the setup is put away. step() keeps reading the live
// input by default, so a check that drives it directly gets the behaviour T002 measures.
const NEUTRAL_INPUT = { steer: 0, throttle: 0, brake: 0 };
function driveInput() {
  return calibrationSetup && calibrationSetup.visible() ? NEUTRAL_INPUT : input;
}

function tick(dt) {
  if (state.paused || race.state === 'finished') {
    // R33: the loop does not step while the run is held, so this is the only place the
    // hum can hear the pause — otherwise the engine keeps droning over the pause card.
    // It stops sound and nothing else: no car, race or gate state is touched.
    if (audio.status().engineRunning) audio.halt();
    return;
  }
  // R31: the setup screen holds the run. Opening it pauses (main.js's setMode), and a
  // resume that happens WHILE it is open — Escape on a keyboard, a debug hook — would
  // put the clock back on a car that cannot be driven, so the run goes back to the
  // pause screen instead. Only 'driving' is touched: a ready run stays ready, which is
  // what R22's "the clock starts on the first throttle" is measured against.
  if (calibrationSetup && calibrationSetup.visible() && race.state === 'driving') race.pause('setup');
  step(dt, driveInput());
}

// ------------------------------------------------------------------ camera -----
// Which view is live: 'ready' while the car is still on the staging station (that is
// the pose the first-frame checks measure), 'chase' once it has moved (R21), and back
// to 'ready' on reset(). 'anchored' is T023's physical-mode branch; selectCamera()
// names it and main.js keeps the ready pose until that camera exists.
function pickCameraMode() {
  // R17/R20: physical mode with a saved anchor is the anchored view. Without an anchor
  // there is nothing to pin the contact point to, so the run keeps the virtual framing
  // until the toy is placed.
  const want = mode === 'physical' && calibration && anchoredCam ? 'anchored' : road && carState.s !== CAR_START_S ? 'chase' : 'ready';
  if (want === cameraMode) return cameraMode;
  cameraMode = selectCamera(want);
  if (cameraMode === 'chase' && chaseCam) chaseCam.settle();
  if (cameraMode === 'anchored' && anchoredCam) {
    anchoredCam.car = carState;
    anchoredCam.setAnchor(calibration);
    anchoredCam.settle();
  }
  return cameraMode;
}

// ------------------------------------------------------------------ render ---
// The frame order splits here: applyCamera() is the camera slot, drawFrame() the
// render slot, and the HUD is written between them (input → physics → collision →
// race → camera → HUD → render). render() is both halves in order, which is what
// __pr.render has always meant for a hand-driven check.
function applyCamera() {
  const m = pickCameraMode();
  if (m === 'anchored' && anchoredCam) {
    anchoredCam.apply(THREE, camera);
  } else if (m === 'chase' && chaseCam) {
    // Leaving physical mode: the chase view owns the whole frame again, so the
    // anchoring frustum slide is cleared (it belongs to the anchored view only).
    if (camera.view && camera.view.enabled) camera.clearViewOffset();
    chaseCam.apply(THREE, camera);
  } else if (readyCam) {
    if (camera.view && camera.view.enabled) camera.clearViewOffset();
    readyCam.apply(THREE, camera);
  }
  // else: the boot frame, before the assets landed — the literal pose set above
  // already looks down the pass, so there is nothing to do here.
  sky.follow(camera); // the backdrop travels with the eye, so the valley has no edge
}

function drawFrame() {
  renderer.render(scene, camera);
  state.renderFrame += 1;
}

function render() {
  applyCamera();
  drawFrame();
}

function resize() {
  const w = Math.max(1, canvas.clientWidth || window.innerWidth);
  const h = Math.max(1, canvas.clientHeight || window.innerHeight);
  // camera.js keeps aspect, projection and renderer size in sync from one (w, h, dpr).
  resizeCamera(camera, w, h, Math.min(window.devicePixelRatio || 1, 2), renderer);
  // R20: the anchor is normalized to the viewport, so a resize moves both the marker and
  // the frustum slide that pins the contact point — the same code path as steering.
  if (anchoredCam) anchoredCam.setViewport(w, h);
  // The anchor is normalized to the viewport (R18), so a resize moves the marker.
  if (calibrationSetup) calibrationSetup.layout();
}
window.addEventListener('resize', resize);
resize();

// ------------------------------------------------- auto-pause (R31, R32) -------
// The run pauses itself when the document goes into the background — a tab switch,
// a phone going to the home screen, an app switcher — and stays on the pause screen
// when it comes back. Coming to the foreground deliberately does NOT resume: the
// player resumes (Escape / the pause overlay, T015/T031) or restarts.
function onBackground() {
  const hidden = document.hidden || document.visibilityState === 'hidden';
  if (hidden) race.autoPause();
  else race.markVisible();
}
document.addEventListener('visibilitychange', onBackground);
// pagehide is the iOS Safari signal (it can fire without a visibilitychange), and
// autoPause() is idempotent, so a double signal is harmless.
window.addEventListener('pagehide', () => race.autoPause());
// A bfcache restore lands on the pause screen too (the initial pageshow, which is
// not a restore, must not pause a run that has just booted in a hidden tab).
window.addEventListener('pageshow', (e) => {
  if (e && e.persisted) race.autoPause();
  else onBackground();
});

overlays = createOverlays();
// The panel for the state the run booted in, so the DOM and the machine agree from
// the first frame even when no transition has happened yet.
overlays.show(race.state, race, { collisions: collision.count });

// ---------------------------------------------------- the replay / restart -----
// R30 / R31: put the whole run back on the ready line. `resume: true` is the PLAYER's
// restart — the replay and restart buttons — which also opens the frame-loop gate,
// because a run restarted from the pause screen must drive again. __pr.reset() keeps
// the gate exactly as it found it: the DONE T011–T013 checks pause, reset, and still
// expect the loop to hold.
function resetRun(options = {}) {
  const resume = options.resume === true;
  state.frame = 0;
  state.simTimeMs = 0;
  state.distanceM = 0;
  state.speedKmh = 0;
  // R24: the gates are counted again from the start line, or a replayed trace would
  // differ from the first run (T002 drives step() twice from reset() and compares).
  checkpointRun.reset();
  state.checkpointsCrossed = 0;
  state.checkpointProgress = 0;
  // R31 / R30: a fresh run — back to 'ready' with the clock and the penalties at
  // zero, which is also what the restart flow does for a player.
  race.restart();
  // R27: the penalties and the set of collision ids already charged are part of the
  // run, so a replayed trace charges the same ones in the same order (T002 compares
  // two traces driven from reset()).
  race.clearPenalties();
  collision.reset();
  clearCollisions(race);
  // R33: a fresh run means fresh sounds — the hum parks and the finish fanfare is
  // allowed to play again. It changes no state, so a replayed trace is unaffected.
  audio.halt();
  finishPlayed = false;
  state.hazard = null;
  state.collision = collision.status();
  // A thumb still on the glass must not keep its control down through a reset.
  touchInput.releaseAll();
  input.steer = 0;
  input.throttle = 0;
  input.brake = 0;
  // The car body goes back to the staging station too, or a replayed trace
  // diverges (T002 drives step() by hand and compares two runs from reset()).
  carState = initialCarState({ s: CAR_START_S, road: { sample: roadSample, lengthM: ROAD_LENGTH_M } });
  if (car) car.place(carState);
  // Back to the ready pose: the camera follows the reset state, so the first frame
  // after a reset is the same view as the first frame on load.
  if (chaseCam) chaseCam.car = carState;
  if (anchoredCam) {
    anchoredCam.car = carState;
    anchoredCam.yaw = 0;
    anchoredCam.settle();
  }
  cameraMode = 'ready';
  // R31: the ready panel, and the result panel put away. restart() does not fire
  // onState when the run was already 'ready', so this is said here too.
  overlays.show(race.state, race);
  if (resume) state.paused = false;
  return state;
}

// The overlay buttons (R30, R31). They are real DOM controls, so a tap works on a
// tablet and a click works on a desktop; the panels that hold them are display:none
// when hidden, so a hidden button cannot swallow a touch meant for a pad.
function wireOverlayButtons() {
  const on = (id, fn) => {
    const el = document.getElementById(id);
    if (!el) return null;
    el.addEventListener('click', (e) => {
      if (e && typeof e.preventDefault === 'function') e.preventDefault();
      fn();
      hudFrame();
      return true;
    });
    return el;
  };
  return {
    replay: on('btn-replay', () => resetRun({ resume: true })),
    resume: on('btn-resume', () => {
      if (race.state === 'paused') race.resume('overlay');
    }),
    restart: on('btn-restart', () => resetRun({ resume: true })),
  };
}
const overlayButtons = wireOverlayButtons();

// ------------------------------------------------------------- frame order ---
// input (DOM events) → physics → collision → race → camera → HUD → render
let last = performance.now();
function loop(now) {
  const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
  last = now;
  tick(dt); // physics + race (placeholder)
  applyCamera(); // camera
  hudFrame(); // HUD readouts (R23)
  drawFrame(); // render
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// -------------------------------------------------------------------- HUD ----
// R23: speed, elapsed time, distance covered and checkpoint progress, written every
// frame from the three live objects — race.elapsedMs() for the clock (T014), the
// physics state for speed and distance (T012/T004), the crossing record for the
// gates (T016). hud.js formats; nothing here recomputes a route length or a clock
// (R2), and state.simTimeMs is NOT the time the player reads.
//
// It runs on every frame of the loop, paused or not, so the readouts show the frozen
// run rather than going stale (notes/T015.md: the HUD used to read TIME 0.00).
const hud = createHud();
let hudStrip = -1;
function hudFrame() {
  hud.update(race, carState, checkpointRun);
  // The control zones begin below the HUD strip, so the readouts are never covered
  // (R12, R23). The strip's height is MEASURED, not guessed: it moves when a font
  // lands, when the viewport changes and when a readout gets longer.
  const panel = hud.panel;
  if (panel) {
    const bottom = panel.getBoundingClientRect().bottom;
    if (Math.abs(bottom - hudStrip) > 0.5) {
      hudStrip = bottom;
      document.documentElement.style.setProperty('--hud-strip', `${Math.ceil(bottom + 2)}px`);
    }
  }
  // The setup panel hangs off that strip, so its play area moves while a font lands.
  // The marker is placed in viewport pixels (R18), so it is re-glued to its anchor on
  // every frame the setup is open — otherwise a reload would show the toy somewhere
  // else than where it was saved.
  if (calibrationSetup && calibrationSetup.visible()) calibrationSetup.layout();
}

// ------------------------------------------------------ debug handle (R1) ----
// The handle every check drives. Modules that do not exist yet are absent; later
// cards add them here (road, car, race, input, physics, hud, audio, persist).
window.__pr = {
  version: 1,
  threeRevision: THREE.REVISION,
  state,
  step,
  scene,
  camera,
  renderer,
  canvas,
  input,
  // The touch controls (input.js): `held()` names which control each pointer is
  // down on, `releaseAll()` lifts every one of them.
  touch: touchInput,
  // The keyboard (T015, R15/R16): `keys()` is which of the four controls a KEY holds
  // down, independent of the thumbs; `pressKey`/`releaseKey` drive it without a real
  // event, and `togglePause` is what Escape calls.
  keys: controls.keys,
  pressKey: controls.pressKey,
  releaseKey: controls.releaseKey,
  togglePause,
  resize,
  render,
  // Asset loading (T003): the relative-URL builder, the loader's status and the
  // cached result. Later cards read `assets.value` when they build their meshes.
  assetUrl,
  assets,
  loadAssets: bootAssets,
  // Road geometry and the asphalt mesh (road.js). `road` is null until the
  // road-grain texture has loaded and installRoad() has run.
  road: () => road,
  roadLengthM: ROAD_LENGTH_M,
  roadSample,
  buildRoadMesh,
  // The spruce forest and the rest of the scenery (scenery.js). Like the road it is
  // installed with the assets, so `scenery()` is null until then. `placements` is the
  // deterministic list buildScenery() scattered along the centreline.
  scenery: () => scenery,
  buildScenery,
  // The supplied textured coupe (car.js), for virtual mode (R21). Like the road and
  // the scenery it is installed with the assets, so `car()` is null until then.
  // `car().body` is the pose (s, lateral, heading, grade, speedKmh) that physics.js
  // (T012) advances and the cameras (T011, T023) follow; `car().transform` is the
  // scale and seating loadCoupe() applied to coupe.glb, and `car().materialFit` the
  // metalness it fitted the imported material down to. `car().place(next)` re-poses
  // it; nothing here needs car.js itself, so the module's functions are not mirrored.
  car: () => car,
  CAR_START_S,
  // The cameras (camera.js). `cameraMode` is 'ready' on load and after reset(), and
  // 'chase' once the car has left the staging station (R21); 'anchored' arrives with
  // T023. `cameras()` gives the live rig so a check can read the chase pose —
  // position, lookAt, damped heading and height — without scraping the camera.
  get cameraMode() {
    return cameraMode;
  },
  cameras: () => ({ mode: cameraMode, ready: readyCam, chase: chaseCam, anchored: anchoredCam }),
  chaseCamera,
  anchoredCamera,
  readyCamera,
  selectCamera,
  resizeCamera,
  CHASE_FOV,
  // R20: where the road contact point is on the screen RIGHT NOW, through the camera
  // the game is actually using (its view offset included), in CSS px from the top-left,
  // next to the saved anchor pixel — what the anchoring check asserts on.
  contactScreenPx,
  contactNow: () =>
    contactScreenPx(
      camera,
      { sample: roadSample, lengthM: ROAD_LENGTH_M },
      carState,
      calibration,
      Math.max(1, canvas.clientWidth || window.innerWidth),
      Math.max(1, canvas.clientHeight || window.innerHeight)
    ),
  // The kinematic driving model (physics.js). `carState()` is the pose step()
  // advances — { s, lateral, alpha, heading, grade, speedKmh, x, y, z, distanceM,
  // progress, finished, edgeContact } — and `physics` exposes the numbers and the
  // helpers, including impactSpeedCut, which collision.js (T018) applies for R26.
  carState: () => carState,
  physics: { ...PHYSICS, MAX_SPEED_KMH, stepPhysics, initialCarState, impactSpeedCut, speedLimitKmh, speedOf: (s) => speedLimitKmh(s) },
  stepPhysics,
  initialCarState,
  impactSpeedCut,
  speedLimitKmh,
  MAX_SPEED_KMH,
  // The run state machine (race.js): 'ready' on load, 'driving' from the first
  // throttle (R22), 'paused' from Escape, the pause screen or the document going to
  // the background (R31, R32), 'finished' at the line. `elapsedMs()` is the run clock
  // — 0 until that first throttle, frozen while paused — and `finalTimeMs()` adds the
  // 2 s per-collision penalties (R27) that collision.js (T018) reports with addPenalty.
  race,
  raceStates: RACE_STATES,
  PENALTY_MS,
  // R28: the medal for a final time (elapsed + penalties). 115 000 ms (1:55) and
  // 135 000 ms (2:15) are the brief's boundaries and are inclusive.
  medalFor,
  MEDALS,
  MEDAL_GOLD_MS,
  MEDAL_SILVER_MS,
  // LocalStorage persistence (R34, R35). `persist` is the module: STORAGE_KEY,
  // read/write, loadCalibration/saveCalibration, loadMute/saveMute, getMode/setMode,
  // loadBests/bestFor/saveBest, clear. The three live mirrors are `muted`,
  // `calibration` and `mode`, and the setters below are the ONLY doors that write
  // them (T022's anchor and T024's mute toggle call these, never localStorage).
  // `mode` is owned here, not by the mode-switch UI, so the bests slot and the
  // camera branch cannot disagree after a reload.
  persist,
  get mode() {
    return mode;
  },
  setMode,
  get muted() {
    return muted;
  },
  setMuted,
  toggleMute,
  get calibration() {
    return calibration;
  },
  setCalibration,
  // The physical-mode setup screen (R17, R18, R19): mode switch, play area, marker.
  // `calibrationSetup.visible()` is `setupVisible` — measured from the DOM, not a flag.
  calibrationSetup,
  get setupVisible() {
    return !!calibrationSetup && calibrationSetup.visible();
  },
  // The four checkpoints and the finish line (R24). `CHECKPOINTS` is the gate list
  // (arc-length stations, the last at ROAD_LENGTH_M); `checkpoints()` is the installed
  // markers; `checkpointRun` is the crossing record step() drives, and `checkCross`
  // is the pure crossing test a check can run on its own record.
  CHECKPOINTS,
  checkpointGates,
  checkpointRun,
  createCheckpointRun,
  checkCross,
  checkpoints: () => checkpoints,
  buildCheckpointMarkers,
  // The hazards of R25. `hazards()` is the pure, seeded layout (items sorted by arc
  // length, each with a stable id); `hazardMeshes()` is the installed group of cone
  // and barrier meshes, null until the assets land, like road() and scenery().
  // `hazardQuery(car)` answers { hit, kind, id } for cones, barriers and the road
  // edges, and state.hazard is the last one step() took. collision.js (T018) charges
  // its penalty once per distinct id.
  hazards: () => hazards,
  hazardMeshes: () => hazardMeshes,
  hazardLayout,
  hazardQuery,
  buildHazards,
  EDGE_HAZARD_LIMIT_M,
  // The consequences of a hit (collision.js): R26's speed cut and R27's 2 s penalty,
  // charged once per distinct id. `collision` is the tracker step() drives every frame
  // — `collision.count` is the distinct collisions of this run, `collision.log` the
  // per-impact records, `collision.snapshot()` a plain readout — and `state.collision`
  // is the same status object step() wrote last. `applyCollision` is the one-shot form
  // (it keeps its charged set on the race object), `clearCollisions` clears it.
  collision,
  applyCollision,
  clearCollisions,
  COLLISION_PENALTY_MS,
  // The synthesized sound effects (R33, audio.js). `audio.log()` is the in-memory
  // record of what was PLAYED (headless Chrome has no audio device, so this is the
  // measurement); `audio.status()` says whether a context exists and is running, and
  // `audio.engineHzFor(speed)` is the pitch rule. The context appears only after a
  // real gesture (armAudio), and `audio.setMuted` silences NEW events. The mute flag
  // itself is stored by persist.js through setMuted/toggleMute above, and
  // `muteButtonEl` is the DOM toggle.
  audio,
  muteButtonEl: () => muteButton,
  // The driving HUD (R23, hud.js). `hudFrame()` is the frame-order slot the loop
  // calls between the camera and the render, and a hand-stepped check calls it after
  // each step() to get the same readouts a player sees. `hud` is the instance:
  // `hud.read()` is what the DOM says right now, `hud.last` the strings written, and
  // `hud.els` the four cells (ids hud-speed / hud-time / hud-distance /
  // hud-checkpoints, stable for T020/T025/T027). `hudText(race, car, checkpoints)` is
  // the pure form of the same thing, and the four formatters are exposed for the
  // result screen's matching formats.
  hudFrame,
  hud,
  hudText,
  hudFormat: { formatSpeed, formatElapsedMs, formatDistance, formatCheckpoints },
  HUD_IDS,
  // The dusk sky (sky.js): its group is in the scene from the boot frame, and
  // `dome` appears with the assets. `values` is the DUSK object the lights, fog and
  // background were built from, so checks read the numbers instead of scraping.
  sky,
  buildSky,
  // Zero the placeholder sim state and put the run back on the ready line. The car
  // goes with it, so a replayed trace is the same run twice. The frame-loop gate is
  // left exactly as it was found (T011–T013 pause, then reset, and still expect the
  // loop to hold); the player's replay/restart buttons use resume:true instead.
  reset: (options) => resetRun(options),
  // R30 / R31: the same thing the replay and restart buttons do — a fresh run with
  // the loop running again.
  replay: () => resetRun({ resume: true }),
  // R29/R30/R31: the overlays. showOverlay(name) is the one door (hud.js);
  // `overlays.read()` is what the panels say and which are rendered, and
  // `visiblePanels()` is the same measurement without an instance.
  showOverlay: (name, extra) => overlays.show(name, race, extra || { collisions: collision.count }),
  overlays,
  overlayIds: OVERLAY_IDS,
  overlayNone: OVERLAY_NONE,
  resultIds: RESULT_IDS,
  resultText: (extra) => resultText(race, extra || { collisions: collision.count }),
  visiblePanels: () => visiblePanels(),
  overlayButtons: () => overlayButtons,
  setPaused(value) {
    // The gate first, the machine second: pausing the loop is also what pauses the
    // run's clock (race.tick() only advances while 'driving').
    if (value) race.pause('debug');
    else if (race.state === 'paused') race.resume('debug');
    state.paused = !!value;
  },
  // Deterministic lap driving for checks: n steps of dt, no rendering.
  runSteps(n, dt = 1 / 60) {
    for (let i = 0; i < n; i++) step(dt);
    return state;
  },
};
