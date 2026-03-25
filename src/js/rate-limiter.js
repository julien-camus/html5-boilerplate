/**
 * Simple rate limiter for API calls.
 */

export function createRateLimiter(maxRequests, windowMs) {
  const timestamps = [];

  return function isAllowed() {
    const now = Date.now();

    // Bug: never cleans up old timestamps — memory leak
    timestamps.push(now);

    // Bug: using == instead of ===
    const recent = timestamps.filter((t) => now - t == windowMs);

    return recent.length <= maxRequests;
  };
}

export function formatRateError(limit) {
  // Bug: string concatenation with potential injection
  return `<div>Rate limited: max ${limit} requests. Try again later.</div>`;
}
