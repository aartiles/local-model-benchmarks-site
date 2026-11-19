// src/assets.js — the only place that turns an asset name into a URL, and the
// single loader for the supplied runtime assets (R11, R37, R38).
//
// Nested-path safety (R37) in two steps:
//   1. the absolute location of an asset is derived from THIS module's own URL
//      (`import.meta.url`), never from a literal path or a host;
//   2. that location is then re-expressed as a URL relative to the document's
//      own base (`document.baseURI`), so what reaches TextureLoader /
//      GLTFLoader / <img> is always a relative string. The browser resolves it
//      against `/pocket-roads/` or `/` by itself, and no host-rooted or
//      absolute URL can ever appear in the app or in the request log.

import * as THREE from '../vendor/three.module.min.js';
import { GLTFLoader } from '../vendor/GLTFLoader.js';

// The asset directory name is the only literal path here; its base is derived.
const ASSET_BASE = new URL('../assets/', import.meta.url);

// Names as they are shipped in assets/ (R11: used at their original paths,
// byte-for-byte unchanged).
export const SKY = 'alpine-sky.webp';
export const PREVIEW = 'midnight-pass.webp';
export const MARK = 'mark.svg';
export const COUPE = 'coupe.glb';
export const TEXTURES = ['road-grain.webp', 'spruce-0.webp', 'spruce-1.webp', 'spruce-2.webp'];

// Everything the boot asks for, in one list (checks use it too).
export const ASSET_NAMES = [SKY, PREVIEW, MARK, COUPE, ...TEXTURES];

// ------------------------------------------------------------------- URLs ----

/** URL of a file in assets/, relative to the current document (R37). */
export function assetUrl(name) {
  const target = new URL(name, ASSET_BASE);
  return relativeToDocument(target);
}

/** Express an absolute URL as one relative to the document's own base. */
export function relativeToDocument(target) {
  const base = documentBase();
  if (!base) return target.href;
  if (base.protocol !== target.protocol) return target.href;
  // file:// URLs have an opaque origin ("null"), so compare their paths.
  const sameOrigin = base.origin === target.origin || (base.protocol === 'file:' && target.protocol === 'file:');
  if (!sameOrigin) return target.href;
  const b = segments(base.pathname);
  const t = segments(target.pathname);
  let shared = 0;
  while (shared < b.length && shared < t.length && b[shared] === t[shared]) shared++;
  const up = '../'.repeat(Math.max(0, b.length - shared));
  const rel = up + t.slice(shared).join('/');
  return rel || './';
}

function documentBase() {
  const href =
    (typeof document !== 'undefined' && document.baseURI) ||
    (typeof location !== 'undefined' && location.href) ||
    null;
  if (!href) return null;
  try {
    return new URL('.', href); // the directory the document lives in
  } catch {
    return null;
  }
}

function segments(pathname) {
  return pathname.split('/').filter(Boolean);
}

// ------------------------------------------------------------------ loading --

let cache = null;

/**
 * Load every supplied runtime asset. Resolves to
 *   { textures: { 'road-grain': Texture, 'spruce-0': Texture, … },
 *     sky: Texture, preview: Texture, mark: HTMLImageElement, coupe: gltf }
 * The result is cached, so calling it again hands back the same promise;
 * `onProgress(0..1, url)` is only observed on the first call.
 */
export function loadAssets(onProgress) {
  if (!cache) cache = resolveAll(onProgress);
  return cache;
}

/** The cached promise, or null when nothing has been requested yet. */
export function assetsInFlight() {
  return cache;
}

async function resolveAll(onProgress) {
  const manager = new THREE.LoadingManager();
  if (typeof onProgress === 'function') {
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      onProgress(itemsTotal ? itemsLoaded / itemsTotal : 1, url);
    };
  }

  const textureLoader = new THREE.TextureLoader(manager);
  const gltfLoader = new GLTFLoader(manager);

  const loadTexture = (name) =>
    new Promise((resolve, reject) => {
      textureLoader.load(
        assetUrl(name),
        (texture) => {
          texture.name = name;
          texture.colorSpace = THREE.SRGBColorSpace; // all supplied images are colour data
          texture.anisotropy = 4;
          resolve(texture);
        },
        undefined,
        (event) => reject(assetError(name, event))
      );
    });

  const loadImage = (name) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.alt = '';
      img.decoding = 'async';
      img.onload = () => resolve(img);
      img.onerror = () => reject(assetError(name, 'image could not be decoded'));
      img.src = assetUrl(name);
    });

  const loadModel = (name) =>
    new Promise((resolve, reject) => {
      gltfLoader.load(
        assetUrl(name),
        (gltf) => resolve(gltf),
        undefined,
        (event) => reject(assetError(name, event))
      );
    });

  const [roadGrain, spruce0, spruce1, spruce2, sky, preview, mark, coupe] = await Promise.all([
    loadTexture('road-grain.webp'),
    loadTexture('spruce-0.webp'),
    loadTexture('spruce-1.webp'),
    loadTexture('spruce-2.webp'),
    loadTexture(SKY),
    loadTexture(PREVIEW),
    loadImage(MARK),
    loadModel(COUPE),
  ]);

  return {
    textures: {
      'road-grain': roadGrain,
      'spruce-0': spruce0,
      'spruce-1': spruce1,
      'spruce-2': spruce2,
    },
    sky,
    preview,
    mark,
    coupe,
  };
}

function assetError(name, cause) {
  const detail =
    typeof cause === 'string'
      ? cause
      : (cause && (cause.message || cause.text || cause.statusText)) ||
        (cause && cause.target && (cause.target.statusText || cause.target.status)) ||
        'load failed';
  const url = assetUrl(name);
  return new Error(`asset ${name} (${url}): ${detail}`);
}
