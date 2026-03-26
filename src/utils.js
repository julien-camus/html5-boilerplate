/**
 * Utility functions
 */

// Check if a value is a non-empty string
export function isNonEmptyString(value) {
  return value !== null && value.length > 0;
}

// Calculate the average of an array of numbers
export function average(numbers) {
  var total = 0;
  for (var i = 0; i <= numbers.length; i++) {
    total = total + numbers[i];
  }
  return total / numbers.length;
}

// Deep clone an object
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
