import { useEffect, useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import courses from '../data/courses.json';
import { API_BASE } from '../config';
import PageBanner from '../components/PageBanner';

const LEVEL_LABELS = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };

const STEPS = [
  { key: 'course', label: 'Your Course', icon: 'fa-graduation-cap' },
  { key: 'details', label: 'Your Details', icon: 'fa-user' },
  { key: 'background', label: 'Background', icon: 'fa-briefcase' },
  { key: 'confirm', label: 'Goals & Confirm', icon: 'fa-paper-plane' },
];

const NATIONALITIES = ['United Arab Emirates', 'Saudi Arabia', 'United Kingdom', 'United States', 'Pakistan', 'India', 'Nigeria', 'Canada', 'Australia', 'South Africa', 'Other'];
const INDUSTRIES = ['Oil & Gas', 'Construction', 'Manufacturing', 'Healthcare', 'Mining & Extractives', 'Transport & Logistics', 'Utilities / Energy', 'Government / Public Sector', 'Consulting', 'Other'];
const EXPERIENCE = ['Less than 1 year', '1–2 years', '3–5 years', '6–10 years', '10+ years'];
const EDUCATION = ['High School / Secondary', 'Diploma / HND', "Bachelor's Degree", "Master's Degree", 'PhD / Doctorate', 'Professional Qualification'];
const FUNDING = ['Self-funded', 'Employer sponsored', 'Government / scholarship', 'Part employer / part self', 'Other'];
const REFERRALS = ['Google / Search', 'LinkedIn', 'Colleague referral', 'Newsletter', 'Previous course / client', 'Social media', 'Other'];
const QUALS = ['IOSH Managing Safely', 'OSHA 30-Hour', 'ISO 45001 Internal Auditor', 'HABC First Aid', 'OTHM Level 3', 'None yet'];
const MODES = ['Online Live (Zoom)', 'In-Person', 'Blended (Self-study + Live)', 'Corporate On-Site'];

const REQUIRED = {
  course: ['course', 'preferred_intake', 'delivery_mode'],
  details: ['first_name', 'last_name', 'email', 'phone', 'country'],
  background: ['job_title', 'organisation'],
  confirm: ['motivation', 'declaration_accurate', 'declaration_consent'],
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyForm = {
  course: '', preferred_intake: '', delivery_mode: '',
  first_name: '', last_name: '', email: '', phone: '', country: '', nationality: '', dob: '',
  job_title: '', organisation: '', industry: '', experience_years: '', education_level: '', study_field: '',
  motivation: '', funding: '', sponsor_name: '', referral_source: '', special_requirements: '',
  declaration_accurate: false, declaration_consent: false, newsletter_opt: false,
};

function Field({ label, name, type = 'text', value, onChange, error, required, placeholder, children, span }) {
  const id = `f_${name}`;
  return (
    <div className={`adm-field${span ? ' adm-field--span' : ''}`}>
      <label className="adm-label" htmlFor={id}>{label}{required && <span className="adm-req">*</span>}</label>
      {children ? (
        children
      ) : type === 'textarea' ? (
        <textarea id={id} name={name} className={`adm-input adm-textarea${error ? ' is-error' : ''}`} value={value} onChange={onChange} placeholder={placeholder} rows={4} />
      ) : (
        <input id={id} name={name} type={type} className={`adm-input${error ? ' is-error' : ''}`} value={value} onChange={onChange} placeholder={placeholder} />
      )}
      {error && <span className="adm-error"><i className="fas fa-circle-exclamation"></i>{error}</span>}
    </div>
  );
}

export default function CourseAdmission() {
  useEffect(() => { document.title = 'Course Admission & Enrolment | Ansar Mahmood HSE Training'; }, []);

  const [step, setStep] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [statusMsg, setStatusMsg] = useState('');

  const grouped = useMemo(() => {
    const m = { beginner: [], intermediate: [], advanced: [] };
    courses.filter((c) => c.published !== false).forEach((c) => (m[c.level] || (m[c.level] = [])).push(c));
    return m;
  }, []);

  const selectedCourse = useMemo(() => courses.find((c) => c.title.trim() === form.course), [form.course]);

  const set = useCallback((name, val) => {
    setForm((f) => ({ ...f, [name]: val }));
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e));
  }, []);

  const onInput = useCallback((e) => {
    const { name, type, checked, value } = e.target;
    set(name, type === 'checkbox' ? checked : value);
  }, [set]);

  // When a course is picked, prefill suggested intake + mode.
  const onCourseChange = useCallback((e) => {
    const title = e.target.value;
    const c = courses.find((x) => x.title.trim() === title);
    setForm((f) => ({
      ...f,
      course: title,
      preferred_intake: c ? `${c.start_display} — ${c.mode}` : f.preferred_intake,
      delivery_mode: c ? (MODES.find((m) => m.toLowerCase().startsWith((c.mode || '').toLowerCase().split(' ')[0])) || f.delivery_mode) : f.delivery_mode,
    }));
    setErrors((er) => ({ ...er, course: undefined }));
  }, []);

  const validateStep = useCallback((s) => {
    const req = REQUIRED[STEPS[s].key];
    const e = {};
    req.forEach((k) => {
      const v = form[k];
      if (typeof v === 'boolean') { if (!v) e[k] = 'Required'; }
      else if (!v || !String(v).trim()) e[k] = 'This field is required';
    });
    if (req.includes('email') && form.email && !EMAIL_RE.test(form.email)) e.email = 'Enter a valid email address';
    return e;
  }, [form]);

  const go = useCallback((target) => {
    if (target > step) {
      const e = validateStep(step);
      if (Object.keys(e).length) { setErrors(e); return; }
    }
    if (target <= maxReached || target <= step + 1) {
      setStep(target);
      setMaxReached((m) => Math.max(m, target));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step, maxReached, validateStep]);

  const submit = useCallback(async (e) => {
    e.preventDefault();
    const allErr = { ...validateStep(3) };
    if (Object.keys(allErr).length) { setErrors(allErr); return; }
    setStatus('sending');
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k === 'declaration_accurate' || k === 'declaration_consent' || k === 'newsletter_opt') fd.append(k, v ? 'yes' : '');
      else fd.append(k, v);
    });
    fd.append('source', 'course-admission-form');
    fd.append('website', '');
    try {
      const res = await fetch(`${API_BASE}/forms/admission-handler.php`, {
        method: 'POST', body: fd, headers: { 'X-Requested-With': 'XMLHttpRequest' },
      });
      if (!res.ok) throw new Error(`Server ${res.status}`);
      const data = await res.json();
      if (data.success) { setStatus('done'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
      else { setStatus('error'); setStatusMsg(data.message || 'Something went wrong. Please try again.'); }
    } catch {
      setStatus('error');
      setStatusMsg('We could not submit your application right now. Please email ansar@ansarmahmood.com or try again shortly.');
    }
  }, [form, validateStep]);

  if (status === 'done') {
    return (
      <section className="section section-white">
        <div className="container" style={{ maxWidth: 640 }}>
          <div className="adm-success reveal">
            <div className="adm-success__icon"><i className="fas fa-check"></i></div>
            <h1>Application received</h1>
            <p>Thank you, {form.first_name || 'there'}. Your application for <strong>{form.course}</strong> has been submitted. You'll get a confirmation email within 24 hours with eligibility confirmation, next steps, and payment details.</p>
            <div className="adm-success__actions">
              <Link to="/course-calendar" className="btn btn-gold btn-lg"><i className="fas fa-calendar-alt"></i> Browse More Courses</Link>
              <Link to="/" className="btn btn-outline-navy btn-lg">Back to Home</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const pct = ((step + (status === 'sending' ? 1 : 0)) / (STEPS.length - 1)) * 100;

  return (
    <>
      <PageBanner route="course-admission" icon="fa-user-plus" />

      <section className="section section-gray">
        <div className="container adm-wrap">
          <div className="adm-card">
            {/* Stepper */}
            <div className="adm-stepper" role="tablist" aria-label="Application steps">
              <div className="adm-stepper__track"><div className="adm-stepper__fill" style={{ width: `${pct}%` }} /></div>
              {STEPS.map((s, i) => {
                const state = i < step ? 'done' : i === step ? 'active' : 'todo';
                return (
                  <button
                    key={s.key}
                    type="button"
                    className={`adm-stepper__item is-${state}`}
                    onClick={() => i <= maxReached && go(i)}
                    aria-selected={i === step}
                    disabled={i > maxReached}
                  >
                    <span className="adm-stepper__dot">{i < step ? <i className="fas fa-check"></i> : <i className={`fas ${s.icon}`}></i>}</span>
                    <span className="adm-stepper__label">{s.label}</span>
                  </button>
                );
              })}
            </div>

            <form onSubmit={submit} noValidate>
              <div className="adm-step" key={step}>
                {/* STEP 1 — COURSE */}
                {step === 0 && (
                  <>
                    <h2 className="adm-step__title">Which course are you applying for?</h2>
                    <p className="adm-step__sub">Pick your programme and preferred intake. We'll tailor delivery and examples to your context.</p>
                    <div className="adm-grid">
                      <Field label="Course" name="course" required error={errors.course} span>
                        <select id="f_course" name="course" className={`adm-input${errors.course ? ' is-error' : ''}`} value={form.course} onChange={onCourseChange}>
                          <option value="">— Select a course —</option>
                          {['beginner', 'intermediate', 'advanced'].map((lvl) => grouped[lvl]?.length ? (
                            <optgroup key={lvl} label={`${LEVEL_LABELS[lvl]} level`}>
                              {grouped[lvl].map((c) => <option key={c.id} value={c.title.trim()}>{c.title.trim()} — {c.price}</option>)}
                            </optgroup>
                          ) : null)}
                        </select>
                      </Field>
                      <Field label="Preferred intake / start" name="preferred_intake" required error={errors.preferred_intake}>
                        <select id="f_intake" name="preferred_intake" className={`adm-input${errors.preferred_intake ? ' is-error' : ''}`} value={form.preferred_intake} onChange={onInput}>
                          <option value="">— Select intake —</option>
                          {selectedCourse && <option value={`${selectedCourse.start_display} — ${selectedCourse.mode}`}>{selectedCourse.start_display} — {selectedCourse.mode}</option>}
                          <option value="Flexible — next available">Flexible — next available</option>
                          <option value="Corporate on-site — custom date">Corporate on-site — custom date</option>
                        </select>
                      </Field>
                      <Field label="Delivery mode" name="delivery_mode" required error={errors.delivery_mode}>
                        <select id="f_mode" name="delivery_mode" className={`adm-input${errors.delivery_mode ? ' is-error' : ''}`} value={form.delivery_mode} onChange={onInput}>
                          <option value="">— Select mode —</option>
                          {MODES.map((m) => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </Field>
                    </div>

                    {selectedCourse && (
                      <div className="adm-coursecard reveal">
                        <div className="adm-coursecard__head">
                          <span className="adm-coursecard__lvl">{selectedCourse.level_label}</span>
                          <span className="adm-coursecard__accr">{selectedCourse.accreditor}</span>
                        </div>
                        <h4>{selectedCourse.title.trim()}</h4>
                        <div className="adm-coursecard__facts">
                          <span><i className="fas fa-calendar-day"></i>{selectedCourse.start_display}</span>
                          <span><i className="fas fa-clock"></i>{selectedCourse.duration}</span>
                          <span><i className="fas fa-laptop"></i>{selectedCourse.mode}</span>
                          <span className="adm-coursecard__price">{selectedCourse.price}</span>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* STEP 2 — DETAILS */}
                {step === 1 && (
                  <>
                    <h2 className="adm-step__title">Tell us about you</h2>
                    <p className="adm-step__sub">Your contact details — we'll send your confirmation and joining instructions here.</p>
                    <div className="adm-grid">
                      <Field label="First name" name="first_name" required value={form.first_name} onChange={onInput} error={errors.first_name} placeholder="e.g. Ahmed" />
                      <Field label="Last name" name="last_name" required value={form.last_name} onChange={onInput} error={errors.last_name} placeholder="e.g. Al-Rashid" />
                      <Field label="Email address" name="email" type="email" required value={form.email} onChange={onInput} error={errors.email} placeholder="you@example.com" />
                      <Field label="Phone / WhatsApp" name="phone" type="tel" required value={form.phone} onChange={onInput} error={errors.phone} placeholder="+971 50 123 4567" />
                      <Field label="Country of residence" name="country" required value={form.country} onChange={onInput} error={errors.country} placeholder="e.g. United Arab Emirates" />
                      <Field label="Nationality" name="nationality">
                        <select id="f_nat" name="nationality" className="adm-input" value={form.nationality} onChange={onInput}>
                          <option value="">— Select —</option>
                          {NATIONALITIES.map((n) => <option key={n}>{n}</option>)}
                        </select>
                      </Field>
                      <Field label="Date of birth" name="dob" type="date" value={form.dob} onChange={onInput} />
                    </div>
                  </>
                )}

                {/* STEP 3 — BACKGROUND */}
                {step === 2 && (
                  <>
                    <h2 className="adm-step__title">Your professional background</h2>
                    <p className="adm-step__sub">This helps us pitch the course at the right level and use relevant industry examples.</p>
                    <div className="adm-grid">
                      <Field label="Current job title" name="job_title" required value={form.job_title} onChange={onInput} error={errors.job_title} placeholder="e.g. HSE Manager" />
                      <Field label="Organisation / employer" name="organisation" required value={form.organisation} onChange={onInput} error={errors.organisation} placeholder="Company name" />
                      <Field label="Industry sector" name="industry">
                        <select id="f_ind" name="industry" className="adm-input" value={form.industry} onChange={onInput}>
                          <option value="">— Select —</option>
                          {INDUSTRIES.map((n) => <option key={n}>{n}</option>)}
                        </select>
                      </Field>
                      <Field label="Years of HSE experience" name="experience_years">
                        <select id="f_exp" name="experience_years" className="adm-input" value={form.experience_years} onChange={onInput}>
                          <option value="">— Select —</option>
                          {EXPERIENCE.map((n) => <option key={n}>{n}</option>)}
                        </select>
                      </Field>
                      <Field label="Highest education level" name="education_level">
                        <select id="f_edu" name="education_level" className="adm-input" value={form.education_level} onChange={onInput}>
                          <option value="">— Select —</option>
                          {EDUCATION.map((n) => <option key={n}>{n}</option>)}
                        </select>
                      </Field>
                      <Field label="Field of study" name="study_field" value={form.study_field} onChange={onInput} placeholder="e.g. Engineering, Science" />
                      <div className="adm-field adm-field--span">
                        <label className="adm-label">Existing HSE qualifications</label>
                        <div className="adm-checks">
                          {QUALS.map((q) => {
                            const active = (form.quals || []).includes?.(q);
                            const arr = Array.isArray(form.quals) ? form.quals : [];
                            return (
                              <button type="button" key={q}
                                className={`adm-chip${active ? ' is-on' : ''}`}
                                onClick={() => set('quals', active ? arr.filter((x) => x !== q) : [...arr, q])}>
                                <i className={`fas ${active ? 'fa-check-circle' : 'fa-circle'}`}></i>{q}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* STEP 4 — CONFIRM */}
                {step === 3 && (
                  <>
                    <h2 className="adm-step__title">Your goals & confirmation</h2>
                    <p className="adm-step__sub">Almost done — tell us your goals and confirm the declarations below.</p>
                    <div className="adm-grid">
                      <Field label="Why are you applying for this course?" name="motivation" type="textarea" required value={form.motivation} onChange={onInput} error={errors.motivation} placeholder="Your career goals and how this course fits your development plan…" span />
                      <Field label="Funding / sponsorship" name="funding">
                        <select id="f_fund" name="funding" className="adm-input" value={form.funding} onChange={onInput}>
                          <option value="">— Select —</option>
                          {FUNDING.map((n) => <option key={n}>{n}</option>)}
                        </select>
                      </Field>
                      <Field label="How did you hear about us?" name="referral_source">
                        <select id="f_ref" name="referral_source" className="adm-input" value={form.referral_source} onChange={onInput}>
                          <option value="">— Select —</option>
                          {REFERRALS.map((n) => <option key={n}>{n}</option>)}
                        </select>
                      </Field>
                      <Field label="Special requirements / notes" name="special_requirements" type="textarea" value={form.special_requirements} onChange={onInput} placeholder="Accessibility needs, preferred session time, or any questions…" span />
                    </div>

                    <div className="adm-declare">
                      <label className={`adm-consent${errors.declaration_accurate ? ' is-error' : ''}`}>
                        <input type="checkbox" name="declaration_accurate" checked={form.declaration_accurate} onChange={onInput} />
                        <span className="adm-consent__box"><i className="fas fa-check"></i></span>
                        <span>I confirm all information provided is accurate and complete. <span className="adm-req">*</span></span>
                      </label>
                      <label className={`adm-consent${errors.declaration_consent ? ' is-error' : ''}`}>
                        <input type="checkbox" name="declaration_consent" checked={form.declaration_consent} onChange={onInput} />
                        <span className="adm-consent__box"><i className="fas fa-check"></i></span>
                        <span>I consent to being contacted about this application and HSE training services. <span className="adm-req">*</span></span>
                      </label>
                      <label className="adm-consent">
                        <input type="checkbox" name="newsletter_opt" checked={form.newsletter_opt} onChange={onInput} />
                        <span className="adm-consent__box"><i className="fas fa-check"></i></span>
                        <span>Send me the free monthly HSE newsletter (optional).</span>
                      </label>
                    </div>

                    {status === 'error' && <div className="adm-formstatus is-error"><i className="fas fa-triangle-exclamation"></i>{statusMsg}</div>}
                  </>
                )}
              </div>

              {/* Nav */}
              <div className="adm-nav">
                <button type="button" className="btn btn-outline-navy" onClick={() => go(step - 1)} disabled={step === 0} style={{ visibility: step === 0 ? 'hidden' : 'visible' }}>
                  <i className="fas fa-arrow-left"></i> Back
                </button>
                <span className="adm-nav__count">Step {step + 1} of {STEPS.length}</span>
                {step < STEPS.length - 1 ? (
                  <button type="button" className="btn btn-primary" onClick={() => go(step + 1)}>
                    Continue <i className="fas fa-arrow-right"></i>
                  </button>
                ) : (
                  <button type="submit" className="btn btn-gold" disabled={status === 'sending'}>
                    {status === 'sending' ? <><i className="fas fa-spinner fa-spin"></i> Submitting…</> : <><i className="fas fa-paper-plane"></i> Submit Application</>}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Summary sidebar */}
          <aside className="adm-summary">
            <div className="adm-summary__card">
              <h4><i className="fas fa-clipboard-list"></i> Your application</h4>
              <dl className="adm-summary__list">
                <div><dt>Course</dt><dd>{form.course || <em>Not selected yet</em>}</dd></div>
                {selectedCourse && <div><dt>Investment</dt><dd>{selectedCourse.price}</dd></div>}
                <div><dt>Intake</dt><dd>{form.preferred_intake || <em>—</em>}</dd></div>
                <div><dt>Applicant</dt><dd>{[form.first_name, form.last_name].filter(Boolean).join(' ') || <em>—</em>}</dd></div>
              </dl>
            </div>
            <div className="adm-summary__steps">
              <h5>What happens next</h5>
              {['Application received — instant email confirmation', 'Eligibility review within 24 hours', 'Formal enrolment offer with fees & terms', 'Pay within 7 days to secure your seat', 'Course materials sent 48h before start'].map((t, i) => (
                <div className="adm-summary__step" key={i}><span>{i + 1}</span><p>{t}</p></div>
              ))}
            </div>
            <div className="adm-summary__help">
              <p>Not sure which course fits? Book a free 15-minute advisory call.</p>
              <Link to="/book-consultation" className="btn btn-gold btn-sm" style={{ width: '100%', justifyContent: 'center' }}><i className="fas fa-calendar-check"></i> Book Free Call</Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
