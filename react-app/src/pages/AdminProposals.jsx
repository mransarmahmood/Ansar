import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { studentApi } from '../lib/studentApi';

const blankLine = () => ({ description: '', qty: 1, unitPrice: 0 });
const blank = () => ({
  id: null, client_id: '', title: '', company_name: '', contact_name: '', company_address: '', company_email: '', phone: '',
  proposal_date: new Date().toISOString().slice(0, 10), subject: '', body: '', currency: 'USD',
  status: 'draft', terms: '', line_items: [], number: '', share_token: '',
});
const money = (n, c) => `${c || ''} ${Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`.trim();

export default function AdminProposals() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [list, setList] = useState(null);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState(blank);
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (!loading && !user) nav('/login', { replace: true }); }, [loading, user, nav]);
  const reload = useCallback(() => {
    studentApi.adminListProposals().then((d) => setList(d.proposals || []))
      .catch((e) => setMsg({ type: 'err', text: e.status === 403 ? 'Admin access required.' : 'Could not load proposals.' }));
    studentApi.adminListClients().then((d) => setClients(d.clients || [])).catch(() => {});
  }, []);
  useEffect(() => { if (user) reload(); }, [user, reload]);

  if (loading) return <main className="auth-page"><div className="sd-loading"><i className="fas fa-spinner fa-spin" /> Loading…</div></main>;
  if (!user) return null;
  if (user.role !== 'admin') return <main className="auth-page"><div className="auth-card" style={{ maxWidth: 460 }}><h1 className="auth-title">Admins only</h1></div></main>;

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));
  const lines = form.line_items || [];
  const setLine = (i, k, v) => set('line_items', lines.map((l, idx) => idx === i ? { ...l, [k]: v } : l));
  const total = lines.reduce((s, l) => s + (Number(l.qty) || 0) * (Number(l.unitPrice) || 0), 0);

  async function edit(id) {
    try { const d = await studentApi.adminGetProposal(id); setForm({ ...blank(), ...d.proposal, line_items: d.proposal.line_items || [] }); setMsg(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    catch { setMsg({ type: 'err', text: 'Could not load.' }); }
  }
  function reset() { setForm(blank()); setMsg(null); }
  async function save(e) {
    e.preventDefault(); setMsg(null);
    const body = { ...form }; delete body.id; delete body.number; delete body.share_token;
    if (!body.client_id) delete body.client_id;
    setBusy(true);
    try {
      if (form.id) await studentApi.adminUpdateProposal(form.id, body); else await studentApi.adminCreateProposal(body);
      reset(); setMsg({ type: 'ok', text: 'Proposal saved.' }); reload();
    } catch (ex) { setMsg({ type: 'err', text: ex.message || 'Save failed.' }); } finally { setBusy(false); }
  }
  async function remove(p) {
    if (!window.confirm(`Delete ${p.number}?`)) return;
    try { await studentApi.adminDeleteProposal(p.id); reload(); if (form.id === p.id) reset(); } catch (e) { setMsg({ type: 'err', text: e.message }); }
  }

  return (
    <main className="sd-page">
      <section className="sd-hero"><div className="container sd-hero__inner">
        <div><span className="sd-eyebrow"><i className="fas fa-file-lines" /> Admin</span><h1 className="sd-title">Proposals</h1><p className="sd-sub">Draft and share professional proposals.</p></div>
        <button className="sd-logout" onClick={() => nav('/admin/invoices')}><i className="fas fa-file-invoice-dollar" /> Invoices</button>
      </div></section>

      <section className="section"><div className="container ax-grid">
        <form className="ax-editor" onSubmit={save}>
          <div className="ax-editor__top"><h2 className="sd-h2">{form.id ? `Edit ${form.number}` : 'New proposal'}</h2>{form.id && <button type="button" className="ax-chip" onClick={reset}><i className="fas fa-plus" /> New</button>}</div>
          {msg && <div className={`ax-msg ax-msg--${msg.type}`}><i className={`fas fa-${msg.type === 'ok' ? 'circle-check' : 'circle-exclamation'}`} /> {msg.text}</div>}

          <div className="ax-card">
            <h3 className="ax-h3">Prepared for</h3>
            <div className="auth-field">
              <label>Saved client <span className="ax-hint">(autofills below)</span></label>
              <select value={form.client_id || ''} onChange={(e) => set('client_id', e.target.value)}>
                <option value="">— Enter manually —</option>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.company}</option>)}
              </select>
            </div>
            <div className="auth-row">
              <div className="auth-field"><label>Company</label><input value={form.company_name} onChange={(e) => set('company_name', e.target.value)} /></div>
              <div className="auth-field"><label>Contact</label><input value={form.contact_name} onChange={(e) => set('contact_name', e.target.value)} /></div>
            </div>
            <div className="auth-row">
              <div className="auth-field"><label>Email</label><input value={form.company_email} onChange={(e) => set('company_email', e.target.value)} /></div>
              <div className="auth-field"><label>Phone</label><input value={form.phone} onChange={(e) => set('phone', e.target.value)} /></div>
            </div>
            <div className="auth-row">
              <div className="auth-field"><label>Address</label><input value={form.company_address} onChange={(e) => set('company_address', e.target.value)} /></div>
              <div className="auth-field"><label>Date</label><input type="date" value={form.proposal_date || ''} onChange={(e) => set('proposal_date', e.target.value)} /></div>
            </div>
          </div>

          <div className="ax-card">
            <h3 className="ax-h3">Content</h3>
            <div className="auth-field"><label>Title (internal)</label><input value={form.title} onChange={(e) => set('title', e.target.value)} /></div>
            <div className="auth-field"><label>Subject</label><input value={form.subject} onChange={(e) => set('subject', e.target.value)} placeholder="Proposal for IOSH cohort delivery" /></div>
            <div className="auth-field"><label>Body</label><textarea rows={8} value={form.body} onChange={(e) => set('body', e.target.value)} placeholder="Your proposal narrative — scope, approach, deliverables…" /></div>
            <div className="auth-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="auth-field"><label>Currency</label><input value={form.currency} onChange={(e) => set('currency', e.target.value)} /></div>
              <div className="auth-field"><label>Status</label><select value={form.status} onChange={(e) => set('status', e.target.value)}><option value="draft">Draft</option><option value="sent">Sent</option><option value="accepted">Accepted</option><option value="declined">Declined</option></select></div>
            </div>
          </div>

          <div className="ax-card">
            <div className="ax-h3-row"><h3 className="ax-h3">Pricing <span className="ax-hint">(optional)</span></h3><button type="button" className="ax-chip" onClick={() => set('line_items', [...lines, blankLine()])}><i className="fas fa-plus" /> Add line</button></div>
            {lines.map((l, i) => (
              <div className="inv-line" key={i}>
                <input className="inv-line__desc" value={l.description} onChange={(e) => setLine(i, 'description', e.target.value)} placeholder="Item" />
                <input className="inv-line__num" type="number" value={l.qty} onChange={(e) => setLine(i, 'qty', e.target.value)} />
                <input className="inv-line__num" type="number" value={l.unitPrice} onChange={(e) => setLine(i, 'unitPrice', e.target.value)} />
                <span className="inv-line__amt">{money((Number(l.qty) || 0) * (Number(l.unitPrice) || 0), form.currency)}</span>
                <button type="button" className="ax-icon-btn ax-icon-btn--danger" onClick={() => set('line_items', lines.filter((_, idx) => idx !== i))}><i className="fas fa-xmark" /></button>
              </div>
            ))}
            {!!lines.length && <div className="inv-totals"><div className="inv-totals__grand"><span>Total</span><b>{money(total, form.currency)}</b></div></div>}
            <div className="auth-field" style={{ marginTop: 14 }}><label>Terms</label><textarea rows={2} value={form.terms} onChange={(e) => set('terms', e.target.value)} /></div>
          </div>

          <div className="ax-actions"><button className="auth-btn" disabled={busy}>{busy ? 'Saving…' : (form.id ? <><i className="fas fa-floppy-disk" /> Save proposal</> : <><i className="fas fa-plus" /> Create proposal</>)}</button></div>
        </form>

        <aside className="ax-list">
          <h2 className="sd-h2">Proposals {list && <span className="ax-count">{list.length}</span>}</h2>
          {!list && <p className="sd-empty"><i className="fas fa-spinner fa-spin" /> Loading…</p>}
          {list && !list.length && <p className="sd-empty">No proposals yet.</p>}
          {list && list.map((p) => (
            <div className={`ax-item${form.id === p.id ? ' ax-item--active' : ''}`} key={p.id}>
              <div className="ax-item__main"><b>{p.number} · <span className={`inv-pill inv-pill--${p.status}`}>{p.status}</span></b><span>{p.company_name || p.title || '—'}</span></div>
              <div className="ax-item__act">
                <a className="ax-icon-btn" href={studentApi.proposalPdfUrl(p.share_token)} target="_blank" rel="noreferrer" title="PDF"><i className="fas fa-file-pdf" /></a>
                <button className="ax-icon-btn" onClick={() => edit(p.id)} title="Edit"><i className="fas fa-pen" /></button>
                <button className="ax-icon-btn ax-icon-btn--danger" onClick={() => remove(p)} title="Delete"><i className="fas fa-trash" /></button>
              </div>
            </div>
          ))}
        </aside>
      </div></section>
    </main>
  );
}
