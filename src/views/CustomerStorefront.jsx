import React, { useState } from 'react';
import { useStore } from '../data/store';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, Leaf, Search, Filter, ShieldCheck, HeartPulse, RefreshCw, Truck } from 'lucide-react';

export const CustomerStorefront = ({ searchQuery, setSearchQuery }) => {
  const { products, categories, discounts } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [onlyDiscounts, setOnlyDiscounts] = useState(false);
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-low' | 'price-high' | 'rating'

  // Filter logic
  let filteredProducts = products.filter((product) => {
    // Category match
    const matchCategory = selectedCategory === 'all' || product.category_id === selectedCategory;

    // Search query match
    const matchSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.ingredients?.toLowerCase().includes(searchQuery.toLowerCase());

    // Discount filter
    const matchDiscount = !onlyDiscounts || (product.discount_price && product.discount_price < product.price);

    return matchCategory && matchSearch && matchDiscount;
  });

  // Sorting
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price));
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price));
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  const activePromoBanner = discounts.find((d) => d.status === 'active');

  return (
    <div className="space-y-10 pb-16">
      
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white p-8 sm:p-12 shadow-2xl border border-emerald-800/40">
        
        {/* Background Decorative Pattern */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-700 text-emerald-300 text-xs font-bold mb-4 shadow-sm">
            <Sparkles size={14} className="text-amber-400" /> Authentic Sri Lankan Ayurvedic Formulas
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Pure Natural Vigor & <span className="text-amber-300 italic">Herbal Wellness</span>
          </h1>

          <p className="text-emerald-100/90 text-sm sm:text-base mb-8 leading-relaxed">
            Discover hand-crafted herbal teas, hair growth elixirs, and organic root powders sourced directly from certified botanical gardens.
          </p>

          {/* Quick Active Promotional Spotlight */}
          {activePromoBanner && (
            <div className="bg-emerald-900/90 backdrop-blur-md border border-amber-500/40 p-4 rounded-2xl flex items-center justify-between gap-4 max-w-xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 font-black flex items-center justify-center text-sm shrink-0">
                  %{activePromoBanner.value}
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">Active Promotional Deal</div>
                  <div className="text-xs text-white font-semibold">{activePromoBanner.name}</div>
                </div>
              </div>
              <span className="bg-amber-400 text-emerald-950 font-mono text-xs font-extrabold px-3 py-1.5 rounded-lg shrink-0">
                Code: {activePromoBanner.coupon_code}
              </span>
            </div>
          )}
        </div>

        {/* Hero Features Bar */}
        <div className="mt-10 pt-8 border-t border-emerald-800/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-emerald-200">
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={20} className="text-emerald-400" />
            <span>100% Pure Organic Ingredients</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Truck size={20} className="text-emerald-400" />
            <span>Fast Islandwide COD Shipping</span>
          </div>
          <div className="flex items-center gap-2.5">
            <HeartPulse size={20} className="text-emerald-400" />
            <span>Traditional Doctor Formulations</span>
          </div>
          <div className="flex items-center gap-2.5">
            <RefreshCw size={20} className="text-emerald-400" />
            <span>100% Satisfaction Guarantee</span>
          </div>
        </div>

      </section>

      {/* Category Pills Navigation */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold text-emerald-950 flex items-center gap-2">
            <Leaf size={20} className="text-emerald-700" /> Explore Herbal Categories
          </h2>
          <span className="text-xs text-slate-500 font-medium">Showing {filteredProducts.length} items</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-emerald-900 text-white border-emerald-900 shadow-md scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Search, Filter & Sort Control Bar */}
      <section className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Mobile Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by product name, ingredients or benefits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
          />
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
        </div>

        {/* Filter Switches */}
        <div className="flex items-center gap-4 flex-wrap">
          
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyDiscounts}
              onChange={(e) => setOnlyDiscounts(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-800 focus:ring-emerald-600 border-slate-300"
            />
            <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[11px] font-bold">
              Discounted Offers Only
            </span>
          </label>

          <div className="flex items-center gap-2 text-xs">
            <Filter size={14} className="text-slate-400" />
            <span className="font-bold text-slate-600">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              <option value="featured">Featured Herbal Products</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>

        </div>

      </section>

      {/* Products Grid */}
      <section>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-emerald-100 p-8 shadow-sm">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf size={32} />
            </div>
            <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">No matching products found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
              Try adjusting your search terms or clearing the discount filter to browse all items in HerbalMart.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setOnlyDiscounts(false);
              }}
              className="btn-secondary text-xs px-5 py-2.5 rounded-xl font-bold"
            >
              Reset Filters & Show All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
