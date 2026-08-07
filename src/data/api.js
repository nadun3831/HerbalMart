/**
 * HerbalMart API Service
 * Connects React frontend → Laravel backend via REST + Sanctum token auth
 */

const API_BASE = 'http://127.0.0.1:8000/api';

// ── Helper ──────────────────────────────────────────────────────────
function getToken() {
  return localStorage.getItem('herbal_token');
}

function authHeaders() {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      ...authHeaders(),
      ...options.headers,
    },
  });

  // Parse JSON (or return null for 204 No Content)
  const data = res.status === 204 ? null : await res.json();

  if (!res.ok) {
    let errorMsg = `Request failed (${res.status})`;
    if (data?.message) {
      errorMsg = data.message;
    } else if (data?.errors && typeof data.errors === 'object') {
      errorMsg = Object.values(data.errors).flat().join(', ');
    }
    throw new Error(errorMsg);
  }

  return data;
}

// ── AUTH ─────────────────────────────────────────────────────────────
export async function apiLogin(email, password) {
  const data = await request('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  // Store token
  localStorage.setItem('herbal_token', data.token);
  return data; // { message, user, token }
}

export async function apiRegister(name, email, password, password_confirmation) {
  const data = await request('/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, password_confirmation }),
  });
  localStorage.setItem('herbal_token', data.token);
  return data;
}

export async function apiLogout() {
  try {
    await request('/logout', { method: 'POST' });
  } catch {
    // Ignore errors on logout
  }
  localStorage.removeItem('herbal_token');
}

export async function apiGetProfile() {
  return await request('/profile');
}

// ── PRODUCTS (Public) ───────────────────────────────────────────────
export async function apiGetProducts(params = {}) {
  const query = new URLSearchParams();
  if (params.search) query.set('search', params.search);
  if (params.category && params.category !== 'all') query.set('category', params.category);
  if (params.sort) query.set('sort', params.sort);
  const qs = query.toString();
  return await request(`/products${qs ? `?${qs}` : ''}`);
}

export async function apiGetProduct(id) {
  return await request(`/products/${id}`);
}

export async function apiGetCategories() {
  return await request('/products/categories');
}

// ── PRODUCTS (Admin) ────────────────────────────────────────────────
export async function apiCreateProduct(productData) {
  return await request('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  });
}

export async function apiUpdateProduct(id, productData) {
  return await request(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  });
}

export async function apiDeleteProduct(id) {
  return await request(`/products/${id}`, { method: 'DELETE' });
}

// ── CART (Authenticated) ────────────────────────────────────────────
export async function apiGetCart() {
  return await request('/cart');
}

export async function apiAddToCart(product_id, quantity = 1) {
  return await request('/cart', {
    method: 'POST',
    body: JSON.stringify({ product_id, quantity }),
  });
}

export async function apiUpdateCartItem(cartItemId, quantity) {
  return await request(`/cart/${cartItemId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  });
}

export async function apiRemoveCartItem(cartItemId) {
  return await request(`/cart/${cartItemId}`, { method: 'DELETE' });
}

export async function apiClearCart() {
  return await request('/cart', { method: 'DELETE' });
}

// ── ORDERS (Authenticated) ──────────────────────────────────────────
export async function apiGetOrders() {
  return await request('/orders');
}

export async function apiPlaceOrder(orderData) {
  return await request('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}

export async function apiGetOrder(id) {
  return await request(`/orders/${id}`);
}

export async function apiUpdateOrderStatus(id, status) {
  return await request(`/orders/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

// ── DISCOUNTS ───────────────────────────────────────────────────────
export async function apiGetDiscounts() {
  return await request('/discounts');
}

export async function apiValidateDiscount(code) {
  return await request('/discounts/validate', {
    method: 'POST',
    body: JSON.stringify({ code }),
  });
}

export async function apiCreateDiscount(discountData) {
  return await request('/discounts', {
    method: 'POST',
    body: JSON.stringify(discountData),
  });
}

export async function apiToggleDiscount(id) {
  return await request(`/discounts/${id}/toggle`, { method: 'PATCH' });
}

export async function apiDeleteDiscount(id) {
  return await request(`/discounts/${id}`, { method: 'DELETE' });
}

// ── ANALYTICS (Admin) ───────────────────────────────────────────────
export async function apiGetAnalytics() {
  return await request('/analytics/summary');
}
