// src/tiles.js — tile ids and what they mean to the simulation. The ids are the
// numbers stored in the world grid and in assets/world.json, so they must never
// be renumbered; add new tiles at the end.
//
// Three questions decide the whole game: does it block the miner (R3), can the
// miner destroy it (R8, R16), and is it needed to finish the mission (R26).

export const AIR = 0;
export const ROCK = 1;
export const ORE = 2;
export const RARE_ORE = 3;
export const CRYSTAL = 4;
export const SUPPORT = 5;
export const LIFT = 6;
export const PUMP = 7;
export const PART = 8;
export const BATTERY_PICKUP = 9;
export const WATER = 10;
export const WALL = 11;
export const DEEP_CRYSTAL = 12;
export const ESSENTIAL = 13;

// id -> name, for debug dumps and prompts.
export const NAME = {
  [AIR]: 'air',
  [ROCK]: 'rock',
  [ORE]: 'ore',
  [RARE_ORE]: 'rare ore',
  [CRYSTAL]: 'crystal',
  [SUPPORT]: 'timber support',
  [LIFT]: 'extraction lift',
  [PUMP]: 'drainage pump',
  [PART]: 'pump part',
  [BATTERY_PICKUP]: 'battery cell',
  [WATER]: 'water',
  [WALL]: 'bedrock',
  [DEEP_CRYSTAL]: 'deep rare crystal',
  [ESSENTIAL]: 'essential structure',
};

// Blocks movement and collision. Pickups and the pump part do not, so the miner
// can always stand on the tile he needs to interact from; water and air do not.
const SOLID = new Set([ROCK, ORE, RARE_ORE, CRYSTAL, SUPPORT, LIFT, PUMP, WALL, DEEP_CRYSTAL, ESSENTIAL]);

// Destructible by the mining action, and the ore each destroyed tile yields.
// Rock is passable-at-a-cost so routes through the mine exist (R16).
const DIGGABLE = new Set([ROCK, ORE, RARE_ORE, CRYSTAL]);
const ORE_YIELD = new Map([
  [ROCK, 0],
  [ORE, 1],
  [RARE_ORE, 3],
  [CRYSTAL, 2],
]);

// Needed to finish the mission: the pump and lift, the items they require, and
// the timber that holds the entrance up. Essential tiles are never diggable,
// which is what keeps the mission winnable after any legal action (R26).
const ESSENTIAL_TILES = new Set([SUPPORT, LIFT, PUMP, PART, DEEP_CRYSTAL, ESSENTIAL]);

export function isSolid(id) {
  return SOLID.has(id);
}

export function isEssential(id) {
  return ESSENTIAL_TILES.has(id);
}

// The essential test is applied here as well as in the table, so adding a tile
// to both sets can never make a mission-critical object destroyable.
export function isDiggable(id) {
  return DIGGABLE.has(id) && !isEssential(id);
}

// Ore handed over when a diggable tile is destroyed; 0 for anything else.
export function oreYield(id) {
  return ORE_YIELD.get(id) ?? 0;
}
