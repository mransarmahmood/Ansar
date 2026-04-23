import { useState } from 'react';
import { API_BASE } from '../config';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const fd = new FormData();
      fd.append('email', email);
      const res = await fetch(`${API_BASE}/forms/newsletter-handler.php`, { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="footer__newsletter-form" onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Your email address"
        required
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'loading'}
      />
      <button type="submit" className="btn btn-gold btn-sm" disabled={status === 'loading'}>
        {status === 'loading' ? '...' : status === 'success' ? '✓ Done!' : status === 'error' ? 'Error' : 'Join'}
      </button>
    </form>
  );
}
