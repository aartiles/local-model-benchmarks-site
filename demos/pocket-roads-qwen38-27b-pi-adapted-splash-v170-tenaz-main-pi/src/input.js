// Pocket Roads — Midnight Pass: input module.
//
// Exposes a single input state { steer: -1..1, throttle: 0..1, brake: 0..1 }
// combining touch pads (Pointer Events, per-pointer tracked) and keyboard
// (WASD / arrows). Escape fires a pause callback.
//
// Pure and node-importable: createInput() with no DOM args returns a stub
// whose state stays at rest until key()/pointer() are called programmatically.
// With a real DOM (or stub DOM) it wires up the pad elements and window.

const KEYMAP = {
  ArrowLeft: "steerL", KeyA: "steerL",
  ArrowRight: "steerR", KeyD: "steerR",
  ArrowUp: "throttle", KeyW: "throttle",
  ArrowDown: "brake", KeyS: "brake",
};

export function createInput({ document: doc, window: win, onPause } = {}) {
  const hasDom = !!(doc && win);
  const keys = new Set();
  const pointers = new Map(); // pointerId -> { control, value }
  const state = { steer: 0, throttle: 0, brake: 0 };

  function recompute() {
    let steer = (keys.has("steerR") ? 1 : 0) - (keys.has("steerL") ? 1 : 0);
    let throttle = keys.has("throttle") ? 1 : 0;
    let brake = keys.has("brake") ? 1 : 0;
    for (const p of pointers.values()) {
      if (p.control === "steer") steer += p.value;
      else if (p.control === "throttle") throttle = Math.max(throttle, p.value);
      else if (p.control === "brake") brake = Math.max(brake, p.value);
    }
    state.steer = Math.max(-1, Math.min(1, steer));
    state.throttle = Math.max(0, Math.min(1, throttle));
    state.brake = Math.max(0, Math.min(1, brake));
  }

  // --- Keyboard ------------------------------------------------------------
  function onKey(e, down) {
    const k = KEYMAP[e.code];
    if (!k) return;
    if (down) keys.add(k); else keys.delete(k);
    recompute();
  }
  function onEscape(e) {
    if (e.code !== "Escape") return;
    if (onPause) onPause();
  }

  // --- Touch pads (Pointer Events, per-pointer tracked) --------------------
  // steer pad: horizontal position within the pad -> -1..1
  // throttle pad: vertical (up) -> 0..1
  // brake pad: vertical (down) -> 0..1
  function padValue(el, e, control) {
    const r = el.getBoundingClientRect();
    if (control === "steer") {
      const x = (e.clientX - r.left) / Math.max(1, r.width);
      return Math.max(-1, Math.min(1, (x - 0.5) * 2));
    }
    // throttle: top of pad = full; brake: bottom = full
    const y = (e.clientY - r.top) / Math.max(1, r.height);
    return Math.max(0, Math.min(1, control === "throttle" ? 1 - y : y));
  }

  function attachPad(el, control) {
    if (!el) return;
    el.addEventListener("pointerdown", (e) => {
      el.setPointerCapture && el.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, { control, value: padValue(el, e, control) });
      recompute();
    });
    el.addEventListener("pointermove", (e) => {
      const p = pointers.get(e.pointerId);
      if (!p || p.control !== control) return;
      p.value = padValue(el, e, control);
      recompute();
    });
    const release = (e) => {
      const p = pointers.get(e.pointerId);
      if (!p || p.control !== control) return;
      pointers.delete(e.pointerId);
      recompute();
    };
    el.addEventListener("pointerup", release);
    el.addEventListener("pointercancel", release);
  }

  if (hasDom) {
    win.addEventListener("keydown", (e) => { onKey(e, true); onEscape(e); });
    win.addEventListener("keyup", (e) => onKey(e, false));
    attachPad(doc.getElementById("pad-steer"), "steer");
    attachPad(doc.getElementById("pad-throttle"), "throttle");
    attachPad(doc.getElementById("pad-brake"), "brake");
  }

  return {
    state,
    recompute,
    // Programmatic hooks (used by the node check with a stub DOM).
    key(code, down) { onKey({ code }, down); },
    escape() { onEscape({ code: "Escape" }); },
    pointerDown(el, pointerId, clientX, clientY) {
      const control = el.dataset ? el.dataset.input : el.getAttribute("data-input");
      pointers.set(pointerId, { control, value: padValue(el, { clientX, clientY }, control) });
      recompute();
    },
    pointerMove(el, pointerId, clientX, clientY) {
      const p = pointers.get(pointerId);
      if (!p) return;
      const control = el.dataset ? el.dataset.input : el.getAttribute("data-input");
      if (p.control !== control) return;
      p.value = padValue(el, { clientX, clientY }, control);
      recompute();
    },
    pointerUp(pointerId) {
      pointers.delete(pointerId);
      recompute();
    },
  };
}

export default createInput;
