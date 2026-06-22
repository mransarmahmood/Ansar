import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault(); setErr(''); setBusy(true);
    try { await login(email.trim(), password); nav('/dashboard'); }
    catch (ex) { setErr(ex.message || 'Login failed.'); }
    finally { setBusy(false); }
  }

  return (
    <main className="auth-page">
      <section className="auth-hero">
        <div className="auth-card">
          <span className="auth-badge"><i className="fas fa-user-graduate"></i> Student Portal</span>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-sub">Sign in to access your exams, results and certificates.</p>

          {err && <div className="auth-error"><i className="fas fa-circle-exclamation"></i> {err}</div>}

          <form onSubmit={submit} className="auth-form">
            <div className="auth-field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
            </div>
            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <button type="submit" className="auth-btn" disabled={busy}>
              {busy ? 'Signing in…' : <>Sign in <i className="fas fa-arrow-right"></i></>}
            </button>
          </form>

          <p className="auth-alt">New here? <Link to="/register">Create a free account</Link></p>
        </div>
      </section>
    </main>
  );
}
