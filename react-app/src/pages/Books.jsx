// Auto-generated from pages/books.html. Edit freely — this file is the source of truth now.
import { useEffect } from 'react';
import PageHtml from '../components/PageHtml';

const HTML = `

  <section class="page-hero">
    <div class="page-hero__pattern" aria-hidden="true"></div>
    <i class="page-hero__icon-bg fas fa-book-reader" aria-hidden="true"></i>
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../index.html">Home</a><span class="breadcrumb__sep"><i class="fas fa-chevron-right"></i></span><span class="breadcrumb__current">HSE Books</span></nav>
      <div class="page-hero__content">
        <span class="eyebrow eyebrow--white">Curated by Ansar Mahmood</span>
        <h1>HSE Books & Recommended Reading</h1>
        <p>20 years of experience condensed into an essential reading list. These books have shaped how I approach safety leadership, incident investigation, ISO implementation, and digital transformation in HSE.</p>
      </div>
    </div>
  </section>

  <section class="section section-white">
    <div class="container">

      <!-- Intro note -->
      <div class="reveal" style="background:var(--navy-xlight,#e6f4ee);border-radius:var(--radius-lg);padding:28px 32px;display:flex;gap:20px;align-items:flex-start;margin-bottom:48px;">
        <div style="width:52px;height:52px;min-width:52px;background:var(--navy);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;"><i class="fas fa-quote-left" style="color:var(--gold);font-size:1.2rem;"></i></div>
        <div>
          <h4 style="margin-bottom:6px;">A Note from Ansar</h4>
          <p style="color:var(--text-muted);font-size:.93rem;margin:0;">Every book on this list has directly influenced my work in the field. I've read each one, applied the principles with real clients, and can vouch for their value. Whether you're starting your HSE career, preparing for or leading an organisation's safety transformation — there's something here for every stage.</p>
        </div>
      </div>

      <!-- Category Filters -->
      <div class="book-filters">
        <button class="book-filter active" onclick="filterBooks(this,'all')">All Books</button>
        <button class="book-filter" onclick="filterBooks(this,'foundations')">HSE Foundations</button>
        <button class="book-filter" onclick="filterBooks(this,'leadership')">Safety Leadership</button>
        <button class="book-filter" onclick="filterBooks(this,'investigation')">Incident Investigation</button>
        <button class="book-filter" onclick="filterBooks(this,'iso')">ISO & Standards</button>
        <button class="book-filter" onclick="filterBooks(this,'digital')">Digital & AI</button>
        <button class="book-filter" onclick="filterBooks(this,'exam')">Exam Prep</button>
      </div>

      <!-- Books Grid -->
      <?php if (!empty($books)): ?>
      <div class="book-grid">
        <?php foreach ($books as $book):
          $cat       = $book['category']   ?? 'foundations';
          $color     = $book['color']      ?? '#0B1D36';
          $rating    = (int)($book['rating']    ?? 5);
          $diff      = $book['difficulty'] ?? 'Intermediate';
          $diff_cls  = 'level-' . strtolower($diff);
          $cat_lbl   = $cat_labels[$cat]   ?? ucfirst($cat);
          $title_short = mb_strimwidth($book['title'] ?? '', 0, 28, '…');
        ?>
        <div class="book-card reveal" data-cat="<?= cms_e($cat) ?>">
          <div class="book-card__cover" style="background:<?= cms_e($color) ?>;">
            <div class="book-spine" style="background:<?= cms_e($color) ?>;">
              <i class="fas fa-book"></i>
              <div class="bs-title"><?= cms_e($title_short) ?></div>
            </div>
          </div>
          <div class="book-card__body">
            <div class="book-card__cat" style="color:var(--blue);"><?= cms_e($cat_lbl) ?></div>
            <div class="book-card__title"><?= cms_e($book['title'] ?? '') ?></div>
            <div class="book-card__author"><?= cms_e($book['author'] ?? '') ?> — <?= cms_e($book['year'] ?? '') ?></div>
            <div class="book-card__desc"><?= cms_e($book['description'] ?? '') ?></div>
            <?php if (!empty($book['recommendation'])): ?>
            <div class="book-card__why"><strong>Why Ansar Recommends It</strong><?= cms_e($book['recommendation']) ?></div>
            <?php endif; ?>
            <div class="book-card__meta">
              <div class="book-stars"><?= str_repeat('<i class="fas fa-star"></i>', min(5, max(1, $rating))) ?></div>
              <span class="book-level <?= cms_e($diff_cls) ?>"><?= cms_e($diff) ?></span>
            </div>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
      <?php else: ?>
      <div style="text-align:center;padding:60px 0;color:var(--text-muted);">
        <i class="fas fa-book" style="font-size:3rem;opacity:.3;display:block;margin-bottom:16px;"></i>
        <p>Book recommendations coming soon.</p>
      </div>
      <?php endif; ?>

      <!-- Reading Banner CTA -->
      <div class="reading-banner reveal" style="margin-top:60px;">
        <div>
          <h3 style="color:#fff;margin-bottom:8px;">Want a Personalised Reading List?</h3>
          <p style="color:rgba(255,255,255,.7);margin:0;max-width:500px;">Based on your role, experience level, and goals, Ansar can recommend the exact sequence of books and resources that will have the most impact on your career.</p>
        </div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <a href="book-consultation.html" class="btn btn-gold"><i class="fas fa-calendar-check"></i> Book Free Consultation</a>
          <a href="newsletter.html" class="btn btn-outline-white"><i class="fas fa-envelope"></i> Join Newsletter</a>
        </div>
      </div>

    </div>
  </section>

`;

export default function Books() {
  useEffect(() => {
    document.title = "HSE Books & Recommended Reading List | Ansar Mahmood";
  }, []);
  return <PageHtml html={HTML} />;
}
