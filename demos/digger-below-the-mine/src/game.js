// src/game.js — the fixed-timestep loop driver and the mission state machine
// (R23, R24, R27, R31).
//
//   title -> playing -> paused -> playing
//   playing -> dead      (health reached zero, R24)
//   playing -> victory   (the deep rare crystal was delivered at the lift, R23)
//   any     -> playing   (restart rebuilds the whole mission, R27)
//
// Game is the only place that decides what the player sees next, and it decides
// it from facts owned by other layers: `player.dead` (T005-T007), `objectives.done`
// (T008) and the lift interaction (T009). It never sets an objective itself, so
// no caller can win or lose the mission by asking.
//
// One fixed tick is `tick(dt)`: read the system-level taps, run the world if the
// mission is running, then look at the win/lose conditions. `step(dt)` is the
// live loop driver — it accumulates real time and runs whole ticks, and it is
// what freezes when the game is not playing. That is the whole of pause: the
// world stops advancing while the page keeps painting the paused frame.
//
// Restart reseeds rather than patches (R27): the world, the miner and the
// mission are rebuilt from the map snapshot taken at boot, so a finished or
// failed run cannot leave a tile, a flag or a charge behind. The enemy layer is
// re-run from the seed there too, since monsters are not in the world snapshot.

import { STEP, TILE, MINE_TIME } from './config.js';
import { SYSTEM_ACTIONS } from './input.js';
import { Player } from './player.js';
import { World } from './world.js';
import { Objectives } from './objectives.js';
import { interact, findInteractable } from './interaction.js';
import { Rng } from './rng.js';
import { spawnEnemies, updateEnemies, damageEnemy, TYPES } from './enemies.js';
// The ONE intensity rule (T013). What repels a Wraith is exactly the light the
// player sees, so this layer imports it instead of writing a second one.
import { playerLight } from './lighting.js';

// One swing of the pick does this much damage to anything standing in the tile it
// aims at (R12). A Crawler (30hp) takes two hits and a Wraith (18hp) takes two,
// so defeating an enemy costs time but not the whole run.
export const PICK_DAMAGE = 15;

export const TITLE = 'title';
export const PLAYING = 'playing';
export const PAUSED = 'paused';
export const DEAD = 'dead';
export const VICTORY = 'victory';
export const STATES = [TITLE, PLAYING, PAUSED, DEAD, VICTORY];

// The states whose screen is covered by a banner (R31, R23, R24).
export const VEILED = [TITLE, PAUSED, DEAD, VICTORY];

// Taps that start the mission from the title screen. Both are already mapped in
// src/input.js, so no key table is needed here.
export const START_ACTIONS = ['jump', 'interact'];

// A stalled tab must not bank minutes of simulation to catch up on.
export const MAX_ACC = STEP * 8;

const EPS = 1e-9;

// A miner with no keyboard attached still falls over correctly.
const NO_INPUT = { isDown: () => false, pressed: () => false };

// The rect of one grid tile, in world pixels.
function tileBox(t) {
  return { left: t.x * TILE, top: t.y * TILE, right: (t.x + 1) * TILE, bottom: (t.y + 1) * TILE };
}

function boxesOverlap(a, b) {
  return a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
}

// How many live monsters of each kind a list holds.
function enemyCounts(enemies) {
  const out = {};
  // Seed every kind at 0, so a wiped-out kind reads as `0` and not `undefined`.
  for (const kind of Object.keys(TYPES)) out[kind] = 0;
  for (const e of enemies) {
    if (!e || e.alive === false) continue;
    out[e.kind] = (out[e.kind] ?? 0) + 1;
  }
  return out;
}

export class Game {
  constructor(options = {}) {
    const world = options.world;
    if (!world) throw new Error('Game needs a world');
    this.input = options.input ?? null;
    this.audio = options.audio ?? null;
    this.seed = (options.seed ?? world.seed ?? 1) >>> 0;
    // The map as it was the moment the mission began: the source a restart
    // rebuilds from. Plain data, so it survives serialization too.
    this.map = options.map ?? world.serialize();
    this.world = world;
    this.player = options.player ?? new Player(world);
    this.objectives = new Objectives({ world });
    // T036: the enemy layer is live. `spawnEnemies` writes `world.enemies` and
    // returns the list, seeded from the mission seed so the same seed always
    // makes the same monsters in the same places (R27, R62).
    this.enemies = spawnEnemies(this.world, new Rng(this.seed));
    this.state = TITLE;
    // The single mute flag the audio system (T015) and the HUD (T014) read.
    this.muted = false;
    this.time = 0;
    this.frames = 0;
    this.simSteps = 0;
    this.solidFrames = 0;
    this.restarts = 0;
    this.transitions = [];
    this.system = [];
    this.prompt = null;
    this.response = null;
    this.lastEvent = null;
    this._acc = 0;
    // Progress of the current pick swing, for the enemy hit (T036, R12).
    this._swing = 0;
    this.lastSwing = null;
    this.record(TITLE, 'boot');
  }

  get running() {
    return this.state === PLAYING;
  }

  // --- state machine --------------------------------------------------------
  record(state, reason) {
    this.transitions.push({ state, reason, at: this.simSteps });
    if (this.transitions.length > 24) this.transitions.shift();
    return state;
  }

  go(state, reason) {
    if (!STATES.includes(state) || this.state === state) return false;
    this.state = state;
    this.record(state, reason);
    return true;
  }

  // Title -> playing. Only ever from the title screen, so it cannot resurrect a
  // dead run or undo a victory.
  begin(reason = 'start') {
    if (this.state !== TITLE) return false;
    return this.go(PLAYING, reason);
  }

  pause() {
    return this.go(PAUSED, 'pause');
  }

  resume() {
    return this.go(PLAYING, 'resume');
  }

  // R31: one key does both halves. It has no effect on a run that is already
  // over, where restart is the only way back.
  togglePause() {
    if (this.state === PLAYING) return this.pause();
    if (this.state === PAUSED) return this.resume();
    return false;
  }

  setMuted(on = true) {
    this.muted = on !== false;
    if (this.audio && typeof this.audio.setMuted === 'function') this.audio.setMuted(this.muted);
    return this.muted;
  }

  toggleMute() {
    return this.setMuted(!this.muted);
  }

  setSeed(n) {
    this.seed = Math.max(0, Math.floor(Number(n) || 0)) >>> 0;
    return this.seed;
  }

  // Rebuild one layer of the mission from the boot snapshot. A generated world
  // is regenerated from the seed; an authored one is re-read from its own data,
  // so the tiles, the water and the points are exactly as they started (R27).
  buildWorld() {
    const map = this.map;
    if (map.source === 'generated') return new World(this.seed);
    const world = World.fromJSON(map);
    world.source = map.source ?? 'authored';
    return world;
  }

  // R27: objectives, inventory, health, battery, world tiles and water level all
  // come back as they were. Held keys are dropped so a run does not restart with
  // the miner already walking (R34).
  restart() {
    const world = this.buildWorld();
    this.world = world;
    this.objectives = new Objectives({ world });
    this.player = new Player(world);
    // Enemies are not in World.serialize(), so a restart re-runs the seeded
    // spawner against the rebuilt world: same seed, same monsters, same places,
    // at their initial position and full health (R27).
    this.enemies = spawnEnemies(world, new Rng(this.seed));
    this.time = 0;
    this.simSteps = 0;
    this.solidFrames = 0;
    this._acc = 0;
    this._swing = 0;
    this.lastSwing = null;
    this.prompt = null;
    this.response = null;
    this.lastEvent = null;
    this.restarts += 1;
    if (this.input) this.input.clear();
    this.state = PLAYING;
    this.record(PLAYING, 'restart');
    return world.hash();
  }

  // --- one fixed tick -------------------------------------------------------
  // System taps are read in every state, because the keys that leave a state
  // (pause, restart) have to work while the world is frozen.
  readEdges() {
    const input = this.input;
    if (!input) return;
    for (const action of SYSTEM_ACTIONS) {
      if (!input.pressed(action)) continue;
      this.system.push(action);
      if (this.system.length > 16) this.system.shift();
      if (action === 'pause') this.togglePause();
      else if (action === 'mute') this.toggleMute();
      else if (action === 'restart') this.restart();
      else if (action === 'lantern' && this.state === PLAYING) {
        // The lantern switch is the miner's own, but `pressed()` consumes the
        // edge here, so this is where it is acted on. A paused run cannot spend
        // charge it is not using, so the toggle only lands while playing.
        this.player.setLantern(!this.player.lantern);
      }
    }
    if (this.state !== TITLE) return;
    for (const action of START_ACTIONS) {
      if (!input.pressed(action)) continue;
      this.system.push('start');
      this.begin(`key:${action}`);
      return;
    }
  }

  // The page-side wiring of one step: the miner's body, the mine edge (T006),
  // the interact edge (T009, with the mission so prompts are state-aware), and
  // the world-derived objective events (T008).
  simulate(dt = STEP) {
    const world = this.world;
    const player = this.player;
    const input = this.input ?? NO_INPUT;
    player.update(dt, input, world);
    // Mining is held, not tapped (R8): the swing keeps progress against the tile
    // in front while the key is down, and a fresh tap starts one on its own.
    const tapped = input.pressed('mine');
    if (input.isDown('mine') || tapped) {
      player.mine(world, dt);
      this._swing += dt;
      // One swing is one hit (R12). A tap lands at once; a held key lands every
      // MINE_TIME, on the same cadence a tile breaks on, so mining a wall next
      // to a Crawler and hitting the Crawler are the same action.
      if (tapped || this._swing >= MINE_TIME - 1e-9) {
        this.swing();
        this._swing = 0;
      }
    } else {
      player.cancelMine();
      this._swing = 0;
    }
    if (input.pressed('interact')) this.doInteract();
    this.stepEnemies(dt);
    this.objectives.sync(world, player);
    this.prompt = findInteractable(world, player, this.objectives);
    if (player.overlaps(world)) this.solidFrames += 1;
    this.simSteps += 1;
  }

  doInteract() {
    const res = interact(this.world, this.player, this.objectives, this.audio);
    this.response = res;
    if (res && res.ok && res.event) this.lastEvent = res.event;
    return res;
  }

  // --- enemies (T036, R12) --------------------------------------------------
  // Setup only (R63): place one enemy of `kind` at world pixels (x,y). It never
  // touches objectives, health, the bag or the win condition.
  spawnEnemy(kind, x = 0, y = 0) {
    const Type = TYPES[kind];
    if (!Type) return null;
    const e = new Type(Number(x) || 0, Number(y) || 0);
    this.enemies.push(e);
    return e;
  }

  // The two tiles one swing covers: the one in front of the miner (MINE_REACH,
  // R8) and the one he is standing in, so a Crawler pressed against his body is
  // hit too. An enemy is hit when its body box overlaps either.
  swingTiles() {
    const p = this.player;
    return [p.target(), p.tile()].map(tileBox);
  }

  swing(power = PICK_DAMAGE) {
    const tiles = this.swingTiles();
    const hits = [];
    for (const e of this.enemies) {
      if (!e || !e.alive) continue;
      if (!tiles.some((t) => boxesOverlap(e.box(), t))) continue;
      const res = damageEnemy(e, power);
      if (res.ok) hits.push({ kind: res.kind, damage: res.damage, health: res.health, dead: res.dead });
    }
    this.lastSwing = { at: this.simSteps, hits };
    return hits;
  }

  // Move every live enemy and let it hurt (R12), then let it report how close the
  // nearest one is, which is what raises the proximity warning (R20). The light
  // list is the lantern's own data (T013), so a Wraith flees exactly the glow the
  // player can see.
  //
  // `threatPinned` is the harness stand-in's override (T007/T014's setThreat): once
  // the harness has written a report — a distance, or a pinned "nothing close" —
  // it survives the step, so the warning threshold stays testable without a
  // monster in the room. The live layer owns the report whenever nothing is
  // pinned, and `__digger.releaseThreat()` unpins it.
  stepEnemies(dt) {
    const player = this.player;
    const pinned = player.threatPinned === true
      ? { dist: player.threat ? player.threat.dist : null, kind: player.threat ? player.threat.kind : 'enemy' }
      : null;
    updateEnemies(dt, this.world, player, [playerLight(player)], this.enemies);
    if (pinned) player.setThreat(pinned.dist, pinned.kind);
  }

  // The two ways a run ends, read off the layers that made them true.
  evaluate() {
    if (this.objectives.done === true) {
      this.go(VICTORY, 'mission-complete');
      return;
    }
    if (this.player.dead === true || this.player.health <= 0) this.go(DEAD, 'health-zero');
  }

  tick(dt = STEP) {
    this.readEdges();
    if (this.state === PLAYING) {
      this.time += dt;
      this.simulate(dt);
      this.evaluate();
    }
    // A tap nobody acted on is dropped, so it cannot fire after a resume.
    if (this.input) this.input.consumePressed();
  }

  // Advance real time, running whole fixed ticks while the mission is running.
  step(dt = STEP) {
    this.frames += 1;
    const d = Number(dt);
    this._acc = Math.min(this._acc + (Number.isFinite(d) && d > 0 ? d : 0), MAX_ACC);
    while (this._acc >= STEP - EPS) {
      this._acc -= STEP;
      this.tick(STEP);
    }
    if (this._acc < EPS) this._acc = 0;
    return this.frames;
  }

  // Plain structured-cloneable data: what the HUD (T014), the test API and a
  // screenshot reviewer all read.
  snapshot() {
    const p = this.prompt;
    return {
      state: this.state,
      running: this.state === PLAYING,
      veiled: VEILED.includes(this.state),
      muted: this.muted,
      seed: this.seed,
      time: this.time,
      frames: this.frames,
      simSteps: this.simSteps,
      solidFrames: this.solidFrames,
      restarts: this.restarts,
      transitions: this.transitions.slice(-8),
      system: this.system.slice(-8),
      lastEvent: this.lastEvent,
      response: this.response,
      lastSwing: this.lastSwing,
      // The live enemy layer (T036): one plain record per monster, plus how many
      // of each kind are still standing, which is what the HUD and a check read.
      enemies: this.enemies.map((e) => e.snapshot()),
      enemyCounts: enemyCounts(this.enemies),
      prompt: p
        ? { kind: p.kind, x: p.x, y: p.y, name: p.name, dist: p.dist, prompt: p.prompt, ready: p.ready }
        : null,
      objective: this.objectives.snapshot(),
    };
  }
}
