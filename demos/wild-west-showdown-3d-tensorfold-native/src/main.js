// Wild West Showdown 3D — entry point / composition root.
// Wires: renderer/scene/light, town, player, camera, input, touch, HUD,
// audio, opponents, duel state machine, NPCs/atmosphere, store, progression.

import * as THREE from '../vendor/three.module.js';
import { Input } from './input.js';
import { Player } from './player.js';
import { OrbitCamera } from './camera.js';
import { Town } from './town.js';
import { GameState, UPGRADE_DEFS, HATS, DUSTERS, GUNS } from './state.js';
import { Audio } from './audio.js';
import { createOpponents, TIERS } from './opponents.js';
import { Duel } from './duel.js';
import { Hud } from './hud.js';
import { Touch } from './touch.js';
import { NpcTown } from './npcs.js';

const app = document.getElementById('app');
const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');
const pauseOverlay = document.getElementById('pause-overlay');
const hint = document.getElementById('control-hint');

// --- Renderer / scene -------------------------------------------------------

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8fc7e8); // blue sky
scene.fog = new THREE.Fog(0xd8c49a, 60, 250); // warm haze; mesas fade into it

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 500);

// --- Lighting: strong warm sun + soft ambient --------------------------------

const sun = new THREE.DirectionalLight(0xffe0b0, 2.2);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
sun.shadow.camera.left = -48;
sun.shadow.camera.right = 48;
sun.shadow.camera.top = 48;
sun.shadow.camera.bottom = -48;
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 160;
scene.add(sun);
scene.add(sun.target);
scene.add(new THREE.HemisphereLight(0x9ec8e8, 0xc9a06a, 0.7));

// Lower, warm sun: long golden shadows and facades that read clearly.
const SUN_OFFSET = new THREE.Vector3(24, 20, 38);

// --- Dev drives ----------------------------------------------------------------
// ?autostart (skip START) & ?autowalk (hold W) for headless screenshots;
// ?yaw/?pitch/?x/?z to frame a scene. Not part of gameplay.
const params = new URLSearchParams(location.search);
const autowalk = params.has('autowalk');
// Modern headless Chrome starves rAF, so dev drives fall back to a 60Hz timer.
// Real browser gameplay always uses rAF.
const devDrive = params.has('autostart') || params.has('autowalk');

// --- Game objects -------------------------------------------------------------

const input = new Input();
input.attach(renderer.domElement);
const clock = new THREE.Clock();
const orbit = new OrbitCamera(camera, {
  yaw: parseFloat(params.get('yaw')) || 0,
  pitch: params.has('pitch') ? parseFloat(params.get('pitch')) : 0.24,
});
const town = new Town(scene);
const player = new Player(scene, 0x4a6b8a, 0x5a4632, town);
if (params.has('x') || params.has('z')) {
  player.teleport(parseFloat(params.get('x')) || 0, parseFloat(params.get('z')) || 0);
}

const state = new GameState();
const audio = new Audio();
const hud = new Hud();
const opponents = createOpponents(scene);
const duel = new Duel({ scene, player, camera: orbit, input, hud, audio, state });
const npcs = new NpcTown(scene, town);
const touch = new Touch(renderer.domElement, input, hud, duel);

const game = { started: false, paused: false, shopOpen: false, victory: false };
// smoke.html drives step() manually; the rAF loop must not double-step (it
// would race the test over queued input). Detect it by path.
const SMOKE = /smoke\.html/.test(location.pathname);
let simTime = 0; // seconds of played time, for ambient animation

// The general store: interact point just in front of its door.
const SHOP = { x: 20, z: -7, name: 'General Store' };

// Dev seam for smoke.html / headless screenshots. Not part of gameplay.
window.__wws = {
  game, player, camera: orbit, input, renderer, step, three: THREE, town,
  state, audio, hud, duel, opponents, npcs, touch, startGame, fullReset, openShop,
};

function setPaused(p) {
  if (game.paused === p) return;
  game.paused = p;
  if (pauseOverlay) {
    pauseOverlay.classList.toggle('hidden', !p);
    if (p) clock.getDelta(); // discard paused time so no jump on resume
  }
}

function startGame() {
  if (game.started) return;
  game.started = true;
  startScreen.classList.add('hidden');
  audio.unlock(); // autoplay-safe: created from the user gesture
  input.onKey = (code, pressed) => {
    if (code === 'Escape' && pressed && !autowalk) {
      if (game.shopOpen) { hud.shopClose(); game.shopOpen = false; }
      else setPaused(!game.paused);
    }
    if (code === 'KeyE' && pressed && game.shopOpen) {
      hud.shopClose();
      game.shopOpen = false;
      input.consumeInteract(); // the same press must not re-open it next frame
    }
  };
  if (hint) {
    hint.classList.add('visible');
    setTimeout(() => hint && hint.classList.remove('visible'), 6000);
  }
  hud.show();
  clock.getDelta(); // discard accumulated time
  tick();
}

startBtn.addEventListener('click', startGame);
if (params.has('autostart')) startGame();

/** PLAY AGAIN: full in-memory reset back to a clean new game (M10). */
function fullReset() {
  state.reset();
  game.victory = false;
  game.shopOpen = false;
  game.paused = false;
  duel.lastResult = null; // else the victory check re-fires next frame
  duel.lastOpponent = null;
  hud.victoryHide();
  hud.shopClose();
  hud.duelEnd();
  hud.setPrompt('');
  pauseOverlay.classList.add('hidden');
  opponents.forEach((o) => o.returnHome());
  player.place(0, 0, Math.PI);
  player.setCosmetics({
    hat: HATS.brown, duster: DUSTERS.blue, gun: GUNS.iron,
  });
  startScreen.classList.remove('hidden');
  startBtn.disabled = false;
}
document.getElementById('play-again-btn').addEventListener('click', fullReset);

// --- Shop ----------------------------------------------------------------------

function shopItems() {
  return Object.entries(UPGRADE_DEFS).map(([id, def]) => {
    const owned = def.once ? state.upgrades[def.key] > 0 : state.upgrades[def.key] === def.variant;
    return { id, name: def.name, desc: def.desc, cost: def.cost, owned, afford: state.money >= def.cost };
  });
}

function openShop() {
  game.shopOpen = true;
  const onBuy = (id) => {
    if (state.buy(id)) {
      audio.coin();
      player.setCosmetics({
        hat: HATS[state.upgrades.hat],
        duster: DUSTERS[state.upgrades.duster],
        gun: GUNS[state.upgrades.gun],
      });
      hud.shopOpen(shopItems(), state.money, onBuy);
    }
  };
  hud.shopOpen(shopItems(), state.money, onBuy, () => { game.shopOpen = false; hud.shopClose(); });
}

// --- Objectives ------------------------------------------------------------------

function objectiveText() {
  if (game.victory) return 'You are the WILD WEST CHAMPION';
  const r = state.reputation;
  if (r < TIERS[2].unlockRep) return 'Find a gunslinger to challenge';
  if (r < TIERS[3].unlockRep) return 'Tougher rivals have arrived — find them';
  if (r < TIERS[4].unlockRep) return `Earn ${TIERS[4].unlockRep - r} more Reputation for the final showdown`;
  return 'Final showdown unlocked — Silas Vane waits at the Showdown Ground';
}

// --- Main loop ----------------------------------------------------------------

const _follow = new THREE.Vector3();

/** Advance one frame. Shared by the rAF loop and the dev step() seam. */
function step(dt) {
  if (!game.paused) {
    simTime += dt;
    state.playTime += dt;
    input.sample();
    let mx = input.moveX;
    let my = input.moveY;
    if (autowalk) my = 1; // steady forward walk for headless screenshots

    const inDuel = duel.active;
    const frozen = inDuel || game.shopOpen;
    if (!frozen) {
      player.update(dt, mx, my, input.running, orbit.yaw);
    }
    // Aim input (mouse always; touch via the aim region) feeds the duel.
    duel.addAim(input.aimDX, input.aimDY);

    town.update(simTime);
    npcs.update(dt, simTime, player.group.position, inDuel ? duel : null);
    for (const o of opponents) o.update(dt, simTime);
    duel.update(dt, simTime);
    hud.update(dt);
    audio.update(dt, player.group.position);

    // Camera: the duel owns framing while active.
    const follow = duel.followTarget(_follow) || player.group.position;
    orbit.update(dt, follow, input.cameraDX, input.cameraDY);

    // HUD: stats + objective.
    hud.setStats(state.money, state.reputation);
    hud.setObjective(objectiveText());

    // Interact: nearest challengeable opponent, else the store.
    if (!inDuel && !game.shopOpen) {
      const pp = player.group.position;
      let best = null, bestD = 3.2;
      for (const o of opponents) {
        const d = Math.hypot(pp.x - o.group.position.x, pp.z - o.group.position.z);
        if (d < bestD) { bestD = d; best = o; }
      }
      let prompt = '';
      let target = null;
      if (best) {
        if (best.unlocked(state.reputation)) {
          prompt = (touch.isTouch ? '' : 'E — ') + `Challenge ${best.name} ${best.title}`;
          target = { type: 'duel', opp: best };
        } else {
          prompt = `${best.name} — earn ${TIERS[best.tier].unlockRep} Reputation to challenge`;
        }
      } else if (Math.hypot(pp.x - SHOP.x, pp.z - SHOP.z) < 3.2) {
        prompt = (touch.isTouch ? '' : 'E — ') + 'Open the ' + SHOP.name;
        target = { type: 'shop' };
      }
      hud.setPrompt(prompt);
      if (input.consumeInteract() && target) {
        if (target.type === 'duel') duel.start(target.opp);
        else openShop();
      } else {
        input.consumeInteract();
      }
    } else {
      input.consumeInteract();
    }

    // Keep the shadow frustum over the player.
    sun.position.copy(player.group.position).add(SUN_OFFSET);
    sun.target.position.copy(player.group.position);
  } else {
    input.sample();
  }
  input.endFrame();
  renderer.render(scene, camera);
  // Victory: winning the final showdown completes the game.
  if (!game.victory && duel.lastResult === 'win' && duel.lastOpponent?.final) {
    game.victory = true;
    audio.victory();
    hud.victory(state);
  }
}

function tick() {
  if (SMOKE) return; // the test drives the loop; stop the rAF chain
  if (!game.started) return;
  if (devDrive) setTimeout(tick, 16);
  else requestAnimationFrame(tick);
  step(Math.min(clock.getDelta(), 0.1));
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
