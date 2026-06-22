import { Link } from 'react-router-dom';
import { asset } from '../utils/asset';

const CREDS = ['CMIOSH', 'ISO 45001 Lead Auditor', 'OSHA Professional', 'Microsoft Power BI', 'Safety AI Specialist'];

const PROOF = [
  { n: '20', s: 'yrs', l: 'On the front line' },
  { n: '10+', s: '', l: 'Countries delivered' },
  { n: '10k+', s: '', l: 'Professionals trained' },
];

export default function AuthorityBand() {
  return (
    <section className="auth-band" aria-labelledby="auth-band-heading">
      <div className="container auth-band__inner">
        {/* visual */}
        <div className="auth-band__media">
          <div className="auth-band__photo">
            <img src={asset('assets/images/ansar-onsite.jpg')} alt="Ansar Mahmood on a major project site" loading="lazy" decoding="async" />
            <span className="auth-band__sheen" aria-hidden="true" />
          </div>
          <div className="auth-band__badge">
            <i className="fas fa-shield-halved" />
            <div><b>Giga-project trusted</b><span>Red Sea Global · Al-Futtaim · NOBLE</span></div>
          </div>
          <div className="auth-band__stat">
            <b>11M+</b><span>LTI-free man-hours delivered on site</span>
          </div>
        </div>

        {/* copy */}
        <div className="auth-band__body">
          <span className="auth-band__eyebrow"><i className="fas fa-user-shield" /> Meet Your Advisor</span>
          <h2 id="auth-band-heading" className="auth-band__title">
            I turn safety from a cost centre into a <em>competitive advantage.</em>
          </h2>
          <p className="auth-band__lead">
            I'm <b>Ansar Mahmood</b> — an HSE consultant, internationally certified trainer, and digital-solutions
            specialist with two decades on real sites in oil &amp; gas, construction, and giga-projects across 10+ countries.
            I bring frontline credibility, accredited training, and modern AI &amp; analytics into one trusted partnership.
          </p>

          <div className="auth-band__creds">
            {CREDS.map((c) => <span className="auth-band__cred" key={c}><i className="fas fa-circle-check" /> {c}</span>)}
          </div>

          <div className="auth-band__proof">
            {PROOF.map((p) => (
              <div className="auth-band__proof-item" key={p.l}>
                <b>{p.n}<i>{p.s}</i></b><span>{p.l}</span>
              </div>
            ))}
          </div>

          <div className="auth-band__cta">
            <Link to="/book-consultation" className="btn btn-gold btn-lg"><i className="fas fa-calendar-check" /> Book a 30-min call</Link>
            <Link to="/about" className="auth-band__story">Read my story <i className="fas fa-arrow-right" /></Link>
          </div>
          <span className="auth-band__sign">Ansar Mahmood</span>
        </div>
      </div>
    </section>
  );
}
