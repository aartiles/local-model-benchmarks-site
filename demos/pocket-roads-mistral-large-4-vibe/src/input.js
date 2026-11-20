// src/input.js — controls.
// Landscape touch: a steering pad on the LEFT and throttle/brake pedals on the
// RIGHT. Multiple simultaneous touches are tracked per pointerId, so steering
// and pedals are fully independent and a release/cancel only clears the control
// that pointer was driving. Desktop: WASD / arrows, Escape handled by the game.
export class Input {
  constructor() {
    // live control state consumed by the game loop
    this.steer = 0;        // -1 .. 1 (smoothed)
    this._steerTarget = 0;
    this.throttle = 0;     // 0 .. 1
    this.brake = 0;        // 0 .. 1
    this._pointers = new Map(); // pointerId -> 'steer' | 'throttle' | 'brake'
    this._keys = new Set();
    this.onEscape = null;  // set by game
    this.onAnyGesture = null;

    this.steerZone = document.getElementById('steerZone');
    this.steerTrack = document.getElementById('steerTrack');
    this.steerPuck = document.getElementById('steerPuck');
    this.throttlePedal = document.getElementById('throttlePedal');
    this.brakePedal = document.getElementById('brakePedal');

    this._bindPointer(this.steerZone, 'steer');
    this._bindPointer(this.throttlePedal, 'throttle');
    this._bindPointer(this.brakePedal, 'brake');

    window.addEventListener('keydown', (e) => this._onKey(e, true));
    window.addEventListener('keyup', (e) => this._onKey(e, false));
    window.addEventListener('blur', () => this._clearKeys());
  }

  _gesture() { if (this.onAnyGesture) this.onAnyGesture(); }

  _bindPointer(el, control) {
    el.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this._gesture();
      try { el.setPointerCapture(e.pointerId); } catch { /* ok */ }
      if (this._pointers.has(e.pointerId)) return;
      this._pointers.set(e.pointerId, control);
      if (control === 'steer') this._updateSteer(e);
      else this._setPedal(control, 1);
      this._paint();
    });
    el.addEventListener('pointermove', (e) => {
      if (this._pointers.get(e.pointerId) !== control) return;
      e.preventDefault();
      if (control === 'steer') this._updateSteer(e);
    });
    const release = (e) => {
      if (this._pointers.get(e.pointerId) !== control) return;
      this._pointers.delete(e.pointerId);
      // release/cancel clears ONLY this control
      if (control === 'steer') this._steerTarget = 0;
      else this._setPedal(control, 0);
      // if another pointer still drives the same control, keep it
      for (const c of this._pointers.values()) if (c === control) return;
      if (control === 'steer') this._steerTarget = 0; else this._setPedal(control, 0);
      this._paint();
    };
    el.addEventListener('pointerup', release);
    el.addEventListener('pointercancel', release);
    el.addEventListener('lostpointercapture', release);
    el.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  _updateSteer(e) {
    const r = this.steerTrack.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const range = r.width * 0.36;
    this._steerTarget = Math.max(-1, Math.min(1, (e.clientX - cx) / range));
  }

  _setPedal(control, v) {
    if (control === 'throttle') this.throttle = v;
    else if (control === 'brake') this.brake = v;
  }

  _onKey(e, down) {
    const k = e.key;
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(k)) e.preventDefault();
    if (down) {
      this._gesture();
      this._keys.add(k);
      if (k === 'Escape' && this.onEscape) { e.preventDefault(); this.onEscape(); }
    } else {
      this._keys.delete(k);
    }
  }

  _clearKeys() { this._keys.clear(); }

  // per-frame: merge keyboard into targets, smooth steering
  update(dt) {
    let kb = 0;
    if (this._keys.has('ArrowLeft') || this._keys.has('a') || this._keys.has('A')) kb -= 1;
    if (this._keys.has('ArrowRight') || this._keys.has('d') || this._keys.has('D')) kb += 1;
    // keyboard steering is digital and overrides the touch pad while held
    const target = kb !== 0 ? kb : this._steerTarget;
    this._steerTarget = target;
    const rate = 7; // 1/s smoothing toward the target
    const d = target - this.steer;
    this.steer += d * Math.min(1, rate * dt);
    if (target === 0 && Math.abs(this.steer) < 0.002) this.steer = 0;

    let th = this.throttle, br = this.brake;
    if (this._keys.has('ArrowUp') || this._keys.has('w') || this._keys.has('W')) th = 1;
    if (this._keys.has('ArrowDown') || this._keys.has('s') || this._keys.has('S')) br = 1;
    this.throttle = th; this.brake = br;
    this._paint();
  }

  _paint() {
    const r = this.steerTrack.getBoundingClientRect();
    const px = (r.width / 2) + this.steer * (r.width * 0.36);
    this.steerPuck.style.left = px + 'px';
    this.throttlePedal.classList.toggle('pressed', this.throttle > 0);
    this.brakePedal.classList.toggle('pressed', this.brake > 0);
  }

  // test/debug helper: drive the same state the UI drives
  _debugSet(steer, throttle, brake) {
    this._steerTarget = steer; this.steer = steer;
    this.throttle = throttle; this.brake = brake;
    this._paint();
  }
}
