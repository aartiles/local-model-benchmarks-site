// Pocket Roads — physical-mode placement (R5).
// Draggable placement marker (assets/mark.svg) over the play area; the saved
// position becomes the camera anchor. Pure core + DOM attach; node-importable
// (no DOM args -> headless anchor state only).

export const DEFAULT_ANCHOR = { x: 0.5, y: 0.4 };

export function clampAnchor(a) {
  return {
    x: Math.min(1, Math.max(0, Number(a?.x) || 0)),
    y: Math.min(1, Math.max(0, Number(a?.y) || 0)),
  };
}

/**
 * createCalibration({ container, marker, saveButton, onSaved, anchor })
 * - container: element the marker is positioned within (percent coords)
 * - marker: the mark.svg element (absolutely positioned)
 * - saveButton: button that commits the anchor via onSaved(anchor)
 * Returns { getAnchor, setAnchor, show, hide, save, isVisible }.
 */
export function createCalibration({ container, marker, saveButton, onSaved, anchor } = {}) {
  const state = { anchor: clampAnchor(anchor ?? DEFAULT_ANCHOR), visible: false, dragging: false };

  function getAnchor() {
    return { ...state.anchor };
  }

  function setAnchor(a) {
    state.anchor = clampAnchor(a);
    render();
  }

  function render() {
    if (!marker) return;
    marker.style.left = `${state.anchor.x * 100}%`;
    marker.style.top = `${state.anchor.y * 100}%`;
  }

  function show() {
    state.visible = true;
    if (container) container.classList.remove("hidden");
    render();
  }

  function hide() {
    state.visible = false;
    state.dragging = false;
    if (container) container.classList.add("hidden");
  }

  function isVisible() {
    return state.visible;
  }

  function save() {
    if (onSaved) onSaved(getAnchor());
    return getAnchor();
  }

  // --- pointer drag (only when DOM elements are provided) ---
  if (container && marker) {
    const fromEvent = (e) => {
      const r = container.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return null;
      return clampAnchor({
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      });
    };
    marker.addEventListener("pointerdown", (e) => {
      state.dragging = true;
      try { marker.setPointerCapture(e.pointerId); } catch { /* stub DOM */ }
      const a = fromEvent(e);
      if (a) setAnchor(a);
      e.preventDefault();
    });
    marker.addEventListener("pointermove", (e) => {
      if (!state.dragging) return;
      const a = fromEvent(e);
      if (a) setAnchor(a);
      e.preventDefault();
    });
    const end = (e) => {
      if (!state.dragging) return;
      state.dragging = false;
      try { marker.releasePointerCapture(e.pointerId); } catch { /* stub DOM */ }
    };
    marker.addEventListener("pointerup", end);
    marker.addEventListener("pointercancel", end);
  }
  if (saveButton) saveButton.addEventListener("click", save);

  return { getAnchor, setAnchor, show, hide, save, isVisible, render };
}
