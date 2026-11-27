// Loads every supplied runtime file from its original relative URL. Nothing
// here generates, renames or rewrites an asset: the browser fetches the bytes
// from assets/ and vendor/ exactly as shipped.
import * as THREE from '../vendor/three.module.min.js';
import { GLTFLoader } from '../vendor/GLTFLoader.js';

const FILES = {
  sky: 'assets/alpine-sky.webp',
  preview: 'assets/midnight-pass.webp',
  roadGrain: 'assets/road-grain.webp',
  spruce: ['assets/spruce-0.webp', 'assets/spruce-1.webp', 'assets/spruce-2.webp'],
  coupe: 'assets/coupe.glb',
};

function prepareTexture(texture, url, repeat = false) {
  texture.name = url;
  texture.colorSpace = THREE.SRGBColorSpace;
  if (repeat) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  }
  texture.needsUpdate = true;
  return texture;
}

export async function loadAssets() {
  const loader = new THREE.TextureLoader();
  const gltfLoader = new GLTFLoader();
  const [sky, preview, roadGrain, spruce0, spruce1, spruce2, coupe] = await Promise.all([
    loader.loadAsync(FILES.sky),
    loader.loadAsync(FILES.preview),
    loader.loadAsync(FILES.roadGrain),
    loader.loadAsync(FILES.spruce[0]),
    loader.loadAsync(FILES.spruce[1]),
    loader.loadAsync(FILES.spruce[2]),
    gltfLoader.loadAsync(FILES.coupe),
  ]);
  return {
    sky: prepareTexture(sky, FILES.sky),
    preview: prepareTexture(preview, FILES.preview),
    roadGrain: prepareTexture(roadGrain, FILES.roadGrain, true),
    spruce: [
      prepareTexture(spruce0, FILES.spruce[0]),
      prepareTexture(spruce1, FILES.spruce[1]),
      prepareTexture(spruce2, FILES.spruce[2]),
    ],
    coupe: Object.assign(coupe.scene || coupe, { name: FILES.coupe }),
  };
}

export default loadAssets;
