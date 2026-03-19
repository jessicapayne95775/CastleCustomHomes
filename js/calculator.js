/* ============================================================
   calculator.js — Mortgage payment estimator
   Castle's Custom Homes  |  pages/financing.html

   Calculates estimated monthly principal & interest payment
   using the standard amortization formula:

     M = P × [r(1+r)^n] / [(1+r)^n - 1]

     Where:
       M = monthly payment
       P = principal (home price minus down payment)
       r = monthly interest rate (annual rate ÷ 12 ÷ 100)
       n = total number of payments (years × 12)

   Note: This is an ESTIMATE for informational purposes only.
   It does not include property taxes, homeowner's insurance,
   HOA fees, or PMI. Users should speak with Tammy for real
   financing guidance.

   HTML inputs required (all in financing.html):
     #calc-price   — total home price in dollars
     #calc-down    — down payment in dollars
     #calc-rate    — annual interest rate as a percentage (e.g. 6.75)
     #calc-term    — loan term in years (e.g. 30)

   Output:
     #calc-output  — displays the formatted monthly payment

   Called by: oninput attributes on each input field in the HTML,
   and once on page load to show an initial estimate.
   ============================================================ */

function calcMortgage() {
  // Read input values (default to 0 if empty or invalid)
  const price      = parseFloat(document.getElementById('calc-price').value) || 0;
  const down       = parseFloat(document.getElementById('calc-down').value)  || 0;
  const annualRate = parseFloat(document.getElementById('calc-rate').value)  || 0;
  const years      = parseInt(document.getElementById('calc-term').value)    || 0;

  // Derived values
  const principal    = price - down;          // Amount being financed
  const monthlyRate  = annualRate / 100 / 12; // Convert % per year → decimal per month
  const numPayments  = years * 12;            // Total number of monthly payments

  // Apply the amortization formula
  // Guard against division by zero (rate = 0 or term = 0 or no principal)
  let monthly = 0;
  if (monthlyRate > 0 && numPayments > 0 && principal > 0) {
    monthly = principal
      * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))
      / (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  // Update the output display
  // Math.round() removes cents; toLocaleString() adds comma separators
  const output = document.getElementById('calc-output');
  if (output) {
    output.textContent = '$' + Math.round(monthly).toLocaleString();
  }
}

// Expose globally so the HTML oninput attributes can call it
window.calcMortgage = calcMortgage;

// Run once on page load to populate the output with the default values
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', calcMortgage);
} else {
  calcMortgage();
}
