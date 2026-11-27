// Midnight Pass offline track model. Plain numbers and vectors only: no
// rendering, input or storage references, so Node can import this module.
export const TRACK_LENGTH = 3200;

const STEP = 2;
const ROAD_WIDTH = 9;
const TAU = Math.PI * 2;
const SAMPLE_COUNT = TRACK_LENGTH / STEP;

function headingAt(s) {
  const t = s / TRACK_LENGTH;
  return (
    0.38 * Math.sin(TAU * 1.9 * t + 0.3) +
    0.28 * Math.sin(TAU * 4.2 * t - 0.8) +
    0.18 * Math.sin(TAU * 8.5 * t + 1.7)
  );
}

function elevationAt(s) {
  const t = s / TRACK_LENGTH;
  return (
    60 * Math.sin(TAU * 1.0 * t + 0.4) +
    30 * Math.sin(TAU * 2.2 * t + 1.1) +
    10 * Math.sin(TAU * 5.0 * t + 0.2)
  );
}

function gradeAt(s) {
  const t = s / TRACK_LENGTH;
  return (
    (60 * TAU * 1.0 * Math.cos(TAU * t + 0.4)) +
    (30 * TAU * 2.2 * Math.cos(TAU * 2.2 * t + 1.1)) +
    (10 * TAU * 5.0 * Math.cos(TAU * 5.0 * t + 0.2))
  ) / TRACK_LENGTH;
}

function interpolateArc(track, s) {
  const nodes = track.nodes;
  let lo = 0;
  let hi = nodes.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (nodes[mid].arcLength <= s) lo = mid;
    else hi = mid;
  }
  const span = nodes[hi].arcLength - nodes[lo].arcLength || 1;
  return { index: lo, next: hi, t: Math.max(0, Math.min(1, (s - nodes[lo].arcLength) / span)) };
}

export function createTrack() {
  const nodes = [];
  let position = { x: 0, y: elevationAt(0), z: 0 };
  for (let i = 0; i <= SAMPLE_COUNT; i++) {
    nodes.push({
      position,
      heading: headingAt(i * STEP),
      grade: gradeAt(i * STEP),
      arcLength: i * STEP,
    });
    if (i === SAMPLE_COUNT) break;
    const mid = (i + 0.5) * STEP;
    const heading = headingAt(mid);
    const grade = gradeAt(mid);
    const horizontal = 1 / Math.sqrt(1 + grade * grade);
    position = {
      x: position.x + STEP * horizontal * Math.cos(heading),
      y: position.y + STEP * grade * horizontal,
      z: position.z + STEP * horizontal * Math.sin(heading),
    };
  }

  // Each integration step has arc length STEP; rescale once so the polyline's
  // accumulated length is exactly TRACK_LENGTH despite floating drift.
  let accumulated = 0;
  for (let i = 1; i < nodes.length; i++) {
    const a = nodes[i - 1].position;
    const b = nodes[i].position;
    accumulated += Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);
  }
  const scale = TRACK_LENGTH / accumulated;
  for (const node of nodes) {
    node.position.x *= scale;
    node.position.y *= scale;
    node.position.z *= scale;
  }
  let length = 0;
  for (let i = 1; i < nodes.length; i++) {
    const a = nodes[i - 1].position;
    const b = nodes[i].position;
    length += Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);
    nodes[i].arcLength = length;
  }
  nodes[nodes.length - 1].arcLength = TRACK_LENGTH;

  return { length: TRACK_LENGTH, width: ROAD_WIDTH, nodes };
}

export function sampleTrack(track, s) {
  const distance = Math.max(0, Math.min(TRACK_LENGTH, Number(s) || 0));
  const { index, next, t } = interpolateArc(track, distance);
  const a = track.nodes[index];
  const b = track.nodes[next];
  const position = {
    x: a.position.x + (b.position.x - a.position.x) * t,
    y: a.position.y + (b.position.y - a.position.y) * t,
    z: a.position.z + (b.position.z - a.position.z) * t,
  };
  let heading = b.heading;
  // Sine headings are continuous; unwrap across ±π if a segment spans it.
  if (heading - a.heading > Math.PI) heading -= TAU;
  if (a.heading - heading > Math.PI) heading += TAU;
  heading = a.heading + (heading - a.heading) * t;
  const grade = a.grade + (b.grade - a.grade) * t;
  const horizontal = 1 / Math.sqrt(1 + grade * grade);
  const tangent = { x: Math.cos(heading), y: 0, z: Math.sin(heading) };
  const up = {
    x: -grade * horizontal * tangent.x,
    y: horizontal,
    z: -grade * horizontal * tangent.z,
  };
  return { position, tangent, up, width: track.width };
}

export function pointOnRoad(track, s, lateral) {
  const sample = sampleTrack(track, s);
  return {
    x: sample.position.x + lateral * sample.tangent.z,
    y: sample.position.y,
    z: sample.position.z - lateral * sample.tangent.x,
  };
}

export function nearestS(track, point) {
  let best = 0;
  let bestDistance = Infinity;
  for (let i = 0; i < track.nodes.length - 1; i++) {
    const a = track.nodes[i].position;
    const b = track.nodes[i + 1].position;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dz = b.z - a.z;
    const squared = dx * dx + dy * dy + dz * dz;
    if (squared === 0) continue;
    const t = Math.max(0, Math.min(1,
      ((point.x - a.x) * dx + (point.y - a.y) * dy + (point.z - a.z) * dz) / squared
    ));
    const px = a.x + dx * t;
    const py = a.y + dy * t;
    const pz = a.z + dz * t;
    const distance = (point.x - px) ** 2 + (point.y - py) ** 2 + (point.z - pz) ** 2;
    if (distance < bestDistance) {
      bestDistance = distance;
      best = track.nodes[i].arcLength + (track.nodes[i + 1].arcLength - track.nodes[i].arcLength) * t;
    }
  }
  return best;
}
