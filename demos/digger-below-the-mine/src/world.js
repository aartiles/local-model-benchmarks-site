// src/world.js — the tile grid: the single source of truth for collision,
// mining and water (R3, R16, R21). The renderer draws over this grid; nothing
// about gameplay is decided by pixels.
//
// Two ways to build one:
//   World.fromJSON(data)  the authored map in assets/world.json (T004)
//   new World(seed)       a deterministic generated grid, so the model is
//                         usable and testable before that file exists
// loadWorld() picks whichever is available.
//
// Units: at()/set()/dig() take tile coordinates; solidAt()/areaAt() take pixel
// coordinates in world space, because that is what the player body and the
// camera hold. bounds is in tiles, pixelBounds in pixels.
//
// Water: waterLevel is the height of the water in tile rows, measured up from
// the bottom of the grid, so "lower the water" means a smaller number. The grid
// is the truth: WATER tiles exist only at or below waterSurfaceRow, and drain()
// clears the ones above the new surface. Deep water blocks movement until it is
// drained, which is what gates the flooded machinery area (R21).

import { TILE, WORLD, AREAS } from './config.js';
import {
  AIR,
  ROCK,
  ORE,
  RARE_ORE,
  CRYSTAL,
  SUPPORT,
  LIFT,
  PUMP,
  PART,
  BATTERY_PICKUP,
  WATER,
  WALL,
  DEEP_CRYSTAL,
  isSolid,
  isDiggable,
  isEssential,
  oreYield,
  NAME,
} from './tiles.js';
import { hash2 } from './rng.js';

export const WORLD_MAP_URL = '../assets/world.json';

// Rows of water that a partial drain can leave behind.
export const WATER_MIN = 0;

// Points every authored map must place: the mission machine and the spawn look
// them up by name, so a missing one is a broken map, not a missing feature.
export const REQUIRED_POINTS = ['spawn', 'lift', 'pump', 'part', 'deepCrystal', 'batteries'];

const MAX_ID = Object.keys(NAME).length;

function clonePoint(p) {
  return p ? { x: p.x, y: p.y } : null;
}

export class World {
  // seed is only used by the generated fallback; an authored world keeps it for
  // the look-alikes (hash2) so the same seed still draws the same mine.
  constructor(seed = 1) {
    this.seed = seed >>> 0;
    this.pixelTile = TILE;
    this.width = WORLD.width;
    this.height = WORLD.height;
    this.tiles = new Uint8Array(this.width * this.height);
    this.areas = AREAS.map((a) => ({ id: a.id, label: a.label, bounds: { ...a.bounds } }));
    this.points = {};
    this.waterLevel = 0;
    this.source = 'generated';
    generate(this, this.seed);
    this._initial = this.tiles.slice();
    this._initialWater = this.waterLevel;
  }

  // --- shape ---------------------------------------------------------------
  get bounds() {
    return { x: 0, y: 0, w: this.width, h: this.height };
  }

  get pixelBounds() {
    return { x: 0, y: 0, w: this.width * this.pixelTile, h: this.height * this.pixelTile };
  }

  get waterSurfaceRow() {
    return this.height - this.waterLevel;
  }

  get drained() {
    return this.waterLevel <= WATER_MIN && this.count(WATER) === 0;
  }

  // --- cells ---------------------------------------------------------------
  inBounds(x, y) {
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
  }

  // Outside the grid reads as bedrock, so collision code cannot walk off the map.
  at(x, y) {
    if (!this.inBounds(x, y)) return WALL;
    return this.tiles[y * this.width + x];
  }

  set(x, y, id) {
    if (!this.inBounds(x, y)) return false;
    if (!Number.isInteger(id) || id < 0 || id >= MAX_ID) return false;
    this.tiles[y * this.width + x] = id;
    return true;
  }

  count(id) {
    let n = 0;
    for (let i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i] === id) n++;
    }
    return n;
  }

  tileX(px) {
    return Math.floor(px / this.pixelTile);
  }

  tileY(py) {
    return Math.floor(py / this.pixelTile);
  }

  centerOf(x, y) {
    return { x: x * this.pixelTile + this.pixelTile / 2, y: y * this.pixelTile + this.pixelTile / 2 };
  }

  // What blocks the miner: solid tiles (R3) and standing water that has not been
  // drained (R21). Air, pickups and the pump part never do.
  tileSolidAt(x, y) {
    const id = this.at(x, y);
    return isSolid(id) || id === WATER;
  }

  solidAt(px, py) {
    return this.tileSolidAt(this.tileX(px), this.tileY(py));
  }

  // The area that owns a pixel position, or null outside every area.
  areaAt(px, py) {
    return this.areaOfTile(this.tileX(px), this.tileY(py));
  }

  areaOfTile(x, y) {
    for (const a of this.areas) {
      const b = a.bounds;
      if (x >= b.x && x < b.x + b.w && y >= b.y && y < b.y + b.h) return a;
    }
    return null;
  }

  point(name) {
    return clonePoint(this.points[name]);
  }

  pointPx(name) {
    const p = this.points[name];
    return p ? this.centerOf(p.x, p.y) : null;
  }

  // --- mining --------------------------------------------------------------
  // Destroy one tile. Returns what it yielded so the player can bank the ore and
  // the HUD can show it; a refusal never touches the grid (R8, R16, R26).
  dig(x, y) {
    if (!this.inBounds(x, y)) return { ok: false, ore: 0, id: null, reason: 'out-of-bounds' };
    const id = this.at(x, y);
    if (isEssential(id)) return { ok: false, ore: 0, id, reason: 'essential' };
    if (!isDiggable(id)) return { ok: false, ore: 0, id, reason: 'indestructible' };
    this.set(x, y, AIR);
    return { ok: true, ore: oreYield(id), id, x, y };
  }

  // --- pickups -------------------------------------------------------------
  // Lift a specific loose item out of the grid: true when the tile held `id` and
  // is now air. Consumables are never essential, so this cannot delete something
  // the mission needs (R26); the id test is what makes a pickup one-shot, because
  // the tile is gone the moment it is taken (R19).
  take(x, y, id) {
    if (!this.inBounds(x, y)) return false;
    if (this.at(x, y) !== id) return false;
    if (isEssential(id)) return false;
    return this.set(x, y, AIR);
  }

  // --- water ---------------------------------------------------------------
  // Lower the water to `to` rows (0 = dry). WATER tiles above the new surface
  // become air, which is what opens the flooded band (R21).
  drain(to = WATER_MIN) {
    const target = Math.max(WATER_MIN, Math.min(this.height, Math.round(to)));
    const surface = this.height - target;
    let changed = target !== this.waterLevel;
    for (let y = surface - 1; y >= 0; y--) {
      const row = y * this.width;
      for (let x = 0; x < this.width; x++) {
        if (this.tiles[row + x] === WATER) {
          this.tiles[row + x] = AIR;
          changed = true;
        }
      }
    }
    this.waterLevel = target;
    return changed;
  }

  isWater(x, y) {
    return this.at(x, y) === WATER;
  }

  // --- lifecycle -----------------------------------------------------------
  // Restore tiles and water to the state this world was built in (R27 restart).
  reset() {
    this.tiles.set(this._initial);
    this.waterLevel = this._initialWater;
    return this;
  }

  // FNV-1a over the grid, the water level and the points: a cheap digest that is
  // stable across engines, so checks can compare worlds without shipping 5k cells.
  hash() {
    let h = 0x811c9dc5;
    const mix = (v) => {
      h = Math.imul(h ^ (v & 0xff), 0x01000193) >>> 0;
    };
    for (let i = 0; i < this.tiles.length; i++) mix(this.tiles[i]);
    mix(this.width);
    mix(this.height);
    for (let v = this.waterLevel; v > 0; v >>= 8) mix(v);
    for (const key of Object.keys(this.points).sort()) {
      for (let i = 0; i < key.length; i++) mix(key.charCodeAt(i));
      const p = this.points[key];
      if (Array.isArray(p)) {
        // List points (batteries, shafts) must move the digest too, or two
        // worlds that differ only in pickup positions would hash the same.
        mix(p.length);
        for (const q of p) {
          mix(q.x);
          mix(q.y);
        }
      } else if (p) {
        mix(p.x);
        mix(p.y);
      }
    }
    return ('00000000' + h.toString(16)).slice(-8);
  }

  // Plain structured-cloneable data, for window.__digger.dump() (R63).
  serialize() {
    return {
      width: this.width,
      height: this.height,
      tiles: Array.from(this.tiles),
      areas: this.areas.map((a) => ({ id: a.id, label: a.label, bounds: { ...a.bounds } })),
      points: JSON.parse(JSON.stringify(this.points)),
      waterLevel: this.waterLevel,
      seed: this.seed,
      source: this.source,
    };
  }

  static fromJSON(data) {
    if (!data || typeof data !== 'object') throw new Error('world map is not an object');
    const width = data.width | 0;
    const height = data.height | 0;
    if (!(width > 2 && height > 2)) throw new Error(`world map size ${width}x${height} is too small`);
    const src = data.tiles;
    if (!src || src.length !== width * height) {
      throw new Error(`world map has ${src ? src.length : 0} tiles, expected ${width * height}`);
    }
    const tiles = new Uint8Array(width * height);
    for (let i = 0; i < src.length; i++) {
      const id = src[i];
      if (!Number.isInteger(id) || id < 0 || id >= MAX_ID) {
        throw new Error(`world map tile ${id} at index ${i} is unknown`);
      }
      tiles[i] = id;
    }
    const areas = data.areas;
    if (!Array.isArray(areas) || areas.length !== 3) {
      throw new Error(`world map needs 3 areas, found ${areas && areas.length}`);
    }
    const world = Object.create(World.prototype);
    world.seed = (data.seed ?? 1) >>> 0;
    world.pixelTile = TILE;
    world.width = width;
    world.height = height;
    world.tiles = tiles;
    world.areas = areas.map((a) => {
      const b = a.bounds;
      if (!b || !(b.w > 0 && b.h > 0)) throw new Error(`area ${a.id} has no positive bounds`);
      return { id: a.id, label: a.label ?? a.id, bounds: { x: b.x | 0, y: b.y | 0, w: b.w | 0, h: b.h | 0 } };
    });
    world.points = {};
    const pts = data.points ?? {};
    for (const key of Object.keys(pts)) {
      const p = pts[key];
      if (Array.isArray(p)) {
        world.points[key] = p.map((q) => ({ x: q.x | 0, y: q.y | 0 }));
      } else if (p && typeof p === 'object') {
        world.points[key] = { x: p.x | 0, y: p.y | 0 };
      }
    }
    // The mission and the spawn depend on these; a map missing one is corrupt,
    // and failing here beats a null pointer in T004's connectivity proof.
    for (const key of REQUIRED_POINTS) {
      const p = world.points[key];
      if (p === undefined || p === null) throw new Error(`world map has no "${key}" point`);
      const list = Array.isArray(p) ? p : [p];
      if (list.length === 0) throw new Error(`world map has no "${key}" points`);
      for (const q of list) {
        if (!world.inBounds(q.x, q.y)) {
          throw new Error(`world map point "${key}" (${q.x},${q.y}) is outside the grid`);
        }
      }
    }
    world.source = 'authored';
    world.waterLevel =
      typeof data.waterLevel === 'number' ? Math.max(0, Math.min(height, Math.round(data.waterLevel))) : measureWater(world);
    // Keep the grid and the level honest: no water above the surface line.
    world.drain(world.waterLevel);
    world._initial = world.tiles.slice();
    world._initialWater = world.waterLevel;
    return world;
  }
}

// Depth of the water column in rows, measured up from the bottom of the grid.
// The topmost row that holds water sets the surface, so every row below it
// belongs to the column even when bedrock or a ledge fills it: a map whose
// bottom row is solid rock still reports its water instead of reading dry,
// which would delete the whole flooded area on load (R21).
function measureWater(world) {
  for (let y = 0; y < world.height; y++) {
    const row = y * world.width;
    for (let x = 0; x < world.width; x++) {
      if (world.tiles[row + x] === WATER) return world.height - y;
    }
  }
  return 0;
}

// --- loading ---------------------------------------------------------------

// Read assets/world.json from wherever this module is served, or null when there
// is no authored map. Node reads the file straight off disk; the browser fetches
// it. Neither needs the caller to know which engine it is in.
async function readDefault() {
  const url = new URL(WORLD_MAP_URL, import.meta.url);
  if (globalThis.process?.versions?.node) {
    const fs = await import('node:fs');
    try {
      return JSON.parse(fs.readFileSync(url, 'utf8'));
    } catch {
      return null;
    }
  }
  if (typeof fetch !== 'function') return null;
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

// The authored map when `read` gives one, the seeded grid otherwise. `read` is
// injectable so checks can hand over a map without touching assets/.
export async function loadWorld(read = readDefault, seed = 1) {
  let data = null;
  if (read) {
    try {
      data = await read(WORLD_MAP_URL);
    } catch {
      data = null;
    }
  }
  if (data === null || data === undefined) return new World(seed);
  return World.fromJSON(data);
}

// --- generated fallback ----------------------------------------------------
// A three-band mine: corridors in each area joined by two shafts, ore and crystal
// veins from stateless noise, the pump on a dry ledge above the waterline, and the
// deep rare crystal behind that water. It is only the fallback: T004 authors the
// real map, and this exists so the model is testable before then.
function generate(world, seed) {
  const W = world.width;
  const H = world.height;
  const tiles = world.tiles;
  tiles.fill(ROCK);
  for (let x = 0; x < W; x++) {
    tiles[x] = WALL;
    tiles[(H - 1) * W + x] = WALL;
  }
  for (let y = 0; y < H; y++) {
    tiles[y * W] = WALL;
    tiles[y * W + W - 1] = WALL;
  }

  const carve = (x0, y0, x1, y1, id = AIR) => {
    for (let y = Math.max(1, y0); y <= Math.min(H - 2, y1); y++) {
      for (let x = Math.max(1, x0); x <= Math.min(W - 2, x1); x++) {
        tiles[y * W + x] = id;
      }
    }
  };
  const put = (x, y, id) => {
    if (x > 0 && y > 0 && x < W - 1 && y < H - 1) tiles[y * W + x] = id;
  };

  const entrance = world.areas[0].bounds;
  const caverns = world.areas[1].bounds;
  const flooded = world.areas[2].bounds;
  // Walkable bottom row of each corridor, three rows high so the miner fits.
  const eWalk = entrance.y + 14;
  const cWalk = caverns.y + 11;
  const fTop = flooded.y + 3; // flooded corridor occupies rows fTop..fWalk
  const fWalk = flooded.y + 5;
  const shaftA = Math.floor(W * 0.48);
  const shaftB = Math.floor(W * 0.62);

  // Corridors, with rock floors beneath them.
  carve(2, eWalk - 2, W - 3, eWalk);
  carve(2, cWalk - 2, W - 3, cWalk);
  carve(2, fTop, W - 3, fWalk);
  // A lower gallery in the flooded band, which is what the water fills.
  carve(4, fWalk + 2, W - 5, flooded.y + flooded.h - 4);
  // The two shafts that make the bands one connected mine (R16).
  carve(shaftA, eWalk + 1, shaftA + 1, cWalk - 3);
  carve(shaftB, cWalk + 1, shaftB + 1, fTop - 1);

  // Ore and crystal veins, from stateless noise so a tile always looks the same.
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      if (tiles[y * W + x] !== ROCK) continue;
      const n = hash2(x, y, seed);
      if (n > 0.992) tiles[y * W + x] = RARE_ORE;
      else if (n > 0.972) tiles[y * W + x] = CRYSTAL;
      else if (n > 0.928) tiles[y * W + x] = ORE;
    }
  }

  // Timber holding the entrance up (R14), in the rock above the corridor.
  for (const x of [10, 26, 42, 58, 74, 88]) {
    put(x, entrance.y + 10, SUPPORT);
    put(x, entrance.y + 11, SUPPORT);
  }

  // Mission objects: one of each, in the area the mission says they belong to.
  carve(2, eWalk - 3, 3, eWalk, LIFT);
  const lift = { x: 3, y: eWalk };
  const spawn = { x: 6, y: eWalk };
  const part = { x: 20, y: cWalk };
  put(part.x, part.y, PART);
  // The pump stays above the waterline: it is what drains the rest (R21).
  const pump = { x: shaftB + 8, y: fTop };
  put(pump.x, pump.y, PUMP);
  // The deep rare crystal is behind the water, so draining is the only way in.
  const deepCrystal = { x: W - 6, y: fWalk };
  put(deepCrystal.x, deepCrystal.y, DEEP_CRYSTAL);
  const batteries = [
    { x: 24, y: eWalk },
    { x: 68, y: cWalk },
    { x: Math.floor(W / 2), y: fWalk },
  ];
  for (const b of batteries) put(b.x, b.y, BATTERY_PICKUP);

  // Water: the flooded band below the surface line, filling the carved space.
  const waterLevel = H - (fTop + 1);
  const surface = H - waterLevel;
  for (let y = surface; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      if (tiles[y * W + x] === AIR) tiles[y * W + x] = WATER;
    }
  }
  world.waterLevel = waterLevel;

  world.points = {
    spawn,
    lift,
    pump,
    part,
    deepCrystal,
    batteries,
    shafts: [
      { x: shaftA, y: eWalk + 1 },
      { x: shaftB, y: cWalk + 1 },
    ],
  };
}
