import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_DISCOUNTS, INITIAL_ORDERS, SALES_ANALYTICS_DATA, USER_PROFILE_DATA } from './initialData';

const StoreContext = createContext();
const DATA_VERSION = '2';

export const StoreProvider = ({ children }) => {
  // Clear stale localStorage if data schema has changed
  if (localStorage.getItem('herbal_data_version') !== DATA_VERSION) {
    localStorage.removeItem('herbal_products');
    localStorage.removeItem('herbal_discounts');
    localStorage.removeItem('herbal_orders');
    localStorage.removeItem('herbal_cart');
    localStorage.setItem('herbal_data_version', DATA_VERSION);
  }

  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('herbal_logged_in') === 'true');
  const [loggedInUser, setLoggedInUser] = useState(() => {
    try {
      const saved = localStorage.getItem('herbal_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [role, setRole] = useState(() => localStorage.getItem('herbal_role') || 'customer');
  const [customerTab, setCustomerTab] = useState('store');
  const [adminTab, setAdminTab] = useState('analytics');

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('herbal_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [discounts, setDiscounts] = useState(() => {
    try {
      const saved = localStorage.getItem('herbal_discounts');
      return saved ? JSON.parse(saved) : INITIAL_DISCOUNTS;
    } catch {
      return INITIAL_DISCOUNTS;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('herbal_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('herbal_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

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

  useEffect(() => {
    localStorage.setItem('herbal_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('herbal_discounts', JSON.stringify(discounts));
  }, [discounts]);

  useEffect(() => {
    localStorage.setItem('herbal_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('herbal_cart', JSON.stringify(cart));
  }, [cart]);

  // Auth actions
  const login = (userData) => {
    setLoggedInUser(userData);
    setRole(userData.role);
    setIsLoggedIn(true);
    setCustomerTab('store');
    showToast(`Welcome back, ${userData.name}!`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setRole('customer');
    setCustomerTab('store');
    localStorage.removeItem('herbal_logged_in');
    localStorage.removeItem('herbal_user');
    showToast('You have been logged out.', 'info');
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  };

  // Cart Actions
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    showToast(`Added '${product.name}' to cart!`);
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const updateCartQty = (productId, delta) => {
    const existing = cart.find((item) => item.id === productId);
    if (existing) {
      updateCartQuantity(productId, existing.quantity + delta);
    }
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showToast('Removed item from cart.', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    const found = discounts.find((d) => (d.code === clean || d.coupon_code === clean) && d.active);
    if (found) {
      setAppliedCoupon(found);
      showToast(`Coupon '${clean}' applied successfully!`);
      return { success: true, message: 'Coupon applied!' };
    }
    return { success: false, message: 'Invalid or expired coupon code.' };
  };

  const applyCouponCode = applyCoupon;

  // Product Actions
  const addProduct = (newProd) => {
    const created = {
      ...newProd,
      id: `prod-${Date.now()}`,
      status: 'active',
      stock_qty: newProd.stock,
      discount_price: newProd.discountPrice
    };
    setProducts((prev) => [created, ...prev]);
    showToast(`Added '${newProd.name}' to catalog!`);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    showToast(`Updated product details!`);
  };

  const saveProduct = (prodData) => {
    if (prodData.id) {
      updateProduct(prodData.id, prodData);
    } else {
      addProduct(prodData);
    }
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog.', 'info');
  };

  // Discount Actions
  const addDiscount = (disc) => {
    const created = {
      ...disc,
      id: `disc-${Date.now()}`,
      active: true,
      status: 'active',
      coupon_code: disc.code
    };
    setDiscounts((prev) => [created, ...prev]);
    showToast(`Discount '${disc.code}' created!`);
  };

  const createDiscount = addDiscount;

  const toggleDiscountStatus = (id) => {
    setDiscounts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, active: !d.active, status: d.active ? 'disabled' : 'active' } : d))
    );
  };

  const deleteDiscount = (id) => {
    setDiscounts((prev) => prev.filter((d) => d.id !== id));
  };

  // Order Actions
  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
    showToast(`Order placed successfully!`, 'success');
  };

  const placeOrder = addOrder;

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Order #${orderId} status updated to '${status}'.`, 'info');
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
        salesAnalytics: SALES_ANALYTICS_DATA,
        userProfile: USER_PROFILE_DATA,
        toast,
        showToast,
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
        updateOrderStatus
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
