/* ========================================
   FEASTABLES — Main JavaScript
   Hero scroll animation + interactivity
   ======================================== */

(function () {
  'use strict';

  // ========================================
  // 1. HERO SCROLL-SYNCED CANVAS ANIMATION
  //    Premium, ultra-smooth 60fps engine
  // ========================================

  const TOTAL_FRAMES = 204;
  const FRAME_PATH = 'heroanimation/imagesha/ezgif-frame-';
  const HERO_SCROLL_DISTANCE = 1200;
  const LERP_SPEED = 0.10;

  // Circumference for SVG progress ring (2 * PI * 54)
  const CIRCLE_CIRCUMFERENCE = 339.292;

  // DOM refs
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: false });
  const heroSection = document.getElementById('heroSection');
  const heroLoader = document.getElementById('heroLoader');
  const loaderProgress = document.getElementById('loaderProgress');
  const loaderPct = document.getElementById('loaderPct');
  const scrollHint = document.getElementById('scrollHint');
  const textOverlay = document.getElementById('heroTextOverlay');
  const ctaOverlay = document.getElementById('heroCtaOverlay');

  // Set hero section height
  heroSection.style.height = (window.innerHeight + HERO_SCROLL_DISTANCE) + 'px';

  // Frame storage
  const frames = new Array(TOTAL_FRAMES);
  let imagesLoaded = 0;
  let animationReady = false;

  // Smooth interpolation state
  let targetFrame = 0;
  let displayFrame = 0;
  let lastDrawnFrame = -1;

  // Idle breathing state
  let hasScrolled = false;
  let idleTime = 0;
  const IDLE_AMPLITUDE = 4;     // oscillate across 4 frames (0–4)
  const IDLE_SPEED = 0.0008;    // slow breathing

  // Overlay state tracking (avoid redundant class toggling)
  let textOverlayState = 'hidden';  // 'hidden' | 'visible' | 'fade-out'
  let ctaOverlayState = 'hidden';   // 'hidden' | 'visible'
  let scrollHintState = 'hidden';   // 'hidden' | 'visible'

  // ---- Utility: pad frame number ----
  function padNumber(num) {
    return String(num).padStart(3, '0');
  }

  // ---- Canvas resize (DPI-aware) ----
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = Math.round(width * 9 / 16);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    heroSection.style.height = (window.innerHeight + HERO_SCROLL_DISTANCE) + 'px';

    if (animationReady && lastDrawnFrame >= 0 && frames[lastDrawnFrame]) {
      drawFrame(lastDrawnFrame);
    }
  }

  // ---- Draw a frame (cover-fit) ----
  function drawFrame(index) {
    const img = frames[index];
    if (!img) return;

    const cw = canvas.width / (window.devicePixelRatio || 1);
    const ch = canvas.height / (window.devicePixelRatio || 1);

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

  // ---- Preload all frames ----
  function preloadFrames() {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH + padNumber(i) + '.jpg';

      img.onload = function () {
        frames[i - 1] = img;
        imagesLoaded++;
        updateLoaderUI();
        if (imagesLoaded === TOTAL_FRAMES) onAllFramesLoaded();
      };

      img.onerror = function () {
        imagesLoaded++;
        updateLoaderUI();
        if (imagesLoaded === TOTAL_FRAMES) onAllFramesLoaded();
      };
    }
  }

  // ---- Update the circular loader UI ----
  function updateLoaderUI() {
    const pct = Math.round((imagesLoaded / TOTAL_FRAMES) * 100);
    const offset = CIRCLE_CIRCUMFERENCE - (CIRCLE_CIRCUMFERENCE * pct / 100);
    loaderProgress.style.strokeDashoffset = offset;
    loaderPct.textContent = pct + '%';
  }

  // ---- Called when all frames are loaded ----
  function onAllFramesLoaded() {
    animationReady = true;

    // Draw the first frame
    lastDrawnFrame = 0;
    drawFrame(0);

    // Fade out loader
    heroLoader.classList.add('loaded');

    // After loader fades, show text overlay + scroll hint
    setTimeout(function () {
      // Show text overlay with entrance animation
      textOverlay.classList.add('visible');
      textOverlayState = 'visible';

      // Show scroll hint
      scrollHint.classList.add('visible');
      scrollHintState = 'visible';
    }, 650);

    // Start the render loop
    startRenderLoop();
  }

  // ---- Calculate target frame from scroll ----
  function updateTargetFrame() {
    if (!animationReady) return;

    const rect = heroSection.getBoundingClientRect();
    const scrolled = Math.max(0, -rect.top);
    const progress = Math.min(1, scrolled / HERO_SCROLL_DISTANCE);

    targetFrame = progress * (TOTAL_FRAMES - 1);

    // Mark that user has scrolled (disables idle breathing)
    if (progress > 0.005 && !hasScrolled) {
      hasScrolled = true;
    }

    // --- Overlay choreography ---

    // Text overlay: visible frames 0–70, fade out 70–90
    if (progress < 0.34) {
      // frames 0–70 approx
      if (textOverlayState !== 'visible') {
        textOverlay.classList.remove('fade-out');
        textOverlay.classList.add('visible');
        textOverlayState = 'visible';
      }
    } else if (progress < 0.44) {
      // frames 70–90 approx — fade out
      if (textOverlayState !== 'fade-out') {
        textOverlay.classList.add('fade-out');
        textOverlayState = 'fade-out';
      }
    } else {
      if (textOverlayState !== 'hidden') {
        textOverlay.classList.remove('visible');
        textOverlay.classList.remove('fade-out');
        textOverlayState = 'hidden';
      }
    }

    // CTA overlay: visible on final frames (progress > 0.88 → frame 180+)
    if (progress > 0.88) {
      if (ctaOverlayState !== 'visible') {
        ctaOverlay.classList.add('visible');
        ctaOverlayState = 'visible';
      }
    } else {
      if (ctaOverlayState !== 'hidden') {
        ctaOverlay.classList.remove('visible');
        ctaOverlayState = 'hidden';
      }
    }

    // Scroll hint: hide after scrolling a bit
    if (progress > 0.02) {
      if (scrollHintState !== 'hidden') {
        scrollHint.classList.remove('visible');
        scrollHint.classList.add('hidden');
        scrollHintState = 'hidden';
      }
    } else if (animationReady && textOverlayState === 'visible') {
      if (scrollHintState !== 'visible') {
        scrollHint.classList.remove('hidden');
        scrollHint.classList.add('visible');
        scrollHintState = 'visible';
      }
    }
  }

  // ---- 60fps render loop with lerp + idle breathing ----
  function startRenderLoop() {
    let lastTimestamp = 0;

    function tick(timestamp) {
      if (!animationReady) {
        requestAnimationFrame(tick);
        return;
      }

      const dt = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // Idle breathing when user hasn't scrolled
      if (!hasScrolled) {
        idleTime += dt;
        // Gentle sine oscillation across frames 0–IDLE_AMPLITUDE
        const breatheFrame = (IDLE_AMPLITUDE / 2) + (IDLE_AMPLITUDE / 2) * Math.sin(idleTime * IDLE_SPEED);
        targetFrame = breatheFrame;
      }

      // Lerp displayFrame toward targetFrame
      const diff = targetFrame - displayFrame;
      if (Math.abs(diff) > 0.08) {
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
  // 5. PRODUCT PAGINATOR DOTS
  // ========================================

  const dots = document.querySelectorAll('.products__dot');
  const productsGrid = document.querySelector('.products__grid');

  if (productsGrid && dots.length > 0) {
    productsGrid.addEventListener('scroll', () => {
      const scrollLeft = productsGrid.scrollLeft;
      const maxScroll = productsGrid.scrollWidth - productsGrid.clientWidth;
      
      if (maxScroll <= 0) return;

      const scrollPercentage = scrollLeft / maxScroll;
      const numDots = dots.length;
      let activeIndex = Math.round(scrollPercentage * (numDots - 1));
      activeIndex = Math.max(0, Math.min(activeIndex, numDots - 1));
      
      dots.forEach((dot, index) => {
        if (index === activeIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }, { passive: true });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', function () {
        const maxScroll = productsGrid.scrollWidth - productsGrid.clientWidth;
        const targetScroll = (index / (dots.length - 1)) * maxScroll;
        
        productsGrid.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
      });
    });
  }

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
