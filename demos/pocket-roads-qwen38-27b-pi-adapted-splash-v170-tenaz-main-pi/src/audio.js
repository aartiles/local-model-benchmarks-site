// Pocket Roads — synthesized sound effects (R13, T011).
// No audio files: Web Audio oscillators + a short noise buffer.
// Node-importable: pass a stub context via initAudio({context}); with no
// AudioContext available every call is a safe no-op.
//
// Exports:
//   initAudio(opts?)   create/resume the AudioContext + master gain
//   playImpact()       low thud (noise burst through a lowpass)
//   playCheckpoint()   short rising chirp
//   playFinish()       three-note fanfare
//   setEngine(speed)   engine hum, frequency/gain follow speed (m/s)
//   setMute(bool)      master gain 0 / 1
//   isMuted()

let ctx = null;
let master = null;
let muted = false;
let noiseBuffer = null;
let engine = null; // { osc, gain }

function resolveContext() {
  if (ctx) return ctx;
  const AC = globalThis.AudioContext || globalThis.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = muted ? 0 : 1;
  master.connect(ctx.destination);
  return ctx;
}

function makeNoiseBuffer(c) {
  if (noiseBuffer) return noiseBuffer;
  const len = Math.floor(c.sampleRate * 0.25);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  noiseBuffer = buf;
  return buf;
}

export function initAudio(opts = {}) {
  if (opts.context) {
    ctx = opts.context;
    if (!master) {
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 1;
      master.connect(ctx.destination);
    }
  }
  const c = resolveContext();
  if (!c) return false;
  if (c.state === "suspended" && typeof c.resume === "function") {
    try { c.resume(); } catch {}
  }
  return true;
}

export function isMuted() {
  return muted;
}

export function setMute(m) {
  muted = Boolean(m);
  if (master) master.gain.value = muted ? 0 : 1;
}

function ready() {
  return resolveContext() && master;
}

export function playImpact() {
  if (!ready() || muted) return;
  const t = ctx.currentTime;
  const src = ctx.createBufferSource();
  src.buffer = makeNoiseBuffer(ctx);
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 180;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.8, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
  src.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  src.start(t);
  src.stop(t + 0.32);
}

export function playCheckpoint() {
  if (!ready() || muted) return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(880, t);
  osc.frequency.exponentialRampToValueAtTime(1320, t + 0.12);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.25, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
  osc.connect(gain);
  gain.connect(master);
  osc.start(t);
  osc.stop(t + 0.22);
}

export function playFinish() {
  if (!ready() || muted) return;
  const t = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99]; // C5 E5 G5
  notes.forEach((f, i) => {
    const start = t + i * 0.18;
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = f;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);
    osc.connect(gain);
    gain.connect(master);
    osc.start(start);
    osc.stop(start + 0.52);
  });
}

// Engine hum: one sawtooth oscillator through a gain; frequency and gain
// follow speed. Cheap: nodes are created once, parameters updated in place.
export function setEngine(speed) {
  const s = Math.max(0, Number(speed) || 0);
  if (!ready()) return;
  if (s <= 0.01) {
    if (engine) {
      engine.gain.gain.value = 0;
      try { engine.osc.stop(ctx.currentTime + 0.05); } catch {}
      engine = null;
    }
    return;
  }
  if (!engine) {
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = 60;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    osc.connect(gain);
    gain.connect(master);
    osc.start();
    engine = { osc, gain };
  }
  engine.osc.frequency.value = 60 + s * 4; // 60 Hz idle .. ~240 Hz at 45 m/s
  engine.gain.gain.value = Math.min(0.12, 0.02 + s * 0.002);
}
