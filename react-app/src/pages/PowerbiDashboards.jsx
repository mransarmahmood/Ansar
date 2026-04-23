// Auto-generated from pages/powerbi-dashboards.html. Edit freely — this file is the source of truth now.
import { useEffect } from 'react';
import PageHtml from '../components/PageHtml';

const HTML = `

  <section class="page-hero">
    <div class="page-hero__pattern" aria-hidden="true"></div>
    <i class="page-hero__icon-bg fas fa-chart-bar" aria-hidden="true"></i>
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../index.html">Home</a><span class="breadcrumb__sep"><i class="fas fa-chevron-right"></i></span><a href="services.html">Services</a><span class="breadcrumb__sep"><i class="fas fa-chevron-right"></i></span><span class="breadcrumb__current">Power BI Dashboards</span></nav>
      <div class="page-hero__content">
        <span class="eyebrow eyebrow--white">HSE Analytics</span>
        <h1>Real-Time HSE Power BI Dashboards</h1>
        <p>Transform raw safety data into strategic insight. Custom Power BI dashboards connecting to any data source — delivering live KPIs, trend analysis, and board-level reporting that drives decision-making.</p>
        <div class="page-hero__actions">
          
          <a href="book-consultation.html" class="btn btn-gold btn-lg"><i class=""></i> Get a Free Demo</a>
          <a href="contact.html" class="btn btn-outline-white btn-lg">Discuss Your Data</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-white">
    <div class="container">
      <div class="service-page-layout">
        <div>
          <!-- Dashboard preview mockup -->
          <div class="dashboard-preview reveal" style="margin-bottom:40px;">
            <div class="dashboard-preview__bar">
              <div class="dashboard-preview__dot" style="background:#ef4444;"></div>
              <div class="dashboard-preview__dot" style="background:#f59e0b;"></div>
              <div class="dashboard-preview__dot" style="background:#10b981;"></div>
              <span style="font-size:.75rem;color:var(--gray-500);margin-left:12px;">HSE Executive Dashboard — Live</span>
            </div>
            <div class="dashboard-preview__body">
              <div class="dashboard-kpi-row">
                <div class="dashboard-kpi"><div class="dashboard-kpi__value" style="color:var(--gold);">0</div><div class="dashboard-kpi__label">LTI This Month</div></div>
                <div class="dashboard-kpi"><div class="dashboard-kpi__value" style="color:var(--blue);">94%</div><div class="dashboard-kpi__label">Audit Compliance</div></div>
                <div class="dashboard-kpi"><div class="dashboard-kpi__value" style="color:#10b981;">127</div><div class="dashboard-kpi__label">Near Miss Reports</div></div>
                <div class="dashboard-kpi"><div class="dashboard-kpi__value" style="color:var(--navy);">98%</div><div class="dashboard-kpi__label">Training Complete</div></div>
              </div>
              <div style="height:100px;background:linear-gradient(135deg,var(--blue-xlight),var(--navy-xlight));border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;gap:4px;padding:16px;">
                <div style="display:flex;align-items:flex-end;gap:8px;height:70px;">
                  <div style="width:20px;background:var(--blue);height:40%;border-radius:3px 3px 0 0;opacity:.6;"></div>
                  <div style="width:20px;background:var(--blue);height:60%;border-radius:3px 3px 0 0;opacity:.7;"></div>
                  <div style="width:20px;background:var(--blue);height:45%;border-radius:3px 3px 0 0;opacity:.8;"></div>
                  <div style="width:20px;background:var(--gold);height:80%;border-radius:3px 3px 0 0;"></div>
                  <div style="width:20px;background:var(--blue);height:55%;border-radius:3px 3px 0 0;opacity:.7;"></div>
                  <div style="width:20px;background:var(--blue);height:30%;border-radius:3px 3px 0 0;opacity:.6;"></div>
                  <div style="width:20px;background:var(--blue);height:65%;border-radius:3px 3px 0 0;opacity:.8;"></div>
                  <div style="width:20px;background:var(--blue);height:50%;border-radius:3px 3px 0 0;opacity:.7;"></div>
                </div>
                <span style="font-size:.75rem;color:var(--text-muted);margin-left:20px;">Incident Trend — Last 8 Months</span>
              </div>
            </div>
          </div>

          <h2>Dashboard Types</h2>
          <div class="grid grid-2" style="gap:20px;margin-bottom:40px;">
            <div class="feature-card reveal"><div class="feature-card__icon"><i class="fas fa-tachometer-alt"></i></div><h4 class="feature-card__title">Executive KPI Dashboard</h4><p class="feature-card__desc">Board-level view of leading and lagging indicators: LTIFR, TRIFR, near miss frequency, audit scores, training compliance, and environmental metrics.</p></div>
            <div class="feature-card reveal"><div class="feature-card__icon"><i class="fas fa-exclamation-triangle"></i></div><h4 class="feature-card__title">Incident Tracking Dashboard</h4><p class="feature-card__desc">Real-time incident log with severity classification, investigation status, CAPA closure rates, trend analysis by department, site, and category.</p></div>
            <div class="feature-card reveal"><div class="feature-card__icon"><i class="fas fa-clipboard-check"></i></div><h4 class="feature-card__title">Audit & Compliance Dashboard</h4><p class="feature-card__desc">Audit schedule tracker, finding classification (critical/major/minor), repeat finding analysis, overdue action items, and compliance trend over time.</p></div>
            <div class="feature-card reveal"><div class="feature-card__icon"><i class="fas fa-users-cog"></i></div><h4 class="feature-card__title">Contractor Performance Dashboard</h4><p class="feature-card__desc">Multi-contractor HSE KPI comparison, prequalification status, site induction compliance, incident rates, and performance scoring for procurement decisions.</p></div>
            <div class="feature-card reveal"><div class="feature-card__icon"><i class="fas fa-graduation-cap"></i></div><h4 class="feature-card__title">Training Compliance Dashboard</h4><p class="feature-card__desc">Workforce training matrix, expiry alerts, certification tracking by role and site, gap analysis, and renewal forecasting to stay ahead of lapses.</p></div>
            <div class="feature-card reveal"><div class="feature-card__icon"><i class="fas fa-leaf"></i></div><h4 class="feature-card__title">Environmental Metrics Dashboard</h4><p class="feature-card__desc">Carbon emissions tracking, waste disposal compliance, water usage, environmental incidents, and regulatory performance against ISO 14001 objectives.</p></div>
          </div>

          <h2>Data Sources We Connect</h2>
          <div class="deliverable-list" style="margin-bottom:40px;">
            <div class="deliverable-item reveal"><i class="fas fa-file-excel"></i><div><span class="deliverable-item__text">Microsoft Excel & SharePoint Lists</span><span class="deliverable-item__sub">Transform existing spreadsheets into live dashboards without rebuilding your data collection</span></div></div>
            <div class="deliverable-item reveal"><i class="fas fa-database"></i><div><span class="deliverable-item__text">SQL Server, Azure SQL & Oracle</span><span class="deliverable-item__sub">Direct database connections for enterprise HSEQ systems, ERP platforms, and custom databases</span></div></div>
            <div class="deliverable-item reveal"><i class="fas fa-cloud"></i><div><span class="deliverable-item__text">SharePoint, Teams & Power Apps</span><span class="deliverable-item__sub">Native integration with your existing Microsoft 365 environment — no additional data export required</span></div></div>
            <div class="deliverable-item reveal"><i class="fas fa-industry"></i><div><span class="deliverable-item__text">SAP, Oracle EHS & Intelex</span><span class="deliverable-item__sub">Certified connectors and REST API integration with leading enterprise HSE management platforms</span></div></div>
            <div class="deliverable-item reveal"><i class="fas fa-mobile-alt"></i><div><span class="deliverable-item__text">Field Inspection Apps & Forms</span><span class="deliverable-item__sub">Microsoft Forms, Power Apps forms, and third-party inspection tools — all feeding into a single dashboard</span></div></div>
          </div>

          <h2>Development Process</h2>
          <div class="process-steps reveal" style="margin:28px 0;">
            <div class="step-item"><div class="step-number">1</div><div class="step-title">Requirements Workshop</div><p class="step-desc">Understand your KPIs, data sources, user groups, and reporting needs. Map the full picture before building.</p></div>
            <div class="step-item"><div class="step-number">2</div><div class="step-title">Data Model Design</div><p class="step-desc">Build a clean, scalable data model. Connect sources. Apply transformations and calculated measures in Power Query and DAX.</p></div>
            <div class="step-item"><div class="step-number">3</div><div class="step-title">Dashboard Build & Review</div><p class="step-desc">Design and build visuals. Review with stakeholders. Iterate until every KPI tells the right story clearly and accurately.</p></div>
            <div class="step-item"><div class="step-number">4</div><div class="step-title">Deploy & Enable</div><p class="step-desc">Publish to Power BI Service. Configure row-level security. Set automated refresh. Train users and hand over with documentation.</p></div>
          </div>
        </div>

        <div class="service-sidebar">
          <div class="sidebar-card sidebar-card--navy">
            <h4><i class="fas fa-chart-line" style="color:var(--gold);margin-right:8px;"></i>Free Dashboard Demo</h4>
            <p>See a live Power BI HSE dashboard demo tailored to your industry.</p>
            <a href="book-consultation.html" class="btn btn-gold" style="width:100%;justify-content:center;">Book Free Demo</a>
          </div>
          <div class="sidebar-card">
            <h4>Related Services</h4>
            <nav class="sidebar-nav">
              <a href="digital-solutions.html"><i class="fas fa-laptop-code"></i>Digital Transformation</a>
              <a href="sharepoint-solutions.html"><i class="fas fa-share-nodes"></i>SharePoint Solutions</a>
              <a href="ai-solutions.html"><i class="fas fa-robot"></i>AI Analytics</a>
              <a href="consulting.html"><i class="fas fa-shield-alt"></i>HSE Consulting</a>
            </nav>
          </div>
          <div class="sidebar-card">
            <h4><i class="fas fa-award" style="color:var(--gold);margin-right:8px;"></i>Why Power BI?</h4>
            <ul style="list-style:none;padding:0;margin:0;">
              <li style="padding:7px 0;border-bottom:1px solid var(--gray-100);font-size:.88rem;"><i class="fas fa-check" style="color:var(--gold);margin-right:8px;"></i>Works with existing Microsoft 365</li>
              <li style="padding:7px 0;border-bottom:1px solid var(--gray-100);font-size:.88rem;"><i class="fas fa-check" style="color:var(--gold);margin-right:8px;"></i>Mobile-ready out of the box</li>
              <li style="padding:7px 0;border-bottom:1px solid var(--gray-100);font-size:.88rem;"><i class="fas fa-check" style="color:var(--gold);margin-right:8px;"></i>Real-time data refresh</li>
              <li style="padding:7px 0;border-bottom:1px solid var(--gray-100);font-size:.88rem;"><i class="fas fa-check" style="color:var(--gold);margin-right:8px;"></i>Row-level security</li>
              <li style="padding:7px 0;font-size:.88rem;"><i class="fas fa-check" style="color:var(--gold);margin-right:8px;"></i>Embeds in Teams &amp; SharePoint</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-banner section"><div class="container"><div class="cta-banner__content">
    <h2>See Your Safety Data Come to Life</h2>
    <p>Book a free 30-minute Power BI demo and see exactly how your existing safety data can be transformed into real-time, board-ready dashboards.</p>
    <div class="cta-banner__actions">
      <a href="book-consultation.html" class="btn btn-gold btn-xl"><i class="fas fa-chart-bar"></i> Book Free Dashboard Demo</a>
      <a href="contact.html" class="btn btn-outline-white btn-xl">Discuss Your Data</a>
    </div>
  </div></div></section>

`;

export default function PowerbiDashboards() {
  useEffect(() => {
    document.title = "Real-Time HSE Power BI Dashboards | Ansar Mahmood";
  }, []);
  return <PageHtml html={HTML} />;
}
