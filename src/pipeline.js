/**
 * Asset pipeline: fetch → validate → transform → cache → serve
 *
 * Flow:
 *   Client request → Router → Pipeline.process()
 *     → fetchFromOrigin(url)
 *     → validateResponse(res); on failure → fallback cache lookup
 *     → transformAsset(asset, config); minify + compress
 *     → storeInCache(key, result); async write-through to Redis + S3
 *     → respond to client
 *
 * On cache hit the pipeline short-circuits at step 1.
 * On origin timeout the pipeline retries once; then serves stale cache.
 */

const ORIGIN_TIMEOUT_MS = 5_000;
const MAX_RETRIES = 1;
const CACHE_TTL_S = 3600;

class AssetPipeline {
  constructor(originUrl, cache, storage) {
    this.originUrl = originUrl;
    this.cache = cache;
    this.storage = storage;
  }

  async process(assetPath) {
    // 1. Check cache first
    const cached = await this.cache.get(assetPath);
    if (cached) {
      console.log(`[pipeline] cache hit: ${assetPath}`);
      return cached;
    }

    // 2. Fetch from origin with retry
    let response;
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        response = await this.fetchFromOrigin(assetPath);
        break;
      } catch (err) {
        console.warn(`[pipeline] origin fetch failed (attempt ${attempt + 1}): ${err.message}`);
        if (attempt === MAX_RETRIES) {
          // Fall back to stale cache on total failure
          const stale = await this.cache.get(assetPath, { allowStale: true });
          if (stale) return stale;
          throw new Error(`Origin unreachable and no stale cache for ${assetPath}`);
        }
      }
    }

    // 3. Validate response
    if (!this.validateResponse(response)) {
      console.warn(`[pipeline] invalid response for ${assetPath}; checking stale cache`);
      const stale = await this.cache.get(assetPath, { allowStale: true });
      if (stale) return stale;
      throw new Error(`Invalid origin response and no fallback for ${assetPath}`);
    }

    // 4. Transform: minify + compress
    const transformed = await this.transformAsset(response.body, {
      minify: true,
      compress: 'gzip',
      contentType: response.headers['content-type'],
    });

    // 5. Write-through cache (async — don't block response)
    this.storeInCache(assetPath, transformed).catch((err) =>
      console.error(`[pipeline] cache store failed: ${err.message}`)
    );

    return transformed;
  }

  async fetchFromOrigin(path) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ORIGIN_TIMEOUT_MS);
    try {
      const res = await fetch(`${this.originUrl}/${path}`, { signal: controller.signal });
      return { status: res.status, headers: Object.fromEntries(res.headers), body: await res.text() };
    } finally {
      clearTimeout(timer);
    }
  }

  validateResponse(res) {
    return res && res.status >= 200 && res.status < 400 && res.body?.length > 0;
  }

  async transformAsset(body, config) {
    let result = body;
    if (config.minify && config.contentType?.includes('javascript')) {
      result = result.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s{2,}/g, ' ');
    }
    if (config.compress === 'gzip') {
      // placeholder — real impl would use zlib
      result = `/* gzipped */ ${result}`;
    }
    return result;
  }

  async storeInCache(key, value) {
    // Write-through: Redis first (fast), then S3 (durable)
    await this.cache.set(key, value, { ttl: CACHE_TTL_S });
    await this.storage.put(key, value);
  }
}

class PipelineMetrics {
  constructor() {
    this.counters = {};
    this.timers = {};
  }

  increment(name) {
    this.counters[name] = (this.counters[name] || 0) + 1;
  }

  startTimer(name) {
    this.timers[name] = Date.now();
  }

  endTimer(name) {
    const start = this.timers[name];
    if (!start) return 0;
    const elapsed = Date.now() - start;
    delete this.timers[name];
    return elapsed;
  }

  report() {
    return { counters: { ...this.counters }, activeTimers: Object.keys(this.timers).length };
  }
}

module.exports = { AssetPipeline, PipelineMetrics, ORIGIN_TIMEOUT_MS, MAX_RETRIES, CACHE_TTL_S };
