// Pocket Roads — mode controller + coupe placement (T012, R5/R6).
//
// Pure math, node-importable, no three.js, no DOM. Operates on whatever
// Object3D-like object the GLTFLoader returns through its standard interface
// (position.set / quaternion.set / scale.set / visible / add). The check stubs
// the loader and reads those properties back.
//
// Two things live here:
//   1. computeCoupeTransform(v, route) — pure: where the coupe sits on the
//      road ribbon for a given vehicle state (position + orientation + scale).
//   2. createModeController(...) — owns the coupe object, its visibility per
//      mode, which camera is active, and the placement-marker (calibration)
//      show/hide during physical setup.

// --- coupe model constants (from assets/coupe.glb) --------------------------
// The GLB is a single centered mesh:
//   X ∈ [-0.2989, 0.2973]  (width)
//   Y ∈ [-0.1817, 0.1825]  (height, ~centered on origin)
//   Z ∈ [-0.5012, 0.5020]  (length — the car's forward axis)
// Model forward is +Z, model up is +Y. We scale it to a real coupe (~4.6 m
// long) and sit it on the road so its ground plane (model Y = groundY) meets
// the road surface at the contact point.
export const COUPE = {
  scale: 4.6,        // model units -> meters (length along Z ≈ 1.003 units)
  groundY: -0.1817,  // model-space Y of the ground plane (min Y)
};

// --- small vec3 helpers -----------------------------------------------------
function cross(a, b) {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}
function dot(a, b) { return a.x * b.x + a.y * b.y + a.z * b.z; }
function norm(a) {
  const l = Math.hypot(a.x, a.y, a.z) || 1;
  return { x: a.x / l, y: a.y / l, z: a.z / l };
}
/** Rodrigues: rotate v around unit axis by angle (radians). */
function rotateAroundAxis(v, axis, angle) {
  const c = Math.cos(angle), s = Math.sin(angle);
  const d = dot(v, axis);
  const cr = cross(axis, v);
  return {
    x: v.x * c + cr.x * s + axis.x * d * (1 - c),
    y: v.y * c + cr.y * s + axis.y * d * (1 - c),
    z: v.z * c + cr.z * s + axis.z * d * (1 - c),
  };
}
/**
 * Rotation matrix (columns = model axes in world) -> quaternion {x,y,z,w}.
 * xAxis/yAxis/zAxis are the world directions of the model's X/Y/Z axes.
 * Derived from M in terms of q (see module docs); column-major layout.
 */
function axesToQuaternion(xAxis, yAxis, zAxis) {
  // column-major Matrix4 elements
  const a = [
    xAxis.x, xAxis.y, xAxis.z, 0,   // col0 = xAxis
    yAxis.x, yAxis.y, yAxis.z, 0,   // col1 = yAxis
    zAxis.x, zAxis.y, zAxis.z, 0,   // col2 = zAxis
    0, 0, 0, 1,
  ];
  // M[row][col] via column-major a[col*4+row]
  const M00 = a[0], M01 = a[4], M02 = a[8];
  const M10 = a[1], M11 = a[5], M12 = a[9];
  const M20 = a[2], M21 = a[6], M22 = a[10];
  let x, y, z, w;
  if (M00 + M11 + M22 > 0) {
    // w dominant: 4w = sqrt(trace+1)
    const s = 0.5 / Math.sqrt(M00 + M11 + M22 + 1.0);
    w = 0.25 / s;
    x = (M21 - M12) * s; // a[6]-a[9]
    y = (M02 - M20) * s; // a[8]-a[2]
    z = (M10 - M01) * s; // a[1]-a[4]
  } else if (M00 > M11 && M00 > M22) {
    // x dominant
    const s = 2.0 * Math.sqrt(1.0 + M00 - M11 - M22);
    x = 0.25 * s;
    y = (M01 + M10) / s;
    z = (M02 + M20) / s;
    w = (M21 - M12) / s;
  } else if (M11 > M22) {
    // y dominant
    const s = 2.0 * Math.sqrt(1.0 - M00 + M11 - M22);
    x = (M01 + M10) / s;
    y = 0.25 * s;
    z = (M12 + M21) / s;
    w = (M02 - M20) / s;
  } else {
    // z dominant
    const s = 2.0 * Math.sqrt(1.0 - M00 - M11 + M22);
    x = (M20 + M02) / s;
    y = (M12 + M21) / s;
    z = 0.25 * s;
    w = (M10 - M01) / s;
  }
  const l = Math.hypot(x, y, z, w) || 1;
  return { x: x / l, y: y / l, z: z / l, w: w / l };
}

/**
 * Compute the coupe's world transform for a vehicle state.
 * Model +Z (length) points along the car's forward (route tangent rotated by
 * `heading` around route up); model +Y (up) aligns with route up. The ground
 * plane (model Y = COUPE.groundY) sits on the road at the contact point.
 *
 * @param {object} v     vehicle state {distance, lateral, heading, ...}
 * @param {object} route {at(d) -> {position, tangent, up, right, ...}}
 * @returns {{position:{x,y,z}, quaternion:{x,y,z,w}, scale:number}}
 */
export function computeCoupeTransform(v, route) {
  const r = route.at(v.distance);
  const T = r.tangent, U = r.up, R0 = r.right;
  const h = v.heading ?? 0;
  // Orientation: rotate the route's forward (tangent) and right by the vehicle
  // heading around the route up. Up is preserved (rotation about it).
  const F = norm(rotateAroundAxis(T, U, h));
  const R = norm(rotateAroundAxis(R0, U, h));
  const U2 = U; // unchanged
  // Contact point: lateral is measured in the ROAD frame, so use the
  // unrotated route right for the position offset (not the car's rotated right).
  const lat = v.lateral ?? 0;
  const cp = {
    x: r.position.x + R0.x * lat,
    y: r.position.y + R0.y * lat,
    z: r.position.z + R0.z * lat,
  };
  // Raise the object so its ground plane meets the road surface.
  const s = COUPE.scale;
  const lift = -COUPE.groundY * s; // groundY is negative -> lift positive
  const position = {
    x: cp.x + U2.x * lift,
    y: cp.y + U2.y * lift,
    z: cp.z + U2.z * lift,
  };
  const quaternion = axesToQuaternion(R, U2, F);
  return { position, quaternion, scale: s };
}

/**
 * Apply a coupe transform to an Object3D-like object using its standard
 * interface. Works on real THREE.Group/Mesh and on the plain stub used by
 * the check.
 */
export function applyCoupeTransform(obj, t) {
  if (obj.position?.set) obj.position.set(t.position.x, t.position.y, t.position.z);
  else if (obj.position) Object.assign(obj.position, t.position);
  if (obj.quaternion?.set) obj.quaternion.set(t.quaternion.x, t.quaternion.y, t.quaternion.z, t.quaternion.w);
  else if (obj.quaternion) Object.assign(obj.quaternion, t.quaternion);
  if (obj.scale?.set) obj.scale.set(t.scale, t.scale, t.scale);
  else if (obj.scale) Object.assign(obj.scale, { x: t.scale, y: t.scale, z: t.scale });
}

/**
 * createModeController({ loader, coupeUrl, scene, chaseCam, anchorCam,
 *                        calibration, onCoupeLoaded, onCoupeError })
 *
 * - loader: a GLTFLoader-like with .load(url, onLoad, onProgress, onError).
 * - scene:  Object3D-like with .add(child) and .children.
 * - chaseCam / anchorCam: camera.js factories (any objects are fine here; the
 *   controller only tracks which is active, it does not drive them).
 * - calibration: createCalibration result ({show, hide}) for the placement
 *   marker. Marker is shown only in physical mode while in setup.
 *
 * Returns { load, setMode, getMode, setInSetup, isSetup, get coupe,
 *           get activeCamera, get activeCameraKind, update(v, route) }.
 */
export function createModeController({
  loader, coupeUrl, scene, chaseCam, anchorCam, calibration,
  onCoupeLoaded, onCoupeError,
} = {}) {
  let mode = "virtual";
  let inSetup = false;
  let coupe = null;
  let loaded = false;

  function applyVisibility() {
    if (!coupe) return;
    // R5/R6: digital car is hidden in physical mode, visible in virtual.
    coupe.visible = (mode === "virtual");
  }

  function applyMarker() {
    if (!calibration) return;
    // R5: placement marker visible during physical setup only.
    if (mode === "physical" && inSetup) calibration.show();
    else calibration.hide();
  }

  function onLoad(gltf) {
    // gltf.scene is the loaded object (a Group/Mesh).
    coupe = gltf.scene ?? gltf;
    if (scene?.add) scene.add(coupe);
    loaded = true;
    applyVisibility();
    if (onCoupeLoaded) onCoupeLoaded(coupe);
  }

  function load() {
    if (!loader) { if (onCoupeError) onCoupeError(new Error("no loader")); return Promise.resolve(false); }
    return new Promise((resolve) => {
      try {
        loader.load(coupeUrl, onLoad, undefined, (err) => {
          if (onCoupeError) onCoupeError(err);
          resolve(false);
        });
      } catch (err) {
        if (onCoupeError) onCoupeError(err);
        resolve(false);
      }
      // Some loaders (and the check's stub) invoke onLoad synchronously.
      if (loaded) resolve(true);
    });
  }

  function setMode(m) {
    if (m !== "virtual" && m !== "physical") throw new Error(`unknown mode: ${m}`);
    mode = m;
    applyVisibility();
    applyMarker();
  }

  function setInSetup(b) {
    inSetup = !!b;
    applyMarker();
  }

  /** Reposition the coupe on the road for the current vehicle state. */
  function update(v, route) {
    if (!coupe || mode !== "virtual") return;
    applyCoupeTransform(coupe, computeCoupeTransform(v, route));
  }

  return {
    load,
    setMode,
    setInSetup,
    getMode: () => mode,
    isSetup: () => inSetup,
    get coupe() { return coupe; },
    get loaded() { return loaded; },
    get activeCamera() { return mode === "physical" ? anchorCam : chaseCam; },
    get activeCameraKind() { return mode === "physical" ? "anchor" : "chase"; },
    update,
  };
}

export default { computeCoupeTransform, applyCoupeTransform, createModeController, COUPE };
