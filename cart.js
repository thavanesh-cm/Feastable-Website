/**
 * cart.js
 * Handles local storage state management for the Feastables shopping cart.
 */

const CART_STORAGE_KEY = 'feastables_cart_state';

// Initialize or grab cart state
function getCart() {
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return [];
    }
  }
  return [];
}

// Save cart to local storage
function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartBadge();
}

// Add item to cart
function addToCart(product) {
  let cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }
  
  saveCart(cart);
}

// Remove item entirely
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
}

// Update quantity
function updateQuantity(productId, newQuantity) {
  if (newQuantity <= 0) {
    removeFromCart(productId);
    return;
  }
  let cart = getCart();
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity = newQuantity;
    saveCart(cart);
  }
}

// Get total items count
function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// Update UI badge
function updateCartBadge() {
  const badge = document.querySelector('.header__cart-count');
  if (badge) {
    const count = getCartCount();
    badge.textContent = count;
    if (count > 0) {
      badge.style.display = 'flex';
      badge.classList.add('pop');
      setTimeout(() => badge.classList.remove('pop'), 300);
    } else {
      badge.style.display = 'none';
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();

  // Setup click listeners for Cart Icon globally
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      window.location.href = 'cart.html';
    });
  }
});
