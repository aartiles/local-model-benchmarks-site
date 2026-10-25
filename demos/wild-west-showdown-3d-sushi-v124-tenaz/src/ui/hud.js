/**
 * The HUD (T012, R49/R60/R61/R62) — everything the player reads that is not the
 * 3D scene, in #hud.
 *
 * Two modes, and the switch between them is the whole point of R61:
 *
 *   explore  money, reputation and the current objective (R60), plus the
 *            challenge prompt when a gunslinger is close (R37).
 *   duel     the panel is simplified away and what is left is the opponent's
 *            name, the duel state, the READY.../DRAW! signal and the reticle
 *            (R61/R46), plus the result line and the reward line (R49).
 *
 * Every setter is idempotent, so main.js may push state every frame without
 * touching the DOM unless something actually changed. No timers live here: the
 * reward line stays up until the next duel begins, which keeps it readable on a
 * slow tablet and keeps a stale line from a previous duel from surviving (R66).
 *
 * Styling is in src/ui/styles.css, keyed off `data-role`, and visibility is
 * opacity-driven (T007/T008/T027 assert on computed opacity, so keep it that way).
 */

/** R39/R61: the face-off cue per duel phase. */
const SIGNAL = {
  faceoff: 'READY...', tension: 'READY...', draw: 'DRAW!', shooting: 'DRAW!',
};

/** R61: the duel state, in the words a player reads. */
const STATE_LABEL = {
  challenge: 'CHALLENGE CALLED',
  start: 'GET READY',
  position: 'TAKE YOUR POSITION',
  faceoff: 'FACE-OFF',
  tension: 'WAIT FOR DRAW',
  draw: 'DRAW!',
  shooting: 'SHOOT NOW',
  result: 'THE SMOKE CLEARS',
};

/** The duel phases that keep the duel UI up (everything but the handoff). */
const DUEL_UI_PHASES = new Set(['challenge', 'start', 'position', 'faceoff',
  'tension', 'draw', 'shooting', 'result']);

function line(role, cls) {
  const el = document.createElement('div');
  el.className = cls || `hud-${role}`;
  el.setAttribute('data-role', role);
  el.textContent = '';
  return el;
}

/** A labelled stat row: textContent reads "CASH $25", which is what a check sees. */
function stat(role, label) {
  const el = line(role, 'hud-stat');
  el.setAttribute('data-role', role);
  const l = document.createElement('span');
  l.className = 'hud-stat-label';
  l.textContent = `${label} `;
  const v = document.createElement('span');
  v.className = 'hud-stat-value';
  v.textContent = '';
  el.appendChild(l);
  el.appendChild(v);
  // `el.value` is the span setValues() writes; the row's own textContent is the
  // label + value a player reads ("CASH $25").
  el.value = v;
  return el;
}

/**
 * @param {object} opts.root  container element; defaults to #hud
 */
export function createHud({ root = document.getElementById('hud') } = {}) {
  const panel = line('panel', 'hud-panel');
  const money = stat('money', 'CASH');
  const reputation = stat('reputation', 'REPUTATION');
  const objective = line('objective', 'hud-objective');
  panel.appendChild(money);
  panel.appendChild(reputation);
  panel.appendChild(objective);

  const duel = line('duel', 'hud-duel');
  const duelName = line('duel-name', 'hud-duel-name');
  const duelState = line('duel-state', 'hud-duel-state');
  duel.appendChild(duelName);
  duel.appendChild(duelState);

  const signal = line('duel-signal', 'hud-duel-signal');
  const reason = line('duel-reason', 'hud-duel-reason');
  const reward = line('reward', 'hud-reward');
  const prompt = line('prompt', 'hud-prompt');
  const reticle = line('reticle', 'hud-reticle');
  reticle.innerHTML = '<span class="reticle-dot"></span>';

  if (root) {
    root.appendChild(panel);
    root.appendChild(duel);
    root.appendChild(signal);
    root.appendChild(reason);
    root.appendChild(reward);
    root.appendChild(prompt);
    root.appendChild(reticle);
  }

  let mode = 'explore';
  let moneyText = '';
  let repText = '';
  let objectiveText = '';
  let text = '';
  let signalText = '';
  let reasonText = '';
  let rewardText = '';
  let nameText = '';
  let phase = null;
  let stateText = '';
  let reticleOn = false;
  /** T031 (V4): a full-screen poster (the completion screen) owns the screen. */
  let suppressed = false;
  /** T016/R46: where the crosshair sits, in viewport fractions (0.5 = centre). */
  let reticleX = 0.5;
  let reticleY = 0.5;

  /** Toggle a class only when it changes, so per-frame pushes are cheap. */
  function mark(el, cls, on) {
    if (!el) return;
    if (on !== el.classList.contains(cls)) el.classList.toggle(cls, on);
  }

  function applyMode() {
    const duelMode = mode === 'duel';
    // T031 (REVIEW V4/R60): a full-screen poster owns the screen, so every line
    // steps aside. The start overlay never needed this (its opaque sky covers
    // #hud); the completion poster is a card over the live scene, and the purse
    // read as clutter next to it. Suppression is opacity-driven like the rest.
    if (suppressed) {
      for (const el of [panel, duel, signal, reason, reward, prompt, reticle]) {
        mark(el, 'is-hidden', true);
      }
      return;
    }
    mark(panel, 'is-hidden', duelMode);          // R61: exploration HUD simplified away
    mark(duel, 'is-hidden', !duelMode || !phase || phase === 'exploring');
    mark(reticle, 'is-hidden', !duelMode || !reticleOn);
    mark(prompt, 'is-hidden', duelMode);
    // The three narration lines are `.is-on`-driven, so lifting suppression only
    // has to drop the `is-hidden` class they picked up (never add it here: it wins
    // over `.is-on`, which would blank the DRAW cue and the reward line).
    mark(signal, 'is-hidden', false);
    mark(reason, 'is-hidden', false);
    mark(reward, 'is-hidden', false);
  }

  const api = {
    // Live elements, so a check can read the real DOM (R37 precedent).
    panel, money, reputation, objective, duel, duelName, duelState,
    prompt, signal, reason, reward, reticle,

    get mode() { return mode; },
    get text() { return text; },
    get duelSignal() { return signalText; },
    get duelReason() { return reasonText; },
    get rewardText() { return rewardText; },
    get opponentName() { return nameText; },
    get duelPhase() { return phase; },
    get duelStateLabel() { return stateText; },
    get moneyText() { return moneyText; },
    get reputationText() { return repText; },
    get objectiveText() { return objectiveText; },
    get reticleVisible() { return reticleOn && mode === 'duel'; },

    /**
     * T031 (REVIEW V4/R60): a full-screen poster owns the screen. One class on the
     * layer zeroes every line, children included (the purse rows and the duel rows
     * have their own computed opacity, so per-line `is-hidden` alone would leave
     * them lit). The layer itself stays at opacity 1, so this is a suppression of
     * the lines, not a hidden HUD.
     */
    setSuppressed(on) {
      const want = !!on;
      if (want === suppressed) return api;
      suppressed = want;
      if (root) root.classList.toggle('is-suppressed', want);
      applyMode();
      return api;
    },

    /** 'explore' | 'duel' — which set of lines the player is looking at (R60/R61). */
    setMode(next) {
      const want = next === 'duel' ? 'duel' : 'explore';
      if (want === mode) return api;
      mode = want;
      applyMode();
      return api;
    },

    /**
     * R60: money, reputation and the objective, pushed every frame. Idempotent per
     * field, so the DOM only changes when a number or the hint really moved.
     */
    setValues(values = {}) {
      const m = values.money == null ? null : String(values.money);
      if (m !== null && m !== moneyText) {
        moneyText = m;
        money.value.textContent = `$${m}`;
      }
      const r = values.reputation == null ? null : String(values.reputation);
      if (r !== null && r !== repText) {
        repText = r;
        reputation.value.textContent = r;
      }
      const o = values.objective == null ? null : String(values.objective);
      if (o !== null && o !== objectiveText) {
        objectiveText = o;
        objective.textContent = o;
      }
      return api;
    },

    /** R37/R62: the bottom-centre prompt line. Idempotent, so it is safe per frame. */
    setPrompt(value) {
      const next = value == null ? '' : String(value);
      if (next === text) return api;
      text = next;
      prompt.textContent = next;
      mark(prompt, 'is-on', !!next);
      return api;
    },

    /** Convenience for R37: `Challenge Buck?` */
    showChallenge(name) { return api.setPrompt(name ? `Challenge ${name}?` : ''); },

    /**
     * T016/R46: move the crosshair to a viewport fraction pair. Idempotent, so
     * aiming.js may call it every frame; the DOM is only touched when the point
     * actually moved. Visibility is still applyMode()'s business (duel only).
     */
    setReticle(x, y) {
      const nx = Number.isFinite(x) ? Math.min(1, Math.max(0, x)) : 0.5;
      const ny = Number.isFinite(y) ? Math.min(1, Math.max(0, y)) : 0.5;
      if (nx !== reticleX || ny !== reticleY) {
        reticleX = nx;
        reticleY = ny;
        reticle.style.left = `${(nx * 100).toFixed(2)}%`;
        reticle.style.top = `${(ny * 100).toFixed(2)}%`;
      }
      return api;
    },

    /**
     * R39/R61: drive the whole duel UI from the duel phase (and the opponent the
     * machine is facing). Phases with no cue clear the signal; the handoff phase
     * drops the duel UI entirely.
     */
    setDuel(next, opp = null) {
      const want = next && next !== 'exploring' ? next : null;
      const sig = want ? (SIGNAL[want] || '') : '';
      const label = want ? (STATE_LABEL[want] || want.toUpperCase()) : '';
      const name = want && opp && opp.name ? opp.name : '';
      const changed = want !== phase || sig !== signalText || label !== stateText
        || name !== nameText;
      phase = want;
      reticleOn = !!want;
      if (changed) {
        signalText = sig;
        signal.textContent = sig;
        mark(signal, 'is-on', !!sig);
        stateText = label;
        duelState.textContent = label;
        duelState.setAttribute('data-phase', want || '');
        nameText = name;
        duelName.textContent = name;
        duelName.setAttribute('data-opponent', name);
      }
      applyMode();
      return api;
    },

    clearDuel() { return api.setDuel(null); },

    /** R40/R48: why the duel ended, e.g. 'TOO EARLY!'. Idempotent. */
    setReason(value) {
      const next = value == null ? '' : String(value);
      if (next === reasonText) return api;
      reasonText = next;
      reason.textContent = next;
      mark(reason, 'is-on', !!next);
      return api;
    },

    /**
     * R49: the reward line. `reward` is { money, reputation } or null. A win shows
     * "+ $25  + 10 Reputation"; anything else clears it, so a draw or a loss never
     * claims the player earned something.
     */
    setReward(reward_) {
      let next = '';
      if (reward_ && (reward_.money || reward_.reputation)) {
        const bits = [];
        if (reward_.money) bits.push(`+ $${reward_.money}`);
        if (reward_.reputation) {
          bits.push(`+ ${reward_.reputation} Reputation`);
        }
        next = bits.join('   ');
      }
      if (next === rewardText) return api;
      rewardText = next;
      reward.textContent = next;
      mark(reward, 'is-on', !!next);
      return api;
    },

    /** Everything the HUD is currently showing, as plain data. */
    snapshot() {
      return {
        mode,
        prompt: text,
        money: moneyText,
        reputation: repText,
        objective: objectiveText,
        duelName: nameText,
        duelState: stateText,
        duelPhase: phase,
        duelSignal: signalText,
        duelReason: reasonText,
        reward: rewardText,
        reticle: api.reticleVisible,
        reticleX, reticleY,
      };
    },

    /**
     * Tear the duel's lines down. The reward line deliberately survives, because
     * the player is still reading his purse after the duel handed the town back;
     * it is cleared by the NEXT duel (setReward on 'start'), not here (R66).
     */
    clear() {
      api.setPrompt('').clearDuel().setReason('');
      return api;
    },

    dispose() {
      for (const el of [panel, duel, signal, reason, reward, prompt, reticle]) el.remove();
      return api;
    },
  };

  applyMode();
  return api;
}
