// src/hud.js — all DOM UI: exploration HUD, duel overlay, reticle, banners,
// shop panel, victory screen, touch controls. The game code calls into this;
// it never calls back except through the registered callbacks.

export class Hud {
  constructor() {
    this.el = {
      hud: document.getElementById('hud'),
      money: document.getElementById('hud-money'),
      rep: document.getElementById('hud-rep'),
      objective: document.getElementById('hud-objective'),
      prompt: document.getElementById('hud-prompt'),
      duelHud: document.getElementById('duel-hud'),
      duelName: document.getElementById('duel-name'),
      duelState: document.getElementById('duel-state'),
      reticle: document.getElementById('reticle'),
      banner: document.getElementById('banner'),
      bannerSub: document.getElementById('banner-sub'),
      victory: document.getElementById('victory-screen'),
      victoryStats: document.getElementById('victory-stats'),
      playAgain: document.getElementById('play-again-btn'),
      shop: document.getElementById('shop-panel'),
      shopItems: document.getElementById('shop-items'),
      shopMoney: document.getElementById('shop-money'),
      shopClose: document.getElementById('shop-close'),
      touch: document.getElementById('touch-ui'),
      touchInteract: document.getElementById('touch-interact'),
    };
    this._bannerTimer = 0;
    this._stateTimer = 0;
    this._isTouch = false;
  }

  setTouchMode(on) {
    this._isTouch = on;
    this.el.touch.classList.toggle('hidden', !on);
    this.el.hud.classList.toggle('hud-touch', on);
  }

  show() { this.el.hud.classList.remove('hidden'); }
  hide() { this.el.hud.classList.add('hidden'); }

  setStats(money, rep) {
    this.el.money.textContent = '$' + money;
    this.el.rep.textContent = '★ ' + rep;
  }

  setObjective(text) { this.el.objective.textContent = text; }

  setPrompt(text) {
    this.el.prompt.textContent = text;
    this.el.prompt.classList.toggle('hidden', !text);
    this.el.touchInteract.classList.toggle('hidden', !text || !this._isTouch);
  }

  // --- duel overlay -----------------------------------------------------------

  duelStart(opp) {
    this.el.duelHud.classList.remove('hidden');
    this.el.duelName.textContent = opp.name + ' ' + opp.title;
    this.el.duelState.textContent = 'Get ready...';
    this._stateTimer = 1.8;
  }

  duelState(text) {
    this.el.duelState.textContent = text;
    this._stateTimer = text ? 1.2 : 0;
  }

  draw() {
    this.el.duelState.textContent = 'DRAW!';
    this.el.duelState.classList.add('draw');
    this._stateTimer = 1.0;
  }

  setReticle(x, y, visible) {
    const r = this.el.reticle;
    r.style.display = visible ? 'block' : 'none';
    if (visible) { r.style.left = x + 'px'; r.style.top = y + 'px'; }
  }

  shotResult(kind) {
    this._banner(kind === 'hit' ? 'HIT!' : 'MISS', kind === 'hit' ? 'good' : 'bad', 0.8);
  }

  resultWin(opp) {
    this._banner('YOU WIN!', 'good', 2.6);
    this._banner('+$' + opp.reward.money + '   +' + opp.reward.rep + ' Reputation', 'reward', 2.6, true);
  }

  resultLose(falseStart, cost) {
    this._banner(falseStart ? 'TOO EARLY!' : 'YOU LOSE', 'bad', 2.6);
    this._banner(falseStart ? 'False start — you lose the duel' : 'Defeated' + (cost > 0 ? '  -$' + cost : ''), 'sub', 2.6, true);
  }

  resultDraw() {
    this._banner('NO BLOOD DRAWN', 'sub', 2.6);
    this._banner('Both missed — challenge again', 'sub', 2.6, true);
  }

  resultFalseStart(cost) {
    this._banner('TOO EARLY!', 'bad', 2.6);
    this._banner('False start — you lose the duel' + (cost > 0 ? '  -$' + cost : ''), 'sub', 2.6, true);
  }

  duelEnd() {
    this.el.duelHud.classList.add('hidden');
    this.el.duelState.classList.remove('draw');
    this.setReticle(0, 0, false);
  }

  /** Per-frame: fade transient state text. */
  update(dt) {
    if (this._stateTimer > 0) {
      this._stateTimer -= dt;
      if (this._stateTimer <= 0 && this.el.duelState.textContent === 'DRAW!') {
        this.el.duelState.textContent = '';
      }
    }
    if (this._bannerTimer > 0) {
      this._bannerTimer -= dt;
      if (this._bannerTimer <= 0) {
        this.el.banner.className = '';
        this.el.bannerSub.className = '';
      }
    }
  }

  _banner(text, cls, dur, second = false) {
    const b = second ? this.el.bannerSub : this.el.banner;
    b.textContent = text;
    b.className = 'show ' + cls;
    this._bannerTimer = Math.max(this._bannerTimer, dur);
  }

  // --- shop ---------------------------------------------------------------------

  shopOpen(items, money, onBuy, onClose) {
    this.el.shop.classList.remove('hidden');
    this.el.shopMoney.textContent = 'Your money: $' + money;
    this.el.shopItems.innerHTML = '';
    for (const it of items) {
      const row = document.createElement('div');
      row.className = 'shop-row' + (it.owned ? ' owned' : '') + (it.afford ? '' : ' poor');
      const info = document.createElement('div');
      info.innerHTML = `<b>${it.name}</b><br><span>${it.desc}</span>`;
      const btn = document.createElement('button');
      btn.textContent = it.owned ? 'OWNED' : '$' + it.cost;
      btn.disabled = it.owned || !it.afford;
      btn.addEventListener('click', () => onBuy(it.id));
      row.appendChild(info);
      row.appendChild(btn);
      this.el.shopItems.appendChild(row);
    }
    this._onClose = onClose;
  }

  shopClose() {
    this.el.shop.classList.add('hidden');
    this._onClose = null;
  }

  // --- victory --------------------------------------------------------------------

  victory(stats) {
    this.el.victory.classList.remove('hidden');
    const t = Math.floor(stats.playTime);
    const fastest = isFinite(stats.fastestDuelMs) ? (stats.fastestDuelMs / 1000).toFixed(2) + ' s' : '—';
    this.el.victoryStats.innerHTML =
      `Total play time: ${Math.floor(t / 60)}m ${t % 60}s<br>` +
      `Duels won: ${stats.duelsWon}<br>` +
      `Duels lost: ${stats.duelsLost}<br>` +
      `Fastest duel: ${fastest}<br>` +
      `Money earned: $${stats.moneyEarned}`;
  }

  victoryHide() { this.el.victory.classList.add('hidden'); }
}
