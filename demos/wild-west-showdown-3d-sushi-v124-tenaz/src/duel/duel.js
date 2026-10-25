/**
 * The duel state machine (R36).
 *
 *   challenge -> start -> position -> faceoff -> tension -> draw -> shooting
 *             -> result -> exploring
 *
 * `phase` is the single source of truth for where a duel is; nothing else may
 * write it (D4). Every timer the machine starts is owned here and cleared when
 * the phase that started it is left, and a `generation` counter makes a timer
 * that somehow survived a no-op, so a previous duel can never fire an event
 * during a later one (R66).
 *
 * This module owns sequencing and the DRAW rule (T008); it has no world content,
 * no aiming, no AI behaviour. T007b stages the cowboys and the camera from
 * onPhase(), T009 adds raycast hit/miss for the player's shot, T010 the
 * opponent's real reaction/accuracy table. T027 owns the randomized pre-DRAW
 * window (`DRAW_DELAY`) and the shared `drawAt` gate.
 *
 * T008 — the DRAW rule is a hard invariant, not a convention:
 *   `requestShot(side)` is the ONLY way anything becomes a shot (D4). It gates on
 *   `drawAt`, the instant DRAW! goes up, and never on `phase === 'shooting'`,
 *   which lags DRAW by the 250ms cue beat.
 *   - player before DRAW  -> immediate false start: the duel ends as a loss,
 *     `reason` is 'TOO EARLY!' and the reward is zero (R40).
 *   - opponent before DRAW -> the attempt is refused and recorded; the AI cannot
 *     reach around the gate either (R41).
 *   `resolve()` still needs the shooting phase, so nothing can be *resolved*
 *   early either — a second path cannot bypass the rule.
 */

/** The order a duel must visit, exactly once each. */
export const DUEL_PHASES = Object.freeze([
  'challenge', 'start', 'position', 'faceoff', 'tension', 'draw', 'shooting',
  'result', 'exploring',
]);

/**
 * Milliseconds each phase runs before it hands over to the next. Fixed here on
 * purpose (the card's instruction); T027 owns the randomised window.
 */
export const DUEL_TIMING = Object.freeze({
  // T020b (R73) beat tuning. The anticipation side is deliberately the long one:
  // the two men take their posts, settle, and hang a hand over the holster while
  // the street goes quiet. `draw` is FROZEN at 250 (**D12**, the AI reaction timer
  // is armed off it) and the pre-DRAW wait stays inside **D11** via DRAW_DELAY,
  // so the only tension surface left here is how long the face-off holds before
  // the countdown even starts.
  start: 500,       // "Duel called!" beat before anyone moves
  position: 700,    // both cowboys walk to their facing posts
  faceoff: 750,     // settled, facing, hand hovering over the holster, camera framed
  tension: 1000,    // fallback only; the live delay is drawn from DRAW_DELAY (T027)
  draw: 250,        // DRAW! signal is up before a shot is legal
  shooting: 1200,   // placeholder window; T009/T010 resolve it earlier
  result: 900,      // outcome shown, then back to town
});

/**
 * The face-off window (R39): milliseconds between the READY... cue and DRAW!.
 * Every duel draws uniformly from this range, so the wait cannot be predicted by
 * counting, while the floor keeps the face-off a real wait (T007a asserts
 * tension -> draw >= 800ms) and the ceiling keeps it from feeling like a stall.
 * Recorded in DECISIONS.md (**D11**); this is the R73 tuning surface.
 */
export const DRAW_DELAY = Object.freeze({ min: 900, max: 2100 });

/**
 * T008: the opponent's placeholder reaction after DRAW (ms). T010 replaces it
 * with the per-gunslinger roster table; the point here is that the attempt is
 * armed only once the shooting window is open and still goes through
 * requestShot(), so the AI is gated by exactly the same rule as the player.
 */
export const AI_REACTION = Object.freeze({ default: 620 });

/**
 * T010c (R42): one frozen beat when the AI's hesitation roll fires. A single
 * extra wait, never a loop (`aiHesitated`), so the opponent's timer always
 * arrives and a hesitant gunslinger can never hang the duel.
 */
export const AI_HESITATION_BEAT = 350;

/**
 * T011 (R47): two accepted hits this close together are NEAR-SIMULTANEOUS. Their
 * recorded shot timestamps decide the winner — never which callback happened to
 * run first — and an exact tie goes to the player, so the machine is generous
 * rather than arbitrary. 150ms is deliberately generous: in a quick-draw duel two
 * bullets that land within a tenth of a second ARE simultaneous, and a window of
 * one frame (16ms) would make the race-condition rule unreachable in real play.
 * The hold never lasts longer than the other side's own armed timer, so it cannot
 * stall a duel (R66).
 */
export const TIE_WINDOW_MS = 150;

/**
 * T011 (R48): the short defeat beat between the duel's result and the player
 * being handed back to town. It is an OWNED duel timer (armed through `after`),
 * so leaving a phase, suspending for a pause or aborting clears it like any
 * other timer in the machine (R66).
 */
export const DEFEAT_BEAT = 1200;

/**
 * R40/R47/R48: the words the player reads for every outcome, so a duel never
 * ends silently. 'TOO EARLY!' is R40's false-start message verbatim.
 */
export const REASONS = Object.freeze({
  win: 'YOU WIN!',
  'false-start': 'TOO EARLY!',
  'opponent-shot': 'TOO SLOW!',
  miss: 'NOBODY DREW FIRST',
});

/**
 * Outcomes that cost the player the duel (R47/R48). A `miss` — the shooting
 * window closed with nobody hit — is a DRAW, not a loss: no defeat beat, no
 * penalty, the gunslinger is still standing there to be challenged again, so a
 * bad exchange can never strand the player (R53).
 */
export const LOSS_OUTCOMES = Object.freeze(['false-start', 'opponent-shot']);

/** start..draw are driven by the step table; shooting waits for a shot. */
const NEXT = Object.freeze({
  start: 'position', position: 'faceoff', faceoff: 'tension',
  tension: 'draw', draw: 'shooting',
});

/**
 * The phases a REAL duel can be in: everything accept() can lead to.
 *
 * `challenge` is deliberately NOT one of them. It is only the prompt that says
 * "you may call this gunslinger out" (R37): no duel has been accepted, nobody
 * has taken position, and there is no DRAW to have beaten. Pulling the trigger
 * there is an ignored request, not a false start — R40's penalty is for a duel
 * that actually exists, and T012 makes that penalty cost money.
 */
const LIVE_PHASES = Object.freeze(['start', 'position', 'faceoff', 'tension',
  'draw', 'shooting']);

/**
 * T007c (R36): the duel's TIME SOURCE, behind one seam.
 *
 * The machine used to call `Date.now()` and `setTimeout()` directly, so every
 * check that drove a duel paid real seconds and starved when several WebGL pages
 * shared one headless Chrome. `createClock()` keeps the exact same three calls —
 * `now()`, `schedule(ms, fn)`, `unschedule(id)` — and adds `advance(ms)`, which
 * moves a virtual epoch forward and fires due callbacks in due order.
 *
 * What it deliberately does NOT change is timer OWNERSHIP (R66): duel.js still
 * holds the ids in `timers`, still keeps exactly one `pending` record, still
 * clears everything on phase exit, and still bumps `generation`. Only the clock
 * behind those ids moved.
 *
 * The clock starts on the REAL clock, so the shipped game is bit-for-bit
 * unchanged: `advance()` is the only thing that switches modes, and it is
 * reachable only through the `?test=1` hook (R5). Because `now()` is the single
 * epoch every timestamp comes from (`at[phase]`, `drawAt`, `aiShotAt`,
 * `windowClosesAt`, `outcomeAt`, shot records), an accelerated run reports the
 * SAME milliseconds a real run would — the beats are not scaled, they are just
 * paid in game time.
 */
function createClock() {
  let virtual = false;
  let vnow = 0;          // virtual epoch in ms, once advance() has taken over
  let seq = 0;
  /** id -> {fn, ms, startedAt, due, realId}; the clock's own outstanding work. */
  const entries = new Map();

  function now() { return virtual ? vnow : Date.now(); }

  function schedule(ms, fn) {
    const id = ++seq;
    const startedAt = now();
    const entry = { fn, ms, startedAt, due: startedAt + ms, realId: null };
    if (!virtual) {
      entry.realId = setTimeout(() => {
        entries.delete(id);
        fn();
      }, ms);
    }
    entries.set(id, entry);
    return id;
  }

  function unschedule(id) {
    const entry = entries.get(id);
    if (!entry) return false;
    entries.delete(id);
    if (entry.realId !== null) clearTimeout(entry.realId);
    return true;
  }

  /**
   * Switch to game time. The virtual epoch continues from the real instant it
   * happened at, and every outstanding timer keeps the deadline it was armed
   * with, so a beat that was already partly paid is not paid twice and the
   * phase-to-phase deltas stay exactly the shipped numbers. That is why a check
   * should start its duel before advancing, not halfway through a beat: a timer
   * whose deadline has already passed fires on the next advance().
   */
  function enterVirtual() {
    if (virtual) return false;
    virtual = true;
    vnow = Date.now();
    for (const entry of entries.values()) {
      if (entry.realId !== null) clearTimeout(entry.realId);
      entry.realId = null;
      entry.due = entry.startedAt + entry.ms;
    }
    return true;
  }

  /**
   * Move game time forward by `ms` and run everything that comes due, in due
   * order (ties by arming order). Work scheduled by a fired callback is due
   * against the SAME target, so one call can walk a whole duel to its end.
   * Returns how many callbacks fired.
   */
  function advance(ms) {
    if (!Number.isFinite(ms) || ms <= 0) {
      throw new Error(`advance: not a duration in ms: ${ms}`);
    }
    enterVirtual();
    const target = vnow + ms;
    let fired = 0;
    for (;;) {
      let pickId = 0;
      let pick = null;
      for (const [id, entry] of entries) {
        if (entry.due > target) continue;
        if (pick === null || entry.due < pick.due
          || (entry.due === pick.due && id < pickId)) { pick = entry; pickId = id; }
      }
      if (pick === null) break;
      entries.delete(pickId);
      vnow = Math.max(vnow, pick.due);
      fired += 1;
      // A runaway timeline is a bug in the machine, not something to hang on.
      if (fired > 512) throw new Error('advance: runaway duel timeline (R66)');
      pick.fn();
    }
    vnow = target;
    return fired;
  }

  return {
    now, schedule, unschedule, advance, enterVirtual,
    get mode() { return virtual ? 'virtual' : 'real'; },
    get outstanding() { return entries.size; },
    snapshot() { return { mode: virtual ? 'virtual' : 'real', now: now(), outstanding: entries.size }; },
  };
}

/**
 * @param {object} opts.game    createGame() result; the only top-level phases this writes
 * @param {object} opts.timing  overrides for DUEL_TIMING
 * @param {function} opts.onPhase fn(next, previous) for staging/camera/HUD work
 * @param {function} opts.resolvePlayerShot fn(opponent, entry) -> {hit,...};
 *        T009b's aim/raycast hook. The machine stays the only shot entry point
 *        (D4) and keeps the outcome decision; it just asks what the shot did.
 * @param {function} opts.resolveOpponentShot fn(opponent, entry) -> record;
 *        T009d's feedback seam (R44). The machine still rolls his accuracy
 *        (T010c) and decides the outcome; this only makes his resolved shot
 *        visible through the SAME pooled effects. Called after entry.hit is set
 *        and before settlement, spawns no timer, and its result cannot change
 *        the duel.
 * @param {function} opts.aiRandom fn() -> [0,1). T010c: the AI's luck (accuracy
 *        and hesitation rolls). Defaults to Math.random in the shipped game;
 *        main.js exposes a test-only setter so a check can script it (R5).
 */
export function createDuel({ game = null, timing = {}, onPhase = null,
  resolvePlayerShot = null, resolveOpponentShot = null, aiRandom = Math.random } = {}) {
  const T = { ...DUEL_TIMING, ...timing };
  /** T007c: the one time source this machine reads (real clock by default). */
  const clock = createClock();
  /** Always a [0,1) draw. A broken/absent injector must never make the AI miss-proof. */
  const roll = () => {
    const v = typeof aiRandom === 'function' ? aiRandom() : NaN;
    return Number.isFinite(v) ? Math.min(0.999999, Math.max(0, v)) : 0;
  };
  const listeners = new Set(onPhase ? [onPhase] : []);

  const timers = new Set();
  let generation = 0;   // bumped whenever a duel ends or is aborted (R66)
  let phase = null;     // null = no duel in progress
  let opponent = null;
  let outcome = null;
  let maxPending = 0;   // high-water mark of concurrent timers, for the check
  let pending = null;   // the one live timer's record: {fn, gen, id, ms, startedAt}
  let suspended = false; // a paused duel keeps its phase, but runs no timer
  /** This duel's committed pre-DRAW delay (rolled at accept(), T027). */
  let drawDelay = null;
  /** Epoch ms at which DRAW! fires and both sides may shoot (R39/R41). */
  let drawAt = null;
  /** WWS.setDrawDelay override: a fixed delay, so later checks stay fast. */
  let forcedDelay = null;
  /** Every shot request this duel, accepted or refused (R40/R41 evidence). */
  const shots = [];
  /**
   * T017a (R24/R66): the player has ONE trigger pull per duel until that shot has
   * been resolved. Without it a double-click inside the shooting window logs two
   * accepted shots, and once T009 resolves real aim it would settle two hits.
   * Cleared when the duel is decided and when a duel starts, so a miss still
   * leaves the player a next chance (R47).
   */
  let playerShotPending = false;
  /**
   * T010c (R42): this duel's AI has already frozen once at DRAW. Hesitation is a
   * single extra beat, never a loop, so the opponent's timer always arrives.
   */
  let aiHesitated = false;
  /** T010c: when this duel's shooting window closes, so an AI miss still ends it. */
  let windowClosesAt = null;
  /** T010c: the accuracy the opponent's accepted shot rolls against. */
  let aiAccuracy = 1;
  /** T010c: what this duel armed the AI with, for the shot record and checks. */
  let aiPlan = null;
  /** Why the duel ended, in the words the player reads ('TOO EARLY!'). */
  let reason = null;
  /**
   * T011 (R47): the duel is DECIDED once, and a second settlement cannot flip
   * it. Every near-simultaneous or late callback funnels through this flag, so
   * the result is deterministic no matter which timer fires first.
   */
  let decided = false;
  /** How the winner was picked: 'first-hit', 'timestamp' or 'timestamp-tie'. */
  let resolvedBy = null;
  /** Epoch ms of the settlement, and the hit it was settled from. */
  let outcomeAt = null;
  /**
   * T011 (R47): a hit that is waiting <=TIE_WINDOW_MS for the other side's
   * bullet to land so the two can be compared by timestamp. It borrows the
   * opponent's OWN armed timer as the wait — the machine never runs a second
   * timer for it, which is what keeps maxPendingTimers at 1 (R36/R66).
   */
  let tieHold = null;
  /** True through the defeat beat (R48): the machine is finishing, not live. */
  let defeating = false;
  /**
   * T011 (R47): the epoch-ms instant the opponent's armed bullet is EXPECTED to
   * land (`at.shooting + his reaction/hesitation delay`), or null when no ai-shot
   * timer is in flight. The player's hit is held when its recorded timestamp falls
   * inside TIE_WINDOW_MS of this, so "near-simultaneous" is measured from the
   * machine's own recorded times instead of a wall-clock race the caller cannot
   * see. It borrows the opponent's armed timer as the wait: never a second timer.
   */
  let aiShotAt = null;
  /** What this duel paid out. Zero for every non-win (R40/R48). */
  let reward = { money: 0, reputation: 0 };
  const log = [];
  const at = {};

  /** Draw this duel's pre-DRAW delay once, so a pause cannot re-roll it (R66). */
  function rollDelay() {
    if (Number.isFinite(forcedDelay)) return forcedDelay;
    return Math.round(DRAW_DELAY.min + Math.random() * (DRAW_DELAY.max - DRAW_DELAY.min));
  }

  /** T011: every outcome/settlement scratch value, cleared when a duel starts. */
  function resetResolution() {
    decided = false;
    resolvedBy = null;
    outcomeAt = null;
    tieHold = null;
    defeating = false;
    aiShotAt = null;
  }

  /** T010c: every AI scratch value, cleared when a duel starts and on teardown. */
  function resetAi() {
    aiHesitated = false;
    aiAccuracy = 1;
    aiPlan = null;
    windowClosesAt = null;
  }

  function clearTimers() {
    for (const id of timers) clock.unschedule(id);
    timers.clear();
    pending = null;
  }

  /** Arm an owned timer. At most one is ever live, which is what maxPending proves. */
  function arm(entry, ms) {
    entry.ms = ms;
    entry.startedAt = clock.now();
    entry.id = clock.schedule(ms, () => {
      timers.delete(entry.id);
      if (pending === entry) pending = null;
      if (entry.gen === generation) entry.fn();
    });
    timers.add(entry.id);
    pending = entry;
    if (timers.size > maxPending) maxPending = timers.size;
    return entry.id;
  }

  /**
   * `tag` names the timer for the settlement logic (T011): the AI's armed shot is
   * 'ai-shot', so a player hit can tell whether the other side's bullet is about
   * to land inside the tie window and borrow that timer as the wait.
   */
  function after(ms, fn, tag = null) {
    return arm({ fn, gen: generation, tag }, ms);
  }

  /** Milliseconds left on this duel's live timer, or Infinity when there is none. */
  function remaining(entry = pending) {
    if (!entry || !Number.isFinite(entry.startedAt)) return Infinity;
    return entry.ms - (clock.now() - entry.startedAt);
  }

  function setPhase(next) {
    if (!DUEL_PHASES.includes(next)) throw new Error(`unknown duel phase: ${next}`);
    const previous = phase;
    clearTimers();                 // a phase never leaves a timer behind
    tieHold = null;                // ...nor an unsettled exchange (R47/R66)
    phase = next;
    at[next] = clock.now();
    // R39: DRAW! and the shooting gate share one timestamp, fixed the instant the
    // tension cue goes up, so both sides open at exactly the same moment.
    drawAt = next === 'tension' ? at[next] + tensionDelay() : drawAt;
    log.push(next);
    for (const fn of [...listeners]) fn(next, previous, opponent);
  }

  /** The delay this duel will actually wait for in the tension phase. */
  function tensionDelay() {
    return Number.isFinite(drawDelay) ? drawDelay : T.tension;
  }

  /** Queue the next scheduled step of the machine. */
  function schedule() {
    const ms = phase === 'tension' ? tensionDelay() : T[phase];
    if (!Number.isFinite(ms)) return;
    if (phase === 'shooting') {
      // Still exactly ONE owned timer (maxPendingTimers === 1, R36/R66): the
      // opponent fires when his reaction is up, or the window closes as a miss.
      // Armed from the open window, and the shot goes through requestShot().
      // NOTE for T010: this timer starts at the SHOOTING phase, which is T.draw
      // (~250ms) AFTER drawAt, so the reaction the player actually sees is
      // `reaction + T.draw`. Recorded as DECISIONS.md **D12** (`- ai-reaction
      // offset: 250`): T010 owns the roster table and must subtract that beat or
      // state that its numbers include it, or the published R42 numbers are not
      // honest and the boss floor (T021) is 250ms slower than advertised.
      const ai = opponent && opponent.ai ? opponent.ai : null;
      // T010b's contract: the roster's `duelReaction` is the number to arm with,
      // because this timer starts T.draw (~250ms) AFTER drawAt (D12). `reaction`
      // is what the PLAYER experiences; arming with it would run the whole
      // ladder 250ms slow. Records without an `ai` table (the placeholder
      // 'Stranger' used by earlier checks) keep the T008 fallback.
      const reaction = ai && Number.isFinite(ai.duelReaction)
        ? Math.max(0, ai.duelReaction)
        : Number.isFinite(opponent && opponent.reaction)
          ? Math.max(0, opponent.reaction)
          : AI_REACTION.default;
      aiAccuracy = ai && Number.isFinite(ai.accuracy)
        ? Math.min(1, Math.max(0, ai.accuracy)) : 1;
      const hesitation = ai && Number.isFinite(ai.hesitation)
        ? Math.min(1, Math.max(0, ai.hesitation)) : 0;
      let delay = reaction;
      if (!aiHesitated && hesitation > 0 && roll() < hesitation) {
        aiHesitated = true;
        delay += AI_HESITATION_BEAT;
      }
      aiPlan = { reaction, delay, hesitated: aiHesitated, accuracy: aiAccuracy };
      windowClosesAt = clock.now() + ms;
      if (delay <= ms) {
        aiShotAt = clock.now() + delay;   // R47: when his bullet is expected
        after(delay, () => { aiShotAt = null; requestShot('opponent'); }, 'ai-shot');
      } else { aiShotAt = null; after(ms, () => resolve('miss')); }
      return;
    }
    after(ms, () => { setPhase(NEXT[phase]); schedule(); });
  }

  /**
   * Step onto an opponent: shows the challenge prompt, still in town.
   * The LIVE record is kept, not a copy: its `cowboy`/`post` handles are what
   * T007b staging needs, and its x/z/yaw are accessors that would otherwise
   * freeze at challenge time.
   */
  function begin(opp) {
    if (phase) return false;
    opponent = opp || { name: 'Stranger' };
    outcome = null;
    reason = null;
    reward = { money: 0, reputation: 0 };
    shots.length = 0;
    log.length = 0;
    playerShotPending = false;
    for (const k of Object.keys(at)) delete at[k];
    maxPending = 0;
    resetAi();
    resetResolution();
    drawDelay = null;
    drawAt = null;
    setPhase('challenge');
    return true;
  }

  /** The player accepted/triggered the challenge: the duel is now live. */
  function accept() {
    if (phase !== 'challenge') return false;
    // Commit the face-off delay now, so a pause mid-tension cannot re-roll it and
    // every later phase reads the same number the DRAW gate was built from.
    drawDelay = rollDelay();
    if (game) game.set('duel');
    setPhase('start');
    schedule();
    return true;
  }

  /**
   * Close the duel with an outcome and hand over to the result beat. Only legal
   * once the shooting window is open, so nothing can be *resolved* before DRAW
   * (R40) — the false-start path below is the one deliberate exception, because
   * ending the duel early IS the penalty.
   */
  function resolve(result, why) {
    if (phase !== 'shooting') return false;
    // R47: a hit that is still waiting on the other side's bullet outranks the
    // window closing. Settle from the recorded timestamps instead of letting a
    // timeout overwrite a shot that already landed.
    if (tieHold) { applyTimestamps(); return true; }
    endWith(result, why);
    return true;
  }

  /**
   * T011 (R47): start the settlement for an accepted hit.
   *
   * A hit is decisive unless another hit is *near-simultaneous* with it, and
   * "near-simultaneous" is measured from the recorded shot timestamps, never from
   * callback order:
   *   - the other side already hit inside TIE_WINDOW_MS -> compare now;
   *   - the opponent's own armed shot timer has <=TIE_WINDOW_MS left -> hold this
   *     hit and let HIS timer be the wait (the machine never runs a second timer,
   *     which is what keeps maxPendingTimers at 1, R36/R66);
   *   - otherwise settle immediately.
   */
  function settleFromHit(side, entry) {
    if (decided) return;
    const other = side === 'player' ? 'opponent' : 'player';
    const clash = shots.some((s) => s.accepted && s.hit && s.side === other
      && Math.abs(s.at - entry.at) <= TIE_WINDOW_MS);
    if (clash) { applyTimestamps(); return; }
    if (side === 'player' && pending && pending.tag === 'ai-shot'
      && (remaining(pending) <= TIE_WINDOW_MS
        || (Number.isFinite(aiShotAt) && Math.abs(entry.at - aiShotAt) <= TIE_WINDOW_MS))) {
      // The opponent's own armed timer is the wait: his bullet is either <=window
      // from firing in real time, or his recorded expected landing is within the
      // window of this shot's timestamp. No second timer is ever created, so the
      // hold cannot outlive the exchange or push maxPendingTimers past 1 (R36/R66).
      tieHold = { side, at: entry.at };
      return;
    }
    applyTimestamps();
  }

  /**
   * R47: pick the winner from the RECORDED hit timestamps. The earliest bullet
   * wins; two bullets at the same instant go to the player, so a tie is resolved
   * by a documented rule rather than by which side's code ran first.
   */
  function applyTimestamps() {
    tieHold = null;
    if (decided) return;
    const hits = shots.filter((s) => s.accepted && s.hit);
    if (!hits.length) { endWith('miss', REASONS.miss); return; }
    const best = Math.min(...hits.map((s) => s.at));
    const first = hits.filter((s) => s.at === best);
    const winner = first.some((s) => s.side === 'player') ? 'player' : 'opponent';
    resolvedBy = hits.length < 2 ? 'first-hit'
      : first.length > 1 ? 'timestamp-tie' : 'timestamp';
    endWith(winner === 'player' ? 'win' : 'opponent-shot',
      winner === 'player' ? REASONS.win : REASONS['opponent-shot']);
  }

  /** Set the outcome, show the reason, pay out, then run the result beat. */
  function endWith(result, why) {
    // R47: a duel is decided ONCE. A late or near-simultaneous callback can
    // record its shot but it can never flip a settled result.
    if (decided) return false;
    decided = true;
    tieHold = null;
    outcome = result || 'miss';
    reason = why || REASONS[outcome] || null;
    reward = payout(outcome);
    outcomeAt = clock.now();
    // The duel is decided: the player's next duel starts with a clean trigger.
    playerShotPending = false;
    // R48/R58: the run ledger lives in game.js (pure state); the duel reports
    // what happened and never touches money or counters itself. `duelMs` is the
    // length of the fight proper (position -> settlement), which is what R58's
    // "fastest duel" means; a duel that never got that far reports nothing.
    if (game && game.recordOutcome) {
      const from = at.position ?? at.start ?? null;
      game.recordOutcome(outcome, reward,
        from === null ? null : { duelMs: Math.max(0, outcomeAt - from) });
    }
    setPhase('result');
    // R48: a loss runs the short defeat beat before the town comes back.
    if (LOSS_OUTCOMES.includes(outcome)) after(T.result, beginDefeat);
    else after(T.result, finish);
    return true;
  }

  /**
   * R48: the defeat handoff. The beat timer stays OWNED by the duel machine
   * (R66), and the game moves to `defeat`, where main.js repositions the player,
   * hands the camera back and leaves the reason on screen. No page reload, and
   * nothing about progress is erased — the cost is the ledger entry game.js made.
   */
  function beginDefeat() {
    if (!LOSS_OUTCOMES.includes(outcome)) return;
    defeating = true;
    if (game) game.set('defeat');
    after(DEFEAT_BEAT, finish);
  }

  /** R40/R48: a false start or a loss pays nothing; T012 owns win amounts. */
  function payout(result) {
    if (result === 'win' && opponent && opponent.reward) return { ...opponent.reward };
    return { money: 0, reputation: 0 };
  }

  /**
   * THE ONLY SHOT ENTRY POINT (D4). Every input path — keyboard, mouse, touch
   * button, and the opponent's own timer — calls this, so the DRAW rule cannot be
   * reached around. The gate is `drawAt`, the instant DRAW! goes up, shared by
   * both sides (R39/R41); `phase === 'shooting'` is 250ms later than that and is
   * deliberately NOT the test.
   */
  function requestShot(side, opts = {}) {
    const s = side === 'opponent' ? 'opponent' : 'player';
    const now = Number.isFinite(opts.now) ? opts.now : clock.now();
    const entry = { side: s, at: now, phase, drawAt, accepted: false, kind: 'ignored', reason: null };
    if (!phase || phase === 'result' || phase === 'exploring') {
      entry.kind = phase ? 'duel-over' : 'no-duel';
      shots.push(entry);
      return entry;
    }

    if (!LIVE_PHASES.includes(phase)) {
      // 'challenge': the prompt is up, but no duel has been accepted, so there is
      // no DRAW to have jumped. Refuse and record it; change nothing (R40 scope).
      entry.kind = 'no-duel';
      entry.reason = 'no duel accepted yet';
      shots.push(entry);
      return entry;
    }
    // T017a (R24/R66): the player has ONE trigger pull in flight per duel. A second
    // click inside the same shooting window is refused and recorded, so a double-tap
    // can never settle two hits once T009 resolves real aim (R43).
    if (s === 'player' && playerShotPending) {
      entry.kind = 'already-fired';
      entry.reason = 'your shot is already in flight';
      shots.push(entry);
      return entry;
    }
    const open = Number.isFinite(drawAt) ? now >= drawAt : false;
    if (!open) {
      if (s === 'player') {
        // R40: firing early is an immediate loss, stated out loud.
        entry.kind = 'false-start';
        entry.reason = 'TOO EARLY!';
        shots.push(entry);
        endWith('false-start', 'TOO EARLY!');
        return entry;
      }
      // R41: the AI is held to the same rule — an early attempt is refused, not
      // queued, and is recorded so a check can see the gate actually bit.
      entry.kind = 'blocked';
      entry.reason = 'AI attempt before DRAW';
      shots.push(entry);
      return entry;
    }
    entry.accepted = true;
    entry.kind = 'shot';
    shots.push(entry);
    // T009b (R43): the machine still owns the DRAW gate and the outcome; it only
    // asks shooting.js what an accepted player shot DID, from real aim geometry.
    // A hit resolves the duel as a win; a MISS leaves it live (R47) so the
    // opponent's reaction timer still gets his turn. The opponent's own shot is a
    // loss for the player until T010 gives the AI an accuracy roll.
    if (s === 'player') {
      playerShotPending = true;
      const shot = resolvePlayerShot ? resolvePlayerShot(opponent, entry) : null;
      entry.hit = !!(shot && shot.hit);
      if (shot) {
        entry.aimYaw = shot.aimYaw;
        entry.point = shot.point;
        entry.distance = shot.distance;
      }
      if (entry.hit) settleFromHit('player', entry);
    } else if (s === 'opponent') {
      // His bullet has landed (or was refused): the expected-landing reference is
      // spent, so a later player hit has nothing left to wait for (R47/R66).
      aiShotAt = null;
      // T010c (R42/R43/R47): his shot is real. One roll against his own
      // `ai.accuracy` decides it — no second path, no guaranteed hit.
      // D13 exception, the "deciding shot": the player has ONE bullet per duel
      // (line 349), so once that shot is spent and missed there is nothing left
      // for him to win with, and the opponent — unhurried now that the draw is
      // over — lands the reply. That is what keeps T009b's R47 contract
      // (player miss -> the opponent still ends the duel) deterministic instead
      // of a coin flip on Buck's 0.45. The accuracy roll is what makes the DRAW
      // exchange itself winnable, which is where R42/R52 live.
      const deciding = playerShotPending;
      const hit = deciding || roll() < aiAccuracy;
      entry.hit = hit;
      entry.accuracy = aiAccuracy;
      entry.deciding = deciding;
      if (aiPlan) entry.ai = { ...aiPlan };
      // T009d (R44): his bullet is now SEEN too. Same pooled feedback as the
      // player's, through shooting.fireFrom wired in by main.js. The roll above
      // stays the only outcome decision; this call spawns no timer (T011's
      // maxPendingTimers === 1 contract holds) and cannot flip the duel.
      if (resolveOpponentShot) {
        const shot = resolveOpponentShot(opponent, entry);
        if (shot) {
          entry.point = shot.point;
          entry.distance = shot.distance;
        }
      }
      if (hit) {
        settleFromHit('opponent', entry);
      } else if (tieHold) {
        // R47: the player's held hit was waiting on exactly this bullet. It has
        // now missed, so the exchange is over and his hit settles the duel.
        applyTimestamps();
      } else {
        // R47: an opponent MISS does not end the duel. The window stays open so
        // the player still gets his chance, and the window's own deadline is
        // re-armed to close it, so a miss can never hang the duel (R66).
        // T011: his trigger is live again too — one bullet per EXCHANGE, not per
        // duel, which is what "opponent miss -> player gets another chance" means.
        playerShotPending = false;
        const left = Number.isFinite(windowClosesAt) ? windowClosesAt - clock.now() : 16;
        after(Math.max(16, left), () => resolve('miss'));
      }
    }
    return entry;
  }

  /** Return to town and disarm the machine. */
  function finish() {
    defeating = false;
    setPhase('exploring');
    generation += 1;
    clearTimers();
    suspended = false;
    // Disarm BEFORE handing the game back, so main.js's phase handler sees no
    // live machine and does not tear down the duel it just finished (R66).
    phase = null;
    if (game) game.set('exploring');
    return true;
  }

  /**
   * Freeze a live duel for a pause (R66): the phase is kept, no timer runs.
   * resumeDuel() re-arms it with the time that was still left, so pausing never
   * destroys a duel and game.resume() can honour its contract.
   */
  function suspend() {
    if (!phase || suspended) return false;
    const entry = pending;
    const left = entry ? Math.max(16, entry.ms - (clock.now() - entry.startedAt)) : 0;
    clearTimers();
    if (entry) { entry.remaining = left; pending = entry; }
    suspended = true;
    return true;
  }

  /** Continue a suspended duel from the phase it froze in. */
  function resumeDuel() {
    if (!suspended) return false;
    suspended = false;
    const entry = pending;
    if (entry) {
      pending = null;
      arm(entry, entry.remaining ?? entry.ms);
    }
    return true;
  }

  /** Tear a duel down without resolving it (defeat/victory/restart, R66). */
  function abort() {
    generation += 1;
    clearTimers();
    suspended = false;
    phase = null;
    opponent = null;
    reason = null;
    shots.length = 0;
    playerShotPending = false;
    resetAi();
    resetResolution();
    drawDelay = null;
    drawAt = null;
    return true;
  }

  /**
   * Fix the pre-DRAW delay for every duel started after this call (test-only
   * override, WWS.setDrawDelay): a finite ms makes the face-off deterministic so
   * T008/T010/T011/T023 stay fast; null restores the randomized DRAW_DELAY draw.
   * A duel already in progress keeps the delay it committed to at accept().
   */
  function setDrawDelay(ms) {
    if (ms === null || ms === undefined) forcedDelay = null;
    else if (Number.isFinite(ms) && ms >= 0) forcedDelay = ms;
    else throw new Error(`setDrawDelay: not a delay in ms: ${ms}`);
    return forcedDelay;
  }

  /**
   * Test-only phase-duration override (WWS.setTiming), the same pattern as
   * setDrawDelay: shrink the beats a check is not testing so many duels fit inside
   * the verify budget. `null` restores the shipped timings. It cannot touch the
   * DRAW gate: the tension wait comes from the committed `drawDelay`, not T.tension.
   */
  function setTiming(patch) {
    if (patch === null || patch === undefined) {
      for (const k of Object.keys(DUEL_TIMING)) T[k] = DUEL_TIMING[k];
      return { ...T };
    }
    for (const [k, v] of Object.entries(patch)) {
      if (!(k in DUEL_TIMING)) throw new Error(`setTiming: unknown phase: ${k}`);
      if (!Number.isFinite(v) || v < 0) throw new Error(`setTiming: ${k} is not ms: ${v}`);
      T[k] = v;
    }
    return { ...T };
  }

  const api = {
    phases: DUEL_PHASES,
    timing: T,
    get phase() { return phase; },
    get opponent() { return opponent; },
    get outcome() { return outcome; },
    /** T011 (R47): the outcome is settled; a later callback cannot flip it. */
    get decided() { return decided; },
    /** T011 (R47): how the winner was picked — first-hit | timestamp | timestamp-tie. */
    get resolvedBy() { return resolvedBy; },
    /** T011 (R47): when the duel settled, so a check can see the order it used. */
    get outcomeAt() { return outcomeAt; },
    /** T011 (R48): true through the defeat beat, after the result and before town. */
    get defeating() { return defeating; },
    /** T011 (R47): the AI plan this duel armed with — {reaction, delay, accuracy, hesitated}. */
    get ai() { return aiPlan ? { ...aiPlan } : null; },
    /**
     * T011 (R47): epoch-ms when the opponent's armed bullet is expected, or null
     * when nothing is in flight. Checks use it to place a near-simultaneous shot
     * by TIMESTAMP instead of racing a setTimeout.
     */
    get expectedOpponentShotAt() { return aiShotAt; },
    /**
     * T011 (R48/R53): the machine is FINISHING, not live — the result is settled
     * and only the result/defeat beats are still running. main.js must not tear it
     * down on the way into `defeat`, or the owned defeat timer dies and the player
     * is stranded in the defeat phase.
     */
    get finishing() { return phase === 'result' || defeating; },
    get active() { return phase !== null; },
    get suspended() { return suspended; },
    get log() { return log.slice(); },
    get pendingTimers() { return timers.size; },
    /** Committed pre-DRAW delay for this duel (T027), null when no duel is live. */
    get drawDelay() { return Number.isFinite(drawDelay) ? drawDelay : null; },
    /** Epoch ms at which DRAW! fires; the single gate for both sides (R39/R41). */
    get drawAt() { return drawAt; },
    /** The shooting window is open only after DRAW has been reached. */
    get shootingOpen() { return phase === 'shooting'; },
    /** T017a (R24/R66): true while the player has an unresolved trigger pull. */
    get playerShotPending() { return playerShotPending; },
    /** When a side may legally shoot: the DRAW timestamp, identical for both. */
    shootOpensAt(side) {
      return (side === 'player' || side === 'opponent') ? drawAt : null;
    },
    /** Every shot request this duel made, accepted or refused (R40/R41). */
    get shots() { return shots.map((s) => ({ ...s })); },
    /** Why the duel ended, as the player reads it ('TOO EARLY!'), or null. */
    get reason() { return reason; },
    /** What the duel paid out; zero for a false start or a loss (R40/R48). */
    get reward() { return { ...reward }; },
    /** True while the shared DRAW gate is open for `side` (R39/R41). */
    canShoot(side, now = clock.now()) {
      if (side !== 'player' && side !== 'opponent') return false;
      if (!phase || phase === 'result' || phase === 'exploring') return false;
      if (!LIVE_PHASES.includes(phase)) return false;
      // T017a: the player's second pull is not a legal shot, same rule as requestShot.
      if (side === 'player' && playerShotPending) return false;
      return Number.isFinite(drawAt) && now >= drawAt;
    },
    setDrawDelay,
    setTiming,
    /**
     * T007c (R36): the duel's time source. `advance(ms)` switches the machine to
     * game time and runs every beat that comes due; `clock()` reports which clock
     * is live and what instant it thinks it is. main.js exposes advance() only
     * under `?test=1`, so the shipped game always runs on the real clock (R5).
     */
    advance: (ms) => clock.advance(ms),
    /**
     * T025c (REVIEW G1): switch the machine to game time NOW, while every beat
     * is still fresh. A check that arms its duel on the real clock and only then
     * calls advance() finds the overdue beats firing in one chunk, which skips
     * phases a player would have seen. Calling this right after accept() keeps
     * the shipped phase-to-phase deltas exact. Test-only: the shipped game never
     * reads it and stays on the real clock (R5).
     */
    armVirtual: () => clock.enterVirtual(),
    clock: () => clock.snapshot(),
    /** Highest number of duel timers that were live at once this duel. */
    get maxPendingTimers() { return maxPending; },
    get timestamps() { return { ...at }; },
    begin, accept, requestShot, resolve, finish, abort, schedule, suspend, resumeDuel,
    onPhase(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    /** Everything a check or the HUD needs, in one object. */
    snapshot() {
      return {
        phase, active: api.active, suspended: api.suspended,
        opponent: opponent
          ? { name: opponent.name, role: opponent.role || '', post: opponent.post ? { ...opponent.post } : null }
          : null,
        outcome, log: log.slice(), at: { ...at },
        decided, defeating, finishing: api.finishing,
        resolvedBy, outcomeAt, tieHold: tieHold ? { ...tieHold } : null,
        ai: api.ai, expectedOpponentShotAt: aiShotAt,
        reason, reward: { ...reward }, shots: shots.map((s) => ({ ...s })),
        drawDelay: api.drawDelay, drawAt: api.drawAt, shootingOpen: api.shootingOpen,
        playerShotPending,
        forcedDelay: Number.isFinite(forcedDelay) ? forcedDelay : null,
        clock: clock.snapshot(),
        ai: aiPlan ? { ...aiPlan } : null,
        pendingTimers: timers.size, maxPendingTimers: maxPending,
      };
    },
  };

  return api;
}
