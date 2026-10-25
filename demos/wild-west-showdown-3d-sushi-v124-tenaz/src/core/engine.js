import * as THREE from 'three';

/**
 * Renderer / scene / camera / frame-loop scaffolding.
 * No gameplay lives here: systems attach themselves with onFrame().
 */
export function createEngine({ canvas } = {}) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  // No background, no fog, no ground: the world owns its atmosphere and its
  // desert shell (src/world/terrain.js, T006b). engine.js is scaffolding only.

  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 400);
  camera.position.set(0, 4, 8);
  camera.lookAt(0, 1, 0);

  // Lighting lives with the world it lights (src/world/terrain.js, T006d): the
  // sun/sky pair, the fog and the sky colour are one palette and are tuned
  // together. engine.js is scaffolding only and adds no lights.

  const listeners = new Set();
  const clock = new THREE.Clock();
  let running = false;
  let raf = 0;
  let frames = 0;
  let lastDt = 0;

  /**
   * T024 (R21): real frame spacing, kept SEPARATE from `lastDt` on purpose.
   * `lastDt` is clamped to 0.05 so a backgrounded tab cannot teleport physics,
   * which makes it a LIE about a dropped frame: a 200ms stall reports as 50ms.
   * A frame-budget check needs the wall spacing, so the loop records it here in
   * a bounded ring (no unbounded growth over a long session) and reports it as
   * plain data through frameStats(). Nothing in the game reads it.
   */
  const SPAN_RING = 600;
  const spans = new Float64Array(SPAN_RING);
  let spanCount = 0;   // monotonic watermark of spans ever recorded
  let spanHead = 0;    // next write slot
  let lastNow = 0;

  function resize() {
    const w = Math.max(1, canvas.clientWidth || window.innerWidth);
    const h = Math.max(1, canvas.clientHeight || window.innerHeight);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function tick() {
    if (!running) return;
    raf = requestAnimationFrame(tick);
    const now = performance.now();
    if (lastNow) {
      spans[spanHead] = now - lastNow;
      spanHead = (spanHead + 1) % SPAN_RING;
      spanCount += 1;
    }
    lastNow = now;
    // Clamp dt so a backgrounded tab cannot teleport physics on resume.
    const dt = Math.min(clock.getDelta(), 0.05);
    lastDt = dt;
    frames += 1;
    for (const fn of listeners) fn(dt, frames);
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', resize);
  resize();

  return {
    THREE,
    renderer,
    scene,
    camera,
    canvas,
    get frames() { return frames; },
    get running() { return running; },
    get dt() { return lastDt; },
    /**
     * Frame-spacing stats over the spans recorded at or after the `since`
     * watermark (engine.frameStats().watermark from an earlier call), clamped to
     * what the ring still holds. Plain data, so a check can anchor a window on
     * it without reading the clamped dt (D15/T024).
     */
    frameStats(since = 0) {
      const lo = Math.max(Math.max(0, Math.trunc(since)), spanCount - SPAN_RING);
      const vals = [];
      for (let k = lo; k < spanCount; k += 1) {
        vals.push(spans[((spanHead + k - spanCount) % SPAN_RING + SPAN_RING) % SPAN_RING]);
      }
      if (!vals.length) {
        return { count: 0, mean: 0, median: 0, p95: 0, max: 0, watermark: spanCount };
      }
      vals.sort((a, b) => a - b);
      const sum = vals.reduce((s, v) => s + v, 0);
      const at = (q) => vals[Math.min(vals.length - 1, Math.floor(q * vals.length))];
      return {
        count: vals.length,
        mean: sum / vals.length,
        median: at(0.5),
        p95: at(0.95),
        max: vals[vals.length - 1],
        watermark: spanCount,
      };
    },
    get drawCalls() { return renderer.info.render.calls; },
    get triangles() { return renderer.info.render.triangles; },
    onFrame(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    resize,
    start() {
      if (running) return;
      running = true;
      clock.getDelta();
      raf = requestAnimationFrame(tick);
    },
    stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    },
  };
}
