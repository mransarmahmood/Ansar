<?php
require_once dirname(__DIR__) . '/includes/auth.php';
require_once dirname(__DIR__) . '/includes/layout.php';
require_login();

$about = read_json_content(ABOUT_JSON);
if (empty($about)) {
    $about = ['hero'=>[],'intro'=>[],'philosophy'=>[],'timeline'=>[],'credentials'=>[]];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && verify_csrf()) {
    $section = clean_input($_POST['section'] ?? '');

    if ($section === 'hero') {
        $about['hero'] = [
            'eyebrow'    => clean_input($_POST['eyebrow']    ?? ''),
            'headline'   => clean_input($_POST['headline']   ?? ''),
            'description'=> clean_input($_POST['description']?? ''),
        ];
    }

    if ($section === 'intro') {
        $paras_raw = clean_input($_POST['paragraphs'] ?? '');
        $paragraphs = array_filter(array_map('trim', explode("\n---\n", $paras_raw)));
        $about['intro'] = [
            'eyebrow'    => clean_input($_POST['eyebrow']    ?? ''),
            'subheading' => clean_input($_POST['subheading']  ?? ''),
            'paragraphs' => array_values($paragraphs),
        ];
    }

    if ($section === 'philosophy') {
        $about['philosophy'] = [
            'text'        => clean_input($_POST['text']        ?? ''),
            'attribution' => clean_input($_POST['attribution'] ?? ''),
        ];
    }

    if ($section === 'timeline') {
        $timeline = [];
        $years = $_POST['tl_year'] ?? [];
        $titles = $_POST['tl_title'] ?? [];
        $descs = $_POST['tl_desc'] ?? [];
        for ($i = 0; $i < count($years); $i++) {
            $y = clean_input($years[$i] ?? '');
            $t = clean_input($titles[$i] ?? '');
            $d = clean_input($descs[$i] ?? '');
            if ($y || $t) $timeline[] = ['year'=>$y, 'title'=>$t, 'description'=>$d];
        }
        $about['timeline'] = $timeline;
    }

    if ($section === 'credentials') {
        $credentials = [];
        $icons  = $_POST['cr_icon'] ?? [];
        $names  = $_POST['cr_name'] ?? [];
        $details= $_POST['cr_detail'] ?? [];
        for ($i = 0; $i < count($names); $i++) {
            $ic = clean_input($icons[$i] ?? '');
            $n  = clean_input($names[$i] ?? '');
            $dt = clean_input($details[$i] ?? '');
            if ($n) $credentials[] = ['icon'=>$ic, 'name'=>$n, 'detail'=>$dt];
        }
        $about['credentials'] = $credentials;
    }

    write_json_content(ABOUT_JSON, $about);
    set_flash('success', ucfirst($section) . ' updated successfully.');
    header('Location: about.php'); exit;
}

$hero  = $about['hero']  ?? [];
$intro = $about['intro'] ?? [];
$philo = $about['philosophy'] ?? [];
$timeline    = $about['timeline']    ?? [];
$credentials = $about['credentials'] ?? [];

admin_head('About Page', 'content/about');
admin_topbar('About Page', 'Edit all sections of the About page', [
    '<a href="../../pages/about.html" target="_blank" class="btn btn--outline"><i class="fas fa-external-link-alt"></i> View Page</a>',
]);
?>
<div class="page-body">

  <!-- Page Section Map -->
  <div class="section-map">
    <div class="section-map__header">
      <i class="fas fa-sitemap"></i>
      <h3>About Page Structure</h3>
      <span>7 Sections</span>
    </div>
    <div class="section-map__body">
      <a href="#hero" class="section-map__item section-map__item--editable">
        <span class="section-map__item-num">1</span>
        <span class="section-map__item-label">Page Hero<span class="section-map__item-sub">Eyebrow, headline, description</span></span>
        <span class="section-map__item-badge section-map__item-badge--edit">Edit below</span>
      </a>
      <a href="#story" class="section-map__item section-map__item--editable">
        <span class="section-map__item-num">2</span>
        <span class="section-map__item-label">Professional Story<span class="section-map__item-sub">Bio paragraphs + photo</span></span>
        <span class="section-map__item-badge section-map__item-badge--edit">Edit below</span>
      </a>
      <div class="section-map__item">
        <span class="section-map__item-num">3</span>
        <span class="section-map__item-label">Photo Gallery<span class="section-map__item-sub">4 field photos + banner</span></span>
        <span class="section-map__item-badge section-map__item-badge--static">Static</span>
      </div>
      <a href="#timeline" class="section-map__item section-map__item--editable">
        <span class="section-map__item-num">4</span>
        <span class="section-map__item-label">Career Timeline<span class="section-map__item-sub"><?= count($timeline) ?> milestones</span></span>
        <span class="section-map__item-badge section-map__item-badge--edit">Edit below</span>
      </a>
      <a href="#credentials" class="section-map__item section-map__item--editable">
        <span class="section-map__item-num">5</span>
        <span class="section-map__item-label">Credentials<span class="section-map__item-sub"><?= count($credentials) ?> certifications</span></span>
        <span class="section-map__item-badge section-map__item-badge--edit">Edit below</span>
      </a>
      <a href="#philosophy" class="section-map__item section-map__item--editable">
        <span class="section-map__item-num">6</span>
        <span class="section-map__item-label">Philosophy Quote<span class="section-map__item-sub">Blockquote + attribution</span></span>
        <span class="section-map__item-badge section-map__item-badge--edit">Edit below</span>
      </a>
      <div class="section-map__item">
        <span class="section-map__item-num">7</span>
        <span class="section-map__item-label">CTA Section<span class="section-map__item-sub">Book consultation link</span></span>
        <span class="section-map__item-badge section-map__item-badge--static">Auto</span>
      </div>
    </div>
  </div>

  <!-- Hero Section -->
  <div class="section-card" id="hero">
    <div class="section-card__header">
      <div class="section-card__num">1</div>
      <div class="section-card__info">
        <div class="section-card__title">Page Hero</div>
        <div class="section-card__desc">Top banner with eyebrow text, main headline, and description paragraph</div>
      </div>
    </div>
    <form method="POST" style="padding:24px;">
      <?= csrf_field() ?>
      <input type="hidden" name="section" value="hero">
      <div class="form-grid">
        <div class="form-group form-full">
          <label class="form-label">Eyebrow</label>
          <input type="text" name="eyebrow" class="form-control" value="<?= e($hero['eyebrow'] ?? '') ?>">
        </div>
        <div class="form-group form-full">
          <label class="form-label">Headline</label>
          <input type="text" name="headline" class="form-control" value="<?= e($hero['headline'] ?? '') ?>">
        </div>
        <div class="form-group form-full">
          <label class="form-label">Description</label>
          <textarea name="description" class="form-control" rows="3"><?= e($hero['description'] ?? '') ?></textarea>
        </div>
      </div>
      <div class="form-actions"><button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save Hero</button></div>
    </form>
  </div>

  <!-- Intro Section -->
  <div class="section-card section-card--blue" id="story">
    <div class="section-card__header">
      <div class="section-card__num">2</div>
      <div class="section-card__info">
        <div class="section-card__title">Professional Story</div>
        <div class="section-card__desc">Bio paragraphs with eyebrow and subheading — appears alongside the profile photo</div>
      </div>
    </div>
    <form method="POST" style="padding:24px;">
      <?= csrf_field() ?>
      <input type="hidden" name="section" value="intro">
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Eyebrow</label>
          <input type="text" name="eyebrow" class="form-control" value="<?= e($intro['eyebrow'] ?? '') ?>">
        </div>
        <div class="form-group">
          <label class="form-label">Subheading</label>
          <input type="text" name="subheading" class="form-control" value="<?= e($intro['subheading'] ?? '') ?>">
        </div>
        <div class="form-group form-full">
          <label class="form-label">Paragraphs (separate with --- on its own line)</label>
          <textarea name="paragraphs" class="form-control" rows="12"><?= e(implode("\n---\n", $intro['paragraphs'] ?? [])) ?></textarea>
        </div>
      </div>
      <div class="form-actions"><button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save Story</button></div>
    </form>
  </div>

  <!-- Philosophy -->
  <div class="section-card section-card--gold" id="philosophy">
    <div class="section-card__header">
      <div class="section-card__num">6</div>
      <div class="section-card__info">
        <div class="section-card__title">Philosophy Quote</div>
        <div class="section-card__desc">Large blockquote displayed on a dark navy background strip</div>
      </div>
    </div>
    <form method="POST" style="padding:24px;">
      <?= csrf_field() ?>
      <input type="hidden" name="section" value="philosophy">
      <div class="form-grid">
        <div class="form-group form-full">
          <label class="form-label">Quote Text</label>
          <textarea name="text" class="form-control" rows="3"><?= e($philo['text'] ?? '') ?></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Attribution</label>
          <input type="text" name="attribution" class="form-control" value="<?= e($philo['attribution'] ?? '') ?>">
        </div>
      </div>
      <div class="form-actions"><button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save Philosophy</button></div>
    </form>
  </div>

  <!-- Timeline -->
  <div class="section-card section-card--purple" id="timeline">
    <div class="section-card__header">
      <div class="section-card__num">4</div>
      <div class="section-card__info">
        <div class="section-card__title">Career Timeline</div>
        <div class="section-card__desc"><?= count($timeline) ?> milestone entries — displayed as an alternating left/right timeline on the page</div>
      </div>
    </div>
    <form method="POST" style="padding:24px;" id="timeline-form">
      <?= csrf_field() ?>
      <input type="hidden" name="section" value="timeline">
      <div id="tl-container">
        <?php foreach ($timeline as $i => $tl): ?>
        <div class="tl-row" style="display:grid;grid-template-columns:120px 1fr;gap:12px;margin-bottom:16px;padding:16px;background:var(--bg);border-radius:8px;">
          <div>
            <label class="form-label">Year/Phase</label>
            <input type="text" name="tl_year[]" class="form-control" value="<?= e($tl['year'] ?? '') ?>">
          </div>
          <div>
            <label class="form-label">Title</label>
            <input type="text" name="tl_title[]" class="form-control" value="<?= e($tl['title'] ?? '') ?>">
            <textarea name="tl_desc[]" class="form-control" rows="2" style="margin-top:8px;" placeholder="Description..."><?= e($tl['description'] ?? '') ?></textarea>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
      <button type="button" class="btn btn--outline" onclick="addTimeline()" style="margin-bottom:16px;"><i class="fas fa-plus"></i> Add Entry</button>
      <div class="form-actions"><button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save Timeline</button></div>
    </form>
  </div>

  <!-- Credentials -->
  <div class="section-card section-card--navy" id="credentials">
    <div class="section-card__header">
      <div class="section-card__num">5</div>
      <div class="section-card__info">
        <div class="section-card__title">Credentials & Certifications</div>
        <div class="section-card__desc"><?= count($credentials) ?> professional qualifications — displayed as an icon grid on the page</div>
      </div>
    </div>
    <form method="POST" style="padding:24px;" id="cred-form">
      <?= csrf_field() ?>
      <input type="hidden" name="section" value="credentials">
      <div id="cr-container">
        <?php foreach ($credentials as $cr): ?>
        <div class="cr-row" style="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:12px;margin-bottom:10px;align-items:end;">
          <div><label class="form-label">Icon</label><input type="text" name="cr_icon[]" class="form-control" value="<?= e($cr['icon'] ?? '') ?>" placeholder="fas fa-certificate"></div>
          <div><label class="form-label">Name</label><input type="text" name="cr_name[]" class="form-control" value="<?= e($cr['name'] ?? '') ?>"></div>
          <div><label class="form-label">Detail</label><input type="text" name="cr_detail[]" class="form-control" value="<?= e($cr['detail'] ?? '') ?>"></div>
          <button type="button" class="btn btn--sm" style="background:var(--danger);color:white;border:none;height:38px;" onclick="this.parentElement.remove()"><i class="fas fa-trash"></i></button>
        </div>
        <?php endforeach; ?>
      </div>
      <button type="button" class="btn btn--outline" onclick="addCredential()" style="margin-bottom:16px;"><i class="fas fa-plus"></i> Add Credential</button>
      <div class="form-actions"><button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save Credentials</button></div>
    </form>
  </div>

</div>

<?php admin_foot(); ?>
<script>
function addTimeline() {
  const c = document.getElementById('tl-container');
  const d = document.createElement('div');
  d.className = 'tl-row';
  d.style.cssText = 'display:grid;grid-template-columns:120px 1fr;gap:12px;margin-bottom:16px;padding:16px;background:var(--bg);border-radius:8px;';
  d.innerHTML = '<div><label class="form-label">Year/Phase</label><input type="text" name="tl_year[]" class="form-control"></div><div><label class="form-label">Title</label><input type="text" name="tl_title[]" class="form-control"><textarea name="tl_desc[]" class="form-control" rows="2" style="margin-top:8px;" placeholder="Description..."></textarea></div>';
  c.appendChild(d);
}
function addCredential() {
  const c = document.getElementById('cr-container');
  const d = document.createElement('div');
  d.className = 'cr-row';
  d.style.cssText = 'display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:12px;margin-bottom:10px;align-items:end;';
  d.innerHTML = '<div><label class="form-label">Icon</label><input type="text" name="cr_icon[]" class="form-control" placeholder="fas fa-certificate"></div><div><label class="form-label">Name</label><input type="text" name="cr_name[]" class="form-control"></div><div><label class="form-label">Detail</label><input type="text" name="cr_detail[]" class="form-control"></div><button type="button" class="btn btn--sm" style="background:var(--danger);color:white;border:none;height:38px;" onclick="this.parentElement.remove()"><i class="fas fa-trash"></i></button>';
  c.appendChild(d);
}
</script>
