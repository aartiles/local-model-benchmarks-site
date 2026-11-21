// HUD (R8): speed (km/h), elapsed time, distance, checkpoint progress.
// Pure DOM writes — no game logic. Node-importable: `updateHud(el, state)`
// works on any element exposing `querySelector` (a stub DOM is fine).

const CHECKPOINT_COUNT = 4; // R9: exactly four, the fourth is the finish

export { CHECKPOINT_COUNT };

function formatTime(seconds) {
  const s = Math.max(0, seconds);
  return s.toFixed(1);
}

function formatDistance(meters) {
  const m = Math.max(0, meters);
  if (m >= 1000) return `${(m / 1000).toFixed(2)} km`;
  return `${Math.round(m)} m`;
}

// state: { speed (m/s), time (s), distance (m), checkpoints (0..4) }
export function updateHud(el, state) {
  if (!el) return;
  const speed = el.querySelector("#hud-speed");
  const time = el.querySelector("#hud-time");
  const distance = el.querySelector("#hud-distance");
  const checkpoint = el.querySelector("#hud-checkpoint");
  if (speed) speed.textContent = String(Math.max(0, Math.round(state.speed * 3.6)));
  if (time) time.textContent = formatTime(state.time);
  if (distance) distance.textContent = formatDistance(state.distance);
  if (checkpoint) {
    const n = Math.min(CHECKPOINT_COUNT, Math.max(0, Math.round(state.checkpoints)));
    checkpoint.textContent = `${n}/${CHECKPOINT_COUNT}`;
  }
}

export default updateHud;
