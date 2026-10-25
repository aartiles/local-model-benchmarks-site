/**
 * Test hooks. Installed ONLY when the URL carries ?test=1, so the shipped
 * game never reads or depends on them.
 *
 * Contract for later tasks (extend with register(), never replace the object):
 *   WWS.ready            true after the first rendered frame
 *   WWS.engine           the engine object
 *   WWS.game             the root game object (set by main.js once built)
 *   WWS.stats()          { frames, running, drawCalls, triangles, state }
 *   WWS.register(name, fn)  add another hook (duel snapshots, setDrawDelay, ...)
 */
export function installHooks(api = {}) {
  let params;
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    return null;
  }
  if (params.get('test') !== '1') return null;

  const hook = {
    ready: false,
    register(name, fn) { hook[name] = fn; },
    ...api,
  };
  window.WWS = hook;
  return hook;
}
