// Presents the supplied coupe.glb in virtual mode. The glTF scene is cloned so
// its own embedded, textured materials stay exactly as loaded from the asset.
import * as THREE from '../vendor/three.module.min.js';

const SOURCE = 'assets/coupe.glb';
const MAP_SLOTS = [
  ['map', 'baseColorTexture'],
  ['normalMap', 'normalTexture'],
  ['roughnessMap', 'metallicRoughnessTexture'],
  ['metalnessMap', 'metallicRoughnessTexture'],
  ['aoMap', 'occlusionTexture'],
  ['emissiveMap', 'emissiveTexture'],
];

function vector(value, fallback) {
  return new THREE.Vector3(
    Number.isFinite(value.x) ? value.x : fallback.x,
    Number.isFinite(value.y) ? value.y : fallback.y,
    Number.isFinite(value.z) ? value.z : fallback.z
  );
}

// Pixar-style toy scale: the source model is about one metre long, so stretch it
// to a 4.4 m coupe and rest its wheels on the road surface.
export function createCoupe(assets) {
  const source = assets && assets.coupe;
  if (!source) throw new Error('the supplied coupe.glb is required');
  const body = source.clone(true);
  const bounds = new THREE.Box3().setFromObject(body);
  const size = bounds.getSize(new THREE.Vector3());
  const scale = size.z > 0.01 ? 4.4 / size.z : 4.4;
  body.scale.setScalar(scale);
  const scaled = new THREE.Box3().setFromObject(body);
  body.position.y -= scaled.min.y;

  const root = new THREE.Group();
  root.name = 'coupe';
  root.add(body);
  root.visible = false;
  // The supplied body uses metallic dusk-lit materials, which read almost black
  // without a local source. A narrow spot travels with the coupe, lighting its
  // own panels instead of washing out the road ahead. It is a light only: no
  // generated meshes, textures or replacement binaries are involved.
  const spotTarget = new THREE.Object3D();
  spotTarget.name = 'coupe-fill-target';
  spotTarget.position.set(0, 0.7, -1);
  root.add(spotTarget);
  const rearFill = new THREE.SpotLight(0xffd8b0, 220, 12, 0.4, 0.7, 1.5);
  rearFill.name = 'coupe-rear-fill';
  rearFill.position.set(0, 3.5, -3.5);
  rearFill.target = spotTarget;
  root.add(rearFill);
  body.traverse((object) => {
    if (!object.isMesh) return;
    object.castShadow = true;
    object.receiveShadow = true;
    object.frustumCulled = false;
  });

  const textureNames = [];
  const textures = [];
  const seen = new Set();
  const describeSlot = (name, texture) => {
    if (!texture) return;
    const key = `${name}:${texture.uuid}`;
    if (seen.has(key)) return;
    seen.add(key);
    const image = texture.image || {};
    const label = `${SOURCE}#${name}`;
    if (!texture.name) texture.name = label;
    textureNames.push(label);
    textures.push({
      slot: name,
      name: texture.name || label,
      assigned: true,
      width: image.width || image.videoWidth || 0,
      height: image.height || image.videoHeight || 0,
    });
  };
  let materialCount = 0;
  body.traverse((object) => {
    if (!object.isMesh) return;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    for (const material of materials) {
      if (!material) continue;
      materialCount += 1;
      for (const [slot] of MAP_SLOTS) {
        if (material[slot]) describeSlot(slot, material[slot]);
      }
    }
  });

  root.userData = {
    source: SOURCE,
    textureNames,
    textures,
    materialCount,
    scale,
    length: size.z * scale,
  };
  root.userData.brief = 'Clone of the supplied coupe.glb with its embedded textures';
  if (!textureNames.length) console.error('coupe.glb materials have no texture maps');
  return root;
}

export function setCoupePose(coupe, sample, steer = 0) {
  if (!coupe || !sample) return coupe;
  const position = vector(sample.position, { x: 0, y: 0, z: 0 });
  const forward = vector(sample.tangent, { x: 0, y: 0, z: 1 }).normalize();
  const up = vector(sample.up, { x: 0, y: 1, z: 0 }).normalize();
  const right = new THREE.Vector3().crossVectors(up, forward).normalize();
  const correctedUp = new THREE.Vector3().crossVectors(forward, right).normalize();
  const basis = new THREE.Matrix4().makeBasis(right, correctedUp, forward);
  coupe.position.copy(position);
  coupe.quaternion.setFromRotationMatrix(basis);
  const lean = Math.max(-1, Math.min(1, Number(steer) || 0)) * 0.09;
  coupe.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), lean));
  coupe.updateMatrixWorld(true);
  return coupe;
}

export default createCoupe;
