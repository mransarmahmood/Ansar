<?php
require_once dirname(__DIR__) . '/includes/auth.php';
require_once dirname(__DIR__) . '/includes/layout.php';
require_login();

$items = read_json_content(TESTIMONIALS_JSON);

// ── Handle POST ───────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST' && verify_csrf()) {
    $action = $_POST['action'] ?? '';

    if ($action === 'save') {
        $id   = clean_input($_POST['id'] ?? '');
        $item = [
            'id'        => $id ?: gen_id('t'),
            'name'      => clean_input($_POST['name']    ?? ''),
            'role'      => clean_input($_POST['role']    ?? ''),
            'company'   => clean_input($_POST['company'] ?? ''),
            'initials'  => clean_input($_POST['initials'] ?? ''),
            'quote'     => clean_input($_POST['quote']   ?? ''),
            'rating'    => (int)($_POST['rating'] ?? 5),
            'tags'      => clean_input($_POST['tags']    ?? ''),
            'featured'  => isset($_POST['featured']),
            'order'     => (int)($_POST['order'] ?? 99),
            'published' => isset($_POST['published']),
        ];
        // Auto-generate initials if blank
        if (empty($item['initials']) && !empty($item['name'])) {
            $parts = explode(' ', $item['name']);
            $item['initials'] = strtoupper(substr($parts[0], 0, 1) . substr(end($parts), 0, 1));
        }
        $idx = null;
        foreach ($items as $i => $existing) {
            if ($existing['id'] === $item['id']) { $idx = $i; break; }
        }
        if ($idx !== null) $items[$idx] = $item;
        else $items[] = $item;
        write_json_content(TESTIMONIALS_JSON, $items);
        set_flash('success', 'Testimonial saved successfully.');
        header('Location: testimonials.php'); exit;
    }

    if ($action === 'delete') {
        $id = clean_input($_POST['id'] ?? '');
        $items = array_filter($items, fn($i) => $i['id'] !== $id);
        write_json_content(TESTIMONIALS_JSON, array_values($items));
        set_flash('success', 'Testimonial deleted.');
        header('Location: testimonials.php'); exit;
    }
}

admin_head('Testimonials', 'content/testimonials');
admin_topbar('Testimonials', 'Manage client testimonials shown on the website', [
    '<button class="btn btn--primary" onclick="openAddModal()"><i class="fas fa-plus"></i> Add Testimonial</button>',
    '<a href="../../pages/testimonials.html" target="_blank" class="btn btn--outline"><i class="fas fa-external-link-alt"></i> View Page</a>',
]);
?>
<div class="page-body">

  <div class="card">
    <div class="card__header">
      <div class="card__title"><i class="fas fa-quote-left"></i> Testimonials (<?= count($items) ?>)</div>
    </div>
    <?php if (empty($items)): ?>
    <div class="empty-state" style="padding:40px;">
      <i class="fas fa-quote-left" style="font-size:2rem;"></i>
      <h4>No testimonials yet</h4>
      <p>Click "Add Testimonial" to create the first one.</p>
    </div>
    <?php else: ?>
    <div class="table-wrap">
      <table>
        <thead><tr><th>#</th><th>Name & Role</th><th>Tags</th><th>Featured</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          <?php foreach ($items as $item): ?>
          <tr>
            <td style="color:var(--text-muted)"><?= (int)($item['order'] ?? 0) ?></td>
            <td>
              <strong><?= e($item['name'] ?? '') ?></strong><br>
              <span class="td-muted"><?= e($item['role'] ?? '') ?>, <?= e($item['company'] ?? '') ?></span>
            </td>
            <td><span class="badge badge--teal"><?= e($item['tags'] ?? '') ?></span></td>
            <td><?= !empty($item['featured']) ? '<i class="fas fa-star" style="color:var(--gold);" title="Featured"></i>' : '<i class="fas fa-star" style="color:var(--border);"></i>' ?></td>
            <td><?= !empty($item['published']) ? '<span class="badge badge--green">Live</span>' : '<span class="badge" style="background:var(--bg);color:var(--text-muted);">Draft</span>' ?></td>
            <td>
              <button class="btn btn--outline btn--sm" onclick='openEditModal(<?= htmlspecialchars(json_encode($item, JSON_HEX_APOS), ENT_QUOTES) ?>)'>
                <i class="fas fa-edit"></i> Edit
              </button>
              <form method="POST" style="display:inline;" onsubmit="return confirm('Delete this testimonial?')">
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

<!-- Add/Edit Modal -->
<div class="modal-overlay" id="item-modal">
  <div class="modal" style="max-width:640px;">
    <div class="modal__header">
      <span class="modal__title" id="modal-title">Add Testimonial</span>
      <button class="modal__close" onclick="closeModal()"><i class="fas fa-times"></i></button>
    </div>
    <form method="POST">
      <?= csrf_field() ?>
      <input type="hidden" name="action" value="save">
      <input type="hidden" name="id" id="f-id">
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Full Name *</label>
          <input type="text" name="name" id="f-name" class="form-control" required>
        </div>
        <div class="form-group">
          <label class="form-label">Initials (auto-generated if blank)</label>
          <input type="text" name="initials" id="f-initials" class="form-control" placeholder="e.g. MR" maxlength="3">
        </div>
        <div class="form-group">
          <label class="form-label">Role / Job Title</label>
          <input type="text" name="role" id="f-role" class="form-control" placeholder="e.g. HSE Director">
        </div>
        <div class="form-group">
          <label class="form-label">Company / Location</label>
          <input type="text" name="company" id="f-company" class="form-control" placeholder="e.g. Major Oil & Gas Operator — UAE">
        </div>
        <div class="form-group form-full">
          <label class="form-label">Quote / Testimonial *</label>
          <textarea name="quote" id="f-quote" class="form-control" rows="4" required placeholder="What they said about working with Ansar..."></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Tags</label>
          <input type="text" name="tags" id="f-tags" class="form-control" placeholder="e.g. ISO 45001 · Consulting">
        </div>
        <div class="form-group">
          <label class="form-label">Star Rating</label>
          <select name="rating" id="f-rating" class="form-control">
            <option value="5">★★★★★ (5)</option>
            <option value="4">★★★★☆ (4)</option>
            <option value="3">★★★☆☆ (3)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Display Order</label>
          <input type="number" name="order" id="f-order" class="form-control" min="1" max="99" value="99">
        </div>
        <div class="form-group" style="display:flex;gap:20px;align-items:center;padding-top:8px;">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:500;">
            <input type="checkbox" name="published" id="f-published" checked> Published (visible on site)
          </label>
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:500;">
            <input type="checkbox" name="featured" id="f-featured"> Featured on homepage
          </label>
        </div>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save Testimonial</button>
      </div>
    </form>
  </div>
</div>

<?php admin_foot(); ?>
<script>
function openAddModal() {
  ['f-id','f-name','f-initials','f-role','f-company','f-quote','f-tags'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('f-rating').value = '5';
  document.getElementById('f-order').value = '99';
  document.getElementById('f-published').checked = true;
  document.getElementById('f-featured').checked = false;
  document.getElementById('modal-title').textContent = 'Add Testimonial';
  document.getElementById('item-modal').classList.add('open');
}
function openEditModal(item) {
  document.getElementById('f-id').value       = item.id       || '';
  document.getElementById('f-name').value     = item.name     || '';
  document.getElementById('f-initials').value = item.initials || '';
  document.getElementById('f-role').value     = item.role     || '';
  document.getElementById('f-company').value  = item.company  || '';
  document.getElementById('f-quote').value    = item.quote    || '';
  document.getElementById('f-tags').value     = item.tags     || '';
  document.getElementById('f-rating').value   = item.rating   || '5';
  document.getElementById('f-order').value    = item.order    || '99';
  document.getElementById('f-published').checked = !!item.published;
  document.getElementById('f-featured').checked  = !!item.featured;
  document.getElementById('modal-title').textContent = 'Edit Testimonial';
  document.getElementById('item-modal').classList.add('open');
}
function closeModal() { document.getElementById('item-modal').classList.remove('open'); }
document.getElementById('item-modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
</script>
