/**
 * T014a (R51) — the general store's item table and purchase ledger.
 *
 * Money needs somewhere to go. This module owns WHAT is for sale and WHO owns
 * it; progression.js owns the purse (spend() is the only door to it, so a
 * purchase can never drive the run negative), and T014b owns HOW the items
 * bite (aim speed, accuracy tolerance, cosmetics).
 *
 * The table is DATA, not branches: every item is {id, name, cost, kind, value,
 * desc}, and `kind` is the contract T014b reads. The kind vocabulary is closed
 * on purpose — nothing here may be draw-related (R40/R52): no item, owned or
 * not, touches the DRAW delay, the false-start rule or the AI reaction table.
 *
 * Pure state: no DOM, no timers, no three.js. The screen (src/ui/screens.js)
 * renders snapshot(); main.js drives buy() from the button and the E key.
 */

/** The closed effect vocabulary. A new kind must be applied by T014b to be sellable. */
export const KINDS = Object.freeze(['aim', 'accuracy', 'cosmetic-hat', 'cosmetic-outfit', 'cosmetic-gun']);

/**
 * R51: the shelf. Prices sit against the reward ladder (Penny 20 / Buck 25 /
 * Cass 40 / Deputy 55 / Mabel 75), so the first useful purchase lands after
 * two or three early duels and the full shelf costs roughly the whole town.
 */
export const ITEMS = Object.freeze([
  Object.freeze({ id: 'black-hat', name: 'Black Stetson', cost: 25, kind: 'cosmetic-hat',
    value: 0x1b1b22, desc: 'A darker hat. Purely for show.' }),
  Object.freeze({ id: 'red-poncho', name: 'Red Poncho', cost: 35, kind: 'cosmetic-outfit',
    value: 0x9c2f26, desc: 'A brighter coat. Purely for show.' }),
  Object.freeze({ id: 'silver-revolver', name: 'Silver-Trimmed Revolver', cost: 50, kind: 'cosmetic-gun',
    value: 0xc8ccd6, desc: 'Polished iron. Purely for show.' }),
  Object.freeze({ id: 'quick-hands', name: 'Quick-Hands Grip', cost: 40, kind: 'aim',
    value: 1.6, desc: 'Your aim moves 60% faster. DRAW still decides.' }),
  Object.freeze({ id: 'gun-smith', name: 'Gunsmith Refit', cost: 60, kind: 'accuracy',
    value: 1.35, desc: 'A more forgiving hit tolerance. You still have to aim.' }),
]);

const BY_ID = new Map(ITEMS.map((i) => [i.id, i]));

/**
 * @param {object} opts.progression  the purse (spend()/money)
 * @param {object} opts.game         for the R59 reset on a new run
 */
export function createStore({ progression = null, game = null } = {}) {
  /** Item ids the player has bought this run. */
  const owned = new Set();
  const listeners = new Set();

  const api = {
    ITEMS,
    KINDS,

    isOwned: (id) => owned.has(id),
    find: (id) => BY_ID.get(id) || null,

    /**
     * R51: the purchase. Three outcomes, all plain data so the screen and the
     * checks read the same answer:
     *   ok            — money moved, item is owned, listeners notified
     *   refuse:owned  — already bought, nothing changes
     *   refuse:short  — purse cannot pay, nothing changes, names the gap
     */
    buy(id) {
      const item = BY_ID.get(id);
      if (!item) return { ok: false, reason: `The store does not carry "${id}".` };
      if (owned.has(id)) {
        return { ok: false, reason: `${item.name} is already yours.`, item: { ...item } };
      }
      const money = progression ? progression.money : 0;
      if (money < item.cost) {
        return {
          ok: false,
          short: true,
          reason: `Not enough money — ${item.name} costs $${item.cost}, you have $${money}.`,
          item: { ...item },
        };
      }
      // progression.spend() is the ONLY way money leaves the purse; it refuses
      // again against the live number, so a race cannot double-spend (D4 spirit).
      if (progression && !progression.spend(item.cost)) {
        return {
          ok: false,
          short: true,
          reason: `Not enough money — ${item.name} costs $${item.cost}.`,
          item: { ...item },
        };
      }
      owned.add(id);
      const snap = api.snapshot();
      for (const fn of [...listeners]) fn(snap, id);
      return { ok: true, item: { ...item }, money: snap.money };
    },

    /** The screen re-renders and the HUD re-pushes through this one funnel. */
    onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); },

    snapshot() {
      return {
        money: progression ? progression.money : 0,
        owned: [...owned],
        items: ITEMS.map((i) => ({ ...i, owned: owned.has(i.id) })),
      };
    },

    /**
     * R52: reduce the shelf into the numbers and colours the systems consume.
     * Pure data, no imports: main.js pushes this into aiming (aim speed),
     * shooting (hit tolerance) and the player rig (cosmetics) at purchase time
     * AND at boot, so owned effects and bought effects are the same thing.
     * The kind vocabulary is closed and contains nothing draw-related, which is
     * why no combination of items can move the DRAW delay or the AI's reaction.
     */
    modifiers() {
      const m = { aimSpeed: 1, accuracy: 1, tints: {} };
      for (const item of ITEMS) {
        if (!owned.has(item.id)) continue;
        if (item.kind === 'aim') m.aimSpeed *= item.value;
        else if (item.kind === 'accuracy') m.accuracy *= item.value;
        else m.tints[item.kind.slice('cosmetic-'.length)] = item.value;
      }
      return m;
    },

    /** R59: a new run starts with an empty shelf again. */
    reset() {
      owned.clear();
      const snap = api.snapshot();
      for (const fn of [...listeners]) fn(snap, null);
      return snap;
    },
  };

  // PLAY AGAIN wipes the ledger and the purse; the shelf must wipe with them
  // or a spent-for-free item would keep its effect into the new run (R53/R59).
  if (game && game.onPhase) {
    game.onPhase((next) => { if (next === 'start') api.reset(); });
  }

  return api;
}
