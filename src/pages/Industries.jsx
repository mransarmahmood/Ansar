// Auto-generated from pages/industries.html. Edit freely — this file is the source of truth now.
import { useEffect } from 'react';
import PageHtml from '../components/PageHtml';

const HTML = `

  <section class="page-hero">
    <div class="page-hero__pattern" aria-hidden="true"></div>
    <i class="page-hero__icon-bg fas fa-industry" aria-hidden="true"></i>
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../index.html">Home</a><span class="breadcrumb__sep"><i class="fas fa-chevron-right"></i></span><span class="breadcrumb__current">Industries</span></nav>
      <div class="page-hero__content">
        <span class="eyebrow eyebrow--white">40+ Countries · 10 Sectors</span>
        <h1>Industry-Specific HSE Expertise</h1>
        <p>Generic safety advice rarely solves sector-specific problems. With 25+ years deployed across the world's most demanding industries, Ansar Mahmood understands the unique hazards, regulatory landscapes, and operational pressures of your sector.</p>
        <div class="page-hero__actions">
          <a href="book-consultation.html" class="btn btn-gold btn-lg"><i class="fas fa-calendar-check"></i> Book Industry Consultation</a>
          <a href="services.html" class="btn btn-outline-white btn-lg">Explore Services</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-white">
    <div class="container">
      <div style="text-align:center;margin-bottom:50px;">
        <span class="eyebrow">Where We Work</span>
        <h2>Sectors We Serve</h2>
        <p style="color:var(--text-muted);max-width:640px;margin:0 auto;">From high-hazard extractives to regulated healthcare environments — every industry brings unique challenges that demand specialist knowledge, not generic solutions.</p>
      </div>

      <!-- Industry Cards -->
      <div class="grid grid-3" style="gap:24px;margin-bottom:60px;">

        
        <div class="feature-card reveal">
          <div class="feature-card__icon"><i class="fas fa-industry"></i></div>
          <h4 class="feature-card__title"></h4>
          <p class="feature-card__desc"></p>
          <div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--gray-100);">
            <div style="font-size:.8rem;color:var(--gold);font-weight:600;letter-spacing:.05em;text-transform:uppercase;margin-bottom:8px;">Key services</div>
            <div style="display:flex;flex-wrap:wrap;gap:6px;">
              
              <span style="background:var(--gold-xlight);color:var(--gold-dark);padding:3px 10px;border-radius:var(--radius-full);font-size:.78rem;"></span>
              
            </div>
          </div>
        </div>
        

      </div>

      <!-- Stats row -->
      <div class="stats-strip reveal" style="border-radius:var(--radius);overflow:hidden;">
        <div class="stat-item">
          <div class="stat-number" data-counter="40" data-suffix="+">40+</div>
          <div class="stat-label">Countries Worked In</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" data-counter="10">10</div>
          <div class="stat-label">Industry Sectors</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" data-counter="500" data-suffix="+">500+</div>
          <div class="stat-label">Projects Delivered</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" data-counter="25" data-suffix="+">25+</div>
          <div class="stat-label">Years Experience</div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-banner section"><div class="container"><div class="cta-banner__content">
    <h2>Your Industry. Your Hazards. Our Expertise.</h2>
    <p>Book a free consultation to discuss how Ansar Mahmood's sector-specific knowledge and global experience can be applied to your organisation's unique safety challenges.</p>
    <div class="cta-banner__actions">
      <a href="book-consultation.html" class="btn btn-gold btn-xl"><i class="fas fa-calendar-check"></i> Book Industry Consultation</a>
      <a href="services.html" class="btn btn-outline-white btn-xl">Explore All Services</a>
    </div>
  </div></div></section>

`;

export default function Industries() {
  useEffect(() => {
    document.title = "Industries Served — Global HSE Expertise | Ansar Mahmood";
  }, []);
  return <PageHtml html={HTML} />;
}
