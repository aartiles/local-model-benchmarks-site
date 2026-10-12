// src/touch.js — first-class touch controls (M05).
//
// Designed for tablet landscape, not "desktop buttons on mobile":
//   * left half of the screen  → virtual joystick (fixed base, 55 px travel)
//   * right half               → camera drag in exploration, aim drag in duels
//   * large FIRE button        → shoot (edge-triggered)
//   * context INTERACT button  → appears only when a prompt is active
//
// Multi-touch is tracked per touch identifier, so the player can move while
// aiming and aim while firing. Every handler preventDefaults, and the page
// is locked against scroll/zoom/select, so a touch can never scroll or
// pinch the page.

export class Touch {
  constructor(dom, input, hud, duel) {
    this.dom = dom;
    this.input = input;
    this.hud = hud;
    this.duel = duel;
    this.enabled = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    this._joyId = null;
    this._aimId = null;
    this._joyBase = { x: 0, y: 0 };
    this._aimLast = { x: 0, y: 0 };
    this._knob = document.getElementById('touch-knob');
    this._joy = document.getElementById('touch-joy');
    this._fire = document.getElementById('touch-action');
    this._interact = document.getElementById('touch-interact');
    if (!this.enabled) return;
    this.input.touchMode = true;
    hud.setTouchMode(true);
    this._attach();
  }

  /** Dev seam (smoke tests): enable touch handling on a desktop page. */
  forceEnable() {
    if (!this.enabled) {
      this.enabled = true;
      this.input.touchMode = true;
      this._attach();
      this.hud.setTouchMode(true);
    }
  }

  _attach() {
    const h = (e) => e.preventDefault();
    // Lock the page: no scroll, no pinch, no select, no double-tap zoom.
    document.addEventListener('touchstart', h, { passive: false });
    document.addEventListener('touchmove', h, { passive: false });
    document.addEventListener('touchend', h, { passive: false });
    document.addEventListener('gesturestart', h);
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    this.dom.addEventListener('touchstart', (e) => {
      for (const t of e.changedTouches) {
        if (t.target !== this.dom) continue; // buttons handle themselves
        if (t.clientX < window.innerWidth * 0.45 && this._joyId === null) {
          this._joyId = t.identifier;
          this._joyBase = { x: t.clientX, y: t.clientY };
          this._joy.style.left = t.clientX + 'px';
          this._joy.style.top = t.clientY + 'px';
          this._joy.classList.add('active');
          this._knob.style.transform = 'translate(-50%, -50%)';
        } else if (this._aimId === null) {
          this._aimId = t.identifier;
          this._aimLast = { x: t.clientX, y: t.clientY };
        }
      }
    }, { passive: false });

    this.dom.addEventListener('touchmove', (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier === this._joyId) {
          let dx = t.clientX - this._joyBase.x;
          let dy = t.clientY - this._joyBase.y;
          const r = Math.hypot(dx, dy);
          if (r > 55) { dx *= 55 / r; dy *= 55 / r; }
          this._knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
          this.input.setJoystick(dx / 55, -dy / 55);
        } else if (t.identifier === this._aimId) {
          const dx = t.clientX - this._aimLast.x;
          const dy = t.clientY - this._aimLast.y;
          this._aimLast = { x: t.clientX, y: t.clientY };
          if (this.duel.active) this.input.aimDX += dx, this.input.aimDY += dy;
          else this.input.cameraDX += dx, this.input.cameraDY += dy;
        }
      }
    }, { passive: false });

    const end = (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier === this._joyId) {
          this._joyId = null;
          this.input.setJoystick(0, 0);
          this._joy.classList.remove('active');
        } else if (t.identifier === this._aimId) {
          this._aimId = null;
        }
      }
    };
    this.dom.addEventListener('touchend', end, { passive: false });
    this.dom.addEventListener('touchcancel', end, { passive: false });

    // FIRE button (large, bottom-right).
    this._fire.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.input.setActionPressed();
    }, { passive: false });
    this._fire.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.input.setActionPressed();
    });
    // INTERACT button (context-sensitive).
    this._interact.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.input.setInteractPressed();
    }, { passive: false });
    this._interact.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.input.setInteractPressed();
    });
  }

  get isTouch() { return this.enabled; }
}
