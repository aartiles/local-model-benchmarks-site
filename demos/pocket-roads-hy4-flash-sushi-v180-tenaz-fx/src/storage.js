// Small local-storage wrapper. It has no DOM or module dependencies so it can
// be imported from browser checks with a stubbed global storage as well.
const PREFIX = 'pocket-roads.v1.';

function fullKey(key) {
  const name = String(key || '');
  return name.startsWith(PREFIX) ? name : `${PREFIX}${name}`;
}

function storageArea() {
  try {
    return globalThis.localStorage || null;
  } catch {
    return null;
  }
}

export function load(key, fallback = null) {
  try {
    const area = storageArea();
    if (!area) return fallback;
    const raw = area.getItem(fullKey(key));
    return raw === null || raw === undefined ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  try {
    const area = storageArea();
    if (!area) return false;
    area.setItem(fullKey(key), JSON.stringify(value === undefined ? null : value));
    return true;
  } catch {
    return false;
  }
}

export { PREFIX as STORAGE_PREFIX };
export default { load, save };
