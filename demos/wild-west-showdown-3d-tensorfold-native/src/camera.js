// src/camera.js — one orbit-camera rig, two modes (DECISIONS D04).
//
//   'exploration'  player-driven orbit: drag rotates yaw, vertical drag
//                  pitches (clamped — never upside-down), smooth follow.
//   'duel'         scripted cinematic framing (M06 fills this in); the rig
//                  tweens between the two parameter sets instead of swapping
//                  cameras, so transitions stay smooth.

export class OrbitCamera {
  constructor(camera, opts = {}) {
    this.camera = camera;
    this.mode = 'exploration';
    // Current (smoothed) parameters
    this.yaw = opts.yaw ?? 0;        // 0 = camera on +Z behind player
    this.pitch = opts.pitch ?? 0.24; // radians above horizontal
    this.distance = opts.distance ?? 8;
    this.lookHeight = opts.lookHeight ?? 1.35;
    // Targets the smoothing chases
    this.targetYaw = this.yaw;
    this.targetPitch = this.pitch;
    this.targetDistance = this.distance;
    this.targetLookHeight = this.lookHeight;
    // Limits
    this.minPitch = opts.minPitch ?? -0.12; // slightly below horizon
    this.maxPitch = opts.maxPitch ?? 0.9;   // well short of top-down flip
    this.minDistance = opts.minDistance ?? 4;
    this.maxDistance = opts.maxDistance ?? 14;
    this.sensitivity = 0.0045; // rad per px of drag
    // Smoothing state
    this._followPos = null; // THREE.Vector3, lazily created
    this._lookPos = null;
    this._snapNext = true; // first update snaps instead of lerping
  }

  setMode(mode, framing = null) {
    this.mode = mode;
    if (framing) {
      if (framing.yaw !== undefined) this.targetYaw = framing.yaw;
      if (framing.pitch !== undefined) this.targetPitch = framing.pitch;
      if (framing.distance !== undefined) this.targetDistance = framing.distance;
      if (framing.lookHeight !== undefined) this.targetLookHeight = framing.lookHeight;
    }
  }

  /** Current horizontal forward direction (where W moves the player). */
  forward() {
    return { x: -Math.sin(this.yaw), z: -Math.cos(this.yaw) };
  }

  /**
   * @param dt          frame delta (s)
   * @param playerPos   THREE.Vector3 of the followed target (feet)
   * @param dragX dragY  camera drag in px this frame (exploration mode only)
   */
  update(dt, playerPos, dragX, dragY) {
    if (this.mode === 'exploration') {
      this.targetYaw += dragX * this.sensitivity;
      this.targetPitch -= dragY * this.sensitivity * 0.85;
      this.targetPitch = Math.max(this.minPitch, Math.min(this.maxPitch, this.targetPitch));
    }
    const k = 1 - Math.exp(-10 * dt);
    this.yaw += (this.targetYaw - this.yaw) * k;
    this.pitch += (this.targetPitch - this.pitch) * k;
    this.distance += (this.targetDistance - this.distance) * k;
    this.lookHeight += (this.targetLookHeight - this.lookHeight) * k;

    const cp = Math.cos(this.pitch);
    const dx = Math.sin(this.yaw) * cp * this.distance;
    const dy = Math.sin(this.pitch) * this.distance;
    const dz = Math.cos(this.yaw) * cp * this.distance;

    if (!this._followPos) this._followPos = new (playerPos.constructor)();
    this._followPos.set(
      playerPos.x + dx,
      Math.max(playerPos.y + dy, 0.5), // never dip under the ground
      playerPos.z + dz,
    );
    const kp = 1 - Math.exp(-12 * dt);
    if (this._snapNext) {
      this.camera.position.copy(this._followPos);
      this._snapNext = false;
    } else {
      this.camera.position.lerp(this._followPos, kp);
    }

    if (!this._lookPos) this._lookPos = new (playerPos.constructor)(0, this.lookHeight, 0);
    this._lookPos.x += (playerPos.x - this._lookPos.x) * kp;
    this._lookPos.z += (playerPos.z - this._lookPos.z) * kp;
    this._lookPos.y = this.lookHeight;
    this.camera.lookAt(this._lookPos);
  }
}
