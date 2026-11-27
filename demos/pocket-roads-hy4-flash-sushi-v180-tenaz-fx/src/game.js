// Deterministic, browser-free race model. Speed and distance are integrated
// along the centreline's arc length; the clock only runs once throttle appears.
import { CONFIG as DEFAULT_CONFIG } from './config.js';
import { pointOnRoad as trackPointOnRoad } from './track.js';

const SUB_STEP = 1 / 60;
const MAX_UPDATE = 0.1;
const THROTTLE_EPSILON = 0.001;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const channel = (value) => (Number.isFinite(value) ? clamp(value, 0, 1) : 0);

function hazardKey(hazard) {
  if (hazard === null || hazard === undefined) return 'unknown-hazard';
  if (typeof hazard === 'object') {
    if (hazard.id !== undefined && hazard.id !== null) return hazard.id;
    if (hazard.name !== undefined && hazard.name !== null) return hazard.name;
    return hazard;
  }
  return hazard;
}

export function createGame(deps = {}) {
  const config = deps.config || DEFAULT_CONFIG;
  const input = deps.input || { state: { steer: 0, throttle: 0, brake: 0 } };
  const hooks = deps.hooks || {};
  const trackLength = Number.isFinite(config.trackLength) ? config.trackLength : 3200;
  const checkpoints = (Array.isArray(config.checkpoints) ? config.checkpoints : [])
    .filter((value) => Number.isFinite(value))
    .slice()
    .sort((a, b) => a - b);
  const penaltyPerImpact = Number.isFinite(config.collisionPenalty) ? config.collisionPenalty : 2;
  const goldTime = Number.isFinite(config.goldTime) ? config.goldTime : 115;
  const silverTime = Number.isFinite(config.silverTime) ? config.silverTime : 135;

  const state = {
    phase: 'ready',
    speed: 0,
    elapsed: 0,
    distance: 0,
    checkpoint: 0,
    penalty: 0,
    collisions: 0,
    medal: null,
    best: Number.isFinite(deps.best) ? deps.best : null,
    mode: deps.mode || 'physical',
    lateral: 0,
    heading: 0,
    throttleSeen: false,
    transitions: 0,
    lastTransition: null,
    result: null,
  };

  const activeImpacts = new Map();
  const hazards = Array.isArray(deps.hazards) ? deps.hazards : [];
  // deps.track may be the track returned by createTrack() (with standalone
  // helpers) or an object exposing pointOnRoad/sampleTrack methods.
  const road = deps.track || null;
  const vehicleRadius = Number.isFinite(config.vehicleRadius) ? config.vehicleRadius : 1.6;
  let finished = false;

  const hook = (name, ...args) => {
    if (typeof hooks[name] === 'function') hooks[name](...args);
  };

  function setPhase(next, reason) {
    if (state.phase === next) return;
    state.phase = next;
    state.lastTransition = reason || next;
    state.transitions += 1;
    hook('onStateChange', next);
  }

  function resetRun() {
    state.speed = 0;
    state.elapsed = 0;
    state.distance = 0;
    state.checkpoint = 0;
    state.penalty = 0;
    state.collisions = 0;
    state.medal = null;
    state.lateral = 0;
    state.heading = 0;
    state.throttleSeen = false;
    state.lastTransition = null;
    state.result = null;
    activeImpacts.clear();
    finished = false;
  }

  function startRun(options = {}) {
    const wantedMode = typeof options === 'string' ? options : options && options.mode;
    if (wantedMode) state.mode = wantedMode;
    if (state.phase === 'result') resetRun();
    if (state.phase === 'ready' || state.phase === 'paused') setPhase('driving', 'start');
    return state;
  }

  function restart() {
    resetRun();
    setPhase('ready', 'restart');
    return state;
  }

  function pause() {
    if (state.phase === 'driving') setPhase('paused', 'pause');
    return state;
  }

  function resume() {
    if (state.phase === 'paused') setPhase('driving', 'resume');
    return state;
  }

  function onBackground() {
    return pause();
  }

  function finishRun() {
    if (finished) return;
    finished = true;
    const total = state.elapsed + state.penalty;
    state.medal = total <= goldTime ? 'gold' : total <= silverTime ? 'silver' : 'bronze';
    if (state.best === null || total < state.best) {
      const previous = state.best;
      state.best = total;
      hook('onBest', state.best, previous, state.mode);
    }
    const result = {
      time: total,
      totalTime: total,
      finalTime: total,
      elapsed: state.elapsed,
      penalty: state.penalty,
      distance: state.distance,
      checkpoint: state.checkpoint,
      collisions: state.collisions,
      medal: state.medal,
      best: state.best,
      mode: state.mode,
    };
    state.result = result;
    setPhase('result', 'finish');
    hook('onFinish', result);
  }

  function syncProgress(emit) {
    while (state.checkpoint < checkpoints.length && state.distance >= checkpoints[state.checkpoint]) {
      state.checkpoint += 1;
      if (emit) hook('onCheckpoint', state.checkpoint);
    }
    if (state.distance >= trackLength && state.phase === 'driving' && !finished) finishRun();
  }

  function pointAt(s, lateral) {
    if (road && typeof road.pointOnRoad === 'function') {
      return road.pointOnRoad(road, s, lateral);
    }
    if (road && typeof road.pointOnRoadAt === 'function') {
      return road.pointOnRoadAt(s, lateral);
    }
    if (road && typeof trackPointOnRoad === 'function' && road.nodes) {
      return trackPointOnRoad(road, s, lateral);
    }
    return { x: s, y: 0, z: lateral };
  }

  function hazardPoint(hazard) {
    const position = hazard && hazard.position;
    if (position && Number.isFinite(position.x) && Number.isFinite(position.z)) return position;
    if (hazard && road && Number.isFinite(hazard.s)) {
      return pointAt(hazard.s, Number.isFinite(hazard.lateral) ? hazard.lateral : 0);
    }
    return null;
  }

  function horizontalDistance(a, b) {
    if (!a || !b || !Number.isFinite(a.x) || !Number.isFinite(b.x)
      || !Number.isFinite(a.z) || !Number.isFinite(b.z)) return Infinity;
    return Math.hypot(a.x - b.x, a.z - b.z);
  }

  function contactRadius(hazard) {
    const radius = hazard && Number.isFinite(hazard.radius)
      ? hazard.radius
      : (hazard && hazard.kind === 'barrier' ? 1.6 : 0.65);
    return Math.max(0, radius) + vehicleRadius;
  }

  function clearSeparatedContacts(point) {
    for (const [key, contact] of activeImpacts) {
      const contactPoint = contact.point || hazardPoint(contact.hazard);
      const threshold = Number.isFinite(contact.threshold)
        ? contact.threshold
        : contactRadius(contact.hazard);
      if (horizontalDistance(contactPoint, point) > threshold * 2) activeImpacts.delete(key);
    }
  }

  function scanHazards() {
    if (!hazards.length || state.phase !== 'driving') return;
    const vehicle = pointAt(state.distance, state.lateral);
    for (const hazard of hazards) {
      const key = hazardKey(hazard);
      const point = hazardPoint(hazard);
      const threshold = contactRadius(hazard);
      if (activeImpacts.has(key)) {
        if (point && horizontalDistance(point, vehicle) > threshold * 2) activeImpacts.delete(key);
        continue;
      }
      if (point && horizontalDistance(point, vehicle) <= threshold) applyImpact(hazard);
    }
  }

  function integrate(step, throttleAmount, brakeAmount, steerAmount) {
    const speedLimit = Number.isFinite(config.speedLimit) ? config.speedLimit : 34;
    if (throttleAmount > 0) {
      state.speed += (Number.isFinite(config.acceleration) ? config.acceleration : 11) * throttleAmount * step;
    } else {
      state.speed -= (Number.isFinite(config.coastRate) ? config.coastRate : 1.6) * step;
    }
    if (brakeAmount > 0) {
      state.speed -= (Number.isFinite(config.brakeRate) ? config.brakeRate : 20) * brakeAmount * step;
    }
    state.speed = clamp(state.speed, 0, speedLimit);

    const steerTarget = steerAmount * (Number.isFinite(config.maxSteer) ? config.maxSteer : 1) * 0.35;
    state.heading += (steerTarget - state.heading) * Math.min(1, step * 5);
    const halfWidth = (Number.isFinite(config.roadWidth) ? config.roadWidth : 9) / 2 - 1;
    state.lateral = clamp(
      state.lateral + Math.sin(state.heading) * state.speed * step,
      -halfWidth,
      halfWidth
    );
    state.distance = clamp(state.distance + state.speed * step, 0, trackLength);
  }

  function update(dt) {
    if (!Number.isFinite(dt) || dt <= 0 || state.phase === 'result' || state.phase === 'paused') return state;
    const source = input && input.state ? input.state : {};
    const throttleAmount = channel(source.throttle);
    const brakeAmount = channel(source.brake);
    const steerAmount = Number.isFinite(source.steer) ? clamp(source.steer, -1, 1) : 0;

    if (state.phase === 'ready') {
      if (throttleAmount <= THROTTLE_EPSILON) return state;
      setPhase('driving', 'start');
    }
    if (throttleAmount > THROTTLE_EPSILON) state.throttleSeen = true;

    let remaining = Math.min(dt, MAX_UPDATE);
    while (remaining > 1e-6) {
      const step = Math.min(SUB_STEP, remaining);
      integrate(step, throttleAmount, brakeAmount, steerAmount);
      scanHazards();
      if (state.throttleSeen) state.elapsed += step;
      remaining -= step;
      if (state.distance >= trackLength) break;
    }
    syncProgress(true);
    return state;
  }

  function teleport(s, lateral = 0) {
    state.distance = clamp(Number.isFinite(s) ? s : 0, 0, trackLength);
    state.lateral = clamp(Number.isFinite(lateral) ? lateral : 0, -(config.roadWidth / 2 - 1), config.roadWidth / 2 - 1);
    clearSeparatedContacts(pointAt(state.distance, state.lateral));
    syncProgress(state.phase === 'driving');
    return state;
  }

  function applyImpact(hazard) {
    const key = hazardKey(hazard);
    activeImpacts.set(key, {
      hazard,
      point: hazardPoint(hazard),
      threshold: contactRadius(hazard),
    });
    state.collisions += 1;
    state.penalty += penaltyPerImpact;
    const factor = Number.isFinite(config.impactSpeedFactor) ? config.impactSpeedFactor : 0.45;
    state.speed *= clamp(factor, 0, 1);
    hook('onImpact', hazard, penaltyPerImpact);
    return state.penalty;
  }

  function impact(hazard) {
    if (state.phase !== 'driving' || activeImpacts.has(hazardKey(hazard))) return state.penalty;
    return applyImpact(hazard);
  }

  function separate(hazard) {
    activeImpacts.delete(hazardKey(hazard));
    return state;
  }

  return {
    state,
    startRun,
    pause,
    resume,
    restart,
    update,
    onBackground,
    teleport,
    impact,
    applyImpact: impact,
    separate,
    releaseHazard: separate,
  };
}

export default createGame;
