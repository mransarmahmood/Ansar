/* ================================================================
   ANSAR MAHMOOD — AJAX Form Handler
   Handles contact, booking, and newsletter forms
   ================================================================ */
(function () {
  'use strict';

  // Detect base path
  const isRoot = window.location.pathname.endsWith('index.html') ||
                 (window.location.pathname.includes('/Ansar') &&
                  !window.location.pathname.includes('/pages/') &&
                  !window.location.pathname.includes('/admin/'));
  const base = isRoot ? '' : '../';

  function handleForm(formId, handlerPath, successMsg, onSuccess) {
    const form = document.getElementById(formId);
    if (!form) return;

    const statusEl = form.querySelector('.form-status');
    const submitBtn = form.querySelector('[type="submit"]');

    function showStatus(type, msg) {
      if (!statusEl) return;
      statusEl.className = `form-status form-status--${type}`;
      statusEl.textContent = msg;
    }

    function hideStatus() {
      if (!statusEl) return;
      statusEl.className = 'form-status';
      statusEl.textContent = '';
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideStatus();

      // Basic honeypot check
      const honeypot = form.querySelector('.form-honeypot input, input[name="website"]');
      if (honeypot && honeypot.value) return;

      if (submitBtn) {
        submitBtn.disabled = true;
        const origText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn._origHTML = origText;
      }

      try {
        const res  = await fetch(handlerPath, {
          method:  'POST',
          body:    new FormData(form),
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });

        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await res.json();

        if (data.success) {
          showStatus('success', successMsg);
          form.reset();
          if (typeof onSuccess === 'function') onSuccess(data);
        } else {
          showStatus('error', data.message || 'Something went wrong. Please try again.');
        }
      } catch (err) {
        showStatus('error', 'Unable to send your message. Please email us directly or try again later.');
        console.error('Form submission error:', err);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitBtn._origHTML || 'Submit';
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {

    // Contact form
    handleForm(
      'contact-form',
      `${base}forms/contact-handler.php`,
      '✓ Thank you! Your message has been received. Ansar will respond within 24 hours.'
    );

    // Booking form (fallback if Calendly not configured)
    handleForm(
      'booking-form',
      `${base}forms/booking-handler.php`,
      '✓ Booking request received! You will receive a confirmation email with meeting details shortly.'
    );

    // Newsletter form (standalone page)
    handleForm(
      'newsletter-page-form',
      `${base}forms/newsletter-handler.php`,
      '✓ You\'re subscribed! Check your inbox for a welcome message.'
    );

  });

})();
