/**
 * Keyboard and mouse state, plus action callbacks (R24).
 *
 * This module owns *what is being pressed* and nothing else: player.js reads
 * moveAxis()/isRunning(), camera code reads the pointer drag, and duel/weapon
 * code subscribes to named actions with onAction(). It never moves the world
 * itself, and it never decides whether a shot is legal — every shot still goes
 * through duel.requestShot() (D4), so the DRAW rule cannot be bypassed by
 * reaching around the duel.
 *
 * Key state is tracked by KeyboardEvent.code, so it works on any layout and
 * auto-repeat cannot re-fire an action.
 */

/** Logical controls -> physical key codes. Arrows are first-class (R24). */
export const KEYS = Object.freeze({
  forward: ['KeyW', 'ArrowUp'],
  back: ['KeyS', 'ArrowDown'],
  left: ['KeyA', 'ArrowLeft'],
  right: ['KeyD', 'ArrowRight'],
  run: ['ShiftLeft', 'ShiftRight'],
  interact: ['KeyE'],
  shoot: ['Space'],
  pause: ['Escape'],
});

/** Keys the browser would otherwise use to scroll the page. */
const BLOCKED = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space']);

/**
 * @param {object} opts.target  element/window that receives key events
 * @param {object} opts.canvas  element that receives mouse drags (defaults to target)
 */
export function createInput({ target = window, canvas = null } = {}) {
  const down = new Set();
  const handlers = new Map();
  const pointer = { down: false, button: -1, x: 0, y: 0, dx: 0, dy: 0 };
  let dragX = 0;
  let dragY = 0;
  /**
   * T015 (R28/R29): the touch stick's contribution, in the SAME screen-space
   * basis as the keyboard axis (x = strafe right, z = forward). player.js reads
   * moveAxis() and nothing else, so a tablet thumb and WASD drive one code path.
   */
  const touchAxis = { x: 0, z: 0 };
  let touchRun = false;

  const any = (codes) => codes.some((c) => down.has(c));

  /**
   * Action keys, highest priority first. An action belongs to the key that was
   * just pressed — never to "whatever happens to be held down" — otherwise an
   * unrelated keypress (W while E is held) would re-fire the held action and
   * give T008/T017 spurious challenges and extra shots per duel (R40/R66).
   */
  const ACTIONS = [
    ['pause', KEYS.pause],
    ['interact', KEYS.interact],
    ['shoot', KEYS.shoot],
  ];
  const actionOf = (code) => ACTIONS.find(([, codes]) => codes.includes(code))?.[0] ?? null;

  function codeOf(event) {
    if (event.code) return event.code;
    const k = event.key;
    if (!k) return '';
    if (k.length === 1) return 'Key' + k.toUpperCase();
    return k.charAt(0).toUpperCase() + k.slice(1);
  }

  function fire(action, payload) {
    const set = handlers.get(action);
    if (!set || set.size === 0) return false;
    for (const fn of [...set]) fn(payload);
    return true;
  }

  function onKeyDown(event) {
    const code = codeOf(event);
    if (!code) return;
    if (BLOCKED.has(code)) event.preventDefault?.();
    if (down.has(code)) return; // auto-repeat must not re-trigger an action
    down.add(code);
    // One trigger per press, and only for the key that was just pressed.
    // Priority order still decides a simultaneous press: pause beats interact,
    // so a lower-priority action is ignored while a higher-priority key is held.
    const action = actionOf(code);
    if (!action) return;
    const held = ACTIONS.slice(0, ACTIONS.findIndex(([name]) => name === action));
    if (held.some(([, codes]) => any(codes))) return;
    fire(action, action === 'shoot' ? { source: 'key', code } : undefined);
  }

  function onKeyUp(event) {
    down.delete(codeOf(event));
  }

  function onBlur() {
    down.clear();
  }

  function onPointerDown(event) {
    pointer.down = true;
    pointer.button = event.button ?? 0;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.dx = 0;
    pointer.dy = 0;
    if (pointer.button === 0) fire('shoot', { source: 'mouse', event });
  }

  function onPointerMove(event) {
    if (!pointer.down) return;
    pointer.dx = event.clientX - pointer.x;
    pointer.dy = event.clientY - pointer.y;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    dragX += pointer.dx;
    dragY += pointer.dy;
  }

  function onPointerUp() {
    pointer.down = false;
    pointer.button = -1;
    pointer.dx = 0;
    pointer.dy = 0;
  }

  target.addEventListener?.('keydown', onKeyDown);
  target.addEventListener?.('keyup', onKeyUp);
  target.addEventListener?.('blur', onBlur);
  const dragTarget = canvas || target;
  dragTarget.addEventListener?.('mousedown', onPointerDown);
  window.addEventListener?.('mousemove', onPointerMove);
  window.addEventListener?.('mouseup', onPointerUp);

  const input = {
    KEYS,
    isDown: (code) => down.has(code),
    /** Run modifier: Shift on the keyboard, a fully-deflected stick on touch. */
    isRunning: () => any(KEYS.run) || touchRun,

    /**
     * T015: publish the virtual stick's vector. Called by touch.js on every
     * stick move and with 0,0 on release, so there is exactly one movement
     * vector regardless of which device produced it (R28/R29).
     */
    setTouchMove(x, z, run = false) {
      const cl = (v) => (Number.isFinite(v) ? Math.max(-1, Math.min(1, v)) : 0);
      touchAxis.x = cl(x);
      touchAxis.z = cl(z);
      touchRun = !!run && Math.hypot(touchAxis.x, touchAxis.z) > 0.5;
      return touchAxis;
    },

    /**
     * T015: add a touch camera drag to the same accumulator the mouse drag uses,
     * so camera-rig.js drains one stream and cannot tell them apart.
     */
    addDrag(dx, dy) {
      if (Number.isFinite(dx)) dragX += dx;
      if (Number.isFinite(dy)) dragY += dy;
    },

    /** T015: fire a named action from a touch control (same bus as the keys). */
    fireAction(action, payload) {
      return fire(action, payload);
    },

    /**
     * Movement request in *screen* space: x = strafe right (+), z = forward (+).
     * Camera-relative conversion happens in player.js, so the same axis works
     * for touch (T015) and for any camera yaw T005 comes up with.
     */
    moveAxis() {
      const kz = (any(KEYS.forward) ? 1 : 0) - (any(KEYS.back) ? 1 : 0);
      const kx = (any(KEYS.right) ? 1 : 0) - (any(KEYS.left) ? 1 : 0);
      const cl = (v) => Math.max(-1, Math.min(1, v));
      return { x: cl(kx + touchAxis.x), z: cl(kz + touchAxis.z) };
    },

    /** Subscribe to 'shoot' | 'interact' | 'pause' (and anything else later). */
    onAction(action, fn) {
      if (!handlers.has(action)) handlers.set(action, new Set());
      handlers.get(action).add(fn);
      return () => handlers.get(action).delete(fn);
    },

    /**
     * Accumulated camera drag since the last call, in pixels. T005/T016 pull
     * it once per frame; reading it clears it, so a drag is never applied twice.
     */
    consumeDrag() {
      const d = { x: dragX, y: dragY };
      dragX = 0;
      dragY = 0;
      return d;
    },

    pointer,
    /** Drop all held keys (pause, defeat, duel start: no stuck-W walking). */
    reset() {
      down.clear();
      pointer.down = false;
      pointer.button = -1;
      dragX = 0;
      dragY = 0;
      touchAxis.x = 0;
      touchAxis.z = 0;
      touchRun = false;
      return input;
    },
    /** Read-only view for test hooks. */
    snapshot() {
      const axis = input.moveAxis();
      return {
        down: [...down], x: axis.x, z: axis.z, running: input.isRunning(),
        touch: { x: touchAxis.x, z: touchAxis.z, running: touchRun },
      };
    },
    dispose() {
      target.removeEventListener?.('keydown', onKeyDown);
      target.removeEventListener?.('keyup', onKeyUp);
      target.removeEventListener?.('blur', onBlur);
      dragTarget.removeEventListener?.('mousedown', onPointerDown);
      window.removeEventListener?.('mousemove', onPointerMove);
      window.removeEventListener?.('mouseup', onPointerUp);
      handlers.clear();
      input.reset();
    },
  };

  return input;
}
