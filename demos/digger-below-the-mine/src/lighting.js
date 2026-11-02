// src/lighting.js — the moving lantern, the warm/cold light of each area, and the
// dust that drifts through its beam (R6, R20).
//
// ONE intensity rule lives here. `playerLight(player)` is the data the lantern is
// drawn from AND the data `updateEnemies(dt, world, player, lights)` consumes
// (T010/T036), so what repels a Wraith is exactly what the player sees. A card
// that wants a brighter lamp changes these numbers; it must not write a second
// rule somewhere else.
//
// Everything here is canvas screen-space paint over the tile grid. It never
// touches a tile id: the grid in src/world.js stays the truth for collision and
// mining (R3). Dust is seeded from src/rng.js, so a frame is reproducible and no
// Math.random() is ever called.

import { TILE, WORLD, MAX_BATTERY, LOW_BATTERY } from './config.js';
import { CORE_FRACTION, CORE_MIN_INTENSITY } from './enemies.js';
import { Rng } from './rng.js';

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const rgba = (c, a) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${Math.max(0, a).toFixed(3)})`;
const mix = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];

export const LIGHT = Object.freeze({
  radiusMin: 150, // px of light at a dying charge
  radiusMax: 330, // px of light at a full charge
  core: CORE_FRACTION, // fraction of the radius that is the bright core (T010's rule)
  minIntensity: CORE_MIN_INTENSITY, // a lit lantern always repels; an unlit one never does
  peakAlpha: 0.3, // warm core opacity at full intensity
  rimAlpha: 0.14, // cold rim opacity, the other half of the warm/cold contrast
  darkAlpha: 0.03, // the lamp is off: a bare hand's worth of light
  darkRadius: 30,
  // Low-battery flicker (R20: the warning is visible). The flame's multiplier
  // swings between this value and 1, so 0.78 means it dips to 78% brightness
  // at the trough of each gutter.
  gutter: 0.78,
});

// The mine as painted: dust is seeded inside these bounds, so no mote starts
// outside the world waiting for its first wrap.
const WORLD_PX = Object.freeze({ w: WORLD.width * TILE, h: WORLD.height * TILE });

// Warm/cold balance per band (R6). `warm` is the colour of the core the miner
// carries, `cold` the colour of the rim his lamp throws against the far rock, and
// `mix` how much of the cold the area itself adds to the core — the timbered
// entrance burns amber, the crystal and flooded bands go blue-green.
export const AREA_LIGHT = Object.freeze({
  entrance: { warm: [255, 198, 116], cold: [104, 122, 158], mix: 0.0 },
  caverns: { warm: [250, 208, 158], cold: [126, 148, 236], mix: 0.5 },
  flooded: { warm: [240, 216, 186], cold: [110, 206, 248], mix: 1.0 },
});
export const DEFAULT_AREA = AREA_LIGHT.caverns;

// The one light the miner carries. `lit` is `lantern && battery > 0` (T007); a
// dead lamp keeps only `LIGHT.darkRadius` of hand-held glow and returns
// intensity 0, which is what stops a Wraith being repelled (T010) and what makes
// the pool on screen vanish.
export function playerLight(player) {
  const charge = clamp((player?.battery ?? 0) / MAX_BATTERY, 0, 1);
  const lit = player?.lit === true;
  return {
    x: player?.x ?? 0,
    y: (player?.y ?? 0) - (player?.h ?? 28) / 2,
    radius: lit ? LIGHT.radiusMin + (LIGHT.radiusMax - LIGHT.radiusMin) * charge : LIGHT.darkRadius,
    intensity: lit ? LIGHT.minIntensity + (1 - LIGHT.minIntensity) * charge : 0,
    charge,
    lit,
    guttering: lit && (player?.battery ?? 0) <= LOW_BATTERY,
  };
}

// --- atmosphere dust ---------------------------------------------------------
export const DUST = Object.freeze({
  count: 140, // the pool is fixed: the count never grows (R6 "bounded"). 90 read
  // as an empty mine — at 140 a lantern pool catches 6-11 motes, which is what
  // "dust in the beam" has to look like in a still frame.
  driftMin: 5,
  driftMax: 19, // px/s of lazy current
  sizeMin: 1,
  sizeMax: 2.6,
  alphaMax: 0.5,
});

// A fixed pool of motes in WORLD pixels. They drift on their own seeded current
// and wrap around the mine, so the field is always full without ever allocating.
export class Dust {
  constructor(seed = 1337, count = DUST.count, bounds = WORLD_PX) {
    this.seed = seed;
    this.count = Math.max(0, count | 0);
    this.enabled = true;
    this.t = 0;
    this.bounds = { w: bounds?.w || WORLD_PX.w, h: bounds?.h || WORLD_PX.h };
    this.rng = new Rng(seed);
    this.particles = [];
    for (let i = 0; i < this.count; i++) {
      const r = this.rng;
      this.particles.push({
        x: r.range(0, 1) * this.bounds.w,
        y: r.range(0, 1) * this.bounds.h,
        size: r.range(DUST.sizeMin, DUST.sizeMax),
        speed: r.range(DUST.driftMin, DUST.driftMax),
        sway: r.range(0.25, 1.4),
        phase: r.range(0, Math.PI * 2),
        fall: r.range(-4, 7),
        bright: r.range(0.35, 1),
      });
    }
  }

  // dt in seconds; bounds is the world's pixel size, so a mote that drifts out of
  // the mine comes back on the other side instead of thinning the field. The
  // modulo also folds in any mote seeded outside a smaller level.
  update(dt, bounds = WORLD_PX) {
    this.t += dt;
    const w = bounds?.w || WORLD_PX.w;
    const h = bounds?.h || WORLD_PX.h;
    for (const p of this.particles) {
      p.x = (((p.x + Math.sin(this.t * p.sway + p.phase) * p.speed * dt) % w) + w) % w;
      p.y = (((p.y + p.fall * dt) % h) + h) % h;
    }
    return this;
  }

  get live() {
    return this.particles.length;
  }

  positions() {
    return this.particles.map((p) => ({ x: p.x, y: p.y }));
  }

  // Only the motes the lantern actually reaches are painted (R6): dust in a dark
  // mine is invisible, and it keeps the far field clean for pixel readback.
  draw(ctx, cam, light, colour) {
    if (!this.enabled || light.intensity <= 0) return 0;
    const r = light.radius;
    let seen = 0;
    for (const p of this.particles) {
      const sx = p.x - cam.x;
      const sy = p.y - cam.y;
      if (sx < -4 || sy < -4 || sx > cam.w + 4 || sy > cam.h + 4) continue;
      const d = Math.hypot(p.x - light.x, p.y - light.y);
      if (d > r) continue;
      const near = 1 - d / r;
      const a = DUST.alphaMax * p.bright * near * light.intensity;
      if (a < 0.02) continue;
      ctx.fillStyle = rgba(colour, a);
      ctx.beginPath();
      ctx.arc(sx, sy, p.size, 0, Math.PI * 2);
      ctx.fill();
      seen++;
    }
    return seen;
  }
}

// --- the light system --------------------------------------------------------
export class LightSystem {
  constructor({ dust = new Dust() } = {}) {
    this.dust = dust;
    this.t = 0;
    this.last = { drawn: 0, radius: 0, intensity: 0, area: 'caverns' };
  }

  // THE light list updateEnemies() consumes (T010, T036). It always holds the
  // miner's light, lit or not, so the list shape never changes; an unlit lamp
  // carries intensity 0, and repelledBy() skips anything below
  // CORE_MIN_INTENSITY, so a dark miner repels nothing. `world` is accepted
  // because T036 calls it with the world; the area colour is chosen at paint
  // time, not here.
  lights(player, world = null) {
    return [playerLight(player)];
  }

  areaFor(world, x, y) {
    const a = world?.areaOfTile?.(Math.floor(x / TILE), Math.floor(y / TILE));
    return AREA_LIGHT[a?.id] ?? DEFAULT_AREA;
  }

  update(dt, world) {
    this.t += dt;
    this.dust.update(dt, world?.pixelBounds);
    return this;
  }

  // Paint the pool, its cold rim, the low-battery gutter and the lit dust.
  // (ctx, cam, scene) — the scene is the plain-data view from buildScene().
  render(ctx, cam, scene) {
    const p = scene.player;
    const light = playerLight(p);
    const area = this.areaFor(scene.world, p.x, p.y);
    const mx = p.x - cam.x;
    const my = p.y - cam.y - p.h / 2;
    const r = light.radius;
    this.last = { drawn: 0, radius: r, intensity: light.intensity, area: scene.world?.areaOfTile?.(Math.floor(p.x / TILE), Math.floor(p.y / TILE))?.id ?? 'caverns' };

    if (!light.lit) {
      const g = ctx.createRadialGradient(mx, my, 0, mx, my, r);
      g.addColorStop(0, rgba(AREA_LIGHT.entrance.warm, LIGHT.darkAlpha));
      g.addColorStop(1, rgba(AREA_LIGHT.entrance.warm, 0));
      ctx.fillStyle = g;
      ctx.fillRect(mx - r, my - r, r * 2, r * 2);
      return this.last;
    }

    // A dying charge gutters the flame (R20): the pool visibly shrinks and
    // strobes before the lamp goes out for good. A healthy lamp is steady.
    const flicker = light.guttering
      ? LIGHT.gutter + (1 - LIGHT.gutter) * Math.sin(this.t * 11 + Math.sin(this.t * 4.3))
      : 1;
    const core = mix(area.warm, area.cold, area.mix * 0.7);
    const rim = area.cold;
    const a0 = LIGHT.peakAlpha * light.intensity * flicker;

    const glow = ctx.createRadialGradient(mx, my, 0, mx, my, r);
    glow.addColorStop(0, rgba(core, a0));
    glow.addColorStop(clamp(LIGHT.core, 0.05, 0.9), rgba(core, a0 * 0.45));
    glow.addColorStop(1, rgba(rim, 0));
    ctx.fillStyle = glow;
    ctx.fillRect(mx - r, my - r, r * 2, r * 2);

    // The cold rim: the same lamp throws blue against the rock it cannot reach,
    // which is the warm/cold contrast R6 asks for.
    const rr = r * 1.18;
    const band = ctx.createRadialGradient(mx, my, r * LIGHT.core, mx, my, rr);
    band.addColorStop(0, rgba(rim, 0));
    band.addColorStop(0.7, rgba(rim, LIGHT.rimAlpha * light.intensity * flicker));
    band.addColorStop(1, rgba(rim, 0));
    ctx.fillStyle = band;
    ctx.fillRect(mx - rr, my - rr, rr * 2, rr * 2);

    if (light.guttering) {
      const wr = r * 0.6 * flicker;
      const warn = ctx.createRadialGradient(mx, my, 0, mx, my, wr);
      warn.addColorStop(0, 'rgba(255,120,90,0.22)');
      warn.addColorStop(1, 'rgba(255,120,90,0)');
      ctx.fillStyle = warn;
      ctx.fillRect(mx - wr, my - wr, wr * 2, wr * 2);
    }

    this.last.drawn = this.dust.draw(ctx, cam, light, core);
    return this.last;
  }
}
