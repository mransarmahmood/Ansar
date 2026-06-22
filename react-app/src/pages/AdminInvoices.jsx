import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { studentApi } from '../lib/studentApi';

const blankLine = () => ({ description: '', qty: 1, unitPrice: 0 });
const blank = () => ({
  id: null, client_id: '', title: '', company: '', bill_to_name: '', company_address: '', company_email: '', phone: '',
  invoice_date: new Date().toISOString().slice(0, 10), due_date: '', currency: 'USD', vat_percent: 0,
  status: 'draft', notes: '', terms: '', line_items: [blankLine()], number: '', share_token: '',
  amount_paid: 0, balance: 0, payments: [],
});
const money = (n, c) => `${c || ''} ${Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`.trim();

export default function AdminInvoices() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [list, setList] = useState(null);
  const [clients, setClients] = useState([]);
  const [summary, setSummary] = useState(null);
  const [form, setForm] = useState(blank);
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);
  const [pay, setPay] = useState({ amount: '', paid_on: new Date().toISOString().slice(0, 10), method: 'Bank transfer', reference: '' });

  useEffect(() => { if (!loading && !user) nav('/login', { replace: true }); }, [loading, user, nav]);
  const reload = useCallback(() => {
    studentApi.adminListInvoices().then((d) => setList(d.invoices || []))
      .catch((e) => setMsg({ type: 'err', text: e.status === 403 ? 'Admin access required.' : 'Could not load invoices.' }));
    studentApi.adminBillingSummary().then(setSummary).catch(() => {});
    studentApi.adminListClients().then((d) => setClients(d.clients || [])).catch(() => {});
  }, []);
  useEffect(() => { if (user) reload(); }, [user, reload]);

  if (loading) return <main className="auth-page"><div className="sd-loading"><i className="fas fa-spinner fa-spin" /> Loading…</div></main>;
  if (!user) return null;
  if (user.role !== 'admin') return <main className="auth-page"><div className="auth-card" style={{ maxWidth: 460 }}><h1 className="auth-title">Admins only</h1></div></main>;

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));
  const lines = form.line_items;
  const setLine = (i, k, v) => set('line_items', lines.map((l, idx) => idx === i ? { ...l, [k]: v } : l));
  const addLine = () => set('line_items', [...lines, blankLine()]);
  const delLine = (i) => set('line_items', lines.length > 1 ? lines.filter((_, idx) => idx !== i) : lines);
  const subtotal = lines.reduce((s, l) => s + (Number(l.qty) || 0) * (Number(l.unitPrice) || 0), 0);
  const vat = subtotal * (Number(form.vat_percent) || 0) / 100;
  const total = subtotal + vat;

  async function edit(id) {
    try { const d = await studentApi.adminGetInvoice(id); setForm({ ...blank(), ...d.invoice, line_items: d.invoice.line_items?.length ? d.invoice.line_items : [blankLine()] }); setMsg(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    catch { setMsg({ type: 'err', text: 'Could not load invoice.' }); }
  }
  function reset() { setForm(blank()); setMsg(null); }

  async function addPayment(e) {
    e.preventDefault();
    try {
      const d = await studentApi.adminAddPayment(form.id, { ...pay, amount: Number(pay.amount) });
      setForm((s) => ({ ...s, ...d.invoice }));
      setPay({ amount: '', paid_on: new Date().toISOString().slice(0, 10), method: 'Bank transfer', reference: '' });
      reload();
    } catch (ex) { setMsg({ type: 'err', text: ex.message || 'Could not record payment.' }); }
  }
  async function delPayment(pid) {
    try { const d = await studentApi.adminDeletePayment(form.id, pid); setForm((s) => ({ ...s, ...d.invoice })); reload(); }
    catch (ex) { setMsg({ type: 'err', text: ex.message }); }
  }

  async function save(e) {
    e.preventDefault(); setMsg(null);
    const body = { ...form };
    delete body.id; delete body.number; delete body.share_token;
    delete body.amount_paid; delete body.balance; delete body.payments;
    if (!body.due_date) delete body.due_date;
    if (!body.client_id) delete body.client_id;
    setBusy(true);
    try {
      if (form.id) await studentApi.adminUpdateInvoice(form.id, body);
      else await studentApi.adminCreateInvoice(body);
      reset(); setMsg({ type: 'ok', text: 'Invoice saved.' }); reload();
    } catch (ex) { setMsg({ type: 'err', text: ex.message || 'Save failed.' }); }
    finally { setBusy(false); }
  }
  async function remove(inv) {
    if (!window.confirm(`Delete ${inv.number}?`)) return;
    try { await studentApi.adminDeleteInvoice(inv.id); reload(); if (form.id === inv.id) reset(); } catch (e) { setMsg({ type: 'err', text: e.message }); }
  }

  return (
    <main className="sd-page">
      <section className="sd-hero"><div className="container sd-hero__inner">
        <div><span className="sd-eyebrow"><i className="fas fa-file-invoice-dollar" /> Admin</span><h1 className="sd-title">Invoices</h1><p className="sd-sub">Create, send and track client invoices.</p></div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="sd-logout" onClick={() => nav('/admin/clients')}><i className="fas fa-address-book" /> Clients</button>
          <button className="sd-logout" onClick={() => nav('/admin/proposals')}><i className="fas fa-file-lines" /> Proposals</button>
          <button className="sd-logout" onClick={() => nav('/admin/quotations')}><i className="fas fa-inbox" /> Quote Requests</button>
        </div>
      </div></section>

      {summary && (
        <section className="section" style={{ paddingBottom: 0 }}><div className="container">
          <div className="bill-tiles">
            <div className="bill-tile"><span>Invoiced</span><b>{money(summary.invoiced, 'USD')}</b></div>
            <div className="bill-tile bill-tile--ok"><span>Paid</span><b>{money(summary.paid, 'USD')}</b></div>
            <div className="bill-tile bill-tile--warn"><span>Outstanding</span><b>{money(summary.outstanding, 'USD')}</b></div>
            <div className="bill-tile"><span>Invoices</span><b>{summary.count}</b></div>
          </div>
        </div></section>
      )}

      <section className="section"><div className="container ax-grid">
        <form className="ax-editor" onSubmit={save}>
          <div className="ax-editor__top"><h2 className="sd-h2">{form.id ? `Edit ${form.number}` : 'New invoice'}</h2>{form.id && <button type="button" className="ax-chip" onClick={reset}><i className="fas fa-plus" /> New</button>}</div>
          {msg && <div className={`ax-msg ax-msg--${msg.type}`}><i className={`fas fa-${msg.type === 'ok' ? 'circle-check' : 'circle-exclamation'}`} /> {msg.text}</div>}

          <div className="ax-card">
            <h3 className="ax-h3">Bill to</h3>
            <div className="auth-field">
              <label>Saved client <span className="ax-hint">(autofills the details below)</span></label>
              <select value={form.client_id || ''} onChange={(e) => set('client_id', e.target.value)}>
                <option value="">— Enter manually —</option>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.company}</option>)}
              </select>
            </div>
            <div className="auth-row">
              <div className="auth-field"><label>Company</label><input value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="Acme Industries Ltd" /></div>
              <div className="auth-field"><label>Contact name</label><input value={form.bill_to_name} onChange={(e) => set('bill_to_name', e.target.value)} placeholder="Lara Hamid" /></div>
            </div>
            <div className="auth-row">
              <div className="auth-field"><label>Email</label><input value={form.company_email} onChange={(e) => set('company_email', e.target.value)} /></div>
              <div className="auth-field"><label>Phone</label><input value={form.phone} onChange={(e) => set('phone', e.target.value)} /></div>
            </div>
            <div className="auth-field"><label>Address</label><input value={form.company_address} onChange={(e) => set('company_address', e.target.value)} /></div>
          </div>

          <div className="ax-card">
            <h3 className="ax-h3">Details</h3>
            <div className="auth-field"><label>Title / reference</label><input value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="IOSH Managing Safely cohort" /></div>
            <div className="auth-row">
              <div className="auth-field"><label>Invoice date</label><input type="date" value={form.invoice_date || ''} onChange={(e) => set('invoice_date', e.target.value)} /></div>
              <div className="auth-field"><label>Due date</label><input type="date" value={form.due_date || ''} onChange={(e) => set('due_date', e.target.value)} /></div>
            </div>
            <div className="auth-row" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
              <div className="auth-field"><label>Currency</label><input value={form.currency} onChange={(e) => set('currency', e.target.value)} /></div>
              <div className="auth-field"><label>VAT %</label><input type="number" value={form.vat_percent} onChange={(e) => set('vat_percent', e.target.value)} /></div>
              <div className="auth-field"><label>Status</label>
                <select value={form.status} onChange={(e) => set('status', e.target.value)}><option value="draft">Draft</option><option value="sent">Sent</option><option value="paid">Paid</option><option value="void">Void</option></select>
              </div>
            </div>
          </div>

          <div className="ax-card">
            <div className="ax-h3-row"><h3 className="ax-h3">Line items</h3><button type="button" className="ax-chip" onClick={addLine}><i className="fas fa-plus" /> Add line</button></div>
            {lines.map((l, i) => (
              <div className="inv-line" key={i}>
                <input className="inv-line__desc" value={l.description} onChange={(e) => setLine(i, 'description', e.target.value)} placeholder="Description" />
                <input className="inv-line__num" type="number" value={l.qty} onChange={(e) => setLine(i, 'qty', e.target.value)} placeholder="Qty" />
                <input className="inv-line__num" type="number" value={l.unitPrice} onChange={(e) => setLine(i, 'unitPrice', e.target.value)} placeholder="Unit" />
                <span className="inv-line__amt">{money((Number(l.qty) || 0) * (Number(l.unitPrice) || 0), form.currency)}</span>
                <button type="button" className="ax-icon-btn ax-icon-btn--danger" onClick={() => delLine(i)} disabled={lines.length <= 1}><i className="fas fa-xmark" /></button>
              </div>
            ))}
            <div className="inv-totals">
              <div><span>Subtotal</span><b>{money(subtotal, form.currency)}</b></div>
              <div><span>VAT ({Number(form.vat_percent) || 0}%)</span><b>{money(vat, form.currency)}</b></div>
              <div className="inv-totals__grand"><span>Total</span><b>{money(total, form.currency)}</b></div>
            </div>
          </div>

          {form.id && (
            <div className="ax-card">
              <div className="ax-h3-row">
                <h3 className="ax-h3">Payments</h3>
                <a className="ax-chip" href={studentApi.invoiceReceiptUrl(form.share_token)} target="_blank" rel="noreferrer" style={{ background: 'var(--gold-dark,#14662B)' }}><i className="fas fa-receipt" /> Receipt PDF</a>
              </div>
              <div className="pay-bal">
                <div><span>Paid</span><b className="pay-bal__ok">{money(form.amount_paid, form.currency)}</b></div>
                <div><span>Balance due</span><b className={form.balance > 0 ? 'pay-bal__warn' : 'pay-bal__ok'}>{money(form.balance, form.currency)}</b></div>
              </div>
              {(form.payments || []).map((p) => (
                <div className="pay-row" key={p.id}>
                  <span className="pay-row__amt">{money(p.amount, form.currency)}</span>
                  <span className="pay-row__meta">{p.paid_on} · {p.method}{p.reference ? ` · ${p.reference}` : ''}</span>
                  <button type="button" className="ax-icon-btn ax-icon-btn--danger" onClick={() => delPayment(p.id)}><i className="fas fa-xmark" /></button>
                </div>
              ))}
              <div className="pay-add">
                <input type="number" placeholder="Amount" value={pay.amount} onChange={(e) => setPay((s) => ({ ...s, amount: e.target.value }))} />
                <input type="date" value={pay.paid_on} onChange={(e) => setPay((s) => ({ ...s, paid_on: e.target.value }))} />
                <select value={pay.method} onChange={(e) => setPay((s) => ({ ...s, method: e.target.value }))}><option>Bank transfer</option><option>Card</option><option>Cash</option><option>Cheque</option><option>Other</option></select>
                <input placeholder="Reference" value={pay.reference} onChange={(e) => setPay((s) => ({ ...s, reference: e.target.value }))} />
                <button type="button" className="ax-chip" onClick={addPayment} disabled={!Number(pay.amount)}><i className="fas fa-plus" /> Record</button>
              </div>
            </div>
          )}

          <div className="ax-card">
            <div className="auth-field"><label>Notes</label><textarea rows={2} value={form.notes} onChange={(e) => set('notes', e.target.value)} /></div>
            <div className="auth-field"><label>Terms</label><textarea rows={2} value={form.terms} onChange={(e) => set('terms', e.target.value)} /></div>
          </div>

          <div className="ax-actions"><button className="auth-btn" disabled={busy}>{busy ? 'Saving…' : (form.id ? <><i className="fas fa-floppy-disk" /> Save invoice</> : <><i className="fas fa-plus" /> Create invoice</>)}</button></div>
        </form>

        <aside className="ax-list">
          <h2 className="sd-h2">Invoices {list && <span className="ax-count">{list.length}</span>}</h2>
          {!list && <p className="sd-empty"><i className="fas fa-spinner fa-spin" /> Loading…</p>}
          {list && !list.length && <p className="sd-empty">No invoices yet.</p>}
          {list && list.map((inv) => (
            <div className={`ax-item${form.id === inv.id ? ' ax-item--active' : ''}`} key={inv.id}>
              <div className="ax-item__main">
                <b>{inv.number} · <span className={`inv-pill inv-pill--${inv.status}`}>{inv.status}</span></b>
                <span>{inv.company || '—'} · {money(inv.total, inv.currency)}</span>
              </div>
              <div className="ax-item__act">
                <a className="ax-icon-btn" href={studentApi.invoicePdfUrl(inv.share_token)} target="_blank" rel="noreferrer" title="PDF"><i className="fas fa-file-pdf" /></a>
                <button className="ax-icon-btn" onClick={() => edit(inv.id)} title="Edit"><i className="fas fa-pen" /></button>
                <button className="ax-icon-btn ax-icon-btn--danger" onClick={() => remove(inv)} title="Delete"><i className="fas fa-trash" /></button>
              </div>
            </div>
          ))}
        </aside>
      </div></section>
    </main>
  );
}
