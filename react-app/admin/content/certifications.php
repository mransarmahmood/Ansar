<?php
require_once dirname(__DIR__) . '/includes/auth.php';
require_once dirname(__DIR__) . '/includes/layout.php';
require_login();

$items = read_json_content(CERTIFICATIONS_JSON);

// ── Handle POST ───────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST' && verify_csrf()) {
    $action = $_POST['action'] ?? '';

    if ($action === 'save') {
        $id = clean_input($_POST['id'] ?? '');
        $programs_raw = clean_input($_POST['programs'] ?? '');
        $programs = array_filter(array_map('trim', explode("\n", $programs_raw)));
        $tags_raw = clean_input($_POST['tags'] ?? '');
        $tags = array_filter(array_map('trim', explode(",", $tags_raw)));
        $item = [
            'id'            => $id ?: gen_id('cert'),
            'acronym'       => clean_input($_POST['acronym']       ?? ''),
            'name'          => clean_input($_POST['name']          ?? ''),
            'gradient_from' => clean_input($_POST['gradient_from'] ?? '#0B1D36'),
            'gradient_to'   => clean_input($_POST['gradient_to']   ?? '#122B52'),
            'icon'          => clean_input($_POST['icon']          ?? 'fa-certificate'),
            'badge_text'    => clean_input($_POST['badge_text']    ?? 'Live Coaching'),
            'programs'      => array_values($programs),
            'pass_rate'     => clean_input($_POST['pass_rate']     ?? '97%+'),
            'tags'          => array_values($tags),
            'cta_text'      => clean_input($_POST['cta_text']      ?? ''),
            'order'         => (int)($_POST['order'] ?? 99),
            'published'     => isset($_POST['published']),
        ];
        $idx = null;
        foreach ($items as $i => $existing) {
            if ($existing['id'] === $item['id']) { $idx = $i; break; }
        }
        if ($idx !== null) $items[$idx] = $item;
        else $items[] = $item;
        write_json_content(CERTIFICATIONS_JSON, $items);
        set_flash('success', 'Certification saved successfully.');
        header('Location: certifications.php'); exit;
    }

    if ($action === 'delete') {
        $id = clean_input($_POST['id'] ?? '');
        $items = array_filter($items, fn($i) => $i['id'] !== $id);
        write_json_content(CERTIFICATIONS_JSON, array_values($items));
        set_flash('success', 'Certification deleted.');
        header('Location: certifications.php'); exit;
    }
}

admin_head('Certifications', 'content/certifications');
admin_topbar('Certifications', 'Manage certification coaching cards', [
    '<button class="btn btn--primary" onclick="openAddModal()"><i class="fas fa-plus"></i> Add Certification</button>',
    '<a href="../../pages/certification-coaching.html" target="_blank" class="btn btn--outline"><i class="fas fa-external-link-alt"></i> View Page</a>',
]);
?>
<div class="page-body">

  <div class="info-banner info-banner--gold">
    <i class="fas fa-info-circle"></i>
    <div>
      <strong>Where this content appears:</strong> Certifications are displayed on the <a href="../../pages/certification-coaching.html" target="_blank" style="color:inherit;text-decoration:underline;">Certification Coaching page</a> as premium cards with gradient headers, program lists, pass rates, and CTA buttons.
    </div>
  </div>

  <div class="card">
    <div class="card__header">
      <div class="card__title"><i class="fas fa-award"></i> Certifications (<?= count($items) ?>)</div>
    </div>
    <?php if (empty($items)): ?>
    <div class="empty-state" style="padding:40px;">
      <i class="fas fa-award" style="font-size:2rem;"></i>
      <h4>No certifications yet</h4>
      <p>Click "Add Certification" to create the first one.</p>
    </div>
    <?php else: ?>
    <div class="table-wrap">
      <table>
        <thead><tr><th>#</th><th>Acronym</th><th>Name</th><th>Pass Rate</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          <?php foreach ($items as $item): ?>
          <tr>
            <td style="color:var(--text-muted)"><?= (int)($item['order'] ?? 0) ?></td>
            <td><strong style="color:<?= e($item['gradient_from'] ?? '#0B1D36') ?>"><?= e($item['acronym'] ?? '') ?></strong></td>
            <td><?= e($item['name'] ?? '') ?></td>
            <td><span class="badge badge--green"><?= e($item['pass_rate'] ?? '') ?></span></td>
            <td><?= !empty($item['published']) ? '<span class="badge badge--green">Live</span>' : '<span class="badge" style="background:var(--bg);color:var(--text-muted);">Draft</span>' ?></td>
            <td>
              <button class="btn btn--outline btn--sm" onclick='openEditModal(<?= htmlspecialchars(json_encode($item, JSON_HEX_APOS), ENT_QUOTES) ?>)'>
                <i class="fas fa-edit"></i> Edit
              </button>
              <form method="POST" style="display:inline;" onsubmit="return confirm('Delete this certification?')">
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
      <span class="modal__title" id="modal-title">Add Certification</span>
      <button class="modal__close" onclick="closeModal()"><i class="fas fa-times"></i></button>
    </div>
    <form method="POST">
      <?= csrf_field() ?>
      <input type="hidden" name="action" value="save">
      <input type="hidden" name="id" id="f-id">
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Acronym *</label>
          <input type="text" name="acronym" id="f-acronym" class="form-control" required placeholder="e.g. IOSH">
        </div>
        <div class="form-group">
          <label class="form-label">Full Name *</label>
          <input type="text" name="name" id="f-name" class="form-control" required placeholder="e.g. Institution of Occupational Safety & Health">
        </div>
        <div class="form-group">
          <label class="form-label">Gradient From (hex)</label>
          <input type="color" name="gradient_from" id="f-gradient_from" class="form-control" value="#0B1D36" style="height:40px;">
        </div>
        <div class="form-group">
          <label class="form-label">Gradient To (hex)</label>
          <input type="color" name="gradient_to" id="f-gradient_to" class="form-control" value="#122B52" style="height:40px;">
        </div>
        <div class="form-group">
          <label class="form-label">Icon (FA class)</label>
          <input type="text" name="icon" id="f-icon" class="form-control" placeholder="e.g. fa-user-shield">
        </div>
        <div class="form-group">
          <label class="form-label">Badge Text</label>
          <input type="text" name="badge_text" id="f-badge_text" class="form-control" placeholder="e.g. Live Coaching">
        </div>
        <div class="form-group form-full">
          <label class="form-label">Programs (one per line)</label>
          <textarea name="programs" id="f-programs" class="form-control" rows="4" placeholder="IOSH Managing Safely&#10;IOSH Leading Safely&#10;IOSH Working Safely"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Pass Rate</label>
          <input type="text" name="pass_rate" id="f-pass_rate" class="form-control" placeholder="e.g. 97%+">
        </div>
        <div class="form-group">
          <label class="form-label">Tags (comma-separated)</label>
          <input type="text" name="tags" id="f-tags" class="form-control" placeholder="e.g. Online, Weekend">
        </div>
        <div class="form-group form-full">
          <label class="form-label">CTA Button Text</label>
          <input type="text" name="cta_text" id="f-cta_text" class="form-control" placeholder="e.g. Start IOSH Coaching">
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
        <button type="submit" class="btn btn--primary"><i class="fas fa-save"></i> Save Certification</button>
      </div>
    </form>
  </div>
</div>

<?php admin_foot(); ?>
<script>
function openAddModal() {
  ['f-id','f-acronym','f-name','f-icon','f-badge_text','f-programs','f-pass_rate','f-tags','f-cta_text'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('f-gradient_from').value = '#0B1D36';
  document.getElementById('f-gradient_to').value = '#122B52';
  document.getElementById('f-order').value = '99';
  document.getElementById('f-published').checked = true;
  document.getElementById('modal-title').textContent = 'Add Certification';
  document.getElementById('item-modal').classList.add('open');
}
function openEditModal(item) {
  document.getElementById('f-id').value            = item.id            || '';
  document.getElementById('f-acronym').value       = item.acronym       || '';
  document.getElementById('f-name').value          = item.name          || '';
  document.getElementById('f-gradient_from').value = item.gradient_from || '#0B1D36';
  document.getElementById('f-gradient_to').value   = item.gradient_to   || '#122B52';
  document.getElementById('f-icon').value          = item.icon          || '';
  document.getElementById('f-badge_text').value    = item.badge_text    || '';
  document.getElementById('f-programs').value      = (item.programs || []).join('\n');
  document.getElementById('f-pass_rate').value     = item.pass_rate     || '';
  document.getElementById('f-tags').value          = (item.tags || []).join(', ');
  document.getElementById('f-cta_text').value      = item.cta_text      || '';
  document.getElementById('f-order').value         = item.order         || '99';
  document.getElementById('f-published').checked   = !!item.published;
  document.getElementById('modal-title').textContent = 'Edit Certification';
  document.getElementById('item-modal').classList.add('open');
}
function closeModal() { document.getElementById('item-modal').classList.remove('open'); }
document.getElementById('item-modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
</script>
