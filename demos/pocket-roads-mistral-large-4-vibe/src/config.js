// src/config.js — central constants for Pocket Roads — Midnight Pass.
// All asset URLs are resolved relative to this module (import.meta.url), so the
// game works unchanged when the static build is served from any nested path.

const A = (p) => new URL('../assets/' + p, import.meta.url).href;

export const ASSETS = {
  sky: A('alpine-sky.webp'),        // dusk sky panorama (used on sky dome + env reflections)
  preview: A('midnight-pass.webp'), // opening artwork, used for the stage preview on the menu
  roadGrain: A('road-grain.webp'),  // asphalt grain texture
  spruce: [A('spruce-0.webp'), A('spruce-1.webp'), A('spruce-2.webp')],
  coupe: A('coupe.glb'),            // textured toy coupe (glTF binary)
  mark: A('mark.svg'),              // placement marker
};

export const VENDOR = {
  three: new URL('../vendor/three.module.min.js', import.meta.url).href,
  gltfLoader: new URL('../vendor/GLTFLoader.js', import.meta.url).href,
  bufferGeomUtils: new URL('../vendor/BufferGeometryUtils.js', import.meta.url).href,
};

export const ROUTE_LENGTH = 3200;          // metres — the "3.20 km" alpine road
export const ROAD_HALF = 3.5;              // asphalt half width (m)
export const SHOULDER = 1.7;               // gravel shoulder each side (m)
export const EDGE_LIMIT = ROAD_HALF + SHOULDER - 0.35; // |x| beyond this = off the road edge

export const CHECKPOINTS = [800, 1600, 2400, ROUTE_LENGTH]; // 4 gates, last one is the finish
export const PENALTY_SECONDS = 2;          // added once per distinct collision
export const MEDALS = { gold: 115, silver: 135 }; // seconds, on final time incl. penalties

export const CAR = {
  length: 4.4,          // world metres (glb is ~1 unit long)
  halfLen: 2.3,
  halfW: 0.95,
  modelScale: 4.38,     // glb length ~1.004 -> 4.4 m
  modelYOffset: 0.79,   // puts the tyre contact patch exactly on y = 0 (the rig origin)
  forwardSign: 1,       // +1 if the glb faces +Z (verified against a live capture)
};

export const STORAGE_KEY = 'pocketRoads.midnightPass.v1';

export const PHYSICAL_CAM = {
  elevTan: 0.9,   // camera elevation angle = atan(0.9) ≈ 42° above the table
  defaultDist: 5.5, // default view distance (persisted, adjustable in setup)
  fov: 55,
};

export const VIRTUAL_CAM = {
  height: 3.05,
  back: 7.7,
  lookY: 1.05,
  lookAhead: 11.0,
  fovBase: 62,
  fovMax: 76,
};

export const fmtTime = (s) => {
  if (s == null || !isFinite(s)) return '—';
  const m = Math.floor(s / 60);
  const r = s - m * 60;
  return m + ':' + (r < 10 ? '0' : '') + r.toFixed(1);
};
