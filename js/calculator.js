/* ============================================================
   calculator.js — Mortgage payment estimator
   Castle's Custom Homes
   ============================================================ */

function calcMortgage() {
  const price     = parseFloat(document.getElementById('calc-price').value) || 0;
  const down      = parseFloat(document.getElementById('calc-down').value)  || 0;
  const annualRate = parseFloat(document.getElementById('calc-rate').value) || 0;
  const years     = parseInt(document.getElementById('calc-term').value)    || 0;

  const principal   = price - down;
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;

  let monthly = 0;
  if (monthlyRate > 0 && numPayments > 0 && principal > 0) {
    monthly = principal
      * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))
      / (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  const output = document.getElementById('calc-output');
  if (output) {
    output.textContent = '$' + Math.round(monthly).toLocaleString();
  }
}

// Expose globally for oninput handlers and run on page load
window.calcMortgage = calcMortgage;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', calcMortgage);
} else {
  calcMortgage();
}
