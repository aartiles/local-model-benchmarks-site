// src/storage.js — localStorage persistence for calibration, sound and
// separate personal bests per camera mode. Never throws (private mode etc.).
import { STORAGE_KEY } from './config.js';

const defaults = () => ({
  mode: 'virtual',            // 'virtual' | 'physical'
  anchor: null,               // {x, y} normalised 0..1 (x from left, y from top) — toy position
  camDist: 5.5,               // physical-mode view distance slider
  camYaw: 0,                  // physical-mode view turn (radians)
  muted: false,
  best: { virtual: null, physical: null }, // seconds (final time incl. penalties)
});

let cache = null;

export function loadSettings() {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    cache = raw ? { ...defaults(), ...JSON.parse(raw) } : defaults();
  } catch {
    cache = defaults();
  }
  return cache;
}

export function saveSettings(patch) {
  cache = { ...loadSettings(), ...patch };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cache)); } catch { /* ignore */ }
  return cache;
}

export function clearSettings() {
  cache = defaults();
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
}
