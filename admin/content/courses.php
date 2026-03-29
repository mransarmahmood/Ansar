<?php
require_once dirname(__DIR__) . '/includes/auth.php';
require_once dirname(__DIR__) . '/includes/layout.php';
require_login();

$items = read_json_content(COURSES_JSON);

// ── Handle POST ───────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST' && verify_csrf()) {
    $action = $_POST['action'] ?? '';

    if ($action === 'save') {
        $id         = clean_input($_POST['id'] ?? '');
        $start_date = clean_input($_POST['start_date'] ?? '');
        $ts         = $start_date ? strtotime($start_date) : false;
        $item = [
            'id'             => $id ?: gen_id('crs'),
            'title'          => clean_input($_POST['title']        ?? ''),
            'type'           => clean_input($_POST['type']         ?? ''),
            'type_slug'      => strtolower(preg_replace('/[^a-z0-9]/i', '-', clean_input($_POST['type'] ?? ''))),
            'start_date'     => $start_date,
            'start_display'  => $ts ? date('d M Y', $ts) : $start_date,
            'day'            => $ts ? date('d', $ts) : '',
            'month'          => $ts ? date('M', $ts) : '',
            'year'           => $ts ? date('Y', $ts) : '',
            'duration'       => clean_input($_POST['duration']     ?? ''),
            'mode'           => clean_input($_POST['mode']         ?? ''),
            'mode_slug'      => strtolower(clean_input($_POST['mode_slug'] ?? 'online')),
            'location'       => clean_input($_POST['location']     ?? ''),
            'price'          => clean_input($_POST['price']        ?? ''),
            'seats_total'    => (int)($_POST['seats_total']    ?? 12),
            'seats_available'=> (int)($_POST['seats_available'] ?? 12),
            'description'    => clean_input($_POST['description']  ?? ''),
            'badge_color'    => clean_input($_POST['badge_color']  ?? '#1E6FD9'),
            'order'          => (int)($_POST['order'] ?? 99),
            'published'      => isset($_POST['published']),
        ];
        $idx = null;
        foreach ($items as $i => $existing) {
            if ($existing['id'] === $item['id']) { $idx = $i; break; }
        }
        if ($idx !== null) $items[$idx] = $item;
        else $items[] = $item;
        write_json_content(COURSES_JSON, $items);
        set_flash('success', 'Course saved successfully.');
        header('Location: courses.php'); exit;
    }

    if ($action === 'delete') {
        $id = clean_input($_POST['id'] ?? '');
        $items = array_filter($items, fn($i) => $i['id'] !== $id);
        write_json_content(COURSES_JSON, array_values($items));
        set_flash('success', 'Course deleted.');
        header('Location: courses.php'); exit;
    }
}

admin_head('Courses', 'content/courses');
admin_topbar('Courses', 'Manage the course calendar', [
    '<button class="btn btn--primary" onclick="openAddModal()"><i class="fas fa-plus"></i> Add Course</button>',
    '<a href="../../pages/course-calendar.html" target="_blank" class="btn btn--outline"><i class="fas fa-external-link-alt"></i> View Calendar</a>',
]);
?>
<div class="page-body">

  <div class="info-banner info-banner--gold">
    <i class="fas fa-info-circle"></i>
    <div>
      <strong>Where this content appears:</strong> Courses are shown on the <a href="../../pages/course-calendar.html" target="_blank" style="color:inherit;text-decoration:underline;">Course Calendar page</a> as upcoming training cards with dates, pricing, and seat availability. Published courses with future dates are visible to visitors.
    </div>
  </div>

  <div class="card">
    <div class="card__header">
      <div class="card__title"><i class="fas fa-graduation-cap"></i> Courses (<?= count($items) ?>)</div>
    </div>
    <?php if (empty($items)): ?>
    <div class="empty-state" style="padding:40px;">
      <i class="fas fa-graduation-cap" style="font-size:2rem;"></i>
      <h4>No courses yet</h4>
      <p>Click "Add Course" to create the first one.</p>
    </div>
    <?php else: ?>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Date</th><th>Course Title</th><th>Type</th><th>Mode</th><th>Price</th><th>Seats</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          <?php foreach ($items as $item): ?>
          <tr>
            <td class="td-muted"><?= e($item['start_display'] ?? $item['start_date'] ?? '') ?></td>
            <td><strong><?= e($item['title'] ?? '') ?></strong></td>
            <td><span class="badge badge--teal"><?= e($item['type'] ?? '') ?></span></td>
            <td><?= e($item['mode'] ?? '') ?></td>
            <td><?= e($item['price'] ?? '') ?></td>
            <td><?= (int)($item['seats_available'] ?? 0) ?> / <?= (int)($item['seats_total'] ?? 0) ?></td>
            <td><?= !empty($item['published']) ? '<span class="badge badge--green">Live</span>' : '<span class="badge" style="background:var(--bg);color:var(--text-muted);">Draft</span>' ?></td>
            <td>
              <button class="btn btn--outline btn--sm" onclick='openEditModal(<?= htmlspecialchars(json_encode($item, JSON_HEX_APOS), ENT_QUOTES) ?>)'>
                <i class="fas fa-edit"></i> Edit
              </button>
              <form method="POST" style="display:inline;" onsubmit="return confirm('Delete this course?')">
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
      <span class="modal__title" id="modal-title">Add Course</span>
      <button class="modal__close" onclick="closeModal()"><i class="fas fa-times"></i></button>
    </div>
    <form method="POST">
      <?= csrf_field() ?>
      <input type="hidden" name="action" value="save">
      <input type="hidden" name="id" id="f-id">
      <div class="form-grid">
        <div class="form-group form-full">
          <label class="form-label">Course Title *</label>
          <input type="text" name="title" id="f-title" class="form-control" required>
        </div>
        <div class="form-group">
          <label class="form-label">Type</label>
          <input type="text" name="type" id="f-type" class="form-control" placeholder="e.g. NEBOSH, IOSH, ISO Standards, AI & Digital" list="type-list">
          <datalist id="type-list">
            <option value="NEBOSH"><option value="IOSH"><option value="ISO Standards"><option value="AI & Digital">
          </datalist>
        </div>
        <div class="form-group">
          <label class="form-label">Start Date</label>
          <input type="date" name="start_date" id="f-start-date" class="form-control">
        </div>
        <div class="form-group">
          <label class="form-label">Duration</label>
          <input type="text" name="duration" id="f-duration" class="form-control" placeholder="e.g. 10 days (2 weeks)">
        </div>
        <div class="form-group">
          <label class="form-label">Delivery Mode</label>
          <select name="mode" id="f-mode" class="form-control" onchange="document.getElementById('f-mode-slug').value=this.value.toLowerCase().replace(/[^a-z]/g,'-')">
            <option value="Online Live">Online Live</option>
            <option value="In-Person">In-Person</option>
            <option value="Blended">Blended</option>
            <option value="Corporate On-Site">Corporate On-Site</option>
          </select>
        </div>
        <div class="form-group">
          <input type="hidden" name="mode_slug" id="f-mode-slug" value="online">
          <label class="form-label">Location</label>
          <input type="text" name="location" id="f-location" class="form-control" placeholder="e.g. Online (Zoom) or London, UK">
        </div>
        <div class="form-group">
          <label class="form-label">Price</label>
          <input type="text" name="price" id="f-price" class="form-control" placeholder="e.g. $1,450">
        </div>
        <div class="form-group">
          <label class="form-label">Badge Colour (hex)</label>
          <input type="color" name="badge_color" id="f-badge-color" class="form-control" value="#1E6FD9" style="height:40px;padding:4px;">
        </div>
        <div class="form-group">
          <label class="form-label">Total Seats</label>
          <input type="number" name="seats_total" id="f-seats-total" class="form-control" min="1" value="12">
        </div>
        <div class="form-group">
          <label class="form-label">Seats Available</label>
          <input type="number" name="seats_available" id="f-seats-avail" class="form-control" min="0" value="12">
        </div>
        <div class="form-group form-full">
          <label class="form-label">Course Description *</label>
          <textarea name="description" id="f-description" class="form-control" rows="3" required></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Display Order</label>
          <input type="number" name="order" id="f-order" class="form-control" min="1" max="99" value="99">
        </div>
        <div class="form-group">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:500;padding-top:8px;">
            <input type="checkbox" name="published" id="f-published" checked> Published
          </label>
        </div>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save Course</button>
      </div>
    </form>
  </div>
</div>

<?php admin_foot(); ?>
<script>
function openAddModal() {
  ['f-id','f-title','f-type','f-start-date','f-duration','f-location','f-price','f-description'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('f-seats-total').value = '12';
  document.getElementById('f-seats-avail').value = '12';
  document.getElementById('f-order').value = '99';
  document.getElementById('f-badge-color').value = '#1E6FD9';
  document.getElementById('f-mode').value = 'Online Live';
  document.getElementById('f-published').checked = true;
  document.getElementById('modal-title').textContent = 'Add Course';
  document.getElementById('item-modal').classList.add('open');
}
function openEditModal(item) {
  document.getElementById('f-id').value          = item.id           || '';
  document.getElementById('f-title').value       = item.title        || '';
  document.getElementById('f-type').value        = item.type         || '';
  document.getElementById('f-start-date').value  = item.start_date   || '';
  document.getElementById('f-duration').value    = item.duration     || '';
  document.getElementById('f-mode').value        = item.mode         || 'Online Live';
  document.getElementById('f-mode-slug').value   = item.mode_slug    || 'online';
  document.getElementById('f-location').value    = item.location     || '';
  document.getElementById('f-price').value       = item.price        || '';
  document.getElementById('f-badge-color').value = item.badge_color  || '#1E6FD9';
  document.getElementById('f-seats-total').value = item.seats_total  || '12';
  document.getElementById('f-seats-avail').value = item.seats_available || '12';
  document.getElementById('f-description').value = item.description  || '';
  document.getElementById('f-order').value       = item.order        || '99';
  document.getElementById('f-published').checked = !!item.published;
  document.getElementById('modal-title').textContent = 'Edit Course';
  document.getElementById('item-modal').classList.add('open');
}
function closeModal() { document.getElementById('item-modal').classList.remove('open'); }
document.getElementById('item-modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
</script>
