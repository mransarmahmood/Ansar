import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { studentApi } from '../lib/studentApi';

export default function Verify() {
  const { hash: hashParam } = useParams();
  const nav = useNavigate();
  const [code, setCode] = useState(hashParam || '');
  const [state, setState] = useState('idle'); // idle | loading | valid | invalid | error
  const [cert, setCert] = useState(null);

  const run = useCallback((h) => {
    const clean = (h || '').trim();
    if (!clean) return;
    setState('loading'); setCert(null);
    studentApi.verifyCertificate(clean)
      .then((d) => { setCert(d.certificate); setState('valid'); })
      .catch((ex) => setState(ex.status === 404 ? 'invalid' : 'error'));
  }, []);

  useEffect(() => { if (hashParam) run(hashParam); }, [hashParam, run]);

  function submit(e) {
    e.preventDefault();
    const clean = code.trim();
    if (clean && clean !== hashParam) nav(`/verify/${encodeURIComponent(clean)}`);
    else run(clean);
  }

  return (
    <main className="auth-page">
      <section className="auth-hero" style={{ maxWidth: 540 }}>
        <div className="auth-card">
          <span className="auth-badge"><i className="fas fa-shield-halved"></i> Certificate Verification</span>
          <h1 className="auth-title">Verify a certificate</h1>
          <p className="auth-sub">Enter the verification code printed on the certificate (e.g. <b>AM-XXXXXXXX</b>).</p>

          <form onSubmit={submit} className="auth-form">
            <div className="auth-field">
              <label htmlFor="code">Verification code</label>
              <input id="code" type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="AM-XXXXXXXX" autoCapitalize="characters" />
            </div>
            <button type="submit" className="auth-btn" disabled={state === 'loading'}>
              {state === 'loading' ? 'Checking…' : <>Verify <i className="fas fa-magnifying-glass"></i></>}
            </button>
          </form>

          {state === 'valid' && cert && (
            <div className="vf-result vf-result--ok">
              <div className="vf-result__head"><i className="fas fa-circle-check"></i> Valid certificate</div>
              <ul className="vf-list">
                <li><span>Holder</span><b>{cert.holder_name}</b></li>
                <li><span>Credential</span><b>{cert.exam_title}</b></li>
                <li><span>Score</span><b>{cert.percentage}%</b></li>
                <li><span>Issued</span><b>{new Date(cert.issued_on).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</b></li>
                <li><span>Code</span><b>{cert.hash}</b></li>
              </ul>
              <a className="vf-dl" href={studentApi.certificateDownloadUrl(cert.hash)} target="_blank" rel="noopener"><i className="fas fa-download"></i> Download PDF</a>
            </div>
          )}
          {state === 'invalid' && (
            <div className="vf-result vf-result--bad"><i className="fas fa-circle-xmark"></i> No certificate found for that code. Please check it and try again.</div>
          )}
          {state === 'error' && (
            <div className="vf-result vf-result--bad"><i className="fas fa-triangle-exclamation"></i> Verification service is unavailable right now. Please try again shortly.</div>
          )}
        </div>
      </section>
    </main>
  );
}
