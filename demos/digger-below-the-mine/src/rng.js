// src/rng.js — deterministic randomness for world generation and enemy jitter.
//
// Every generator here is a pure function of its seed, so a run can be replayed
// tile-for-tile (R27 restart, R62 deterministic checks). No Math.random() is
// used anywhere in the game for that reason.

// The classic mulberry32 PRNG: 32-bit state, one float in [0,1) per call.
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Integer coordinate hash -> float in [0,1). Stateless, so tile (x,y) always
// looks the same for a given seed no matter what order the world is generated
// in. The multiplies are the usual low-bits avalanche constants.
export function hash2(x, y, seed = 0) {
  let h = (seed >>> 0) ^ 0x9e3779b9;
  h = Math.imul(h ^ (x | 0), 0x85ebca6b) >>> 0;
  h = (h ^ (h >>> 13)) >>> 0;
  h = Math.imul(h ^ (y | 0), 0xc2b2ae35) >>> 0;
  h = (h ^ (h >>> 16)) >>> 0;
  h = Math.imul(h ^ (h >>> 7), 0x27d4eb2d) >>> 0;
  h = (h ^ (h >>> 15)) >>> 0;
  return h / 4294967296;
}

// A seedable stream with the handful of helpers the generators need.
export class Rng {
  constructor(seed = 1) {
    this.seed = seed >>> 0;
    this._next = mulberry32(this.seed);
  }

  next() {
    return this._next();
  }

  // Float in [a, b).
  range(a, b) {
    return a + this._next() * (b - a);
  }

  // Integer in [a, b], inclusive at both ends.
  int(a, b) {
    return a + Math.floor(this._next() * (b - a + 1));
  }

  pick(arr) {
    if (!arr || arr.length === 0) return undefined;
    return arr[Math.floor(this._next() * arr.length)];
  }
}
