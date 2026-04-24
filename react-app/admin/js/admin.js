/* ================================================================
   ANSAR MAHMOOD CMS — Admin Panel JS
   ================================================================ */
'use strict';

// ── Flash auto-dismiss ────────────────────────────────────────
document.querySelectorAll('.alert').forEach(el => {
  setTimeout(() => el.style.opacity = '0', 4000);
  setTimeout(() => el.remove(), 4400);
});

// ── Confirm delete ────────────────────────────────────────────
document.querySelectorAll('[data-confirm]').forEach(btn => {
  btn.addEventListener('click', e => {
    if (!confirm(btn.dataset.confirm || 'Are you sure?')) e.preventDefault();
  });
});

// ── Modal: open ───────────────────────────────────────────────
document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.modal;
    document.getElementById(id)?.classList.add('open');
  });
});

// ── Modal: close ──────────────────────────────────────────────
document.querySelectorAll('.modal__close, .modal-overlay').forEach(el => {
  el.addEventListener('click', e => {
    if (e.target === el) el.closest('.modal-overlay')?.classList.remove('open');
    if (el.classList.contains('modal__close')) el.closest('.modal-overlay')?.classList.remove('open');
  });
});

// ── Lead detail modal populate ────────────────────────────────
document.querySelectorAll('.view-lead').forEach(btn => {
  btn.addEventListener('click', () => {
    const data = JSON.parse(btn.dataset.lead || '{}');
    const modal = document.getElementById('leadModal');
    if (!modal) return;
    Object.entries(data).forEach(([key, val]) => {
      const el = modal.querySelector(`[data-field="${key}"]`);
      if (el) el.textContent = val || '—';
    });
    modal.classList.add('open');
  });
});

// ── Table search / filter ─────────────────────────────────────
const searchInput = document.getElementById('tableSearch');
if (searchInput) {
  searchInput.addEventListener('input', function () {
    const q = this.value.toLowerCase();
    document.querySelectorAll('tbody tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

// ── CSV export: trigger download ──────────────────────────────
const exportBtn = document.getElementById('exportCsv');
if (exportBtn) {
  exportBtn.addEventListener('click', () => {
    const rows = [...document.querySelectorAll('table tr')];
    const csv = rows.map(r =>
      [...r.querySelectorAll('th,td')]
        .filter(c => !c.classList.contains('no-export'))
        .map(c => `"${c.innerText.replace(/"/g,'""').trim()}"`)
        .join(',')
    ).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = exportBtn.dataset.filename || 'export.csv';
    a.click();
  });
}

// ── Password show/hide ────────────────────────────────────────
document.querySelectorAll('.toggle-password').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = btn.previousElementSibling;
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
    btn.querySelector('i').className = input.type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
  });
});

// ── Mini bar chart on dashboard ───────────────────────────────
function drawBarChart(containerId, values, color = '#0891B2') {
  const el = document.getElementById(containerId);
  if (!el) return;
  const max = Math.max(...values, 1);
  el.innerHTML = values.map((v, i) => `
    <div title="${v}" style="
      flex:1;
      height:${Math.max(4, Math.round((v / max) * 100))}%;
      background:${color};
      border-radius:3px 3px 0 0;
      opacity:${0.5 + (i / values.length) * 0.5};
      transition:opacity .2s;
    "></div>
  `).join('');
}
