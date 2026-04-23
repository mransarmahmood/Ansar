import{a as e,o as t,t as n}from"./index-11SiVjkS.js";import{t as r}from"./PageHtml-DGqpv0TQ.js";var i=t(e(),1),a=n(),o=`

  <section class="page-hero">
    <div class="page-hero__pattern" aria-hidden="true"></div>
    <i class="page-hero__icon-bg fas fa-clipboard-check" aria-hidden="true"></i>
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../index.html">Home</a><span class="breadcrumb__sep"><i class="fas fa-chevron-right"></i></span><a href="services.html">Services</a><span class="breadcrumb__sep"><i class="fas fa-chevron-right"></i></span><span class="breadcrumb__current">Audits</span></nav>
      <div class="page-hero__content">
        <span class="eyebrow eyebrow--white"><?= cms_e($sp['hero_eyebrow'] ?? 'Audits & Compliance') ?></span>
        <h1><?= cms_e($sp['hero_headline'] ?? 'Comprehensive HSE Audits & Gap Analysis') ?></h1>
        <p><?= cms_e($sp['hero_description'] ?? 'Identify risks before they become incidents. Ansar Mahmood delivers rigorous, evidence-based HSE audits against ISO 45001, OSHA, and local regulatory standards — with clear, actionable findings that drive real improvement.') ?></p>
        <div class="page-hero__actions">
          <?php $cta1 = $sp['hero_cta_primary'] ?? []; $cta2 = $sp['hero_cta_secondary'] ?? []; ?>
          <a href="<?= cms_e($cta1['url'] ?? 'book-consultation.html') ?>" class="btn btn-gold btn-lg"><?php if (!empty($cta1['icon'])): ?><i class="<?= cms_e($cta1['icon']) ?>"></i> <?php endif; ?><?= cms_e($cta1['text'] ?? 'Book an Audit') ?></a>
          <a href="<?= cms_e($cta2['url'] ?? 'contact.html') ?>" class="btn btn-outline-white btn-lg"><?= cms_e($cta2['text'] ?? 'Get a Quote') ?></a>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-white">
    <div class="container">
      <div class="service-page-layout">
        <div>
          <h2>Audit Types Offered</h2>
          <div class="grid grid-2" style="gap:20px;margin-bottom:40px;">
            <div class="service-card reveal"><div class="service-card__icon" style="background:var(--gold-xlight);color:var(--gold-dark);"><i class="fas fa-balance-scale"></i></div><h3 class="service-card__title">Legal Compliance Audit</h3><p class="service-card__desc">Full assessment of compliance with applicable HSE legislation, regulations, permits, and standards in your jurisdiction.</p></div>
            <div class="service-card reveal"><div class="service-card__icon" style="background:var(--gold-xlight);color:var(--gold-dark);"><i class="fas fa-search-plus"></i></div><h3 class="service-card__title">ISO 45001 Gap Analysis</h3><p class="service-card__desc">Structured assessment of your current management system against ISO 45001 requirements with prioritised remediation plan.</p></div>
            <div class="service-card reveal"><div class="service-card__icon" style="background:var(--gold-xlight);color:var(--gold-dark);"><i class="fas fa-hard-hat"></i></div><h3 class="service-card__title">Operational Risk Audit</h3><p class="service-card__desc">Field-based operational risk reviews covering procedures, equipment, behaviour, environment, and management systems.</p></div>
            <div class="service-card reveal"><div class="service-card__icon" style="background:var(--gold-xlight);color:var(--gold-dark);"><i class="fas fa-truck"></i></div><h3 class="service-card__title">Contractor &amp; Supplier Audit</h3><p class="service-card__desc">Second-party HSE capability assessment of contractors and suppliers against your requirements and applicable standards.</p></div>
            <div class="service-card reveal"><div class="service-card__icon" style="background:var(--gold-xlight);color:var(--gold-dark);"><i class="fas fa-leaf"></i></div><h3 class="service-card__title">Environmental Audit</h3><p class="service-card__desc">EHS environmental compliance audits, ISO 14001 gap analysis, waste management reviews, and environmental impact assessments.</p></div>
            <div class="service-card reveal"><div class="service-card__icon" style="background:var(--gold-xlight);color:var(--gold-dark);"><i class="fas fa-tachometer-alt"></i></div><h3 class="service-card__title">HSE Performance Review</h3><p class="service-card__desc">Annual performance review with KPI benchmarking, trend analysis, maturity scoring, and board-level reporting.</p></div>
          </div>

          <h2>Audit Process</h2>
          <div class="process-steps reveal" style="margin:28px 0 40px;">
            <div class="step-item"><div class="step-number">1</div><div class="step-title">Pre-Audit Planning</div><p class="step-desc">Scope definition, document request, site familiarisation, and audit protocol preparation.</p></div>
            <div class="step-item"><div class="step-number">2</div><div class="step-title">On-site Audit</div><p class="step-desc">Document review, interviews, site walkthrough, observation, and evidence collection.</p></div>
            <div class="step-item"><div class="step-number">3</div><div class="step-title">Findings Report</div><p class="step-desc">Detailed report with prioritised findings, risk ratings, regulatory references, and photographic evidence.</p></div>
            <div class="step-item"><div class="step-number">4</div><div class="step-title">Action Plan</div><p class="step-desc">Actionable corrective action plan with recommended owners, timelines, and verification methods.</p></div>
          </div>

          <h2>What You Receive</h2>
          <div class="deliverable-list">
            <div class="deliverable-item reveal"><i class="fas fa-file-alt"></i><div><span class="deliverable-item__text">Comprehensive audit report with executive summary</span><span class="deliverable-item__sub">Including finding classifications: Critical / Major / Minor / Observation / Positive</span></div></div>
            <div class="deliverable-item reveal"><i class="fas fa-tasks"></i><div><span class="deliverable-item__text">Prioritised corrective action plan (CAPA register)</span><span class="deliverable-item__sub">With recommended owners, timelines, and closure criteria</span></div></div>
            <div class="deliverable-item reveal"><i class="fas fa-chart-bar"></i><div><span class="deliverable-item__text">Compliance scorecard and maturity rating</span><span class="deliverable-item__sub">Benchmarked against ISO requirements and industry best practice</span></div></div>
            <div class="deliverable-item reveal"><i class="fas fa-presentation"></i><div><span class="deliverable-item__text">Management debrief presentation</span><span class="deliverable-item__sub">Clear, board-ready slides for executive communication</span></div></div>
            <div class="deliverable-item reveal"><i class="fas fa-road"></i><div><span class="deliverable-item__text">12-month improvement roadmap</span><span class="deliverable-item__sub">Phased implementation plan aligned to your capacity and budget</span></div></div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="service-sidebar">
          <div class="sidebar-card sidebar-card--navy">
            <h4><i class="fas fa-clipboard-check" style="color:var(--gold);margin-right:8px;"></i>Request an Audit</h4>
            <p>Get a scoped audit proposal within 48 hours.</p>
            <a href="book-consultation.html" class="btn btn-gold" style="width:100%;justify-content:center;">Get a Quote</a>
          </div>
          <div class="sidebar-card">
            <h4>Related Services</h4>
            <nav class="sidebar-nav">
              <a href="consulting.html"><i class="fas fa-shield-alt"></i>HSE Consulting</a>
              <a href="management-systems.html"><i class="fas fa-sitemap"></i>Management Systems</a>
              <a href="incident-investigation.html"><i class="fas fa-search"></i>Incident Investigation</a>
              <a href="powerbi-dashboards.html"><i class="fas fa-chart-bar"></i>Power BI Dashboards</a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-banner section"><div class="container"><div class="cta-banner__content">
    <h2>Ready to Know Exactly Where You Stand?</h2>
    <p>A comprehensive HSE audit is the fastest way to understand your true compliance position and prioritise improvement efforts. Book now.</p>
    <div class="cta-banner__actions">
      <a href="book-consultation.html" class="btn btn-gold btn-xl"><i class="fas fa-calendar-check"></i> Book an Audit</a>
      <a href="contact.html" class="btn btn-outline-white btn-xl">Get a Quote</a>
    </div>
  </div></div></section>

`;function s(){return(0,i.useEffect)(()=>{document.title=`HSE Audits & Gap Analysis | Ansar Mahmood — ISO Compliance Audit Services`},[]),(0,a.jsx)(r,{html:o})}export{s as default};