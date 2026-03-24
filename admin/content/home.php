<?php
require_once dirname(__DIR__) . '/includes/auth.php';
require_once dirname(__DIR__) . '/includes/layout.php';
require_login();

$hp = read_json_content(HOMEPAGE_JSON);
if (empty($hp)) {
    $hp = ['hero'=>[],'stats'=>[],'why_choose'=>[],'cta_banner'=>[],'trust_bar'=>[]];
}

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
        file_put_contents(HOMEPAGE_JSON, json_encode($hp, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
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
        file_put_contents(HOMEPAGE_JSON, json_encode($hp, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
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
        file_put_contents(HOMEPAGE_JSON, json_encode($hp, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        set_flash('success', 'CTA Banner saved.');
        header('Location: home.php#cta'); exit;
    }
}

$hero = $hp['hero'] ?? [];
$stats = $hp['stats'] ?? [];
$cta = $hp['cta_banner'] ?? [];

admin_head('Homepage', 'content/home');
admin_topbar('Homepage Editor', 'Edit homepage sections: hero, stats, and CTA banner', [
    '<a href="../../index.html" target="_blank" class="btn btn--outline"><i class="fas fa-external-link-alt"></i> View Homepage</a>',
]);
?>
<div class="page-body">

  <div class="alert" style="background:#EFF6FF;border:1px solid #BFDBFE;color:#1E40AF;border-radius:var(--radius-sm);padding:14px 18px;margin-bottom:20px;font-size:.88rem;">
    <i class="fas fa-info-circle"></i>
    <strong>Note:</strong> Testimonials, Blog Posts, FAQs, and other sections are managed in their dedicated pages in the sidebar. This page covers the hero, stats, and CTA banner.
  </div>

  <!-- ── Hero Section ─── -->
  <div class="card" style="margin-bottom:24px;" id="hero">
    <div class="card__header"><div class="card__title"><i class="fas fa-star"></i> Hero Section</div></div>
    <div class="card__body">
      <form method="POST">
        <?= csrf_field() ?>
        <input type="hidden" name="section" value="hero">
        <div class="form-grid">
          <div class="form-group"><label class="form-label">Badge Text</label><input type="text" name="badge" class="form-control" value="<?= e($hero['badge'] ?? '') ?>"></div>
          <div class="form-group form-full"><label class="form-label">Main Headline</label><input type="text" name="headline" class="form-control" value="<?= e($hero['headline'] ?? '') ?>"></div>
          <div class="form-group form-full"><label class="form-label">Subheadline</label><textarea name="subheadline" class="form-control" rows="3"><?= e($hero['subheadline'] ?? '') ?></textarea></div>
          <div class="form-group"><label class="form-label">Primary CTA Text</label><input type="text" name="cta_primary_text" class="form-control" value="<?= e($hero['cta_primary_text'] ?? '') ?>"></div>
          <div class="form-group"><label class="form-label">Primary CTA URL</label><input type="text" name="cta_primary_url" class="form-control" value="<?= e($hero['cta_primary_url'] ?? '') ?>"></div>
          <div class="form-group"><label class="form-label">Secondary CTA Text</label><input type="text" name="cta_secondary_text" class="form-control" value="<?= e($hero['cta_secondary_text'] ?? '') ?>"></div>
          <div class="form-group"><label class="form-label">Secondary CTA URL</label><input type="text" name="cta_secondary_url" class="form-control" value="<?= e($hero['cta_secondary_url'] ?? '') ?>"></div>
          <div class="form-group form-full">
            <label class="form-label">Credential Pills (one per line)</label>
            <textarea name="credentials" class="form-control" rows="6" placeholder="One credential per line"><?= e(implode("\n", $hero['credentials'] ?? [])) ?></textarea>
            <span class="form-hint">e.g. NEBOSH Certified, 40+ Countries, ISO Lead Auditor</span>
          </div>
        </div>
        <div class="form-actions"><button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save Hero</button></div>
      </form>
    </div>
  </div>

  <!-- ── Stats Section ─── -->
  <div class="card" style="margin-bottom:24px;" id="stats">
    <div class="card__header"><div class="card__title"><i class="fas fa-chart-line"></i> Stats Strip</div></div>
    <div class="card__body">
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
          foreach ($currentStats as $stat): ?>
          <div style="border:1px solid var(--border);border-radius:var(--radius-sm);padding:16px;">
            <div class="form-group"><label class="form-label" style="font-size:.75rem;">Counter Value</label><input type="text" name="stat_value[]" class="form-control" value="<?= e($stat['value'] ?? '') ?>" placeholder="e.g. 25"></div>
            <div class="form-group"><label class="form-label" style="font-size:.75rem;">Suffix</label><input type="text" name="stat_suffix[]" class="form-control" value="<?= e($stat['suffix'] ?? '+') ?>" placeholder="+"></div>
            <div class="form-group"><label class="form-label" style="font-size:.75rem;">Label</label><input type="text" name="stat_label[]" class="form-control" value="<?= e($stat['label'] ?? '') ?>"></div>
            <div class="form-group"><label class="form-label" style="font-size:.75rem;">Display Override (optional)</label><input type="text" name="stat_display[]" class="form-control" value="<?= e($stat['display'] ?? '') ?>" placeholder="e.g. 10,000+"></div>
          </div>
          <?php endforeach; ?>
        </div>
        <div class="form-actions"><button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save Stats</button></div>
      </form>
    </div>
  </div>

  <!-- ── CTA Banner ─── -->
  <div class="card" id="cta">
    <div class="card__header"><div class="card__title"><i class="fas fa-bullhorn"></i> CTA Banner</div></div>
    <div class="card__body">
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

</div>
<?php admin_foot(); ?>
