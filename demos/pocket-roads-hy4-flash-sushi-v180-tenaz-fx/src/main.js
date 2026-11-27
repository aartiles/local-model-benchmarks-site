// Single integration point: renderer, scene, frame loop and the test hook.
// Assets, scenery, input, game, camera and UI are wired in by later tasks.
import * as THREE from '../vendor/three.module.min.js';
import { CONFIG } from './config.js';
import { createTrack, sampleTrack, TRACK_LENGTH } from './track.js';
import { loadAssets } from './assets.js';
import { buildScenery } from './scenery.js';
import { createUI } from './ui.js';
import { createInput } from './input.js';
import { createCameraRig } from './camera.js';
import { load as loadStored, save as saveStored } from './storage.js';
import { createCalibration } from './calibration.js';
import { createGame } from './game.js';
import { createCoupe, setCoupePose } from './coupe.js';
import { createAudio } from './audio.js';

const playArea = document.getElementById('play-area');
const canvas = document.getElementById('stage');

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
  preserveDrawingBuffer: true,
  powerPreference: 'low-power',
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setClearColor(0x101a2e, 1);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(CONFIG.camera.fov, 1, CONFIG.camera.near, CONFIG.camera.far);
camera.position.set(0, CONFIG.camera.height, CONFIG.camera.distance);
camera.lookAt(0, 0, -18);
const cameraRig = createCameraRig(camera, renderer);

const track = createTrack();
let assets = null;
let world = null;
let sceneryStarted = false;
let sunLight = null;
let input = null;
let coupe = null;
let pauseEvents = 0;
const audio = createAudio({ load: loadStored, save: saveStored });

// One versioned record holds both camera modes. Bad payloads degrade to nulls
// instead of poisoning the clock or a mode's record with NaN.
function readBests(raw) {
  const record = raw && typeof raw === 'object' ? raw : {};
  const value = (mode) => (Number.isFinite(record[mode]) && record[mode] >= 0 ? record[mode] : null);
  return { physical: value('physical'), virtual: value('virtual') };
}
const bests = readBests(loadStored(CONFIG.STORAGE_KEYS.best, null));
const initialMode = loadStored(CONFIG.STORAGE_KEYS.mode, 'physical') === 'virtual' ? 'virtual' : 'physical';

const state = {
  phase: 'ready',
  mode: initialMode,
  speed: 0,
  elapsed: 0,
  distance: 0,
  checkpoint: 0,
  penalty: 0,
  collisions: 0,
  medal: null,
  best: bests[initialMode],
  input: { steer: 0, throttle: 0, brake: 0 },
  look: { yaw: 0, pitch: 0 },
  anchor: (() => {
    const value = loadStored(CONFIG.STORAGE_KEYS.calibration, null);
    if (value && Number.isFinite(value.x) && Number.isFinite(value.y)) {
      return {
        x: Math.max(0, Math.min(1, value.x)),
        y: Math.max(0, Math.min(1, value.y)),
      };
    }
    return { x: CONFIG.anchor.x, y: CONFIG.anchor.y };
  })(),
  muted: audio.muted,
  frame: 0,
  result: null,
};

let game = null;
let virtualInput = null;
const gameEvents = [];
const eventListeners = new Set();
function emitGameEvent(type, detail) {
  const event = { type, detail };
  gameEvents.push(event);
  for (const listener of [...eventListeners]) {
    try {
      listener(event);
    } catch (error) {
      console.error(error);
    }
  }
  return event;
}
function applyVirtualInput() {
  if (!game || !virtualInput) return;
  Object.assign(input.state, virtualInput);
}

function syncMuteButton() {
  const button = document.getElementById('mute-toggle');
  if (!button) return;
  state.muted = audio.muted;
  button.setAttribute('aria-pressed', String(audio.muted));
  button.textContent = audio.muted ? 'Sound off' : 'Sound on';
  button.title = audio.muted ? 'Turn sound on' : 'Turn sound off';
}
syncMuteButton();
// Browsers only allow an AudioContext from a gesture. Keep that path deterministic
// for taps, touches, keyboard starts and CDP-driven button clicks.
window.addEventListener('pointerdown', () => audio.unlock(), { passive: true });
window.addEventListener('keydown', () => audio.unlock());

let viewportWidth = 0;
let viewportHeight = 0;
function resize() {
  const width = Math.max(1, Math.floor(playArea.clientWidth || window.innerWidth));
  const height = Math.max(1, Math.floor(playArea.clientHeight || window.innerHeight));
  if (width === viewportWidth && height === viewportHeight) return;
  viewportWidth = width;
  viewportHeight = height;
  renderer.setSize(width, height, false);
  cameraRig.resize();
}
resize();
window.addEventListener('resize', resize, { passive: true });
if (typeof ResizeObserver !== 'undefined') {
  new ResizeObserver(resize).observe(playArea);
}

let cameraProbeSample = null;
const contactScreen = () => {
  const sample = cameraProbeSample || sampleTrack(track, state.distance);
  return cameraRig.projectToScreen(sample.position);
};

function poseCamera(sample, steer, look) {
  cameraProbeSample = sample;
  if (state.mode === 'physical') {
    cameraRig.updatePhysical(sample, state.anchor, steer, look);
  } else {
    cameraRig.updateVirtual(sample, steer);
  }
  if (world) world.sky.position.copy(camera.position);
  camera.updateMatrixWorld(true);
}

function materialTexture(material) {
  const map = material && material.map;
  if (!map) return null;
  if (map.name) return map.name;
  const image = map.image;
  return image ? image.currentSrc || image.src || null : null;
}

function textureLoaded(material) {
  const image = material && material.map && material.map.image;
  return Boolean(image && (image.width || image.videoWidth));
}

function loadedAssetNames() {
  if (!assets) return [];
  return [assets.sky, assets.preview, assets.roadGrain, ...assets.spruce, assets.coupe]
    .filter(Boolean)
    .map((asset) => asset.name)
    .filter(Boolean);
}

function sceneryInfo() {
  const sprites = [];
  const chalets = [];
  let gallery = null;
  scene.traverse((object) => {
    if (object.isSprite && object.name.startsWith('spruce-')) {
      const map = object.material.map;
      sprites.push({
        name: object.name,
        texture: materialTexture(object.material),
        loadedTexture: textureLoaded(object.material),
        transparent: object.material.transparent === true,
        alphaTest: object.material.alphaTest,
        scale: object.scale.toArray(),
        position: object.position.toArray(),
        ...object.userData,
      });
    }
    if (object.isGroup && /^chalet-\d+$/.test(object.name)) {
      const parts = [];
      object.traverse((child) => {
        if (child.isMesh) parts.push({ name: child.name, position: child.position.toArray() });
      });
      chalets.push({ name: object.name, position: object.position.toArray(), parts, ...object.userData });
    }
    if (object.name === 'gallery') {
      gallery = {
        name: object.name,
        position: object.position.toArray(),
        parts: object.children.map((child) => ({ name: child.name, position: child.position.toArray() })),
        ...object.userData,
      };
    }
  });
  return { sprites, chalets, gallery };
}

function coupeInfo() {
  if (!coupe) return null;
  return {
    name: coupe.name,
    visible: coupe.visible,
    worldVisible: coupe.visible && (!coupe.parent || coupe.parent.visible),
    source: coupe.userData.source,
    textureNames: [...(coupe.userData.textureNames || [])],
    textures: (coupe.userData.textures || []).map((entry) => ({
      slot: entry.slot,
      name: entry.name,
      assigned: entry.assigned === true,
      width: entry.width,
      height: entry.height,
    })),
    materialCount: coupe.userData.materialCount,
    scale: coupe.userData.scale,
    length: coupe.userData.length,
    position: coupe.position.toArray(),
    rotation: coupe.quaternion.toArray(),
  };
}

function inspectWorld() {
  scene.updateMatrixWorld(true);
  camera.updateMatrixWorld(true);
  const matrices = new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  const frustum = new THREE.Frustum().setFromProjectionMatrix(matrices);
  const road = scene.getObjectByName('road-ribbon');
  const sky = scene.getObjectByName('sky-dome');
  let lights = 0;
  const mountains = [];
  const hazards = [];
  for (const object of scene.children) {
    if (object.isLight) lights += 1;
    if (object.isMesh && object.name.startsWith('mountain-')) {
      mountains.push({
        name: object.name,
        visible: object.visible && (!object.parent || object.parent.visible),
        inFrustum: frustum.intersectsObject(object),
        distance: camera.position.distanceTo(object.position),
      });
    }
  }
  scene.traverse((object) => {
    const data = object.userData;
    if (!data || !data.hazardId) return;
    let parts = 0;
    object.traverse((child) => {
      if (child.isMesh && child.visible) parts += 1;
    });
    hazards.push({
      id: data.hazardId,
      kind: data.kind,
      s: data.s,
      side: data.side,
      visible: object.visible && (!object.parent || object.parent.visible),
      position: object.position.toArray(),
      parts,
    });
  });
  let skyInfo = null;
  if (sky) {
    const radius = sky.geometry.boundingSphere
      ? sky.geometry.boundingSphere.radius
      : (sky.geometry.parameters ? sky.geometry.parameters.radius : 0);
    skyInfo = {
      name: sky.name,
      isMesh: sky.isMesh === true,
      texture: materialTexture(sky.material),
      loadedTexture: textureLoaded(sky.material),
      cameraInside: camera.position.distanceTo(sky.position) < radius,
      inFrustum: frustum.intersectsObject(sky),
      distance: camera.position.distanceTo(sky.position),
    };
  }
  return {
    road: road
      ? {
          name: road.name,
          isMesh: road.isMesh === true,
          vertices: road.geometry.attributes.position.count,
          triangles: road.geometry.index ? road.geometry.index.count / 3 : 0,
          texture: materialTexture(road.material),
          loadedTexture: textureLoaded(road.material),
        }
      : null,
    sky: skyInfo,
    mountains,
    hazards,
    scenery: sceneryInfo(),
    lighting: { lights },
    track: { length: track.length },
    cameraPosition: camera.position.toArray(),
  };
}

const hook = {
  ready: false,
  state() {
    const live = game ? game.state : state;
    return {
      phase: state.phase,
      mode: state.mode,
      speed: live.speed,
      elapsed: live.elapsed,
      distance: live.distance,
      checkpoint: live.checkpoint,
      penalty: live.penalty,
      collisions: live.collisions,
      medal: live.medal,
      best: live.best,
      result: live.result,
      input: input ? { ...input.state } : { ...state.input },
      look: { ...state.look },
      anchor: { ...state.anchor },
      muted: state.muted,
      frame: state.frame,
    };
  },
  probe() {
    return {
      contactScreen: contactScreen(),
      counts: {
        meshes: scene.children.length + (world ? world.mountains.length : 0),
        groundStrips: world ? world.road.geometry.attributes.position.count / 2 : 0,
        drawCalls: renderer.info.render.calls,
        triangles: renderer.info.render.triangles,
      },
      assetRequests: [],
      assets: {
        loaded: Boolean(assets),
        names: loadedAssetNames(),
      },
      inventory: world ? { ...world.inventory, coupe: coupeInfo() } : {},
      hazards: world ? world.hazards : [],
      events: gameEvents.map((event) => ({ type: event.type, detail: event.detail })),
      bests: { physical: bests.physical, virtual: bests.virtual },
      bestStorageKey: CONFIG.STORAGE_KEYS.best,
      audio: {
        muted: audio.muted,
        available: audio.available,
        storageKey: audio.storageKey,
        playLog: audio.playLog.map((entry) => ({ ...entry })),
        synthesis: audio.synthesis.map((entry) => ({ ...entry })),
      },
      camera: cameraRig.describe(),
      calibration: {
        restoredAnchor: { ...storedAnchor },
        firstFrameAnchor: firstFrameAnchor ? { ...firstFrameAnchor } : null,
        seedAnchor: { ...state.anchor },
      },
    };
  },
  inspectWorld,
  camera,
  sceneForCheck: scene,
  THREEForCheck: THREE,
  coupeTextureForCheck() {
    if (!coupe) return null;
    let found = null;
    coupe.traverse((object) => {
      if (!found && object.isMesh && object.material && object.material.map) found = object.material.map;
    });
    return found;
  },
  setCameraProbe({ mode = 'physical', steer = 0, look = null, anchor = null, s = 0 } = {}) {
    if (mode === 'virtual' || mode === 'physical') setMode(mode, { persist: false });
    if (anchor && Number.isFinite(anchor.x) && Number.isFinite(anchor.y)) {
      state.anchor = { x: anchor.x, y: anchor.y };
      if (hook.setAnchor) hook.setAnchor(anchor);
    }
    state.input.steer = steer;
    resize();
    poseCamera(sampleTrack(track, s), steer, look);
    renderer.render(scene, camera);
    return hook.probe();
  },
  inspectAt(s) {
    poseCamera(sampleTrack(track, s), state.input.steer, null);
    renderer.render(scene, camera);
    return inspectWorld();
  },
};
const storedAnchor = { ...state.anchor };
let firstFrameAnchor = null;
let markerVisible = false;
let ui = null;
function syncMarker(phase = state.phase) {
  markerVisible = (phase === 'calibration' || phase === 'ready') && state.mode === 'physical';
  if (ui) ui.setMarkerVisible(markerVisible);
  else {
    const marker = document.getElementById('marker');
    if (marker) marker.hidden = !markerVisible;
  }
}
ui = createUI(playArea, {
  onStart: () => {
    audio.unlock();
    audio.play('start');
    if (game) game.startRun();
    else ui.showScreen('driving');
  },
  onPause: () => {
    if (game) game.pause();
    else ui.showScreen('paused');
  },
  onResume: () => {
    if (game) game.resume();
    else ui.showScreen('driving');
  },
  onReplay: () => {
    // A fresh run must not inherit a pedal or steering value held from the
    // finished one: clear both the DOM/keyboard channels and synthetic input.
    hook.clearInput();
    // Leave the fresh run on the ready screen: Start (or throttle) begins it,
    // and the same path works for the following audio/gesture flows.
    if (game) game.restart();
    else ui.showScreen('ready');
  },
  onScreen: (name) => {
    state.phase = name;
    syncMarker(name);
  },
});

const calibration = createCalibration(playArea, {
  save: (key, value) => saveStored(CONFIG.STORAGE_KEYS[key] || key, value),
}, {
  isEnabled: () => state.phase === 'calibration' || state.phase === 'ready',
  onChange: (anchor) => {
    state.anchor = { x: anchor.x, y: anchor.y };
  },
});
calibration.setAnchor(state.anchor.x, state.anchor.y, { persist: false, notify: false });
syncMarker();

// The two ready-screen buttons and the hook drive the same mode switch: camera
// rig, vehicle visibility, marker setup and saved preference all move together.
function setMode(mode, { persist = true } = {}) {
  const next = mode === 'virtual' ? 'virtual' : 'physical';
  state.mode = next;
  if (coupe) coupe.visible = next === 'virtual';
  state.best = bests[next];
  if (game) {
    game.state.mode = next;
    game.state.best = bests[next];
  }
  syncMarker();
  for (const [name, id] of [['physical', 'mode-physical'], ['virtual', 'mode-virtual']]) {
    const button = document.getElementById(id);
    if (button) {
      button.classList.toggle('active', name === next);
      button.setAttribute('aria-pressed', String(name === next));
    }
  }
  if (persist) saveStored(CONFIG.STORAGE_KEYS.mode, next);
  resize();
  poseCamera(sampleTrack(track, state.distance || 0), input.state.steer, state.look || null);
  renderer.render(scene, camera);
  return hook.probe();
}
hook.setMode = (mode) => setMode(mode);
Object.defineProperty(hook, 'coupeForCheck', { get: () => coupe });
document.getElementById('mode-physical')?.addEventListener('click', () => setMode('physical'));
document.getElementById('mode-virtual')?.addEventListener('click', () => setMode('virtual'));

hook.calibration = {
  anchor: calibration.anchor,
  setAnchor(x, y) {
    return calibration.setAnchor(x, y);
  },
  showMarker: () => calibration.showMarker(),
  hideMarker: () => calibration.hideMarker(),
};
hook.setAnchor = (anchor) => hook.calibration.setAnchor(anchor.x, anchor.y);
hook.ui = {
  render: (data) => ui.render(data),
  showScreen: (name) => ui.showScreen(name),
  setMarkerVisible: (visible) => ui.setMarkerVisible(visible),
};
hook.events = gameEvents;
hook.audio = audio;
hook.setMuted = (value) => {
  const result = audio.setMuted(value);
  syncMuteButton();
  return result;
};
document.getElementById('mute-toggle')?.addEventListener('click', () => {
  audio.unlock();
  audio.toggleMute();
  syncMuteButton();
});
hook.onEvent = (listener) => {
  if (typeof listener !== 'function') return () => {};
  eventListeners.add(listener);
  return () => eventListeners.delete(listener);
};
Object.defineProperty(hook, 'pauseEvents', { get: () => pauseEvents });
hook.clearInput = (channel) => {
  if (input) input.clear(channel);
  if (virtualInput) {
    for (const name of ['steer', 'throttle', 'brake']) {
      if (!channel || channel === name) virtualInput[name] = 0;
    }
    applyVirtualInput();
  }
};
hook.setInput = (values = {}) => {
  if (virtualInput === null) virtualInput = { steer: 0, throttle: 0, brake: 0 };
  for (const name of ['steer', 'throttle', 'brake']) {
    const value = Number(values[name]);
    virtualInput[name] = Number.isFinite(value)
      ? Math.max(name === 'steer' ? -1 : 0, Math.min(1, value))
      : 0;
  }
  applyVirtualInput();
  state.input = input ? { ...input.state } : { ...virtualInput };
  return { ...state.input };
};
input = createInput(playArea, {
  onChange: (values) => {
    state.input = { ...values };
  },
  onPause: () => {
    pauseEvents += 1;
    if (!game) {
      ui.showScreen(state.phase === 'paused' ? 'driving' : 'paused');
      return;
    }
    if (game.state.phase === 'driving') game.pause();
    else if (game.state.phase === 'paused') game.resume();
    else ui.showScreen(state.phase === 'paused' ? 'driving' : 'paused');
  },
});

// One real race object, fed by the shared input instance and hazards from the
// built world. Every transition goes through the game state machine.
Object.defineProperty(hook, 'game', { get: () => game });
// Backgrounding pauses an active run. game.onBackground() is a no-op outside
// driving; returning to the foreground never resumes on its own.
document.addEventListener('visibilitychange', () => {
  if (document.hidden && game) game.onBackground();
});
function buildGame() {
  game = createGame({
  config: CONFIG,
  input,
  track,
  hazards: world ? world.hazards : [],
  mode: state.mode,
  best: loadStored(CONFIG.STORAGE_KEYS.best, null),
  hooks: {
    onStateChange: (phase) => {
      state.phase = phase;
      if (phase === 'driving') audio.play('engine');
      ui.showScreen(phase);
    },
    onCheckpoint: (checkpoint) => {
      audio.play('checkpoint');
      emitGameEvent('checkpoint', checkpoint);
    },
    onImpact: (hazard, penalty) => {
      audio.play('impact');
      emitGameEvent('impact', {
        id: hazard && hazard.id ? hazard.id : null,
        kind: hazard && hazard.kind ? hazard.kind : null,
        penalty,
      });
    },
    onFinish: (result) => {
      audio.play('finish');
      emitGameEvent('finish', result);
      const mode = state.mode === 'virtual' ? 'virtual' : 'physical';
      const total = Number.isFinite(result && result.totalTime)
        ? result.totalTime
        : game.state.elapsed + game.state.penalty;
      if (Number.isFinite(total) && (bests[mode] === null || total < bests[mode])) {
        bests[mode] = total;
        saveStored(CONFIG.STORAGE_KEYS.best, bests);
      }
      game.state.best = bests[mode];
      state.best = bests[mode];
    },
  },
  });
}
function syncFromGame() {
  const live = game.state;
  // Phase is mirrored through ui.showScreen: game transitions drive the screen
  // and a setup screen chosen by the UI stays visible until the game moves on.
  state.speed = live.speed;
  state.elapsed = live.elapsed;
  state.distance = live.distance;
  state.checkpoint = live.checkpoint;
  state.penalty = live.penalty;
  state.collisions = live.collisions;
  state.medal = live.medal;
  state.best = live.best;
  state.result = live.result;
  state.input = input ? { ...input.state } : state.input;
}

// Dragging on the world (outside the steering/pedal zones) turns the physical
// camera. The rig receives state.look on every live frame, just like steering.
canvas.style.touchAction = 'none';
const lookSettings = CONFIG.look || { sensitivity: CONFIG.lookSensitivity, min: -0.35, max: 0.35 };
const lookSensitivity = lookSettings.sensitivity || CONFIG.lookSensitivity || 0.004;
const clampLook = (value) => Math.max(lookSettings.min, Math.min(lookSettings.max, value));
const lookDrag = { id: null, x: 0, y: 0 };
canvas.addEventListener('pointerdown', (event) => {
  if (lookDrag.id !== null || (event.pointerType === 'mouse' && event.button !== 0)) return;
  lookDrag.id = event.pointerId;
  lookDrag.x = event.clientX;
  lookDrag.y = event.clientY;
  event.preventDefault();
  try {
    canvas.setPointerCapture(event.pointerId);
  } catch {}
});
window.addEventListener('pointermove', (event) => {
  if (event.pointerId !== lookDrag.id) return;
  state.look.yaw = clampLook(state.look.yaw + (event.clientX - lookDrag.x) * lookSensitivity);
  state.look.pitch = clampLook(state.look.pitch + (event.clientY - lookDrag.y) * lookSensitivity);
  lookDrag.x = event.clientX;
  lookDrag.y = event.clientY;
  event.preventDefault();
}, { passive: false });
function endLookDrag(event) {
  if (event.pointerId !== lookDrag.id) return;
  lookDrag.id = null;
  try {
    canvas.releasePointerCapture(event.pointerId);
  } catch {}
}
window.addEventListener('pointerup', endLookDrag);
window.addEventListener('pointercancel', endLookDrag);

window.__pocketRoads = hook;

let previous = performance.now();
let travel = 0;
function frame(now) {
  const dt = Math.min(0.1, Math.max(0, (now - previous) / 1000));
  previous = now;
  travel += dt * 18;
  applyVirtualInput();
  game.update(dt);
  syncFromGame();
  if (world) {
    // Keep the dusk dome centred on the viewer for the whole 3.2 km stage.
    world.sky.position.copy(camera.position);
    world.sky.rotation.y = travel * 0.05;
    world.update(state.distance);
    // A slow dusk shimmer keeps the live canvas visibly changing even while
    // the car is waiting on the ready screen.
    if (sunLight) sunLight.intensity = 1.3 + Math.sin(travel * 0.6) * 0.35;
  }
  state.frame += 1;
  poseCamera(sampleTrack(track, state.distance), input.state.steer, state.look || null);
  setCoupePose(coupe, sampleTrack(track, state.distance), input.state.steer);
  ui.render(state);
  if (!firstFrameAnchor) firstFrameAnchor = { ...state.anchor };
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

export async function startApp() {
  if (sceneryStarted) return;
  sceneryStarted = true;
  try {
    assets = await loadAssets();
    coupe = createCoupe(assets);
    coupe.visible = state.mode === 'virtual';
    scene.add(coupe);
    world = buildScenery(scene, assets, track);
    buildGame();
    sunLight = scene.getObjectByName('dusk-sun');
    resize();
    setCoupePose(coupe, sampleTrack(track, state.distance), 0);
    setMode(state.mode, { persist: false });
    renderer.render(scene, camera);
    previous = performance.now();
    requestAnimationFrame(frame);
    hook.ready = true;
  } catch (error) {
    hook.error = (error && error.message) || String(error);
    console.error(error);
  }
}

startApp();
