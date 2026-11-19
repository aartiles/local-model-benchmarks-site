// src/sky.js — the dusk sky and lighting (R9).
//
// buildSky(assets) returns the whole dusk stage: a backdrop dome textured with the
// supplied assets/alpine-sky.webp, hemisphere + ambient fill and a low warm sun,
// plus linear fog and a background colour, all read from the single DUSK object so
// a check can read the values from `__pr.sky.values` instead of scraping the scene
// graph. The lights and fog do not need any asset, so main.js installs them on the
// boot frame (buildSky(null)) and adds the backdrop when the texture arrives
// (sky.installDome(assets.sky), or buildSky(assets) in one go).
//
// The panorama is a photograph with its own dusk colours, so the dome is unlit
// (MeshBasicMaterial) and fog-free: fog would fade the backdrop to the fog colour
// and the lights would double-tint it. It is a wide band, not a full sphere, and it
// hangs around the valley — its centre is below the eye, so it never covers the
// road in front of the camera (T005's first frame must keep its asphalt).

import * as THREE from '../vendor/three.module.min.js';

// ---------------------------------------------------------------- dusk values --
// One object, the single source of truth for the look of the pass at dusk (R9).
export const DUSK = {
  background: 0x3a4478, // the indigo at the top edge of the panorama, so that if the
  // camera ever looks above the backdrop it reads as more dusk sky, not a void.
  fog: { color: 0x222a49, near: 95, far: 560 }, // haze starts well past the start line
  hemisphere: { sky: 0x6d80bd, ground: 0x171222, intensity: 0.55 },
  ambient: { color: 0x1e2a4d, intensity: 0.18 },
  sun: { color: 0xf2a86a, intensity: 0.85, elevationDeg: 8, azimuthDeg: -30, distance: 300 },
};

// Backdrop geometry. The supplied panorama is 1792x768 (aspect 2.333) and its
// horizon sits about 60 % of the way up the image, so the band is placed with that
// line at eye height: sky above, the photo's dark valley floor below the horizon
// hides the ground that scenery.js has not built yet.
export const SKY_RADIUS_M = 1500; // inside camera.far (2000), outside the fog far edge
// 1.5 copies is the fewest that lifts the band's top edge above the opening frame:
// the camera looks 9° down and the 60° vertical fov reaches ~21° above the horizon,
// and the rim then sits at ~36°, so no background shows through the top of the
// screen. Fewer copies would stretch the panorama wider than its own aspect.
// The panorama wraps the ring 1.5 image-widths, near its aspect — but as a MIRROR
// pair (T034): 0.75 of the image runs forward over half the ring and the same 0.75
// runs BACKWARD over the other half. A plain wrap butts the photo's own left edge
// against its right edge, which drew a hard vertical luminance seam down the sky
// (measured 38 luma between adjacent columns, against ~10 for ordinary photo detail);
// a mirrored join is continuous by construction, wherever the camera looks.
export const SKY_COPIES = 1.5;
export const SKY_MIRRORED = true;
export const SKY_IMAGE_ASPECT = 1792 / 768;
export const SKY_HORIZON_F = 0.6; // fraction of the image height that is below its horizon

/**
 * Build the dusk sky.
 * @param {{sky: THREE.Texture}|null} assets loaded assets; the backdrop is added
 *        straight away when `assets.sky` is present, otherwise call installDome().
 * @returns {{group, dome, lights, fog, background, values, installDome, follow}}
 */
export function buildSky(assets) {
  const group = new THREE.Group();
  group.name = 'sky';

  // ---- fill: cool skylight from above, dark valley bounce from below ----------
  const hemisphere = new THREE.HemisphereLight(DUSK.hemisphere.sky, DUSK.hemisphere.ground, DUSK.hemisphere.intensity);
  hemisphere.name = 'sky-hemisphere';
  hemisphere.position.set(0, 1, 0);
  group.add(hemisphere);

  const ambient = new THREE.AmbientLight(DUSK.ambient.color, DUSK.ambient.intensity);
  ambient.name = 'sky-ambient';
  group.add(ambient);

  // ---- the sun: a low warm rake, the last light on the peaks ------------------
  const el = (DUSK.sun.elevationDeg * Math.PI) / 180;
  const az = (DUSK.sun.azimuthDeg * Math.PI) / 180;
  const d = DUSK.sun.distance;
  const sun = new THREE.DirectionalLight(DUSK.sun.color, DUSK.sun.intensity);
  sun.name = 'sky-sun';
  sun.position.set(d * Math.sin(az) * Math.cos(el), d * Math.sin(el), d * Math.cos(az) * Math.cos(el));
  // The target travels with the group, so the light direction stays the low dusk
  // rake no matter how far up the pass the car gets.
  sun.target.position.set(0, 0, 0);
  group.add(sun);
  group.add(sun.target);

  const fog = new THREE.Fog(DUSK.fog.color, DUSK.fog.near, DUSK.fog.far);
  const background = new THREE.Color(DUSK.background);

  const sky = {
    group,
    dome: null,
    lights: { hemisphere, ambient, sun },
    fog,
    background,
    values: DUSK,
    heightM: 0,
    installDome(texture) {
      if (sky.dome || !texture) return sky.dome;
      const height = (2 * Math.PI * SKY_RADIUS_M) / SKY_COPIES / SKY_IMAGE_ASPECT;
      sky.heightM = height;
      const geo = new THREE.CylinderGeometry(SKY_RADIUS_M, SKY_RADIUS_M, height, 96, 1, true);
      // The photo wraps the ring SKY_COPIES times, and its own horizon line is put
      // at eye height: centre the band SKY_HORIZON_F * height - height/2 below it.
      texture.wrapS = SKY_MIRRORED ? THREE.MirroredRepeatWrapping : THREE.RepeatWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.repeat.set(SKY_MIRRORED ? 1 : SKY_COPIES, 1);
      texture.offset.set(0.5, 0); // the glow in the middle of the panorama faces +z
      texture.center.set(0.5, 0.5);
      if (SKY_MIRRORED) {
        // Bake the mirror pair into the ring's own u: a triangle wave over the
        // circumference, so the image runs forward over one half of the ring and
        // backward over the other. RepeatWrapping then folds 0..SKY_COPIES back into
        // the photo, and no column of the sky butts two different pixels together.
        const uv = geo.getAttribute('uv');
        for (let i = 0; i < uv.count; i++) {
          const u = uv.getX(i);
          uv.setX(i, SKY_COPIES * (1 - Math.abs(2 * u - 1)));
        }
        uv.needsUpdate = true;
      }
      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide,
        fog: false,
        depthWrite: false,
        toneMapped: false,
      });
      const dome = new THREE.Mesh(geo, mat);
      dome.name = 'sky-dome';
      // Drawn first and never writing depth: it is a backdrop, behind the road.
      dome.renderOrder = -1;
      dome.frustumCulled = false;
      dome.position.y = (0.5 - SKY_HORIZON_F) * height;
      group.add(dome);
      sky.dome = dome;
      return dome;
    },
    // The backdrop travels with the eye, so the valley never runs out of sky.
    follow(camera) {
      if (!sky.dome) return;
      sky.dome.position.x = camera.position.x;
      sky.dome.position.z = camera.position.z;
      sky.dome.position.y = camera.position.y + (0.5 - SKY_HORIZON_F) * sky.heightM;
    },
  };

  if (assets && assets.sky) sky.installDome(assets.sky);
  return sky;
}
