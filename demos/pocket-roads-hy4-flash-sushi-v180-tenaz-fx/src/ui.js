// Screen layer: cached elements, formatted HUD and mutually exclusive overlays.
import { CONFIG } from './config.js';

const SCREEN_ELEMENTS = {
  ready: 'ready-screen',
  driving: null,
  paused: 'pause-screen',
  result: 'result-screen',
  calibration: 'calibration-screen',
};

export function createUI(root, handlers = {}) {
  const area = root || document.getElementById('play-area');
  const byId = (id) => document.getElementById(id);
  const elements = {
    speed: byId('hud-speed'),
    time: byId('hud-time'),
    distance: byId('hud-distance'),
    checkpoint: byId('hud-checkpoint'),
    marker: byId('marker'),
  };
  const overlays = Object.fromEntries(
    Object.entries(SCREEN_ELEMENTS).map(([name, id]) => [name, id ? byId(id) : null])
  );
  let screen = 'ready';
  let latest = {};

  function call(name, ...args) {
    if (typeof handlers[name] === 'function') handlers[name](...args);
  }

  function setTestHook(data) {
    latest = { ...latest, ...(data || {}) };
    if (window.__pocketRoads) {
      window.__pocketRoads.testHook = { ...latest };
    }
    if (area) area.dataset.uiHook = JSON.stringify(latest);
    return latest;
  }

  function formatTime(seconds) {
    const total = Math.max(0, Number(seconds) || 0);
    const minutes = Math.floor(total / 60);
    const rest = total - minutes * 60;
    const whole = Math.floor(rest);
    const centiseconds = Math.floor((rest - whole) * 100 + 0.5);
    const carried = centiseconds === 100;
    return `${String(minutes).padStart(2, '0')}:${String(whole + (carried ? 1 : 0)).padStart(2, '0')}.${String(
      carried ? 0 : centiseconds
    ).padStart(2, '0')}`;
  }

  function showScreen(name) {
    const next = Object.hasOwn(SCREEN_ELEMENTS, name) ? name : 'ready';
    screen = next;
    for (const [key, element] of Object.entries(overlays)) {
      if (!element) continue;
      element.hidden = key !== next;
      element.classList.toggle('active', key === next);
    }
    if (area) area.dataset.screen = next;
    document.body.dataset.screen = next;
    const visible = Object.values(overlays).find((element) => element && !element.hidden);
    if (visible) visible.setAttribute('data-screen', next);
    setTestHook({ screen: next, phase: next });
    call('onScreen', next);
    return next;
  }

  function render(state = {}) {
    if (!state || typeof state !== 'object') return latest;
    if (Number.isFinite(state.speed)) {
      const kmh = state.speed * CONFIG.displaySpeedFactor;
      if (elements.speed) {
        elements.speed.textContent = String(Math.round(kmh));
        elements.speed.dataset.speedKmh = String(Math.round(kmh));
        elements.speed.dataset.speedMs = String(state.speed);
      }
    }
    if (Number.isFinite(state.elapsed)) {
      if (elements.time) {
        elements.time.textContent = formatTime(state.elapsed);
        elements.time.dataset.seconds = String(state.elapsed);
      }
    }
    if (Number.isFinite(state.distance)) {
      const metres = Math.max(0, Math.round(state.distance));
      if (elements.distance) {
        elements.distance.textContent = `${metres} / ${CONFIG.trackLength} m`;
        elements.distance.dataset.metres = String(state.distance);
        const unit = elements.distance.parentElement && elements.distance.parentElement.querySelector('.hud-unit');
        if (unit) unit.textContent = '';
      }
    }
    if (Number.isFinite(state.checkpoint)) {
      const count = CONFIG.checkpoints.length;
      if (elements.checkpoint) {
        elements.checkpoint.textContent = `${state.checkpoint} / ${count}`;
        elements.checkpoint.dataset.checkpoint = String(state.checkpoint);
      }
    }
    if (state.best === null || Number.isFinite(state.best) || typeof state.best === 'string') {
      const best = byId('best-time');
      const resultBest = byId('result-best');
      // A mode with no record clears both labels instead of showing the last
      // mode's time, which would make the new mode look like it has a best.
      const label = state.best === null
        ? '—'
        : typeof state.best === 'string' ? state.best : formatTime(state.best);
      if (best) best.textContent = label;
      if (resultBest) resultBest.textContent = label;
    }
    if (typeof state.medal === 'string') {
      const medal = byId('result-medal');
      if (medal) medal.textContent = state.medal;
    }
    // The result shows the same penalised total the medal and best time use.
    const resultTotal = state.result && Number.isFinite(state.result.totalTime)
      ? state.result.totalTime
      : state.elapsed + (Number.isFinite(state.penalty) ? state.penalty : 0);
    if (Number.isFinite(resultTotal)) {
      const resultTime = byId('result-time');
      if (resultTime) resultTime.textContent = `${resultTotal.toFixed(2)} s`;
    }
    if (typeof state.phase === 'string' && state.phase !== screen) showScreen(state.phase);
    setTestHook({
      speed: elements.speed ? elements.speed.textContent : '',
      time: elements.time ? elements.time.textContent : '',
      distance: elements.distance ? elements.distance.textContent : '',
      checkpoint: elements.checkpoint ? elements.checkpoint.textContent : '',
      screen,
    });
    return latest;
  }

  function setMarkerVisible(visible) {
    if (elements.marker) elements.marker.hidden = !visible;
    return Boolean(visible);
  }

  byId('start-button')?.addEventListener('click', () => call('onStart'));
  byId('pause-button')?.addEventListener('click', () => call('onPause'));
  byId('resume-button')?.addEventListener('click', () => call('onResume'));
  byId('replay-button')?.addEventListener('click', () => call('onReplay'));
  byId('calibration-done')?.addEventListener('click', () => call('onCalibrationDone'));

  showScreen('ready');
  render({
    speed: 0,
    elapsed: 0,
    distance: 0,
    checkpoint: 0,
    best: byId('best-time') ? byId('best-time').textContent.trim() : '—',
  });
  return { render, showScreen, setMarkerVisible, setTestHook, screen: () => screen };
}

export default createUI;
