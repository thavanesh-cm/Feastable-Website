/* ========================================
   ETHICAL SOURCING PAGE — JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ========================================
  // 1. FAQ Accordion Toggle Mechanism
  // ========================================
  const accordionBtns = document.querySelectorAll('.es-accordion-btn');

  accordionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Check current state
      const isExpanded = this.getAttribute('aria-expanded') === 'true';

      // Optional: Close all other accordions first (accordion behavior vs independent panels)
      // accordionBtns.forEach(b => b.setAttribute('aria-expanded', 'false'));

      // Toggle current panel
      if (isExpanded) {
        this.setAttribute('aria-expanded', 'false');
      } else {
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ========================================
  // 2. Scroll-Driven Reveal Animations
  // ========================================
  const revealElements = document.querySelectorAll('[data-reveal]');

  // Initialize elements to be hidden (handled in CSS, but good to ensure JS runs before showing)
  // The IntersectionObserver will add the 'visible' class when they enter the viewport.

  const observerOptions = {
    root: null, // use viewport
    rootMargin: '0px 0px -50px 0px', // trigger slightly before bottom of screen
    threshold: 0.15 // trigger when 15% of the element is visible
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing once revealed to keep it visible
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Small delay to trigger reveals for elements already in viewport on load
  setTimeout(() => {
    const heroTitle = document.querySelector('.es-hero__title');
    if (heroTitle) {
      heroTitle.classList.add('visible');
    }
  }, 100);

});
