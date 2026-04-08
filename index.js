/* ========================================
   FEASTABLES — Main JavaScript
   Hero scroll animation + interactivity
   ======================================== */

(function () {
  'use strict';

  // ========================================
  // 1. HERO SCROLL-SYNCED CANVAS ANIMATION
  //    Lerp-interpolated for buttery 60fps
  // ========================================

  const TOTAL_FRAMES = 204;
  const FRAME_PATH = 'heroanimation/imagesha/ezgif-frame-';
  const HERO_SCROLL_DISTANCE = 1200; // total px of scroll for the full animation
  const LERP_SPEED = 0.08; // interpolation factor (lower = smoother/slower glide)

  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');
  const heroSection = document.getElementById('heroSection');
  const loaderFill = document.getElementById('loaderFill');
  const loaderText = document.getElementById('loaderText');
  const heroLoader = document.getElementById('heroLoader');
  const scrollHint = document.getElementById('scrollHint');

  // Set hero section height: viewport + scroll distance
  heroSection.style.height = (window.innerHeight + HERO_SCROLL_DISTANCE) + 'px';

  // Frame image storage
  const frames = new Array(TOTAL_FRAMES);
  let imagesLoaded = 0;
  let animationReady = false;

  // Smooth interpolation state
  let targetFrame = 0;   // where scroll says we should be
  let displayFrame = 0;  // what's actually rendered (float, lerped)
  let lastDrawnFrame = -1;

  // Format frame number with leading zeros
  function padNumber(num) {
    return String(num).padStart(3, '0');
  }

  // Set canvas dimensions for 16:9
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = Math.round(width * 9 / 16);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Update hero height on resize
    heroSection.style.height = (window.innerHeight + HERO_SCROLL_DISTANCE) + 'px';

    // Redraw current frame on resize
    if (animationReady && lastDrawnFrame >= 0 && frames[lastDrawnFrame]) {
      drawFrame(lastDrawnFrame);
    }
  }

  // Draw a specific frame to canvas
  function drawFrame(index) {
    if (!frames[index]) return;
    const img = frames[index];
    const cw = canvas.width / (window.devicePixelRatio || 1);
    const ch = canvas.height / (window.devicePixelRatio || 1);

    // Cover-fit the image into the canvas
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;
    let drawW, drawH, drawX, drawY;

    if (imgRatio > canvasRatio) {
      drawH = ch;
      drawW = ch * imgRatio;
      drawX = (cw - drawW) / 2;
      drawY = 0;
    } else {
      drawW = cw;
      drawH = cw / imgRatio;
      drawX = 0;
      drawY = (ch - drawH) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }

  // Preload all frames
  function preloadFrames() {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH + padNumber(i) + '.jpg';
      img.onload = function () {
        frames[i - 1] = img;
        imagesLoaded++;
        const pct = Math.round((imagesLoaded / TOTAL_FRAMES) * 100);
        loaderFill.style.width = pct + '%';
        loaderText.textContent = 'Loading experience... ' + pct + '%';

        if (imagesLoaded === TOTAL_FRAMES) {
          animationReady = true;
          heroLoader.classList.add('loaded');
          scrollHint.classList.remove('hidden');
          lastDrawnFrame = 0;
          drawFrame(0);
          startRenderLoop();
        }
      };
      img.onerror = function () {
        imagesLoaded++;
        const pct = Math.round((imagesLoaded / TOTAL_FRAMES) * 100);
        loaderFill.style.width = pct + '%';
        if (imagesLoaded === TOTAL_FRAMES) {
          animationReady = true;
          heroLoader.classList.add('loaded');
          lastDrawnFrame = 0;
          drawFrame(0);
          startRenderLoop();
        }
      };
    }
  }

  // Calculate the target frame from scroll position
  function updateTargetFrame() {
    if (!animationReady) return;

    const rect = heroSection.getBoundingClientRect();
    const scrolled = Math.max(0, -rect.top);
    const progress = Math.min(1, scrolled / HERO_SCROLL_DISTANCE);

    targetFrame = progress * (TOTAL_FRAMES - 1);

    // Hide scroll hint after scrolling a bit
    if (progress > 0.03) {
      scrollHint.classList.add('hidden');
    } else {
      scrollHint.classList.remove('hidden');
    }
  }

  // Continuous 60fps render loop with lerp interpolation
  function startRenderLoop() {
    function tick() {
      if (!animationReady) {
        requestAnimationFrame(tick);
        return;
      }

      // Lerp displayFrame toward targetFrame
      const diff = targetFrame - displayFrame;
      if (Math.abs(diff) > 0.1) {
        displayFrame += diff * LERP_SPEED;
      } else {
        displayFrame = targetFrame;
      }

      // Only redraw when the integer frame changes
      const frameIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(displayFrame)));
      if (frameIndex !== lastDrawnFrame && frames[frameIndex]) {
        lastDrawnFrame = frameIndex;
        drawFrame(frameIndex);
      }

      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ========================================
  // 2. HEADER SCROLL EFFECT
  // ========================================

  const header = document.getElementById('header');

  function updateHeaderShadow() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // ========================================
  // 3. SCROLL REVEAL ANIMATIONS
  // ========================================

  const revealElements = document.querySelectorAll('.reveal');

  function checkReveal() {
    const trigger = window.innerHeight * 0.85;
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < trigger) {
        el.classList.add('visible');
      }
    });
  }

  // ========================================
  // 4. COMMUNITY CAROUSEL NAVIGATION
  // ========================================

  const carousel = document.getElementById('communityCarousel');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  if (prevBtn && nextBtn && carousel) {
    prevBtn.addEventListener('click', function () {
      carousel.scrollBy({ left: -300, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', function () {
      carousel.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }

  // ========================================
  // 5. PRODUCT PAGINATOR DOTS
  // ========================================

  const dots = document.querySelectorAll('.products__dot');
  dots.forEach(dot => {
    dot.addEventListener('click', function () {
      dots.forEach(d => d.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ========================================
  // 6. SMOOTH NAV SCROLL
  // ========================================

  document.querySelectorAll('.header__nav a:not([data-flyout-toggle])').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ========================================
  // 6B. SHOP FLYOUT MENU
  // ========================================

  const FLYOUT_CATALOG = {
    categories: [
      { id: 'all', name: 'All Products', emoji: '🛍️' },
      { id: 'chocolate', name: 'Chocolate', emoji: '🍫' },
      { id: 'cups', name: 'Cups', emoji: '🥜' },
      { id: 'gummies', name: 'Gummies', emoji: '🍬' },
      { id: 'milk', name: 'Milk', emoji: '🥛' },
      { id: 'bundles', name: 'Bundles', emoji: '📦' },
      { id: 'limited', name: 'Limited Time', emoji: '⏳' },
      { id: 'merch', name: 'Merch', emoji: '👕' },
      { id: 'mario', name: 'Super Mario', emoji: '⭐' },
      { id: 'easter', name: 'Easter', emoji: '🐣' }
    ],
    products: [
      // Chocolate
      { slug: 'milk-chocolate-bar', name: 'Milk Chocolate Bar', price: 24.99, image: 'images/milk-chocolate-bar.png', category: 'chocolate' },
      { slug: 'dark-chocolate-bar', name: 'Dark Chocolate Bar', price: 24.99, image: 'images/dark-chocolate-bar.png', category: 'chocolate' },
      { slug: 'cookies-cream-bar', name: 'Cookies & Cream Bar', price: 24.99, image: 'images/cookies-cream-bar.png', category: 'chocolate' },
      { slug: 'almond-chocolate-bar', name: 'Almond Chocolate Bar', price: 24.99, image: 'images/almond-chocolate-bar.png', category: 'chocolate' },
      { slug: 'crunch-chocolate-bar', name: 'Original Crunch Bar', price: 24.99, image: 'images/crunch-chocolate-bar.png', category: 'chocolate' },
      { slug: 'pretzel-mint-crunch', name: 'Pretzel Mint Crunch', price: 35.99, image: 'images/pretzel-mint.png', category: 'chocolate' },
      { slug: 'hot-cocoa-crunch', name: 'Hot Cocoa Crunch', price: 24.99, image: 'images/hot-cocoa.png', category: 'chocolate' },
      { slug: 'peanut-butter-bar', name: 'Peanut Butter Bar', price: 22.99, image: 'images/peanut-butter.png', category: 'chocolate' },
      { slug: 'quinoa-crunch', name: 'Chocolate Candy Assortment', price: 19.99, image: 'images/quinoa-crunch.png', category: 'chocolate' },
      // Cups
      { slug: 'pb-cups-classic', name: 'Peanut Butter Cups Classic', price: 19.99, image: 'images/pb-cups-classic.png', category: 'cups' },
      { slug: 'pb-cups-dark', name: 'Peanut Butter Cups Dark', price: 19.99, image: 'images/pb-cups-dark.png', category: 'cups' },
      { slug: 'pb-cups-white', name: 'Peanut Butter Cups White', price: 19.99, image: 'images/pb-cups-white.png', category: 'cups' },
      // Gummies
      { slug: 'sour-gummies-berry', name: 'Sour Gummies Berry Blast', price: 14.99, image: 'images/sour-gummies-berry.png', category: 'gummies' },
      { slug: 'sour-gummies-tropical', name: 'Sour Gummies Tropical', price: 14.99, image: 'images/sour-gummies-tropical.png', category: 'gummies' },
      { slug: 'gummy-worms', name: 'Gummy Worms', price: 12.99, image: 'images/gummy-worms.png', category: 'gummies' },
      { slug: 'soar-boost-cosmic-berry', name: 'Soar Boost Cosmic Berry', price: 24.99, image: 'images/soar-boost.png', category: 'gummies' },
      { slug: 'valentine-sour-strike', name: "Valentine's Assorted Sour Strike", price: 24.99, image: 'images/valentine-sour.png', category: 'gummies' },
      // Milk
      { slug: 'chocolate-milk', name: 'Chocolate Milk', price: 9.99, image: 'images/chocolate-milk.png', category: 'milk' },
      { slug: 'strawberry-milk', name: 'Strawberry Milk', price: 9.99, image: 'images/strawberry-milk.png', category: 'milk' },
      // Bundles
      { slug: 'ultimate-bundle', name: 'Ultimate Feastables Bundle', price: 59.99, image: 'images/ultimate-bundle.png', category: 'bundles' },
      { slug: 'chocolate-lover-bundle', name: 'Chocolate Lover Bundle', price: 44.99, image: 'images/chocolate-lover-bundle.png', category: 'bundles' },
      { slug: 'beast-games-bundle', name: 'Beast Games 2 Bundle', price: 15.00, image: 'images/beast-games-bundle.png', category: 'bundles' },
      // Limited Time
      { slug: 'limited-edition-mystery', name: 'Limited Edition Mystery Bar', price: 29.99, image: 'images/limited-edition-1.png', category: 'limited' },
      // Merch
      { slug: 'merch-hoodie', name: 'Feastables Hoodie', price: 54.99, image: 'images/merch-hoodie.png', category: 'merch' },
      { slug: 'merch-tshirt', name: 'Feastables T-Shirt', price: 29.99, image: 'images/merch-tshirt.png', category: 'merch' },
      { slug: 'merch-hat', name: 'Feastables Hat', price: 24.99, image: 'images/merch-hat.png', category: 'merch' },
      // Super Mario
      { slug: 'mario-galaxy-cocoa-crunch', name: 'Mario Galaxy Cocoa Crunch', price: 29.99, image: 'images/mario-galaxy.png', category: 'mario' },
      { slug: 'soar-boost-mario', name: 'Soar Boost Cosmic Berry', price: 24.99, image: 'images/soar-boost.png', category: 'mario' },
      { slug: 'yoshi-x-chocolate', name: 'Yoshi X Chocolate Box', price: 34.99, image: 'images/yoshi-x.png', category: 'mario' },
      // Easter
      { slug: 'easter-variety-bag', name: 'Easter Snack-Size Variety Bag', price: 10.00, image: 'images/easter-variety.png', category: 'easter' }
    ]
  };

  const shopFlyout = document.getElementById('shopFlyout');
  const flyoutBackdrop = document.getElementById('flyoutBackdrop');
  const flyoutClose = document.getElementById('flyoutClose');
  const flyoutCategories = document.getElementById('flyoutCategories');
  const flyoutGrid = document.getElementById('flyoutGrid');
  const flyoutGridTitle = document.getElementById('flyoutGridTitle');
  const shopToggle = document.querySelector('[data-flyout-toggle]');

  let currentCategory = 'all';

  function openFlyout() {
    shopFlyout.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeFlyout() {
    shopFlyout.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Build category sidebar
  function buildCategories() {
    flyoutCategories.innerHTML = '';
    FLYOUT_CATALOG.categories.forEach(cat => {
      const count = cat.id === 'all'
        ? FLYOUT_CATALOG.products.length
        : FLYOUT_CATALOG.products.filter(p => p.category === cat.id).length;
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="#" data-category="${cat.id}" class="${cat.id === currentCategory ? 'active' : ''}">
          <span class="flyout-cat-emoji">${cat.emoji}</span>
          ${cat.name}
          <span class="flyout-cat-count">${count}</span>
        </a>`;
      li.querySelector('a').addEventListener('click', function (e) {
        e.preventDefault();
        currentCategory = cat.id;
        // Update active states
        flyoutCategories.querySelectorAll('a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
        // Update grid
        renderFlyoutGrid();
        // Update title
        flyoutGridTitle.textContent = cat.name;
      });
      flyoutCategories.appendChild(li);
    });
  }

  // Build product grid
  function renderFlyoutGrid() {
    const filtered = currentCategory === 'all'
      ? FLYOUT_CATALOG.products
      : FLYOUT_CATALOG.products.filter(p => p.category === currentCategory);

    flyoutGrid.innerHTML = '';
    filtered.forEach(product => {
      const card = document.createElement('a');
      card.className = 'flyout-product-card';
      card.href = `product?product=${product.slug}`;
      card.innerHTML = `
        <div class="flyout-product-card__image">
          <img src="${product.image}" alt="${product.name}" class="flyout-product-card__photo" loading="lazy"
               onerror="this.parentElement.innerHTML='<div class=\\'flyout-product-card__placeholder\\'>${getCategoryEmoji(product.category)}</div>'">
        </div>
        <div class="flyout-product-card__info">
          <div class="flyout-product-card__name">${product.name}</div>
          <div class="flyout-product-card__price">$${product.price.toFixed(2)}</div>
        </div>`;
      flyoutGrid.appendChild(card);
    });
  }

  function getCategoryEmoji(categoryId) {
    const cat = FLYOUT_CATALOG.categories.find(c => c.id === categoryId);
    return cat ? cat.emoji : '🍫';
  }

  // Event bindings
  if (shopToggle) {
    shopToggle.addEventListener('click', function (e) {
      e.preventDefault();
      if (shopFlyout.classList.contains('open')) {
        closeFlyout();
      } else {
        openFlyout();
      }
    });
  }

  if (flyoutClose) flyoutClose.addEventListener('click', closeFlyout);
  if (flyoutBackdrop) flyoutBackdrop.addEventListener('click', closeFlyout);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && shopFlyout.classList.contains('open')) {
      closeFlyout();
    }
  });

  // Initialize flyout
  buildCategories();
  renderFlyoutGrid();

  // ========================================
  // 7. MAIN SCROLL LISTENER (raf-throttled)
  // ========================================

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateTargetFrame();
        updateHeaderShadow();
        checkReveal();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    resizeCanvas();
  });

  // ========================================
  // 8. ADD TO CART LOGIC
  // ========================================
  
  const productData = {
    'addToBag-1': { id: 'prod-1', name: 'Mario Galaxy Cocoa Crunch', price: 29.99, image: 'images/mario-galaxy.png' },
    'addToBag-2': { id: 'prod-2', name: 'Soar Boost Cosmic Berry', price: 24.99, image: 'images/soar-boost.png' },
    'addToBag-3': { id: 'prod-3', name: 'Yoshi X Chocolate Box', price: 34.99, image: 'images/yoshi-x.png' },
    'addToBag-4': { id: 'prod-4', name: 'Chocolate Candy Assortment', price: 19.99, image: 'images/quinoa-crunch.png' },
    'addToBag-5': { id: 'prod-5', name: "Valentine's Assorted Sour Strike", price: 24.99, image: 'images/valentine-sour.png' },
    'addToBag-6': { id: 'prod-6', name: 'Easter Snack-Size Variety Bag', price: 10.00, image: 'images/easter-variety.png' },
    'addToBag-7': { id: 'prod-7', name: 'Beast Games 2 Bundle', price: 15.00, image: 'images/beast-games-bundle.png' },
    'addToBag-8': { id: 'prod-8', name: 'Pretzel Mint Crunch', price: 35.99, image: 'images/pretzel-mint.png' },
    'addToBag-9': { id: 'prod-9', name: 'Hot Cocoa Crunch', price: 24.99, image: 'images/hot-cocoa.png' },
    'addToBag-10': { id: 'prod-10', name: 'Peanut Butter Bar', price: 22.99, image: 'images/peanut-butter.png' }
  };

  document.querySelectorAll('.product-card__btn--add').forEach(btn => {
    btn.addEventListener('click', function() {
      const product = productData[this.id];
      if (product && typeof addToCart === 'function') {
        addToCart(product);
        
        // Visual feedback
        const originalText = this.textContent;
        this.textContent = 'ADDED!';
        this.style.background = '#C2FF0F'; // find-green
        this.style.color = '#111'; // dark text
        
        setTimeout(() => {
          this.textContent = originalText;
          this.style.background = ''; // revert to var target
          this.style.color = '';
        }, 1500);
      }
    });
  });

  // ========================================
  // 9. INIT
  // ========================================

  resizeCanvas();
  preloadFrames();
  checkReveal();
  updateHeaderShadow();

})();
