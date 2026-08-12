import React, { useState } from 'react';
import { useStore } from '../data/store';
import { X, CreditCard, Truck, CheckCircle2, ShieldCheck, Leaf, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, clearCart, appliedCoupon, addOrder, userProfile } = useStore();

  const [shippingAddress, setShippingAddress] = useState(userProfile?.address || '');
  const [phone, setPhone] = useState(userProfile?.phone || '');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isCheckoutOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.percentage) / 100 : 0;
  const shippingFee = subtotal > 5000 ? 0 : 350;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const orderPayload = {
      items: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
      shipping_address: shippingAddress,
      phone: phone,
    };

    try {
      await addOrder(orderPayload);
      setIsProcessing(false);
      setOrderSuccess(true);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderSuccess(false);
    setIsProcessing(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content relative p-6 sm:p-8 space-y-6">
        
        {/* Close button - hide during processing */}
        {!isProcessing && (
          <button onClick={handleClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 cursor-pointer">
            <X size={20} />
          </button>
        )}

        {isProcessing ? (
          /* ── PROCESSING / LOADING SCREEN ──────────────────────── */
          <div className="text-center py-16 space-y-8">

            {/* Animated Leaf Spinner */}
            <div className="relative w-24 h-24 mx-auto">
              {/* Outer ring pulse */}
              <div className="absolute inset-0 rounded-full border-2 border-lime-500/20 animate-ping" style={{ animationDuration: '2s' }} />
              {/* Spinning ring */}
              <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-lime-500 border-r-lime-500/40 animate-spin" style={{ animationDuration: '1.2s' }} />
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-lime-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(132,204,22,0.25)]">
                  <Leaf size={28} className="text-lime-400 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Processing Text */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-white">Processing Your Order</h2>
              <p className="text-sm text-slate-400 max-w-xs mx-auto">
                Please wait while we confirm your order and send the receipt to your email...
              </p>
            </div>

            {/* Animated Steps */}
            <div className="max-w-xs mx-auto space-y-3">
              <div className="flex items-center gap-3 bg-lime-500/10 border border-lime-500/20 rounded-xl px-4 py-3">
                <div className="w-5 h-5 rounded-full border-2 border-lime-500 border-t-transparent animate-spin" style={{ animationDuration: '0.8s' }} />
                <span className="text-xs font-semibold text-lime-400">Placing your order...</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <Mail size={16} className="text-slate-400 animate-pulse" />
                <span className="text-xs font-medium text-slate-400">Sending confirmation email...</span>
              </div>
            </div>

            {/* Bouncing dots */}
            <div className="flex items-center justify-center gap-1.5 pt-2">
              <span className="w-2 h-2 rounded-full bg-lime-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-lime-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-lime-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>

        ) : !orderSuccess ? (
          /* ── CHECKOUT FORM ──────────────────────────────────── */
          <>
            <div className="space-y-1 border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Truck size={20} className="text-lime-400" /> Secure Order Checkout
              </h2>
              <p className="text-xs text-slate-400">Complete your delivery address and payment details below.</p>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Shipping Details */}
                <div className="md:col-span-7 space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Recipient Full Name</label>
                    <input
                      type="text"
                      required
                      defaultValue={userProfile.name}
                      className="w-full bg-[#101415] text-white p-3 rounded-xl border border-white/15 focus:outline-none focus:border-lime-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Delivery Address</label>
                    <textarea
                      required
                      rows={3}
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full bg-[#101415] text-white p-3 rounded-xl border border-white/15 focus:outline-none focus:border-lime-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Contact Phone</label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#101415] text-white p-3 rounded-xl border border-white/15 focus:outline-none focus:border-lime-500"
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-slate-300 font-medium">Payment Option</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                          paymentMethod === 'cod' ? 'border-lime-400 bg-lime-500/10 text-lime-400' : 'border-white/10 text-slate-400'
                        }`}
                      >
                        💵 Cash on Delivery
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('payhere')}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                          paymentMethod === 'payhere' ? 'border-lime-400 bg-lime-500/10 text-lime-400' : 'border-white/10 text-slate-400'
                        }`}
                      >
                        💳 PayHere Online Card
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="md:col-span-5 bg-[#101415] p-5 rounded-2xl border border-white/15 space-y-4 text-xs font-mono">
                  <h3 className="font-bold text-white text-sm font-sans">Order Summary</h3>

                  <div className="space-y-2 max-h-48 overflow-y-auto divide-y divide-white/5 pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="pt-2 flex justify-between">
                        <span className="text-slate-300 font-sans">{item.name} x{item.quantity}</span>
                        <span className="text-white">Rs. {((item.discountPrice || item.price) * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5 pt-4 border-t border-white/10 text-slate-400">
                    <div className="flex justify-between"><span>Subtotal:</span><span>Rs. {subtotal.toLocaleString()}</span></div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-lime-400"><span>Coupon ({appliedCoupon.code}):</span><span>- Rs. {discountAmount.toLocaleString()}</span></div>
                    )}
                    <div className="flex justify-between"><span>Shipping:</span><span>{shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}</span></div>
                    <div className="flex justify-between text-white text-base font-bold pt-2 border-t border-white/10">
                      <span className="font-sans">Grand Total:</span>
                      <span className="text-lime-400">Rs. {grandTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <button type="submit" className="w-full btn-primary py-3 text-xs font-bold font-sans cursor-pointer">
                    Confirm & Place Order
                  </button>
                </div>

              </div>
            </form>
          </>
        ) : (
          /* ── SUCCESS SCREEN ──────────────────────────────────── */
          <div className="text-center py-12 space-y-6">
            <div className="w-16 h-16 rounded-full bg-lime-500/20 text-lime-400 border border-lime-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Order Confirmed Successfully!</h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you for choosing HerbalMart. Your order has been placed and a confirmation email has been sent to your inbox. 📧
              </p>
            </div>
            <button onClick={handleClose} className="btn-primary px-8 py-3 text-xs font-bold cursor-pointer">
              Back to Storefront
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

