/**
 * String utility functions for text processing.
 */

function ensureString(value) {
  return typeof value === "string" ? value : "";
}

export function capitalize(str) {
  const s = ensureString(str);
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function truncate(str, maxLength, suffix = "...") {
  const s = ensureString(str);
  if (!s || s.length <= maxLength) return s;
  if (maxLength <= suffix.length) return s.slice(0, maxLength);
  return s.slice(0, maxLength - suffix.length) + suffix;
}

export function slugify(str) {
  const s = ensureString(str);
  if (!s) return "";
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
