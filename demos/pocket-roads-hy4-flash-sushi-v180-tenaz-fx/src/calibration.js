// Toy placement for the physical camera. Coordinates are normalised to the
// play area, clamped to [0,1] and mirrored by the CSS percentage marker.
const DEFAULT = { x: 0.38, y: 0.62 };
const clamp01 = (value) => Math.min(1, Math.max(0, Number(value) || 0));
const percent = (value) => `${Number((value * 100).toFixed(4))}%`;

export function createCalibration(root, storage, handlers = {}) {
  const area = root || document.getElementById('play-area');
  const marker = document.getElementById('marker');
  const anchor = { ...DEFAULT };
  let activePointer = null;

  function setAnchor(x, y, options = {}) {
    const next = { x: clamp01(x), y: clamp01(y) };
    anchor.x = next.x;
    anchor.y = next.y;
    if (marker) {
      marker.style.left = percent(next.x);
      marker.style.top = percent(next.y);
      marker.dataset.anchorX = String(next.x);
      marker.dataset.anchorY = String(next.y);
    }
    if (area) area.dataset.anchor = `${next.x},${next.y}`;
    if (options.persist !== false && storage && typeof storage.save === 'function') {
      storage.save('calibration', { ...next });
    }
    if (options.notify !== false && typeof handlers.onChange === 'function') {
      handlers.onChange({ ...next });
    }
    return { ...next };
  }

  function showMarker() {
    if (marker) marker.hidden = false;
  }

  function hideMarker() {
    if (marker) marker.hidden = true;
  }

  // Buttons and overlay panels keep their own gestures; the rest of the play
  // area (including the overlay background) places the toy.
  function interactive(target) {
    return target instanceof Element && Boolean(target.closest('button, a, input, select, textarea, .panel'));
  }

  function enabled() {
    return typeof handlers.isEnabled !== 'function' || handlers.isEnabled();
  }

  function place(event) {
    if (!area || !enabled() || interactive(event.target)) return;
    const rect = area.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    setAnchor(
      (event.clientX - rect.left) / rect.width,
      (event.clientY - rect.top) / rect.height
    );
  }

  function onDown(event) {
    if (activePointer !== null || (event.pointerType === 'mouse' && event.button !== 0)) return;
    if (!enabled() || interactive(event.target)) return;
    activePointer = event.pointerId;
    place(event);
    try {
      area.setPointerCapture(event.pointerId);
    } catch {}
  }

  function onMove(event) {
    if (event.pointerId !== activePointer) return;
    place(event);
  }

  function onUp(event) {
    if (event.pointerId !== activePointer) return;
    place(event);
    activePointer = null;
    try {
      area.releasePointerCapture(event.pointerId);
    } catch {}
  }

  function onCancel(event) {
    if (event.pointerId === activePointer) activePointer = null;
  }

  area?.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointercancel', onCancel);

  return {
    anchor,
    setAnchor,
    showMarker,
    hideMarker,
    destroy() {
      area?.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onCancel);
      activePointer = null;
    },
  };
}

export default createCalibration;
