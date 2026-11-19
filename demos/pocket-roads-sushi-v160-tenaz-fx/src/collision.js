// src/collision.js — R26 and R27: what an impact does to the run.
//
//   R26  An impact slows the car.
//   R27  An impact adds a 2 s penalty to the run time, applied once per distinct
//        collision (the same continuing contact does not add 2 s again).
//
// hazards.js (T017) answers "what is the car touching right now"; this module turns
// that answer into the two consequences, and nothing else. It does not query the
// road, does not touch the renderer, and does not read the clock: every value is a
// function of the state it is handed, so a replayed trace collides with the same ids
// in the same order and gets the same penalties (the DONE T002.page-boots check drives
// step() twice from reset() and requires byte-identical traces).
//
// The two halves of the job:
//
//   slow the car — physics.js's exported impactSpeedCut() decides how much speed
//   survives (IMPACT_KEEP of it, at least IMPACT_MIN_CUT_KMH off when there is that
//   much). This module never re-derives that number; it calls the model's own
//   function, so physics.js stays the single owner of the driving feel.
//
//   charge the penalty — race.js's addPenalty() accumulates PENALTY_MS (2 000 ms,
//   R27) once per DISTINCT collision id. "Distinct" is tracked here, in a set of the
//   ids charged during the current contact: while the query keeps reporting the same
//   object the set already holds it, so a car scraping a guardrail for three seconds
//   pays for one collision, not a hundred. The set is released when contact ends —
//   the query reports no hit — so driving off and back into the same cone is a new
//   collision and charges again, which is what the card's Context asks for.
//
// The speed cut is applied on the same frame as the charge, and only on that frame:
// a continuing contact neither charges nor slows, so the car is never ground to a halt
// by an object it is still touching (R26 says an impact slows the car, not that a
// scrape stops it).
//
// Two entry points, one implementation:
//   createCollision(race) → the tracker main.js owns (explicit reset(), a reusable
//       status object, so the frame loop allocates nothing);
//   applyCollision(race, hit) / applyCollision(car, race, hit) → the one-shot form,
//       stateful per race through a WeakMap, for a caller that has no tracker.
//
// Pure math: imports physics.js and race.js only, so a Node check can run it exactly
// as the page does.

import { impactSpeedCut } from './physics.js';
import { PENALTY_MS } from './race.js';

/** R27: the penalty one distinct collision costs, in milliseconds. */
export const COLLISION_PENALTY_MS = PENALTY_MS;

/** The numbers of this module, for the debug handle and the checks. */
export const COLLISION = { PENALTY_MS: COLLISION_PENALTY_MS };

const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

/** A race machine (or anything that accumulates penalties the same way). */
function isRace(value) {
  return !!value && typeof value.addPenalty === 'function';
}

/** A car state from physics.js: the only thing that can be slowed down. */
function isCar(value) {
  return !!value && typeof value === 'object' && Number.isFinite(Number(value.speedKmh));
}

/** A hit record from hazards.js's hazardQuery(). */
function isHit(value) {
  return !!value && typeof value === 'object' && (value.hit === true || value.hit === false);
}

/**
 * A race-shaped accumulator for a caller that only wants the speed cut. It keeps the
 * penalty bookkeeping in one place instead of spreading `if (race)` through apply().
 */
function nullRace() {
  let ms = 0;
  return {
    penaltyStepMs: COLLISION_PENALTY_MS,
    get penaltyMs() {
      return ms;
    },
    addPenalty(add = COLLISION_PENALTY_MS) {
      ms += num(add) > 0 ? num(add) : 0;
      return ms;
    },
  };
}

/**
 * The collision tracker for one run.
 * @param {object} race  race.js's machine (or anything with addPenalty/penaltyMs)
 * @param {object} options { penaltyMs, impactSpeedCut, onImpact }
 * @returns {{apply, reset, release, status, snapshot, charged, count, penaltyMs, log}}
 */
export function createCollision(race = null, options = {}) {
  const target = isRace(race) ? race : nullRace();
  const stepMs = num(options.penaltyMs) > 0 ? num(options.penaltyMs) : COLLISION_PENALTY_MS;
  const cutFn = typeof options.impactSpeedCut === 'function' ? options.impactSpeedCut : impactSpeedCut;
  const onImpact = typeof options.onImpact === 'function' ? options.onImpact : null;

  // The ids charged during the CURRENT contact. Cleared when the query reports no
  // hit, which is what makes re-contact with the same object a new collision (R27).
  const charged = new Set();
  const log = [];
  let impacts = 0;
  let addedMs = 0;
  let last = null;

  // Reused every frame: step() runs this 60 times a second and must not allocate.
  const status = {
    hit: false,
    id: null,
    kind: null,
    impact: false,
    speedBefore: 0,
    speedAfter: 0,
    cutKmh: 0,
    penaltyAddedMs: 0,
    penaltyMs: 0,
    racePenaltyMs: 0,
    count: 0,
    chargedCount: 0,
    released: 0,
    s: 0,
    lateral: 0,
  };

  function write(car, hit, released) {
    status.hit = !!(hit && hit.hit);
    status.id = status.hit ? hit.id : null;
    status.kind = status.hit ? hit.kind || null : null;
    status.s = num(car && car.s);
    status.lateral = num(car && car.lateral);
    status.chargedCount = charged.size;
    status.count = impacts;
    status.penaltyMs = addedMs;
    status.racePenaltyMs = num(target.penaltyMs);
    status.released = released;
    return status;
  }

  const tracker = {
    race: target,
    penaltyStepMs: stepMs,
    charged,

    /** The ids charged during the current contact, as a plain array. */
    get chargedIds() {
      return Array.from(charged);
    },
    /** Distinct collisions charged since the last reset(). */
    get count() {
      return impacts;
    },
    /** Milliseconds this tracker has added to the run. */
    get penaltyMs() {
      return addedMs;
    },
    get last() {
      return last;
    },
    /** The impacts of this run, oldest first: { id, kind, s, speedBefore, speedAfter, ms }. */
    get log() {
      return log;
    },

    /**
     * One frame of R26 + R27. `hit` is hazards.js's hazardQuery() result for the car
     * state AFTER this frame's physics (main.js's frame order), `car` is that state.
     * Mutates the car's speed and the race's penalty, and returns the reused status.
     */
    apply(car, hit) {
      const id = hit && hit.hit ? hit.id : null;
      let released = 0;

      if (!id) {
        // Contact has ended: release every id, so the next touch of any of them is a
        // new collision. No cut, no penalty.
        released = charged.size;
        if (released) charged.clear();
        status.impact = false;
        status.speedBefore = num(car && car.speedKmh);
        status.speedAfter = status.speedBefore;
        status.cutKmh = 0;
        status.penaltyAddedMs = 0;
        return write(car, hit, released);
      }

      if (charged.has(id)) {
        // The same continuing contact (R27): neither a second penalty nor a second cut.
        status.impact = false;
        status.speedBefore = num(car.speedKmh);
        status.speedAfter = status.speedBefore;
        status.cutKmh = 0;
        status.penaltyAddedMs = 0;
        return write(car, hit, 0);
      }

      // A distinct collision: charge it, then slow the car for it.
      charged.add(id);
      const before = num(car.speedKmh);
      const after = Math.max(0, num(cutFn(before)));
      car.speedKmh = after;
      target.addPenalty(stepMs);
      addedMs += stepMs;
      impacts += 1;
      last = {
        id,
        kind: hit.kind || null,
        s: num(car.s),
        lateral: num(car.lateral),
        speedBefore: before,
        speedAfter: after,
        cutKmh: before - after,
        ms: stepMs,
        index: impacts - 1,
      };
      log.push(last);
      if (onImpact) onImpact(last);

      status.impact = true;
      status.speedBefore = before;
      status.speedAfter = after;
      status.cutKmh = before - after;
      status.penaltyAddedMs = stepMs;
      return write(car, hit, 0);
    },

    /** Forget one id now, so touching it again counts as a fresh collision. */
    release(id) {
      return charged.delete(id);
    },

    /**
     * Back to no contact and no penalties: what reset() calls, so a replayed trace
     * charges the same ids the first run did.
     */
    reset() {
      charged.clear();
      log.length = 0;
      impacts = 0;
      addedMs = 0;
      last = null;
      status.hit = false;
      status.id = null;
      status.kind = null;
      status.impact = false;
      status.penaltyAddedMs = 0;
      status.cutKmh = 0;
      status.speedBefore = 0;
      status.speedAfter = 0;
      status.s = 0;
      status.lateral = 0;
      status.chargedCount = 0;
      status.count = 0;
      status.penaltyMs = 0;
      status.racePenaltyMs = num(target.penaltyMs);
      status.released = 0;
      return tracker;
    },

    /** The live status object (the same one step() stores in state.collision). */
    status() {
      return status;
    },

    /** A fresh plain readout, for JSON (the debug handle, the HUD, a check). */
    snapshot() {
      return {
        hit: status.hit,
        id: status.id,
        kind: status.kind,
        impact: status.impact,
        speedBefore: status.speedBefore,
        speedAfter: status.speedAfter,
        cutKmh: status.cutKmh,
        penaltyAddedMs: status.penaltyAddedMs,
        penaltyMs: addedMs,
        racePenaltyMs: num(target.penaltyMs),
        count: impacts,
        chargedIds: Array.from(charged),
        released: status.released,
        s: status.s,
        lateral: status.lateral,
        penaltyStepMs: stepMs,
        last,
      };
    },
  };

  return tracker;
}

// The one-shot form keeps its "already charged" set per race, so calling
// applyCollision(race, hit) every frame obeys R27 without the caller owning a tracker.
const TRACKERS = new WeakMap();
function trackerFor(race) {
  if (!race || typeof race !== 'object') return null;
  let t = TRACKERS.get(race);
  if (!t) {
    t = createCollision(race);
    TRACKERS.set(race, t);
  }
  return t;
}

/**
 * R26 + R27 in one call. Two shapes, because the card names `applyCollision(race, hit)`
 * and the frame loop has the car in hand:
 *
 *   applyCollision(race, hit)              — hit carries the car as `hit.car`
 *   applyCollision(car, race, hit)         — the same thing, spelled out
 *
 * The charged set follows the `race` object, so it survives between frames and is
 * cleared by reset() (which calls race.restart() and collision.reset()).
 *
 * Unlike tracker.apply(), this returns a FRESH status object: a caller that has no
 * tracker is also a caller that may keep the results it is handed, and the reused
 * status would alias every frame to the last one.
 */
export function applyCollision(a, b, c, d = {}) {
  let car = null;
  let race = null;
  let hit = null;
  if (isRace(a)) {
    race = a;
    hit = isHit(b) ? b : null;
    car = (hit && (hit.car || hit.state)) || (isCar(b) ? b : (isCar(c) ? c : null));
  } else {
    car = isCar(a) ? a : null;
    race = isRace(b) ? b : null;
    hit = isHit(c) ? c : null;
  }
  if (!hit || !car) return null;
  const tracker = trackerFor(race) || createCollision(race, d);
  const status = tracker.apply(car, hit);
  return status ? { ...status } : null;
}

/** The charged set of a race's one-shot tracker — what reset() must clear. */
export function clearCollisions(race) {
  const t = race && TRACKERS.get(race);
  if (!t) return false;
  t.reset();
  return true;
}
