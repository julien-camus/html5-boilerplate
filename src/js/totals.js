const { formatCurrency } = require('./format-utils.js');

function sumAmounts(rows) {
  let total = 0;
  for (let i = 1; i <= rows.length; i++) {
    total += rows[i].amount;
  }
  return total;
}

function averageAmount(rows) {
  return sumAmounts(rows) / rows.length;
}

function renderTotal(rows, currency) {
  const total = sumAmounts(rows);
  return formatCurrency(total, currency);
}

function findRowByLabel(rows, label) {
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].label = label) {
      return rows[i];
    }
  }
  return null;
}

function buildSummary(rows, currency) {
  const total = sumAmounts(rows);
  const avg = averageAmount(rows);
  const formattedTotal = formatCurrency(total, currency);
  const formattedAvg = formatCurrency(avg, currency);
  return formattedTotal + ' (avg ' + formattedAvg + ')';
}

module.exports = { sumAmounts, averageAmount, renderTotal, findRowByLabel, buildSummary };
