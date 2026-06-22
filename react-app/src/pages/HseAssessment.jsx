import { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE } from '../config';
import PageBanner from '../components/PageBanner';

const QUESTIONS = [
  {
    theme: 'Leadership Commitment',
    q: 'How visibly engaged is senior leadership in HSE?',
    options: [
      { label: 'HSE is rarely discussed at leadership level', score: 0 },
      { label: 'Leaders react to incidents but are not proactive', score: 1 },
      { label: 'Leaders set objectives and review them periodically', score: 2 },
      { label: 'Leaders champion HSE, set KPIs and walk the floor', score: 3 },
      { label: 'HSE is embedded in strategy with board-level ownership', score: 4 },
    ],
  },
  {
    theme: 'Leadership Commitment',
    q: 'How is HSE budget treated in your organisation?',
    options: [
      { label: 'No dedicated budget — funded ad hoc', score: 0 },
      { label: 'Minimal budget, cut first under pressure', score: 1 },
      { label: 'Fixed annual budget covering essentials', score: 2 },
      { label: 'Budget tied to risk priorities and improvement plans', score: 3 },
      { label: 'Invested as a value driver with measured ROI', score: 4 },
    ],
  },
  {
    theme: 'Risk Management',
    q: 'How mature is your risk assessment process?',
    options: [
      { label: 'No formal risk assessments', score: 0 },
      { label: 'Generic assessments, rarely updated', score: 1 },
      { label: 'Task-based assessments reviewed annually', score: 2 },
      { label: 'Dynamic assessments with worker involvement', score: 3 },
      { label: 'Predictive, data-driven risk management', score: 4 },
    ],
  },
  {
    theme: 'Risk Management',
    q: 'How are hazards reported and closed out?',
    options: [
      { label: 'Hazards go unreported', score: 0 },
      { label: 'Reported verbally, often lost', score: 1 },
      { label: 'Logged on paper or spreadsheets', score: 2 },
      { label: 'Tracked in a system with owners and due dates', score: 3 },
      { label: 'Real-time reporting with trend analytics', score: 4 },
    ],
  },
  {
    theme: 'Training & Competency',
    q: 'How is HSE training managed?',
    options: [
      { label: 'No structured training', score: 0 },
      { label: 'Induction only', score: 1 },
      { label: 'Role-based training tracked in a matrix', score: 2 },
      { label: 'Competency framework with refreshers', score: 3 },
      { label: 'Continuous development linked to certification', score: 4 },
    ],
  },
  {
    theme: 'Training & Competency',
    q: 'How do you verify competency on the ground?',
    options: [
      { label: 'We assume people are competent', score: 0 },
      { label: 'Certificates filed but not verified', score: 1 },
      { label: 'Periodic supervisor checks', score: 2 },
      { label: 'Practical assessments and sign-off', score: 3 },
      { label: 'Ongoing competency assurance with audits', score: 4 },
    ],
  },
  {
    theme: 'Incident Investigation',
    q: 'How do you investigate incidents?',
    options: [
      { label: 'Incidents are not investigated', score: 0 },
      { label: 'Blame-focused, surface causes only', score: 1 },
      { label: 'Basic root-cause for serious events', score: 2 },
      { label: 'Structured RCA with actions tracked', score: 3 },
      { label: 'Systemic learning shared organisation-wide', score: 4 },
    ],
  },
  {
    theme: 'Contractor Management',
    q: 'How are contractors managed for HSE?',
    options: [
      { label: 'No HSE requirements for contractors', score: 0 },
      { label: 'Contracts mention HSE but unchecked', score: 1 },
      { label: 'Pre-qualification on paper', score: 2 },
      { label: 'Pre-qualification plus on-site monitoring', score: 3 },
      { label: 'Integrated contractor HSE with audits and KPIs', score: 4 },
    ],
  },
  {
    theme: 'Digital & Data Maturity',
    q: 'How do you capture and use HSE data?',
    options: [
      { label: 'No HSE data captured', score: 0 },
      { label: 'Paper records, hard to analyse', score: 1 },
      { label: 'Spreadsheets compiled manually', score: 2 },
      { label: 'A dedicated HSE system with dashboards', score: 3 },
      { label: 'Live analytics and predictive insights', score: 4 },
    ],
  },
  {
    theme: 'Digital & Data Maturity',
    q: 'How visible are your HSE KPIs to the business?',
    options: [
      { label: 'No KPIs tracked', score: 0 },
      { label: 'Lagging indicators only, reviewed late', score: 1 },
      { label: 'Monthly reports to management', score: 2 },
      { label: 'Leading + lagging KPIs on live dashboards', score: 3 },
      { label: 'Benchmarked KPIs driving decisions', score: 4 },
    ],
  },
];

const MAX = QUESTIONS.length * 4;

function bandFor(pct) {
  if (pct < 30) return BANDS.reactive;
  if (pct < 55) return BANDS.developing;
  if (pct < 80) return BANDS.proactive;
  return BANDS.leading;
}

const BANDS = {
  reactive: {
    key: 'reactive',
    name: 'Reactive',
    blurb:
      'HSE is largely informal and driven by incidents rather than planning. There are quick wins available that can dramatically reduce risk and cost.',
  },
  developing: {
    key: 'developing',
    name: 'Developing',
    blurb:
      'Foundations are in place but applied inconsistently. Formalising systems and competency will move you toward proactive control.',
  },
  proactive: {
    key: 'proactive',
    name: 'Proactive',
    blurb:
      'You manage risk systematically with good leadership engagement. The opportunity now is data, leading indicators and continuous improvement.',
  },
  leading: {
    key: 'leading',
    name: 'Leading',
    blurb:
      'HSE is embedded in your culture and strategy. Focus on sustaining excellence, benchmarking and digital innovation.',
  },
};

const RECS = [
  {
    test: (t) => t['Leadership Commitment'] < 6 || t['Risk Management'] < 6,
    icon: 'fa-compass',
    title: 'HSE Strategy & Consulting',
    text: 'Build leadership engagement and a risk-based management system with expert guidance.',
    to: '/consulting',
    cta: 'Explore Consulting',
  },
  {
    test: (t) => t['Training & Competency'] < 6,
    icon: 'fa-graduation-cap',
    title: 'Training & Competency',
    text: 'Close competency gaps with structured, role-based HSE training programmes.',
    to: '/training',
    cta: 'View Training',
  },
  {
    test: (t) => t['Incident Investigation'] < 6 || t['Contractor Management'] < 6,
    icon: 'fa-certificate',
    title: 'Certification Coaching',
    text: 'Strengthen credibility and process discipline with internationally recognised certifications.',
    to: '/certification-coaching',
    cta: 'Get Certified',
  },
  {
    test: (t) => t['Digital & Data Maturity'] < 6,
    icon: 'fa-microchip',
    title: 'AI & Data Solutions',
    text: 'Turn HSE data into live dashboards and predictive insight to prevent incidents.',
    to: '/ai-solutions',
    cta: 'See AI Solutions',
  },
];

export default function HseAssessment() {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const answeredCount = answers.filter((a) => a !== null).length;
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100);

  function choose(qi, score) {
    const next = [...answers];
    next[qi] = score;
    setAnswers(next);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (answeredCount < QUESTIONS.length) {
      setError('Please answer every question before viewing your report.');
      return;
    }
    setError('');
    // Fire-and-forget lead capture; report shows regardless.
    if (email) {
      try {
        const fd = new FormData();
        fd.append('name', name);
        fd.append('email', email);
        fd.append('source', 'hse-assessment');
        fd.append('message', 'HSE Maturity Self-Assessment lead');
        await fetch(`${API_BASE}/forms/contact-handler.php`, {
          method: 'POST',
          body: fd,
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        });
      } catch {
        /* graceful — still show report */
      }
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function restart() {
    setAnswers(Array(QUESTIONS.length).fill(null));
    setSubmitted(false);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Per-theme breakdown
  const themes = {};
  QUESTIONS.forEach((q, i) => {
    if (!themes[q.theme]) themes[q.theme] = { score: 0, max: 0 };
    themes[q.theme].max += 4;
    themes[q.theme].score += answers[i] || 0;
  });
  const themeScores = Object.fromEntries(
    Object.entries(themes).map(([k, v]) => [k, v.score])
  );

  const total = answers.reduce((s, a) => s + (a || 0), 0);
  const pct = Math.round((total / MAX) * 100);
  const band = bandFor(pct);
  const recs = RECS.filter((r) => r.test(themeScores));

  return (
    <main className="hse-page">
      <PageBanner route="hse-assessment" icon="fa-chart-pie" />

      <div className="container hse-body">
        {!submitted ? (
          <form className="hse-quiz" onSubmit={onSubmit}>
            <div className="hse-progress">
              <div className="hse-progress__bar">
                <span style={{ width: `${progress}%` }} />
              </div>
              <span className="hse-progress__label">
                {answeredCount} / {QUESTIONS.length} answered
              </span>
            </div>

            {QUESTIONS.map((q, qi) => (
              <fieldset className="hse-q" key={qi}>
                <legend>
                  <span className="hse-q__num">{qi + 1}</span>
                  <span>
                    <span className="hse-q__theme">{q.theme}</span>
                    {q.q}
                  </span>
                </legend>
                <div className="hse-options">
                  {q.options.map((o, oi) => (
                    <label
                      key={oi}
                      className={`hse-option${answers[qi] === o.score ? ' is-selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name={`q${qi}`}
                        checked={answers[qi] === o.score}
                        onChange={() => choose(qi, o.score)}
                      />
                      <span>{o.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}

            <div className="hse-capture">
              <h3>Where shall we send your detailed report?</h3>
              <p>Optional — view your results instantly. Add your email for a tailored follow-up.</p>
              <div className="hse-capture__row">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Your email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="hse-error">{error}</p>}

            <button type="submit" className="btn btn-gold hse-submit">
              View My Results
            </button>
          </form>
        ) : (
          <div className="hse-report">
            <div className={`hse-result hse-result--${band.key}`}>
              <span className="hse-result__eyebrow">Your HSE Maturity</span>
              <div className="hse-result__score">
                <strong>{pct}</strong>
                <span>/ 100</span>
              </div>
              <h2 className="hse-result__band">{band.name}</h2>
              <p>{band.blurb}</p>
            </div>

            <h3 className="hse-section-title">Your scores by theme</h3>
            <div className="hse-themes">
              {Object.entries(themes).map(([name, v]) => {
                const tp = Math.round((v.score / v.max) * 100);
                return (
                  <div className="hse-theme" key={name}>
                    <div className="hse-theme__head">
                      <span>{name}</span>
                      <strong>{tp}%</strong>
                    </div>
                    <div className="hse-theme__bar">
                      <span style={{ width: `${tp}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <h3 className="hse-section-title">Recommended next steps</h3>
            <div className="hse-recs">
              {(recs.length ? recs : RECS.slice(0, 2)).map((r) => (
                <div className="hse-rec" key={r.to}>
                  <div className="hse-rec__icon">
                    <i className={`fa-solid ${r.icon}`} />
                  </div>
                  <h4>{r.title}</h4>
                  <p>{r.text}</p>
                  <Link to={r.to} className="hse-rec__link">
                    {r.cta} <i className="fa-solid fa-arrow-right" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="hse-cta">
              <h3>Want an expert read on these results?</h3>
              <p>
                Book a free consultation and we&apos;ll turn this snapshot into a
                prioritised, costed improvement plan.
              </p>
              <div className="hse-cta__actions">
                <Link to="/book-consultation" className="btn btn-gold">
                  Book a Free Consultation
                </Link>
                <button type="button" className="btn btn-ghost-navy" onClick={restart}>
                  Restart Assessment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
