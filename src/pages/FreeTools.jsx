// Auto-generated from pages/free-tools.html. Edit freely — this file is the source of truth now.
import { useEffect } from 'react';
import PageHtml from '../components/PageHtml';

const HTML = `

  <section class="page-hero">
    <div class="page-hero__pattern" aria-hidden="true"></div>
    <i class="page-hero__icon-bg fas fa-tools" aria-hidden="true"></i>
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../index.html">Home</a><span class="breadcrumb__sep"><i class="fas fa-chevron-right"></i></span><span class="breadcrumb__current">Free Tools</span></nav>
      <div class="page-hero__content">
        <span class="eyebrow eyebrow--white">100% Free Online</span>
        <h1>HSE Tools & Calculators</h1>
        <p>Practical, browser-based safety tools built for professionals. Calculate incident rates, assess risk, estimate noise exposure, generate checklists — no software or login required.</p>
      </div>
    </div>
  </section>

  <section class="section section-white">
    <div class="container">

      <!-- Filter Tabs -->
      <div class="tool-tabs">
        <button class="tool-tab active">All Tools</button>
        <button class="tool-tab">Calculators</button>
        <button class="tool-tab">Risk Tools</button>
        <button class="tool-tab">Checklists</button>
      </div>

      <div class="tools-grid">

        <!-- 1. LTIFR Calculator -->
        <div class="tool-card reveal" id="ltifr-tool">
          <div class="tool-card__header">
            <div class="tool-card__icon"><i class="fas fa-calculator" style="color:var(--gold);"></i></div>
            <div><div class="tool-card__label">Calculator</div><div class="tool-card__title">LTIFR — Lost Time Injury Frequency Rate</div></div>
          </div>
          <p style="font-size:.88rem;color:var(--text-muted);margin-bottom:16px;">Calculate your Lost Time Injury Frequency Rate per million hours worked.</p>
          <div class="calc-row">
            <div class="calc-field"><label>Lost Time Injuries (LTIs)</label><input type="number" id="lti-count" placeholder="e.g. 3" min="0" oninput="calcLTIFR()"></div>
            <div class="calc-field"><label>Man Hours Worked</label><input type="number" id="lti-hours" placeholder="e.g. 500000" min="1" oninput="calcLTIFR()"></div>
          </div>
          <div class="calc-field" style="margin-bottom:16px;">
            <label>Multiplier</label>
            <select id="lti-mult" onchange="calcLTIFR()">
              <option value="1000000">1,000,000 (standard)</option>
              <option value="200000">200,000 (US OSHA)</option>
              <option value="100000">100,000</option>
            </select>
          </div>
          <div class="calc-result">
            <div>
              <div class="calc-result__label">LTIFR Result</div>
              <div class="calc-result__unit">per selected multiplier hours</div>
            </div>
            <div style="text-align:right;">
              <div class="calc-result__value" id="ltifr-result">—</div>
            </div>
          </div>
          <p style="font-size:.77rem;color:var(--text-muted);margin-top:10px;margin-bottom:0;"><strong>Formula:</strong> (LTIs × Multiplier) ÷ Man Hours Worked</p>
        </div>

        <!-- 2. TRIFR Calculator -->
        <div class="tool-card reveal" id="trifr-tool">
          <div class="tool-card__header">
            <div class="tool-card__icon"><i class="fas fa-chart-line" style="color:var(--blue);"></i></div>
            <div><div class="tool-card__label">Calculator</div><div class="tool-card__title">TRIFR — Total Recordable Injury Frequency Rate</div></div>
          </div>
          <p style="font-size:.88rem;color:var(--text-muted);margin-bottom:16px;">Includes all recordable injuries: LTIs, restricted work cases, and medical treatment cases.</p>
          <div class="calc-row">
            <div class="calc-field"><label>LTIs (Lost Time Injuries)</label><input type="number" id="tri-lti" placeholder="0" min="0" oninput="calcTRIFR()"></div>
            <div class="calc-field"><label>RWC (Restricted Work Cases)</label><input type="number" id="tri-rwc" placeholder="0" min="0" oninput="calcTRIFR()"></div>
          </div>
          <div class="calc-row">
            <div class="calc-field"><label>MTC (Medical Treatment Cases)</label><input type="number" id="tri-mtc" placeholder="0" min="0" oninput="calcTRIFR()"></div>
            <div class="calc-field"><label>Man Hours Worked</label><input type="number" id="tri-hours" placeholder="e.g. 500000" min="1" oninput="calcTRIFR()"></div>
          </div>
          <div class="calc-result">
            <div>
              <div class="calc-result__label">TRIFR Result</div>
              <div class="calc-result__unit">per 1,000,000 hours worked</div>
            </div>
            <div style="text-align:right;">
              <div class="calc-result__value" id="trifr-result">—</div>
            </div>
          </div>
          <p style="font-size:.77rem;color:var(--text-muted);margin-top:10px;margin-bottom:0;"><strong>Formula:</strong> ((LTI + RWC + MTC) × 1,000,000) ÷ Hours</p>
        </div>

        <!-- 3. Risk Rating Calculator -->
        <div class="tool-card reveal" id="risk-tool">
          <div class="tool-card__header">
            <div class="tool-card__icon"><i class="fas fa-exclamation-triangle" style="color:var(--gold);"></i></div>
            <div><div class="tool-card__label">Risk Tool</div><div class="tool-card__title">Risk Rating Calculator (Likelihood × Severity)</div></div>
          </div>
          <p style="font-size:.88rem;color:var(--text-muted);margin-bottom:16px;">Standard 5×5 risk matrix. Select likelihood and severity to calculate your risk score and rating.</p>
          <div class="calc-row">
            <div class="calc-field">
              <label>Likelihood (1–5)</label>
              <select id="risk-likelihood" onchange="calcRisk()">
                <option value="">Select</option>
                <option value="1">1 — Rare</option>
                <option value="2">2 — Unlikely</option>
                <option value="3">3 — Possible</option>
                <option value="4">4 — Likely</option>
                <option value="5">5 — Almost Certain</option>
              </select>
            </div>
            <div class="calc-field">
              <label>Severity / Consequence (1–5)</label>
              <select id="risk-severity" onchange="calcRisk()">
                <option value="">Select</option>
                <option value="1">1 — Negligible</option>
                <option value="2">2 — Minor</option>
                <option value="3">3 — Moderate</option>
                <option value="4">4 — Major</option>
                <option value="5">5 — Catastrophic</option>
              </select>
            </div>
          </div>
          <div class="calc-result" id="risk-result-bar">
            <div>
              <div class="calc-result__label">Risk Score</div>
              <div class="calc-result__unit" id="risk-rating-label">Select both values</div>
            </div>
            <div style="text-align:right;">
              <div class="calc-result__value" id="risk-score">—</div>
            </div>
          </div>
          <div style="margin-top:14px;padding:12px 16px;border-radius:var(--radius-sm);font-size:.85rem;font-weight:600;display:none;text-align:center;" id="risk-action-box"></div>
        </div>

        <!-- 4. Safety Observation Rate -->
        <div class="tool-card reveal">
          <div class="tool-card__header">
            <div class="tool-card__icon"><i class="fas fa-eye" style="color:var(--blue);"></i></div>
            <div><div class="tool-card__label">Calculator</div><div class="tool-card__title">Safety Observation Rate (SOR)</div></div>
          </div>
          <p style="font-size:.88rem;color:var(--text-muted);margin-bottom:16px;">Measure the frequency of safety observations per worker per period to benchmark your safety culture engagement.</p>
          <div class="calc-row">
            <div class="calc-field"><label>Total Observations Made</label><input type="number" id="sor-obs" placeholder="e.g. 120" min="0" oninput="calcSOR()"></div>
            <div class="calc-field"><label>Number of Workers</label><input type="number" id="sor-workers" placeholder="e.g. 60" min="1" oninput="calcSOR()"></div>
          </div>
          <div class="calc-field" style="margin-bottom:16px;">
            <label>Period</label>
            <select id="sor-period" onchange="calcSOR()">
              <option value="1">Monthly</option>
              <option value="3">Quarterly</option>
              <option value="12">Annual</option>
            </select>
          </div>
          <div class="calc-result">
            <div>
              <div class="calc-result__label">Observations per Worker per Month</div>
            </div>
            <div style="text-align:right;">
              <div class="calc-result__value" id="sor-result">—</div>
            </div>
          </div>
          <p style="font-size:.77rem;color:var(--text-muted);margin-top:10px;margin-bottom:0;"><strong>Target:</strong> Minimum 2–4 observations per worker per month for an engaged culture.</p>
        </div>

        <!-- 5. Noise Exposure Estimator -->
        <div class="tool-card reveal">
          <div class="tool-card__header">
            <div class="tool-card__icon"><i class="fas fa-volume-up" style="color:var(--gold);"></i></div>
            <div><div class="tool-card__label">Risk Tool</div><div class="tool-card__title">Daily Noise Exposure Estimator (LEP,d)</div></div>
          </div>
          <p style="font-size:.88rem;color:var(--text-muted);margin-bottom:16px;">Estimate daily personal noise exposure. Action level: 80 dB(A). Limit: 85 dB(A) — per Control of Noise at Work Regulations.</p>
          <div class="calc-row">
            <div class="calc-field"><label>Noise Level (dB(A))</label><input type="number" id="noise-level" placeholder="e.g. 88" min="70" max="140" oninput="calcNoise()"></div>
            <div class="calc-field"><label>Exposure Duration (hours/day)</label><input type="number" id="noise-hours" placeholder="e.g. 4" min="0.5" max="24" step="0.5" oninput="calcNoise()"></div>
          </div>
          <div style="margin-bottom:16px;">
            <div style="font-size:.8rem;font-weight:600;color:var(--text-muted);margin-bottom:6px;">Daily Dose Used</div>
            <div class="noise-bar-wrap"><div class="noise-bar" id="noise-bar" style="width:0%;background:var(--blue);"></div></div>
            <div style="display:flex;justify-content:space-between;font-size:.72rem;color:var(--text-muted);"><span>0%</span><span>Action Level</span><span>Limit</span><span>100%+</span></div>
          </div>
          <div class="calc-result">
            <div>
              <div class="calc-result__label">Daily Dose</div>
              <div class="calc-result__unit" id="noise-label">Enter values above</div>
            </div>
            <div style="text-align:right;">
              <div class="calc-result__value" id="noise-result">—</div>
            </div>
          </div>
        </div>

        <!-- 6. Working at Height Checklist -->
        <div class="tool-card reveal">
          <div class="tool-card__header">
            <div class="tool-card__icon"><i class="fas fa-hard-hat" style="color:var(--blue);"></i></div>
            <div><div class="tool-card__label">Checklist</div><div class="tool-card__title">Working at Height Pre-Task Checklist</div></div>
          </div>
          <p style="font-size:.88rem;color:var(--text-muted);margin-bottom:16px;">Interactive pre-task checklist for working at height activities. Tick off each item before work begins.</p>
          <div id="wah-checklist">
            <div class="cl-item"><input type="checkbox" id="wah1" onchange="updateCL('wah')"><label for="wah1">Risk assessment completed and communicated to all workers</label></div>
            <div class="cl-item"><input type="checkbox" id="wah2" onchange="updateCL('wah')"><label for="wah2">Competent persons identified and briefed</label></div>
            <div class="cl-item"><input type="checkbox" id="wah3" onchange="updateCL('wah')"><label for="wah3">Permit to Work issued and signed (if required)</label></div>
            <div class="cl-item"><input type="checkbox" id="wah4" onchange="updateCL('wah')"><label for="wah4">Edge protection or fall arrest system in place and inspected</label></div>
            <div class="cl-item"><input type="checkbox" id="wah5" onchange="updateCL('wah')"><label for="wah5">Personal Protective Equipment (harness, hard hat) inspected and worn</label></div>
            <div class="cl-item"><input type="checkbox" id="wah6" onchange="updateCL('wah')"><label for="wah6">Weather conditions assessed — no work in high winds / lightning</label></div>
            <div class="cl-item"><input type="checkbox" id="wah7" onchange="updateCL('wah')"><label for="wah7">Emergency rescue plan in place and rescue equipment available</label></div>
            <div class="cl-item"><input type="checkbox" id="wah8" onchange="updateCL('wah')"><label for="wah8">Exclusion zone established below work area</label></div>
          </div>
          <div style="margin-top:16px;padding:10px 16px;border-radius:var(--radius-sm);background:var(--navy-xlight,#e6f4ee);display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:.85rem;font-weight:600;">Completion</span>
            <span style="font-weight:700;color:var(--blue);" id="wah-progress">0 / 8</span>
          </div>
          <div style="margin-top:12px;display:flex;gap:10px;">
            <button class="btn btn-outline-navy btn-sm" onclick="resetCL('wah',8)"><i class="fas fa-redo"></i> Reset</button>
            <button class="btn btn-gold btn-sm" onclick="printChecklist()"><i class="fas fa-print"></i> Print Checklist</button>
          </div>
        </div>

        <!-- 7. Incident Rate Comparison -->
        <div class="tool-card reveal">
          <div class="tool-card__header">
            <div class="tool-card__icon"><i class="fas fa-balance-scale" style="color:var(--gold);"></i></div>
            <div><div class="tool-card__label">Benchmarking</div><div class="tool-card__title">LTIFR Industry Benchmark Comparison</div></div>
          </div>
          <p style="font-size:.88rem;color:var(--text-muted);margin-bottom:16px;">Enter your LTIFR and compare against published industry benchmarks to see where your organisation stands.</p>
          <div class="calc-row">
            <div class="calc-field"><label>Your LTIFR</label><input type="number" id="bench-ltifr" placeholder="e.g. 2.5" step="0.1" min="0" oninput="calcBench()"></div>
            <div class="calc-field">
              <label>Industry Sector</label>
              <select id="bench-sector" onchange="calcBench()">
                <option value="">Select industry</option>
                <option value="0.5">Oil & Gas (0.5 avg)</option>
                <option value="1.2">Construction (1.2 avg)</option>
                <option value="0.8">Manufacturing (0.8 avg)</option>
                <option value="0.3">Utilities (0.3 avg)</option>
                <option value="2.1">Transport & Logistics (2.1 avg)</option>
                <option value="0.6">Mining (0.6 avg)</option>
                <option value="0.9">Healthcare (0.9 avg)</option>
              </select>
            </div>
          </div>
          <div id="bench-result" style="display:none;">
            <div class="calc-result" style="margin-bottom:12px;">
              <div>
                <div class="calc-result__label">Your Performance vs Industry Avg</div>
                <div class="calc-result__unit" id="bench-label">—</div>
              </div>
              <div style="text-align:right;"><div class="calc-result__value" id="bench-pct">—</div></div>
            </div>
            <div id="bench-msg" style="padding:12px 16px;border-radius:var(--radius-sm);font-size:.85rem;font-weight:500;"></div>
          </div>
        </div>

        <!-- 8. Confined Space Entry Checklist -->
        <div class="tool-card reveal">
          <div class="tool-card__header">
            <div class="tool-card__icon"><i class="fas fa-door-open" style="color:var(--blue);"></i></div>
            <div><div class="tool-card__label">Checklist</div><div class="tool-card__title">Confined Space Entry Checklist</div></div>
          </div>
          <p style="font-size:.88rem;color:var(--text-muted);margin-bottom:16px;">Essential pre-entry checks for confined space operations. All items must be confirmed before entry is permitted.</p>
          <div id="cse-checklist">
            <div class="cl-item"><input type="checkbox" id="cse1" onchange="updateCL('cse')"><label for="cse1">Entry Permit issued by competent authority and displayed</label></div>
            <div class="cl-item"><input type="checkbox" id="cse2" onchange="updateCL('cse')"><label for="cse2">Atmosphere tested: O₂ 19.5–23.5%, LEL &lt;10%, toxic gases &lt; OEL</label></div>
            <div class="cl-item"><input type="checkbox" id="cse3" onchange="updateCL('cse')"><label for="cse3">Continuous gas monitoring equipment in place and alarmed</label></div>
            <div class="cl-item"><input type="checkbox" id="cse4" onchange="updateCL('cse')"><label for="cse4">Isolation confirmed: lock-out/tag-out applied to all energy sources</label></div>
            <div class="cl-item"><input type="checkbox" id="cse5" onchange="updateCL('cse')"><label for="cse5">Standby person stationed at entry point with communication</label></div>
            <div class="cl-item"><input type="checkbox" id="cse6" onchange="updateCL('cse')"><label for="cse6">Rescue equipment (tripod, winch, harness) available and tested</label></div>
            <div class="cl-item"><input type="checkbox" id="cse7" onchange="updateCL('cse')"><label for="cse7">Entrant briefed on hazards, rescue plan, and emergency signals</label></div>
            <div class="cl-item"><input type="checkbox" id="cse8" onchange="updateCL('cse')"><label for="cse8">Ventilation system operating and atmospheric conditions stable</label></div>
            <div class="cl-item"><input type="checkbox" id="cse9" onchange="updateCL('cse')"><label for="cse9">PPE inspected: SCBA/SABA (if required), gloves, coveralls, boots</label></div>
          </div>
          <div style="margin-top:16px;padding:10px 16px;border-radius:var(--radius-sm);background:var(--navy-xlight,#e6f4ee);display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:.85rem;font-weight:600;">Completion</span>
            <span style="font-weight:700;color:var(--blue);" id="cse-progress">0 / 9</span>
          </div>
          <div style="margin-top:12px;display:flex;gap:10px;">
            <button class="btn btn-outline-navy btn-sm" onclick="resetCL('cse',9)"><i class="fas fa-redo"></i> Reset</button>
            <button class="btn btn-gold btn-sm" onclick="printChecklist()"><i class="fas fa-print"></i> Print</button>
          </div>
        </div>

      </div>

      <!-- Download CTA -->
      <div class="reveal" style="background:var(--navy);border-radius:var(--radius-lg);padding:48px;text-align:center;margin-top:60px;">
        <i class="fas fa-file-download" style="font-size:2.5rem;color:var(--gold);margin-bottom:16px;display:block;"></i>
        <h3 style="color:#fff;margin-bottom:8px;">Want Printable PDF Versions?</h3>
        <p style="color:rgba(255,255,255,.7);margin-bottom:24px;max-width:520px;margin-left:auto;margin-right:auto;">Download our full suite of HSE checklists, templates, and calculators as PDF and Excel files — ready to use on-site.</p>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
          <a href="resources.html" class="btn btn-gold"><i class="fas fa-download"></i> Browse Free Resources</a>
          <a href="book-consultation.html" class="btn btn-outline-white"><i class="fas fa-calendar-check"></i> Get Custom Tools</a>
        </div>
      </div>

    </div>
  </section>

`;

export default function FreeTools() {
  useEffect(() => {
    document.title = "Free HSE Tools & Calculators — Risk, Incident Rate & Safety Metrics | Ansar Mahmood";
  }, []);
  return <PageHtml html={HTML} />;
}
