/**
 * T012 (R49/R50/R62) — the purse and the current objective.
 *
 * The run LEDGER (duels won/lost, money earned/forfeited, fastest duel) lives in
 * game.js and is the single source of truth for what happened. This module owns
 * the two numbers the player spends and reads — money and reputation — plus the
 * one line of text that always tells him what to do next (R62), and the reward
 * table the duel pays out of (R49).
 *
 * Pure state: no DOM, no timers, no three.js. The HUD (src/ui/hud.js) renders
 * snapshot(); T013 (unlocks) and T014 (store) extend this same purse rather
 * than inventing a second one.
 */

/**
 * R49: what each gunslinger is worth. The amounts scale with his difficulty
 * (see the `ai.reaction` ladder in src/actors/opponents.js), so the reward line
 * the player reads is also the difficulty ranking made legible.
 *
 * duel.js pays `opponent.reward` on a win and nothing on any other outcome, so
 * these numbers reach the ledger through the duel machine, not around it (D4).
 */
export const REWARDS = Object.freeze({
  'Penny Hardluck': Object.freeze({ money: 20, reputation: 8 }),
  'Buck Rigger': Object.freeze({ money: 25, reputation: 10 }),
  'Cass Dryden': Object.freeze({ money: 40, reputation: 16 }),
  'Deputy Hollis': Object.freeze({ money: 55, reputation: 22 }),
  'Mabel Crane': Object.freeze({ money: 75, reputation: 30 }),
  'Silas Vane': Object.freeze({ money: 100, reputation: 40 }),
  // T021a (R56): the final showdown pays the most in town, so the purse itself
  // says he is the last man. Without this line he would pay DEFAULT_REWARD.
  'Jeremiah Cade': Object.freeze({ money: 200, reputation: 60 }),
});

/** Fallback purse for a gunslinger this table does not know (T021's boss sets his own). */
export const DEFAULT_REWARD = Object.freeze({ money: 25, reputation: 10 });

/** R50: the notoriety the final showdown asks for. T021/T013 own the gate itself. */
export const FINAL_REPUTATION = 120;

export function createProgression({ game = null, opponents = null } = {}) {
  /** Names of the gunslingers the player has beaten, in roster order. */
  const beaten = new Set();
  /** The purse the player has actually spent (T014's store will use it). */
  let spent = 0;
  /** The reward line to show, until the next duel begins. */
  let lastReward = null;
  /** Objective cache: rebuilt only when one of its inputs changes. */
  let objectiveKey = null;
  let objectiveText = '';

  const roster = () => (opponents && opponents.opponents ? opponents.opponents : []);
  const stats = () => (game && game.stats ? game.stats : {
    netMoney: 0, reputationEarned: 0, duelsWon: 0, duelsLost: 0,
  });

  /** The purse: everything won, minus what a defeat forfeited, minus what was spent. */
  function money() {
    return Math.max(0, (stats().netMoney || 0) - spent);
  }

  function reputation() {
    return stats().reputationEarned || 0;
  }

  /** R49: the purse for one gunslinger, as a fresh copy. */
  function rewardFor(name) {
    const r = REWARDS[name] || DEFAULT_REWARD;
    return { money: r.money, reputation: r.reputation };
  }

  /**
   * R50: the reputation a gunslinger demands before he will draw. The number
   * lives on the roster record (src/actors/opponents.js); the boss is the one
   * exception, because R50 asks that the FINAL showdown open only once the
   * player is notorious, so `boss: true` ignores its own `unlockAt` and uses
   * FINAL_REPUTATION. T021 gets the boss gate by setting the flag.
   */
  function unlockAt(o) {
    if (!o) return 0;
    if (o.boss === true) return FINAL_REPUTATION;
    return Number.isFinite(o.unlockAt) && o.unlockAt > 0 ? o.unlockAt : 0;
  }

  function isUnlocked(name) {
    const o = roster().find((e) => e.name === name);
    if (!o) return true;          // an unknown gunslinger is not gated
    return reputation() >= unlockAt(o);
  }

  /** The gate as plain data, so the prompt, the objective and checks read one source. */
  function gate(name) {
    const o = roster().find((e) => e.name === name);
    const need = unlockAt(o);
    const rep = reputation();
    return {
      name: name || (o && o.name) || '',
      unlockAt: need,
      reputation: rep,
      unlocked: rep >= need,
      remaining: Math.max(0, need - rep),
    };
  }

  /** R50/R62: what the player reads when he walks up to a man who won't draw. */
  function lockedLine(name) {
    const g = gate(name);
    if (g.unlocked) return '';
    return `${g.name} won't draw — needs ${g.unlockAt} Reputation (you have ${g.reputation}).`;
  }

  /**
   * Put the reward table onto the live opponent records, which is the only way
   * duel.js will pay it (payout() reads `opponent.reward`). Idempotent, and a
   * test-only WWS.setReward override applied afterwards still wins.
   */
  function arm() {
    let n = 0;
    for (const o of roster()) {
      o.reward = rewardFor(o.name);
      n += 1;
    }
    return n;
  }

  /**
   * R62: the objective always points at the NEXT thing to do, and it is derived
   * from state rather than scripted, so it cannot go stale after a win, a loss
   * or a purchase.
   */
  function objective() {
    const list = roster();
    const total = list.length;
    const rep = reputation();
    const key = `${total}|${beaten.size}|${rep}|${money()}`;
    if (key === objectiveKey) return objectiveText;
    objectiveKey = key;

    if (total === 0) {
      objectiveText = 'Find a gunslinger to challenge.';
      return objectiveText;
    }
    if (beaten.size === 0) {
      const first = list.find((o) => unlockAt(o) === 0) || list[0];
      objectiveText = `Find a gunslinger to challenge — ${first.name} is by the ${first.structure || 'saloon'}.`;
      return objectiveText;
    }
    if (beaten.size >= total) {
      objectiveText = rep >= FINAL_REPUTATION
        ? 'You are notorious — ride out for the final showdown.'
        : `Every gunslinger in town is down. Earn ${FINAL_REPUTATION} Reputation for the final showdown.`;
      return objectiveText;
    }
    // R50: the objective points at the next man the player can ACTUALLY fight,
    // and names what the locked ones cost, so a gate is never a mystery.
    const open = list.find((o) => !beaten.has(o.name) && rep >= unlockAt(o));
    const locked = list.filter((o) => !beaten.has(o.name) && rep < unlockAt(o));
    if (!open) {
      const cheapest = locked.slice().sort((a, b) => unlockAt(a) - unlockAt(b))[0];
      objectiveText = `No one will draw yet — earn ${unlockAt(cheapest)} Reputation for ${cheapest.name} (${rep} held).`;
      return objectiveText;
    }
    objectiveText = `Take down ${open.name} — ${beaten.size} of ${total} gunslingers beaten.`
      + (locked.length ? ` Locked: ${locked.map((o) => `${o.name} (${unlockAt(o)} Rep)`).join(', ')}.` : '');
    return objectiveText;
  }

  /** Drop the cached objective (a new run, or a roster change). */
  function invalidate() { objectiveKey = null; }

  const api = {
    REWARDS,
    FINAL_REPUTATION,
    rewardFor,
    arm,
    objective,
    invalidate,
    // T013 (R50): the reputation ladder. gate()/isUnlocked()/lockedLine() are the
    // single source of truth for "can this man be challenged right now", read by
    // the challenge prompt in main.js and by WWS.progression().
    unlockAt,
    isUnlocked,
    gate,
    lockedLine,
    ladder: () => roster().map((o) => gate(o.name)),

    get money() { return money(); },
    get reputation() { return reputation(); },
    get spent() { return spent; },
    get lastReward() { return lastReward ? { ...lastReward } : null; },
    get beaten() { return [...beaten]; },
    get duelsBeaten() { return beaten.size; },
    get finalUnlocked() { return reputation() >= FINAL_REPUTATION; },

    /**
     * Called by main.js when a duel settles. `record` is
     * { outcome, name, money, reputation }. A win banks the reward line the HUD
     * shows; anything else leaves the previous line alone (a draw or a loss must
     * not pretend the player earned something, R49).
     */
    note(record) {
      if (!record) return api.snapshot();
      if (record.outcome === 'win') {
        if (record.name) beaten.add(record.name);
        lastReward = {
          name: record.name || null,
          money: Number.isFinite(record.money) ? record.money : 0,
          reputation: Number.isFinite(record.reputation) ? record.reputation : 0,
          outcome: record.outcome,
        };
        invalidate();
      }
      return api.snapshot();
    },

    /** A new duel starts: the old reward line is no longer the news (R66). */
    beginDuel() {
      lastReward = null;
      return api.snapshot();
    },

    /**
     * R51/R53: the store's door. A purchase only succeeds against the purse it
     * can actually pay for, so the run can never go negative or get stuck.
     */
    spend(amount) {
      const cost = Number.isFinite(amount) ? Math.max(0, Math.floor(amount)) : 0;
      if (cost > money()) return false;
      spent += cost;
      invalidate();
      return true;
    },

    /** Everything the HUD needs to draw itself, as plain data. */
    snapshot() {
      return {
        money: money(),
        reputation: reputation(),
        FINAL_REPUTATION,
        objective: objective(),
        lastReward: api.lastReward,
        beaten: api.beaten,
        duelsBeaten: beaten.size,
        finalUnlocked: api.finalUnlocked,
        // T013 (R50): the whole ladder as the player's reputation sees it.
        gates: api.ladder(),
        locked: api.ladder().filter((g) => !g.unlocked).map((g) => g.name),
        spent,
      };
    },

    /** R59: a new run starts clean. game.js wipes the ledger on its own. */
    reset() {
      beaten.clear();
      spent = 0;
      lastReward = null;
      invalidate();
      return api.snapshot();
    },
  };

  // R59: PLAY AGAIN goes through `start`, which is where game.js wipes the ledger.
  if (game && game.onPhase) {
    game.onPhase((next) => { if (next === 'start') api.reset(); });
  }

  return api;
}
