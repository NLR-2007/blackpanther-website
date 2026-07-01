(function () {
  'use strict';
  // Google Apps Script Web App URL for live form submissions
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx7nVehgg11UplmeXTOBy85xg_QpKwOR_MoW8Aj8HQ01RyQDU5cqux_5R9BfSNxSFn02g/exec";

  /* ---------- Ambient Particle Background ---------- */

  function initParticles() {
    var canvas = document.getElementById('applyCanvas');
    if (!canvas || !window.THREE) return;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    var c = document.createElement('canvas');
    c.width = 64;
    c.height = 64;
    var ctx = c.getContext('2d');
    var g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.35, 'rgba(255,255,255,0.6)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    var tex = new THREE.CanvasTexture(c);

    var count = window.innerWidth < 768 ? 300 : 600;
    var geo = new THREE.BufferGeometry();
    var pos = new Float32Array(count * 3);
    var velocities = new Float32Array(count * 3);

    for (var i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
      velocities[i * 3] = (Math.random() - 0.5) * 0.003;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    var mat = new THREE.PointsMaterial({
      color: 0xc9a84c,
      size: 0.02,
      map: tex,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    var points = new THREE.Points(geo, mat);
    scene.add(points);

    var clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      var t = clock.getElapsedTime();
      var positions = geo.attributes.position.array;

      for (var i = 0; i < count; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        if (Math.abs(positions[i * 3]) > 10) velocities[i * 3] *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 7) velocities[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 7) velocities[i * 3 + 2] *= -1;
      }

      geo.attributes.position.needsUpdate = true;
      points.rotation.y = t * 0.02;
      points.rotation.x = Math.sin(t * 0.1) * 0.05;
      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  /* ---------- Navigation ---------- */

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

  /* ---------- Scroll Reveal ---------- */

  function setupScrollReveal() {
    var reveals = document.querySelectorAll('.reveal:not(.revealed)');

    if (!('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('revealed'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- File Upload ---------- */

  function setupFileUpload() {
    var fileInput = document.getElementById('pitchDeck');
    var uploadZone = document.getElementById('uploadZone');
    var uploadContent = uploadZone.querySelector('.form-upload-content');
    var uploadSelected = document.getElementById('uploadSelected');
    var uploadFileName = document.getElementById('uploadFileName');
    var uploadRemove = document.getElementById('uploadRemove');

    fileInput.addEventListener('change', function () {
      if (fileInput.files.length > 0) {
        var file = fileInput.files[0];
        uploadFileName.textContent = file.name;
        uploadContent.style.display = 'none';
        uploadSelected.style.display = 'flex';
      }
    });

    uploadRemove.addEventListener('click', function (e) {
      e.stopPropagation();
      fileInput.value = '';
      uploadContent.style.display = 'block';
      uploadSelected.style.display = 'none';
    });

    ['dragenter', 'dragover'].forEach(function (evt) {
      uploadZone.addEventListener(evt, function (e) {
        e.preventDefault();
        uploadZone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(function (evt) {
      uploadZone.addEventListener(evt, function (e) {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
      });
    });

    uploadZone.addEventListener('drop', function (e) {
      var files = e.dataTransfer.files;
      if (files.length > 0) {
        fileInput.files = files;
        var event = new Event('change', { bubbles: true });
        fileInput.dispatchEvent(event);
      }
    });
  }

  /* ---------- Dynamic Member Fields ---------- */

  function setupDynamicMembers() {
    var totalInput = document.getElementById('totalMembers');
    var container = document.getElementById('membersContainer');
    var currentCount = 0;

    totalInput.addEventListener('input', function () {
      var count = parseInt(totalInput.value, 10);
      if (isNaN(count) || count < 1) {
        container.innerHTML = '';
        currentCount = 0;
        return;
      }
      if (count > 50) count = 50;
      generateMemberFields(count);
    });

    function generateMemberFields(count) {
      container.innerHTML = '';
      if (count > 0) {
        var label = document.createElement('span');
        label.className = 'members-label';
        label.textContent = 'Team Members';
        container.appendChild(label);
      }

      for (var i = 1; i <= count; i++) {
        var row = document.createElement('div');
        row.className = 'member-row';
        row.style.animationDelay = (i * 0.05) + 's';

        row.innerHTML =
          '<span class="member-num">' + String(i).padStart(2, '0') + '</span>' +
          '<div class="form-field">' +
            '<input type="text" id="memberName' + i + '" name="memberName' + i + '" required placeholder=" ">' +
            '<label for="memberName' + i + '">Full Name</label>' +
            '<div class="form-field-line"></div>' +
          '</div>' +
          '<div class="form-field">' +
            '<input type="text" id="memberRoll' + i + '" name="memberRoll' + i + '" required placeholder=" ">' +
            '<label for="memberRoll' + i + '">Roll No. / College ID</label>' +
            '<div class="form-field-line"></div>' +
          '</div>';

        container.appendChild(row);
      }
      currentCount = count;
    }
  }

  /* ---------- Leader / Co-Founder Toggle ---------- */

  function setupLeaderToggle() {
    var checkbox = document.getElementById('leaderIsCofounder');
    var leaderGroup = document.getElementById('leaderEmailGroup');
    var cofounderGroup = document.getElementById('cofounderEmailGroup');

    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        leaderGroup.style.display = 'none';
        cofounderGroup.style.display = 'none';
      } else {
        leaderGroup.style.display = '';
        cofounderGroup.style.display = '';
      }
    });
  }

  /* ---------- Form Validation & Submission ---------- */

  function setupForm() {
    var form = document.getElementById('applicationForm');
    var modal = document.getElementById('successModal');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      clearErrors();

      var valid = true;

      var fields = [
        { id: 'teamName', msg: 'Team name is required' },
        { id: 'totalMembers', msg: 'Number of teammates is required' },
        { id: 'founderName', msg: 'Founder name is required' },
        { id: 'founderEmail', msg: 'Founder email is required', email: true },
      ];

      var checkbox = document.getElementById('leaderIsCofounder');
      if (!checkbox.checked) {
        fields.push({ id: 'leaderEmail', msg: 'Team leader email is required', email: true });
        fields.push({ id: 'cofounderEmail', msg: 'Co-founder email is required', email: true });
      }

      fields.forEach(function (f) {
        var el = document.getElementById(f.id);
        var val = el.value.trim();
        if (!val) {
          showError(el, f.msg);
          valid = false;
        } else if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          showError(el, 'Please enter a valid email address');
          valid = false;
        }
      });

      var count = parseInt(document.getElementById('totalMembers').value, 10) || 0;
      for (var i = 1; i <= count; i++) {
        var nameEl = document.getElementById('memberName' + i);
        var rollEl = document.getElementById('memberRoll' + i);
        if (nameEl && !nameEl.value.trim()) {
          showError(nameEl, 'Name is required');
          valid = false;
        }
        if (rollEl && !rollEl.value.trim()) {
          showError(rollEl, 'Roll number is required');
          valid = false;
        }
      }

      var fileInput = document.getElementById('pitchDeck');
      if (!fileInput.files || fileInput.files.length === 0) {
        var uploadZone = document.getElementById('uploadZone');
        uploadZone.style.borderColor = '#c94c4c';
        valid = false;
      }

      if (!valid) {
        var firstError = form.querySelector('.form-field.error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // Start submission process
      var submitBtn = form.querySelector('.btn-submit');
      var submitText = submitBtn.querySelector('span');
      var originalText = submitText.textContent;
      
      // Show loading state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      submitText.textContent = 'Submitting Application...';

      // Gather form inputs
      var teamName = document.getElementById('teamName').value.trim();
      var totalMembers = parseInt(document.getElementById('totalMembers').value, 10) || 0;
      var founderName = document.getElementById('founderName').value.trim();
      var founderEmail = document.getElementById('founderEmail').value.trim();
      var leaderIsCofounder = document.getElementById('leaderIsCofounder').checked;
      var leaderEmail = leaderIsCofounder ? "" : document.getElementById('leaderEmail').value.trim();
      var cofounderEmail = leaderIsCofounder ? "" : document.getElementById('cofounderEmail').value.trim();

      // Teammate details
      var teammates = [];
      for (var i = 1; i <= totalMembers; i++) {
        var nameEl = document.getElementById('memberName' + i);
        var rollEl = document.getElementById('memberRoll' + i);
        if (nameEl && rollEl) {
          teammates.push({
            name: nameEl.value.trim(),
            roll: rollEl.value.trim()
          });
        }
      }

      // Read pitch deck file
      var fileInput = document.getElementById('pitchDeck');
      var file = fileInput.files[0];
      var reader = new FileReader();

      reader.onload = function (event) {
        var payload = {
          teamName: teamName,
          totalMembers: totalMembers,
          founderName: founderName,
          founderEmail: founderEmail,
          leaderIsCofounder: leaderIsCofounder,
          leaderEmail: leaderEmail,
          cofounderEmail: cofounderEmail,
          teammates: teammates,
          file: {
            base64: event.target.result,
            filename: file.name,
            mimeType: file.type
          }
        };

        if (!APPS_SCRIPT_URL) {
          // Fallback / Mock mode when URL is not configured
          console.warn("Google Apps Script URL (APPS_SCRIPT_URL) is not set in apply.js.");
          console.log("Mock Form Payload:", payload);
          setTimeout(function () {
            resetButtonState();
            form.reset();
            // Reset custom file upload zone UI
            var uploadContent = document.querySelector('.form-upload-content');
            var uploadSelected = document.getElementById('uploadSelected');
            if (uploadContent && uploadSelected) {
              uploadContent.style.display = 'block';
              uploadSelected.style.display = 'none';
            }
            // Clear dynamic members
            var container = document.getElementById('membersContainer');
            if (container) container.innerHTML = '';
            
            modal.classList.add('show');
          }, 1500);
          return;
        }

        // Detect if running from local file protocol (CORS is restricted on file://)
        var isLocalFile = window.location.protocol === 'file:';

        // Live submission to Google Sheets & Drive
        fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: isLocalFile ? 'no-cors' : 'cors',
          body: JSON.stringify(payload)
        })
          .then(function (response) {
            if (isLocalFile) {
              // In no-cors mode, we can't read the response payload, so we assume success
              return { success: true };
            }
            return response.json();
          })
          .then(function (res) {
            resetButtonState();
            if (res.success) {
              form.reset();
              // Reset file upload zone UI
              var uploadContent = document.querySelector('.form-upload-content');
              var uploadSelected = document.getElementById('uploadSelected');
              if (uploadContent && uploadSelected) {
                uploadContent.style.display = 'block';
                uploadSelected.style.display = 'none';
              }
              // Clear dynamic members
              var container = document.getElementById('membersContainer');
              if (container) container.innerHTML = '';
              
              modal.classList.add('show');
            } else {
              alert("Error submitting application: " + (res.error || "Please try again later."));
            }
          })
          .catch(function (error) {
            resetButtonState();
            console.error("Submission failed:", error);
            if (isLocalFile) {
              // Fallback for local files: sometimes redirects trigger catch block, but write still completes
              form.reset();
              var uploadContent = document.querySelector('.form-upload-content');
              var uploadSelected = document.getElementById('uploadSelected');
              if (uploadContent && uploadSelected) {
                uploadContent.style.display = 'block';
                uploadSelected.style.display = 'none';
              }
              var container = document.getElementById('membersContainer');
              if (container) container.innerHTML = '';
              modal.classList.add('show');
            } else {
              alert("Submission failed. Please check your internet connection or verify the Apps Script Web App configuration.");
            }
          });
      };

      reader.onerror = function () {
        resetButtonState();
        alert("Error reading file. Please check file permissions and try again.");
      };

      reader.readAsDataURL(file);

      function resetButtonState() {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitText.textContent = originalText;
      }
    });

    function showError(input, msg) {
      var field = input.closest('.form-field');
      field.classList.add('error');
      var err = document.createElement('p');
      err.className = 'form-error-msg';
      err.textContent = msg;
      field.parentElement.appendChild(err);
    }

    function clearErrors() {
      form.querySelectorAll('.form-field.error').forEach(function (el) {
        el.classList.remove('error');
      });
      form.querySelectorAll('.form-error-msg').forEach(function (el) {
        el.remove();
      });
      var uploadZone = document.getElementById('uploadZone');
      uploadZone.style.borderColor = '';
    }

    form.addEventListener('input', function (e) {
      var field = e.target.closest('.form-field');
      if (field && field.classList.contains('error')) {
        field.classList.remove('error');
        var errMsg = field.parentElement.querySelector('.form-error-msg');
        if (errMsg) errMsg.remove();
      }
    });
  }

  /* ---------- Smooth Scroll ---------- */

  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          var top = target.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ---------- Init ---------- */

  function init() {
    initParticles();
    setupNav();
    setupScrollReveal();
    setupDynamicMembers();
    setupLeaderToggle();
    setupFileUpload();
    setupForm();
    setupSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
