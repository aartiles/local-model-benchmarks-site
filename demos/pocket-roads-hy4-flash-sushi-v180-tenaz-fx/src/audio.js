// Short synthesized effects only: no audio files and no network requests.
// An AudioContext is created on a user gesture; without Web Audio the module
// still records requested names so gameplay and checks keep working.
import { CONFIG } from './config.js';
import { load as loadStored, save as saveStored } from './storage.js';

const EFFECTS = {
  engine: { type: 'triangle', frequency: 92, duration: 0.5, gain: 0.08 },
  start: { type: 'square', frequency: 220, duration: 0.16, gain: 0.06 },
  checkpoint: { type: 'sine', frequency: 620, duration: 0.22, gain: 0.09 },
  impact: { type: 'sawtooth', frequency: 120, duration: 0.28, gain: 0.11 },
  finish: { type: 'sine', frequency: 780, duration: 0.6, gain: 0.1 },
};

export function createAudio(storage = {}) {
  const loadValue = typeof storage.load === 'function' ? storage.load : loadStored;
  const saveValue = typeof storage.save === 'function' ? storage.save : saveStored;
  const key = (storage.key || CONFIG.STORAGE_KEYS.mute);
  let muted = loadValue(key, false) === true;
  let context = null;
  let unavailable = false;
  const playLog = [];
  const synthesis = [];

  function contextClass() {
    if (typeof window === 'undefined') return null;
    return window.AudioContext || window.webkitAudioContext || null;
  }

  function unlock() {
    if (context && context.state === 'suspended') {
      try { context.resume(); } catch {}
    }
    if (context || unavailable) return context;
    const Audio = contextClass();
    if (!Audio) {
      unavailable = true;
      return null;
    }
    try {
      context = new Audio();
      unavailable = false;
    } catch {
      unavailable = true;
    }
    return context;
  }

  function oscillator(name, effect, at, offset = 0) {
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = effect.type;
    osc.frequency.setValueAtTime(effect.frequency + offset, at);
    const peak = effect.gain * (name === 'finish' ? 1 - offset / 2000 : 1);
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), at + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + effect.duration);
    osc.connect(gain);
    gain.connect(context.destination);
    osc.start(at);
    osc.stop(at + effect.duration + 0.02);
    synthesis.push({ name, kind: 'oscillator', type: effect.type, frequency: effect.frequency + offset, started: true });
  }

  function noise(name, effect, at) {
    const frames = Math.floor(context.sampleRate * effect.duration);
    const buffer = context.createBuffer(1, frames, context.sampleRate);
    const samples = buffer.getChannelData(0);
    let seed = 1337;
    for (let i = 0; i < frames; i += 1) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      samples[i] = (seed / 0x3fffffff - 1) * (1 - i / frames);
    }
    const source = context.createBufferSource();
    const gain = context.createGain();
    source.buffer = buffer;
    gain.gain.setValueAtTime(effect.gain, at);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + effect.duration);
    source.connect(gain);
    gain.connect(context.destination);
    source.start(at);
    synthesis.push({ name, kind: 'noise', frames, started: true });
  }

  function play(name) {
    const effect = EFFECTS[name] || EFFECTS.start;
    const entry = { name, requested: true, muted, synthesized: false };
    playLog.push(entry);
    if (playLog.length > 400) playLog.shift();
    if (muted) return entry;
    const live = unlock();
    if (!live) return entry;
    try {
      const at = live.currentTime + 0.005;
      if (name === 'impact') noise(name, effect, at);
      else oscillator(name, effect, at);
      if (name === 'checkpoint') oscillator(name, effect, at + 0.11, 180);
      if (name === 'finish') {
        oscillator(name, effect, at + 0.16, 220);
        oscillator(name, effect, at + 0.32, 440);
      }
      entry.synthesized = true;
      if (synthesis.length > 400) synthesis.splice(0, synthesis.length - 400);
    } catch {
      // Audio must never interrupt the frame loop or a gameplay transition.
    }
    return entry;
  }

  function setMuted(value, persist = true) {
    muted = value === true;
    if (persist) saveValue(key, muted);
    return muted;
  }

  return {
    play,
    unlock,
    setMuted,
    toggleMute() {
      return setMuted(!muted);
    },
    get muted() { return muted; },
    get available() { return Boolean(context) || unavailable === false && Boolean(contextClass()); },
    get playLog() { return playLog; },
    get synthesis() { return synthesis; },
    get storageKey() { return key; },
  };
}

export default createAudio;
