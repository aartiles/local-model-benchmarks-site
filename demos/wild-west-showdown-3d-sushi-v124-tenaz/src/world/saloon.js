import { noOcclude } from './terrain.js';
import { PALETTE, deckRect, facadeMetrics } from './town.js';
import { createCowboy } from '../actors/cowboy.js';

/**
 * T019b (R54) — the saloon as a landmark you can READ from the street.
 *
 * `town.js` owns the saloon's EXTERIOR shell (siding, false front, door plank,
 * windows, porch deck and posts) and is read-only, and its building body is one
 * merged solid box: there is no interior to walk into. So this module does the
 * "convincing exterior interaction" branch of R54 — it dresses the 2.4 m deep
 * porch recess that town.js leaves open with everything a frontier saloon shows
 * the street: a bar with a back shelf and bottles, two tables with stools, an
 * upright piano, hanging lanterns, batwing doors that actually swing, and a
 * gunslinger on the porch.
 *
 * IT ADDS ITS OWN GROUP, never children to `town.group`: T026b.landmarks asserts
 * the town group holds at most ROSTER+2 children (one merged mesh per structure),
 * and its corridor scan walks the town children looking for anything that reaches
 * into the street. Everything here sits inside the saloon's own footprint, on its
 * deck, so neither assertion moves.
 *
 * THE BUDGETS THIS MODULE MUST RESPECT (D7 / R21):
 *  - Every static part is merged into ONE vertex-coloured mesh reusing
 *    `town.material`, so the whole fit-out costs a single draw call. The two door
 *    leaves are separate meshes because they rotate, so the saloon costs 3 calls
 *    in total.
 *  - The gunslinger is a real `createCowboy` rig (21 calls) and therefore goes
 *    through the shared T010a culler like every other rig in town; maxVisible 2
 *    means he is drawn only when he is the nearest thing to the camera.
 *  - All of it is `noOcclude`'d: a bar counter must never be what hides the
 *    camera behind the porch (R26), and the stubbed raycasts keep the
 *    T010a/T026cc scene-scan bound where it is.
 *
 * TIME: `update(dt)` only. No setTimeout, no Date.now(), no Math.random — the
 * door oscillation is integrated from dt, so a check can drive it in frames or in
 * fixed steps and get the same answer (R36/R66), and a pause freezes it with the
 * rest of the town because main.js calls it from the pause-gated callback.
 */

/** Half-height of a batwing door, and the gap it hangs off the door plank by. */
const LEAF_INNER = 0.02;
const LEAF_OUTER = 0.62;
const LEAF_Y0 = 0.95;
const LEAF_Y1 = 1.95;
/** How close to the doorway the player has to be for the doors to push open. */
export const DOOR_RADIUS = 2.2;
/** Seconds between the idle drafts that knock the doors now and then. */
const DRAFT_PERIOD = 9.0;
/** Swing integrator: rad/s of oscillation and how fast it dies away. */
const SWING_FREQ = 6.2;
const SWING_DECAY = 2.6;

/** Cheap clothes for the porch regular — same cached materials as the crowd. */
const GUNSLINGER = Object.freeze({
  shirt: 0x8e3b2e, vest: 0x3a2c22, pants: 0x2f2418, hat: 0x3c2f22, bandana: 0xc2a37a,
});

const rgb = (T, hex) => { const c = new T.Color(hex); return [c.r, c.g, c.b]; };

/** Translate + scale a unit box into one part of the merged fit-out. */
function box(T, w, h, d, x, y, z) {
  return {
    geo: new T.BoxGeometry(w, h, d),
    matrix: new T.Matrix4().makeTranslation(x, y, z),
  };
}

/**
 * Merge parts into ONE geometry carrying position, normal and colour, so the
 * whole saloon fit-out is a single draw call (same contract as town.js's private
 * helper; three.module.js exports no BufferGeometryUtils, R2).
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
 * Build the saloon's life.
 * @param {object} opts.engine   owns scene/camera/THREE
 * @param {object} opts.town     the built town (for the saloon record + material)
 * @param {object} opts.rigCull  the shared T010a cull (required: the gunslinger
 *                                is a 21-call rig and must not draw every frame)
 */
export function createSaloon({ engine, town, rigCull } = {}) {
  if (!engine || !engine.scene) throw new Error('createSaloon: needs an engine');
  if (!town || typeof town.find !== 'function') throw new Error('createSaloon: needs the built town');
  if (!rigCull) throw new Error('createSaloon: needs the rig cull (D7/R21)');
  const rec = town.find('saloon');
  if (!rec) throw new Error('createSaloon: the town manifest has no "saloon"');

  const T = engine.THREE;
  const s = rec.manifest;
  const m = facadeMetrics(s);
  const deck = deckRect(s);
  if (!deck) throw new Error('createSaloon: the saloon has no deck to dress');
  const face = s.facing === -1 ? -1 : 1;

  const C = {
    plank: rgb(T, PALETTE.plank),
    beam: rgb(T, PALETTE.beam),
    door: rgb(T, PALETTE.door),
    trim: rgb(T, s.trim ?? PALETTE.paintRed),
    glass: rgb(T, PALETTE.glass),
    brass: rgb(T, PALETTE.stone),
    dark: rgb(T, PALETTE.roof),
  };

  const group = new T.Group();
  group.name = 'saloon-life';
  // Local coordinates: x is measured from the footprint centre TOWARD the
  // street (mirrored for an east-row building, exactly like town.js's `add`),
  // z along the front, y from the ground. The group sits on the footprint, so
  // every number below is a porch-relative size, not a world position.
  group.position.set(s.x, 0, s.z);

  const parts = [];
  /**
   * Per-feature geometry ledger, built from the parts that ACTUALLY went into the
   * merged mesh (and from the real door/rig bounding boxes): a feature with no
   * add() call has no entry, so `snapshot()` reports what is built, never a wish
   * list. Boxes are WORLD space, like the door and gunslinger entries below.
   */
  const feats = new Map();
  const featBox = (feat, x0, x1, y0, y1, z0, z1) => {
    const f = feats.get(feat) || { parts: 0, minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity, minZ: Infinity, maxZ: -Infinity };
    f.parts += 1;
    const xa = s.x + face * x0; const xb = s.x + face * x1;
    f.minX = Math.min(f.minX, xa, xb); f.maxX = Math.max(f.maxX, xa, xb);
    f.minY = Math.min(f.minY, y0, y1); f.maxY = Math.max(f.maxY, y0, y1);
    f.minZ = Math.min(f.minZ, s.z + z0, s.z + z1); f.maxZ = Math.max(f.maxZ, s.z + z0, s.z + z1);
    feats.set(feat, f);
  };
  /** [min,max] in local coords; a zero span is a layout mistake, dropped quietly. */
  const add = (feat, x0, x1, y0, y1, z0, z1, color) => {
    const w = x1 - x0;
    const h = y1 - y0;
    const d = z1 - z0;
    if (w <= 0.005 || h <= 0.005 || d <= 0.005) return;
    parts.push({ ...box(T, w, h, d, face * (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2), color });
    featBox(feat, x0, x1, y0, y1, z0, z1);
  };
  /** One stool: seat plus a stub leg, both on the deck top. */
  const stool = (feat, cx, cz) => {
    add(feat, cx - 0.18, cx + 0.18, deck.top + 0.56, deck.top + 0.64, cz - 0.18, cz + 0.18, C.plank);
    add(feat, cx - 0.06, cx + 0.06, deck.top, deck.top + 0.56, cz - 0.06, cz + 0.06, C.beam);
  };

  const wallX = m.faceX;          // the saloon's front wall plane (local)
  const outerX = m.hw;            // the porch's street edge (local)
  const zMin = -(m.hd - 0.4);     // the deck's own z span, from deckRect()
  const zMax = m.hd - 0.4;

  // --- the bar, south of the doorway ----------------------------------------
  // Counter, cap, foot rail, back shelf and bottles: the four things that make a
  // long box read as a saloon bar rather than a stall.
  const barZ0 = zMin + 0.6;       // 14.0 local -4.0, clear of the deck corner
  const barZ1 = -1.3;             // stops short of the door frame at -0.72
  add('bar', wallX + 1.0, wallX + 1.4, deck.top, deck.top + 0.88, barZ0, barZ1, C.dark);     // counter front
  add('bar', wallX + 0.95, wallX + 1.5, deck.top + 0.88, deck.top + 0.96, barZ0 - 0.05, barZ1 + 0.05, C.plank); // cap
  add('bar', wallX + 1.55, wallX + 1.62, deck.top + 0.2, deck.top + 0.28, barZ0, barZ1, C.beam);                // foot rail
  add('bar', wallX + 0.05, wallX + 0.2, deck.top + 1.26, deck.top + 2.06, barZ0 + 0.1, barZ1 - 0.1, C.trim);    // back shelf
  for (let bz = barZ0 + 0.4; bz < barZ1 - 0.2; bz += 0.5) {
    add('bar', wallX + 0.08, wallX + 0.18, deck.top + 2.06, deck.top + 2.34, bz, bz + 0.1, C.glass);            // bottles
  }
  for (const sz of [barZ0 + 0.6, barZ0 + 1.4, barZ0 + 2.2]) stool('bar', wallX + 1.9, sz);

  // --- two tables and their stools, north of the doorway ---------------------
  for (const tz of [1.6, 3.1]) {
    add('tables', wallX + 0.55, wallX + 1.25, deck.top + 0.74, deck.top + 0.82, tz - 0.35, tz + 0.35, C.plank);
    add('tables', wallX + 0.82, wallX + 0.98, deck.top, deck.top + 0.74, tz - 0.08, tz + 0.08, C.beam);
    stool('tables', wallX + 1.55, tz);
  }
  stool('tables', wallX + 0.9, 2.35);

  // --- the upright piano, in the north-east corner of the porch --------------
  const pz0 = zMax - 0.8;
  add('piano', wallX + 0.05, wallX + 0.8, deck.top, deck.top + 1.02, pz0, zMax, C.dark);        // body
  add('piano', wallX + 0.05, wallX + 0.86, deck.top + 1.02, deck.top + 1.42, pz0, zMax, C.door);// upper case
  add('piano', wallX + 0.8, wallX + 0.94, deck.top + 0.5, deck.top + 0.58, pz0 + 0.05, zMax - 0.05, C.plank); // keybed
  add('piano', wallX + 0.82, wallX + 0.9, deck.top + 0.58, deck.top + 0.64, pz0 + 0.1, zMax - 0.1, C.brass);   // keys
  add('piano', wallX + 0.1, wallX + 0.75, deck.top + 1.42, deck.top + 1.62, pz0 + 0.15, zMax - 0.15, C.trim); // music rack
  stool('piano', wallX + 1.35, (pz0 + zMax) / 2);                                               // piano bench/stool

  // --- hanging lanterns on the two end posts ---------------------------------
  for (const lz of [zMin + 0.3, zMax - 0.3]) {
    add('lanterns', outerX - 0.42, outerX - 0.28, deck.top + 2.0, deck.top + 2.3, lz - 0.07, lz + 0.07, C.brass);
    add('lanterns', outerX - 0.46, outerX - 0.24, deck.top + 2.3, deck.top + 2.42, lz - 0.1, lz + 0.1, C.beam);
  }

  const furniture = new T.Mesh(mergeColored(T, parts), town.material);
  furniture.name = 'saloon-furniture';
  furniture.castShadow = false;
  furniture.receiveShadow = false;
  noOcclude(furniture);
  group.add(furniture);

  // --- the batwing doors ------------------------------------------------------
  // town.js fills the doorway with a dark door plank, so the leaves hang just
  // proud of it (and of the handle) and read as the saloon's swinging doors.
  // Each leaf is a Group hinged on its OUTER edge, so rotating it about Y is a
  // real hinge: the free end sweeps out toward the street.
  const leafParts = () => {
    const out = [];
    const push = (x0, x1, y0, y1, z0, z1, color) => {
      const w = x1 - x0; const h = y1 - y0; const d = z1 - z0;
      if (w <= 0.005 || h <= 0.005 || d <= 0.005) return;
      out.push({ ...box(T, w, h, d, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2), color });
    };
    // Authored relative to the hinge at the origin, extending toward +z.
    for (const sz of [0.06, 0.26, 0.46]) {
      push(-0.03, 0.03, LEAF_Y0, LEAF_Y1, sz, sz + 0.16, C.plank);
    }
    push(-0.035, 0.035, LEAF_Y1 - 0.12, LEAF_Y1, 0.02, LEAF_OUTER, C.beam);  // top rail
    push(-0.035, 0.035, LEAF_Y0, LEAF_Y0 + 0.1, 0.02, LEAF_OUTER, C.beam);  // bottom rail
    push(-0.03, 0.03, LEAF_Y0 + 0.35, LEAF_Y0 + 0.45, 0.02, LEAF_OUTER - 0.06, C.beam); // brace
    return out;
  };
  const leafGeo = mergeColored(T, leafParts());
  const doorX = wallX + 0.28;   // proud of the plank (3.79) and the handle (3.84)
  const doors = [];
  for (const side of [1, -1]) {
    const hinge = new T.Group();
    hinge.name = side === 1 ? 'saloon-door-north' : 'saloon-door-south';
    hinge.position.set(face * doorX, 0, side === 1 ? LEAF_OUTER + LEAF_INNER : -(LEAF_OUTER + LEAF_INNER));
    // side 1 hinges at +z and must reach toward the centre (-z), so the leaf is
    // turned about its hinge rather than mirrored: a negative scale would flip
    // the winding of every plank and light it inside-out.
    const base = side === 1 ? Math.PI : 0;
    hinge.rotation.y = base;
    const leaf = new T.Mesh(leafGeo, town.material);
    leaf.name = `${hinge.name}-leaf`;
    leaf.castShadow = false;
    leaf.receiveShadow = false;
    noOcclude(leaf);
    hinge.add(leaf);
    group.add(hinge);
    // Outward is +x for the west row. With slats reaching in -z (side 1 after the
    // mirror) a NEGATIVE rotation.y swings them out, so the sign follows the side.
    doors.push({ hinge, side, dir: side === 1 ? -1 : 1, base });
  }

  // --- the gunslinger on the porch --------------------------------------------
  // He is a rig, so he goes through the same culler as the crowd and the roster
  // (D7). He is NOT an opponent: nothing here touches opponents.list, so he can
  // never be challenged or shot.
  const gunslinger = createCowboy(GUNSLINGER, { scene: group });
  gunslinger.group.name = 'npc-saloon-gunslinger';
  const GUNS = { x: wallX + 1.85, z: -1.05 };   // between the door and the bar end
  gunslinger.moveTo(face * GUNS.x, deck.top, GUNS.z);
  gunslinger.setYaw(face === 1 ? Math.PI / 2 : -Math.PI / 2);   // looking down the street
  gunslinger.setPose('idle');
  rigCull.add(gunslinger.group);

  // --- door animation ---------------------------------------------------------
  let amp = 0;          // current oscillation amplitude, rad
  let phase = 0;        // 0..PI/2 so a swing starts at the closed position
  let swinging = false;
  let draft = DRAFT_PERIOD * 0.35;   // first idle draft, a few seconds in
  let nearDoor = false;

  /** Bang the doors open. `strength` is the peak angle in radians. */
  function swing(strength = 0.85) {
    const a = Math.max(0, Math.min(1.4, strength));
    if (a <= amp && swinging) return;
    amp = a;
    phase = 0;
    swinging = true;
  }

  /** One frame: integrate the doors, and open them when someone reaches the door. */
  function update(dt, playerPos) {
    const step = Number.isFinite(dt) ? Math.max(0, Math.min(dt, 0.05)) : 0;
    if (step > 0) {
      draft -= step;
      if (draft <= 0) {
        draft = DRAFT_PERIOD;
        swing(0.3);   // a draft down the street, so the doors are never quite dead
      }
      if (swinging) {
        phase += step * SWING_FREQ;
        amp *= Math.exp(-step * SWING_DECAY);
        if (amp < 0.01) { amp = 0; swinging = false; phase = 0; }
      }
      // Someone at the door pushes it open, and it keeps knocking while they stay
      // there: this is R54's "convincing exterior interaction" with the saloon.
      if (playerPos && Number.isFinite(playerPos.x)) {
        const d = Math.hypot(playerPos.x - (s.x + face * (wallX + 0.3)), playerPos.z - s.z);
        const now = d <= DOOR_RADIUS;
        if (now && !nearDoor) swing(0.95);
        else if (now && !swinging) swing(0.5);
        nearDoor = now;
      }
    }
    const angle = amp * Math.sin(phase);
    for (const d of doors) d.hinge.rotation.y = d.base + d.dir * angle;
    gunslinger.update(step, { speed: 0 });
  }

  /** World-space doorway centre, for a check that wants to prove locality. */
  const doorway = { x: s.x + face * (wallX + 0.3), z: s.z, y: deck.top };

  /** World bbox of one Object3D's own geometry, rounded for JSON. */
  const objBox = (o) => {
    const b = new T.Box3().setFromObject(o);
    return {
      minX: +b.min.x.toFixed(3), maxX: +b.max.x.toFixed(3),
      minY: +b.min.y.toFixed(3), maxY: +b.max.y.toFixed(3),
      minZ: +b.min.z.toFixed(3), maxZ: +b.max.z.toFixed(3),
    };
  };
  const r3 = (v) => +v.toFixed(3);

  function snapshot() {
    // The feature list is DERIVED from what was actually built: one entry per
    // tagged add() family, plus the two real door leaves and the rig. Delete a
    // bar/table/piano add() block and its part count drops — the check sees it.
    const features = {};
    for (const [name, f] of feats) {
      features[name] = { parts: f.parts, box: {
        minX: r3(f.minX), maxX: r3(f.maxX), minY: r3(f.minY),
        maxY: r3(f.maxY), minZ: r3(f.minZ), maxZ: r3(f.maxZ),
      } };
    }
    const doorBox = new T.Box3();
    for (const d of doors) doorBox.union(new T.Box3().setFromObject(d.hinge));
    features['swinging-doors'] = { parts: doors.length, box: {
      minX: r3(doorBox.min.x), maxX: r3(doorBox.max.x), minY: r3(doorBox.min.y),
      maxY: r3(doorBox.max.y), minZ: r3(doorBox.min.z), maxZ: r3(doorBox.max.z),
    } };
    features.gunslinger = { parts: 1, box: objBox(gunslinger.group) };
    return {
      name: group.name,
      // features stays the NAME LIST T019.town-inhabited reads; featureGeom is
      // the per-name part count and world bbox the T019b check asserts against.
      features: Object.keys(features),
      featureGeom: features,
      deck: {
        minX: deck.minX, maxX: deck.maxX, minZ: deck.minZ, maxZ: deck.maxZ, top: deck.top,
      },
      doorway,
      doorRadius: DOOR_RADIUS,
      doorAngle: +(doors[0].hinge.rotation.y - doors[0].base).toFixed(4),
      doorSwinging: swinging,
      doorAmp: +amp.toFixed(4),
      doors: doors.map((d) => ({
        name: d.hinge.name,
        x: +(group.position.x + d.hinge.position.x).toFixed(3),
        z: +(group.position.z + d.hinge.position.z).toFixed(3),
        angle: +d.hinge.rotation.y.toFixed(4),      })),
      gunslinger: {
        rig: gunslinger.group.name,
        pose: gunslinger.pose,
        // World space, like the door hinges below: the rig is a child of this
        // group, so a check comparing him against the manifest footprint needs
        // the group offset added, not the porch-local number.
        x: +(group.position.x + gunslinger.group.position.x).toFixed(3),
        y: +(group.position.y + gunslinger.group.position.y).toFixed(3),
        z: +(group.position.z + gunslinger.group.position.z).toFixed(3),
        yaw: +gunslinger.group.rotation.y.toFixed(3),
      },
      meshes: ['saloon-furniture', 'saloon-door-north-leaf', 'saloon-door-south-leaf'],
    };
  }

  engine.scene.add(group);

  return {
    group,
    furniture,
    doors,
    gunslinger,
    doorway,
    deck,
    swing,
    update,
    snapshot,
    dispose() {
      furniture.geometry.dispose();
      leafGeo.dispose();
      gunslinger.dispose();
      group.parent?.remove(group);
      return group;
    },
  };
}
