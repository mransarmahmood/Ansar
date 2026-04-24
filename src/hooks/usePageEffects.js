import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Re-runs scroll reveal, counter animations, FAQ accordion, smooth-scroll, filter tabs
// after every route change. Extracted from the original main.js.
export function usePageEffects() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  useEffect(() => {
    // Scroll reveal
    const els = document.querySelectorAll('.reveal:not(.visible)');
    if (els.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
      );
      els.forEach((el) => io.observe(el));
      // eslint-disable-next-line consistent-return
      return () => io.disconnect();
    }
  }, [location.pathname]);

  useEffect(() => {
    // Stat counters
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const animate = (el) => {
      const target = parseInt(el.dataset.counter, 10);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 1800;
      const start = Date.now();
      const step = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);
        el.textContent = prefix + current.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    // FAQ accordion
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;
    const handlers = [];
    items.forEach((item) => {
      const q = item.querySelector('.faq-question');
      if (!q) return;
      q.setAttribute('aria-expanded', 'false');
      const handler = () => {
        const isOpen = item.classList.contains('open');
        items.forEach((i) => {
          i.classList.remove('open');
          const qq = i.querySelector('.faq-question');
          if (qq) qq.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          q.setAttribute('aria-expanded', 'true');
        }
      };
      q.addEventListener('click', handler);
      handlers.push([q, handler]);
    });
    return () => handlers.forEach(([q, h]) => q.removeEventListener('click', h));
  }, [location.pathname]);

  useEffect(() => {
    // Filter tabs (data-category / data-filter)
    const tabs = document.querySelectorAll('.filter-tab');
    if (!tabs.length) return;
    const handlers = [];
    tabs.forEach((tab) => {
      const handler = () => {
        const parent = tab.closest('.filter-tabs');
        if (!parent) return;
        parent.querySelectorAll('.filter-tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        const container = document.querySelector(tab.dataset.target || '.filterable-grid');
        if (!container) return;
        container.querySelectorAll('[data-category]').forEach((item) => {
          const show = filter === 'all' || item.dataset.category === filter;
          item.style.display = show ? '' : 'none';
        });
      };
      tab.addEventListener('click', handler);
      handlers.push([tab, handler]);
    });
    return () => handlers.forEach(([t, h]) => t.removeEventListener('click', h));
  }, [location.pathname]);
}
