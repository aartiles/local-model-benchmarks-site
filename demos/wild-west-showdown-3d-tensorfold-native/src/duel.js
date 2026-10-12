// src/duel.js — the DRAW-based duel: one owning state machine (DECISIONS D03).
//
//   idle → cinematic → faceoff → tension → shooting → resolution → result → return → idle
//
// Core invariants:
//   * Nobody may legally shoot before DRAW. A player early shot is an
//     immediate false start (loss, clearly announced). The AI's first shot
//     is *scheduled* only when the SHOOTING state begins, so it can never
//     fire early.
//   * The pre-DRAW delay is randomized every duel (1.2–2.6 s) — fair, but
//     not memorizable.
//   * Hits come from a real ray (muzzle → reticle) vs. a forgiving hitbox
//     around the opponent's swaying chest. Nothing is secretly auto-aimed.
//   * Near-simultaneous hits resolve deterministically: the earlier shot
//     wins; a tie (≤ 120 ms) goes to the player.
//   * One enter()/exit() pair; all timers are local to this instance and are
//     cleared on exit, so a previous duel can never fire in a later one.

import * as THREE from '../vendor/three.module.js';
import { RIG_MAT } from './player.js';

// Predefined duel positions. Regular duels happen on the open ground south
// of the main street (the cabins make a backdrop); the final showdown uses
// the rock-ringed Showdown Ground north of the street.
const SPOTS = {
  regular: { px: 0, pz: 10, ox: 0, oz: 18, playerFacing: 0, oppFacing: Math.PI, camYaw: Math.PI },
  final:   { px: 0, pz: -22, ox: 0, oz: -30, playerFacing: Math.PI, oppFacing: 0, camYaw: 0 },
};

const DRAW_MIN = 1.2, DRAW_SPREAD = 1.4; // randomized pre-DRAW delay
const PLAYER_SHOTS = 2;
const AI_SHOTS = 2;
const SHOT_COOLDOWN = 0.5;
const SIM_WINDOW = 0.12; // near-simultaneous resolution window (s)
const AIM_MAX = 1.25;    // max reticle offset from the opponent (m)

export class Duel {
  constructor(ctx) {
    this.ctx = ctx; // { scene, player, camera, input, hud, audio, state }
    this.active = false;
    this.state = 'idle';
    this.opponent = null;
    this.lastResult = null;
    this.lastOpponent = null;
    this.spot = null;
    this.timer = 0;
    this.shootClock = 0;
    this.drawDelay = 0;
    this.playerShots = 0;
    this.aiShots = 0;
    this.aiFireAt = 0;
    this.aiHitTime = null;
    this.playerHitTime = null;
    this.result = null;
    this.cooldown = 0;
    this.aim = new THREE.Vector2(0, 0); // reticle offset, meters at opponent distance
    this._fx = [];
    this._drawTime = 0;
    this._swayT = 0;
    this._oppBase = new THREE.Vector3();
    this._playerStart = new THREE.Vector3();
    this._chest = new THREE.Vector3();
    this._v = new THREE.Vector3();
    this._v2 = new THREE.Vector3();
    this._ray = new THREE.Ray();
    this._box = new THREE.Box3();
    this._hitPoint = new THREE.Vector3();
    // Dev/test seam (smoke.html): force shot outcomes deterministically.
    this.debug = { forcePlayerHit: null, forceAiHit: null };
  }

  // --- lifecycle -------------------------------------------------------------

  start(opp) {
    if (this.active) return false;
    this.opponent = opp;
    this.ctx.opponent = opp;
    this.ctx.input.resetAction(); // a trigger held from before must not fire on DRAW
    this.spot = opp.final ? SPOTS.final : SPOTS.regular;
    this.active = true;
    this.result = null;
    this.lastResult = null;
    this.playerShots = 0;
    this.aiShots = 0;
    this.aiHitTime = null;
    this.playerHitTime = null;
    this.cooldown = 0;
    this.aim.set(0, 0);
    this._fx.length = 0;
    this._swayT = Math.random() * 6;
    this._drawTime = 0;
    this._playerStart.copy(this.ctx.player.group.position);
    const s = this.spot;
    this.ctx.player.place(s.px, s.pz, s.playerFacing);
    opp.place(s.ox, s.oz, s.oppFacing);
    opp.state = 'inDuel';
    this._oppBase.set(s.ox, 0, s.oz);
    this._setCam('cinematic');
    this._to('cinematic');
    this.ctx.hud.duelStart(opp);
    this.ctx.audio.duelStart();
    return true;
  }

  /** Called by main every frame (only while unpaused). */
  update(dt, simTime) {
    if (!this.active) return;
    const { player, hud, audio, input, camera } = this.ctx;
    const opp = this.opponent;
    this.timer += dt;
    this._swayT += dt;

    switch (this.state) {
      case 'cinematic':
        if (this.timer > 1.8) this._to('faceoff');
        break;

      case 'faceoff':
        if (this.timer > 0.35) player.setDrawPose();
        if (this.timer > 1.5) {
          this.drawDelay = DRAW_MIN + Math.random() * DRAW_SPREAD;
          this._to('tension');
        }
        break;

      case 'tension':
        if (input.consumeShootEdge()) { this._falseStart(); break; }
        if (this.timer >= this.drawDelay) {
          const d = opp.diff;
          const hes = Math.random() < d.hesitation ? d.reactionMs : 0;
          this.aiFireAt = (d.reactionMs + hes + d.aimMs) / 1000;
          this._drawTime = simTime;
          this._to('shooting');
          hud.draw();
          audio.draw();
        }
        break;

      case 'shooting': {
        this.shootClock += dt;
        this.cooldown = Math.max(0, this.cooldown - dt);
        if (this.aiShots < AI_SHOTS && this.shootClock >= this.aiFireAt) this._aiFire();
        // A confirmed AI hit waits for the near-simultaneous window.
        if (this.aiHitTime !== null && this.playerHitTime === null &&
            this.shootClock - this.aiHitTime > SIM_WINDOW) {
          player.playHit();
          this._resolve('lose', simTime);
        } else {
          if (input.consumeShoot()) this._playerFire(simTime);
          // Both out of shots, nobody hit → draw.
          if (this.state === 'shooting' && this.playerShots >= PLAYER_SHOTS &&
              this.aiShots >= AI_SHOTS && this.aiHitTime === null && this.shootClock > 0.8) {
            this._resolve('draw', simTime);
          }
          if (this.state === 'shooting' && this.shootClock > 8) this._resolve('draw', simTime);
        }
        break;
      }

      case 'resolution':
        if (this.timer > 1.6) this._to('result');
        break;

      case 'result':
        if (this.timer > 3.0) this._to('return');
        break;

      case 'return':
        if (this.timer > 1.1) this._finish();
        break;
    }

    // Opponent sway (visual + hitbox) while the duel owns the rig.
    if (opp.state === 'inDuel') {
      const t = this._swayT;
      opp.group.position.x = this._oppBase.x + Math.sin(t * 1.7) * 0.1;
      opp.group.position.z = this._oppBase.z + Math.sin(t * 1.1) * 0.06;
      opp.parts.torso.position.y = 1.32 + Math.sin(t * 2.1) * 0.05;
    }
    // Player fall + recoil animation.
    player.animateHit(dt);
    if (player._recoil > 0) {
      player._recoil = Math.max(0, player._recoil - dt * 4);
      player.parts.armR.rotation.x = -Math.PI / 2 - 0.12 + player._recoil * 0.35;
    }
    // Transient FX.
    for (let i = this._fx.length - 1; i >= 0; i--) {
      const f = this._fx[i];
      f.t += dt;
      const k = f.t / f.dur;
      if (k >= 1) {
        this.ctx.scene.remove(f.mesh);
        f.mesh.traverse((c) => {
          if (c.geometry) c.geometry.dispose();
          if (c.material && c.material !== RIG_MAT) c.material.dispose();
        });
        this._fx.splice(i, 1);
      } else f.update(k);
    }
    this._updateReticle();
  }

  _to(state) {
    this.state = state;
    this.timer = 0;
    if (state === 'shooting') this.shootClock = 0;
    this._setCam(state);
    const { hud } = this.ctx;
    if (state === 'faceoff') hud.duelState('READY...');
    if (state === 'tension') hud.duelState('...');
    if (state === 'shooting') hud.duelState('DRAW!');
    if (state === 'resolution' || state === 'result') hud.duelState('');
  }

  _setCam(state) {
    const { camera } = this.ctx;
    const { spot } = this;
    if (state === 'return') { camera.setMode('exploration'); return; }
    if (state === 'cinematic' || state === 'faceoff' || state === 'tension') {
      camera.setMode('duel', { yaw: Math.PI / 2, pitch: 0.06, distance: 8.5, lookHeight: 1.3 });
    } else {
      camera.setMode('duel', { yaw: spot.camYaw, pitch: 0.16, distance: 5.5, lookHeight: 1.35 });
    }
  }

  /** Where the orbit rig should follow while the duel is active. */
  followTarget(out) {
    if (!this.active) return null;
    const p = this.ctx.player.group.position;
    const o = this.opponent.group.position;
    if (this.state === 'cinematic' || this.state === 'faceoff' || this.state === 'tension') {
      out.set((p.x + o.x) / 2, 0, (p.z + o.z) / 2);
    } else {
      out.copy(p);
    }
    return out;
  }

  _finish() {
    const { player, opponent: opp, camera, hud } = this.ctx;
    player.place(this._playerStart.x, this._playerStart.z, player.facing);
    opp.returnHome();
    camera.setMode('exploration');
    hud.duelEnd();
    this.lastResult = this.result;
    this.lastOpponent = opp;
    this.active = false;
    this.state = 'idle';
    this.opponent = null;
    this.ctx.opponent = null;
  }

  // --- shooting ---------------------------------------------------------------

  _falseStart() {
    const { player, audio, hud, state } = this.ctx;
    this.result = 'falsestart';
    this._muzzleFx(player);
    player._recoil = 1;
    audio.shot();
    player.playHit();
    audio.defeat();
    state.duelsLost++;
    const cost = Math.min(10, state.money);
    state.money -= cost;
    hud.resultFalseStart(cost);
    this._to('resolution');
  }

  _aiFire() {
    const { player, opponent: opp, audio, hud } = this.ctx;
    this.aiShots++;
    opp.parts.armR.rotation.x = -Math.PI / 2 - 0.12;
    this._muzzleFx(opp);
    audio.shot();
    let hit = Math.random() < opp.diff.accuracy;
    if (this.debug.forceAiHit !== null) hit = this.debug.forceAiHit;
    if (hit) {
      this.aiHitTime = this.shootClock;
      audio.hit();
      this._impactFx(player, true);
      hud.shotResult('hit');
    } else {
      audio.miss();
      this._impactFx(player, false);
      hud.shotResult('miss');
      if (this.aiShots < AI_SHOTS) this.aiFireAt = this.shootClock + 0.8 + Math.random() * 0.6;
    }
  }

  _playerFire(simTime) {
    const { player, audio, hud, state } = this.ctx;
    if (this.cooldown > 0 || this.playerShots >= PLAYER_SHOTS) {
      audio.dryFire();
      return;
    }
    this.playerShots++;
    this.cooldown = SHOT_COOLDOWN;
    let hit = this._playerShotHits();
    if (this.debug.forcePlayerHit !== null) hit = this.debug.forcePlayerHit;
    this._muzzleFx(player);
    player._recoil = 1;
    audio.shot();
    const tp = this.shootClock;
    if (hit) {
      this.playerHitTime = tp;
      this.opponent.playHit(this.spot.oppFacing);
      this._popHat(this.opponent);
      audio.hit();
      this._impactFx(this.opponent, true);
      hud.shotResult('hit');
      // Deterministic near-simultaneous resolution.
      if (this.aiHitTime !== null && tp > this.aiHitTime + SIM_WINDOW) {
        player.playHit();
        this._resolve('lose', simTime);
      } else {
        this._resolve('win', simTime);
      }
    } else {
      audio.miss();
      this._impactFx(this.opponent, false);
      hud.shotResult('miss');
    }
  }

  /** Real 3D hit test: ray from the muzzle through the reticle vs. the
   *  opponent's (accuracy-scaled) hitbox around the swaying chest. */
  _playerShotHits() {
    const { camera, player, opponent: opp, state } = this.ctx;
    const p = opp.group.position;
    const t = this._swayT;
    this._chest.set(
      p.x + Math.sin(t * 1.7) * 0.1,
      1.35 + Math.sin(t * 2.1) * 0.05,
      p.z + Math.sin(t * 1.1) * 0.06,
    );
    // Reticle world point: chest + camera-space offset.
    const cam = camera.camera;
    this._v.setFromMatrixColumn(cam.matrixWorld, 0); // camera right
    this._v2.set(0, 1, 0).applyQuaternion(cam.quaternion); // camera up
    const ret = this._hitPoint.copy(this._chest)
      .addScaledVector(this._v, this.aim.x)
      .addScaledVector(this._v2, this.aim.y);
    player.muzzleWorld(this._v);
    const dir = this._v2.copy(ret).sub(this._v);
    if (dir.lengthSq() < 1e-6) return false;
    dir.normalize();
    this._ray.origin.copy(this._v);
    this._ray.direction.copy(dir);
    const s = state.accuracyScale();
    this._box.min.set(this._chest.x - 0.45 * s, this._chest.y - 0.7 * s, this._chest.z - 0.35 * s);
    this._box.max.set(this._chest.x + 0.45 * s, this._chest.y + 0.7 * s, this._chest.z + 0.35 * s);
    return this._ray.intersectBox(this._box, this._hitPoint) !== null;
  }

  _resolve(result, simTime) {
    this.result = result;
    const { hud, audio, state, opponent: opp } = this.ctx;
    if (result === 'win') {
      state.duelsWon++;
      if (this._drawTime > 0) {
        const ms = (simTime - this._drawTime) * 1000;
        if (ms < state.fastestDuelMs) state.fastestDuelMs = ms;
      }
      state.money += opp.reward.money;
      state.moneyEarned += opp.reward.money;
      state.reputation += opp.reward.rep;
      audio.reward();
      hud.resultWin(opp);
    } else if (result === 'lose' || result === 'falsestart') {
      state.duelsLost++;
      const cost = Math.min(10, state.money);
      state.money -= cost;
      audio.defeat();
      hud.resultLose(result === 'falsestart', cost);
    } else {
      hud.resultDraw();
    }
    this._to('resolution');
  }

  // --- aim / reticle -----------------------------------------------------------

  /** Feed raw aim deltas (px) from mouse or touch. */
  addAim(dxPx, dyPx) {
    if (!this.active) return;
    if (this.state !== 'shooting' && this.state !== 'tension' && this.state !== 'faceoff') return;
    const { camera, opponent: opp, state } = this.ctx;
    const cam = camera.camera;
    const p = opp.group.position;
    const dist = Math.max(1, cam.position.distanceTo(this._chest.set(p.x, 1.35, p.z)));
    const pxPerM = window.innerHeight / (2 * Math.tan(THREE.MathUtils.degToRad(cam.fov) / 2) * dist);
    const k = state.aimSpeed();
    this.aim.x += (dxPx / pxPerM) * k;
    this.aim.y -= (dyPx / pxPerM) * k;
    const r = Math.hypot(this.aim.x, this.aim.y);
    if (r > AIM_MAX) { this.aim.x *= AIM_MAX / r; this.aim.y *= AIM_MAX / r; }
  }

  _updateReticle() {
    const { hud, camera, opponent: opp } = this.ctx;
    const show = this.active && (this.state === 'faceoff' || this.state === 'tension' || this.state === 'shooting');
    if (!show) { hud.setReticle(0, 0, false); return; }
    const cam = camera.camera;
    const p = opp.group.position;
    const t = this._swayT;
    this._chest.set(p.x + Math.sin(t * 1.7) * 0.1, 1.35 + Math.sin(t * 2.1) * 0.05, p.z + Math.sin(t * 1.1) * 0.06);
    this._v.copy(this._chest).project(cam);
    if (this._v.z > 1) { hud.setReticle(0, 0, false); return; }
    const w = window.innerWidth, h = window.innerHeight;
    const sx = (this._v.x * 0.5 + 0.5) * w;
    const sy = (-this._v.y * 0.5 + 0.5) * h;
    const dist = Math.max(1, cam.position.distanceTo(this._chest));
    const pxPerM = h / (2 * Math.tan(THREE.MathUtils.degToRad(cam.fov) / 2) * dist);
    hud.setReticle(sx + this.aim.x * pxPerM, sy - this.aim.y * pxPerM, true);
  }

  // --- FX -----------------------------------------------------------------------

  _fxAdd(mesh, dur, update) {
    this.ctx.scene.add(mesh);
    this._fx.push({ mesh, t: 0, dur, update });
  }

  _muzzleFx(who) {
    const { scene } = this.ctx;
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.22, 0.3),
      new THREE.MeshBasicMaterial({ color: 0xffd870, transparent: true }),
    );
    who.muzzleWorld ? who.muzzleWorld(this._v) : this._v.copy(who.group.position).add(this._v2.set(0.6, 1.5, 0.4));
    m.position.copy(this._v);
    m.rotation.y = who.group.rotation.y;
    this._fxAdd(m, 0.09, (k) => {
      m.material.opacity = 1 - k;
      m.scale.setScalar(1 + k * 1.6);
    });
    // Smoke puffs.
    for (let i = 0; i < 3; i++) {
      const s = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 0.14, 0.14),
        new THREE.MeshBasicMaterial({ color: 0xbfb8a8, transparent: true, opacity: 0.7 }),
      );
      s.position.copy(this._v);
      const ox = (Math.random() - 0.5) * 0.3, oz = (Math.random() - 0.5) * 0.3;
      this._fxAdd(s, 0.9 + i * 0.15, (k) => {
        s.position.y += 0.012 + k * 0.01;
        s.position.x += ox * 0.01;
        s.position.z += oz * 0.01;
        s.material.opacity = 0.7 * (1 - k);
        s.scale.setScalar(1 + k * 1.8);
      });
    }
  }

  _impactFx(who, hit) {
    const p = who.group.position;
    const color = hit ? 0xd8c49a : 0xc9b28a;
    for (let i = 0; i < 5; i++) {
      const s = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 0.16, 0.16),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 }),
      );
      s.position.set(p.x + (Math.random() - 0.5) * 0.4, 1.2 + Math.random() * 0.5, p.z + (Math.random() - 0.5) * 0.4);
      const a = Math.random() * Math.PI * 2;
      this._fxAdd(s, 0.5, (k) => {
        s.position.x += Math.cos(a) * 0.03;
        s.position.z += Math.sin(a) * 0.03;
        s.position.y += 0.008;
        s.material.opacity = 0.9 * (1 - k);
        s.scale.setScalar(1 + k);
      });
    }
  }

  /** Cartoon hit: the hat crown pops off and flies. */
  _popHat(opp) {
    const crown = opp.parts.hatCrown;
    if (!crown || !crown.visible) return;
    crown.visible = false;
    // Clone the geometry (the FX cleanup disposes it); share the rig material.
    const fly = new THREE.Mesh(crown.geometry.clone(), crown.material);
    fly.position.copy(crown.getWorldPosition(this._v));
    fly.rotation.set(0.4, 0.8, 0.2);
    this._fxAdd(fly, 1.1, (k) => {
      fly.position.y += 0.05 - k * 0.09;
      fly.position.x += 0.02;
      fly.rotation.x += 0.15;
      fly.rotation.z += 0.1;
    });
  }
}
