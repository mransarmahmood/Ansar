<?php
require_once dirname(__DIR__) . '/includes/auth.php';
require_once dirname(__DIR__) . '/includes/layout.php';
require_login();

$items = read_json_content(RESOURCES_JSON);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && verify_csrf()) {
    $action = $_POST['action'] ?? '';
    if ($action === 'save') {
        $id   = clean_input($_POST['id'] ?? '');
        $item = [
            'id'           => $id ?: gen_id('res'),
            'title'        => clean_input($_POST['title']        ?? ''),
            'type'         => clean_input($_POST['type']         ?? ''),
            'category'     => clean_input($_POST['category']     ?? ''),
            'icon'         => clean_input($_POST['icon']         ?? 'fa-file'),
            'icon_bg'      => clean_input($_POST['icon_bg']      ?? 'var(--navy)'),
            'icon_color'   => clean_input($_POST['icon_color']   ?? 'var(--gold)'),
            'description'  => clean_input($_POST['description']  ?? ''),
            'file_info'    => clean_input($_POST['file_info']    ?? ''),
            'file_icon'    => clean_input($_POST['file_icon']    ?? 'fa-file-pdf'),
            'download_url' => clean_input($_POST['download_url'] ?? '#'),
            'order'        => (int)($_POST['order'] ?? 99),
            'published'    => isset($_POST['published']),
        ];
        $idx = null;
        foreach ($items as $i => $existing) {
            if ($existing['id'] === $item['id']) { $idx = $i; break; }
        }
        if ($idx !== null) $items[$idx] = $item; else $items[] = $item;
        write_json_content(RESOURCES_JSON, $items);
        set_flash('success', 'Resource saved.'); header('Location: resources.php'); exit;
    }
    if ($action === 'delete') {
        $id = clean_input($_POST['id'] ?? '');
        $items = array_filter($items, fn($i) => $i['id'] !== $id);
        write_json_content(RESOURCES_JSON, array_values($items));
        set_flash('success', 'Resource deleted.'); header('Location: resources.php'); exit;
    }
}

admin_head('Resources', 'content/resources');
admin_topbar('Resources', 'Manage free downloads and guides', [
    '<button class="btn btn--primary" onclick="openAddModal()"><i class="fas fa-plus"></i> Add Resource</button>',
    '<a href="../../pages/resources.html" target="_blank" class="btn btn--outline"><i class="fas fa-external-link-alt"></i> View Page</a>',
]);
?>
<div class="page-body">

  <div class="info-banner info-banner--teal">
    <i class="fas fa-info-circle"></i>
    <div>
      <strong>Where this content appears:</strong> Resources are displayed on the <a href="../../pages/resources.html" target="_blank" style="color:inherit;text-decoration:underline;">Resources page</a> as downloadable cards with category filter tabs. Each resource links to its download URL.
    </div>
  </div>

  <div class="card">
    <div class="card__header">
      <div class="card__title"><i class="fas fa-download"></i> Resources (<?= count($items) ?>)</div>
    </div>
    <?php if (empty($items)): ?>
    <div class="empty-state" style="padding:40px;"><i class="fas fa-download" style="font-size:2rem;"></i><h4>No resources yet</h4></div>
    <?php else: ?>
    <div class="table-wrap">
      <table>
        <thead><tr><th>#</th><th>Title</th><th>Type</th><th>Category</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          <?php foreach ($items as $item): ?>
          <tr>
            <td style="color:var(--text-muted)"><?= (int)($item['order'] ?? 0) ?></td>
            <td><strong><?= e($item['title'] ?? '') ?></strong><br><span class="td-muted"><?= e($item['file_info'] ?? '') ?></span></td>
            <td><span class="badge badge--teal"><?= e($item['type'] ?? '') ?></span></td>
            <td><?= e($item['category'] ?? '') ?></td>
            <td><?= !empty($item['published']) ? '<span class="badge badge--green">Live</span>' : '<span class="badge" style="background:var(--bg);color:var(--text-muted);">Draft</span>' ?></td>
            <td>
              <button class="btn btn--outline btn--sm" onclick='openEditModal(<?= htmlspecialchars(json_encode($item, JSON_HEX_APOS), ENT_QUOTES) ?>)'><i class="fas fa-edit"></i> Edit</button>
              <form method="POST" style="display:inline;" onsubmit="return confirm('Delete?')">
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

<div class="modal-overlay" id="item-modal">
  <div class="modal" style="max-width:700px;">
    <div class="modal__header">
      <span class="modal__title" id="modal-title">Add Resource</span>
      <button class="modal__close" onclick="closeModal()"><i class="fas fa-times"></i></button>
    </div>
    <form method="POST">
      <?= csrf_field() ?>
      <input type="hidden" name="action" value="save">
      <input type="hidden" name="id" id="f-id">
      <div class="form-grid">
        <div class="form-group form-full"><label class="form-label">Title *</label><input type="text" name="title" id="f-title" class="form-control" required></div>
        <div class="form-group"><label class="form-label">Resource Type</label><input type="text" name="type" id="f-type" class="form-control" placeholder="e.g. Audit Checklist, Study Guide"></div>
        <div class="form-group">
          <label class="form-label">Category (for filter)</label>
          <select name="category" id="f-category" class="form-control">
            <option value="iso">ISO Standards</option>
            <option value="training">Training & Exams</option>
            <option value="digital">Digital & AI</option>
            <option value="templates">Templates</option>
          </select>
        </div>
        <div class="form-group"><label class="form-label">Icon (FA class)</label><input type="text" name="icon" id="f-icon" class="form-control" placeholder="e.g. fa-clipboard-check"></div>
        <div class="form-group"><label class="form-label">File Info</label><input type="text" name="file_info" id="f-file-info" class="form-control" placeholder="e.g. PDF · 24 pages · Free"></div>
        <div class="form-group"><label class="form-label">Download URL</label><input type="text" name="download_url" id="f-download-url" class="form-control" placeholder="URL or relative path"></div>
        <div class="form-group form-full"><label class="form-label">Description *</label><textarea name="description" id="f-description" class="form-control" rows="3" required></textarea></div>
        <div class="form-group"><label class="form-label">Order</label><input type="number" name="order" id="f-order" class="form-control" value="99" min="1"></div>
        <div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:500;padding-top:8px;"><input type="checkbox" name="published" id="f-published" checked> Published</label></div>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save Resource</button>
      </div>
    </form>
  </div>
</div>

<?php admin_foot(); ?>
<script>
function openAddModal() {
  ['f-id','f-title','f-type','f-icon','f-file-info','f-download-url','f-description'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('f-order').value = '99';
  document.getElementById('f-published').checked = true;
  document.getElementById('modal-title').textContent = 'Add Resource';
  document.getElementById('item-modal').classList.add('open');
}
function openEditModal(item) {
  document.getElementById('f-id').value           = item.id           || '';
  document.getElementById('f-title').value        = item.title        || '';
  document.getElementById('f-type').value         = item.type         || '';
  document.getElementById('f-category').value     = item.category     || 'iso';
  document.getElementById('f-icon').value         = item.icon         || '';
  document.getElementById('f-file-info').value    = item.file_info    || '';
  document.getElementById('f-download-url').value = item.download_url || '#';
  document.getElementById('f-description').value  = item.description  || '';
  document.getElementById('f-order').value        = item.order        || '99';
  document.getElementById('f-published').checked  = !!item.published;
  document.getElementById('modal-title').textContent = 'Edit Resource';
  document.getElementById('item-modal').classList.add('open');
}
function closeModal() { document.getElementById('item-modal').classList.remove('open'); }
document.getElementById('item-modal').addEventListener('click', e => { if(e.target===e.currentTarget) closeModal(); });
</script>
