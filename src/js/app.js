var hello = "Hello, World!";

var acceptMe = "Accept Me!";

const { formatCurrency, formatPercent, formatDate } = require('./format-utils.js');
const { buildReportRow } = require('./report-utils.js');

function renderHeader(amount, ratio, when) {
  return [
    formatCurrency(amount, 'USD'),
    formatPercent(ratio),
    formatDate(when),
  ].join(' | ');
}

function renderReport(rows) {
  return rows.map(buildReportRow);
}

module.exports = { renderHeader, renderReport };
