import { Link } from 'react-router-dom';
import Seo, { buildFaqSchema } from '../components/Seo';
import TrustedBy from '../components/TrustedBy';

const PACKAGES = [
  {
    tag: 'Entry',
    title: 'Starter Advisory',
    desc: 'A focused diagnostic and action plan for a specific HSE challenge.',
    benefits: ['HSE maturity diagnostic', 'Prioritised roadmap', 'Advisory call series'],
    cta: { label: 'Enquire', to: '/contact' },
  },
  {
    tag: 'Growth',
    title: 'Professional HSE Support',
    desc: 'Ongoing consultancy and training to build and embed your system.',
    benefits: [
      'Management system build-out',
      'Team training programme',
      'Audit & assurance support',
      'Monthly performance review',
    ],
    featured: true,
    cta: { label: 'Enquire', to: '/contact' },
  },
  {
    tag: 'Enterprise',
    title: 'Corporate Transformation',
    desc: 'A full safety & capability transformation across the organisation.',
    benefits: [
      'Org-wide system & culture',
      'Leadership safety programme',
      'Contractor management',
      'Executive dashboards',
    ],
    cta: { label: 'Enquire', to: '/contact' },
  },
  {
    tag: 'Digital',
    title: 'AI & Digital Safety',
    desc: 'Stand up your safety-intelligence stack: dashboards, analytics and AI tools.',
    benefits: ['Power BI dashboards', 'Predictive models', 'AI permit assistant'],
    cta: { label: 'Enquire', to: '/contact' },
  },
  {
    tag: 'Individual',
    title: 'Certification Coaching',
    desc: 'One-to-one preparation for CSP, ASP, CRSP, PMP and more.',
    benefits: ['Diagnostic + roadmap', 'Domain coaching + practice', 'Mentorship & accountability'],
    cta: { label: 'Explore', to: '/certification-coaching' },
  },
  {
    tag: 'Bespoke',
    title: 'Speaking & Workshops',
    desc: 'Keynotes, executive briefings and intensive workshops.',
    benefits: ['Conference keynotes', 'Leadership briefings', 'Intensive workshops'],
    cta: { label: 'Enquire', to: '/contact' },
  },
];

const FAQS = [
  {
    question: 'Why is pricing "on application"?',
    answer:
      'Every engagement is scoped to your industry, risk profile and objectives, so a fixed price list would be misleading. After a free scoping call you receive a clear, fixed proposal — no surprises.',
  },
  {
    question: 'How do I choose the right package?',
    answer:
      'Start with a free scoping call. We recommend the package that matches your stage — from a one-off Starter Advisory diagnostic through to full Corporate Transformation.',
  },
  {
    question: 'Can packages be combined or tailored?',
    answer:
      'Yes. Consultancy, training, certification coaching and AI & digital work can be delivered standalone or combined into a single tailored engagement.',
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function Pricing() {
  return (
    <>
      <Seo
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Packages & Pricing', url: '/pricing' },
        ]}
        service={{
          name: 'HSE Consulting, Training & AI Engagement Packages',
          description:
            'Structured engagement packages from Starter Advisory to Corporate Transformation, plus AI & digital safety, certification coaching and workshops.',
          slug: '/pricing',
          category: 'HSE Consulting',
        }}
        faqs={FAQS}
      />

      <section className="page-hero pricing-hero">
        <div className="page-hero__inner">
          <p className="page-hero__eyebrow">Engagement Packages</p>
          <h1 className="page-hero__title">Packages &amp; Pricing</h1>
          <p className="page-hero__subtitle">
            Choose the scope that fits your stage. Every package is tailored after a free scoping
            call — consultancy, training, certification coaching and AI &amp; digital, standalone or
            combined.
          </p>
        </div>
      </section>

      <section className="pricing-section">
        <div className="pricing-grid">
          {PACKAGES.map((pkg) => (
            <article
              key={pkg.title}
              className={`pricing-card${pkg.featured ? ' pricing-card--featured' : ''}`}
            >
              {pkg.featured && <span className="pricing-card__flag">Most Popular</span>}
              <span className="pricing-card__tag">{pkg.tag}</span>
              <h3 className="pricing-card__title">{pkg.title}</h3>
              <p className="pricing-card__desc">{pkg.desc}</p>
              <div className="pricing-card__price">On application</div>
              <ul className="pricing-card__list">
                {pkg.benefits.map((b) => (
                  <li key={b}>
                    <CheckIcon />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                to={pkg.cta.to}
                className={`pricing-card__btn${pkg.featured ? ' pricing-card__btn--gold' : ''}`}
              >
                {pkg.cta.label}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="pricing-how">
        <div className="pricing-how__inner">
          <h2 className="pricing-how__title">How pricing works</h2>
          <div className="pricing-faq">
            {FAQS.map((f) => (
              <div className="pricing-faq__item" key={f.question}>
                <h3 className="pricing-faq__q">{f.question}</h3>
                <p className="pricing-faq__a">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustedBy />

      <section className="pricing-cta">
        <div className="pricing-cta__inner">
          <p className="pricing-cta__eyebrow">Not sure which fits?</p>
          <h2 className="pricing-cta__title">Let&apos;s scope it together — free.</h2>
          <p className="pricing-cta__text">
            One call is usually enough to recommend the right package and the fastest path to
            results.
          </p>
          <div className="pricing-cta__actions">
            <Link to="/contact" className="pricing-cta__btn pricing-cta__btn--gold">
              Book a Consultation
            </Link>
            <Link to="/book-consultation" className="pricing-cta__btn pricing-cta__btn--ghost">
              Request a Callback
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
