import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { studentApi } from '../lib/studentApi';

const blank = () => ({ id: null, image_path: '', eyebrow: '', title: '', subtitle: '', cta_text: '', cta_link: '', published: true, sort_order: 0 });

export default function AdminSlides() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [list, setList] = useState(null);
  const [form, setForm] = useState(blank);
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { if (!loading && !user) nav('/login', { replace: true }); }, [loading, user, nav]);

  const reload = useCallback(() => {
    studentApi.adminListSlides()
      .then((d) => setList(d.slides || []))
      .catch((e) => setMsg({ type: 'err', text: e.status === 403 ? 'Admin access required.' : 'Could not load slides.' }));
  }, []);
  useEffect(() => { if (user) reload(); }, [user, reload]);

  if (loading) return <main className="auth-page"><div className="sd-loading"><i className="fas fa-spinner fa-spin" /> Loading…</div></main>;
  if (!user) return null;
  if (user.role !== 'admin') {
    return <main className="auth-page"><div className="auth-card" style={{ maxWidth: 460 }}><h1 className="auth-title">Admins only</h1><p className="auth-sub">Your account doesn’t have admin access.</p></div></main>;
  }

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  async function onPick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true); setMsg(null);
    try { const d = await studentApi.adminUploadSlideImage(file); set('image_path', d.url); }
    catch (ex) { setMsg({ type: 'err', text: ex.message || 'Upload failed.' }); }
    finally { setUploading(false); e.target.value = ''; }
  }

  function edit(sl) { setForm({ ...blank(), ...sl }); setMsg(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function reset() { setForm(blank()); setMsg(null); }

  async function save(e) {
    e.preventDefault(); setMsg(null);
    if (!form.image_path) { setMsg({ type: 'err', text: 'Upload a banner image first.' }); return; }
    const body = {
      image_path: form.image_path, eyebrow: form.eyebrow || null, title: form.title || null,
      subtitle: form.subtitle || null, cta_text: form.cta_text || null, cta_link: form.cta_link || null,
      published: form.published, sort_order: Number(form.sort_order) || 0,
    };
    setBusy(true);
    try {
      if (form.id) await studentApi.adminUpdateSlide(form.id, body);
      else await studentApi.adminCreateSlide(body);
      reset(); setMsg({ type: 'ok', text: 'Slide saved.' }); reload();
    } catch (ex) { setMsg({ type: 'err', text: ex.message || 'Save failed.' }); }
    finally { setBusy(false); }
  }

  async function remove(sl) {
    if (!window.confirm('Delete this slide?')) return;
    try { await studentApi.adminDeleteSlide(sl.id); reload(); if (form.id === sl.id) reset(); }
    catch (e) { setMsg({ type: 'err', text: e.message || 'Delete failed.' }); }
  }

  return (
    <main className="sd-page">
      <section className="sd-hero">
        <div className="container sd-hero__inner">
          <div>
            <span className="sd-eyebrow"><i className="fas fa-images" /> Admin</span>
            <h1 className="sd-title">Hero Slider</h1>
            <p className="sd-sub">Upload banner images and manage the homepage slider.</p>
          </div>
          <button className="sd-logout" onClick={() => nav('/admin/exams')}><i className="fas fa-pen-to-square" /> Exam Authoring</button>
        </div>
      </section>

      <section className="section">
        <div className="container ax-grid">
          <form className="ax-editor" onSubmit={save}>
            <div className="ax-editor__top">
              <h2 className="sd-h2">{form.id ? 'Edit slide' : 'New slide'}</h2>
              {form.id && <button type="button" className="ax-chip" onClick={reset}><i className="fas fa-plus" /> New slide</button>}
            </div>
            {msg && <div className={`ax-msg ax-msg--${msg.type}`}><i className={`fas fa-${msg.type === 'ok' ? 'circle-check' : 'circle-exclamation'}`} /> {msg.text}</div>}

            <div className="ax-card">
              <h3 className="ax-h3">Banner image</h3>
              <div className={`ax-drop${form.image_path ? ' ax-drop--has' : ''}`}>
                {form.image_path
                  ? <img className="ax-drop__img" src={form.image_path} alt="Banner preview" />
                  : <div className="ax-drop__empty"><i className="fas fa-cloud-arrow-up" /><span>No image yet</span></div>}
              </div>
              <div className="ax-drop__actions">
                <label className="ax-chip" style={{ cursor: 'pointer' }}>
                  <i className={`fas fa-${uploading ? 'spinner fa-spin' : 'upload'}`} /> {uploading ? 'Uploading…' : (form.image_path ? 'Replace image' : 'Upload image')}
                  <input type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={onPick} />
                </label>
                {form.image_path && <button type="button" className="ax-link" onClick={() => set('image_path', '')}>Remove</button>}
                <span className="ax-hint">JPG / PNG / WebP · up to 6 MB · ~1100×360 looks best</span>
              </div>
            </div>

            <div className="ax-card">
              <h3 className="ax-h3">Click-through &amp; caption <span className="ax-hint">(optional)</span></h3>
              <div className="auth-row">
                <div className="auth-field"><label>CTA button text</label><input value={form.cta_text} onChange={(e) => set('cta_text', e.target.value)} placeholder="Explore Certifications" /></div>
                <div className="auth-field"><label>Link (where it goes)</label><input value={form.cta_link} onChange={(e) => set('cta_link', e.target.value)} placeholder="/certification-coaching" /></div>
              </div>
              <div className="auth-field"><label>Eyebrow / title (for accessibility &amp; SEO)</label><input value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Certification Services" /></div>
              <div className="auth-row">
                <div className="auth-field"><label>Sort order</label><input type="number" value={form.sort_order} onChange={(e) => set('sort_order', e.target.value)} /></div>
                <div className="auth-field" style={{ justifyContent: 'flex-end' }}>
                  <label className="ax-check"><input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} /> <span>Published</span></label>
                </div>
              </div>
            </div>

            <div className="ax-actions">
              <button className="auth-btn" disabled={busy || uploading}>{busy ? 'Saving…' : (form.id ? <><i className="fas fa-floppy-disk" /> Save slide</> : <><i className="fas fa-plus" /> Add slide</>)}</button>
            </div>
          </form>

          <aside className="ax-list">
            <h2 className="sd-h2">Slides {list && <span className="ax-count">{list.length}</span>}</h2>
            {!list && <p className="sd-empty"><i className="fas fa-spinner fa-spin" /> Loading…</p>}
            {list && !list.length && <p className="sd-empty">No slides yet — the homepage shows the default certification banners until you add one.</p>}
            {list && list.map((sl) => (
              <div className={`ax-slide${form.id === sl.id ? ' ax-item--active' : ''}`} key={sl.id}>
                <img className="ax-slide__thumb" src={sl.image_path} alt="" />
                <div className="ax-slide__meta">
                  <b>{sl.title || sl.cta_text || 'Untitled slide'}</b>
                  <span>order {sl.sort_order}{sl.published ? '' : ' · draft'}{sl.cta_link ? ` · → ${sl.cta_link}` : ''}</span>
                </div>
                <div className="ax-item__act">
                  <button className="ax-icon-btn" title="Edit" onClick={() => edit(sl)}><i className="fas fa-pen" /></button>
                  <button className="ax-icon-btn ax-icon-btn--danger" title="Delete" onClick={() => remove(sl)}><i className="fas fa-trash" /></button>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </main>
  );
}
