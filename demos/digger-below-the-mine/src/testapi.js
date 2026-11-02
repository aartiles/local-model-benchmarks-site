// src/testapi.js — window.__digger, the surface verify checks drive the game
// with. It may only SET UP state (move the player, set health/battery/ore,
// step frames, press a key); it must never complete an objective directly
// (R63), so victory and defeat always come from the real rules.
//
// T005 adds the input/locomotion surface: press/release go through the real
// Input object (the same one keyboard events feed), teleport places the miner
// on a tile's floor, and setManual freezes real time so stepFrames(n) is exact.
// T006 adds the mining surface (tileAt/region/giveOre, digs/lastDig).
// T007 adds the survival surface: setHealth/setBattery/setLantern/hurt/heal/
// addBattery/setThreat, and health/battery/warnings in snapshot().
// Still to come from later cards:
//   spawnAt                      -> T010 (enemies)
// and T011 routes stepFrames' bare clock through Game.step(dt), so snapshot()
// carries the mission state machine (game/objective) alongside the layers.

export function installTestApi(core) {
  const state = {
    seed: core.world?.seed ?? 1,
    pressed: [],
  };

  const api = {
    ready: false,
    core,
    state,

    // Plain data only: checks read this through page.evaluate, which requires a
    // structured-cloneable value. Never put functions or DOM nodes here.
    snapshot() {
      const p = core.player;
      const w = core.world;
      const g = core.game ? core.game.snapshot() : null;
      return {
        ready: api.ready === true,
        phase: g ? g.state : 'survival',
        // The state machine (T011): title/playing/paused/dead/victory, restarts,
        // transitions, the interaction prompt, and the mission snapshot.
        game: g,
        objective: g ? g.objective : null,
        frames: core.frames,
        time: core.time,
        simSteps: core.simSteps,
        manual: core.manual === true,
        seed: state.seed,
        viewport: { w: core.view.w, h: core.view.h, dpr: core.view.dpr },
        canvas: { width: core.canvas.width, height: core.canvas.height },
        pressed: state.pressed.slice(-8),
        system: core.system.slice(-8),
        // Steps where the miner's body overlapped solid rock: must stay 0.
        solidFrames: core.solidFrames,
        world: {
          source: w.source,
          hash: w.hash(),
          width: w.width,
          height: w.height,
          waterLevel: w.waterLevel,
          waterSurfaceRow: w.waterSurfaceRow,
          spawn: w.point('spawn'),
        },
        player: p
          ? {
              x: p.x,
              y: p.y,
              vx: p.vx,
              vy: p.vy,
              w: p.w,
              h: p.h,
              facing: p.facing,
              onGround: p.onGround,
              state: p.state,
              steps: p.steps,
              jumps: p.jumps,
              bumps: p.bumps,
              tile: p.tile(),
              // Mining (T006): the ore banked, the swing in progress, and the
              // tile the last swing was aimed at.
              ore: p.ore,
              digs: p.digs || 0,
              target: p.target(),
              mining: p.mining ? { x: p.mining.x, y: p.mining.y, id: p.mining.id, t: p.mining.t } : null,
              lastDig: p.lastDig,
              dug: p.dug.slice(-8),
              // Survival (T007): the lantern (R17), health (R18), cells taken
              // (R19), and the warnings that precede each danger (R20).
              health: p.health,
              battery: p.battery,
              lantern: p.lantern,
              lit: p.lit,
              dead: p.dead,
              hits: p.hits,
              hurtTimer: p.hurtTimer,
              pickups: p.pickups,
              lastPickup: p.lastPickup,
              threat: p.threat,
              warnings: p.warnings(),
            }
          : null,
      };
    },

    // Advance the shell clock and paint n frames without waiting for rAF.
    stepFrames(n = 1) {
      const count = Math.max(0, Math.floor(Number(n) || 0));
      for (let i = 0; i < count; i++) core.advance();
      return count;
    },

    // Freeze real time so stepFrames(n) is the only thing that advances the sim.
    setManual(on = true) {
      core.manual = on !== false;
      return core.manual;
    },

    // Feed an action through the real Input object, exactly as a key event does.
    press(action) {
      state.pressed.push(String(action));
      return core.input.down(action);
    },

    release(action) {
      return core.input.up(action);
    },

    // Stand the miner on the floor of tile (tx,ty) at rest. Setup only: the
    // physics and collision that follow are the real ones.
    teleport(tx, ty) {
      const x = Math.max(0, Math.min(core.world.width - 1, Math.floor(Number(tx))));
      const y = Math.max(0, Math.min(core.world.height - 1, Math.floor(Number(ty))));
      core.player.teleport(core.world, x, y);
      core.render();
      return { x, y, px: core.player.x, py: core.player.y };
    },

    // Read the page's live tile grid: one tile, or a (2r+1)^2 block centred on
    // (tx,ty). Read-only, so a check can prove which tiles a swing changed.
    tileAt(tx, ty) {
      return core.world.at(Math.floor(Number(tx)), Math.floor(Number(ty)));
    },

    region(tx, ty, r = 1) {
      const cx = Math.floor(Number(tx));
      const cy = Math.floor(Number(ty));
      const rad = Math.max(0, Math.floor(Number(r)));
      const ids = [];
      for (let y = cy - rad; y <= cy + rad; y++) {
        const row = [];
        for (let x = cx - rad; x <= cx + rad; x++) row.push(core.world.at(x, y));
        ids.push(row);
      }
      return { x0: cx - rad, y0: cy - rad, ids };
    },

    // Put ore in the miner's bag without mining for it. Setup only (R62).
    giveOre(n = 1) {
      core.player.ore = Math.max(0, core.player.ore + Math.floor(Number(n) || 0));
      return core.player.ore;
    },

    // --- survival (T007) ---------------------------------------------------
    // These set up state; the drain, the pickups and the warnings are the real
    // rules running in Player.update(). hurt/heal are the real methods, so a
    // check that damages the miner exercises the same path the enemies will.
    setHealth(n) {
      return core.player.setHealth(n);
    },

    setBattery(n) {
      return core.player.setBattery(n);
    },

    setLantern(on = true) {
      return core.player.setLantern(on !== false);
    },

    hurt(n = 1) {
      return core.player.hurt(n);
    },

    heal(n = 1) {
      return core.player.heal(n);
    },

    addBattery(n = 1) {
      return core.player.addBattery(n);
    },

    // Stand-in for the enemy layer: report how close the nearest threat is, in
    // pixels, or null to report that nothing is close. It never damages the miner
    // here. Once the harness has written a report — any report, a pinned "no
    // threat" included — the live enemy layer cannot overwrite it, so the warning
    // threshold stays testable without a monster in the room (T007, T014).
    // releaseThreat() hands the report back to the real enemies; so does a
    // restart, which builds a new miner and therefore an unpinned one.
    setThreat(dist = null, kind = 'enemy') {
      const t = core.player.setThreat(dist, kind);
      core.player.threatPinned = true;
      return t;
    },

    // Stop overriding the threat report, so from the next step the live enemy
    // layer writes it again (T036). The stale value is cleared with it, so a
    // warning cannot survive the handover.
    releaseThreat() {
      core.player.threatPinned = false;
      return core.player.setThreat(null);
    },

    // Put one monster of `name` at world pixels (x,y) (T036). Setup only (R63):
    // it touches no objective, no health and no win condition — the enemy's own
    // update and the pick swing decide what happens after it appears.
    spawnAt(name, x = 0, y = 0) {
      const g = core.game;
      if (!g || typeof g.spawnEnemy !== 'function') return null;
      const e = g.spawnEnemy(String(name), Number(x), Number(y));
      if (!e) return null;
      core.render();
      return e.snapshot();
    },

    // One live monster's plain record, by index: how a check reads where the
    // seeded monsters started so a restart can be proved to put them back (R27).
    enemyAt(i = 0) {
      const list = core.game ? core.game.enemies : [];
      const e = list[Math.floor(Number(i))];
      return e ? e.snapshot() : null;
    },

    countTile(id) {
      return core.world.count(Math.floor(Number(id) || 0));
    },

    setSeed(n) {
      state.seed = Math.floor(Number(n) || 0);
      if (core.game) core.game.setSeed(state.seed);
      return state.seed;
    },

    // Rebuild the mission through Game.restart() WITHOUT running a step, so a
    // check can compare the restored state against the boot yardstick at the
    // SAME zero-step offset (R27). The `r` key path is proved separately; this
    // exists because one step of a live mission also advances the monsters'
    // animation clock, which is a clock and not mission state.
    restartMission() {
      const g = core.game;
      if (!g || typeof g.restart !== 'function') return null;
      return g.restart();
    },

    // --- whole-mission state (T031, R27) -------------------------------------
    // The entire mission as one plain, comparable record: the grid and the water,
    // the miner's survival and inventory, every live monster, and the objective
    // machine. It deliberately leaves out the clock, the screen state and the
    // restart count, which a restart is ALLOWED to change; what is here is what
    // R27 says must come back exactly as it was.
    missionState() {
      const w = core.world;
      const p = core.player;
      const g = core.game;
      return {
        world: {
          hash: w.hash(),
          waterLevel: w.waterLevel,
          waterSurfaceRow: w.waterSurfaceRow,
          drained: w.drained === true,
          tiles: Array.from(w.tiles),
        },
        player: {
          x: p.x,
          y: p.y,
          facing: p.facing,
          health: p.health,
          battery: p.battery,
          lantern: p.lantern,
          dead: p.dead,
          hits: p.hits,
          pickups: p.pickups,
          ore: p.ore,
          digs: p.digs,
          dug: p.dug.slice(),
          lastDig: p.lastDig,
          lastPickup: p.lastPickup,
          mining: p.mining ? { x: p.mining.x, y: p.mining.y, id: p.mining.id } : null,
        },
        enemies: g ? g.enemies.map((e) => e.snapshot()) : [],
        objective: g ? g.objectives.snapshot() : null,
      };
    },

    // The same record as it was the moment the page booted, before any key was
    // pressed. This is the yardstick a restart is measured against (R27).
    initialState() {
      return state.initial;
    },
  };

  // Captured here, at install time, because this is the only moment the mission
  // is guaranteed untouched: the world is the loaded map, the miner is at spawn
  // at full charge, the monsters are where the seed put them, and no objective
  // has fired. `restart()` must return the game to exactly this.
  state.initial = api.missionState();

  window.__digger = api;
  return api;
}
