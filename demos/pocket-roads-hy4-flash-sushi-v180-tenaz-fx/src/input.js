// Independent pointer and keyboard control channels. Every pointer is tracked
// by its own ID, so releasing one touch never touches another control.
const STEER_KEYS = { KeyA: 'left', ArrowLeft: 'left', KeyD: 'right', ArrowRight: 'right' };
const THROTTLE_KEYS = new Set(['KeyW', 'ArrowUp']);
const BRAKE_KEYS = new Set(['KeyS', 'ArrowDown']);

const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
const isTyping = (target) =>
  target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName || ''));

export function createInput(root, handlers = {}) {
  const zones = {
    steer: root.querySelector('#touch-steer'),
    throttle: root.querySelector('#touch-throttle'),
    brake: root.querySelector('#touch-brake'),
  };
  const pointers = new Map();
  const keys = new Set();
  const state = { steer: 0, throttle: 0, brake: 0 };
  const knob = root.querySelector('.steer-knob');

  const channelKeys = (channel) => {
    if (!channel) return [...Object.keys(STEER_KEYS), ...THROTTLE_KEYS, ...BRAKE_KEYS];
    if (channel === 'steer') return Object.keys(STEER_KEYS);
    if (channel === 'throttle') return [...THROTTLE_KEYS];
    return [...BRAKE_KEYS];
  };

  function compute() {
    const next = { steer: 0, throttle: 0, brake: 0 };
    const left = keys.has('KeyA') || keys.has('ArrowLeft');
    const right = keys.has('KeyD') || keys.has('ArrowRight');
    if (left !== right) next.steer = left ? -1 : 1;
    if ([...THROTTLE_KEYS].some((key) => keys.has(key))) next.throttle = 1;
    if ([...BRAKE_KEYS].some((key) => keys.has(key))) next.brake = 1;

    for (const record of pointers.values()) {
      if (record.channel === 'steer') next.steer = record.value;
      else next[record.channel] = Math.max(next[record.channel], record.value);
    }
    return next;
  }

  function apply() {
    Object.assign(state, compute());
    if (knob) knob.style.left = `${50 + state.steer * 38}%`;
    for (const channel of ['throttle', 'brake']) {
      const button = zones[channel];
      if (button) button.classList.toggle('active', state[channel] > 0.02);
    }
    if (typeof handlers.onChange === 'function') handlers.onChange({ ...state });
  }

  function onDown(channel, event) {
    event.preventDefault();
    const zone = zones[channel];
    if (!zone) return;
    const rect = zone.getBoundingClientRect();
    const value = channel === 'steer'
      ? clamp((event.clientX - rect.left - rect.width / 2) / (rect.width * 0.36), -1, 1)
      : 1;
    pointers.set(event.pointerId, {
      channel,
      value,
      startY: event.clientY,
      height: Math.max(1, rect.height),
    });
    try {
      if (zone.setPointerCapture) zone.setPointerCapture(event.pointerId);
    } catch {}
    apply();
  }

  function onMove(event) {
    const record = pointers.get(event.pointerId);
    if (!record) return;
    event.preventDefault();
    const zone = zones[record.channel];
    if (!zone) return;
    const rect = zone.getBoundingClientRect();
    if (record.channel === 'steer') {
      record.value = clamp((event.clientX - rect.left - rect.width / 2) / (rect.width * 0.36), -1, 1);
    } else {
      record.value = clamp(1 - (event.clientY - record.startY) / (record.height * 0.45), 0.25, 1);
    }
    apply();
  }

  function onEnd(event) {
    const record = pointers.get(event.pointerId);
    if (!record) return;
    event.preventDefault();
    pointers.delete(event.pointerId);
    try {
      const zone = zones[record.channel];
      if (zone && zone.releasePointerCapture) zone.releasePointerCapture(event.pointerId);
    } catch {}
    apply();
  }

  const listeners = [];
  const attach = (target, type, fn, options) => {
    target.addEventListener(type, fn, options);
    listeners.push(() => target.removeEventListener(type, fn, options));
  };
  for (const channel of ['steer', 'throttle', 'brake']) {
    const zone = zones[channel];
    if (!zone) continue;
    attach(zone, 'pointerdown', (event) => onDown(channel, event));
    attach(zone, 'pointermove', onMove);
    attach(zone, 'pointerup', onEnd);
    attach(zone, 'pointercancel', onEnd);
  }

  attach(window, 'keydown', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || isTyping(event.target)) return;
    if (event.code === 'Escape') {
      event.preventDefault();
      if (typeof handlers.onPause === 'function') handlers.onPause();
      return;
    }
    if (!(event.code in STEER_KEYS) && !THROTTLE_KEYS.has(event.code) && !BRAKE_KEYS.has(event.code)) return;
    event.preventDefault();
    keys.add(event.code);
    apply();
  });
  attach(window, 'keyup', (event) => {
    if (!keys.delete(event.code)) return;
    if (!(event.code in STEER_KEYS) && !THROTTLE_KEYS.has(event.code) && !BRAKE_KEYS.has(event.code)) return;
    event.preventDefault();
    apply();
  });
  attach(window, 'blur', () => {
    keys.clear();
    pointers.clear();
    apply();
  });

  function clear(channel) {
    for (const [id, record] of pointers) {
      if (!channel || record.channel === channel) pointers.delete(id);
    }
    for (const key of channelKeys(channel)) keys.delete(key);
    apply();
  }

  apply();
  return {
    state,
    clear,
    destroy() {
      for (const off of listeners) off();
      listeners.length = 0;
      pointers.clear();
      keys.clear();
    },
  };
}
