import React, { useState, useMemo } from 'react';
import { useStore } from '../data/store';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, ShieldCheck, Truck, RotateCcw, Filter, ArrowUpDown, Tag } from 'lucide-react';

export const CustomerStorefront = ({ searchQuery, setSearchQuery }) => {
  const { products, categories, activeDiscounts, setSelectedProduct } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.status === 'active')
      .filter((p) => {
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const query = searchQuery.toLowerCase();
        const nameMatch = (p.name || '').toLowerCase().includes(query);
        const descMatch = (p.shortDescription || p.description || '').toLowerCase().includes(query);
        const catMatch = (p.category || '').toLowerCase().includes(query);
        const ingMatch = Array.isArray(p.ingredients)
          ? p.ingredients.some((i) => (i || '').toLowerCase().includes(query))
          : typeof p.ingredients === 'string'
            ? p.ingredients.toLowerCase().includes(query)
            : false;
        const matchesSearch = !query || nameMatch || descMatch || catMatch || ingMatch;
        const matchesDiscount = onlyDiscounted ? !!p.discountPrice : true;
        return matchesCategory && matchesSearch && matchesDiscount;
      })
      .sort((a, b) => {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;
        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.featured ? 1 : -1;
      });
  }, [products, selectedCategory, searchQuery, sortBy, onlyDiscounted]);

  const featuredDealProduct = products.find((p) => p.discountPrice && p.featured) || products[0];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Banner Section - Stitch Exact Heading & Subtitle */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#064e3b] via-[#101415] to-[#1d2022] border border-white/15 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-lime-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-lime-500/10 border border-lime-500/30 text-lime-400 font-semibold text-xs px-3.5 py-1.5 rounded-full backdrop-blur-md">
              <Sparkles size={14} /> 100% ORGANIC & AYURVEDIC CERTIFIED
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Purity meets <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-300 to-teal-200">
                Precision.
              </span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
              Discover our meticulously sourced, lab-tested herbal remedies. Nature's wisdom, distilled for your wellness journey.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#catalog"
                className="btn-primary px-6 py-3 text-sm font-bold shadow-lg"
              >
                Explore Herbal Catalog
              </a>
              {activeDiscounts.length > 0 && (
                <div className="bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl flex items-center gap-3 text-xs text-slate-200">
                  <Tag size={16} className="text-lime-400" />
                  <span>
                    Use code <strong className="text-lime-400 font-mono font-bold">{activeDiscounts[0].code}</strong> for {activeDiscounts[0].percentage}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* Assurance Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-lime-400 shrink-0" />
                <span>100% Authentic</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-lime-400 shrink-0" />
                <span>Islandwide Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={18} className="text-lime-400 shrink-0" />
                <span>Quality Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Featured Product Spotlight Card */}
          {featuredDealProduct && (
            <div className="lg:col-span-5">
              <div className="glass-card rounded-2xl p-5 border border-lime-500/30 relative">
                <div className="absolute top-3 right-3 bg-lime-500 text-emerald-950 font-bold text-[11px] px-2.5 py-1 rounded-md shadow-md">
                  HOT DEAL
                </div>
                <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-emerald-950/60">
                  <img
                    src={featuredDealProduct.image}
                    alt={featuredDealProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-lime-400 uppercase tracking-wider">{featuredDealProduct.category}</span>
                  <h4 className="font-bold text-white text-lg">{featuredDealProduct.name}</h4>
                  <p className="text-xs text-slate-300 line-clamp-2">{featuredDealProduct.shortDescription}</p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-baseline gap-2 font-mono">
                      <span className="text-xl font-bold text-lime-400">Rs. {(featuredDealProduct.discountPrice || featuredDealProduct.price).toLocaleString()}</span>
                      {featuredDealProduct.discountPrice && (
                        <span className="text-xs text-slate-500 line-through">Rs. {featuredDealProduct.price.toLocaleString()}</span>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedProduct(featuredDealProduct)}
                      className="btn-accent py-1.5 px-3.5 text-xs"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Stitch Curated Categories Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          🌿 Curated Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-lime-500/40 transition-all cursor-pointer" onClick={() => setSelectedCategory('Ayurvedic Teas')}>
            <span className="text-2xl mb-2 block">🍵</span>
            <h3 className="text-lg font-bold text-white">Artisan Teas</h3>
            <p className="text-xs text-slate-400 mt-1">Soothing herbal tea blends for every moment of your day.</p>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-lime-500/40 transition-all cursor-pointer" onClick={() => setSelectedCategory('Herbal Oils')}>
            <span className="text-2xl mb-2 block">🧴</span>
            <h3 className="text-lg font-bold text-white">Essential Oils</h3>
            <p className="text-xs text-slate-400 mt-1">Concentrated botanical extracts & traditional hair elixirs.</p>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-lime-500/40 transition-all cursor-pointer" onClick={() => setSelectedCategory('Wellness Capsules')}>
            <span className="text-2xl mb-2 block">💊</span>
            <h3 className="text-lg font-bold text-white">Daily Supplements</h3>
            <p className="text-xs text-slate-400 mt-1">Targeted wellness capsules, Gotukola & Ashwagandha roots.</p>
          </div>
        </div>
      </section>

      {/* Product Catalog Controls & Grid */}
      <section id="catalog" className="space-y-8">
        
        {/* Category Pills & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#1d2022]/80 backdrop-blur-md p-4 rounded-2xl border border-white/10">
          
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'All'
                  ? 'bg-lime-500 text-emerald-950 font-bold shadow-lg'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              🌿 All Remedies ({products.length})
            </button>
            {categories.map((cat) => {
              const count = products.filter((p) => p.category === cat.name).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.name
                      ? 'bg-lime-500 text-emerald-950 font-bold shadow-lg'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {cat.icon} {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Sort & Discount Checkbox */}
          <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyDiscounted}
                onChange={(e) => setOnlyDiscounted(e.target.checked)}
                className="w-4 h-4 accent-lime-500 rounded cursor-pointer"
              />
              <span>On Sale Only</span>
            </label>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ArrowUpDown size={14} className="text-lime-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#101415] text-white border border-white/15 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-lime-500 cursor-pointer"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-card rounded-2xl border border-white/10 space-y-4">
            <Filter size={40} className="mx-auto text-slate-500" />
            <h3 className="text-lg font-bold text-white">No Herbal Remedies Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We couldn't find any products matching your current search or category filter. Try clearing filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setOnlyDiscounted(false);
              }}
              className="btn-secondary text-xs"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </section>

    </div>
  );
};
