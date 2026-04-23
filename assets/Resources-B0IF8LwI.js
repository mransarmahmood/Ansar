import{a as e,o as t,t as n}from"./index-DxTw45Zt.js";import{t as r}from"./PageHtml-BJ7P4Ipb.js";var i=t(e(),1),a=n(),o=`

  <section class="page-hero">
    <div class="page-hero__pattern" aria-hidden="true"></div>
    <i class="page-hero__icon-bg fas fa-book-open" aria-hidden="true"></i>
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../index.html">Home</a><span class="breadcrumb__sep"><i class="fas fa-chevron-right"></i></span><span class="breadcrumb__current">Resources</span></nav>
      <div class="page-hero__content">
        <span class="eyebrow eyebrow--white">Free Downloads</span>
        <h1>HSE Resources, Templates & Guides</h1>
        <p>Practical tools for safety professionals — free to download. From ISO audit checklists to  study guides, risk assessment templates, and Power BI dashboard blueprints.</p>
      </div>
    </div>
  </section>

  <section class="section section-white">
    <div class="container">

      <!-- Filter tabs -->
      <div class="filter-tabs" style="margin-bottom:40px;">
        <button class="filter-tab active" data-filter="all" data-target=".resource-grid">All Resources</button>
        <button class="filter-tab" data-filter="iso" data-target=".resource-grid">ISO Standards</button>
        <button class="filter-tab" data-filter="training" data-target=".resource-grid">Training & Exams</button>
        <button class="filter-tab" data-filter="digital" data-target=".resource-grid">Digital & AI</button>
        <button class="filter-tab" data-filter="templates" data-target=".resource-grid">Templates</button>
      </div>

      <?php if (!empty($resources)): ?>
      <div class="resource-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;margin-bottom:60px;">
        <?php foreach ($resources as $r):
          $icon_bg    = $r['icon_bg']    ?? 'var(--navy)';
          $icon       = $r['icon']       ?? 'fas fa-file';
          $icon_color = $r['icon_color'] ?? 'var(--gold)';
          $file_icon  = $r['file_icon']  ?? 'fas fa-file-pdf';
          $dl_url     = $r['download_url'] ?? 'book-consultation.html';
        ?>
        <div class="resource-card reveal" data-category="<?= cms_e($r['category'] ?? '') ?>">
          <div class="resource-card__icon" style="background:<?= cms_e($icon_bg) ?>;"><i class="<?= cms_e($icon) ?>" style="color:<?= cms_e($icon_color) ?>;"></i></div>
          <div class="resource-card__body">
            <span class="resource-card__type"><?= cms_e($r['type'] ?? '') ?></span>
            <h4 class="resource-card__title"><?= cms_e($r['title'] ?? '') ?></h4>
            <p class="resource-card__desc"><?= cms_e($r['description'] ?? '') ?></p>
            <div class="resource-card__meta"><i class="<?= cms_e($file_icon) ?>"></i> <?= cms_e($r['file_info'] ?? '') ?></div>
            <a href="<?= cms_e($dl_url) ?>" class="btn btn-gold btn-sm" style="margin-top:12px;"><i class="fas fa-download"></i> Download Free</a>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
      <?php else: ?>
      <div style="text-align:center;padding:60px 0;color:var(--text-muted);">
        <i class="fas fa-folder-open" style="font-size:3rem;opacity:.3;display:block;margin-bottom:16px;"></i>
        <p>Resources coming soon.</p>
      </div>
      <?php endif; ?>

      <!-- Newsletter signup -->
      <div class="reveal" style="background:var(--navy-xlight);border:1px solid var(--gray-200);border-radius:var(--radius-lg);padding:48px;text-align:center;max-width:640px;margin:0 auto;">
        <i class="fas fa-envelope-open-text" style="font-size:2.5rem;color:var(--blue);margin-bottom:16px;display:block;"></i>
        <h3 style="margin-bottom:8px;">Get New Resources First</h3>
        <p style="color:var(--text-muted);margin-bottom:24px;">Join 2,000+ safety professionals and get new templates, guides, and HSE insights delivered to your inbox — no spam, unsubscribe anytime.</p>
        <form id="newsletter-page-form" style="display:flex;gap:12px;max-width:420px;margin:0 auto;flex-wrap:wrap;">
          <input type="email" name="email" placeholder="Your email address" required style="flex:1;min-width:200px;padding:12px 16px;border:1.5px solid var(--gray-200);border-radius:var(--radius-sm);font-size:.95rem;font-family:var(--font-body);">
          <input type="hidden" name="source" value="resources-page">
          <div class="form-honeypot" style="display:none;"><input type="text" name="website"></div>
          <button type="submit" class="btn btn-gold"><i class="fas fa-paper-plane"></i> Subscribe</button>
        </form>
        <div class="form-status" style="margin-top:12px;" role="alert"></div>
      </div>

    </div>
  </section>

`;function s(){return(0,i.useEffect)(()=>{document.title=`Free HSE Resources, Templates & Guides | Ansar Mahmood`},[]),(0,a.jsx)(r,{html:o})}export{s as default};