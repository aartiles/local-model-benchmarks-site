// src/enemies.js — the two enemy types (R10, R11, R12) and the layer that
// spawns, moves and hurts with them.
//
// The types differ in the two ways R10 asks for. Visually they carry different
// sprite names for the atlas (T021/T022 draw `crawler` and `wraith`); behaviourally
// one is a ground animal and the other is a floating thing:
//
//   Crawler — walks its floor under gravity, turns at walls and ledges, and only
//             takes an interest in the miner when he shares that floor (within a
//             tile of its feet line). Then it charges. Damage is a bite on
//             contact, with a cooldown, so contact is a wound and not a drain.
//   Wraith  — no gravity: it drifts through open air toward the miner, bobbing.
//             Inside its radius it drains the lantern AND the miner, and it
//             retreats from the bright core of a lantern light, which is what
//             makes the light (T013) a defence rather than decoration.
//
// Both integrate velocity against the tile grid every fixed step, so nothing here
// can teleport: the check measures per-step displacement.
//
// Damage rule (R20): every hurt/drain happens inside DANGER_ENEMY_DIST, which
// config keeps strictly smaller than LOW_ENEMY_DIST, so the proximity warning
// always fires before the first bite. `updateEnemies` writes that warning by
// calling player.setThreat() with the distance to the nearest live enemy.

import { TILE, STEP, GRAVITY, DANGER_ENEMY_DIST, LOW_ENEMY_DIST } from './config.js';
import { MAX_FALL } from './player.js';
import { WATER } from './tiles.js';
import { Rng } from './rng.js';

export const CRAWLER = 'crawler';
export const WRAITH = 'wraith';

// The only range at which an enemy may hurt the miner (R20).
export const BITE_RANGE = DANGER_ENEMY_DIST;

// Fraction of a light's radius that counts as its bright core, and how bright a
// light must be to repel. T013's LightSystem returns [{x, y, radius, intensity}];
// anything with that shape works here, so the two modules stay decoupled.
export const CORE_FRACTION = 0.55;
export const CORE_MIN_INTENSITY = 0.35;

// Per-type tuning. `sprite` is the atlas name the renderer will look up.
export const ENEMY = {
  [CRAWLER]: {
    sprite: 'crawler',
    w: 26,
    h: 16,
    health: 30,
    patrol: 55, // px/s on its own round
    charge: 150, // px/s toward a miner on the same floor — slower than MOVE_SPEED
    sight: 240, // px of floor it will notice him across
    bite: 8, // hp per bite
    biteEvery: 0.55, // s between bites
  },
  [WRAITH]: {
    sprite: 'wraith',
    w: 22,
    h: 24,
    health: 18,
    drift: 70, // px/s while it wanders near its home pocket
    hunt: 95, // px/s toward the miner
    sight: 220,
    drain: 6, // lantern % per second inside its radius
    bite: 5, // hp per touch
    biteEvery: 0.8,
    bob: 18, // px/s of vertical float, so it is never quite still
  },
};

// --- animation (R11) ---------------------------------------------------------
// The atlas carries exactly ONE frame per enemy (R42/R51 forbid more), so the
// cycle is DERIVED: a pose that is a pure function of the creature's own step
// clock, which src/render.js applies as a transform of that one painting. The
// period is a whole number of fixed steps, so the same step count always paints
// the same pixels and a cycle repeats exactly — the same law T023 proves for the
// miner. The two types move differently on purpose: the Crawler rocks and squashes
// through a low step cycle about its feet, the Wraith drifts up and down inside its
// box and pulses. Neither touches the hitbox, the behaviour rules, or the drawn
// box's centre and aspect (T038/T047): the transform is clipped to that box.
export const CRAWLER_HZ = 3.75; // leg cycles per second while it walks
export const WRAITH_HZ = 1.5; // drift/pulse cycles per second
export const CRAWLER_CYCLE = Math.round(1 / (CRAWLER_HZ * STEP)); // sim steps per cycle
export const WRAITH_CYCLE = Math.round(1 / (WRAITH_HZ * STEP));
export const CYCLE = { [CRAWLER]: CRAWLER_CYCLE, [WRAITH]: WRAITH_CYCLE };

// Amplitudes, in px and radians, all measured against the drawn box the renderer
// already hands the seam (crawler 26x11.35, wraith 10.94x24).
export const ANIM = {
  [CRAWLER]: { tilt: 0.16, sx: 0.06, sy: -0.06, hop: 1.1, dx: 0 },
  [WRAITH]: { tilt: 0, sx: 0.05, sy: 0.05, hop: 0, dx: 0.7, drift: 3.2 },
};

// What a creature with no clock yet looks like: the neutral stance, so nothing
// moves. src/render.js falls back to this rather than inventing a pose of its own.
export const NEUTRAL_ANIM = Object.freeze({
  tilt: 0, sx: 1, sy: 1, dx: 0, dy: 0, pivot: 'centre',
});

const TAU = Math.PI * 2;

// The pose for one creature at one instant. Pure in (kind, state, steps, vx), so
// two renders of the same frame are byte-identical — which is what lets T012 and
// T038 keep sampling the picture without seeing a cycle.
export function enemyAnim(enemy) {
  const kind = enemy.kind;
  const a = ANIM[kind];
  if (!a) return { ...NEUTRAL_ANIM };
  const period = CYCLE[kind];
  const psi = ((enemy.steps % period) / period) * TAU;
  const s = Math.sin(psi);
  const c = Math.cos(psi);
  // A creature that is not actually walking does not stamp its legs: the Wraith
  // keeps floating (it is never quite still), the Crawler settles to a breath.
  const amp = kind === CRAWLER ? (Math.abs(enemy.vx) > 1 ? 1 : 0.25) : 1;
  if (kind === CRAWLER) {
    return {
      tilt: a.tilt * s * amp,
      sx: 1 + a.sx * c * amp,
      sy: 1 + a.sy * c * amp,
      dx: a.dx * c,
      dy: -a.hop * (1 - c),
      pivot: 'feet',
    };
  }
  return {
    tilt: 0,
    sx: 1 + a.sx * Math.sin(2 * psi),
    sy: 1 + a.sy * Math.sin(2 * psi),
    dx: a.dx * c,
    dy: a.drift * s,
    pivot: 'centre',
  };
}

// How many of each the seeded spawner places, and the spacing rules that keep a
// fresh run survivable (R20: the player must see an enemy before it sees him).
export const COUNTS = { [CRAWLER]: 5, [WRAITH]: 4 };
export const SPAWN_SAFE = 8 * TILE; // px from the miner's spawn no enemy starts inside
export const ENEMY_SPACING = 5 * TILE; // px between two enemies' spawn points

const EPS = 1e-6;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// The miner's body centre, which is what distances are measured from. Player.y is
// his feet, so the centre is half a body above it.
function center(player) {
  return { x: player.x, y: player.y - (player.h ?? 28) / 2 };
}

export class Enemy {
  constructor(kind, x, y) {
    const t = ENEMY[kind];
    if (!t) throw new Error(`unknown enemy type "${kind}"`);
    this.kind = kind;
    this.sprite = t.sprite;
    this.x = x; // body centre, px
    this.y = y;
    this.home = { x, y }; // where it was spawned: patrol anchor and retreat anchor
    this.w = t.w;
    this.h = t.h;
    this.vx = 0;
    this.vy = 0;
    this.dir = 1;
    this.health = t.health;
    this.maxHealth = t.health;
    this.alive = true;
    this.dead = false; // mirrors !alive for the HUD/defeat layer (T011)
    this.state = 'idle';
    this.onGround = false;
    this.phase = 0; // seconds since spawn (pre-existing; behaviour rules read it)
    this.steps = 0; // animation clock (R11): src/render.js derives the pose from this
    this.bumps = 0;
    this.bites = 0;
    this.biteTimer = 0;
    this.stolen = 0; // lantern % this wraith has drained
    this.lastBite = null;
  }

  box(x = this.x, y = this.y) {
    const hw = this.w / 2;
    const hh = this.h / 2;
    return { left: x - hw, right: x + hw, top: y - hh, bottom: y + hh };
  }

  // Distance from this body's centre to the miner's centre (px).
  distTo(player) {
    const p = center(player);
    return Math.hypot(p.x - this.x, p.y - this.y);
  }

  // Grid collision, the same axis-separated flush stop the miner uses (R3): an
  // enemy never penetrates rock and never jumps a tile in one step.
  overlapsSolid(world, x = this.x, y = this.y) {
    const b = this.box(x, y);
    const x0 = Math.floor(b.left / TILE);
    const x1 = Math.floor((b.right - EPS) / TILE);
    const y0 = Math.floor(b.top / TILE);
    const y1 = Math.floor((b.bottom - EPS) / TILE);
    for (let ty = y0; ty <= y1; ty++) {
      for (let tx = x0; tx <= x1; tx++) {
        if (world.tileSolidAt(tx, ty)) return true;
      }
    }
    return false;
  }

  moveX(world, dx) {
    if (!dx) return true;
    const nx = this.x + dx;
    if (!this.overlapsSolid(world, nx, this.y)) {
      this.x = nx;
      return true;
    }
    const hw = this.w / 2;
    const cx =
      dx > 0
        ? Math.floor((nx + hw) / TILE) * TILE - hw
        : (Math.floor((nx - hw) / TILE) + 1) * TILE + hw;
    if (!this.overlapsSolid(world, cx, this.y)) this.x = cx;
    this.vx = 0;
    this.bumps += 1;
    return false;
  }

  moveY(world, dy) {
    if (!dy) return true;
    const ny = this.y + dy;
    if (!this.overlapsSolid(world, this.x, ny)) {
      this.y = ny;
      this.onGround = false;
      return true;
    }
    const hh = this.h / 2;
    const cy =
      dy > 0
        ? Math.floor((ny + hh) / TILE) * TILE - hh // rest on the floor below
        : (Math.floor((ny - hh) / TILE) + 1) * TILE + hh; // stop under the ceiling
    if (!this.overlapsSolid(world, this.x, cy)) this.y = cy;
    if (dy > 0) this.onGround = true;
    this.vy = 0;
    this.bumps += 1;
    return false;
  }

  // Is the miner standing on this creature's floor line? (Crawler rule.)
  sharesFloor(player) {
    return Math.abs(player.y - (this.y + this.h / 2)) <= TILE;
  }

  // Rest the body exactly on top of the tile floor at (tx, ty).
  settle(world, tx, ty) {
    this.x = tx * TILE + TILE / 2;
    this.y = (ty + 1) * TILE - this.h / 2;
    this.home = { x: this.x, y: this.y };
    this.onGround = true;
    return this;
  }

  float(tx, ty) {
    this.x = tx * TILE + TILE / 2;
    this.y = ty * TILE + TILE / 2;
    this.home = { x: this.x, y: this.y };
    return this;
  }

  // Shared by both types: the animation clock (R11) and the bite cooldown. The
  // clock advances here, on the same step that moves the body, and src/render.js
  // turns it into a pose with enemyAnim() — so two renders of one frame agree,
  // which is what lets T012/T038 keep sampling the picture without seeing a cycle.
  tick(dt) {
    this.phase += dt;
    this.steps += 1;
    if (this.biteTimer > 0) this.biteTimer = Math.max(0, this.biteTimer - dt);
  }

  // One bite, if the cooldown has run out. Returns true when it landed.
  bite(player, damage) {
    if (this.biteTimer > 0 || player.dead === true) return false;
    player.hurt(damage);
    this.bites += 1;
    this.biteTimer = ENEMY[this.kind].biteEvery;
    this.lastBite = { at: this.steps, damage };
    return true;
  }

  // Plain cloneable data for window.__digger and the HUD (T014).
  snapshot() {
    return {
      kind: this.kind,
      sprite: this.sprite,
      x: this.x,
      y: this.y,
      vx: this.vx,
      vy: this.vy,
      state: this.state,
      alive: this.alive,
      dead: this.dead,
      health: this.health,
      maxHealth: this.maxHealth,
      onGround: this.onGround,
      phase: this.phase,
      steps: this.steps,
      bites: this.bites,
      stolen: this.stolen,
    };
  }
}

// --- Crawler: a ground animal ------------------------------------------------
export class Crawler extends Enemy {
  constructor(x, y) {
    super(CRAWLER, x, y);
    this.state = 'patrol';
  }

  update(dt, world, player) {
    const t = ENEMY[CRAWLER];
    this.tick(dt);

    // It only cares about the miner when he is on the same floor: a miner on the
    // ledge above is not prey, he is just in the way of nothing.
    const near = this.sharesFloor(player) && Math.abs(center(player).x - this.x) <= t.sight;
    const charging = near && player.dead !== true;
    this.state = charging ? 'charge' : 'patrol';
    if (charging) this.dir = center(player).x >= this.x ? 1 : -1;

    const speed = charging ? t.charge : t.patrol;
    this.vx = this.dir * speed;
    this.vy = Math.min(this.vy + GRAVITY * dt, MAX_FALL);

    // Patrol turn-around: a wall at body height, or no floor one step ahead.
    if (!charging) {
      const ahead = this.x + this.dir * (this.w / 2 + 6);
      if (world.solidAt(ahead, this.y) || !world.solidAt(ahead, this.y + this.h / 2 + 4)) {
        this.dir = -this.dir;
        this.vx = this.dir * speed;
      }
    }

    if (!this.moveX(world, this.vx * dt) && !charging) this.dir = -this.dir;
    this.moveY(world, this.vy * dt);

    // Contact damage (R12), only inside the warned-about range.
    if (this.distTo(player) <= BITE_RANGE) this.bite(player, t.bite);
  }
}

// --- Wraith: a floating thing ------------------------------------------------
export class Wraith extends Enemy {
  constructor(x, y) {
    super(WRAITH, x, y);
    this.state = 'drift';
  }

  // The bright core of the nearest light covering this body, or null. Lights come
  // from T013's LightSystem; a missing list simply means no lantern to fear.
  repelledBy(lights) {
    if (!lights || lights.length === 0) return null;
    let best = null;
    for (const l of lights) {
      if (!l || !Number.isFinite(l.radius)) continue;
      const intensity = l.intensity === undefined ? 1 : l.intensity;
      if (intensity < CORE_MIN_INTENSITY) continue;
      const core = l.radius * CORE_FRACTION;
      const d = Math.hypot(l.x - this.x, l.y - this.y);
      if (d <= core && (best === null || d < best.d)) best = { d, x: l.x, y: l.y };
    }
    return best;
  }

  update(dt, world, player, lights) {
    const t = ENEMY[WRAITH];
    this.tick(dt);
    const p = center(player);
    const dist = this.distTo(player);
    const core = this.repelledBy(lights);

    let ux;
    let uy;
    if (core) {
      // Back off from the lantern's bright core, straight away from the light.
      this.state = 'retreat';
      const dx = this.x - core.x;
      const dy = this.y - core.y;
      const m = Math.hypot(dx, dy) || 1;
      ux = dx / m;
      uy = dy / m;
      this.vx = ux * t.hunt;
      this.vy = uy * t.hunt;
    } else if (dist <= t.sight && player.dead !== true) {
      this.state = 'hunt';
      const m = dist || 1;
      ux = (p.x - this.x) / m;
      uy = (p.y - this.y) / m;
      this.vx = ux * t.hunt;
      // A float on top of the approach, so it is visibly alive even when it is
      // pressed against a ceiling.
      this.vy = uy * t.hunt * 0.6 + Math.sin(this.phase * 2.4) * t.bob;
    } else {
      // Idle drift around the pocket it was spawned in: never quite still.
      this.state = 'drift';
      this.vx = Math.cos(this.phase * 0.9) * t.drift * 0.6;
      this.vy = Math.sin(this.phase * 1.3) * t.drift * 0.5;
      const hx = this.home.x - this.x;
      const hy = this.home.y - this.y;
      if (Math.hypot(hx, hy) > 3 * TILE) {
        this.vx += (hx / Math.hypot(hx, hy)) * t.drift;
        this.vy += (hy / Math.hypot(hx, hy)) * t.drift;
      }
    }

    // Floating: blocked by rock, but never pulled down by it.
    if (!this.moveX(world, this.vx * dt)) this.vx = 0;
    if (!this.moveY(world, this.vy * dt)) this.vy = 0;

    // Inside its radius it drains the lantern and touches the miner (R12, R17).
    if (this.state !== 'retreat' && dist <= BITE_RANGE && player.dead !== true) {
      const before = player.battery;
      player.setBattery(player.battery - t.drain * dt);
      this.stolen += before - player.battery;
      this.bite(player, t.bite);
    }
  }
}

export const TYPES = { [CRAWLER]: Crawler, [WRAITH]: Wraith };

// --- spawning ----------------------------------------------------------------
// Candidate tiles, scanned in a fixed order so the RNG stream is the only source
// of choice (R27/R62: the same seed must give the same monsters in the same
// places). Crawlers want a floor with headroom; wraiths want open air.
function candidates(world, kind) {
  const out = [];
  for (let y = 1; y < world.height - 1; y++) {
    for (let x = 1; x < world.width - 1; x++) {
      if (world.at(x, y) === WATER) continue;
      if (world.tileSolidAt(x, y)) continue;
      if (kind === CRAWLER) {
        if (!world.tileSolidAt(x, y + 1)) continue;
        if (world.tileSolidAt(x, y - 1) || world.tileSolidAt(x, y - 2)) continue;
      } else {
        if (world.tileSolidAt(x, y + 1) || world.tileSolidAt(x, y - 1)) continue;
        if (world.tileSolidAt(x - 1, y) || world.tileSolidAt(x + 1, y)) continue;
      }
      out.push({ x, y });
    }
  }
  return out;
}

// Tile-space distance, so the spacing rule reads in tiles wherever it is used.
function tooClose(x, y, placed, minTiles) {
  for (const p of placed) {
    if (Math.hypot(p.x - x, p.y - y) < minTiles) return true;
  }
  return false;
}

// Place the two types from the seeded stream and attach the list to the world,
// which is what updateEnemies() reads when it is not given an explicit list.
export function spawnEnemies(world, rng = new Rng(world.seed || 1)) {
  const r = rng instanceof Rng ? rng : new Rng(rng);
  const spawn = world.point('spawn') ?? { x: 3, y: 3 };
  const spawnPx = { x: spawn.x * TILE + TILE / 2, y: spawn.y * TILE + TILE / 2 };
  const enemies = [];
  const placed = [];

  for (const kind of [CRAWLER, WRAITH]) {
    const pool = candidates(world, kind);
    // Deterministic Fisher-Yates over the scan order.
    for (let i = pool.length - 1; i > 0; i--) {
      const j = r.int(0, i);
      const tmp = pool[i];
      pool[i] = pool[j];
      pool[j] = tmp;
    }
    let made = 0;
    for (const c of pool) {
      if (made >= COUNTS[kind]) break;
      const px = c.x * TILE + TILE / 2;
      const py = c.y * TILE + TILE / 2;
      if (Math.hypot(px - spawnPx.x, py - spawnPx.y) < SPAWN_SAFE) continue;
      if (tooClose(c.x, c.y, placed, ENEMY_SPACING / TILE)) continue;
      const e = new TYPES[kind](px, py);
      if (kind === CRAWLER) e.settle(world, c.x, c.y);
      placed.push({ x: c.x, y: c.y });
      enemies.push(e);
      made += 1;
    }
  }

  world.enemies = enemies;
  return enemies;
}

// --- the per-step layer ------------------------------------------------------
// Moves every live enemy, then reports the nearest one to the miner so the R20
// proximity warning is written by the thing that can actually hurt him.
export function updateEnemies(dt, world, player, lights, enemies = world.enemies ?? []) {
  let nearest = null;
  for (const e of enemies) {
    if (!e || !e.alive) continue;
    e.update(dt, world, player, lights);
    const d = e.distTo(player);
    if (nearest === null || d < nearest.d) nearest = { d, kind: e.kind };
  }
  // Only report a threat that is close enough to be worth warning about, so a
  // monster on the far side of the map cannot light the HUD forever.
  player.setThreat(nearest && nearest.d <= LOW_ENEMY_DIST ? nearest.d : null, nearest?.kind);
  return enemies;
}

// Hurt or kill one enemy (R12: the miner can defeat them). Returns plain data so
// the caller can play a sound and show a number without reading the object.
export function damageEnemy(enemy, n = 1) {
  if (!enemy || typeof enemy !== 'object') return { ok: false, reason: 'no-enemy', damage: 0 };
  const damage = Math.max(0, Number(n) || 0);
  if (!enemy.alive) return { ok: false, reason: 'already-dead', damage: 0, health: 0, dead: true };
  enemy.health = clamp(enemy.health - damage, 0, enemy.maxHealth);
  enemy.hits = (enemy.hits ?? 0) + 1;
  enemy.lastHit = { damage, health: enemy.health, at: enemy.steps };
  if (enemy.health <= 0) {
    enemy.alive = false;
    enemy.dead = true;
    enemy.state = 'dead';
    enemy.vx = 0;
    enemy.vy = 0;
  }
  return { ok: true, kind: enemy.kind, damage, health: enemy.health, dead: !enemy.alive };
}
