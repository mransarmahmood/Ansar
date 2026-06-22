import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { asset } from '../utils/asset';

const TIMELINE = [
  {
    year: 'The Frontline',
    title: 'Two decades on real sites',
    body: 'I started where safety actually happens — on oil & gas, construction, and infrastructure sites across 10+ countries. Mud, scaffolding, permits, toolbox talks. That field experience is the foundation everything else is built on.',
  },
  {
    year: 'The Trainer',
    title: 'Coaching thousands to certification',
    body: 'I became an internationally certified trainer and ISO 45001 Lead Auditor, helping over 10,000 professionals earn IOSH, OSHA, NEBOSH and Lead Auditor credentials — with a near-perfect first-attempt pass rate.',
  },
  {
    year: 'The Digital Shift',
    title: 'Bringing AI & analytics to HSE',
    body: 'Today I fuse hands-on consulting with Power BI dashboards, safety AI agents, and digital HSE systems — turning compliance paperwork into live, decision-grade intelligence that leaders actually use.',
  },
];

const CREDS = [
  { icon: 'fa-award', label: 'CMIOSH', sub: 'Chartered Member, IOSH' },
  { icon: 'fa-clipboard-check', label: 'ISO 45001 Lead Auditor', sub: '45001 / 14001 / 9001' },
  { icon: 'fa-helmet-safety', label: 'OSHA Professional', sub: 'US & international' },
  { icon: 'fa-graduation-cap', label: 'NEBOSH / IOSH', sub: 'Accredited training' },
  { icon: 'fa-chart-column', label: 'Microsoft Power BI', sub: 'HSE analytics' },
  { icon: 'fa-robot', label: 'Safety AI Specialist', sub: 'Automation & agents' },
  { icon: 'fa-earth-americas', label: '10+ Countries', sub: 'Global delivery' },
  { icon: 'fa-users', label: '10,000+ Trained', sub: 'Professionals coached' },
];

const NUMBERS = [
  { n: '20', s: 'yrs', l: 'On the front line' },
  { n: '10+', s: '', l: 'Countries delivered' },
  { n: '500+', s: '', l: 'Projects supported' },
  { n: '10k+', s: '', l: 'Professionals trained' },
  { n: '97%', s: '+', l: 'First-attempt pass rate' },
];

const VALUES = [
  {
    icon: 'fa-bullseye',
    title: 'Outcomes over compliance',
    body: 'A binder of policies never prevented an injury. I build systems that change behaviour and protect people — compliance follows naturally.',
  },
  {
    icon: 'fa-helmet-safety',
    title: 'Field-tested, not theoretical',
    body: 'Every recommendation is shaped by twenty years of standing on real sites. If it can’t survive a 6am shift handover, it isn’t advice worth giving.',
  },
  {
    icon: 'fa-microchip',
    title: 'Tech-forward by default',
    body: 'AI, dashboards and automation aren’t buzzwords — they’re how I turn safety data into faster, better, cheaper decisions for your business.',
  },
  {
    icon: 'fa-handshake',
    title: 'A long-term partner',
    body: 'I’m not here for a one-off audit. I invest in your team’s capability so safety performance keeps improving long after I’ve gone.',
  },
];

export default function About() {
  useEffect(() => {
    document.title = 'About Ansar Mahmood | HSE Consultant, Trainer & Digital Solutions Specialist';
  }, []);

  return (
    <main className="about">
      {/* 1. HERO */}
      <section className="about-hero" aria-labelledby="about-hero-heading">
        <div className="container about-hero__inner">
          <div className="about-hero__copy">
            <span className="about-eyebrow">The Person Behind the Practice</span>
            <h1 id="about-hero-heading" className="about-hero__title">
              Two decades turning safety into a <em>competitive advantage.</em>
            </h1>
            <p className="about-hero__lead">
              I&rsquo;m <b>Ansar Mahmood</b> — a Chartered HSE consultant, internationally certified trainer, and
              digital-solutions specialist. For twenty years I&rsquo;ve protected people on real sites and helped
              organisations make safety a source of strength, not a cost centre.
            </p>
            <div className="about-hero__cta">
              <Link to="/book-consultation" className="btn btn-gold btn-lg">
                <i className="fas fa-calendar-check" aria-hidden="true" /> Book a 30-min call
              </Link>
              <Link to="/contact" className="btn btn-outline-navy btn-lg">Get in touch</Link>
            </div>
          </div>

          <div className="about-hero__media">
            <div className="about-hero__frame">
              <img
                src={asset('assets/images/ansar-portrait.svg')}
                alt="Portrait of Ansar Mahmood, Chartered HSE consultant"
                className="about-hero__portrait"
                decoding="async"
              />
            </div>
            <div className="about-hero__chip">
              <b>CMIOSH</b>
              <span>Chartered safety professional</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STORY / JOURNEY */}
      <section className="about-story" aria-labelledby="about-story-heading">
        <div className="container about-story__inner">
          <div className="about-story__media">
            <figure className="about-story__figure">
              <img
                src={asset('assets/images/ansar-onsite.jpg')}
                alt="Ansar Mahmood in PPE on the Red Sea Global giga-project site"
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                On site at Red Sea Global — part of delivering <b>11M+ LTI-free man-hours</b> across giga-projects.
              </figcaption>
            </figure>
          </div>

          <div className="about-story__body">
            <span className="about-eyebrow">My journey</span>
            <h2 id="about-story-heading" className="about-h2">
              From the scaffolding to the boardroom — and now the algorithm.
            </h2>
            <p>
              My career didn&rsquo;t start behind a desk. It started on construction and oil &amp; gas sites, learning
              the hard way that safety is won or lost in the small moments — a permit checked, a hazard called out, a
              crew that trusts the person in the hi-vis. That frontline credibility is something no certificate can give
              you.
            </p>
            <p>
              As I moved up, I formalised that experience: chartered membership of IOSH, Lead Auditor status for ISO
              45001, and a passion for teaching. I&rsquo;ve since coached more than ten thousand professionals to
              certification and led HSE programmes on some of the world&rsquo;s largest giga-projects, including
              milestones measured in millions of injury-free hours.
            </p>
            <p>
              Then the world changed. Data, AI and automation became too powerful to ignore. So I taught myself Power BI,
              built safety AI agents, and started helping organisations turn mountains of HSE data into clear, live
              decisions. Today I sit at the rare intersection of the field, the classroom, and the technology.
            </p>

            <ol className="about-timeline" aria-label="Career journey">
              {TIMELINE.map((t) => (
                <li className="about-timeline__item" key={t.year}>
                  <span className="about-timeline__dot" aria-hidden="true" />
                  <span className="about-timeline__year">{t.year}</span>
                  <h3 className="about-timeline__title">{t.title}</h3>
                  <p className="about-timeline__body">{t.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 3. CREDENTIALS */}
      <section className="about-creds-sec" aria-labelledby="about-creds-heading">
        <div className="container">
          <div className="about-head">
            <span className="about-eyebrow">Credentials &amp; expertise</span>
            <h2 id="about-creds-heading" className="about-h2">A rare combination of qualifications.</h2>
            <p className="about-head__lead">
              Chartered safety status, accredited training authority, and modern data &amp; AI skills — under one roof.
            </p>
          </div>
          <ul className="about-creds-grid">
            {CREDS.map((c) => (
              <li className="about-cred-card" key={c.label}>
                <span className="about-cred-card__icon" aria-hidden="true">
                  <i className={`fas ${c.icon}`} />
                </span>
                <span className="about-cred-card__label">{c.label}</span>
                <span className="about-cred-card__sub">{c.sub}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. NUMBERS BAND */}
      <section className="about-numbers" aria-label="Track record by the numbers">
        <div className="container about-numbers__inner">
          {NUMBERS.map((p) => (
            <div className="about-numbers__item" key={p.l}>
              <b className="about-numbers__n">{p.n}<i>{p.s}</i></b>
              <span className="about-numbers__l">{p.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PHILOSOPHY / VALUES */}
      <section className="about-values" aria-labelledby="about-values-heading">
        <div className="container">
          <div className="about-head">
            <span className="about-eyebrow">How I work</span>
            <h2 id="about-values-heading" className="about-h2">The principles behind every engagement.</h2>
          </div>
          <ul className="about-values-grid">
            {VALUES.map((v) => (
              <li className="about-value-card" key={v.title}>
                <span className="about-value-card__icon" aria-hidden="true">
                  <i className={`fas ${v.icon}`} />
                </span>
                <h3 className="about-value-card__title">{v.title}</h3>
                <p className="about-value-card__body">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. CTA BAND */}
      <section className="about-cta" aria-labelledby="about-cta-heading">
        <div className="container about-cta__inner">
          <span className="about-eyebrow about-eyebrow--light">Let&rsquo;s work together</span>
          <h2 id="about-cta-heading" className="about-cta__title">
            Ready to make safety your competitive advantage?
          </h2>
          <p className="about-cta__lead">
            Book a free 30-minute consultation and let&rsquo;s talk about your safety, training, and digital
            transformation goals.
          </p>
          <div className="about-cta__actions">
            <Link to="/book-consultation" className="btn btn-gold btn-lg">
              <i className="fas fa-calendar-check" aria-hidden="true" /> Book a 30-min call
            </Link>
            <Link to="/contact" className="btn btn-outline-navy btn-lg about-cta__alt">Send a message</Link>
          </div>
          <span className="about-cta__sign">Ansar Mahmood</span>
        </div>
      </section>
    </main>
  );
}
