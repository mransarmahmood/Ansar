import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { studentApi } from '../lib/studentApi';
import { PAGE_BANNER_DEFAULTS, PAGE_BANNER_ROUTES } from '../data/pageBannerDefaults';

const blank = (route = '') => ({ id: null, route, eyebrow: '', title: '', subtitle: '', cta_text: '', cta_link: '', cta2_text: '', cta2_link: '', image_path: '', published: true });

export default function AdminPageBanners() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [list, setList] = useState(null);
  const [form, setForm] = useState(blank());
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { if (!loading && !user) nav('/login', { replace: true }); }, [loading, user, nav]);
  const reload = useCallback(() => {
    studentApi.adminListPageBanners().then((d) => setList(d.banners || []))
      .catch((e) => setMsg({ type: 'err', text: e.status === 403 ? 'Admin access required.' : 'Could not load.' }));
  }, []);
  useEffect(() => { if (user) reload(); }, [user, reload]);

  if (loading) return <main className="auth-page"><div className="sd-loading"><i className="fas fa-spinner fa-spin" /> Loading…</div></main>;
  if (!user) return null;
  if (user.role !== 'admin') return <main className="auth-page"><div className="auth-card" style={{ maxWidth: 460 }}><h1 className="auth-title">Admins only</h1></div></main>;

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));
  const configured = new Set((list || []).map((b) => b.route));

  function loadDefaults(route) {
    const d = PAGE_BANNER_DEFAULTS[route] || {};
    setForm({ ...blank(route), eyebrow: d.eyebrow || '', title: d.title || '', subtitle: d.subtitle || '', cta_text: d.cta_text || '', cta_link: d.cta_link || '', cta2_text: d.cta2_text || '', cta2_link: d.cta2_link || '' });
  }
  function pickRoute(route) {
    const existing = (list || []).find((b) => b.route === route);
    if (existing) { setForm({ ...blank(route), ...existing }); } else { loadDefaults(route); }
    setMsg(null);
  }

  async function onPick(e) {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true); setMsg(null);
    try { const d = await studentApi.adminUploadBannerImage(file); set('image_path', d.url); }
    catch (ex) { setMsg({ type: 'err', text: ex.message || 'Upload failed.' }); }
    finally { setUploading(false); e.target.value = ''; }
  }

  async function save(e) {
    e.preventDefault(); setMsg(null);
    if (!form.route) { setMsg({ type: 'err', text: 'Pick a page first.' }); return; }
    setBusy(true);
    try {
      await studentApi.adminSavePageBanner({
        route: form.route, eyebrow: form.eyebrow || null, title: form.title || null, subtitle: form.subtitle || null,
        cta_text: form.cta_text || null, cta_link: form.cta_link || null, cta2_text: form.cta2_text || null, cta2_link: form.cta2_link || null,
        image_path: form.image_path || null, published: form.published,
      });
      setMsg({ type: 'ok', text: `Banner for “${form.route}” saved.` }); reload();
    } catch (ex) { setMsg({ type: 'err', text: ex.message || 'Save failed.' }); }
    finally { setBusy(false); }
  }
  async function remove(b) {
    if (!window.confirm(`Reset the “${b.route}” banner to its default?`)) return;
    try { await studentApi.adminDeletePageBanner(b.id); reload(); if (form.route === b.route) setForm(blank()); }
    catch (e) { setMsg({ type: 'err', text: e.message }); }
  }

  return (
    <main className="sd-page">
      <section className="sd-hero"><div className="container sd-hero__inner">
        <div><span className="sd-eyebrow"><i className="fas fa-image" /> Admin</span><h1 className="sd-title">Page Banners</h1><p className="sd-sub">Edit the branded hero on every page — copy, CTAs and background image.</p></div>
        <button className="sd-logout" onClick={() => nav('/admin/slides')}><i className="fas fa-images" /> Hero Slider</button>
      </div></section>

      <section className="section"><div className="container ax-grid">
        <form className="ax-editor" onSubmit={save}>
          <div className="ax-editor__top"><h2 className="sd-h2">{form.route ? `Banner: /${form.route}` : 'Choose a page'}</h2></div>
          {msg && <div className={`ax-msg ax-msg--${msg.type}`}><i className={`fas fa-${msg.type === 'ok' ? 'circle-check' : 'circle-exclamation'}`} /> {msg.text}</div>}

          <div className="ax-card">
            <div className="auth-field">
              <label>Page</label>
              <select value={form.route} onChange={(e) => pickRoute(e.target.value)}>
                <option value="">— Select a page —</option>
                {PAGE_BANNER_ROUTES.map((r) => <option key={r} value={r}>/{r}{configured.has(r) ? '  ✓ customised' : ''}</option>)}
              </select>
            </div>
          </div>

          {form.route && <>
            <div className="ax-card">
              <h3 className="ax-h3">Background image <span className="ax-hint">(optional — falls back to the branded gradient)</span></h3>
              <div className={`ax-drop${form.image_path ? ' ax-drop--has' : ''}`} style={{ aspectRatio: '1100/300' }}>
                {form.image_path ? <img className="ax-drop__img" src={form.image_path} alt="Banner" /> : <div className="ax-drop__empty"><i className="fas fa-image" /><span>Gradient banner (no image)</span></div>}
              </div>
              <div className="ax-drop__actions">
                <label className="ax-chip" style={{ cursor: 'pointer' }}><i className={`fas fa-${uploading ? 'spinner fa-spin' : 'upload'}`} /> {uploading ? 'Uploading…' : 'Upload image'}<input type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={onPick} /></label>
                {form.image_path && <button type="button" className="ax-link" onClick={() => set('image_path', '')}>Remove</button>}
                <span className="ax-hint">~1100×300 · JPG/PNG/WebP ≤6 MB</span>
              </div>
            </div>

            <div className="ax-card">
              <h3 className="ax-h3">Copy</h3>
              <div className="auth-field"><label>Eyebrow</label><input value={form.eyebrow} onChange={(e) => set('eyebrow', e.target.value)} /></div>
              <div className="auth-field"><label>Title (H1)</label><input value={form.title} onChange={(e) => set('title', e.target.value)} /></div>
              <div className="auth-field"><label>Subtitle</label><textarea rows={2} value={form.subtitle} onChange={(e) => set('subtitle', e.target.value)} /></div>
            </div>

            <div className="ax-card">
              <h3 className="ax-h3">Buttons</h3>
              <div className="auth-row">
                <div className="auth-field"><label>Primary text</label><input value={form.cta_text} onChange={(e) => set('cta_text', e.target.value)} /></div>
                <div className="auth-field"><label>Primary link</label><input value={form.cta_link} onChange={(e) => set('cta_link', e.target.value)} placeholder="/book-consultation" /></div>
              </div>
              <div className="auth-row">
                <div className="auth-field"><label>Secondary text</label><input value={form.cta2_text} onChange={(e) => set('cta2_text', e.target.value)} /></div>
                <div className="auth-field"><label>Secondary link</label><input value={form.cta2_link} onChange={(e) => set('cta2_link', e.target.value)} /></div>
              </div>
              <label className="ax-check"><input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} /> <span>Published</span></label>
            </div>

            <div className="ax-actions"><button className="auth-btn" disabled={busy || uploading}>{busy ? 'Saving…' : <><i className="fas fa-floppy-disk" /> Save banner</>}</button></div>
          </>}
        </form>

        <aside className="ax-list">
          <h2 className="sd-h2">Customised {list && <span className="ax-count">{list.length}</span>}</h2>
          {!list && <p className="sd-empty"><i className="fas fa-spinner fa-spin" /> Loading…</p>}
          {list && !list.length && <p className="sd-empty">No custom banners yet — every page uses its branded default. Pick a page to customise.</p>}
          {list && list.map((b) => (
            <div className={`ax-item${form.route === b.route ? ' ax-item--active' : ''}`} key={b.id}>
              <div className="ax-item__main"><b>/{b.route}</b><span>{b.title || '(default copy)'}{b.published ? '' : ' · hidden'}{b.image_path ? ' · image' : ''}</span></div>
              <div className="ax-item__act">
                <button className="ax-icon-btn" onClick={() => pickRoute(b.route)} title="Edit"><i className="fas fa-pen" /></button>
                <button className="ax-icon-btn ax-icon-btn--danger" onClick={() => remove(b)} title="Reset to default"><i className="fas fa-rotate-left" /></button>
              </div>
            </div>
          ))}
        </aside>
      </div></section>
    </main>
  );
}
