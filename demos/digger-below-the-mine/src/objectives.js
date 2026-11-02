// src/objectives.js — the mission state machine (R21, R22, R23, R26, R27).
//
// The mission is a route through the mine, and this object is the only place
// that knows how far along it the player is:
//
//   descend -> part -> pump -> drain -> crystal -> lift -> complete
//
// It is a recorder, not a director: it never decides for itself that something
// happened. Every advance comes from a real event reported by the layer that
// made it true — `sync()` for the two events the world can answer for itself
// (reaching the caverns by position, the flooded band being drained by water
// level), and `src/interaction.js` (T009) for picking up the pump part,
// activating the pump and taking the deep rare crystal. `window.__digger` has no
// way to set a flag (R63), so victory always comes from the real rules.
//
// Two rules keep the mission honest:
//   * ordering (R23): the return to the lift is evaluated the moment it happens
//     and is refused unless the deep rare crystal is already in hand, so walking
//     up to the lift at the start of the run is not a win. It is not banked as a
//     flag either — the player has to come back with the crystal.
//   * no softlock (R26): every other event is remembered as soon as it is true.
//     An event that arrives early (a mine that was somehow drained before the
//     pump was repaired) is kept and the stage advances over it later, so the
//     player is never forced to redo something the world can no longer undo.
//     The stage index only ever moves forward.
//
// Plain data only: no world, no DOM, no engine calls, so it serializes for a
// save/restart and can be unit-tested in node.

export const COMPLETE_STATE = 'complete';

// Save format version, so a stale or hand-edited save is rejected rather than
// trusted (restore() throws instead of loading a mission that never happened).
export const SERIALIZE_VERSION = 1;

// The route. `id` is the objective the player is working on, `event` is the one
// thing that finishes it, `hint` is the English text the HUD shows (R29).
export const STAGES = [
  {
    id: 'descend',
    event: 'caverns',
    hint: 'Mine down through the rock and reach the Crystal Caverns.',
  },
  {
    id: 'part',
    event: 'part',
    hint: 'Find the pump part somewhere in the Crystal Caverns.',
  },
  {
    id: 'pump',
    event: 'pump',
    hint: 'Take the pump part to the drainage pump and switch it on.',
  },
  {
    id: 'drain',
    event: 'drained',
    hint: 'Drain the flooded machinery area to open the way down.',
  },
  {
    id: 'crystal',
    event: 'crystal',
    hint: 'Retrieve the deep rare crystal from the drained gallery.',
  },
  {
    id: 'lift',
    event: 'lift',
    hint: 'Carry the deep rare crystal back to the extraction lift.',
  },
];

// The victory line, shown once the mission is done (R23).
export const VICTORY_HINT = 'Mission complete: the deep rare crystal is delivered.';

// The event names, in route order. Anything else is not an objective event.
export const EVENTS = STAGES.map((s) => s.event);

// The event that finishes the last stage: the return to the lift, which is only
// ever evaluated live, never banked.
export const RETURN_EVENT = 'lift';

// The events that must already be true before the lift can win the mission.
const REQUIRED_BEFORE_RETURN = EVENTS.filter((e) => e !== RETURN_EVENT);

// Which area counts as "down the mine" for the first objective. Deeper areas
// qualify too, so a player who has gone further is never asked to go back.
const DEEP_AREAS = new Set(['caverns', 'flooded']);

// Stage index that means the mission is over.
const FINISHED = STAGES.length;

// The stage the flags alone describe: the first objective whose event is not
// yet recorded. advance() keeps `stage` equal to this, so a save can be checked
// against its own flags.
function deriveStage(flags) {
  let i = 0;
  while (i < FINISHED && flags[STAGES[i].event] === true) i++;
  return i;
}

function initialFlags() {
  const flags = {};
  for (const e of EVENTS) flags[e] = false;
  return flags;
}

export class Objectives {
  constructor(options = {}) {
    // The world is only read by sync(); the machine itself is pure state, so a
    // mission can be built, saved and restored without a map (T011, T031).
    this.world = options.world ?? null;
    this.reset();
  }

  // Back to the start of the mission. A fresh instance and a reset() instance
  // serialize identically, which is what a restart needs (R27).
  reset() {
    this.stage = 0;
    this.flags = initialFlags();
    // Accepted events, in arrival order: the proof that the mission was walked
    // through the real route rather than set.
    this.events = [];
    // Refused events, { event, reason }, for debugging and for the audit trail.
    this.ignored = [];
    return this;
  }

  get done() {
    return this.stage >= FINISHED;
  }

  get state() {
    return this.done ? COMPLETE_STATE : STAGES[this.stage].id;
  }

  get total() {
    return FINISHED;
  }

  // Has this real event been recorded? Unknown names are simply not set.
  flag(name) {
    return this.flags[name] === true;
  }

  // The current objective, in English (R29).
  hint() {
    return this.done ? VICTORY_HINT : STAGES[this.stage].hint;
  }

  // Plain data for the HUD and the test API snapshot. Cloneable: no functions.
  snapshot() {
    return {
      state: this.state,
      stage: this.stage,
      total: this.total,
      done: this.done,
      hint: this.hint(),
      flags: { ...this.flags },
      events: this.events.slice(),
    };
  }

  // --- advancing ------------------------------------------------------------
  // Record one real event. Returns { accepted, advanced, state, reason? } so the
  // caller (and a check) can see exactly what the machine made of it.
  progress(event, detail = null) {
    if (this.done) return this.refuse(event, 'mission-complete');
    if (typeof event !== 'string' || !EVENTS.includes(event)) return this.refuse(event, 'unknown-event');
    if (event === RETURN_EVENT) {
      // R23: only the crystal in hand turns a visit to the lift into a win.
      if (!this.readyToReturn()) return this.refuse(event, 'lift-without-crystal');
      this.complete(detail);
      return { accepted: true, advanced: true, state: this.state, event };
    }
    const repeat = this.flags[event] === true;
    this.flags[event] = true;
    this.events.push(event);
    const before = this.stage;
    this.advance();
    return { accepted: true, advanced: this.stage !== before, repeat, state: this.state, event };
  }

  // Can the lift win the mission yet? True when every earlier objective has
  // been recorded, i.e. the crystal is in hand and the route is walked.
  readyToReturn() {
    return REQUIRED_BEFORE_RETURN.every((e) => this.flags[e] === true);
  }

  // The lift interaction (T009/T011): victory, but only with the deep rare
  // crystal retrieved. Returns false and changes nothing otherwise, so no
  // caller can win the mission by asking.
  complete(_detail = null) {
    if (this.done) return true;
    if (this.stage !== FINISHED - 1 || !this.readyToReturn()) return false;
    this.flags[RETURN_EVENT] = true;
    this.events.push(RETURN_EVENT);
    this.stage = FINISHED;
    return true;
  }

  // Move forward over every objective whose event is already recorded. Only
  // ever moves the stage up, so the mission cannot regress (R26).
  advance() {
    while (this.stage < FINISHED - 1 && this.flags[STAGES[this.stage].event] === true) this.stage++;
    return this.stage;
  }

  refuse(event, reason) {
    this.ignored.push({ event: typeof event === 'string' ? event : String(event), reason });
    return { accepted: false, advanced: false, state: this.state, event, reason };
  }

  // --- world-derived events -------------------------------------------------
  // The two objectives the world can answer for itself. Called every step by
  // the game loop (T011); returns the events it fired, usually none.
  sync(world = this.world, player) {
    const fired = [];
    if (!world || !player || this.done) return fired;
    const t = player.tile();
    const area = world.areaOfTile(t.x, t.y);
    if (area && DEEP_AREAS.has(area.id) && !this.flags.caverns) {
      this.progress('caverns', { area: area.id });
      fired.push('caverns');
    }
    // R21: the pump is the only in-game way the flooded band empties, so the
    // water level itself is the evidence that the drainage happened.
    if (world.drained && !this.flags.drained) {
      this.progress('drained', { waterLevel: world.waterLevel });
      fired.push('drained');
    }
    return fired;
  }

  // --- save / restore -------------------------------------------------------
  serialize() {
    return {
      v: SERIALIZE_VERSION,
      stage: this.stage,
      state: this.state,
      done: this.done,
      flags: { ...this.flags },
      events: this.events.slice(),
    };
  }

  // Load a mission state. `null`/`undefined` is the documented reset (a restart
  // with no save); anything malformed throws, because a save that lies about
  // victory must not be trusted (R23, R26, R27).
  restore(save) {
    if (save === null || save === undefined) return this.reset();
    if (typeof save !== 'object' || Array.isArray(save)) {
      throw new TypeError('objectives: a save must be an object');
    }
    if (save.v !== SERIALIZE_VERSION) {
      throw new TypeError(`objectives: unsupported save version ${String(save.v)}`);
    }
    if (!Number.isInteger(save.stage) || save.stage < 0 || save.stage > FINISHED) {
      throw new RangeError(`objectives: save stage ${String(save.stage)} is outside the route`);
    }
    const flags = initialFlags();
    if (save.flags !== undefined && save.flags !== null) {
      if (typeof save.flags !== 'object') throw new TypeError('objectives: save flags must be an object');
      for (const key of Object.keys(save.flags)) {
        if (!EVENTS.includes(key)) throw new TypeError(`objectives: unknown objective flag "${key}"`);
      }
      for (const e of EVENTS) flags[e] = save.flags[e] === true;
    }
    if (!Array.isArray(save.events)) throw new TypeError('objectives: save events must be a list');
    for (const e of save.events) {
      if (typeof e !== 'string' || !EVENTS.includes(e)) throw new TypeError(`objectives: unknown objective event "${String(e)}"`);
    }
    // The stage must be exactly what the flags describe, and the done flag must
    // agree with it: a save cannot claim a victory its own events did not earn.
    const derived = deriveStage(flags);
    if (derived !== save.stage) {
      throw new RangeError(`objectives: save stage ${save.stage} does not match its flags (${derived})`);
    }
    if (save.done !== undefined && save.done !== (save.stage >= FINISHED)) {
      throw new TypeError('objectives: save done flag disagrees with its stage');
    }
    this.stage = save.stage;
    this.flags = flags;
    this.events = save.events.slice();
    this.ignored = [];
    return this;
  }
}
