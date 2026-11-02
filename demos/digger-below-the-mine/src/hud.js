// src/hud.js — the DOM heads-up display (R29, R30, R32, R20).
//
// The HUD is a MIRROR of the simulation, never a second copy of it: every value
// it prints comes from the plain-data state main.js hands it, which is
// `Game.snapshot()` plus the miner's own survival numbers and `carrying()` from
// the interaction layer. So a restart (T011/T031) and a mission event cannot
// leave the panel showing something the game does not hold.
//
// Two entry points, both called from src/main.js every painted frame:
//   sync(state)  — health, lantern, ore, carrying, objective/progress, the
//                  danger warnings (R20) and the mute indicator (R32).
//   prompt(text) — the contextual interaction line (R30). It is separate
//                  because it is the one string the loop may want to override
//                  with a response line, and the panel must not fight it.
//
// All player-facing text is English. Writes are diffed against what is already
// in the DOM, so a 60fps sync costs nothing when nothing changed.
//
// showOverlay(name, data) is the seam T032 paints the title/pause/defeat/
// victory screens through; today it only records which screen is up.

import { MAX_HEALTH, MAX_BATTERY } from './config.js';

// id -> the element that carries the value, and the label the check reads.
const WARNINGS = [
  ['lowBattery', 'warn-battery'],
  ['lowHealth', 'warn-health'],
  ['enemyProximity', 'warn-enemy'],
];

const CARRY_LABEL = { part: 'Pump part', crystal: 'Deep rare crystal' };

// mission state -> [screen element, the element its one dynamic line goes in].
// The screens live in index.html; this is the only table that decides which one
// is up, so a new state cannot silently leave the last screen showing.
const SCREENS = [
  ['title', 'screen-title', null],
  ['paused', 'screen-paused', 'paused-detail'],
  ['dead', 'screen-defeat', 'defeat-detail'],
  ['victory', 'screen-victory', 'victory-detail'],
];

// The actions the screen buttons can ask for. main.js owns what each one does.
const SCREEN_ACTIONS = ['start', 'resume', 'restart'];

const clock = (seconds) => {
  const s = Math.max(0, Math.round(Number(seconds) || 0));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

// The one line each screen writes for itself, from the state it was handed.
function detailFor(state, s) {
  const objective = s.objective ?? {};
  const total = Math.max(1, Number(objective.total) || 1);
  const stage = objective.done === true ? total : Math.min(total, (Number(objective.stage) || 0) + 1);
  if (state === 'paused') return `Objective ${stage}/${total}: ${objective.hint ?? ''}`;
  if (state === 'dead') return `The mission reached stage ${stage} of ${total}.`;
  return `Time ${clock(s.time)}  ·  Ore ${Math.max(0, Math.round(Number(s.ore) || 0))}  ·  Restarts ${Math.max(0, Number(s.restarts) || 0)}`;
}

const clampPct = (n, max) => {
  const v = Number(n);
  if (!Number.isFinite(v) || v <= 0) return 0;
  return Math.round(Math.min(100, (v / (max || 1)) * 100));
};

export class Hud {
  constructor(options = {}) {
    const root = options.root ?? (options.doc ?? globalThis.document)?.getElementById('hud');
    this.root = root ?? null;
    this.doc = options.doc ?? this.root?.ownerDocument ?? globalThis.document ?? null;
    // Last written value per element, so sync() only touches the DOM on change.
    this._written = new Map();
    this.overlay = null;
    this.state = null;
    // Screen buttons: the HUD reports the action, main.js decides what it means.
    this.onAction = typeof options.onAction === 'function' ? options.onAction : null;
    this.actions = [];
    this.lastAction = null;
    this._bound = [];
    if (this.root) {
      for (const el of this.root.querySelectorAll('[data-action]')) {
        const action = el.getAttribute('data-action');
        const handler = (event) => {
          if (event && typeof event.preventDefault === 'function') event.preventDefault();
          // A focused button would fire again on the next Space keypress, and
          // Space is the jump key.
          if (el.blur) el.blur();
          this.act(action);
        };
        el.addEventListener('click', handler);
        this._bound.push([el, 'click', handler]);
      }
    }
  }

  get ok() {
    return this.root !== null;
  }

  _el(id) {
    if (!this.doc) return null;
    let el = this._written.get('#' + id);
    if (el === undefined) {
      el = this.doc.getElementById(id) ?? null;
      this._written.set('#' + id, el);
    }
    return el;
  }

  // Write text content only when it differs from what is already shown.
  _text(id, value) {
    const el = this._el(id);
    if (!el) return false;
    const text = String(value);
    const key = id + '.text';
    if (this._written.get(key) === text) return false;
    el.textContent = text;
    this._written.set(key, text);
    return true;
  }

  _attr(id, name, value) {
    const el = this._el(id);
    if (!el) return false;
    const v = String(value);
    const key = `${id}.${name}`;
    if (this._written.get(key) === v) return false;
    el.setAttribute(name, v);
    this._written.set(key, v);
    return true;
  }

  // Show/hide an element through the `hidden` attribute (display:none in CSS).
  _show(id, on) {
    const el = this._el(id);
    if (!el) return false;
    const key = id + '.hidden';
    const want = on !== true;
    if (this._written.get(key) === want) return false;
    el.hidden = !want ? false : true;
    this._written.set(key, want);
    return true;
  }

  // One meter: percent fill, plus the low flag that turns it red.
  _meter(barId, valueId, value, max, low, suffix = '') {
    const pct = clampPct(value, max);
    this._text(valueId, `${Math.round(Math.max(0, Number(value) || 0))}${suffix}`);
    this._attr(barId, 'data-fill', pct);
    this._attr(barId, 'data-low', low ? 'true' : 'false');
    const el = this._el(barId);
    if (el) el.style.setProperty('--fill', `${pct}%`);
  }

  // The whole panel except the interaction line. `state` is Game.snapshot()
  // extended with health/battery/ore/warnings/carrying by src/main.js.
  sync(state = {}) {
    if (!this.ok) return false;
    this.state = state;
    const warnings = state.warnings ?? {};
    const objective = state.objective ?? {};
    const total = Math.max(1, Number(objective.total) || 1);
    const stage = Math.min(total, (Number(objective.stage) || 0) + 1);

    this._meter('hud-health-bar', 'hud-health-value', state.health ?? 0, MAX_HEALTH || 100, warnings.lowHealth === true);
    this._meter(
      'hud-battery-bar',
      'hud-battery-value',
      state.battery ?? 0,
      MAX_BATTERY || 100,
      warnings.lowBattery === true,
      '%',
    );
    this._text('hud-ore-value', Math.max(0, Math.round(Number(state.ore) || 0)));

    // Carrying is derived from the objective flags by src/interaction.js, so the
    // panel cannot claim the miner holds something the mission has not recorded.
    const carry = state.carrying ?? {};
    const held = ['part', 'crystal'].filter((k) => carry[k] === true).map((k) => CARRY_LABEL[k]);
    this._text('hud-carrying-value', held.length ? held.join(' + ') : 'Nothing');

    this._text('hud-objective-value', objective.hint ?? '');
    this._text('hud-objective-progress', `${objective.done === true ? total : stage}/${total}`);

    // R20: the warning is on screen while the value it guards is still above
    // zero, which is what makes the danger fair.
    for (const [flag, id] of WARNINGS) this._show(id, warnings[flag] === true);

    // R32: one indicator, reading the single mute flag Game owns.
    const muted = state.muted === true;
    this._text('hud-mute-value', muted ? 'Muted' : 'On');
    this._attr('hud-mute', 'data-muted', muted ? 'true' : 'false');

    return true;
  }

  // R30: the contextual prompt. Empty or null hides the line entirely, so a
  // stale prompt can never outlive the object it was about.
  prompt(text) {
    if (!this.ok) return false;
    const line = text === null || text === undefined ? '' : String(text);
    if (!line) {
      this._show('hud-prompt', false);
      this._text('hud-prompt', '');
      return true;
    }
    this._text('hud-prompt', line);
    this._show('hud-prompt', true);
    return true;
  }

  // The seam T032 paints the four screens through. `name` is a mission state
  // (title/paused/dead/victory) or null for none: the matching screen is shown,
  // every other one is hidden, and the dynamic line on each screen is written
  // from the same plain-data state the panel reads.
  showOverlay(name = null, data = null) {
    this.overlay = name ? String(name) : null;
    this.overlayData = data ?? null;
    if (!this.ok) return false;
    this._attr('hud-overlays', 'data-overlay', this.overlay ?? 'none');
    for (const [state, id, detailId] of SCREENS) {
      const on = this.overlay === state;
      this._show(id, on);
      if (detailId && on) this._text(detailId, detailFor(state, data ?? {}));
    }
    return true;
  }

  // One of the screen buttons was clicked (or activated by the keyboard). The
  // HUD never decides what a click means: it hands the action name to main.js.
  act(action) {
    const name = String(action ?? '');
    if (!SCREEN_ACTIONS.includes(name)) return false;
    this.lastAction = name;
    this.actions.push(name);
    if (this.actions.length > 16) this.actions.shift();
    if (this.onAction) this.onAction(name);
    return true;
  }
}
