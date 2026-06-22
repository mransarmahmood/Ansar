import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { studentApi } from '../lib/studentApi';

const TILES = [
  { icon: 'fa-clipboard-question', title: 'Practice Exams', desc: 'Take or resume free practice exams across CSP, CRSP, IOSH, PMP and more.', to: '/practice-exams', cta: 'Browse exams' },
  { icon: 'fa-shield-halved', title: 'Verify a Certificate', desc: 'Confirm the authenticity of any certificate using its verification code.', to: '/verify', cta: 'Open verifier' },
  { icon: 'fa-calendar-check', title: 'My Enrolments', desc: 'Courses you have applied for and upcoming live sessions.', to: '/course-calendar', cta: 'View calendar' },
];

function fmtDate(s) {
  try { return new Date(s).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }); }
  catch { return s; }
}

export default function StudentDashboard() {
  const { user, loading, logout, refreshUser } = useAuth();
  const nav = useNavigate();
  const [attempts, setAttempts] = useState(null);
  const [stats, setStats] = useState(null);
  const [certs, setCerts] = useState(null);
  const [err, setErr] = useState('');
  const [resend, setResend] = useState('idle'); // idle | sending | sent | error
  const [justVerified, setJustVerified] = useState(false);

  useEffect(() => { if (!loading && !user) nav('/login', { replace: true }); }, [loading, user, nav]);

  // Returning from the e-mail verification link (?verified=1) — refresh status.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('verified') === '1') {
      setJustVerified(true);
      refreshUser();
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [refreshUser]);

  async function doResend() {
    setResend('sending');
    try { await studentApi.resendVerification(); setResend('sent'); }
    catch { setResend('error'); }
  }

  useEffect(() => {
    if (!user) return;
    Promise.all([studentApi.listAttempts(), studentApi.attemptStats(), studentApi.listCertificates()])
      .then(([a, s, c]) => { setAttempts(a.attempts || []); setStats(s); setCerts(c.certificates || []); })
      .catch(() => setErr('Could not load your results. Is the student API running?'));
  }, [user]);

  if (loading) return <main className="auth-page"><div className="sd-loading"><i className="fas fa-spinner fa-spin"></i> Loading…</div></main>;
  if (!user) return null;

  const STATCARDS = [
    { k: 'total_attempts', label: 'Attempts', icon: 'fa-pen-to-square' },
    { k: 'exams_taken', label: 'Exams Tried', icon: 'fa-layer-group' },
    { k: 'passed', label: 'Passed', icon: 'fa-circle-check' },
    { k: 'best_score', label: 'Best Score', icon: 'fa-medal', suffix: '%' },
  ];

  return (
    <main className="sd-page">
      <section className="sd-hero">
        <div className="container sd-hero__inner">
          <div>
            <span className="sd-eyebrow">Student Dashboard</span>
            <h1 className="sd-title">Welcome, {user.name?.split(' ')[0] || 'Student'}.</h1>
            <p className="sd-sub">{user.email}</p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {user.role === 'admin' && (
              <button className="sd-logout" onClick={() => nav('/admin/invoices')}><i className="fas fa-file-invoice-dollar"></i> Billing</button>
            )}
            {user.role === 'admin' && (
              <button className="sd-logout" onClick={() => nav('/admin/slides')}><i className="fas fa-images"></i> Hero Slider</button>
            )}
            {user.role === 'admin' && (
              <button className="sd-logout" onClick={() => nav('/admin/page-banners')}><i className="fas fa-image"></i> Page Banners</button>
            )}
            {user.role === 'admin' && (
              <button className="sd-logout" onClick={() => nav('/admin/exams')}><i className="fas fa-pen-to-square"></i> Exam Authoring</button>
            )}
            <button className="sd-logout" onClick={() => { logout(); nav('/'); }}><i className="fas fa-right-from-bracket"></i> Sign out</button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {justVerified && user.email_verified && (
            <div className="sd-banner sd-banner--ok"><i className="fas fa-circle-check"></i> Your email is verified. Thank you!</div>
          )}
          {user.email_verified === false && (
            <div className="sd-banner sd-banner--warn">
              <span><i className="fas fa-envelope-circle-check"></i> Please verify your email to secure your account.</span>
              {resend === 'sent'
                ? <b><i className="fas fa-check"></i> Verification email sent</b>
                : <button className="sd-banner__btn" onClick={doResend} disabled={resend === 'sending'}>{resend === 'sending' ? 'Sending…' : 'Resend email'}</button>}
            </div>
          )}

          {/* stat cards */}
          <div className="sd-stats">
            {STATCARDS.map((s) => (
              <div className="sd-stat" key={s.k}>
                <span className="sd-stat__ic"><i className={`fas ${s.icon}`}></i></span>
                <div>
                  <b>{stats ? stats[s.k] : '—'}{s.suffix && stats ? s.suffix : ''}</b>
                  <span>{s.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* My results */}
          <div className="sd-results">
            <h2 className="sd-h2">My Results</h2>
            {err && <p className="sd-empty"><i className="fas fa-triangle-exclamation"></i> {err}</p>}
            {!err && attempts === null && <p className="sd-empty"><i className="fas fa-spinner fa-spin"></i> Loading results…</p>}
            {!err && attempts && attempts.length === 0 && (
              <p className="sd-empty"><i className="fas fa-clipboard-question"></i> No attempts yet. <Link to="/practice-exams">Take a practice exam</Link> — your score will be saved here.</p>
            )}
            {!err && attempts && attempts.length > 0 && (
              <div className="sd-table-wrap">
                <table className="sd-table">
                  <thead><tr><th>Exam</th><th>Score</th><th>%</th><th>Result</th><th>Date</th></tr></thead>
                  <tbody>
                    {attempts.map((a) => (
                      <tr key={a.id}>
                        <td data-l="Exam">{a.exam_title}</td>
                        <td data-l="Score">{a.score}/{a.total}</td>
                        <td data-l="%">{a.percentage}%</td>
                        <td data-l="Result"><span className={`sd-pill ${a.passed ? 'is-pass' : 'is-fail'}`}>{a.passed ? 'Pass' : 'Fail'}</span></td>
                        <td data-l="Date">{fmtDate(a.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* My certificates */}
          <div className="sd-results">
            <h2 className="sd-h2">My Certificates</h2>
            {certs && certs.length === 0 && (
              <p className="sd-empty"><i className="fas fa-certificate"></i> Pass a practice exam (≥ its pass mark) and your certificate will be issued here automatically.</p>
            )}
            {certs && certs.length > 0 && (
              <div className="sd-certs">
                {certs.map((c) => (
                  <div className="sd-cert" key={c.id}>
                    <span className="sd-cert__ribbon"><i className="fas fa-certificate"></i></span>
                    <div className="sd-cert__body">
                      <h4>{c.exam_title}</h4>
                      <p>{c.percentage}% · Issued {fmtDate(c.issued_on)} · Code <b>{c.hash}</b></p>
                    </div>
                    <div className="sd-cert__actions">
                      <a className="sd-cert__btn" href={studentApi.certificateDownloadUrl(c.hash)} target="_blank" rel="noopener"><i className="fas fa-download"></i> PDF</a>
                      <Link className="sd-cert__btn sd-cert__btn--ghost" to={`/verify/${c.hash}`}><i className="fas fa-shield-halved"></i> Verify</Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* quick tiles */}
          <div className="sd-grid sd-grid--3">
            {TILES.map((t) => (
              <article className={`sd-tile${t.soon ? ' sd-tile--soon' : ''}`} key={t.title}>
                <span className="sd-tile__ic"><i className={`fas ${t.icon}`}></i></span>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
                {t.soon ? <span className="sd-tile__soon">Coming soon</span>
                  : <Link to={t.to} className="sd-tile__link">{t.cta} <i className="fas fa-arrow-right"></i></Link>}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
