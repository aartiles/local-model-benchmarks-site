// src/game.js — run state machine, arcade physics, collisions/penalties,
// checkpoints, medals, and the two camera modes:
//   virtual  — chase camera behind the textured coupe
//   physical — camera aimed so the road contact point (rig origin) projects
//              exactly onto the calibrated anchor where the toy sits
import * as THREE from '../vendor/three.module.min.js';
import {
  ROUTE_LENGTH, EDGE_LIMIT, CHECKPOINTS, PENALTY_SECONDS, MEDALS, CAR,
  PHYSICAL_CAM, VIRTUAL_CAM, fmtTime,
} from './config.js';
import { saveSettings } from './storage.js';

const UP = new THREE.Vector3(0, 1, 0);
const ORIGIN = new THREE.Vector3(0, 0, 0);
const _v = new THREE.Vector3();
const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _s = new THREE.Vector3(1, 1, 1);

export class Game {
  constructor(opts) {
    Object.assign(this, opts); // scene, camera, renderer, world, route, layout, car, input, hud, audio, settings
    this.phase = 'menu';       // menu | setup | ready | driving | paused | finished
    this.mode = 'virtual';     // virtual | physical
    this.timeScale = 1;        // test hook
    this.autoDrive = false;    // test hook bot
    this.shake = 0;
    this._camYaw = this.settings.camYaw || 0;
    this._resetRun();
  }

  _resetRun() {
    this.s = 0; this.x = 0; this.theta = 0; this.v = 0;
    this.clock = 0; this.penaltyCount = 0; this.penaltySeconds = 0;
    this.cpPassed = 0; this.topSpeed = 0; this.finished = false; this.final = null;
    this._hazardIdx = 0;
    this._edgeZones = new Set();
    this._lastOffroad = false;
    for (const h of this.world.hazardRegistry.values()) h.triggered = false;
  }

  // ---------- mode / flow ----------
  setMode(mode) {
    this.mode = mode;
    saveSettings({ mode });
    this.hud.setModeLabel(mode);
    if (mode === 'physical') {
      this.car.group.visible = false;
      if (!this.settings.anchor) { this.enterSetup(); return; }
    } else {
      this.car.group.visible = true;
    }
    this.startRun();
  }

  enterSetup() {
    this.phase = 'setup';
    this.car.group.visible = false;
    this.hud.showScreen('setup');
    this.hud.showHud(false);
    const a = this.settings.anchor;
    if (a) this.hud.setMarker(a.x, a.y); else this.hud.hideMarker();
    this.hud.el.camDist.value = String(this.settings.camDist ?? PHYSICAL_CAM.defaultDist);
  }

  setAnchorCandidate(nx, ny) {
    nx = Math.max(0.02, Math.min(0.98, nx));
    ny = Math.max(0.05, Math.min(0.95, ny));
    this._anchorCandidate = { x: nx, y: ny };
    this.hud.setMarker(nx, ny);
    this.hud.el.btnAnchorSave.disabled = false;
  }

  saveAnchor() {
    const a = this._anchorCandidate || this.settings.anchor;
    if (!a) return;
    this.settings = saveSettings({ anchor: a, camDist: Number(this.hud.el.camDist.value) });
    this.mode = 'physical';
    saveSettings({ mode: 'physical' });
    this.hud.setModeLabel('physical');
    this.hud.hideMarker();
    this.hud.setPhysicalSub(true);
    this.car.group.visible = false;
    this.startRun();
  }

  startRun() {
    this._resetRun();
    this.phase = 'ready';
    this.hud.showScreen(null);
    this.hud.showHud(true);
    this.hud.hideMarker();
    this.hud.banner('READY', '', 1600);
    this.hud.toast('first throttle starts the clock — steer left pad, pedals right', 3200);
    this._syncCamera(true);
  }

  restart() { this.startRun(); }

  quitToMenu() {
    this.phase = 'menu';
    this.hud.showScreen('menu');
    this.hud.showHud(false);
    this.hud.hideMarker();
    this.audio.idle();
  }

  pause() {
    if (this.phase !== 'driving') return;
    this.phase = 'paused';
    this.hud.pauseStats(this._state());
    this.hud.showScreen('pause');
    this.audio.idle();
  }

  resume() {
    if (this.phase !== 'paused') return;
    this.phase = 'driving';
    this.hud.showScreen(null);
    this.hud.banner('GO', '', 700);
  }

  togglePause() {
    if (this.phase === 'driving') this.pause();
    else if (this.phase === 'paused') this.resume();
  }

  onHidden() { if (this.phase === 'driving') this.pause(); }

  finish() {
    this.phase = 'finished';
    this.final = this.clock + this.penaltySeconds;
    const medal = this.final <= MEDALS.gold ? 'gold' : this.final <= MEDALS.silver ? 'silver' : 'bronze';
    const prevBest = this.settings.best[this.mode];
    const best = prevBest == null ? this.final : Math.min(prevBest, this.final);
    this.settings = saveSettings({ best: { ...this.settings.best, [this.mode]: best } });
    this.hud.showResult(this._state(), best, this.mode);
    this.hud.showHud(true);
    this.audio.medal(medal);
  }

  _state() {
    return {
      s: this.s, x: this.x, theta: this.theta, v: this.v, clock: this.clock,
      penaltyCount: this.penaltyCount, penaltySeconds: this.penaltySeconds,
      cpPassed: this.cpPassed, topSpeed: this.topSpeed, final: this.final, phase: this.phase, mode: this.mode,
    };
  }

  // ---------- per-frame ----------
  update(dtReal) {
    const dt = Math.min(0.05, dtReal) * this.timeScale;
    this.input.update(Math.min(0.05, dtReal));

    // the test autopilot also runs while ready, so it can start the run itself
    if (this.autoDrive && (this.phase === 'ready' || this.phase === 'driving')) this._bot();

    if (this.phase === 'ready' && this.input.throttle > 0.05) {
      this.phase = 'driving';
      this.hud.banner('GO!', '', 800);
      this.audio.go();
    }

    if (this.phase === 'driving') {
      const u = this.input.steer, th = this.input.throttle, br = this.input.brake;
      const sm = this.route.sample(this.s, {});

      // longitudinal
      let a = th * 13.5 - br * 30 - (0.0042 * this.v * this.v + 0.10 * this.v);
      const offroad = Math.abs(this.x) > EDGE_LIMIT;
      if (offroad) a -= 9 + this.v * 0.25;
      this.v = Math.max(0, this.v + a * dt);
      if (br > 0 && this.v < 0.4) this.v = 0;
      this.topSpeed = Math.max(this.topSpeed, this.v);
      this.s += this.v * dt;

      // heading relative to the road tangent + lateral offset
      const rate = Math.min(1.9, 0.75 + 24 / (this.v + 14));
      this.theta += (u * rate - this.v * sm.k) * dt;
      this.theta = THREE.MathUtils.clamp(this.theta, -0.6, 0.6);
      this.x += this.v * Math.sin(this.theta) * dt;
      if (this.x > 26) { this.x = 26; this.v *= 0.98; }
      if (this.x < -26) { this.x = -26; this.v *= 0.98; }

      this.clock += dt;
      this._collisions();
      this._checkpoints();
      if (this.s >= ROUTE_LENGTH) { this.s = ROUTE_LENGTH; this.finish(); }
      this.audio.update(this.v, th, Math.abs(this.theta) > 0.22 && Math.abs(u) > 0.4 && this.v > 8);
    } else if (this.phase === 'ready' || this.phase === 'setup') {
      this.audio.update(0, 0, false);
    }

    this.shake = Math.max(0, this.shake - dtReal * 2.2);
    this._updateWorld();
    this._syncCamera(false);
    if (this.phase === 'driving' || this.phase === 'ready' || this.phase === 'paused' || this.phase === 'finished') {
      this.hud.update(this._state());
    }
  }

  _bot() {
    // simple test autopilot: follow the bend ahead and keep near the centre
    const smA = this.route.sample(this.s + 6, {});
    const smB = this.route.sample(this.s + Math.max(12, this.v * 1.2), {});
    const kAhead = Math.max(Math.abs(smA.k), Math.abs(smB.k));
    const rate = Math.min(1.9, 0.75 + 24 / (this.v + 14));
    const ff = (this.v * smA.k) / Math.max(0.4, rate); // steering needed for the bend
    const u = THREE.MathUtils.clamp(ff - this.x * 0.14 - this.theta * 0.85, -1, 1);
    const vTarget = kAhead > 0.011 ? 19 : kAhead > 0.007 ? 27 : 40;
    const th = this.v < vTarget ? 1 : 0.2;
    const br = this.v > vTarget + 3 ? 0.6 : 0;
    this.input._debugSet(u, th, br);
  }

  _collisions() {
    const hazards = this.layout.hazards;
    // hazards are sorted by s; scan a window around the car
    while (this._hazardIdx < hazards.length && hazards[this._hazardIdx].s < this.s - 8) this._hazardIdx++;
    for (let i = this._hazardIdx; i < hazards.length && hazards[i].s < this.s + 8; i++) {
      const h = hazards[i];
      if (h.triggered) continue;
      const ds = h.s - this.s, dx = h.x - this.x;
      if (Math.abs(ds) < CAR.halfLen + 0.55 && Math.abs(dx) < CAR.halfW + 0.5) {
        h.triggered = true;
        this.penaltyCount++; this.penaltySeconds += PENALTY_SECONDS;
        this.v *= 0.38;
        this.theta = THREE.MathUtils.clamp(this.theta + Math.sign(dx || 1) * 0.3, -0.6, 0.6);
        this.shake = 1;
        this._tipOver(h);
        this.audio.crash(); this.audio.penalty();
        this.hud.banner('+' + PENALTY_SECONDS + 's ' + h.type.toUpperCase(), 'penalty', 1100);
      }
    }
    // road edge hazard: leaving the carriageway is a distinct collision per 40 m zone
    const offroad = Math.abs(this.x) > EDGE_LIMIT;
    if (offroad && !this._lastOffroad) {
      const zone = Math.floor(this.s / 40);
      if (!this._edgeZones.has(zone)) {
        this._edgeZones.add(zone);
        this.penaltyCount++; this.penaltySeconds += PENALTY_SECONDS;
        this.v *= 0.55; this.shake = 0.8;
        this.audio.crash(); this.audio.penalty();
        this.hud.banner('+' + PENALTY_SECONDS + 's OFF ROAD', 'penalty', 1100);
      }
    }
    this._lastOffroad = offroad;
  }

  _tipOver(h) {
    const reg = this.world.hazardRegistry.get(h.id);
    if (!reg) return;
    reg.mesh.getMatrixAt(reg.index, _m);
    _m.decompose(_v, _q, _s);
    _q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2 * 0.92));
    _m.compose(_v, _q, _s);
    reg.mesh.setMatrixAt(reg.index, _m);
    reg.mesh.instanceMatrix.needsUpdate = true;
  }

  _checkpoints() {
    if (this.cpPassed < CHECKPOINTS.length && this.s >= CHECKPOINTS[this.cpPassed]) {
      this.cpPassed++;
      if (this.cpPassed < CHECKPOINTS.length) {
        this.hud.banner('CHECKPOINT ' + this.cpPassed, 'cp', 1000);
        this.audio.chime();
      }
    }
  }

  // ---------- world + camera ----------
  _updateWorld() {
    const sm = this.route.sample(this.s, {});
    const yaw = Math.atan2(sm.t.x, sm.t.z) + this.theta;
    this.world.worldRoot.quaternion.setFromAxisAngle(UP, -yaw);
    const p = this.route.pointAt(this.s, this.x, _v);
    this.world.worldRoot.position.copy(p).applyAxisAngle(UP, -yaw).negate();
    // car mesh: rig is aligned to the car heading, so yaw 0; pitch on slopes, roll on banks
    const ahead = this.route.sample(Math.min(ROUTE_LENGTH, this.s + 3), {});
    const behind = this.route.sample(Math.max(0, this.s - 3), {});
    const dy = ahead.p.y - behind.p.y;
    this.car.group.rotation.set(0, 0, sm.b);
    this.car.group.rotation.x = -Math.atan2(dy, 6) * 0.85;
    this.car.group.position.set(0, 0, 0);
    this.world.sky.position.set(0, 0, 0);
  }

  _syncCamera(force) {
    const cam = this.camera;
    if (this.freeCam) { // debug/test free camera
      cam.position.set(...this.freeCam.p);
      cam.lookAt(...this.freeCam.t);
      return;
    }
    if (this.mode === 'virtual') {
      // chase view
      cam.fov = VIRTUAL_CAM.fovBase + (VIRTUAL_CAM.fovMax - VIRTUAL_CAM.fovBase) * Math.min(1, this.v / 45);
      cam.updateProjectionMatrix();
      const sh = this.shake * this.shake;
      cam.position.set(
        (Math.random() - 0.5) * 0.5 * sh,
        VIRTUAL_CAM.height + (Math.random() - 0.5) * 0.3 * sh,
        -VIRTUAL_CAM.back,
      );
      cam.lookAt(0, VIRTUAL_CAM.lookY, VIRTUAL_CAM.lookAhead);
      return;
    }
    // physical mode: camera on a cone BEHIND the contact point, aimed so the
    // contact point (origin) projects exactly onto the calibrated anchor.
    const anchor = this.phase === 'setup' && this._anchorCandidate ? this._anchorCandidate : this.settings.anchor;
    const D = Number(this.hud.el.camDist ? this.hud.el.camDist.value : this.settings.camDist) || this.settings.camDist || PHYSICAL_CAM.defaultDist;
    const yaw = this._camYaw;
    const H = D * PHYSICAL_CAM.elevTan;
    cam.fov = PHYSICAL_CAM.fov;
    cam.updateProjectionMatrix();
    cam.position.set(Math.sin(yaw) * D, H, -Math.cos(yaw) * D);
    if (!anchor) { cam.lookAt(ORIGIN); return; }
    const ax = anchor.x * 2 - 1, ay = 1 - anchor.y * 2;
    // iterative aim: pan the look target until origin lands on the anchor pixel
    const target = _v.set(0, 0, 0).clone();
    for (let i = 0; i < 8; i++) {
      cam.lookAt(target);
      cam.updateMatrixWorld();
      const ndc = ORIGIN.clone().project(cam);
      const ex = ax - ndc.x, ey = ay - ndc.y;
      if (Math.abs(ex) < 0.0005 && Math.abs(ey) < 0.0005) break;
      const dist = cam.position.distanceTo(target);
      const tX = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * cam.aspect;
      const tY = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
      const right = new THREE.Vector3().setFromMatrixColumn(cam.matrixWorld, 0);
      const upv = new THREE.Vector3().setFromMatrixColumn(cam.matrixWorld, 1);
      target.addScaledVector(right, -ex * dist * tX).addScaledVector(upv, -ey * dist * tY);
    }
    cam.lookAt(target);
    cam.updateMatrixWorld();
  }

  setCamYaw(yaw) { this._camYaw = yaw; saveSettings({ camYaw: yaw }); }

  // distance in pixels between the projected contact point and the anchor
  anchorErrorPx() {
    const anchor = this.settings.anchor;
    if (!anchor || this.mode !== 'physical') return null;
    const ndc = ORIGIN.clone().project(this.camera);
    const px = (ndc.x + 1) / 2 * this.renderer.domElement.clientWidth;
    const py = (1 - ndc.y) / 2 * this.renderer.domElement.clientHeight;
    const ax = anchor.x * this.renderer.domElement.clientWidth;
    const ay = anchor.y * this.renderer.domElement.clientHeight;
    return Math.hypot(px - ax, py - ay);
  }
}
