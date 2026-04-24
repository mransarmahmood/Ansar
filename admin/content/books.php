<?php
require_once dirname(__DIR__) . '/includes/auth.php';
require_once dirname(__DIR__) . '/includes/layout.php';
require_login();

$items = read_json_content(BOOKS_JSON);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && verify_csrf()) {
    $action = $_POST['action'] ?? '';
    if ($action === 'save') {
        $id   = clean_input($_POST['id'] ?? '');
        $item = [
            'id'             => $id ?: gen_id('bk'),
            'title'          => clean_input($_POST['title']          ?? ''),
            'author'         => clean_input($_POST['author']         ?? ''),
            'year'           => clean_input($_POST['year']           ?? ''),
            'category'       => clean_input($_POST['category']       ?? ''),
            'description'    => clean_input($_POST['description']    ?? ''),
            'recommendation' => clean_input($_POST['recommendation'] ?? ''),
            'rating'         => (int)($_POST['rating'] ?? 5),
            'difficulty'     => clean_input($_POST['difficulty']     ?? 'Intermediate'),
            'color'          => clean_input($_POST['color']          ?? '#0B1D36'),
            'order'          => (int)($_POST['order'] ?? 99),
            'published'      => isset($_POST['published']),
        ];
        $idx = null;
        foreach ($items as $i => $existing) {
            if ($existing['id'] === $item['id']) { $idx = $i; break; }
        }
        if ($idx !== null) $items[$idx] = $item; else $items[] = $item;
        write_json_content(BOOKS_JSON, $items);
        set_flash('success', 'Book saved.'); header('Location: books.php'); exit;
    }
    if ($action === 'delete') {
        $id = clean_input($_POST['id'] ?? '');
        $items = array_filter($items, fn($i) => $i['id'] !== $id);
        write_json_content(BOOKS_JSON, array_values($items));
        set_flash('success', 'Book deleted.'); header('Location: books.php'); exit;
    }
}

admin_head('Books', 'content/books');
admin_topbar('Books', 'Manage recommended HSE reading list', [
    '<button class="btn btn--primary" onclick="openAddModal()"><i class="fas fa-plus"></i> Add Book</button>',
    '<a href="../../pages/books.html" target="_blank" class="btn btn--outline"><i class="fas fa-external-link-alt"></i> View Page</a>',
]);
?>
<div class="page-body">

  <div class="info-banner info-banner--gold">
    <i class="fas fa-info-circle"></i>
    <div>
      <strong>Where this content appears:</strong> Books are shown on the <a href="../../pages/books.html" target="_blank" style="color:inherit;text-decoration:underline;">Recommended Reading page</a> as a curated bookshelf with category filters, difficulty badges, and star ratings.
    </div>
  </div>

  <div class="card">
    <div class="card__header"><div class="card__title"><i class="fas fa-book"></i> Books (<?= count($items) ?>)</div></div>
    <?php if (empty($items)): ?>
    <div class="empty-state" style="padding:40px;"><i class="fas fa-book" style="font-size:2rem;"></i><h4>No books yet</h4></div>
    <?php else: ?>
    <div class="table-wrap">
      <table>
        <thead><tr><th>#</th><th>Title & Author</th><th>Category</th><th>Difficulty</th><th>Rating</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          <?php foreach ($items as $item): ?>
          <tr>
            <td style="color:var(--text-muted)"><?= (int)($item['order'] ?? 0) ?></td>
            <td><strong><?= e($item['title'] ?? '') ?></strong><br><span class="td-muted"><?= e($item['author'] ?? '') ?> · <?= e($item['year'] ?? '') ?></span></td>
            <td><span class="badge badge--teal"><?= e($item['category'] ?? '') ?></span></td>
            <td><?= e($item['difficulty'] ?? '') ?></td>
            <td><?= str_repeat('★', (int)($item['rating'] ?? 5)) ?></td>
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
  <div class="modal" style="max-width:720px;">
    <div class="modal__header">
      <span class="modal__title" id="modal-title">Add Book</span>
      <button class="modal__close" onclick="closeModal()"><i class="fas fa-times"></i></button>
    </div>
    <form method="POST">
      <?= csrf_field() ?>
      <input type="hidden" name="action" value="save">
      <input type="hidden" name="id" id="f-id">
      <div class="form-grid">
        <div class="form-group form-full"><label class="form-label">Title *</label><input type="text" name="title" id="f-title" class="form-control" required></div>
        <div class="form-group"><label class="form-label">Author</label><input type="text" name="author" id="f-author" class="form-control"></div>
        <div class="form-group"><label class="form-label">Year</label><input type="text" name="year" id="f-year" class="form-control" placeholder="e.g. 2024"></div>
        <div class="form-group">
          <label class="form-label">Category</label>
          <select name="category" id="f-category" class="form-control">
            <option value="foundations">Foundations</option>
            <option value="leadership">Leadership</option>
            <option value="investigation">Investigation</option>
            <option value="iso">ISO Standards</option>
            <option value="digital">Digital</option>
            <option value="exam">Exam Prep</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Difficulty</label>
          <select name="difficulty" id="f-difficulty" class="form-control">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate" selected>Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Rating (1–5)</label>
          <select name="rating" id="f-rating" class="form-control">
            <option value="5">★★★★★ (5)</option>
            <option value="4">★★★★☆ (4)</option>
            <option value="3">★★★☆☆ (3)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Spine Colour (hex)</label>
          <input type="color" name="color" id="f-color" class="form-control" value="#0B1D36" style="height:40px;padding:4px;">
        </div>
        <div class="form-group form-full"><label class="form-label">Description *</label><textarea name="description" id="f-description" class="form-control" rows="3" required></textarea></div>
        <div class="form-group form-full"><label class="form-label">Why Ansar Recommends It</label><textarea name="recommendation" id="f-recommendation" class="form-control" rows="2"></textarea></div>
        <div class="form-group"><label class="form-label">Order</label><input type="number" name="order" id="f-order" class="form-control" value="99" min="1"></div>
        <div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:500;padding-top:8px;"><input type="checkbox" name="published" id="f-published" checked> Published</label></div>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save Book</button>
      </div>
    </form>
  </div>
</div>

<?php admin_foot(); ?>
<script>
function openAddModal() {
  ['f-id','f-title','f-author','f-year','f-description','f-recommendation'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('f-order').value = '99'; document.getElementById('f-rating').value = '5';
  document.getElementById('f-color').value = '#0B1D36'; document.getElementById('f-published').checked = true;
  document.getElementById('modal-title').textContent = 'Add Book';
  document.getElementById('item-modal').classList.add('open');
}
function openEditModal(item) {
  document.getElementById('f-id').value             = item.id             || '';
  document.getElementById('f-title').value          = item.title          || '';
  document.getElementById('f-author').value         = item.author         || '';
  document.getElementById('f-year').value           = item.year           || '';
  document.getElementById('f-category').value       = item.category       || 'foundations';
  document.getElementById('f-difficulty').value     = item.difficulty     || 'Intermediate';
  document.getElementById('f-rating').value         = item.rating         || '5';
  document.getElementById('f-color').value          = item.color          || '#0B1D36';
  document.getElementById('f-description').value    = item.description    || '';
  document.getElementById('f-recommendation').value = item.recommendation || '';
  document.getElementById('f-order').value          = item.order          || '99';
  document.getElementById('f-published').checked    = !!item.published;
  document.getElementById('modal-title').textContent = 'Edit Book';
  document.getElementById('item-modal').classList.add('open');
}
function closeModal() { document.getElementById('item-modal').classList.remove('open'); }
document.getElementById('item-modal').addEventListener('click', e => { if(e.target===e.currentTarget) closeModal(); });
</script>
