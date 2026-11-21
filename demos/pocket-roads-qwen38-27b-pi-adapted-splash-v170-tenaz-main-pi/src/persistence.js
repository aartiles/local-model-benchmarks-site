// Pocket Roads — localStorage persistence (R13).
// Thin wrapper with namespaced keys. Node-importable: pass a stub store,
// or it falls back to an in-memory Map when no localStorage exists.

const PREFIX = "pocketroads.";
const MODES = ["physical", "virtual"];

export const KEYS = {
  anchor: `${PREFIX}anchor`,
  mute: `${PREFIX}mute`,
  mode: `${PREFIX}mode`,
  best: (mode) => `${PREFIX}best.${mode}`,
};

const DEFAULT_ANCHOR = { x: 0.5, y: 0.4 };

function memoryStore() {
  const m = new Map();
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
  };
}

export function resolveStore(store) {
  if (store) return store;
  const ls = typeof globalThis.localStorage !== "undefined" ? globalThis.localStorage : null;
  if (ls) return ls;
  return memoryStore();
}

export function createPersistence(store) {
  const s = resolveStore(store);

  function getAnchor() {
    try {
      const raw = s.getItem(KEYS.anchor);
      if (!raw) return { ...DEFAULT_ANCHOR };
      const a = JSON.parse(raw);
      if (typeof a?.x !== "number" || typeof a?.y !== "number") return { ...DEFAULT_ANCHOR };
      return { x: a.x, y: a.y };
    } catch {
      return { ...DEFAULT_ANCHOR };
    }
  }

  function setAnchor(anchor) {
    const a = {
      x: Number(anchor?.x),
      y: Number(anchor?.y),
    };
    if (!Number.isFinite(a.x) || !Number.isFinite(a.y)) return false;
    s.setItem(KEYS.anchor, JSON.stringify(a));
    return true;
  }

  function getMute() {
    return s.getItem(KEYS.mute) === "1";
  }

  // Game mode (R5/R6): "virtual" (default) or "physical". Persisted so the
  // player's choice survives reloads, alongside the calibration anchor.
  function getMode() {
    const m = s.getItem(KEYS.mode);
    return MODES.includes(m) ? m : "virtual";
  }

  function setMode(mode) {
    if (!MODES.includes(mode)) return false;
    s.setItem(KEYS.mode, mode);
    return true;
  }

  function setMute(muted) {
    s.setItem(KEYS.mute, muted ? "1" : "0");
    return Boolean(muted);
  }

  function toggleMute() {
    return setMute(!getMute());
  }

  function getBest(mode) {
    if (!MODES.includes(mode)) return null;
    const raw = s.getItem(KEYS.best(mode));
    if (raw == null) return null;
    const t = Number(raw);
    return Number.isFinite(t) ? t : null;
  }

  // Only improved (smaller) times replace a stored best.
  function submitBest(mode, time) {
    if (!MODES.includes(mode)) return false;
    const t = Number(time);
    if (!Number.isFinite(t) || t <= 0) return false;
    const current = getBest(mode);
    if (current != null && t >= current) return false;
    s.setItem(KEYS.best(mode), String(t));
    return true;
  }

  return { getAnchor, setAnchor, getMute, setMute, toggleMute, getMode, setMode, getBest, submitBest };
}
