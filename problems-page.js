/* ============================================
   BLACKPANTHERS CLUB — Problem Statements Page
   SIH-style filterable, paginated table.
   ============================================ */

(function () {
  'use strict';

  var SW = 'Software';
  var HW = 'Hardware';
  var HS = 'Hardware + Software';

  var data = (window.BP_PROBLEMS || []).map(function (p, i) {
    return {
      num: i + 1,
      id: 'BPS' + (26001 + i),
      d: p.d,
      th: p.th,
      t: p.t,
      desc: p.desc,
      detail: p.detail,
      tags: p.tags || [],
      features: p.features || [],
      how: p.how || []
    };
  });

  /* Tag → concrete technology recommendations */
  var STACK_LIBRARY = {
    ml:        { label: 'Machine Learning', items: ['Python', 'scikit-learn', 'TensorFlow / PyTorch'] },
    cv:        { label: 'Computer Vision', items: ['OpenCV', 'YOLO / CNN models', 'TensorFlow Lite'] },
    nlp:       { label: 'Natural Language', items: ['Hugging Face Transformers', 'spaCy', 'IndicNLP (regional languages)'] },
    voice:     { label: 'Speech / Voice', items: ['Whisper (speech-to-text)', 'Coqui / TTS', 'Rasa (dialogue)'] },
    mobile:    { label: 'Mobile App', items: ['Flutter or React Native', 'SQLite (offline store)'] },
    web:       { label: 'Web App', items: ['React', 'Node.js / Express', 'Tailwind CSS'] },
    cloud:     { label: 'Backend & Cloud', items: ['AWS / GCP / Firebase', 'Docker', 'PostgreSQL'] },
    data:      { label: 'Data & Pipelines', items: ['Pandas', 'PostgreSQL', 'Apache Kafka (streams)'] },
    realtime:  { label: 'Real-Time', items: ['WebSockets', 'Redis', 'Apache Kafka'] },
    iot:       { label: 'IoT & Connectivity', items: ['ESP32 / Raspberry Pi', 'MQTT', 'AWS IoT / Firebase RTDB'] },
    embedded:  { label: 'Embedded / Firmware', items: ['C / C++', 'Arduino / ESP32 / STM32', 'FreeRTOS'] },
    sensor:    { label: 'Sensors & Electronics', items: ['Analog/digital sensors', 'ADC & signal conditioning', 'Calibration circuitry'] },
    wearable:  { label: 'Wearable Electronics', items: ['Low-power MCU (nRF52)', 'BLE', 'Sensor fusion (IMU)'] },
    edge:      { label: 'Edge AI', items: ['TensorFlow Lite / ONNX', 'Jetson Nano / Coral', 'Quantised models'] },
    blockchain:{ label: 'Blockchain', items: ['Solidity', 'Ethereum / Polygon', 'IPFS (storage)'] },
    ar:        { label: 'Augmented Reality', items: ['ARCore / ARKit', 'Unity', 'On-device CV'] },
    drone:     { label: 'Drone / Aerial', items: ['PX4 / ArduPilot', 'ROS', 'MAVLink'] },
    robotics:  { label: 'Robotics & Motion', items: ['ROS', 'Motor drivers & servos', 'Microcontrollers'] },
    maps:      { label: 'Maps & Location', items: ['Google Maps API / Leaflet', 'GPS', 'GIS / GeoJSON'] }
  };

  function buildStack(tags) {
    var groups = [];
    var seen = {};
    tags.forEach(function (tag) {
      var g = STACK_LIBRARY[tag];
      if (g && !seen[tag]) {
        seen[tag] = true;
        groups.push(g);
      }
    });
    return groups;
  }

  function listHtml(items, cls) {
    return '<ul class="' + cls + '">' +
      items.map(function (x) { return '<li>' + x + '</li>'; }).join('') +
      '</ul>';
  }

  function howHtml(steps) {
    return '<ol class="ps-detail-steps">' +
      steps.map(function (s) { return '<li>' + s + '</li>'; }).join('') +
      '</ol>';
  }

  function stackHtml(tags) {
    var groups = buildStack(tags);
    if (!groups.length) return '<span class="ps-detail-muted">General-purpose stack</span>';
    return '<div class="ps-stack">' + groups.map(function (g) {
      var chips = g.items.map(function (it) {
        return '<span class="ps-chip">' + it + '</span>';
      }).join('');
      return '<div class="ps-stack-group">' +
        '<span class="ps-stack-label">' + g.label + '</span>' +
        '<div class="ps-chips">' + chips + '</div>' +
      '</div>';
    }).join('') + '</div>';
  }

  var state = {
    search: '',
    category: 'all',
    theme: 'all',
    perPage: 25,
    page: 1
  };

  var els = {};

  function domainClass(d) {
    if (d === SW) return 'sw';
    if (d === HW) return 'hw';
    return 'hs';
  }

  function shortCat(d) {
    if (d === HS) return 'HW + SW';
    return d;
  }

  function getFiltered() {
    var term = state.search;
    return data.filter(function (p) {
      if (state.category !== 'all' && p.d !== state.category) return false;
      if (state.theme !== 'all' && p.th !== state.theme) return false;
      if (!term) return true;
      var hay = (p.t + ' ' + p.desc + ' ' + p.d + ' ' + p.th + ' ' + p.id).toLowerCase();
      return hay.indexOf(term) !== -1;
    });
  }

  function render() {
    var list = getFiltered();
    var total = list.length;
    var totalPages = Math.max(1, Math.ceil(total / state.perPage));
    if (state.page > totalPages) state.page = totalPages;

    var start = (state.page - 1) * state.perPage;
    var pageItems = list.slice(start, start + state.perPage);

    els.body.innerHTML = '';

    if (total === 0) {
      els.empty.style.display = 'block';
      els.count.textContent = '';
      els.pagination.innerHTML = '';
      return;
    }
    els.empty.style.display = 'none';

    pageItems.forEach(function (p, idx) {
      var tr = document.createElement('tr');
      tr.className = 'ps-row';
      tr.style.animationDelay = (idx * 0.02) + 's';
      tr.innerHTML =
        '<td class="ps-col-no" data-label="#">' + p.num + '</td>' +
        '<td class="ps-col-id" data-label="PS ID"><span class="ps-id">' + p.id + '</span></td>' +
        '<td class="ps-col-title" data-label="Problem Statement">' +
          '<span class="ps-title">' + p.t + '</span>' +
          '<span class="ps-desc">' + p.desc + '</span>' +
        '</td>' +
        '<td class="ps-col-cat" data-label="Category"><span class="ps-badge ps-badge--' + domainClass(p.d) + '">' + shortCat(p.d) + '</span></td>' +
        '<td class="ps-col-theme" data-label="Theme"><span class="ps-theme">' + p.th + '</span></td>' +
        '<td class="ps-col-view" data-label=""><span class="ps-view">View <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></td>';
      tr.addEventListener('click', function () { openModal(p); });
      els.body.appendChild(tr);
    });

    var from = start + 1;
    var to = start + pageItems.length;
    els.count.textContent = 'Showing ' + from + '–' + to + ' of ' + total + ' problem statements';

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    els.pagination.innerHTML = '';
    if (totalPages <= 1) return;

    var frag = document.createDocumentFragment();

    frag.appendChild(pageBtn('‹', state.page - 1, state.page === 1, false));

    var pages = pageRange(state.page, totalPages);
    pages.forEach(function (pg) {
      if (pg === '...') {
        var span = document.createElement('span');
        span.className = 'ps-page-ellipsis';
        span.textContent = '…';
        frag.appendChild(span);
      } else {
        frag.appendChild(pageBtn(pg, pg, false, pg === state.page));
      }
    });

    frag.appendChild(pageBtn('›', state.page + 1, state.page === totalPages, false));

    els.pagination.appendChild(frag);
  }

  function pageRange(current, total) {
    var range = [];
    var delta = 1;
    for (var i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      } else if (range[range.length - 1] !== '...') {
        range.push('...');
      }
    }
    return range;
  }

  function pageBtn(label, target, disabled, active) {
    var btn = document.createElement('button');
    btn.className = 'ps-page' + (active ? ' active' : '');
    btn.textContent = label;
    if (disabled) {
      btn.disabled = true;
    } else {
      btn.addEventListener('click', function () {
        state.page = target;
        render();
        scrollToTable();
      });
    }
    return btn;
  }

  function scrollToTable() {
    var top = els.section.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  /* ---------- Detail Modal ---------- */

  function row(label, valueHtml) {
    return '<tr><th>' + label + '</th><td>' + valueHtml + '</td></tr>';
  }

  function openModal(p) {
    var dept = p.th + ' Division';
    els.detailBody.innerHTML =
      row('Problem Statement ID', '<span class="ps-detail-id">' + p.id + '</span>') +
      row('Problem Statement Title', '<strong>' + p.t + '</strong>') +
      row('Description', '<p class="ps-detail-lead">' + (p.detail || p.desc) + '</p>') +
      row('Key Features', listHtml(p.features, 'ps-detail-list')) +
      row('How It Works', howHtml(p.how)) +
      row('Recommended Tech Stack', stackHtml(p.tags)) +
      row('Organization', 'NLR Group of Companies') +
      row('Department', dept) +
      row('Category', '<span class="ps-badge ps-badge--' + domainClass(p.d) + '">' + shortCat(p.d) + '</span>') +
      row('Theme', p.th) +
      row('YouTube Link', '<span class="ps-detail-muted">To be announced</span>') +
      row('Dataset Link', '<span class="ps-detail-muted">Provided after selection</span>') +
      row('Contact Info', '<a href="mailto:nlrgroupofcompany@gmail.com">nlrgroupofcompany@gmail.com</a>');

    els.modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    els.modalScroll.scrollTop = 0;
  }

  function closeModal() {
    els.modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  function populateThemes() {
    var themes = {};
    data.forEach(function (p) { themes[p.th] = true; });
    var sorted = Object.keys(themes).sort();
    sorted.forEach(function (th) {
      var opt = document.createElement('option');
      opt.value = th;
      opt.textContent = th;
      els.theme.appendChild(opt);
    });
  }

  function setStats() {
    var sw = 0, hw = 0, hs = 0;
    data.forEach(function (p) {
      if (p.d === SW) sw++;
      else if (p.d === HW) hw++;
      else hs++;
    });
    text('statTotal', data.length);
    text('statSw', sw);
    text('statHw', hw);
    text('statHs', hs);
  }

  function text(id, v) {
    var el = document.getElementById(id);
    if (el) el.textContent = v;
  }

  function setupNav() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('mobileMenu');
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        toggle.classList.toggle('active');
        menu.classList.toggle('open');
        document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
      });
      menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          toggle.classList.remove('active');
          menu.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }
  }

  function init() {
    els.body = document.getElementById('psBody');
    els.empty = document.getElementById('psEmpty');
    els.count = document.getElementById('psCount');
    els.pagination = document.getElementById('psPagination');
    els.search = document.getElementById('psSearch');
    els.category = document.getElementById('psCategory');
    els.theme = document.getElementById('psTheme');
    els.perPage = document.getElementById('psPerPage');
    els.section = document.querySelector('.ps-section');
    els.modal = document.getElementById('psModal');
    els.detailBody = document.getElementById('psDetailBody');
    els.modalScroll = els.modal.querySelector('.ps-modal-scroll');

    if (!els.body) return;

    setStats();
    populateThemes();
    render();
    setupNav();

    els.search.addEventListener('input', function () {
      state.search = els.search.value.trim().toLowerCase();
      state.page = 1;
      render();
    });

    els.category.addEventListener('change', function () {
      state.category = els.category.value;
      state.page = 1;
      render();
    });

    els.theme.addEventListener('change', function () {
      state.theme = els.theme.value;
      state.page = 1;
      render();
    });

    els.perPage.addEventListener('change', function () {
      state.perPage = parseInt(els.perPage.value, 10);
      state.page = 1;
      render();
    });

    document.getElementById('psModalClose').addEventListener('click', closeModal);
    document.getElementById('psModalBackdrop').addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
