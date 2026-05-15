// Format helpers used by app.js and other entry points.

function formatCurrency(amount, currency) {
  if (amount == null) return '';
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency;
  return symbol + amount.toFixed(2);
}

function formatPercent(value) {
  if (value == null) return '';
  return (value * 100).toFixed(1) + '%';
}

function formatDate(date) {
  if (date == null) return '';
  const d = new Date(date);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

module.exports = { formatCurrency, formatPercent, formatDate };
