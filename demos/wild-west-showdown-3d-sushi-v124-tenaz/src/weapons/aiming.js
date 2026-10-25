/**
 * Aim control (T016, R46) — the reticle the player steers during a duel.
 *
 * shooting.js resolves a bullet along ONE yaw (its `aimYaw()` accessor). This
 * module owns that yaw while a duel is live:
 *
 *     aim yaw = player facing yaw + offset
 *
 * The facing yaw is what stageDuel() set, i.e. straight down the lane at the
 * opponent, so offset 0 is a centred aim and the duel is winnable without
 * touching the mouse at all. R46 asks for *meaningful* aim control, not
 * pixel-perfect aim: the hitbox is forgiving (shooting.js HITBOX, 1.7x radius,
 * ~7 degrees of lane at the 7m duel gap), so a small nudge still hits and only
 * a deliberate sweep misses.
 *
 * Two input paths, one accumulator (D4/R28: the device never decides anything
 * about the duel, only about the yaw):
 *   desktop  free mouse movement over the canvas (mousemove, no button needed)
 *   touch    the right-side drag pad from T015, which feeds input.addDrag()
 * The drag accumulator is shared with the camera rig, so this module drains it
 * ONLY while a duel is live — and it is live exactly when the rig has
 * `setControl(false)` and would discard that drag anyway. Nothing is lost on
 * either side, and exploration camera drag is untouched.
 *
 * Aim speed is exposed through ONE accessor pair, aimSpeed()/setAimSpeed(), so
 * the aim upgrade from T014 can change how many radians a pixel is worth
 * without touching the reticle, the input path or the hit logic.
 */

/** Radians of aim offset per pixel of mouse/drag movement (T014 tunes this). */
const AIM_SPEED = 0.0016;
/** How far off the lane the player may point, in radians (~20 degrees). */
const MAX_OFFSET = 0.35;
/** Half-width of the reticle's travel across the screen, in viewport fraction. */
const RETICLE_RANGE = 0.16;

/** The duel phases where the player is allowed to steer his aim. */
const LIVE_PHASES = new Set(['position', 'faceoff', 'tension', 'draw', 'shooting']);

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/**
 * @param {object} opts.engine   engine (for THREE + the camera the reticle projects through)
 * @param {object} opts.input    input module (drag accumulator)
 * @param {object} opts.player   createPlayer() result; its cowboy yaw is the base
 * @param {object} opts.duel     the duel machine (phase + active decide when aim is live)
 * @param {object} opts.hud      hud module; setReticle() moves the crosshair
 * @param {object} opts.target   () => {x,z} world point to project the reticle onto
 */
export function createAiming({ engine, input, player, duel, hud = null, target = null } = {}) {
  const THREE = engine.THREE;
  let offset = 0;
  let speed = AIM_SPEED;
  let live = false;
  let lastX = null;
  let lastY = null;
  /** Where the reticle is painted right now, in viewport fractions. */
  const point = { x: 0.5, y: 0.5 };
  const ray = new THREE.Vector3();
  const origin = new THREE.Vector3();

  function steer(dx, dy) {
    if (!live) return;
    if (Number.isFinite(dx)) offset = clamp(offset + dx * speed, -MAX_OFFSET, MAX_OFFSET);
    // Vertical aim is deliberately not modelled: the bullet travels on a flat
    // lane at chest height (shooting.js MUZZLE_HEIGHT), so pitch would be a lie.
    if (Number.isFinite(dy)) { /* ignored on purpose */ }
  }

  function onMouseMove(event) {
    if (!live) { lastX = null; lastY = null; return; }
    // movementX is Chrome's own per-event delta; fall back to clientX so the
    // aim still steers on a synthetic event that carries no movement data.
    let dx = event.movementX;
    if (!Number.isFinite(dx)) {
      dx = lastX === null ? 0 : event.clientX - lastX;
      lastX = event.clientX;
      lastY = event.clientY;
    }
    steer(dx, 0);
  }

  window.addEventListener?.('mousemove', onMouseMove);

  /** Project the steered ray onto the opponent's plane and move the crosshair. */
  function paintReticle() {
    if (!hud) return;
    const p = player.cowboy.group.position;
    const yaw = player.cowboy.yaw + offset;
    origin.set(p.x, p.y + 1.22, p.z);
    const t = target ? target() : null;
    const dist = t ? Math.max(1, Math.hypot(t.x - p.x, t.z - p.z)) : 7;
    ray.set(origin.x + Math.sin(yaw) * dist, origin.y, origin.z + Math.cos(yaw) * dist);
    // Keep the reticle on the lane plane the bullet actually travels on, then
    // push it through the live camera so it lands where the barrel points.
    if (t) ray.y = 1.22;
    const v = ray.project(engine.camera);
    const fx = clamp(0.5 + v.x / 2, 0.02, 0.98);
    const fy = clamp(0.5 - v.y / 2, 0.02, 0.98);
    // The crosshair stays near the centre of the screen (unobtrusive, R46):
    // its travel is scaled, not the raw projection, so it never wanders off.
    point.x = 0.5 + clamp((fx - 0.5) * 0.6, -RETICLE_RANGE, RETICLE_RANGE);
    point.y = 0.5 + clamp((fy - 0.5) * 0.6, -RETICLE_RANGE, RETICLE_RANGE);
    hud.setReticle(point.x, point.y);
  }

  function update() {
    const want = !!(duel.active && LIVE_PHASES.has(duel.phase));
    if (want !== live) {
      live = want;
      if (!live) {
        // Hand the aim back to facing and the reticle back to centre (R66: no
        // leftover deflection may survive into the next duel).
        offset = 0;
        lastX = null;
        if (hud) hud.setReticle(0.5, 0.5);
      }
    }
    if (!live) return api;
    const d = input.consumeDrag();
    if (d.x) steer(d.x, d.y);
    paintReticle();
    return api;
  }

  const api = {
    get live() { return live; },
    get offset() { return offset; },
    get maxOffset() { return MAX_OFFSET; },
    /** THE aim accessor shooting.js reads: facing yaw + steered offset. */
    yaw() { return player.cowboy.yaw + offset; },
    /** ONE accessor for the aim upgrade (T014/R51): rad per pixel of movement. */
    aimSpeed() { return speed; },
    setAimSpeed(v) {
      if (!Number.isFinite(v) || v <= 0) throw new Error(`setAimSpeed: not a speed: ${v}`);
      speed = v;
      return speed;
    },
    reticle: point,
    update,
    snapshot() {
      return {
        live, offset, yaw: api.yaw(), facing: player.cowboy.yaw,
        speed, maxOffset: MAX_OFFSET, reticle: { ...point },
      };
    },
    dispose() {
      window.removeEventListener?.('mousemove', onMouseMove);
      if (hud) hud.setReticle(0.5, 0.5);
    },
  };
  return api;
}

export const AIM_DEFAULTS = Object.freeze({ speed: AIM_SPEED, maxOffset: MAX_OFFSET });
