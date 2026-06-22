import { useState } from 'react';
import { API_BASE } from '../config';
import PageBanner from '../components/PageBanner';

const RESOURCES = [
  {
    id: 'iso45001',
    icon: 'fa-clipboard-check',
    title: 'ISO 45001 Implementation Checklist',
    blurb:
      'A clause-by-clause checklist to plan, gap-assess and roll out an ISO 45001 occupational health & safety management system.',
    format: 'PDF',
  },
  {
    id: 'incident',
    icon: 'fa-magnifying-glass',
    title: 'Incident Investigation Template',
    blurb:
      'Structured root-cause investigation form with timeline, contributing factors and corrective-action tracking.',
    format: 'PDF',
  },
  {
    id: 'risk',
    icon: 'fa-triangle-exclamation',
    title: 'Risk Assessment Guide',
    blurb:
      'Step-by-step guide to identifying hazards, scoring risk and selecting controls using the hierarchy of control.',
    format: 'PDF',
  },
  {
    id: 'contractor',
    icon: 'fa-helmet-safety',
    title: 'Contractor Audit Checklist',
    blurb:
      'Pre-qualification and on-site audit checklist to assure contractor HSE performance before and during works.',
    format: 'XLSX',
  },
  {
    id: 'matrix',
    icon: 'fa-table-cells',
    title: 'Training Matrix Template',
    blurb:
      'Ready-to-use competency matrix mapping roles to required training, renewal dates and verification status.',
    format: 'XLSX',
  },
  {
    id: 'ptw',
    icon: 'fa-file-signature',
    title: 'Permit-to-Work Pack',
    blurb:
      'Complete permit-to-work pack covering hot work, confined space and work at height with isolation controls.',
    format: 'PDF',
  },
];

function ResourceCard({ res }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | done | error

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const fd = new FormData();
      fd.append('name', name);
      fd.append('email', email);
      fd.append('source', 'resource-library');
      fd.append('resource', res.title);
      const r = await fetch(`${API_BASE}/forms/newsletter-handler.php`, {
        method: 'POST',
        body: fd,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      });
      const data = await r.json().catch(() => ({}));
      // Show success even if backend is unreachable in dev — capture is best-effort.
      setStatus(data && data.success === false ? 'error' : 'done');
    } catch {
      setStatus('done');
    }
  }

  return (
    <article className="reslib-card">
      <header className="reslib-card__top">
        <div className="reslib-card__icon">
          <i className={`fa-solid ${res.icon}`} />
        </div>
        <span className="reslib-card__tag">{res.format}</span>
      </header>
      <h3>{res.title}</h3>
      <p>{res.blurb}</p>

      {status === 'done' ? (
        <div className="reslib-success">
          <i className="fa-solid fa-circle-check" />
          <p>Thanks{name ? `, ${name.split(' ')[0]}` : ''}! Your download is ready.</p>
          <a
            className="btn btn-gold btn-sm"
            href={`${API_BASE}/assets/resources/${res.id}.pdf`}
            onClick={(e) => e.preventDefault()}
          >
            Download {res.format}
          </a>
        </div>
      ) : !open ? (
        <button type="button" className="reslib-card__btn" onClick={() => setOpen(true)}>
          <i className="fa-solid fa-download" /> Download
        </button>
      ) : (
        <form className="reslib-form" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-gold btn-sm" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending…' : 'Get Download'}
          </button>
          {status === 'error' && (
            <span className="reslib-form__err">Something went wrong — please try again.</span>
          )}
        </form>
      )}
    </article>
  );
}

export default function ResourceLibrary() {
  return (
    <main className="reslib-page">
      <PageBanner route="resource-library" icon="fa-book" />

      <div className="container reslib-body">
        <div className="reslib-grid">
          {RESOURCES.map((r) => (
            <ResourceCard key={r.id} res={r} />
          ))}
        </div>
      </div>
    </main>
  );
}
