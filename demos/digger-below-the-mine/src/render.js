// src/render.js — the camera and the tile renderer (R3, R36, R37).
//
// The logical tile grid in src/world.js stays the truth for collision and mining;
// this module only turns it into a picture: three illustrated area bands, the rock
// they sit in, water that stops at the water line, props, pickups, enemies and the
// miner, painted in a FIXED z-order.
//
// One seam, `drawSprite(name, x, y, w, h)`, paints every sprite and every area
// background. Today every name falls through to a procedural stand-in; T022/T038
// hand the renderer an AssetRegistry whose atlas frames use these same names, and
// nothing else in the game changes. The names are therefore a contract:
// SPRITE_NAMES and BACKGROUND_NAMES below are the frame names T021/T037 must
// emit; REQUIRED_SPRITE_NAMES is the subset a gameplay scene cannot do without,
// and TILE_BASE_NAMES are the optional tile-base frames (see each list).
//
// The renderer reads a plain-data scene built by buildScene() and never writes to
// the simulation. The camera it owns is the one piece of render state that
// persists between frames.

import { TILE, STEP, MINE_TIME } from './config.js';
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
  ESSENTIAL,
} from './tiles.js';
import { hash2 } from './rng.js';
import { ENEMY, enemyAnim } from './enemies.js';
import { LightSystem } from './lighting.js';

// --- the sprite contract -----------------------------------------------------
export const SPRITE_NAMES = Object.freeze([
  'miner',
  'crawler',
  'wraith',
  'ore',
  'rare_ore',
  'crystal',
  'deep_crystal',
  'battery_cell',
  'timber',
  'pump',
  'pump_part',
  'lift',
  // Tile BASE frames: the textured ground every tile sits on, and the water body
  // itself. R1's "textured rock ... not flat geometric stand-ins" cannot be met
  // without them, so they go through the same seam. They are OPTIONAL in the
  // atlas: with no frame the procedural stand-in below paints them, which is why
  // T022/T038 may ship an atlas of the 12 names above and nothing else.
  'rock',
  'water',
]);
// The 12 frames T021/T037 must emit for gameplay sprites; `rock`/`water` are the
// tile-base frames that may be added later for the illustrated look (R1).
export const REQUIRED_SPRITE_NAMES = Object.freeze(SPRITE_NAMES.slice(0, 12));
export const TILE_BASE_NAMES = Object.freeze(['rock', 'water']);
export const BACKGROUND_NAMES = Object.freeze(['entrance', 'caverns', 'flooded']);
// The three figures whose atlas frame is cut to its own silhouette, so the frame's
// aspect IS the figure's aspect (T038). Their hitbox is a collision box, not a
// drawing box: painting a frame into it stretches the figure, which is the
// placeholder look R2 and R50 forbid. See characterBox() for the law.
export const CHARACTER_SPRITES = Object.freeze(['miner', 'crawler', 'wraith']);
// Painted in this order, every frame. `label` sits above terrain, water, props,
// pickups, enemies, the miner and the light pool, because it is the only area
// indicator until T014's HUD and must never be buried by the world (T012 review).
export const LAYERS = Object.freeze([
  'background',
  'terrain',
  'water',
  'props',
  'pickups',
  'enemies',
  'miner',
  'light',
  'label',
  'banner',
]);

// Tile id -> atlas frame name. Every tile also sits on a base frame (below), so
// nothing in the world is painted outside the seam.
export const TILE_SPRITE = Object.freeze({
  [ORE]: 'ore',
  [RARE_ORE]: 'rare_ore',
  [CRYSTAL]: 'crystal',
  [DEEP_CRYSTAL]: 'deep_crystal',
  [BATTERY_PICKUP]: 'battery_cell',
  [SUPPORT]: 'timber',
  [PUMP]: 'pump',
  [PART]: 'pump_part',
  [LIFT]: 'lift',
});

// Tile id -> the base frame painted under it. Today everything solid is rock, so
// one frame carries the whole mine's texture; a later card can give bedrock or
// the essential machinery its own frame by editing this map and nothing else.
export const TILE_BASE = Object.freeze({
  [ROCK]: 'rock',
  [WALL]: 'rock',
  [ESSENTIAL]: 'rock',
  [ORE]: 'rock',
  [RARE_ORE]: 'rock',
  [CRYSTAL]: 'rock',
  [DEEP_CRYSTAL]: 'rock',
});

// Base fill per tile id, before any sprite goes on top. The values are chosen so
// a pixel readback tells rock from ore from water from air (T012's check).
// ORE / RARE_ORE sit well above ROCK's red because the ore sprite adds almost no
// red of its own over a 24x24 sample: T012's "ore reads as a brighter, goldier
// rock" (ore[0] > rock[0]+30) is carried by this base, and illustrated rock now
// paints at its full band mean instead of hiding a dark gutter pixel.
export const TERRAIN_FILL = Object.freeze({
  [ROCK]: [74, 62, 48],
  [WALL]: [30, 26, 24],
  [ESSENTIAL]: [62, 58, 70],
  [ORE]: [140, 108, 70],
  [RARE_ORE]: [154, 120, 78],
  [CRYSTAL]: [56, 78, 92],
  [DEEP_CRYSTAL]: [74, 48, 102],
  [SUPPORT]: [52, 42, 32],
  [PUMP]: [34, 42, 44],
  [LIFT]: [38, 40, 48],
});

// The colours the stand-ins are built from, and the anchors a check reads back.
export const PALETTE = Object.freeze({
  entrance: [44, 32, 22],
  caverns: [28, 20, 54],
  flooded: [12, 40, 50],
  rock: [74, 62, 48],
  bedrock: [30, 26, 24],
  ore: [228, 180, 84],
  rare_ore: [252, 214, 120],
  crystal: [150, 232, 240],
  deep_crystal: [214, 166, 255],
  battery_cell: [200, 232, 120],
  timber: [138, 96, 52],
  pump: [96, 150, 132],
  pump_part: [236, 206, 132],
  lift: [150, 158, 176],
  water: [28, 84, 130],
  water_surface: [150, 215, 240],
  miner: [141, 90, 43],
  miner_helmet: [226, 215, 189],
  crawler: [196, 58, 64],
  wraith: [196, 226, 240],
});

// The veil laid over each area's painting in drawBackgrounds (R1, R3, R5). Its
// colour is the band's own anchor DARKENED by BG_WASH_SHADE, so the mine keeps
// the hue that tells the three bands apart (T012's nearest-band anchors) while
// an open tile stays darker than the rock the miner stands on (T012's readback)
// and the lantern pool stays the brightest thing in frame (T013). The raw
// anchor is too bright and too warm: caverns [28,20,54] over the painting made
// every air tile read brighter than rock and failed the band test.
// BG_WASH_ALPHA is how much of the veil survives; 0.85 leaves 15% of the
// generated painting, which is what parallaxes with the camera.
export const BG_WASH_ALPHA = 0.85;
export const BG_WASH_SHADE = 0.7;

// T051: width in px of the feather that hides the painting's 1440px repeat seam
// (R50). Narrow on purpose: the cells stay UNMIRRORED so T045b's prediction of a
// background pixel from worldX % 1440 stays exact everywhere except these few
// columns before a boundary, and T048's world-anchored lattice is untouched.
export const SEAM_FEATHER = 16;

// Veiled-state banners (R31, R23, R24). T014 moves these into DOM overlays; the
// canvas copy is what keeps pause/defeat/victory visible on screen until then.
export const BANNER = Object.freeze({
  title: ['DIGGER: BELOW THE MINE', 'Press SPACE or E to descend'],
  paused: ['PAUSED', 'Press P to resume  /  R to restart'],
  dead: ['DEFEAT', 'The miner went down. Press R to restart'],
  victory: ['VICTORY', 'Crystal delivered to the lift. Press R to play again'],
});
export const VEILED_STATES = Object.freeze(['title', 'paused', 'dead', 'victory']);

// --- camera tuning -----------------------------------------------------------
export const CAMERA = Object.freeze({
  smooth: 9, // per-second exponential follow
  lookahead: 0.35, // tiles of lead in the direction the miner faces
  bias: -6, // px of headroom above the miner's body centre
  snap: 8, // tiles: a teleport bigger than this moves the camera at once
});

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const rgb = (c, a = 1) =>
  a >= 1 ? `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})` : `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;
const shade = (c, k) => [(c[0] * k) | 0, (c[1] * k) | 0, (c[2] * k) | 0];

// The veil colour for an area id, as drawBackgrounds paints it: the band's
// anchor darkened, with the channels truncated exactly as rgb() does, so a
// check can compare the string it reads off the context.
export const bgWash = (id) => shade(PALETTE[id] ?? PALETTE.rock, BG_WASH_SHADE).map((v) => v | 0);

// --- illustrated rock (T049, R1/R2/R3/R50) ----------------------------------
// Every solid tile used to be ONE flat colour with a 1px gutter, which is the
// block-art look R1 and R2 forbid. Each tile now shows its own crop of the
// band's OWN generated painting, anchored to the tile's world pixel, so the
// ground is continuous illustrated stone that carries that band's hue. No new
// art and no new atlas frame: the pixels come from the frame `frameFor(areaId)`
// already loads, tinted once per area and cached.
//
// ROCK_RELIEF is how much of the painting's light/dark relief survives the
// tint. ROCK_HUE is how far a tile's target colour leans toward its band's
// anchor hue — the anchor is rescaled to the target's own brightness first, so
// a band gets its hue without the ground going darker than the flat fill T012
// measures (the raw anchors are all darker than TERRAIN_FILL.rock, and the
// flooded band's air is teal: a hue-matched-but-dark rock fails T012).
// Both numbers are measured, see .tenaz/notes/T049.md.
export const ROCK_RELIEF = 0.25;
export const ROCK_HUE = 0.62;
// The painting's OWN grain, put back after the tint. A 1440x576 atmospheric
// painting varies little over the 32x32 px one tile shows, so tinting it alone
// left neighbouring tile means further apart than the variation inside a tile
// (entrance 3.3 vs 3.2, flooded 6.3 vs 5.2) — the ground still read as a grid of
// swatches. ROCK_GRAIN scales the high-pass (the pixel minus the mean of its
// ROCK_GRAIN_RADIUS neighbourhood), which is zero-mean over any tile, so it
// sharpens the stone WITHOUT moving the tile means T012 measures. It is the
// artwork's detail emphasized, never procedural noise: the same pixels come from
// the same painting, so the grain is continuous across tile edges too.
export const ROCK_GRAIN = 0.16;
export const ROCK_GRAIN_RADIUS = 4;
// Resolution of the cached tinted copy, as a fraction of the band's painting.
// 1.0 is load-bearing, not laziness: a tile crops TILE x TILE source px and is
// drawn 1:1, so the painting's GRAIN survives. A half-resolution copy crops the
// SAME 32x32 native px averaged into 16x16, which leaves every tile's mean
// unchanged (measured: identical rock means) but smooths the detail away, so the
// variation inside a tile fell below the difference between neighbouring tiles
// (entrance 2.7 vs 3.4, flooded 4.6 vs 6.3) — the grid still read as swatches.
export const ROCK_TEX_SCALE = 1;

const chanLum = (c) => 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];

// The ids that ARE the ground. Only these take the band's hue: ore, crystal and
// the rest carry a sprite of their own, and pushing their gold toward a cool
// band hue is what made T012's "ore reads as a brighter, goldier rock" fail.
const GROUND_IDS = new Set([ROCK, WALL, ESSENTIAL]);

// T052 (R50/R1/R2/R3): the ids that carry a sprite of their own used to keep
// their own TERRAIN_FILL as the BASE under it, so every vein sat on a hard-edged
// gold or blue SQUARE of stone inside the illustrated rock — a rectangular
// sprite background. Their base is now the band's own rock, and the vein's
// colour is feathered in at the tile CENTRE, reaching zero 1px inside the tile
// border, so the stone is continuous across the edge and no rectangle shows.
export const VEIN_IDS = new Set([ORE, RARE_ORE, CRYSTAL, DEEP_CRYSTAL]);
// Radius, in tile px, at which the vein lift has faded to nothing. A tile is
// TILE wide, so 15 leaves the whole 1px inset ring untouched: the ring is pure
// band stone, which is what checks/T052.ore-plate-blend.mjs measures.
export const VEIN_MASK_RADIUS = 15;
// Alpha of the lift at the tile's exact centre. The smallest value that keeps
// T012's 24x24 ore sample above rock+30 in red in every band (measured,
// .tenaz/notes/T052.md) while still fading to nothing at the border.
export const VEIN_LIFT = 0.95;
// The vein's own sprite is cut from generated art whose silhouette reaches the
// frame border (checks/_processed-sprites.mjs: 655 of the ore frame's 848
// perimeter px are opaque), so blitting it into the whole tile box painted
// sprite pixels onto the very ring T052 measures — a hard-edged vein-shaped
// square of art sitting on continuous stone. The sprite is drawn inset by this
// many px instead, so the tile's 1px border ring is stone and nothing else, and
// the vein keeps its size: 28 of 32 px is a 12% shrink nobody can see next to
// a 32px neighbour, and the frame's aspect is preserved as before.
export const VEIN_SPRITE_INSET = 2;
// T052, measured: the ore frame is opaque over almost all of T012's 24x24
// sample box, so a lift painted UNDER it moves that sample by only 3.8 red
// channels (89.5 -> 93.3 against rock 69.2, where 99.2 is needed). The same
// feathered lift is therefore laid OVER the sprite too, at a low peak alpha:
// it reads as the vein catching the lamp, keeps the sprite's shape and detail,
// and is still exactly zero from 1px inside the tile border outward, so the
// border ring stays pure band stone (checks/T052.ore-plate-blend.mjs).
export const VEIN_GLOW = 0.3;

// The colour a solid tile aims at: its own TERRAIN_FILL, pushed toward the
// band's hue at the same brightness for the ground ids. The MEAN of a painted
// tile is this, so the grid stays readable (rock / wall / ore apart) while the
// texture is the art.
export function rockTarget(id, areaId) {
  const base = TERRAIN_FILL[id] ?? PALETTE.rock;
  const anchor = GROUND_IDS.has(id) ? PALETTE[areaId] : null;
  if (!anchor) return [...base];
  const k = base.reduce((a, b) => a + b, 0) / anchor.reduce((a, b) => a + b, 0);
  return base.map((v, i) => v + (anchor[i] * k - v) * ROCK_HUE);
}

// The colour a water tile aims at: PALETTE.water pushed toward its band's hue at
// the water's own brightness — the same law as rockTarget, so the flooded gallery
// reads as one depth of illustrated water carrying the band's teal instead of a
// grid of flat blue swatches (T050, R1/R2/R50). Measured target [28,91,123]:
// still b > r+30 (T012's "water reads as blue") and >= 40 from rock/air/ore in
// the R3 readback, because the flooded anchor is itself a dark teal.
export function waterTarget(areaId) {
  const base = PALETTE.water;
  const anchor = PALETTE[areaId] ?? PALETTE.flooded;
  const k = base.reduce((a, b) => a + b, 0) / anchor.reduce((a, b) => a + b, 0);
  return base.map((v, i) => v + (anchor[i] * k - v) * ROCK_HUE);
}

// The tile's crop of a band's tinted painting, anchored to the tile's WORLD
// pixel (T049's seam, shared by the rock and water stand-ins): the fill is
// continuous across tile edges — no 1px gutter — and parallaxes with the band
// it belongs to. A band is 96x18 tiles = 3072x576 px and the art is 1440x576,
// so y is 1:1 and x wraps inside the band every 45 tiles.
function paintCrop(ctx, tex, area, tx, ty, x, y, w, h) {
  const b = area.bounds;
  const step = TILE * ROCK_TEX_SCALE;
  let sxp = (((tx - b.x) * step) % tex.width + tex.width) % tex.width;
  let syp = (((ty - b.y) * step) % tex.height + tex.height) % tex.height;
  if (sxp + step > tex.width) sxp = tex.width - step;
  if (syp + step > tex.height) syp = tex.height - step;
  ctx.drawImage(tex, sxp, syp, step, step, x, y, w, h);
}

// A canvas the renderer can read back from, for the cached tinted texture.
function pixelCanvas(w, h) {
  const c =
    typeof OffscreenCanvas === 'function'
      ? new OffscreenCanvas(w, h)
      : Object.assign(document.createElement('canvas'), { width: w, height: h });
  return c;
}

export class Camera {
  constructor({ w = 0, h = 0 } = {}) {
    this.x = 0;
    this.y = 0;
    this.w = w;
    this.h = h;
    this.bounds = { w: 0, h: 0 };
    this.look = 0;
  }

  setView(w, h) {
    this.w = Math.max(1, Math.round(w));
    this.h = Math.max(1, Math.round(h));
    return this;
  }

  setBounds(bounds) {
    this.bounds = { w: bounds.w, h: bounds.h };
    return this.clamp();
  }

  // Never show the void outside the mine (R3): the view slides along the world
  // edge instead. A window bigger than the world pins to the origin.
  clamp() {
    this.x = clamp(this.x, 0, Math.max(0, this.bounds.w - this.w));
    this.y = clamp(this.y, 0, Math.max(0, this.bounds.h - this.h));
    return this;
  }

  // Where the camera wants to put its centre for a body {x, y, h, facing}.
  target(body) {
    const cx = body.x + this.look;
    const cy = body.y - (body.h ?? 28) / 2 + CAMERA.bias;
    return {
      x: clamp(cx - this.w / 2, 0, Math.max(0, this.bounds.w - this.w)),
      y: clamp(cy - this.h / 2, 0, Math.max(0, this.bounds.h - this.h)),
    };
  }

  follow(body, dt = STEP) {
    this.look += ((body.facing ?? 1) * CAMERA.lookahead * TILE - this.look) * clamp(dt * 6, 0, 1);
    const t = this.target(body);
    const gap = Math.hypot(t.x - this.x, t.y - this.y);
    const k = gap > CAMERA.snap * TILE ? 1 : 1 - Math.exp(-CAMERA.smooth * Math.max(0, dt));
    this.x += (t.x - this.x) * k;
    this.y += (t.y - this.y) * k;
    return this.clamp();
  }

  // World px -> screen px.
  sx(x) {
    return Math.round(x - this.x);
  }

  sy(y) {
    return Math.round(y - this.y);
  }

  // Inclusive tile window currently on screen, one tile of margin so a body at
  // the edge is never cut off.
  visible(world) {
    return {
      x0: clamp(Math.floor(this.x / TILE) - 1, 0, world.width - 1),
      x1: clamp(Math.ceil((this.x + this.w) / TILE) + 1, 0, world.width - 1),
      y0: clamp(Math.floor(this.y / TILE) - 1, 0, world.height - 1),
      y1: clamp(Math.ceil((this.y + this.h) / TILE) + 1, 0, world.height - 1),
    };
  }
}

// --- plain-data scene --------------------------------------------------------
// Read-only views of the live layers, so the renderer cannot mutate the sim and
// an atlas swap never has to reach into a Player or a World.
function worldView(world) {
  return {
    width: world.width,
    height: world.height,
    tile: world.pixelTile ?? TILE,
    seed: world.seed ?? 1,
    pixelBounds: { w: world.width * (world.pixelTile ?? TILE), h: world.height * (world.pixelTile ?? TILE) },
    waterLevel: world.waterLevel,
    waterSurfaceRow: world.waterSurfaceRow,
    areas: world.areas.map((a) => ({ id: a.id, label: a.label, bounds: { ...a.bounds } })),
    at: (x, y) => world.at(x, y),
    isWater: (x, y) => world.isWater(x, y),
    tileSolidAt: (x, y) => world.tileSolidAt(x, y),
    areaOfTile: (x, y) => world.areaOfTile(x, y),
  };
}

function playerView(p) {
  return {
    x: p.x,
    y: p.y,
    w: p.w,
    h: p.h,
    facing: p.facing,
    state: p.state,
    anim: p.anim ? { ...p.anim } : null,
    steps: p.steps,
    onGround: p.onGround,
    mining: p.mining ? { x: p.mining.x, y: p.mining.y, t: p.mining.t, id: p.mining.id } : null,
    lantern: p.lantern,
    lit: p.lit === true,
    battery: p.battery,
    health: p.health,
    hurtTimer: p.hurtTimer,
    dead: p.dead === true,
  };
}

function enemyView(e) {
  const s = typeof e.snapshot === 'function' ? e.snapshot() : { ...e };
  const t = ENEMY[s.kind];
  return { ...s, w: e.w ?? t?.w ?? 24, h: e.h ?? t?.h ?? 24 };
}

export function buildScene(core, dt = STEP) {
  const game = core.game;
  const world = core.world;
  const player = core.player;
  const enemies = game?.enemies ?? world?.enemies ?? [];
  return {
    dt,
    state: game ? game.state : 'playing',
    time: game ? game.time : core.time ?? 0,
    view: { w: core.view.w, h: core.view.h, dpr: core.view.dpr ?? 1 },
    world: worldView(world),
    player: playerView(player),
    enemies: enemies.map(enemyView),
    prompt: game?.prompt ?? null,
  };
}

// --- renderer ----------------------------------------------------------------
// The pose a scene carries when the sim layer has not produced one yet: the
// neutral stance, so nothing moves (src/player.js animate() owns the real one).
const NEUTRAL_POSE = Object.freeze({
  state: 'idle', phase: 0, bob: 0, lean: 0, sx: 1, sy: 1, legL: 0, legR: 0, arm: 0.5, grip: 0,
});

export class Renderer {
  constructor({ ctx, camera = new Camera(), assets = null, lighting = new LightSystem() } = {}) {
    if (!ctx) throw new Error('Renderer needs a 2D context');
    this.ctx = ctx;
    this.camera = camera;
    this.assets = assets;
    this.lighting = lighting;
    this.tile = { x: 0, y: 0, id: 0 }; // set before each tile sprite; stand-ins use it for look-alikes
    this.scene = null; // the scene being painted, so a stand-in can read the grid it sits in
    this.scenePlayer = null; // the miner view this frame draws, for the miner stand-in
    this.sceneEnemy = null; // the enemy view being drawn, for the enemy stand-ins
    this.log = { frame: 0, drawn: [], layers: [] };
  }

  setAssets(assets) {
    this.assets = assets;
    return this;
  }

  // T051: the seam feather for one band, built ONCE from its own painting: the
  // painting's FIRST column stretched across SEAM_FEATHER px, with a horizontal
  // alpha ramp 0 -> 1 towards the boundary. Laid over the last px of the cell on
  // the left, it makes the tail fade into the colour the next cell starts with,
  // so the 1440px repeat has no hard step and no new rectangle.
  seamPatch(areaId) {
    if (!this._seamPatch) this._seamPatch = new Map();
    if (this._seamPatch.has(areaId)) return this._seamPatch.get(areaId);
    const frame = this.frameFor(areaId);
    let patch = null;
    if (frame && frame.width > SEAM_FEATHER) {
      const ph = frame.height;
      const c = pixelCanvas(SEAM_FEATHER, ph);
      const pctx = c.getContext('2d', { willReadFrequently: true });
      pctx.drawImage(frame, 0, 0, 1, ph, 0, 0, SEAM_FEATHER, ph);
      pctx.globalCompositeOperation = 'destination-in';
      const g = pctx.createLinearGradient(0, 0, SEAM_FEATHER, 0);
      g.addColorStop(0, 'rgba(0,0,0,0)');
      g.addColorStop(1, 'rgba(0,0,0,1)');
      pctx.fillStyle = g;
      pctx.fillRect(0, 0, SEAM_FEATHER, ph);
      patch = c;
    }
    this._seamPatch.set(areaId, patch);
    return patch;
  }

  // Atlas frame for a name, or null when the procedural stand-in should paint it.
  frameFor(name) {
    const a = this.assets;
    if (!a) return null;
    return a.sprite?.(name) ?? a.bg?.(name) ?? null;
  }

  // The painting's own high-pass, read ONCE per band and shared by every target
  // that band paints (rock, wall, bedrock, and the water T050 added). For each
  // source pixel it returns the multiplicative relief+grain factor
  //     k = 1 + ROCK_RELIEF * rel + ROCK_GRAIN * grain
  // which depends on the ART alone, never on the target colour. T050's review
  // measured that a second full-resolution read of the painting per band (the
  // blur over 829k px) was the expensive half of a boot, so the read lives here
  // and a tint is now two linear passes over the cached k.
  //
  // Zero-mean by construction, so it adds the grain the tint alone smooths away
  // without moving the tile means T012 measures.
  bandAnalysis(areaId) {
    if (!this._bandAnalysis) this._bandAnalysis = new Map();
    if (this._bandAnalysis.has(areaId)) return this._bandAnalysis.get(areaId);
    const frame = this.frameFor(areaId);
    let a = null;
    const sw = Math.round(TILE * ROCK_TEX_SCALE);
    if (frame && frame.width >= TILE && frame.height >= TILE) {
      const w = Math.max(sw, Math.round(frame.width * ROCK_TEX_SCALE));
      const h = Math.max(sw, Math.round(frame.height * ROCK_TEX_SCALE));
      const c = pixelCanvas(w, h);
      const tctx = c.getContext('2d', { willReadFrequently: true });
      tctx.drawImage(frame, 0, 0, w, h);
      const d = tctx.getImageData(0, 0, w, h).data;
      const n = d.length / 4;
      let mean = 0;
      const lum = new Float32Array(n);
      for (let p = 0, i = 0; p < n; p++, i += 4) {
        const l = chanLum([d[i], d[i + 1], d[i + 2]]);
        lum[p] = l;
        mean += l;
      }
      mean /= n;
      const R = Math.max(1, ROCK_GRAIN_RADIUS | 0);
      const win = 2 * R + 1;
      const tmp = new Float32Array(n);
      const blur = new Float32Array(n);
      for (let y = 0; y < h; y++) {
        const row = y * w;
        let sum = 0;
        for (let x = -R; x <= R; x++) sum += lum[row + clamp(x, 0, w - 1)];
        for (let x = 0; x < w; x++) {
          tmp[row + x] = sum / win;
          sum += lum[row + clamp(x + R + 1, 0, w - 1)] - lum[row + clamp(x - R, 0, w - 1)];
        }
      }
      for (let x = 0; x < w; x++) {
        let sum = 0;
        for (let y = -R; y <= R; y++) sum += tmp[clamp(y, 0, h - 1) * w + x];
        for (let y = 0; y < h; y++) {
          blur[y * w + x] = sum / win;
          sum += tmp[clamp(y + R + 1, 0, h - 1) * w + x] - tmp[clamp(y - R, 0, h - 1) * w + x];
        }
      }
      let sq = 0;
      for (let p = 0; p < n; p++) {
        const g = lum[p] - blur[p];
        sq += g * g;
      }
      const gstd = Math.max(1, Math.sqrt(sq / n));
      // Relative relief, clamped so a bright crystal in the art cannot blow the
      // tile's mean past its target.
      const span = Math.max(1, mean);
      // Float64, not Float32: k is multiplied by the target and rounded into a
      // Uint8, and the float32 rounding moved a few hundred of the 829k pixels by
      // 1/255 (measured). One double per pixel keeps the tinted texture
      // bit-identical to the per-target build it replaces, which is what lets
      // T012/T013/T049/T050 be re-run as proof rather than re-tuned.
      const k = new Float64Array(n);
      for (let p = 0; p < n; p++) {
        const rel = clamp((lum[p] - mean) / span, -1, 1);
        const g = clamp((lum[p] - blur[p]) / gstd, -3, 3);
        k[p] = 1 + ROCK_RELIEF * rel + ROCK_GRAIN * g;
      }
      a = { w, h, k };
    }
    this._bandAnalysis.set(areaId, a);
    return a;
  }

  // One tinted copy of a band's painting at a target colour, cached per
  // (band, key): built once, read every frame, so the same world pixel keeps
  // the same colour — which is what T012:217 pins with its twice-sampled tile.
  // Half the art's resolution is enough for stone relief and keeps the build to
  // a few hundred thousand pixels per band.
  //
  // `key` is the tile id the caller is painting, which is what the target is
  // derived from. Passing it makes the per-tile lookup two Map.gets; the old
  // `${areaId}:${target.map(...).join(',')}` string cost 0.77us per call, and a
  // frame asks for ~2200 tiles, so it was most of the tinted path's frame time
  // (measured: 1.0ms/frame textured vs 0.45ms/frame without, T050 review).
  // Omitted, the target's own rounded values are the key, so the behaviour of a
  // caller that has no id to name is unchanged.
  rockTexture(areaId, target, key = null) {
    if (!this._rockTextures) this._rockTextures = new Map();
    let band = this._rockTextures.get(areaId);
    if (!band) {
      band = new Map();
      this._rockTextures.set(areaId, band);
    }
    const sub = key === null ? target.map((v) => Math.round(v)).join(',') : key;
    if (band.has(sub)) return band.get(sub);
    const a = this.bandAnalysis(areaId);
    let tex = null;
    if (a) {
      const { w, h, k } = a;
      const n = w * h;
      const c = pixelCanvas(w, h);
      const tctx = c.getContext('2d', { willReadFrequently: true });
      const img = tctx.createImageData(w, h);
      const d = img.data;
      const t0 = target[0];
      const t1 = target[1];
      const t2 = target[2];
      const acc = [0, 0, 0];
      for (let p = 0, i = 0; p < n; p++, i += 4) {
        const f = k[p];
        d[i] = t0 * f;
        d[i + 1] = t1 * f;
        d[i + 2] = t2 * f;
        d[i + 3] = 255;
        acc[0] += d[i];
        acc[1] += d[i + 1];
        acc[2] += d[i + 2];
      }
      // Clamping drags the produced mean off the target (measured: ore 124 -> 99),
      // so scale every pixel by target/mean per channel. The texture's mean IS the
      // tile's target colour, which is what makes a 24x24 readback predictable.
      const m0 = acc[0] / n;
      const m1 = acc[1] / n;
      const m2 = acc[2] / n;
      const g0 = m0 > 0.5 ? t0 / m0 : 1;
      const g1 = m1 > 0.5 ? t1 / m1 : 1;
      const g2 = m2 > 0.5 ? t2 / m2 : 1;
      for (let i = 0; i < d.length; i += 4) {
        d[i] = clamp(d[i] * g0, 0, 255) | 0;
        d[i + 1] = clamp(d[i + 1] * g1, 0, 255) | 0;
        d[i + 2] = clamp(d[i + 2] * g2, 0, 255) | 0;
      }
      tctx.putImageData(img, 0, 0);
      tex = c;
    }
    band.set(sub, tex);
    return tex;
  }

  // T052: the vein's own colour, feathered into the band's stone. The tile has
  // already painted its crop of the band's rock; this lays a radial lift of the
  // vein's TERRAIN_FILL over that stone, which is zero from 1px inside the tile
  // border outward. So the tile's border ring is exactly the stone its neighbour
  // paints (no plate edge, R50), while the centre still reads as ore (R3, and
  // T012's ore[0] > rock[0]+30). One gradient per (band, vein id) is built once
  // and reused through a translate, so a frame costs a save/fill/restore per
  // vein tile — the per-tile scratch compositing this replaced put T045b's
  // frame budget over 4s.
  paintVein(area, id, ctx, x, y, w, h, lift = VEIN_LIFT) {
    if (!this._veinGrads) this._veinGrads = new Map();
    const key = area.id + ':' + id + ':' + lift;
    let g = this._veinGrads.get(key);
    if (!g) {
      // The vein's own art colour (bright gold / cyan / violet), not its
      // TERRAIN_FILL: the ore frame adds almost no red of its own over T012's
      // 24x24 sample, and TERRAIN_FILL[ORE] (red 140) is too dim to lift the
      // sample the 30 red channels T012 needs even at full alpha.
      const c = PALETTE[TILE_SPRITE[id]] ?? TERRAIN_FILL[id] ?? PALETTE.ore;
      g = ctx.createRadialGradient(0, 0, 0, 0, 0, VEIN_MASK_RADIUS);
      g.addColorStop(0, rgb(c, lift));
      g.addColorStop(0.45, rgb(c, lift * 0.78));
      g.addColorStop(0.8, rgb(c, lift * 0.34));
      g.addColorStop(1, rgb(c, 0));
      this._veinGrads.set(key, g);
    }
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);
    ctx.fillStyle = g;
    ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.restore();
  }

  // rockTarget / waterTarget are pure functions of the pair (tile id, band), and
  // the tile loop asks for the same pair ~2200 times a frame. Memoize the answer
  // here so a frame reads one shared array instead of allocating three per tile.
  // The arrays are only ever read (by rockTexture), so sharing is safe.
  targetFor(id, areaId) {
    if (!this._targets) this._targets = new Map();
    let byArea = this._targets.get(id);
    if (!byArea) {
      byArea = new Map();
      this._targets.set(id, byArea);
    }
    if (byArea.has(areaId)) return byArea.get(areaId);
    const t = id === WATER ? waterTarget(areaId) : rockTarget(id, areaId);
    byArea.set(areaId, t);
    return t;
  }

  // THE seam. Every sprite and every area background in the game is drawn here,
  // by one of the fixed names, into the box (x, y, w, h) in screen px.
  drawSprite(name, x, y, w, h) {
    if (!SPRITE_NAMES.includes(name) && !BACKGROUND_NAMES.includes(name)) {
      throw new Error(`Renderer.drawSprite: "${name}" is not a sprite or background name`);
    }
    this.log.drawn.push(name);
    const frame = this.frameFor(name);
    const ctx = this.ctx;
    if (frame) {
      ctx.drawImage(frame, x, y, w, h);
      return true;
    }
    this.standIn(name, x, y, w, h);
    return false;
  }

  standIn(name, x, y, w, h) {
    const paint = STAND_INS[name];
    if (paint) paint(this, x, y, w, h);
  }

  // One frame: camera, then the fixed z-order.
  draw(scene) {
    const cam = this.camera;
    cam.setView(scene.view.w, scene.view.h);
    cam.setBounds(scene.world.pixelBounds);
    cam.follow(scene.player, scene.dt ?? STEP);

    this.log.frame += 1;
    this.log.drawn = [];
    this.log.layers = [];
    this.scenePlayer = scene.player;
    this.scene = scene;
    const ctx = this.ctx;
    ctx.save();
    // A layer that throws (an enemy with no sprite name, say) must not leave an
    // unbalanced save() on the canvas stack.
    try {
      ctx.clearRect(0, 0, cam.w, cam.h);
      this.layer('background', () => this.drawBackgrounds(scene));
      this.layer('terrain', () => this.drawTiles(scene, TERRAIN_IDS));
      this.layer('water', () => this.drawWater(scene));
      this.layer('props', () => this.drawTiles(scene, PROP_IDS));
      this.layer('pickups', () => this.drawTiles(scene, PICKUP_IDS));
      this.layer('enemies', () => this.drawEnemies(scene));
      this.layer('miner', () => this.drawMiner(scene));
      this.layer('light', () => this.drawLight(scene));
      this.layer('label', () => this.drawLabel(scene));
      this.layer('banner', () => this.drawBanner(scene));
    } finally {
      ctx.restore();
    }
    return this.log;
  }

  layer(name, fn) {
    this.log.layers.push(name);
    fn();
  }

  visibleTiles(scene) {
    return this.camera.visible(scene.world);
  }

  // The painting belongs to the WORLD, not to the screen (R1, R3, R5): it is
  // anchored to its area's own origin and repeated at its native size, so the
  // same world pixel keeps its colour as the camera moves and each area reads
  // as its own artwork. Where the art is not loaded the procedural stand-in
  // still gets the visible box, as before.
  //
  // A veil of the band's darkened anchor goes over the painting, inside this
  // layer and before terrain, so it never touches props, pickups, the miner,
  // the enemies or the light pool. It is what keeps an open tile darker than
  // the rock beside it (T012's readback) while each band stays nearest its own
  // colour anchor (R5).
  drawBackgrounds(scene) {
    const cam = this.camera;
    const world = scene.world;
    const v = this.visibleTiles(scene);
    const ctx = this.ctx;
    for (const area of world.areas) {
      const b = area.bounds;
      const x0 = Math.max(b.x, v.x0);
      const x1 = Math.min(b.x + b.w - 1, v.x1);
      const y0 = Math.max(b.y, v.y0);
      const y1 = Math.min(b.y + b.h - 1, v.y1);
      if (x0 > x1 || y0 > y1) continue;
      const vx = cam.sx(x0 * TILE);
      const vy = cam.sy(y0 * TILE);
      const vw = (x1 - x0 + 1) * TILE;
      const vh = (y1 - y0 + 1) * TILE;
      const frame = this.frameFor(area.id);
      const pw = frame ? frame.width : vw;
      const ph = frame ? frame.height : vh;
      const patch = frame ? this.seamPatch(area.id) : null;
      const ox = b.x * TILE;
      const oy = b.y * TILE;
      const wx1 = (x1 + 1) * TILE;
      const wy1 = (y1 + 1) * TILE;
      ctx.save();
      ctx.beginPath();
      ctx.rect(vx, vy, vw, vh);
      ctx.clip();
      for (let iy = Math.floor((y0 * TILE - oy) / ph); oy + iy * ph < wy1; iy++) {
        for (let ix = Math.floor((x0 * TILE - ox) / pw); ox + ix * pw < wx1; ix++) {
          const x = cam.sx(ox + ix * pw);
          const y = cam.sy(oy + iy * ph);
          // T051: the painting is 1440px wide and a band is 3072px, so the cells
          // repeat, and the last column of one copy used to sit against the
          // first column of the next - a hard vertical step in the sky of the
          // mine (R50). Each copy is still blitted UNMIRRORED at its own box on
          // the world-anchored lattice at native size (T048), which is what keeps
          // T045b's worldX % 1440 paint mapping exact, and the boundary is hidden
          // by the feather: the 1.80 column-mean step becomes a ramp of about
          // 1/SEAM_FEATHER of itself, so no screen column is an outlier.
          this.drawSprite(area.id, x, y, pw, ph);
          if (ix >= 1 && patch) ctx.drawImage(patch, x - SEAM_FEATHER, y, SEAM_FEATHER, ph);
        }
      }
      ctx.fillStyle = rgb(bgWash(area.id), BG_WASH_ALPHA);
      ctx.fillRect(vx, vy, vw, vh);
      ctx.restore();
    }
  }

  // Tiles that carry a sprite: base frame first, then the sprite through the seam.
  drawTiles(scene, ids) {
    const world = scene.world;
    const cam = this.camera;
    const v = this.visibleTiles(scene);
    for (let ty = v.y0; ty <= v.y1; ty++) {
      for (let tx = v.x0; tx <= v.x1; tx++) {
        const id = world.at(tx, ty);
        if (!ids.includes(id)) continue;
        const sx = cam.sx(tx * TILE);
        const sy = cam.sy(ty * TILE);
        this.tile.x = tx;
        this.tile.y = ty;
        this.tile.id = id;
        const base = TILE_BASE[id];
        if (base) this.drawSprite(base, sx, sy, TILE, TILE);
        const name = TILE_SPRITE[id];
        if (name) {
          // A vein's art is inset so its silhouette never paints the tile's
          // border ring: that ring stays the band's continuous stone, which is
          // what makes the plate disappear (T052, R50).
          const ins = VEIN_IDS.has(id) ? VEIN_SPRITE_INSET : 0;
          this.drawSprite(name, sx + ins, sy + ins, TILE - 2 * ins, TILE - 2 * ins);
          // ... and the vein's colour is feathered back over it, centred on the
          // tile and gone 1px inside the border, so the ore still reads brighter
          // than the stone around it without ever squaring off (T052, R3/R50).
          if (VEIN_IDS.has(id)) {
            const area = world.areaOfTile?.(tx, ty) ?? null;
            if (area) this.paintVein(area, id, this.ctx, sx, sy, TILE, TILE, VEIN_GLOW);
          }
        }
      }
    }
  }

  // Water is a tile property, so it can only ever be painted where the grid says
  // WATER — which is at or below world.waterSurfaceRow (R21).
  drawWater(scene) {
    const world = scene.world;
    const cam = this.camera;
    const v = this.visibleTiles(scene);
    for (let ty = v.y0; ty <= v.y1; ty++) {
      for (let tx = v.x0; tx <= v.x1; tx++) {
        if (!world.isWater(tx, ty)) continue;
        this.tile.x = tx;
        this.tile.y = ty;
        this.tile.id = WATER;
        this.drawSprite('water', cam.sx(tx * TILE), cam.sy(ty * TILE), TILE, TILE);
      }
    }
  }

  // The area name is the one piece of text the scene carries until T014's HUD, so
  // it gets its own layer above the world rather than being buried by it.
  drawLabel(scene) {
    const world = scene.world;
    const area = world.areaOfTile(Math.floor(scene.player.x / TILE), Math.floor(scene.player.y / TILE));
    if (!area) return;
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(236,230,214,0.75)';
    ctx.font = '14px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(area.label, 16, 24);
  }

  // The drawing box for a character whose hitbox is (w, h): the largest box that
  // keeps the atlas frame's aspect AND still fits inside the hitbox, concentric
  // with it. Concentric is a law, not taste — T047 pins the drawn centre to
  // (player - camera) and T012 step 6 samples each body around its centre — and
  // containment keeps a figure from growing into rock it cannot occupy. With no
  // frame loaded the procedural stand-in still paints the whole hitbox, so the
  // stand-in look is unchanged.
  characterBox(name, w, h) {
    const frame = this.frameFor(name);
    if (!frame || !frame.width || !frame.height) return { w, h };
    const s = Math.min(w / frame.width, h / frame.height);
    return { w: frame.width * s, h: frame.height * s };
  }

  drawEnemies(scene) {
    const cam = this.camera;
    const ctx = this.ctx;
    for (const e of scene.enemies) {
      if (e.dead === true || e.alive === false) continue;
      const name = e.sprite ?? e.kind;
      // Loud, not invisible: a kind with no frame is a bug, and a silent skip
      // would hide an enemy from the player (R10, R11).
      if (!SPRITE_NAMES.includes(name)) {
        throw new Error(`Renderer.drawEnemies: enemy kind "${name}" has no sprite name in the contract`);
      }
      this.sceneEnemy = e;
      // e.x/e.y is the hitbox centre, so the aspect-true box hangs from the same
      // point rather than from the hitbox's top-left corner.
      const box = this.characterBox(name, e.w, e.h);
      const x = cam.sx(e.x - box.w / 2);
      const y = cam.sy(e.y - box.h / 2);
      // R11: the creature's own step clock rocks, squashes, drifts and pulses the
      // one painting. The box handed to the seam is still the aspect-true, centred
      // one T038/T047 pin. The transform is NOT clipped to that box, exactly as
      // drawMiner is not: a clip would shear the picture at the box edge, which is
      // the "clipped limbs" R50 forbids, and the amplitudes are small (a couple of
      // px at most), so a body leans a hair over its box rather than losing its
      // back. Containment is a nicety; an un-sheared sprite is a requirement.
      const a = enemyAnim(e);
      const cx = x + box.w / 2;
      const cy = a.pivot === 'feet' ? y + box.h : a.pivot === 'top' ? y : y + box.h / 2;
      ctx.save();
      ctx.translate(cx + a.dx, cy + a.dy);
      ctx.rotate(a.tilt);
      ctx.scale(a.sx, a.sy);
      ctx.translate(-cx, -cy);
      this.drawSprite(name, x, y, box.w, box.h);
      ctx.restore();
    }
    this.sceneEnemy = null;
  }

  drawMiner(scene) {
    const p = scene.player;
    const cam = this.camera;
    // p.y is the miner's FEET, so the hitbox centre is p.y - p.h/2 and the
    // aspect-true box is drawn around that centre (T047's placement law).
    const box = this.characterBox('miner', p.w, p.h);
    const x = cam.sx(p.x - box.w / 2);
    const y = cam.sy(p.y - p.h / 2 - box.h / 2);
    const ctx = this.ctx;
    const a = p.anim ?? NEUTRAL_POSE;
    const dir = p.facing >= 0 ? 1 : -1;
    const cx = x + box.w / 2;
    const feet = y + box.h;
    // The whole cycle is a TRANSFORM of the one atlas frame plus limb parts, so
    // the box handed to the seam stays concentric with the body (T047, T038):
    // flip about the centre, lean and squash about the feet, lift by `bob`.
    ctx.save();
    ctx.translate(cx, feet + a.bob);
    ctx.rotate(a.lean * dir);
    ctx.scale(a.sx * dir, a.sy);
    ctx.translate(-cx, -feet);
    this.drawSprite('miner', x, y, box.w, box.h);
    this.drawMinerLimbs(box, cx, feet, a);
    ctx.restore();
    // The swing arc over the tile being mined (R8): visible proof the mine key
    // is doing something to the grid.
    if (p.mining) {
      const k = clamp(p.mining.t / MINE_TIME, 0, 1);
      const sx = cam.sx(p.mining.x * TILE);
      const sy = cam.sy(p.mining.y * TILE);
      ctx.strokeStyle = `rgba(240,232,210,${(0.25 + 0.45 * (1 - Math.abs(k - 0.5) * 2)).toFixed(3)})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(sx + TILE / 2, sy + TILE / 2, TILE * 0.55, -Math.PI * 0.85 + k * 1.7, -Math.PI * 0.35 + k * 1.7);
      ctx.stroke();
    }
  }

  // Articulated parts painted over the one painting (R9): two legs that alternate
  // with the stride, and the pick arm that drives the strike. They are drawn
  // inside the body's transform, so they flip, lean and squash with it, and they
  // sit clear of the 8x8 body sample T012/T038 read (hips below it, shoulder to
  // one side of it).
  drawMinerLimbs(box, cx, feet, a) {
    const ctx = this.ctx;
    const hipY = feet - box.h * 0.3;
    const hipX = box.w * 0.16;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(52,38,26,0.95)';
    ctx.lineWidth = Math.max(1.6, box.w * 0.16);
    for (const [off, dx] of [[-hipX, a.legL], [hipX, a.legR]]) {
      ctx.beginPath();
      ctx.moveTo(cx + off, hipY);
      ctx.lineTo(cx + off + dx, feet - 1);
      ctx.stroke();
    }
    const shX = cx + box.w * 0.42;
    const shY = feet - box.h * 0.58;
    const th = a.arm;
    const reach = 4 + a.grip;
    const hx = shX + Math.cos(th) * reach;
    const hy = shY + Math.sin(th) * reach;
    ctx.strokeStyle = '#6b5230';
    ctx.lineWidth = Math.max(1.4, box.w * 0.13);
    ctx.beginPath();
    ctx.moveTo(shX, shY);
    ctx.lineTo(hx, hy);
    ctx.stroke();
    const px = Math.cos(th + Math.PI / 2);
    const py = Math.sin(th + Math.PI / 2);
    ctx.strokeStyle = '#b9c2cf';
    ctx.lineWidth = Math.max(1.3, box.w * 0.12);
    ctx.beginPath();
    ctx.moveTo(hx - px * 3, hy - py * 3);
    ctx.lineTo(hx + px * 3, hy + py * 3);
    ctx.stroke();
  }

  // The lantern pool (R6, R17, R20): one rule lives in src/lighting.js, which is
  // also the light list updateEnemies() consumes, so what repels a Wraith is
  // exactly what the player sees. This layer only drives it and keeps the vignette.
  drawLight(scene) {
    const cam = this.camera;
    const ctx = this.ctx;
    const w = cam.w;
    const h = cam.h;
    this.lighting.update(scene.dt ?? STEP, scene.world);
    this.lighting.render(ctx, cam, scene);
    // A mild vignette keeps the frame reading as an illustrated scene rather
    // than a spreadsheet of tiles (R3). It never touches the centre band, which
    // is where the checks sample.
    const vig = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.45, w / 2, h / 2, Math.max(w, h) * 0.78);
    vig.addColorStop(0, 'rgba(6,7,10,0)');
    vig.addColorStop(1, 'rgba(6,7,10,0.34)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, w, h);
  }

  drawBanner(scene) {
    if (!VEILED_STATES.includes(scene.state)) return;
    const text = BANNER[scene.state];
    if (!text) return;
    const ctx = this.ctx;
    const w = this.camera.w;
    const h = this.camera.h;
    ctx.fillStyle = 'rgba(4,6,10,0.72)';
    ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'center';
    ctx.fillStyle = scene.state === 'dead' ? '#e0736a' : scene.state === 'victory' ? '#8fe3c0' : '#f2e9d8';
    ctx.font = 'bold 34px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(text[0], w / 2, h / 2 - 10);
    ctx.fillStyle = 'rgba(232,226,212,0.82)';
    ctx.font = '16px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(text[1], w / 2, h / 2 + 24);
    ctx.textAlign = 'left';
  }
}

const TERRAIN_IDS = Object.freeze([ROCK, WALL, ESSENTIAL, ORE, RARE_ORE, CRYSTAL, DEEP_CRYSTAL]);
const PROP_IDS = Object.freeze([SUPPORT, PUMP, PART, LIFT]);
const PICKUP_IDS = Object.freeze([BATTERY_PICKUP]);

// --- procedural stand-ins ----------------------------------------------------
// Each one paints the whole box it is given, so an atlas frame of the same box
// drops in without changing the scene.
function nuggets(ctx, x, y, w, h, colour, n) {
  ctx.fillStyle = rgb(colour);
  const seed = 11 * n;
  for (let i = 0; i < n; i++) {
    const px = x + ((seed + i * 13) % (w - 10)) + 3;
    const py = y + ((seed + i * 7) % (h - 10)) + 3;
    const s = 5 + ((i * 3) % 4);
    ctx.fillRect(px, py, s, s);
    ctx.fillStyle = rgb(shade(colour, 0.7));
    ctx.fillRect(px, py + s - 1, s, 2);
    ctx.fillStyle = rgb(colour);
  }
}

function shards(ctx, x, y, w, h, colour) {
  ctx.fillStyle = rgb(colour, 0.9);
  for (let i = 0; i < 3; i++) {
    const px = x + 4 + i * ((w - 8) / 3);
    ctx.beginPath();
    ctx.moveTo(px, y + h - 4);
    ctx.lineTo(px + 5, y + 5 + i * 3);
    ctx.lineTo(px + 10, y + h - 4);
    ctx.closePath();
    ctx.fill();
  }
}

const STAND_INS = {
  entrance(r, x, y, w, h) {
    areaBase(r.ctx, PALETTE.entrance, x, y, w, h);
    const ctx = r.ctx;
    // Timber posts and a shaft of daylight from the entrance above.
    ctx.fillStyle = 'rgba(138,96,52,0.20)';
    for (let i = 0; i < w; i += 6 * TILE) ctx.fillRect(x + i + 20, y, 10, h);
    ctx.fillStyle = 'rgba(226,214,180,0.10)';
    ctx.fillRect(x, y, w, Math.min(60, h * 0.25));
  },
  caverns(r, x, y, w, h) {
    areaBase(r.ctx, PALETTE.caverns, x, y, w, h);
    const ctx = r.ctx;
    // Crystal silhouettes hanging off the ceiling of the band.
    ctx.fillStyle = 'rgba(150,232,240,0.16)';
    for (let i = 0; i < w; i += 4 * TILE) {
      const s = 18 + ((i / TILE) % 3) * 9;
      ctx.beginPath();
      ctx.moveTo(x + i + 8, y);
      ctx.lineTo(x + i + 20, y + s);
      ctx.lineTo(x + i + 32, y);
      ctx.closePath();
      ctx.fill();
    }
  },
  flooded(r, x, y, w, h) {
    areaBase(r.ctx, PALETTE.flooded, x, y, w, h);
    const ctx = r.ctx;
    // Pipework and silt: the machinery band reads industrial, not organic.
    ctx.fillStyle = 'rgba(96,150,132,0.18)';
    for (let i = 0; i < w; i += 8 * TILE) ctx.fillRect(x + i, y + 40, 8 * TILE - 20, 8);
    ctx.fillStyle = 'rgba(12,40,50,0.35)';
    ctx.fillRect(x, y + h * 0.7, w, h * 0.3);
  },
  // The base every solid tile sits on. The stand-in shades it by tile id, so a
  // pixel readback still tells rock from ore from bedrock before T022/T038 put a
  // generated rock texture here.
  rock(r, x, y, w, h) {
    const ctx = r.ctx;
    const world = r.scene.world;
    const tx = r.tile.x;
    const ty = r.tile.y;
    const base = TERRAIN_FILL[r.tile.id] ?? PALETTE.rock;
    const area = world.areaOfTile?.(tx, ty) ?? null;
    // The tile's target colour: the ground takes its band's hue, the
    // sprite-bearing ids keep their own gold/crystal fill. The tile id is the
    // cache key, so the lookup costs no string building per tile per frame.
    const tex = area
      ? r.rockTexture(area.id, r.targetFor(VEIN_IDS.has(r.tile.id) ? ROCK : r.tile.id, area.id), VEIN_IDS.has(r.tile.id) ? ROCK : r.tile.id)
      : null;
    if (tex) {
      // The tile's crop of its band's painting, taken at the tile's WORLD pixel:
      // the stone is continuous across tile edges (the 1px gutter is gone) and
      // parallaxes with the band it belongs to.
      paintCrop(ctx, tex, area, tx, ty, x, y, w, h);
      // A vein's own colour, feathered in over that stone (T052).
      if (VEIN_IDS.has(r.tile.id)) r.paintVein(area, r.tile.id, ctx, x, y, w, h);
    } else {
      // No art loaded: the procedural fill still shades by tile id, but it now
      // covers the whole box, so the ground never reads as a grout-lined grid.
      const k = 0.86 + hash2(tx, ty, world.seed) * 0.28;
      ctx.fillStyle = rgb(shade(base, k));
      ctx.fillRect(x, y, w, h);
    }
    // A lit top edge reads as a floor rather than a flat block.
    if (!world.tileSolidAt?.(tx, ty - 1) && !world.isWater?.(tx, ty - 1)) {
      ctx.fillStyle = 'rgba(232,226,212,0.16)';
      ctx.fillRect(x, y, w, 2);
    }
  },
  // The water body, its shimmer, and the surface line on the top row only — so
  // the painted waterline still lands on world.waterSurfaceRow (R21).
  water(r, x, y, w, h) {
    const ctx = r.ctx;
    const world = r.scene.world;
    const tx = r.tile.x;
    const ty = r.tile.y;
    const area = world.areaOfTile?.(tx, ty) ?? null;
    const tex = area ? r.rockTexture(area.id, r.targetFor(WATER, area.id), WATER) : null;
    if (tex) {
      // One continuous body: the tile's crop of its band's painting, tinted
      // toward the band anchor by waterTarget, over the full box — no 1px
      // gutter, no per-tile flat shade (T050, R1/R2/R50).
      paintCrop(ctx, tex, area, tx, ty, x, y, w, h);
    } else {
      // No art loaded: the procedural fill still shades by tile, but covers
      // the whole box so the water never reads as a grout-lined grid.
      const k = 0.94 + hash2(tx, ty, world.seed) * 0.12;
      ctx.fillStyle = rgb(shade(PALETTE.water, k));
      ctx.fillRect(x, y, w, h);
    }
    ctx.fillStyle = 'rgba(190,232,246,0.10)';
    ctx.fillRect(x + 4, y + 6 + ((tx * 7 + ty * 3) % 12), w - 12, 3);
    if (!world.isWater(tx, ty - 1)) {
      ctx.fillStyle = rgb(PALETTE.water_surface, 0.85);
      ctx.fillRect(x, y, w, 3);
    }
  },
  ore(r, x, y, w, h) {
    nuggets(r.ctx, x, y, w, h, PALETTE.ore, 3);
  },
  rare_ore(r, x, y, w, h) {
    nuggets(r.ctx, x, y, w, h, PALETTE.rare_ore, 4);
  },
  crystal(r, x, y, w, h) {
    shards(r.ctx, x, y, w, h, PALETTE.crystal);
  },
  deep_crystal(r, x, y, w, h) {
    shards(r.ctx, x, y, w, h, PALETTE.deep_crystal);
    r.ctx.fillStyle = rgb(PALETTE.deep_crystal, 0.5);
    r.ctx.fillRect(x + w / 2 - 3, y + 2, 6, h - 6);
  },
  battery_cell(r, x, y, w, h) {
    const ctx = r.ctx;
    const bw = 14;
    const bh = 20;
    const bx = x + (w - bw) / 2;
    const by = y + (h - bh) / 2;
    ctx.fillStyle = rgb(shade(PALETTE.battery_cell, 0.55));
    ctx.fillRect(bx - 1, by - 1, bw + 2, bh + 2);
    ctx.fillStyle = rgb(PALETTE.battery_cell);
    ctx.fillRect(bx, by, bw, bh);
    ctx.fillStyle = '#3a4224';
    ctx.fillRect(bx + 2, by + 3, bw - 4, 3);
    ctx.fillStyle = '#cfd6c4';
    ctx.fillRect(bx + 4, by - 3, 6, 3);
  },
  timber(r, x, y, w, h) {
    const ctx = r.ctx;
    ctx.fillStyle = rgb(PALETTE.timber);
    ctx.fillRect(x + 4, y, w - 8, h);
    ctx.fillStyle = rgb(shade(PALETTE.timber, 0.6));
    ctx.fillRect(x + 4, y + 6, w - 8, 2);
    ctx.fillRect(x + 4, y + h - 8, w - 8, 2);
    ctx.fillStyle = rgb(shade(PALETTE.timber, 1.3));
    ctx.fillRect(x + 6, y, 3, h);
  },
  pump(r, x, y, w, h) {
    const ctx = r.ctx;
    ctx.fillStyle = rgb(PALETTE.pump);
    ctx.fillRect(x + 2, y + 8, w - 4, h - 10);
    ctx.fillStyle = rgb(shade(PALETTE.pump, 0.6));
    ctx.fillRect(x + 2, y + 8, w - 4, 3);
    ctx.fillStyle = '#2a3038';
    ctx.fillRect(x + 8, y + 14, 12, 12);
    ctx.fillStyle = '#d8e2e6';
    ctx.fillRect(x + 11, y + 17, 6, 6);
    ctx.fillStyle = rgb(shade(PALETTE.pump, 1.4));
    ctx.fillRect(x + w - 10, y, 6, 10);
  },
  pump_part(r, x, y, w, h) {
    const ctx = r.ctx;
    ctx.fillStyle = rgb(PALETTE.pump_part);
    ctx.fillRect(x + 8, y + 12, w - 16, h - 20);
    ctx.fillStyle = rgb(shade(PALETTE.pump_part, 0.65));
    ctx.fillRect(x + 11, y + 15, 4, 4);
    ctx.fillRect(x + w - 15, y + 15, 4, 4);
    ctx.fillStyle = '#6b5a34';
    ctx.fillRect(x + 13, y + h - 10, w - 26, 3);
  },
  lift(r, x, y, w, h) {
    const ctx = r.ctx;
    ctx.fillStyle = rgb(shade(PALETTE.lift, 0.5));
    ctx.fillRect(x + 2, y, w - 4, h);
    ctx.strokeStyle = rgb(PALETTE.lift);
    ctx.lineWidth = 3;
    ctx.strokeRect(x + 4, y + 3, w - 8, h - 6);
    ctx.beginPath();
    ctx.moveTo(x + 4, y + 3);
    ctx.lineTo(x + w - 4, y + h - 3);
    ctx.moveTo(x + w - 4, y + 3);
    ctx.lineTo(x + 4, y + h - 3);
    ctx.stroke();
    ctx.fillStyle = '#c9d2e0';
    ctx.fillRect(x + w / 2 - 2, y - 6, 4, 8);
  },
  miner(r, x, y, w, h) {
    const ctx = r.ctx;
    const p = r.scenePlayer;
    const walk = p && p.state === 'run' ? Math.sin((p.steps ?? 0) * 0.55) * 3 : 0;
    const hurt = p && p.hurtTimer > 0;
    ctx.fillStyle = '#2b2f3a';
    ctx.fillRect(x + 2, y + 17, 5, 11 + walk);
    ctx.fillRect(x + w - 7, y + 17, 5, 11 - walk);
    ctx.fillStyle = hurt ? '#a4483c' : rgb(PALETTE.miner);
    ctx.fillRect(x + 1, y + 8, w - 2, 10);
    ctx.fillStyle = p && p.lit ? '#ffe6a8' : '#4a4f5c';
    ctx.fillRect(x + (p && p.facing > 0 ? w - 6 : 1), y + 10, 5, 5);
    ctx.fillStyle = rgb(PALETTE.miner_helmet);
    ctx.fillRect(x + 2, y, w - 4, 8);
    ctx.fillStyle = '#3a3f4c';
    ctx.fillRect(x + (p && p.facing > 0 ? w - 8 : 3), y + 3, 5, 3);
    if (p && p.mining) {
      const k = clamp(p.mining.t / MINE_TIME, 0, 1);
      const arm = p.facing > 0 ? x + w - 2 : x - 6;
      ctx.fillStyle = '#6b5230';
      ctx.fillRect(arm, y + 6 - Math.round(k * 4), 8, 3);
      ctx.fillStyle = '#b9c2cf';
      ctx.fillRect(arm + (p.facing > 0 ? 6 : 0), y + 4 - Math.round(k * 4), 3, 7);
    }
  },
  crawler(r, x, y, w, h) {
    const ctx = r.ctx;
    const e = r.sceneEnemy;
    const phase = e?.phase ?? 0;
    ctx.fillStyle = '#2e1a18';
    for (let i = 0; i < 4; i++) {
      const lx = x + 3 + i * (w / 4);
      const sw = Math.sin(phase * 6 + i) * 2;
      ctx.fillRect(lx, y + h - 5, 2, 5 + sw);
    }
    ctx.fillStyle = rgb(shade(PALETTE.crawler, 0.6));
    ctx.fillRect(x + 1, y + h / 2 - 1, w - 2, h / 2);
    ctx.fillStyle = rgb(PALETTE.crawler);
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2, w / 2 - 1, h / 2 - 1, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#3a1114';
    ctx.fillRect(x + w / 2 - 4, y + 3, 3, 2);
    ctx.fillRect(x + w / 2 + 2, y + 3, 3, 2);
    ctx.fillStyle = '#f4e6c8';
    const ex = (e?.dir ?? 1) > 0 ? x + w - 6 : x + 3;
    ctx.fillRect(ex, y + h / 2 - 3, 3, 3);
  },
  wraith(r, x, y, w, h) {
    const ctx = r.ctx;
    const e = r.sceneEnemy;
    const bob = Math.sin((e?.phase ?? 0) * 3) * 2;
    ctx.fillStyle = rgb(PALETTE.wraith, 0.35);
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2 + bob, w / 2 + 3, h / 2 + 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = rgb(PALETTE.wraith, 0.9);
    ctx.beginPath();
    ctx.moveTo(x + 2, y + h - 2);
    ctx.lineTo(x + 2, y + h / 2);
    ctx.quadraticCurveTo(x + w / 2, y - 4 + bob, x + w - 2, y + h / 2);
    ctx.lineTo(x + w - 2, y + h - 2);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#22304a';
    ctx.fillRect(x + w / 2 - 5, y + h / 2 - 2, 4, 4);
    ctx.fillRect(x + w / 2 + 2, y + h / 2 - 2, 4, 4);
  },
};

function areaBase(ctx, base, x, y, w, h) {
  const g = ctx.createLinearGradient(0, y, 0, y + h);
  g.addColorStop(0, rgb(shade(base, 1.15)));
  g.addColorStop(1, rgb(shade(base, 0.85)));
  ctx.fillStyle = g;
  ctx.fillRect(x, y, w, h);
}
