<?php
require_once dirname(__DIR__) . '/includes/auth.php';
require_once dirname(__DIR__) . '/includes/layout.php';
require_login();

$items = read_json_content(INDUSTRIES_JSON);

// ── Handle POST ───────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST' && verify_csrf()) {
    $action = $_POST['action'] ?? '';

    if ($action === 'save') {
        $id   = clean_input($_POST['id'] ?? '');
        $ks_raw = clean_input($_POST['key_services'] ?? '');
        $key_services = array_filter(array_map('trim', explode("\n", $ks_raw)));
        $item = [
            'id'           => $id ?: gen_id('ind'),
            'name'         => clean_input($_POST['name']        ?? ''),
            'icon'         => clean_input($_POST['icon']        ?? 'fa-industry'),
            'tag'          => clean_input($_POST['tag']         ?? ''),
            'description'  => clean_input($_POST['description'] ?? ''),
            'key_services' => array_values($key_services),
            'featured'     => isset($_POST['featured']),
            'order'        => (int)($_POST['order'] ?? 99),
            'published'    => isset($_POST['published']),
        ];
        $idx = null;
        foreach ($items as $i => $existing) {
            if ($existing['id'] === $item['id']) { $idx = $i; break; }
        }
        if ($idx !== null) $items[$idx] = $item;
        else $items[] = $item;
        write_json_content(INDUSTRIES_JSON, $items);
        set_flash('success', 'Industry saved successfully.');
        header('Location: industries.php'); exit;
    }

    if ($action === 'delete') {
        $id = clean_input($_POST['id'] ?? '');
        $items = array_filter($items, fn($i) => $i['id'] !== $id);
        write_json_content(INDUSTRIES_JSON, array_values($items));
        set_flash('success', 'Industry deleted.');
        header('Location: industries.php'); exit;
    }
}

admin_head('Industries', 'content/industries');
admin_topbar('Industries', 'Manage industry sectors', [
    '<button class="btn btn--primary" onclick="openAddModal()"><i class="fas fa-plus"></i> Add Industry</button>',
    '<a href="../../pages/industries.html" target="_blank" class="btn btn--outline"><i class="fas fa-external-link-alt"></i> View Page</a>',
]);
?>
<div class="page-body">

  <div class="info-banner info-banner--teal">
    <i class="fas fa-info-circle"></i>
    <div>
      <strong>Where this content appears:</strong> Industries are shown on the <a href="../../pages/industries.html" target="_blank" style="color:inherit;text-decoration:underline;">Industries page</a> as detailed sector cards. <strong>Featured</strong> industries also appear on the homepage industries grid section.
    </div>
  </div>

  <div class="quick-stats" style="margin-bottom:20px;">
    <div class="quick-stat"><div class="quick-stat__value"><?= count($items) ?></div><div class="quick-stat__label">Total</div></div>
    <div class="quick-stat"><div class="quick-stat__value"><?= count(array_filter($items, fn($i) => !empty($i['featured']))) ?></div><div class="quick-stat__label">Featured</div></div>
    <div class="quick-stat"><div class="quick-stat__value"><?= count(array_filter($items, fn($i) => !empty($i['published']))) ?></div><div class="quick-stat__label">Published</div></div>
  </div>

  <div class="card">
    <div class="card__header">
      <div class="card__title"><i class="fas fa-industry"></i> Industries (<?= count($items) ?>)</div>
    </div>
    <?php if (empty($items)): ?>
    <div class="empty-state" style="padding:40px;">
      <i class="fas fa-industry" style="font-size:2rem;"></i>
      <h4>No industries yet</h4>
      <p>Click "Add Industry" to create the first one.</p>
    </div>
    <?php else: ?>
    <div class="table-wrap">
      <table>
        <thead><tr><th>#</th><th>Icon</th><th>Name</th><th>Tag</th><th>Featured</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          <?php foreach ($items as $item): ?>
          <tr>
            <td style="color:var(--text-muted)"><?= (int)($item['order'] ?? 0) ?></td>
            <td><i class="fas <?= e($item['icon'] ?? 'fa-industry') ?>"></i></td>
            <td><strong><?= e($item['name'] ?? '') ?></strong></td>
            <td style="color:var(--text-muted);font-size:.85rem;"><?= e($item['tag'] ?? '') ?></td>
            <td><?= !empty($item['featured']) ? '<span class="badge badge--teal">Yes</span>' : '<span class="badge" style="background:var(--bg);color:var(--text-muted);">No</span>' ?></td>
            <td><?= !empty($item['published']) ? '<span class="badge badge--green">Live</span>' : '<span class="badge" style="background:var(--bg);color:var(--text-muted);">Draft</span>' ?></td>
            <td>
              <button class="btn btn--outline btn--sm" onclick='openEditModal(<?= htmlspecialchars(json_encode($item, JSON_HEX_APOS), ENT_QUOTES) ?>)'>
                <i class="fas fa-edit"></i> Edit
              </button>
              <form method="POST" style="display:inline;" onsubmit="return confirm('Delete this industry?')">
                <?= csrf_field() ?>
                <input type="hidden" name="action" value="delete">
                <input type="hidden" name="id" value="<?= e($item['id']) ?>">
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

<!-- Modal -->
<div class="modal-overlay" id="item-modal">
  <div class="modal" style="max-width:700px;">
    <div class="modal__header">
      <span class="modal__title" id="modal-title">Add Industry</span>
      <button class="modal__close" onclick="closeModal()"><i class="fas fa-times"></i></button>
    </div>
    <form method="POST">
      <?= csrf_field() ?>
      <input type="hidden" name="action" value="save">
      <input type="hidden" name="id" id="f-id">
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Name *</label>
          <input type="text" name="name" id="f-name" class="form-control" required placeholder="e.g. Oil & Gas">
        </div>
        <div class="form-group">
          <label class="form-label">Icon (FA class)</label>
          <input type="text" name="icon" id="f-icon" class="form-control" placeholder="e.g. fa-oil-can">
        </div>
        <div class="form-group form-full">
          <label class="form-label">Tag / Sub-sectors</label>
          <input type="text" name="tag" id="f-tag" class="form-control" placeholder="e.g. Upstream · Midstream · Downstream">
        </div>
        <div class="form-group form-full">
          <label class="form-label">Description</label>
          <textarea name="description" id="f-description" class="form-control" rows="4" placeholder="Full description of HSE services for this industry..."></textarea>
        </div>
        <div class="form-group form-full">
          <label class="form-label">Key Services (one per line)</label>
          <textarea name="key_services" id="f-key_services" class="form-control" rows="3" placeholder="Process Safety&#10;HAZOP/HAZID&#10;ISO 45001"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Display Order</label>
          <input type="number" name="order" id="f-order" class="form-control" min="1" max="99" value="99">
        </div>
        <div class="form-group">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:500;padding-top:8px;">
            <input type="checkbox" name="featured" id="f-featured"> Featured (show on homepage)
          </label>
        </div>
        <div class="form-group">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:500;padding-top:8px;">
            <input type="checkbox" name="published" id="f-published" checked> Published (visible on site)
          </label>
        </div>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save Industry</button>
      </div>
    </form>
  </div>
</div>

<?php admin_foot(); ?>
<script>
function openAddModal() {
  ['f-id','f-name','f-icon','f-tag','f-description','f-key_services'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('f-order').value = '99';
  document.getElementById('f-featured').checked = false;
  document.getElementById('f-published').checked = true;
  document.getElementById('modal-title').textContent = 'Add Industry';
  document.getElementById('item-modal').classList.add('open');
}
function openEditModal(item) {
  document.getElementById('f-id').value          = item.id          || '';
  document.getElementById('f-name').value        = item.name        || '';
  document.getElementById('f-icon').value        = item.icon        || '';
  document.getElementById('f-tag').value         = item.tag         || '';
  document.getElementById('f-description').value = item.description || '';
  document.getElementById('f-key_services').value= (item.key_services || []).join('\n');
  document.getElementById('f-order').value       = item.order       || '99';
  document.getElementById('f-featured').checked  = !!item.featured;
  document.getElementById('f-published').checked = !!item.published;
  document.getElementById('modal-title').textContent = 'Edit Industry';
  document.getElementById('item-modal').classList.add('open');
}
function closeModal() { document.getElementById('item-modal').classList.remove('open'); }
document.getElementById('item-modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
</script>
