<?php
require_once dirname(__DIR__) . '/includes/auth.php';
require_once dirname(__DIR__) . '/includes/layout.php';
require_login();

$admissions = read_csv(ADMISSIONS_CSV);

// ── Handle delete ─────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST' && verify_csrf()) {
    if (isset($_POST['delete_idx'])) {
        delete_csv_row(ADMISSIONS_CSV, (int)$_POST['delete_idx']);
        set_flash('success', 'Admission record deleted.');
        header('Location: admissions.php'); exit;
    }
}

// ── Handle detail view ────────────────────────────────────────
$viewIdx  = isset($_GET['view']) ? (int)$_GET['view'] : null;
$viewItem = ($viewIdx !== null && isset($admissions[$viewIdx])) ? $admissions[$viewIdx] : null;

// ── Stats ─────────────────────────────────────────────────────
$total    = count($admissions);
$courses  = array_count_values(array_column($admissions, 'course'));
arsort($courses);
$topCourse = array_key_first($courses) ?? 'N/A';

admin_head('Admissions', 'content/admissions');
admin_topbar('Course Admissions', 'Applications received via the Course Admission form', [
    '<a href="../../pages/course-admission.html" target="_blank" class="btn btn--outline"><i class="fas fa-external-link-alt"></i> View Form</a>',
]);
?>
<div class="page-body">

  <!-- Stats -->
  <div class="stats-grid" style="margin-bottom:24px;">
    <div class="stat-card">
      <div class="stat-card__icon stat-card__icon--teal"><i class="fas fa-user-graduate"></i></div>
      <div><div class="stat-card__value"><?= $total ?></div><div class="stat-card__label">Total Applications</div></div>
    </div>
    <div class="stat-card">
      <div class="stat-card__icon stat-card__icon--gold"><i class="fas fa-graduation-cap"></i></div>
      <div><div class="stat-card__value"><?= count($courses) ?></div><div class="stat-card__label">Courses Applied For</div></div>
    </div>
    <div class="stat-card">
      <div class="stat-card__icon stat-card__icon--navy"><i class="fas fa-star"></i></div>
      <div><div class="stat-card__value" style="font-size:1rem;"><?= htmlspecialchars(mb_strimwidth($topCourse, 0, 22, '…')) ?></div><div class="stat-card__label">Most Popular Course</div></div>
    </div>
  </div>

  <div class="card">
    <div class="card__header">
      <div class="card__title"><i class="fas fa-user-graduate"></i> Applications (<?= $total ?>)</div>
    </div>
    <?php if (empty($admissions)): ?>
    <div class="empty-state" style="padding:48px;">
      <i class="fas fa-user-graduate" style="font-size:2.5rem;"></i>
      <h4>No applications yet</h4>
      <p>Admission form submissions will appear here.</p>
    </div>
    <?php else: ?>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Applicant</th><th>Course</th><th>Intake</th><th>Mode</th><th>Organisation</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>
          <?php foreach (array_reverse(array_keys($admissions)) as $i): $a = $admissions[$i]; ?>
          <tr>
            <td>
              <strong><?= e(($a['first_name'] ?? '') . ' ' . ($a['last_name'] ?? '')) ?></strong><br>
              <span class="td-muted"><?= e($a['email'] ?? '') ?></span>
            </td>
            <td><span class="badge badge--teal" style="white-space:normal;max-width:200px;"><?= e($a['course'] ?? '') ?></span></td>
            <td class="td-muted"><?= e($a['preferred_intake'] ?? '') ?></td>
            <td><?= e($a['delivery_mode'] ?? '') ?></td>
            <td><?= e($a['organisation'] ?? '') ?></td>
            <td class="td-muted"><?= e(isset($a['submitted_at']) ? date('d M Y', strtotime($a['submitted_at'])) : '—') ?></td>
            <td>
              <button class="btn btn--outline btn--sm" onclick="openDetailModal(<?= $i ?>)"><i class="fas fa-eye"></i> View</button>
              <form method="POST" style="display:inline;" onsubmit="return confirm('Delete this application?')">
                <?= csrf_field() ?>
                <input type="hidden" name="delete_idx" value="<?= $i ?>">
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

<!-- Detail Modals -->
<?php foreach ($admissions as $i => $a): ?>
<div class="modal-overlay" id="modal-<?= $i ?>">
  <div class="modal" style="max-width:680px;">
    <div class="modal__header">
      <span class="modal__title"><?= e(($a['first_name'] ?? '') . ' ' . ($a['last_name'] ?? '')) ?> — Application</span>
      <button class="modal__close" onclick="this.closest('.modal-overlay').classList.remove('open')"><i class="fas fa-times"></i></button>
    </div>
    <div>
      <?php
      $groups = [
        'Course' => ['course','preferred_intake','delivery_mode'],
        'Personal' => ['first_name','last_name','email','phone','dob','nationality','country'],
        'Professional' => ['job_title','organisation','industry','experience_years'],
        'Education' => ['education_level','study_field','existing_quals'],
        'Motivation & Funding' => ['motivation','funding','sponsor_name'],
        'Emergency Contact' => ['emergency_name','emergency_relationship','emergency_phone'],
        'Other' => ['special_requirements','referral_source','newsletter_opt','ip','submitted_at'],
      ];
      foreach ($groups as $gname => $fields): ?>
      <div style="margin-bottom:16px;">
        <div style="font-size:.72rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;"><?= $gname ?></div>
        <?php foreach ($fields as $field): if (!isset($a[$field]) || $a[$field] === '') continue; ?>
        <div class="detail-row">
          <span class="detail-row__label"><?= ucfirst(str_replace('_',' ',$field)) ?></span>
          <span class="detail-row__value"><?= e($a[$field]) ?></span>
        </div>
        <?php endforeach; ?>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</div>
<?php endforeach; ?>

<?php admin_foot(); ?>
<script>
function openDetailModal(idx) {
  document.getElementById('modal-' + idx)?.classList.add('open');
}
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
});
</script>
