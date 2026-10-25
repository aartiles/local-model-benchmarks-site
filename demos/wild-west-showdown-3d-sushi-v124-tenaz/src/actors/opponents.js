import { createCowboy } from './cowboy.js';

/**
 * One placeholder gunslinger standing at a town landmark (R33/R37 skeleton).
 *
 * T010 owns the real roster (6+ opponents, difficulty table, draw-call culling);
 * this module exists so T007 has a challengeable body with a name, a post and a
 * duel position. The API is deliberately the shape T010 will extend: a list of
 * records, each with a `post` (where he stands in town) and a `duelPost` (where
 * he stands when the duel is staged), plus nearestTo() for the challenge prompt.
 *
 * The rig is created ONCE and added to the scene once — never per duel (D7:
 * each cowboy rig costs 21 draw calls against a ceiling of 75).
 */

/** How close the player must be before an opponent can be challenged (R37). */
export const CHALLENGE_RADIUS = 4.2;

/** Metres between the two duelists. Generous, and readable from the side. */
export const DUEL_GAP = 7.0;

/**
 * T010b (R33/R34/R35) — the gunslingers of Dry Creek, easiest to hardest.
 *
 * `structure` is resolved against the town manifest, so every post position
 * comes from TOWN (the single source of truth) and not from a number copied
 * into this file. Six non-boss duelists occupy six different landmarks;
 * `cabin-north` and `water-tower` are left free for T021's final boss, who
 * gets his own distinctive arena (R56) and the only `boss: true` flag.
 *
 * THE `ai` BLOCK — and the D12 beat it already contains (R42):
 * `reaction` is the time the PLAYER experiences after DRAW, because that is
 * the number R42's ladder is about. duel.js arms its AI timer at the
 * `shooting` phase, which starts `draw` (250ms, DECISIONS.md D12) AFTER
 * drawAt, so the value handed to the duel is `reaction - 250`, published here
 * as `duelReaction`. These six numbers therefore already include that beat:
 * nobody in this roster reacts faster than 380ms after DRAW, and the hardest
 * man in town is still humanly beatable. T010c drives the AI's turn; it must
 * use `duelReaction`, not `reaction`, or the whole ladder runs 250ms slow.
 *
 * The other three variables scale with difficulty the same way: `aimDelay`
 * (ms between deciding and having a level aim) shrinks, `accuracy` grows, and
 * `hesitation` (chance of freezing at DRAW) shrinks.
 *
 * THE `unlockAt` FIELD — R50. The reputation a gunslinger demands before he
 * will face you; 0 means he will draw against anybody. Progression is the
 * authority (src/progress/progression.js `gate()`), and this is the ladder it
 * reads, so the number lives with the cast rather than in a second table.
 * Four men will draw on sight (Buck, Penny, Cass, Silas — "several opponents
 * available initially"), the law and the store demand a name for themselves
 * (Deputy 20, Mabel 45), and the final showdown asks for FINAL_REPUTATION:
 * a `boss: true` record ignores its own `unlockAt` and uses that, so T021
 * gets the boss gate for free by setting the flag.
 */
export const ROSTER = Object.freeze([
  {
    name: 'Buck Rigger',
    unlockAt: 0,
    role: 'saloon gambler',
    structure: 'saloon',
    boss: false,
    palette: {
      shirt: 0x8d5a3b, vest: 0x3f2d22, pants: 0x4a3a2c, hat: 0x2b2018,
      bandana: 0xa8352f, coat: 0x5c4033, gun: 0x3a3a3f,
    },
    ai: { reaction: 760, duelReaction: 510, aimDelay: 430, accuracy: 0.45, hesitation: 0.25 },
  },
  {
    name: 'Penny Hardluck',
    unlockAt: 0,
    role: 'nervous rookie',
    structure: 'cabin-south',
    boss: false,
    palette: {
      shirt: 0xc9a227, vest: 0x7a5230, pants: 0x6b5a3e, hat: 0xa8875a,
      bandana: 0xd9c8a0, coat: 0x8f6f4a, gun: 0x4a4a50,
    },
    ai: { reaction: 900, duelReaction: 650, aimDelay: 500, accuracy: 0.35, hesitation: 0.30 },
  },
  {
    name: 'Cass Dryden',
    unlockAt: 0,
    role: 'trail outlaw',
    structure: 'stable',
    boss: false,
    palette: {
      shirt: 0x6d4c3d, vest: 0x2f2a26, pants: 0x3a332c, hat: 0x1f1a15,
      bandana: 0x8c3b2a, coat: 0x40362c, gun: 0x2e2e33,
    },
    ai: { reaction: 640, duelReaction: 390, aimDelay: 360, accuracy: 0.55, hesitation: 0.20 },
  },
  {
    name: 'Deputy Hollis',
    unlockAt: 20,
    role: 'sheriff\'s deputy',
    structure: 'sheriff-office',
    boss: false,
    palette: {
      shirt: 0x4f6b57, vest: 0x8a6a3c, pants: 0x3f4a3c, hat: 0x59422b,
      bandana: 0xe0c98a, coat: 0x6b5a3e, gun: 0x3c3c42,
    },
    ai: { reaction: 540, duelReaction: 290, aimDelay: 290, accuracy: 0.65, hesitation: 0.14 },
  },
  {
    name: 'Mabel Crane',
    unlockAt: 45,
    role: 'general store clerk',
    structure: 'general-store',
    boss: false,
    palette: {
      shirt: 0xb0763f, vest: 0x5a3b2a, pants: 0x7d6a52, hat: 0x6e4a2f,
      bandana: 0x9c5c4a, coat: 0xa3865c, gun: 0x55555c,
    },
    ai: { reaction: 450, duelReaction: 200, aimDelay: 220, accuracy: 0.75, hesitation: 0.09 },
  },
  {
    name: 'Silas Vane',
    unlockAt: 0,
    role: 'bank-vault veteran',
    structure: 'bank',
    boss: false,
    palette: {
      shirt: 0x3b3f46, vest: 0x241f1b, pants: 0x2c2a28, hat: 0x141110,
      bandana: 0x5c1f1f, coat: 0x2a2420, gun: 0x1e1e22,
    },
    ai: { reaction: 380, duelReaction: 130, aimDelay: 150, accuracy: 0.85, hesitation: 0.05 },
  },
  {
    // T021a (R56) — THE final gunslinger, and the only `boss: true` record.
    // He stands at the water tower, the town's tall landmark out at the edge,
    // which is the arena T021b stages. `unlockAt` is his own number for the
    // ladder's sake; progression.unlockAt() ignores it while `boss` is set and
    // demands FINAL_REPUTATION instead (D14), so the gate needs no new code.
    // 320ms is faster than any man in town (Silas Vane, 380) yet stays above
    // the `- boss-reaction floor: 300` recorded in DECISIONS.md, so he is
    // intimidating and still humanly beatable (R42/R56). duelReaction keeps the
    // D12 arming offset: 320 - 250 = 70.
    name: 'Jeremiah Cade',
    unlockAt: 120,
    role: 'the final gunslinger',
    structure: 'water-tower',
    boss: true,
    palette: {
      shirt: 0xd8d2c8, vest: 0x1a1a1e, pants: 0x23211f, hat: 0x0e0d0c,
      bandana: 0x6b1f1f, coat: 0x141312, gun: 0x0a0a0c,
    },
    ai: { reaction: 320, duelReaction: 70, aimDelay: 100, accuracy: 0.92, hesitation: 0.02 },
  },
]);

/**
 * Facing yaw for a cowboy at (x,z) looking at (tx,tz). Same basis as
 * cowboy.turnTo(): yaw 0 faces +Z.
 */
export function facingYaw(from, to) {
  return Math.atan2(to.x - from.x, to.z - from.z);
}

/**
 * The two facing posts for a duel against `opp`, on the street side of his
 * landmark: the opponent keeps his post, the player is stepped back along the
 * street (Z) by DUEL_GAP, so both stand inside the empty corridor.
 */
export function duelPosts(opp, gap = DUEL_GAP) {
  const oppPost = { x: opp.post.x, z: opp.post.z, y: 0 };
  const dir = opp.post.z >= 0 ? 1 : -1;
  const playerPost = { x: opp.post.x, z: opp.post.z + dir * gap, y: 0 };
  return { opponent: oppPost, player: playerPost };
}

/**
 * @param {object} opts.engine  engine (scene + THREE)
 * @param {object} opts.town    createTown() result, for landmark posts
 * @param {Array}  opts.roster  overrides for ROSTER (T010 passes its own table)
 */
export function createOpponents({ engine, town, roster = ROSTER } = {}) {
  const list = [];

  for (const def of roster) {
    const built = town.find ? town.find(def.structure) : null;
    const post = built && built.post
      ? { x: built.post.x, z: built.post.z, y: built.post.y ?? 0 }
      : { x: 0, z: 20, y: 0 };
    const cowboy = createCowboy(def.palette, { scene: engine.scene });
    cowboy.setYaw(Math.PI);
    cowboy.moveTo(post.x, post.y, post.z);
    cowboy.update(0, { speed: 0 });
    list.push({
      name: def.name,
      role: def.role || '',
      structure: def.structure,
      // T010b (R34/R42): the difficulty data travels with the live record, so
      // T010c's AI turn reads `opp.ai.duelReaction` off the same object the duel
      // already holds. `boss` is false for the whole six; only T021 sets it.
      boss: def.boss === true,
      // T013 (R50): the reputation gate travels with the record, so the
      // challenge prompt and progression.gate() read the same number.
      unlockAt: Number.isFinite(def.unlockAt) ? def.unlockAt : 0,
      ai: def.ai ? { ...def.ai } : null,
      palette: cowboy.palette,
      post,
      cowboy,
      group: cowboy.group,
      get x() { return cowboy.group.position.x; },
      get z() { return cowboy.group.position.z; },
      get yaw() { return cowboy.group.rotation.y; },
    });
  }

  /** Closest opponent within `radius` of a position, or null (R37). */
  function nearestTo(pos, radius = CHALLENGE_RADIUS) {
    let best = null;
    let bestD = radius;
    for (const o of list) {
      const d = Math.hypot(pos.x - o.x, pos.z - o.z);
      if (d <= bestD) { best = o; bestD = d; }
    }
    return best;
  }

  return {
    opponents: list,
    radius: CHALLENGE_RADIUS,
    gap: DUEL_GAP,
    find: (name) => list.find((o) => o.name === name) || null,
    nearestTo,
    duelPosts,
    /** Park every opponent back on his town post (called when a duel ends). */
    resetPosts() {
      for (const o of list) {
        o.cowboy.moveTo(o.post.x, o.post.y, o.post.z);
        o.cowboy.setYaw(Math.PI);
        o.cowboy.setPose('idle');
      }
    },
    step(dt) {
      for (const o of list) o.cowboy.update(dt, { speed: 0 });
    },
    dispose() {
      for (const o of list) o.cowboy.dispose();
      return list.length;
    },
  };
}
