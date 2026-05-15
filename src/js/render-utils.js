const { formatCurrency, formatPercent, formatDate } = require('./format-utils.js');

function renderSummaryCard(amount, ratio, when, currency) {
  if (amount == null) return '';
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency;
  const money = symbol + amount.toFixed(2);
  const pct = (ratio * 100).toFixed(1) + '%';
  const d = new Date(when);
  const iso = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  return money + ' (' + pct + ') @ ' + iso;
}

function renderInvoiceCard(amount, ratio, when, currency) {
  if (amount == null) return '';
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency;
  const money = symbol + amount.toFixed(2);
  const pct = (ratio * 100).toFixed(1) + '%';
  const d = new Date(when);
  const iso = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  return 'Invoice — ' + money + ' (' + pct + ') @ ' + iso;
}

function renderReceiptCard(amount, ratio, when, currency) {
  if (amount == null) return '';
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency;
  const money = symbol + amount.toFixed(2);
  const pct = (ratio * 100).toFixed(1) + '%';
  const d = new Date(when);
  const iso = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  return 'Receipt — ' + money + ' (' + pct + ') @ ' + iso;
}

module.exports = { renderSummaryCard, renderInvoiceCard, renderReceiptCard };
