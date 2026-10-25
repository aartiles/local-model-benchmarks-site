/**
 * Real 3D shot resolution (R43/R46).
 *
 * `duel.requestShot()` decides WHETHER a trigger pull is a legal shot (the DRAW
 * rule, D4). This module decides what that legal shot DOES: it casts the bullet
 * from the player's muzzle along the aim direction and tests it against a
 * forgiving volume around the opponent's cowboy. A shot that is not on him misses.
 *
 * Aim lives behind exactly ONE accessor, `aimYaw()`. T016 built the steered aim
 * (src/weapons/aiming.js: mouse on desktop, right-side drag on touch) and hands
 * it in as `opts.aim`; while that aim is live it IS the accessor, otherwise the
 * player's facing yaw is. A test-only pin (WWS.setAimYaw) still wins over both,
 * so no hit logic may read yaw from anywhere else.
 *
 * T009c (R44/R45): a resolved shot also SPawns its feedback — pooled muzzle flash,
 * smoke, an impact puff on a hit or a dust puff on a miss, plus the recoil pose on
 * the shooter and the cartoon `hit` reaction on the opponent. The meshes live in
 * weapons/effects.js; this module only decides where and when, and owns the pose
 * decay clock, which `update(dt)` advances from the PAUSE-GATED frame callback in
 * main.js (so no effect or pose advances while paused, R66).
 *
 * T009d (R44): the SAME feedback for the opponent's bullet, through the symmetric
 * seam `fireFrom(shooter, target, hit, point)`. duel.js keeps the accuracy roll
 * (T010c) and the DRAW gate (D4); it only asks this seam to make his resolved shot
 * visible. The AI record lands in `lastFrom` and NEVER touches `last`, because
 * T009b/T016/T017a read the player's `last` synchronously after `fire()`.
 */
import { COWBOY_HEIGHT, COWBOY_RADIUS } from '../actors/cowboy.js';

/** How long each reaction pose is held before it decays back (seconds). */
export const POSE_HOLD = Object.freeze({ recoil: 0.14, hit: 0.45 });

/** R46: enemy hitboxes are forgiving, so aim does not need to be pixel-perfect. */
export const HITBOX = Object.freeze({
  radiusScale: 1.7,
  heightScale: 1.05,
});

/** Chest/revolver height above the feet the bullet leaves from. */
export const MUZZLE_HEIGHT = 1.22;
/** Bullets stop being interesting past this range (town is ~92 units across). */
export const MAX_RANGE = 80;

/**
 * @param {object} opts.engine  engine (for THREE)
 * @param {object} opts.player  createPlayer() result; uses player.cowboy
 * @param {object} opts.aim     T016 createAiming() result; consulted while live
 * @param {object} opts.audio   T018 (planned) audio system; `cue(name, at)` is
 *        called per shot when present. Optional — the game runs without it.
 */
export function createShooting({ engine, player, effects = null, aim = null, audio = null }) {
  const THREE = engine.THREE;

  // One reusable invisible capsule, positioned onto the current target per shot.
  // It is deliberately NOT in the scene graph: nothing renders it, and
  // THREE.Raycaster still intersects it via its own matrixWorld.
  const hitRadius = COWBOY_RADIUS * HITBOX.radiusScale;
  const hitHeight = COWBOY_HEIGHT * HITBOX.heightScale;
  const capsule = new THREE.Mesh(
    new THREE.CapsuleGeometry(hitRadius, Math.max(0.05, hitHeight - hitRadius * 2), 4, 8),
    new THREE.MeshBasicMaterial({ visible: false }),
  );
  capsule.name = 'shot-hitbox';
  const raycaster = new THREE.Raycaster();
  raycaster.far = MAX_RANGE;
  const origin = new THREE.Vector3();
  const dir = new THREE.Vector3();

  /** Test-only aim override (WWS.setAimYaw); null means "use facing". */
  let aimOverride = null;
  /**
   * T014b (R52): the Gunsmith Refit's hit tolerance, a multiplier >= 1 on the
   * hitbox RADIUS only. It widens the same capsule the T009b raycast already
   * tests — there is still exactly one hit test — and it changes nothing about
   * when a shot may be fired: the DRAW gate lives in duel.js and never reads
   * this number.
   */
  let tolerance = 1;
  let last = null;
  /** T009d: the opponent's most recent resolved shot (player-only `last` stays clean). */
  let lastFrom = null;

  /** Reaction poses waiting to decay: { cowboy, pose, left }. Drained by update(). */
  const pending = [];
  /** The opponent the most recent fire() call resolved against, for the hit pose. */
  let opponentRef = null;
  /** Reused so a shot allocates nothing. */
  const muzzleWorld = new THREE.Vector3();

  /**
   * Hold `cowboy` in `pose` for `seconds`, then hand it back (R44/R45).
   * `release` is the owner's own way back to its resting pose: the player must go
   * through player.releasePose() so its movement-pose bookkeeping stays in sync
   * (otherwise a walk started during the hold would be skipped by player.js's
   * "already in that pose" guard and the cowboy would freeze at idle).
   */
  function holdPose(cowboy, pose, seconds, release = null) {
    if (!cowboy) return;
    cowboy.setPose(pose);
    // A second shot before the first decay finished must not leave a stale entry
    // that snaps the pose back mid-duel (R66): replace, don't stack.
    const open = pending.find((p) => p.cowboy === cowboy);
    if (open) { open.pose = pose; open.left = seconds; open.release = release; }
    else pending.push({ cowboy, pose, left: seconds, release });
  }

  /** Drop one held pose back to its resting state. */
  function finishPose(p) {
    if (p.release) p.release();
    else p.cowboy.setPose('idle');
  }

  /**
   * Advance pose decay. Called from main.js's pause-gated gameplay callback, so
   * a paused game freezes both the effects and the reaction poses (R66).
   */
  function update(dt) {
    const step = Number.isFinite(dt) ? Math.min(Math.max(0, dt), 0.1) : 0;
    for (let i = pending.length - 1; i >= 0; i -= 1) {
      const p = pending[i];
      p.left -= step;
      if (p.left <= 0) {
        pending.splice(i, 1);
        finishPose(p);
      }
    }
    if (effects) effects.update(dt);
    return api;
  }

  /** Drop every pending pose and effect (duel teardown / restart, R66). */
  function cancelReactions() {
    for (const p of pending.splice(0)) finishPose(p);
    if (effects) effects.clear();
  }

  /** THE aim accessor (T016 owns replacing its body). Yaw 0 faces +Z. */
  function aimYaw() {
    if (Number.isFinite(aimOverride)) return aimOverride;   // test pin wins over both
    if (aim && aim.live) return aim.yaw();                  // steered aim, duel only
    return player.cowboy.yaw;                               // facing (exploration default)
  }

  /** Unit aim direction in world space, from the single yaw accessor. */
  function aimDirection(out = dir) {
    const yaw = aimYaw();
    return out.set(Math.sin(yaw), 0, Math.cos(yaw)).normalize();
  }

  /**
   * Resolve one accepted player shot against `opponent` (the live duel record,
   * which carries `cowboy`). Returns the record a check reads via WWS.shooting().
   */
  function fire(opponent) {
    opponentRef = opponent && opponent.cowboy ? opponent : null;
    const p = player.cowboy.group.position;
    origin.set(p.x, p.y + MUZZLE_HEIGHT, p.z);
    aimDirection();
    const record = {
      hit: false,
      aimYaw: aimYaw(),
      origin: { x: origin.x, y: origin.y, z: origin.z },
      direction: { x: dir.x, y: dir.y, z: dir.z },
      point: null,
      distance: null,
      target: opponent && opponent.name ? opponent.name : null,
    };
    last = record;

    const body = opponent && opponent.cowboy ? opponent.cowboy.group.position : null;
    if (!body) return spawn(record, null, 0);
    const bodyDist = Math.hypot(body.x - origin.x, body.y + hitHeight / 2 - origin.y, body.z - origin.z);

    capsule.position.set(body.x, body.y + hitHeight / 2, body.z);
    capsule.updateMatrixWorld(true);
    raycaster.set(origin, dir);
    const hits = raycaster.intersectObject(capsule, false);
    if (hits.length) {
      record.hit = true;
      record.point = { x: hits[0].point.x, y: hits[0].point.y, z: hits[0].point.z };
      record.distance = hits[0].distance;
    }
    return spawn(record, body, bodyDist);
  }

  /**
   * R44/R45: make the resolved shot visible and felt. Runs for every shot this
   * module resolves, hit or miss, and never changes the record's outcome.
   */
  function spawn(record, body, bodyDist) {
    // Flash and smoke come off the actual barrel, so they follow the aim pose.
    const muzzle = player.cowboy.parts.muzzle;
    muzzle.getWorldPosition(muzzleWorld);
    const at = { x: muzzleWorld.x, y: muzzleWorld.y, z: muzzleWorld.z };
    if (effects) {
      effects.muzzleFlash(at);
      effects.smoke(at);
      if (record.hit && record.point) effects.impact(record.point);
      else if (body) {
        // Aim is horizontal, so a miss travels past him: kick dust up at his feet
        // downrange rather than inventing a wall hit we cannot see.
        const d = Math.min(MAX_RANGE, Math.max(1, bodyDist));
        effects.miss({
          x: origin.x + dir.x * d,
          y: 0.06,
          z: origin.z + dir.z * d,
        });
      }
    }
    // Recoil kick on the gun arm (R44), cartoon hit reaction on the target (R45).
    // The player's decay goes through player.releasePose() so its movement-pose
    // bookkeeping stays in sync; opponents simply return to idle.
    holdPose(player.cowboy, 'recoil', POSE_HOLD.recoil, () => player.releasePose('idle'));
    if (record.hit && opponentRef) holdPose(opponentRef.cowboy, 'hit', POSE_HOLD.hit);
    if (audio && audio.cue) audio.cue('gunshot', at);   // T018: gunshot audio slot
    record.effects = effects ? effects.snapshot() : null;
    return record;
  }

  /**
   * T009d (R44): the symmetric seam — the OPPONENT's resolved shot gets the same
   * pooled feedback. duel.js owns the accuracy roll and the outcome (D4/T010c);
   * this only makes his bullet seen and felt. No raycast, no aim read: the hit
   * flag comes from the duel, and the impact/dust points are placed on the
   * target, so T009b's aim/hitbox contract stays untouched.
   *
   * @param {object} shooter  the live opponent record (carries `cowboy`, `name`)
   * @param {object} target   createPlayer() result (carries `cowboy`, `releasePose`)
   * @param {boolean} hit     the duel's accuracy-roll verdict
   * @param {object} point    optional impact point; defaults to the target's chest
   */
  function fireFrom(shooter, target, hit, point = null) {
    const record = {
      shooter: shooter && shooter.name ? shooter.name : 'opponent',
      hit: !!hit,
      origin: null,
      point: null,
      missAt: null,
      distance: null,
      target: target && target.cowboy ? 'player' : null,
    };
    // Flash and smoke come off HIS barrel, so they read as his shot, not yours.
    const muzzle = shooter && shooter.cowboy ? shooter.cowboy.parts.muzzle : null;
    if (muzzle) {
      muzzle.getWorldPosition(muzzleWorld);
      record.origin = { x: muzzleWorld.x, y: muzzleWorld.y, z: muzzleWorld.z };
    }
    const body = target && target.cowboy ? target.cowboy.group.position : null;
    if (body) {
      record.distance = record.origin
        ? Math.hypot(body.x - record.origin.x, body.y - record.origin.y, body.z - record.origin.z)
        : null;
      if (record.hit) {
        record.point = point
          ? { x: point.x, y: point.y, z: point.z }
          : { x: body.x, y: body.y + MUZZLE_HEIGHT, z: body.z };
      } else if (record.origin) {
        // His aim was off: the bullet travels past you, so kick dust up just
        // downrange of the target along the shot line, on the ground (R44/R45).
        const dx = body.x - record.origin.x;
        const dz = body.z - record.origin.z;
        const d = Math.hypot(dx, dz) || 1;
        record.missAt = { x: body.x + (dx / d) * 1.2, y: 0.06, z: body.z + (dz / d) * 1.2 };
      }
    }
    if (effects) {
      if (record.origin) {
        effects.muzzleFlash(record.origin);
        effects.smoke(record.origin);
      }
      if (record.point) effects.impact(record.point);
      else if (record.missAt) effects.miss(record.missAt);
    }
    // Same poses, same decay clock, same teardown funnel (cancelReactions) as the
    // player's shot: recoil on the shooter, cartoon hit on the target. The
    // player's release goes through player.releasePose() (T009c's bookkeeping rule).
    if (shooter && shooter.cowboy) holdPose(shooter.cowboy, 'recoil', POSE_HOLD.recoil);
    if (record.hit && target && target.cowboy) {
      holdPose(target.cowboy, 'hit', POSE_HOLD.hit,
        target.releasePose ? () => target.releasePose('idle') : null);
    }
    if (audio && audio.cue && record.origin) audio.cue('gunshot', record.origin);   // T018 slot
    record.effects = effects ? effects.snapshot() : null;
    lastFrom = record;
    return record;
  }

  const api = {
    hitbox: { radius: hitRadius, radiusLive: hitRadius, height: hitHeight,
      muzzleHeight: MUZZLE_HEIGHT, range: MAX_RANGE },
    get last() { return last; },
    /** T014b (R52): the live hit tolerance multiplier and what it widens to. */
    get tolerance() { return tolerance; },
    setTolerance(scale) {
      if (!Number.isFinite(scale) || scale < 1) {
        throw new Error(`setTolerance: not a tolerance multiplier: ${scale}`);
      }
      tolerance = scale;
      // Widen the ONE capsule fire() already tests. Height is untouched: the
      // bullet flies on a flat lane, so a taller hitbox would be a lie.
      capsule.scale.set(tolerance, 1, tolerance);
      api.hitbox.radiusLive = hitRadius * tolerance;
      return api.hitbox.radiusLive;
    },
    /** T009d: the opponent's most recent resolved shot (never the player's). */
    get lastFrom() { return lastFrom; },
    aimYaw,
    aimDirection,
    fire,
    /** T009d: the AI-shot seam duel.js calls through main.js's wiring. */
    fireFrom,
    /** WWS.setAimYaw(rad): finite yaw pins the aim, null restores facing. */
    setAimYaw(rad) {
      if (rad === null || rad === undefined) aimOverride = null;
      else if (Number.isFinite(rad)) aimOverride = rad;
      else throw new Error(`setAimYaw: not a yaw in radians: ${rad}`);
      return aimYaw();
    },
    snapshot() { return last ? { ...last } : null; },
    snapshotFrom() { return lastFrom ? { ...lastFrom } : null; },
    /** T009c: driven by main.js's pause-gated gameplay callback (R66). */
    update,
    cancelReactions,
    /** What a check reads: which reaction poses are still held. */
    reactions() { return pending.map((p) => ({ pose: p.pose, left: p.left })); },
  };
  return api;
}
