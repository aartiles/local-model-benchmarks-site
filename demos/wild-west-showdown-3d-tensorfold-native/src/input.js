// src/input.js — desktop keyboard + mouse input (M02).
// Touch input (virtual joystick, drag, action button) lands in M05;
// setJoystick()/setAction() are the seams for it.

const GAME_KEYS = new Set([
  'KeyW', 'KeyA', 'KeyS', 'KeyD',
  'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
  'ShiftLeft', 'ShiftRight', 'Space', 'KeyE',
]);

export class Input {
  constructor({ sensitivity = 0.0045 } = {}) {
    this.sensitivity = sensitivity; // radians per px of camera drag
    this.keys = new Set();
    this.moveX = 0;   // -1..1, recomputed by sample() each frame
    this.moveY = 0;
    this.running = false;
    this.cameraDX = 0; // px accumulated since last endFrame(), consumed by camera
    this.cameraDY = 0;
    this.aimDX = 0;    // px accumulated since last endFrame(), consumed by duel aim
    this.aimDY = 0;
    this.pointerDown = false;
    this.onKey = null; // (code, pressed) => void, used for Esc pause etc.
    this._joystickX = 0;
    this._joystickY = 0;
    this._actionQueued = false;
    this._actionHeld = false;
    this._interactQueued = false;
    this.touchMode = false; // set by the touch module; keyboard is ignored then
    this._lastX = 0;
    this._lastY = 0;
    this._dom = null;
    this._handlers = {};
  }

  attach(dom) {
    this._dom = dom;
    const h = (this._handlers = {});
    h.mousedown = (e) => {
      if (e.button !== 0 && e.button !== 2) return;
      this.pointerDown = true;
      this._lastX = e.clientX;
      this._lastY = e.clientY;
      if (e.button === 0) { this._actionQueued = true; this._actionHeld = true; } // LMB = shoot when appropriate
    };
    h.mousemove = (e) => {
      if (this.pointerDown) {
        this.cameraDX += e.clientX - this._lastX;
        this.cameraDY += e.clientY - this._lastY;
      }
      // Aim follows the mouse at all times (the duel consumes it).
      this.aimDX += e.movementX !== undefined ? e.movementX : (e.clientX - this._lastX);
      this.aimDY += e.movementY !== undefined ? e.movementY : (e.clientY - this._lastY);
      this._lastX = e.clientX;
      this._lastY = e.clientY;
    };
    h.mouseup = (e) => {
      if (e.button === 0 || e.button === 2) this.pointerDown = false;
      if (e.button === 0) this._actionHeld = false;
    };
    h.contextmenu = (e) => e.preventDefault();
    h.keydown = (e) => {
      if (GAME_KEYS.has(e.code)) e.preventDefault();
      if (e.repeat) return;
      this.keys.add(e.code);
      if (e.code === 'Space') { this._actionQueued = true; this._actionHeld = true; }
      if (e.code === 'KeyE') this._interactQueued = true;
      if (this.onKey) this.onKey(e.code, true);
    };
    h.keyup = (e) => {
      this.keys.delete(e.code);
      if (e.code === 'Space') this._actionHeld = false;
      if (this.onKey) this.onKey(e.code, false);
    };
    h.blur = () => this.keys.clear();
    dom.addEventListener('mousedown', h.mousedown);
    window.addEventListener('mousemove', h.mousemove);
    window.addEventListener('mouseup', h.mouseup);
    window.addEventListener('blur', h.blur);
    dom.addEventListener('contextmenu', h.contextmenu);
    window.addEventListener('keydown', h.keydown);
    window.addEventListener('keyup', h.keyup);
  }

  detach() {
    if (!this._dom) return;
    const h = this._handlers;
    this._dom.removeEventListener('mousedown', h.mousedown);
    window.removeEventListener('mousemove', h.mousemove);
    window.removeEventListener('mouseup', h.mouseup);
    window.removeEventListener('blur', h.blur);
    this._dom.removeEventListener('contextmenu', h.contextmenu);
    window.removeEventListener('keydown', h.keydown);
    window.removeEventListener('keyup', h.keyup);
    this._dom = null;
  }

  /** Virtual joystick seam for M05 (values in -1..1, y+ = forward). */
  setJoystick(x, y) {
    this._joystickX = x;
    this._joystickY = y;
  }

  /** Edge-triggered action (shoot); returns true once per press. */
  setActionPressed(down = true) {
    this._actionQueued = true;
    this._actionHeld = down;
  }
  consumeAction() {
    const a = this._actionQueued;
    this._actionQueued = false;
    return a;
  }
  /** Edge-triggered interact (E / touch button). */
  setInteractPressed() {
    this._interactQueued = true;
  }
  consumeInteract() {
    const a = this._interactQueued;
    this._interactQueued = false;
    return a;
  }
  /** Shoot (LMB / Space / touch FIRE): true while the action is pressed. */
  consumeShoot() {
    if (this._actionQueued || this._actionHeld) {
      this._actionQueued = false;
      return true;
    }
    return false;
  }
  /** Edge-only shoot: a NEW press, ignoring a button held from before. Used
   *  for the false-start check so a held trigger can't lose a fresh duel. */
  consumeShootEdge() {
    if (this._actionQueued) {
      this._actionQueued = false;
      return true;
    }
    return false;
  }
  /** Clear any queued/held trigger. Called when a duel starts: a trigger held
   *  from before the duel must not fire on DRAW (0 ms reaction exploit). */
  resetAction() {
    this._actionQueued = false;
    this._actionHeld = false;
  }

  /** Recompute movement axes from held keys (+ joystick). Call each frame. */
  sample() {
    const k = this.keys;
    let x = 0;
    let y = 0;
    if (!this.touchMode) {
      if (k.has('KeyA') || k.has('ArrowLeft')) x -= 1;
      if (k.has('KeyD') || k.has('ArrowRight')) x += 1;
      if (k.has('KeyW') || k.has('ArrowUp')) y += 1;
      if (k.has('KeyS') || k.has('ArrowDown')) y -= 1;
    }
    // Joystick takes over when it has authority.
    const jl = Math.hypot(this._joystickX, this._joystickY);
    if (jl > 0.15) {
      const s = Math.min(jl, 1);
      x = this._joystickX * s;
      y = this._joystickY * s;
    }
    const len = Math.hypot(x, y);
    if (len > 1) {
      x /= len;
      y /= len;
    }
    this.moveX = x;
    this.moveY = y;
    this.running = !this.touchMode && (k.has('ShiftLeft') || k.has('ShiftRight'));
  }

  /** Call at end of each rendered frame. */
  endFrame() {
    this.cameraDX = 0;
    this.cameraDY = 0;
    this.aimDX = 0;
    this.aimDY = 0;
  }
}
