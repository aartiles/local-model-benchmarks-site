// src/hud.js — DOM HUD + screen helpers. All element ids come from index.html.
import { fmtTime, ROUTE_LENGTH, CHECKPOINTS, MEDALS } from './config.js';

const $ = (id) => document.getElementById(id);

export class Hud {
  constructor() {
    this.el = {
      hud: $('hud'), controls: $('controls'), time: $('hudTime'), penalty: $('hudPenalty'),
      cp: $('hudCp'), progressFill: $('hudProgressFill'), dist: $('hudDist'),
      speed: $('hudSpeed'), mode: $('hudMode'), banner: $('banner'), toast: $('toast'),
      marker: $('marker'), menu: $('menuScreen'), setup: $('setupScreen'), pause: $('pauseScreen'),
      result: $('resultScreen'), loading: $('loading'), loadFill: $('loadFill'),
      bests: $('bests'), pauseStats: $('pauseStats'), resultStats: $('resultStats'),
      medal: $('medal'), resultTitle: $('resultTitle'), physicalSub: $('physicalSub'),
      muteBtn: $('muteBtn'), btnMute: $('btnMute'), btnCalibrate: $('btnCalibrate'),
      camDist: $('camDist'), btnAnchorSave: $('btnAnchorSave'),
    };
    this._bannerTimer = 0;
    this._toastTimer = 0;
  }

  setLoading(f) { this.el.loadFill.style.width = Math.round(f * 100) + '%'; }
  hideLoading() { this.el.loading.classList.add('hidden'); }

  showScreen(name) {
    for (const k of ['menu', 'setup', 'pause', 'result']) this.el[k].classList.toggle('hidden', k !== name);
    if (!name) for (const k of ['menu', 'setup', 'pause', 'result']) this.el[k].classList.add('hidden');
  }

  showHud(on) {
    this.el.hud.classList.toggle('hidden', !on);
    this.el.controls.classList.toggle('hidden', !on);
  }

  setModeLabel(mode) {
    this.el.mode.textContent = mode === 'physical'
      ? 'PHYSICAL TOY MODE — road locked under the saved marker'
      : 'VIRTUAL MODE — chase camera';
  }

  update(st) {
    this.el.time.textContent = fmtTime(st.clock);
    const pen = st.penaltySeconds;
    this.el.penalty.classList.toggle('hidden', pen <= 0);
    if (pen > 0) this.el.penalty.textContent = '+' + pen.toFixed(0) + 's penalty';
    this.el.cp.textContent = 'CP ' + st.cpPassed + '/' + CHECKPOINTS.length;
    this.el.progressFill.style.width = (Math.min(1, st.s / ROUTE_LENGTH) * 100).toFixed(1) + '%';
    this.el.dist.textContent = Math.floor(st.s) + ' / ' + ROUTE_LENGTH + ' m';
    this.el.speed.textContent = Math.round(st.v * 3.6);
  }

  banner(text, cls = '', ms = 1400) {
    const b = this.el.banner;
    b.textContent = text;
    b.className = cls;
    b.classList.remove('hidden');
    clearTimeout(this._bannerTimer);
    this._bannerTimer = setTimeout(() => b.classList.add('hidden'), ms);
  }

  toast(text, ms = 2200) {
    const t = this.el.toast;
    t.textContent = text;
    t.classList.remove('hidden');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => t.classList.add('hidden'), ms);
  }

  setMarker(nx, ny) {
    const m = this.el.marker;
    m.classList.remove('hidden');
    m.style.left = (nx * 100) + '%';
    m.style.top = (ny * 100) + '%';
  }
  hideMarker() { this.el.marker.classList.add('hidden'); }

  setMuted(muted) {
    this.el.muteBtn.textContent = muted ? '∅' : '♪';
    this.el.muteBtn.classList.toggle('off', muted);
    this.el.btnMute.textContent = 'SOUND: ' + (muted ? 'OFF' : 'ON');
  }

  setBests(best) {
    const f = (x) => (x == null ? '—' : fmtTime(x));
    this.el.bests.innerHTML =
      'PERSONAL BESTS — virtual: <b>' + f(best.virtual) + '</b> · physical toy: <b>' + f(best.physical) + '</b>' +
      '<br>medals: gold ≤ ' + fmtTime(MEDALS.gold) + ' · silver ≤ ' + fmtTime(MEDALS.silver) + ' · bronze after';
  }

  setPhysicalSub(hasAnchor) {
    this.el.physicalSub.textContent = hasAnchor
      ? 'toy anchored — tap to drive again'
      : 'place your toy on the tablet';
    this.el.btnCalibrate.classList.toggle('hidden', !hasAnchor);
  }

  pauseStats(st) {
    this.el.pauseStats.textContent =
      'time ' + fmtTime(st.clock) + '   ·   ' + Math.floor(st.s) + ' / ' + ROUTE_LENGTH + ' m   ·   CP ' + st.cpPassed + '/' + CHECKPOINTS.length +
      '\npenalties +' + st.penaltySeconds.toFixed(0) + 's';
  }

  showResult(st, best, mode) {
    const medal = st.final <= MEDALS.gold ? 'gold' : st.final <= MEDALS.silver ? 'silver' : 'bronze';
    this.el.medal.textContent = medal.toUpperCase();
    this.el.medal.className = 'medal ' + medal;
    this.el.resultTitle.textContent = 'FINISH — ' + (mode === 'physical' ? 'PHYSICAL TOY' : 'VIRTUAL');
    const isBest = best != null && st.final <= best;
    this.el.resultStats.innerHTML =
      'final time <b>' + fmtTime(st.final) + '</b>  (run ' + fmtTime(st.clock) +
      ' + ' + st.penaltySeconds.toFixed(0) + 's penalties ×' + st.penaltyCount + ')<br>' +
      'checkpoints ' + st.cpPassed + '/' + CHECKPOINTS.length + ' · top speed ' + Math.round(st.topSpeed * 3.6) + ' km/h<br>' +
      'best (' + mode + '): <b>' + (best == null ? '—' : fmtTime(best)) + '</b>' + (isBest ? '  ★ NEW BEST' : '');
    this.showScreen('result');
  }
}
