import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { studentApi } from '../lib/studentApi';

const money = (n, c) => `${c || ''} ${Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`.trim();
const fmt = (d) => (d ? new Date(d).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }) : '—');

export default function DocumentView({ kind }) {
  const { token } = useParams();
  const [doc, setDoc] = useState(null);
  const [state, setState] = useState('loading'); // loading | ok | notfound
  const isInvoice = kind === 'invoice';

  useEffect(() => {
    const fn = isInvoice ? studentApi.viewInvoice : studentApi.viewProposal;
    fn(token)
      .then((d) => { setDoc(isInvoice ? d.invoice : d.proposal); setState('ok'); })
      .catch(() => setState('notfound'));
  }, [token, isInvoice]);

  if (state === 'loading') return <main className="doc-page"><div className="sd-loading"><i className="fas fa-spinner fa-spin" /> Loading…</div></main>;
  if (state === 'notfound') return (
    <main className="doc-page"><div className="container"><div className="doc-sheet doc-sheet--empty">
      <i className="fas fa-circle-question" /><h1>Document not found</h1><p>This {kind} link is invalid or has been removed.</p>
    </div></div></main>
  );

  const pdfUrl = isInvoice ? studentApi.invoicePdfUrl(token) : studentApi.proposalPdfUrl(token);
  const lines = doc.line_items || [];

  return (
    <main className="doc-page">
      <div className="container doc-wrap">
        <div className="doc-bar">
          <span className="doc-bar__ref">{doc.number}</span>
          <a className="doc-bar__pdf" href={pdfUrl} target="_blank" rel="noreferrer"><i className="fas fa-file-pdf" /> Download PDF</a>
        </div>

        <article className="doc-sheet">
          <header className="doc-sheet__head">
            <div><div className="doc-brand">Ansar Mahmood</div><div className="doc-brand__sub">HSE Consultancy &amp; Training</div></div>
            <div className="doc-sheet__title">
              <h1>{isInvoice ? 'Invoice' : 'Proposal'}</h1>
              <span className="doc-ref">{doc.number}</span>
              {isInvoice && <span className={`inv-pill inv-pill--${doc.status}`}>{doc.status}</span>}
            </div>
          </header>
          <span className="doc-rule" />

          <div className="doc-meta">
            <div>
              <div className="doc-label">{isInvoice ? 'Bill To' : 'Prepared For'}</div>
              <div className="doc-party">{doc.company || doc.company_name || doc.bill_to_name || doc.contact_name || '—'}</div>
              <div className="doc-muted">
                {(doc.bill_to_name || doc.contact_name) && <>{doc.bill_to_name || doc.contact_name}<br /></>}
                {doc.company_address && <>{doc.company_address}<br /></>}
                {doc.company_email}{doc.phone ? ` · ${doc.phone}` : ''}
              </div>
            </div>
            <div className="doc-meta__right">
              <div><span className="doc-label">{isInvoice ? 'Invoice Date' : 'Date'}</span><b>{fmt(doc.invoice_date || doc.proposal_date)}</b></div>
              {isInvoice && <div><span className="doc-label">Due Date</span><b>{fmt(doc.due_date)}</b></div>}
              <div><span className="doc-label">Currency</span><b>{doc.currency}</b></div>
            </div>
          </div>

          {doc.subject && <h2 className="doc-subject">{doc.subject}</h2>}
          {doc.body && <p className="doc-body">{doc.body}</p>}
          {doc.title && isInvoice && <p className="doc-body"><b>{doc.title}</b></p>}

          {!!lines.length && (
            <table className="doc-items">
              <thead><tr><th>Description</th><th className="r">Qty</th><th className="r">Unit</th><th className="r">Amount</th></tr></thead>
              <tbody>
                {lines.map((l, i) => (
                  <tr key={i}>
                    <td>{l.description}</td>
                    <td className="r">{Number(l.qty) || 0}</td>
                    <td className="r">{money(l.unitPrice, doc.currency)}</td>
                    <td className="r">{money((Number(l.qty) || 0) * (Number(l.unitPrice) || 0), doc.currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!!lines.length && (
            <div className="doc-totals">
              {isInvoice && <><div><span>Subtotal</span><b>{money(doc.subtotal, doc.currency)}</b></div>
                <div><span>VAT ({doc.vat_percent || 0}%)</span><b>{money(doc.vat_amount, doc.currency)}</b></div></>}
              <div className="doc-totals__grand"><span>Total{isInvoice ? ' Due' : ''}</span><b>{money(doc.total, doc.currency)}</b></div>
            </div>
          )}

          {(doc.notes || doc.terms) && (
            <footer className="doc-foot">
              {doc.notes && <><div className="doc-foot__h">Notes</div><p>{doc.notes}</p></>}
              {doc.terms && <><div className="doc-foot__h">Terms</div><p>{doc.terms}</p></>}
            </footer>
          )}
        </article>
      </div>
    </main>
  );
}
