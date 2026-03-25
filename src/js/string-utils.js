/**
 * String utility functions for text processing.
 */

export function capitalize(str) {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str, maxLength, suffix = "...") {
  if (!str || str.length <= maxLength) return str;
  if (maxLength <= suffix.length) return str.slice(0, maxLength);
  return str.slice(0, maxLength - suffix.length) + suffix;
}

export function slugify(str) {
  if (!str || typeof str !== "string") return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
