import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  apiGetProducts,
  apiGetDiscounts,
  apiGetOrders,
  apiGetCart,
  apiAddToCart,
  apiUpdateCartItem,
  apiRemoveCartItem,
  apiClearCart,
  apiCreateProduct,
  apiUpdateProduct,
  apiDeleteProduct,
  apiPlaceOrder,
  apiUpdateOrderStatus,
  apiCreateDiscount,
  apiToggleDiscount,
  apiDeleteDiscount,
  apiValidateDiscount,
  apiLogout,
  apiGetAnalytics,
} from './api';
import { INITIAL_CATEGORIES, SALES_ANALYTICS_DATA, USER_PROFILE_DATA } from './initialData';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // ── Auth state (persisted in localStorage) ──────────────────────────
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('herbal_logged_in') === 'true'
  );
  const [loggedInUser, setLoggedInUser] = useState(() => {
    try {
      const saved = localStorage.getItem('herbal_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [role, setRole] = useState(
    () => localStorage.getItem('herbal_role') || 'customer'
  );

  // ── UI navigation state ─────────────────────────────────────────────
  const [customerTab, setCustomerTab] = useState('dashboard');
  const [adminTab, setAdminTab] = useState('analytics');

  // ── Data state (fetched from API) ───────────────────────────────────
  const [products, setProducts] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ── UI state ────────────────────────────────────────────────────────
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [toast, setToast] = useState(null);

  // ── Toast helper ────────────────────────────────────────────────────
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // ── Persist auth state ──────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem('herbal_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('herbal_logged_in', isLoggedIn ? 'true' : 'false');
  }, [isLoggedIn]);

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem('herbal_user', JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem('herbal_user');
    }
  }, [loggedInUser]);

  // ── Data normalizers (snake_case API → camelCase UI) ─────────────────
  const normalizeProduct = (p) => ({
    ...p,
    discountPrice: p.discount_price ?? p.discountPrice ?? null,
    shortDescription: p.short_description ?? p.shortDescription ?? '',
    stockQty: p.stock_qty ?? p.stock ?? 0,
    reviewsCount: p.reviews_count ?? p.reviewsCount ?? 0,
    usageInstructions: p.usage_info ?? p.usageInstructions ?? '',
    healthBenefits: p.health_benefits ?? p.healthBenefits ?? [],
  });

  const normalizeDiscount = (d) => ({
    ...d,
    coupon_code: d.coupon_code ?? d.code,
    validTill: d.valid_till ?? d.validTill ?? '',
    name: d.name ?? d.title,
  });

  const normalizeOrder = (o) => ({
    ...o,
    customerName: o.customer_name ?? o.customerName ?? '',
    total_amount: o.total_amount ?? o.total ?? 0,
    items: o.items || [],
  });

  const normalizeCartItem = (item) => {
    // API cart items come with nested product via `with('product')`
    const product = item.product ? normalizeProduct(item.product) : {};
    return {
      ...product,
      cartItemId: item.id,
      id: item.product_id || product.id,
      quantity: item.quantity,
    };
  };

  // ── Fetch data from API when logged in ──────────────────────────────
  const fetchProducts = useCallback(async () => {
    try {
      const data = await apiGetProducts();
      setProducts(data.map(normalizeProduct));
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  }, []);

  const fetchDiscounts = useCallback(async () => {
    try {
      const data = await apiGetDiscounts();
      setDiscounts(data.map(normalizeDiscount));
    } catch (err) {
      console.error('Failed to fetch discounts:', err);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const data = await apiGetOrders();
      setOrders(data.map(normalizeOrder));
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      const data = await apiGetCart();
      setCart(data.map(normalizeCartItem));
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  }, []);

  const fetchAnalytics = useCallback(async () => {
    try {
      const data = await apiGetAnalytics();
      setAnalyticsData(data);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    }
  }, []);

  // Load products & discounts (public) on mount, and cart/orders if logged in
  useEffect(() => {
    fetchProducts();
    fetchDiscounts();
  }, [fetchProducts, fetchDiscounts]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
      fetchOrders();
      if (role === 'admin') {
        fetchAnalytics();
      }
    }
  }, [isLoggedIn, role, fetchCart, fetchOrders, fetchAnalytics]);

  // ── Auth actions ────────────────────────────────────────────────────
  const login = (userData) => {
    setLoggedInUser(userData);
    setRole(userData.role);
    setIsLoggedIn(true);
    setCustomerTab('store');
    showToast(`Welcome back, ${userData.name}!`);
    // Refresh data from API
    fetchProducts();
    fetchDiscounts();
    fetchCart();
    fetchOrders();
    if (userData.role === 'admin') {
      fetchAnalytics();
    }
  };

  const logout = async () => {
    await apiLogout();
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setRole('customer');
    setCustomerTab('store');
    setCart([]);
    setOrders([]);
    localStorage.removeItem('herbal_logged_in');
    localStorage.removeItem('herbal_user');
    localStorage.removeItem('herbal_token');
    showToast('You have been logged out.', 'info');
  };

  // ── Cart Actions (API-backed) ───────────────────────────────────────
  const addToCart = async (product, qty = 1) => {
    try {
      await apiAddToCart(product.id, qty);
      await fetchCart();
      showToast(`Added '${product.name}' to cart!`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const updateCartQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    try {
      await apiUpdateCartItem(cartItemId, newQuantity);
      await fetchCart();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const updateCartQty = async (cartItemId, delta) => {
    const existing = cart.find((item) => item.id === cartItemId);
    if (existing) {
      await updateCartQuantity(cartItemId, existing.quantity + delta);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await apiRemoveCartItem(cartItemId);
      await fetchCart();
      showToast('Removed item from cart.', 'info');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const clearCart = async () => {
    try {
      await apiClearCart();
      setCart([]);
      setAppliedCoupon(null);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const applyCoupon = async (code) => {
    try {
      const result = await apiValidateDiscount(code.trim().toUpperCase());
      if (result.valid) {
        setAppliedCoupon(result.discount);
        showToast(`Coupon '${code.trim().toUpperCase()}' applied successfully!`);
        return { success: true, message: 'Coupon applied!' };
      }
    } catch (err) {
      return { success: false, message: err.message || 'Invalid or expired coupon code.' };
    }
    return { success: false, message: 'Invalid or expired coupon code.' };
  };

  const applyCouponCode = applyCoupon;

  // ── Product Actions (Admin, API-backed) ─────────────────────────────
  const addProduct = async (newProd) => {
    try {
      await apiCreateProduct(newProd);
      await fetchProducts();
      showToast(`Added '${newProd.name}' to catalog!`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const updateProduct = async (id, updatedFields) => {
    try {
      await apiUpdateProduct(id, updatedFields);
      await fetchProducts();
      showToast('Updated product details!');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const saveProduct = async (prodData) => {
    if (prodData.id) {
      await updateProduct(prodData.id, prodData);
    } else {
      await addProduct(prodData);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await apiDeleteProduct(id);
      await fetchProducts();
      showToast('Product removed from catalog.', 'info');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // ── Discount Actions (Admin, API-backed) ────────────────────────────
  const addDiscount = async (disc) => {
    try {
      await apiCreateDiscount({
        code: disc.code,
        percentage: disc.percentage,
        title: disc.title || disc.name,
        description: disc.description,
        valid_till: disc.validTill || disc.valid_till,
      });
      await fetchDiscounts();
      showToast(`Discount '${disc.code}' created!`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const createDiscount = addDiscount;

  const toggleDiscountStatus = async (id) => {
    try {
      await apiToggleDiscount(id);
      await fetchDiscounts();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const deleteDiscount = async (id) => {
    try {
      await apiDeleteDiscount(id);
      await fetchDiscounts();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // ── Order Actions (API-backed) ──────────────────────────────────────
  const addOrder = async (order) => {
    try {
      await apiPlaceOrder(order);
      await fetchOrders();
      await fetchCart(); // Cart is cleared server-side after order
      showToast('Order placed successfully!', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const placeOrder = addOrder;

  const updateOrderStatus = async (orderId, status) => {
    try {
      await apiUpdateOrderStatus(orderId, status);
      await fetchOrders();
      showToast(`Order #${orderId} status updated to '${status}'.`, 'info');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <StoreContext.Provider
      value={{
        isLoggedIn,
        loggedInUser,
        login,
        logout,
        role,
        setRole,
        customerTab,
        setCustomerTab,
        adminTab,
        setAdminTab,
        categories: INITIAL_CATEGORIES,
        products,
        discounts,
        activeDiscounts: discounts.filter((d) => d.active || d.status === 'active'),
        orders,
        cart,
        appliedCoupon,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isProductModalOpen,
        setIsProductModalOpen,
        showLoginModal,
        setShowLoginModal,
        salesAnalytics: analyticsData || SALES_ANALYTICS_DATA,
        userProfile: loggedInUser
          ? {
              name: loggedInUser.name || 'Valued Customer',
              email: loggedInUser.email || '',
              phone: loggedInUser.phone || '',
              address: loggedInUser.address || '',
              role: loggedInUser.role || 'customer',
            }
          : {
              name: 'Guest User',
              email: '',
              phone: '',
              address: '',
              role: 'guest',
            },
        toast,
        showToast,
        isLoading,
        addToCart,
        updateCartQuantity,
        updateCartQty,
        removeFromCart,
        clearCart,
        applyCoupon,
        applyCouponCode,
        addProduct,
        updateProduct,
        saveProduct,
        deleteProduct,
        addDiscount,
        createDiscount,
        toggleDiscountStatus,
        deleteDiscount,
        addOrder,
        placeOrder,
        updateOrderStatus,
        // Expose refresh functions
        fetchProducts,
        fetchDiscounts,
        fetchOrders,
        fetchCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
