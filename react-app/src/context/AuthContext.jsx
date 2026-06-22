import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { studentApi, getToken, setToken } from '../lib/studentApi';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on load
  useEffect(() => {
    const t = getToken();
    if (!t) { setLoading(false); return; }
    studentApi.me(t)
      .then((d) => setUser(d.user || d))
      .catch(() => setToken(null))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const d = await studentApi.login({ email, password });
    setToken(d.token); setUser(d.user);
    return d.user;
  }, []);

  const register = useCallback(async (payload) => {
    const d = await studentApi.register(payload);
    setToken(d.token); setUser(d.user);
    return d.user;
  }, []);

  const logout = useCallback(async () => {
    try { await studentApi.logout(); } catch { /* ignore */ }
    setToken(null); setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const t = getToken();
    if (!t) return null;
    try { const d = await studentApi.me(t); setUser(d.user || d); return d.user; }
    catch { return null; }
  }, []);

  return (
    <AuthCtx.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
