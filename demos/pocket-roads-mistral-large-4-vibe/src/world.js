// src/world.js — builds the whole Midnight Pass stage into a `worldRoot` group
// expressed in *route coordinates*. The game keeps the car (the "rig") at the
// scene origin and moves worldRoot with the inverse car pose every frame, so
// the road and scenery slide under a physically still toy.
import * as THREE from '../vendor/three.module.min.js';
import { mergeGeometries } from '../vendor/BufferGeometryUtils.js';
import { ASSETS, ROUTE_LENGTH, ROAD_HALF, SHOULDER } from './config.js';
import { terrainHeight, mulberry32 } from './route.js';

const UP = new THREE.Vector3(0, 1, 0);

export async function loadTextures() {
  const loader = new THREE.TextureLoader();
  const load = (url, srgb) =>
    new Promise((res, rej) =>
      loader.load(url, (t) => {
        if (srgb) t.colorSpace = THREE.SRGBColorSpace;
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.anisotropy = 4;
        res(t);
      }, undefined, rej),
    );
  const [sky, skyEnv, road, s0, s1, s2] = await Promise.all([
    load(ASSETS.sky, true),
    load(ASSETS.sky, true),
    load(ASSETS.roadGrain, true),
    load(ASSETS.spruce[0], true),
    load(ASSETS.spruce[1], true),
    load(ASSETS.spruce[2], true),
  ]);
  skyEnv.mapping = THREE.EquirectangularReflectionMapping;
  sky.wrapS = THREE.RepeatWrapping; sky.wrapT = THREE.ClampToEdgeWrapping;
  skyEnv.wrapS = THREE.RepeatWrapping; skyEnv.wrapT = THREE.ClampToEdgeWrapping;
  return { sky, skyEnv, road, spruces: [s0, s1, s2] };
}

function vertexColored(geo, hex) {
  const c = new THREE.Color(hex);
  const n = geo.attributes.position.count;
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) arr.set([c.r, c.g, c.b], i * 3);
  geo.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  return geo;
}

function makeBannerTexture(text, fg, bg) {
  const cv = document.createElement('canvas');
  cv.width = 512; cv.height = 72;
  const g = cv.getContext('2d');
  g.fillStyle = bg; g.fillRect(0, 0, 512, 72);
  g.strokeStyle = fg; g.lineWidth = 6; g.strokeRect(4, 4, 504, 64);
  g.fillStyle = fg;
  g.font = 'italic 800 44px sans-serif';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(text, 256, 40);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// Ribbon along the route. cross = [[lateralOffset, heightAboveRoad], ...]
function buildRibbon(route, s0, s1, step, cross, uvLen, closeEnds = false) {
  const rows = Math.floor((s1 - s0) / step) + 1;
  const cols = cross.length;
  const positions = new Float32Array(rows * cols * 3);
  const uvs = new Float32Array(rows * cols * 2);
  const index = [];
  const sm = {};
  for (let r = 0; r < rows; r++) {
    const s = s0 + r * step;
    route.sample(s, sm);
    const b = sm.b;
    for (let c = 0; c < cols; c++) {
      const [off, h] = cross[c];
      // superelevation: rotate the cross-section around the tangent
      const lat = off * Math.cos(b);
      const y = h + off * Math.sin(b);
      const px = sm.p.x + sm.left.x * lat;
      const py = sm.p.y + y;
      const pz = sm.p.z + sm.left.z * lat;
      const k = (r * cols + c) * 3;
      positions[k] = px; positions[k + 1] = py; positions[k + 2] = pz;
      const ku = (r * cols + c) * 2;
      uvs[ku] = s / uvLen; uvs[ku + 1] = c / (cols - 1);
    }
  }
  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < cols - 1; c++) {
      const a = r * cols + c, b2 = a + 1, d = a + cols, e = d + 1;
      index.push(a, d, b2, b2, d, e);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geo.setIndex(index);
  geo.computeVertexNormals();
  return geo;
}

export function buildWorld(scene, renderer, route, layout, tex) {
  const worldRoot = new THREE.Group();
  scene.add(worldRoot);

  // ---------- sky dome + environment ----------
  const skyGeo = new THREE.SphereGeometry(3600, 40, 20);
  const skyMat = new THREE.MeshBasicMaterial({ map: tex.sky, side: THREE.BackSide, fog: false, depthWrite: false });
  const sky = new THREE.Mesh(skyGeo, skyMat);
  sky.renderOrder = -10;
  scene.add(sky);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromEquirectangular(tex.skyEnv).texture;
  scene.environmentIntensity = 0.45;

  scene.fog = new THREE.FogExp2(0x39406b, 0.0026);
  scene.background = new THREE.Color(0x1c2138);

  // ---------- lights (static in rig space; the car never leaves the origin) ----------
  const hemiLight = new THREE.HemisphereLight(0x8b96d8, 0x4a4048, 1.5);
  scene.add(hemiLight);
  const sun = new THREE.DirectionalLight(0xffc890, 2.4);
  sun.position.set(46, 62, -34);
  sun.target.position.set(0, 0, 18);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const sc = sun.shadow.camera;
  sc.left = -55; sc.right = 55; sc.top = 55; sc.bottom = -55; sc.near = 8; sc.far = 240;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.025;
  scene.add(sun); scene.add(sun.target);

  // ---------- terrain ----------
  const T_HALF = 260, T_STEP_S = 8, T_STEP_X = 10;
  {
    const cols = Math.floor((2 * T_HALF) / T_STEP_X) + 1;
    const rows = Math.floor(ROUTE_LENGTH / T_STEP_S) + 1;
    const positions = new Float32Array(rows * cols * 3);
    const colors = new Float32Array(rows * cols * 3);
    const index = [];
    const cGrass = new THREE.Color(0x2e4030), cForest = new THREE.Color(0x27331f);
    const cRock = new THREE.Color(0x4b4a55), cSnow = new THREE.Color(0xb9c2d4);
    const tmp = new THREE.Color();
    for (let r = 0; r < rows; r++) {
      const s = r * T_STEP_S;
      for (let c = 0; c < cols; c++) {
        const x = -T_HALF + c * T_STEP_X;
        const p = route.pointAt(s, x);
        p.y = x > 5.8 || x < -5.8 ? terrainHeight(route, s, x) : route.sample(s, {}).p.y - 0.3;
        const k = (r * cols + c) * 3;
        positions[k] = p.x; positions[k + 1] = p.y; positions[k + 2] = p.z;
        const h = p.y;
        if (h > 1935) tmp.copy(cSnow);
        else if (h > 1760) tmp.copy(cRock).lerp(cSnow, (h - 1760) / 175);
        else tmp.copy(cGrass).lerp(cForest, 0.5 + 0.5 * Math.sin(s * 0.01 + x * 0.013));
        tmp.multiplyScalar(0.9 + 0.2 * ((Math.sin(s * 0.05 + x * 0.043) + 1) / 2));
        colors[k] = tmp.r; colors[k + 1] = tmp.g; colors[k + 2] = tmp.b;
      }
    }
    for (let r = 0; r < rows - 1; r++)
      for (let c = 0; c < cols - 1; c++) {
        const a = r * cols + c, b = a + 1, d = a + cols, e = d + 1;
        index.push(a, d, b, b, d, e);
      }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setIndex(index);
    geo.computeVertexNormals();
    const terrain = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ vertexColors: true }));
    terrain.receiveShadow = true;
    worldRoot.add(terrain);
  }

  // ---------- mountain silhouettes ----------
  {
    const mkRidge = (side, dist, phase, colHex) => {
      const step = 25;
      const rows = Math.floor(ROUTE_LENGTH / step) + 1;
      const positions = new Float32Array(rows * 2 * 3);
      const index = [];
      for (let r = 0; r < rows; r++) {
        const s = r * step;
        const x = side * (dist + 120 * Math.sin(s * 0.004 + phase));
        const p = route.pointAt(s, x);
        const peak = 260 + 340 * (0.5 + 0.5 * Math.sin(s * 0.006 + phase * 2.1)) + 90 * Math.sin(s * 0.017 + phase);
        const k = r * 6;
        positions[k] = p.x; positions[k + 1] = p.y - 60; positions[k + 2] = p.z;
        positions[k + 3] = p.x; positions[k + 4] = p.y + peak; positions[k + 5] = p.z;
      }
      for (let r = 0; r < rows - 1; r++) {
        const a = r * 2, b = a + 1, d = a + 2, e = a + 3;
        if (side > 0) index.push(a, b, d, b, e, d); else index.push(a, d, b, b, d, e);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setIndex(index);
      // fog-free dark silhouettes that layer with the sky panorama's own ridges
      const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: colHex, fog: false, side: THREE.DoubleSide }));
      worldRoot.add(m);
    };
    mkRidge(1, 420, 0.0, 0x2a3352);
    mkRidge(-1, 520, 2.2, 0x252d4b);
    mkRidge(1, 780, 4.1, 0x303a5c);
    mkRidge(-1, 900, 1.3, 0x222a47);
  }

  // ---------- road ----------
  {
    const cross = [
      [-6.0, -0.10], [-ROAD_HALF, 0.0], [-2.95, 0.0], [0, 0.0], [2.95, 0.0], [ROAD_HALF, 0.0], [6.0, -0.10],
    ];
    const asphalt = buildRibbon(route, 0, ROUTE_LENGTH, 2, cross, 6);
    // road-grain.webp is fine colour noise: used as grain under a dark asphalt tint
    const roadMat = new THREE.MeshLambertMaterial({ map: tex.road, color: 0x262a35 });
    const road = new THREE.Mesh(asphalt, roadMat);
    road.receiveShadow = true;
    worldRoot.add(road);

    // edge lines (solid white) + dashed centre line
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xd8dce8 });
    for (const off of [-2.95, 2.95]) {
      const g = buildRibbon(route, 0, ROUTE_LENGTH, 2, [[off - 0.07, 0.015], [off + 0.07, 0.015]], 6);
      worldRoot.add(new THREE.Mesh(g, lineMat));
    }
    const dashGeo = new THREE.PlaneGeometry(0.14, 3.0);
    dashGeo.rotateX(-Math.PI / 2);
    const dashes = new THREE.InstancedMesh(dashGeo, lineMat, Math.floor(ROUTE_LENGTH / 12));
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), v = new THREE.Vector3(), sc2 = new THREE.Vector3(1, 1, 1);
    let di = 0;
    for (let s = 6; s < ROUTE_LENGTH - 6 && di < dashes.count; s += 12, di++) {
      const p = route.pointAt(s, 0);
      const t = route.sample(s, {}).t;
      q.setFromAxisAngle(UP, Math.atan2(t.x, t.z));
      m4.compose(v.set(p.x, p.y + 0.02, p.z), q, sc2);
      dashes.setMatrixAt(di, m4);
    }
    worldRoot.add(dashes);
  }

  // ---------- spruce forest (instanced alpha cut-outs) ----------
  {
    const rng = mulberry32(4242);
    const spots = [];
    const g = layout.gallery;
    for (let s = 14; s < ROUTE_LENGTH - 10; s += 5) {
      for (const side of [-1, 1]) {
        const density = 0.55 + 0.4 * Math.sin(s * 0.008 + side);
        if (rng() < density) {
          const x = side * (8 + rng() * rng() * 115);
          if (s > g.s0 - 30 && s < g.s1 + 30 && Math.abs(x) < 26) continue; // keep the gallery clear
          if (layout.chalets.some((c) => Math.abs(c.s - s) < 22 && Math.abs(c.x - x) < 16)) continue;
          spots.push({ s, x, h: 8 + rng() * 9, rot: rng() * Math.PI * 2, v: Math.floor(rng() * 3) });
        }
      }
    }
    const perVariant = [[], [], []];
    for (const sp of spots) perVariant[sp.v].push(sp);
    const treeMeshes = [];
    tex.spruces.forEach((t, vi) => {
      const list = perVariant[vi];
      if (!list.length) return;
      const h = 12, w = h * 0.5;
      const p1 = new THREE.PlaneGeometry(w, h); p1.translate(0, h / 2, 0);
      const p2 = new THREE.PlaneGeometry(w, h); p2.translate(0, h / 2, 0); p2.rotateY(Math.PI / 2);
      const geo = mergeGeometries([p1, p2]);
      const mat = new THREE.MeshLambertMaterial({ map: t, alphaTest: 0.45, side: THREE.DoubleSide });
      const im = new THREE.InstancedMesh(geo, mat, list.length);
      const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), v = new THREE.Vector3(), sc3 = new THREE.Vector3();
      list.forEach((sp, i) => {
        const p = route.pointAt(sp.s, sp.x);
        p.y = terrainHeight(route, sp.s, sp.x) - 0.15;
        q.setFromAxisAngle(UP, sp.rot);
        sc3.setScalar(sp.h / h);
        m4.compose(v.set(p.x, p.y, p.z), q, sc3);
        im.setMatrixAt(i, m4);
      });
      im.castShadow = true;
      im.receiveShadow = false;
      worldRoot.add(im);
      treeMeshes.push(im);
    });
  }

  // ---------- chalets ----------
  {
    const wood = new THREE.MeshLambertMaterial({ color: 0x6b4f38 });
    const roofMat = new THREE.MeshLambertMaterial({ color: 0x3d4350 });
    const snowMat = new THREE.MeshLambertMaterial({ color: 0xc9d2e2 });
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xffd9a0 });
    for (const c of layout.chalets) {
      const grp = new THREE.Group();
      const base = new THREE.Mesh(new THREE.BoxGeometry(7, 3.1, 5.4), wood);
      base.position.y = 1.55; base.castShadow = true; grp.add(base);
      const roof = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 3.1, 7.6, 3, 1), roofMat);
      roof.rotation.z = Math.PI / 2; roof.rotation.y = Math.PI / 2;
      roof.scale.set(1, 1, 0.62); roof.position.y = 3.1 + 1.15; roof.castShadow = true; grp.add(roof);
      const snow = new THREE.Mesh(new THREE.CylinderGeometry(3.16, 3.16, 7.66, 3, 1), snowMat);
      snow.rotation.z = Math.PI / 2; snow.rotation.y = Math.PI / 2;
      snow.scale.set(1, 1, 0.60); snow.position.y = 3.1 + 1.24; grp.add(snow);
      for (let i = -1; i <= 1; i++) {
        const win = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), glowMat);
        win.position.set(i * 2.0, 1.7, 2.71);
        grp.add(win);
      }
      const door = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.9), new THREE.MeshLambertMaterial({ color: 0x2c2018 }));
      door.position.set(0, 0.95, 2.71); grp.add(door);
      const chim = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.6, 0.6), roofMat);
      chim.position.set(2.2, 4.6, -1); grp.add(chim);
      const p = route.pointAt(c.s, c.x);
      p.y = terrainHeight(route, c.s, c.x) - 0.25;
      grp.position.copy(p);
      // face the road
      grp.rotation.y = Math.atan2(route.pointAt(c.s, 0).x - p.x, route.pointAt(c.s, 0).z - p.z);
      worldRoot.add(grp);
    }
  }

  // ---------- avalanche gallery (open-sided) ----------
  {
    const g = layout.gallery;
    const concrete = new THREE.MeshLambertMaterial({ color: 0x8f959e, side: THREE.DoubleSide });
    const rock = new THREE.MeshLambertMaterial({ color: 0x5a5560, side: THREE.DoubleSide });
    const roof = buildRibbon(route, g.s0, g.s1, 2, [[-6.5, 4.9], [5.5, 4.9]], 8);
    const roofMesh = new THREE.Mesh(roof, concrete);
    roofMesh.castShadow = true; roofMesh.receiveShadow = true;
    worldRoot.add(roofMesh);
    const slab = buildRibbon(route, g.s0, g.s1, 2, [[-6.5, 4.35], [5.5, 4.35]], 8);
    worldRoot.add(new THREE.Mesh(slab, concrete));
    // pillars on the +x (uphill) side, just outside the road edge
    const pillarGeo = new THREE.BoxGeometry(0.55, 4.9, 0.55);
    pillarGeo.translate(0, 2.45, 0);
    const nP = Math.floor((g.s1 - g.s0) / 8) + 1;
    const pillars = new THREE.InstancedMesh(pillarGeo, concrete, nP);
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), v = new THREE.Vector3(), one = new THREE.Vector3(1, 1, 1);
    for (let i = 0; i < nP; i++) {
      const s = g.s0 + i * 8;
      const p = route.pointAt(s, 5.0);
      p.y = terrainHeight(route, s, 5.0) - 0.2;
      q.identity();
      m4.compose(v.set(p.x, p.y, p.z), q, one);
      pillars.setMatrixAt(i, m4);
    }
    pillars.castShadow = true;
    worldRoot.add(pillars);
    // rock wall behind the pillars
    const wall = buildRibbon(route, g.s0 - 6, g.s1 + 6, 2, [[8.0, -3], [8.0, 10]], 8);
    worldRoot.add(new THREE.Mesh(wall, rock));
    // interior lamps
    const lampMat = new THREE.MeshBasicMaterial({ color: 0xffe2b8 });
    const lampGeo = new THREE.BoxGeometry(0.5, 0.08, 0.9);
    const nL = Math.floor((g.s1 - g.s0) / 22);
    const lamps = new THREE.InstancedMesh(lampGeo, lampMat, nL);
    for (let i = 0; i < nL; i++) {
      const s = g.s0 + 8 + i * 22;
      const p = route.pointAt(s, -1.5);
      const t = route.sample(s, {}).t;
      q.setFromAxisAngle(UP, Math.atan2(t.x, t.z));
      m4.compose(v.set(p.x, p.y + 4.3, p.z), q, one);
      lamps.setMatrixAt(i, m4);
    }
    worldRoot.add(lamps);
  }

  // ---------- gantries: start + 4 checkpoints (last = finish) ----------
  const gantries = [];
  {
    const mkGantry = (s, label, fg, bg) => {
      const grp = new THREE.Group();
      const postMat = new THREE.MeshLambertMaterial({ color: 0x30343f });
      const postGeo = new THREE.CylinderGeometry(0.16, 0.2, 5.6, 8);
      for (const side of [-1, 1]) {
        const post = new THREE.Mesh(postGeo, postMat);
        const p = route.pointAt(s, side * (ROAD_HALF + 1.3));
        post.position.set(p.x, p.y + 2.8, p.z);
        grp.add(post);
      }
      const beam = new THREE.Mesh(new THREE.BoxGeometry(2 * (ROAD_HALF + 1.3) + 0.8, 0.5, 0.5), postMat);
      const c = route.pointAt(s, 0);
      const t = route.sample(s, {}).t;
      grp.position.copy(c);
      grp.rotation.y = Math.atan2(t.x, t.z);
      beam.position.y = 5.35;
      grp.add(beam);
      const bannerMat = () => new THREE.MeshBasicMaterial({ map: makeBannerTexture(label, fg, bg), side: THREE.FrontSide, transparent: true });
      const banner = new THREE.Mesh(new THREE.PlaneGeometry(7.6, 1.05), bannerMat());
      banner.position.set(0, 4.45, 0.03);
      grp.add(banner);
      const bannerBack = new THREE.Mesh(new THREE.PlaneGeometry(7.6, 1.05), bannerMat());
      bannerBack.rotation.y = Math.PI; // readable from the other side of the gantry
      bannerBack.position.set(0, 4.45, -0.03);
      grp.add(bannerBack);
      worldRoot.add(grp);
      gantries.push({ s, label, group: grp });
    };
    mkGantry(2, 'START', '#ffffff', '#20242f');
    layout.checkpoints.forEach((s, i) => {
      const last = i === layout.checkpoints.length - 1;
      mkGantry(s, last ? 'FINISH' : 'CHECKPOINT ' + (i + 1), last ? '#ff7444' : '#7fe3ff', last ? '#2a1610' : '#10222c');
    });
  }

  // ---------- hazards: cones + barriers (instanced, with hit registry) ----------
  const hazardRegistry = new Map(); // id -> {type, s, x, mesh, index, triggered}
  {
    const cones = layout.hazards.filter((h) => h.type === 'cone');
    const barriers = layout.hazards.filter((h) => h.type === 'barrier');

    // cone: base + orange body + white band, vertex-coloured
    const base = vertexColored(new THREE.BoxGeometry(0.42, 0.07, 0.42), 0x33363d);
    base.translate(0, 0.035, 0);
    const body = vertexColored(new THREE.ConeGeometry(0.23, 0.62, 10), 0xff5a1f);
    body.translate(0, 0.38, 0);
    const band = vertexColored(new THREE.CylinderGeometry(0.245, 0.26, 0.13, 10), 0xf2f2f2);
    band.translate(0, 0.47, 0);
    const coneGeo = mergeGeometries([base, body, band]);
    const coneMesh = new THREE.InstancedMesh(coneGeo, new THREE.MeshLambertMaterial({ vertexColors: true }), cones.length);

    // barrier: striped block on two legs
    const parts = [];
    for (let i = 0; i < 6; i++) {
      const seg = vertexColored(new THREE.BoxGeometry(0.4, 0.85, 0.3), i % 2 ? 0xd8342c : 0xf2f2f2);
      seg.translate(-1.0 + 0.4 * i + 0.2, 0.55, 0);
      parts.push(seg);
    }
    const legL = vertexColored(new THREE.BoxGeometry(0.12, 0.25, 0.34), 0x2c2f36); legL.translate(-0.8, 0.12, 0);
    const legR = legL.clone(); legR.translate(1.6, 0, 0);
    const barGeo = mergeGeometries([...parts, legL, legR]);
    const barMesh = new THREE.InstancedMesh(barGeo, new THREE.MeshLambertMaterial({ vertexColors: true }), barriers.length);

    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), v = new THREE.Vector3(), one = new THREE.Vector3(1, 1, 1);
    cones.forEach((h, i) => {
      const p = route.pointAt(h.s, h.x);
      p.y += 0.02;
      const t = route.sample(h.s, {}).t;
      q.setFromAxisAngle(UP, Math.atan2(t.x, t.z) + (h.id.charCodeAt(1) % 7) * 0.3);
      m4.compose(v.set(p.x, p.y, p.z), q, one);
      coneMesh.setMatrixAt(i, m4);
      hazardRegistry.set(h.id, { ...h, mesh: coneMesh, index: i, triggered: false });
    });
    barriers.forEach((h, i) => {
      const p = route.pointAt(h.s, h.x);
      p.y += 0.02;
      const t = route.sample(h.s, {}).t;
      q.setFromAxisAngle(UP, Math.atan2(t.x, t.z));
      m4.compose(v.set(p.x, p.y, p.z), q, one);
      barMesh.setMatrixAt(i, m4);
      hazardRegistry.set(h.id, { ...h, mesh: barMesh, index: i, triggered: false });
    });
    coneMesh.castShadow = true; barMesh.castShadow = true;
    worldRoot.add(coneMesh); worldRoot.add(barMesh);
  }

  return { worldRoot, sky, sun, hazardRegistry, gantries };
}
