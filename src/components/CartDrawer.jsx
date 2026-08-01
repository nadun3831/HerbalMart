import React, { useState } from 'react';
import { useStore } from '../data/store';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Ticket } from 'lucide-react';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQty,
    removeFromCart,
    applyCouponCode,
    appliedCoupon,
    setIsCheckoutOpen
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  // Discount calculation
  let discountTotal = 0;
  cart.forEach((item) => {
    const itemPrice = item.product.discount_price || item.product.price;
    discountTotal += (item.product.price - itemPrice) * item.qty;

    if (appliedCoupon && appliedCoupon.target === 'product' && appliedCoupon.target_id === item.product.id) {
      discountTotal += ((itemPrice * appliedCoupon.value) / 100) * item.qty;
    }
  });

  const finalTotal = Math.max(0, subtotal - discountTotal);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCouponCode(couponInput);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay Backdrop */}
      <div
        className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-emerald-900 text-white">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-emerald-300" />
              <h2 className="font-heading text-lg font-bold">Your Herbal Cart</h2>
              <span className="bg-emerald-800 text-emerald-200 text-xs px-2 py-0.5 rounded-full">
                {cart.reduce((sum, i) => sum + i.qty, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-emerald-200 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag size={32} />
                </div>
                <h3 className="font-heading font-bold text-slate-800 text-lg mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mb-6">
                  Browse our ayurvedic teas, essential oils, and wellness powders to add items to your cart.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="btn-primary text-xs px-5 py-2.5 rounded-xl font-bold"
                >
                  Explore Herbal Store
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const effectivePrice = item.product.discount_price || item.product.price;
                const hasDiscount = item.product.discount_price < item.product.price;

                return (
                  <div
                    key={item.product.id}
                    className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-200 transition-colors"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg shrink-0 border border-slate-200"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-heading font-bold text-slate-900 text-xs line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-400 hover:text-red-600 p-0.5 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium">{item.product.unit}</p>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-slate-200 bg-white rounded-lg">
                          <button
                            onClick={() => updateCartQty(item.product.id, -1)}
                            className="px-2 py-0.5 text-xs text-slate-600 font-bold hover:bg-slate-100"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-xs font-bold text-slate-800">{item.qty}</span>
                          <button
                            onClick={() => updateCartQty(item.product.id, 1)}
                            className="px-2 py-0.5 text-xs text-slate-600 font-bold hover:bg-slate-100"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-xs font-extrabold text-emerald-950">
                            Rs. {(effectivePrice * item.qty).toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                          </div>
                          {hasDiscount && (
                            <div className="text-[10px] text-slate-400 line-through">
                              Rs. {(item.product.price * item.qty).toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Panel */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-4">
              
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Enter Coupon Code (e.g. HERBAL20)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 font-semibold"
                  />
                  <Ticket size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
                </div>
                <button
                  type="submit"
                  className="bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs bg-emerald-100/80 text-emerald-900 p-2 rounded-lg border border-emerald-200">
                  <span className="flex items-center gap-1 font-bold">
                    <Tag size={14} /> Coupon Code Applied: {appliedCoupon.coupon_code}
                  </span>
                  <span className="font-extrabold">{appliedCoupon.value}% OFF</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
                </div>
                {discountTotal > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discounts Saved</span>
                    <span>- Rs. {discountTotal.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Standard Delivery (COD)</span>
                  <span className="text-emerald-700 font-bold">FREE</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-slate-900 font-bold">
                  <span className="text-sm">Total Payable</span>
                  <span className="text-xl text-emerald-950 font-black">
                    Rs. {finalTotal.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full btn-primary py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
