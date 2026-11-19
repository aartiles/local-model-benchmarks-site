// src/calibration.js — the physical-mode setup screen (R17, R18, R19).
//
// A toy car sits somewhere on the tablet, and the camera has to be told where. This
// module is the "where": the setup shows the play area with the placement marker
// (assets/mark.svg) on top of it, turns a tap or a drag inside that area into a
// NORMALIZED anchor (0–1 of the viewport, so it survives a resize — T023 turns it into
// a pixel target), and asks main.js to save it. It also owns the mode switch, the one
// control that is visible in both modes.
//
// What it deliberately does NOT do:
//   * it does not touch localStorage — persist.js is the only storage door, so
//     main.js's setCalibration()/setMode() stay the single source of truth (R34, R35);
//   * it does not hide the car — car.js's setMode() does that (R17), main.js calls it;
//   * it does not move the camera — T023 reads the anchor.
//
// The setup's touches are cancelled as browser gestures but are NOT kept from input.js,
// which listens on the whole document: that is the convention every other control in this
// app follows, and the T025 layout gate measures that a tap on a visible control reaches
// the page's pointer handling. main.js holds their EFFECT on the run while the setup is
// open, so a placement tap in the right half does not start the clock (R22).

import { assetUrl, MARK } from './assets.js';

/** The ids of the setup UI, all static markup in index.html. */
export const CALIBRATION_IDS = {
  panel: 'calibration',
  area: 'calibration-area',
  marker: 'calibration-marker',
  switch: 'mode-switch',
  virtual: 'mode-virtual',
  physical: 'mode-physical',
  save: 'btn-calibration-save',
  close: 'btn-calibration-close',
};

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const isNum = (v) => typeof v === 'number' && Number.isFinite(v);

/**
 * The setup instance for a page.
 *
 * @param {object} options
 *   document/window  the page (injectable for a Node test)
 *   anchor           the saved {x,y} in 0–1 of the viewport, or null
 *   mode             'virtual' | 'physical' as the page booted
 *   onAnchor(anchor) called when a placement is finished (pointerup / Save) — main.js
 *                    persists it; the setup never writes storage itself
 *   onMode(mode)     called by the mode switch — main.js persists it, hides the car
 *                    and re-points the camera
 */
export function createCalibration(options = {}) {
  const doc = options.document !== undefined ? options.document : (typeof document !== 'undefined' ? document : null);
  const win = options.window !== undefined ? options.window : (typeof window !== 'undefined' ? window : undefined);
  const onAnchor = typeof options.onAnchor === 'function' ? options.onAnchor : () => {};
  const onMode = typeof options.onMode === 'function' ? options.onMode : () => {};
  const el = (id) => (doc && doc.getElementById ? doc.getElementById(id) : null);

  const els = {
    panel: el(CALIBRATION_IDS.panel),
    area: el(CALIBRATION_IDS.area),
    marker: el(CALIBRATION_IDS.marker),
    switch: el(CALIBRATION_IDS.switch),
    virtual: el(CALIBRATION_IDS.virtual),
    physical: el(CALIBRATION_IDS.physical),
    save: el(CALIBRATION_IDS.save),
    close: el(CALIBRATION_IDS.close),
  };

  let anchor = options.anchor && isNum(options.anchor.x) && isNum(options.anchor.y)
    ? { x: options.anchor.x, y: options.anchor.y }
    : null;
  let mode = options.mode === 'physical' ? 'physical' : 'virtual';
  let open = false;
  // pointerIds currently placing the toy, so a second finger does not fight the first.
  const active = new Set();

  // The marker image: the supplied mark.svg, from the loader's own URL builder so the
  // nested-path case keeps working (R37) — never a host-rooted or absolute path.
  let img = els.marker ? els.marker.querySelector('img') : null;
  if (els.marker && doc && !img) {
    img = doc.createElement('img');
    img.alt = '';
    img.decoding = 'async';
    img.draggable = false;
    els.marker.appendChild(img);
  }
  if (img && !img.getAttribute('src')) {
    try {
      img.src = assetUrl(MARK);
    } catch {
      /* no document base to resolve against; the marker still shows its own box */
    }
  }

  // ------------------------------------------------------------------ geometry --

  function viewport() {
    const W = (win && win.innerWidth) || (doc && doc.documentElement && doc.documentElement.clientWidth) || 0;
    const H = (win && win.innerHeight) || (doc && doc.documentElement && doc.documentElement.clientHeight) || 0;
    return { W, H };
  }

  function rect(node) {
    if (!node || !node.getBoundingClientRect) return null;
    const r = node.getBoundingClientRect();
    return r.width > 0 && r.height > 0 ? r : null;
  }

  /** Where the anchor sits in viewport pixels (the point T023 anchors the camera on). */
  function anchorPx() {
    const { W, H } = viewport();
    if (!anchor || !W || !H) return null;
    return { x: anchor.x * W, y: anchor.y * H };
  }

  /**
   * Put the marker on its anchor. The marker is a box, so near an edge it is pulled
   * back inside the play area — the ANCHOR keeps the exact tapped point, only the
   * artwork is clamped, so a placement is never silently rounded.
   */
  function layout() {
    if (!els.marker || !els.area) return null;
    const area = rect(els.area);
    if (!area) return null;
    const box = els.marker.getBoundingClientRect();
    const point = anchorPx() || { x: area.left + area.width / 2, y: area.top + area.height / 2 };
    const left = Math.min(Math.max(point.x - area.left - box.width / 2, 0), Math.max(0, area.width - box.width));
    const top = Math.min(Math.max(point.y - area.top - box.height / 2, 0), Math.max(0, area.height - box.height));
    els.marker.style.left = `${left.toFixed(1)}px`;
    els.marker.style.top = `${top.toFixed(1)}px`;
    return { left: left + area.left, top: top + area.top, w: box.width, h: box.height };
  }

  function insideArea(x, y) {
    const area = rect(els.area);
    if (!area) return false;
    return x >= area.left - 0.5 && x <= area.right + 0.5 && y >= area.top - 0.5 && y <= area.bottom + 0.5;
  }

  /** R18: a point on the glass becomes a normalized anchor of the viewport. */
  function place(x, y) {
    const { W, H } = viewport();
    if (!W || !H) return null;
    anchor = { x: clamp01(x / W), y: clamp01(y / H) };
    layout();
    paint();
    return anchor;
  }

  // --------------------------------------------------------------- persistence --
  function save() {
    if (!anchor) return null;
    onAnchor({ x: anchor.x, y: anchor.y });
    return anchor;
  }

  // ------------------------------------------------------------------- the view --
  function paint() {
    if (els.panel) {
      els.panel.dataset.mode = mode;
      els.panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    }
    for (const [key, node] of [['virtual', els.virtual], ['physical', els.physical]]) {
      if (!node) continue;
      node.setAttribute('aria-pressed', mode === key ? 'true' : 'false');
      node.dataset.active = mode === key ? 'true' : 'false';
    }
    if (els.switch) els.switch.dataset.mode = mode;
    if (els.marker) {
      const point = anchorPx();
      els.marker.setAttribute('aria-label', point ? `Toy position, ${Math.round(point.x)} by ${Math.round(point.y)} pixels` : 'Toy position, not placed yet');
      // The dimmed look of an unplaced marker (ui.css) is driven from the anchor, so
      // the state is reachable instead of dead CSS.
      els.marker.dataset.placed = anchor ? 'true' : 'false';
    }
    if (els.save) els.save.disabled = !anchor;
  }

  /** Show or put away the setup panel. Hiding is `hidden` (display:none), never opacity. */
  function show(next) {
    open = !!next;
    if (els.panel) els.panel.hidden = !open;
    // The ready banner is word fragments behind this panel, so it is put away while the
    // setup is open (ui.css reads this attribute). The run state itself is untouched.
    if (doc && doc.body) doc.body.dataset.setup = open ? 'open' : 'closed';
    paint();
    if (open) layout();
    return open;
  }

  function setMode(next) {
    mode = next === 'physical' ? 'physical' : 'virtual';
    // R17/R18: physical mode is where the toy gets placed, so entering it opens setup;
    // leaving it puts the screen away and shows the digital car again (main.js).
    show(mode === 'physical');
    return mode;
  }

  /** What the player can see, measured from the DOM rather than from a flag. */
  function visible() {
    if (!els.panel || els.panel.hidden) return false;
    const r = rect(els.panel);
    if (!r) return false;
    const cs = typeof getComputedStyle === 'function' ? getComputedStyle(els.panel) : null;
    if (cs && (cs.display === 'none' || cs.visibility === 'hidden')) return false;
    return true;
  }

  // -------------------------------------------------------------------- pointers --
  // The setup's touches are cancelled as BROWSER gestures (scroll, zoom, drag-image) but
  // the event is deliberately allowed to keep bubbling to window, like every other
  // control in this app: input.js listens on the document, and the T025 layout gate
  // measures that a tap on any visible control reaches the page's pointer handling.
  // Nothing here calls stopPropagation.
  function ignore(e) {
    if (!e) return;
    if (e.cancelable && typeof e.preventDefault === 'function') e.preventDefault();
  }

  function onDown(e) {
    if (!open) return;
    const id = e.pointerId;
    if (id !== undefined && active.has(id)) return;
    ignore(e);
    if (!insideArea(e.clientX, e.clientY)) return;
    if (id !== undefined) active.add(id);
    place(e.clientX, e.clientY);
    if (els.area && els.area.setPointerCapture && id !== undefined) {
      try {
        els.area.setPointerCapture(id);
      } catch {
        /* the release handlers are on the area and on the window too */
      }
    }
  }

  function onMove(e) {
    const id = e.pointerId;
    if (id === undefined || !active.has(id)) return;
    ignore(e);
    place(e.clientX, e.clientY);
  }

  function onUp(e) {
    const id = e.pointerId;
    if (id === undefined || !active.has(id)) return;
    active.delete(id);
    ignore(e);
    if (insideArea(e.clientX, e.clientY)) place(e.clientX, e.clientY);
    save(); // R18: the selected position is saved
  }

  // A button responds to a thumb the moment it lands (a click after a touch is late on
  // a tablet) and to a keyboard Enter/click, so it works with a mouse too. Both paths
  // are idempotent. Like every other control here the event keeps bubbling, so the page's
  // own pointer handling sees it (the T025 gate measures exactly that).
  function press(node, fn) {
    if (!node || !node.addEventListener) return;
    const act = (e) => {
      ignore(e);
      fn();
    };
    node.addEventListener('pointerdown', act);
    node.addEventListener('click', act);
  }

  const listeners = [];
  function on(node, type, fn) {
    if (!node || !node.addEventListener) return;
    node.addEventListener(type, fn);
    listeners.push([node, type, fn]);
  }

  on(els.area, 'pointerdown', onDown);
  on(els.area, 'pointermove', onMove);
  on(els.area, 'pointerup', onUp);
  on(els.area, 'pointercancel', onUp);
  // input.js may take the pointer away from the area (it captures a thumb on the pad it
  // pressed), and a captured pointer sends its moves to the capture target, not to us.
  // Listening on the window too keeps a placement drag alive whatever the pads do —
  // events still bubble from the capture target up to the window.
  if (win && win.addEventListener) {
    on(win, 'pointermove', onMove);
    // A pointer that escaped the panel (the browser stole it) still saves what it placed.
    on(win, 'pointerup', onUp);
    on(win, 'pointercancel', onUp);
  }
  // The marker is inside the area, so its own taps bubble to the area's handler; it is
  // a control, so it must not let the browser scroll or zoom under a dragging thumb.
  press(els.virtual, () => onMode('virtual'));
  press(els.physical, () => onMode('physical'));
  press(els.save, () => save());
  press(els.close, () => show(false));

  // Keyboard placement on the marker: arrows nudge it, so the setup is reachable
  // without a touch screen (R15's keyboard is for driving, not for this). Like a drag,
  // the nudging is live and the SAVE happens when the key lifts — persist.js is written
  // once per placement, not once per auto-repeat.
  on(els.marker, 'keydown', (e) => {
    const step = e.shiftKey ? 0.05 : 0.01;
    const dx = e.key === 'ArrowLeft' ? -step : e.key === 'ArrowRight' ? step : 0;
    const dy = e.key === 'ArrowUp' ? -step : e.key === 'ArrowDown' ? step : 0;
    if (!dx && !dy) return;
    if (e.cancelable) e.preventDefault();
    e.stopPropagation();
    const { W, H } = viewport();
    const base = anchor || { x: 0.5, y: 0.5 };
    place((clamp01(base.x + dx)) * W, (clamp01(base.y + dy)) * H);
  });
  on(els.marker, 'keyup', (e) => {
    if (!/^Arrow(Left|Right|Up|Down)$/.test(e.key)) return;
    e.stopPropagation();
    save(); // R18: the selected position is saved, once the placement is finished
  });

  if (win && win.addEventListener) {
    const onResize = () => layout();
    win.addEventListener('resize', onResize);
    listeners.push([win, 'resize', onResize]);
  }

  // The panel starts hidden; main.js opens it when the stored mode is physical.
  show(false);
  paint();

  return {
    ids: CALIBRATION_IDS,
    els,
    /** The live anchor in 0–1 of the viewport, or null before the first placement. */
    anchor: () => (anchor ? { x: anchor.x, y: anchor.y } : null),
    hasAnchor: () => !!anchor,
    /** main.js calls this after persist.js has accepted an anchor from anywhere. */
    setAnchor(next) {
      anchor = next && isNum(next.x) && isNum(next.y) ? { x: next.x, y: next.y } : null;
      layout();
      paint();
      return anchor;
    },
    place,
    save,
    layout,
    show,
    visible: () => visible(),
    /** R19: the marker's own box, so a check reads what the player sees. */
    markerBox: () => rect(els.marker),
    areaBox: () => rect(els.area),
    anchorPx,
    viewport,
    setMode,
    mode: () => mode,
    /** The mode the switch says the player is in — main.js is still the owner. */
    switchMode(next) {
      onMode(next);
      return mode;
    },
    uninstall() {
      active.clear();
      for (const [node, type, fn] of listeners.splice(0)) node.removeEventListener(type, fn);
      show(false);
    },
  };
}
