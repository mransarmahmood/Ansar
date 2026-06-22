import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [f, setF] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const on = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault(); setErr('');
    if (f.password !== f.password_confirmation) { setErr('Passwords do not match.'); return; }
    setBusy(true);
    try { await register({ ...f, name: f.name.trim(), email: f.email.trim() }); nav('/dashboard'); }
    catch (ex) { setErr(ex.message || 'Registration failed.'); }
    finally { setBusy(false); }
  }

  return (
    <main className="auth-page">
      <section className="auth-hero">
        <div className="auth-card">
          <span className="auth-badge"><i className="fas fa-user-plus"></i> Free Student Account</span>
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-sub">Track your exam prep, save results and earn certificates.</p>

          {err && <div className="auth-error"><i className="fas fa-circle-exclamation"></i> {err}</div>}

          <form onSubmit={submit} className="auth-form">
            <div className="auth-field">
              <label htmlFor="name">Full name</label>
              <input id="name" type="text" autoComplete="name" required value={f.name} onChange={on('name')} placeholder="Your name" />
            </div>
            <div className="auth-field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" autoComplete="email" required value={f.email} onChange={on('email')} placeholder="you@company.com" />
            </div>
            <div className="auth-row">
              <div className="auth-field">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" autoComplete="new-password" required minLength={8} value={f.password} onChange={on('password')} placeholder="Min 8 characters" />
              </div>
              <div className="auth-field">
                <label htmlFor="pc">Confirm</label>
                <input id="pc" type="password" autoComplete="new-password" required value={f.password_confirmation} onChange={on('password_confirmation')} placeholder="Repeat password" />
              </div>
            </div>
            <button type="submit" className="auth-btn" disabled={busy}>
              {busy ? 'Creating…' : <>Create account <i className="fas fa-arrow-right"></i></>}
            </button>
          </form>

          <p className="auth-alt">Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </section>
    </main>
  );
}
