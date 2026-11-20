// src/car.js — loads the supplied textured coupe (assets/coupe.glb) and wraps it
// in a group whose origin is the tyre contact patch on the road.
import * as THREE from '../vendor/three.module.min.js';
import { GLTFLoader } from '../vendor/GLTFLoader.js';
import { ASSETS, CAR } from './config.js';

export function loadCar() {
  return new Promise((resolve, reject) => {
    new GLTFLoader().load(
      ASSETS.coupe,
      (gltf) => {
        const mesh = gltf.scene;
        mesh.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = false;
            if (o.material) {
              o.material.envMapIntensity = 0.55;
              o.material.side = THREE.FrontSide;
            }
          }
        });
        // glb is ~1 unit long, centred on its own origin: scale to a 4.4 m car
        // and lift so the wheels touch y = 0 (the rig origin = contact point).
        const group = new THREE.Group();
        const inner = new THREE.Group();
        inner.add(mesh);
        inner.scale.setScalar(CAR.modelScale);
        inner.position.y = CAR.modelYOffset;
        // make the model face +Z regardless of how it was authored
        if (CAR.forwardSign < 0) inner.rotation.y = Math.PI;
        group.add(inner);
        resolve({ group, mesh: inner, raw: mesh });
      },
      undefined,
      reject,
    );
  });
}
