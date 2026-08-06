/* ========================================
   REGION SELECTOR — JavaScript
   Country selection + localStorage persistence
   ======================================== */

(function () {
  'use strict';

  // ========================================
  // Country data
  // ========================================
  const COUNTRIES = [
    { code: 'US', name: 'United States',  flag: '🇺🇸', currency: 'USD ($)' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP (£)' },
    { code: 'IE', name: 'Ireland',        flag: '🇮🇪', currency: 'EUR (€)' },
    { code: 'DE', name: 'Germany',        flag: '🇩🇪', currency: 'EUR (€)' },
    { code: 'AT', name: 'Austria',        flag: '🇦🇹', currency: 'EUR (€)' },
    { code: 'FR', name: 'France',         flag: '🇫🇷', currency: 'EUR (€)' },
    { code: 'ES', name: 'Spain',          flag: '🇪🇸', currency: 'EUR (€)' },
    { code: 'AU', name: 'Australia',      flag: '🇦🇺', currency: 'AUD (A$)' }
  ];

  const STORAGE_KEY = 'feastables_region';

  // ========================================
  // Utility: Get saved region
  // ========================================
  function getSavedRegion() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Verify it's a valid country
        const found = COUNTRIES.find(c => c.code === parsed.code);
        if (found) return found;
      }
    } catch (e) {
      // Ignore parse errors
    }
    // Default to US
    return COUNTRIES[0];
  }

  // ========================================
  // Utility: Save region
  // ========================================
  function saveRegion(country) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        code: country.code,
        name: country.name,
        flag: country.flag
      }));
    } catch (e) {
      // Ignore storage errors
    }
  }

  // ========================================
  // Build the country grid
  // ========================================
  function buildGrid() {
    const grid = document.getElementById('regionGrid');
    if (!grid) return;

    const currentRegion = getSavedRegion();

    grid.innerHTML = '';

    COUNTRIES.forEach(function (country, index) {
      const card = document.createElement('div');
      card.className = 'region-card' + (country.code === currentRegion.code ? ' selected' : '');
      card.setAttribute('data-country', country.code);
      card.setAttribute('id', 'region-' + country.code.toLowerCase());
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', 'Select ' + country.name);

      card.innerHTML =
        '<span class="region-card__flag">' + country.flag + '</span>' +
        '<div class="region-card__info">' +
          '<span class="region-card__name">' + country.name + '</span>' +
          '<span class="region-card__currency">' + country.currency + '</span>' +
        '</div>';

      // Click handler
      card.addEventListener('click', function () {
        selectCountry(country);
      });

      // Keyboard handler
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectCountry(country);
        }
      });

      grid.appendChild(card);
    });

    // Update the "currently shipping to" bar
    updateCurrentDisplay(currentRegion);
  }

  // ========================================
  // Select a country
  // ========================================
  function selectCountry(country) {
    // Save to localStorage
    saveRegion(country);

    // Update card states
    document.querySelectorAll('.region-card').forEach(function (card) {
      card.classList.remove('selected');
    });
    var selectedCard = document.querySelector('[data-country="' + country.code + '"]');
    if (selectedCard) {
      selectedCard.classList.add('selected');
    }

    // Update the "currently shipping to" display
    updateCurrentDisplay(country);

    // Update the header region button on this page
    var regionBtn = document.getElementById('regionBtn');
    if (regionBtn) {
      regionBtn.textContent = country.flag;
    }

    // Show toast notification
    showToast(country);
  }

  // ========================================
  // Update the "currently shipping to" display
  // ========================================
  function updateCurrentDisplay(country) {
    var flagEl = document.getElementById('currentRegionFlag');
    var nameEl = document.getElementById('currentRegionName');
    if (flagEl) flagEl.textContent = country.flag;
    if (nameEl) nameEl.textContent = country.name;
  }

  // ========================================
  // Toast notification
  // ========================================
  function showToast(country) {
    // Remove existing toast
    var existingToast = document.querySelector('.region-toast');
    if (existingToast) existingToast.remove();

    var toast = document.createElement('div');
    toast.className = 'region-toast';
    toast.innerHTML =
      '<span class="region-toast__flag">' + country.flag + '</span>' +
      'Region set to ' + country.name + '!';
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        toast.classList.add('visible');
      });
    });

    // Auto-hide after 2.5s
    setTimeout(function () {
      toast.classList.remove('visible');
      setTimeout(function () {
        toast.remove();
      }, 500);
    }, 2500);
  }

  // ========================================
  // Initialize on page load
  // ========================================
  buildGrid();

  // Also update the header region btn on this page if saved region exists
  var saved = getSavedRegion();
  var regionBtn = document.getElementById('regionBtn');
  if (regionBtn && saved) {
    regionBtn.textContent = saved.flag;
  }

})();
