import * as T from '../vendor/three.module.min.js';
import {GLTFLoader} from '../vendor/GLTFLoader.js';

export function buildCar(){
  const vehicle=new T.Group();
  vehicle.userData.lampPower={value:1};
  new GLTFLoader().load(new URL('../assets/coupe.glb',import.meta.url).href,({scene:model})=>{
    model.rotation.y=Math.PI;
    model.scale.set(3.45,3.55,4.26);
    model.position.y=.18173*model.scale.y;
    model.traverse(part=>{
      if(!part.isMesh)return;
      // Red lens texels emit light even in the darkest part of the pass.
      part.material.onBeforeCompile=shader=>{
        shader.uniforms.lampPower=vehicle.userData.lampPower;
        shader.fragmentShader='uniform float lampPower;\n'+shader.fragmentShader.replace('#include <emissivemap_fragment>',
          '#include <emissivemap_fragment>\n float lens=smoothstep(.12,.4,diffuseColor.r-max(diffuseColor.g,diffuseColor.b)*1.8); totalEmissiveRadiance+=vec3(1.35,.056,.017)*lens*lampPower;');
      };
    });
    vehicle.add(model);
  });
  return vehicle;
}
