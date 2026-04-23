// Auto-generated from pages/corporate-solutions.html. Edit freely — this file is the source of truth now.
import { useEffect } from 'react';
import PageHtml from '../components/PageHtml';

const HTML = `

  <section class="page-hero">
    <div class="page-hero__pattern" aria-hidden="true"></div>
    <i class="page-hero__icon-bg fas fa-building" aria-hidden="true"></i>
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../index.html">Home</a><span class="breadcrumb__sep"><i class="fas fa-chevron-right"></i></span><a href="services.html">Services</a><span class="breadcrumb__sep"><i class="fas fa-chevron-right"></i></span><span class="breadcrumb__current">Corporate Solutions</span></nav>
      <div class="page-hero__content">
        <span class="eyebrow eyebrow--white">Enterprise Partnership</span>
        <h1>End-to-End Corporate HSE Solutions</h1>
        <p>Consulting, training, digital transformation, and AI — unified under one strategic partnership. From fractional HSE leadership to full-scale organisational transformation programs.</p>
        <div class="page-hero__actions">
          
          <a href="book-consultation.html" class="btn btn-gold btn-lg"><i class=""></i> Discuss Partnership</a>
          <a href="contact.html" class="btn btn-outline-white btn-lg">Enterprise Enquiry</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-white">
    <div class="container">

      <!-- Value proposition strip -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin-bottom:60px;">
        <div class="reveal" style="text-align:center;padding:28px 20px;background:var(--navy);border-radius:var(--radius);color:white;">
          <i class="fas fa-shield-alt" style="font-size:2rem;color:var(--gold);margin-bottom:12px;display:block;"></i>
          <div style="font-size:1rem;font-weight:700;margin-bottom:6px;">Safety Consulting</div>
          <div style="font-size:.85rem;opacity:.75;">Strategy, audits, risk, compliance</div>
        </div>
        <div class="reveal" style="text-align:center;padding:28px 20px;background:var(--navy);border-radius:var(--radius);color:white;">
          <i class="fas fa-graduation-cap" style="font-size:2rem;color:var(--gold);margin-bottom:12px;display:block;"></i>
          <div style="font-size:1rem;font-weight:700;margin-bottom:6px;">Training Programs</div>
          <div style="font-size:.85rem;opacity:.75;">Corporate, certification, e-learning</div>
        </div>
        <div class="reveal" style="text-align:center;padding:28px 20px;background:var(--blue);border-radius:var(--radius);color:white;">
          <i class="fas fa-laptop-code" style="font-size:2rem;color:white;margin-bottom:12px;display:block;"></i>
          <div style="font-size:1rem;font-weight:700;margin-bottom:6px;">Digital Systems</div>
          <div style="font-size:.85rem;opacity:.85;">Apps, portals, dashboards, PTW</div>
        </div>
        <div class="reveal" style="text-align:center;padding:28px 20px;background:var(--navy-mid);border-radius:var(--radius);color:white;">
          <i class="fas fa-robot" style="font-size:2rem;color:var(--gold);margin-bottom:12px;display:block;"></i>
          <div style="font-size:1rem;font-weight:700;margin-bottom:6px;">AI Solutions</div>
          <div style="font-size:.85rem;opacity:.75;">Agents, analytics, automation</div>
        </div>
      </div>

      <div class="service-page-layout">
        <div>
          <h2>Corporate Engagement Models</h2>

          <!-- Package cards -->
          <div class="grid grid-2" style="gap:20px;margin-bottom:40px;">
            <div class="package-card reveal">
              <div class="package-card__header">
                <i class="fas fa-user-tie"></i>
                <h4>Fractional HSE Director</h4>
              </div>
              <p>Strategic HSE leadership without the full-time cost. Dedicated advisory days per month, leadership team engagement, board reporting, and full accountability for HSE performance.</p>
              <ul style="list-style:none;padding:0;margin:16px 0 0;">
                <li style="padding:5px 0;font-size:.88rem;"><i class="fas fa-check" style="color:var(--gold);margin-right:8px;"></i>Monthly strategic advisory sessions</li>
                <li style="padding:5px 0;font-size:.88rem;"><i class="fas fa-check" style="color:var(--gold);margin-right:8px;"></i>Board-level HSE reporting</li>
                <li style="padding:5px 0;font-size:.88rem;"><i class="fas fa-check" style="color:var(--gold);margin-right:8px;"></i>Regulatory compliance oversight</li>
                <li style="padding:5px 0;font-size:.88rem;"><i class="fas fa-check" style="color:var(--gold);margin-right:8px;"></i>Available for urgent escalations</li>
              </ul>
            </div>
            <div class="package-card reveal">
              <div class="package-card__header">
                <i class="fas fa-calendar-alt"></i>
                <h4>Monthly HSE Retainer</h4>
              </div>
              <p>Ongoing advisory and support on a retained basis — providing consistent, expert input for organisations that need regular but not full-time HSE guidance.</p>
              <ul style="list-style:none;padding:0;margin:16px 0 0;">
                <li style="padding:5px 0;font-size:.88rem;"><i class="fas fa-check" style="color:var(--gold);margin-right:8px;"></i>Agreed monthly advisory hours</li>
                <li style="padding:5px 0;font-size:.88rem;"><i class="fas fa-check" style="color:var(--gold);margin-right:8px;"></i>Document review and sign-off</li>
                <li style="padding:5px 0;font-size:.88rem;"><i class="fas fa-check" style="color:var(--gold);margin-right:8px;"></i>Incident and compliance support</li>
                <li style="padding:5px 0;font-size:.88rem;"><i class="fas fa-check" style="color:var(--gold);margin-right:8px;"></i>Priority response to queries</li>
              </ul>
            </div>
            <div class="package-card reveal">
              <div class="package-card__header">
                <i class="fas fa-hard-hat"></i>
                <h4>Project-Embedded HSE Lead</h4>
              </div>
              <p>Dedicated on-site or remote HSE leadership for a specific project — construction, commissioning, turnaround, or major capital project — from mobilisation to handover.</p>
              <ul style="list-style:none;padding:0;margin:16px 0 0;">
                <li style="padding:5px 0;font-size:.88rem;"><i class="fas fa-check" style="color:var(--gold);margin-right:8px;"></i>Full project lifecycle coverage</li>
                <li style="padding:5px 0;font-size:.88rem;"><i class="fas fa-check" style="color:var(--gold);margin-right:8px;"></i>HSE plan development</li>
                <li style="padding:5px 0;font-size:.88rem;"><i class="fas fa-check" style="color:var(--gold);margin-right:8px;"></i>Contractor management</li>
                <li style="padding:5px 0;font-size:.88rem;"><i class="fas fa-check" style="color:var(--gold);margin-right:8px;"></i>Regulatory interface</li>
              </ul>
            </div>
            <div class="package-card reveal">
              <div class="package-card__header">
                <i class="fas fa-infinity"></i>
                <h4>Corporate HSE Partner Program</h4>
              </div>
              <p>Long-term strategic partnership delivering all four pillars — consulting, training, digital, and AI — as a unified service. The most comprehensive engagement model available.</p>
              <ul style="list-style:none;padding:0;margin:16px 0 0;">
                <li style="padding:5px 0;font-size:.88rem;"><i class="fas fa-check" style="color:var(--gold);margin-right:8px;"></i>Consulting + Training + Digital + AI</li>
                <li style="padding:5px 0;font-size:.88rem;"><i class="fas fa-check" style="color:var(--gold);margin-right:8px;"></i>Annual performance roadmap</li>
                <li style="padding:5px 0;font-size:.88rem;"><i class="fas fa-check" style="color:var(--gold);margin-right:8px;"></i>Dedicated account management</li>
                <li style="padding:5px 0;font-size:.88rem;"><i class="fas fa-check" style="color:var(--gold);margin-right:8px;"></i>Best value — bundled pricing</li>
              </ul>
            </div>
          </div>

          <h2>Corporate Training Programs</h2>
          <div class="deliverable-list" style="margin-bottom:40px;">
            <div class="deliverable-item reveal"><i class="fas fa-chalkboard-teacher"></i><div><span class="deliverable-item__text">Bespoke in-house safety training</span><span class="deliverable-item__sub">Fully customised content for your sector, hazards, and workforce — from induction to executive safety leadership</span></div></div>
            <div class="deliverable-item reveal"><i class="fas fa-users"></i><div><span class="deliverable-item__text">Safety leadership workshops for management</span><span class="deliverable-item__sub">Engaging directors and senior managers in visible safety leadership, culture, and decision-making</span></div></div>
            <div class="deliverable-item reveal"><i class="fas fa-laptop"></i><div><span class="deliverable-item__text">Custom e-learning course development</span><span class="deliverable-item__sub">SCORM-compliant, branded e-learning modules for deployment across your LMS or Microsoft 365</span></div></div>
            <div class="deliverable-item reveal"><i class="fas fa-tools"></i><div><span class="deliverable-item__text">Toolbox talks and frontline training</span><span class="deliverable-item__sub">Practical, jargon-free safety briefings for frontline workers — delivered on-site, virtual, or as e-learning</span></div></div>
          </div>

          <h2>Engagement Process</h2>
          <div class="process-steps reveal" style="margin:28px 0;">
            <div class="step-item"><div class="step-number">1</div><div class="step-title">Discovery Call</div><p class="step-desc">Free 30-minute consultation to understand your organisation, priorities, and what success looks like.</p></div>
            <div class="step-item"><div class="step-number">2</div><div class="step-title">Proposal & Scoping</div><p class="step-desc">Tailored proposal with clear scope, deliverables, timeline, and investment levels for your chosen engagement model.</p></div>
            <div class="step-item"><div class="step-number">3</div><div class="step-title">Partnership Kick-Off</div><p class="step-desc">Onboarding session, stakeholder introductions, and an agreed 90-day priority action plan.</p></div>
            <div class="step-item"><div class="step-number">4</div><div class="step-title">Deliver & Review</div><p class="step-desc">Ongoing delivery with regular progress reviews, performance reporting, and continuous improvement cycles.</p></div>
          </div>
        </div>

        <div class="service-sidebar">
          <div class="sidebar-card sidebar-card--navy">
            <h4><i class="fas fa-handshake" style="color:var(--gold);margin-right:8px;"></i>Enterprise Enquiry</h4>
            <p>Tell us about your organisation and we'll design the right partnership model for your needs.</p>
            <a href="book-consultation.html" class="btn btn-gold" style="width:100%;justify-content:center;">Start the Conversation</a>
          </div>
          <div class="sidebar-card">
            <h4>Solutions Included</h4>
            <nav class="sidebar-nav">
              <a href="consulting.html"><i class="fas fa-shield-alt"></i>HSE Consulting</a>
              <a href="training.html"><i class="fas fa-graduation-cap"></i>Training Programs</a>
              <a href="digital-solutions.html"><i class="fas fa-laptop-code"></i>Digital Transformation</a>
              <a href="ai-solutions.html"><i class="fas fa-robot"></i>AI Solutions</a>
            </nav>
          </div>
          <div class="sidebar-card">
            <h4>Industries Served</h4>
            <ul style="list-style:none;padding:0;margin:0;font-size:.88rem;">
              <li style="padding:5px 0;border-bottom:1px solid var(--gray-100);">🛢 Oil &amp; Gas</li>
              <li style="padding:5px 0;border-bottom:1px solid var(--gray-100);">🏗 Construction</li>
              <li style="padding:5px 0;border-bottom:1px solid var(--gray-100);">🏭 Manufacturing</li>
              <li style="padding:5px 0;border-bottom:1px solid var(--gray-100);">🚛 Logistics</li>
              <li style="padding:5px 0;">🏥 Healthcare</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-banner section"><div class="container"><div class="cta-banner__content">
    <h2>Let's Build a Long-Term Partnership</h2>
    <p>Whether you need a retained advisor, a project HSE lead, or a full transformation partner — let's discuss how Ansar Mahmood can become a strategic extension of your organisation.</p>
    <div class="cta-banner__actions">
      <a href="book-consultation.html" class="btn btn-gold btn-xl"><i class="fas fa-handshake"></i> Explore Partnership Models</a>
      <a href="contact.html" class="btn btn-outline-white btn-xl">Enterprise Enquiry</a>
    </div>
  </div></div></section>

`;

export default function CorporateSolutions() {
  useEffect(() => {
    document.title = "End-to-End Corporate HSE Solutions | Ansar Mahmood";
  }, []);
  return <PageHtml html={HTML} />;
}
