import React, { useState } from 'react';
import { useStore } from '../data/store';
import { Sparkles, Copy, Check, Package, Clock, Truck, CheckCircle2, User, Mail, MapPin, Phone, ShieldCheck, Tag, LogIn, UserPlus } from 'lucide-react';

export const CustomerDashboard = () => {
  const { activeDiscounts, orders, userProfile, isLoggedIn, setShowLoginModal, applyCoupon } = useStore();
  const [copiedCode, setCopiedCode] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setToastMsg(`Coupon code '${code}' copied to clipboard!`);
    setTimeout(() => {
      setCopiedCode(null);
      setToastMsg(null);
    }, 3000);
  };

  const getStatusStage = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 1;
      case 'processing': return 2;
      case 'shipped': return 3;
      case 'delivered': return 4;
      default: return 1;
    }
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <div className="glass-card p-8 rounded-3xl border border-lime-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-r from-[#064e3b] via-[#101415] to-[#1d2022]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-lime-500/20 text-lime-400 text-xs font-bold px-3 py-1 rounded-full border border-lime-500/30">
            <Sparkles size={14} /> WELLNESS DASHBOARD
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            {isLoggedIn ? `Welcome back, ${userProfile.name}` : 'Welcome to HerbalMart'}
          </h1>
          <p className="text-xs text-slate-300">
            {isLoggedIn
              ? 'Track active ayurvedic orders, claim promotional discount codes, and manage your health account.'
              : 'Claim promotional discount codes, explore ayurvedic products, and sign in to track your orders.'}
          </p>
        </div>

        {isLoggedIn ? (
          <div className="flex items-center gap-4 bg-emerald-950/80 p-4 rounded-2xl border border-white/10 text-xs text-slate-200 shrink-0">
            <ShieldCheck size={28} className="text-lime-400" />
            <div>
              <div className="font-bold text-white">Herbal Preferred Member</div>
              <div className="text-[11px] text-slate-400">Standard Free Shipping Status</div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowLoginModal(true)}
            className="btn-primary px-5 py-3 text-xs font-bold flex items-center gap-2 shrink-0 cursor-pointer shadow-[0_0_20px_rgba(132,204,22,0.3)]"
          >
            <LogIn size={16} /> Sign In to Your Account
          </button>
        )}
      </div>

      {!isLoggedIn && (
        <div className="bg-lime-500/10 border border-lime-500/30 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-500/20 text-lime-400 flex items-center justify-center shrink-0">
              <UserPlus size={20} />
            </div>
            <div>
              <p className="font-bold text-white">Browsing as Guest</p>
              <p className="text-slate-400">Sign in or create an account to view your order history and manage delivery details.</p>
            </div>
          </div>
          <button
            onClick={() => setShowLoginModal(true)}
            className="btn-primary px-4 py-2 text-xs font-bold shrink-0 cursor-pointer"
          >
            Sign In / Register
          </button>
        </div>
      )}

      {toastMsg && (
        <div className="bg-lime-500 text-emerald-950 px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between shadow-lg">
          <span className="flex items-center gap-2"><Check size={16} /> {toastMsg}</span>
        </div>
      )}

      {/* Grid: Discounts & Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Active Discounts & Offers (PRD requirement) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Tag size={20} className="text-lime-400" /> Active Promotional Offers & Coupons
            </h2>
            <span className="text-xs text-slate-400 font-mono">{activeDiscounts.length} coupons available</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeDiscounts.map((discount) => (
              <div
                key={discount.id}
                className="glass-card p-5 rounded-2xl border border-lime-500/30 relative overflow-hidden flex flex-col justify-between space-y-4 hover:border-lime-500 transition-colors"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-lime-500/10 rounded-full blur-xl pointer-events-none" />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-lime-500 text-emerald-950 font-extrabold text-xs px-2.5 py-1 rounded-md">
                      {discount.percentage}% OFF
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">Expires: {discount.validTill}</span>
                  </div>

                  <h3 className="font-bold text-white text-base">{discount.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{discount.description}</p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <div className="bg-[#101415] px-3 py-1.5 rounded-lg border border-white/15 font-mono text-sm font-bold text-lime-400">
                    {discount.code}
                  </div>
                  <button
                    onClick={() => handleCopyCode(discount.code)}
                    className="btn-primary py-1.5 px-3 text-xs cursor-pointer"
                  >
                    {copiedCode === discount.code ? (
                      <>
                        <Check size={14} /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> Copy Code
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Customer Orders Trackers */}
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Package size={20} className="text-lime-400" /> My Recent Herbal Orders
              </h2>
              <span className="text-xs text-slate-400 font-mono">{orders.length} total orders</span>
            </div>

            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => {
                  const stage = getStatusStage(order.status);
                  return (
                    <div key={order.id} className="glass-card p-6 rounded-2xl space-y-6">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10 text-xs">
                        <div>
                          <span className="text-slate-400">Order ID: </span>
                          <span className="font-mono font-bold text-white">{order.id}</span>
                          <span className="text-slate-500 ml-3">• {order.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-lime-400 text-sm">
                            Rs. {order.total.toLocaleString()}
                          </span>
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase bg-lime-500/20 text-lime-400 border border-lime-500/30">
                            {order.status}
                          </span>
                        </div>
                      </div>

                      {/* 4-Stage Status Progress Tracker */}
                      <div className="space-y-2">
                        <div className="text-xs text-slate-400 font-medium mb-3">Live Order Tracking:</div>
                        <div className="grid grid-cols-4 gap-2 text-center relative">
                          
                          {/* Stage 1 */}
                          <div className={`flex flex-col items-center space-y-1.5 ${stage >= 1 ? 'text-lime-400' : 'text-slate-500'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${stage >= 1 ? 'bg-lime-500 text-emerald-950 font-bold border-lime-400 shadow-[0_0_10px_rgba(132,204,22,0.5)]' : 'bg-white/5 border-white/10'}`}>
                              <Clock size={16} />
                            </div>
                            <span className="text-[11px] font-semibold">Order Placed</span>
                          </div>

                          {/* Stage 2 */}
                          <div className={`flex flex-col items-center space-y-1.5 ${stage >= 2 ? 'text-lime-400' : 'text-slate-500'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${stage >= 2 ? 'bg-lime-500 text-emerald-950 font-bold border-lime-400 shadow-[0_0_10px_rgba(132,204,22,0.5)]' : 'bg-white/5 border-white/10'}`}>
                              <Package size={16} />
                            </div>
                            <span className="text-[11px] font-semibold">Processing</span>
                          </div>

                          {/* Stage 3 */}
                          <div className={`flex flex-col items-center space-y-1.5 ${stage >= 3 ? 'text-lime-400' : 'text-slate-500'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${stage >= 3 ? 'bg-lime-500 text-emerald-950 font-bold border-lime-400 shadow-[0_0_10px_rgba(132,204,22,0.5)]' : 'bg-white/5 border-white/10'}`}>
                              <Truck size={16} />
                            </div>
                            <span className="text-[11px] font-semibold">On Delivery</span>
                          </div>

                          {/* Stage 4 */}
                          <div className={`flex flex-col items-center space-y-1.5 ${stage >= 4 ? 'text-lime-400' : 'text-slate-500'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${stage >= 4 ? 'bg-lime-500 text-emerald-950 font-bold border-lime-400 shadow-[0_0_10px_rgba(132,204,22,0.5)]' : 'bg-white/5 border-white/10'}`}>
                              <CheckCircle2 size={16} />
                            </div>
                            <span className="text-[11px] font-semibold">Delivered</span>
                          </div>

                        </div>
                      </div>

                      {/* Items List */}
                      <div className="bg-[#101415] p-3 rounded-xl space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs">
                            <span className="text-slate-300 font-medium">{item.name} <span className="text-slate-500">x{item.quantity}</span></span>
                            <span className="font-mono text-slate-400">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="glass-card p-8 text-center text-slate-400 rounded-2xl space-y-3">
                <p>No active orders found yet.</p>
                {!isLoggedIn && (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="btn-primary px-4 py-2 text-xs font-bold cursor-pointer"
                  >
                    Sign In to View Your Orders
                  </button>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Right Col: User Profile Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 rounded-2xl space-y-6 border border-white/15">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
              <User size={18} className="text-lime-400" /> Account Profile Details
            </h2>

            {isLoggedIn ? (
              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">Full Name</label>
                  <div className="flex items-center gap-2 bg-[#101415] p-3 rounded-xl text-white font-semibold border border-white/10">
                    <User size={14} className="text-lime-400" /> {userProfile.name}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">Email Address</label>
                  <div className="flex items-center gap-2 bg-[#101415] p-3 rounded-xl text-white font-semibold border border-white/10">
                    <Mail size={14} className="text-lime-400" /> {userProfile.email || 'Not provided'}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">Contact Phone</label>
                  <div className="flex items-center gap-2 bg-[#101415] p-3 rounded-xl text-white font-semibold border border-white/10">
                    <Phone size={14} className="text-lime-400" /> {userProfile.phone || 'Not provided'}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">Default Delivery Address</label>
                  <div className="flex items-start gap-2 bg-[#101415] p-3 rounded-xl text-white font-semibold border border-white/10 leading-relaxed">
                    <MapPin size={16} className="text-lime-400 shrink-0 mt-0.5" /> {userProfile.address || 'Not provided'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4 text-xs">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-400">
                  <User size={24} />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-white">Not Signed In</p>
                  <p className="text-slate-400 text-[11px]">Sign in to manage your profile, saved addresses, and active orders.</p>
                </div>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="w-full btn-primary py-2.5 text-xs font-bold cursor-pointer"
                >
                  Sign In / Create Account
                </button>
              </div>
            )}

            {isLoggedIn && (
              <button className="w-full btn-secondary text-xs cursor-pointer">Edit Profile Information</button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

