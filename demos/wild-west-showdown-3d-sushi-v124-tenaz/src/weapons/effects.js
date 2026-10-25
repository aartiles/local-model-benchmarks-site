/**
 * Pooled shot feedback (R44/R45/R21).
 *
 * A fired shot has to be SEEN: a muzzle flash at the barrel, a smoke puff that
 * drifts up, an impact puff where the bullet landed, and a dust puff where it
 * hit the dirt on a miss. Every mesh is allocated once at boot and only ever
 * toggled `visible`, so the pool costs zero draw calls while idle (R21 — the
 * T026d draw-call budget measures an exploring frame) and never grows per shot.
 *
 * Violence stays cartoon-like (R45): the puffs are sand/dust coloured. No red,
 * no blood, no gore.
 *
 * Lifetime is driven from `update(dt)`, which main.js calls from the
 * PAUSE-GATED gameplay frame callback (src/main.js, `game.state === 'paused'`
 * returns early), so nothing advances while paused (R66).
 */

/** Fixed pool sizes (R21). Never resized at runtime. */
export const POOL = Object.freeze({ flash: 4, smoke: 6, impact: 4, miss: 4 });

/** Seconds each kind lives, and how it moves/scales over that life. */
const KIND = Object.freeze({
  flash: { ttl: 0.09, grow: 1.6, rise: 0.0, fade: 0.6, color: 0xffd27a },
  smoke: { ttl: 0.75, grow: 2.4, rise: 0.85, fade: 1.0, color: 0xd8cbb2 },
  impact: { ttl: 0.30, grow: 2.0, rise: 0.35, fade: 1.0, color: 0xe8dcc0 },
  miss: { ttl: 0.45, grow: 2.2, rise: 0.25, fade: 1.0, color: 0xcbb894 },
});

/**
 * @param {object} opts.engine  engine (for THREE and the scene root)
 */
export function createEffects({ engine }) {
  const THREE = engine.THREE;
  const group = new THREE.Group();
  group.name = 'shot-effects';
  engine.scene.add(group);

  const scratch = new THREE.Vector3();

  function geometry(kind) {
    switch (kind) {
      // A spiky burst reads as a flash; everything else is a soft puff.
      case 'flash': return new THREE.OctahedronGeometry(0.17, 0);
      case 'smoke': return new THREE.SphereGeometry(0.13, 6, 4);
      case 'impact': return new THREE.SphereGeometry(0.11, 6, 4);
      default: return new THREE.SphereGeometry(0.16, 6, 4);
    }
  }

  /** One pre-allocated pool per kind; slots are reused round-robin. */
  const pools = {};
  for (const [kind, spec] of Object.entries(KIND)) {
    const geo = geometry(kind);
    const slots = [];
    for (let i = 0; i < POOL[kind]; i += 1) {
      const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
        color: spec.color,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }));
      mesh.name = `fx-${kind}-${i}`;
      mesh.visible = false;
      mesh.frustumCulled = true;
      group.add(mesh);
      slots.push({ mesh, life: 0, ttl: spec.ttl, active: false, spin: 0 });
    }
    pools[kind] = { slots, next: 0 };
  }

  /** Take the next free (or oldest) slot in the pool. Never allocates. */
  function claim(kind) {
    const pool = pools[kind];
    const n = pool.slots.length;
    for (let i = 0; i < n; i += 1) {
      const slot = pool.slots[(pool.next + i) % n];
      if (!slot.active) {
        pool.next = (pool.next + i + 1) % n;
        return slot;
      }
    }
    // Pool saturated: recycle the oldest rather than growing it (R21).
    const slot = pool.slots[pool.next];
    pool.next = (pool.next + 1) % n;
    return slot;
  }

  function spawn(kind, position) {
    const spec = KIND[kind];
    const slot = claim(kind);
    const p = position || scratch.set(0, 0, 0);
    slot.mesh.position.set(p.x ?? 0, p.y ?? 0, p.z ?? 0);
    slot.mesh.scale.setScalar(1);
    slot.mesh.rotation.set(0, 0, 0);
    slot.mesh.material.opacity = spec.fade;
    slot.mesh.visible = true;
    slot.life = 0;
    slot.ttl = spec.ttl;
    slot.active = true;
    slot.spin = (slot.mesh.id % 2 ? 1 : -1) * 2.2;
    return slot;
  }

  /** Short warm burst at the barrel (R44). */
  const muzzleFlash = (p) => spawn('flash', p);
  /** Smoke puff that rises and drifts off the muzzle (R44). */
  const smoke = (p) => spawn('smoke', p);
  /** Sand-coloured puff at the hit point (R44/R45). */
  const impact = (p) => spawn('impact', p);
  /** Dust puff on the ground where an off-aim shot went (R44/R45). */
  const miss = (p) => spawn('miss', p);

  /** Advance every live effect. Called from the pause-gated frame loop. */
  function update(dt) {
    const step = Number.isFinite(dt) ? Math.min(Math.max(0, dt), 0.1) : 0;
    for (const [kind, pool] of Object.entries(pools)) {
      const spec = KIND[kind];
      for (const slot of pool.slots) {
        if (!slot.active) continue;
        slot.life += step;
        if (slot.life >= slot.ttl) {
          slot.active = false;
          slot.mesh.visible = false;
          slot.mesh.material.opacity = 0;
          continue;
        }
        const t = slot.life / slot.ttl;
        slot.mesh.scale.setScalar(1 + t * spec.grow);
        slot.mesh.position.y += spec.rise * step;
        slot.mesh.rotation.y += slot.spin * step;
        slot.mesh.material.opacity = spec.fade * (1 - t);
      }
    }
    return api;
  }

  /** Hide everything immediately (duel teardown / restart, R66). */
  function clear() {
    for (const pool of Object.values(pools)) {
      for (const slot of pool.slots) {
        slot.active = false;
        slot.life = 0;
        slot.mesh.visible = false;
        slot.mesh.material.opacity = 0;
      }
    }
    return api;
  }

  function count(kind) {
    return pools[kind].slots.filter((s) => s.active).length;
  }

  const api = {
    group,
    pool: POOL,
    muzzleFlash,
    smoke,
    impact,
    miss,
    update,
    clear,
    /** What a check reads: how many of each kind are live right now. */
    snapshot() {
      return {
        flash: count('flash'),
        smoke: count('smoke'),
        impact: count('impact'),
        miss: count('miss'),
        live: Object.keys(pools).reduce((n, k) => n + count(k), 0),
      };
    },
  };
  return api;
}
