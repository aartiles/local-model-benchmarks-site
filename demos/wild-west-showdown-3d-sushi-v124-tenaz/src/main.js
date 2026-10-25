import { createEngine } from './core/engine.js';
import { createGame } from './game.js';
import { createCowboy } from './actors/cowboy.js';
import { createInput } from './core/input.js';
import { createTouchControls } from './core/touch.js';
import { createPlayer } from './player/player.js';
import { createCameraRig } from './player/camera-rig.js';
import { createBounds, PLAY_AREA } from './world/bounds.js';
import { createTerrain } from './world/terrain.js';
import { createTown, deckRect, chimneyTops, colliders as townColliders } from './world/town.js';
import { createDuel, DRAW_DELAY, LOSS_OUTCOMES } from './duel/duel.js';
import { createBossShowdown } from './duel/boss.js';
import { createShooting } from './weapons/shooting.js';
import { createAiming, AIM_DEFAULTS } from './weapons/aiming.js';
import { createEffects } from './weapons/effects.js';
import { createOpponents, facingYaw } from './actors/opponents.js';
import { createRigCull } from './actors/rig-cull.js';
import { createAmbientLife } from './npc/ambient.js';
import { createSaloon } from './world/saloon.js';
import { createAtmosphere } from './world/atmosphere.js';
import { createHud } from './ui/hud.js';
import { createProgression } from './progress/progression.js';
import { createStore } from './progress/store.js';
import { createScreens, createStoreScreen, createVictoryScreen } from './ui/screens.js';
import { createAudio } from './core/audio.js';
import { installHooks } from './core/testhooks.js';

/**
 * Composition root. Systems are created here and driven by engine.onFrame().
 * Extension points, in build order (see .tenaz/map.md):
 *   T003 actors     -> createCowboy(palette)            (src/actors/cowboy.js)  [built]
 *   T004 player     -> createPlayer(engine) + createInput(engine) + bounds      [built]
 *   T005 camera     -> createCameraRig(engine)            (src/player/camera-rig.js)  [built]
 *   T006 world      -> createTerrain(engine) [built] + createTown({engine}) [T026a: street + west row]
 *   T007 duel       -> createDuel(...) + opponents + HUD prompt + camera takeover  [built]
 *   T008 duel rule  -> false-start enforcement inside duel.js
 *   T009 shooting   -> createWeapons(engine)            (raycast hit/miss)
 *   T010 opponents  -> createRoster(...)                (AI difficulty variables)
 *   T011 outcomes   -> defeat recovery + re-entry
 *   T012 progress   -> createProgression(...) + createHud()
 *   T013 unlocks    -> reputation gates
 *   T014 store      -> createStore(...)
 *   T015 touch      -> createTouchControls()
 *   T016 aiming     -> createAiming(...) + reticle
 *   T017 desktop    -> shoot / interact / pause wiring (input.onAction is ready)
 *   T018 audio      -> createAudio() (started from a user gesture)
 *   T019 npc        -> createAmbientLife(...)
 *   T020 atmosphere -> createAtmosphere(...)
 *   T021 boss       -> createFinalGunslinger(...)
 *   T022 victory    -> victory screen + play again (screens.add)
 */
const canvas = document.getElementById('gl');
const engine = createEngine({ canvas });
const game = createGame(engine);
const screens = createScreens({ game });
// T018 (R63/R64): synthesized western audio. No AudioContext exists until the
// START click reaches audio.start() from the game.onPhase handler below — that
// click is the user gesture browsers require. Every cue is fire-and-forget, and
// a WebAudio failure latches the module silent instead of breaking the game.
const audio = createAudio();

// --- T004: input, bounds, player -------------------------------------------
const input = createInput({ target: window, canvas });
const bounds = createBounds(PLAY_AREA, { inset: 0.42 });
// T006b: the desert shell (ground past every wall, mesa ring, fog + sky). Built
// from the same footprint so the town floor stays flat at y = 0.
const terrain = createTerrain({ engine, area: PLAY_AREA });
// T026a: the town itself — main street plus the west row (saloon, sheriff, bank).
// Layout comes from the TOWN manifest; the street corridor stays empty, which is
// what keeps the cowboy walking end to end (there is no building collision yet).
const town = createTown({ engine });
const player = createPlayer({ engine, input, bounds });

/**
 * T005: the orbit rig owns the exploration camera. Its yaw is what the player
 * walks relative to (same basis as player.js: yaw 0 looks down -Z).
 */
const rig = createCameraRig({ engine, input, target: player.position, exclude: player.group });
const cameraYawSource = () => rig.yaw;

/**
 * T007b: one challengeable gunslinger, standing at a town landmark. Exactly ONE
 * rig (D7: 21 draw calls each against a ceiling of 75), added to the scene once
 * here and never rebuilt per duel.
 */
const opponents = createOpponents({ engine, town });

/**
 * T012 (R49/R50/R62): the purse and the objective. game.js keeps the run ledger;
 * this turns it into the two numbers the player reads and the one line that says
 * what to do next. arm() puts the reward table onto the opponent records, which
 * is the only way duel.js will pay it (payout() reads `opponent.reward`), so the
 * "+ $25" the HUD shows and the money the ledger banks are the same numbers (R49).
 */
const progression = createProgression({ game, opponents });
progression.arm();

/**
 * T010a (R21): ONE shared distance cull for every cowboy rig in the scene.
 * Each `createCowboy` rig is 21 meshes, and D7 records a ceiling of 75 against a
 * base of ~16, so at most TWO rigs may be drawn in a frame. The cull hides the
 * rest with `group.visible = false` (Three.js then skips the whole subtree, which
 * is a real saving and does not touch the named parts T003 asserts on) and stubs
 * their raycasts, because the camera rig's per-frame occlusion scan uses
 * `scene.traverse`, which visits INVISIBLE objects too.
 *
 * radius 18m: from the spawn area that reaches roughly one landmark post, so the
 * gunslinger you are walking up to is drawn and the rest of town is not.
 * maxVisible 2 is the hard budget: even a crowded street inside the radius cannot
 * exceed it. The player's own rig is pinned (`alwaysVisible`) — you never cull the
 * character the player is looking at (R22/R25) — and a live duel pins its
 * opponent (T010b/T011 depend on seeing him).
 */
const rigCull = createRigCull({ camera: engine.camera, radius: 18, maxVisible: 2 });
rigCull.add(player.group, { alwaysVisible: true });
for (const o of opponents.opponents) rigCull.add(o.group);

/**
 * T019a (R55): the town's ambient crowd. Five cowboys walk fixed loops between
 * the posts town.js already has, stop to stand, sit and chat, and change state
 * when a duel starts near them. Every rig goes through the SAME culler as the
 * roster (D7: 21 draw calls each against a ceiling of 75, and maxVisible 2
 * already counts the pinned player), so the crowd costs the renderer nothing
 * unless it is the nearest thing to the camera. They are NOT opponents: nothing
 * here touches opponents.list, so no ambient NPC can ever be challenged.
 */
const ambient = createAmbientLife({ engine, rigCull });
/**
 * T019b (R54): the saloon's life. town.js owns the exterior shell and is
 * read-only, so this is its own `saloon-life` group on the porch deck INSIDE the
 * saloon footprint (T026b counts the town group's children, so nothing may be
 * added there): bar, back shelf, tables, stools, piano, lanterns, two hinged
 * batwing doors, and a gunslinger rig that goes through the same culler as the
 * crowd. He is not an opponent and can never be challenged.
 */
const saloon = createSaloon({ engine, town, rigCull });
/**
 * T020a (R19): the weather you can see. Its own `atmosphere` group (T026b counts
 * the town group's children, so nothing may be added there): a shared wind field,
 * tumbleweeds rolling down the street, and three sign boards hung on their own
 * pivots that swing with the gusts and settle. town.js's merged `town-signs` mesh
 * is untouched — an individual town sign cannot be rotated.
 */
const atmosphere = createAtmosphere({ engine, town });
/** Pin the duelist so a live duel is never culled mid-sequence (R36/R66). */
function protectDuelist(opp) {
  if (opp && opp.group) rigCull.protect(opp.group);
}
/** Release every opponent rig back to distance culling when the duel is over. */
function releaseDuelists() {
  for (const o of opponents.opponents) rigCull.unprotect(o.group);
}
/** T007b: the challenge prompt has to be real text in #hud, not a test hook. */
const hud = createHud();

/**
 * T014a (R51): the general store. The shelf lives in progress/store.js as
 * data; this block is the interaction: stand on the store's porch deck near
 * the counter, the prompt offers the store, E opens the screen, Buy buttons
 * (and WWS.buy under test) move money through progression.spend() and push
 * hud.setValues() in the SAME tick (T012 contract). The counter is deliberately
 * NOT Mabel Crane's landmark post: a challengeable man outranks the shelf, so
 * the offer lives on the deck where the duel prompt does not.
 */
const store = createStore({ progression, game });
const STORE_POST = (() => {
  const s = town.structures.find((b) => b.name === 'general-store');
  const deck = s ? deckRect(s.manifest) : null;
  return deck
    ? { x: (deck.minX + deck.maxX) / 2, z: deck.maxZ - 0.9 }
    : { x: 12, z: 17.2 };
})();
const STORE_RADIUS = 2.2;
/**
 * R51: "is the shelf open" has exactly one owner — the screens registry. The
 * store is registered with `phases: []`, so refresh() sweeps it closed on ANY
 * phase change (pause, a duel, defeat). A private boolean here would survive
 * that sweep and leave the game browsing an invisible store: the prompt would
 * stay stale, challenge prompts would stop updating (line ~400 returns early),
 * and the first E after a resume would be swallowed by closeStore().
 */
const storeOpen = () => screens.isOpen('store');
const nearStore = () => !duel.active && game.state === 'exploring'
  && Math.hypot(player.x - STORE_POST.x, player.z - STORE_POST.z) <= STORE_RADIUS;
function openStore() {
  storeScreen.render(store.snapshot());
  storeScreen.note('');
  screens.show('store');
  hud.setPrompt('General Store — browse with the buttons, E leaves.');
}
function closeStore() { screens.hide('store'); }
const storeScreen = createStoreScreen({
  store,
  onBuy: (id) => {
    const res = store.buy(id);
    storeScreen.render(store.snapshot());
    storeScreen.note(res.ok ? `Bought ${res.item.name}.` : res.reason);
    hud.setValues(progression.snapshot());   // T012: purse moves this tick, not next frame
    return res;
  },
  onClose: () => closeStore(),
});
// phases: [] — refresh() keeps it shut across every phase change (R66); only
// show()/hide() open it, and a duel, pause or defeat sweeps it closed. That
// sweep is also what storeOpen() reports, so the game can never browse a store
// the player cannot see (T014a.store-pause).
screens.add('store', { phases: [], el: storeScreen.el });

/**
 * T022a (R58): the completion screen. Phase-driven (phases: ['victory']), so it
 * opens by itself when the game reaches `victory` and sweeps shut on PLAY AGAIN
 * through the same refresh() every other screen uses. render() is called with
 * game.stats at the moment the run ends; the screen owns no numbers of its own.
 */
const victoryScreen = createVictoryScreen({ onRestart: () => game.restart() });
screens.add('victory', { phases: ['victory'], el: victoryScreen.el });

/**
 * T007: the duel state machine, plus the staging this card owns — walk up to
 * `Buck Rigger`, see `Challenge Buck Rigger?`, press E, and both cowboys are
 * placed on their facing posts while the camera takes over (R27/R37/R38).
 * T008 adds the false-start rule, T009/T010 the real shots and the opponent's
 * reaction, T027 the randomized tension. Every timer the machine starts is owned
 * by the duel object and cleared on phase exit (R66).
 */
/**
 * T009b: real aim decides what an accepted shot DOES (R43). The duel machine
 * stays the only shot entry point (D4) and keeps the win/loss decision; it asks
 * this module whether the bullet hit the opponent's forgiving volume. Aim lives
 * behind ONE accessor here (aimYaw), which T016 swaps for mouse/touch aim.
 */
/**
 * T010c (R42): the AI's luck. The shipped game rolls Math.random; a check swaps
 * it through the test-only WWS.setAiRandom hook so the accuracy/hesitation rolls
 * are scripted and the outcome is reproducible (R5). Read through a holder so
 * `aiRandom` is always defined in this scope.
 */
let aiRandomSource = Math.random;
const effects = createEffects({ engine });
const duel = createDuel({
  game,
  resolvePlayerShot: (opp) => shooting.fire(opp),
  // T009d (R44): the opponent's resolved shot gets the same pooled feedback.
  // duel.js has already rolled his accuracy into entry.hit; fireFrom only makes
  // it visible. Lazy closure, same as resolvePlayerShot (shooting is built later).
  resolveOpponentShot: (opp, entry) => shooting.fireFrom(opp, player, entry.hit, entry.point),
  aiRandom: () => aiRandomSource(),
});

/**
 * T016 (R46): the steered aim. Lives between the input streams and shooting.js's
 * single aim accessor: facing yaw + a mouse/touch offset, plus the reticle that
 * shows where that points. Created after the duel machine (it reads the live
 * phase) and before shooting (which reads it), and `shooting.fire` above is a
 * lazy closure so the reference order stays legal.
 */
const aiming = createAiming({
  engine, input, player, duel, hud,
  target: () => (duel.opponent && duel.opponent.cowboy
    ? duel.opponent.cowboy.group.position : null),
});
const shooting = createShooting({ engine, player, effects, aim: aiming, audio });

/**
 * T014b (R52): where the shelf bites. store.modifiers() is the only place the
 * item table turns into numbers, and this is the only place those numbers reach
 * a system: aiming (radians per pixel of aim movement), shooting (the radius of
 * the ONE hitbox T009b already tests) and the player rig (cosmetic materials).
 * It runs at boot and on every purchase or reset through store.onChange, so a
 * bought effect and an owned effect are literally the same call (R53).
 *
 * R52's other half is by construction: this function has no accessor for the
 * DRAW delay, the duel beat table or the AI reaction table, and no item kind is
 * draw-related. A faster aim still cannot fire before DRAW!, and a wider
 * hitbox only decides what an ACCEPTED shot does (D4).
 */
const STORE_SLOTS = Object.freeze(['hat', 'outfit', 'gun']);
const AIM_BASE_SPEED = AIM_DEFAULTS.speed;
function applyStore() {
  const m = store.modifiers();
  aiming.setAimSpeed(AIM_BASE_SPEED * m.aimSpeed);
  shooting.setTolerance(m.accuracy);
  for (const slot of STORE_SLOTS) player.cowboy.tint(slot, m.tints[slot] ?? null);
  return m;
}
store.onChange(applyStore);
applyStore();

/** Where the exploration camera was before the duel took it over (R27/R68). */
let savedPose = null;
/** Mutable look-at point for the duel: the midpoint between the two posts. */
const duelFocus = { x: 0, y: 0, z: 0 };
/**
 * T019a: duelFocus is a live object, so `duelFocus ?? camera` would never fall
 * back — an unstaged duel (a test-only ghost duel, or the very first one) would
 * react at the town origin instead of at the face-off. This flag says whether
 * stageDuel has actually put posts in it for the duel now running; it is cleared
 * by the same teardown funnel that releases the cull pins (R66).
 */
let duelFocusLive = false;

/** Side-on framing: the camera sits on the street side of the two duelists. */
const DUEL_SHOT = Object.freeze({ yaw: Math.PI / 2, pitch: 0.22, distance: 9.5 });

/**
 * T030a (R46/R27, REVIEW V5): DUEL_SHOT is a two-shot — it frames BOTH men for the
 * establishing beats, which is why it looks ACROSS the lane (yaw PI/2, while
 * duelPosts() runs every street corridor north-south). Held through the shooting
 * window, that put the man you must hit ~90 degrees off the view axis.
 *
 * So the shot turns DOWN the lane at `tension`: the camera swings behind the player
 * along the corridor, the opponent lands near the reticle, and the reticle stays
 * honest because aiming.js already resolves along `player facing yaw + offset`
 * (stageDuel faces the player down the lane) — the camera moves to the aim, never
 * the other way round. The side-on framing survives untouched for `start`,
 * `position` and `faceoff`, which is exactly what T021/T021b sample (R57).
 */
/** Camera forward is (-sin yaw, -cos yaw), so yaw looking from -> to is: */
function laneYaw(from, to) {
  return Math.atan2(-(to.x - from.x), -(to.z - from.z));
}
/** The lane yaw for the duel now staged, or null when the shot must not turn. */
let duelLaneYaw = null;
/** Seconds of game time the turn takes; null when no turn is running. */
const SHOT_TURN_SECONDS = 0.35;
let shotTurn = null;

function stepShotTurn(dt) {
  if (!shotTurn) return;
  shotTurn.t = Math.min(SHOT_TURN_SECONDS, shotTurn.t + (Number.isFinite(dt) ? dt : 0));
  const k = shotTurn.t / SHOT_TURN_SECONDS;
  let delta = shotTurn.to - shotTurn.from;
  while (delta > Math.PI) delta -= 2 * Math.PI;
  while (delta < -Math.PI) delta += 2 * Math.PI;
  rig.setYaw(shotTurn.from + delta * k * k * (3 - 2 * k));
  if (shotTurn.t >= SHOT_TURN_SECONDS) shotTurn = null;
}

/**
 * T020b: the opponent record THIS duel staged. duel.abort() nulls its own
 * `opponent` before main.js's teardown funnel runs, so the bodies cannot be found
 * through the machine on the way out — this is the last live reference.
 */
let duelOpp = null;

/**
 * T021b (R56/R57): the final showdown's staging. It owns no phase, no timer and no
 * rule — it answers two questions a street duel answers differently: WHERE the two
 * men stand (his own yard, not duelPosts()' street corridor) and HOW the shot looks
 * (establishing push-in, dusk light, longer lens). Everything it mutates comes back
 * through restore(), called from the same teardown funnel that releases the cull
 * pins, so a duel that ends early cannot leave the town at dusk (R66).
 */
const boss = createBossShowdown({ engine, terrain, rig, hud, audio });

/** Put both cowboys on their facing posts and frame them from the street. */
function stageDuel(opp) {
  // R56: the final gunslinger duels in his own arena, on an east-west line under
  // the water tower, at a wider gap. A town man keeps the street corridor.
  const arena = boss.arenaFor(opp);
  const posts = arena ? arena.posts : opponents.duelPosts(opp, opponents.gap);
  duelOpp = opp;
  player.teleport(posts.player.x, posts.player.z, facingYaw(posts.player, posts.opponent));
  opp.cowboy.moveTo(posts.opponent.x, posts.opponent.y, posts.opponent.z);
  opp.cowboy.setYaw(facingYaw(posts.opponent, posts.player));
  opp.cowboy.setPose('idle');
  duelFocus.x = (posts.player.x + posts.opponent.x) / 2;
  duelFocus.y = 0;
  duelFocus.z = (posts.player.z + posts.opponent.z) / 2;
  duelFocusLive = true;
  rig.setTarget(duelFocus);
  rig.setOrbit(arena ? arena.shot : DUEL_SHOT);
  rig.snapTo();
  // T030a/T030bb (R46/R57): every duel turns down its own lane at `tension`, the
  // yard included. The arena posts are the same {x,z} shape as the street's, so
  // laneYaw() needs no branch; the yard's own pitch/distance/fov and its dusk light
  // are untouched, and `faceoff` still frames the side-on two-shot that T021/T021b
  // sample (R57). After the turn the yard looks WEST (PI/2) while a street corridor
  // looks along +/-Z (PI), so the two remain framed differently by ~1.57 rad.
  duelLaneYaw = laneYaw(posts.player, posts.opponent);
  shotTurn = null;
  return posts;
}

/** Hand the camera back: control on, orbit the player, exploration pose (R68). */
function restoreExploration() {
  rig.setTarget(player.position);
  rig.setExclude(player.group);
  if (savedPose) {
    rig.setOrbit(savedPose);
    savedPose = null;
  }
  rig.setControl(true);
  rig.snapTo();
}

/**
 * T009c (R66): tear the shot feedback down whenever a duel stops being live.
 * `duel.abort()` deliberately emits nothing — it is the blunt teardown other
 * systems call — so every departure path funnels through here instead of
 * relying on a phase event that never fires. Effects AND reaction poses are
 * released, otherwise a live puff or a stuck `hit` pose leaks into the next duel.
 */
function clearShotFeedback() {
  // T020b (R73): the duel's choreographed pose goes back the same way, and it has
  // to go through releasePose() — player.step() only re-applies a movement pose
  // when its own bookkeeping disagrees, so a duel pose left on the model while
  // poseName still says 'idle' would survive into town forever.
  duelPose = null;
  player.releasePose('idle');
  if (duelOpp && duelOpp.cowboy) duelOpp.cowboy.setPose('idle');
  duelOpp = null;
  shooting.cancelReactions();
  duelFocusLive = false;   // T019a: the next duel has no posts until stageDuel runs
  duelLaneYaw = null;      // T030a: no pending re-frame once the duel is gone
  shotTurn = null;
  // T021b (R66): the yard's dusk is a mutation of the town's own sun, fog and lens,
  // so it leaves the same way the cull pin does. duel.abort() emits no phase event,
  // which is exactly why this is here and not only in the `exploring` branch.
  boss.restore();
  // T010a: this is the single duel-teardown funnel, so the duel's cull pin is
  // released here too. A leaked pin would keep a far-away rig drawn forever and
  // blow the D7 budget on the next duel (R21/R66).
  releaseDuelists();
}

/**
 * T020b (R73): the duel's choreography, driven from the phase events.
 *
 * The pose VOCABULARY already lives in cowboy.js POSES; nothing in the shipped
 * game ever reached for it. `recoil`/`hit` stay owned by shooting.js (R44) — this
 * only covers the holster → draw → aim build-up, and hands back cleanly when a
 * shot takes the body over.
 */
const DUEL_POSES = Object.freeze({
  faceoff: 'ready', tension: 'ready', draw: 'draw', shooting: 'aim',
});
/** The poses player.step() re-applies every frame; a duel pose outranks them. */
const MOVEMENT_POSES = new Set(['idle', 'walk', 'run']);
let duelPose = null;
/**
 * T022a (R58): set on the duel's `result` beat when the FINAL gunslinger falls,
 * consumed by the frame loop on the first `exploring` frame after that. The duel
 * machine stays the only thing that hands the town back (R66, and T021b asserts
 * it), so the completion screen is raised one frame later rather than from
 * inside the phase event — which also keeps the result beat readable and avoids
 * a `victory -> exploring` move the phase table forbids.
 */
let victoryPending = false;

/** The two bodies a live duel owns (a test-only ghost duel has no opponent rig). */
function duelBodies() {
  return duelOpp && duelOpp.cowboy ? [player.cowboy, duelOpp.cowboy] : [player.cowboy];
}

function setDuelPose(name) {
  duelPose = name || null;
  if (duelPose) for (const c of duelBodies()) c.setPose(duelPose);
}

/**
 * Re-assert the duel pose on any body that fell back to a movement pose.
 *
 * What it is load-bearing for (measured, T020b review): shooting.js owns
 * recoil/hit and hands a body back by putting it in 'idle' — finishPose() calls
 * `cowboy.setPose('idle')` for an opponent's recoil, `releasePose('idle')` for
 * the player's. When that decay lands while the duel is still inside its
 * shooting window (the opponent fires and MISSES, which R47 keeps live), the
 * body would stay at ease for the rest of the exchange. This puts it back on the
 * next frame, and `T020b.draw-animation` fails if it is removed.
 *
 * What it is NOT load-bearing for, contrary to the first version of this comment:
 * player.step() does not erase the choreography on a live-duel frame. The player
 * is disabled during a duel, so step() takes its idle branch and player.js's own
 * guard (`poseName` is already 'idle') swallows the call. Pausing is the same
 * no-op. Both are asserted as regression guards, not as proof of the hold.
 *
 * Re-applying only when the body is in a MOVEMENT pose is what keeps recoil/hit
 * from being stomped mid-shot (R44/R45).
 */
function holdDuelPose() {
  if (!duelPose) return;
  for (const c of duelBodies()) {
    if (c.pose !== duelPose && MOVEMENT_POSES.has(c.pose)) c.setPose(duelPose);
  }
}


duel.onPhase((next, previous, opp) => {
  input.reset();   // no held key ever crosses a duel phase boundary (R66)
  hud.clear();
  // R60/R61: the duel takes the screen from `start` onward. `challenge` is still
  // town time — the purse and the prompt are what the player reads there.
  hud.setMode(next === 'exploring' || next === 'challenge' ? 'explore' : 'duel');
  if (next === 'start') progression.beginDuel();   // R66: no stale reward line
  hud.setDuel(next, opp || duel.opponent);   // R39/R61: cue, state and opponent name
  if (next === 'start') {
    duelOpp = null;   // T020b: last duel's bodies are not this duel's bodies
    hud.setReward(null);   // R66: the previous duel's payout line is gone
    audio.cue('duel-start');   // R63: the duel-begin beat
    savedPose = { yaw: rig.yaw, pitch: rig.pitch, distance: rig.desiredDistance };
    rig.setControl(false);   // scripted sequence: drag is drained and discarded
    // T021b (R56/R57): dusk falls over town and the camera pulls back off him while
    // he waits in the tower's shadow. No new phase, no new timer: this is the beat
    // the duel machine was already going to run for `start`.
    if (boss.isBoss(opp)) boss.begin(opp);
  } else if (next === 'position') {
    if (opp && opp.cowboy) {
      protectDuelist(opp);   // T010a: a live duel is never distance-culled (R36)
      stageDuel(opp);
      // T021b: he steps out of the tower's shadow onto his own line, and the
      // establishing shot becomes the two-shot stageDuel just framed.
      if (boss.live) boss.step(1);
    }
    // R55: the crowd reacts to the face-off it can see. With a staged real
    // opponent, stageDuel has just put both gunslingers on their posts and
    // duelFocus is the centre; a test-only ghost duel (duel.begin({name})) has
    // no posts, so the camera — where the player is actually looking — is the
    // centre instead. The crowd reacts to a duel either way.
    const focus = duelFocusLive
      ? duelFocus
      : { x: engine.camera.position.x, z: engine.camera.position.z };
    ambient.react(focus);
    saloon.swing(0.7);   // R54: the crowd bustles out of the saloon as the duel starts
  } else if (next === 'draw') {
    audio.cue('draw');   // R63: the DRAW call the whole duel waits on
    setDuelPose(DUEL_POSES[next]);   // T020b: the hand finally leaves the holster
    // T032a (REVIEW P1, R56): Cade's last line is still on screen as the DRAW
    // signal fires. hud.clear() at the top of this hook took it down, so put the
    // SAME line back — hold() re-reads it, it never adds or repeats one.
    if (boss.live) boss.hold(next);
  } else if (next === 'faceoff' || next === 'tension' || next === 'shooting') {
    // T030a (R46): the countdown is the last moment the player still has to read
    // the two-shot, so the camera turns down the lane HERE and has settled before
    // DRAW. `faceoff` keeps DUEL_SHOT untouched (T021/T021b sample it, R57).
    if (next === 'tension' && duelLaneYaw !== null) {
      shotTurn = { from: rig.yaw, to: duelLaneYaw, t: 0 };
    }
    // T020b (R73): hover over the holster through the face-off, then present the
    // gun as the window opens. `result` deliberately sets nothing: the outcome
    // beat belongs to whatever recoil/hit the exchange left running.
    setDuelPose(DUEL_POSES[next]);
    // T032a (REVIEW P1, R56/R39): the introduction's last line reads through the
    // countdown AND the DRAW signal, and comes down on the way into `shooting` —
    // the one window a shot is legal in. The old rule retired it on the way into
    // `tension`, which cut the final gunslinger off mid-sentence before the cue the
    // whole duel waits on. R39/R40/R41 are untouched: a shot is gated by `drawAt`,
    // not by whether a line is up, and the intro is on the hud's `reason` slot while
    // the READY/DRAW cue uses `duelSignal`, so the two never fight.
    if (boss.live) {
      if (next === 'faceoff') boss.step(2);
      else if (next === 'tension') boss.hold(next);   // hud.clear() ran; re-read the line
      else boss.finish();
    }
  } else if (next === 'result') {
    // T020b: stop choreographing. The bodies keep whatever the exchange left them
    // in (recoil/hit decay through shooting.js) and `exploring` releases them.
    setDuelPose(null);
    // R40: say WHY the duel ended instead of silently dropping the player back
    // into town. Only the duel's own reason is shown; T011/T012 own the rest.
    // T032a: the introduction shares this slot, so a duel that never reached
    // `shooting` (a false start, an abort resolved early) takes the line down HERE,
    // before the verdict is written over it — the intro never survives into a reason.
    if (boss.live) boss.finish();
    hud.setReason(duel.reason);
    // T022a (R58): beating the final gunslinger ends the run. The flag is raised
    // here, at the result beat, and the screen opens after duel.finish() has
    // handed the town back — see victoryPending.
    if (duel.outcome === 'win' && (opp || duel.opponent) && (opp || duel.opponent).boss) {
      victoryPending = true;
    }
    // R49: bank the settled duel and show what it paid. The amounts come from the
    // ledger entry game.js just made, so the reward line and the purse cannot
    // drift apart, and a draw or a loss pays nothing to show.
    const last = game.lastOutcome;
    progression.note({
      outcome: duel.outcome,
      name: duel.opponent ? duel.opponent.name : null,
      money: last ? last.money : 0,
      reputation: last ? last.rep : 0,
    });
    hud.setReward(duel.outcome === 'win' ? progression.lastReward : null);
    // R49/R60: push the purse the instant the ledger moves. Waiting for the next
    // frame would let the reward line and the money line disagree for a tick, and
    // a slow or backgrounded tab (rAF throttled) could leave them out of sync for
    // seconds — the player reads both at once.
    hud.setValues(progression.snapshot());
    // R63: the duel's own verdict, heard as well as read. The four outcomes must
    // sound different, and they are the duel's REAL outcome strings (duel.js:
    // win | opponent-shot | false-start | miss — there is no 'loss'), so the loss
    // test is LOSS_OUTCOMES rather than an invented name. A win lands a hit and
    // pays; the opponent's bullet thuds into you before the sting; a false start
    // lands nothing but still costs the duel; a draw (nobody hit) is the whizz.
    const outcome = duel.outcome;
    if (outcome === 'win') { audio.cue('hit'); audio.cue('reward'); }
    else if (LOSS_OUTCOMES.includes(outcome)) {
      if (outcome === 'opponent-shot') audio.cue('hit');
      audio.cue('defeat');
    } else audio.cue('miss');
  } else if (next === 'exploring') {
    // R66: no effect or reaction pose from the duel that just ended may survive
    // into the next one — a stale `hit` pose or a live puff would be a leak.
    clearShotFeedback();
    opponents.resetPosts();
    restoreExploration();
    ambient.settle();   // R55: the crowd goes back to its own route
  }
});

/**
 * Pause SUSPENDS a live duel rather than tearing it down: no duel timer runs
 * while paused (R66), and resuming re-arms it with the time that was left, so
 * game.resume() keeps returning to the phase it paused (T002) and the player is
 * never stranded in a `duel` phase with no machine running (R53).
 *
 * Leaving for good (defeat / victory / start) does tear the machine down, and a
 * duel that finished on its own has already disarmed itself before handing the
 * game back, so this handler never un-stages a completed duel twice.
 */
game.onPhase((next, previous) => {
  // R64: the AudioContext is born HERE, inside the START click handler that
  // called game.start() — the only moment a browser will let it run.
  if (next === 'exploring' && previous === 'start') audio.start();
  // T031 (REVIEW V4/R60): the completion poster is the only full-screen card over
  // the live scene, so it gets the screen to itself. Every other phase — including
  // PLAY AGAIN's `start` — lifts the suppression again.
  hud.setSuppressed(next === 'victory');
  if (next === 'paused') {
    if (duel.active) duel.suspend();
    audio.suspend();   // T018: silence the bed while the world is frozen
    return;
  }
  // Coming BACK from a pause never tears anything down (T017c review MAJOR): a
  // challenge suspended at the prompt resumes as the same live challenge, with
  // its prompt intact, so the abort below is for departures only.
  if (previous === 'paused') {
    if (duel.suspended) duel.resumeDuel();
    audio.resume();
    return;
  }
  if (next === 'duel') {
    if (duel.suspended) duel.resumeDuel();
    return;
  }
  // T011 (R48): a loss runs its defeat beat INSIDE the duel machine, driven by an
  // owned timer, and that timer is what hands the town back. Aborting the duel
  // here would kill it and strand the player in `defeat` forever (R53/R66), so a
  // duel that is merely finishing is left alone; a duel that was interrupted is
  // still torn down.
  if (next === 'defeat') {
    if (duel.active && !duel.finishing) duel.abort();
    // "returns the player to a sensible location": the town spawn on the main
    // street. No page reload, and the ledger keeps everything already earned —
    // the cost is the forfeit game.js recorded, named on the defeat line (R48).
    player.respawn();
    player.releasePose('idle');
    const forfeit = game.lastOutcome ? game.lastOutcome.forfeit : 0;
    if (forfeit > 0 && duel.reason) hud.setReason(`${duel.reason}  -$${forfeit}`);
    restoreExploration();   // R68: the camera is back in exploration mode at once
    return;
  }
  // R59: PLAY AGAIN lands here from `victory` (and `defeat`), where the duel
  // machine has ALREADY finished and handed the town back — so the duel.active
  // teardown below would never run on a restart, and anything still live at the
  // press (a shot puff, a reaction pose, the duel's camera framing, the HUD
  // line) would leak into the new run. A new game starts clean unconditionally;
  // every call here is idempotent, so the boot `boot -> start` move is a no-op.
  if (next === 'start') {
    if (duel.active) duel.abort();
    clearShotFeedback();
    opponents.resetPosts();
    hud.clear();
    // T031 (V4): a new run is town time, so the purse comes back up with the
    // suppression. Nothing else sets the mode until the next duel's first phase.
    hud.setMode('explore');
    // R59: hud.clear() deliberately LEAVES the reward line up (R66 keeps the purse
    // readable after a duel hands the town back), so the finished run's "+ $200 + 60
    // Reputation" would otherwise sit on screen in the new game. Clear it explicitly.
    hud.setReward(null);
    // R59: the final showdown left the player in the boss's yard; a new game starts
    // at the town spawn, not there. respawn() mutates pos in place, so it must run
    // BEFORE restoreExploration(), which points the rig at player.position.
    player.respawn();
    restoreExploration();
    // NOT ambient.settle(): the crowd already walks back on the duel's own
    // `exploring` teardown, which runs before both victory and the defeat
    // handback. Calling it on the boot `boot -> start` move would reset every
    // NPC onto the stop it is standing on — they arrive, dwell, and the town
    // looks dead for a second (T019 samples movement from the first frames).
    return;
  }
  if (duel.active) {
    duel.abort();
    clearShotFeedback();   // abort emits no phase event, so tear feedback down here (R66)
    opponents.resetPosts();
    restoreExploration();
  }
});

// Only exploration lets the player walk. Leaving exploration drops held keys so
// a duel never starts with W stuck down (R66).
game.onPhase((next, previous) => {
  player.setEnabled(next === 'exploring');
  // T017c: a pause is NOT one of those phase changes. Wiping the held-key set
  // here would forget a physically-held Escape and let E/Space fire under the
  // overlay, breaking the priority rule T004 owns (pause > interact > shoot).
  // Nothing moves while paused anyway: the frame loop skips the gameplay
  // systems when game.state === 'paused', and the player is disabled outside
  // exploration, so a key held across the pause cannot drive the player.
  if (next === 'paused' || previous === 'paused') return;
  input.reset();
});

/**
 * R37: proximity is what makes an opponent challengeable, and the prompt names
 * him. Standing in range opens the duel's `challenge` phase; walking away closes
 * it again, so a prompt that is on screen is always a duel you can actually start.
 */
function updateChallengePrompt() {
  if (game.state !== 'exploring' || storeOpen()) return;
  const near = opponents.nearestTo(player.position);
  if (duel.active) {
    if (duel.phase === 'challenge' && (!near || near.name !== duel.opponent.name)) {
      duel.abort();
      hud.clear();
    }
    return;
  }
  if (near && progression.isUnlocked(near.name)) {
    duel.begin(near);
    hud.showChallenge(near.name);
    return;
  }
  // R51: the store's offer. A challengeable man outranks the shelf; the shelf
  // outranks a locked man's line (which still shows everywhere else around his
  // post, outside the store radius — T013's locked-line checks are untouched).
  if (nearStore()) {
    hud.setPrompt('General Store — press E to browse.');
    return;
  }
  if (near) {
    // R50: a gated gunslinger will not draw. The prompt says so and names the
    // price, and duel.begin() is never called, so `phase` stays null and the E
    // handler below (which requires 'challenge') cannot start the duel either.
    hud.setPrompt(progression.lockedLine(near.name));
  } else {
    hud.clear();
  }
}

// R24/R37: E challenges the gunslinger you are standing next to. Legality lives
// in the machine (D4), so this only ever asks for the duel to start.
// R51/T014a: with no duel in reach, the same key browses the general store.
input.onAction('interact', () => {
  if (game.state !== 'exploring') return;
  if (duel.active && duel.phase === 'challenge') { duel.accept(); return; }
  if (storeOpen()) { closeStore(); return; }
  if (nearStore()) openStore();
});

// R24/R40: the trigger. Every shot path (keyboard, mouse, and later the touch
// button) goes through duel.requestShot(), which owns the DRAW gate — this
// handler decides nothing about legality (D4). Outside a duel T009 will fire a
// world shot; for now the request is simply refused by the machine.
input.onAction('shoot', () => {
  // R24/T017c: a paused game takes no input at all. Without this the DRAW timer
  // is parked but `drawAt` is an absolute timestamp, so a click during a long
  // pause would land after DRAW and be accepted as a real shot.
  if (game.state === 'paused' || !duel.active) return;
  const entry = duel.requestShot('player');
  // R63: the sound of a pull the machine did NOT accept. Legality stays entirely
  // the duel's call (D4); this only listens to the answer. `requestShot` stamps a
  // kind on every return path, so the test is "not accepted" — the initial
  // 'ignored' never survives a return, which is what made the first version of
  // this line dead. A false start is the one refusal where the revolver really did
  // go off (that is why it loses), so it gets the shot, not the empty-chamber
  // click; every other refusal — second pull, pull at the prompt, pull after the
  // result — is the hammer falling on nothing.
  if (entry && !entry.accepted) {
    audio.cue(entry.kind === 'false-start' ? 'gunshot' : 'dryfire');
  }
});

// R24: Escape pauses and un-pauses, in every phase the game can pause from.
// game.togglePause() owns the legality; duel.suspend()/resumeDuel() is driven
// from game.onPhase above, so a pause never re-rolls the face-off delay (R66).
input.onAction('pause', () => {
  game.togglePause();
});

/**
 * T015 (R28/R29/R32): the tablet controls. They feed the same three streams as
 * the keyboard and mouse — stick into input.moveAxis(), drag into the drag
 * accumulator the rig already drains, button presses onto the action bus — so
 * nothing here decides anything about the duel (D4). The button is
 * context-sensitive: it is the trigger during a duel, CHALLENGE at a prompt,
 * and inert (WAIT) in between, which is also what keeps a stray thumb tap from
 * reading as a false start.
 */
const touch = createTouchControls({
  input,
  context: () => {
    if (game.state === 'paused') return { action: null, label: 'PAUSED', interact: false };
    if (storeOpen()) return { action: 'interact', label: 'LEAVE', interact: true };
    if (duel.active && duel.phase === 'challenge') {
      return { action: 'interact', label: 'CHALLENGE', interact: true };
    }
    if (duel.active) return { action: 'shoot', label: 'SHOOT', interact: false };
    if (nearStore()) return { action: 'interact', label: 'BROWSE', interact: true };
    return { action: null, label: 'WAIT', interact: false };
  },
});

// Move boot -> start on the first rendered frame, so the title never flashes
// over an unpainted canvas.
engine.onFrame(() => {
  if (game.state === 'boot') game.set('start');
});

/**
 * R24/T017c: pause freezes the SIMULATION, not the picture. The engine still
 * renders every frame (the pause overlay has to paint over a live scene), but no
 * gameplay system steps while paused: the camera rig holds its framing, held
 * movement keys cannot move the player, ambient opponents keep standing still,
 * and the challenge prompt cannot open or close behind the overlay (R66).
 */
engine.onFrame((dt) => {
  // The engine renders this frame regardless (see the render callback below), so
  // the pause overlay paints over a live scene while nothing simulates.
  if (game.state === 'paused') return;
  // R58: total play time. Only this pause-gated callback calls it, so the clock
  // runs from START to the last live frame and not across a pause or a menu.
  game.tick(dt);
  // T022a (R58): the run is over — raise the completion screen now that the duel
  // machine has handed the town back. Before updateChallengePrompt(), so a
  // standing next to the fallen boss cannot re-open a challenge under the overlay.
  if (victoryPending && game.state === 'exploring') {
    victoryPending = false;
    victoryScreen.render(game.stats);
    game.set('victory');
  }
  // T016 (R46): drain the aim FIRST. The rig below also drains input.consumeDrag
  // and discards it while a duel has setControl(false), so aiming must read the
  // touch drag before the rig eats it. Outside a duel aiming.update() returns
  // immediately and the rig keeps every drag pixel.
  aiming.update();
  stepShotTurn(dt);   // T030a (R46): eases the duel shot down the lane
  rig.update(dt);
  player.step(dt, { cameraYaw: cameraYawSource() });
  opponents.step(dt);
  // T020b (R73): AFTER player.step(), so that on any frame where the body did
  // fall back to a movement pose the duel's choreography wins that frame.
  holdDuelPose();
  // T019a (R55): the crowd walks BEFORE the cull decides what is drawn, so a
  // rig that just moved inside the radius is drawn this same frame.
  ambient.update(dt);
  // T019b (R54): the doors swing on the same clock, and open when the player
  // reaches the doorway. Inside this callback means a pause freezes them too.
  saloon.update(dt, player.position);
  // T020a (R19): the wind, the weeds and the swinging boards run on the same
  // game clock, so a pause freezes the weather too (correct: nothing drifts
  // while the player is in a menu). Before rigCull, and it adds no rigs.
  atmosphere.update(dt);
  // T010a (R21): decide which rigs this frame may be drawn, AFTER positions are
  // final and BEFORE the engine renders (engine.js runs every onFrame listener,
  // then renderer.render). Runs during a duel too — the camera is scripted there,
  // and the duelists are pinned so the cull cannot hide the man you are facing.
  rigCull.update();
  // T009c (R44/R66): shot feedback (pooled flash/smoke/impact meshes) and the
  // recoil/hit pose decay live INSIDE this pause-gated callback, so a paused game
  // advances neither effect lifetime nor reaction pose.
  shooting.update(dt);
  updateChallengePrompt();
  // R60/R62: the purse and the objective track state every frame. Every HUD
  // setter is idempotent, so this costs a string compare and only touches the DOM
  // when a number or the hint actually moved.
  hud.setValues(progression.snapshot());
});

/**
 * T015 (R28): the touch overlay is chrome, not simulation, so it updates in its
 * OWN callback — one that runs while paused too. Rendering continues during a
 * pause (the overlay paints over a live scene), and a player looking at the
 * screen during a pause must see the trigger read PAUSED and the USE control
 * gone, not a stale "SHOOT" frozen from the last live frame. Nothing here steps
 * the game, so the pause freeze in the callback above is untouched.
 */
engine.onFrame(() => {
  touch.update();
});

engine.start();

const hook = installHooks({
  engine,
  get game() { return game; },
  stats: () => ({
    frames: engine.frames,
    running: engine.running,
    drawCalls: engine.drawCalls,
    triangles: engine.triangles,
    state: game.state,
  }),
});

if (hook) {
  // Flip ready only once a frame has actually been rendered.
  engine.onFrame(() => { if (!hook.ready) hook.ready = true; });
  hook.register('phases', () => ({
    state: game.state,
    previous: game.previous,
    pausedFrom: game.pausedFrom,
    can: (next) => game.can(next),
  }));
  hook.register('screens', () => screens.openNames());
  // Character builder for T003 checks: builds a cowboy, drops it in the scene,
  // and hands back the handle so the check can inspect parts/rotations in-page.
  hook.register('cowboy', (palette) => createCowboy(palette, { scene: engine.scene }));
  // T004 player-controller hooks. The game never reads these; they only observe
  // and drive the same code paths the real frame loop uses.
  hook.register('input', input);
  hook.register('inputState', () => input.snapshot());
  hook.register('bounds', () => ({ ...bounds.limits, inset: bounds.inset, area: bounds.area }));
  // T026 town hook: the live town handle plus its manifest, so a check can assert
  // the built geometry against TOWN.structures instead of hardcoded numbers.
  hook.register('town', town);
  // T033ba (R13/R16): the EXACT boxes the player controller collides against, so
  // a check reads the authority instead of re-deriving solidBox() in-page. `boxes`
  // are the town's own solidBox footprints (the wall, not the manifest bbox);
  // `inflated` is what player.js actually tests, i.e. boxes widened by the cowboy
  // body radius. Test-hook only (D3/R5): the shipped game never reads this.
  hook.register('townBoxes', () => {
    const boxes = townColliders(town.manifest);
    const r = player.cowboy.radius;
    return {
      radius: r,
      boxes,
      inflated: boxes.map((b) => ({
        name: b.name,
        minX: b.minX - r, maxX: b.maxX + r, minZ: b.minZ - r, maxZ: b.maxZ + r,
      })),
    };
  });
  // T025c (REVIEW V3): the world-space top of every chimney the built town
  // actually has, so a check can prove each smoke plume rises out of one of them
  // instead of trusting a hand-typed coordinate.
  hook.register('chimneys', () => chimneyTops(town.manifest));
  // T007 duel hook: a point-in-time snapshot plus the live machine's own drive
  // methods, so a check can run a whole duel without waiting on real input (D3).
  hook.register('duel', () => Object.assign(duel.snapshot(), {
    begin: duel.begin, accept: duel.accept, resolve: duel.resolve,
    // T009c: abort() is the blunt teardown and emits no phase event, so a check
    // driving it directly gets the SAME feedback teardown the game's own
    // departure paths do (R66).
    abort: () => { const r = duel.abort(); clearShotFeedback(); return r; },
    requestShot: duel.requestShot, canShoot: duel.canShoot,
    suspend: duel.suspend, resumeDuel: duel.resumeDuel,
    shootOpensAt: duel.shootOpensAt,
    setTiming: duel.setTiming,
    // T007c: the shipped beat table (live, so a check asserts against the numbers
    // the machine actually uses). The clock state itself comes through
    // duel.snapshot().clock; WWS.clock() is the standalone accessor.
    timing: { ...duel.timing },
  }));
  // T007c (R36): drive the duel's timeline in GAME time. The duel reads all of
  // its time through one internal seam (duel.js createClock); this is the only
  // door to it, and it is registered here, under ?test=1, so the shipped game
  // runs on the real clock and never sees it (R5). Advancing does not scale the
  // beats: the same milliseconds a real duel would report are reported sooner.
  hook.register('advance', (ms) => duel.advance(ms));
  // T025c (REVIEW G1): arm the beat table on the driven clock before the first
  // advance, so beats stay exact instead of collapsing into one chunk.
  hook.register('armVirtual', () => duel.armVirtual());
  hook.register('clock', () => duel.clock());
  // T027: the deterministic pre-DRAW override (null restores the randomized draw)
  // and the recorded range, so checks assert against DECISIONS.md D6, not guesses.
  hook.register('setDrawDelay', (ms) => duel.setDrawDelay(ms));
  // T008: shrink the beats a check is not testing (null restores DUEL_TIMING), so
  // the AI-waits-DRAW check can run many duels inside the verify budget.
  hook.register('setTiming', (patch) => duel.setTiming(patch));
  // T010c (R42/R43): script the AI's accuracy/hesitation rolls so a check can
  // prove the opponent really misses. null restores Math.random.
  hook.register('setAiRandom', (fn) => {
    aiRandomSource = typeof fn === 'function' ? fn : Math.random;
    return typeof fn === 'function' ? 'scripted' : 'random';
  });
  hook.register('drawDelayRange', () => ({ ...DRAW_DELAY }));
  // T009b (R43): the live shot resolver. `last` is what the most recent accepted
  // player shot DID, so a check can prove hit and miss come from real aim
  // geometry rather than trusting the duel's outcome alone.
  hook.register('shooting', () => ({
    last: shooting.snapshot(),
    hitbox: { ...shooting.hitbox },
    aimYaw: shooting.aimYaw(),
    fire: (name) => shooting.fire(name ? opponents.find(name) : null),
    // T009c: which reaction poses are still held (and how long is left).
    reactions: () => shooting.reactions(),
    // T009d (R44): the opponent's most recent resolved shot, kept separate from
    // `last` so the player-only record T009b/T016/T017a read stays untouched.
    lastFrom: shooting.snapshotFrom(),
  }));
  // THE aim override (R46): pins the single accessor shooting.js reads. T016
  // replaces the accessor's body with mouse/touch aim; this hook stays valid.
  hook.register('setAimYaw', (rad) => shooting.setAimYaw(rad));
  // T016 (R46): the steered aim itself — live flag, offset, yaw, reticle point —
  // plus the ONE aim-speed accessor the T014 upgrade will drive.
  hook.register('aiming', () => aiming.snapshot());
  hook.register('setAimSpeed', (v) => aiming.setAimSpeed(v));
  // T007b: the challengeable bodies, their town posts and the facing posts a duel
  // stages them onto, plus the HUD prompt line a player actually reads (R37).
  hook.register('opponents', () => ({
    radius: opponents.radius,
    gap: opponents.gap,
    list: opponents.opponents.map((o) => ({
      name: o.name, role: o.role, structure: o.structure, post: { ...o.post },
      // T010b (R33/R34/R42): the roster data a pure-data check reads — the
      // difficulty block, the boss flag and the built palette.
      boss: o.boss, ai: o.ai ? { ...o.ai } : null, palette: { ...o.palette },
      // T013 (R50): the reputation gate, so a check can read the ladder itself.
      unlockAt: o.unlockAt,
      x: o.x, y: o.group.position.y, z: o.z, yaw: o.yaw,
      // T009c (R45): the cartoon hit reaction a check reads. WWS.player() already
      // exposes the shooter's pose; opponents did not, which is why reading
      // `.pose` off an opponent entry came back undefined.
      pose: o.cowboy.pose,
      // T014b (R52): cosmetic materials are cached per colour (R21), so a check
      // must be able to prove the player's new hat did NOT recolour the town.
      colors: o.cowboy.colors(),
    })),
  }));
  // T009c (R44/R21): the pooled shot-feedback system. `live` is how many effect
  // meshes are visible right now, so a check can prove a shot spawned flash,
  // smoke and an impact/miss puff, and that the pool is idle (0) between shots.
  // T011 (R47/R42): retarget ONE live opponent's difficulty block, so a check can
  // place the AI's bullet at a known instant and drive the near-simultaneous rule
  // by recorded timestamps instead of racing a setTimeout. Test-only (R5): the
  // game never reads it, and it changes nothing about the DRAW gate.
  hook.register('setAi', (name, patch = {}) => {
    const o = opponents.find(name);
    if (!o) return null;
    if (!o.ai) o.ai = { reaction: 620, duelReaction: 370, accuracy: 1, hesitation: 0 };
    for (const [k, v] of Object.entries(patch)) {
      if (Number.isFinite(v)) o.ai[k] = v;
    }
    return { ...o.ai };
  });
  // T011 (R48/R49): retarget one live opponent's purse, so a check can prove the
  // defeat forfeit actually bites against real earnings. Test-only (R5): the game
  // never reads it, and the shipped reward amounts stay T012's to publish.
  hook.register('setReward', (name, patch = {}) => {
    const o = opponents.find(name);
    if (!o) return null;
    o.reward = { money: 0, reputation: 0, ...(o.reward || {}) };
    for (const [k, v] of Object.entries(patch)) {
      if (Number.isFinite(v)) o.reward[k] = v;
    }
    return { ...o.reward };
  });
  // T013 (R50): flag one live gunslinger as THE final boss, so a check can prove
  // the boss gate (FINAL_REPUTATION) before T021 ships the real one. Test-only.
  hook.register('setBoss', (name, flag = true) => {
    const o = opponents.find(name);
    if (!o) return null;
    o.boss = !!flag;
    progression.invalidate();
    return { name: o.name, boss: o.boss, gate: progression.gate(o.name) };
  });
  hook.register('gate', (name) => progression.gate(name));
  // T014a (R51): the shelf, the counter and the purchase door. Test-only (R5);
  // the game itself drives the same store.buy() from the screen's Buy buttons.
  hook.register('store', () => store.snapshot());
  hook.register('buy', (id) => {
    const res = store.buy(id);
    storeScreen.render(store.snapshot());
    hud.setValues(progression.snapshot());
    return res;
  });
  hook.register('storePost', () => ({ ...STORE_POST, radius: STORE_RADIUS,
    near: nearStore(), open: storeOpen() }));
  // T014b (R52): what the owned shelf is currently worth to the systems, as
  // data. `aimSpeed`/`accuracy`/`tints` are the store's own modifiers; the rest
  // is what the live modules report back, so a check can prove the push landed.
  hook.register('storeEffects', () => ({
    ...store.modifiers(),
    applied: {
      aimSpeed: aiming.aimSpeed(),
      aimBase: AIM_BASE_SPEED,
      tolerance: shooting.tolerance,
      radiusLive: shooting.hitbox.radiusLive,
      colors: player.cowboy.colors(),
      tinted: player.cowboy.tinted(),
    },
  }));
  hook.register('effects', () => ({ ...effects.snapshot(), pool: { ...effects.pool } }));
  hook.register('clearEffects', () => { effects.clear(); shooting.cancelReactions(); return hook.effects(); });
  hook.register('duelPosts', (name) => {
    const o = name ? opponents.find(name) : opponents.opponents[0];
    return o ? opponents.duelPosts(o, opponents.gap) : null;
  });
  // T021b (R56/R57): the final showdown's staging, as plain data. Test-only (R5).
  // `bossArena` is the arena record for a name (null for a town man) and `challenge`
  // steps onto a live record and calls the machine's own begin(), which is how
  // T007a has always started a duel in a check: the FINAL_REPUTATION gate lives in
  // the challenge PROMPT (T013) and is policed by T013/T021a, so a staging check
  // does not have to bank 120 reputation to see the yard.
  hook.register('boss', () => boss.snapshot());
  hook.register('bossArena', (name) => {
    const o = name ? opponents.find(name) : null;
    return o ? boss.arenaFor(o) : null;
  });
  hook.register('challenge', (name) => {
    const o = opponents.find(name);
    if (!o) return null;
    if (duel.active) { duel.abort(); clearShotFeedback(); }
    if (game.state !== 'exploring') game.set('exploring');
    const begun = duel.begin(o);
    return begun ? { name: o.name, phase: duel.phase, arena: !!boss.arenaFor(o) } : null;
  });
  // T012 (R49/R60/R61): everything the HUD is showing, as the player reads it.
  // `prompt` stays in the snapshot because T007/T008/T017 assert on it.
  hook.register('hud', () => hud.snapshot());
  // T015 (R28/R29/R32): the touch layer's live state and control rectangles.
  hook.register('touch', () => touch.snapshot());
  hook.register('setTouch', (flag) => touch.setEnabled(flag));
  // T018 (R63/R64): the audio module itself, so checks can read its state,
  // suspend the context and fire cues without listening to sound.
  hook.register('audio', () => audio);
  // T012 (R49/R50/R62): the purse, the objective and the reward line's source.
  hook.register('progression', () => progression.snapshot());
  hook.register('rewardFor', (name) => progression.rewardFor(name));
  hook.register('player', () => ({
    x: player.x, y: player.y, z: player.z,
    yaw: player.yaw, modelYaw: player.group.rotation.y,
    pose: player.pose, speed: player.speed, distance: player.distance,
    blocked: player.blocked, enabled: player.enabled,
    // T014b (R52): the live material colour of each repaintable cosmetic slot.
    colors: player.cowboy.colors(),
  }));
  // Third argument is facing yaw, not height: the ground plane is y=0.
  hook.register('playerTeleport', (x, z, yaw) => { player.teleport(x, z, yaw); return hook.player(); });
  hook.register('setCameraYaw', (rad) => { rig.setYaw(rad); return rig.yaw; });
  // T005 camera hooks: observe the live rig; cameraRig exposes the same
  // setTarget/snapTo/setOrbit/setControl surface T007 will use for duels.
  hook.register('camera', () => {
    const c = engine.camera;
    const f = c.getWorldDirection(new engine.THREE.Vector3());
    return {
      yaw: rig.yaw, pitch: rig.pitch,
      distance: rig.distance, configured: rig.desiredDistance,
      x: c.position.x, y: c.position.y, z: c.position.z,
      focusX: rig.focus.x, focusY: rig.focus.y, focusZ: rig.focus.z,
      fx: f.x, fy: f.y, fz: f.z,
      occluded: rig.occluded, control: rig.control,
    };
  });
  // T030a (R46/R27): the duel shot's re-frame state as plain data, so a check can
  // wait for the turn to SETTLE (it is eased by engine.onFrame, not by the duel's
  // virtual clock) instead of guessing at a duration. Test-only (R5).
  hook.register('duelShot', () => ({
    laneYaw: duelLaneYaw, turning: shotTurn !== null, yaw: rig.yaw,
  }));
  // T030a: project a world point through the LIVE camera into viewport fractions
  // (x right, y down, both 0..1) so a check can prove where the opponent actually
  // lands on screen relative to the reticle. Test-only (R5).
  hook.register('project', (x, y, z) => {
    const v = new engine.THREE.Vector3(x, y, z).project(engine.camera);
    return { x: 0.5 + v.x / 2, y: 0.5 - v.y / 2, behind: v.z > 1 };
  });
  hook.register('cameraConfig', () => ({ ...rig.config }));
  hook.register('cameraRig', rig);
  /**
   * T010a (R21): the shared rig cull, as plain data so a check can prove that
   * distance culling is real without reading the module. `culled`/`visible` are
   * rig names; `pinned` holds the rigs that are never distance-culled (the
   * player). Registration is name-based because THREE objects do not survive
   * page.evaluate serialization.
   */
  hook.register('rigCull', () => ({
    radius: rigCull.radius,
    maxVisible: rigCull.maxVisible,
    size: rigCull.size(),
    culled: rigCull.culled(),
    visible: rigCull.visible(),
    pinned: rigCull.pinned(),
  }));
  hook.register('rig', (name) => rigCull.inspect(name));
  /**
   * T019a (R55): the ambient crowd as plain data. `npcs[i].state` is the
   * behaviour the town is showing right now, `offset` how far that NPC has
   * drifted from its own route polyline, and `route` is the polyline itself, so
   * a check can prove the walk is along a real route and not random drift.
   * `lastReact` is the centre of the most recent react() call (null before the
   * first duel), which is what lets a check measure the near/far split against
   * the point the crowd was actually told about rather than guessing it.
   */
  hook.register('ambient', () => ambient.snapshot());
  /**
   * Drive the crowd forward in fixed steps inside one synchronous call, the same
   * way playerSim drives the player: a check watches a minute of town life
   * without depending on the browser's frame timing. Returns the snapshot.
   */
  hook.register('ambientRun', (seconds, dt) => ambient.run(seconds, dt));
  /** Force a reaction at a point, for a check that does not want a whole duel. */
  hook.register('ambientReact', (x, z) => ({
    changed: ambient.react({ x, z }),
    snapshot: ambient.snapshot(),
  }));
  hook.register('ambientSettle', () => { ambient.settle(); return ambient.snapshot(); });
  /**
   * T019b (R54): the saloon as plain data — its feature list, the deck it sits
   * on, the doorway, the live swing angle of each door leaf, and the porch
   * gunslinger's rig name and pose. `saloonSwing` bangs the doors for a check
   * that wants to watch them move without walking the player there.
   */
  hook.register('saloon', () => saloon.snapshot());
  hook.register('saloonSwing', (strength) => { saloon.swing(strength); return saloon.snapshot(); });
  /**
   * T020a (R19): the atmosphere as plain data — wind vector, gust count, every
   * tumbleweed's position/quaternion/roll, and each board's live angle.
   * `atmosphereRun` advances it in fixed steps inside one synchronous call,
   * `atmosphereGust` kicks it, and `atmosphereVisible` is the visibility gate
   * (family name or 'all') that the pixel diff and T020c both use.
   */
  hook.register('atmosphere', () => atmosphere.snapshot());
  hook.register('atmosphereRun', (seconds, dt) => atmosphere.run(seconds, dt));
  hook.register('atmosphereGust', (strength) => { atmosphere.gust(strength); return atmosphere.snapshot(); });
  hook.register('atmosphereVisible', (name, flag) => {
    atmosphere.setVisible(name, flag);
    return atmosphere.snapshot();
  });
  /**
   * Move a registered rig with NO cull pass, returning its stale decision, so a
   * check can prove the frame loop (not the spawn hook) applies the distance rule.
   */
  hook.register('rigMove', (name, x, z) => rigCull.move(name, x, z));
  /** Pin/unpin one rig by name (a live duel), then run one cull pass. */
  hook.register('rigProtect', (name, on = true) => {
    if (on) rigCull.protect(name); else rigCull.unprotect(name);
    rigCull.update();
    return rigCull.inspect(name);
  });
  /**
   * Build one extra cowboy rig at a town position and register it with the
   * cull, so a check can scatter the 7+ rigs T010b/T019 will add and measure
   * the frame. Returns the rig name.
   */
  hook.register('spawnRig', (opts = {}) => {
    const cb = createCowboy(opts.palette || {}, { scene: engine.scene });
    cb.group.position.set(opts.x ?? 0, opts.y ?? 0, opts.z ?? 0);
    rigCull.add(cb.group, { alwaysVisible: !!opts.alwaysVisible });
    // Run one cull pass immediately, so the caller reads decided state rather
    // than the group's default `visible === true` before the next frame.
    rigCull.update();
    return cb.group.name;
  });
  /**
   * Advance the player with fixed dt steps against the live key state, so a
   * check measures distance without depending on the browser's frame timing.
   * The whole run happens inside one synchronous call, so no real frame can
   * interleave and pollute the measurement.
   * @param {object|number} opts { seconds, dt, from:{x,z}, yaw }
   */
  hook.register('playerSim', (opts = {}) => {
    const o = typeof opts === 'number' ? { seconds: opts } : (opts || {});
    const seconds = Number.isFinite(o.seconds) ? o.seconds : 1;
    const dt = Number.isFinite(o.dt) ? o.dt : 1 / 60;
    if (Number.isFinite(o.yaw)) rig.setYaw(o.yaw);
    if (o.from) player.teleport(o.from.x ?? 0, o.from.z ?? 0);
    const startX = player.x;
    const startZ = player.z;
    const startDist = player.distance;
    const path = [];
    let blockedMax = 0;
    const n = Math.max(1, Math.min(3600, Math.round(seconds / dt)));
    for (let i = 0; i < n; i += 1) {
      player.step(dt, { cameraYaw: cameraYawSource() });
      // player.blocked is this step's wall-eaten input, reset every step, so a
      // check needs the per-step maximum rather than the last frame's snapshot.
      if (player.blocked > blockedMax) blockedMax = player.blocked;
      if (i % 4 === 3 || i === n - 1) path.push({ x: +player.x.toFixed(4), z: +player.z.toFixed(4) });
    }
    return {
      covered: Math.hypot(player.x - startX, player.z - startZ),
      distanceDelta: player.distance - startDist,
      blockedMax,
      path,
      ...hook.player(),
    };
  });
}
