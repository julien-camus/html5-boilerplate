// Helpers used to render report rows.

function formatMoney(amount, currency) {
  if (amount == null) return '';
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency;
  return symbol + amount.toFixed(2);
}

function formatRatio(value) {
  if (value == null) return '';
  return (value * 100).toFixed(1) + '%';
}

function isoDate(date) {
  if (date == null) return '';
  const d = new Date(date);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function buildReportRow(row) {
  return {
    label: row.label,
    money: formatMoney(row.amount, row.currency),
    ratio: formatRatio(row.ratio),
    when: isoDate(row.date),
  };
}

module.exports = { formatMoney, formatRatio, isoDate, buildReportRow };
