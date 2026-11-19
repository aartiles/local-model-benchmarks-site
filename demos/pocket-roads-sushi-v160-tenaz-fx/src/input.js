// src/input.js — the touch controls (R12, R13, R14) and the keyboard (R15, R16).
//
// One object, `{ steer, throttle, brake }`, is the whole control state and every
// input source writes into it. The THUMB half: the left half of the screen is the
// steering zone and the right half holds the throttle and brake pedals (R12), so
// two thumbs can hold steer and a pedal at the same time (R13). The KEYBOARD half
// (T015, R15): WASD and the arrow keys drive the same four controls on desktop.
//
// Both halves write through the same per-control state, which is kept PER SOURCE
// (`touch` and `key`), so a control is down while EITHER source holds it:
// releasing W does not lift a thumb that is still on the throttle pad, and lifting
// a thumb does not release a held arrow key. That is R14's independence, one level
// up from "one thumb does not affect the other".
//
// Independence (R14) comes from tracking one pointer per control: each pointer
// is captured with setPointerCapture() to the element that took it, and a
// pointerup / pointercancel / lostpointercapture clears ONLY the control that
// pointer is holding. Lifting the steering thumb therefore leaves the throttle
// pad down, and a cancel on a pedal leaves the thumb's steer intact. The same rule
// holds for keys: keyup clears only the control that key drives.
//
// Escape (R16) is not a control: it is reported to `options.onPause(event)` so
// main.js can toggle the run through the race machine. This module never
// preventDefault-s Escape, and never stops its propagation, so the ready / pause /
// result overlays (T020) can put their own Escape handler on the same event.
//
// The DOM hit areas decide which control a touch belongs to — the element under
// the pointer is the control, with the half of the screen as a fallback so the
// whole left/right zone is usable and not just the two pads.
//
// The module never replaces the state object and never rewrites it from DOM
// state each frame: it sets a field only when a pointer starts or ends, so a
// hand-written `__pr.input.throttle = 1` (T002 does that) still moves the car.

// control name -> which field of the input object it drives
export const CONTROL_FIELD = {
  'steer-left': 'steer',
  'steer-right': 'steer',
  throttle: 'throttle',
  brake: 'brake',
};

export const CONTROL_VALUE = {
  'steer-left': -1,
  'steer-right': 1,
  throttle: 1,
  brake: 1,
};

// The pads, in the markup T002 put in index.html.
export const CONTROL_SELECTORS = {
  'steer-left': '#steer-left',
  'steer-right': '#steer-right',
  throttle: '#pedal-throttle',
  brake: '#pedal-brake',
};

// R15: the desktop keys, by event.code (never event.key, which follows the layout
// and would break on AZERTY / QWERTZ). Each key drives one of the same four
// controls the pads do, so it merges into the same input object.
export const KEY_CONTROL = {
  KeyW: 'throttle',
  ArrowUp: 'throttle',
  KeyS: 'brake',
  ArrowDown: 'brake',
  KeyA: 'steer-left',
  ArrowLeft: 'steer-left',
  KeyD: 'steer-right',
  ArrowRight: 'steer-right',
};

// R16: Escape pauses the run. It is a command, not a control, so it goes to the
// caller's onPause() instead of into the input object.
export const PAUSE_CODE = 'Escape';

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

/**
 * Wire the touch controls onto an existing input state object.
 * @param {object} target  the { steer, throttle, brake } object to write into
 * @param {object} options { root, window, onChange, onPause } for tests
 * @returns {{ input: object, held: () => object, heldBy: (source) => object,
 *             keys: () => object, pressKey: (code) => ..., releaseKey: (code) => ...,
 *             pointers: () => number, controls: () => object,
 *             releaseAll: () => void, releaseKeys: () => void, uninstall: () => void }}
 */
export function installInput(target, options = {}) {
  const input = target && typeof target === 'object' ? target : { steer: 0, throttle: 0, brake: 0 };
  const root = options.root || (typeof document !== 'undefined' ? document : null);
  const win = options.window || (typeof window !== 'undefined' ? window : undefined);
  const onChange = typeof options.onChange === 'function' ? options.onChange : null;
  const onPause = typeof options.onPause === 'function' ? options.onPause : null;

  const pads = {};
  for (const [name, sel] of Object.entries(CONTROL_SELECTORS)) {
    pads[name] = root && root.querySelector ? root.querySelector(sel) : null;
  }
  const zoneSteer = root && root.querySelector ? root.querySelector('#zone-steer') : null;
  const zonePedal = root && root.querySelector ? root.querySelector('#zone-pedal') : null;

  // pointerId -> { control, pad, fallback }
  const pointers = new Map();
  // Which controls are down, PER SOURCE. `touch` is set by pointers, `key` by
  // keydown/keyup. A control is live while either source holds it, so releasing a
  // key never lifts a thumb and vice versa (R14, one level up from the thumbs).
  const SOURCES = ['touch', 'key'];
  const sourceDown = { touch: {}, key: {} };
  for (const s of SOURCES) for (const c of Object.keys(CONTROL_FIELD)) sourceDown[s][c] = false;

  // The union, which is what the pads highlight and the fields are computed from.
  const held = {};
  for (const c of Object.keys(CONTROL_FIELD)) held[c] = false;
  function refreshHeld() {
    for (const c of Object.keys(CONTROL_FIELD)) {
      held[c] = sourceDown.touch[c] || sourceDown.key[c];
    }
  }

  // ----------------------------------------------------------- field writing --
  function applyField(field) {
    if (field === 'steer') {
      const left = held['steer-left'] ? -1 : 0;
      const right = held['steer-right'] ? 1 : 0;
      input.steer = clamp(left + right, -1, 1);
    } else if (field === 'throttle') {
      input.throttle = held.throttle ? 1 : 0;
    } else if (field === 'brake') {
      input.brake = held.brake ? 1 : 0;
    }
  }

  function setPadClass(name, isDown) {
    const el = pads[name];
    if (el && el.classList) {
      if (isDown) el.classList.add('active');
      else el.classList.remove('active');
    }
  }

  function press(control, source = 'touch') {
    if (!(control in held)) return null;
    if (!sourceDown[source]) sourceDown[source] = {};
    sourceDown[source][control] = true;
    refreshHeld();
    setPadClass(control, true);
    applyField(CONTROL_FIELD[control]);
    if (onChange) onChange(control, true, input);
    return control;
  }

  function release(control, source = 'touch') {
    if (!(control in held)) return null;
    if (sourceDown[source]) sourceDown[source][control] = false;
    refreshHeld();
    setPadClass(control, held[control]);
    applyField(CONTROL_FIELD[control]);
    if (onChange) onChange(control, false, input);
    return control;
  }

  // ------------------------------------------------- which control is this? ---
  // The element under the pointer decides; the half of the screen is the fallback
  // so a thumb that lands between the pads still steers (or pedals).
  function controlFor(event) {
    const path = event.composedPath ? event.composedPath() : [event.target];
    for (const [name, el] of Object.entries(pads)) {
      if (el && path.indexOf(el) !== -1) return { control: name, pad: true };
    }
    const x = Number(event.clientX) || 0;
    const y = Number(event.clientY) || 0;
    const width = (win && win.innerWidth) || (root && root.documentElement && root.documentElement.clientWidth) || 0;
    const left = width ? x < width / 2 : false;
    if (!width) return null;
    // A touch outside both zones (e.g. on the HUD) still belongs to the half it
    // is in, which is what R12 says the halves mean.
    if (left) {
      const mid = zoneMid(zoneSteer, x);
      return { control: x < mid ? 'steer-left' : 'steer-right', pad: false };
    }
    const mid = zoneMid(zonePedal, x);
    return { control: x < mid ? 'brake' : 'throttle', pad: false };
  }

  function zoneMid(zone, fallbackX) {
    if (zone && zone.getBoundingClientRect) {
      const r = zone.getBoundingClientRect();
      if (r.width > 0) return r.left + r.width / 2;
    }
    return fallbackX;
  }

  // ------------------------------------------------------------- pointers -----
  function down(event) {
    const id = event.pointerId;
    if (id === undefined || pointers.has(id)) return;
    const found = controlFor(event);
    if (!found) return;
    const control = press(found.control);
    if (control === null) return;
    pointers.set(id, { control, pad: found.pad });
    const el = pads[control] || event.currentTarget;
    if (el && el.setPointerCapture && event.pointerType !== 'mouse') {
      try {
        el.setPointerCapture(id);
      } catch {
        /* the element cannot capture this pointer; the release handlers below
           are on window too, so the control still comes back up */
      }
    }
    if (event.cancelable) event.preventDefault();
  }

  // A thumb that slides from one pad to the other re-targets: only the control
  // it moves out of is cleared.
  function move(event) {
    const rec = pointers.get(event.pointerId);
    if (!rec || rec.pad) return;
    const found = controlFor(event);
    if (!found || found.control === rec.control) return;
    release(rec.control);
    const next = press(found.control);
    if (next === null) {
      pointers.delete(event.pointerId);
      return;
    }
    rec.control = next;
  }

  function up(event) {
    const id = event.pointerId;
    const rec = pointers.get(id);
    if (!rec) return;
    pointers.delete(id);
    release(rec.control);
    const el = pads[rec.control];
    if (el && el.releasePointerCapture && el.hasPointerCapture && el.hasPointerCapture(id)) {
      try {
        el.releasePointerCapture(id);
      } catch {}
    }
  }

  // A pointer that vanished without up/cancel (the browser stole it) must not
  // leave its control stuck down — and must not touch any other control.
  function lostCapture(event) {
    if (event && event.pointerId !== undefined && pointers.has(event.pointerId)) up(event);
  }

  function releaseThumbs() {
    for (const [, rec] of [...pointers]) release(rec.control);
    pointers.clear();
  }

  function releaseAll() {
    releaseThumbs();
    releaseKeys();
  }

  // ------------------------------------------------------------- keyboard -----
  // The keyboard's own held state, so a check (and main.js's reset) can see which
  // keys are down independently of the thumbs. Declared before the functions below
  // that use it, so no path can reach them while it is still in its temporal dead
  // zone.
  const downKey = {};
  for (const c of Object.keys(CONTROL_FIELD)) downKey[c] = false;

  // R15. event.code, so a AZERTY/QWERTZ layout still drives the same controls. An
  // auto-repeat keydown is ignored: the control is already down, and re-pressing it
  // would re-fire onChange every repeat tick.
  function pressKey(code) {
    const control = KEY_CONTROL[code];
    if (!control) return null;
    downKey[control] = true;
    return press(control, 'key');
  }

  function releaseKey(code) {
    const control = KEY_CONTROL[code];
    if (!control) return null;
    downKey[control] = false;
    return release(control, 'key');
  }

  function releaseKeys() {
    for (const code of Object.keys(KEY_CONTROL)) {
      const control = KEY_CONTROL[code];
      if (downKey[control]) releaseKey(code);
    }
  }

  function onKeyDown(event) {
    const code = event.code;
    if (code === PAUSE_CODE) {
      // R16, and the card's "do not steal Escape from the overlays": the command is
      // reported, the event is left alone (no preventDefault, no stopPropagation),
      // so a later overlay handler on the same keydown still runs.
      if (onPause) onPause(event);
      return;
    }
    // An auto-repeat keydown is the OS holding the key, not a new press: it must not
    // re-apply the control, or a hand-written write to the field would be undone by
    // the next repeat tick.
    if (event.repeat) return;
    if (!pressKey(code)) return;
    // The pedals and the arrows are the page's, not the browser's: without this a
    // space or arrow press scrolls the document instead of driving the car.
    if (event.cancelable) event.preventDefault();
  }

  function onKeyUp(event) {
    if (event.code === PAUSE_CODE) return;
    if (!releaseKey(event.code)) return;
    if (event.cancelable) event.preventDefault();
  }

  const listeners = [];
  function on(el, type, fn) {
    if (!el || !el.addEventListener) return;
    el.addEventListener(type, fn);
    listeners.push([el, type, fn]);
  }

  const surface = root || null;
  for (const el of Object.values(pads)) {
    on(el, 'pointerdown', down);
  }
  on(zoneSteer, 'pointerdown', down);
  on(zonePedal, 'pointerdown', down);
  // The fallback needs the whole screen, and the release must always be seen.
  on(surface, 'pointerdown', down);
  on(surface, 'pointermove', move);
  on(surface, 'pointerup', up);
  on(surface, 'pointercancel', up);
  on(surface, 'lostpointercapture', lostCapture);
  if (win) {
    // Losing the window lifts the thumbs (a pointer that will never send its
    // pointerup). Keys are NOT lifted here: going to the background already pauses the
    // run (R32), so a held key cannot drive a paused car, and the player comes back to
    // the pause screen and presses again. Chrome fires a stray blur around a single
    // dispatched key event, which would otherwise eat a held key.
    on(win, 'blur', releaseThumbs);
    on(win, 'pagehide', releaseKeys);
    on(win, 'contextmenu', (e) => e.preventDefault && e.preventDefault());
    // Keys live on the window, not the canvas: they must work whatever has focus, and
    // a keydown on a button must still drive the car.
    on(win, 'keydown', onKeyDown);
    on(win, 'keyup', onKeyUp);
  }

  return {
    input,
    held: () => ({ ...held }),
    // per source, so a check can tell a held key from a held thumb
    heldBy: (source) => ({ ...(sourceDown[source] || {}) }),
    keys: () => ({ ...downKey }),
    pointers: () => pointers.size,
    controls: () => ({ ...pads, zoneSteer, zonePedal }),
    pressKey,
    releaseKey,
    releaseKeys,
    releaseAll,
    uninstall() {
      releaseAll();
      for (const [el, type, fn] of listeners.splice(0)) el.removeEventListener(type, fn);
    },
  };
}
