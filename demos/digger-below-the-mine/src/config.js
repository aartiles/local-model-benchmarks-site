// src/config.js — tuning constants and world shape. Data only: no logic, no
// engine calls, so any module (and any check) can import it freely.
//
// Units: distances are CSS pixels, time is seconds. The tile grid is the source
// of truth for collision and mining (R3); the renderer draws over it.

export const TILE = 32;

// Fixed simulation step. Game.step(dt) accumulates real time and advances in
// whole steps of this size, which is what makes runs replayable (R27, R62).
export const STEP = 1 / 60;

// --- miner physics / rules -------------------------------------------------
export const GRAVITY = 1900; // px/s^2
export const MOVE_SPEED = 195; // px/s
export const JUMP_V = 585; // px/s initial upward velocity
export const MINE_TIME = 0.45; // seconds of holding the mine key per tile
export const MAX_HEALTH = 100;
export const MAX_BATTERY = 100; // lantern charge, percent
export const BATTERY_DRAIN = 0.8; // percent per second while the lantern is lit

// --- survival thresholds (T007, R17-R20) ------------------------------------
// The warning levels are what makes danger fair (R20): each flag must be true
// while the value it guards is still above zero, so the player has time to
// reach a battery cell or break contact. LOW_ENEMY_DIST sits outside
// DANGER_ENEMY_DIST on purpose — the enemy layer (T010) may only bite inside the
// latter, so the proximity warning always arrives first.
export const LOW_BATTERY = 25; // percent: lantern is about to go out
export const LOW_HEALTH = 35; // hp: one more hit is likely fatal
export const LOW_ENEMY_DIST = 150; // px (~4.7 tiles): something is closing in
export const DANGER_ENEMY_DIST = 40; // px: contact/drain range enemies must use
export const PICKUP_CHARGE = 35; // percent one battery cell restores (R19)

// --- world shape -----------------------------------------------------------
// One connected side-view mine, 96 x 54 tiles (3072 x 1728 px). The three areas
// are stacked bands, so "deeper" always means a larger y: the player mines down
// through rock to reach them (R4, R16).
export const WORLD = { width: 96, height: 54 };

export const AREAS = [
  {
    id: 'entrance',
    label: 'Timbered Entrance',
    bounds: { x: 0, y: 0, w: WORLD.width, h: 18 },
  },
  {
    id: 'caverns',
    label: 'Crystal Caverns',
    bounds: { x: 0, y: 18, w: WORLD.width, h: 18 },
  },
  {
    id: 'flooded',
    label: 'Flooded Machinery',
    bounds: { x: 0, y: 36, w: WORLD.width, h: 18 },
  },
];

// The two viewport sizes the layout requirements are measured at (R37), plus a
// small window used to prove the essential UI survives shrinking (R38).
export const VIEWPORTS = [
  { width: 1440, height: 900 },
  { width: 1280, height: 720 },
  { width: 1024, height: 640 },
];
