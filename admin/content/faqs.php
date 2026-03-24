<?php
require_once dirname(__DIR__) . '/includes/auth.php';
require_once dirname(__DIR__) . '/includes/layout.php';
require_login();

$items = read_json_content(FAQS_JSON);

// ── Handle POST ───────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST' && verify_csrf()) {
    $action = $_POST['action'] ?? '';

    if ($action === 'save') {
        $id   = clean_input($_POST['id'] ?? '');
        $item = [
            'id'        => $id ?: gen_id('faq'),
            'question'  => clean_input($_POST['question']  ?? ''),
            'answer'    => clean_input($_POST['answer']    ?? ''),
            'category'  => clean_input($_POST['category']  ?? 'General'),
            'order'     => (int)($_POST['order'] ?? 99),
            'published' => isset($_POST['published']),
        ];
        $idx = null;
        foreach ($items as $i => $existing) {
            if ($existing['id'] === $item['id']) { $idx = $i; break; }
        }
        if ($idx !== null) $items[$idx] = $item;
        else $items[] = $item;
        write_json_content(FAQS_JSON, $items);
        set_flash('success', 'FAQ saved successfully.');
        header('Location: faqs.php'); exit;
    }

    if ($action === 'delete') {
        $id = clean_input($_POST['id'] ?? '');
        $items = array_filter($items, fn($i) => $i['id'] !== $id);
        write_json_content(FAQS_JSON, array_values($items));
        set_flash('success', 'FAQ deleted.');
        header('Location: faqs.php'); exit;
    }
}

// Group by category for display
$categories = array_unique(array_column($items, 'category'));

admin_head('FAQs', 'content/faqs');
admin_topbar('FAQs', 'Manage frequently asked questions', [
    '<button class="btn btn--primary" onclick="openAddModal()"><i class="fas fa-plus"></i> Add FAQ</button>',
    '<a href="../../pages/faqs.html" target="_blank" class="btn btn--outline"><i class="fas fa-external-link-alt"></i> View Page</a>',
]);
?>
<div class="page-body">

  <div class="card">
    <div class="card__header">
      <div class="card__title"><i class="fas fa-question-circle"></i> FAQs (<?= count($items) ?>)</div>
    </div>
    <?php if (empty($items)): ?>
    <div class="empty-state" style="padding:40px;">
      <i class="fas fa-question-circle" style="font-size:2rem;"></i>
      <h4>No FAQs yet</h4>
      <p>Click "Add FAQ" to create the first one.</p>
    </div>
    <?php else: ?>
    <div class="table-wrap">
      <table>
        <thead><tr><th>#</th><th>Question</th><th>Category</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          <?php foreach ($items as $item): ?>
          <tr>
            <td style="color:var(--text-muted)"><?= (int)($item['order'] ?? 0) ?></td>
            <td><strong><?= e($item['question'] ?? '') ?></strong></td>
            <td><span class="badge badge--teal"><?= e($item['category'] ?? 'General') ?></span></td>
            <td><?= !empty($item['published']) ? '<span class="badge badge--green">Live</span>' : '<span class="badge" style="background:var(--bg);color:var(--text-muted);">Draft</span>' ?></td>
            <td>
              <button class="btn btn--outline btn--sm" onclick='openEditModal(<?= htmlspecialchars(json_encode($item, JSON_HEX_APOS), ENT_QUOTES) ?>)'>
                <i class="fas fa-edit"></i> Edit
              </button>
              <form method="POST" style="display:inline;" onsubmit="return confirm('Delete this FAQ?')">
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
      <span class="modal__title" id="modal-title">Add FAQ</span>
      <button class="modal__close" onclick="closeModal()"><i class="fas fa-times"></i></button>
    </div>
    <form method="POST">
      <?= csrf_field() ?>
      <input type="hidden" name="action" value="save">
      <input type="hidden" name="id" id="f-id">
      <div class="form-grid">
        <div class="form-group form-full">
          <label class="form-label">Question *</label>
          <input type="text" name="question" id="f-question" class="form-control" required placeholder="What is the question?">
        </div>
        <div class="form-group form-full">
          <label class="form-label">Answer *</label>
          <textarea name="answer" id="f-answer" class="form-control" rows="5" required placeholder="The full answer..."></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Category</label>
          <input type="text" name="category" id="f-category" class="form-control" placeholder="e.g. General, ISO Certification, Training" list="cat-list">
          <datalist id="cat-list">
            <?php foreach ($categories as $cat): ?>
            <option value="<?= e($cat) ?>">
            <?php endforeach; ?>
            <option value="General">
            <option value="ISO Certification">
            <option value="Training & Certification">
            <option value="Digital & AI Solutions">
          </datalist>
        </div>
        <div class="form-group">
          <label class="form-label">Display Order</label>
          <input type="number" name="order" id="f-order" class="form-control" min="1" max="99" value="99">
        </div>
        <div class="form-group">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:500;padding-top:8px;">
            <input type="checkbox" name="published" id="f-published" checked> Published (visible on site)
          </label>
        </div>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save FAQ</button>
      </div>
    </form>
  </div>
</div>

<?php admin_foot(); ?>
<script>
function openAddModal() {
  ['f-id','f-question','f-answer','f-category'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('f-order').value = '99';
  document.getElementById('f-published').checked = true;
  document.getElementById('modal-title').textContent = 'Add FAQ';
  document.getElementById('item-modal').classList.add('open');
}
function openEditModal(item) {
  document.getElementById('f-id').value       = item.id       || '';
  document.getElementById('f-question').value = item.question || '';
  document.getElementById('f-answer').value   = item.answer   || '';
  document.getElementById('f-category').value = item.category || 'General';
  document.getElementById('f-order').value    = item.order    || '99';
  document.getElementById('f-published').checked = !!item.published;
  document.getElementById('modal-title').textContent = 'Edit FAQ';
  document.getElementById('item-modal').classList.add('open');
}
function closeModal() { document.getElementById('item-modal').classList.remove('open'); }
document.getElementById('item-modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
</script>
