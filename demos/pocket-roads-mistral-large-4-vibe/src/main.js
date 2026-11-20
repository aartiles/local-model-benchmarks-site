// src/main.js — boot, asset loading, UI wiring, main loop.
import * as THREE from '../vendor/three.module.min.js';
import { ASSETS, CAR } from './config.js';
import { buildRoute, buildLayout } from './route.js';
import { loadTextures, buildWorld } from './world.js';
import { loadCar } from './car.js';
import { Input } from './input.js';
import { Hud } from './hud.js';
import { GameAudio } from './audio.js';
import { Game } from './game.js';
import { loadSettings, saveSettings } from './storage.js';
import { installTestApi } from './testapi.js';

async function boot() {
  const canvas = document.getElementById('scene');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 8000);
  camera.position.set(0, 3.05, -7.7);

  const hud = new Hud();
  const settings = loadSettings();
  const audio = new GameAudio();
  audio.muted = !!settings.muted;
  hud.setMuted(audio.muted);
  hud.setBests(settings.best);
  hud.setPhysicalSub(!!settings.anchor);

  const input = new Input();
  input.onEscape = () => game.togglePause();
  input.onAnyGesture = () => audio.start();

  // ---- load assets with progress ----
  let done = 0;
  const total = 8;
  const tick = () => { done++; hud.setLoading(done / total); };
  const route = buildRoute();
  const layout = buildLayout(route);
  const [tex, car] = await Promise.all([
    loadTextures().then((t) => { tick(); tick(); tick(); tick(); tick(); tick(); return t; }),
    loadCar().then((c) => { tick(); return c; }),
  ]);
  tick();
  const world = buildWorld(scene, renderer, route, layout, tex);
  scene.add(car.group);
  car.group.visible = settings.mode !== 'physical';
  hud.setLoading(1);

  const game = new Game({ scene, camera, renderer, world, route, layout, car, input, hud, audio, settings });
  game.mode = settings.mode || 'virtual';
  game.hud.setModeLabel(game.mode);

  // ---- UI wiring ----
  const $ = (id) => document.getElementById(id);
  $('btnVirtual').addEventListener('click', () => { audio.start(); audio.click(); game.setMode('virtual'); });
  $('btnPhysical').addEventListener('click', () => { audio.start(); audio.click(); game.setMode('physical'); });
  $('btnCalibrate').addEventListener('click', () => { audio.start(); audio.click(); game.enterSetup(); });
  $('btnAnchorSave').addEventListener('click', () => { audio.start(); audio.click(); game.saveAnchor(); });
  $('btnAnchorBack').addEventListener('click', () => { audio.click(); game.quitToMenu(); });
  $('camDist').addEventListener('input', (e) => { saveSettings({ camDist: Number(e.target.value) }); });
  $('btnResume').addEventListener('click', () => { audio.click(); game.resume(); });
  $('btnRestart').addEventListener('click', () => { audio.click(); game.restart(); });
  $('btnQuit').addEventListener('click', () => { audio.click(); game.quitToMenu(); });
  $('btnReplay').addEventListener('click', () => { audio.click(); game.restart(); });
  $('btnResultMenu').addEventListener('click', () => { audio.click(); game.quitToMenu(); });
  $('pauseBtn').addEventListener('click', () => { audio.click(); game.togglePause(); });
  const toggleMute = () => {
    audio.start();
    audio.setMuted(!audio.muted);
    saveSettings({ muted: audio.muted });
    hud.setMuted(audio.muted);
    audio.click();
  };
  $('muteBtn').addEventListener('click', toggleMute);
  $('btnMute').addEventListener('click', toggleMute);

  // setup: tap/drag anywhere (outside the panel) to place the anchor marker
  let setupDrag = null;
  window.addEventListener('pointerdown', (e) => {
    audio.start();
    if (game.phase === 'setup') {
      const inPanel = e.target.closest('.setupPanel');
      if (!inPanel) {
        setupDrag = e.pointerId;
        game.setAnchorCandidate(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
      }
    } else if (game.mode === 'physical' && (game.phase === 'ready' || game.phase === 'driving' || game.phase === 'paused')) {
      // horizontal drag on the scene turns the camera around the anchored toy
      if (e.target.closest('#controls') || e.target.closest('.screen') || e.target.closest('button')) return;
      setupDrag = { id: e.pointerId, x0: e.clientX, yaw0: game._camYaw };
    }
  });
  window.addEventListener('pointermove', (e) => {
    if (game.phase === 'setup' && setupDrag === e.pointerId) {
      game.setAnchorCandidate(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
    } else if (game.mode === 'physical' && setupDrag && setupDrag.id === e.pointerId) {
      game.setCamYaw(setupDrag.yaw0 + (e.clientX - setupDrag.x0) * 0.005);
    }
  });
  const endDrag = (e) => {
    if (setupDrag === e.pointerId || (setupDrag && setupDrag.id === e.pointerId)) setupDrag = null;
  };
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);
  canvas.addEventListener('dblclick', () => { if (game.mode === 'physical') game.setCamYaw(0); });

  // auto-pause when the document goes to the background
  document.addEventListener('visibilitychange', () => { if (document.hidden) game.onHidden(); });
  window.addEventListener('pagehide', () => game.onHidden());

  function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', () => setTimeout(onResize, 60));

  // ---- main loop ----
  const clock = new THREE.Clock();
  let frames = 0;
  let fpsEma = 60;
  let lowFx = false;
  function loop() {
    requestAnimationFrame(loop);
    const dt = clock.getDelta();
    game.update(dt);
    renderer.render(scene, camera);
    frames++;
    // auto quality: drop pixel ratio + shadow map if the device can't keep up
    const fps = 1 / Math.max(dt, 1e-4);
    fpsEma = fpsEma * 0.95 + fps * 0.05;
    if (!lowFx && frames > 150 && fpsEma < 20) {
      lowFx = true;
      renderer.setPixelRatio(1);
      const sun = world.sun;
      sun.shadow.mapSize.set(1024, 1024);
      if (sun.shadow.map) { sun.shadow.map.dispose(); sun.shadow.map = null; }
      console.info('[pocket-roads] low-fx mode: pixelRatio=1, shadow 1024 (fps~' + fpsEma.toFixed(0) + ')');
    }
  }
  loop();
  hud.hideLoading();
  hud.showScreen('menu');
  hud.showHud(false);

  installTestApi({ game, input, hud, audio, renderer, scene, camera, route, layout, settings: loadSettings, world, frameCount: () => frames });
  window.__PR_TEST__.ready = true;
}

boot().catch((err) => {
  console.error(err);
  const el = document.getElementById('loadFill');
  if (el) el.style.background = '#d8342c';
  const h = document.querySelector('.loadPanel h2');
  if (h) h.textContent = 'LOAD ERROR: ' + err.message;
  window.__PR_ERROR__ = String(err && err.stack || err);
});
