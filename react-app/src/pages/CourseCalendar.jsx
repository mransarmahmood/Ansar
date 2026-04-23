// Auto-generated from pages/course-calendar.html. Edit freely — this file is the source of truth now.
import { useEffect } from 'react';
import PageHtml from '../components/PageHtml';

const HTML = `

  <section class="page-hero">
    <div class="page-hero__pattern" aria-hidden="true"></div>
    <i class="page-hero__icon-bg fas fa-calendar-alt" aria-hidden="true"></i>
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../index.html">Home</a><span class="breadcrumb__sep"><i class="fas fa-chevron-right"></i></span><a href="training.html">Training</a><span class="breadcrumb__sep"><i class="fas fa-chevron-right"></i></span><span class="breadcrumb__current">Course Calendar</span></nav>
      <div class="page-hero__content">
        <span class="eyebrow eyebrow--white">2026 Schedule</span>
        <h1>HSE Training Course Calendar</h1>
        <p>Upcoming IOSH, ISO Lead Auditor, AI in Safety, and corporate training dates. Online, in-person, and blended delivery options. Reserve your seat early — cohorts are limited.</p>
      </div>
    </div>
  </section>

  <!-- Delivery Modes -->
  <section style="background:var(--navy-xlight,#e6f4ee);padding:36px 0;border-bottom:1px solid var(--gray-200,#e5e7eb);">
    <div class="container">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;">
        <div class="delivery-card">
          <i class="fas fa-laptop" style="color:var(--blue);"></i>
          <strong style="display:block;margin-bottom:4px;">Online Live</strong>
          <p style="font-size:.83rem;color:var(--text-muted);margin:0;">Zoom-based interactive sessions. Join from anywhere globally.</p>
        </div>
        <div class="delivery-card">
          <i class="fas fa-building" style="color:var(--gold);"></i>
          <strong style="display:block;margin-bottom:4px;">In-Person</strong>
          <p style="font-size:.83rem;color:var(--text-muted);margin:0;">Face-to-face training. Venues in UAE, UK, and other locations.</p>
        </div>
        <div class="delivery-card">
          <i class="fas fa-blender" style="color:var(--blue);"></i>
          <strong style="display:block;margin-bottom:4px;">Blended</strong>
          <p style="font-size:.83rem;color:var(--text-muted);margin:0;">Self-study modules + live sessions. Maximum flexibility.</p>
        </div>
        <div class="delivery-card">
          <i class="fas fa-industry" style="color:var(--navy-light,#00694b);"></i>
          <strong style="display:block;margin-bottom:4px;">Corporate On-Site</strong>
          <p style="font-size:.83rem;color:var(--text-muted);margin:0;">Delivered at your workplace. Custom content and schedule.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-white">
    <div class="container">

      <!-- Filter -->
      <div class="cal-filters">
        <button class="cal-filter active" onclick="filterCourses(this,'all')">All Courses</button>
        <button class="cal-filter" onclick="filterCourses(this,'nebosh')"></button>
        <button class="cal-filter" onclick="filterCourses(this,'iosh')">IOSH</button>
        <button class="cal-filter" onclick="filterCourses(this,'iso')">ISO Standards</button>
        <button class="cal-filter" onclick="filterCourses(this,'ai')">AI & Digital</button>
        <button class="cal-filter" onclick="filterCourses(this,'online')">Online Only</button>
      </div>

      <?php if (!empty($months)): ?>
        <?php foreach ($months as $month_label => $month_courses): ?>
        <div class="month-header"><h3><?= cms_e($month_label) ?></h3></div>
        <div style="display:flex;flex-direction:column;gap:16px;" class="courses-list">

          <?php foreach ($month_courses as $c):
            $type_slug  = $c['type_slug'] ?? 'custom';
            $mode_slug  = $c['mode_slug'] ?? 'online';
            $type_icon  = $type_icons[$type_slug]  ?? 'fa-graduation-cap';
            $mode_icon  = $mode_icons[$mode_slug]  ?? 'fa-laptop';
            $seats      = (int)($c['seats_available'] ?? 0);
            if ($seats <= 0) {
                $seats_class = 'seats-full';
                $seats_text  = 'Fully Booked';
            } elseif ($seats <= 5) {
                $seats_class = 'seats-few';
                $seats_text  = $seats . ' Seats Left';
            } else {
                $seats_class = 'seats-ok';
                $seats_text  = $seats . ' Seats Available';
            }
            $cat_str = $type_slug . ' ' . $mode_slug;
          ?>
          <div class="course-row reveal" data-cat="<?= cms_e($cat_str) ?>">
            <div class="course-row__date-col">
              <div class="course-row__day"><?= cms_e($c['day'] ?? '01') ?></div>
              <div class="course-row__month"><?= cms_e($c['month'] ?? '') ?></div>
              <div class="course-row__year"><?= cms_e($c['year'] ?? '2026') ?></div>
            </div>
            <div class="course-row__body">
              <span class="course-row__type type-<?= cms_e($type_slug) ?>">
                <i class="fas <?= cms_e($type_icon) ?>"></i> <?= cms_e($c['type'] ?? '') ?>
              </span>
              <div class="course-row__title"><?= cms_e($c['title'] ?? '') ?></div>
              <div class="course-row__meta">
                <span><i class="fas fa-clock"></i> <?= cms_e($c['duration'] ?? '') ?></span>
                <span><i class="fas <?= cms_e($mode_icon) ?>"></i> <?= cms_e($c['mode'] ?? '') ?></span>
                <span><i class="fas fa-map-marker-alt"></i> <?= cms_e($c['location'] ?? '') ?></span>
                <span><i class="fas fa-tag"></i> <?= cms_e($c['price'] ?? '') ?></span>
              </div>
              <?php if (!empty($c['description'])): ?>
              <p style="font-size:.87rem;color:var(--text-muted);margin:0 0 14px;"><?= cms_e($c['description']) ?></p>
              <?php endif; ?>
              <div class="course-row__actions">
                <a href="course-admission.html?course=<?= urlencode($c['id'] ?? '') ?>" class="btn btn-gold btn-sm"><i class="fas fa-user-plus"></i> Apply Now</a>
                <a href="book-consultation.html" class="btn btn-outline-navy btn-sm"><i class="fas fa-question-circle"></i> Enquire</a>
                <span class="seats-badge <?= $seats_class ?>"><i class="fas fa-chair"></i> <?= cms_e($seats_text) ?></span>
              </div>
            </div>
          </div>
          <?php endforeach; ?>

        </div>
        <?php endforeach; ?>
      <?php else: ?>
      <div style="text-align:center;padding:60px 0;color:var(--text-muted);">
        <i class="fas fa-calendar-alt" style="font-size:3rem;opacity:.3;display:block;margin-bottom:16px;"></i>
        <p>No upcoming courses at this time. Check back soon or enquire about a custom programme.</p>
      </div>
      <?php endif; ?>

      <!-- Custom Training CTA -->
      <div class="reveal" style="background:linear-gradient(135deg,var(--navy),var(--navy-light));border-radius:var(--radius-lg);padding:48px;text-align:center;margin-top:60px;">
        <i class="fas fa-building" style="font-size:2.5rem;color:var(--gold);margin-bottom:16px;display:block;"></i>
        <h3 style="color:#fff;margin-bottom:8px;">Need Corporate or Custom Training?</h3>
        <p style="color:rgba(255,255,255,.75);max-width:580px;margin:0 auto 28px;">Can't find a date that works, or need a bespoke programme for your team? Ansar delivers corporate on-site training globally — customised to your industry, site, and specific risk profile.</p>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
          <a href="corporate-solutions.html" class="btn btn-gold"><i class="fas fa-building"></i> Corporate Solutions</a>
          <a href="course-admission.html" class="btn btn-outline-white"><i class="fas fa-user-plus"></i> Submit an Enquiry</a>
        </div>
      </div>

    </div>
  </section>

`;

export default function CourseCalendar() {
  useEffect(() => {
    document.title = "HSE Course Calendar 2026 — IOSH & ISO Training Dates | Ansar Mahmood";
  }, []);
  return <PageHtml html={HTML} />;
}
