// Shared constants for Midnight Pass. Later modules import these exact names.
const STORAGE_PREFIX = 'pocket-roads.v1.';

export const CONFIG = {
  name: 'Midnight Pass',
  trackLength: 3200,
  checkpoints: [800, 1600, 2400, 3200],
  goldTime: 115,
  silverTime: 135,
  bronzeTime: Infinity,
  collisionPenalty: 2,
  impactSpeedFactor: 0.45,
  speedLimit: 34,
  displaySpeedFactor: 3.6,
  acceleration: 11,
  brakeRate: 20,
  coastRate: 1.6,
  maxSteer: 1,
  vehicleRadius: 1.6,
  roadWidth: 9,
  laneChangeRate: 9,
  lookSensitivity: 0.004,
  look: { sensitivity: 0.004, min: -0.35, max: 0.35 },
  anchor: { x: 0.38, y: 0.62 },
  camera: { height: 2.6, distance: 8.5, fov: 62, near: 0.1, far: 2400 },
  viewports: [
    { name: 'tablet', width: 1180, height: 820 },
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'compact', width: 800, height: 480 },
  ],
  viewportSizes: {
    tablet: { width: 1180, height: 820 },
    desktop: { width: 1440, height: 900 },
    compact: { width: 800, height: 480 },
  },
  viewportThresholds: { compactWidth: 900, compactHeight: 520, tabletWidth: 1100 },
  storagePrefix: STORAGE_PREFIX,
  STORAGE_KEYS: {
    calibration: `${STORAGE_PREFIX}calibration`,
    mute: `${STORAGE_PREFIX}mute`,
    best: `${STORAGE_PREFIX}best`,
    mode: `${STORAGE_PREFIX}mode`,
  },
};

export const STORAGE_KEYS = CONFIG.STORAGE_KEYS;

export default CONFIG;
