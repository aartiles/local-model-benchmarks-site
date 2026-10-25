import { noOcclude } from './terrain.js';

/**
 * T026a — the town layout manifest and the first row of buildings (R13/R14/R18).
 *
 * TOWN is the single source of truth for where every structure sits. The verify
 * check reads it from the page and asserts the built geometry matches it, so a
 * later task cannot move a building without the manifest moving with it.
 *
 * Layout rules that the walkability check depends on (D6):
 *  - The main street runs along Z through x = 0. The corridor |x| <= 9.5 is
 *    free of geometry (matches TERRAIN.propCorridorX), so walking W from the
 *    north end reaches the south wall unobstructed. player.js only clamps to
 *    bounds — there is no building collision yet — so the corridor being empty
 *    IS the walkability guarantee. Do not put anything inside it.
 *  - Every structure's nearest face sits at |x| >= 10, i.e. clear of the
 *    corridor, and every structure is inside PLAY_AREA.
 *  - Each building's bounding box is exactly its manifest box: nothing sticks
 *    out past x ± w/2, z ± d/2 or above h.
 *
 * Readability rules (R14), learned the hard way in review:
 *  - The wall body is RECESSED (facadeMetrics().faceX), and every street-facing
 *    part — door, windows, shutters, porch, columns, sign — is placed PROUD of
 *    that recessed plane. Detail buried inside a solid wall box renders as a
 *    blank box. The full-footprint roof slab and the false front define the
 *    manifest bbox instead.
 *  - Parts are given as [min,max] ranges so nothing can be coplanar with the
 *    face it decorates (z-fighting) or cross the footprint plane.
 *  - Colours are plain PALETTE hex values used as vertex colours, so a check can
 *    tell door from glass from trim from wall by reading the geometry.
 *
 * Draw calls: one merged, vertex-coloured mesh per building, one for the street,
 * one for all sign faces = 5 for this module (R21).
 */

/** Warm western palette (R18). sRGB hex, used directly as vertex colours. */
export const PALETTE = Object.freeze({
  plank: 0x8a6a45,      // weathered horizontal siding
  beam: 0x5c4128,       // posts, porch deck, sign board
  door: 0x43301e,       // dark door plank
  plaster: 0xc2a37a,    // sand-coloured rendered wall
  roof: 0x4f3a2a,       // low-sheen roof boards
  paintRed: 0x8e3b2e,   // faded storefront paint
  paintTeal: 0x3d6f6a,  // faded shutters / trim
  glass: 0x86a9b8,      // cloudy window glass
  stone: 0x9a8f80,      // bank foundation, chimney
  dust: 0xb99a6a,       // packed dirt street
});

export const TOWN = Object.freeze({
  /** The dirt strip down the middle of town. Corridor half-width matches
   *  TERRAIN.propCorridorX so props and buildings never meet the street. */
  street: Object.freeze({
    name: 'main-street', width: 19, minZ: -46, maxZ: 46, y: 0.02, color: PALETTE.dust,
  }),
  corridorX: 9.5,
  /** West row: faces the street at +X. x/z is the footprint CENTRE, h the top. */
  structures: Object.freeze([
    Object.freeze({
      name: 'saloon', x: -16, z: 18, w: 12, d: 10, h: 5.2,
      wall: PALETTE.plank, trim: PALETTE.paintRed, roof: PALETTE.roof,
      stone: PALETTE.stone, sign: 'SALOON', chimney: true, porch: 2.4,
    }),
    Object.freeze({
      name: 'sheriff-office', x: -16, z: 2, w: 9, d: 8, h: 4.6,
      wall: PALETTE.plaster, trim: PALETTE.paintTeal, roof: PALETTE.roof,
      sign: 'SHERIFF', jail: true, porch: 2.0,
    }),
    Object.freeze({
      name: 'bank', x: -16, z: -14, w: 9, d: 8, h: 5.0,
      wall: PALETTE.plaster, trim: PALETTE.stone, roof: PALETTE.roof,
      sign: 'BANK', columns: true, porch: 0,
    }),
    /**
     * T026b — the east row (x > 0) faces the street at -X, so it carries
     * `facing: -1` and storefront() mirrors every part, sign board included
     * (mergeSigns already honours `dir: -1`, and T026a's painted-sign assertion
     * reads `s.facing`, so an east-row name is asserted against the -X face).
     * cabin-south and water-tower sit on the west side and face +X like the
     * west row, so they need no mirror. The cabins are homes, not shops: they
     * carry no board, which is also what keeps the west/east rows distinguishable.
     */
    Object.freeze({
      name: 'general-store', x: 16, z: 14, w: 10, d: 9, h: 4.6, facing: -1,
      wall: PALETTE.plaster, trim: PALETTE.paintRed, roof: PALETTE.roof,
      sign: 'STORE', porch: 2.0, crates: true,
    }),
    Object.freeze({
      name: 'stable', x: 16, z: -2, w: 12, d: 9, h: 4.2, facing: -1,
      wall: PALETTE.plank, trim: PALETTE.beam, roof: PALETTE.roof,
      sign: 'STABLE', porch: 1.6, stalls: true,
    }),
    Object.freeze({
      name: 'cabin-north', x: 16, z: 30, w: 8, d: 7, h: 3.6, facing: -1,
      wall: PALETTE.plank, trim: PALETTE.paintTeal, roof: PALETTE.roof,
      porch: 1.0, chimney: true,
    }),
    Object.freeze({
      name: 'cabin-south', x: -16, z: -30, w: 8, d: 7, h: 3.6,
      wall: PALETTE.plank, trim: PALETTE.paintRed, roof: PALETTE.roof,
      porch: 1.0, chimney: true,
    }),
    /** The tall landmark: four legs, a tank and a pump-house base (kind tower). */
    Object.freeze({
      name: 'water-tower', x: -25, z: -34, w: 6, d: 6, h: 10, kind: 'tower',
      wall: PALETTE.plaster, trim: PALETTE.paintRed, roof: PALETTE.roof,
      stone: PALETTE.stone,
    }),
  ]),
  /**
   * T026ca — fence runs (R13). A lot line runs PERPENDICULAR to the street, so
   * each run is a straight line of sections along X at one fixed z, sitting in a
   * gap where no building footprint crosses it. The numbers are hand-written,
   * never random, so two builds of the town are identical.
   *
   * The corridor MAJOR that killed the parent card: a section spans 3.8m, so a
   * run whose first CENTRE sat at |x| = 11 reached |x| = 9.1, i.e. 0.4m inside
   * corridorX. Hence `near`: the first centre is 12.9, so the nearest VERTEX is
   * 12.9 - 1.9 = 11.0. `perRun` keeps the far vertex at 12.9 + 2*3.8 + 1.9 =
   * 22.4, outside the terrain rock zones (|x| >= 23, PROP_ZONES in terrain.js).
   * Every run is also more than 10m from the spawn point (0, 12) because its
   * nearest vertex is at |x| = 11, and every z is chosen clear of the ±37..±49
   * prop bands as well as of the buildings.
   */
  fences: Object.freeze({
    section: 3.8,   // metres; the merged proto spans exactly this in x
    near: 12.9,     // first section CENTRE, per side
    perRun: 3,
    /** {z, side}: side -1 is the west row, +1 the east row. */
    runs: Object.freeze([
      Object.freeze({ z: 9.5, side: -1 }),
      Object.freeze({ z: -6, side: -1 }),
      Object.freeze({ z: -22, side: -1 }),
      Object.freeze({ z: 28, side: -1 }),
      Object.freeze({ z: 6, side: 1 }),
      Object.freeze({ z: 22, side: 1 }),
      Object.freeze({ z: 34, side: 1 }),
      Object.freeze({ z: -12, side: 1 }),
      Object.freeze({ z: -24, side: 1 }),
    ]),
  }),
  /**
   * T026cb — street furniture (R13): barrels, crates and hitching posts.
   * Hand-written placements, never random, so two builds are identical.
   *
   * WHY almost everything sits on a deck: the street corridor is |x| <= 9.5 and a
   * west-row building's bbox face is at |x| = 10, so the open strip in front of a
   * wide building is 0.5m — no prop fits there. The boardwalk IS the room, so
   * props stand on it, and the MAJOR that killed the parent card was placing them
   * at y = 0 while facadeMetrics decks run 0 -> 0.24 (bank stone portico 0 ->
   * 0.32): they rendered half-buried. Every placement therefore declares
   * `on: 'deck'` (y = that deck's top, from deckRect()) or `on: 'ground'` (y = 0),
   * and the check asserts the y it derives from the manifest, not the y I wrote.
   *
   * Each box is contained in its deck rectangle, clear of that building's porch
   * posts/pillars in x or in z, >= 10m from the spawn point (0, 12), clear of
   * corridorX and of every structure's solid box — including the water tower,
   * whose four corner legs are why the parent's crate at (-22, -31) was buried on
   * a leg. Ground props live in the z-gaps between buildings, and clear of the
   * fence runs too: a run's nearest vertex is at |x| = 11.0, so a ground prop's
   * outer extent stays inside that line (the check asserts prop/fence clearance).
   */
  props: Object.freeze({
    /** name -> { placements: [{x, z, on, at?}] }; `at` is the deck's structure. */
    barrels: Object.freeze([
      Object.freeze({ x: -10.85, z: 14.2, on: 'deck', at: 'saloon' }),
      Object.freeze({ x: -10.85, z: 22.0, on: 'deck', at: 'saloon' }),
      Object.freeze({ x: -12.0, z: -14.0, on: 'deck', at: 'bank' }),
      Object.freeze({ x: -12.0, z: -13.2, on: 'deck', at: 'bank' }),
      Object.freeze({ x: -10.6, z: 8, on: 'ground' }),
      Object.freeze({ x: -10.6, z: -4, on: 'ground' }),
      Object.freeze({ x: 12.2, z: 12.5, on: 'deck', at: 'general-store' }),
      Object.freeze({ x: 10.8, z: -4, on: 'deck', at: 'stable' }),
      Object.freeze({ x: 11.2, z: 5, on: 'ground' }),
      Object.freeze({ x: 10.6, z: 24, on: 'ground' }),
    ]),
    crates: Object.freeze([
      Object.freeze({ x: 12.4, z: 13.5, on: 'deck', at: 'general-store' }),
      Object.freeze({ x: 12.4, z: 14.3, on: 'deck', at: 'general-store' }),
      Object.freeze({ x: 12.4, z: 31.5, on: 'deck', at: 'cabin-north' }),
      Object.freeze({ x: -12.4, z: 3.5, on: 'deck', at: 'sheriff-office' }),
      Object.freeze({ x: -12.4, z: -28.5, on: 'deck', at: 'cabin-south' }),
      Object.freeze({ x: -12.1, z: -16.5, on: 'deck', at: 'bank' }),
      Object.freeze({ x: -10.8, z: 19.5, on: 'deck', at: 'saloon' }),
      Object.freeze({ x: 11.0, z: 20.5, on: 'ground' }),
      Object.freeze({ x: 11.0, z: -8.5, on: 'ground' }),
    ]),
    /** A hitching rail runs ALONG z (parallel to the street), in front of the shops. */
    'hitching-posts': Object.freeze([
      Object.freeze({ x: -11.6, z: 15.5, on: 'deck', at: 'saloon' }),
      Object.freeze({ x: -11.6, z: 18, on: 'deck', at: 'saloon' }),
      Object.freeze({ x: -11.6, z: 20.5, on: 'deck', at: 'saloon' }),
      Object.freeze({ x: 11.6, z: 12.4, on: 'deck', at: 'general-store' }),
      Object.freeze({ x: 11.6, z: 14, on: 'deck', at: 'general-store' }),
      Object.freeze({ x: 11.6, z: 15.6, on: 'deck', at: 'general-store' }),
      Object.freeze({ x: 10.2, z: 4.5, on: 'ground' }),
      Object.freeze({ x: 10.2, z: 7, on: 'ground' }),
    ]),
  }),
});

/** Derived, for later tasks: where to stand to talk to / challenge someone. */
export function landmarkPost(s) {
  // The spot is on the STREET side, which is +X for the west row and -X for the
  // east row (T026b), so it follows the structure's facing.
  const face = s.facing === -1 ? -1 : 1;
  return { x: s.x + face * (s.w / 2 + 0.9), z: s.z, y: 0 };
}

/**
 * T026cb — the walkable deck of one structure, in WORLD coordinates, derived from
 * the same facadeMetrics the builder uses: a porch deck runs faceX -> hw at y 0 ->
 * 0.24, the bank's stone portico at y 0 -> 0.32. This is the single place the deck
 * top is defined, so a prop's y and the check that asserts it cannot disagree.
 * Returns null for a building with no deck (and for the tower).
 */
export function deckRect(s) {
  if (s.kind === 'tower') return null;
  const top = s.porch > 0 ? 0.24 : (s.columns ? 0.32 : 0);
  if (!top) return null;
  const m = facadeMetrics(s);
  const face = s.facing === -1 ? -1 : 1;
  // x spans the recess from the wall plane out to the bbox face, mirrored per row.
  const near = s.x + face * m.faceX;
  const far = s.x + face * m.hw;
  const zHalf = s.porch > 0 ? m.hd - 0.4 : m.hd - 0.5;
  return {
    top,
    minX: Math.min(near, far), maxX: Math.max(near, far),
    minZ: s.z - zHalf, maxZ: s.z + zHalf,
  };
}

/**
 * The SOLID part of one structure in world coordinates — the box a prop must not
 * sit inside. For a storefront that is the recessed wall body, NOT the manifest
 * bbox: the deck it overhangs is open space you stand on, which is exactly where
 * street furniture belongs. The water tower has no deck, so its whole footprint is
 * solid (its four corner legs reach the bbox faces), which is what catches the
 * parent card's crate buried on a leg.
 */
export function solidBox(s) {
  const m = facadeMetrics(s);
  const face = s.facing === -1 ? -1 : 1;
  if (s.kind === 'tower') {
    return {
      minX: s.x - m.hw, maxX: s.x + m.hw, minY: 0, maxY: s.h,
      minZ: s.z - m.hd, maxZ: s.z + m.hd,
    };
  }
  const a = s.x + face * m.backX;
  const b = s.x + face * m.faceX;
  return {
    minX: Math.min(a, b), maxX: Math.max(a, b), minY: 0, maxY: m.wallH,
    minZ: s.z - (m.hd - 0.15), maxZ: s.z + (m.hd - 0.15),
  };
}

/**
 * T033 / T033ba (R13/R16) — the boxes that stop the player, derived from the
 * town's own records. One entry per structure, taken from `solidBox(s)`: THE
 * SAME function `T026cb.street-props` asserts street furniture against. That is
 * the single source of truth for "solid", so the boardwalk the store counter,
 * the NPC stops and the hitching rails stand on is walkable, and a wall cannot
 * both stop the cowboy and host a prop.
 *
 * The false front and roof slab do overhang the porch, but they are above the
 * cowboy's head — walking under them is the point of a boardwalk, not a bug.
 * The water tower has no deck, so its whole footprint stays solid. Nothing here
 * is hand-typed: move a building in TOWN.structures and its collider moves with
 * it, recess and all.
 *
 * The boxes are 2D (x/z) because every structure starts at y = 0 and is far
 * taller than the cowboy, so a height test would never reject a move. The
 * consequence is cosmetic and accepted (see STATE.md): the cowboy walks the
 * boardwalk at y = 0 while `deckRect().top` is 0.24, so his feet sit slightly
 * below the plank surface. There is no vertical collision.
 * @returns {{name:string,minX:number,maxX:number,minZ:number,maxZ:number}[]}
 */
export function colliders(manifest = TOWN) {
  return manifest.structures.map((s) => {
    const b = solidBox(s);
    return { name: s.name, minX: b.minX, maxX: b.maxX, minZ: b.minZ, maxZ: b.maxZ };
  });
}

/**
 * The shared facade metrics of one structure, in LOCAL coordinates (x/z relative
 * to the footprint centre). Everything that places street-facing detail — and the
 * verify check that asserts that detail is proud of the wall — goes through here,
 * so the recess is never a magic number in two places.
 */
export function facadeMetrics(s) {
  const hw = s.w / 2;
  if (s.kind === 'tower') {
    // A water tower has no false front: the pump-house body is the "wall", and
    // the legs plus the tank catwalk define the manifest bbox instead.
    return {
      hw, hd: s.d / 2, wallH: 2.2, roofTop: 2.45,
      faceX: hw - 0.5, backX: -hw + 0.15, ffX: hw - 0.4,
    };
  }
  // The manifest owns the porch depth (TOWN.structures[].porch); 0.5m is only the
  // default for a building that declares no porch, so the recess is never a
  // second, silently-capped number away from the source of truth.
  const porchD = s.porch > 0 ? s.porch : (s.columns ? 1.2 : 0.5);
  const wallH = s.h - 1.5;
  return {
    hw,
    hd: s.d / 2,
    wallH,                       // top of the recessed wall body
    roofTop: wallH + 0.4,        // top of the full-footprint roof slab
    faceX: hw - porchD,          // street-facing wall plane, recessed by porchD
    backX: -hw + 0.15,           // rear wall plane, recessed off the bbox face
    ffX: hw - 0.5,               // street face of the false front above the roof
  };
}

/**
 * The world-space top of every chimney the manifest actually builds (R72/V3).
 *
 * storefront() draws a chimney as `add(backX+0.45, backX+1.25, wallH-0.3, s.h,
 * -(hd-0.5), -(hd-1.3))` in LOCAL coords, mirrored in x by `facing`. This is the
 * same arithmetic, so the plume emitter can never drift off the brick it comes
 * out of: move or add a `chimney: true` building in TOWN and the smoke follows.
 * Returns [{name, x, y, z}] with y the top of the stack.
 */
export function chimneyTops(manifest = TOWN) {
  const out = [];
  for (const s of manifest.structures) {
    if (!s.chimney) continue;
    const m = facadeMetrics(s);
    const face = s.facing === -1 ? -1 : 1;
    out.push({
      name: s.name,
      x: s.x + face * (m.backX + 0.85),
      y: s.h,
      z: s.z - m.hd + 0.9,
    });
  }
  return out;
}

const rgb = (T, hex) => { const c = new T.Color(hex); return [c.r, c.g, c.b]; };

/** Translate + scale a unit box into a part of the merged building geometry. */
function box(T, w, h, d, x, y, z) {
  return {
    geo: new T.BoxGeometry(w, h, d),
    matrix: new T.Matrix4().makeTranslation(x, y, z),
  };
}

/**
 * Merge parts into ONE geometry carrying position, normal and colour, so a whole
 * building costs a single draw call. (terrain.js has the same private helper
 * without colours; three.module.js exports no BufferGeometryUtils, R2.)
 */
function mergeColored(T, parts) {
  let count = 0;
  const prepared = parts.map(({ geo, matrix, color }) => {
    const g = geo.toNonIndexed();
    if (matrix) g.applyMatrix4(matrix);
    geo.dispose();
    g.computeVertexNormals();
    count += g.getAttribute('position').count;
    return { g, color };
  });
  const position = new Float32Array(count * 3);
  const normal = new Float32Array(count * 3);
  const colArr = new Float32Array(count * 3);
  let o = 0;
  for (const { g, color } of prepared) {
    const n = g.getAttribute('position').count;
    position.set(g.getAttribute('position').array, o * 3);
    normal.set(g.getAttribute('normal').array, o * 3);
    for (let i = 0; i < n; i += 1) {
      colArr[(o + i) * 3] = color[0];
      colArr[(o + i) * 3 + 1] = color[1];
      colArr[(o + i) * 3 + 2] = color[2];
    }
    o += n;
    g.dispose();
  }
  const out = new T.BufferGeometry();
  out.setAttribute('position', new T.BufferAttribute(position, 3));
  out.setAttribute('normal', new T.BufferAttribute(normal, 3));
  out.setAttribute('color', new T.BufferAttribute(colArr, 3));
  out.computeBoundingSphere();
  return out;
}

/**
 * One 3.8m fence section: two posts plus two rails, merged into ONE geometry so
 * the whole town's fencing is a single InstancedMesh = one draw call (R21). The
 * posts' OUTER faces sit at ±1.9, so the section spans exactly `FENCE.section`
 * and the nearest vertex of an instance is always centre - 1.9.
 */
function fenceProto(T, fences) {
  const post = 0.14;
  const half = fences.section / 2;            // 1.9: the section's true extent
  const px = half - post / 2;                 // post centre, outer face at ±half
  return mergeColored(T, [
    { ...box(T, post, 1.15, post, -px, 0.575, 0), color: rgb(T, PALETTE.beam) },
    { ...box(T, post, 1.15, post, px, 0.575, 0), color: rgb(T, PALETTE.beam) },
    { ...box(T, fences.section, 0.1, 0.07, 0, 0.92, 0), color: rgb(T, PALETTE.plank) },
    { ...box(T, fences.section, 0.1, 0.07, 0, 0.58, 0), color: rgb(T, PALETTE.plank) },
  ]);
}

/** The fixed instance positions, derived from the manifest (never random). */
function fenceMatrices(T, fences) {
  const out = [];
  for (const run of fences.runs) {
    for (let k = 0; k < fences.perRun; k += 1) {
      const x = run.side * (fences.near + k * fences.section);
      out.push(new T.Matrix4().makeTranslation(x, 0, run.z));
    }
  }
  return out;
}

/**
 * One prop proto per type, merged into ONE geometry so a whole group costs a
 * single InstancedMesh = one draw call (R21). Every proto's lowest vertex sits at
 * local y = 0, so an instance's world minY IS the surface it stands on, which is
 * what T026cb.street-props asserts against deckRect().top.
 */
function propProto(T, kind) {
  const plank = rgb(T, PALETTE.plank);
  const beam = rgb(T, PALETTE.beam);
  const parts = kind === 'barrels'
    ? [
      box(T, 0.56, 0.72, 0.56, 0, 0.36, 0),
      box(T, 0.62, 0.08, 0.62, 0, 0.16, 0),
      box(T, 0.62, 0.08, 0.62, 0, 0.56, 0),
    ]
    : kind === 'crates'
      ? [
        box(T, 0.7, 0.7, 0.7, 0, 0.35, 0),
        box(T, 0.74, 0.09, 0.09, 0, 0.62, 0),
        box(T, 0.09, 0.74, 0.09, 0, 0.37, 0.31),
      ]
      /* hitching rail: runs ALONG z, parallel to the street, posts at both ends */
      : [
        box(T, 0.12, 1.15, 0.12, 0, 0.575, -0.7),
        box(T, 0.12, 1.15, 0.12, 0, 0.575, 0.7),
        box(T, 0.1, 0.1, 1.4, 0, 1.05, 0),
      ];
  const colors = kind === 'barrels' ? [plank, beam, beam]
    : kind === 'crates' ? [plank, beam, beam] : [beam, beam, plank];
  return mergeColored(T, parts.map((p, i) => ({ ...p, color: colors[i] })));
}

/**
 * Instance matrices from the manifest, each raised to the top of the deck it
 * stands on (deckRect) or y = 0 on open ground. Never random.
 */
function propMatrices(T, manifest, kind) {
  const out = [];
  for (const p of manifest.props[kind]) {
    let y = 0;
    if (p.on === 'deck') {
      const s = manifest.structures.find((st) => st.name === p.at);
      const d = s ? deckRect(s) : null;
      // A trimmed manifest (T026a's unsigned probe build) may not contain the
      // structure a prop leans on. Fall back to open ground rather than take the
      // whole page down; the shipped TOWN manifest always resolves.
      if (d) y = d.top;
    }
    out.push(new T.Matrix4().makeTranslation(p.x, y, p.z));
  }
  return out;
}

/**
 * World-space AABB of every instance, from the GEOMETRY corners transformed by
 * each instance matrix — never the instance centre, which is 1.9m from the edge
 * of the section it stands in.
 */
function instanceBoxes(T, mesh) {
  const gb = mesh.geometry.boundingBox ?? (mesh.geometry.computeBoundingBox(), mesh.geometry.boundingBox);
  const m = new T.Matrix4();
  const v = new T.Vector3();
  const out = [];
  for (let i = 0; i < mesh.count; i += 1) {
    mesh.getMatrixAt(i, m);
    m.premultiply(mesh.matrixWorld);
    const b = new T.Box3();
    for (let xi = 0; xi < 2; xi += 1) {
      for (let yi = 0; yi < 2; yi += 1) {
        for (let zi = 0; zi < 2; zi += 1) {
          v.set(xi ? gb.max.x : gb.min.x, yi ? gb.max.y : gb.min.y, zi ? gb.max.z : gb.min.z);
          b.expandByPoint(v.applyMatrix4(m));
        }
      }
    }
    out.push({ minX: b.min.x, maxX: b.max.x, minY: b.min.y, maxY: b.max.y, minZ: b.min.z, maxZ: b.max.z });
  }
  return out;
}

/**
 * Merge street-facing sign planes into ONE uv-mapped geometry (one draw call for
 * every sign in town), remapping each plane's uv into its row of the text atlas.
 * @param {Array} parts {x, y0, y1, z0, z1, v0, v1}
 */
function mergeSigns(T, parts) {
  const position = [];
  const normal = [];
  const uv = [];
  for (const p of parts) {
    const g = new T.PlaneGeometry(p.z1 - p.z0, p.y1 - p.y0);
    // +X-facing for the west row, -X-facing for the east row. Either way u runs
    // to the viewer's right, so the painted name is never mirrored.
    g.rotateY((p.dir === -1 ? -1 : 1) * Math.PI / 2);
    g.translate(p.x, (p.y0 + p.y1) / 2, (p.z0 + p.z1) / 2);
    const v0 = p.v0;
    const v1 = p.v1;
    const ng = g.toNonIndexed();
    const dst = ng.getAttribute('uv');
    // Remap from the NON-indexed attribute's own copy. PlaneGeometry is indexed
    // with 4 vertices; toNonIndexed() duplicates it to 6, so reading the indexed
    // source at i>=4 yields undefined and writes NaN into the uv buffer — which
    // renders as a black wedge across the sign and erases the lettering.
    const src = Float32Array.from(dst.array);
    for (let i = 0; i < dst.count; i += 1) {
      dst.setXY(i, src[i * 2], v0 + src[i * 2 + 1] * (v1 - v0));
    }
    position.push(...ng.getAttribute('position').array);
    normal.push(...ng.getAttribute('normal').array);
    uv.push(...dst.array);
    g.dispose();
    ng.dispose();
  }
  const out = new T.BufferGeometry();
  out.setAttribute('position', new T.BufferAttribute(new Float32Array(position), 3));
  out.setAttribute('normal', new T.BufferAttribute(new Float32Array(normal), 3));
  out.setAttribute('uv', new T.BufferAttribute(new Float32Array(uv), 2));
  out.computeBoundingSphere();
  return out;
}

/**
 * Give every sign plane its own row of the atlas, sized to THAT plane's aspect
 * ratio, so painted letters are never stretched flat. Sets rowY0/rowH and the
 * v range (canvas is flipped, so v = 1 - y/H). Returns the canvas height.
 */
function layoutSignRows(parts) {
  const W = 512;
  let y = 0;
  for (const p of parts) {
    const aspect = (p.z1 - p.z0) / (p.y1 - p.y0);
    p.atlasW = W;
    p.rowY0 = y;
    p.rowH = Math.max(32, Math.round(W / Math.max(1, aspect)));
    y += p.rowH;
  }
  const H = Math.max(1, y);
  for (const p of parts) {
    p.v0 = 1 - (p.rowY0 + p.rowH) / H;
    p.v1 = 1 - p.rowY0 / H;
  }
  return H;
}

/** Paint every sign name into one canvas atlas, one row per sign (code-only, R20). */
function signAtlas(T, parts) {
  const H = layoutSignRows(parts);
  const canvas = document.createElement('canvas');
  canvas.width = parts[0].atlasW;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  for (const p of parts) {
    const y0 = p.rowY0;
    const rowH = p.rowH;
    ctx.fillStyle = '#2b1d12';
    ctx.fillRect(0, y0, W, rowH);
    ctx.fillStyle = '#c9a25c';
    ctx.fillRect(8, y0 + 8, W - 16, rowH - 16);
    ctx.fillStyle = '#3b2415';
    let size = Math.max(16, Math.floor(rowH * 0.62));
    ctx.font = `bold ${size}px Georgia, 'Times New Roman', serif`;
    while (size > 18 && ctx.measureText(p.sign).width > W - 60) {
      size -= 2;
      ctx.font = `bold ${size}px Georgia, 'Times New Roman', serif`;
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(p.sign, W / 2, y0 + rowH / 2);
  }
  const tex = new T.CanvasTexture(canvas);
  tex.colorSpace = T.SRGBColorSpace;
  return tex;
}

/**
 * One building: recessed wall body, full-footprint roof slab, false front, and
 * street-facing detail placed PROUD of the recessed wall plane. Coordinates are
 * LOCAL to the structure centre; the mesh is then placed at (x, 0, z), so the
 * world bbox matches the manifest by construction (roof slab spans ±w/2, ±d/2 and
 * the false front tops out at exactly h).
 * @param {Array} signOut receives this building's sign plane, if it has one
 */
function storefront(T, s, signOut) {
  const m = facadeMetrics(s);
  const { hw, hd, wallH, roofTop, faceX, backX, ffX } = m;
  const wall = rgb(T, s.wall);
  const trim = rgb(T, s.trim);
  const roof = rgb(T, s.roof);
  const beam = rgb(T, PALETTE.beam);
  const door = rgb(T, PALETTE.door);
  const glass = rgb(T, PALETTE.glass);
  const shutter = rgb(T, PALETTE.paintTeal);
  const stone = rgb(T, s.stone ?? PALETTE.stone);
  const parts = [];
  // East-row buildings face the street at -X. Mirroring the part CENTRE is enough
  // because every part is an axis-aligned box, so its own normals stay correct.
  const face = s.facing === -1 ? -1 : 1;
  // Storefront proportions, clamped so a short cabin (h 3.6 => wallH 2.1) does not
  // push its door and windows up through the roof slab. Every west-row building is
  // tall enough that each clamp is a no-op, so T026a's geometry is unchanged.
  // A stable keeps its street door short so the hay loft above it has room under
  // the roof slab; on the west row every clamp below is a no-op.
  const doorH = s.stalls ? Math.min(1.95, wallH - 0.75) : Math.min(2.4, wallH - 0.2);
  const winTop = Math.min(2.3, doorH - 0.1);
  const winBot = Math.min(1.2, winTop - 0.6);
  const hY0 = Math.min(1.15, doorH - 0.75);
  const hY1 = Math.min(1.45, doorH - 0.45);
  // Parts are [min,max] ranges: a zero or negative span is a layout mistake. No
  // logging is allowed here (the boot checks assert zero console output), so a
  // bad span is dropped quietly and the bbox/proud-face checks see the gap.
  const add = (x0, x1, y0, y1, z0, z1, color) => {
    const w = x1 - x0;
    const h = y1 - y0;
    const d = z1 - z0;
    if (w <= 0.005 || h <= 0.005 || d <= 0.005) return;
    parts.push({ ...box(T, w, h, d, face * (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2), color });
  };

  // --- body ------------------------------------------------------------------
  add(backX, faceX, 0, wallH, -(hd - 0.15), hd - 0.15, wall);          // walls
  add(-hw, hw, wallH, roofTop, -hd, hd, roof);                          // roof slab
  add(ffX, hw - 0.15, roofTop - 0.1, s.h, -(hd - 0.1), hd - 0.1, trim); // false front

  // --- street-facing entrance, proud of the recessed wall plane --------------
  add(faceX, faceX + 0.1, 0, doorH, -0.72, 0.72, trim);                  // frame
  add(faceX + 0.05, faceX + 0.19, 0.2, doorH - 0.3, -0.52, 0.52, door);  // door plank
  add(faceX + 0.19, faceX + 0.24, hY0, hY1, 0.3, 0.42, beam);            // handle

  // --- windows flanking the door: pane, lintel, sill, shutters --------------
  // A stable replaces these with stall fronts at the SAME z slots: two sets of
  // panes/doors sharing one x slab and overlapping z render as z-fighting glass
  // inside a door, so the generic window is not drawn when s.stalls is set.
  if (!s.stalls) {
    for (const wz of [-(hd - 1.8), hd - 1.8]) {
      add(faceX, faceX + 0.08, winBot, winTop, wz - 0.5, wz + 0.5, glass);
      add(faceX + 0.06, faceX + 0.15, winTop, winTop + 0.2, wz - 0.7, wz + 0.7, trim);
      add(faceX + 0.06, faceX + 0.22, winBot - 0.16, winBot, wz - 0.7, wz + 0.7, trim);
      for (const side of [-1, 1]) {
        add(faceX + 0.1, faceX + 0.19, winBot + 0.04, winTop - 0.04, wz + side * 0.52, wz + side * 0.74, shutter);
      }
    }
  }

  // --- porch: deck and posts carrying the roof overhang ---------------------
  if (s.porch > 0) {
    add(faceX, hw, 0, 0.24, -(hd - 0.4), hd - 0.4, beam);
    for (const pz of [-(hd - 0.7), 0, hd - 0.7]) {
      add(hw - 0.3, hw - 0.08, 0.24, wallH, pz - 0.11, pz + 0.11, beam);
    }
    // A stable porch stays OPEN: a rail at doorH+0.05 would band across the stall
    // hay windows and the loft door, burying the detail that makes it a stable.
    if (!s.stalls) {
      add(faceX, hw, doorH + 0.05, Math.min(doorH + 0.2, wallH - 0.05), -(hd - 0.4), hd - 0.4, roof); // rail, clear of the frame top
    }
  }

  // --- bank portico: platform, pillars and an entablature ------------------
  if (s.columns) {
    add(faceX, hw, 0, 0.32, -(hd - 0.5), hd - 0.5, stone);
    for (const cz of [-1.7, 1.7]) {
      add(hw - 0.75, hw - 0.25, 0.32, wallH - 0.3, cz - 0.28, cz + 0.28, stone);
    }
    add(hw - 0.85, hw - 0.15, wallH - 0.3, wallH, -2.4, 2.4, stone);
  }

  // --- jail: cell door and bars, proud of the RECESSED rear wall plane ------
  if (s.jail) {
    const zc = -hd + 2.2;
    add(backX - 0.13, backX, 0.15, 2.1, zc - 0.5, zc + 0.5, door);
    for (const by of [0.7, 1.1, 1.5, 1.9]) {
      add(backX - 0.2, backX - 0.08, by, by + 0.09, zc - 0.44, zc + 0.44, beam);
    }
  }

  // --- chimney: pokes clear above the roof slab, capped at h ---------------
  if (s.chimney) {
    add(backX + 0.45, backX + 1.25, wallH - 0.3, s.h, -(hd - 0.5), -(hd - 1.3), stone);
  }

  // --- stable: two stall fronts with hay windows, proud of the recessed wall --
  // The generic flanking windows are skipped for this building, so the stall z
  // slots are free: nothing here shares an x slab or a y/z rectangle with another
  // part, which is what made the old version z-fight and bury the hay loft behind
  // the door frame.
  if (s.stalls) {
    const hay = rgb(T, PALETTE.dust);
    const stallTop = Math.min(1.7, wallH - 1.0);
    for (const wz of [-(hd - 1.8), hd - 1.8]) {
      // stall door plank + cross brace + frame posts (frame is proud of the plank)
      add(faceX + 0.02, faceX + 0.1, 0.1, stallTop, wz - 0.62, wz + 0.62, door);
      add(faceX + 0.1, faceX + 0.15, 0.35, 0.5, wz - 0.5, wz + 0.5, beam);
      add(faceX + 0.1, faceX + 0.15, stallTop - 0.5, stallTop - 0.35, wz - 0.5, wz + 0.5, beam);
      add(faceX, faceX + 0.16, 0, stallTop + 0.12, wz - 0.86, wz - 0.66, trim);
      add(faceX, faceX + 0.16, 0, stallTop + 0.12, wz + 0.66, wz + 0.86, trim);
      add(faceX, faceX + 0.16, stallTop, stallTop + 0.12, wz - 0.86, wz + 0.86, trim);
      // hay window above the stall: pane, lintel, sill (glass stays visible)
      const hy0 = stallTop + 0.35;
      const hy1 = Math.min(wallH - 0.22, hy0 + 0.6);
      add(faceX + 0.02, faceX + 0.09, hy0, hy1, wz - 0.45, wz + 0.45, glass);
      add(faceX + 0.08, faceX + 0.17, hy1, hy1 + 0.16, wz - 0.62, wz + 0.62, trim);
      add(faceX + 0.08, faceX + 0.2, hy0 - 0.14, hy0, wz - 0.62, wz + 0.62, trim);
    }
    // hay-loft door on the upper wall, ABOVE the street door frame (which stops at
    // doorH) so the two never share a volume, and under the roof slab.
    const loftY0 = Math.min(doorH + 0.15, wallH - 0.7);
    add(faceX + 0.02, faceX + 0.12, loftY0, loftY0 + 0.6, -0.75, 0.75, hay);
    add(faceX + 0.12, faceX + 0.18, loftY0 - 0.08, loftY0 + 0.68, -0.9, 0.9, beam);
    add(faceX + 0.18, faceX + 0.24, loftY0 + 0.68, loftY0 + 0.8, -0.3, 0.3, beam); // hoist arm
  }

  // --- general store: goods stacked on the porch, so it reads as a shop ------
  if (s.crates) {
    const crate = rgb(T, PALETTE.plank);
    for (const [cz, cw] of [[-(hd - 1.2), 1.0], [hd - 1.2, 0.8]]) {
      add(hw - 1.4, hw - 0.5, 0.24, 0.94, cz - cw / 2, cz + cw / 2, crate);
      add(hw - 1.2, hw - 0.7, 0.94, 1.5, cz - cw / 2 + 0.1, cz + cw / 2 - 0.1, beam);
    }
  }

  // --- sign board and painted face on the STREET side of the false front -----
  // The false front spans ffX..(hw-0.15), so its street-facing plane is hw-0.15:
  // a board placed at ffX would be hidden behind it, exactly like a door buried
  // in the wall body. Both stay inside the footprint, so the bbox is unaffected.
  if (s.sign) {
    const front = hw - 0.15;
    add(front, front + 0.13, roofTop + 0.15, s.h - 0.18, -(hd - 1.2), hd - 1.2, beam);
    signOut.push({
      x: face * (front + 0.14),
      dir: face,
      y0: roofTop + 0.24, y1: s.h - 0.27,
      z0: -(hd - 1.45), z1: hd - 1.45,
      sign: s.sign,
    });
  }
  return parts;
}

/**
 * The water tower (T026b): a pump-house base with a real recessed wall, door and
 * window, four corner legs, cross braces and a boxy tank under a catwalk. It is a
 * structure, not a decoration — it answers raycasts like a building — and the legs
 * plus the catwalk span the full footprint, so the manifest bbox (w x d x h) holds
 * exactly and the tank top is the tallest thing in town.
 */
function towerParts(T, s, signOut) {
  const m = facadeMetrics(s);
  const { hw, hd, wallH, roofTop, faceX, backX } = m;
  const wall = rgb(T, s.wall);
  const trim = rgb(T, s.trim);
  const roof = rgb(T, s.roof);
  const beam = rgb(T, PALETTE.beam);
  const door = rgb(T, PALETTE.door);
  const glass = rgb(T, PALETTE.glass);
  const stone = rgb(T, s.stone ?? PALETTE.stone);
  const parts = [];
  const add = (x0, x1, y0, y1, z0, z1, color) => {
    const w = x1 - x0;
    const h = y1 - y0;
    const d = z1 - z0;
    if (w <= 0.005 || h <= 0.005 || d <= 0.005) return;
    parts.push({ ...box(T, w, h, d, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2), color });
  };
  const legTop = s.h - 3.8;          // 6.2 at h = 10
  const tankY0 = legTop;
  const tankY1 = s.h - 0.9;

  // --- pump house: the recessed wall body, with a door and a window on the
  //     street side, exactly like a storefront, so it reads as a built thing.
  add(backX, faceX, 0, wallH, -(hd - 0.5), hd - 0.5, wall);
  add(faceX, faceX + 0.1, 0, 2.0, -0.62, 0.62, trim);                    // door frame
  add(faceX + 0.05, faceX + 0.19, 0.15, 1.75, -0.45, 0.45, door);        // pump-house door
  add(faceX, faceX + 0.08, 1.2, 1.8, 1.3, 2.1, glass);                   // window pane
  add(faceX + 0.06, faceX + 0.15, 1.8, 2.0, 1.2, 2.2, trim);             // lintel
  add(-hw + 0.4, hw - 0.4, wallH, roofTop, -(hd - 0.4), hd - 0.4, roof); // house roof

  // --- legs at the four footprint corners (they define bbox x/z at the base) --
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const lx0 = sx === 1 ? hw - 0.3 : -hw;
      const lz0 = sz === 1 ? hd - 0.3 : -hd;
      add(lx0, lx0 + 0.3, 0, legTop, lz0, lz0 + 0.3, beam);
    }
  }
  // --- girts that actually TIE the legs: each rail runs in the plane of a leg
  //     row and stops at the legs' inner faces, instead of floating mid-frame
  //     across the empty middle of the footprint.
  const legIn = hw - 0.3;              // inner face of the corner legs
  const legRow = hd - 0.15;            // centre plane of a leg row (2.85 at d=6)
  for (const by of [2.9, 4.5]) {
    for (const sz of [-1, 1]) {
      add(-legIn, legIn, by, by + 0.2, sz * legRow - 0.12, sz * legRow + 0.12, beam);
    }
    for (const sx of [-1, 1]) {
      add(sx * legRow - 0.12, sx * legRow + 0.12, by, by + 0.2, -legIn, legIn, beam);
    }
  }
  // knee blocks tying each leg into the upper girt: they bite INTO the leg volume
  // (2.7..2.75) rather than ending flush with its outer face, so no coplanar faces
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      add(sx === 1 ? hw - 0.6 : -hw + 0.25, sx === 1 ? hw - 0.25 : -hw + 0.6, 4.7, 4.95,
        sz === 1 ? hd - 0.6 : -hd + 0.25, sz === 1 ? hd - 0.25 : -hd + 0.6, beam);
    }
  }
  // --- tank, spout, catwalk and cap; the cap tops out at exactly h -----------
  add(-(hw - 0.4), hw - 0.4, tankY0, tankY1, -(hd - 0.4), hd - 0.4, trim);
  add(hw - 1.1, hw - 0.1, tankY0 - 0.6, tankY0, -0.2, 0.2, stone);        // spout/valve
  add(-hw, hw, tankY1, tankY1 + 0.25, -hd, hd, beam);                     // catwalk
  add(-(hw - 0.2), hw - 0.2, tankY1 + 0.25, s.h, -(hd - 0.2), hd - 0.2, roof);
  return parts;
}

/**
 * Build the town into the scene.
 * @param {object} opts.engine engine (owns scene and THREE)
 * @param {object} opts.manifest layout override, defaults to TOWN
 */
export function createTown({ engine, manifest = TOWN } = {}) {
  const T = engine.THREE;
  const scene = engine.scene;
  const mat = new T.MeshLambertMaterial({ color: 0xffffff, vertexColors: true });

  const group = new T.Group();
  group.name = 'town';

  // --- main street -----------------------------------------------------------
  const st = manifest.street;
  const sgeo = new T.PlaneGeometry(st.width, st.maxZ - st.minZ);
  sgeo.rotateX(-Math.PI / 2);
  sgeo.translate(0, st.y, (st.minZ + st.maxZ) / 2);
  const street = new T.Mesh(sgeo, mat);
  street.name = st.name;
  // Packed dirt is a touch warmer than the surrounding sand.
  const dust = rgb(T, st.color);
  const sc = new Float32Array(sgeo.getAttribute('position').count * 3);
  for (let i = 0; i < sc.length; i += 3) { sc[i] = dust[0]; sc[i + 1] = dust[1]; sc[i + 2] = dust[2]; }
  sgeo.setAttribute('color', new T.BufferAttribute(sc, 3));
  street.receiveShadow = false;
  street.castShadow = false;
  noOcclude(street);   // scenery: the camera must never hide behind the road
  group.add(street);

  // --- buildings -------------------------------------------------------------
  const signParts = [];
  const built = [];
  for (const s of manifest.structures) {
    // storefront() works in LOCAL coordinates; the sign faces are merged into one
    // town-wide mesh that hangs off the group, so they must be shifted into group
    // space here or every sign would render stacked at the origin, in the street.
    // A structure with no `sign` contributes nothing to `local`, so the same path
    // serves both: the mesh is built unconditionally (T026b/c/d add unsigned
    // houses, and reading a field off a null "sign record" would kill the page).
    const local = [];
    const geo = mergeColored(T, s.kind === 'tower' ? towerParts(T, s, local) : storefront(T, s, local));
    for (const p of local) {
      signParts.push({ ...p, x: p.x + s.x, z0: p.z0 + s.z, z1: p.z1 + s.z });
    }
    const mesh = new T.Mesh(geo, mat);
    mesh.name = s.name;
    mesh.position.set(s.x, 0, s.z);
    // Buildings ARE real occluders (R26): the rig's default whole-scene scan
    // finds them, and main.js must not call setOccluders() for them.
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    group.add(mesh);
    built.push({ name: s.name, mesh, manifest: s, metrics: facadeMetrics(s), post: landmarkPost(s), sign: !!s.sign });
  }

  // --- one mesh, one atlas, one draw call for every sign face in town --------
  let signs = null;
  const signRows = [];
  if (signParts.length) {
    const tex = signAtlas(T, signParts);          // also assigns each row's v range
    const smat = new T.MeshLambertMaterial({ map: tex });
    signs = new T.Mesh(mergeSigns(T, signParts), smat);
    signs.name = 'town-signs';
    signs.castShadow = false;
    signs.receiveShadow = false;
    noOcclude(signs);   // painted boards are scenery, never camera cover
    group.add(signs);
    // Where each name was painted in the atlas, so a check can confirm the
    // lettering is really there instead of trusting the manifest.
    for (const p of signParts) {
      signRows.push({ sign: p.sign, x0: 0, y0: p.rowY0, w: p.atlasW, h: p.rowH });
    }
  }

  // --- fencing: one merged section, instanced along the lot lines -----------
  // Scenery, not cover: noOcclude keeps every instance out of the camera rig's
  // occlusion raycasts, and main.js must still not call rig.setOccluders().
  const fenceMesh = new T.InstancedMesh(fenceProto(T, manifest.fences), mat, manifest.fences.runs.length * manifest.fences.perRun);
  fenceMesh.name = 'fence-run';
  fenceMesh.castShadow = false;
  fenceMesh.receiveShadow = false;
  const mats = fenceMatrices(T, manifest.fences);
  mats.forEach((m, i) => fenceMesh.setMatrixAt(i, m));
  fenceMesh.instanceMatrix.needsUpdate = true;
  const fences = new T.Group();
  fences.name = 'fences';
  fences.add(fenceMesh);
  noOcclude(fences);
  // ONE direct child of the town group holds all instanced street scenery, so
  // T026b's draw-call cap (ROSTER.length + 2 named children) stays honest as the
  // roster of prop types grows. The meshes — and the draw calls — are unchanged.
  const streetFurniture = new T.Group();
  streetFurniture.name = 'street-furniture';
  streetFurniture.add(fences);
  group.add(streetFurniture);

  // --- street furniture: barrels, crates, hitching posts (R13) --------------
  // Same mechanism as the fences: one merged proto per type, one InstancedMesh,
  // one group, noOcclude'd scenery. Props on a boardwalk are raised to the deck
  // top by propMatrices, so they stand ON it instead of half-buried in it.
  const props = [];
  for (const kind of ['barrels', 'crates', 'hitching-posts']) {
    const placements = manifest.props[kind];
    const mesh = new T.InstancedMesh(propProto(T, kind), mat, placements.length);
    mesh.name = kind;
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    propMatrices(T, manifest, kind).forEach((m, i) => mesh.setMatrixAt(i, m));
    mesh.instanceMatrix.needsUpdate = true;
    const g = new T.Group();
    g.name = kind;
    g.add(mesh);
    noOcclude(g);
    streetFurniture.add(g);
    props.push({ kind, mesh, group: g });
  }

  scene.add(group);
  group.updateWorldMatrix(true, true);

  // The shared furniture record (T026d/e reuse it instead of re-inventing the
  // box math): mesh, count, the group's world bbox, and per-instance boxes.
  const worldBox = (o) => {
    const b = new T.Box3().setFromObject(o);
    return { minX: b.min.x, maxX: b.max.x, minY: b.min.y, maxY: b.max.y, minZ: b.min.z, maxZ: b.max.z };
  };
  const furniture = {
    fences: { mesh: fenceMesh, count: fenceMesh.count, box: worldBox(fences), boxes: instanceBoxes(T, fenceMesh) },
  };
  for (const p of props) {
    furniture[p.kind] = { mesh: p.mesh, count: p.mesh.count, box: worldBox(p.group), boxes: instanceBoxes(T, p.mesh) };
  }

  return {
    group,
    street,
    signs,
    signRows,
    furniture,
    material: mat,
    palette: PALETTE,
    manifest,
    structures: built,
    find: (name) => built.find((b) => b.name === name) || null,
    dispose() {
      for (const b of built) { b.mesh.geometry.dispose(); b.mesh.parent?.remove(b.mesh); }
      if (signs) {
        signs.geometry.dispose();
        signs.material.map?.dispose();
        signs.material.dispose();
        signs.parent?.remove(signs);
      }
      fenceMesh.geometry.dispose();
      fences.parent?.remove(fences);
      for (const p of props) { p.mesh.geometry.dispose(); p.group.parent?.remove(p.group); }
      sgeo.dispose();
      mat.dispose();
      group.parent && group.parent.remove(group);
      return group;
    },
  };
}
