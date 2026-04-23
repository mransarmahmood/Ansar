// Auto-generated from pages/case-studies.html. Edit freely — this file is the source of truth now.
import { useEffect } from 'react';
import PageHtml from '../components/PageHtml';

const HTML = `

  <section class="page-hero">
    <div class="page-hero__pattern" aria-hidden="true"></div>
    <i class="page-hero__icon-bg fas fa-trophy" aria-hidden="true"></i>
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../index.html">Home</a><span class="breadcrumb__sep"><i class="fas fa-chevron-right"></i></span><span class="breadcrumb__current">Case Studies</span></nav>
      <div class="page-hero__content">
        <span class="eyebrow eyebrow--white">Proven Results</span>
        <h1>Real Projects. Measurable Outcomes.</h1>
        <p>500+ projects delivered across 40+ countries. Here are some of the transformations Ansar Mahmood has led — from incident rate reductions to ISO certifications and full digital transformations.</p>
        <div class="page-hero__actions">
          <a href="book-consultation.html" class="btn btn-gold btn-lg"><i class="fas fa-calendar-check"></i> Start Your Transformation</a>
          <a href="services.html" class="btn btn-outline-white btn-lg">Explore Services</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-white">
    <div class="container">

      <!-- Filter tabs -->
      <div class="filter-tabs" style="margin-bottom:40px;">
        <button class="filter-tab active" data-filter="all" data-target=".case-grid">All</button>
        <button class="filter-tab" data-filter="consulting" data-target=".case-grid">Consulting</button>
        <button class="filter-tab" data-filter="training" data-target=".case-grid">Training</button>
        <button class="filter-tab" data-filter="digital" data-target=".case-grid">Digital & AI</button>
        <button class="filter-tab" data-filter="systems" data-target=".case-grid">Management Systems</button>
      </div>

      <?php if (!empty($cases)): ?>
      <div class="case-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:28px;margin-bottom:60px;">
        <?php foreach ($cases as $cs):
          $icon_bg  = $cs['icon_bg']  ?? 'linear-gradient(135deg,var(--navy),var(--navy-mid))';
          $icon     = $cs['icon']     ?? 'fas fa-trophy';
          $metrics  = $cs['metrics']  ?? [];
          $category = $cs['category'] ?? 'consulting';
          $tag      = $cs['tag']      ?? 'HSE Consulting';
          $tag_style = (strpos(strtolower($tag), 'digital') !== false || strpos(strtolower($tag), 'ai') !== false)
            ? 'background:var(--blue-xlight);color:var(--blue);'
            : 'background:var(--gold-xlight);color:var(--gold-dark);';
        ?>
        <article class="blog-card reveal" data-category="<?= cms_e($category) ?>">
          <div class="blog-card__header" style="background:<?= cms_e($icon_bg) ?>;padding:28px;display:flex;align-items:center;gap:16px;">
            <div style="width:56px;height:56px;background:var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <i class="<?= cms_e($icon) ?>" style="color:white;font-size:1.3rem;"></i>
            </div>
            <div>
              <div style="font-size:.75rem;color:var(--gold);text-transform:uppercase;letter-spacing:.1em;font-weight:600;margin-bottom:4px;"><?= cms_e($cs['industry'] ?? '') ?></div>
              <h4 style="color:white;font-size:1rem;margin:0;"><?= cms_e($cs['headline'] ?? $cs['title'] ?? '') ?></h4>
            </div>
          </div>
          <div class="blog-card__body" style="padding:24px;">
            <p style="color:var(--text-muted);font-size:.9rem;margin-bottom:16px;"><?= cms_e($cs['description'] ?? '') ?></p>
            <?php if (!empty($metrics)): ?>
            <div style="display:grid;grid-template-columns:repeat(<?= min(3, count($metrics)) ?>,1fr);gap:12px;margin-bottom:16px;">
              <?php foreach ($metrics as $m):
                $m_color = $m['color'] ?? 'var(--gold)';
              ?>
              <div style="text-align:center;padding:12px;background:var(--gray-50);border-radius:var(--radius-sm);">
                <div style="font-size:1.3rem;font-weight:800;color:<?= cms_e($m_color) ?>;"><?= cms_e($m['value'] ?? '') ?></div>
                <div style="font-size:.75rem;color:var(--text-muted);"><?= cms_e($m['label'] ?? '') ?></div>
              </div>
              <?php endforeach; ?>
            </div>
            <?php endif; ?>
            <span style="display:inline-block;padding:4px 12px;border-radius:var(--radius-full);font-size:.78rem;font-weight:600;<?= $tag_style ?>"><?= cms_e($tag) ?></span>
          </div>
        </article>
        <?php endforeach; ?>
      </div>
      <?php else: ?>
      <div style="text-align:center;padding:60px 0;color:var(--text-muted);">
        <i class="fas fa-trophy" style="font-size:3rem;opacity:.3;display:block;margin-bottom:16px;"></i>
        <p>Case studies coming soon.</p>
      </div>
      <?php endif; ?>

    </div>
  </section>

  <section class="cta-banner section"><div class="container"><div class="cta-banner__content">
    <h2>Ready to Add Your Organisation to This List?</h2>
    <p>Book a free 30-minute consultation to discuss your challenges and get a clear picture of what transformation looks like for your organisation.</p>
    <div class="cta-banner__actions">
      <a href="book-consultation.html" class="btn btn-gold btn-xl"><i class="fas fa-calendar-check"></i> Start Your Transformation</a>
      <a href="contact.html" class="btn btn-outline-white btn-xl">Discuss Your Challenge</a>
    </div>
  </div></div></section>

`;

export default function CaseStudies() {
  useEffect(() => {
    document.title = "HSE Case Studies & Project Results | Ansar Mahmood";
  }, []);
  return <PageHtml html={HTML} />;
}
