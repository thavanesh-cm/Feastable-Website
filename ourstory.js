/* ========================================
   OUR STORY — Page Interactions
   Scroll-driven reveals, parallax, sticky bar
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ──────────────────────────────────────
  // 1. Scroll-Driven Reveal Animations
  // ──────────────────────────────────────
  const revealElements = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ──────────────────────────────────────
  // 2. Parallax Floating Elements
  // ──────────────────────────────────────
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;

    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const offset = (centerY - viewportCenter) * speed * 0.3;

      el.style.transform = `translateY(${offset}px)`;
    });

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ──────────────────────────────────────
  // 3. Sticky Bottom Bar — Dismiss
  // ──────────────────────────────────────
  const stickyBar = document.getElementById('osStickyBar');
  const stickyClose = document.getElementById('osStickyClose');

  if (stickyClose && stickyBar) {
    stickyClose.addEventListener('click', () => {
      stickyBar.classList.add('dismissed');
    });
  }

  // ──────────────────────────────────────
  // 4. Counter Animation for Stats
  // ──────────────────────────────────────
  const counters = document.querySelectorAll('.os-counter');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = target * eased;

      if (target % 1 !== 0) {
        el.textContent = current.toFixed(1) + suffix;
      } else {
        el.textContent = Math.floor(current).toLocaleString() + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  // ──────────────────────────────────────
  // 5. Smooth Scroll for Anchor Links
  // ──────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ──────────────────────────────────────
  // 6. Hero Title Magnetic Mouse Follow
  // ──────────────────────────────────────
  const heroTitle = document.getElementById('osHeroTitle');
  const heroSection = document.getElementById('osHero');

  if (heroTitle && heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      heroTitle.style.transform = `
        translate(${x * 12}px, ${y * 8}px)
        scale(1)
      `;
    });

    heroSection.addEventListener('mouseleave', () => {
      heroTitle.style.transform = 'translate(0, 0) scale(1)';
      heroTitle.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        heroTitle.style.transition = '';
      }, 500);
    });
  }

  // ──────────────────────────────────────
  // 7. Tilt Effect on Polaroid Cards
  // ──────────────────────────────────────
  const polaroids = document.querySelectorAll('.os-mission__polaroid');

  polaroids.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const tiltX = (y - 0.5) * 10;
      const tiltY = (x - 0.5) * -10;

      card.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        card.style.transition = '';
      }, 500);
    });
  });

  // ──────────────────────────────────────
  // 8. Cart badge update (from cart.js)
  // ──────────────────────────────────────
  if (typeof getCart === 'function') {
    const cart = getCart();
    const badge = document.querySelector('.header__cart-count');
    if (badge && cart.length > 0) {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      badge.textContent = totalItems;
      badge.style.display = 'flex';
    }
  }
});
