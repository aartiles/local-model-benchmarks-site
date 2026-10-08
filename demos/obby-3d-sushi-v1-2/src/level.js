// ===================================================================
// OBBY 3D — level data (pure JS, no three.js imports so it can be
// validated from node with `node src/validate.js`)
//
// Movement constants: SPEED=8, JUMP_V=10, G=25
//   max jump height = 2.0 m, same-level max range = 6.4 m
// Design rule: required edge-gaps <= 4.5 m, required rises <= 1.5 m
// ===================================================================

export const MOVEMENT = {
  SPEED: 8,
  JUMP_V: 10,
  GRAVITY: 25,
  PLAYER_HALF_W: 0.35,
  PLAYER_HEIGHT: 1.6,
  KILL_DROP: 22,
};

const PLATFORMS = [];
let _id = 0;
function add(p) { p.id = _id++; PLATFORMS.push(p); return p; }
function pad(x, top, z, w, d, stage, color, extra = {}) {
  return add({ x, top, z, w, d, h: 1, stage, color, kind: 'static', ...extra });
}
function mover(x, top, z, w, d, stage, color, move) {
  return add({ x, top, z, w, d, h: 1, stage, color, kind: 'mover', move });
}
function vanish(x, top, z, w, d, stage, color, blink) {
  return add({ x, top, z, w, d, h: 1, stage, color, kind: 'vanish', blink });
}
function conveyor(x, top, z, w, d, stage, color, push) {
  return add({ x, top, z, w, d, h: 1, stage, color, kind: 'conveyor', push });
}
function hazard(x, top, z, w, d, stage) {
  return add({ x, top, z, w, d, h: 0.8, stage, color: 0xff4a2b, kind: 'hazard' });
}

const C = {
  start: 0x6ecbf5, s1: 0x7dd87d, s2: 0x69c0ff, s3: 0xffd166, s4: 0xb388ff,
  s5: 0xff9ff3, s6: 0xd7dbe6, s7: 0x74e3ff, s8: 0xffca3a, s9: 0xc77dff,
  s10: 0x89f7c2, cp: 0x3ddc84, finish: 0xffd700,
};

// ---- START ----
pad(0, 0, 0, 10, 10, 0, C.start);

// ---- STAGE 1: basic platform jumps ----
pad(0, 0.4, 11, 4, 4, 1, C.s1);
pad(0, 0.8, 18, 4, 4, 1, C.s1);
pad(0, 1.2, 25, 4, 4, 1, C.s1);
pad(0, 1.6, 32, 4, 4, 1, C.s1);
pad(0, 2.0, 39, 4, 4, 1, C.s1);

// ---- STAGE 2: longer jumps, platforms at different heights ----
pad(0, 3.0, 46, 3.5, 3.5, 2, C.s2);
pad(0, 2.2, 53.5, 3.5, 3.5, 2, C.s2);
pad(0, 3.6, 61, 3, 3, 2, C.s2);
pad(0, 2.8, 68.5, 3, 3, 2, C.s2);
pad(0, 4.2, 76, 3, 3, 2, C.s2);

// ---- CHECKPOINT 1 (after stage 2) ----
pad(0, 4.2, 84, 6, 6, 2, C.cp, { checkpoint: 0 });

// ---- STAGE 3: narrow beams / careful movement ----
pad(0, 4.2, 91, 3, 3, 3, C.s3);
pad(0, 4.2, 98.5, 1.4, 8, 3, C.s3);
pad(0, 4.2, 105, 2.5, 2.5, 3, C.s3);
pad(4, 4.2, 111.5, 1.4, 8, 3, C.s3);
pad(8, 5.0, 118, 1.4, 8, 3, C.s3);
pad(8, 5.0, 125, 3, 3, 3, C.s3);

// ---- STAGE 4: hazard blocks / lava ----
pad(8, 5.0, 132, 4, 4, 4, C.s4);
hazard(8, 5.8, 136.5, 4, 1.0, 4);
pad(8, 5.0, 140.5, 4, 4, 4, C.s4);
hazard(8, 5.8, 145, 4, 1.0, 4);
pad(8, 5.0, 149, 4, 4, 4, C.s4);
pad(4, 5.0, 154.5, 3, 3, 4, C.s4);
pad(8, 5.6, 160, 4, 4, 4, C.s4);

// ---- CHECKPOINT 2 (after stage 4) ----
pad(8, 5.6, 168, 6, 6, 4, C.cp, { checkpoint: 1 });

// ---- STAGE 5: moving platforms ----
pad(8, 5.6, 175, 3, 3, 5, C.s5);
mover(8, 5.6, 182, 4, 4, 5, C.s5, { axis: 'x', amp: 3, speed: 1.1, phase: 0 });
mover(8, 6.4, 191, 4, 4, 5, C.s5, { axis: 'z', amp: 2.5, speed: 1.3, phase: 1.5 });
pad(8, 6.4, 199, 3, 3, 5, C.s5);
pad(8, 6.4, 205.5, 5, 5, 5, C.s5);

// ---- STAGE 6: rotating sweepers ----
pad(8, 6.4, 212, 8, 8, 6, C.s6);
pad(8, 6.4, 224, 8, 8, 6, C.s6);
pad(8, 6.4, 236, 8, 8, 6, C.s6);

// ---- CHECKPOINT 3 (after stage 6) ----
pad(8, 6.4, 244, 6, 6, 6, C.cp, { checkpoint: 2 });

// ---- STAGE 7: disappearing platforms ----
const blink = (phase) => ({ cycle: 3.0, on: 2.0, phase });
vanish(8, 6.4, 251, 3, 3, 7, C.s7, blink(0.0));
vanish(8, 6.4, 257, 3, 3, 7, C.s7, blink(0.85));
vanish(8, 6.4, 263, 3, 3, 7, C.s7, blink(1.7));
vanish(8, 6.4, 269, 3, 3, 7, C.s7, blink(2.55));
vanish(8, 6.4, 275, 3, 3, 7, C.s7, blink(3.4));
pad(8, 6.4, 282, 4, 4, 7, C.s7);

// ---- STAGE 8: conveyors ----
conveyor(8, 6.4, 289, 5, 5, 8, C.s8, { x: 3 });
conveyor(8, 6.4, 296, 5, 5, 8, C.s8, { x: -3 });
conveyor(8, 6.4, 303, 5, 5, 8, C.s8, { x: 3 });
conveyor(8, 6.4, 310, 5, 5, 8, C.s8, { x: -3 });
pad(8, 6.4, 318, 4, 4, 8, C.s8);

// ---- CHECKPOINT 4 (after stage 8) ----
pad(8, 6.4, 326, 6, 6, 8, C.cp, { checkpoint: 3 });

// ---- STAGE 9: vertical sequence (moving platforms + jumps) ----
pad(8, 7.4, 333, 5, 5, 9, C.s9);
mover(8, 8.2, 339.5, 4, 4, 9, C.s9, { axis: 'y', amp: 1.0, speed: 1.2, phase: 0 });
pad(8, 9.2, 346, 5, 5, 9, C.s9);
mover(8, 10.0, 352.5, 4, 4, 9, C.s9, { axis: 'y', amp: 1.0, speed: 1.2, phase: Math.PI });
pad(8, 11.0, 359, 5, 5, 9, C.s9);
mover(8, 11.6, 365.5, 4, 4, 9, C.s9, { axis: 'z', amp: 1.5, speed: 1.3, phase: 0 });
pad(8, 11.6, 373.5, 3, 3, 9, C.s9);

// ---- CHECKPOINT 5 (start of final stage) ----
pad(8, 11.6, 380, 6, 6, 10, C.cp, { checkpoint: 4 });

// ---- STAGE 10: final gauntlet (beam+hazard, mover, sweeper, blink, conveyor) ----
pad(8, 11.6, 387, 3, 3, 10, C.s10);
pad(8, 11.6, 393.5, 1.4, 6, 10, C.s10);
hazard(8, 12.4, 398.6, 1.4, 1.4, 10);
pad(8, 11.6, 403.5, 1.4, 6, 10, C.s10);
pad(8, 11.6, 410, 3, 3, 10, C.s10);
mover(8, 11.6, 417, 4, 4, 10, C.s10, { axis: 'x', amp: 3, speed: 1.2, phase: 0 });
pad(8, 11.6, 424, 8, 8, 10, C.s10);
vanish(8, 11.6, 430, 3, 3, 10, C.s10, blink(0.3));
vanish(8, 11.6, 436, 3, 3, 10, C.s10, blink(1.15));
pad(8, 11.6, 442, 3, 3, 10, C.s10);
conveyor(8, 11.6, 448.5, 5, 5, 10, C.s10, { x: 2 });
pad(8, 12.0, 455, 3, 3, 10, C.s10);
pad(8, 12.4, 462, 10, 10, 10, C.finish, { finish: true });

// ------------------------------------------------------------------
// Sweepers (rotating bars). y = top of the platform they are mounted on.
// Bar occupies y+0.35 .. y+1.25 (cannot be jumped over comfortably,
// must be timed). Dangerous radius = length.
// ------------------------------------------------------------------
export const SWEEPERS = [
  { x: 8, y: 6.4, z: 212, length: 2.4, speed: 1.1, phase: 0, arms: 2 },
  { x: 8, y: 6.4, z: 224, length: 2.4, speed: -1.35, phase: 1.2, arms: 2 },
  { x: 8, y: 6.4, z: 236, length: 2.4, speed: 1.6, phase: 2.4, arms: 2 },
  { x: 8, y: 11.6, z: 426, length: 1.8, speed: 1.2, phase: 0.5, arms: 2 },
];

export { PLATFORMS as platforms };

// Intended route: every non-hazard platform, in build order.
export const ROUTE = PLATFORMS.filter(p => p.kind !== 'hazard').map(p => p.id);

export const FINISH = PLATFORMS.find(p => p.finish);
