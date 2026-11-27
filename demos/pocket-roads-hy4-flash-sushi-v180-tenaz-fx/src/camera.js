// Two camera modes for Midnight Pass. Physical mode keeps the road contact on
// the calibrated toy marker by solving a real camera view-offset after posing;
// virtual mode is a chase camera behind the vehicle.
import * as THREE from '../vendor/three.module.min.js';
import { CONFIG } from './config.js';

const forwardVector = (point) => new THREE.Vector3(point.x, point.y, point.z);
const finite = (value, fallback = 0) => (Number.isFinite(value) ? value : fallback);
const clamp = (value, low, high) => Math.max(low, Math.min(high, value));

function lookOffsets(look) {
  if (typeof look === 'number') return { yaw: look, pitch: 0 };
  if (!look || typeof look !== 'object') return { yaw: 0, pitch: 0 };
  const limit = CONFIG.look || { min: -0.35, max: 0.35 };
  return {
    yaw: clamp(finite(look.yaw ?? look.x), limit.min, limit.max),
    pitch: clamp(finite(look.pitch ?? look.y), limit.min, limit.max),
  };
}

export function createCameraRig(camera, renderer) {
  const size = new THREE.Vector2();
  const target = new THREE.Vector3();
  let mode = 'physical';
  let aspect = 0;

  // Called from the app resize handler so both projection matrices and the
  // pinned view-offset follow the canvas, never pixels baked at boot.
  function syncViewport() {
    renderer.getSize(size);
    const width = Math.max(1, size.x || 1);
    const height = Math.max(1, size.y || 1);
    size.set(width, height);
    if (width !== aspect * height) {
      aspect = width / height;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    }
    return size;
  }

  function updatePhysical(sample, anchor = CONFIG.anchor, steer = 0, look = null) {
    mode = 'physical';
    const dimensions = syncViewport();
    const contact = forwardVector(sample.position);
    const tangent = forwardVector(sample.tangent).normalize();
    const roadUp = forwardVector(sample.up).normalize();
    const right = new THREE.Vector3().crossVectors(roadUp, tangent).normalize();
    const { yaw, pitch } = lookOffsets(look);
    const direction = tangent.clone()
      .applyAxisAngle(roadUp, yaw)
      .applyAxisAngle(right, pitch)
      .normalize();
    const shift = clamp(finite(steer), -CONFIG.maxSteer, CONFIG.maxSteer);

    camera.clearViewOffset();
    camera.position.copy(contact)
      .addScaledVector(tangent, -CONFIG.camera.distance)
      .addScaledVector(roadUp, CONFIG.camera.height)
      .addScaledVector(right, shift * 1.4);
    camera.up.copy(roadUp);
    camera.lookAt(camera.position.clone().addScaledVector(direction, 40));
    camera.updateMatrixWorld(true);
    target.copy(camera.position).addScaledVector(direction, 40);

    const ax = clamp(finite(anchor && anchor.x, CONFIG.anchor.x), 0, 1);
    const ay = clamp(finite(anchor && anchor.y, CONFIG.anchor.y), 0, 1);
    const desiredX = ax * 2 - 1;
    const desiredY = 1 - ay * 2;

    // setViewOffset shifts the projection linearly. One solve puts the contact
    // on the anchor; a couple of residual passes remove floating-point drift.
    let offsetX = 0;
    let offsetY = 0;
    for (let pass = 0; pass < 3; pass += 1) {
      const ndc = contact.clone().project(camera);
      const deltaX = (ndc.x - desiredX) * dimensions.x / 2;
      const deltaY = (ndc.y - desiredY) * dimensions.y / 2;
      offsetX += deltaX;
      offsetY -= deltaY;
      camera.setViewOffset(dimensions.x, dimensions.y, offsetX, offsetY, dimensions.x, dimensions.y);
      camera.updateMatrixWorld(true);
      if (Math.abs(deltaX) + Math.abs(deltaY) < 0.002) break;
    }
    return describe();
  }

  function updateVirtual(sample, steer = 0) {
    mode = 'virtual';
    syncViewport();
    camera.clearViewOffset();
    const contact = forwardVector(sample.position);
    const tangent = forwardVector(sample.tangent).normalize();
    const roadUp = forwardVector(sample.up).normalize();
    const right = new THREE.Vector3().crossVectors(roadUp, tangent).normalize();
    const shift = clamp(finite(steer), -CONFIG.maxSteer, CONFIG.maxSteer);

    camera.up.set(0, 1, 0);
    // Stay close enough for the car to be legible, but aim just past its tail
    // rather than far down the road: a distant target presses the vehicle into
    // the bottom edge of the frame and past the near edge of the ribbon.
    camera.position.copy(contact)
      .addScaledVector(tangent, -CONFIG.camera.distance * 1.24)
      .addScaledVector(roadUp, CONFIG.camera.height)
      .addScaledVector(right, shift * 1.1);
    target.copy(contact)
      .addScaledVector(tangent, 16)
      .addScaledVector(roadUp, 0.6)
      .addScaledVector(right, shift * 6);
    camera.lookAt(target);
    camera.updateMatrixWorld(true);
    return describe();
  }

  function projectToScreen(worldPoint) {
    const dimensions = syncViewport();
    const ndc = new THREE.Vector3(worldPoint.x, worldPoint.y, worldPoint.z).project(camera);
    return {
      x: (ndc.x * 0.5 + 0.5) * dimensions.x,
      y: (0.5 - ndc.y * 0.5) * dimensions.y,
    };
  }

  function describe() {
    const direction = camera.getWorldDirection(new THREE.Vector3());
    return {
      mode,
      position: camera.position.toArray(),
      target: target.toArray(),
      direction: direction.toArray(),
      aspect: camera.aspect,
      viewOffset: camera.view && camera.view.enabled,
    };
  }

  function reset() {
    syncViewport();
    camera.clearViewOffset();
    camera.up.set(0, 1, 0);
    target.set(0, 0, 0);
    mode = 'physical';
  }

  return {
    updatePhysical,
    updateVirtual,
    reset,
    projectToScreen,
    resize: syncViewport,
    describe,
  };
}

export default createCameraRig;
