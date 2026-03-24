<?php
require_once dirname(__DIR__) . '/includes/auth.php';
require_once dirname(__DIR__) . '/includes/layout.php';
require_login();

$items = read_json_content(BLOG_JSON);

// ── Handle POST ───────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST' && verify_csrf()) {
    $action = $_POST['action'] ?? '';

    if ($action === 'save') {
        $id   = clean_input($_POST['id'] ?? '');
        $item = [
            'id'            => $id ?: gen_id('blog'),
            'title'         => clean_input($_POST['title']         ?? ''),
            'slug'          => clean_input($_POST['slug']          ?? ''),
            'category'      => clean_input($_POST['category']      ?? ''),
            'category_slug' => clean_input($_POST['category_slug'] ?? ''),
            'date'          => clean_input($_POST['date']          ?? ''),
            'read_time'     => clean_input($_POST['read_time']     ?? ''),
            'icon'          => clean_input($_POST['icon']          ?? 'fa-file-alt'),
            'icon_bg'       => clean_input($_POST['icon_bg']       ?? 'linear-gradient(135deg,var(--navy),var(--navy-mid))'),
            'excerpt'       => clean_input($_POST['excerpt']       ?? ''),
            'url'           => clean_input($_POST['url']           ?? 'book-consultation.html'),
            'featured'      => isset($_POST['featured']),
            'order'         => (int)($_POST['order'] ?? 99),
            'published'     => isset($_POST['published']),
        ];
        // Auto-generate slug from title if blank
        if (empty($item['slug'])) {
            $item['slug'] = strtolower(preg_replace('/[^a-z0-9]+/i', '-', $item['title']));
            $item['slug'] = trim($item['slug'], '-');
        }
        $idx = null;
        foreach ($items as $i => $existing) {
            if ($existing['id'] === $item['id']) { $idx = $i; break; }
        }
        if ($idx !== null) $items[$idx] = $item;
        else $items[] = $item;
        write_json_content(BLOG_JSON, $items);
        set_flash('success', 'Blog post saved successfully.');
        header('Location: blog.php'); exit;
    }

    if ($action === 'delete') {
        $id = clean_input($_POST['id'] ?? '');
        $items = array_filter($items, fn($i) => $i['id'] !== $id);
        write_json_content(BLOG_JSON, array_values($items));
        set_flash('success', 'Blog post deleted.');
        header('Location: blog.php'); exit;
    }
}

admin_head('Blog Posts', 'content/blog');
admin_topbar('Blog Posts', 'Manage HSE insights and articles', [
    '<button class="btn btn--primary" onclick="openAddModal()"><i class="fas fa-plus"></i> New Post</button>',
    '<a href="../../pages/blog.html" target="_blank" class="btn btn--outline"><i class="fas fa-external-link-alt"></i> View Blog</a>',
]);
?>
<div class="page-body">

  <div class="card">
    <div class="card__header">
      <div class="card__title"><i class="fas fa-pen-nib"></i> Blog Posts (<?= count($items) ?>)</div>
    </div>
    <?php if (empty($items)): ?>
    <div class="empty-state" style="padding:40px;">
      <i class="fas fa-pen-nib" style="font-size:2rem;"></i>
      <h4>No blog posts yet</h4>
      <p>Click "New Post" to create the first article.</p>
    </div>
    <?php else: ?>
    <div class="table-wrap">
      <table>
        <thead><tr><th>#</th><th>Title</th><th>Category</th><th>Date</th><th>Featured</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          <?php foreach ($items as $item): ?>
          <tr>
            <td style="color:var(--text-muted)"><?= (int)($item['order'] ?? 0) ?></td>
            <td>
              <strong><?= e($item['title'] ?? '') ?></strong><br>
              <span class="td-muted"><?= e($item['read_time'] ?? '') ?></span>
            </td>
            <td><span class="badge badge--teal"><?= e($item['category'] ?? '') ?></span></td>
            <td class="td-muted"><?= e($item['date'] ?? '') ?></td>
            <td><?= !empty($item['featured']) ? '<i class="fas fa-star" style="color:var(--gold);" title="Featured"></i>' : '<i class="fas fa-star" style="color:var(--border);"></i>' ?></td>
            <td><?= !empty($item['published']) ? '<span class="badge badge--green">Live</span>' : '<span class="badge" style="background:var(--bg);color:var(--text-muted);">Draft</span>' ?></td>
            <td>
              <button class="btn btn--outline btn--sm" onclick='openEditModal(<?= htmlspecialchars(json_encode($item, JSON_HEX_APOS), ENT_QUOTES) ?>)'>
                <i class="fas fa-edit"></i> Edit
              </button>
              <form method="POST" style="display:inline;" onsubmit="return confirm('Delete this post?')">
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
  <div class="modal" style="max-width:760px;">
    <div class="modal__header">
      <span class="modal__title" id="modal-title">New Blog Post</span>
      <button class="modal__close" onclick="closeModal()"><i class="fas fa-times"></i></button>
    </div>
    <form method="POST">
      <?= csrf_field() ?>
      <input type="hidden" name="action" value="save">
      <input type="hidden" name="id" id="f-id">
      <div class="form-grid">
        <div class="form-group form-full">
          <label class="form-label">Title *</label>
          <input type="text" name="title" id="f-title" class="form-control" required placeholder="Article title">
        </div>
        <div class="form-group">
          <label class="form-label">Category (display)</label>
          <input type="text" name="category" id="f-category" class="form-control" placeholder="e.g. ISO Standards">
        </div>
        <div class="form-group">
          <label class="form-label">Category Slug (for filter)</label>
          <input type="text" name="category_slug" id="f-category-slug" class="form-control" placeholder="e.g. iso, ai, training, culture">
          <span class="form-hint">Used for filter tabs. Values: iso, ai, training, culture</span>
        </div>
        <div class="form-group">
          <label class="form-label">Date</label>
          <input type="text" name="date" id="f-date" class="form-control" placeholder="e.g. March 2026">
        </div>
        <div class="form-group">
          <label class="form-label">Read Time</label>
          <input type="text" name="read_time" id="f-read-time" class="form-control" placeholder="e.g. 10 min read">
        </div>
        <div class="form-group">
          <label class="form-label">Icon (Font Awesome class)</label>
          <input type="text" name="icon" id="f-icon" class="form-control" placeholder="e.g. fa-certificate">
          <span class="form-hint">fa-certificate, fa-robot, fa-graduation-cap, fa-chart-bar, fa-users, fa-leaf</span>
        </div>
        <div class="form-group">
          <label class="form-label">Article URL / Link</label>
          <input type="text" name="url" id="f-url" class="form-control" placeholder="e.g. book-consultation.html or external URL">
        </div>
        <div class="form-group form-full">
          <label class="form-label">Excerpt *</label>
          <textarea name="excerpt" id="f-excerpt" class="form-control" rows="3" required placeholder="Short description of the article..."></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Display Order</label>
          <input type="number" name="order" id="f-order" class="form-control" min="1" max="99" value="99">
        </div>
        <div class="form-group" style="display:flex;gap:20px;align-items:center;padding-top:8px;">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:500;">
            <input type="checkbox" name="published" id="f-published" checked> Published
          </label>
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:500;">
            <input type="checkbox" name="featured" id="f-featured"> Featured
          </label>
        </div>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save Post</button>
      </div>
    </form>
  </div>
</div>

<?php admin_foot(); ?>
<script>
const defaultIconBg = 'linear-gradient(135deg,var(--navy),var(--navy-mid))';
function openAddModal() {
  ['f-id','f-title','f-category','f-category-slug','f-date','f-read-time','f-icon','f-url','f-excerpt'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('f-order').value = '99';
  document.getElementById('f-published').checked = true;
  document.getElementById('f-featured').checked = false;
  document.getElementById('modal-title').textContent = 'New Blog Post';
  document.getElementById('item-modal').classList.add('open');
}
function openEditModal(item) {
  document.getElementById('f-id').value              = item.id            || '';
  document.getElementById('f-title').value           = item.title         || '';
  document.getElementById('f-category').value        = item.category      || '';
  document.getElementById('f-category-slug').value   = item.category_slug || '';
  document.getElementById('f-date').value            = item.date          || '';
  document.getElementById('f-read-time').value       = item.read_time     || '';
  document.getElementById('f-icon').value            = item.icon          || '';
  document.getElementById('f-url').value             = item.url           || '';
  document.getElementById('f-excerpt').value         = item.excerpt       || '';
  document.getElementById('f-order').value           = item.order         || '99';
  document.getElementById('f-published').checked     = !!item.published;
  document.getElementById('f-featured').checked      = !!item.featured;
  document.getElementById('modal-title').textContent = 'Edit Blog Post';
  document.getElementById('item-modal').classList.add('open');
}
function closeModal() { document.getElementById('item-modal').classList.remove('open'); }
document.getElementById('item-modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
</script>
