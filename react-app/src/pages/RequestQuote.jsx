import { useState } from 'react';
import { Link } from 'react-router-dom';
import { studentApi } from '../lib/studentApi';

export default function RequestQuote() {
  const [form, setForm] = useState({ name: '', company: '', email: '', mobile: '', service_required: '', notes: '' });
  const [state, setState] = useState('idle'); // idle | sending | done | error
  const [err, setErr] = useState('');
  const set = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault(); setErr(''); setState('sending');
    try { await studentApi.submitQuotation(form); setState('done'); }
    catch (ex) { setErr(ex.message || 'Something went wrong.'); setState('error'); }
  }

  if (state === 'done') {
    return (
      <main className="auth-page">
        <div className="auth-card" style={{ maxWidth: 520, textAlign: 'center' }}>
          <div className="rq-tick"><i className="fas fa-check" /></div>
          <h1 className="auth-title">Request received</h1>
          <p className="auth-sub">Thank you{form.name ? `, ${form.name.split(' ')[0]}` : ''}. We’ll review your requirements and reply with a tailored quotation shortly.</p>
          <Link className="auth-btn" to="/" style={{ textDecoration: 'none' }}><i className="fas fa-arrow-left" /> Back to home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-hero">
        <div className="auth-card">
          <span className="auth-badge"><i className="fas fa-file-invoice-dollar" /> Request a Quote</span>
          <h1 className="auth-title">Get a tailored quotation</h1>
          <p className="auth-sub">Tell us what you need — training, consultancy, audits or AI integration — and we’ll send a custom quote.</p>
          {state === 'error' && <div className="auth-error"><i className="fas fa-circle-exclamation" /> {err}</div>}
          <form className="auth-form" onSubmit={submit}>
            <div className="auth-row">
              <div className="auth-field"><label>Your name *</label><input value={form.name} onChange={set('name')} required /></div>
              <div className="auth-field"><label>Company</label><input value={form.company} onChange={set('company')} /></div>
            </div>
            <div className="auth-row">
              <div className="auth-field"><label>Email *</label><input type="email" value={form.email} onChange={set('email')} required /></div>
              <div className="auth-field"><label>Mobile</label><input value={form.mobile} onChange={set('mobile')} /></div>
            </div>
            <div className="auth-field"><label>Service required</label><input value={form.service_required} onChange={set('service_required')} placeholder="e.g. IOSH Managing Safely for 20 staff" /></div>
            <div className="auth-field"><label>Details</label><textarea rows={4} value={form.notes} onChange={set('notes')} placeholder="Numbers, location, timeline, anything useful…" /></div>
            <button className="auth-btn" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : <>Request Quote <i className="fas fa-arrow-right" /></>}</button>
          </form>
        </div>
      </div>
    </main>
  );
}
