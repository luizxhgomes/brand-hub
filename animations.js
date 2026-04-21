/* ===================================================
   BRAND HUB v6.1.2 — Animações leves
   Scroll nativo (sem Lenis, sem parallax).
   Apenas IntersectionObserver para reveals.
   =================================================== */

(function() {
  'use strict';

  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  function apply(el, type, index) {
    if (!el) return;
    el.classList.add(type);
    if (typeof index === 'number') el.style.setProperty('--i', index);
    observer.observe(el);
  }

  function initReveals() {
    var header = document.querySelector('.page-header');
    if (header) apply(header, 'reveal');

    document.querySelectorAll('.section-divider').forEach(function(el) {
      apply(el, 'reveal');
    });

    document.querySelectorAll('.grid-2, .grid-3, .grid-4').forEach(function(grid) {
      grid.classList.add('stagger-container');
      var children = grid.querySelectorAll('.card, .stat-card, .story-block, .system-card, .case-card');
      children.forEach(function(child, i) {
        apply(child, 'reveal', Math.min(i, 6));
      });
    });

    document.querySelectorAll('.content > .card').forEach(function(el) {
      if (!el.closest('.grid-2, .grid-3, .grid-4')) apply(el, 'reveal');
    });

    document.querySelectorAll('.timeline-item').forEach(function(item, i) {
      apply(item, 'reveal-left', Math.min(i, 5));
    });

    document.querySelectorAll('.cal-table, .code-block, .quote-block, .tabs').forEach(function(el) {
      apply(el, 'reveal');
    });
  }

  function initVoiceMeters() {
    var fills = document.querySelectorAll('.voice-meter-fill');
    var meterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var targetWidth = el.style.width;
          if (!targetWidth) return;
          el.style.width = '0%';
          void el.offsetHeight;
          requestAnimationFrame(function() {
            el.style.width = targetWidth;
          });
          meterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    fills.forEach(function(fill) { meterObserver.observe(fill); });
  }

  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function init() {
    requestAnimationFrame(function() {
      initReveals();
      initVoiceMeters();
      initSmoothAnchors();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
