import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_DISCOUNTS, INITIAL_ORDERS } from './initialData';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Role State: 'customer' or 'admin'
  const [role, setRole] = useState(() => localStorage.getItem('herbal_role') || 'customer');

  // Active view tab for Customer or Admin
  const [customerTab, setCustomerTab] = useState('store'); // 'store' | 'dashboard'
  const [adminTab, setAdminTab] = useState('analytics'); // 'analytics' | 'products' | 'discounts' | 'orders'

  // Products state with local storage fallback
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('herbal_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Discounts state
  const [discounts, setDiscounts] = useState(() => {
    const saved = localStorage.getItem('herbal_discounts');
    return saved ? JSON.parse(saved) : INITIAL_DISCOUNTS;
  });

  // Orders state
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('herbal_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Cart state: Array of { product, qty }
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('herbal_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Applied Coupon code
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Active Product Modal (for detail view or edit)
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Active Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productModalMode, setProductModalMode] = useState('view'); // 'view' | 'add' | 'edit'

  // Toast Notification system
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('herbal_role', role);
  }, [role]);

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

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // --- Cart Actions ---
  const addToCart = (product, qty = 1) => {
    if (product.stock_qty <= 0) {
      showToast('Sorry, this product is currently out of stock!', 'error');
      return;
    }
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].qty + qty;
        if (newQty > product.stock_qty) {
          showToast(`Cannot add more than ${product.stock_qty} in stock!`, 'warning');
          updated[existingIndex].qty = product.stock_qty;
        } else {
          updated[existingIndex].qty = newQty;
          showToast(`Updated ${product.name} quantity in cart!`);
        }
        return updated;
      } else {
        showToast(`Added ${product.name} to cart!`);
        return [...prev, { product, qty: Math.min(qty, product.stock_qty) }];
      }
    });
  };

  const updateCartQty = (productId, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const targetProd = products.find((p) => p.id === productId) || item.product;
            const newQty = item.qty + delta;
            if (newQty > targetProd.stock_qty) {
              showToast(`Only ${targetProd.stock_qty} units available in stock!`, 'warning');
              return item;
            }
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart.');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCouponCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    const foundDiscount = discounts.find(
      (d) => d.coupon_code && d.coupon_code.toUpperCase() === cleanCode && d.status === 'active'
    );
    if (foundDiscount) {
      setAppliedCoupon(foundDiscount);
      showToast(`Coupon '${cleanCode}' applied successfully! ${foundDiscount.value}% off`);
      return true;
    } else {
      showToast('Invalid or expired coupon code.', 'error');
      return false;
    }
  };

  // --- Product Management (Admin) ---
  const saveProduct = (productData) => {
    if (productData.id) {
      // Edit existing product
      setProducts((prev) => prev.map((p) => (p.id === productData.id ? { ...p, ...productData } : p)));
      showToast(`Product '${productData.name}' updated successfully!`);
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: `prod-${Date.now()}`,
        status: 'active',
        rating: 5.0,
        reviews_count: 1
      };
      setProducts((prev) => [newProduct, ...prev]);
      showToast(`New herbal product '${productData.name}' created!`);
    }
    setIsProductModalOpen(false);
  };

  const deleteProduct = (productId) => {
    const prod = products.find((p) => p.id === productId);
    if (window.confirm(`Are you sure you want to deactivate/delete '${prod?.name}'?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      showToast(`Product '${prod?.name}' removed.`, 'info');
    }
  };

  // --- Discount Engine (Admin) ---
  const createDiscount = (discountData) => {
    const newDiscount = {
      ...discountData,
      id: `disc-${Date.now()}`,
      status: 'active'
    };
    setDiscounts((prev) => [newDiscount, ...prev]);
    showToast(`Discount '${discountData.name}' created successfully!`);
  };

  const toggleDiscountStatus = (discountId) => {
    setDiscounts((prev) =>
      prev.map((d) => {
        if (d.id === discountId) {
          const nextStatus = d.status === 'active' ? 'disabled' : 'active';
          showToast(`Discount '${d.name}' status set to ${nextStatus}`, 'info');
          return { ...d, status: nextStatus };
        }
        return d;
      })
    );
  };

  const deleteDiscount = (discountId) => {
    setDiscounts((prev) => prev.filter((d) => d.id !== discountId));
    showToast('Discount removed.', 'info');
  };

  // --- Order & Checkout Actions ---
  const placeOrder = (customerDetails, paymentMethod) => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

    // Calculate item discounts
    let totalDiscount = 0;
    const orderItems = cart.map((item) => {
      const unitPrice = item.product.discount_price || item.product.price;
      const originalPrice = item.product.price;
      totalDiscount += (originalPrice - unitPrice) * item.qty;

      // Apply coupon code if applicable
      if (appliedCoupon && appliedCoupon.target === 'product' && appliedCoupon.target_id === item.product.id) {
        const extraDisc = (unitPrice * appliedCoupon.value) / 100;
        totalDiscount += extraDisc * item.qty;
      }
      return {
        product_id: item.product.id,
        name: item.product.name,
        qty: item.qty,
        price: unitPrice
      };
    });

    // Reduce stock quantities
    setProducts((prev) =>
      prev.map((p) => {
        const cartMatch = cart.find((item) => item.product.id === p.id);
        if (cartMatch) {
          return { ...p, stock_qty: Math.max(0, p.stock_qty - cartMatch.qty) };
        }
        return p;
      })
    );

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: customerDetails,
      items: orderItems,
      total_amount: Math.max(0, subtotal - totalDiscount),
      discount_amount: totalDiscount,
      payment_method: paymentMethod,
      status: 'Pending',
      date: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutOpen(false);
    showToast(`Order #${newOrder.id} placed successfully! Thank you for shopping with HerbalMart.`, 'success');

    // Switch customer view to dashboard to track order
    setCustomerTab('dashboard');
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          showToast(`Order #${orderId} status updated to '${newStatus}'`, 'info');
          return { ...o, status: newStatus };
        }
        return o;
      })
    );
  };

  return (
    <StoreContext.Provider
      value={{
        role,
        setRole,
        customerTab,
        setCustomerTab,
        adminTab,
        setAdminTab,
        categories: INITIAL_CATEGORIES,
        products,
        discounts,
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
        productModalMode,
        setProductModalMode,
        toast,
        showToast,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        applyCouponCode,
        saveProduct,
        deleteProduct,
        createDiscount,
        toggleDiscountStatus,
        deleteDiscount,
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
