// src/assets.js — the browser-side AssetRegistry (R48, R49, R54, R55).
//
// It loads the generated art that T021/T034/T037/T043 put on disk and hands it to
// the renderer through the one seam src/render.js defines: `sprite(name)` and
// `bg(name)` return a drawable image for that name, or null so the procedural
// stand-in paints it. Nothing else in the game reads this module.
//
// Provenance is REAL, not invented here: every number and path this registry can
// report comes from a same-origin fetch of `assets/processed/atlas.json` and
// `assets/manifest.json`. There is no hash, record id or source path written in
// this file, so `info(name)` cannot claim a lineage the manifest does not.
//
// Loading is strict. Every REQUIRED_SPRITE_NAMES frame and every BACKGROUND_NAMES
// painting must decode, or boot throws and names what is missing — a silent
// fall-back to flat fills is exactly the failure R49 exists to prevent. The two
// optional tile-base frames (`rock`, `water`) may be absent, which is the contract
// src/render.js:55-66 states for them.

import { REQUIRED_SPRITE_NAMES, BACKGROUND_NAMES, TILE_BASE_NAMES } from './render.js';

export const MANIFEST_PATH = 'assets/manifest.json';
export const ATLAS_JSON_PATH = 'assets/processed/atlas.json';
export const ATLAS_PNG_PATH = 'assets/processed/atlas.png';
export const BACKGROUND_PATH = (name) => `assets/processed/backgrounds/${name}.png`;
// Where an atlas frame's `source` (relative to the atlas) actually lives.
export const PROCESSED_DIR = 'assets/processed';

// One loaded thing the renderer can draw, plus the lineage it was loaded with.
class Frame {
  constructor(image, provenance) {
    this.image = image;
    this.width = image.width;
    this.height = image.height;
    Object.assign(this, provenance);
  }
}

export class AssetRegistry {
  constructor({ sprites = new Map(), backgrounds = new Map(), manifest = null, atlas = null } = {}) {
    this.sprites = sprites;
    this.backgrounds = backgrounds;
    this.manifest = manifest;
    this.atlas = atlas;
    this.loaded = true;
  }

  // --- the renderer seam -----------------------------------------------------
  sprite(name) {
    const f = this.sprites.get(name);
    return f ? f.image : null;
  }

  bg(name) {
    const f = this.backgrounds.get(name);
    return f ? f.image : null;
  }

  has(name) {
    return this.sprites.has(name) || this.backgrounds.has(name);
  }

  names() {
    return [...this.sprites.keys(), ...this.backgrounds.keys()];
  }

  // The manifest record a name came from, or null when the name is unknown. Plain
  // data only, so a check can read it straight out of page.evaluate.
  info(name) {
    const f = this.sprites.get(name) ?? this.backgrounds.get(name);
    if (!f) return null;
    const rec = this.manifest?.records?.find((r) => r.id === f.record) ?? null;
    return {
      name,
      kind: f.kind,
      record: f.record,
      source: f.source,
      source_sha256: f.source_sha256,
      path: f.path,
      frame: f.frame ?? null,
      size: { w: f.width, h: f.height },
      record_exists: !!rec,
      returned_paths: rec ? rec.returned_paths : null,
      workflow: rec ? rec.workflow : null,
      seed: rec ? rec.seed : null,
    };
  }
}

async function getJson(url, fetchImpl) {
  const res = await fetchImpl(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`AssetRegistry: ${url} -> HTTP ${res.status}`);
  return res.json();
}

async function getImage(url, fetchImpl) {
  const res = await fetchImpl(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`AssetRegistry: ${url} -> HTTP ${res.status}`);
  return createImageBitmap(await res.blob());
}

// Crop one atlas frame out of the atlas sheet into its own drawable, so the
// renderer's drawImage(frame, x, y, w, h) paints exactly that sprite.
function crop(atlasImage, f) {
  const canvas =
    typeof OffscreenCanvas !== 'undefined'
      ? new OffscreenCanvas(f.w, f.h)
      : Object.assign(document.createElement('canvas'), { width: f.w, height: f.h });
  const c = canvas.getContext('2d');
  c.drawImage(atlasImage, f.x, f.y, f.w, f.h, 0, 0, f.w, f.h);
  return canvas;
}

// Load the atlas, the three area backgrounds and the provenance of both.
export async function loadAssets({ fetchImpl = (...a) => fetch(...a) } = {}) {
  const [manifest, atlas] = await Promise.all([
    getJson(MANIFEST_PATH, fetchImpl),
    getJson(ATLAS_JSON_PATH, fetchImpl),
  ]);
  if (!Array.isArray(manifest.records)) throw new Error('AssetRegistry: manifest has no records[]');
  if (atlas.format !== 'digger-atlas-v1' || !Array.isArray(atlas.frames)) {
    throw new Error(`AssetRegistry: unexpected atlas format ${JSON.stringify(atlas.format)}`);
  }
  const recordIds = new Set(manifest.records.map((r) => r.id));
  const atlasImage = await getImage(ATLAS_PNG_PATH, fetchImpl);

  const sprites = new Map();
  for (const f of atlas.frames) {
    // Load BY NAME from atlas.json: the file is the authority on which frames
    // exist, so a new sprite (T043's rare_ore) needs no edit here.
    if (!recordIds.has(f.record)) {
      throw new Error(`AssetRegistry: atlas frame "${f.name}" cites record ${f.record}, which the manifest does not have`);
    }
    const image = crop(atlasImage, f);
    sprites.set(f.name, new Frame(image, {
      kind: 'sprite',
      record: f.record,
      source: f.source,
      source_sha256: f.source_sha256,
      path: `${ATLAS_PNG_PATH}#${f.name}`,
      frame: { x: f.x, y: f.y, w: f.w, h: f.h },
    }));
  }

  // Backgrounds carry their lineage in the manifest, not in an atlas: the record
  // whose derived[] names the processed PNG is the one that painted it.
  const backgrounds = new Map();
  for (const name of BACKGROUND_NAMES) {
    const path = BACKGROUND_PATH(name);
    const rec = manifest.records.find((r) => (r.derived ?? []).some((d) => d.path === path));
    if (!rec) throw new Error(`AssetRegistry: no manifest record derives ${path}`);
    const image = await getImage(path, fetchImpl);
    backgrounds.set(name, new Frame(image, {
      kind: 'background',
      record: rec.id,
      source: rec.returned_paths?.[0] ?? null,
      source_sha256: rec.source_sha256,
      path,
    }));
  }

  // Fail loudly, and name the missing art: no silent flat-fill boot (R49).
  const missing = [
    ...REQUIRED_SPRITE_NAMES.filter((n) => !sprites.has(n)).map((n) => `sprite ${n}`),
    ...BACKGROUND_NAMES.filter((n) => !backgrounds.has(n)).map((n) => `background ${n}`),
  ];
  if (missing.length) throw new Error(`AssetRegistry: required art is missing: ${missing.join(', ')}`);

  return new AssetRegistry({ sprites, backgrounds, manifest, atlas });
}

// Optional tile-base frames, reported so a caller can tell "absent" from "broken".
export const OPTIONAL_SPRITE_NAMES = Object.freeze([...TILE_BASE_NAMES]);
