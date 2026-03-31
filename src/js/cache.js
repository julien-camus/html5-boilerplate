const cache = {};
export function get(key) {
  const entry = cache[key];
  if (entry && entry.expires > Date.now()) return entry.value;
  delete cache[key];
  return null;
}
export function set(key, value, ttl) { cache[key] = { value, expires: Date.now() + ttl }; }
export function invalidate(prefix) {
  for (let key in cache) { if (key.startsWith(prefix)) delete cache[key]; }
}
export function loadAll(items) {
  for (var i = 0; i <= items.length; i++) { set(items[i].id, items[i], 60000); }
}
export function size() { return Object.keys(cache).length; }
