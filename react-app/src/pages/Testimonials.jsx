// Auto-generated from pages/testimonials.html. Edit freely — this file is the source of truth now.
import { useEffect } from 'react';
import PageHtml from '../components/PageHtml';

const HTML = `

  <section class="page-hero">
    <div class="page-hero__pattern" aria-hidden="true"></div>
    <i class="page-hero__icon-bg fas fa-quote-left" aria-hidden="true"></i>
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../index.html">Home</a><span class="breadcrumb__sep"><i class="fas fa-chevron-right"></i></span><span class="breadcrumb__current">Testimonials</span></nav>
      <div class="page-hero__content">
        <span class="eyebrow eyebrow--white">Client Feedback</span>
        <h1>What Our Clients Say</h1>
        <p>Don't take our word for it. Hear from HSE directors, operations managers, and training coordinators who have worked with Ansar Mahmood across six continents and ten industry sectors.</p>
      </div>
    </div>
  </section>

  <section class="section section-white">
    <div class="container">

      <?php if (!empty($testimonials)): ?>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:28px;margin-bottom:60px;">
        <?php foreach ($testimonials as $t): ?>
        <div class="testimonial-card-full reveal">
          <div class="testimonial-card-full__stars"><?= cms_stars((int)($t['rating'] ?? 5)) ?></div>
          <blockquote class="testimonial-card-full__quote">"<?= cms_e($t['quote'] ?? '') ?>"</blockquote>
          <div class="testimonial-card-full__author">
            <div class="testimonial-card-full__avatar" aria-hidden="true"><?= cms_e($t['initials'] ?? strtoupper(substr($t['name'] ?? 'AN', 0, 2))) ?></div>
            <div>
              <div class="testimonial-card-full__name"><?= cms_e($t['name'] ?? '') ?></div>
              <div class="testimonial-card-full__role"><?= cms_e($t['role'] ?? '') ?><?= isset($t['company']) && $t['company'] ? ' — ' . cms_e($t['company']) : '' ?></div>
            </div>
          </div>
          <?php if (!empty($t['tags'])): ?>
          <div class="testimonial-card-full__tag"><?= cms_e($t['tags']) ?></div>
          <?php endif; ?>
        </div>
        <?php endforeach; ?>
      </div>
      <?php else: ?>
      <div style="text-align:center;padding:60px 0;color:var(--text-muted);">
        <i class="fas fa-quote-left" style="font-size:3rem;opacity:.3;display:block;margin-bottom:16px;"></i>
        <p>Client testimonials coming soon.</p>
      </div>
      <?php endif; ?>

      <!-- Stats strip -->
      <div style="background:var(--navy);border-radius:var(--radius);padding:40px;display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:24px;text-align:center;margin-bottom:20px;">
        <div class="reveal">
          <div style="font-size:2.2rem;font-weight:800;color:var(--gold);" data-counter="500" data-suffix="+">500+</div>
          <div style="color:rgba(255,255,255,.7);font-size:.88rem;margin-top:6px;">Projects Delivered</div>
        </div>
        <div class="reveal">
          <div style="font-size:2.2rem;font-weight:800;color:var(--gold);" data-counter="97" data-suffix="%">97%</div>
          <div style="color:rgba(255,255,255,.7);font-size:.88rem;margin-top:6px;">Client Satisfaction</div>
        </div>
        <div class="reveal">
          <div style="font-size:2.2rem;font-weight:800;color:var(--gold);" data-counter="10000" data-suffix="+">10,000+</div>
          <div style="color:rgba(255,255,255,.7);font-size:.88rem;margin-top:6px;">Professionals Trained</div>
        </div>
        <div class="reveal">
          <div style="font-size:2.2rem;font-weight:800;color:var(--gold);" data-counter="10" data-suffix="">10</div>
          <div style="color:rgba(255,255,255,.7);font-size:.88rem;margin-top:6px;">Countries Worked In</div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-banner section"><div class="container"><div class="cta-banner__content">
    <h2>Join 500+ Organisations That Trust Ansar Mahmood</h2>
    <p>Book a free 30-minute consultation to discuss your safety challenges and discover what transformation looks like for your organisation.</p>
    <div class="cta-banner__actions">
      <a href="book-consultation.html" class="btn btn-gold btn-xl"><i class="fas fa-calendar-check"></i> Book Free Consultation</a>
      <a href="contact.html" class="btn btn-outline-white btn-xl">Get in Touch</a>
    </div>
  </div></div></section>

`;

export default function Testimonials() {
  useEffect(() => {
    document.title = "Client Testimonials & Reviews | Ansar Mahmood HSE Consulting";
  }, []);
  return <PageHtml html={HTML} />;
}
