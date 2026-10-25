/**
 * Play-area boundaries (R16). The desert keeps drawing past these limits
 * (terrain.js / fog), but the player is clamped inside them so it can never
 * wander into empty terrain and fall off the map.
 *
 * The area is an axis-aligned rectangle with an inset, which is enough for a
 * town on a grid: main street along Z, buildings either side. The footprint is
 * the town layout decided in DECISIONS.md D6 (T006a); everything that needs the
 * limits (player, camera, NPCs, duel posts) reads them from here rather than
 * hard-coding numbers, so a later layout change is a one-line edit.
 */

/**
 * Walkable rectangle in world units — the town footprint, recorded as D6 in
 * `DECISIONS.md`. Main street runs along Z, so the map is deeper than it is
 * wide: 64m across (x) by 100m down the street (z). T026 places every structure
 * inside x ∈ [-32, 32]; T006b draws desert ground past these limits and keeps
 * the whole interior flat at y = 0.
 */
export const PLAY_AREA = Object.freeze({
  minX: -32,
  maxX: 32,
  minZ: -50,
  maxZ: 50,
});

/**
 * @param {object} area  { minX, maxX, minZ, maxZ }
 * @param {object} opts  { inset: shrink each edge by this much (collision radius) }
 */
export function createBounds(area = PLAY_AREA, { inset = 0 } = {}) {
  const limits = {
    minX: area.minX + inset,
    maxX: area.maxX - inset,
    minZ: area.minZ + inset,
    maxZ: area.maxZ - inset,
  };
  // A negative inset (or a silly area) would invert the box and teleport the
  // player to a random edge, so guarantee min <= max.
  if (limits.minX > limits.maxX) limits.minX = limits.maxX = (area.minX + area.maxX) / 2;
  if (limits.minZ > limits.maxZ) limits.minZ = limits.maxZ = (area.minZ + area.maxZ) / 2;

  const num = (v, fallback) => (Number.isFinite(v) ? v : fallback);

  const bounds = {
    area,
    inset,
    limits,
    get width() { return limits.maxX - limits.minX; },
    get depth() { return limits.maxZ - limits.minZ; },
    get center() {
      return { x: (limits.minX + limits.maxX) / 2, z: (limits.minZ + limits.maxZ) / 2 };
    },

    /** True when the point is already inside (with a hair of tolerance). */
    inside(x, z) {
      return x >= limits.minX - 1e-6 && x <= limits.maxX + 1e-6
        && z >= limits.minZ - 1e-6 && z <= limits.maxZ + 1e-6;
    },

    /**
     * Clamp anything with numeric .x/.z in place (a THREE.Vector3, a plain
     * object, or the player position) and return it. Non-finite input is
     * rescued to the centre rather than propagated into the scene graph.
     */
    clamp(pos) {
      if (!pos) return pos;
      pos.x = num(pos.x, bounds.center.x);
      pos.z = num(pos.z, bounds.center.z);
      if (pos.y !== undefined) pos.y = num(pos.y, 0);
      pos.x = Math.min(limits.maxX, Math.max(limits.minX, pos.x));
      pos.z = Math.min(limits.maxZ, Math.max(limits.minZ, pos.z));
      return pos;
    },

    /** How far `pos` is from the nearest wall along each axis (0 when inside). */
    pushOut(pos) {
      const before = { x: pos.x, z: pos.z };
      bounds.clamp(pos);
      return { x: pos.x - before.x, z: pos.z - before.z };
    },
  };

  return bounds;
}
