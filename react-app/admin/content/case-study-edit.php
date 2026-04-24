<?php
require_once dirname(__DIR__) . '/includes/auth.php';
require_once dirname(__DIR__) . '/includes/layout.php';
require_login();

$items = read_json_content(CASE_STUDIES_JSON);
$id    = clean_input($_GET['id'] ?? '');
$item  = null;
$idx   = null;
foreach ($items as $i => $existing) {
    if ($existing['id'] === $id) { $item = $existing; $idx = $i; break; }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && verify_csrf()) {
    $pid = clean_input($_POST['id'] ?? '');
    $mv  = $_POST['metric_value'] ?? [];
    $ml  = $_POST['metric_label'] ?? [];
    $mc  = $_POST['metric_color'] ?? [];
    $metrics = [];
    for ($i = 0; $i < max(3, count($mv)); $i++) {
        if (!empty($mv[$i])) {
            $metrics[] = [
                'value' => clean_input($mv[$i]),
                'label' => clean_input($ml[$i] ?? ''),
                'color' => clean_input($mc[$i] ?? 'var(--gold)'),
            ];
        }
    }
    $saved = [
        'id'          => $pid ?: gen_id('cs'),
        'title'       => clean_input($_POST['title']       ?? ''),
        'headline'    => clean_input($_POST['headline']    ?? ''),
        'industry'    => clean_input($_POST['industry']    ?? ''),
        'category'    => clean_input($_POST['category']    ?? ''),
        'icon'        => clean_input($_POST['icon']        ?? 'fa-trophy'),
        'icon_bg'     => clean_input($_POST['icon_bg']     ?? 'linear-gradient(135deg,var(--navy),var(--navy-mid))'),
        'description' => clean_input($_POST['description'] ?? ''),
        'metrics'     => $metrics,
        'tag'         => clean_input($_POST['tag']         ?? ''),
        'order'       => (int)($_POST['order'] ?? 99),
        'published'   => isset($_POST['published']),
    ];
    $foundIdx = null;
    foreach ($items as $i => $ex) { if ($ex['id'] === $saved['id']) { $foundIdx = $i; break; } }
    if ($foundIdx !== null) $items[$foundIdx] = $saved; else $items[] = $saved;
    write_json_content(CASE_STUDIES_JSON, $items);
    set_flash('success', 'Case study saved.');
    header('Location: case-studies.php'); exit;
}

$editing = $item !== null;
$title   = $editing ? 'Edit Case Study' : 'New Case Study';
$metrics = $item['metrics'] ?? [
    ['value' => '', 'label' => '', 'color' => 'var(--gold)'],
    ['value' => '', 'label' => '', 'color' => 'var(--blue)'],
    ['value' => '', 'label' => '', 'color' => '#16A34A'],
];

admin_head($title, 'content/case-study-edit');
admin_topbar($title, 'Case Studies', [
    '<a href="case-studies.php" class="btn btn--outline"><i class="fas fa-arrow-left"></i> Back to List</a>',
]);
?>
<div class="page-body">
  <div class="card">
    <div class="card__body">
      <form method="POST">
        <?= csrf_field() ?>
        <input type="hidden" name="id" value="<?= e($item['id'] ?? '') ?>">
        <div class="form-grid">
          <div class="form-group form-full"><label class="form-label">Full Title</label><input type="text" name="title" class="form-control" value="<?= e($item['title'] ?? '') ?>"></div>
          <div class="form-group form-full"><label class="form-label">Headline (short) *</label><input type="text" name="headline" class="form-control" required value="<?= e($item['headline'] ?? '') ?>" placeholder="e.g. 67% Incident Rate Reduction"></div>
          <div class="form-group"><label class="form-label">Industry</label><input type="text" name="industry" class="form-control" value="<?= e($item['industry'] ?? '') ?>" placeholder="e.g. Oil & Gas · UAE"></div>
          <div class="form-group">
            <label class="form-label">Category</label>
            <select name="category" class="form-control">
              <?php foreach (['consulting','systems','training','digital'] as $cat): ?>
              <option value="<?= $cat ?>" <?= ($item['category'] ?? '') === $cat ? 'selected' : '' ?>><?= ucfirst($cat) ?></option>
              <?php endforeach; ?>
            </select>
          </div>
          <div class="form-group"><label class="form-label">Icon (FA class)</label><input type="text" name="icon" class="form-control" value="<?= e($item['icon'] ?? 'fa-trophy') ?>" placeholder="fa-trophy"></div>
          <div class="form-group"><label class="form-label">Icon Background (CSS gradient)</label><input type="text" name="icon_bg" class="form-control" value="<?= e($item['icon_bg'] ?? 'linear-gradient(135deg,var(--navy),var(--navy-mid))') ?>"></div>
          <div class="form-group form-full"><label class="form-label">Project Description *</label><textarea name="description" class="form-control" rows="4" required><?= e($item['description'] ?? '') ?></textarea></div>
          <div class="form-group"><label class="form-label">Tag</label><input type="text" name="tag" class="form-control" value="<?= e($item['tag'] ?? '') ?>" placeholder="e.g. HSE Consulting"></div>
          <div class="form-group"><label class="form-label">Display Order</label><input type="number" name="order" class="form-control" value="<?= (int)($item['order'] ?? 99) ?>"></div>
        </div>

        <h4 style="margin:24px 0 16px;border-top:1px solid var(--border);padding-top:16px;">Result Metrics (up to 3)</h4>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px;">
          <?php for ($m = 0; $m < 3; $m++): ?>
          <div style="border:1px solid var(--border);border-radius:var(--radius-sm);padding:16px;">
            <p style="font-size:.8rem;color:var(--text-muted);margin-bottom:10px;font-weight:600;">Metric <?= $m+1 ?></p>
            <div class="form-group"><label class="form-label" style="font-size:.8rem;">Value (e.g. 67%)</label><input type="text" name="metric_value[]" class="form-control" value="<?= e($metrics[$m]['value'] ?? '') ?>"></div>
            <div class="form-group"><label class="form-label" style="font-size:.8rem;">Label</label><input type="text" name="metric_label[]" class="form-control" value="<?= e($metrics[$m]['label'] ?? '') ?>"></div>
            <div class="form-group"><label class="form-label" style="font-size:.8rem;">Colour (CSS)</label><input type="text" name="metric_color[]" class="form-control" value="<?= e($metrics[$m]['color'] ?? 'var(--gold)') ?>"></div>
          </div>
          <?php endfor; ?>
        </div>

        <div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:500;"><input type="checkbox" name="published" <?= !empty($item['published']) ? 'checked' : '' ?>> Published (visible on site)</label></div>
        <div class="form-actions">
          <a href="case-studies.php" class="btn btn--outline">Cancel</a>
          <button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save Case Study</button>
        </div>
      </form>
    </div>
  </div>
</div>
<?php admin_foot(); ?>
