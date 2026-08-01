import React, { useState } from 'react';
import { useStore } from '../data/store';
import { Tag, Package, User, Ticket, Copy, Check, Clock, Truck, ShieldCheck, ChevronRight } from 'lucide-react';

export const CustomerDashboard = () => {
  const { discounts, orders, products, setCustomerTab, showToast } = useStore();
  const [activeTab, setActiveTab] = useState('discounts'); // 'discounts' | 'orders' | 'profile'
  const [copiedCode, setCopiedCode] = useState(null);

  // Filter active discounts
  const activeDiscounts = discounts.filter((d) => d.status === 'active');

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Coupon code '${code}' copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* Customer Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-emerald-800/50">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-300 text-xs font-bold mb-2">
            <User size={14} /> Customer Account Center
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold">Welcome back, Nimal Perera!</h1>
          <p className="text-emerald-200 text-xs mt-1">Manage your active coupons, track order deliveries, and update profile.</p>
        </div>

        <button
          onClick={() => setCustomerTab('store')}
          className="btn-accent text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shrink-0"
        >
          <span>Shop Herbal Store</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200 text-sm font-bold gap-6">
        <button
          onClick={() => setActiveTab('discounts')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'discounts'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-slate-400 hover:text-slate-700'
          }`}
        >
          <Tag size={18} />
          My Active Discounts & Offers
          {activeDiscounts.length > 0 && (
            <span className="bg-amber-400 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-full">
              {activeDiscounts.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-slate-400 hover:text-slate-700'
          }`}
        >
          <Package size={18} />
          My Orders ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-slate-400 hover:text-slate-700'
          }`}
        >
          <User size={18} />
          My Profile & Address
        </button>
      </div>

      {/* Tab 1: My Discounts / Offers (PRD 4.2.3) */}
      {activeTab === 'discounts' && (
        <div className="space-y-6">
          <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-100 flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-base text-emerald-950">Exclusive Promotional Coupons</h3>
              <p className="text-xs text-slate-600">
                Apply these coupon codes at checkout to enjoy instant discounts on your order.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeDiscounts.map((disc) => {
              const targetProduct = products.find((p) => p.id === disc.target_id);

              return (
                <div
                  key={disc.id}
                  className="bg-white rounded-2xl p-6 border-2 border-emerald-100 hover:border-emerald-300 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Decorative Corner Ribbon */}
                  <div className="absolute top-0 right-0 bg-amber-400 text-emerald-950 font-black text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                    {disc.type === 'percentage' ? `${disc.value}% OFF` : `Rs. ${disc.value} OFF`}
                  </div>

                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                      <Ticket size={22} />
                    </div>

                    <h4 className="font-heading font-bold text-slate-900 text-base mb-1">{disc.name}</h4>
                    <p className="text-xs text-slate-500 mb-4">{disc.description}</p>

                    {targetProduct && (
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2 mb-4">
                        <img
                          src={targetProduct.image}
                          alt={targetProduct.name}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <div className="text-[11px] font-bold text-slate-800 line-clamp-1">
                          Applies to: {targetProduct.name}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> Valid until:
                      </span>
                      <span className="font-bold text-slate-800">{disc.end_date}</span>
                    </div>

                    {/* Copyable Coupon Code Pill */}
                    <div className="flex items-center justify-between bg-emerald-900 text-white p-2.5 rounded-xl font-mono text-xs">
                      <span className="font-extrabold tracking-wider text-amber-300">{disc.coupon_code}</span>
                      <button
                        onClick={() => handleCopyCode(disc.coupon_code)}
                        className="bg-emerald-800 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg font-sans font-bold text-[11px] flex items-center gap-1 transition-colors"
                      >
                        {copiedCode === disc.coupon_code ? (
                          <>
                            <Check size={12} className="text-emerald-400" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy size={12} /> Copy Code
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: My Orders (PRD 4.2.3) */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
              <Package size={40} className="mx-auto text-slate-300 mb-3" />
              <h3 className="font-heading font-bold text-slate-800">No orders placed yet</h3>
              <p className="text-xs text-slate-500">When you purchase herbal products, your order status will appear here.</p>
            </div>
          ) : (
            orders.map((order) => {
              const statusSteps = ['Pending', 'Processing', 'Shipped', 'Delivered'];
              const currentStepIndex = statusSteps.indexOf(order.status);

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6"
                >
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-heading font-bold text-slate-900 text-lg">Order #{order.id}</h3>
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                          {order.payment_method}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">Placed on: {order.date}</p>
                    </div>

                    <div className="text-right">
                      <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Total Amount</div>
                      <div className="text-xl font-black text-emerald-950">
                        Rs. {order.total_amount.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>

                  {/* Order Delivery Status Timeline */}
                  <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100 space-y-3">
                    <div className="flex justify-between items-center text-xs font-bold text-emerald-950">
                      <span>Delivery Status Track</span>
                      <span className="bg-emerald-900 text-emerald-200 px-3 py-1 rounded-full text-[11px]">
                        Current: {order.status}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="grid grid-cols-4 gap-2 pt-2">
                      {statusSteps.map((step, idx) => {
                        const isDone = idx <= currentStepIndex;
                        return (
                          <div key={step} className="space-y-1 text-center">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                isDone ? 'bg-emerald-700' : 'bg-slate-200'
                              }`}
                            />
                            <span
                              className={`text-[10px] font-bold block ${
                                isDone ? 'text-emerald-950' : 'text-slate-400'
                              }`}
                            >
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Purchased Items List */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Order Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <div className="font-semibold text-slate-800">
                            {item.name} <span className="text-slate-400 font-normal">× {item.qty}</span>
                          </div>
                          <div className="font-bold text-slate-900">
                            Rs. {(item.price * item.qty).toLocaleString('en-LK')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 3: My Profile (PRD 4.2.3) */}
      {activeTab === 'profile' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-2xl space-y-6">
          <h3 className="font-heading font-bold text-xl text-slate-900 border-b border-slate-100 pb-3">
            Personal & Shipping Details
          </h3>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-500 font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  readOnly
                  value="Nimal Perera"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  readOnly
                  value="nimal.perera@example.com"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-500 font-bold mb-1">Phone Number</label>
                <input
                  type="text"
                  readOnly
                  value="+94 77 123 4567"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Account Role</label>
                <input
                  type="text"
                  readOnly
                  value="Customer (Verified)"
                  className="w-full p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-500 font-bold mb-1">Default Shipping Address</label>
              <textarea
                readOnly
                rows={3}
                value="No 45, Flower Road, Colombo 07, Sri Lanka"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
