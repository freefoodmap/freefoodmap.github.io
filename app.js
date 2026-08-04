/* ===========================================
   Free Food Map · app.js
   Map · filters · interactions · i18n
   =========================================== */

(function () {
  'use strict';

  // ------- helpers -------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const TYPE_LABELS = window.TYPE_LABELS || {};
  const TYPE_COLORS = window.TYPE_COLORS || {};
  const POINTS = window.FOOD_POINTS || [];
  const I18N = window.I18N || { zh: {}, en: {} };

  // ------- i18n state -------
  // Priority: URL param > localStorage > 'zh'
  function detectLang() {
    try {
      const urlLang = new URLSearchParams(location.search).get('lang');
      if (urlLang && I18N[urlLang]) return urlLang;
    } catch (e) { /* ignore */ }
    const stored = localStorage.getItem('freefood-lang');
    if (stored && I18N[stored]) return stored;
    return 'zh';
  }
  let currentLang = detectLang();

  function t(key) {
    const dict = I18N[currentLang] || {};
    return (dict[key] !== undefined ? dict[key] : I18N.zh[key] !== undefined ? I18N.zh[key] : key);
  }

  // Replace {n} placeholders
  function tF(key, vars) {
    let s = t(key);
    if (vars) Object.keys(vars).forEach(k => s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]));
    return s;
  }

  function applyI18n() {
    // 1) Set <html lang> + <title> + meta description
    document.documentElement.lang = I18N[currentLang].htmlLang || currentLang;
    document.title = t('title');
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('description'));

    // 2) Replace text for all [data-i18n]
    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (typeof val === 'string') el.innerHTML = val;
    });

    // 3) Replace placeholders for all [data-i18n-placeholder]
    $$('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', t(key));
    });

    // 4) Update language toggle button label
    const labelDesktop = $('#lang-toggle-label');
    const labelMobile = $('#lang-toggle-label-mobile');
    const nextLang = currentLang === 'zh' ? 'EN' : '中文';
    if (labelDesktop) labelDesktop.textContent = nextLang;
    if (labelMobile) labelMobile.textContent = nextLang;
    document.documentElement.setAttribute('data-lang', currentLang);

    // 5) After language change, rebuild dynamic UI (map list, popups)
    if (typeof buildMapList === 'function') buildMapList();
    if (typeof leafletMap !== 'undefined' && leafletMap && markerLayer) {
      // Re-render markers so popups reflect current language
      renderMarkers();
    }
  }

  function toggleLang() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    localStorage.setItem('freefood-lang', currentLang);
    applyI18n();
  }

  function setupLangToggle() {
    const btn = $('#lang-toggle');
    const btnM = $('#lang-toggle-mobile');
    if (btn) btn.addEventListener('click', toggleLang);
    if (btnM) btnM.addEventListener('click', toggleLang);
  }

  // ------- mobile nav toggle -------
  function setupNav() {
    const btn = $('#nav-toggle');
    const menu = $('#nav-menu');
    if (!btn) return;
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
    $$('#nav-menu a').forEach(a =>
      a.addEventListener('click', () => menu.classList.add('hidden'))
    );
  }

  // ------- scroll reveal -------
  function setupReveal() {
    const targets = $$('section h2, section .max-w-3xl, .step-card, .video-card, .tip-row');
    if (!targets.length) return;
    // Respect reduced motion: skip the hide-then-reveal dance entirely.
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach(el => el.classList.add('visible'));
      return;
    }
    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('visible'));
      return;
    }
    targets.forEach(el => el.classList.add('reveal'));
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -5% 0px' });
    targets.forEach(el => io.observe(el));
    setTimeout(() => {
      targets.forEach(el => el.classList.add('visible'));
    }, 1500);
  }

  // ------- stat counters (animate) -------
  // Strategy: the final value (e.g. "46") is set synchronously on load, so any
  // static / headless / no-JS render shows the real number. The 0→N count-up
  // is a "nice to have" that only runs when the user hovers the stats block —
  // never on first paint, so we never flash "0" in the screenshots.
  function setStatFinal(el, target) {
    if (!el) return;
    el.textContent = target.toLocaleString();
  }
  function animateCounter(el, target, duration = 1200) {
    if (!el) return;
    const start = 0;
    const startTime = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(start + (target - start) * eased).toLocaleString();
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function setupStats() {
    const countries = new Set(POINTS.map(p => p.country));
    const videos = $$('.video-card iframe').length;
    const targets = {
      points: POINTS.length,
      countries: countries.size,
      videos: videos
    };
    // Set final value immediately — so static renders, headless, no-JS all see real numbers.
    setStatFinal($('#stat-points'), targets.points);
    setStatFinal($('#stat-countries'), targets.countries);
    setStatFinal($('#stat-videos'), targets.videos);

    // Optional: a "play" hover effect on the stats that re-runs the count animation.
    // Final value is always kept in sync (so static / headless / no-JS all see real numbers).
    // The 0→N animation only runs on user hover, never on first paint.
    const statsWrap = $('#top');
    if (!statsWrap) return;
    let hoverTimer = null;
    function playCount() {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const p = $('#stat-points'), c = $('#stat-countries'), v = $('#stat-videos');
      if (p) p.textContent = '0';
      if (c) c.textContent = '0';
      if (v) v.textContent = '0';
      animateCounter(p, targets.points);
      animateCounter(c, targets.countries);
      animateCounter(v, targets.videos);
    }
    // On hover, briefly play the count animation, then restore final value.
    statsWrap.addEventListener('mouseenter', () => {
      if (hoverTimer) clearTimeout(hoverTimer);
      playCount();
      hoverTimer = setTimeout(() => {
        setStatFinal($('#stat-points'), targets.points);
        setStatFinal($('#stat-countries'), targets.countries);
        setStatFinal($('#stat-videos'), targets.videos);
      }, 1500);
    });
  }

  // ------- build map -------
  let leafletMap = null;
  let markerLayer = null;
  let activeType = 'all';

  function makeIcon(type, isStory = false) {
    const color = TYPE_COLORS[type] || '#f4a52a';
    const cls = 'food-marker' + (isStory ? ' story' : '');
    return L.divIcon({
      className: '',
      html: `<div class="${cls}" style="background:${color}">${isStory ? '🥯' : '●'}</div>`,
      iconSize: [isStory ? 40 : 32, isStory ? 40 : 32],
      iconAnchor: [isStory ? 20 : 16, isStory ? 20 : 16],
      popupAnchor: [0, isStory ? -20 : -16]
    });
  }

  function popupHTML(p) {
    const labelsByLang = (TYPE_LABELS && (TYPE_LABELS[currentLang] || TYPE_LABELS.zh)) || {};
    const label = labelsByLang[p.type] || p.type;
    // desc: prefer desc_en if current lang is en and desc_en exists
    const desc = currentLang === 'en' && p.desc_en ? p.desc_en : p.desc;
    const website = p.website
      ? `<div>🔗 <a href="${p.website}" target="_blank" rel="noopener">${t('popupWebsite').replace('🔗 ', '')}</a></div>`
      : '';
    const phone = p.phone
      ? `<div>📞 ${p.phone}</div>`
      : '';
    return `
      <div class="popup-inner">
        <div class="popup-type">${label}</div>
        <div class="popup-name">${p.name}</div>
        <div class="popup-city">${p.city} · ${p.country}</div>
        <div class="popup-desc">${desc}</div>
        <div class="popup-meta">
          <div>${t('popupSchedule')} ${p.schedule}</div>
          ${phone}
          ${website}
        </div>
        ${p.website ? `<a class="popup-cta" href="${p.website}" target="_blank" rel="noopener">${t('popupViewWebsite')}</a>` : ''}
      </div>
    `;
  }

  function initMap() {
    const el = $('#map-canvas');
    if (!el || typeof L === 'undefined') return;

    leafletMap = L.map('map-canvas', {
      center: [25, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 17,
      worldCopyJump: true,
      zoomControl: true
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OSM</a> · © <a href="https://carto.com/attributions">CARTO</a> · ' + (currentLang === 'zh' ? '数据由志愿者整理' : 'Data curated by volunteers'),
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(leafletMap);

    markerLayer = L.layerGroup().addTo(leafletMap);
    renderMarkers();

    leafletMap.whenReady(() => {
      buildMapList();
    });
  }

  function renderMarkers() {
    if (!markerLayer) return;
    markerLayer.clearLayers();

    const visible = activeType === 'all'
      ? POINTS
      : POINTS.filter(p => p.type === activeType);

    visible.forEach(p => {
      const isStory = p.id === 'us-la-sauce-pancake-tang';
      const icon = makeIcon(p.type, isStory);
      const m = L.marker([p.lat, p.lng], { icon, title: p.name });
      m.bindPopup(popupHTML(p), { maxWidth: 320 });
      m.addTo(markerLayer);
    });

    buildMapList();
  }

  function buildMapList() {
    const listEl = $('#map-list');
    if (!listEl) return;
    const visible = activeType === 'all'
      ? POINTS
      : POINTS.filter(p => p.type === activeType);

    const grouped = {};
    visible.forEach(p => {
      const k = p.country || '其他';
      (grouped[k] = grouped[k] || []).push(p);
    });

    const order = Object.keys(grouped).sort();

    let html = '<div class="text-xs text-white/40 font-mono uppercase tracking-wider">' + t('mapListTitle') + '</div>';
    html += '<div class="text-xs text-white/30 mt-1">' + tF('mapListTotal', { n: visible.length }) + '</div>';
    order.forEach(country => {
      html += '<div class="mt-4 text-xs font-mono text-crust uppercase tracking-wider">' + country + '</div>';
      grouped[country]
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach(p => {
          html += '<div class="map-list-item mt-2" data-id="' + p.id + '">'
                + '<div class="map-list-name">' + p.name + '</div>'
                + '<div class="map-list-city">' + p.city + '</div>'
                + '</div>';
        });
    });

    listEl.innerHTML = html;

    $$('.map-list-item', listEl).forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        const p = POINTS.find(x => x.id === id);
        if (!p || !leafletMap) return;
        $$('.map-list-item').forEach(x => x.classList.remove('active'));
        el.classList.add('active');
        leafletMap.flyTo([p.lat, p.lng], 12, { duration: 1.0 });
        setTimeout(() => {
          leafletMap.eachLayer(layer => {
            if (layer._latlng && Math.abs(layer._latlng.lat - p.lat) < 0.0001 && Math.abs(layer._latlng.lng - p.lng) < 0.0001) {
              layer.openPopup();
            }
          });
        }, 1100);
      });
    });
  }

  function setupFilters() {
    $$('.map-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.map-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeType = btn.getAttribute('data-type') || 'all';
        renderMarkers();
      });
    });
  }

  // ------- form -------
  function setupForm() {
    const form = $('#submit-form');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      try {
        const existing = JSON.parse(localStorage.getItem('freefood-submissions') || '[]');
        existing.push({ ...data, submittedAt: new Date().toISOString() });
        localStorage.setItem('freefood-submissions', JSON.stringify(existing));
      } catch (err) { /* ignore */ }

      const typeLabel = t('type' + data.type.charAt(0).toUpperCase() + data.type.slice(1).replace(/_([a-z])/g, (_, c) => c.toUpperCase())) || data.type;
      form.innerHTML = `
        <div class="form-success">
          <div class="text-5xl mb-3">🥯</div>
          <div class="font-serif text-2xl mb-2">${t('formSuccess')}</div>
          <p class="text-ink/70">${t('formSuccessSub')}</p>
          <div class="mt-5 text-xs text-ink/50 font-mono">${t('formSuccessMeta')} ${data.name} · ${data.city} · ${typeLabel}</div>
        </div>
      `;
    });
  }

  // ------- init -------
  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.add('js');
    setupNav();
    setupLangToggle();
    setupReveal();
    setupStats();
    setupFilters();
    setupForm();
    initMap();
    // Apply i18n last so dynamic UI (map list) gets correct text
    applyI18n();
  });
})();
