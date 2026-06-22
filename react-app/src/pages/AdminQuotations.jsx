import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { studentApi } from '../lib/studentApi';

const STATUSES = ['new', 'in-review', 'responded', 'closed'];

export default function AdminQuotations() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [list, setList] = useState(null);
  const [msg, setMsg] = useState(null);

  useEffect(() => { if (!loading && !user) nav('/login', { replace: true }); }, [loading, user, nav]);
  const reload = useCallback(() => {
    studentApi.adminListQuotations().then((d) => setList(d.quotations || []))
      .catch((e) => setMsg({ type: 'err', text: e.status === 403 ? 'Admin access required.' : 'Could not load.' }));
  }, []);
  useEffect(() => { if (user) reload(); }, [user, reload]);

  if (loading) return <main className="auth-page"><div className="sd-loading"><i className="fas fa-spinner fa-spin" /> Loading…</div></main>;
  if (!user) return null;
  if (user.role !== 'admin') return <main className="auth-page"><div className="auth-card" style={{ maxWidth: 460 }}><h1 className="auth-title">Admins only</h1></div></main>;

  async function setStatus(q, status) {
    try { await studentApi.adminUpdateQuotation(q.id, { status }); setList((l) => l.map((x) => x.id === q.id ? { ...x, status } : x)); }
    catch (e) { setMsg({ type: 'err', text: e.message }); }
  }
  async function remove(q) {
    if (!window.confirm('Delete this request?')) return;
    try { await studentApi.adminDeleteQuotation(q.id); reload(); } catch (e) { setMsg({ type: 'err', text: e.message }); }
  }

  return (
    <main className="sd-page">
      <section className="sd-hero"><div className="container sd-hero__inner">
        <div><span className="sd-eyebrow"><i className="fas fa-inbox" /> Admin</span><h1 className="sd-title">Quote Requests</h1><p className="sd-sub">Incoming quotation enquiries from the website.</p></div>
        <button className="sd-logout" onClick={() => nav('/admin/invoices')}><i className="fas fa-file-invoice-dollar" /> Invoices</button>
      </div></section>

      <section className="section"><div className="container">
        {msg && <div className={`ax-msg ax-msg--${msg.type}`} style={{ marginBottom: 18 }}>{msg.text}</div>}
        {!list && <p className="sd-empty"><i className="fas fa-spinner fa-spin" /> Loading…</p>}
        {list && !list.length && <p className="sd-empty">No quote requests yet. They appear here when visitors submit the “Request a Quote” form.</p>}
        <div className="qz-grid">
          {list && list.map((q) => (
            <div className={`qz-card qz-card--${q.status}`} key={q.id}>
              <div className="qz-card__top">
                <div><b>{q.name}</b>{q.company && <span> · {q.company}</span>}</div>
                <select className="qz-status" value={q.status} onChange={(e) => setStatus(q, e.target.value)}>
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="qz-card__meta">
                {q.email && <a href={`mailto:${q.email}`}><i className="fas fa-envelope" /> {q.email}</a>}
                {q.mobile && <span><i className="fas fa-phone" /> {q.mobile}</span>}
              </div>
              {q.service_required && <p className="qz-card__svc"><i className="fas fa-briefcase" /> {q.service_required}</p>}
              {q.notes && <p className="qz-card__notes">{q.notes}</p>}
              <div className="qz-card__foot">
                <span className="qz-date">{new Date(q.created_at).toLocaleDateString()}</span>
                <button className="ax-icon-btn ax-icon-btn--danger" onClick={() => remove(q)}><i className="fas fa-trash" /></button>
              </div>
            </div>
          ))}
        </div>
      </div></section>
    </main>
  );
}
