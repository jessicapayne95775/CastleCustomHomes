/* ============================================================
   contact.js — Contact form submission handler
   Castle's Custom Homes  |  pages/contact.html

   Currently shows a success message when the form is submitted.
   The form does NOT yet send data anywhere — it needs to be
   connected to a real backend or form service.

   ── TO WIRE UP REAL FORM SUBMISSION ──────────────────────────
   Options (in order of simplest to most complex):

   1. Formspree (easiest, no server needed):
      - Sign up at formspree.io
      - Replace the <button onclick="handleFormSubmit()"> with
        a proper <form action="https://formspree.io/f/YOUR_ID" method="POST">
      - Remove this JS file entirely — Formspree handles it

   2. Netlify Forms (if hosting on Netlify):
      - Add netlify attribute to the <form> tag
      - Netlify auto-detects and handles submissions
      - No JS needed for basic submission

   3. Custom backend / email service:
      - Replace the handleFormSubmit() body with a fetch() call
        to your API endpoint
      - Example:
          fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
          })
   ─────────────────────────────────────────────────────────── */

window.handleFormSubmit = function () {
  // Show the success confirmation message (hidden by default in HTML)
  // TODO: Replace this with actual form submission logic (see above)
  const successMsg = document.getElementById('form-success');
  if (successMsg) {
    successMsg.style.display = 'block';
  }
};
