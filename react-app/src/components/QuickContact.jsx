import { useState, useCallback } from 'react';
import { CONTACT, API_BASE } from '../config';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const wa = `https://wa.me/${CONTACT.WHATSAPP}?text=Hello%20Ansar%2C%20I%27d%20like%20to%20discuss%20a%20project`;

export default function QuickContact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle|sending|done|error
  const [msg, setMsg] = useState('');

  const on = useCallback((e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value })), []);

  const submit = useCallback(async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !EMAIL_RE.test(form.email) || !form.message.trim()) {
      setStatus('error'); setMsg('Please add your name, a valid email, and a message.'); return;
    }
    setStatus('sending');
    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('email', form.email);
    fd.append('message', form.message);
    fd.append('source', 'homepage-quick-contact');
    fd.append('website', '');
    try {
      const res = await fetch(`${API_BASE}/forms/contact-handler.php`, {
        method: 'POST', body: fd, headers: { 'X-Requested-With': 'XMLHttpRequest' },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.success) { setStatus('done'); setForm({ name: '', email: '', message: '' }); }
      else { setStatus('error'); setMsg(data.message || 'Something went wrong — please try again.'); }
    } catch {
      setStatus('error');
      setMsg('Could not send right now. Please email ' + CONTACT.EMAIL + ' or use WhatsApp.');
    }
  }, [form]);

  return (
    <section className="qc-section section" id="quick-contact" aria-labelledby="qc-heading">
      <div className="container qc-wrap">
        <div className="qc-info reveal">
          <span className="eyebrow eyebrow--white">Quick Contact</span>
          <h2 id="qc-heading">Let&rsquo;s talk about your <em className="em">safety goals.</em></h2>
          <p>Send a short message or reach out directly — you&rsquo;ll hear back within 24 hours. No cost, no obligation.</p>

          <div className="qc-methods">
            <a className="qc-method" href={wa} target="_blank" rel="noopener noreferrer">
              <span className="qc-method__ic" style={{ background: 'rgba(37,211,102,.16)', color: '#25D366' }}><i className="fab fa-whatsapp"></i></span>
              <span><strong>WhatsApp</strong><span>{CONTACT.PHONE}</span></span>
            </a>
            <a className="qc-method" href={`mailto:${CONTACT.EMAIL}`}>
              <span className="qc-method__ic"><i className="fas fa-envelope"></i></span>
              <span><strong>Email</strong><span>{CONTACT.EMAIL}</span></span>
            </a>
            <a className="qc-method" href={CONTACT.LINKEDIN} target="_blank" rel="noopener noreferrer">
              <span className="qc-method__ic"><i className="fab fa-linkedin-in"></i></span>
              <span><strong>LinkedIn</strong><span>@ansar-mahmood</span></span>
            </a>
            <div className="qc-method qc-method--static">
              <span className="qc-method__ic"><i className="fas fa-location-dot"></i></span>
              <span><strong>Based in</strong><span>{CONTACT.LOCATION || 'Riyadh, Saudi Arabia'}</span></span>
            </div>
          </div>
        </div>

        <div className="qc-card reveal">
          {status === 'done' ? (
            <div className="qc-success">
              <div className="qc-success__ic"><i className="fas fa-check"></i></div>
              <h3>Message sent</h3>
              <p>Thank you — Ansar will reply within 24 hours.</p>
              <button className="btn btn-outline-navy btn-sm" onClick={() => setStatus('idle')}>Send another</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h3 className="qc-card__title">Send a message</h3>
              <div className="qc-field">
                <label htmlFor="qc-name">Your name</label>
                <input id="qc-name" name="name" value={form.name} onChange={on} className="adm-input" placeholder="e.g. Ahmed Al-Rashid" />
              </div>
              <div className="qc-field">
                <label htmlFor="qc-email">Email</label>
                <input id="qc-email" name="email" type="email" value={form.email} onChange={on} className="adm-input" placeholder="you@example.com" />
              </div>
              <div className="qc-field">
                <label htmlFor="qc-msg">How can Ansar help?</label>
                <textarea id="qc-msg" name="message" value={form.message} onChange={on} className="adm-input adm-textarea" placeholder="Tell us about your project, course, or challenge…" rows={4} />
              </div>
              {status === 'error' && <div className="qc-status"><i className="fas fa-triangle-exclamation"></i>{msg}</div>}
              <button type="submit" className="btn btn-gold btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'sending'}>
                {status === 'sending' ? <><i className="fas fa-spinner fa-spin"></i> Sending…</> : <><i className="fas fa-paper-plane"></i> Send Message</>}
              </button>
              <p className="qc-card__note"><i className="fas fa-shield-halved"></i> Your details stay private — used only to reply.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
