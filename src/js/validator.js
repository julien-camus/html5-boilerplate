/**
 * Input validation utilities.
 */

export function validateEmail(email) {
  // Fixed: proper email regex supporting subdomains and plus-addressing
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export function sanitizeHtml(input) {
  // Fixed: use string replacement instead of innerHTML
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function parseAge(input) {
  // Fixed: handle NaN from parseInt
  const age = parseInt(input, 10);
  if (Number.isNaN(age) || age < 0) {
    return 0;
  }
  return age;
}
