// src/state.js — player progression: money, reputation, stats, upgrades.
// All in-memory; PLAY AGAIN calls reset() (M10). No persistence by design.

export const UPGRADE_DEFS = {
  aim:      { name: 'Swift Trigger',    desc: 'Your aim moves 35% faster',        cost: 60, key: 'aim', once: true },
  accuracy: { name: 'Sight Alignment',  desc: 'A steadier hand: bigger hit window', cost: 80, key: 'accuracy', once: true },
  'hat-straw':  { name: 'Straw Hat',    desc: 'Cosmetic — a classic straw hat',    cost: 40, key: 'hat', variant: 'straw' },
  'hat-black':  { name: 'Black Hat',    desc: 'Cosmetic — a feared black hat',     cost: 50, key: 'hat', variant: 'black' },
  'duster-black': { name: 'Black Duster', desc: 'Cosmetic — a midnight duster',    cost: 60, key: 'duster', variant: 'black' },
  'gun-silver': { name: 'Silver Revolver', desc: 'Cosmetic — a shining silver gun', cost: 120, key: 'gun', variant: 'silver' },
};

export const HATS = {
  brown: 0x5a4632,
  straw: 0xc9a85a,
  black: 0x26201c,
};
export const DUSTERS = {
  blue: 0x4a6b8a,
  black: 0x26201c,
};
export const GUNS = {
  iron: 0x3a3a3a,
  silver: 0xc8c8d0,
};

export class GameState {
  constructor() { this.reset(); }

  reset() {
    this.money = 0;
    this.reputation = 0;
    this.duelsWon = 0;
    this.duelsLost = 0;
    this.fastestDuelMs = Infinity; // time from DRAW to a won duel
    this.moneyEarned = 0;
    this.playTime = 0;             // seconds
    this.upgrades = { aim: 0, accuracy: 0, hat: 'brown', duster: 'blue', gun: 'iron' };
  }

  /** Multiplier for reticle/aim movement speed. */
  aimSpeed() { return 1 + 0.35 * this.upgrades.aim; }
  /** Hitbox forgiveness scale for the player's shots. */
  accuracyScale() { return 1 + 0.18 * this.upgrades.accuracy; }

  canBuy(id) {
    const def = UPGRADE_DEFS[id];
    if (!def) return false;
    if (def.once) { if (this.upgrades[def.key] > 0) return false; }
    else { if (this.upgrades[def.key] === def.variant) return false; }
    return this.money >= def.cost;
  }

  buy(id) {
    if (!this.canBuy(id)) return false;
    const def = UPGRADE_DEFS[id];
    this.money -= def.cost;
    this.upgrades[def.key] = def.once ? 1 : def.variant;
    return true;
  }
}
