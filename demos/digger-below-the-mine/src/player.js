// src/player.js — the one controllable miner (R7): locomotion state machine,
// gravity, tile collision against the world grid (R3), the mining action that
// opens routes through rock and banks its ore (R8, R13, R16), and the survival
// layer that keeps him alive: lantern battery (R17), health (R18), battery
// cells (R19) and the warnings that precede every danger (R20).
//
// Position convention: `x` is the centre of the body, `y` is the FEET (the
// bottom edge), in CSS pixels. The grid grows downward, so up is negative vy.
// The body is smaller than one tile so the miner fits the 1-tile passages the
// authored map carves.
//
// Deliberately small: mining (T006), health/battery (T007) and animation frames
// (T023) add their own methods here rather than growing this step function.

import {
  TILE,
  GRAVITY,
  MOVE_SPEED,
  JUMP_V,
  MINE_TIME,
  STEP,
  MAX_HEALTH,
  MAX_BATTERY,
  BATTERY_DRAIN,
  LOW_BATTERY,
  LOW_HEALTH,
  LOW_ENEMY_DIST,
  PICKUP_CHARGE,
} from './config.js';
import { isDiggable, BATTERY_PICKUP } from './tiles.js';

// Body box in pixels: 18 x 28 inside a 32 px tile.
export const BODY = { w: 18, h: 28 };

// Terminal fall speed, so a long shaft cannot build up a penetration the
// collision step cannot resolve (max step travel stays well under one tile).
export const MAX_FALL = 1250;

// How far in front of the miner one swing reaches, in tiles.
export const MINE_REACH = 1;

// Seconds the miner visibly reels after a hit (visual only; the damage is
// applied at once). T014/T023 may read `hurtTimer` to flash or animate.
export const HURT_FLASH = 0.35;

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// Idle states the animation layer (T023) keys its frames off.
export const STATES = ['idle', 'run', 'jump', 'mine', 'fall'];

// --- animation layer (T023, R9) ----------------------------------------------
// The atlas holds exactly ONE miner frame, so the cycle is derived rather than
// loaded: a stride clock drives transforms (bob, lean, squash-and-stretch, the
// facing flip) and articulated limb parts that src/render.js paints over the one
// painting. The pose is a PURE function of (state, runPhase, mining.t) and the
// stride period is a whole number of fixed steps, so the same phase always paints
// the same pixels and a run cycle repeats exactly every RUN_CYCLE steps.
export const RUN_HZ = 5; // stride cycles per second while running
export const RUN_CYCLE = Math.round(1 / (RUN_HZ * STEP)); // sim steps per cycle

const EPS = 1e-6;

export class Player {
  constructor(world = null) {
    this.w = BODY.w;
    this.h = BODY.h;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.facing = 1;
    this.onGround = false;
    this.state = 'fall';
    this.steps = 0;
    this.jumps = 0;
    this.bumps = 0; // times a step was stopped by solid rock
    // Mining (T006) and the ore it banks (R13). `dug` records every tile the
    // miner destroyed, which is what proves a route was mined (R16).
    this.ore = 0;
    this.dug = [];
    this.digs = 0;
    this.lastDig = null;
    this.mining = null; // { x, y, t, id } while a swing is in progress
    // Survival (T007). `lantern` is the player's switch (R17); `lit` is what the
    // lantern actually does — the switch on AND charge left. Health and battery
    // both clamp, and `dead` is only the flag: T011 owns defeat.
    this.health = MAX_HEALTH;
    this.battery = MAX_BATTERY;
    this.lantern = true;
    this.dead = false;
    this.hits = 0;
    this.hurtTimer = 0;
    this.pickups = 0; // battery cells taken this run (R19)
    this.lastPickup = null;
    this.threat = null; // { dist, kind } written each step by the enemy layer (T010)
    // Animation (T023): the stride clock and the derived pose the renderer paints.
    this.runPhase = 0;
    this.anim = this.pose('idle', 0, 0);
    if (world) this.spawn(world);
  }

  // Is the lantern burning right now? Derived, so a flat battery cannot be
  // reported as lit while the switch is still on.
  get lit() {
    return this.lantern === true && this.battery > 0;
  }

  // Stand the miner on the floor of his spawn tile, at rest.
  spawn(world) {
    const t = world.point('spawn') ?? { x: 3, y: 3 };
    this.x = t.x * TILE + TILE / 2;
    this.y = (t.y + 1) * TILE;
    this.vx = 0;
    this.vy = 0;
    this.facing = 1;
    this.onGround = false;
    this.state = 'fall';
    return this;
  }

  // Put the miner on the floor of tile (tx,ty) at rest. Test setup only.
  teleport(world, tx, ty) {
    this.x = tx * TILE + TILE / 2;
    this.y = (ty + 1) * TILE;
    this.vx = 0;
    this.vy = 0;
    this.onGround = false;
    this.state = 'fall';
    this.steps = 0;
    this.bumps = 0;
    this.mining = null;
    return { x: this.x, y: this.y };
  }

  box(x = this.x, y = this.y) {
    const half = this.w / 2;
    return { left: x - half, right: x + half, top: y - this.h, bottom: y };
  }

  // Does the body, placed at (x,y), overlap any solid tile? The grid reads as
  // bedrock outside its bounds, so the map edges block too.
  overlaps(world, x = this.x, y = this.y) {
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

  // The tile the miner's feet are inside, for prompts and mining arcs (T006).
  tile() {
    return { x: Math.floor(this.x / TILE), y: Math.floor((this.y - 1) / TILE) };
  }

  // --- animation (T023, R9) -------------------------------------------------
  // The pose for one painted frame, as plain data: the renderer reads it through
  // the scene view and never mutates it. `phase` is the stride clock 0..1 and
  // `swing` the mining progress 0..1, so the same inputs always give the same
  // pixels. Offsets are deliberately small: T047/T038 pin the drawn box to the
  // body, so the visible motion lives in the limbs, the flip and the lean.
  pose(state, phase = 0, swing = 0) {
    const a = {
      state,
      phase,
      bob: 0, // px the body lifts off its feet anchor
      lean: 0, // radians about the feet, forward positive
      sx: 1, // squash-and-stretch about the feet
      sy: 1,
      legL: 0, // px each foot travels fore/aft (articulated parts)
      legR: 0,
      arm: 0.5, // pick-arm angle: 0 forward, + down, - raised
      grip: 0, // px the hand reaches out as a strike lands
    };
    const stride = Math.sin(2 * Math.PI * phase);
    const bounce = Math.cos(4 * Math.PI * phase);
    if (state === 'run') {
      a.bob = -1.3 * Math.abs(stride);
      a.lean = 0.05 + 0.03 * stride;
      a.sy = 1 + 0.045 * bounce;
      a.sx = 1 - 0.035 * bounce;
      a.legL = 3 * stride;
      a.legR = -3 * stride;
      a.arm = 0.5 - 0.45 * stride;
    } else if (state === 'jump') {
      a.lean = -0.05;
      a.sy = 1.05;
      a.sx = 0.96;
      a.legL = -2.5;
      a.legR = 1.5;
      a.arm = -0.35;
    } else if (state === 'fall') {
      a.lean = 0.06;
      a.sy = 0.97;
      a.sx = 1.03;
      a.legL = 2;
      a.legR = -1.5;
      a.arm = 0.85;
    } else if (state === 'mine') {
      const k = clamp(swing, 0, 1);
      a.arm = -1.15 + 1.95 * Math.pow(k, 1.5); // wind up, then drive the strike
      a.lean = 0.04 + 0.1 * k;
      a.bob = -0.9 * Math.sin(Math.PI * k);
      a.sy = 1 + 0.03 * Math.sin(2 * Math.PI * k);
      a.grip = 2.5 * Math.pow(k, 1.5);
      a.legL = -1.5 + k;
      a.legR = 1.5 - 0.5 * k;
    }
    return a;
  }

  // Refresh `anim` from the live state. Called once per sim step by update() and
  // again by mine(), so the swing is current on the frame it moves.
  animate(dt = STEP) {
    const d = Number.isFinite(dt) && dt > 0 ? dt : STEP;
    if (this.state === 'run') this.runPhase = (this.runPhase + d * RUN_HZ) % 1;
    else this.runPhase = 0; // a neutral stance makes idle exactly stable
    const swing = this.mining ? clamp(this.mining.t / MINE_TIME, 0, 1) : 0;
    this.anim = this.pose(this.state, this.runPhase, swing);
    return this.anim;
  }

  // One fixed simulation step. `input` is an Input (or anything with isDown /
  // pressed), so the test API and real key events are indistinguishable here.
  update(dt, input, world) {
    const left = input.isDown('left') ? 1 : 0;
    const right = input.isDown('right') ? 1 : 0;
    const dir = right - left;

    // Velocity is set, not eased: the position must respond inside the same
    // fixed step the key arrived in (R34).
    this.vx = dir * MOVE_SPEED;
    if (dir) this.facing = dir;

    if (input.pressed('jump') && this.onGround) {
      this.vy = -JUMP_V;
      this.onGround = false;
      this.jumps += 1;
      this.state = 'jump';
    }

    this.vy = Math.min(this.vy + GRAVITY * dt, MAX_FALL);

    this.moveX(world, this.vx * dt);
    this.moveY(world, this.vy * dt);

    if (!this.onGround) this.state = this.vy < 0 ? 'jump' : 'fall';
    else this.state = dir !== 0 ? 'run' : 'idle';

    this.survive(dt, world);

    this.steps += 1;
    this.animate(dt);
    return this.state;
  }

  // --- survival (R17-R20) --------------------------------------------------
  // One step of the lantern and the pickups, run after the body has moved so a
  // cell is collected on the frame the body reaches it. The drain is a plain
  // rate against the fixed step, which is what makes it reproducible (R27).
  survive(dt, world) {
    if (this.hurtTimer > 0) this.hurtTimer = Math.max(0, this.hurtTimer - dt);
    if (this.lit) this.battery = Math.max(0, this.battery - BATTERY_DRAIN * dt);
    this.collect(world);
  }

  // R19: touching a battery cell restores charge and consumes it exactly once —
  // the tile leaves the grid, so standing in it cannot milk a second charge.
  collect(world) {
    const b = this.box();
    const x0 = Math.floor(b.left / TILE);
    const x1 = Math.floor((b.right - EPS) / TILE);
    const y0 = Math.floor(b.top / TILE);
    const y1 = Math.floor((b.bottom - EPS) / TILE);
    for (let ty = y0; ty <= y1; ty++) {
      for (let tx = x0; tx <= x1; tx++) {
        if (!world.take(tx, ty, BATTERY_PICKUP)) continue;
        this.pickups += 1;
        this.battery = Math.min(MAX_BATTERY, this.battery + PICKUP_CHARGE);
        this.lastPickup = { x: tx, y: ty, charge: PICKUP_CHARGE };
      }
    }
  }

  // R20: every flag is raised while the value it guards is still above zero, so
  // the player always gets a look at the danger before it can kill him. The
  // enemy threshold sits outside the contact radius (config), so proximity
  // warns before anything can bite.
  warnings() {
    return {
      lowBattery: this.battery <= LOW_BATTERY,
      lowHealth: this.health <= LOW_HEALTH,
      enemyProximity: this.threat !== null && this.threat.dist <= LOW_ENEMY_DIST,
    };
  }

  // Take damage from a danger (enemy contact, drowning — T010/T016 own those).
  // Clamps at 0 and raises the death flag; the defeat transition is T011's.
  hurt(n = 1) {
    const dmg = Math.max(0, Number(n) || 0);
    if (dmg === 0) return this.health;
    this.health = Math.max(0, this.health - dmg);
    this.hits += 1;
    this.hurtTimer = HURT_FLASH;
    if (this.health <= 0) this.dead = true;
    return this.health;
  }

  heal(n = 1) {
    this.health = clamp(Math.max(0, Number(n) || 0) + this.health, 0, MAX_HEALTH);
    if (this.health > 0) this.dead = false;
    return this.health;
  }

  // Charge from a station or a cell (R19); clamps at full, never negative.
  addBattery(n = 1) {
    this.battery = clamp(this.battery + Math.max(0, Number(n) || 0), 0, MAX_BATTERY);
    return this.battery;
  }

  // The player's lantern switch (R17). Turning it off stops the drain entirely.
  setLantern(on = true) {
    this.lantern = on !== false;
    return this.lit;
  }

  // Setup/diagnostic setters: place a value directly (clamped) so a check or a
  // restart can start from a known state. The rules still decide what follows.
  setHealth(n) {
    const v = Number(n);
    this.health = clamp(Number.isFinite(v) ? v : this.health, 0, MAX_HEALTH);
    this.dead = this.health <= 0;
    return this.health;
  }

  setBattery(n) {
    const v = Number(n);
    this.battery = clamp(Number.isFinite(v) ? v : this.battery, 0, MAX_BATTERY);
    return this.battery;
  }

  // The enemy layer reports the distance (px) to the closest threat, or null
  // when nothing is close. Read-only for the player: it never damages him.
  setThreat(dist = null, kind = 'enemy') {
    const v = Number(dist);
    this.threat = dist === null || dist === undefined || !Number.isFinite(v) ? null : { dist: v, kind: String(kind) };
    return this.threat;
  }

  // The tile one swing reaches: the row the feet are in, MINE_REACH tiles in
  // front, following the last horizontal input (R8).
  target() {
    const t = this.tile();
    return { x: t.x + this.facing * MINE_REACH, y: t.y };
  }

  // Hold the mine key: progress builds against the tile in front and, after
  // MINE_TIME, `world.dig()` decides whether it breaks (R8, R13, R16). A new
  // target restarts the swing, so walking while mining cannot dig two tiles.
  mine(world, dt = STEP) {
    const t = this.target();
    const id = world.at(t.x, t.y);
    if (!isDiggable(id)) {
      this.mining = null;
      this.lastDig = { x: t.x, y: t.y, id, ore: 0, ok: false, reason: world.dig(t.x, t.y).reason };
      return this.lastDig;
    }
    if (!this.mining || this.mining.x !== t.x || this.mining.y !== t.y) {
      this.mining = { x: t.x, y: t.y, id, t: 0 };
    }
    this.mining.t += dt;
    this.state = 'mine';
    this.animate(dt);
    if (this.mining.t + 1e-9 < MINE_TIME) return { ok: false, reason: 'mining', ...this.mining };
    const res = world.dig(t.x, t.y);
    this.mining = null;
    this.animate(dt);
    if (res.ok) {
      this.ore += res.ore;
      this.digs = (this.digs || 0) + 1;
      this.dug.push({ x: res.x, y: res.y, id: res.id, ore: res.ore });
      if (this.dug.length > 64) this.dug.shift();
    }
    this.lastDig = { x: res.x, y: res.y, id: res.id, ore: res.ore, ok: res.ok, reason: res.reason ?? null };
    return this.lastDig;
  }

  // Released the key mid-swing: the progress is lost, not banked.
  cancelMine() {
    this.mining = null;
  }

  // Horizontal travel, stopped flush against any solid column it would enter.
  moveX(world, dx) {
    if (!dx) return;
    const nx = this.x + dx;
    if (!this.overlaps(world, nx, this.y)) {
      this.x = nx;
      return;
    }
    const half = this.w / 2;
    const cx = dx > 0 ? Math.floor((nx + half) / TILE) * TILE - half : (Math.floor((nx - half) / TILE) + 1) * TILE + half;
    // Nowhere safe to go (already wedged): stay put rather than penetrate.
    if (!this.overlaps(world, cx, this.y)) this.x = cx;
    this.vx = 0;
    this.bumps += 1;
  }

  // Vertical travel: land exactly on the tile top above, stop exactly under the
  // tile bottom below. Whole-tile results keep positions reproducible.
  moveY(world, dy) {
    if (!dy) return;
    const ny = this.y + dy;
    if (!this.overlaps(world, this.x, ny)) {
      this.y = ny;
      this.onGround = false;
      return;
    }
    const cy =
      dy > 0
        ? Math.floor(ny / TILE) * TILE // feet on the floor of the blocking row
        : (Math.floor((ny - this.h) / TILE) + 1) * TILE + this.h; // head under the ceiling
    // Nowhere safe to go (already wedged): stay put rather than penetrate.
    if (!this.overlaps(world, this.x, cy)) this.y = cy;
    if (dy > 0) this.onGround = true;
    this.vy = 0;
    this.bumps += 1;
  }
}
