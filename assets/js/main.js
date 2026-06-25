/* Jade Remodeling — interactions (vanilla JS, no dependencies) */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- sticky header scroll state ---- */
  var header = document.querySelector('.site-header');
  var hero = document.querySelector('.hero');
  function onScroll() {
    if (!header) return;
    // solid header once scrolled, or always solid on pages without a hero
    var threshold = hero ? 40 : 0;
    header.classList.toggle('scrolled', window.scrollY > threshold);
  }
  if (!hero && header) header.classList.add('solid');
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- mobile nav ---- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* ---- scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- gallery filter ---- */
  var filters = document.querySelectorAll('.filter');
  var tiles = document.querySelectorAll('.gallery [data-cat]');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-filter');
      filters.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      tiles.forEach(function (t) {
        var show = cat === 'all' || t.getAttribute('data-cat') === cat;
        t.classList.toggle('hide', !show);
      });
    });
  });

  /* ---- before / after sliders (pointer events; range kept for keyboard a11y) ---- */
  document.querySelectorAll('.ba__wrap').forEach(function (wrap) {
    var after = wrap.querySelector('.ba__after');
    var handle = wrap.querySelector('.ba__handle');
    var range = wrap.querySelector('.ba__range');
    function set(pct) {
      pct = Math.max(0, Math.min(100, pct));
      after.style.clipPath = 'inset(0 0 0 ' + pct + '%)';
      handle.style.left = pct + '%';
      if (range && Math.round(+range.value) !== Math.round(pct)) range.value = pct;
    }
    function pctFromX(clientX) {
      var r = wrap.getBoundingClientRect();
      return ((clientX - r.left) / r.width) * 100;
    }
    var dragging = false;
    wrap.addEventListener('pointerdown', function (e) {
      dragging = true;
      try { wrap.setPointerCapture(e.pointerId); } catch (_) {}
      set(pctFromX(e.clientX));
    });
    wrap.addEventListener('pointermove', function (e) {
      if (dragging) set(pctFromX(e.clientX));
    });
    function stop(e) { dragging = false; try { wrap.releasePointerCapture(e.pointerId); } catch (_) {} }
    wrap.addEventListener('pointerup', stop);
    wrap.addEventListener('pointercancel', stop);
    if (range) range.addEventListener('input', function () { set(+range.value); });
    set(50);
  });

  /* ---- contact form validation (client-side mock) ---- */
  var form = document.getElementById('quote-form');
  if (form) {
    var success = document.getElementById('form-success');
    form.setAttribute('novalidate', 'novalidate');
    function validateField(field) {
      var input = field.querySelector('input, select, textarea');
      if (!input || !input.hasAttribute('data-required')) return true;
      var ok = input.value.trim() !== '';
      if (ok && input.type === 'tel') ok = (input.value.replace(/[^0-9]/g, '').length >= 7);
      field.classList.toggle('invalid', !ok);
      return ok;
    }
    form.querySelectorAll('.field').forEach(function (f) {
      var input = f.querySelector('[data-required]');
      if (input) input.addEventListener('blur', function () { validateField(f); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var allOk = true, firstBad = null;
      form.querySelectorAll('.field').forEach(function (f) {
        var ok = validateField(f);
        if (!ok && !firstBad) firstBad = f;
        allOk = allOk && ok;
      });
      if (!allOk) { if (firstBad) { var inp = firstBad.querySelector('input,select,textarea'); if (inp) inp.focus(); } return; }
      form.hidden = true;
      if (success) { success.classList.add('show'); success.setAttribute('tabindex', '-1'); success.focus(); success.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' }); }
    });
  }

  /* ---- footer year ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
