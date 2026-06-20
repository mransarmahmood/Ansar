import { Link } from 'react-router-dom';
import InvestmentCard from './InvestmentCard';
import ComparisonTable from './ComparisonTable';
import StickyMobileCTA from './StickyMobileCTA';

export default function ServiceEnhancements({
  investment,
  comparison,
  riskReversal = true,
  whatsappNumber = '966534852341',
  ctaLabel = 'Free 30-min strategy call',
}) {
  return (
    <>
      <section className="section section-gray" aria-label="Investment guidance and comparison">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.95fr)', gap: 40, alignItems: 'start' }} className="enhance-grid">
            {investment && (
              <InvestmentCard
                eyebrow={investment.eyebrow || 'Investment Guidance'}
                range={investment.range}
                description={investment.description}
                entryNote={investment.entryNote}
              />
            )}

            {riskReversal && (
              <div className="risk-reversal reveal">
                <div className="risk-reversal__icon"><i className="fas fa-shield-alt"></i></div>
                <div>
                  <div className="risk-reversal__title">No-risk first conversation</div>
                  <p>30 minutes. No cost. No obligation. If we're not the right fit, Ansar will point you to who is — including a short list of trusted peers.</p>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 14 }}>
                    <Link to="/book-consultation" className="btn btn-gold btn-sm">
                      <i className="fas fa-calendar-check"></i> Book Free Consultation
                    </Link>
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=Hi%20Ansar%20%E2%80%94%20I%27d%20like%20to%20discuss%20a%20project`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-navy btn-sm"
                    >
                      <i className="fab fa-whatsapp" style={{ color: '#25D366' }}></i> WhatsApp Ansar
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {comparison && (
            <div style={{ marginTop: 64 }}>
              <div className="section-header reveal" style={{ marginBottom: 32 }}>
                <span className="eyebrow">How Ansar Compares</span>
                <h2 className="display">
                  Generalist consultant vs. <em className="em">specialised practitioner.</em>
                </h2>
                <p>Most safety advisors specialise in one thing. Ansar combines field experience, lead-auditor credentials, and modern digital fluency — so a single advisor can take an engagement end-to-end.</p>
              </div>
              <ComparisonTable
                headers={comparison.headers}
                rows={comparison.rows}
                winnerIndex={comparison.winnerIndex ?? 2}
              />
            </div>
          )}
        </div>
      </section>

      <StickyMobileCTA label={ctaLabel} />

      <style>{`
        @media (max-width: 1024px) {
          .enhance-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
