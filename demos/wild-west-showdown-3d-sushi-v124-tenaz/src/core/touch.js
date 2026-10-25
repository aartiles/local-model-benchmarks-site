/**
 * Touch controls (T015, R28/R29/R30/R32) — the tablet-only control layer in
 * #touch: a left virtual movement stick, a clear right-side camera drag area,
 * one large context-sensitive action/shoot button, an interaction control that
 * appears when an interaction is available, and a pause control.
 *
 * It decides NOTHING about the game. It only feeds the same three streams the
 * keyboard and mouse already use (D4 stays intact):
 *   stick            -> input.setTouchMove(x, z, run)   (same vector as WASD)
 *   camera drag      -> input.addDrag(dx, dy)           (same accumulator as mouse)
 *   action / interact / pause -> input.fireAction(...)  (same bus as the keys)
 * so duel.js remains the only shot entry point and player.js/camera-rig.js are
 * untouched by which device produced the input.
 *
 * Multi-touch (R29): every pointer is tracked by its own `pointerId`, and move/
 * up are listened for on `window`, so a stick thumb and a camera thumb work at
 * the same time and neither can steal the other's gesture.
 *
 * No page scroll, zoom or selection (R30): the controls set `touch-action:none`
 * in CSS *and* call preventDefault() on touchstart/touchmove, which is also what
 * stops Chrome firing compatibility mouse events at the canvas underneath (a
 * phantom mousedown there would otherwise fire a shot through input.js).
 *
 * Who gets this layer (R28/R32): ONLY a device whose primary pointer is a finger,
 * i.e. `(pointer: coarse) and (hover: none)`. `navigator.maxTouchPoints` and
 * `'ontouchstart' in window` are deliberately NOT used — every touch-screen
 * laptop reports them while its real pointer is a mouse, and the invisible
 * camera pad would then have eaten the right half of the screen and silently
 * broken mouse aiming and mouse-shoot (T017a). As a second line of defence the
 * pad ignores `pointerType === 'mouse'` and, the moment a mouse pointer is seen
 * anywhere, the layer marks itself `is-mouse` so the pad stops hit-testing the
 * mouse at all and the canvas keeps drags and clicks.
 */

/** Fraction of the stick's radius that counts as full deflection. */
const TRAVEL = 0.42;
/** Inner dead zone, so a resting thumb does not walk. */
const DEAD = 0.12;
/** Beyond this fraction of deflection the cowboy runs. */
const RUN_AT = 0.88;

const clamp = (v, lo = -1, hi = 1) => (Number.isFinite(v) ? Math.max(lo, Math.min(hi, v)) : 0);

function control(cls, part, tag = 'div') {
  const el = document.createElement(tag);
  el.className = `touch-control ${cls}`;
  el.setAttribute('data-part', part);
  el.setAttribute('data-role', part);
  if (tag === 'button') { el.type = 'button'; el.setAttribute('aria-label', part); }
  return el;
}

/**
 * @param {object} opts.input    the input module to feed (required)
 * @param {object} opts.root     container; defaults to #touch
 * @param {Function} opts.context  () => { action, label, interact } — what the
 *   button currently means. `enabled` is NOT part of this contract: the layer's
 *   own pointer gate decides whether it is on screen at all.
 */
export function createTouchControls({ input, root = document.getElementById('touch'), context = null } = {}) {
  if (!root) throw new Error('createTouchControls: no container element');

  const camera = control('touch-camera', 'touch-camera');
  const stick = control('touch-stick', 'touch-stick');
  const knob = control('touch-knob', 'touch-knob');
  // Not a .touch-control: it must never be the hit target, the stick is.
  knob.className = 'touch-knob';
  stick.appendChild(knob);
  const action = control('touch-action', 'touch-action', 'button');
  const actionLabel = document.createElement('span');
  actionLabel.className = 'touch-action-label';
  actionLabel.setAttribute('data-part', 'touch-action-label');
  action.appendChild(actionLabel);
  const interact = control('touch-interact', 'touch-interact', 'button');
  interact.textContent = 'USE';
  const pause = control('touch-pause', 'touch-pause', 'button');
  pause.textContent = 'II';

  root.appendChild(camera);
  root.appendChild(stick);
  root.appendChild(action);
  root.appendChild(interact);
  root.appendChild(pause);

  /** pointerId -> { kind, x, y, ... } — the whole multi-touch story. */
  const active = new Map();
  let stickId = null;
  let cameraId = null;
  let enabled = false;
  let lastContext = '';
  /** True while a mouse pointer is the one in use — the pad must not claim it. */
  let mouseMode = false;

  const rectOf = (el) => el.getBoundingClientRect();

  function setMouseMode(flag) {
    const on = !!flag;
    if (on === mouseMode) return;
    mouseMode = on;
    root.classList.toggle('is-mouse', on);
  }

  function pushStick(event) {
    const r = rectOf(stick);
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const reach = Math.max(1, r.width * TRAVEL);
    const dx = (event.clientX - cx) / reach;
    const dy = (event.clientY - cy) / reach;
    const mag = Math.hypot(dx, dy);
    if (mag < DEAD) {
      input.setTouchMove(0, 0, false);
    } else {
      // Screen up = forward, so the stick reads like a gamepad thumbstick.
      const s = mag > 1 ? 1 / mag : 1;
      input.setTouchMove(clamp(dx * s), clamp(-dy * s), mag >= RUN_AT);
    }
    const kx = clamp(dx, -1, 1) * r.width * TRAVEL;
    const ky = clamp(dy, -1, 1) * r.height * TRAVEL;
    knob.style.transform = `translate(${kx.toFixed(1)}px, ${ky.toFixed(1)}px)`;
  }

  function onDown(event) {
    if (!enabled) return;
    if (event.pointerType === 'mouse' && event.target === camera) setMouseMode(true);
    const kind = event.currentTarget === camera ? 'camera'
      : event.currentTarget === stick ? 'stick'
        : event.currentTarget === action ? 'action'
          : event.currentTarget === interact ? 'interact'
            : event.currentTarget === pause ? 'pause' : null;
    if (!kind) return;
    // The camera pad is a finger surface. A mouse pointer that lands on it must
    // not be claimed here, or mouse aiming/shoot (T017a) would be swallowed.
    if (kind === 'camera' && event.pointerType === 'mouse') return;
    // One stick and one camera finger at a time; a second finger on either is
    // ignored rather than stealing the live gesture (R29).
    if (kind === 'stick' && stickId !== null) return;
    if (kind === 'camera' && cameraId !== null) return;
    active.set(event.pointerId, { kind, x: event.clientX, y: event.clientY, fired: false });
    if (kind === 'stick') { stickId = event.pointerId; pushStick(event); }
    if (kind === 'camera') cameraId = event.pointerId;
    if (kind === 'action') fireControl('action', event);
    if (kind === 'interact') fireControl('interact', event);
    if (kind === 'pause') fireControl('pause', event);
    try { event.currentTarget.setPointerCapture?.(event.pointerId); } catch { /* synthetic pointer */ }
  }

  /** One press = one action, and only while the control is offered (R29/R40). */
  function fireControl(kind, event) {
    const rec = active.get(event.pointerId);
    if (!rec || rec.fired) return;
    rec.fired = true;
    if (kind === 'action') {
      const c = current();
      if (c.action) input.fireAction(c.action, { source: 'touch', part: 'touch-action' });
    } else if (kind === 'interact') {
      input.fireAction('interact', { source: 'touch', part: 'touch-interact' });
    } else if (kind === 'pause') {
      input.fireAction('pause', { source: 'touch', part: 'touch-pause' });
    }
  }

  function onMove(event) {
    // Whichever pointer is in use right now decides whether the invisible camera
    // pad may hit-test it at all (R28/R32: a mouse must reach the canvas).
    // A mouse only claims the layer when it is actually over the pad: a stray
    // cursor move (or a check clicking a DOM button) must not switch the pad off
    // for the finger user who owns this device.
    if (event.pointerType === 'mouse') {
      if (event.target === camera) setMouseMode(true);
    } else if (event.pointerType === 'touch' || event.pointerType === 'pen') {
      setMouseMode(false);
    }
    const rec = active.get(event.pointerId);
    if (!rec) return;
    if (rec.kind === 'stick') { pushStick(event); return; }
    if (rec.kind === 'camera') {
      input.addDrag(event.clientX - rec.x, event.clientY - rec.y);
      rec.x = event.clientX;
      rec.y = event.clientY;
      return;
    }
    // A button keeps tracking its finger so a slide-off releases cleanly.
    rec.x = event.clientX;
    rec.y = event.clientY;
  }

  function onUp(event) {
    const rec = active.get(event.pointerId);
    if (!rec) return;
    active.delete(event.pointerId);
    if (rec.kind === 'stick') {
      stickId = null;
      input.setTouchMove(0, 0, false);
      knob.style.transform = 'translate(0px, 0px)';
    } else if (rec.kind === 'camera') {
      cameraId = null;
    }
  }

  /** R30: kill scroll, pinch-zoom, long-press selection and mouse emulation. */
  function onTouch(event) { event.preventDefault?.(); }
  function onContextMenu(event) { event.preventDefault?.(); }

  /** Every listener we add, so dispose() can remove exactly these (no leaks). */
  const bindings = [];
  const bind = (el, type, fn, opts) => {
    el.addEventListener(type, fn, opts);
    bindings.push([el, type, fn, opts]);
  };

  for (const el of [camera, stick, action, interact, pause]) {
    bind(el, 'pointerdown', onDown);
    bind(el, 'touchstart', onTouch, { passive: false });
    bind(el, 'touchmove', onTouch, { passive: false });
    bind(el, 'touchend', onTouch, { passive: false });
    bind(el, 'contextmenu', onContextMenu);
  }
  bind(window, 'pointermove', onMove);
  bind(window, 'pointerup', onUp);
  bind(window, 'pointercancel', onUp);

  function current() {
    const c = context ? context() : null;
    return {
      action: c && c.action ? c.action : null,
      label: (c && c.label) || 'WAIT',
      interact: !!(c && c.interact),
    };
  }

  /** Called once per frame from main.js; idempotent DOM writes only. */
  function update() {
    const c = current();
    const key = `${c.action}|${c.label}|${c.interact}|${enabled}`;
    if (key === lastContext) return c;
    lastContext = key;
    actionLabel.textContent = c.label;
    action.classList.toggle('is-wait', !c.action);
    action.setAttribute('data-action', c.action || 'none');
    interact.classList.toggle('is-on', c.interact);
    interact.setAttribute('data-available', c.interact ? '1' : '0');
    return c;
  }

  const api = {
    root, camera, stick, knob, action, interact, pause,
    get enabled() { return enabled; },
    get mouseMode() { return mouseMode; },
    get pointers() { return active.size; },
    /** Show/hide the layer. Off on a keyboard-and-mouse desktop (R28/R32). */
    setEnabled(flag) {
      enabled = !!flag;
      root.classList.toggle('is-active', enabled);
      if (!enabled) {
        active.clear();
        stickId = null;
        cameraId = null;
        input.setTouchMove(0, 0, false);
        lastContext = '';
      }
      return enabled;
    },
    update,
    snapshot() {
      const r = {};
      for (const [name, el] of [['camera', camera], ['stick', stick], ['action', action], ['interact', interact], ['pause', pause]]) {
        const b = rectOf(el);
        r[name] = { x: b.x, y: b.y, w: b.width, h: b.height };
      }
      return {
        enabled,
        mouseMode,
        pointers: [...active.values()].map((p) => p.kind),
        axis: { ...input.snapshot().touch },
        running: input.isRunning(),
        ...update(),
        rects: r,
      };
    },
    dispose() {
      for (const [el, type, fn, opts] of bindings) el.removeEventListener(type, fn, opts);
      bindings.length = 0;
      active.clear();
      stickId = null;
      cameraId = null;
      setMouseMode(false);
      input.setTouchMove(0, 0, false);
    },
  };

  // R28/R32: only a device whose PRIMARY pointer is a finger gets this layer.
  // `(pointer: coarse) and (hover: none)` is that question. maxTouchPoints and
  // 'ontouchstart' are not: a touch-screen laptop reports both while driving a
  // mouse, and the invisible camera pad would then have swallowed every click
  // and drag over the right half of the screen (T017a regression).
  const fingerPrimary = typeof window !== 'undefined'
    && !!window.matchMedia?.('(pointer: coarse) and (hover: none)').matches;
  api.setEnabled(fingerPrimary);

  return api;
}
