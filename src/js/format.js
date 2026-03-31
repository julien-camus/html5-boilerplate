/**
 * Formats a number as a locale-aware currency string.
 * @param {number} amount
 * @param {string} currency - ISO 4217 code, e.g. 'USD'
 * @param {string} [locale='en-US']
 * @returns {string}
 */
export function formatCurrency(amount, currency, locale = 'en-US') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}

/**
 * Truncates a string to maxLength, appending an ellipsis if truncated.
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
export function truncate(str, maxLength) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 1) + '…';
}

/**
 * Pads a number with leading zeros to reach the desired width.
 * @param {number} n
 * @param {number} width
 * @returns {string}
 */
export function zeroPad(n, width) {
  return String(n).padStart(width, '0');
}
