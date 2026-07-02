/* ============================================
   BLACKPANTHERS CLUB — Problem Statements Page
   SIH-style filterable, paginated table.
   With access-code gate (762007).
   ============================================ */

(function () {
  'use strict';

  var ACCESS_CODE = '762007';

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
      solution: p.solution || '',
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

  function solutionHtml(text) {
    if (!text) return '<span class="ps-detail-muted">Solution approach to be discussed after selection.</span>';
    var paragraphs = text.split('\n\n').filter(function (p) { return p.trim(); });
    return '<div class="ps-detail-solution">' +
      paragraphs.map(function (p) { return '<p>' + p.trim() + '</p>'; }).join('') +
      '</div>';
  }

  var state = {
    search: '',
    category: 'all',
    theme: 'all',
    perPage: 25,
    page: 1,
    authenticated: false,
    pendingProblem: null,
    activeProblem: null
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
      tr.addEventListener('click', function () { requestAccess(p); });
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

  /* ---------- Access Code Gate ---------- */

  function requestAccess(p) {
    state.pendingProblem = p;
    showCodeModal();
  }

  function showCodeModal() {
    els.codeInput.value = '';
    els.codeError.textContent = '';
    els.codeInput.classList.remove('shake');
    els.codeModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { els.codeInput.focus(); }, 300);
  }

  function closeCodeModal() {
    els.codeModal.classList.remove('show');
    document.body.style.overflow = '';
    state.pendingProblem = null;
  }

  function submitCode() {
    var code = els.codeInput.value.trim();
    if (code === ACCESS_CODE) {
      state.authenticated = true;
      var p = state.pendingProblem;
      closeCodeModal();
      if (p) {
        setTimeout(function () { openModal(p); }, 200);
      }
    } else {
      els.codeError.textContent = 'Incorrect access code. Please try again.';
      els.codeInput.classList.remove('shake');
      void els.codeInput.offsetWidth;
      els.codeInput.classList.add('shake');
      els.codeInput.select();
    }
  }

  /* ---------- Detail Modal ---------- */

  function row(label, valueHtml) {
    return '<tr><th>' + label + '</th><td>' + valueHtml + '</td></tr>';
  }

  function openModal(p) {
    state.activeProblem = p;
    var dept = p.th + ' Division';
    els.detailBody.innerHTML =
      row('Problem Statement ID', '<span class="ps-detail-id">' + p.id + '</span>') +
      row('Problem Statement Title', '<strong>' + p.t + '</strong>') +
      row('Detailed Problem Description', '<p class="ps-detail-lead">' + (p.detail || p.desc) + '</p>') +
      row('Solution Approach', solutionHtml(p.solution)) +
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
    state.activeProblem = null;
  }

  function downloadPdf(p) {
    if (!window.jspdf) {
      alert('PDF generation library is still loading. Please try again.');
      return;
    }

    var doc = new window.jspdf.jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    var pageWidth = doc.internal.pageSize.getWidth();
    var pageHeight = doc.internal.pageSize.getHeight();
    var margin = 20;
    var contentWidth = pageWidth - (margin * 2);
    var y = 25;

    function drawWatermark() {
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(244, 242, 238);
      doc.text('PATENT: NLR GROUP OF COMPANIES', pageWidth / 2, pageHeight / 2, {
        align: 'center',
        angle: 315
      });
    }

    function drawPageTemplate() {
      drawWatermark();

      doc.setDrawColor(201, 168, 76);
      doc.setLineWidth(0.8);
      doc.line(margin, 15, pageWidth - margin, 15);
      
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(201, 168, 76);
      doc.text('BLACKPANTHERS CLUB — 2026', margin, 11);
      
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(120, 120, 120);
      var subHeaderStr = 'A NLR GROUP INITIATIVE';
      doc.text(subHeaderStr, pageWidth - margin - doc.getTextWidth(subHeaderStr), 11);
    }

    function addFooter(pageNum, totalPages) {
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text('Patent: NLR GROUP OF COMPANIES', margin, pageHeight - 12);
      var pageStr = 'Page ' + pageNum + ' of ' + totalPages;
      doc.text(pageStr, pageWidth - margin - doc.getTextWidth(pageStr), pageHeight - 12);
    }

    function printText(text, fontSize, style, color, spacingBefore, spacingAfter) {
      doc.setFont('Helvetica', style || 'normal');
      doc.setFontSize(fontSize || 10);
      doc.setTextColor(color.r, color.g, color.b);

      var lines = doc.splitTextToSize(text, contentWidth);
      var fontHeight = (fontSize * 0.3527);
      var lineHeight = fontHeight * 1.35;
      var blockHeight = spacingBefore + fontHeight + (lines.length - 1) * lineHeight + spacingAfter;

      if (y + blockHeight > pageHeight - 22) {
        doc.addPage();
        y = 25;
        drawPageTemplate();
      }

      y += spacingBefore;
      for (var i = 0; i < lines.length; i++) {
        var baseline = y + fontHeight + (i * lineHeight);
        doc.text(lines[i], margin, baseline);
      }
      y += fontHeight + (lines.length - 1) * lineHeight + spacingAfter;
    }

    function printHeading(text) {
      printText(text.toUpperCase(), 11, 'bold', { r: 201, g: 168, b: 76 }, 6, 3);
      doc.setDrawColor(230, 230, 230);
      doc.setLineWidth(0.2);
      doc.line(margin, y + 1, pageWidth - margin, y + 1);
      y += 3;
    }

    drawPageTemplate();

    printText('PROBLEM STATEMENT SPECIFICATION', 10, 'normal', { r: 120, g: 120, b: 120 }, 5, 2);
    printText(p.id + ': ' + p.t, 16, 'bold', { r: 20, g: 20, b: 20 }, 2, 8);

    var col1X = margin;
    var col2X = margin + 85;
    
    doc.setDrawColor(201, 168, 76);
    doc.setFillColor(248, 246, 240);
    doc.rect(margin, y, contentWidth, 32, 'F');
    
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    
    doc.text('CATEGORY:', col1X + 5, y + 8);
    doc.text('THEME:', col1X + 5, y + 16);
    doc.text('ORGANIZATION:', col1X + 5, y + 24);
    
    doc.text('PS ID:', col2X, y + 8);
    doc.text('DIVISION:', col2X, y + 16);
    doc.text('STATUS:', col2X, y + 24);
    
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(40, 40, 40);
    
    doc.text(p.d, col1X + 35, y + 8);
    doc.text(p.th, col1X + 35, y + 16);
    doc.text('NLR Group of Companies', col1X + 35, y + 24);
    
    doc.text(p.id, col2X + 25, y + 8);
    doc.text(p.th + ' Division', col2X + 25, y + 16);
    doc.text('Patented / Active', col2X + 25, y + 24);

    y += 38;

    printHeading('Detailed Problem Description');
    printText(p.detail || p.desc, 10, 'normal', { r: 60, g: 60, b: 60 }, 3, 5);

    if (p.solution) {
      printHeading('Proposed Solution Approach');
      var paras = p.solution.split('\n\n');
      paras.forEach(function (para) {
        if (para.trim()) {
          printText(para.trim(), 10, 'normal', { r: 60, g: 60, b: 60 }, 2, 4);
        }
      });
    }

    if (p.features && p.features.length) {
      printHeading('Key Features & Requirements');
      p.features.forEach(function (feat) {
        printText('•  ' + feat, 10, 'normal', { r: 60, g: 60, b: 60 }, 1.5, 1.5);
      });
      y += 3;
    }

    if (p.how && p.how.length) {
      printHeading('How It Works / Build Flow');
      p.how.forEach(function (step, index) {
        printText((index + 1) + '.  ' + step, 10, 'normal', { r: 60, g: 60, b: 60 }, 1.5, 1.5);
      });
      y += 3;
    }

    if (p.tags && p.tags.length) {
      printHeading('Recommended Tech Stack');
      var groups = buildStack(p.tags);
      if (groups.length) {
        groups.forEach(function (g) {
          printText(g.label + ': ' + g.items.join(', '), 10, 'normal', { r: 60, g: 60, b: 60 }, 1.5, 1.5);
        });
      } else {
        printText('General-purpose stack', 10, 'normal', { r: 60, g: 60, b: 60 }, 1.5, 1.5);
      }
      y += 3;
    }

    var boxHeight = 22;
    if (y + boxHeight > pageHeight - 22) {
      doc.addPage();
      y = 25;
      drawPageTemplate();
    }
    
    doc.setDrawColor(180, 50, 50);
    doc.setLineWidth(0.4);
    doc.setFillColor(253, 245, 245);
    doc.rect(margin, y + 4, contentWidth, boxHeight, 'F');
    doc.rect(margin, y + 4, contentWidth, boxHeight, 'S');

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(180, 50, 50);
    doc.text('INTELLECTUAL PROPERTY NOTICE & PATENT CLAIM', margin + 5, y + 10);
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(80, 80, 80);
    doc.text('This problem statement and its referenced solutions are the exclusive intellectual property of the NLR GROUP OF COMPANIES. Authorized for use only by members of the BlackPanthers Club.', margin + 5, y + 15, { maxWidth: contentWidth - 10 });

    var totalPages = doc.internal.getNumberOfPages();
    for (var i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      addFooter(i, totalPages);
    }

    var cleanTitle = p.t.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    doc.save(p.id + '_' + cleanTitle + '.pdf');
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

    // Access code elements
    els.codeModal = document.getElementById('psCodeModal');
    els.codeInput = document.getElementById('psCodeInput');
    els.codeError = document.getElementById('psCodeError');
    els.codeSubmit = document.getElementById('psCodeSubmit');
    els.codeClose = document.getElementById('psCodeClose');
    els.codeBackdrop = document.getElementById('psCodeBackdrop');

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

    // Detail modal events
    document.getElementById('psModalClose').addEventListener('click', closeModal);
    document.getElementById('psModalBackdrop').addEventListener('click', closeModal);

    els.downloadPdfBtn = document.getElementById('psDownloadPdfBtn');
    if (els.downloadPdfBtn) {
      els.downloadPdfBtn.addEventListener('click', function () {
        if (state.activeProblem) {
          downloadPdf(state.activeProblem);
        }
      });
    }

    // Access code modal events
    els.codeSubmit.addEventListener('click', submitCode);
    els.codeClose.addEventListener('click', closeCodeModal);
    els.codeBackdrop.addEventListener('click', closeCodeModal);
    els.codeInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') submitCode();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (els.codeModal.classList.contains('show')) {
          closeCodeModal();
        } else {
          closeModal();
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
