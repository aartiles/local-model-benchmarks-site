// src/main.js — entry point for Digger: Below the Mine.
//
// T005/T006 scope: load the authored world, create the miner and the
// keyboard/mouse input, and step them on the fixed timestep from src/config.js,
// so a real key event moves the miner within one step, solid tiles stop him
// (R7, R34, R36), and holding the mine key destroys the tile in front of him and
// banks its ore (R8, R13, R16).
// T007 adds the survival step: Player.update() now drains the lantern while it is
// lit, collects battery cells on touch, and reports the warnings (R17-R20); F
// toggles the lantern, and the glow in the stand-in scene follows the charge so a
// dying lantern is visible in a screenshot.
// T011 adds the mission state machine: src/game.js owns title/playing/paused/
// dead/victory, the pause/mute/restart taps, the mine and interact edges, and
// the objective sync, and core.advance now runs Game.step(dt). Pause is visible
// on the canvas as a banner (R31) until T014 replaces it with DOM overlays.
// The whole draw lives in src/render.js: core.drawScene delegates to Renderer.draw (T012),
// HUD (T014), audio (T015), enemies in the running game (T036). There is no drawing
// code in this file any more — main.js only wires the layers together.

import { installTestApi } from './testapi.js';
import { STEP } from './config.js';
import { loadWorld } from './world.js';
import { Player } from './player.js';
import { Input } from './input.js';
import { Game, TITLE } from './game.js';
import { Renderer, Camera, buildScene } from './render.js';
import { loadAssets } from './assets.js';
import { Hud } from './hud.js';
import { AudioSystem } from './audio.js';
import { carrying } from './interaction.js';

export async function boot(doc = typeof document === 'undefined' ? null : document) {
  if (typeof window !== 'undefined' && window.__digger) return window.__digger;
  if (!doc) throw new Error('boot() needs a document');

  const canvas = doc.getElementById('game-canvas');
  if (!canvas) throw new Error('index.html is missing #game-canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D is unavailable');

  // T044: the generated art and its provenance load BEFORE the first frame, and a
  // missing required name throws here rather than quietly leaving the procedural
  // flat fills in place (R49). Provenance is read from the same-origin manifest.
  const assets = await loadAssets();

  const world = await loadWorld();
  const player = new Player(world);
  const input = new Input().attach(canvas);

  // T015: synthesized SFX (R35). Constructing it touches nothing Web Audio: the
  // AudioContext is only built inside the first gesture handler that arm()
  // installs. Mute is not owned here — Game.muted drives it (R32), and Game
  // hands this object to the interaction layer so a real tap makes a real sound.
  const audio = new AudioSystem({ doc });
  audio.arm(doc);

  const game = new Game({ world, player, input, audio, seed: world.seed });

  // T012: the whole draw lives behind Renderer. It owns the camera, reads a
  // plain-data scene built from the live layers, and paints every sprite and
  // area background through one seam (drawSprite), so T022/T038 can hand it an
  // AssetRegistry without touching anything else in the shell.
  const renderer = new Renderer({ ctx, camera: new Camera(), assets });

  // T014: the readable HUD (R29, R30, R32). It is a mirror of the mission, so it
  // is fed the same plain data the state machine reports, never its own copy.
  // T032: the four screens ride on the same object. A screen button only ever
  // names an action; Game decides what it does, so the DOM cannot win or lose a
  // mission on its own.
  const hud = new Hud({
    doc,
    onAction: (action) => {
      if (action === 'start') game.begin('click:title');
      else if (action === 'resume') game.resume();
      else if (action === 'restart') game.restart();
      // Paint now: a click is on screen this frame, even with real time frozen.
      core.render();
      return game.state;
    },
  });

  // Game.snapshot() carries the mission (state, mute flag, prompt, objective);
  // the miner's survival numbers and what he holds come from the layers that own
  // them, which is what keeps the panel from desyncing on a restart (R27).
  const hudState = () => {
    const s = game.snapshot();
    const p = game.player;
    s.health = p.health;
    s.battery = p.battery;
    s.ore = p.ore;
    s.warnings = p.warnings();
    s.carrying = carrying(game.objectives);
    return s;
  };

  const core = {
    canvas,
    ctx,
    doc,
    game,
    input,
    renderer,
    // T044: the loaded art and its provenance. The renderer draws from it through
    // the one seam; a check reads info(name) to prove where each pixel came from.
    assets,
    hud,
    audio,
    view: { w: 0, h: 0, dpr: 1 },
    camera: renderer.camera,
    // `running` is the paint loop, not the mission: the loop keeps drawing while
    // the game is paused, which is what makes the banner visible (R31).
    running: false,
    manual: false,
    drawScene: (c, dt = STEP) => renderer.draw(buildScene(c, dt)),
  };

  // The mission layers live on Game, and a restart swaps the instances, so the
  // shell reads them through getters instead of holding references of its own.
  for (const key of ['world', 'player', 'time', 'frames', 'simSteps', 'solidFrames', 'system']) {
    Object.defineProperty(core, key, {
      get: () => game[key],
      enumerable: true,
      configurable: true,
    });
  }

  core.resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const box = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.round(box.width));
    const h = Math.max(1, Math.round(box.height));
    core.view = { w, h, dpr };
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    core.render();
  };

  core.render = (dt = STEP) => {
    ctx.save();
    core.drawScene(core, dt);
    ctx.restore();
    // The panel is refreshed on every PAINTED frame, not every simulated one, so
    // it stays true while the world is frozen under a banner (R29, R30).
    const state = hudState();
    hud.sync(state);
    hud.prompt(state.prompt ? state.prompt.prompt : null);
    // T032: the title/pause/defeat/victory screens follow the mission state on the
    // same painted frame, ON TOP of the canvas veil src/render.js still paints.
    hud.showOverlay(state.veiled ? state.state : null, state);
    // T015: the miner's own sounds are diffed off the counters the layers keep,
    // on the painted frame, so a dig makes one noise and a paused world makes
    // none. Before the first gesture this records nothing and touches no graph.
    audio.events(game);
  };

  // One fixed tick of the mission: system taps, the miner's body, the mine and
  // interact edges, the objective sync, and the win/lose conditions. Game
  // decides whether the world runs at all, so a paused or finished mission only
  // reads the taps that can leave that state (R31, R23, R24, R27).
  core.simStep = (dt) => game.tick(dt);

  // Advance real time, run whole fixed ticks, and paint one frame. The harness
  // path (setManual + stepFrames) has no keyboard to start a mission with, so it
  // begins from the title screen on the frame it is asked for; the live loop
  // does not, so the title screen is real in play.
  core.advance = (dt = STEP) => {
    if (core.manual && game.state === TITLE) game.begin('harness');
    game.step(dt);
    core.render();
    return game.frames;
  };

  let last = 0;
  const frame = (now) => {
    if (!core.running) return;
    // Manual mode (checks, T011 pause) keeps the loop alive but stops real time
    // from advancing the simulation, so stepping is exact.
    if (!core.manual) {
      const dt = last ? Math.min((now - last) / 1000, 0.1) : STEP;
      last = now;
      core.advance(dt);
    } else {
      last = 0;
    }
    window.requestAnimationFrame(frame);
  };

  core.start = () => {
    if (core.running) return;
    core.running = true;
    last = 0;
    window.requestAnimationFrame(frame);
  };

  core.resize();
  window.addEventListener('resize', core.resize);
  core.start();

  const api = installTestApi(core);
  api.ready = true;
  return api;
}

if (typeof window !== 'undefined') {
  const start = () => {
    boot().catch((err) => {
      console.error('Digger failed to boot', err);
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
}
