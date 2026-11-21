// Tunable constants for Pocket Roads — Midnight Pass.
// Values from the spec: 3.20 km route, four checkpoints, 2 s impact penalty,
// medals gold ≤ 1:55, silver ≤ 2:15, bronze otherwise.

export const config = {
  // Route
  routeLength: 3200, // meters
  checkpointFractions: [0.25, 0.5, 0.75, 1.0], // fourth is the finish

  // Speeds (m/s)
  maxSpeed: 44, // ~158 km/h flat-out
  minSpeed: 0,
  brakeDecel: 18, // m/s^2
  dragDecel: 6, // m/s^2 coasting
  steerRate: 1.6, // radians/s of heading change at full steer
  lateralLimit: 3.2, // meters off centerline before road-edge impact

  // Hazards / penalties
  impactPenalty: 2, // seconds, once per distinct collision
  impactSlowdown: 0.45, // fraction of speed retained on impact

  // Road
  roadWidth: 7, // meters, full ribbon width (centerline ± 3.5 m)

  // Hazard placement (route fractions) — single source of truth.
  // stage.js imports these from config.
  coneFractions: [0.55, 0.57, 0.59, 0.61, 0.63, 0.65, 0.66, 0.80, 0.82, 0.84],
  barrierFractions: [0.35, 0.5, 0.75, 0.9],

  // Medals (seconds)
  medalGold: 115, // 1:55
  medalSilver: 135, // 2:15
  // bronze: anything slower than silver

  // Camera
  chaseDistance: 7.5, // meters behind the car (virtual mode)
  chaseHeight: 3.2, // meters above road
  anchorDefault: { x: 0.5, y: 0.62 }, // screen anchor, physical mode

  // Timing
  penaltyCooldown: 0.5, // seconds before the same hazard can hit again
};

export default config;
