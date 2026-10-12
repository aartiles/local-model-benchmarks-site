// src/opponents.js — the town's gunslingers (M07).
//
// 7 named duelists + the final boss. Each is a distinct blocky cowboy
// (own colors, own home spot, own difficulty data) — not color clones.
// Difficulty is data (DECISIONS D03): reactionMs (after DRAW), aimMs
// (draw-to-trigger), accuracy (0..1 hit chance), hesitation (chance the
// reaction is doubled). Values escalate meaningfully across tiers but stay
// humanly beatable: the best regular reacts in ~330 ms, the final in ~300 ms.

import * as THREE from '../vendor/three.module.js';
import { buildCowboy } from './player.js';

export const TIERS = {
  1: { unlockRep: 0 },
  2: { unlockRep: 40 },
  3: { unlockRep: 90 },
  4: { unlockRep: 130 }, // final showdown
};

const DEFS = [
  {
    id: 'buck', name: 'Buck', title: 'the Greenhorn', tier: 1,
    role: 'nervous rookie', duster: 0x8a9a5a, hat: 0x6e5a3a, pants: 0x5a4a3a,
    home: { x: 19, z: 8 },
    diff: { reactionMs: 680, aimMs: 260, accuracy: 0.5, hesitation: 0.3 },
    reward: { money: 25, rep: 15 },
  },
  {
    id: 'pete', name: 'Lucky Pete', title: 'the Gambler', tier: 1,
    role: 'saloon gambler', duster: 0x9a5a8a, hat: 0x4a3a5a, pants: 0x4a3a5a,
    home: { x: -20, z: -6.5 },
    diff: { reactionMs: 560, aimMs: 230, accuracy: 0.58, hesitation: 0.18 },
    reward: { money: 30, rep: 15 },
  },
  {
    id: 'cole', name: 'Deputy Cole', title: 'of the Law', tier: 1,
    role: "sheriff's deputy", duster: 0x5a7a9a, hat: 0x3a4a5a, pants: 0x3a4a5a,
    home: { x: -8, z: -6.5 },
    diff: { reactionMs: 500, aimMs: 210, accuracy: 0.64, hesitation: 0.1 },
    reward: { money: 35, rep: 15 },
  },
  {
    id: 'jim', name: 'Slim Jim', title: 'the Clerk', tier: 2,
    role: 'general store clerk', duster: 0x6a8a6a, hat: 0x5a6a4a, pants: 0x4a5a3a,
    home: { x: 24, z: -6.5 }, // right edge of the store facade; keeps the shop entrance clear
    diff: { reactionMs: 450, aimMs: 190, accuracy: 0.68, hesitation: 0.1 },
    reward: { money: 45, rep: 20 },
  },
  {
    id: 'harlan', name: 'Red Harlan', title: 'the Outlaw', tier: 2,
    role: 'outlaw', duster: 0x9a4a3a, hat: 0x5a2a2a, pants: 0x4a3a2a,
    home: { x: 12, z: 15.5 },
    diff: { reactionMs: 410, aimMs: 175, accuracy: 0.72, hesitation: 0.07 },
    reward: { money: 55, rep: 25 },
  },
  {
    id: 'jack', name: 'Iron Jack', title: 'the Veteran', tier: 2,
    role: 'veteran gunslinger', duster: 0x5a5a6a, hat: 0x3a3a4a, pants: 0x3a3a4a,
    home: { x: -20, z: 16 },
    diff: { reactionMs: 370, aimMs: 155, accuracy: 0.76, hesitation: 0.05 },
    reward: { money: 65, rep: 25 },
  },
  {
    id: 'mariah', name: 'Black Mariah', title: 'the Bandit', tier: 3,
    role: 'notorious bandit', duster: 0x3a2a3a, hat: 0x26202a, pants: 0x2a2430,
    home: { x: 14, z: -6.5 },
    diff: { reactionMs: 330, aimMs: 140, accuracy: 0.8, hesitation: 0.03 },
    reward: { money: 85, rep: 30 },
  },
  {
    id: 'vane', name: 'Silas Vane', title: 'the Vulture', tier: 4, final: true,
    role: 'the town\u2019s most feared gunslinger', duster: 0x1e1a22, hat: 0x14101a, pants: 0x1a1620,
    home: { x: 0, z: -30 }, // the Showdown Ground (M10)
    diff: { reactionMs: 300, aimMs: 130, accuracy: 0.84, hesitation: 0.02 },
    reward: { money: 150, rep: 50 },
  },
];

export class Opponent {
  constructor(def, scene) {
    this.def = def;
    this.id = def.id;
    this.name = def.name;
    this.title = def.title;
    this.tier = def.tier;
    this.final = !!def.final;
    this.diff = def.diff;
    this.reward = def.reward;
    this.home = { ...def.home };
    this.facing = Math.PI; // face the street (+Z facades face +Z; they look south)
    const { group, parts } = buildCowboy(def.duster, def.hat, def.pants, def.final ? 0x8a2a2a : 0x3a3a3a);
    group.name = 'opponent-' + def.id;
    group.position.set(this.home.x, 0, this.home.z);
    group.rotation.y = this.facing;
    scene.add(group);
    this.group = group;
    this.parts = parts;
    this.state = 'idle'; // idle | inDuel | down
    this._animPhase = Math.random() * 6;
    this._idleTimer = Math.random() * 4;
    this._fall = 0; // 0..1 fall animation progress
    this._hatPop = 0;
  }

  unlocked(rep) { return rep >= TIERS[this.tier].unlockRep; }

  /** Idle life: sway, occasional head turn. */
  update(dt, t) {
    if (this.state === 'inDuel') return; // the duel owns the rig
    this._animPhase += dt * 2;
    const s = Math.sin(this._animPhase);
    this.parts.legL.rotation.x = 0;
    this.parts.legR.rotation.x = 0;
    this.parts.armL.rotation.x = s * 0.05;
    this.parts.armR.rotation.x = -s * 0.05;
    this.parts.torso.position.y = 1.32 + Math.abs(Math.cos(this._animPhase)) * 0.02;
    // Occasional slow head/face turn to feel alive.
    this._idleTimer -= dt;
    if (this._idleTimer <= 0) {
      this._idleTimer = 3 + Math.random() * 5;
      this._lookTurn = (Math.random() - 0.5) * 0.8;
    }
    if (this._lookTurn !== undefined) {
      this.group.rotation.y += (this.facing + this._lookTurn - this.group.rotation.y) * Math.min(1, dt * 3);
    }
    // Fall animation (after a loss) settles to the ground.
    if (this.state === 'down') {
      this._fall = Math.min(1, this._fall + dt * 2.2);
      const e = 1 - (1 - this._fall) * (1 - this._fall); // easeOut
      this.group.rotation.x = -e * Math.PI / 2; // tips backward
      this.group.position.y = -e * 0.55;
    }
  }

  /** World-space muzzle position (for shot rays + FX). */
  muzzleWorld(out) {
    const gun = this.parts.armR.getObjectByName('gun');
    return gun.getWorldPosition(out);
  }

  /** Reset the rig to standing at a position, facing `facing`. */
  place(x, z, facing) {
    this.group.position.set(x, 0, z);
    this.group.rotation.set(0, facing, 0);
    this._fall = 0;
    this._hatPop = 0;
    this.parts.hatCrown.visible = true;
    this.parts.torso.position.y = 1.32;
    this.parts.armL.rotation.set(0, 0, 0);
    this.parts.armR.rotation.set(0, 0, 0);
    this.parts.legL.rotation.set(0, 0, 0);
    this.parts.legR.rotation.set(0, 0, 0);
  }

  /** Cartoon hit reaction: stagger, hat pops, fall backward. */
  playHit(facing) {
    this.state = 'down';
    this._fall = 0;
    this.group.rotation.y = facing;
  }

  returnHome() {
    this.state = 'idle';
    this.place(this.home.x, this.home.z, this.facing);
  }
}

export function createOpponents(scene) {
  return DEFS.map((d) => new Opponent(d, scene));
}
