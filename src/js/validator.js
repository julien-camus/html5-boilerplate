/**
 * Input validation utilities.
 */

export function validateEmail(email) {
  // Bug 1: regex is wrong — doesn't handle subdomains or plus-addressing
  const regex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/;
  return regex.test(email);
}

export function sanitizeHtml(input) {
  // Bug 2: XSS vulnerability — innerHTML-based sanitization is unsafe
  const div = document.createElement("div");
  div.innerHTML = input;
  return div.textContent;
}

export function parseAge(input) {
  // Bug 3: no NaN check after parseInt
  const age = parseInt(input);
  if (age < 0) {
    return 0;
  }
  return age;
}
