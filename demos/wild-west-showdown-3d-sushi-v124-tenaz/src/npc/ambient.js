import { createCowboy } from '../actors/cowboy.js';

/**
 * T019a (R55) — ambient town life.
 *
 * Five lightweight cowboys that walk fixed loops between the posts `town.js`
 * already defines, stop to stand, sit or chat, and change behaviour when a duel
 * starts near them. No pathfinding library: a route is a closed list of
 * waypoints and an NPC walks the straight segment to its next one, which is all
 * a dirt town of boxy buildings needs.
 *
 * THE BUDGETS THIS MODULE MUST RESPECT (D7 / R21):
 *  - Every rig is registered with the shared T010a culler, so a rendered frame
 *    still draws at most `maxVisible` rigs (2, one of which is the player) and
 *    the D7 ceiling of 75 draw calls is untouched. Registration also stubs the
 *    rig's raycasts, which is what keeps the camera's per-frame occlusion scan
 *    inside its bound.
 *  - `update(dt)` is O(N) with no raycasts, no allocations per frame and no
 *    timers: a duel reaction is a state change plus a step-back offset.
 *
 * TIME: everything advances on the `dt` the frame loop hands in, which the
 * engine clamps and main.js stops while paused. Nothing here reads Date.now() or
 * setTimeout, so a check can sample across `WWS.engine.frames` (or drive the sim
 * with `run()`) and get the same town either way (R36/R66).
 *
 * DETERMINISM: each NPC owns a tiny LCG seeded from its index, so the dwell
 * states it picks are reproducible run to run. Math.random would make a check
 * that asserts "NPC 3 sat down" flaky for no benefit.
 */

/** Deck tops, from town.js deckRect(): porch 0.24, the bank's portico 0.32. */
const DECK = 0.24;
const PORTICO = 0.32;

/** Metres per second. A stroll, and a jog for the duel reaction. */
const WALK_SPEED = 1.15;
const FLEE_SPEED = 2.3;
/** How close counts as "near the duel" (R55: the nearby ones react). */
export const REACT_RADIUS = 12.0;
/** How far a reacting NPC steps back from the face-off before watching. */
const FLEE_OFFSET = 2.4;
/** Two NPCs this close to each other start talking. */
const CHAT_RADIUS = 3.6;
/** An NPC is on its route if it is within this of one of its segments. */
export const ROUTE_TOLERANCE = 2.0;

/**
 * The routes. `at` names the landmark the stop belongs to, which is what makes
 * the walk read as "between locations" instead of random drift. Waypoint y is
 * the surface it stands on: 0 for the street, deck/portico height for a porch.
 * Every street stop keeps |x| <= 8 so an NPC never walks into a fence run or a
 * barrel (the corridor town.js leaves empty).
 */
export const ROUTES = Object.freeze([
  Object.freeze({
    id: 'saloon-row',
    stops: Object.freeze([
      Object.freeze({ x: -11.0, z: 16.5, y: DECK, sit: true }),
      Object.freeze({ x: -7.0, z: 15.0, y: 0 }),
      Object.freeze({ x: -7.0, z: 21.0, y: 0 }),
      Object.freeze({ x: -11.0, z: 19.4, y: DECK }),
    ]),
  }),
  Object.freeze({
    id: 'store-front',
    stops: Object.freeze([
      Object.freeze({ x: 11.9, z: 13.0, y: DECK }),
      Object.freeze({ x: 7.2, z: 12.0, y: 0 }),
      Object.freeze({ x: 7.2, z: 17.0, y: 0, sit: true }),
    ]),
  }),
  Object.freeze({
    id: 'bank-end',
    stops: Object.freeze([
      Object.freeze({ x: -11.9, z: -13.5, y: PORTICO }),
      Object.freeze({ x: -6.8, z: -12.0, y: 0 }),
      Object.freeze({ x: -6.8, z: -17.0, y: 0 }),
    ]),
  }),
  Object.freeze({
    id: 'sheriff-walk',
    stops: Object.freeze([
      Object.freeze({ x: -11.9, z: 3.2, y: DECK }),
      Object.freeze({ x: -6.4, z: 1.0, y: 0, sit: true }),
      Object.freeze({ x: -6.4, z: 7.0, y: 0 }),
    ]),
  }),
  Object.freeze({
    id: 'north-side',
    stops: Object.freeze([
      Object.freeze({ x: -10.8, z: 22.0, y: DECK }),
      Object.freeze({ x: -6.0, z: 24.5, y: 0 }),
      Object.freeze({ x: -6.0, z: 18.5, y: 0 }),
    ]),
  }),
]);

/** Cheap clothes: five muted shirts/vests, all reusing cowboy.js's cached mats. */
const CLOTHES = Object.freeze([
  Object.freeze({ shirt: 0x7a6a55, vest: 0x4a3a2c, pants: 0x3f362c, hat: 0x6b5236, bandana: 0x8e3b2e }),
  Object.freeze({ shirt: 0x5d6f7a, vest: 0x3a4650, pants: 0x4a4038, hat: 0x4a3a2c, bandana: 0x3d6f6a }),
  Object.freeze({ shirt: 0x8a7040, vest: 0x5c4128, pants: 0x3a332c, hat: 0x8a6a45, bandana: 0xc2a37a }),
  Object.freeze({ shirt: 0x6b5a6a, vest: 0x40362c, pants: 0x2f2418, hat: 0x5c4128, bandana: 0x6b8f71 }),
  Object.freeze({ shirt: 0x9a8f80, vest: 0x6e4b2a, pants: 0x4a3a2c, hat: 0x3c2f22, bandana: 0x8d5a3b }),
]);

const NAMES = Object.freeze(['Bart Fewley', 'Mae Delroy', 'Tobias Reed', 'Old Cass', 'Young Danny']);

/** Tiny per-NPC LCG: reproducible dwell choices, no Math.random, no state file. */
function rng(seed) {
  let s = (seed * 2654435761) >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/**
 * Build the ambient crowd.
 * @param {object} opts.engine  owns the scene
 * @param {object} opts.rigCull the shared T010a culler (required: unculled rigs
 *                              blow the D7 draw-call budget)
 * @param {Array}  opts.routes  route override for tests
 */
export function createAmbientLife({ engine, rigCull, routes = ROUTES } = {}) {
  if (!engine || !engine.scene) throw new Error('createAmbientLife: needs an engine');
  if (!rigCull) throw new Error('createAmbientLife: needs the rig cull (D7/R21)');

  const npcs = routes.map((route, i) => {
    const cowboy = createCowboy(CLOTHES[i % CLOTHES.length], { scene: engine.scene });
    cowboy.group.name = `npc-${route.id}`;
    // Registered BEFORE the first frame, so the very first cull pass already
    // knows about them and the opening frame is inside the budget.
    rigCull.add(cowboy.group);
    const start = route.stops[0];
    cowboy.moveTo(start.x, start.y, start.z);
    return {
      name: NAMES[i % NAMES.length],
      id: cowboy.id,
      routeId: route.id,
      route,
      cowboy,
      group: cowboy.group,
      // Heading for stops[1], not stops[0]: the rig is BUILT on stops[0], so
      // walking toward it would mean arriving on frame one and dwelling. This
      // way the whole crowd is moving from the first rendered frame, which is
      // what lets a check sample motion across WWS.engine.frames.
      leg: 1,
      state: 'walk',
      dwell: 0,
      baseY: start.y,
      rand: rng(i + 7),
      heading: { x: 0, z: 1 },
      flee: null,
      homeLeg: 0,
      states: new Set(['walk']),
    };
  });

  /** Distance from a point to one segment, on the ground plane. */
  function distToSegment(p, a, b) {
    const vx = b.x - a.x;
    const vz = b.z - a.z;
    const len2 = vx * vx + vz * vz;
    if (len2 < 1e-6) return Math.hypot(p.x - a.x, p.z - a.z);
    let t = ((p.x - a.x) * vx + (p.z - a.z) * vz) / len2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(p.x - (a.x + t * vx), p.z - (a.z + t * vz));
  }

  /** How far an NPC has drifted from its own route polyline. */
  function routeOffset(npc) {
    const stops = npc.route.stops;
    let best = Infinity;
    for (let i = 0; i < stops.length; i += 1) {
      best = Math.min(best, distToSegment(npc.group.position, stops[i], stops[(i + 1) % stops.length]));
    }
    return best;
  }

  function setState(npc, next) {
    if (npc.state === next) return;
    npc.state = next;
    npc.states.add(next);
    const p = npc.cowboy.parts;
    if (next === 'sit') {
      // No `sit` pose exists in cowboy.js (T003 owns that table), so sitting is
      // built from `idle`: fold the thighs forward and drop the rig onto stool
      // height. setPose() zeroes the limbs again on the way out.
      npc.cowboy.setPose('idle');
      p.legL.rotation.x = -1.15;
      p.legR.rotation.x = -1.05;
      p.torso.rotation.x = 0.12;
      npc.group.position.y = npc.baseY - 0.2;
    } else if (next === 'walk') {
      npc.cowboy.setPose('walk');
      npc.group.position.y = npc.baseY;
    } else {
      npc.cowboy.setPose('idle');
      npc.group.position.y = npc.baseY;
    }
  }

  /**
   * Reached the stop this NPC was walking to: dwell here a moment. The dwell is
   * short (0.5..1.5 s of game time) so a check that samples a couple of seconds
   * of frames always catches most of the town moving.
   */
  function arrive(npc) {
    const here = npc.route.stops[npc.leg];
    npc.homeLeg = npc.leg;
    npc.baseY = here.y;
    npc.group.position.y = here.y;
    npc.dwell = 0.5 + npc.rand();
    setState(npc, here.sit && npc.rand() < 0.7 ? 'sit' : (npc.rand() < 0.4 ? 'chat' : 'stand'));
  }

  /** Dwell is over: set off for the next stop on the same loop. */
  function depart(npc) {
    npc.leg = (npc.leg + 1) % npc.route.stops.length;
    setState(npc, 'walk');
  }

  /** One step toward the current waypoint; returns true on arrival. */
  function walkLeg(npc, dt, speed) {
    const target = npc.route.stops[npc.leg];
    const p = npc.group.position;
    const dx = target.x - p.x;
    const dz = target.z - p.z;
    const d = Math.hypot(dx, dz);
    if (d <= 0.08) {
      // Step up onto the deck (or down off it) as the last part of the walk, so
      // a porch stop is reached at porch height instead of popping there.
      p.y = target.y;
      return true;
    }
    const step = Math.min(d, speed * dt);
    p.x += (dx / d) * step;
    p.z += (dz / d) * step;
    const dy = target.y - p.y;
    if (Math.abs(dy) > 0.005) p.y += Math.sign(dy) * Math.min(Math.abs(dy), 1.5 * dt);
    npc.heading.x = dx / d;
    npc.heading.z = dz / d;
    npc.cowboy.turnTo(dx, dz);
    return false;
  }

  function step(npc, dt) {
    const p = npc.group.position;
    if (npc.state === 'flee') {
      // Step back from the face-off, then stand and watch it. The offset is a
      // straight push away from the duel centre — no pathfinding, no animation.
      const f = npc.flee;
      const dx = f.x - p.x;
      const dz = f.z - p.z;
      const d = Math.hypot(dx, dz);
      if (d > 0.1) {
        const step2 = Math.min(d, FLEE_SPEED * dt);
        p.x += (dx / d) * step2;
        p.z += (dz / d) * step2;
        npc.cowboy.turnTo(dx, dz);
        npc.cowboy.update(dt, { speed: 1 });
        return;
      }
      setState(npc, 'watch');
      npc.dwell = 2.5 + npc.rand() * 2;
      return;
    }
    if (npc.state === 'walk') {
      if (walkLeg(npc, dt, WALK_SPEED)) { arrive(npc); return; }
      npc.cowboy.update(dt, { speed: 1 });
      return;
    }
    if (npc.state === 'watch' || npc.state === 'stand' || npc.state === 'sit' || npc.state === 'chat') {
      npc.dwell -= dt;
      if (npc.dwell <= 0) {
        setState(npc, 'walk');
        return;
      }
      if (npc.state === 'chat') {
        // Face whoever is close enough to talk to, and nod while at it.
        const partner = nearestOther(npc, CHAT_RADIUS);
        if (partner) npc.cowboy.turnTo(partner.group.position.x - p.x, partner.group.position.z - p.z);
        npc.cowboy.parts.head.rotation.y = Math.sin(npc.dwell * 5.2) * 0.35;
        npc.cowboy.parts.torso.rotation.x = 0.02 + Math.sin(npc.dwell * 2.6) * 0.03;
      }
      npc.cowboy.update(dt, { speed: 0 });
      return;
    }
    setState(npc, 'walk');
    if (walkLeg(npc, dt, WALK_SPEED)) arrive(npc);
    else npc.cowboy.update(dt, { speed: 1 });
  }

  function nearestOther(npc, radius) {
    let best = null;
    let bestD = radius;
    for (const o of npcs) {
      if (o === npc) continue;
      const d = Math.hypot(o.group.position.x - npc.group.position.x, o.group.position.z - npc.group.position.z);
      if (d < bestD) { bestD = d; best = o; }
    }
    return best;
  }

  /** One frame for the whole crowd. Called from main.js's pause-gated loop. */
  function update(dt) {
    const step2 = Number.isFinite(dt) ? Math.max(0, Math.min(dt, 0.05)) : 0;
    for (const npc of npcs) step(npc, step2);
  }

  /**
   * Drive the crowd forward in fixed steps without waiting on the browser, so a
   * check can watch a minute of town life in one call. Same code path as update.
   */
  function run(seconds, dt = 1 / 60) {
    const n = Math.max(1, Math.min(3600, Math.round(seconds / dt)));
    for (let i = 0; i < n; i += 1) update(dt);
    return snapshot();
  }

  /**
   * R55: a duel has started at `center`. Everyone within REACT_RADIUS changes
   * state and takes a step back; everyone else keeps walking their route.
   * @returns the names that reacted, so a check can prove the far ones did not.
   */
  let lastReact = null;
  let reactCalls = 0;
  function react(center) {
    const changed = [];
    for (const npc of npcs) {
      const p = npc.group.position;
      const dx = p.x - center.x;
      const dz = p.z - center.z;
      const d = Math.hypot(dx, dz);
      if (d > REACT_RADIUS) continue;
      const k = d < 0.001 ? 1 : FLEE_OFFSET / d;
      npc.flee = { x: p.x + dx * k, z: p.z + dz * k };
      setState(npc, 'flee');
      changed.push(npc.name);
    }
    // The centre is recorded so a check can measure the near/far split against
    // the point the crowd was ACTUALLY told about, instead of guessing where
    // main.js thought the face-off was (a ghost duel uses the camera; a staged
    // duel uses the two posts). `calls` counts every react(), so a check can
    // prove the duel itself fired a fresh reaction rather than reading a stale
    // record; settle() deliberately does not clear it, so the last duel's focus
    // stays readable after the town has calmed down.
    reactCalls += 1;
    lastReact = { x: +center.x.toFixed(3), z: +center.z.toFixed(3), changed: changed.length, calls: reactCalls };
    return changed;
  }

  /** The duel is over: everyone walks the rest of their own route again. */
  function settle() {
    for (const npc of npcs) {
      npc.flee = null;
      // Resume from the stop it was heading for when it broke off, so a fleeing
      // NPC does not teleport onto a different leg of its loop.
      npc.leg = npc.homeLeg;
      npc.baseY = npc.route.stops[npc.leg].y;
      setState(npc, 'walk');
      npc.dwell = 0;
    }
  }

  function snapshot() {
    return {
      count: npcs.length,
      reactRadius: REACT_RADIUS,
      tolerance: ROUTE_TOLERANCE,
      lastReact: lastReact ? { ...lastReact } : null,
      npcs: npcs.map((npc) => ({
        name: npc.name,
        rig: npc.group.name,
        routeId: npc.routeId,
        state: npc.state,
        pose: npc.cowboy.pose,
        states: [...npc.states],
        leg: npc.leg,
        x: +npc.group.position.x.toFixed(4),
        y: +npc.group.position.y.toFixed(4),
        z: +npc.group.position.z.toFixed(4),
        yaw: +npc.group.rotation.y.toFixed(4),
        offset: +routeOffset(npc).toFixed(4),
        route: npc.route.stops.map((s) => ({ x: s.x, z: s.z })),
      })),
    };
  }

  return { npcs, update, run, react, settle, snapshot, routeOffset, size: () => npcs.length };
}
