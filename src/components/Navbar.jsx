import React from 'react';
import { useStore } from '../data/store';
import { ShoppingBag, Leaf, Shield, UserCheck, LayoutDashboard, Store, Tag, Package, BarChart3 } from 'lucide-react';

export const Navbar = ({ searchQuery, setSearchQuery }) => {
  const {
    role,
    setRole,
    customerTab,
    setCustomerTab,
    adminTab,
    setAdminTab,
    cart,
    setIsCartOpen,
    discounts
  } = useStore();

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const activeDiscountsCount = discounts.filter(d => d.status === 'active').length;

  return (
    <header className="sticky top-0 z-40 glass-nav shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCustomerTab('store')}>
            <div className="w-12 h-12 rounded-xl bg-emerald-900 flex items-center justify-center text-emerald-400 shadow-md transform hover:rotate-6 transition-transform">
              <Leaf size={26} className="text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-2xl font-bold text-emerald-950 tracking-tight">HerbalMart</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  100% Natural
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">Ayurvedic & Herbal Wellness Store</p>
            </div>
          </div>

          {/* Navigation Links based on Role */}
          <div className="hidden md:flex items-center gap-2 bg-emerald-50/70 p-1.5 rounded-xl border border-emerald-100">
            {role === 'customer' ? (
              <>
                <button
                  onClick={() => setCustomerTab('store')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    customerTab === 'store'
                      ? 'bg-emerald-900 text-white shadow-sm'
                      : 'text-emerald-900 hover:bg-emerald-100/60'
                  }`}
                >
                  <Store size={18} />
                  Product Store
                </button>

                <button
                  onClick={() => setCustomerTab('dashboard')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    customerTab === 'dashboard'
                      ? 'bg-emerald-900 text-white shadow-sm'
                      : 'text-emerald-900 hover:bg-emerald-100/60'
                  }`}
                >
                  <UserCheck size={18} />
                  Customer Dashboard
                  {activeDiscountsCount > 0 && (
                    <span className="bg-amber-400 text-emerald-950 text-[10px] font-black px-1.5 py-0.5 rounded-full animate-pulse">
                      {activeDiscountsCount} Offers
                    </span>
                  )}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setAdminTab('analytics')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    adminTab === 'analytics'
                      ? 'bg-emerald-900 text-white shadow-sm'
                      : 'text-emerald-900 hover:bg-emerald-100'
                  }`}
                >
                  <BarChart3 size={16} />
                  Sales Analytics
                </button>

                <button
                  onClick={() => setAdminTab('products')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    adminTab === 'products'
                      ? 'bg-emerald-900 text-white shadow-sm'
                      : 'text-emerald-900 hover:bg-emerald-100'
                  }`}
                >
                  <Package size={16} />
                  Products & Stock
                </button>

                <button
                  onClick={() => setAdminTab('discounts')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    adminTab === 'discounts'
                      ? 'bg-emerald-900 text-white shadow-sm'
                      : 'text-emerald-900 hover:bg-emerald-100'
                  }`}
                >
                  <Tag size={16} />
                  Discounts Engine
                </button>

                <button
                  onClick={() => setAdminTab('orders')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    adminTab === 'orders'
                      ? 'bg-emerald-900 text-white shadow-sm'
                      : 'text-emerald-900 hover:bg-emerald-100'
                  }`}
                >
                  <LayoutDashboard size={16} />
                  Orders Control
                </button>
              </>
            )}
          </div>

          {/* Right Action Bar: Search, Role Switcher & Cart */}
          <div className="flex items-center gap-3">
            
            {/* Search Box (For Customer View) */}
            {role === 'customer' && customerTab === 'store' && (
              <div className="relative hidden lg:block w-48 xl:w-64">
                <input
                  type="text"
                  placeholder="Search herbal products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-800"
                />
                <Leaf size={14} className="absolute left-3 top-2.5 text-emerald-600" />
              </div>
            )}

            {/* Role Switcher Pill */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
              <button
                onClick={() => setRole('customer')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  role === 'customer'
                    ? 'bg-white text-emerald-900 shadow-sm border border-emerald-100'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Switch to Customer view"
              >
                <UserCheck size={14} />
                Customer
              </button>
              <button
                onClick={() => setRole('admin')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  role === 'admin'
                    ? 'bg-emerald-900 text-amber-300 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Switch to Admin Management Mode"
              >
                <Shield size={14} />
                Admin
              </button>
            </div>

            {/* Cart Trigger Button */}
            {role === 'customer' && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-emerald-900 hover:bg-emerald-800 text-white p-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center"
                title="View Shopping Cart"
              >
                <ShoppingBag size={20} className="text-emerald-300" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-emerald-950 font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    {totalCartCount}
                  </span>
                )}
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
