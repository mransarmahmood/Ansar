import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';

const fmt = (n) =>
  isFinite(n)
    ? n.toLocaleString(undefined, { maximumFractionDigits: 0 })
    : '0';

export default function RoiCalculator() {
  const [employees, setEmployees] = useState(250);
  const [incidents, setIncidents] = useState(12);
  const [costPer, setCostPer] = useState(8000);
  const [ltifr, setLtifr] = useState('');
  const [investment, setInvestment] = useState(25000);

  const inc = Math.max(0, Number(incidents) || 0);
  const cost = Math.max(0, Number(costPer) || 0);
  const invest = Math.max(0, Number(investment) || 0);

  const annualCost = inc * cost;

  const scenarios = [20, 30, 50].map((reduction) => {
    const incidentsAvoided = inc * (reduction / 100);
    const savings = incidentsAvoided * cost;
    const payback =
      invest > 0 && savings > 0 ? (invest / savings) * 12 : null; // months
    const roi = invest > 0 ? ((savings - invest) / invest) * 100 : null;
    return { reduction, incidentsAvoided, savings, payback, roi };
  });

  return (
    <main className="roi-page">
      <PageBanner route="roi-calculator" icon="fa-calculator" />

      <div className="container roi-body">
        <div className="roi-grid">
          <form className="roi-inputs" onSubmit={(e) => e.preventDefault()}>
            <h2>Your numbers</h2>

            <label className="roi-field">
              <span>Number of employees</span>
              <input
                type="number"
                min="0"
                value={employees}
                onChange={(e) => setEmployees(e.target.value)}
              />
            </label>

            <label className="roi-field">
              <span>Current annual incidents</span>
              <input
                type="number"
                min="0"
                value={incidents}
                onChange={(e) => setIncidents(e.target.value)}
              />
            </label>

            <label className="roi-field">
              <span>Average cost per incident</span>
              <input
                type="number"
                min="0"
                value={costPer}
                onChange={(e) => setCostPer(e.target.value)}
              />
              <small>Direct + indirect (downtime, fines, claims).</small>
            </label>

            <label className="roi-field">
              <span>
                Current LTIFR <em>(optional)</em>
              </span>
              <input
                type="number"
                min="0"
                step="0.1"
                value={ltifr}
                onChange={(e) => setLtifr(e.target.value)}
                placeholder="e.g. 3.4"
              />
            </label>

            <label className="roi-field">
              <span>
                Annual HSE investment <em>(optional)</em>
              </span>
              <input
                type="number"
                min="0"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                placeholder="e.g. 25000"
              />
              <small>Training, systems, consulting spend.</small>
            </label>
          </form>

          <div className="roi-results">
            <div className="roi-panel roi-panel--cost">
              <span className="roi-panel__label">Estimated current cost of incidents</span>
              <strong className="roi-panel__big">{fmt(annualCost)}</strong>
              <span className="roi-panel__sub">per year</span>
            </div>

            <h3 className="roi-scenarios-title">Potential annual savings</h3>
            <div className="roi-scenarios">
              {scenarios.map((s) => (
                <div className="roi-scenario" key={s.reduction}>
                  <span className="roi-scenario__pct">{s.reduction}%</span>
                  <span className="roi-scenario__caption">fewer incidents</span>
                  <strong className="roi-scenario__save">{fmt(s.savings)}</strong>
                  <span className="roi-scenario__meta">
                    ~{s.incidentsAvoided.toFixed(1)} incidents avoided
                  </span>
                  {s.payback != null && (
                    <span className="roi-scenario__payback">
                      Payback in {s.payback < 1 ? '<1' : Math.round(s.payback)} month
                      {Math.round(s.payback) === 1 ? '' : 's'}
                    </span>
                  )}
                  {s.roi != null && (
                    <span className="roi-scenario__roi">
                      {s.roi >= 0 ? '+' : ''}
                      {fmt(s.roi)}% ROI
                    </span>
                  )}
                </div>
              ))}
            </div>

            <p className="roi-method">
              <strong>Methodology:</strong> Savings = current annual incidents ×
              average cost per incident × reduction rate. Payback assumes your stated
              HSE investment is recovered from those savings. Figures are indicative
              estimates to support business cases, not a guarantee of outcomes.
            </p>

            <div className="roi-cta">
              <h3>Build the business case with an expert</h3>
              <p>
                We&apos;ll validate these numbers against your real data and design a
                targeted improvement plan.
              </p>
              <Link to="/book-consultation" className="btn btn-gold">
                Book a Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
