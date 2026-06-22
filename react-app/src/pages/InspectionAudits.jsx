import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const SERVICES = [
  { icon: 'fa-magnifying-glass', title: 'Site & Workplace Inspections', text: 'Planned and unannounced site walks against a structured checklist — housekeeping, PPE, work-at-height, hot works, electrical, and high-risk activities — with photo-evidenced findings and ranked corrective actions.' },
  { icon: 'fa-clipboard-check', title: 'ISO Management-System Audits', text: 'Internal and pre-certification audits to ISO 45001, ISO 14001, and ISO 9001 by a qualified Lead Auditor — nonconformities, opportunities for improvement, and a clear route to certification.' },
  { icon: 'fa-list-check', title: 'Gap Analysis & Readiness', text: 'A baseline assessment of where you are versus the standard or regulation, scored by clause, with a prioritised roadmap and realistic timeline to close every gap before the certification body arrives.' },
  { icon: 'fa-people-carry-box', title: 'Contractor & Supplier Audits', text: 'Second-party audits of contractors and suppliers — pre-qualification, on-site verification, and ongoing performance checks so your supply chain meets the same standard you hold yourself to.' },
  { icon: 'fa-fire-extinguisher', title: 'Fire & Electrical Inspections', text: 'Fire-safety and electrical-safety inspections aligned to NFPA and local codes — life-safety systems, means of escape, and arc-flash/electrical risk — protecting people, assets, and continuity.' },
  { icon: 'fa-file-shield', title: 'Audit Reporting & Dashboards', text: 'Board-ready audit reports plus live Power BI dashboards that turn inspection and audit data into trends, compliance scores, and accountability — so findings actually get closed.' },
];

const PROCESS = [
  { n: '01', title: 'Scope & plan', text: 'We agree objectives, standard, sites and sampling — then issue an audit/inspection plan and schedule.' },
  { n: '02', title: 'Conduct on site', text: 'Structured, evidence-based fieldwork — interviews, observation, and document review against the criteria.' },
  { n: '03', title: 'Report & rank', text: 'A clear report: findings ranked by risk, root cause noted, with practical, prioritised corrective actions.' },
  { n: '04', title: 'Close & verify', text: 'We track actions to closure and re-verify — and can feed everything into a live compliance dashboard.' },
];

export default function InspectionAudits() {
  useEffect(() => { document.title = 'Inspection & Audits | Ansar Mahmood — ISO 45001/14001/9001 Lead Auditor'; }, []);

  return (
    <>
      <section className="page-hero page-hero--gradient">
        <div className="page-hero__pattern" aria-hidden="true"></div>
        <i className="page-hero__icon-bg fas fa-clipboard-check" aria-hidden="true"></i>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span className="breadcrumb__sep"><i className="fas fa-chevron-right"></i></span>
            <Link to="/services">Services</Link><span className="breadcrumb__sep"><i className="fas fa-chevron-right"></i></span>
            <span className="breadcrumb__current">Inspection &amp; Audits</span>
          </nav>
          <div className="page-hero__content">
            <span className="eyebrow eyebrow--white">Independent Assurance</span>
            <h1>Inspections &amp; Audits That Prove — and Improve — Your Safety Performance</h1>
            <p>Independent site inspections and management-system audits by a certified ISO Lead Auditor with 20 years on the front line. Find the real risks, satisfy the standard, and turn findings into measurable improvement.</p>
            <div className="page-hero__actions">
              <Link to="/book-consultation" className="btn btn-gold btn-lg"><i className="fas fa-calendar-check"></i> Book an audit conversation</Link>
              <Link to="/contact" className="btn btn-outline-white btn-lg">Request a quote</Link>
            </div>
            <div className="page-hero__stats">
              <div className="page-hero-stat"><span className="page-hero-stat__num">45001</span><span className="page-hero-stat__label">ISO Lead Auditor</span></div>
              <div className="page-hero-stat"><span className="page-hero-stat__num">10+</span><span className="page-hero-stat__label">Countries Audited</span></div>
              <div className="page-hero-stat"><span className="page-hero-stat__num">500+</span><span className="page-hero-stat__label">Inspections Delivered</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow eyebrow--center">What's Included</span>
            <h2>Full-spectrum inspection &amp; audit capability</h2>
            <p>From a single site walk to a multi-site ISO certification programme — one Lead Auditor across the whole journey.</p>
          </div>
          <div className="grid grid-3" style={{ gap: 24 }}>
            {SERVICES.map((s) => (
              <div className="feature-card reveal" key={s.title}>
                <div className="feature-card__icon"><i className={`fas ${s.icon}`}></i></div>
                <h4 className="feature-card__title">{s.title}</h4>
                <p className="feature-card__desc">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow eyebrow--center">How It Works</span>
            <h2>A clear, evidence-based process</h2>
            <p>Rigorous where it matters, practical throughout — and findings that actually get closed.</p>
          </div>
          <div className="grid grid-4" style={{ gap: 22 }}>
            {PROCESS.map((p) => (
              <div className="ia-step reveal" key={p.n}>
                <span className="ia-step__n">{p.n}</span>
                <h4 className="ia-step__title">{p.title}</h4>
                <p className="ia-step__text">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner section" aria-labelledby="ia-cta">
        <div className="container">
          <div className="cta-banner__content">
            <span className="eyebrow eyebrow--white">Ready When You Are</span>
            <h2 id="ia-cta">Know exactly where you stand — <em className="em">before the regulator does.</em></h2>
            <p>Book a short call to scope an inspection or audit, or to plan your route to ISO certification.</p>
            <div className="cta-banner__actions">
              <Link to="/book-consultation" className="btn btn-gold btn-xl"><i className="fas fa-calendar-check"></i> Book a 30-min call</Link>
              <Link to="/request-quote" className="btn btn-outline-white btn-xl"><i className="fas fa-file-invoice"></i> Request a Quote</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
