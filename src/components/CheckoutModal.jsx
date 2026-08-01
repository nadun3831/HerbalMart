import React, { useState } from 'react';
import { useStore } from '../data/store';
import { X, CheckCircle, Truck, CreditCard, ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, appliedCoupon, placeOrder } = useStore();

  const [customer, setCustomer] = useState({
    name: 'Nimal Perera',
    email: 'nimal.perera@example.com',
    phone: '+94 77 123 4567',
    address: 'No 45, Flower Road',
    city: 'Colombo 07'
  });

  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery (COD)');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen || cart.length === 0) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  let discountTotal = 0;
  cart.forEach((item) => {
    const itemPrice = item.product.discount_price || item.product.price;
    discountTotal += (item.product.price - itemPrice) * item.qty;

    if (appliedCoupon && appliedCoupon.target === 'product' && appliedCoupon.target_id === item.product.id) {
      discountTotal += ((itemPrice * appliedCoupon.value) / 100) * item.qty;
    }
  });

  const finalTotal = Math.max(0, subtotal - discountTotal);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Trigger celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      placeOrder(
        {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: `${customer.address}, ${customer.city}`
        },
        paymentMethod
      );

      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={() => setIsCheckoutOpen(false)}>
      <div
        className="modal-content max-w-3xl relative p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
          <div>
            <h2 className="font-heading text-2xl font-bold text-emerald-950">Secure Checkout</h2>
            <p className="text-xs text-slate-500">Provide your shipping address to confirm your herbal order.</p>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="text-slate-400 hover:text-slate-700 bg-slate-100 p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Contact & Delivery Form */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 mb-3 flex items-center gap-1.5">
                <Truck size={16} /> Shipping & Contact Details
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">City / Town</label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Choice */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 mb-3 flex items-center gap-1.5">
                <CreditCard size={16} /> Select Payment Method
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setPaymentMethod('Cash on Delivery (COD)')}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'Cash on Delivery (COD)'
                      ? 'border-emerald-800 bg-emerald-50/80 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900">Cash on Delivery</span>
                    {paymentMethod === 'Cash on Delivery (COD)' && <CheckCircle size={14} className="text-emerald-700" />}
                  </div>
                  <p className="text-[10px] text-slate-500">Pay cash upon package arrival.</p>
                </div>

                <div
                  onClick={() => setPaymentMethod('PayHere / Card Payment')}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'PayHere / Card Payment'
                      ? 'border-emerald-800 bg-emerald-50/80 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900">PayHere / Online Card</span>
                    {paymentMethod === 'PayHere / Card Payment' && <CheckCircle size={14} className="text-emerald-700" />}
                  </div>
                  <p className="text-[10px] text-slate-500">Visa / Mastercard / Genie payment.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Place Button */}
          <div className="lg:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div>
              <h3 className="font-heading text-base font-bold text-slate-900 mb-3 border-b border-slate-200 pb-2">
                Order Summary ({cart.length} Items)
              </h3>

              <div className="max-h-48 overflow-y-auto space-y-2 pr-1 mb-4">
                {cart.map((item) => {
                  const effectivePrice = item.product.discount_price || item.product.price;
                  return (
                    <div key={item.product.id} className="flex justify-between items-center text-xs">
                      <div>
                        <div className="font-bold text-slate-800 line-clamp-1">{item.product.name}</div>
                        <div className="text-[10px] text-slate-400">Qty: {item.qty} × Rs. {effectivePrice.toLocaleString('en-LK')}</div>
                      </div>
                      <div className="font-extrabold text-emerald-950">
                        Rs. {(effectivePrice * item.qty).toLocaleString('en-LK')}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs pt-3 border-t border-slate-200">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
                </div>
                {discountTotal > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount Saved</span>
                    <span>- Rs. {discountTotal.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Charge</span>
                  <span className="text-emerald-700 font-bold">FREE</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-bold text-sm text-slate-900">Total Payable</span>
                  <span className="text-xl font-black text-emerald-950">
                    Rs. {finalTotal.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <Lock size={16} />
                {isSubmitting ? 'Confirming Order...' : 'Place Order Now'}
                <ArrowRight size={16} />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-semibold">
                <ShieldCheck size={14} className="text-emerald-700" /> 256-bit Encrypted SSL Order Guarantee
              </div>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
};
