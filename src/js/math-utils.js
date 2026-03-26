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
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

// Cognitive complexity issue (deeply nested) + code smell
export function categorize(value) {
  if (value > 0) {
    if (value > 10) {
      if (value > 100) {
        if (value > 1000) {
          return "huge";
        } else {
          return "large";
        }
      } else {
        return "medium";
      }
    } else {
      return "small";
    }
  } else {
    if (value === 0) {
      return "zero";
    } else {
      return "negative";
    }
  }
}

// Duplicate code block (SQC duplication detection)
export function addVectors(a, b) {
  const result = { x: 0, y: 0, z: 0 };
  result.x = a.x + b.x;
  result.y = a.y + b.y;
  result.z = a.z + b.z;
  return result;
}

export function subtractVectors(a, b) {
  const result = { x: 0, y: 0, z: 0 };
  result.x = a.x - b.x;
  result.y = a.y - b.y;
  result.z = a.z - b.z;
  return result;
}
