<?php
require_once dirname(__DIR__) . '/includes/auth.php';
require_once dirname(__DIR__) . '/includes/layout.php';
require_login();

$items = read_json_content(CASE_STUDIES_JSON);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && verify_csrf()) {
    $action = $_POST['action'] ?? '';
    if ($action === 'save') {
        $id   = clean_input($_POST['id'] ?? '');
        // Parse metrics from separate arrays
        $mv = $_POST['metric_value'] ?? [];
        $ml = $_POST['metric_label'] ?? [];
        $mc = $_POST['metric_color'] ?? [];
        $metrics = [];
        for ($i = 0; $i < count($mv); $i++) {
            if (!empty($mv[$i])) {
                $metrics[] = [
                    'value' => clean_input($mv[$i]),
                    'label' => clean_input($ml[$i] ?? ''),
                    'color' => clean_input($mc[$i] ?? 'var(--gold)'),
                ];
            }
        }
        $item = [
            'id'          => $id ?: gen_id('cs'),
            'title'       => clean_input($_POST['title']    ?? ''),
            'headline'    => clean_input($_POST['headline'] ?? ''),
            'industry'    => clean_input($_POST['industry'] ?? ''),
            'category'    => clean_input($_POST['category'] ?? ''),
            'icon'        => clean_input($_POST['icon']     ?? 'fa-trophy'),
            'description' => clean_input($_POST['description'] ?? ''),
            'metrics'     => $metrics,
            'tag'         => clean_input($_POST['tag']      ?? ''),
            'order'       => (int)($_POST['order'] ?? 99),
            'published'   => isset($_POST['published']),
        ];
        $idx = null;
        foreach ($items as $i => $existing) {
            if ($existing['id'] === $item['id']) { $idx = $i; break; }
        }
        if ($idx !== null) $items[$idx] = $item; else $items[] = $item;
        write_json_content(CASE_STUDIES_JSON, $items);
        set_flash('success', 'Case study saved.'); header('Location: case-studies.php'); exit;
    }
    if ($action === 'delete') {
        $id = clean_input($_POST['id'] ?? '');
        $items = array_filter($items, fn($i) => $i['id'] !== $id);
        write_json_content(CASE_STUDIES_JSON, array_values($items));
        set_flash('success', 'Case study deleted.'); header('Location: case-studies.php'); exit;
    }
}

admin_head('Case Studies', 'content/case-studies');
admin_topbar('Case Studies', 'Manage project results and success stories', [
    '<button class="btn btn--primary" onclick="openAddModal()"><i class="fas fa-plus"></i> Add Case Study</button>',
    '<a href="../../pages/case-studies.html" target="_blank" class="btn btn--outline"><i class="fas fa-external-link-alt"></i> View Page</a>',
]);
?>
<div class="page-body">

  <div class="info-banner info-banner--blue">
    <i class="fas fa-info-circle"></i>
    <div>
      <strong>Where this content appears:</strong> Case studies are displayed on the <a href="../../pages/case-studies.html" target="_blank" style="color:inherit;text-decoration:underline;">Case Studies page</a> as project cards with metrics, industry tags, and category filters. They demonstrate real client success stories.
    </div>
  </div>

  <div class="card">
    <div class="card__header"><div class="card__title"><i class="fas fa-trophy"></i> Case Studies (<?= count($items) ?>)</div></div>
    <?php if (empty($items)): ?>
    <div class="empty-state" style="padding:40px;"><i class="fas fa-trophy" style="font-size:2rem;"></i><h4>No case studies yet</h4></div>
    <?php else: ?>
    <div class="table-wrap">
      <table>
        <thead><tr><th>#</th><th>Headline</th><th>Industry</th><th>Category</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          <?php foreach ($items as $item): ?>
          <tr>
            <td style="color:var(--text-muted)"><?= (int)($item['order'] ?? 0) ?></td>
            <td><strong><?= e($item['headline'] ?? $item['title'] ?? '') ?></strong><br><span class="td-muted"><?= e($item['tag'] ?? '') ?></span></td>
            <td><?= e($item['industry'] ?? '') ?></td>
            <td><span class="badge badge--teal"><?= e($item['category'] ?? '') ?></span></td>
            <td><?= !empty($item['published']) ? '<span class="badge badge--green">Live</span>' : '<span class="badge" style="background:var(--bg);color:var(--text-muted);">Draft</span>' ?></td>
            <td>
              <a href="case-study-edit.php?id=<?= e($item['id']) ?>" class="btn btn--outline btn--sm"><i class="fas fa-edit"></i> Edit</a>
              <form method="POST" style="display:inline;" onsubmit="return confirm('Delete?')">
                <?= csrf_field() ?><input type="hidden" name="action" value="delete"><input type="hidden" name="id" value="<?= e($item['id']) ?>">
                <button type="submit" class="btn btn--sm" style="background:var(--danger);color:white;border:none;"><i class="fas fa-trash"></i></button>
              </form>
            </td>
          </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
    <?php endif; ?>
  </div>
</div>
<?php admin_foot(); ?>
