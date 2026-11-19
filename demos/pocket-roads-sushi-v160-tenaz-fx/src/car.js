// src/car.js — the supplied textured coupe for VIRTUAL mode (R21).
//
// assets.js already fetched and parsed `assets/coupe.glb` (via the vendored
// GLTFLoader, R36); this module is the one place that turns that raw scene graph
// into something that can drive Midnight Pass: it scales and seats the model once,
// names it, and keeps the pose (`carBody`) in the road's own frame so the chase
// camera (T011), the anchored camera (T023) and the physics (T012) all agree on
// where the car is.
//
// Road frame (src/road.js): the route runs along +z, x is lateral-right, y is
// elevation, and `heading` is a yaw whose forward is (sin h, 0, cos h). The coupe
// is modelled nose-along-+z (measured: its longest axis is local z, 1.0033 units,
// against 0.5963 across and 0.3642 tall), so the model needs NO axis swap: the
// group's yaw alone points it down the pass. `forwardAxis` records what was found,
// and a model that came out long-in-x would be rotated into place instead.
//
// Physical mode does not draw this object at all (R17) — that switch is T022, and
// it only has to set `car.setMode('physical')` / group.visible.

import * as THREE from '../vendor/three.module.min.js';
import { roadSample, roadSide } from './road.js';

// ------------------------------------------------------------------ numbers ----
// The model is authored in a unit-ish box (1.0033 m long as loaded). A real coupe
// on a 10 m wide two-lane road (ROAD_HALF_WIDTH 5) is about this big; the check
// measures the drawn box against these bounds.
export const COUPE_TARGET_LENGTH_M = 4.4;
// The wheels sit this far above the tarmac: the model's lowest vertices are the
// tyre contact patches, and a car that sinks into the asphalt reads as sunken.
export const COUPE_RIDE_HEIGHT_M = 0.04;
// Where the coupe waits in virtual mode, metres of arc length from the start line.
// The opening camera (main.js) stands at the start line looking 26 m down the pass,
// so this station puts the car in the middle of that first frame, about 100 px tall
// in a 900x500 viewport. T012/T016 read it as the car's starting s.
export const CAR_START_S = 10;
// Which way the nose points in the model's own frame: +1 = local +z. Flip to -1 if
// a review capture shows the car driving backwards; every consumer reads it through
// car.forward / car.nose.
export const COUPE_NOSE_SIGN = 1;

export const CAR_GROUP_NAME = 'coupe';

// ------------------------------------------------------------------- material --
// coupe.glb's one material ships `metallicFactor: 1` together with a
// metallicRoughness texture whose blue channel is 1.0 over EVERY texel (measured:
// the embedded PNG is a flat (0, 255, 255), so roughness = 0.65 and metalness = 1
// across the whole body). A fully metallic surface gets no diffuse from lights, and
// this scene has no environment map, so the imported coupe renders near-black and
// its base-colour texture — the textured coupe R21 asks for — is never seen.
// The material fit belongs here, next to the scale and the seat: the metalness
// FACTOR is dropped, and since three multiplies the map's blue channel by that
// factor, the body becomes a mostly-dielectric paint. A little metalness is kept,
// and the dusk sky is given to the material as an environment map (the other half
// of the fix): a metallic body reflects its surroundings, and without any
// environment three gives it nothing at all. Measured on the un-fitted import, the
// body's own pixels were mean 8.7/255 against 31.1 for the tarmac beside it.
export const COUPE_METALNESS = 0.35;
export const COUPE_ENV_INTENSITY = 1.15;

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

/**
 * The dusk environment for the coupe's paint: a CLONE of the supplied alpine-sky
 * panorama re-expressed as an equirect reflection. Cloned because sky.js mutates
 * the shared texture's wrap/repeat/offset for the dome, and an env map must be
 * read un-tilled. Returns null when the sky texture is not there (the lights alone
 * then have to carry the body).
 */
export function coupeEnvironment(skyTexture) {
  if (!skyTexture || !skyTexture.image) return null;
  const env = skyTexture.clone();
  env.name = 'coupe-environment';
  env.mapping = THREE.EquirectangularReflectionMapping;
  env.wrapS = THREE.RepeatWrapping;
  env.wrapT = THREE.ClampToEdgeWrapping;
  env.repeat.set(1, 1);
  env.offset.set(0, 0);
  env.center.set(0, 0);
  env.colorSpace = THREE.SRGBColorSpace;
  env.needsUpdate = true;
  return env;
}

// --------------------------------------------------------------- car body ------
// The mesh-side state: where the car is along the route, how far across it, which
// way it points. physics.js (T012) advances `s`, `lateral`, `heading`, `speedKmh`;
// everything visual is derived from these by applyCarPose().
export function carBody(s = CAR_START_S) {
  const at = roadSample(s);
  return {
    s,
    lateral: 0,
    heading: at.heading,
    grade: at.grade,
    speedKmh: 0,
    x: at.x,
    y: at.y,
    z: at.z,
    yaw: at.heading,
    pitch: 0,
  };
}

/**
 * Put a carBody on the road: position from roadSample(s) pushed by `lateral` along
 * the left normal, yaw from `heading`, and a pitch that tips the car onto the
 * grade, so its wheels stay on the tarmac on the climb (R3).
 */
export function applyCarPose(group, body) {
  const at = roadSample(body.s);
  const side = roadSide(body.s);
  const lateral = Number(body.lateral) || 0;
  const heading = Number.isFinite(body.heading) ? body.heading : at.heading;
  const grade = Number.isFinite(body.grade) ? body.grade : at.grade;

  group.position.set(at.x + side.x * lateral, at.y, at.z + side.z * lateral);
  // YXZ so the pitch is about the car's own lateral axis after the yaw.
  group.rotation.order = 'YXZ';
  group.rotation.set(-Math.asin(clamp(grade, -1, 1)), heading, 0);
  group.updateMatrixWorld(true);

  body.x = group.position.x;
  body.y = group.position.y;
  body.z = group.position.z;
  body.yaw = heading;
  body.pitch = group.rotation.x;
  return body;
}

// ------------------------------------------------------------------ loading ----
/**
 * Build the playable coupe from an already-loaded `assets.coupe` (the GLTFLoader
 * result for assets/coupe.glb). Returns the group to add to the scene plus the
 * fitted transform and the carBody state, so main.js owns only the placement.
 */
export function loadCoupe(assets, options = {}) {
  const gltf = assets && assets.coupe;
  const model = gltf && (gltf.scene || (gltf.scenes && gltf.scenes[0]));
  if (!model) {
    throw new Error('loadCoupe: assets.coupe is not a loaded glTF scene (call loadAssets() first)');
  }

  const group = new THREE.Group();
  group.name = CAR_GROUP_NAME;
  group.add(model);
  model.name = 'coupe-model';

  // Name the parts so checks and later cards can find them by name, and count the
  // textured meshes: R21 is about the SUPPLIED textured coupe, so an untextured
  // import has to be visible in `mappedMeshes` rather than silently accepted.
  const meshes = [];
  model.traverse((o) => {
    if (!o.isMesh) return;
    meshes.push(o);
    if (!o.name) o.name = 'coupe-body-' + (meshes.length - 1);
    else o.name = 'coupe-' + o.name;
  });
  if (!meshes.length) throw new Error('loadCoupe: coupe.glb contains no mesh');

  const mappedMeshes = meshes.filter((m) => {
    const mat = Array.isArray(m.material) ? m.material[0] : m.material;
    return !!(mat && mat.map);
  });

  // ---- material fit: make the supplied body lit (see COUPE_METALNESS).
  const environment = options.environment === undefined ? coupeEnvironment(assets.sky) : options.environment;
  const materialFit = fitCoupeMaterials(
    meshes,
    options.metalness === undefined ? COUPE_METALNESS : options.metalness,
    environment
  );

  // ---- fit: measure the raw model, scale it to a real car, seat it on its wheels.
  const raw = new THREE.Box3().setFromObject(model);
  const rawSize = raw.getSize(new THREE.Vector3());

  // Longest horizontal axis is the car's length.
  const forwardAxis = rawSize.x > rawSize.z ? 'x' : 'z';
  const lengthUnits = Math.max(forwardAxis === 'x' ? rawSize.x : rawSize.z, 1e-6);
  const scale = (options.lengthM || COUPE_TARGET_LENGTH_M) / lengthUnits;

  // A model that is long in x gets turned so its length lies along the group's +z,
  // which is the road's forward direction at yaw 0.
  const modelYaw = forwardAxis === 'x' ? -Math.PI / 2 : 0;
  model.rotation.set(0, modelYaw, 0);
  model.scale.setScalar(scale);
  model.position.set(0, 0, 0);
  model.updateMatrixWorld(true);

  // Re-measure with the fit applied, in the group's own frame (the group is still
  // at the origin), then centre it over the wheels and lift the lowest point to the
  // ride height. Everything here is measured, not guessed from the file.
  const fitted = new THREE.Box3().setFromObject(model);
  const fittedSize = fitted.getSize(new THREE.Vector3());
  const fittedCenter = fitted.getCenter(new THREE.Vector3());
  // Centre the body on the group origin in plan (the origin is the point on the
  // tarmac under the car's middle) and put its lowest vertex at the ride height.
  model.position.set(-fittedCenter.x, -fitted.min.y + COUPE_RIDE_HEIGHT_M, -fittedCenter.z);
  model.updateMatrixWorld(true);

  const seated = new THREE.Box3().setFromObject(model);

  const nose = new THREE.Vector3(0, 0, COUPE_NOSE_SIGN);
  const forward = nose.clone().applyQuaternion(group.quaternion);

  const body = carBody(options.s === undefined ? CAR_START_S : options.s);

  const car = {
    group,
    model,
    meshes,
    meshCount: meshes.length,
    mappedMeshes: mappedMeshes.map((m) => m.name),
    materialCount: new Set(meshes.map((m) => m.material && m.material.uuid).filter(Boolean)).size,
    mapSource: mapSourceOf(mappedMeshes[0]),
    // What loadCoupe did to the imported materials so the body is lit (R21/R43).
    materialFit,
    body,
    // The applied transform, exposed so the cameras (T011, T023) and the checks
    // agree on where the car is without re-deriving it.
    transform: {
      scale,
      modelYaw,
      forwardAxis,
      noseSign: COUPE_NOSE_SIGN,
      seatY: model.position.y,
      rideHeightM: COUPE_RIDE_HEIGHT_M,
      rawSize: [rawSize.x, rawSize.y, rawSize.z].map((v) => +v.toFixed(4)),
      drawnSize: [fittedSize.x, fittedSize.y, fittedSize.z].map((v) => +v.toFixed(3)),
      drawnBox: [
        [seated.min.x, seated.min.y, seated.min.z],
        [seated.max.x, seated.max.y, seated.max.z],
      ].map((p) => p.map((v) => +v.toFixed(3))),
      targetLengthM: options.lengthM || COUPE_TARGET_LENGTH_M,
    },
    // The car's own axes in world space, refreshed by place().
    forward,
    position: group.position,
    place(next) {
      if (next) Object.assign(body, next);
      applyCarPose(group, body);
      forward.set(0, 0, COUPE_NOSE_SIGN).applyQuaternion(group.quaternion);
      return body;
    },
    // R17 / T022: physical mode hides the digital car. Default is virtual.
    mode: 'virtual',
    setMode(mode) {
      car.mode = mode === 'physical' ? 'physical' : 'virtual';
      group.visible = car.mode === 'virtual';
      return car.mode;
    },
    get visible() {
      return group.visible;
    },
    worldBox() {
      group.updateMatrixWorld(true);
      return new THREE.Box3().setFromObject(group);
    },
  };

  car.place();
  return car;
}

/**
 * Drop the imported metalness on every coupe material, keeping the glb's own
 * base-colour map, roughness and colour. Returns what was changed so the check can
 * assert the body is lit rather than a black silhouette.
 */
export function fitCoupeMaterials(meshes, metalness = COUPE_METALNESS, environment = null) {
  const seen = new Set();
  const changed = [];
  for (const mesh of meshes) {
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const mat of mats) {
      if (!mat || seen.has(mat.uuid)) continue;
      seen.add(mat.uuid);
      const before = typeof mat.metalness === 'number' ? mat.metalness : null;
      if (before === null) continue; // not a MeshStandardMaterial: nothing to fit
      mat.metalness = clamp(metalness, 0, 1);
      if (environment) {
        mat.envMap = environment;
        mat.envMapIntensity = COUPE_ENV_INTENSITY;
      }
      mat.needsUpdate = true;
      changed.push({
        material: mat.name || mesh.name,
        metalness: { before, after: mat.metalness },
        roughness: mat.roughness,
        envMap: !!mat.envMap,
      });
    }
  }
  return { metalness: COUPE_METALNESS, envMap: !!environment, envMapIntensity: COUPE_ENV_INTENSITY, changedCount: changed.length, changed };
}

function mapSourceOf(mesh) {
  if (!mesh) return null;
  const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
  const map = mat && mat.map;
  if (!map) return null;
  const src = map.image && (map.image.currentSrc || map.image.src);
  return {
    name: map.name || null,
    source: src ? String(src).slice(0, 200) : map.source && map.source.data ? String(map.source.data).slice(0, 200) : null,
    width: map.image ? map.image.width : 0,
    height: map.image ? map.image.height : 0,
    colorSpace: map.colorSpace || null,
  };
}
