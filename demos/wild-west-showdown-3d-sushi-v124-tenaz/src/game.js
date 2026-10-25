/**
 * Top-level phase machine (R36, R65). Pure state: no DOM, no gameplay, no timers.
 *
 *   boot -> start -> exploring <-> duel -> defeat | victory
 *                       \__ paused __/      (resume returns to the phase it paused)
 *
 * Systems subscribe with onPhase(fn) and do their own setup/teardown from it;
 * ui/screens.js maps phases to overlays. Duel phases are driven by duel.js (T007)
 * and must never be entered from more than one place (D4).
 */
export const PHASES = Object.freeze([
  'boot', 'start', 'exploring', 'duel', 'defeat', 'victory', 'paused',
]);

/** Where each phase may legally go next. Anything else is a bug, not a state. */
const TRANSITIONS = Object.freeze({
  boot: ['start'],
  start: ['exploring'],
  // R58: the run ends when the final gunslinger falls. duel.finish() is the ONLY
  // town handback and it always runs (T021b depends on that), so the completion
  // screen is raised from `exploring` on the frame after the win rather than
  // mid-beat from `duel`. Only main.js's boss-win flag takes this edge, and
  // `victory -> ['start']` (PLAY AGAIN) is still the only way out.
  exploring: ['duel', 'paused', 'victory'],
  duel: ['exploring', 'defeat', 'victory', 'paused'],
  defeat: ['exploring', 'start'],
  victory: ['start'],
  paused: ['exploring', 'duel'],
});

/**
 * T011 (R48): what losing costs. The run ledger is the only place progress is
 * kept until T012 builds the purse on top of it, so a defeat charges a forfeit
 * against earnings AND raises the loss/death counters — either of which satisfies
 * R48, and neither of which erases anything the player already won.
 */
export const DEFEAT_COST = Object.freeze({ money: 10 });

/** Outcomes that cost the player the duel (mirrors duel.js LOSS_OUTCOMES). */
const LOSSES = Object.freeze(['false-start', 'opponent-shot']);

/**
 * R58: the run statistics the completion screen has to show, plus the money and
 * loss counters R48/R49 need. Cumulative for the whole run; `restart()` zeroes it.
 */
function emptyStats() {
  return {
    duels: 0, duelsWon: 0, duelsLost: 0, falseStarts: 0, deaths: 0,
    moneyEarned: 0, moneyForfeited: 0, reputationEarned: 0,
    netMoney: 0, fastestDuelMs: null, playMs: 0,
  };
}

/**
 * R58: the phases where the run clock runs. `start`/`boot` are excluded so the
 * clock begins at the START press and is not wall time since page load, and
 * `paused` is excluded so thinking time is not play time (the frame loop that
 * calls tick() returns early while paused anyway).
 */
const PLAYING = Object.freeze(['exploring', 'duel', 'defeat']);

export function createGame(engine = null) {
  const listeners = new Set();
  let state = 'boot';
  let previous = null;
  let pausedFrom = null;
  let stats = emptyStats();
  /** The last reported duel result, so the HUD/defeat line can name it. */
  let lastOutcome = null;

  const game = {
    engine,

    get state() { return state; },
    get previous() { return previous; },
    get pausedFrom() { return pausedFrom; },

    /** True when `next` is a legal move from the current phase. */
    can(next) {
      return PHASES.includes(next) && TRANSITIONS[state].includes(next);
    },

    /**
     * Move to `next`. Returns true when the phase changed. An unknown phase is a
     * programming error and throws; an illegal move is refused loudly and leaves
     * the machine untouched, so a stray input can never corrupt progression state.
     */
    set(next) {
      if (!PHASES.includes(next)) throw new Error(`unknown phase: ${next}`);
      if (next === state) return false;
      if (!game.can(next)) {
        console.warn(`[game] refused illegal transition ${state} -> ${next}`);
        return false;
      }
      previous = state;
      state = next;
      pausedFrom = next === 'paused' ? previous : null;
      // R59: entering the start screen begins a NEW run, so the ledger is wiped
      // here (the only place it is reset). PLAY AGAIN reaches this from both
      // `victory` and `defeat`; the first boot is a no-op.
      if (next === 'start') {
        stats = emptyStats();
        lastOutcome = null;
      }
      for (const fn of [...listeners]) fn(next, previous);
      return true;
    },

    /**
     * T011 (R48/R58): the run ledger. duel.js reports every settled outcome here
     * and never touches money or counters itself, so progression state lives in
     * exactly one pure place. A loss charges a forfeit and raises the loss/death
     * counters; it NEVER erases anything already earned, and the forfeit is capped
     * at what the player has actually won, so the run can never go negative or
     * become unwinnable (R53).
     *
     * `meta.duelMs` is the wall-clock length of the duel, for the fastest-duel
     * stat R58 needs.
     */
    recordOutcome(outcome, reward = null, meta = null) {
      if (!outcome) return null;
      const money = reward && Number.isFinite(reward.money) ? reward.money : 0;
      const rep = reward && Number.isFinite(reward.reputation) ? reward.reputation : 0;
      stats.duels += 1;
      lastOutcome = { outcome, money: 0, rep: 0, forfeit: 0, at: Date.now() };
      if (outcome === 'win') {
        stats.duelsWon += 1;
        stats.moneyEarned += money;
        stats.reputationEarned += rep;
        lastOutcome.money = money;
        lastOutcome.rep = rep;
      } else if (LOSSES.includes(outcome)) {
        stats.duelsLost += 1;
        stats.deaths += 1;
        if (outcome === 'false-start') stats.falseStarts += 1;
        const owing = Math.max(0, stats.moneyEarned - stats.moneyForfeited);
        const forfeit = Math.min(DEFEAT_COST.money, owing);
        stats.moneyForfeited += forfeit;
        lastOutcome.forfeit = forfeit;
      }
      stats.netMoney = stats.moneyEarned - stats.moneyForfeited;
      const ms = meta && Number.isFinite(meta.duelMs) ? meta.duelMs : null;
      if (ms !== null && ms >= 0
        && (stats.fastestDuelMs === null || ms < stats.fastestDuelMs)) {
        stats.fastestDuelMs = ms;
      }
      return game.stats;
    },

    /** Cumulative ledger for this run (copy; R48/R49/R58). */
    get stats() { return { ...stats }; },
    /** The last settled duel, so the HUD/defeat line can name the outcome. */
    get lastOutcome() { return lastOutcome ? { ...lastOutcome } : null; },

    /**
     * R58: total play time. The frame loop calls this with the engine's dt while
     * the run is live, so the clock starts at START, stops during a pause, and is
     * not wall time since page load. dt is seconds; the per-call clamp keeps a
     * stalled tab from inflating the total.
     */
    tick(dt) {
      if (!Number.isFinite(dt) || !PLAYING.includes(state)) return stats.playMs;
      stats.playMs += Math.min(1000, Math.max(0, dt * 1000));
      return stats.playMs;
    },

    pause() {
      if (state === 'paused' || !game.can('paused')) return false;
      return game.set('paused');
    },

    /**
     * Resume into the phase that was paused. This is a contract, not a hint: a
     * system that cannot survive a pause must suspend itself from onPhase('paused')
     * rather than veto the target here (T002, R53).
     */
    resume() {
      if (state !== 'paused') return false;
      return game.set(pausedFrom || 'exploring');
    },

    togglePause() {
      return state === 'paused' ? game.resume() : game.pause();
    },

    /** PLAY AGAIN (R59): back to the start screen; owners of state reset via onPhase. */
    restart() {
      return game.set('start');
    },

    /** Subscribe to phase changes: fn(next, previous). Returns an unsubscribe fn. */
    onPhase(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };

  return game;
}
