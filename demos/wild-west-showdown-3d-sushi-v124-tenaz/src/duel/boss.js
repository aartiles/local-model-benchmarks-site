/**
 * The final showdown's staging (T021b, R56/R57).
 *
 * This module owns NOTHING about whether a duel happens, how it resolves, or what
 * it pays — that is duel.js, progression.js and opponents.js (T021a shipped the
 * boss as data). What lives here is the drama: his arena, the introduction beat
 * that runs before the face-off, and the camera and light that make the last duel
 * read differently from every street duel.
 *
 * Three rules this file keeps:
 *  - No new duel phase. The introduction is driven by the phases that already
 *    exist (`start` -> `position` -> `faceoff`, held through `tension` and `draw`
 *    by T032a) and is FINISHED on the way into `shooting`, so T007/T007a's
 *    nine-step phase contract is untouched.
 *  - No new timers. Everything here reacts to a phase event; nothing schedules a
 *    beat of its own, so duel.abort()/suspend() cannot strand a pending callback
 *    (R66). The duel machine owns all time.
 *  - Every mutation is reversible from one source. Light and fog values come back
 *    from `terrain.config` (T006d/T006b), the lens from the engine's own camera
 *    default, so `restore()` cannot drift from what the world was built with.
 */

import { DUEL_GAP } from '../actors/opponents.js';

/** The one record this staging is for. Read from the roster's `boss: true` flag. */
export const BOSS_ARENA = Object.freeze({
  name: 'tower-yard',
  label: 'THE TOWER YARD',
  /**
   * The arena: an EAST-WEST line of ground south-west of the water tower, at the
   * town's far rim. Every street duel runs north-south along the corridor
   * (duelPosts() steps the player back in Z), so a line perpendicular to the
   * street, off the corridor, under the tower, is a place nothing else uses (R56).
   * Both posts are inside PLAY_AREA (x >= -31.58, z >= -49.58) and clear of every
   * building footprint; the tower itself sits BEHIND him, so the camera looks the
   * line down with the tank at his back.
   */
  opponent: { x: -24.5, z: -43 },
  player: { x: -12.5, z: -43 },
  /** Wider than the street's DUEL_GAP: his yard, his distance. */
  gap: DUEL_GAP + 5,
  /** Where he stands before the introduction, in the tower's shadow. */
  entrance: { x: -24.5, z: -47.5 },
  /**
   * Framing (R57). Side-on to an east-west line means the camera sits SOUTH of
   * it (yaw PI in the rig's yaw-0-faces-+Z convention), low and far back, with a
   * longer lens than the exploration default: the two men are small, the tower
   * behind them is not. A street duel is yaw PI/2, pitch 0.22, 9.5m, fov 60.
   */
  shot: { yaw: Math.PI, pitch: 0.07, distance: 14.5 },
  /** The establishing beat pulls back further and lower still. */
  establish: { yaw: Math.PI * 1.06, pitch: 0.04, distance: 19.5 },
  fov: 45,
  /**
   * Light (R57): the same sun and hemisphere fill terrain.js built, retuned to a
   * low, red late-afternoon rake and a much tighter fog, so the yard reads as
   * dusk and the mesas behind the tower fall out. Values are restored from
   * terrain.config, never remembered here.
   *
   * REVIEW V2 fix — the sun's DIRECTION is part of the rig, not just its colour.
   * Town sun (18,30,12) hangs in the NORTH, and the yard's camera looks north
   * (shot.yaw PI), so every facade in frame was back-lit and lit only by the fill;
   * with the dusk fill that read as near-black cut-outs. The yard's sun is dragged
   * down and round to the south-west (-26,9,-16), i.e. low and BEHIND the camera,
   * so it rakes the tower and saloon fronts at a grazing angle: the drama of a
   * dying day, but on the faces the player is looking at. The fill is lifted out of
   * the crush (still purple dusk, still under town's 1.05) and the fog starts later
   * so the tower at ~25m is not hazed away — it stays tighter than town (R57).
   */
  light: {
    sunColor: 0xffa26b, sunIntensity: 3.7, sunX: -26, sunY: 9, sunZ: -16,
    hemiSky: 0x8a6f9a, hemiGround: 0x9a6a3e, hemiIntensity: 0.9,
    fogColor: 0xa9683c, fogNear: 38, fogFar: 190,
  },
  /** The introduction, one line per beat the duel machine already runs. */
  intro: Object.freeze([
    Object.freeze({ phase: 'start', line: 'JEREMIAH CADE — THE TOWER YARD' }),
    Object.freeze({ phase: 'position', line: 'He has never drawn second. Not here.' }),
    Object.freeze({ phase: 'faceoff', line: 'The tower is at his back. Steady.' }),
  ]),
});

/**
 * The phases the introduction may occupy. T032a (REVIEW P1) extended it past the
 * face-off, through the countdown and the DRAW signal; `shooting` and after are the
 * duel proper, so the introduction never overlaps the window a shot resolves in.
 * This is the set `hold()` guards on, not a comment about it.
 */
const INTRO_PHASES = new Set(['start', 'position', 'faceoff', 'tension', 'draw']);

/**
 * @param {object} opts.engine   for the scene, camera and THREE
 * @param {object} opts.terrain  for sun/fill/fog and the config to restore from
 * @param {object} opts.rig      the camera rig (setOrbit/snapTo)
 * @param {object} opts.hud      where the introduction lines are read
 * @param {object} opts.audio    optional cue seam (T018); never required
 */
export function createBossShowdown({ engine, terrain, rig, hud = null, audio = null } = {}) {
  const THREE = engine.THREE;
  const camera = engine.camera;
  const cfg = terrain && terrain.config ? terrain.config : {};
  /** The lens the world was built with, captured once so restore() is exact. */
  const baseFov = camera.fov;
  let active = false;      // a boss duel is staged right now
  let step = -1;           // which introduction line is up (-1 = none yet)
  let done = false;        // the introduction has finished (on the way into `shooting`)
  let lines = [];          // what the player actually read, in order

  /** Put the sun, the fill, the fog and the lens into the yard's dusk. */
  function applyLight() {
    const L = BOSS_ARENA.light;
    if (terrain.sun) {
      terrain.sun.color.setHex(L.sunColor);
      terrain.sun.intensity = L.sunIntensity;
      terrain.sun.position.set(L.sunX, L.sunY, L.sunZ);
    }
    if (terrain.fill) {
      terrain.fill.color.setHex(L.hemiSky);
      terrain.fill.groundColor.setHex(L.hemiGround);
      terrain.fill.intensity = L.hemiIntensity;
    }
    if (!engine.scene.fog) engine.scene.fog = new THREE.Fog(L.fogColor, L.fogNear, L.fogFar);
    else {
      engine.scene.fog.color.setHex(L.fogColor);
      engine.scene.fog.near = L.fogNear;
      engine.scene.fog.far = L.fogFar;
    }
    camera.fov = BOSS_ARENA.fov;
    camera.updateProjectionMatrix();
  }

  /** Hand the world's light and lens back (terrain.config is the source). */
  function restoreLight() {
    if (terrain.sun && cfg.sunColor !== undefined) {
      terrain.sun.color.setHex(cfg.sunColor);
      terrain.sun.intensity = cfg.sunIntensity;
      terrain.sun.position.set(cfg.sunX, cfg.sunY, cfg.sunZ);
    }
    if (terrain.fill && cfg.hemiSky !== undefined) {
      terrain.fill.color.setHex(cfg.hemiSky);
      terrain.fill.groundColor.setHex(cfg.hemiGround);
      terrain.fill.intensity = cfg.hemiIntensity;
    }
    if (engine.scene.fog && cfg.fogColor !== undefined) {
      engine.scene.fog.color.setHex(cfg.fogColor);
      engine.scene.fog.near = cfg.fogNear;
      engine.scene.fog.far = cfg.fogFar;
    }
    camera.fov = baseFov;
    camera.updateProjectionMatrix();
  }

  /**
   * Put one introduction line in front of the player.
   *
   * It goes on the duel's NARRATION line (hud's `reason` slot), not the prompt:
   * applyMode() hides the prompt while a duel is up (R61), and hud.js is not this
   * card's file to change. The reason line is inside the duel panel, is visible
   * for every live phase, and main.js overwrites it with the duel's own verdict at
   * `result` — which is after the introduction has finished, so the two never fight.
   */
  function say(line) {
    if (!line) return;
    lines.push(line);
    if (hud) hud.setReason(line);
  }

  const api = {
    ARENA: BOSS_ARENA,

    /** True for the one boss record; everything else stages as a street duel. */
    isBoss(opp) {
      return !!(opp && opp.boss === true);
    },

    /**
     * The arena for this duel, or null when it is an ordinary street face-off.
     * `posts` is the same shape duelPosts() returns, so stageDuel() does not
     * branch on anything but where the two men stand and how they are framed.
     */
    arenaFor(opp) {
      if (!api.isBoss(opp)) return null;
      return {
        name: BOSS_ARENA.name,
        label: BOSS_ARENA.label,
        gap: BOSS_ARENA.gap,
        posts: {
          player: { x: BOSS_ARENA.player.x, y: 0, z: BOSS_ARENA.player.z },
          opponent: { x: BOSS_ARENA.opponent.x, y: 0, z: BOSS_ARENA.opponent.z },
        },
        shot: BOSS_ARENA.shot,
      };
    },

    /**
     * The duel was called on the final gunslinger: dusk falls, the camera pulls
     * back to the establishing shot, and he waits in the tower's shadow rather
     * than at his post. Called from the `start` phase event.
     */
    begin(opp) {
      active = true;
      step = -1;
      done = false;
      lines = [];
      applyLight();
      rig.setOrbit(BOSS_ARENA.establish);
      rig.snapTo();
      if (opp && opp.cowboy) opp.cowboy.moveTo(BOSS_ARENA.entrance.x, 0, BOSS_ARENA.entrance.z);
      return api.step(0);
    },

    /**
     * Walk the introduction onto the next line. Called from the phase handler for
     * `position` and `faceoff`; it is idempotent per phase, so a re-entrant event
     * (or a resume from pause) cannot skip a line or repeat one.
     */
    step(n) {
      if (!active || done) return api.snapshot();
      const want = Number.isFinite(n) ? n : step + 1;
      while (step < want && step + 1 < BOSS_ARENA.intro.length) {
        step += 1;
        say(BOSS_ARENA.intro[step].line);
      }
      return api.snapshot();
    },

    /**
     * Re-read the CURRENT line after the HUD was torn down for a phase change.
     * main.js's phase hook calls hud.clear() on every beat, which takes the reason
     * slot (where the introduction lives) down with it, so a phase the introduction
     * is allowed to occupy has to put the same line back. It never pushes a line, so
     * `lines` cannot repeat and the count stays what the player read (T021/T021b).
     * `phase` is optional; when given, a phase outside INTRO_PHASES is a no-op.
     */
    hold(phase = null) {
      if (!active || done || step < 0) return api.snapshot();
      if (phase && !INTRO_PHASES.has(phase)) return api.snapshot();
      const entry = BOSS_ARENA.intro[step];
      if (entry && hud) hud.setReason(entry.line);
      return api.snapshot();
    },

    /**
     * The duel proper starts here: the last line comes down and the camera settles
     * into the yard's two-shot. T032a (REVIEW P1) moved this off the way into
     * `tension` onto the way into `shooting`, so Cade's introduction survives the
     * countdown and the DRAW signal — and it also runs on `result`, because a false
     * start reports its own reason into the same slot.
     */
    finish() {
      if (!active || done) return api.snapshot();
      done = true;
      step = BOSS_ARENA.intro.length;
      if (hud) hud.setReason('');
      return api.snapshot();
    },

    /** Tear the staging down: light, fog and lens back to the town's own. */
    restore() {
      if (!active) return api.snapshot();
      active = false;
      step = -1;
      done = false;
      restoreLight();
      return api.snapshot();
    },

    get live() { return active; },

    /** Plain data for WWS.boss(): what a check can assert on without THREE. */
    snapshot() {
      const fog = engine.scene.fog;
      return {
        active,
        arena: active ? BOSS_ARENA.name : null,
        label: BOSS_ARENA.label,
        intro: {
          active: active && !done,
          done,
          step,
          lines: lines.slice(),
          beats: BOSS_ARENA.intro.map((i) => i.phase),
        },
        light: {
          sunColor: terrain.sun ? terrain.sun.color.getHex() : null,
          sunIntensity: terrain.sun ? terrain.sun.intensity : null,
          sunX: terrain.sun ? terrain.sun.position.x : null,
          sunY: terrain.sun ? terrain.sun.position.y : null,
          sunZ: terrain.sun ? terrain.sun.position.z : null,
          hemiSky: terrain.fill ? terrain.fill.color.getHex() : null,
          hemiIntensity: terrain.fill ? terrain.fill.intensity : null,
          fogColor: fog ? fog.color.getHex() : null,
          fogNear: fog ? fog.near : null,
          fogFar: fog ? fog.far : null,
          fov: camera.fov,
        },
        shot: { yaw: rig.yaw, pitch: rig.pitch, distance: rig.desiredDistance },
      };
    },
  };

  return api;
}
