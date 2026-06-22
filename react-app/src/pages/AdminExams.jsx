import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { studentApi } from '../lib/studentApi';

const blankQuestion = () => ({ id: 'q' + Math.random().toString(36).slice(2, 7), topic: '', question: '', options: ['', '', '', ''], correctIndex: 0, explanation: '' });

const blankForm = () => ({
  id: null, slug: '', name: '', short: '', published: true,
  payload: {
    awardingBody: '', category: '', tagline: '', description: '',
    sampleDurationMinutes: 10, samplePassMarkPct: 70,
    sampleQuestions: [blankQuestion()],
  },
});

export default function AdminExams() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [list, setList] = useState(null);
  const [form, setForm] = useState(blankForm);
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);
  const [showJson, setShowJson] = useState(false);

  useEffect(() => { if (!loading && !user) nav('/login', { replace: true }); }, [loading, user, nav]);

  const reload = useCallback(() => {
    studentApi.adminListExams()
      .then((d) => setList(d.exams || []))
      .catch((e) => setMsg({ type: 'err', text: e.status === 403 ? 'Admin access required.' : 'Could not load exams.' }));
  }, []);
  useEffect(() => { if (user) reload(); }, [user, reload]);

  if (loading) return <main className="auth-page"><div className="sd-loading"><i className="fas fa-spinner fa-spin" /> Loading…</div></main>;
  if (!user) return null;
  if (user.role !== 'admin') {
    return <main className="auth-page"><div className="auth-card" style={{ maxWidth: 460 }}><h1 className="auth-title">Admins only</h1><p className="auth-sub">Your account doesn’t have admin access to exam authoring.</p></div></main>;
  }

  // ---- field helpers ----
  const setField = (k, v) => setForm((s) => ({ ...s, [k]: v }));
  const setMeta = (k, v) => setForm((s) => ({ ...s, payload: { ...s.payload, [k]: v } }));
  const questions = form.payload.sampleQuestions || [];
  const setQuestions = (qs) => setForm((s) => ({ ...s, payload: { ...s.payload, sampleQuestions: qs } }));
  const patchQ = (i, patch) => setQuestions(questions.map((q, idx) => idx === i ? { ...q, ...patch } : q));
  const patchOpt = (i, oi, val) => patchQ(i, { options: questions[i].options.map((o, k) => k === oi ? val : o) });
  const addQ = () => setQuestions([...questions, blankQuestion()]);
  const delQ = (i) => setQuestions(questions.filter((_, idx) => idx !== i));
  const addOpt = (i) => patchQ(i, { options: [...questions[i].options, ''] });
  const delOpt = (i, oi) => {
    const q = questions[i];
    const opts = q.options.filter((_, k) => k !== oi);
    patchQ(i, { options: opts, correctIndex: Math.min(q.correctIndex, opts.length - 1) });
  };

  function editExam(ex) {
    const { id, slug, name, short, published, ...rest } = ex;
    setForm({ id, slug, name, short: short || '', published: published !== false, payload: { ...rest, sampleQuestions: rest.sampleQuestions || [] } });
    setMsg(null); setShowJson(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function newExam() { setForm(blankForm()); setMsg(null); setShowJson(false); }

  async function save(e) {
    e.preventDefault(); setMsg(null);
    if (!questions.length) { setMsg({ type: 'err', text: 'Add at least one question.' }); return; }
    const body = {
      slug: form.slug.trim(), name: form.name.trim(), short: form.short.trim() || null,
      published: form.published, payload: form.payload,
    };
    setBusy(true);
    try {
      if (form.id) await studentApi.adminUpdateExam(form.id, body);
      else await studentApi.adminCreateExam(body);
      setForm(blankForm()); setShowJson(false);
      setMsg({ type: 'ok', text: `Exam “${body.name}” saved.` });
      reload();
    } catch (ex) { setMsg({ type: 'err', text: ex.message || 'Save failed.' }); }
    finally { setBusy(false); }
  }

  async function remove(ex) {
    if (!window.confirm(`Delete “${ex.name}”? This cannot be undone.`)) return;
    try { await studentApi.adminDeleteExam(ex.id); reload(); setMsg({ type: 'ok', text: 'Exam deleted.' }); if (form.id === ex.id) newExam(); }
    catch (e) { setMsg({ type: 'err', text: e.message || 'Delete failed.' }); }
  }

  return (
    <main className="sd-page">
      <section className="sd-hero">
        <div className="container sd-hero__inner">
          <div>
            <span className="sd-eyebrow"><i className="fas fa-shield-halved" /> Admin</span>
            <h1 className="sd-title">Exam Authoring</h1>
            <p className="sd-sub">Create and edit the practice-exam catalogue — no JSON required.</p>
          </div>
          <button className="sd-logout" onClick={() => nav('/admin/slides')}><i className="fas fa-images" /> Hero Slider</button>
        </div>
      </section>

      <section className="section">
        <div className="container ax-grid">
          {/* editor */}
          <form className="ax-editor" onSubmit={save}>
            <div className="ax-editor__top">
              <h2 className="sd-h2">{form.id ? 'Edit exam' : 'New exam'}</h2>
              {form.id && <button type="button" className="ax-chip" onClick={newExam}><i className="fas fa-plus" /> New exam</button>}
            </div>
            {msg && <div className={`ax-msg ax-msg--${msg.type}`}><i className={`fas fa-${msg.type === 'ok' ? 'circle-check' : 'circle-exclamation'}`} /> {msg.text}</div>}

            <div className="ax-card">
              <h3 className="ax-h3">Details</h3>
              <div className="auth-row">
                <div className="auth-field"><label>Exam name</label><input value={form.name} onChange={(e) => setField('name', e.target.value)} placeholder="Certified Safety Professional (CSP)" required /></div>
                <div className="auth-field"><label>Slug (URL)</label><input value={form.slug} onChange={(e) => setField('slug', e.target.value.toLowerCase())} placeholder="csp" pattern="[a-z0-9-]+" required /></div>
              </div>
              <div className="auth-row">
                <div className="auth-field"><label>Awarding body</label><input value={form.payload.awardingBody || ''} onChange={(e) => setMeta('awardingBody', e.target.value)} placeholder="BCSP" /></div>
                <div className="auth-field"><label>Category</label><input value={form.payload.category || ''} onChange={(e) => setMeta('category', e.target.value)} placeholder="Safety / Project Management" /></div>
              </div>
              <div className="auth-field"><label>Short tagline</label><input value={form.short} onChange={(e) => setField('short', e.target.value)} placeholder="The gold-standard credential for senior safety professionals" /></div>
              <div className="auth-row">
                <div className="auth-field"><label>Duration (minutes)</label><input type="number" min="1" value={form.payload.sampleDurationMinutes ?? ''} onChange={(e) => setMeta('sampleDurationMinutes', Number(e.target.value))} /></div>
                <div className="auth-field"><label>Pass mark (%)</label><input type="number" min="1" max="100" value={form.payload.samplePassMarkPct ?? ''} onChange={(e) => setMeta('samplePassMarkPct', Number(e.target.value))} /></div>
              </div>
              <div className="auth-field"><label>Description</label><textarea rows={2} value={form.payload.description || ''} onChange={(e) => setMeta('description', e.target.value)} placeholder="One-line summary shown on the exam card." /></div>
              <label className="ax-check"><input type="checkbox" checked={form.published} onChange={(e) => setField('published', e.target.checked)} /> <span>Published (visible to students)</span></label>
            </div>

            <div className="ax-card">
              <div className="ax-h3-row">
                <h3 className="ax-h3">Questions <span className="ax-count">{questions.length}</span></h3>
                <button type="button" className="ax-chip" onClick={addQ}><i className="fas fa-plus" /> Add question</button>
              </div>

              {questions.map((q, i) => (
                <div className="ax-q" key={q.id || i}>
                  <div className="ax-q__head">
                    <span className="ax-q__num">Q{i + 1}</span>
                    <input className="ax-q__topic" value={q.topic || ''} onChange={(e) => patchQ(i, { topic: e.target.value })} placeholder="Topic / domain (optional)" />
                    <button type="button" className="ax-icon-btn ax-icon-btn--danger" title="Remove question" onClick={() => delQ(i)} disabled={questions.length <= 1}><i className="fas fa-trash" /></button>
                  </div>
                  <textarea className="ax-q__prompt" rows={2} value={q.question} onChange={(e) => patchQ(i, { question: e.target.value })} placeholder="Question text…" />
                  <div className="ax-opts">
                    {q.options.map((opt, oi) => (
                      <label className={`ax-opt${q.correctIndex === oi ? ' ax-opt--correct' : ''}`} key={oi}>
                        <input type="radio" name={`correct-${i}`} checked={q.correctIndex === oi} onChange={() => patchQ(i, { correctIndex: oi })} title="Mark as correct answer" />
                        <span className="ax-opt__letter">{String.fromCharCode(65 + oi)}</span>
                        <input className="ax-opt__text" value={opt} onChange={(e) => patchOpt(i, oi, e.target.value)} placeholder={`Option ${String.fromCharCode(65 + oi)}`} />
                        <button type="button" className="ax-icon-btn" title="Remove option" onClick={() => delOpt(i, oi)} disabled={q.options.length <= 2}><i className="fas fa-xmark" /></button>
                      </label>
                    ))}
                    <button type="button" className="ax-addopt" onClick={() => addOpt(i)} disabled={q.options.length >= 6}><i className="fas fa-plus" /> Add option</button>
                  </div>
                  <input className="ax-q__exp" value={q.explanation || ''} onChange={(e) => patchQ(i, { explanation: e.target.value })} placeholder="Explanation shown after answering (optional)" />
                </div>
              ))}
            </div>

            <div className="ax-actions">
              <button className="auth-btn" disabled={busy}>{busy ? 'Saving…' : (form.id ? <><i className="fas fa-floppy-disk" /> Save changes</> : <><i className="fas fa-plus" /> Create exam</>)}</button>
              <button type="button" className="ax-link" onClick={() => setShowJson((v) => !v)}>{showJson ? 'Hide' : 'Show'} raw JSON</button>
            </div>
            {showJson && <pre className="ax-jsonview">{JSON.stringify(form.payload, null, 2)}</pre>}
          </form>

          {/* list */}
          <aside className="ax-list">
            <h2 className="sd-h2">Catalogue {list && <span className="ax-count">{list.length}</span>}</h2>
            {!list && <p className="sd-empty"><i className="fas fa-spinner fa-spin" /> Loading…</p>}
            {list && list.map((ex) => (
              <div className={`ax-item${form.id === ex.id ? ' ax-item--active' : ''}`} key={ex.id}>
                <div className="ax-item__main">
                  <b>{ex.name}</b>
                  <span>/{ex.slug} · {(ex.sampleQuestions || []).length} Q{ex.published === false ? ' · draft' : ''}</span>
                </div>
                <div className="ax-item__act">
                  <button className="ax-icon-btn" title="Edit" onClick={() => editExam(ex)}><i className="fas fa-pen" /></button>
                  <button className="ax-icon-btn ax-icon-btn--danger" title="Delete" onClick={() => remove(ex)}><i className="fas fa-trash" /></button>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </main>
  );
}
