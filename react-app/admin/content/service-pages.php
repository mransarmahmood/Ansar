<?php
require_once dirname(__DIR__) . '/includes/auth.php';
require_once dirname(__DIR__) . '/includes/layout.php';
require_login();

$all_pages = read_json_content(SERVICE_PAGES_JSON);
if (!is_array($all_pages)) $all_pages = [];

$slugs = [
    'consulting'            => 'HSE Consulting',
    'audits'                => 'Audits & Gap Analysis',
    'incident-investigation'=> 'Incident Investigation',
    'management-systems'    => 'Management Systems',
    'training'              => 'Training Programs',
    'certification-coaching'=> 'Certification Coaching',
    'corporate-solutions'   => 'Corporate Solutions',
    'ai-solutions'          => 'AI Solutions',
    'digital-solutions'     => 'Digital Transformation',
    'powerbi-dashboards'    => 'Power BI Dashboards',
    'sharepoint-solutions'  => 'SharePoint Solutions',
    'safety-apps'           => 'Safety Apps & Software',
];

$current_slug = clean_input($_GET['slug'] ?? array_key_first($slugs));
if (!isset($slugs[$current_slug])) $current_slug = array_key_first($slugs);

$page_data = $all_pages[$current_slug] ?? [];

// ── Handle POST ───────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST' && verify_csrf()) {
    $slug = clean_input($_POST['slug'] ?? '');
    if (isset($slugs[$slug])) {
        // Parse hero stats
        $stats = [];
        $sv = $_POST['stat_value'] ?? [];
        $sl = $_POST['stat_label'] ?? [];
        for ($i = 0; $i < count($sv); $i++) {
            $v = clean_input($sv[$i] ?? '');
            $l = clean_input($sl[$i] ?? '');
            if ($v || $l) $stats[] = ['value' => $v, 'label' => $l];
        }

        $all_pages[$slug] = [
            'slug'              => $slug,
            'hero_eyebrow'      => clean_input($_POST['hero_eyebrow']      ?? ''),
            'hero_headline'     => clean_input($_POST['hero_headline']     ?? ''),
            'hero_description'  => clean_input($_POST['hero_description']  ?? ''),
            'hero_stats'        => $stats,
            'hero_cta_primary'  => [
                'text' => clean_input($_POST['cta_primary_text'] ?? ''),
                'url'  => clean_input($_POST['cta_primary_url']  ?? ''),
                'icon' => clean_input($_POST['cta_primary_icon'] ?? ''),
            ],
            'hero_cta_secondary'=> [
                'text' => clean_input($_POST['cta_secondary_text'] ?? ''),
                'url'  => clean_input($_POST['cta_secondary_url']  ?? ''),
            ],
        ];

        write_json_content(SERVICE_PAGES_JSON, $all_pages);
        set_flash('success', $slugs[$slug] . ' page updated.');
        header('Location: service-pages.php?slug=' . urlencode($slug)); exit;
    }
}

$sp = $all_pages[$current_slug] ?? [];

admin_head('Service Pages', 'content/service-pages');
admin_topbar('Service Pages', 'Edit service detail page hero content', [
    '<a href="../../pages/' . e($current_slug) . '.html" target="_blank" class="btn btn--outline"><i class="fas fa-external-link-alt"></i> View Page</a>',
]);
?>
<div class="page-body">

  <!-- Page Selector -->
  <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:20px 24px;margin-bottom:24px;display:flex;align-items:center;gap:16px;box-shadow:var(--shadow-sm);">
    <i class="fas fa-file-alt" style="font-size:1.2rem;color:var(--teal);"></i>
    <label class="form-label" style="margin:0;white-space:nowrap;font-size:.9rem;">Select Page:</label>
    <select id="page-selector" class="form-control" style="max-width:400px;font-weight:600;" onchange="window.location='service-pages.php?slug='+this.value">
      <?php foreach ($slugs as $s => $label): ?>
      <option value="<?= e($s) ?>" <?= $s === $current_slug ? 'selected' : '' ?>><?= e($label) ?></option>
      <?php endforeach; ?>
    </select>
    <span class="badge badge--teal" style="margin-left:auto;"><?= count($slugs) ?> pages</span>
  </div>

  <!-- Page Section Map for selected page -->
  <div class="section-map" style="margin-bottom:24px;">
    <div class="section-map__header">
      <i class="fas fa-sitemap"></i>
      <h3><?= e($slugs[$current_slug]) ?> — Page Sections</h3>
    </div>
    <div class="section-map__body">
      <a href="#hero" class="section-map__item section-map__item--editable">
        <span class="section-map__item-num">1</span>
        <span class="section-map__item-label">Page Hero<span class="section-map__item-sub">Eyebrow, headline, description, stats, CTAs</span></span>
        <span class="section-map__item-badge section-map__item-badge--edit">Edit below</span>
      </a>
      <div class="section-map__item">
        <span class="section-map__item-num">2</span>
        <span class="section-map__item-label">Challenge / Problem<span class="section-map__item-sub">What pain point this solves</span></span>
        <span class="section-map__item-badge section-map__item-badge--static">Static</span>
      </div>
      <div class="section-map__item">
        <span class="section-map__item-num">3</span>
        <span class="section-map__item-label">Solution Overview<span class="section-map__item-sub">Features and capabilities</span></span>
        <span class="section-map__item-badge section-map__item-badge--static">Static</span>
      </div>
      <div class="section-map__item">
        <span class="section-map__item-num">4</span>
        <span class="section-map__item-label">Process Steps<span class="section-map__item-sub">4-step methodology diagram</span></span>
        <span class="section-map__item-badge section-map__item-badge--static">Static</span>
      </div>
      <div class="section-map__item">
        <span class="section-map__item-num">5</span>
        <span class="section-map__item-label">Deliverables<span class="section-map__item-sub">Tangible output list</span></span>
        <span class="section-map__item-badge section-map__item-badge--static">Static</span>
      </div>
      <div class="section-map__item">
        <span class="section-map__item-num">6</span>
        <span class="section-map__item-label">FAQ Accordion<span class="section-map__item-sub">Service-specific questions</span></span>
        <span class="section-map__item-badge section-map__item-badge--static">Static</span>
      </div>
      <div class="section-map__item">
        <span class="section-map__item-num">7</span>
        <span class="section-map__item-label">CTA Section<span class="section-map__item-sub">Book consultation</span></span>
        <span class="section-map__item-badge section-map__item-badge--static">Auto</span>
      </div>
    </div>
  </div>

  <!-- Hero Editor -->
  <div class="section-card" id="hero">
    <div class="section-card__header">
      <div class="section-card__num">1</div>
      <div class="section-card__info">
        <div class="section-card__title"><?= e($slugs[$current_slug]) ?> — Hero Section</div>
        <div class="section-card__desc">Full-width page hero with eyebrow tag, headline, description, stat counters, and two CTA buttons</div>
      </div>
    </div>
    <form method="POST" style="padding:24px;">
      <?= csrf_field() ?>
      <input type="hidden" name="slug" value="<?= e($current_slug) ?>">
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Eyebrow</label>
          <input type="text" name="hero_eyebrow" class="form-control" value="<?= e($sp['hero_eyebrow'] ?? '') ?>" placeholder="e.g. Expert Advisory">
        </div>
        <div class="form-group form-full">
          <label class="form-label">Headline (H1)</label>
          <input type="text" name="hero_headline" class="form-control" value="<?= e($sp['hero_headline'] ?? '') ?>">
        </div>
        <div class="form-group form-full">
          <label class="form-label">Description</label>
          <textarea name="hero_description" class="form-control" rows="4"><?= e($sp['hero_description'] ?? '') ?></textarea>
        </div>
      </div>

      <h4 style="margin:20px 0 12px;font-weight:600;">Hero Stats</h4>
      <div id="stats-container">
        <?php $stats = $sp['hero_stats'] ?? []; foreach ($stats as $st): ?>
        <div class="stat-row" style="display:grid;grid-template-columns:1fr 2fr auto;gap:12px;margin-bottom:10px;align-items:end;">
          <div><label class="form-label">Value</label><input type="text" name="stat_value[]" class="form-control" value="<?= e($st['value'] ?? '') ?>" placeholder="25+"></div>
          <div><label class="form-label">Label</label><input type="text" name="stat_label[]" class="form-control" value="<?= e($st['label'] ?? '') ?>" placeholder="Years Experience"></div>
          <button type="button" class="btn btn--sm" style="background:var(--danger);color:white;border:none;height:38px;" onclick="this.parentElement.remove()"><i class="fas fa-trash"></i></button>
        </div>
        <?php endforeach; ?>
      </div>
      <button type="button" class="btn btn--outline btn--sm" onclick="addStat()" style="margin-bottom:16px;"><i class="fas fa-plus"></i> Add Stat</button>

      <h4 style="margin:20px 0 12px;font-weight:600;">CTA Buttons</h4>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Primary CTA Text</label>
          <input type="text" name="cta_primary_text" class="form-control" value="<?= e($sp['hero_cta_primary']['text'] ?? '') ?>">
        </div>
        <div class="form-group">
          <label class="form-label">Primary CTA URL</label>
          <input type="text" name="cta_primary_url" class="form-control" value="<?= e($sp['hero_cta_primary']['url'] ?? '') ?>">
        </div>
        <div class="form-group">
          <label class="form-label">Primary CTA Icon</label>
          <input type="text" name="cta_primary_icon" class="form-control" value="<?= e($sp['hero_cta_primary']['icon'] ?? '') ?>" placeholder="fas fa-calendar-check">
        </div>
        <div class="form-group">
          <label class="form-label">Secondary CTA Text</label>
          <input type="text" name="cta_secondary_text" class="form-control" value="<?= e($sp['hero_cta_secondary']['text'] ?? '') ?>">
        </div>
        <div class="form-group">
          <label class="form-label">Secondary CTA URL</label>
          <input type="text" name="cta_secondary_url" class="form-control" value="<?= e($sp['hero_cta_secondary']['url'] ?? '') ?>">
        </div>
      </div>

      <div class="form-actions"><button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save <?= e($slugs[$current_slug]) ?></button></div>
    </form>
  </div>

</div>

<?php admin_foot(); ?>
<script>
function addStat() {
  const c = document.getElementById('stats-container');
  const d = document.createElement('div');
  d.className = 'stat-row';
  d.style.cssText = 'display:grid;grid-template-columns:1fr 2fr auto;gap:12px;margin-bottom:10px;align-items:end;';
  d.innerHTML = '<div><label class="form-label">Value</label><input type="text" name="stat_value[]" class="form-control" placeholder="25+"></div><div><label class="form-label">Label</label><input type="text" name="stat_label[]" class="form-control" placeholder="Years Experience"></div><button type="button" class="btn btn--sm" style="background:var(--danger);color:white;border:none;height:38px;" onclick="this.parentElement.remove()"><i class="fas fa-trash"></i></button>';
  c.appendChild(d);
}
</script>
