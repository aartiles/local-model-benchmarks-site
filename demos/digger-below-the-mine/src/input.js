// src/input.js — keyboard/mouse to action state, with one-shot edge detection.
//
// The simulation never reads key codes: it reads `state` (what is held) and
// `pressed(action)` (what was tapped since the last fixed step). That is what
// lets a real `page.keyboard` event and the test API's `press()` drive exactly
// the same code path (R7, R62).
//
// Held actions are level-triggered (walk, mine-while-held); edges are
// edge-triggered (jump, pause, mute, restart) so one keydown is one action no
// matter how many fixed steps run before it is consumed.

// Every action the game knows about. T006/T007 use `mine`; T009 uses
// `interact`; T011 uses `pause`/`restart`; T015 uses `mute`. `lantern` is the
// player's lantern switch (R17), handled by the loop like a system tap.
export const ACTIONS = ['left', 'right', 'jump', 'mine', 'interact', 'lantern', 'pause', 'mute', 'restart'];

// Handled by the loop/state machine rather than by the miner's body.
export const SYSTEM_ACTIONS = ['pause', 'mute', 'restart', 'lantern'];

// e.code is layout-independent, so it is the primary key; e.key is the fallback
// for engines and synthetic events that only carry a character.
const CODES = {
  ArrowLeft: 'left',
  KeyA: 'left',
  ArrowRight: 'right',
  KeyD: 'right',
  ArrowUp: 'jump',
  KeyW: 'jump',
  Space: 'jump',
  KeyX: 'mine',
  KeyJ: 'mine',
  KeyE: 'interact',
  KeyF: 'lantern',
  KeyP: 'pause',
  Escape: 'pause',
  KeyM: 'mute',
  KeyR: 'restart',
};

const KEYS = {
  arrowleft: 'left',
  a: 'left',
  arrowright: 'right',
  d: 'right',
  arrowup: 'jump',
  w: 'jump',
  ' ': 'jump',
  x: 'mine',
  j: 'mine',
  e: 'interact',
  f: 'lantern',
  p: 'pause',
  escape: 'pause',
  m: 'mute',
  r: 'restart',
};

export function actionForEvent(event) {
  const code = event.code;
  if (code && CODES[code]) return CODES[code];
  const key = event.key;
  if (key && KEYS[String(key).toLowerCase()]) return KEYS[String(key).toLowerCase()];
  return null;
}

export class Input {
  constructor() {
    this.state = {};
    for (const a of ACTIONS) this.state[a] = false;
    this._edges = [];
    this._target = null;
    this._bound = [];
    this.log = [];
  }

  // `el` is the canvas: mouse events are read there, keyboard events on its
  // document so no focus or tabindex is needed to play (R7, R36).
  attach(el) {
    if (!el || this._target) return this;
    this._target = el;
    const doc = el.ownerDocument ?? el;
    const win = doc.defaultView ?? (typeof window !== 'undefined' ? window : null);

    const on = (target, type, handler, opts) => {
      if (!target || typeof target.addEventListener !== 'function') return;
      target.addEventListener(type, handler, opts);
      this._bound.push([target, type, handler, opts]);
    };

    on(doc, 'keydown', (e) => {
      const action = actionForEvent(e);
      if (!action) return;
      // Arrows and Space would scroll the page; a scrolling stage reads as lag.
      e.preventDefault();
      if (e.repeat) return;
      this.down(action);
    });
    on(doc, 'keyup', (e) => {
      const action = actionForEvent(e);
      if (action) this.up(action);
    });
    on(el, 'mousedown', (e) => {
      if (e.button === 0) this.down('mine');
    });
    on(el, 'mouseup', (e) => {
      if (e.button === 0) this.up('mine');
    });
    on(el, 'contextmenu', (e) => e.preventDefault());
    // Losing focus must never leave the miner walking into a wall (R34).
    on(win, 'blur', () => this.clear());
    on(doc, 'visibilitychange', () => {
      if (doc.hidden) this.clear();
    });

    return this;
  }

  detach() {
    for (const [target, type, handler, opts] of this._bound) {
      target.removeEventListener(type, handler, opts);
    }
    this._bound.length = 0;
    this._target = null;
    this.clear();
    return this;
  }

  down(action) {
    if (!ACTIONS.includes(action)) return false;
    this.state[action] = true;
    if (!this._edges.includes(action)) this._edges.push(action);
    this.log.push(action);
    if (this.log.length > 32) this.log.shift();
    return true;
  }

  up(action) {
    if (!ACTIONS.includes(action)) return false;
    this.state[action] = false;
    return true;
  }

  isDown(action) {
    return this.state[action] === true;
  }

  // True once per tap of `action`; leaves other pending edges alone.
  pressed(action) {
    const i = this._edges.indexOf(action);
    if (i < 0) return false;
    this._edges.splice(i, 1);
    return true;
  }

  // All pending edges, cleared. The loop calls this once per fixed step so an
  // unconsumed tap cannot fire later (no stuck states, R34).
  consumePressed() {
    const out = this._edges.slice();
    this._edges.length = 0;
    return out;
  }

  releaseAll() {
    for (const a of ACTIONS) this.state[a] = false;
  }

  clear() {
    this.releaseAll();
    this._edges.length = 0;
  }
}
