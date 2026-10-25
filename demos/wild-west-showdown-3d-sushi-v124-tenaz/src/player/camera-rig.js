/**
 * Third-person orbit camera rig (R25/R26/R27).
 *
 * The camera sits on a sphere around a smoothed focus point that trails the
 * player. Mouse drag (input.consumeDrag, drained once per real frame) turns yaw
 * and pitch; pitch is clamped so the camera can never flip through vertical or
 * sink under the ground, and a short raycast from the focus towards the
 * camera pulls it in when a building would otherwise block the view (R26).
 * While control is frozen the drag is drained and discarded, never buffered.
 *
 * The yaw it reports is the same basis player.js uses: camera forward is
 * (-sin yaw, -cos yaw), so yaw 0 looks down -Z and W walks away from camera.
 *
 * T007 reuses setTarget()/setOrbit()/snapTo()/setControl() for cinematic duel
 * framing; during normal exploration the rig stays under player control.
 */

export const RIG = Object.freeze({
  /** Orbit radius in metres — far enough to read the whole cowboy (R25). */
  distance: 6.4,
  /** Occlusion never pulls the camera closer than this. */
  minDistance: 2.4,
  /** Pitch clamps: slightly above horizontal .. steep down, never vertical. */
  pitchMin: -0.10,
  pitchMax: 1.10,
  startPitch: 0.30,
  /** Radians of orbit per pixel of drag. */
  yawSpeed: 0.0052,
  pitchSpeed: 0.0034,
  /** Look-at point sits this high above the target's feet (chest height). */
  pivotHeight: 1.25,
  /** Exponential follow rate (1/s) of the focus towards the player. */
  followRate: 10,
  /** Occlusion pull-in: keep this much clearance, smooth in/out. */
  occlusionMargin: 0.5,
  occlusionPullRate: 18,
  occlusionReleaseRate: 6,
  /** The camera itself never goes below this world height. */
  minCameraY: 0.45,
});

const num = (v) => (Number.isFinite(v) ? v : 0);
const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

/**
 * @param {object} opts.engine  engine (owns camera + scene)
 * @param {object} opts.input   createInput() result; drag is consumed per frame
 * @param {object} opts.target  Vector3 | Object3D | {x,y,z} to orbit
 * @param {object} opts.exclude Object3D subtree the occlusion ray ignores (the player)
 * @param {object} opts.config  overrides for RIG constants
 */
export function createCameraRig({ engine, input = null, target = null, exclude = null, config = {} } = {}) {
  const THREE = engine.THREE;
  const cfg = { ...RIG, ...config };
  const camera = engine.camera;
  camera.up.set(0, 1, 0);

  let yaw = 0;
  let pitch = cfg.startPitch;
  let baseDist = cfg.distance;
  let dist = cfg.distance; // smoothed actual radius (occlusion pulls it in)
  let occluded = false;
  let control = true;
  let targetRef = target;
  let excludeRef = exclude;
  let excludeSet = new Set();
  let hasFocus = false;

  const focus = new THREE.Vector3();
  const pivot = new THREE.Vector3();
  const dir = new THREE.Vector3(); // unit: pivot -> camera
  const tmp = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();

  /**
   * Fixed list of meshes the occlusion ray may hit (R21). null falls back to
   * scene.children, which is fine for the empty placeholder scene but becomes
   * unbounded once the town exists — T006 must call setOccluders().
   */
  let occluders = Array.isArray(cfg.occluders) ? cfg.occluders.slice() : null;

  function rebuildExclude() {
    excludeSet = new Set();
    if (excludeRef) excludeRef.traverse((o) => excludeSet.add(o));
  }
  rebuildExclude();

  function resolveTarget(out) {
    const t = targetRef;
    if (!t) return out.set(0, 0, 0);
    const p = t.isVector3 || t.position === undefined ? t : t.position;
    return out.set(num(p.x), num(p.y), num(p.z));
  }

  /** Nearest solid thing between the pivot and the desired camera position. */
  function blockedAt(unitDir) {
    raycaster.set(pivot, unitDir);
    raycaster.far = baseDist;
    const list = occluders || engine.scene.children;
    const hits = raycaster.intersectObjects(list, true);
    for (const h of hits) {
      if (h.object === camera || excludeSet.has(h.object)) continue;
      return h.distance;
    }
    return null;
  }

  function update(dt) {
    const step = Number.isFinite(dt) ? Math.max(0, Math.min(dt, 0.05)) : 0;

    // 1. Drag -> orbit angles. Every real frame DRAINS the drag accumulator,
    //    but only a frame with control APPLIES it. Otherwise pixels dragged
    //    during a scripted sequence (setControl(false)) would sit in input and
    //    land in one burst the moment control returns. Only real frames drain,
    //    so snapTo()/update(0) never eats pixels a later frame should apply.
    if (step > 0 && input && typeof input.consumeDrag === 'function') {
      const d = input.consumeDrag();
      if (control) {
        if (d.x) yaw -= d.x * cfg.yawSpeed;
        if (d.y) pitch += d.y * cfg.pitchSpeed;
      }
    }
    if (!Number.isFinite(yaw)) yaw = 0;
    if (!Number.isFinite(pitch)) pitch = cfg.startPitch;
    pitch = clamp(pitch, cfg.pitchMin, cfg.pitchMax);

    // 2. Smooth follow: the focus chases the player, it never teleports.
    const tp = resolveTarget(tmp);
    if (!hasFocus) {
      focus.copy(tp);
      hasFocus = true;
    } else if (step > 0) {
      const k = 1 - Math.exp(-cfg.followRate * step);
      focus.x += (tp.x - focus.x) * k;
      focus.y += (tp.y - focus.y) * k;
      focus.z += (tp.z - focus.z) * k;
    }

    // 3. Desired position on the orbit sphere (yaw 0 => camera at +Z, facing -Z).
    pivot.set(focus.x, focus.y + cfg.pivotHeight, focus.z);
    const cp = Math.cos(pitch);
    dir.set(Math.sin(yaw) * cp, Math.sin(pitch), Math.cos(yaw) * cp);

    // 4. Occlusion: pull in behind a wall, ease back out when it clears.
    const hit = blockedAt(dir);
    const want = hit === null ? baseDist : Math.max(cfg.minDistance, hit - cfg.occlusionMargin);
    occluded = hit !== null;
    if (!Number.isFinite(dist)) dist = baseDist;
    const rate = want < dist ? cfg.occlusionPullRate : cfg.occlusionReleaseRate;
    dist += (want - dist) * (1 - Math.exp(-rate * step));

    // 5. Place and aim. lookAt with a fixed up vector cannot roll or flip, and
    //    the pitch clamp keeps the view direction off the vertical axis.
    camera.position.set(
      pivot.x + dir.x * dist,
      Math.max(cfg.minCameraY, pivot.y + dir.y * dist),
      pivot.z + dir.z * dist,
    );
    camera.lookAt(pivot);
    return api;
  }

  const api = {
    get yaw() { return yaw; },
    get pitch() { return pitch; },
    get distance() { return dist; },
    get desiredDistance() { return baseDist; },
    get occluded() { return occluded; },
    get focus() { return focus; },
    get position() { return camera.position; },
    get config() { return cfg; },
    get control() { return control; },
    update,

    /** Orbit something else (T007 duel staging). */
    setTarget(t) { targetRef = t; return api; },
    setExclude(o) { excludeRef = o; rebuildExclude(); return api; },
    /**
     * Bound the per-frame occlusion raycast to these meshes (R21). Pass null to
     * fall back to a full scene scan. T006 wires this to the town's solid walls.
     */
    setOccluders(list) {
      occluders = Array.isArray(list) ? list.slice() : null;
      return api;
    },
    get occluders() { return occluders; },
    setYaw(rad) { if (Number.isFinite(rad)) yaw = rad; return api; },
    /** Cinematic angles without a drag; pitch/distance stay inside the rig's limits. */
    setOrbit({ yaw: y, pitch: p, distance: d } = {}) {
      if (Number.isFinite(y)) yaw = y;
      if (Number.isFinite(p)) pitch = clamp(p, cfg.pitchMin, cfg.pitchMax);
      if (Number.isFinite(d)) baseDist = clamp(d, cfg.minDistance, 20);
      return api;
    },
    /** Freeze drag control during a scripted sequence (R27). */
    setControl(enabled) { control = !!enabled; return api; },
    /** Snap focus/radius onto the target and place the camera immediately. */
    snapTo() {
      focus.copy(resolveTarget(tmp));
      hasFocus = true;
      dist = baseDist;
      update(0);
      return api;
    },
    /** Back to the exploration pose (restart, phase changes). */
    reset() {
      yaw = 0;
      pitch = cfg.startPitch;
      baseDist = cfg.distance;
      return api.snapTo();
    },
    dispose() {
      // The rig owns no listeners; the engine camera simply stops being driven.
      return api;
    },
  };

  return api;
}
