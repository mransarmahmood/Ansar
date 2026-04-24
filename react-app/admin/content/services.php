<?php
require_once dirname(__DIR__) . '/includes/auth.php';
require_once dirname(__DIR__) . '/includes/layout.php';
require_login();

$items = read_json_content(SERVICES_JSON);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && verify_csrf()) {
    $action = $_POST['action'] ?? '';
    if ($action === 'save') {
        $id   = clean_input($_POST['id'] ?? '');
        $item = [
            'id'          => $id ?: gen_id('svc'),
            'title'       => clean_input($_POST['title']       ?? ''),
            'icon'        => clean_input($_POST['icon']        ?? 'fa-hard-hat'),
            'category'    => clean_input($_POST['category']    ?? ''),
            'tag'         => clean_input($_POST['tag']         ?? ''),
            'description' => clean_input($_POST['description'] ?? ''),
            'url'         => clean_input($_POST['url']         ?? ''),
            'featured'    => isset($_POST['featured']),
            'order'       => (int)($_POST['order'] ?? 99),
            'published'   => isset($_POST['published']),
        ];
        $idx = null;
        foreach ($items as $i => $existing) {
            if ($existing['id'] === $item['id']) { $idx = $i; break; }
        }
        if ($idx !== null) $items[$idx] = $item; else $items[] = $item;
        write_json_content(SERVICES_JSON, $items);
        set_flash('success', 'Service saved.'); header('Location: services.php'); exit;
    }
    if ($action === 'delete') {
        $id = clean_input($_POST['id'] ?? '');
        $items = array_filter($items, fn($i) => $i['id'] !== $id);
        write_json_content(SERVICES_JSON, array_values($items));
        set_flash('success', 'Service deleted.'); header('Location: services.php'); exit;
    }
}

admin_head('Services', 'content/services');
admin_topbar('Services', 'Manage service listings shown across the site', [
    '<button class="btn btn--primary" onclick="openAddModal()"><i class="fas fa-plus"></i> Add Service</button>',
    '<a href="../../pages/services.html" target="_blank" class="btn btn--outline"><i class="fas fa-external-link-alt"></i> View Page</a>',
]);
?>
<div class="page-body">

  <div class="info-banner info-banner--teal">
    <i class="fas fa-info-circle"></i>
    <div>
      <strong>Where this content appears:</strong> Services are listed on the <a href="../../pages/services.html" target="_blank" style="color:inherit;text-decoration:underline;">Services page</a>. <strong>Featured</strong> services also appear on the homepage services grid. Each service links to its detail page.
    </div>
  </div>

  <div class="card">
    <div class="card__header"><div class="card__title"><i class="fas fa-hard-hat"></i> Services (<?= count($items) ?>) &nbsp;<span style="font-size:.8rem;color:var(--text-muted);font-weight:400;">⭐ = featured on homepage grid</span></div></div>
    <?php if (empty($items)): ?>
    <div class="empty-state" style="padding:40px;"><h4>No services yet</h4></div>
    <?php else: ?>
    <div class="table-wrap">
      <table>
        <thead><tr><th>#</th><th>Service</th><th>Category</th><th>Tag</th><th>Featured</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          <?php foreach ($items as $item): ?>
          <tr>
            <td style="color:var(--text-muted)"><?= (int)($item['order'] ?? 0) ?></td>
            <td><strong><?= e($item['title'] ?? '') ?></strong><br><span class="td-muted"><i class="fas <?= e($item['icon'] ?? '') ?>"></i> <?= e($item['url'] ?? '') ?></span></td>
            <td><span class="badge badge--teal"><?= e($item['category'] ?? '') ?></span></td>
            <td><?= e($item['tag'] ?? '') ?></td>
            <td><?= !empty($item['featured']) ? '<i class="fas fa-star" style="color:var(--gold);" title="Featured on homepage"></i>' : '' ?></td>
            <td><?= !empty($item['published']) ? '<span class="badge badge--green">Live</span>' : '<span class="badge" style="background:var(--bg);color:var(--text-muted);">Draft</span>' ?></td>
            <td>
              <button class="btn btn--outline btn--sm" onclick='openEditModal(<?= htmlspecialchars(json_encode($item, JSON_HEX_APOS), ENT_QUOTES) ?>)'><i class="fas fa-edit"></i> Edit</button>
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

<div class="modal-overlay" id="item-modal">
  <div class="modal" style="max-width:700px;">
    <div class="modal__header">
      <span class="modal__title" id="modal-title">Add Service</span>
      <button class="modal__close" onclick="closeModal()"><i class="fas fa-times"></i></button>
    </div>
    <form method="POST">
      <?= csrf_field() ?>
      <input type="hidden" name="action" value="save">
      <input type="hidden" name="id" id="f-id">
      <div class="form-grid">
        <div class="form-group form-full"><label class="form-label">Service Title *</label><input type="text" name="title" id="f-title" class="form-control" required></div>
        <div class="form-group"><label class="form-label">Icon (FA class)</label><input type="text" name="icon" id="f-icon" class="form-control" placeholder="e.g. fa-hard-hat"></div>
        <div class="form-group">
          <label class="form-label">Category</label>
          <select name="category" id="f-category" class="form-control">
            <option value="consulting">Consulting</option>
            <option value="training">Training</option>
            <option value="digital">Digital</option>
            <option value="ai">AI Solutions</option>
            <option value="systems">Management Systems</option>
          </select>
        </div>
        <div class="form-group"><label class="form-label">Tag / Label</label><input type="text" name="tag" id="f-tag" class="form-control" placeholder="e.g. Strategy & Advisory"></div>
        <div class="form-group form-full"><label class="form-label">Page URL (relative path)</label><input type="text" name="url" id="f-url" class="form-control" placeholder="e.g. pages/consulting.html"></div>
        <div class="form-group form-full"><label class="form-label">Description *</label><textarea name="description" id="f-description" class="form-control" rows="3" required></textarea></div>
        <div class="form-group"><label class="form-label">Display Order</label><input type="number" name="order" id="f-order" class="form-control" value="99"></div>
        <div class="form-group" style="display:flex;gap:20px;align-items:center;padding-top:8px;">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:500;"><input type="checkbox" name="published" id="f-published" checked> Published</label>
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:500;"><input type="checkbox" name="featured" id="f-featured"> Featured on homepage</label>
        </div>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save Service</button>
      </div>
    </form>
  </div>
</div>

<?php admin_foot(); ?>
<script>
function openAddModal() {
  ['f-id','f-title','f-icon','f-tag','f-url','f-description'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('f-order').value = '99'; document.getElementById('f-published').checked = true; document.getElementById('f-featured').checked = false;
  document.getElementById('modal-title').textContent = 'Add Service';
  document.getElementById('item-modal').classList.add('open');
}
function openEditModal(item) {
  document.getElementById('f-id').value          = item.id          || '';
  document.getElementById('f-title').value       = item.title       || '';
  document.getElementById('f-icon').value        = item.icon        || '';
  document.getElementById('f-category').value    = item.category    || 'consulting';
  document.getElementById('f-tag').value         = item.tag         || '';
  document.getElementById('f-url').value         = item.url         || '';
  document.getElementById('f-description').value = item.description || '';
  document.getElementById('f-order').value       = item.order       || '99';
  document.getElementById('f-published').checked = !!item.published;
  document.getElementById('f-featured').checked  = !!item.featured;
  document.getElementById('modal-title').textContent = 'Edit Service';
  document.getElementById('item-modal').classList.add('open');
}
function closeModal() { document.getElementById('item-modal').classList.remove('open'); }
document.getElementById('item-modal').addEventListener('click', e => { if(e.target===e.currentTarget) closeModal(); });
</script>
