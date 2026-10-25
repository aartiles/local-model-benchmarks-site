import { createCowboy } from '../actors/cowboy.js';
import { createBounds, PLAY_AREA } from '../world/bounds.js';
import { colliders as townColliders, TOWN } from '../world/town.js';

/**
 * The player controller (R22/R24). Reads input, moves the cowboy relative to
 * the camera yaw, turns it to face where it is going, and keeps it inside the
 * play area (R16).
 *
 * Feel is arcade (R23): acceleration is immediate, there is no momentum to
 * slide on, and facing snaps to the movement direction. Diagonal input is
 * normalised so a diagonal walk is not a free speed boost.
 *
 * Movement is always camera-relative: input.moveAxis() is in screen space and
 * this module rotates it by the yaw handed to step(). T005 owns that yaw; the
 * basis below is the one contract between the two modules.
 */

export const PLAYER = Object.freeze({
  walkSpeed: 3.4,
  runSpeed: 6.3,
  /** Where the cowboy stands when the game enters `exploring`. */
  startX: 0,
  startZ: 12,
  startYaw: Math.PI,
});

/**
 * @param {object} opts.engine  engine (scene + THREE)
 * @param {object} opts.input   createInput() result
 * @param {object} opts.bounds  createBounds() result; defaults to PLAY_AREA inset by the body radius
 * @param {object} opts.palette cowboy palette (T014 sells hat/outfit variants)
 */
export function createPlayer({ engine, input, bounds, colliders: collidersOpt, palette = {}, spawn = {} } = {}) {
  const cowboy = createCowboy(palette, { scene: engine.scene });
  const area = bounds || createBounds(PLAY_AREA, { inset: cowboy.radius });
  // T033 (R13/R16): the town's own building records, inflated by the body radius.
  // Nothing hand-typed: move a structure in TOWN.structures and its collider
  // moves with it. Boxes are 2D because every structure starts at y = 0.
  const solids = (collidersOpt || townColliders(TOWN)).map((b) => ({
    minX: b.minX - cowboy.radius, maxX: b.maxX + cowboy.radius,
    minZ: b.minZ - cowboy.radius, maxZ: b.maxZ + cowboy.radius,
  }));
  /** The inflated box containing (x, z), or null. Point test: boxes are inflated. */
  function insideSolid(x, z) {
    for (const b of solids) {
      if (x > b.minX && x < b.maxX && z > b.minZ && z < b.maxZ) return b;
    }
    return null;
  }
  const pos = new engine.THREE.Vector3(
    spawn.x ?? PLAYER.startX,
    0,
    spawn.z ?? PLAYER.startZ,
  );
  area.clamp(pos);
  cowboy.moveTo(pos.x, pos.y, pos.z);
  cowboy.setYaw(spawn.yaw ?? PLAYER.startYaw);

  let enabled = false;
  let poseName = 'idle';
  let speedNow = 0;
  let distance = 0;
  let blocked = 0; // metres of input eaten by a wall this frame

  function setPose(name) {
    if (poseName === name) return;
    cowboy.setPose(name);
    poseName = name;
  }

  /**
   * Advance one step. `cameraYaw` is the orbit camera's rotation.y; 0 means the
   * camera looks down -Z, so W walks the cowboy towards -Z.
   */
  function step(dt, { cameraYaw = 0 } = {}) {
    const step = Number.isFinite(dt) ? Math.max(0, Math.min(dt, 0.05)) : 0;
    let ax = 0;
    let az = 0;
    let running = false;
    if (enabled && input && step > 0) {
      const axis = input.moveAxis();
      ax = axis.x;
      az = axis.z;
      running = input.isRunning();
    }

    // Screen basis -> world. forward = (-sin y, -cos y), right = (cos y, -sin y).
    let dx = 0;
    let dz = 0;
    if (ax !== 0 || az !== 0) {
      const s = Math.sin(cameraYaw);
      const c = Math.cos(cameraYaw);
      dx = -s * az + c * ax;
      dz = -c * az - s * ax;
      const len = Math.hypot(dx, dz);
      if (len > 1) { dx /= len; dz /= len; }
      else if (len < 1e-6) { dx = 0; dz = 0; }
    }

    const moving = dx !== 0 || dz !== 0;
    const target = moving ? (running ? PLAYER.runSpeed : PLAYER.walkSpeed) : 0;
    speedNow = target;

    if (moving && step > 0) {
      const beforeX = pos.x;
      const beforeZ = pos.z;
      // A teleport that left the cowboy inside a wall (T019/T020a park the
      // player for screenshots and never walk) recovers out of the nearest
      // face the first time it tries to move, so the slide below never sees
      // a start position that blocks every direction.
      const stuck = insideSolid(pos.x, pos.z);
      if (stuck) {
        const dl = pos.x - stuck.minX;
        const dr = stuck.maxX - pos.x;
        const dn = pos.z - stuck.minZ;
        const ds = stuck.maxZ - pos.z;
        const m = Math.min(dl, dr, dn, ds);
        if (m === dl) pos.x = stuck.minX - 1e-3;
        else if (m === dr) pos.x = stuck.maxX + 1e-3;
        else if (m === dn) pos.z = stuck.minZ - 1e-3;
        else pos.z = stuck.maxZ + 1e-3;
      }
      // Axis-separated move: try x, then z against the new x. That is what
      // makes a wall stop you without snagging - movement parallel to it
      // keeps sliding (arcade feel, R23).
      const wantX = pos.x + dx * speedNow * step;
      const wantZ = pos.z + dz * speedNow * step;
      if (!insideSolid(wantX, pos.z)) pos.x = wantX;
      if (!insideSolid(pos.x, wantZ)) pos.z = wantZ;
      area.clamp(pos);
      // Only count ground actually covered, so a check against a wall is honest.
      distance += Math.hypot(pos.x - beforeX, pos.z - beforeZ);
      blocked = Math.hypot(dx * speedNow * step, dz * speedNow * step)
        - Math.hypot(pos.x - beforeX, pos.z - beforeZ);
      // Arcade turning: face where you are going, immediately.
      cowboy.turnTo(dx, dz);
      setPose(running ? 'run' : 'walk');
    } else {
      // Never report a wall from a previous frame: a check reading `blocked`
      // while idle must see 0, not a stale value from the last collision.
      blocked = 0;
      setPose('idle');
    }

    cowboy.moveTo(pos.x, pos.y, pos.z);
    cowboy.update(step, { speed: moving ? (running ? 1 : 0.65) : 0 });
    return api;
  }

  const api = {
    cowboy,
    group: cowboy.group,
    parts: cowboy.parts,
    position: pos,
    bounds: area,
    get x() { return pos.x; },
    get z() { return pos.z; },
    get y() { return pos.y; },
    get yaw() { return cowboy.yaw; },
    // T009c (R44): report the pose the MODEL is in, not the movement pose we last
    // requested. A transient reaction pose (recoil) is held on the cowboy directly,
    // and `poseName` stays the movement pose so restorePose() can hand it back.
    get pose() { return cowboy.pose; },
    get speed() { return speedNow; },
    get distance() { return distance; },
    get blocked() { return blocked; },
    get enabled() { return enabled; },
    get running() { return speedNow >= PLAYER.runSpeed - 1e-9; },

    /** Exploration is the only phase where the player may walk around. */
    setEnabled(value) {
      enabled = !!value;
      if (!enabled) {
        speedNow = 0;
        setPose('idle');
      }
      return api;
    },

    /** Instant reposition (defeat recovery T011, duel posts T007, tests). Clamped. */
    teleport(x, z, yaw) {
      pos.x = x;
      pos.z = z;
      pos.y = 0;
      area.clamp(pos);
      cowboy.moveTo(pos.x, pos.y, pos.z);
      if (yaw !== undefined && Number.isFinite(yaw)) cowboy.setYaw(yaw);
      return api;
    },

    /** Return to the spawn point with a cleared trip counter. */
    respawn() {
      distance = 0;
      return api.teleport(PLAYER.startX, PLAYER.startZ, PLAYER.startYaw);
    },

    step,
    update: step,
    /**
     * T009c (R44): hand the model back from a transient reaction pose (recoil) and
     * keep the player's own pose bookkeeping in sync, so the next step() re-applies
     * walk/run instead of being skipped by the "already in that pose" guard.
     */
    releasePose(name = 'idle') {
      cowboy.setPose(name);
      poseName = name;
      return api;
    },
    dispose() {
      cowboy.dispose();
      return api;
    },
  };

  return api;
}
