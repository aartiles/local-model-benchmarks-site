// src/interaction.js — contextual prompts and the interact action (R14, R15,
// R21, R22, R23, R30).
//
// The miner talks to four kinds of object, all of them tiles in the grid:
//
//   part     the pump part lying in the Crystal Caverns (R22 route)
//   pump     the drainage pump, which needs that part before it will run (R15)
//   crystal  the deep rare crystal behind the water in the flooded gallery (R22)
//   lift     the extraction lift at the entrance, where the mission ends (R14)
//
// findInteractable() answers "what is the miner standing next to, and what does
// it want from him?" — the nearest such object within INTERACT_REACH, with the
// English prompt the HUD shows (R30). interact() performs the action, and is the
// ONLY place the mission events part, pump, crystal and lift are fired: like
// Objectives.sync(), nothing here advances the mission without changing the
// world that makes it true.
//
// Two rules the dispatch must keep:
//   * the pump refuses without the part and does not drain anything (R21), and
//     the crystal refuses while the gallery is still under water (R21);
//   * the lift is evaluated live and refuses without the crystal (R23).
//
// Carrying is derived, not stored: the part is in hand when the mission has
// recorded `part` and not yet `pump`, the crystal when it has recorded `crystal`.
// The objective flags are the single source of truth, so a save/restart (T011,
// T031) and the HUD (T014) can never disagree with what the miner holds.
//
// world.take() refuses essential tiles, and all four objects are essential, so
// retrieval here goes through world.set() deliberately — after the rule that
// makes it legal has been checked. Nothing else in the grid is ever edited here.

import { TILE } from './config.js';
import { PART, PUMP, DEEP_CRYSTAL, LIFT, AIR, NAME } from './tiles.js';
import { WATER_MIN } from './world.js';

// How close the miner must be, in pixels, measured from the middle of his body
// to the centre of the object's tile: a touch or one tile away. The pump part
// sits on a cavern ledge, so it is taken with a hop rather than from the floor.
export const INTERACT_REACH = Math.round(TILE * 1.75);

// Tiles scanned around the miner's own tile, enough to cover INTERACT_REACH.
const SCAN_RADIUS = Math.ceil(INTERACT_REACH / TILE);

// The grid tiles the miner can talk to, and what each one is called.
const KIND_BY_ID = new Map([
  [PART, 'part'],
  [PUMP, 'pump'],
  [DEEP_CRYSTAL, 'crystal'],
  [LIFT, 'lift'],
]);

// The prompt for each object, by the state the world and the mission are in
// (R30). All player-facing text is English.
export const PROMPTS = {
  part: {
    ground: 'Pick up the pump part and take it to the drainage pump.',
  },
  pump: {
    missing: 'The drainage pump is missing its part. Find the pump part in the Crystal Caverns.',
    ready: 'Fit the pump part into the drainage pump and switch it on.',
    running: 'The drainage pump is running and the flooded machinery area is drained.',
  },
  crystal: {
    flooded: 'The deep rare crystal lies under water. Drain the flooded machinery area first.',
    take: 'Take the deep rare crystal back to the extraction lift.',
  },
  lift: {
    waiting: 'The extraction lift is waiting for the deep rare crystal.',
    deliver: 'Step into the extraction lift and deliver the deep rare crystal.',
    done: 'The extraction lift has already carried the deep rare crystal to the surface.',
  },
};

// The line shown after an action, success or refusal (T014 may flash it).
export const RESPONSES = {
  part: 'The pump part is in your hands.',
  pump: 'The drainage pump grinds into life and the water starts to drain.',
  crystal: 'You have the deep rare crystal. Carry it back to the extraction lift.',
  lift: 'The extraction lift carries the deep rare crystal to the surface.',
  'missing-part': 'The drainage pump is missing its part.',
  'pump-running': 'The drainage pump is already running.',
  'still-flooded': 'The deep rare crystal is still under water.',
  'lift-without-crystal': 'The lift needs the deep rare crystal first.',
  'mission-complete': 'The mission is already complete.',
  'nothing-in-reach': 'Nothing to interact with here.',
};

// The sound each successful action asks for (T013 owns the names).
const SOUNDS = { part: 'pickup', pump: 'pump', crystal: 'crystal', lift: 'lift' };

const flag = (objectives, name) => !!objectives && objectives.flag(name) === true;

// What the miner is holding, read off the mission flags (see the header).
export function carrying(objectives) {
  return {
    part: flag(objectives, 'part') && !flag(objectives, 'pump'),
    crystal: flag(objectives, 'crystal'),
  };
}

// One row of the prompt table for an object in the state the world is in:
// { prompt, ready } — ready is whether interact() would actually do something.
function evaluate(kind, world, objectives) {
  const carry = carrying(objectives);
  const drained = !!world && world.drained === true;
  const done = !!objectives && objectives.done === true;
  switch (kind) {
    case 'part':
      return { prompt: PROMPTS.part.ground, ready: true };
    case 'pump':
      if (flag(objectives, 'pump')) return { prompt: PROMPTS.pump.running, ready: false };
      if (carry.part) return { prompt: PROMPTS.pump.ready, ready: true };
      return { prompt: PROMPTS.pump.missing, ready: false };
    case 'crystal':
      if (!drained) return { prompt: PROMPTS.crystal.flooded, ready: false };
      return { prompt: PROMPTS.crystal.take, ready: true };
    case 'lift':
      if (done) return { prompt: PROMPTS.lift.done, ready: false };
      if (carry.crystal) return { prompt: PROMPTS.lift.deliver, ready: true };
      return { prompt: PROMPTS.lift.waiting, ready: false };
    default:
      return { prompt: RESPONSES['nothing-in-reach'], ready: false };
  }
}

// The middle of the miner's body, which is what the reach is measured from.
function centre(player) {
  return { x: player.x, y: player.y - (player.h || 28) / 2 };
}

// The nearest interactable object within reach, or null. Plain cloneable data:
// { kind, x, y, id, name, dist, prompt, ready }.
export function findInteractable(world, player, objectives = null) {
  if (!world || !player || typeof player.tile !== 'function') return null;
  const t = player.tile();
  const c = centre(player);
  let best = null;
  for (let y = t.y - SCAN_RADIUS; y <= t.y + SCAN_RADIUS; y++) {
    for (let x = t.x - SCAN_RADIUS; x <= t.x + SCAN_RADIUS; x++) {
      const id = world.at(x, y);
      const kind = KIND_BY_ID.get(id);
      if (!kind) continue;
      const mid = world.centerOf(x, y);
      const dist = Math.hypot(mid.x - c.x, mid.y - c.y);
      if (dist > INTERACT_REACH) continue;
      if (best && dist >= best.dist) continue;
      best = { kind, x, y, id, name: NAME[id], dist: Math.round(dist) };
    }
  }
  if (!best) return null;
  const state = evaluate(best.kind, world, objectives);
  best.prompt = state.prompt;
  best.ready = state.ready;
  return best;
}

function fail(kind, reason, extra = {}) {
  return { ok: false, kind, reason, event: null, text: RESPONSES[reason] ?? RESPONSES['nothing-in-reach'], ...extra };
}

function succeed(kind, event, x, y, extra = {}) {
  return { ok: true, kind, reason: null, event, x, y, text: RESPONSES[kind], ...extra };
}

function sound(audio, kind) {
  if (audio && typeof audio.play === 'function') audio.play(SOUNDS[kind] ?? kind);
}

// Press the interact key on whatever is nearest. Returns
// { ok, kind, reason, event, text, ... } so the game loop (T011) can show the
// line, play the sound and ask the mission what happened. It never advances an
// objective without making the world true first.
export function interact(world, player, objectives, audio = null) {
  const hit = findInteractable(world, player, objectives);
  if (!hit) return fail(null, 'nothing-in-reach');
  if (!objectives) return fail(hit.kind, 'no-mission', { x: hit.x, y: hit.y });
  const { kind, x, y } = hit;

  if (objectives.done === true) return fail(kind, 'mission-complete', { x, y });

  switch (kind) {
    // R22 route: the part leaves the ground and becomes the thing he carries.
    case 'part': {
      if (!world.set(x, y, AIR)) return fail(kind, 'bad-tile', { x, y });
      objectives.progress('part', { x, y });
      sound(audio, kind);
      return succeed(kind, 'part', x, y, { state: objectives.state });
    }

    // R15 + R21: fit the part, switch the pump on, empty the flooded band. The
    // part is consumed by the fit (carrying() reads the pump flag), and the
    // water level is what tells the mission the drainage happened.
    case 'pump': {
      if (flag(objectives, 'pump')) return fail(kind, 'pump-running', { x, y });
      if (!carrying(objectives).part) return fail(kind, 'missing-part', { x, y });
      objectives.progress('pump', { x, y });
      world.drain(WATER_MIN);
      objectives.sync(world, player);
      sound(audio, kind);
      return succeed(kind, 'pump', x, y, {
        drained: world.drained === true,
        waterLevel: world.waterLevel,
        state: objectives.state,
      });
    }

    // R22: the crystal is rock until the water is gone, so the flooded gallery
    // is the gate (R21) and no amount of digging opens it.
    case 'crystal': {
      if (!world.drained) return fail(kind, 'still-flooded', { x, y });
      if (!world.set(x, y, AIR)) return fail(kind, 'bad-tile', { x, y });
      objectives.progress('crystal', { x, y });
      sound(audio, kind);
      return succeed(kind, 'crystal', x, y, { state: objectives.state });
    }

    // R14 + R23: the lift is evaluated live, so it wins only with the crystal.
    case 'lift': {
      const res = objectives.progress('lift', { x, y });
      if (!res.accepted) return fail(kind, res.reason ?? 'lift-without-crystal', { x, y });
      sound(audio, kind);
      return succeed(kind, 'lift', x, y, { state: objectives.state, done: objectives.done === true });
    }

    default:
      return fail(kind, 'nothing-in-reach', { x, y });
  }
}
