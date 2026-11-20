// src/testapi.js — a small, documented debug/test surface on window.__PR_TEST__.
// It drives the exact same state the UI drives and is what tools/check.mjs
// (the repeatable browser check) uses. It has no effect on normal play.
import { loadSettings, clearSettings } from './storage.js';
import { ROUTE_LENGTH, CHECKPOINTS, MEDALS, ASSETS } from './config.js';

export function installTestApi(ctx) {
  const { game, input, hud, renderer, camera, route, layout } = ctx;
  const errors = [];
  window.addEventListener('error', (e) => errors.push(String(e.message)));
  window.addEventListener('unhandledrejection', (e) => errors.push(String(e.reason)));

  window.__PR_TEST__ = {
    ready: false,
    errors,
    assets: ASSETS,
    routeLength: ROUTE_LENGTH,
    checkpoints: CHECKPOINTS,
    medals: MEDALS,

    state() {
      const s = game._state();
      return { ...s, steer: input.steer, throttle: input.throttle, brake: input.brake, camYaw: game._camYaw };
    },
    inputState: () => ({ steer: input.steer, throttle: input.throttle, brake: input.brake, pointers: [...input._pointers.entries()], keys: [...input._keys] }),
    frameCount: () => ctx.frameCount(),
    startVirtual: () => game.setMode('virtual'),
    startPhysical: () => game.setMode('physical'),
    toMenu: () => game.quitToMenu(),
    enterSetup: () => game.enterSetup(),
    setAnchor: (x, y) => game.setAnchorCandidate(x, y),
    saveAnchor: () => game.saveAnchor(),
    resume: () => game.resume(),
    pause: () => game.pause(),
    restart: () => game.restart(),
    settings: () => loadSettings(),
    resetStorage: () => clearSettings(),
    anchorErrorPx: () => game.anchorErrorPx(),
    projectOrigin: () => {
      const v = new (Object.getPrototypeOf(camera.position).constructor)();
      const ndc = v.set(0, 0, 0).project(camera);
      return {
        x: (ndc.x + 1) / 2 * renderer.domElement.clientWidth,
        y: (1 - ndc.y) / 2 * renderer.domElement.clientHeight,
        ndcX: ndc.x, ndcY: ndc.y,
      };
    },
    cameraMode: () => game.mode,
    phase: () => game.phase,
    carVisible: () => game.car.group.visible,
    setS: (s) => { game.s = s; },
    setX: (x) => { game.x = x; },
    setSpeed: (v) => { game.v = v; },
    setCamYaw: (y) => game.setCamYaw(y),
    setTimeScale: (x) => { game.timeScale = x; },
    autoDrive: (b) => { game.autoDrive = !!b; },
    debugInput: (steer, throttle, brake) => input._debugSet(steer, throttle, brake),
    hazards: () => layout.hazards.map((h) => ({ ...h, triggered: !!h.triggered })),
    hazardNear: (s, within = 40) => layout.hazards.filter((h) => h.s >= s - 2 && h.s <= s + within && !h.triggered)[0] || null,
    sampleRoute: (s) => { const sm = route.sample(s, {}); return { p: { x: sm.p.x, y: sm.p.y, z: sm.p.z }, k: sm.k, b: sm.b }; },
    assetRequests: () => performance.getEntriesByType('resource').map((r) => ({ name: r.name, type: r.initiatorType, size: r.transferSize, status: r.responseStatus })),
    consoleErrors: () => errors,
    glInfo: () => {
      const gl = renderer.getContext();
      return { renderer: gl.getParameter(gl.RENDERER), webgl2: gl instanceof WebGL2RenderingContext };
    },
    frame: () => new Promise((res) => requestAnimationFrame(() => res(performance.now()))),
    canvasSize: () => ({ w: renderer.domElement.width, h: renderer.domElement.height, cw: renderer.domElement.clientWidth, ch: renderer.domElement.clientHeight }),
    freeCam: (px, py, pz, tx, ty, tz) => { game.freeCam = { p: [px, py, pz], t: [tx, ty, tz] }; },
    clearFreeCam: () => { game.freeCam = null; },
  };
}
