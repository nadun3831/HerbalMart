import React from 'react';
import { useStore } from '../data/store';
import { ShoppingCart, Search, Leaf, Shield, UserCheck, Sparkles, SlidersHorizontal } from 'lucide-react';

export const Navbar = ({ searchQuery, setSearchQuery }) => {
  const { role, setRole, customerTab, setCustomerTab, cart, setIsCartOpen } = useStore();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 glass-nav border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setRole('customer'); setCustomerTab('store'); }}>
            <div className="w-11 h-11 rounded-xl bg-emerald-950 border border-lime-500/40 flex items-center justify-center text-lime-400 shadow-[0_0_15px_rgba(132,204,22,0.25)]">
              <Leaf size={24} />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                HerbalMart <span className="text-xs px-2 py-0.5 rounded-full bg-lime-500/20 text-lime-400 border border-lime-500/30 font-mono">GLASS FOREST</span>
              </span>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">ORGANIC BOTANICAL AYURVEDA</p>
            </div>
          </div>

          {/* Search Bar (Only for Customer Storefront) */}
          {role === 'customer' && customerTab === 'store' && (
            <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search herbal oils, organic teas, ashwagandha..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#1d2022]/90 text-white placeholder-slate-400 rounded-xl border border-white/10 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 text-sm transition-all shadow-inner"
              />
            </div>
          )}

          {/* Actions & Role Switcher */}
          <div className="flex items-center gap-4">
            
            {/* Role Switcher Pill */}
            <div className="flex items-center bg-[#1d2022] p-1 rounded-xl border border-white/10">
              <button
                onClick={() => { setRole('customer'); setCustomerTab('store'); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  role === 'customer'
                    ? 'bg-lime-500 text-emerald-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserCheck size={14} /> Storefront
              </button>
              <button
                onClick={() => setRole('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  role === 'admin'
                    ? 'bg-emerald-800 text-lime-300 border border-lime-500/40 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Shield size={14} /> Admin Portal
              </button>
            </div>

            {/* Customer Navigation Tabs */}
            {role === 'customer' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCustomerTab('store')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    customerTab === 'store' ? 'text-lime-400 font-bold bg-white/5' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Products
                </button>
                <button
                  onClick={() => setCustomerTab('dashboard')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 ${
                    customerTab === 'dashboard' ? 'text-lime-400 font-bold bg-white/5' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Sparkles size={14} className="text-lime-400" /> My Offers
                </button>

                {/* Cart Drawer Trigger */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2.5 bg-[#1d2022] hover:bg-white/10 border border-white/10 rounded-xl text-slate-200 transition-all hover:border-lime-500/50"
                  aria-label="View Shopping Cart"
                >
                  <ShoppingCart size={20} className="text-lime-400" />
                  {totalCartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-lime-500 text-emerald-950 font-extrabold text-[11px] w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-[#101415] shadow-lg">
                      {totalCartCount}
                    </span>
                  )}
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
