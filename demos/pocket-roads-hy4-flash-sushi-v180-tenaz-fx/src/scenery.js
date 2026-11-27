// Static first world: a road ribbon following the supplied centreline, a dusk
// sky dome, lighting, valley floor and layered mountain silhouettes. Hazards,
// trees and other moving details are added by later tasks through update(s).
import * as THREE from '../vendor/three.module.min.js';
import { TRACK_LENGTH, sampleTrack, pointOnRoad, nearestS } from './track.js';

const ROAD_STEP = 10;
const MOUNTAIN_SPACING = 200;
const SPRUCE_COUNT = 96;
const CHALET_STATIONS = [
  { s: 420, side: -1, lateral: 16 },
  { s: 1120, side: 1, lateral: 18 },
  { s: 2050, side: -1, lateral: 15 },
  { s: 2780, side: 1, lateral: 20 },
];
const GALLERY_START = 1340;
const GALLERY_END = 1460;
const GALLERY_BAYS = 12;
const GALLERY_HALF_WIDTH = 5.4;
const CONE_STATIONS = [
  { s: 300, lateral: -2.7 }, { s: 640, lateral: 2.6 },
  { s: 1100, lateral: -2.5 }, { s: 1480, lateral: 2.8 },
  { s: 1900, lateral: -2.6 }, { s: 2340, lateral: 2.7 },
  { s: 2700, lateral: -2.8 }, { s: 3060, lateral: 2.5 },
];
const BARRIER_STATIONS = [
  { s: 700, lateral: 2.9 }, { s: 1500, lateral: -3.0 }, { s: 2300, lateral: 3.0 },
];
const EDGE_STEP = 25;
// Peaks are low, separated silhouettes along the horizon. Their tops stay below
// the upper third of the frame so the supplied dusk panorama remains the sky;
// older, taller rings hid the dome with a wall of fog-coloured cones.
const MOUNTAIN_FOOT = 46;
const MOUNTAIN_RINGS = [
  { count: 3, radius: 520, spread: 70, height: 110, color: 0x334966 },
  { count: 3, radius: 900, spread: 115, height: 170, color: 0x273955 },
  { count: 2, radius: 1300, spread: 130, height: 235, color: 0x1e2d47 },
];

function groundRibbon(track) {
  const positions = [];
  const indices = [];
  const samples = TRACK_LENGTH / ROAD_STEP + 1;
  for (let i = 0; i < samples; i += 1) {
    const s = Math.min(TRACK_LENGTH, i * ROAD_STEP);
    const sample = sampleTrack(track, s);
    const width = 105;
    for (const lateral of [-width, width]) {
      const point = pointOnRoad(track, s, lateral);
      positions.push(point.x, sample.position.y - 3.2, point.z);
    }
    if (i < samples - 1) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function roadRibbon(track, texture) {
  const positions = [];
  const uvs = [];
  const indices = [];
  const samples = TRACK_LENGTH / ROAD_STEP + 1;
  for (let i = 0; i < samples; i += 1) {
    const s = Math.min(TRACK_LENGTH, i * ROAD_STEP);
    const sample = sampleTrack(track, s);
    const half = sample.width * 0.5;
    for (const lateral of [-half, half]) {
      const point = pointOnRoad(track, s, lateral);
      positions.push(point.x, point.y + 0.08, point.z);
      uvs.push(lateral < 0 ? 0 : 1, s / 14);
    }
    if (i < samples - 1) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    color: 0x4e5863,
    roughness: 0.7,
    metalness: 0.04,
    side: THREE.DoubleSide,
  });
  // The supplied grain is vividly coloured. Read it through a luminance filter
  // in the material shader so the texels still supply asphalt grain, but never
  // paint the road neon; the asset bytes and its map assignment stay untouched.
  material.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <map_fragment>',
      `#ifdef USE_MAP
        vec4 sampledDiffuseColor = texture2D( map, vMapUv );
        #ifdef DECODE_VIDEO_TEXTURE
          sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
        #endif
        float grain = dot( sampledDiffuseColor.rgb, vec3( 0.299, 0.587, 0.114 ) );
        sampledDiffuseColor.rgb = mix( sampledDiffuseColor.rgb, vec3( grain ), 0.95 );
        diffuseColor *= sampledDiffuseColor;
      #endif`
    );
  };
  const road = new THREE.Mesh(geometry, material);
  road.name = 'road-ribbon';
  return road;
}

// Rings of peaks follow the whole centreline so the skyline surrounds the
// stage at every distance, not just at the starting line.
function buildMountains(scene, track) {
  const mountains = [];
  const shapes = [new THREE.ConeGeometry(1, 1, 5, 1), new THREE.ConeGeometry(1, 1, 6, 1)];
  const materials = MOUNTAIN_RINGS.map(
    (ring) =>
      new THREE.MeshBasicMaterial({ color: ring.color, fog: true, side: THREE.DoubleSide })
  );
  for (let station = 0; station <= TRACK_LENGTH; station += MOUNTAIN_SPACING) {
    const centre = sampleTrack(track, station).position;
    MOUNTAIN_RINGS.forEach((ring, layer) => {
      for (let i = 0; i < ring.count; i += 1) {
        const angle =
          (i / ring.count) * Math.PI * 2 + layer * 0.63 + station * 0.0037;
        const wobble = Math.sin(i * 2.17 + layer * 1.7 + station * 0.001);
        const radius = ring.radius + wobble * ring.spread;
        const height = ring.height * (0.72 + 0.28 * Math.sin(i * 1.31 + layer));
        const peak = new THREE.Mesh(shapes[i % 2], materials[layer]);
        peak.scale.set(radius * 0.15, height, radius * 0.15);
        peak.position.set(
          centre.x + Math.cos(angle) * radius,
          centre.y - MOUNTAIN_FOOT + height * 0.5,
          centre.z + Math.sin(angle) * radius
        );
        peak.rotation.y = angle * 0.5;
        peak.name = `mountain-s${station}-layer-${layer}-${i}`;
        scene.add(peak);
        mountains.push(peak);
      }
    });
  }
  return mountains;
}

// Small dusk motes drift in front of the camera so the ready-state world has
// gentle motion; the actual road and scenery stay deterministic and static.
const MOTE_COUNT = 24;
function createMotes() {
  const positions = new Float32Array(MOTE_COUNT * 3);
  for (let i = 0; i < MOTE_COUNT; i += 1) {
    const angle = i * 2.399963;
    const radius = 15 + (i % 5) * 9;
    positions[i * 3] = Math.sin(angle) * radius;
    positions[i * 3 + 1] = 1 + (i % 7) * 1.6;
    positions[i * 3 + 2] = Math.cos(angle) * radius;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const motes = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({ color: 0xffd1a0, size: 0.55, transparent: true, opacity: 0.5, fog: false })
  );
  motes.frustumCulled = false;
  motes.name = 'dusk-motes';
  return motes;
}

// Deterministic hash: no random state, so a reload places every tree identically.
function hash(i, salt) {
  const value = Math.sin(i * 127.1 + salt * 311.7 + 0.41) * 43758.5453123;
  return value - Math.floor(value);
}

function offRoadDistance(track, point) {
  const centre = pointOnRoad(track, nearestS(track, point), 0);
  return Math.hypot(point.x - centre.x, point.z - centre.z);
}

function distanceAngle(tangent) {
  return Math.atan2(tangent.x, tangent.z);
}

function buildSpruces(scene, track, textures) {
  const materials = textures.map(
    (texture) => new THREE.SpriteMaterial({ map: texture, transparent: true, alphaTest: 0.32, depthWrite: false })
  );
  const trees = [];
  for (let i = 0; i < SPRUCE_COUNT; i += 1) {
    const s = Math.min(
      TRACK_LENGTH - 1,
      ((i + 0.2 + hash(i, 1) * 0.6) * TRACK_LENGTH) / SPRUCE_COUNT
    );
    const side = i % 2 === 0 ? -1 : 1;
    const lateral = side * (8 + hash(i, 2) * 38);
    const sample = sampleTrack(track, s);
    const point = pointOnRoad(track, s, lateral);
    const height = 5.5 + hash(i, 3) * 6.5;
    const tree = new THREE.Sprite(materials[i % materials.length]);
    tree.position.set(point.x, sample.position.y - 3.2 + height * 0.5 + (hash(i, 4) - 0.5) * 2.6, point.z);
    tree.scale.set(height * 0.62, height, 1);
    tree.name = `spruce-${i}`;
    tree.userData = { s, lateral, side, height, offRoad: offRoadDistance(track, tree.position) };
    scene.add(tree);
    trees.push(tree);
  }
  return trees;
}

function buildChalets(scene, track) {
  const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x6a514a, roughness: 0.92 });
  const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x3a374b, roughness: 0.88 });
  const windowMaterial = new THREE.MeshStandardMaterial({
    color: 0xffc07a, emissive: 0xff9738, emissiveIntensity: 0.85, roughness: 0.5,
  });
  const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x4c2b30, roughness: 0.8 });
  const groups = [];
  CHALET_STATIONS.forEach((station, index) => {
    const sample = sampleTrack(track, station.s);
    const lateral = station.side * station.lateral;
    const point = pointOnRoad(track, station.s, lateral);
    const group = new THREE.Group();
    group.name = `chalet-${index + 1}`;
    group.position.set(point.x, sample.position.y - 3.2, point.z);
    group.rotation.y = distanceAngle(sample.tangent);
    const wall = new THREE.Mesh(new THREE.BoxGeometry(8, 4.8, 10), wallMaterial);
    wall.name = `${group.name}-walls`;
    wall.position.y = 2.4;
    group.add(wall);
    for (const sign of [-1, 1]) {
      const slope = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.35, 10.8), roofMaterial);
      slope.name = `${group.name}-roof-${sign < 0 ? 'left' : 'right'}`;
      slope.position.set(sign * 2, 5.4, 0);
      slope.rotation.z = sign * 0.48;
      group.add(slope);
      const window = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.4, 0.12), windowMaterial);
      window.name = `${group.name}-window-${sign < 0 ? 'left' : 'right'}`;
      window.position.set(sign * 2.2, 2.7, -5.06);
      group.add(window);
    }
    const door = new THREE.Mesh(new THREE.BoxGeometry(1.7, 2.7, 0.14), doorMaterial);
    door.name = `${group.name}-door`;
    door.position.set(0, 1.35, -5.08);
    group.add(door);
    group.userData = {
      s: nearTrackS(track, point), lateral, side: station.side, offRoad: offRoadDistance(track, point),
    };
    scene.add(group);
    groups.push(group);
  });
  return groups;
}

function nearTrackS(track, point) {
  return nearestS(track, point);
}

function buildGallery(scene, track) {
  const group = new THREE.Group();
  group.name = 'gallery';
  const postMaterial = new THREE.MeshStandardMaterial({ color: 0xb8ad8a, roughness: 0.82 });
  const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8e8170, roughness: 0.8, metalness: 0.08 });
  const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xaaa48f, roughness: 0.88 });
  const bayLength = (GALLERY_END - GALLERY_START) / GALLERY_BAYS;
  // Roof beams sit well above the chase camera; low overhead slabs filled the
  // entire upper frame with their unlit underside and hid the dusk sky.
  const GALLERY_HEAD = 9;
  const postGeometry = new THREE.BoxGeometry(0.55, GALLERY_HEAD - 0.4, 0.55);
  const beamGeometry = new THREE.BoxGeometry(GALLERY_HALF_WIDTH * 2 + 1.2, 0.22, 0.28);
  const roofGeometry = new THREE.BoxGeometry(GALLERY_HALF_WIDTH * 2 + 1.2, 0.2, bayLength + 0.3);
  const wallGeometry = new THREE.BoxGeometry(0.35, 1.2, bayLength + 0.2);
  for (let i = 0; i <= GALLERY_BAYS; i += 1) {
    const s = GALLERY_START + i * bayLength;
    const sample = sampleTrack(track, s);
    for (const side of ['left', 'right']) {
      const lateral = side === 'left' ? -GALLERY_HALF_WIDTH : GALLERY_HALF_WIDTH;
      const point = pointOnRoad(track, s, lateral);
      const column = new THREE.Mesh(postGeometry, postMaterial);
      column.name = `gallery-column-${side}-${i}`;
      column.position.set(point.x, sample.position.y + (GALLERY_HEAD - 0.4) * 0.5, point.z);
      column.rotation.y = distanceAngle(sample.tangent);
      group.add(column);
    }
    const beamCentre = sampleTrack(track, s);
    const beamAngle = distanceAngle(beamCentre.tangent);
    const beam = new THREE.Mesh(beamGeometry, roofMaterial);
    beam.name = `gallery-beam-${i}`;
    beam.position.set(beamCentre.position.x, beamCentre.position.y + GALLERY_HEAD, beamCentre.position.z);
    beam.rotation.y = beamAngle;
    group.add(beam);
    if (i === GALLERY_BAYS) break;
    const middle = sampleTrack(track, s + bayLength / 2);
    const angle = distanceAngle(middle.tangent);
    // Leave an open strip over the right half of the road: an avalanche gallery
    // should read as a shelter with a sky-facing side, not a closed tunnel.
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.name = `gallery-roof-${i}`;
    roof.position.set(
      middle.position.x - Math.cos(angle) * (GALLERY_HALF_WIDTH * 0.54),
      middle.position.y + GALLERY_HEAD + 0.25,
      middle.position.z + Math.sin(angle) * (GALLERY_HALF_WIDTH * 0.54)
    );
    roof.rotation.y = angle;
    group.add(roof);
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    const wallPoint = pointOnRoad(track, s + bayLength / 2, -GALLERY_HALF_WIDTH);
    wall.name = `gallery-wall-left-${i}`;
    wall.position.set(wallPoint.x, wallPoint.y + 0.6, wallPoint.z);
    wall.rotation.y = angle;
    group.add(wall);
  }
  group.userData = {
    start: GALLERY_START, end: GALLERY_END, span: GALLERY_END - GALLERY_START,
    bays: GALLERY_BAYS, openSide: 'right', orientations: [],
  };
  for (let i = 0; i <= GALLERY_BAYS; i += 1) {
    const sample = sampleTrack(track, GALLERY_START + i * bayLength);
    group.userData.orientations.push(distanceAngle(sample.tangent));
  }
  scene.add(group);
  return group;
}

// Every hazard owns a stable id and a scene group at its collision position.
// Kerb segments join end to end so the two road edges read as continuous lines.
function buildHazards(scene, track) {
  const group = new THREE.Group();
  group.name = 'hazards';
  const hazards = [];
  const coneBody = new THREE.ConeGeometry(0.55, 1.35, 5);
  const coneBand = new THREE.CylinderGeometry(0.33, 0.43, 0.2, 6);
  const coneBase = new THREE.BoxGeometry(1.1, 0.12, 1.1);
  const postShape = new THREE.BoxGeometry(0.26, 1.9, 0.26);
  const boardLong = new THREE.BoxGeometry(1.9, 0.4, 0.14);
  const boardShort = new THREE.BoxGeometry(1.4, 0.4, 0.14);
  const kerbShape = new THREE.BoxGeometry(0.3, 0.18, EDGE_STEP + 0.1);
  const edgePost = new THREE.ConeGeometry(0.15, 0.42, 4);
  const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x2c2e3c, roughness: 0.9 });
  const coneMaterial = new THREE.MeshStandardMaterial({ color: 0xff7438, roughness: 0.72 });
  const whiteMaterial = new THREE.MeshStandardMaterial({ color: 0xf2eee2, roughness: 0.8 });
  const barrierMaterial = new THREE.MeshStandardMaterial({ color: 0xf0b044, roughness: 0.78 });
  const stripeMaterial = new THREE.MeshStandardMaterial({ color: 0x36394a, roughness: 0.8 });
  const kerbMaterial = new THREE.MeshStandardMaterial({ color: 0xaeb3ba, roughness: 0.95 });

  function addHazard({ id, kind, s, lateral, side, radius, decorate }) {
    const sample = sampleTrack(track, s);
    const point = pointOnRoad(track, s, lateral);
    const holder = new THREE.Group();
    holder.name = `hazard-${id}`;
    holder.position.set(point.x, point.y + 0.08, point.z);
    holder.rotation.y = distanceAngle(sample.tangent);
    holder.userData = { hazardId: id, kind, s, lateral, side };
    decorate(holder);
    group.add(holder);
    hazards.push({
      id, kind, s, side, lateral, radius,
      position: { x: holder.position.x, y: holder.position.y, z: holder.position.z },
    });
  }

  CONE_STATIONS.forEach((station, i) => {
    const id = `cone-${i + 1}`;
    addHazard({
      ...station, id, kind: 'cone', side: station.lateral < 0 ? 'left' : 'right', radius: 0.65,
      decorate(holder) {
        const base = new THREE.Mesh(coneBase, baseMaterial);
        base.name = `${id}-base`;
        base.position.y = 0.06;
        holder.add(base);
        const body = new THREE.Mesh(coneBody, coneMaterial);
        body.name = `${id}-body`;
        body.position.y = 0.75;
        holder.add(body);
        const band = new THREE.Mesh(coneBand, whiteMaterial);
        band.name = `${id}-band`;
        band.position.y = 0.82;
        holder.add(band);
      },
    });
  });

  BARRIER_STATIONS.forEach((station, i) => {
    const id = `barrier-${i + 1}`;
    addHazard({
      ...station, id, kind: 'barrier', side: station.lateral < 0 ? 'left' : 'right', radius: 1.6,
      decorate(holder) {
        const post = new THREE.Mesh(postShape, stripeMaterial);
        post.name = `${id}-post`;
        post.position.y = 0.95;
        holder.add(post);
        const upper = new THREE.Mesh(boardLong, barrierMaterial);
        upper.name = `${id}-board-upper`;
        upper.position.set(0.72, 1.42, 0);
        holder.add(upper);
        const lower = new THREE.Mesh(boardShort, whiteMaterial);
        lower.name = `${id}-board-lower`;
        lower.position.set(-0.6, 0.82, 0);
        holder.add(lower);
      },
    });
  });

  let edgeIndex = 0;
  for (let s = EDGE_STEP / 2; s < TRACK_LENGTH; s += EDGE_STEP) {
    for (const side of ['left', 'right']) {
      const index = edgeIndex + 1;
      const id = `edge-${side === 'left' ? 'l' : 'r'}-${index}`;
      const lateral = (side === 'left' ? -1 : 1) * (sampleTrack(track, s).width * 0.5 - 0.2);
      edgeIndex += 1;
      addHazard({
        id, kind: 'edge', s, lateral, side, radius: 0.45,
        decorate(holder) {
          const kerb = new THREE.Mesh(kerbShape, kerbMaterial);
          kerb.name = `${id}-kerb`;
          kerb.position.z = EDGE_STEP / 2;
          holder.add(kerb);
          const marker = new THREE.Mesh(edgePost, index % 2 === 0 ? stripeMaterial : whiteMaterial);
          marker.name = `${id}-marker`;
          marker.position.set(side === 'left' ? -0.26 : 0.26, 0.2, 0);
          holder.add(marker);
        },
      });
    }
  }
  scene.add(group);
  return { group, hazards };
}

export function buildScenery(scene, assets, track) {
  const first = sampleTrack(track, 0);
  scene.fog = new THREE.Fog(0x1c2a48, 120, 1600);
  scene.background = new THREE.Color(0x1c2a48);

  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(1500, 48, 24),
    new THREE.MeshBasicMaterial({ map: assets.sky, side: THREE.BackSide, fog: false, depthWrite: false })
  );
  sky.position.set(first.position.x, first.position.y, first.position.z);
  sky.name = 'sky-dome';
  scene.add(sky);

  const ground = new THREE.Mesh(
    groundRibbon(track),
    new THREE.MeshBasicMaterial({ color: 0x18263c, side: THREE.DoubleSide, fog: true })
  );
  ground.name = 'valley-floor';
  scene.add(ground);

  const road = roadRibbon(track, assets.roadGrain);
  scene.add(road);

  const mountains = buildMountains(scene, track);
  const trees = buildSpruces(scene, track, assets.spruce);
  const chalets = buildChalets(scene, track);
  const gallery = buildGallery(scene, track);
  const hazardLayer = buildHazards(scene, track);
  const hazards = hazardLayer.hazards;
  const motes = createMotes();
  motes.position.copy(first.position);
  scene.add(motes);

  const hemi = new THREE.HemisphereLight(0xaac8ff, 0x1b1830, 1.05);
  hemi.name = 'dusk-hemisphere';
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffa45f, 1.3);
  sun.position.set(-180, 220, -320);
  sun.name = 'dusk-sun';
  scene.add(sun);

  const inventory = {
    road: true, sky: true, mountains: mountains.length,
    sprites: trees.length,
    chalets: chalets.length,
    galleryBays: gallery.userData.bays,
    gallerySpan: gallery.userData.span,
    galleryOpenSide: gallery.userData.openSide,
    hazards: {
      cone: CONE_STATIONS.length,
      barrier: BARRIER_STATIONS.length,
      edge: hazards.length - CONE_STATIONS.length - BARRIER_STATIONS.length,
    },
  };
  function update(s) {
    // Reserved for trees and hazards; the drifting dusk motes keep the opening
    // frame alive before a run begins.
    const positions = motes.geometry.attributes.position;
    void s;
    const phase = performance.now() * 0.002;
    for (let i = 0; i < MOTE_COUNT; i += 1) {
      positions.setY(i, 1 + (i % 7) * 1.6 + Math.sin(phase + i * 0.7) * 3);
    }
    positions.needsUpdate = true;
  }
  return { hazards, update, inventory, road, sky, mountains };
}

export default buildScenery;
