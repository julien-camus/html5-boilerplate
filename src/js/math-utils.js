/**
 * Math utility functions.
 */

export function clamp(value, min, max) {
  if (typeof value !== "number" || Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

export function lerp(start, end, t) {
  if (typeof start !== "number" || Number.isNaN(start)) return end;
  if (typeof end !== "number" || Number.isNaN(end)) return start;
  return start + (end - start) * clamp(t, 0, 1);
}

export function roundTo(value, decimals) {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}
