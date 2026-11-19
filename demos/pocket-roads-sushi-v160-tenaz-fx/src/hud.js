// src/hud.js — the driving HUD readouts (R23): speed, elapsed time, distance
// covered and checkpoint progress, written into the DOM every frame.
//
// It is a display layer only. Every number is READ from the object main.js hands
// in — the run machine (race.js) for the clock, the physics state (physics.js) for
// speed and distance, the crossing record (checkpoints.js) for the gates — so no
// route length, no elapsed time and no gate count is ever recomputed or copied
// here (R2). `state.simTimeMs` is deliberately not used: the run clock is
// `race.elapsedMs()`, which starts on the first throttle (R22) and freezes while
// paused (R31/R32).
//
// The penalty figure belongs to the result screen (T020), so `race.penaltyMs` is
// read when present and kept in the plain readout only; it is never written into a
// HUD cell.
//
// No THREE and no renderer: update() only touches textContent, so a check can drive
// it from a hand-stepped trace, and the formatters are testable in plain Node.

import { ROAD_LENGTH_M } from './road.js';
import { checkpointRun as defaultCheckpointRun } from './checkpoints.js';

/** The four cells index.html declares. The ids are stable for T020/T025/T027. */
export const HUD_IDS = {
  speed: 'hud-speed',
  elapsed: 'hud-time',
  distance: 'hud-distance',
  checkpoints: 'hud-checkpoints',
};

/**
 * The unit span of a cell is its `.hud-unit` sibling (index.html declares it, and
 * the ids belong to T002's markup, so this module finds it by structure rather than
 * asking for a new id). The checkpoints cell has no unit: `n / 4` carries its own.
 */
export function unitOf(valueEl) {
  const cell = valueEl && valueEl.parentElement;
  if (!cell) return null;
  return cell.querySelector('.hud-unit');
}


/** km/h, rounded: a glanceable integer, never "96.4". */
export function formatSpeed(kmh) {
  const v = Number(kmh);
  return String(Math.max(0, Math.round(Number.isFinite(v) ? v : 0)));
}

/**
 * The run clock as `m:ss.d` — 0:07.3, 1:55.0, 12:03.4. One decimal of a second is
 * the finest the brief's medal boundaries need and still fits a tablet at a glance.
 */
export function formatElapsedMs(ms) {
  const t = Number(ms);
  const clamped = Number.isFinite(t) && t > 0 ? t : 0;
  const tenth = Math.floor(clamped / 100);
  const whole = Math.floor(tenth / 10);
  const seconds = whole % 60;
  const minutes = Math.floor(whole / 60);
  return `${minutes}:${String(seconds).padStart(2, '0')}.${tenth % 10}`;
}

/**
 * Distance covered along the route: metres while under a kilometre, then km with
 * two decimals (3.20 km of route reads as "1.42 km", not "1420 m").
 * @returns {{value:string, unit:string}}
 */
export function formatDistance(metres) {
  const m = Number(metres);
  const d = Number.isFinite(m) && m > 0 ? m : 0;
  if (d < 1000) return { value: String(Math.round(d)), unit: 'm' };
  return { value: (d / 1000).toFixed(2), unit: 'km' };
}

/** Checkpoint progress as `n / 4` — the total is read, never hardcoded. */
export function formatCheckpoints(crossed, total) {
  const t = Number(total);
  const c = Number(crossed);
  const tt = Number.isFinite(t) && t > 0 ? Math.round(t) : 0;
  const cc = Math.max(0, Math.min(tt, Number.isFinite(c) ? Math.round(c) : 0));
  return `${cc} / ${tt}`;
}

/**
 * The four strings for one frame, from the three live objects. Pure, so a check can
 * compare what the DOM says with what the model says without a browser.
 *
 * @param {object|null} race  race.js's machine (elapsedMs(), penaltyMs)
 * @param {object|null} car   physics.js's state (speedKmh, distanceM, roadLengthM)
 * @param {object|null} checkpoints checkpoints.js's run record (crossed, total)
 */
export function hudText(race, car, checkpoints = defaultCheckpointRun) {
  const elapsedMs = Number(race && typeof race.elapsedMs === 'function' ? race.elapsedMs() : 0);
  const speedKmh = Number(car && car.speedKmh);
  const distanceM = Number(car && car.distanceM);
  const lengthM = Number(car && car.roadLengthM) || ROAD_LENGTH_M;
  const crossed = Number(checkpoints && checkpoints.crossed);
  const total = Number(checkpoints && checkpoints.total);
  const dist = formatDistance(distanceM);
  return {
    speed: formatSpeed(speedKmh),
    speedUnit: 'km/h',
    elapsed: formatElapsedMs(elapsedMs),
    elapsedUnit: '',
    distance: dist.value,
    distanceUnit: dist.unit,
    checkpoints: formatCheckpoints(crossed, total),
    // Read for the result screen (T020) and the aria sentence; never shown in a cell.
    penaltyMs: Number(race && race.penaltyMs) || 0,
    // The model values behind the strings, for checks and for the aria sentence.
    values: {
      speedKmh: Number.isFinite(speedKmh) ? speedKmh : 0,
      elapsedMs: Number.isFinite(elapsedMs) ? elapsedMs : 0,
      distanceM: Number.isFinite(distanceM) ? distanceM : 0,
      roadLengthM: lengthM,
      crossed: Number.isFinite(crossed) ? crossed : 0,
      total: Number.isFinite(total) ? total : 0,
    },
  };
}

/**
 * The HUD instance for a page. createHud() resolves the four cells once; update()
 * writes them. A missing cell is skipped rather than throwing, so the HUD can never
 * break the frame loop.
 *
 * @param {Document} [doc]
 */
export function createHud(doc = typeof document !== 'undefined' ? document : null) {
  const d = doc || null;
  const els = {};
  for (const [key, id] of Object.entries(HUD_IDS)) els[key] = d ? d.getElementById(id) : null;
  const units = {};
  for (const key of Object.keys(HUD_IDS)) units[key] = els[key] ? unitOf(els[key]) : null;
  const panel = d ? d.getElementById('hud') : null;

  let last = null;

  function write(key, text) {
    const el = els[key];
    if (el && el.textContent !== text) el.textContent = text;
  }
  function writeUnit(key, text) {
    const el = units[key];
    if (el && el.textContent !== text) el.textContent = text;
  }

  const hud = {
    els,
    units,
    panel,
    ids: HUD_IDS,
    /** The last hudText() written, so a check reads the model side too. */
    get last() {
      return last;
    },
    /** The four strings for this frame, without touching the DOM. */
    text(race, car, checkpoints) {
      return hudText(race, car, checkpoints);
    },
    /**
     * R23: write speed, elapsed, distance and checkpoint progress for this frame.
     * @returns {object|null} the strings written, or null with nothing to read
     */
    update(race, car, checkpoints = defaultCheckpointRun) {
      if (!d) return null;
      const t = hudText(race, car, checkpoints);
      write('speed', t.speed);
      write('elapsed', t.elapsed);
      write('distance', t.distance);
      write('checkpoints', t.checkpoints);
      writeUnit('speed', t.speedUnit);
      writeUnit('elapsed', t.elapsedUnit);
      writeUnit('distance', t.distanceUnit);
      if (panel) {
        panel.setAttribute(
          'aria-label',
          `${t.speed} kilometres per hour, ${t.elapsed} elapsed, ` +
            `${t.distance} of ${formatDistance(t.values.roadLengthM).value} kilometres, ` +
            `${t.checkpoints} checkpoints`
        );
      }
      last = t;
      return t;
    },
    /** What the DOM says right now — the player's view, not the model's. */
    read() {
      const text = (el) => (el ? el.textContent : null);
      return {
        speed: text(els.speed),
        elapsed: text(els.elapsed),
        distance: text(els.distance),
        checkpoints: text(els.checkpoints),
        speedUnit: text(units.speed),
        elapsedUnit: text(units.elapsed),
        distanceUnit: text(units.distance),
      };
    },
  };
  return hud;
}

/**
 * The default instance, for a caller that does not want to hold one (main.js keeps
 * its own so the frame slot is explicit).
 */
export function updateHud(race, car, checkpoints) {
  if (!shared) shared = createHud();
  return shared.update(race, car, checkpoints);
}
let shared = null;

/* =============================================================== overlays ==== */
// R29 / R30 / R31: the ready, pause and result screens. showOverlay(name) is the one
// door: main.js calls it from the race machine's existing onState callback, so a run
// state and what the player sees are the same event, never two subscriptions.
//
// Each of the four states has a DISTINCT visible panel (R31): 'ready' shows the
// banner, 'paused' the pause card, 'finished' the result card, and 'driving' shows
// none of them — the stage and the HUD own the screen, which is the fourth distinct
// visible state. Hiding is `hidden` (display:none via CSS), never opacity, so a
// hidden panel cannot swallow a thumb aimed at a pad underneath.

/** The panel each run state shows. 'driving' is deliberately absent. */
export const OVERLAY_IDS = {
  ready: 'overlay-ready',
  paused: 'overlay-pause',
  finished: 'overlay-result',
};

/** The state that shows no panel at all. */
export const OVERLAY_NONE = 'driving';

/** The result screen's readout ids (index.html declares them). */
export const RESULT_IDS = {
  time: 'result-time',
  penalty: 'result-penalty',
  medal: 'result-medal',
  collisions: 'result-collisions',
};

/** Penalties as `+2.0 s`, and `none` at zero — the R27 figure the result shows. */
export function formatPenaltyMs(ms) {
  const t = Number(ms);
  const v = Number.isFinite(t) && t > 0 ? t : 0;
  if (v === 0) return 'none';
  return `+${(v / 1000).toFixed(1)} s`;
}

/** A medal name as the player reads it. */
export function formatMedal(medal) {
  const m = String(medal || 'bronze').toLowerCase();
  return m === 'gold' || m === 'silver' || m === 'bronze' ? m : 'bronze';
}

/**
 * The result screen's strings for a finished run (R29): the finish time, the
 * penalties and the medal. Every figure is READ from the machine — finalTimeMs()
 * (elapsed + penalties, frozen at the line), penaltyMs and medal — and the time is
 * formatted with the same formatter as the HUD clock, so the two never disagree.
 *
 * @param {object|null} race  race.js's machine
 * @param {object} [extra]    { collisions, checkpointRun } for the detail lines
 */
export function resultText(race, extra = {}) {
  const finalMs = Number(race && typeof race.finalTimeMs === 'function' ? race.finalTimeMs() : 0);
  const elapsedMs = Number(race && typeof race.elapsedMs === 'function' ? race.elapsedMs() : 0);
  const penaltyMs = Number((race && race.penaltyMs) || 0);
  const medal = formatMedal(race && race.medal);
  const gates = extra.checkpointRun || defaultCheckpointRun;
  const crossed = Number(gates && gates.crossed);
  const total = Number(gates && gates.total);
  const collisions = Number.isFinite(Number(extra.collisions)) ? Number(extra.collisions) : null;
  return {
    medal,
    medalLabel: medal.toUpperCase(),
    time: formatElapsedMs(finalMs),
    elapsed: formatElapsedMs(elapsedMs),
    penalty: formatPenaltyMs(penaltyMs),
    penaltyMs,
    finalTimeMs: Number.isFinite(finalMs) ? finalMs : 0,
    elapsedMs: Number.isFinite(elapsedMs) ? elapsedMs : 0,
    collisions,
    checkpoints: Number.isFinite(total) && total > 0 ? formatCheckpoints(crossed, total) : null,
  };
}

/**
 * Which overlay panels are RENDERED right now — measured from the live layout
 * (display, size), not from the `hidden` attribute, so a check reads what the player
 * sees. Returns the ids, in OVERLAY_IDS order.
 */
export function visiblePanels(doc = typeof document !== 'undefined' ? document : null) {
  const d = doc || (typeof document !== 'undefined' ? document : null);
  if (!d) return [];
  const out = [];
  for (const id of Object.values(OVERLAY_IDS)) {
    const el = d.getElementById(id);
    if (!el || el.hidden) continue;
    const r = typeof el.getBoundingClientRect === 'function' ? el.getBoundingClientRect() : null;
    if (!r || !(r.width > 0 && r.height > 0)) continue;
    const cs = typeof d.defaultView !== 'undefined' && d.defaultView.getComputedStyle
      ? d.defaultView.getComputedStyle(el)
      : null;
    if (cs && (cs.display === 'none' || cs.visibility === 'hidden')) continue;
    out.push(id);
  }
  return out;
}

/**
 * The overlay instance for a page. show(name, race) puts up the panel for that run
 * state and writes the result screen's figures when the state is 'finished'.
 *
 * @param {Document} [doc]
 */
export function createOverlays(doc = typeof document !== 'undefined' ? document : null) {
  const d = doc || null;
  const panels = {};
  for (const [name, id] of Object.entries(OVERLAY_IDS)) panels[name] = d ? d.getElementById(id) : null;
  const result = {};
  for (const [key, id] of Object.entries(RESULT_IDS)) result[key] = d ? d.getElementById(id) : null;
  const pauseTime = d ? d.getElementById('pause-time') : null;

  let current = null;
  let lastText = null;

  function put(name, text) {
    for (const [key, el] of Object.entries(panels)) {
      if (!el) continue;
      const on = key === name;
      if (el.hidden !== !on) el.hidden = !on;
    }
    if (name === 'finished' && d) writeResult(text);
  }
  function writeResult(text) {
    if (!text) return;
    const set = (node, value) => {
      if (node && value !== null && value !== undefined && node.textContent !== String(value)) {
        node.textContent = String(value);
      }
    };
    set(result.time, `Finish time  ${text.time}`);
    set(result.penalty, `Penalties  ${text.penalty}`);
    set(result.medal, `Medal  ${text.medalLabel}`);
    set(
      result.collisions,
      text.collisions === null
        ? null
        : `${text.collisions} collision${text.collisions === 1 ? '' : 's'}` +
            (text.checkpoints ? ` · ${text.checkpoints} checkpoints` : '')
    );
    const card = panels.finished;
    if (card) {
      card.setAttribute(
        'aria-label',
        `Result: ${text.time} final time, ${text.elapsed} driving, penalties ${text.penalty}, ${text.medalLabel} medal`
      );
    }
  }

  const overlays = {
    ids: OVERLAY_IDS,
    resultIds: RESULT_IDS,
    panels,
    result,
    get current() {
      return current;
    },
    /** The last resultText() written, so a check compares DOM and model. */
    get lastText() {
      return lastText;
    },
    /** The pure form of the result screen's strings. */
    text(race, extra) {
      return resultText(race, extra);
    },
    /**
     * R31: show the panel for a run state ('ready' | 'driving' | 'paused' |
     * 'finished'). 'driving' hides all three. Returns the state shown.
     */
    show(name, race = null, extra = {}) {
      if (!d) return null;
      const state = name === OVERLAY_NONE ? OVERLAY_NONE : name;
      const text = state === 'finished' ? resultText(race, extra) : null;
      if (text) lastText = text;
      put(state, text);
      if (state === 'paused' && pauseTime) {
        const elapsed = Number(race && typeof race.elapsedMs === 'function' ? race.elapsedMs() : 0);
        const line = `Time ${formatElapsedMs(elapsed)} · Escape resumes`;
        if (pauseTime.textContent !== line) pauseTime.textContent = line;
      }
      current = state;
      return state;
    },
    /** The ids actually rendered — the player's view, not the attribute. */
    visible() {
      return visiblePanels(d);
    },
    /** What the result screen says right now. */
    read() {
      const text = (node) => (node ? node.textContent : null);
      return {
        current,
        visible: overlays.visible(),
        time: text(result.time),
        penalty: text(result.penalty),
        medal: text(result.medal),
        collisions: text(result.collisions),
        pauseTime: text(pauseTime),
      };
    },
  };
  return overlays;
}

/** The default overlay instance, for a caller that does not hold one. */
export function showOverlay(name, race = null, extra = {}) {
  if (!sharedOverlays) sharedOverlays = createOverlays();
  return sharedOverlays.show(name, race, extra);
}
let sharedOverlays = null;

/* ========================================================= stage preview ==== */
// R10: the ready screen is a STAGE PREVIEW — the supplied opening artwork
// (assets/midnight-pass.webp) with the stage name and the mode choice beside it, so
// the game opens on a recognisable Midnight Pass card instead of a bare banner.
//
// The artwork is already one of the boot assets (src/assets.js loads it as
// `preview`), so it is NOT fetched again here: R11 keeps the supplied files at their
// original path with one request each. installStagePreview() paints the bitmap that
// loader decoded into the <canvas> index.html declares, which also means the first
// WebGL frame is never blocked on a second decode — the card appears with the assets,
// like the road, the forest and the coupe.
//
// The canvas lives inside #overlay-ready, so it follows the panel: visible in the
// ready state, gone while driving (the panel is `hidden` → display:none), back after
// a restart. The panel keeps pointer-events:none, so a thumb on the glass still
// reaches the pad underneath it (R12, and the DONE T013 asserts exactly that).

/** The stage-preview element index.html declares, and the asset it shows. */
export const STAGE_PREVIEW_ID = 'stage-preview';
export const STAGE_PREVIEW_ASSET = 'midnight-pass.webp';

/**
 * Paint the supplied opening artwork into the ready screen's preview.
 *
 * @param {object|null} preview  the THREE texture from `assets.value.preview` (its
 *   `.image` is the decoded bitmap), or the bitmap itself
 * @param {object} [options]     { url, doc } — `url` is the RELATIVE asset URL
 *   (assets.js assetUrl) recorded on the element as its source; `doc` for a check
 * @returns {{w:number,h:number}|null} the bitmap size painted, or null if there is
 *   nothing to paint yet (no element, no assets, no 2d context)
 */
export function installStagePreview(preview, options = {}) {
  const d = options.doc || (typeof document !== 'undefined' ? document : null);
  if (!d) return null;
  const el = d.getElementById(STAGE_PREVIEW_ID);
  if (!el) return null;
  if (options.url) el.setAttribute('data-source', String(options.url));
  const image = preview && preview.image ? preview.image : preview;
  const w = image ? Number(image.width) || 0 : 0;
  const h = image ? Number(image.height) || 0 : 0;
  if (!(w > 0 && h > 0) || typeof el.getContext !== 'function') return null;
  const ctx2d = el.getContext('2d');
  if (!ctx2d) return null;
  // One paint per distinct bitmap: the loader resolves once, and a check may call
  // this again after a restart, where re-drawing the same pixels is wasted work.
  if (el.width !== w) el.width = w;
  if (el.height !== h) el.height = h;
  ctx2d.clearRect(0, 0, w, h);
  ctx2d.drawImage(image, 0, 0, w, h);
  el.dataset.painted = `${w}x${h}`;
  return { w, h };
}

/** Whether the preview is RENDERED right now — measured from the live layout. */
export function stagePreviewVisible(doc = typeof document !== 'undefined' ? document : null) {
  const d = doc || null;
  if (!d) return false;
  const el = d.getElementById(STAGE_PREVIEW_ID);
  if (!el || el.hidden) return false;
  const r = typeof el.getBoundingClientRect === 'function' ? el.getBoundingClientRect() : null;
  if (!r || !(r.width > 0 && r.height > 0)) return false;
  const view = d.defaultView;
  const cs = view && view.getComputedStyle ? view.getComputedStyle(el) : null;
  if (cs && (cs.display === 'none' || cs.visibility === 'hidden')) return false;
  return true;
}
