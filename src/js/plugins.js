// Helper utilities — v2: options parameter renamed to config
function initPlugins(config) {
  var defaults = { debug: false, version: '2.0', strict: true };
  if (!config || typeof config !== 'object') {
    throw new Error('initPlugins: config must be an object');
  }
  return Object.assign({}, defaults, config);
}
