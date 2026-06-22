import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { studentApi } from '../lib/studentApi';

const blank = () => ({ id: null, company: '', contact_name: '', email: '', phone: '', address: '', notes: '' });

export default function AdminClients() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [list, setList] = useState(null);
  const [form, setForm] = useState(blank);
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (!loading && !user) nav('/login', { replace: true }); }, [loading, user, nav]);
  const reload = useCallback(() => {
    studentApi.adminListClients().then((d) => setList(d.clients || []))
      .catch((e) => setMsg({ type: 'err', text: e.status === 403 ? 'Admin access required.' : 'Could not load clients.' }));
  }, []);
  useEffect(() => { if (user) reload(); }, [user, reload]);

  if (loading) return <main className="auth-page"><div className="sd-loading"><i className="fas fa-spinner fa-spin" /> Loading…</div></main>;
  if (!user) return null;
  if (user.role !== 'admin') return <main className="auth-page"><div className="auth-card" style={{ maxWidth: 460 }}><h1 className="auth-title">Admins only</h1></div></main>;

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));
  function reset() { setForm(blank()); setMsg(null); }
  function edit(c) { setForm({ ...blank(), ...c }); setMsg(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }

  async function save(e) {
    e.preventDefault(); setMsg(null);
    const body = { company: form.company, contact_name: form.contact_name, email: form.email, phone: form.phone, address: form.address, notes: form.notes };
    setBusy(true);
    try {
      if (form.id) await studentApi.adminUpdateClient(form.id, body); else await studentApi.adminCreateClient(body);
      reset(); setMsg({ type: 'ok', text: 'Client saved.' }); reload();
    } catch (ex) { setMsg({ type: 'err', text: ex.message || 'Save failed.' }); } finally { setBusy(false); }
  }
  async function remove(c) {
    if (!window.confirm(`Delete ${c.company}? Their invoices/proposals stay but are unlinked.`)) return;
    try { await studentApi.adminDeleteClient(c.id); reload(); if (form.id === c.id) reset(); } catch (e) { setMsg({ type: 'err', text: e.message }); }
  }

  return (
    <main className="sd-page">
      <section className="sd-hero"><div className="container sd-hero__inner">
        <div><span className="sd-eyebrow"><i className="fas fa-address-book" /> Admin</span><h1 className="sd-title">Clients</h1><p className="sd-sub">Your client &amp; company directory.</p></div>
        <button className="sd-logout" onClick={() => nav('/admin/invoices')}><i className="fas fa-file-invoice-dollar" /> Invoices</button>
      </div></section>

      <section className="section"><div className="container ax-grid">
        <form className="ax-editor" onSubmit={save}>
          <div className="ax-editor__top"><h2 className="sd-h2">{form.id ? 'Edit client' : 'New client'}</h2>{form.id && <button type="button" className="ax-chip" onClick={reset}><i className="fas fa-plus" /> New</button>}</div>
          {msg && <div className={`ax-msg ax-msg--${msg.type}`}><i className={`fas fa-${msg.type === 'ok' ? 'circle-check' : 'circle-exclamation'}`} /> {msg.text}</div>}
          <div className="ax-card">
            <div className="auth-field"><label>Company *</label><input value={form.company} onChange={(e) => set('company', e.target.value)} required /></div>
            <div className="auth-row">
              <div className="auth-field"><label>Contact</label><input value={form.contact_name} onChange={(e) => set('contact_name', e.target.value)} /></div>
              <div className="auth-field"><label>Email</label><input value={form.email} onChange={(e) => set('email', e.target.value)} /></div>
            </div>
            <div className="auth-row">
              <div className="auth-field"><label>Phone</label><input value={form.phone} onChange={(e) => set('phone', e.target.value)} /></div>
              <div className="auth-field"><label>Address</label><input value={form.address} onChange={(e) => set('address', e.target.value)} /></div>
            </div>
            <div className="auth-field"><label>Notes</label><textarea rows={2} value={form.notes} onChange={(e) => set('notes', e.target.value)} /></div>
          </div>
          <div className="ax-actions"><button className="auth-btn" disabled={busy}>{busy ? 'Saving…' : (form.id ? <><i className="fas fa-floppy-disk" /> Save client</> : <><i className="fas fa-plus" /> Add client</>)}</button></div>
        </form>

        <aside className="ax-list">
          <h2 className="sd-h2">Directory {list && <span className="ax-count">{list.length}</span>}</h2>
          {!list && <p className="sd-empty"><i className="fas fa-spinner fa-spin" /> Loading…</p>}
          {list && !list.length && <p className="sd-empty">No clients yet.</p>}
          {list && list.map((c) => (
            <div className={`ax-item${form.id === c.id ? ' ax-item--active' : ''}`} key={c.id}>
              <div className="ax-item__main"><b>{c.company}</b><span>{c.contact_name || c.email || '—'} · {c.invoices_count || 0} inv · {c.proposals_count || 0} prop</span></div>
              <div className="ax-item__act">
                <button className="ax-icon-btn" onClick={() => edit(c)} title="Edit"><i className="fas fa-pen" /></button>
                <button className="ax-icon-btn ax-icon-btn--danger" onClick={() => remove(c)} title="Delete"><i className="fas fa-trash" /></button>
              </div>
            </div>
          ))}
        </aside>
      </div></section>
    </main>
  );
}
