import { noOcclude } from '../world/terrain.js';

/**
 * Shared distance culling for cowboy rigs (R21).
 *
 * One `createCowboy` rig is 21 meshes, i.e. ~21 draw calls, and D7 in
 * DECISIONS.md records a ceiling of 75 with a base of ~16 — so at most TWO rigs
 * may be drawn in a frame (16 + 42 = 58; three would be 79). This helper is the
 * single place that decides which rigs are drawn: a registered rig farther than
 * `radius` from the camera gets `group.visible = false`, which makes Three.js
 * skip the whole subtree. It is visibility, not part merging, so the named parts
 * T003 asserts on (`legL.boot` etc.) stay exactly where they are.
 *
 * It also stubs the rig's raycasts via `noOcclude()`. The camera rig scans the
 * whole scene graph every frame for occlusion (R26) and `scene.traverse` visits
 * INVISIBLE objects too, so culling by visibility alone does not bound that scan
 * — 7 rigs would be 147 extra raycast-answering meshes and blow the T026cc
 * budget. Stubbing is safe: `src/weapons/shooting.js` hits a separate invisible
 * capsule, never the cowboy meshes, and T005's occlusion check uses its own wall.
 *
 * A rig whose duel is live must never be culled (T010b/T011 depend on seeing the
 * opponent), so `add(group, {alwaysVisible})` pins a rig permanently and
 * `protect(group)` / `unprotect(group)` pin one for the duration of a duel.
 *
 * The radius alone cannot guarantee the budget: a crowded street could put three
 * rigs inside it. So `update()` also keeps at most `maxVisible` distance-culled
 * rigs drawn per frame, nearest first. With a base of ~16 calls (terrain + town +
 * effects) and 21 per rig, `maxVisible: 2` bounds a frame at 16 + 3*21 = 79 for
 * PINNED rigs only, so pinned rigs (the player) are counted against the cap too:
 * the cap is the total number of drawn rigs, nearest-first, pins included.
 */
export function createRigCull({ camera, radius = 18, maxVisible = 2 } = {}) {
  const entries = [];

  // Accepts the group itself or its name: the test hook crosses page
  // boundaries, where THREE objects do not serialize.
  function entryFor(group) {
    return entries.find((e) => e.group === group || e.name === group) || null;
  }

  /** Register a rig. Returns the entry so callers can keep a handle. */
  function add(group, opts = {}) {
    if (!group) throw new Error('createRigCull.add: no group');
    const existing = entryFor(group);
    if (existing) {
      if (opts.alwaysVisible) existing.alwaysVisible = true;
      return existing;
    }
    noOcclude(group);
    const entry = { group, name: group.name, alwaysVisible: !!opts.alwaysVisible, protected: false, culled: false };
    entries.push(entry);
    return entry;
  }

  function remove(group) {
    const i = entries.findIndex((e) => e.group === group);
    if (i >= 0) {
      entries[i].group.visible = true;
      entries.splice(i, 1);
      return true;
    }
    return false;
  }

  /** Pin a rig visible for as long as it is protected (a live duel). */
  function protect(group) {
    const e = entryFor(group);
    if (!e) return false;
    e.protected = true;
    e.group.visible = true;
    e.culled = false;
    return true;
  }

  function unprotect(group) {
    const e = entryFor(group);
    if (!e) return false;
    e.protected = false;
    return true;
  }

  // One scratch vector for the whole pass: update() runs every rendered frame for
  // every registered rig, and allocating a Vector3 per rig per frame is pure GC
  // churn that competes for the main thread with the checks running alongside.
  const scratch = new (camera.position.constructor)();

  /** Distance from the camera to a rig, on the horizontal plane (XZ). */
  function distanceTo(group) {
    const p = group.getWorldPosition(scratch);
    return Math.hypot(p.x - camera.position.x, p.z - camera.position.z);
  }

  /** One rig's live state by name, as plain serializable data for the test hook. */
  function inspect(name) {
    const e = entries.find((x) => x.name === name || x.group === name);
    if (!e) return null;
    return {
      name: e.name,
      visible: e.group.visible,
      culled: e.culled,
      pinned: e.alwaysVisible,
      protected: e.protected,
      distance: e.alwaysVisible || e.protected ? 0 : distanceTo(e.group),
    };
  }

  /**
   * Reposition a registered rig WITHOUT running a cull pass, and report the
   * (deliberately stale) decision. A check uses this to prove that the frame
   * loop in main.js applies the cull: the distance changes immediately, the
   * `visible`/`culled` flags only change when `update()` runs.
   */
  function move(name, x, z, y = 0) {
    const e = entries.find((q) => q.name === name);
    if (!e) return null;
    e.group.position.set(x, y, z);
    return inspect(name);
  }

  /** Decide which rigs this frame may be drawn. Call once per frame. */
  function update() {
    // Pinned rigs (the player, a live duel) are always drawn and eat the budget
    // first; the rest are ranked by distance and only the nearest few survive.
    const pinned = [];
    const rest = [];
    for (const e of entries) {
      e.distance = e.alwaysVisible || e.protected ? 0 : distanceTo(e.group);
      (e.alwaysVisible || e.protected ? pinned : rest).push(e);
    }
    rest.sort((a, b) => a.distance - b.distance);
    const room = Math.max(0, maxVisible - pinned.length);
    pinned.forEach((e) => { e.culled = false; e.group.visible = true; });
    rest.forEach((e, i) => {
      const far = e.distance > radius || i >= room;
      e.culled = far;
      e.group.visible = !far;
    });
    return pinned.length + rest.filter((e) => !e.culled).length;
  }

  return {
    radius,
    maxVisible,
    add,
    remove,
    protect,
    unprotect,
    update,
    move,
    distanceTo,
    size: () => entries.length,
    /** Names of the rigs currently hidden from the renderer. */
    culled: () => entries.filter((e) => e.culled).map((e) => e.name),
    /** Names of the rigs currently drawn. */
    visible: () => entries.filter((e) => !e.culled).map((e) => e.name),
    /** Names pinned by alwaysVisible (the player's own rig). */
    pinned: () => entries.filter((e) => e.alwaysVisible).map((e) => e.name),
    /** One rig's live state by name, as plain serializable data for the test hook. */
    inspect,
    clear() {
      for (const e of entries) e.group.visible = true;
      entries.length = 0;
    },
  };
}
