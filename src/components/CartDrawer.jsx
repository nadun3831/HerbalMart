import React, { useState } from 'react';
import { useStore } from '../data/store';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight } from 'lucide-react';

export const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateCartQuantity, applyCoupon, appliedCoupon, setIsCheckoutOpen } = useStore();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState(null);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => {
    const itemPrice = item.discountPrice || item.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.percentage) / 100 : 0;
  const shippingFee = subtotal > 5000 ? 0 : 350;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    setCouponError(null);
    const result = await applyCoupon(couponInput);
    if (!result.success) {
      setCouponError(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-[#101415]/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#1d2022] border-l border-white/15 text-white flex flex-col shadow-2xl">
          
          {/* Cart Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#101415]">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-lime-400" />
              <h2 className="font-bold text-lg text-white">Your Shopping Cart</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => {
                const itemPrice = item.discountPrice || item.price;
                return (
                  <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-[#101415] border border-white/10">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-emerald-950" />
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between font-medium text-xs text-white">
                        <h4 className="font-bold">{item.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId || item.id)}
                          className="text-slate-400 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="font-mono text-lime-400 text-xs font-bold">
                        Rs. {itemPrice.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-3 pt-2">
                        <div className="flex items-center gap-2 bg-[#1d2022] border border-white/10 px-2 py-0.5 rounded-lg text-xs">
                          <button onClick={() => updateCartQuantity(item.cartItemId || item.id, item.quantity - 1)} className="hover:text-lime-400">
                            <Minus size={12} />
                          </button>
                          <span className="font-mono font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.cartItemId || item.id, item.quantity + 1)} className="hover:text-lime-400">
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 text-slate-400 space-y-4">
                <ShoppingBag size={48} className="mx-auto text-slate-600" />
                <p className="text-sm">Your shopping cart is currently empty.</p>
              </div>
            )}
          </div>

          {/* Cart Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#101415] space-y-4">
              
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Enter Coupon Code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="w-full pl-9 pr-3 py-2 bg-[#1d2022] text-xs text-white border border-white/15 rounded-xl uppercase font-mono focus:outline-none focus:border-lime-500"
                    />
                  </div>
                  <button type="submit" className="btn-secondary py-2 px-3 text-xs">
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-rose-400">{couponError}</p>}
                {appliedCoupon && (
                  <p className="text-[11px] text-lime-400 font-bold">
                    ✓ Applied '{appliedCoupon.code}' ({appliedCoupon.percentage}% OFF)
                  </p>
                )}
              </form>

              {/* Price Calculation */}
              <div className="space-y-2 text-xs text-slate-300 font-mono pt-2 border-t border-white/10">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-lime-400 font-bold">
                    <span>Discount</span>
                    <span>- Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>{shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-lime-400 font-mono">Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full btn-primary py-3 text-sm font-bold"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
