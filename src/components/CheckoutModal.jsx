import React, { useState } from 'react';
import { useStore } from '../data/store';
import { X, CreditCard, Truck, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, clearCart, appliedCoupon, addOrder, userProfile } = useStore();

  const [shippingAddress, setShippingAddress] = useState(userProfile?.address || '');
  const [phone, setPhone] = useState(userProfile?.phone || '');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isCheckoutOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.percentage) / 100 : 0;
  const shippingFee = subtotal > 5000 ? 0 : 350;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    const orderPayload = {
      items: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
      shipping_address: shippingAddress,
      phone: phone,
    };

    await addOrder(orderPayload);
    setOrderSuccess(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderSuccess(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content relative p-6 sm:p-8 space-y-6">
        
        <button onClick={handleClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10">
          <X size={20} />
        </button>

        {!orderSuccess ? (
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

                  <button type="submit" className="w-full btn-primary py-3 text-xs font-bold font-sans">
                    Confirm & Place Order
                  </button>
                </div>

              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-12 space-y-6">
            <div className="w-16 h-16 rounded-full bg-lime-500/20 text-lime-400 border border-lime-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Order Confirmed Successfully!</h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you for choosing HerbalMart. Your order has been placed and is now being prepared for islandwide dispatch.
              </p>
            </div>
            <button onClick={handleClose} className="btn-primary px-8 py-3 text-xs font-bold">
              Back to Storefront
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
