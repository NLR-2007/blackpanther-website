/* ============================================
   BLACKPANTHERS CLUB — Script
   ============================================ */

(function () {
  'use strict';

  /* ---------- Three.js Particle Scene ---------- */

  class ParticleHero {
    constructor(canvas) {
      this.canvas = canvas;
      this.mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      this.frameId = null;
      this.init();
      this.createParticles();
      this.bindEvents();
      this.animate();
    }

    init() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.z = 5;

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        antialias: true,
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      this.clock = new THREE.Clock();
      this.group = new THREE.Group();
      this.scene.add(this.group);
    }

    createParticleTexture() {
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
      return new THREE.CanvasTexture(c);
    }

    createParticles() {
      var tex = this.createParticleTexture();

      /* --- Main sphere --- */
      var sphereCount = window.innerWidth < 768 ? 800 : 1500;
      var geo = new THREE.BufferGeometry();
      var pos = new Float32Array(sphereCount * 3);
      this.basePositions = new Float32Array(sphereCount * 3);
      this.sphereCount = sphereCount;
      var r = 2;

      for (var i = 0; i < sphereCount; i++) {
        var phi = Math.acos(1 - 2 * (i + 0.5) / sphereCount);
        var theta = Math.PI * (1 + Math.sqrt(5)) * i;
        var x = r * Math.sin(phi) * Math.cos(theta);
        var y = r * Math.sin(phi) * Math.sin(theta);
        var z = r * Math.cos(phi);
        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;
        this.basePositions[i * 3] = x;
        this.basePositions[i * 3 + 1] = y;
        this.basePositions[i * 3 + 2] = z;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

      var mat = new THREE.PointsMaterial({
        color: 0xc9a84c,
        size: 0.035,
        map: tex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      this.sphere = new THREE.Points(geo, mat);
      this.group.add(this.sphere);

      /* --- Inner glow layer --- */
      var glowCount = Math.floor(sphereCount * 0.3);
      var glowGeo = new THREE.BufferGeometry();
      var glowPos = new Float32Array(glowCount * 3);
      var rInner = 1.7;

      for (var j = 0; j < glowCount; j++) {
        var p = Math.acos(1 - 2 * (j + 0.5) / glowCount);
        var t = Math.PI * (1 + Math.sqrt(5)) * j;
        glowPos[j * 3] = rInner * Math.sin(p) * Math.cos(t);
        glowPos[j * 3 + 1] = rInner * Math.sin(p) * Math.sin(t);
        glowPos[j * 3 + 2] = rInner * Math.cos(p);
      }

      glowGeo.setAttribute('position', new THREE.BufferAttribute(glowPos, 3));

      var glowMat = new THREE.PointsMaterial({
        color: 0xe8d5a3,
        size: 0.06,
        map: tex,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      this.glow = new THREE.Points(glowGeo, glowMat);
      this.group.add(this.glow);

      /* --- Ambient dust --- */
      var dustCount = window.innerWidth < 768 ? 200 : 400;
      var dustGeo = new THREE.BufferGeometry();
      var dustPos = new Float32Array(dustCount * 3);

      for (var k = 0; k < dustCount; k++) {
        dustPos[k * 3] = (Math.random() - 0.5) * 18;
        dustPos[k * 3 + 1] = (Math.random() - 0.5) * 18;
        dustPos[k * 3 + 2] = (Math.random() - 0.5) * 18;
      }

      dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));

      var dustMat = new THREE.PointsMaterial({
        color: 0xc9a84c,
        size: 0.012,
        map: tex,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      this.dust = new THREE.Points(dustGeo, dustMat);
      this.scene.add(this.dust);
    }

    animate() {
      this.frameId = requestAnimationFrame(this.animate.bind(this));

      var t = this.clock.getElapsedTime();
      var positions = this.sphere.geometry.attributes.position.array;

      for (var i = 0; i < this.sphereCount; i++) {
        var ix = i * 3;
        var iy = i * 3 + 1;
        var iz = i * 3 + 2;
        var bx = this.basePositions[ix];
        var by = this.basePositions[iy];
        var bz = this.basePositions[iz];

        var wave =
          1 +
          0.07 *
            Math.sin(t * 0.7 + bx * 2.5) *
            Math.cos(t * 0.5 + by * 2.5) *
            Math.sin(t * 0.3 + bz * 2.5);

        positions[ix] = bx * wave;
        positions[iy] = by * wave;
        positions[iz] = bz * wave;
      }

      this.sphere.geometry.attributes.position.needsUpdate = true;

      this.group.rotation.y += 0.002;
      this.group.rotation.x += 0.0008;

      this.glow.rotation.y -= 0.001;
      this.dust.rotation.y += 0.0003;
      this.dust.rotation.x -= 0.0001;

      this.mouse.tx += (this.mouse.x - this.mouse.tx) * 0.03;
      this.mouse.ty += (this.mouse.y - this.mouse.ty) * 0.03;

      this.camera.position.x = this.mouse.tx * 1.2;
      this.camera.position.y = -this.mouse.ty * 1.2;
      this.camera.lookAt(this.scene.position);

      this.renderer.render(this.scene, this.camera);
    }

    bindEvents() {
      var self = this;

      window.addEventListener('mousemove', function (e) {
        self.mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        self.mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      window.addEventListener('resize', function () {
        self.camera.aspect = window.innerWidth / window.innerHeight;
        self.camera.updateProjectionMatrix();
        self.renderer.setSize(window.innerWidth, window.innerHeight);
        self.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      });
    }

    destroy() {
      if (this.frameId) cancelAnimationFrame(this.frameId);
      this.renderer.dispose();
    }
  }

  /* ---------- Loader ---------- */

  function hideLoader() {
    var loader = document.getElementById('loader');
    if (!loader) return;
    
    // Step 1: Trigger the eye flare animation
    setTimeout(function () {
      loader.classList.add('flaring');
    }, 1800);

    // Step 2: Fade out the loader and reveal the website after the flare covers the screen
    setTimeout(function () {
      loader.classList.add('hidden');
      triggerHeroReveal();
    }, 2800);
  }

  function triggerHeroReveal() {
    var heroReveals = document.querySelectorAll('.hero .reveal');
    heroReveals.forEach(function (el, i) {
      setTimeout(function () {
        el.classList.add('revealed');
      }, i * 100);
    });
  }

  /* ---------- Navigation ---------- */

  function setupNav() {
    var nav = document.getElementById('nav');
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('mobileMenu');
    var lastScroll = 0;

    window.addEventListener('scroll', function () {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollY > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      lastScroll = scrollY;
    });

    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        toggle.classList.toggle('active');
        menu.classList.toggle('open');
        document.body.style.overflow = menu.classList.contains('open')
          ? 'hidden'
          : '';
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
    var reveals = document.querySelectorAll('.reveal:not(.hero .reveal)');

    if (!('IntersectionObserver' in window)) {
      reveals.forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Smooth Scroll ---------- */

  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          var offset = 80;
          var top =
            target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ---------- Animated Counters ---------- */

  function setupCounters() {
    var statValues = document.querySelectorAll('.stat-value');
    if (!statValues.length) return;

    var observed = false;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !observed) {
          observed = true;
          animateCounters();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(document.querySelector('.about-right'));

    function animateCounters() {
      statValues.forEach(function (el) {
        var text = el.textContent.trim();
        var numMatch = text.match(/^(\d+)/);
        if (!numMatch) return;
        var target = parseInt(numMatch[1], 10);
        var suffix = text.replace(/^\d+/, '');
        var duration = 1200;
        var start = performance.now();

        function update(now) {
          var elapsed = now - start;
          var progress = Math.min(elapsed / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = Math.round(target * eased);
          el.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
      });
    }
  }

  /* ---------- Magnetic Hover on Cards ---------- */

  function setupMagneticCards() {
    var cards = document.querySelectorAll('.offer-card, .stat-card');

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        card.style.transform = 'translateY(-4px) rotateX(' + (-y * 0.04) + 'deg) rotateY(' + (x * 0.04) + 'deg)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ---------- Init ---------- */

  function init() {
    var canvas = document.getElementById('heroCanvas');
    if (canvas && window.THREE) {
      new ParticleHero(canvas);
    }

    hideLoader();
    setupNav();
    setupScrollReveal();
    setupSmoothScroll();
    setupCounters();
    setupMagneticCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
