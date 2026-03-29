<?php
require_once dirname(__DIR__) . '/includes/auth.php';
require_once dirname(__DIR__) . '/includes/layout.php';
require_login();

$hp = read_json_content(HOMEPAGE_JSON);
if (empty($hp)) {
    $hp = ['hero'=>[],'stats'=>[],'why_choose'=>[],'cta_banner'=>[],'trust_bar'=>[],'services_section'=>[],'industries_section'=>[],'featured_solutions'=>[]];
}

// Count items from linked sections
$testimonials_count = count(read_json_content(TESTIMONIALS_JSON));
$services_count     = count(read_json_content(SERVICES_JSON));
$industries_count   = count(read_json_content(INDUSTRIES_JSON));

if ($_SERVER['REQUEST_METHOD'] === 'POST' && verify_csrf()) {
    $section = clean_input($_POST['section'] ?? '');

    if ($section === 'hero') {
        $creds_raw = clean_input($_POST['credentials'] ?? '');
        $credentials = array_filter(array_map('trim', explode("\n", $creds_raw)));
        $hp['hero'] = [
            'badge'               => clean_input($_POST['badge']             ?? ''),
            'headline'            => clean_input($_POST['headline']          ?? ''),
            'subheadline'         => clean_input($_POST['subheadline']       ?? ''),
            'cta_primary_text'    => clean_input($_POST['cta_primary_text']  ?? ''),
            'cta_primary_url'     => clean_input($_POST['cta_primary_url']   ?? ''),
            'cta_secondary_text'  => clean_input($_POST['cta_secondary_text']?? ''),
            'cta_secondary_url'   => clean_input($_POST['cta_secondary_url'] ?? ''),
            'credentials'         => array_values($credentials),
        ];
        write_json_content(HOMEPAGE_JSON, $hp);
        set_flash('success', 'Hero section saved.');
        header('Location: home.php#hero'); exit;
    }

    if ($section === 'stats') {
        $sv = $_POST['stat_value']  ?? [];
        $ss = $_POST['stat_suffix'] ?? [];
        $sl = $_POST['stat_label']  ?? [];
        $sd = $_POST['stat_display']?? [];
        $stats = [];
        for ($i = 0; $i < count($sv); $i++) {
            if (!empty($sv[$i]) || !empty($sl[$i])) {
                $stats[] = [
                    'value'   => clean_input($sv[$i]),
                    'suffix'  => clean_input($ss[$i] ?? '+'),
                    'label'   => clean_input($sl[$i]),
                    'display' => clean_input($sd[$i] ?? ''),
                ];
            }
        }
        $hp['stats'] = $stats;
        write_json_content(HOMEPAGE_JSON, $hp);
        set_flash('success', 'Stats saved.');
        header('Location: home.php#stats'); exit;
    }

    if ($section === 'cta_banner') {
        $hp['cta_banner'] = [
            'headline'           => clean_input($_POST['cta_headline']          ?? ''),
            'subtext'            => clean_input($_POST['cta_subtext']           ?? ''),
            'cta_primary_text'   => clean_input($_POST['cta_primary_text_b']   ?? ''),
            'cta_primary_url'    => clean_input($_POST['cta_primary_url_b']    ?? ''),
            'cta_secondary_text' => clean_input($_POST['cta_secondary_text_b'] ?? ''),
            'cta_secondary_url'  => clean_input($_POST['cta_secondary_url_b']  ?? ''),
        ];
        write_json_content(HOMEPAGE_JSON, $hp);
        set_flash('success', 'CTA Banner saved.');
        header('Location: home.php#cta'); exit;
    }

    if ($section === 'services_section') {
        $hp['services_section'] = [
            'eyebrow'    => clean_input($_POST['svc_eyebrow']    ?? ''),
            'headline'   => clean_input($_POST['svc_headline']   ?? ''),
            'description'=> clean_input($_POST['svc_description']?? ''),
        ];
        write_json_content(HOMEPAGE_JSON, $hp);
        set_flash('success', 'Services section header saved.');
        header('Location: home.php#services'); exit;
    }

    if ($section === 'industries_section') {
        $hp['industries_section'] = [
            'eyebrow'    => clean_input($_POST['ind_eyebrow']    ?? ''),
            'headline'   => clean_input($_POST['ind_headline']   ?? ''),
            'description'=> clean_input($_POST['ind_description']?? ''),
        ];
        write_json_content(HOMEPAGE_JSON, $hp);
        set_flash('success', 'Industries section header saved.');
        header('Location: home.php#industries'); exit;
    }
}

$hero = $hp['hero'] ?? [];
$stats = $hp['stats'] ?? [];
$cta = $hp['cta_banner'] ?? [];
$svc_section = $hp['services_section'] ?? [];
$ind_section = $hp['industries_section'] ?? [];

admin_head('Homepage', 'content/home');
admin_topbar('Homepage Editor', 'Manage all homepage sections', [
    '<a href="../../index.html" target="_blank" class="btn btn--outline"><i class="fas fa-external-link-alt"></i> View Homepage</a>',
]);
?>
<div class="page-body">

  <!-- Page Section Map -->
  <div class="section-map">
    <div class="section-map__header">
      <i class="fas fa-sitemap"></i>
      <h3>Homepage Structure</h3>
      <span>11 Sections</span>
    </div>
    <div class="section-map__body">
      <a href="#hero" class="section-map__item section-map__item--editable">
        <span class="section-map__item-num">1</span>
        <span class="section-map__item-label">Hero Section<span class="section-map__item-sub">Headline, CTAs, credentials</span></span>
        <span class="section-map__item-badge section-map__item-badge--edit">Edit here</span>
      </a>
      <a href="#trust" class="section-map__item section-map__item--editable">
        <span class="section-map__item-num">2</span>
        <span class="section-map__item-label">Trust Bar<span class="section-map__item-sub">Credential logos</span></span>
        <span class="section-map__item-badge section-map__item-badge--static">Auto</span>
      </a>
      <a href="#services" class="section-map__item section-map__item--editable">
        <span class="section-map__item-num">3</span>
        <span class="section-map__item-label">Services Grid<span class="section-map__item-sub">8 featured service cards</span></span>
        <span class="section-map__item-badge section-map__item-badge--edit">Edit here</span>
      </a>
      <a href="#stats" class="section-map__item section-map__item--editable">
        <span class="section-map__item-num">4</span>
        <span class="section-map__item-label">Stats Counter<span class="section-map__item-sub">4 animated stats</span></span>
        <span class="section-map__item-badge section-map__item-badge--edit">Edit here</span>
      </a>
      <a href="#whychoose" class="section-map__item">
        <span class="section-map__item-num">5</span>
        <span class="section-map__item-label">Why Choose Ansar<span class="section-map__item-sub">6 differentiators</span></span>
        <span class="section-map__item-badge section-map__item-badge--static">Auto</span>
      </a>
      <a href="#industries" class="section-map__item section-map__item--editable">
        <span class="section-map__item-num">6</span>
        <span class="section-map__item-label">Industries Grid<span class="section-map__item-sub">Featured industry sectors</span></span>
        <span class="section-map__item-badge section-map__item-badge--edit">Edit here</span>
      </a>
      <a href="#solutions" class="section-map__item">
        <span class="section-map__item-num">7</span>
        <span class="section-map__item-label">Featured Solutions<span class="section-map__item-sub">Consulting + AI blocks</span></span>
        <span class="section-map__item-badge section-map__item-badge--static">Auto</span>
      </a>
      <a href="#showcase" class="section-map__item">
        <span class="section-map__item-num">8</span>
        <span class="section-map__item-label">Project Showcase<span class="section-map__item-sub">4 photo cards</span></span>
        <span class="section-map__item-badge section-map__item-badge--static">Auto</span>
      </a>
      <a href="../content/testimonials.php" class="section-map__item section-map__item--linked">
        <span class="section-map__item-num">9</span>
        <span class="section-map__item-label">Testimonials<span class="section-map__item-sub"><?= $testimonials_count ?> reviews</span></span>
        <span class="section-map__item-badge section-map__item-badge--link">Manage &rarr;</span>
      </a>
      <a href="#cta" class="section-map__item section-map__item--editable">
        <span class="section-map__item-num">10</span>
        <span class="section-map__item-label">CTA Banner<span class="section-map__item-sub">Call-to-action block</span></span>
        <span class="section-map__item-badge section-map__item-badge--edit">Edit here</span>
      </a>
      <div class="section-map__item">
        <span class="section-map__item-num">11</span>
        <span class="section-map__item-label">Footer<span class="section-map__item-sub">Injected by layout.js</span></span>
        <span class="section-map__item-badge section-map__item-badge--static">Auto</span>
      </div>
    </div>
  </div>

  <!-- Quick Stats -->
  <div class="quick-stats">
    <div class="quick-stat"><div class="quick-stat__value"><?= $services_count ?></div><div class="quick-stat__label">Services</div></div>
    <div class="quick-stat"><div class="quick-stat__value"><?= $industries_count ?></div><div class="quick-stat__label">Industries</div></div>
    <div class="quick-stat"><div class="quick-stat__value"><?= $testimonials_count ?></div><div class="quick-stat__label">Testimonials</div></div>
    <div class="quick-stat"><div class="quick-stat__value"><?= count($stats) ?></div><div class="quick-stat__label">Stats</div></div>
  </div>

  <!-- ── Section 1: Hero ─── -->
  <div class="section-card" id="hero">
    <div class="section-card__header">
      <div class="section-card__num">1</div>
      <div class="section-card__info">
        <div class="section-card__title">Hero Section</div>
        <div class="section-card__desc">Full-width hero with headline, subheadline, CTAs, credentials, and profile photo</div>
      </div>
    </div>
    <div class="section-card__body">
      <form method="POST">
        <?= csrf_field() ?>
        <input type="hidden" name="section" value="hero">
        <div class="form-grid">
          <div class="form-group"><label class="form-label">Badge Text</label><input type="text" name="badge" class="form-control" value="<?= e($hero['badge'] ?? '') ?>" placeholder="e.g. Available for Global Engagements"></div>
          <div class="form-group form-full"><label class="form-label">Main Headline</label><input type="text" name="headline" class="form-control" value="<?= e($hero['headline'] ?? '') ?>"></div>
          <div class="form-group form-full"><label class="form-label">Subheadline</label><textarea name="subheadline" class="form-control" rows="3"><?= e($hero['subheadline'] ?? '') ?></textarea></div>
          <div class="form-group"><label class="form-label">Primary CTA Text</label><input type="text" name="cta_primary_text" class="form-control" value="<?= e($hero['cta_primary_text'] ?? '') ?>"></div>
          <div class="form-group"><label class="form-label">Primary CTA URL</label><input type="text" name="cta_primary_url" class="form-control" value="<?= e($hero['cta_primary_url'] ?? '') ?>"></div>
          <div class="form-group"><label class="form-label">Secondary CTA Text</label><input type="text" name="cta_secondary_text" class="form-control" value="<?= e($hero['cta_secondary_text'] ?? '') ?>"></div>
          <div class="form-group"><label class="form-label">Secondary CTA URL</label><input type="text" name="cta_secondary_url" class="form-control" value="<?= e($hero['cta_secondary_url'] ?? '') ?>"></div>
          <div class="form-group form-full">
            <label class="form-label">Credential Pills (one per line)</label>
            <textarea name="credentials" class="form-control" rows="5" placeholder="One credential per line"><?= e(implode("\n", $hero['credentials'] ?? [])) ?></textarea>
            <span class="form-hint">Displayed as badges below the hero text. e.g. IOSH Member, 40+ Countries, ISO Lead Auditor</span>
          </div>
        </div>
        <div class="form-actions"><button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save Hero</button></div>
      </form>
    </div>
  </div>

  <!-- ── Section 3: Services Grid Header ─── -->
  <div class="section-card section-card--blue" id="services">
    <div class="section-card__header">
      <div class="section-card__num">3</div>
      <div class="section-card__info">
        <div class="section-card__title">Services Grid — Section Header</div>
        <div class="section-card__desc">Eyebrow, headline, and description above the 8 service cards. Cards are loaded from <strong>Services</strong> editor (featured items).</div>
      </div>
      <a href="services.php" class="btn btn--outline btn--sm"><i class="fas fa-hard-hat"></i> Edit Services</a>
    </div>
    <div class="section-card__body">
      <form method="POST">
        <?= csrf_field() ?>
        <input type="hidden" name="section" value="services_section">
        <div class="form-grid">
          <div class="form-group"><label class="form-label">Eyebrow</label><input type="text" name="svc_eyebrow" class="form-control" value="<?= e($svc_section['eyebrow'] ?? '') ?>" placeholder="e.g. 8 Service Areas"></div>
          <div class="form-group form-full"><label class="form-label">Headline</label><input type="text" name="svc_headline" class="form-control" value="<?= e($svc_section['headline'] ?? '') ?>"></div>
          <div class="form-group form-full"><label class="form-label">Description</label><textarea name="svc_description" class="form-control" rows="2"><?= e($svc_section['description'] ?? '') ?></textarea></div>
        </div>
        <div class="form-actions"><button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save Services Header</button></div>
      </form>
    </div>
  </div>

  <!-- ── Section 4: Stats ─── -->
  <div class="section-card section-card--gold" id="stats">
    <div class="section-card__header">
      <div class="section-card__num">4</div>
      <div class="section-card__info">
        <div class="section-card__title">Stats Counter Strip</div>
        <div class="section-card__desc">Animated counter numbers displayed on a dark navy background strip</div>
      </div>
    </div>
    <div class="section-card__body">
      <form method="POST">
        <?= csrf_field() ?>
        <input type="hidden" name="section" value="stats">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;">
          <?php
          $defaultStats = [
            ['value'=>'25','suffix'=>'+','label'=>'Years of Global HSE Experience','display'=>''],
            ['value'=>'500','suffix'=>'+','label'=>'Projects Delivered Worldwide','display'=>''],
            ['value'=>'40','suffix'=>'+','label'=>'Countries Worked Across','display'=>''],
            ['value'=>'10000','suffix'=>'+','label'=>'Professionals Trained','display'=>'10,000+'],
          ];
          $currentStats = !empty($stats) ? $stats : $defaultStats;
          foreach ($currentStats as $idx => $stat): ?>
          <div style="border:1.5px solid var(--border);border-radius:var(--radius);padding:18px;background:var(--bg);">
            <div style="font-size:.7rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;">Stat <?= $idx + 1 ?></div>
            <div class="form-group" style="margin-bottom:10px;"><label class="form-label" style="font-size:.75rem;">Counter Value</label><input type="text" name="stat_value[]" class="form-control" value="<?= e($stat['value'] ?? '') ?>" placeholder="e.g. 25"></div>
            <div class="form-group" style="margin-bottom:10px;"><label class="form-label" style="font-size:.75rem;">Suffix</label><input type="text" name="stat_suffix[]" class="form-control" value="<?= e($stat['suffix'] ?? '+') ?>" placeholder="+"></div>
            <div class="form-group" style="margin-bottom:10px;"><label class="form-label" style="font-size:.75rem;">Label</label><input type="text" name="stat_label[]" class="form-control" value="<?= e($stat['label'] ?? '') ?>"></div>
            <div class="form-group"><label class="form-label" style="font-size:.75rem;">Display Override</label><input type="text" name="stat_display[]" class="form-control" value="<?= e($stat['display'] ?? '') ?>" placeholder="e.g. 10,000+"></div>
          </div>
          <?php endforeach; ?>
        </div>
        <div class="form-actions"><button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save Stats</button></div>
      </form>
    </div>
  </div>

  <!-- ── Section 6: Industries Header ─── -->
  <div class="section-card section-card--purple" id="industries">
    <div class="section-card__header">
      <div class="section-card__num">6</div>
      <div class="section-card__info">
        <div class="section-card__title">Industries Grid — Section Header</div>
        <div class="section-card__desc">Eyebrow, headline, and description above the industry cards. Cards are loaded from <strong>Industries</strong> editor (featured items).</div>
      </div>
      <a href="industries.php" class="btn btn--outline btn--sm"><i class="fas fa-industry"></i> Edit Industries</a>
    </div>
    <div class="section-card__body">
      <form method="POST">
        <?= csrf_field() ?>
        <input type="hidden" name="section" value="industries_section">
        <div class="form-grid">
          <div class="form-group"><label class="form-label">Eyebrow</label><input type="text" name="ind_eyebrow" class="form-control" value="<?= e($ind_section['eyebrow'] ?? '') ?>" placeholder="e.g. Industries Served"></div>
          <div class="form-group form-full"><label class="form-label">Headline</label><input type="text" name="ind_headline" class="form-control" value="<?= e($ind_section['headline'] ?? '') ?>"></div>
          <div class="form-group form-full"><label class="form-label">Description</label><textarea name="ind_description" class="form-control" rows="2"><?= e($ind_section['description'] ?? '') ?></textarea></div>
        </div>
        <div class="form-actions"><button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save Industries Header</button></div>
      </form>
    </div>
  </div>

  <!-- ── Section 10: CTA Banner ─── -->
  <div class="section-card section-card--orange" id="cta">
    <div class="section-card__header">
      <div class="section-card__num">10</div>
      <div class="section-card__info">
        <div class="section-card__title">CTA Banner</div>
        <div class="section-card__desc">Dark navy call-to-action block with headline and two buttons — appears near the bottom of the homepage</div>
      </div>
    </div>
    <div class="section-card__body">
      <form method="POST">
        <?= csrf_field() ?>
        <input type="hidden" name="section" value="cta_banner">
        <div class="form-grid">
          <div class="form-group form-full"><label class="form-label">Headline</label><input type="text" name="cta_headline" class="form-control" value="<?= e($cta['headline'] ?? '') ?>"></div>
          <div class="form-group form-full"><label class="form-label">Subtext</label><textarea name="cta_subtext" class="form-control" rows="2"><?= e($cta['subtext'] ?? '') ?></textarea></div>
          <div class="form-group"><label class="form-label">Primary CTA Text</label><input type="text" name="cta_primary_text_b" class="form-control" value="<?= e($cta['cta_primary_text'] ?? '') ?>"></div>
          <div class="form-group"><label class="form-label">Primary CTA URL</label><input type="text" name="cta_primary_url_b" class="form-control" value="<?= e($cta['cta_primary_url'] ?? '') ?>"></div>
          <div class="form-group"><label class="form-label">Secondary CTA Text</label><input type="text" name="cta_secondary_text_b" class="form-control" value="<?= e($cta['cta_secondary_text'] ?? '') ?>"></div>
          <div class="form-group"><label class="form-label">Secondary CTA URL</label><input type="text" name="cta_secondary_url_b" class="form-control" value="<?= e($cta['cta_secondary_url'] ?? '') ?>"></div>
        </div>
        <div class="form-actions"><button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save CTA Banner</button></div>
      </form>
    </div>
  </div>

  <!-- ── Linked Sections ─── -->
  <div style="margin-top:8px;">
    <h4 style="font-size:.82rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--text-muted);margin-bottom:14px;"><i class="fas fa-link" style="margin-right:6px;"></i> Related Content — Managed Separately</h4>
    <a href="testimonials.php" class="linked-section">
      <div class="linked-section__icon linked-section__icon--teal"><i class="fas fa-quote-left"></i></div>
      <div class="linked-section__info">
        <div class="linked-section__title">Testimonials (<?= $testimonials_count ?>)</div>
        <div class="linked-section__sub">Homepage slider pulls featured testimonials</div>
      </div>
      <i class="fas fa-chevron-right linked-section__arrow"></i>
    </a>
    <a href="services.php" class="linked-section">
      <div class="linked-section__icon linked-section__icon--gold"><i class="fas fa-hard-hat"></i></div>
      <div class="linked-section__info">
        <div class="linked-section__title">Services Catalog (<?= $services_count ?>)</div>
        <div class="linked-section__sub">Homepage grid shows featured services</div>
      </div>
      <i class="fas fa-chevron-right linked-section__arrow"></i>
    </a>
    <a href="industries.php" class="linked-section">
      <div class="linked-section__icon linked-section__icon--navy"><i class="fas fa-industry"></i></div>
      <div class="linked-section__info">
        <div class="linked-section__title">Industries (<?= $industries_count ?>)</div>
        <div class="linked-section__sub">Homepage grid shows featured industries</div>
      </div>
      <i class="fas fa-chevron-right linked-section__arrow"></i>
    </a>
  </div>

</div>
<?php admin_foot(); ?>
