import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Re-runs scroll reveal, counter animations, FAQ accordion, smooth-scroll, and
// filter-tab behaviour after every route change. Replaces the original main.js.
export function usePageEffects() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  useEffect(() => {
    // One IntersectionObserver with continuous re-scanning: lazy-loaded pages
    // inject their `.reveal` elements into the DOM AFTER this hook first runs,
    // so plain querySelectorAll at mount misses them. A MutationObserver
    // watches <main> for additions and feeds any new reveals into the
    // IntersectionObserver.
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

    const observe = (root = document) => {
      root.querySelectorAll('.reveal:not(.visible)').forEach((el) => io.observe(el));
    };
    observe();

    const main = document.querySelector('main') || document.body;
    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (node.matches && node.matches('.reveal:not(.visible)')) io.observe(node);
          if (node.querySelectorAll) observe(node);
        }
      }
    });
    mo.observe(main, { childList: true, subtree: true });

    return () => { io.disconnect(); mo.disconnect(); };
  }, [location.pathname]);

  useEffect(() => {
    const animate = (el) => {
      if (el.dataset.counterDone) return;
      el.dataset.counterDone = '1';
      const target = parseInt(el.dataset.counter, 10);
      if (!target) return;
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

    const observe = (root = document) => {
      root.querySelectorAll('[data-counter]:not([data-counter-done])').forEach((el) => io.observe(el));
    };
    observe();

    const main = document.querySelector('main') || document.body;
    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (node.matches && node.matches('[data-counter]:not([data-counter-done])')) io.observe(node);
          if (node.querySelectorAll) observe(node);
        }
      }
    });
    mo.observe(main, { childList: true, subtree: true });

    return () => { io.disconnect(); mo.disconnect(); };
  }, [location.pathname]);

  useEffect(() => {
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
