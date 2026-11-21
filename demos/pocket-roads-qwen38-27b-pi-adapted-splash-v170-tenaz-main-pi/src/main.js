// Pocket Roads — Midnight Pass: module bootstrap.
// Boots the state machine (ready/driving/paused/finished) with stubs for the
// modules later tasks fill in place. Exposes window.__game as the
// deterministic test hook.

import config from "./config.js";
import * as THREE from "../vendor/three.module.min.js";
import { GLTFLoader } from "../vendor/GLTFLoader.js";
import { buildStage } from "./stage.js";
import { length as routeLength, at as routeAt } from "./route.js";
import { createVehicle, step as vehicleStep } from "./vehicle.js";
import { createInput } from "./input.js";
import { ChaseCamera, AnchorCamera } from "./camera.js";
import { createPersistence } from "./persistence.js";
import { createCalibration } from "./calibration.js";
import { updateHud } from "./hud.js";
import { createFlow } from "./flow.js";
import { createModeController } from "./modes.js";
import * as audio from "./audio.js";

// stage.js resolves THREE from scene.__THREE ?? globalThis.THREE
const canvas = document.getElementById("scene");

// Flow state machine (T010) owns the state enum, transitions, the R7 clock
// rule, R11 medals, and the R12 auto-pause rule. main.js renders overlays
// from its state and advances the vehicle on each tick.
const flow = createFlow({
  cfg: config,
  hooks: {
    onState: (s) => renderState(s),
    onFinish: (r) => persistence.submitBest(gameMode, r.time),
  },
});

const game = {
  inputs: { steer: 0, throttle: 0, brake: 0 },
  routeLength: config.routeLength,
  vehicle: createVehicle(),
  checkpoints: 0,
  config,
};
// Mirror flow onto the game hook so existing consumers (window.__game.state,
// game.time, game.medal, game.penalties) keep working.
Object.defineProperty(game, "state", { get: () => flow.state });
Object.defineProperty(game, "time", { get: () => flow.time });
Object.defineProperty(game, "medal", { get: () => flow.medal });
Object.defineProperty(game, "penalties", { get: () => flow.penalties });
Object.defineProperty(game, "distance", { get: () => game.vehicle.distance });
Object.defineProperty(game, "speed", { get: () => game.vehicle.speed });

// --- Three.js scene + stage geometry (T003) --------------------------------
let renderer = null, scene = null, camera = null, stageResult = null;
let chaseCam = null, anchorCam = null;
let modeController = null;
let gameMode = "virtual"; // "virtual" | "physical"
try {
  globalThis.THREE = THREE; // stage.js reads from globalThis.THREE
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  renderer.setSize(window.innerWidth, window.innerHeight);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 2000);
  // Lighting is set up by buildStage (dusk: warm sun + cool ambient)
  const route = { length: routeLength, at: routeAt };
  stageResult = buildStage(scene, route, config);
  game.stage = stageResult;
  camera.position.set(0, 4, -10);
  camera.lookAt(0, 0, 5);

  // Camera modes (T007)
  chaseCam = ChaseCamera({ distance: 6, height: 3, fov: 62 });
  anchorCam = AnchorCamera({ distance: 8, height: 4, fov: 62, anchorX: 0.5, anchorY: 0.4 });
} catch (err) {
  console.warn("pocket-roads: WebGL stage unavailable:", err.message);
}

window.addEventListener("resize", () => {
  if (renderer && camera) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    if (anchorCam) anchorCam.setAspect(window.innerWidth / window.innerHeight);
  }
});

// --- DOM refs -----------------------------------------------------------
const overlay = document.getElementById("overlay");
const overlayStatus = document.getElementById("overlay-status");
const overlayAction = document.getElementById("overlay-action");
const hud = document.getElementById("hud");
const controls = document.getElementById("controls");
const muteButton = document.getElementById("mute-toggle");
const modeSelect = document.getElementById("mode-select");
const modeVirtualBtn = document.getElementById("mode-virtual");
const modePhysicalBtn = document.getElementById("mode-physical");

// --- Persistence (R13): calibration anchor, mute, per-mode bests ---
const persistence = createPersistence();
const savedAnchor = persistence.getAnchor();
if (anchorCam) anchorCam.setAnchor(savedAnchor.x, savedAnchor.y);

function renderMute() {
  const muted = persistence.getMute();
  game.muted = muted;
  muteButton.textContent = muted ? "🔇" : "🔊";
  muteButton.setAttribute("aria-pressed", String(muted));
}
function toggleMute() {
  const m = persistence.toggleMute();
  audio.setMute(m);
  renderMute();
}
muteButton.addEventListener("click", toggleMute);
renderMute();
// Audio (R13, T011): init from stored mute; resume on first user gesture.
audio.initAudio({ muted: persistence.getMute() });
audio.setMute(persistence.getMute());
const wakeAudio = () => audio.initAudio();
document.addEventListener("pointerdown", wakeAudio, { once: true });
document.addEventListener("keydown", wakeAudio, { once: true });

// --- Calibration overlay (R5): marker drag + save anchor ---
const calibration = createCalibration({
  container: document.getElementById("calibration"),
  marker: document.getElementById("calibration-marker"),
  saveButton: document.getElementById("calibration-save"),
  anchor: savedAnchor,
  onSaved: (a) => persistence.setAnchor(a),
});

// --- Coupe model + mode controller (T012, R5/R6) ---------------------------
// Loads assets/coupe.glb via GLTFLoader, adds it to the scene, and owns the
// per-mode visibility (coupe shown in virtual, hidden in physical) plus which
// camera is active. The coupe is only loaded when a WebGL scene exists.
if (scene && chaseCam && anchorCam) {
  const loader = new GLTFLoader();
  modeController = createModeController({
    loader,
    coupeUrl: "assets/coupe.glb",
    scene,
    chaseCam,
    anchorCam,
    calibration,
    onCoupeError: (err) => console.warn("pocket-roads: coupe failed to load:", err.message),
  });
  // Restore the persisted mode (default virtual) and load the coupe.
  gameMode = persistence.getMode();
  game.mode = gameMode;
  modeController.setMode(gameMode);
  modeController.load();
}
function refreshCalibration() {
  // R5: placement marker visible only in physical mode during setup (ready).
  const inSetup = gameMode === "physical" && game.state === "ready";
  if (inSetup) calibration.show();
  else calibration.hide();
  if (modeController) modeController.setInSetup(inSetup);
}

function setOverlay(title, actionLabel) {
  overlay.classList.remove("hidden");
  overlayStatus.textContent = title;
  overlayAction.textContent = actionLabel;
}

// Render the mode-select buttons on the ready screen (R5/R6). Only shown in
// the ready state; the active mode gets aria-pressed=true + a highlight class.
function renderModeSelect() {
  if (!modeSelect) return;
  const inReady = game.state === "ready";
  modeSelect.classList.toggle("hidden", !inReady);
  if (!inReady) return;
  const isVirtual = gameMode === "virtual";
  if (modeVirtualBtn) {
    modeVirtualBtn.setAttribute("aria-pressed", String(isVirtual));
    modeVirtualBtn.classList.toggle("active", isVirtual);
  }
  if (modePhysicalBtn) {
    modePhysicalBtn.setAttribute("aria-pressed", String(!isVirtual));
    modePhysicalBtn.classList.toggle("active", !isVirtual);
  }
}

// Render overlays / HUD / controls for a flow state. Called from flow hooks.
function renderState(next) {
  refreshCalibration();
  renderModeSelect();
  switch (next) {
    case "ready":
      setOverlay("Ready — tap to start", "Start");
      overlay.classList.add("ready");
      hud.classList.add("hidden");
      controls.classList.add("hidden");
      muteButton.classList.add("hidden");
      break;
    case "driving":
      overlay.classList.add("hidden");
      overlay.classList.remove("ready");
      hud.classList.remove("hidden");
      controls.classList.remove("hidden");
      muteButton.classList.remove("hidden");
      break;
    case "paused":
      setOverlay("Paused", "Resume");
      overlay.classList.remove("ready");
      break;
    case "finished":
      setOverlay(`Finished in ${flow.time.toFixed(1)} s — ${flow.medal ?? "bronze"}`, "Replay");
      overlay.classList.remove("ready");
      hud.classList.add("hidden");
      controls.classList.add("hidden");
      muteButton.classList.add("hidden");
      break;
  }
}

// Public setState used by the test hook and internal callers. Delegates to
// the flow controller, which validates the transition.
function setState(next) {
  if (next === game.state) return;
  // ready -> driving starts a fresh run
  if (game.state === "ready" && next === "driving") {
    game.vehicle = createVehicle();
    game.checkpoints = 0;
    lastPenaltyTime = 0;
    flow.start();
    return;
  }
  if (next === "ready") {
    // Replay: fresh vehicle + reset flow to ready.
    game.vehicle = createVehicle();
    game.checkpoints = 0;
    lastPenaltyTime = 0;
    flow.toReady();
    return;
  }
  if (next === "paused") return flow.pause();
  if (next === "driving" && game.state === "paused") return flow.resume();
  if (next === "finished") return flow.finish();
  flow.setState(next);
}

overlayAction.addEventListener("click", () => {
  if (game.state === "ready") {
    setState("driving");
  } else if (game.state === "paused") {
    setState("driving");
  } else if (game.state === "finished") {
    setState("ready");
  }
});

// Mode select buttons on the ready screen (R5/R6).
if (modeVirtualBtn) modeVirtualBtn.addEventListener("click", () => window.__game.setMode("virtual"));
if (modePhysicalBtn) modePhysicalBtn.addEventListener("click", () => window.__game.setMode("physical"));

// Pause on tab hide (R12): auto-pause only while driving.
document.addEventListener("visibilitychange", () => {
  flow.onVisibilityChange(document.hidden);
});

// Input (touch pads + keyboard + Escape pause) — src/input.js
const input = createInput({
  document, window,
  onPause: () => { if (game.state === "driving") setState("paused"); },
});
function pollInputs() {
  game.inputs.steer = input.state.steer;
  game.inputs.throttle = input.state.throttle;
  game.inputs.brake = input.state.brake;
}

// --- Hazard resolution (T005): route fractions -> hazards near the car ---
const CONE_LATERAL = config.roadWidth / 2 - 0.6; // matches stage.js placement
function hazardsNear(v) {
  const out = [];
  const d0 = v.distance - 10, d1 = v.distance + 10;
  config.coneFractions.forEach((f, i) => {
    const d = f * config.routeLength;
    if (d < d0 || d > d1) return;
    const side = (i % 2 === 0) ? -1 : 1;
    out.push({ type: "cone", key: `cone-${f}`, distance: d, lateral: side * CONE_LATERAL });
  });
  for (const f of config.barrierFractions) {
    const d = f * config.routeLength;
    if (d < d0 || d > d1) continue;
    out.push({ type: "barrier", key: `barrier-${f}`, distance: d, lateral: 0 });
  }
  // Road edges: continuous hazards spanning the route.
  out.push({ type: "edge", key: "edge-right", distance: v.distance, lateral: config.lateralLimit });
  out.push({ type: "edge", key: "edge-left", distance: v.distance, lateral: -config.lateralLimit });
  return out;
}

let last = performance.now();
let lastPenaltyTime = 0;
function frame(now) {
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  if (game.state === "driving") {
    pollInputs();
    // R7: flow advances the clock only after the first throttle input.
    flow.tick(dt, game.inputs);
    vehicleStep(game.vehicle, game.inputs, dt, hazardsNear(game.vehicle), config);
    flow.setProgress(game.vehicle.distance, Math.round(game.vehicle.penaltyTime));
    // Audio cues: impact on new penalty time, chirp on checkpoint pass.
    if (game.vehicle.penaltyTime > lastPenaltyTime) audio.playImpact();
    lastPenaltyTime = game.vehicle.penaltyTime;
    // Checkpoint progress (R9): count fractions the car has passed; 4th is the finish
    const frac = game.vehicle.distance / game.routeLength;
    const passed = config.checkpointFractions.filter((f) => frac >= f).length;
    if (passed > game.checkpoints) {
      if (passed >= config.checkpointFractions.length) audio.playFinish();
      else audio.playCheckpoint();
    }
    game.checkpoints = passed;
    audio.setEngine(game.speed);
    updateHud(hud, {
      speed: game.speed,
      time: flow.time,
      distance: game.distance,
      checkpoints: game.checkpoints,
    });
    if (game.vehicle.distance >= game.routeLength) {
      // Penalty time counts toward the run before the medal is decided.
      flow.addTime(game.vehicle.penaltyTime);
      flow.finish();
    }
  } else {
    audio.setEngine(0); // silence the hum outside driving
  }
  // Update camera (T007) + coupe placement (T012)
  if (renderer && scene && camera) {
    const route = { length: routeLength, at: routeAt };
    // Keep the coupe on the road ribbon (virtual mode only; the controller
    // no-ops in physical mode where the digital car is hidden).
    if (modeController) modeController.update(game.vehicle, route);
    const activeCam = modeController ? modeController.activeCamera
      : (gameMode === "physical" ? anchorCam : chaseCam);
    if (activeCam) {
      if (activeCam === anchorCam) activeCam.update(game.vehicle, route);
      else activeCam.update(game.vehicle, route, dt);
      camera.position.set(activeCam.position.x, activeCam.position.y, activeCam.position.z);
      camera.lookAt(activeCam.lookAt.x, activeCam.lookAt.y, activeCam.lookAt.z);
    }
    renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// Deterministic test hook (see .tenaz/notes/BOOTSTRAP.md)
window.__game = game;
window.__game.setState = setState;
// setMode: switch virtual/physical. Delegates to the mode controller (coupe
// visibility + active camera + marker) and persists the choice (R5/R6).
window.__game.setMode = (mode) => {
  if (mode !== "virtual" && mode !== "physical") throw new Error(`unknown mode: ${mode}`);
  gameMode = mode;
  game.mode = mode;
  if (modeController) modeController.setMode(mode);
  persistence.setMode(mode);
  renderModeSelect();
  refreshCalibration();
};
window.__game.persistence = persistence;
window.__game.calibration = calibration;
window.__game.toggleMute = toggleMute;
window.__game.getMode = () => gameMode;
window.__game.chaseCam = () => chaseCam;
window.__game.anchorCam = () => anchorCam;
window.__game.modeController = () => modeController;
// Deterministic drivers for the headless runtime check (T013): expose the
// input controller, the flow controller, and a manual physics step that the
// check can call with chosen inputs without waiting on requestAnimationFrame.
window.__game.input = input;
window.__game.flow = flow;
window.__game.step = (dt = 1 / 60) => {
  // Mirror the frame loop: copy live input state, advance physics, and apply
  // the finish transition so the manual step behaves like a real driving frame.
  if (game.state !== "driving") return;
  game.inputs.steer = input.state.steer;
  game.inputs.throttle = input.state.throttle;
  game.inputs.brake = input.state.brake;
  vehicleStep(game.vehicle, game.inputs, dt, hazardsNear(game.vehicle), config);
  flow.setProgress(game.vehicle.distance, Math.round(game.vehicle.penaltyTime));
  if (game.vehicle.distance >= game.routeLength) {
    flow.addTime(game.vehicle.penaltyTime);
    flow.finish();
  }
};

console.log("pocket-roads: boot complete (skeleton)");
