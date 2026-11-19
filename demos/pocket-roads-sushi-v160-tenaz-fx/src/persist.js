// src/persist.js — the one place that touches localStorage (R34, R35).
//
// Everything the game remembers lives as ONE JSON string under a single namespaced
// key, `pocketroads.midnight.v1`, so a reload restores the calibration anchor, the
// sound/mute state and the personal bests (R34), and the bests are kept per mode —
// `physical` and `virtual` never share a slot (R35).
//
// Two rules this file keeps, because the alternative is a broken boot:
//   * localStorage may THROW (private mode, a full quota, a browser that refuses
//     storage on file://). Every read and write is wrapped, and a throw is a miss,
//     not an error: the caller gets the default.
//   * the stored string may be CORRUPT (half-written, hand-edited, an older shape).
//     A read validates the parsed value field by field and falls back to the default
//     for anything it does not recognise, so one bad field cannot poison the rest.
//
// It is storage, not policy: no DOM, no THREE, no module-level storage access, so a
// Node check can import it too (it then reads and writes the defaults, which is the
// same fallback a browser with no storage gets).

// The single namespaced key. Nothing else is ever written to localStorage.
export const STORAGE_KEY = 'pocketroads.midnight.v1';

// R35: the two bests slots. The mode is owned HERE, not by the physical-mode UI
// (T022), because the race needs a current mode to record into before that UI exists.
export const MODES = ['virtual', 'physical'];
export const DEFAULT_MODE = 'virtual';

/** The record a fresh install has: no anchor, sound on, virtual mode, no bests. */
export function defaults() {
  return { calibration: null, muted: false, mode: DEFAULT_MODE, bests: { virtual: null, physical: null } };
}

// ----------------------------------------------------------------- validation --

/** A calibration anchor: a plain object with finite x and y (T022 stores it 0–1). */
export function isAnchor(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  return Number.isFinite(value.x) && Number.isFinite(value.y);
}

function anchorOf(value) {
  if (!isAnchor(value)) return null;
  // A shallow copy of the own fields, so a stored anchor cannot hold a live object.
  const out = {};
  for (const key of Object.keys(value)) {
    const v = value[key];
    if (typeof v === 'number' || typeof v === 'string' || typeof v === 'boolean' || v === null) out[key] = v;
  }
  return out;
}

/** A best time: a finite, non-negative number of milliseconds, or null for "none". */
function bestMs(value) {
  const t = Number(value);
  if (value === null || value === undefined || !Number.isFinite(t) || t < 0) return null;
  return t;
}

function modeOf(value, fallback = DEFAULT_MODE) {
  return MODES.includes(value) ? value : fallback;
}

/**
 * Fill every field the record is allowed to have, from `source`, falling back to
 * `base` for anything missing or of the wrong shape. This is what makes a corrupt
 * store read as defaults rather than throwing at the caller.
 */
export function normalize(source, base = defaults()) {
  const src = source && typeof source === 'object' && !Array.isArray(source) ? source : {};
  const bests = src.bests && typeof src.bests === 'object' && !Array.isArray(src.bests) ? src.bests : {};
  return {
    calibration: anchorOf(src.calibration),
    muted: src.muted === undefined ? !!base.muted : !!src.muted,
    mode: modeOf(src.mode, base.mode),
    bests: {
      virtual: bestMs(bests.virtual),
      physical: bestMs(bests.physical),
    },
  };
}

// -------------------------------------------------------------------- storage --

/** The storage object, or null when it is missing or throws (private mode). */
function storage() {
  try {
    const ls = globalThis.localStorage;
    if (!ls || typeof ls.getItem !== 'function' || typeof ls.setItem !== 'function') return null;
    return ls;
  } catch {
    return null;
  }
}

/** Whether this page can persist at all — the UI may say so, the game never stops. */
export function available() {
  return storage() !== null;
}

/** The whole record, validated. Never throws; a miss reads as the defaults. */
export function read() {
  const ls = storage();
  if (!ls) return defaults();
  let raw = null;
  try {
    raw = ls.getItem(STORAGE_KEY);
  } catch {
    return defaults();
  }
  if (raw === null || raw === undefined) return defaults();
  let parsed = null;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return defaults(); // corrupt JSON: start from the defaults, do not break boot
  }
  return normalize(parsed);
}

/** Write the whole record (validated first). False when storage is unavailable. */
export function write(record) {
  const ls = storage();
  if (!ls) return false;
  try {
    ls.setItem(STORAGE_KEY, JSON.stringify(normalize(record)));
    return true;
  } catch {
    return false; // quota / private mode: the run carries on without persistence
  }
}

function patch(fields) {
  return write(Object.assign(read(), fields));
}

// ------------------------------------------------------- calibration (R18/R34) --

/** The saved anchor, or null when nothing has been calibrated yet. */
export function loadCalibration() {
  return read().calibration;
}

/** Save the anchor (null clears the calibration). Returns what is now stored. */
export function saveCalibration(anchor) {
  const value = anchorOf(anchor);
  patch({ calibration: value });
  return loadCalibration();
}

// ------------------------------------------------------------- sound (R33/R34) --

/** Whether sound is muted. Default false (sound on). */
export function loadMute() {
  return read().muted;
}

/** Save the mute flag. Returns the boolean now stored. */
export function saveMute(muted) {
  const value = !!muted;
  patch({ muted: value });
  return loadMute();
}

// -------------------------------------------------------- mode and bests (R35) --

/** The current mode: 'virtual' (default) or 'physical'. */
export function getMode() {
  return read().mode;
}

/** Switch mode. An unknown name is refused and the current mode is returned. */
export function setMode(mode) {
  if (!MODES.includes(mode)) return getMode();
  patch({ mode });
  return getMode();
}

/** Both personal bests, in milliseconds: { virtual, physical }, null when unbeaten. */
export function loadBests() {
  const { bests } = read();
  return { virtual: bests.virtual, physical: bests.physical };
}

/** The best for one mode (null when that mode has no finish yet). */
export function bestFor(mode) {
  return loadBests()[modeOf(mode)];
}

/**
 * R35: record a finish of `ms` into the best of `mode`.
 *
 * A best is the FASTEST final time, so a slower finish never overwrites a faster
 * stored one. Returns { mode, ms, best, improved } — `best` is what is stored now,
 * which is the old one when this finish was slower. An unknown mode or a time that
 * is not a duration records nothing.
 */
export function saveBest(mode, ms) {
  if (!MODES.includes(mode)) return { mode: null, ms: null, best: null, improved: false };
  const time = bestMs(ms);
  const bests = loadBests();
  const previous = bests[mode];
  if (time === null) return { mode, ms: null, best: previous, improved: false };
  const better = previous === null || time < previous;
  if (better) {
    patch({ bests: Object.assign({}, bests, { [mode]: time }) });
  }
  return { mode, ms: time, best: loadBests()[mode], improved: better };
}

/** Forget everything this game stored (a check's clean slate). */
export function clear() {
  const ls = storage();
  if (!ls) return false;
  try {
    ls.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

/** The module as one object, for `window.__pr.persist`. */
export const persist = {
  STORAGE_KEY,
  MODES,
  DEFAULT_MODE,
  available,
  read,
  write,
  normalize,
  defaults,
  isAnchor,
  loadCalibration,
  saveCalibration,
  loadMute,
  saveMute,
  getMode,
  setMode,
  loadBests,
  bestFor,
  saveBest,
  clear,
};
