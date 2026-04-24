import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../config';
import { rewriteHtmlAssetPaths } from '../utils/asset';

// Map of form-id → PHP handler path + success message, matching the original forms.js
const FORM_CONFIG = {
  'contact-form': {
    url: '/forms/contact-handler.php',
    success: '✓ Thank you! Your message has been received. Ansar will respond within 24 hours.',
  },
  'booking-form': {
    url: '/forms/booking-handler.php',
    success: '✓ Booking request received! You will receive a confirmation email with meeting details shortly.',
  },
  'newsletter-page-form': {
    url: '/forms/newsletter-handler.php',
    success: "✓ You're subscribed! Check your inbox for a welcome message.",
  },
  'newsletter-form': {
    url: '/forms/newsletter-handler.php',
    success: '✓ Subscribed!',
  },
};

function toSpaPath(href) {
  if (!href) return null;
  let url = href;
  try {
    const u = new URL(href, window.location.origin);
    if (u.origin !== window.location.origin) return null;
    url = u.pathname + u.search + u.hash;
  } catch {
    /* relative href — use as-is */
  }
  let p = url.replace(/^\.\//, '').replace(/^\//, '');
  p = p.replace(/^Ansar\//, '');
  if (p === '' || p === 'index.html') return '/';
  if (p.startsWith('pages/')) {
    const slug = p.slice('pages/'.length).replace(/\.html$/, '');
    return '/' + slug;
  }
  return null;
}

/**
 * Renders a raw HTML string from a ported legacy page. Intercepts:
 *   - Internal anchor clicks → routes via React Router (no full page reload)
 *   - Known form submissions → posts to the PHP backend over fetch
 */
export default function PageHtml({ html }) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const rewrittenHtml = useMemo(() => rewriteHtmlAssetPaths(html), [html]);

  // Link interception
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const onClick = (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href) return;
      if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return;
      if (a.target && a.target !== '' && a.target !== '_self') return;
      const spa = toSpaPath(href);
      if (spa !== null) {
        e.preventDefault();
        navigate(spa);
      }
    };

    root.addEventListener('click', onClick);
    return () => root.removeEventListener('click', onClick);
  }, [navigate, html]);

  // Form interception
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const onSubmit = async (e) => {
      const form = e.target;
      if (!(form instanceof HTMLFormElement)) return;
      const cfg = FORM_CONFIG[form.id];
      if (!cfg) return;

      e.preventDefault();

      const statusEl = form.querySelector('.form-status');
      const submitBtn = form.querySelector('[type="submit"]');

      const showStatus = (type, msg) => {
        if (!statusEl) return;
        statusEl.className = `form-status form-status--${type}`;
        statusEl.textContent = msg;
      };
      const hideStatus = () => {
        if (!statusEl) return;
        statusEl.className = 'form-status';
        statusEl.textContent = '';
      };

      hideStatus();

      // Honeypot
      const hp = form.querySelector('.form-honeypot input, input[name="website"]');
      if (hp && hp.value) return;

      let origHTML = '';
      if (submitBtn) {
        submitBtn.disabled = true;
        origHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      }

      try {
        const res = await fetch(`${API_BASE}${cfg.url}`, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        });
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        if (data.success) {
          showStatus('success', cfg.success);
          form.reset();
        } else {
          showStatus('error', data.message || 'Something went wrong. Please try again.');
        }
      } catch (err) {
        showStatus('error', 'Unable to send your message. Please email us directly or try again later.');
        // eslint-disable-next-line no-console
        console.error('Form submission error:', err);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origHTML || 'Submit';
        }
      }
    };

    root.addEventListener('submit', onSubmit);
    return () => root.removeEventListener('submit', onSubmit);
  }, [html]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: rewrittenHtml }} />;
}
