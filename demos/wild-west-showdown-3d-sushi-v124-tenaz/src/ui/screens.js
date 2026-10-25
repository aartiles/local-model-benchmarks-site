/**
 * Full-screen overlays driven by the phase machine (start / pause / defeat / victory).
 *
 * T002 builds the start screen (R65). Later tasks register their own overlay with
 * screens.add(name, { phases, el }) and it opens/closes with the phase for free;
 * pause belongs to T017, defeat to T017, victory to T022.
 *
 * The overlay is the only thing that changes game.state from the UI side, and the
 * game never reads the test hooks (D3).
 */

const START_MARKUP = `
  <div class="screen-sky" aria-hidden="true">
    <span class="sky-sun"></span>
    <span class="sky-mesa sky-mesa-a"></span>
    <span class="sky-mesa sky-mesa-b"></span>
    <span class="sky-ground"></span>
  </div>
  <div class="poster">
    <p class="kicker">Wanted &mdash; a showdown at high noon</p>
    <h1 class="title" data-part="title">Wild West Showdown<span class="title-3d">3D</span></h1>
    <p class="tagline">Ride into a dusty little town, find the gunslingers, and be
      the fastest draw in the West.</p>
    <ol class="rules">
      <li>Explore the town and look for a gunslinger.</li>
      <li>Challenge them, then take your position.</li>
      <li>Hold steady. Wait for <strong>DRAW</strong>.</li>
      <li>Shoot first &mdash; flinch early and you lose the duel.</li>
    </ol>
    <div class="hints">
      <section class="hint">
        <h2>Keyboard &amp; mouse</h2>
        <ul>
          <li><kbd>WASD</kbd> or arrow keys move, hold to run</li>
          <li>Drag the mouse to turn and aim</li>
          <li><kbd>Click</kbd> shoot &middot; <kbd>E</kbd> challenge</li>
          <li><kbd>Esc</kbd> pause</li>
        </ul>
      </section>
      <section class="hint">
        <h2>Touch</h2>
        <ul>
          <li>Left stick to move</li>
          <li>Drag the right half of the screen to aim</li>
          <li>Big button shoots &middot; tap a gunslinger to challenge</li>
        </ul>
      </section>
    </div>
    <button type="button" class="btn btn-start" data-part="start">Start</button>
    <p class="fineprint">Sound starts when you press Start.</p>
  </div>
`;

function buildStartScreen() {
  const el = document.createElement('div');
  el.className = 'screen screen-start';
  el.dataset.screen = 'start';
  el.innerHTML = START_MARKUP;
  return el;
}

/**
 * T017c: the pause overlay (R24). Deliberately minimal — it names the phase it
 * froze and the one key that gets you out. It covers the screen but never reads
 * game state beyond what screens.add() already does.
 */
const PAUSE_MARKUP = `
  <div class="poster poster-pause">
    <p class="kicker">The town holds its breath</p>
    <h1 class="title" data-part="pause-title">Paused</h1>
    <p class="tagline">Nothing moves while you think.</p>
    <button type="button" class="btn btn-resume" data-part="resume">Resume</button>
  </div>
`;

function buildPauseScreen() {
  const el = document.createElement('div');
  el.className = 'screen screen-pause';
  el.dataset.screen = 'pause';
  el.innerHTML = PAUSE_MARKUP;
  return el;
}

/**
 * T014a (R51) — the general-store screen. NOT phase-driven: main.js registers
 * the element with screens.add('store', { phases: [], el }) and opens/closes it
 * with show()/hide(), so any real phase change (a duel starting, a pause, a
 * defeat) sweeps it shut through refresh() for free (R66).
 *
 * Rows are rendered from store.snapshot() — one source of truth for price and
 * owned state — and every row carries data-item / data-owned / a $price text
 * so a check reads exactly what the player reads.
 */
export function createStoreScreen({ store, onBuy, onClose }) {
  const el = document.createElement('div');
  el.className = 'screen screen-store';
  el.dataset.screen = 'store';
  el.innerHTML = `
    <div class="poster poster-store">
      <p class="kicker">General Store — goods for a thinking gunslinger</p>
      <h1 class="title" data-part="store-title">The Store</h1>
      <p class="tagline">Purse: <span data-part="purse">$0</span>.
        None of this speeds your draw — <strong>DRAW</strong> still decides.</p>
      <ul class="store-items" data-part="items"></ul>
      <p class="store-note" data-part="note" aria-live="polite"></p>
      <button type="button" class="btn btn-leave" data-part="close">Leave (E)</button>
    </div>
  `;
  const purse = el.querySelector('[data-part="purse"]');
  const list = el.querySelector('[data-part="items"]');
  const note = el.querySelector('[data-part="note"]');

  function render(snap) {
    const s = snap || store.snapshot();
    purse.textContent = `$${s.money}`;
    list.replaceChildren(...s.items.map((item) => {
      const row = document.createElement('li');
      row.className = 'store-item';
      row.dataset.item = item.id;
      row.dataset.kind = item.kind;
      row.dataset.owned = item.owned ? 'true' : 'false';
      const name = document.createElement('span');
      name.className = 'store-name';
      name.textContent = item.name;
      const price = document.createElement('span');
      price.className = 'store-price';
      price.dataset.part = 'price';
      price.textContent = item.owned ? 'OWNED' : `$${item.cost}`;
      const desc = document.createElement('span');
      desc.className = 'store-desc';
      desc.textContent = item.desc;
      row.append(name, price, desc);
      if (!item.owned) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn btn-buy';
        btn.dataset.part = 'buy';
        btn.textContent = 'Buy';
        btn.addEventListener('click', () => onBuy(item.id));
        row.appendChild(btn);
      }
      return row;
    }));
    return s;
  }

  el.querySelector('[data-part="close"]').addEventListener('click', () => onClose());
  render(store.snapshot());

  return { el, render, note: (msg) => { note.textContent = msg == null ? '' : String(msg); } };
}

/**
 * T022a (R58) — the completion screen. Phase-driven: main.js registers it with
 * screens.add('victory', { phases: ['victory'], el }), so it opens and closes
 * with the phase for free and every open/close goes through the one `setOpen`.
 *
 * It RENDERS the run ledger and decides nothing: every number comes from the
 * stats object handed to render(), so the screen cannot disagree with game.js.
 * Each value carries data-value with the raw number next to the formatted text
 * a player reads, which is what a check asserts against.
 */
const VICTORY_ROWS = Object.freeze([
  ['play', 'Total play time'],
  ['won', 'Duels won'],
  ['lost', 'Duels lost'],
  ['fastest', 'Fastest duel'],
  ['money', 'Money earned'],
]);

/** 63_400 -> '1:03'. Minutes and seconds, because R58 asks for a play TIME. */
function fmtClock(ms) {
  const total = Math.max(0, Math.round(ms || 0));
  const m = Math.floor(total / 60000);
  const s = Math.floor((total % 60000) / 1000);
  return `${m}:${String(s).padStart(2, '0')}`;
}

/** 420 -> '0.42s'. A duel is short; seconds read better than a clock here. */
function fmtSeconds(ms) {
  return Number.isFinite(ms) ? `${(ms / 1000).toFixed(2)}s` : '—';
}

export function createVictoryScreen({ onRestart }) {
  const el = document.createElement('div');
  el.className = 'screen screen-victory';
  el.dataset.screen = 'victory';
  el.innerHTML = `
    <div class="poster poster-victory">
      <p class="kicker">The town exhales</p>
      <h1 class="title" data-part="victory-title">WILD WEST CHAMPION</h1>
      <p class="tagline">The final gunslinger is down. Nobody draws faster in the West.</p>
      <ul class="victory-stats" data-part="stats"></ul>
      <button type="button" class="btn btn-start" data-part="play-again">PLAY AGAIN</button>
      <p class="fineprint">A new run: fresh purse, fresh town.</p>
    </div>
  `;
  const list = el.querySelector('[data-part="stats"]');
  const cells = new Map();

  list.replaceChildren(...VICTORY_ROWS.map(([key, label]) => {
    const row = document.createElement('li');
    row.className = 'victory-stat';
    row.dataset.part = `row-${key}`;
    const name = document.createElement('span');
    name.className = 'victory-label';
    name.textContent = label;
    const value = document.createElement('span');
    value.className = 'victory-value';
    value.dataset.part = key;
    value.dataset.value = '';
    row.append(name, value);
    cells.set(key, value);
    return row;
  }));

  /** Paint the five R58 stats from the ledger. Idempotent; never mutates it. */
  function render(stats) {
    const s = stats || {};
    const playMs = Number.isFinite(s.playMs) ? s.playMs : 0;
    const fastest = Number.isFinite(s.fastestDuelMs) ? s.fastestDuelMs : null;
    const won = Number.isFinite(s.duelsWon) ? s.duelsWon : 0;
    const lost = Number.isFinite(s.duelsLost) ? s.duelsLost : 0;
    const money = Number.isFinite(s.moneyEarned) ? s.moneyEarned : 0;
    const set = (key, text, value) => {
      const cell = cells.get(key);
      cell.textContent = text;
      cell.dataset.value = String(value);
    };
    set('play', fmtClock(playMs), Math.round(playMs));
    set('won', String(won), won);
    set('lost', String(lost), lost);
    set('fastest', fmtSeconds(fastest), fastest === null ? '' : Math.round(fastest));
    set('money', `$${money}`, money);
    return s;
  }

  el.querySelector('[data-part="play-again"]')
    .addEventListener('click', () => { onRestart(); el.querySelector('[data-part="play-again"]').blur(); });
  render(null);

  return { el, render, fmtClock, fmtSeconds };
}

export function createScreens({ game, root = document.getElementById('screens') } = {}) {
  if (!root) throw new Error('createScreens: #screens layer is missing');
  const registry = new Map();

  /**
   * The ONE writer of "is this overlay covering the scene". Both halves of the
   * fact move together: the `is-open` class drives visibility, and `aria-hidden`
   * must say the same thing, or a manually opened screen (the store, T014a) is
   * operable but hidden from assistive tech — `show()` used to set only the
   * class, while `refresh()` was the only writer of the attribute.
   */
  function setOpen(screen, open) {
    screen.el.classList.toggle('is-open', open);
    screen.el.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  function refresh(state) {
    for (const screen of registry.values()) {
      setOpen(screen, screen.phases.includes(state));
    }
  }

  const screens = {
    root,

    /** Register an overlay. `phases` lists the game phases it should cover. */
    add(name, { phases, el }) {
      registry.set(name, { el, phases: [...phases] });
      root.appendChild(el);
      refresh(game.state);
      return el;
    },

    remove(name) {
      const screen = registry.get(name);
      if (!screen) return false;
      registry.delete(name);
      screen.el.remove();
      return true;
    },

    show(name) {
      const screen = registry.get(name);
      if (screen) setOpen(screen, true);
    },

    /**
     * Is this overlay covering the scene right now? The one question a manually
     * opened screen (the store, T014a) must ask the registry instead of keeping
     * its own boolean: `refresh()` sweeps every screen whose `phases` do not
     * name the new state, so a private flag would survive a pause and report an
     * open store whose element is already closed.
     */
    isOpen(name) {
      const screen = registry.get(name);
      return !!screen && screen.el.classList.contains('is-open');
    },

    hide(name) {
      const screen = registry.get(name);
      if (screen) setOpen(screen, false);
    },

    hideAll() {
      for (const screen of registry.values()) setOpen(screen, false);
    },

    openNames() {
      return [...registry.entries()]
        .filter(([, s]) => s.el.classList.contains('is-open'))
        .map(([name]) => name);
    },

    refresh: () => refresh(game.state),

    destroy() {
      unsubscribe();
      window.removeEventListener('keydown', onKey);
      registry.clear();
      root.replaceChildren();
    },
  };

  // --- the start screen (R65) ----------------------------------------------
  const start = buildStartScreen();
  const button = start.querySelector('[data-part="start"]');

  function beginPlay() {
    if (game.state !== 'start') return;
    game.set('exploring');
    if (button) button.blur();
  }

  if (button) button.addEventListener('click', beginPlay);

  function onKey(event) {
    if (game.state !== 'start' || event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
      beginPlay();
    }
  }
  window.addEventListener('keydown', onKey);

  screens.add('start', { phases: ['start'], el: start });

  // --- the pause overlay (R24/T017c) ----------------------------------------
  const pause = buildPauseScreen();
  const resumeButton = pause.querySelector('[data-part="resume"]');
  if (resumeButton) {
    resumeButton.addEventListener('click', () => {
      game.resume();
      resumeButton.blur();
    });
  }
  screens.add('pause', { phases: ['paused'], el: pause });

  const unsubscribe = game.onPhase(refresh);
  refresh(game.state);

  return screens;
}
