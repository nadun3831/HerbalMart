import React, { useState } from 'react';
import { useStore } from '../data/store';
import { X, Star, ShoppingBag, CheckCircle, ShieldCheck, HeartPulse, Leaf, Sparkles } from 'lucide-react';

export const ProductDetailModal = () => {
  const { selectedProduct, isProductModalOpen, setIsProductModalOpen, addToCart } = useStore();
  const [activeTab, setActiveTab] = useState('ingredients'); // 'ingredients' | 'usage' | 'benefits'
  const [qty, setQty] = useState(1);

  if (!isProductModalOpen || !selectedProduct) return null;

  const hasDiscount = selectedProduct.discount_price && selectedProduct.discount_price < selectedProduct.price;
  const isOutOfStock = selectedProduct.stock_qty <= 0;

  return (
    <div className="modal-overlay animate-fade-in" onClick={() => setIsProductModalOpen(false)}>
      <div
        className="modal-content relative p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsProductModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Image Side */}
          <div>
            <div className="aspect-square bg-emerald-50 rounded-2xl overflow-hidden border border-emerald-100 shadow-inner relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              {hasDiscount && (
                <span className="absolute top-4 left-4 badge-discount font-bold text-sm px-3 py-1">
                  OFFER SPECIAL
                </span>
              )}
            </div>

            {/* Quick Trust Tags */}
            <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] text-slate-600 font-semibold">
              <div className="flex items-center gap-1.5 p-2 bg-emerald-50/80 rounded-lg text-emerald-900 border border-emerald-100">
                <ShieldCheck size={16} className="text-emerald-700" /> 100% Organic Formula
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-emerald-50/80 rounded-lg text-emerald-900 border border-emerald-100">
                <Sparkles size={16} className="text-emerald-700" /> Lab Tested & Certified
              </div>
            </div>
          </div>

          {/* Info Side */}
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge-herbal uppercase tracking-wider text-[10px]">
                  {selectedProduct.category_id}
                </span>
                <span className="text-xs text-slate-400">SKU: {selectedProduct.sku}</span>
              </div>

              <h2 className="font-heading font-bold text-2xl text-emerald-950 mb-2 leading-tight">
                {selectedProduct.name}
              </h2>

              <div className="flex items-center gap-4 mb-4 text-xs">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star size={16} className="fill-amber-400 text-amber-400" />
                  <span>{selectedProduct.rating}</span>
                  <span className="text-slate-400 font-normal">({selectedProduct.reviews_count} customer reviews)</span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600 font-semibold">{selectedProduct.unit}</span>
              </div>

              {/* Price & Discount Box */}
              <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100 mb-6 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-emerald-800 font-semibold uppercase">Regular & Discounted Price</div>
                  <div className="flex items-baseline gap-3 mt-1">
                    {hasDiscount ? (
                      <>
                        <span className="text-2xl font-black text-emerald-950">
                          Rs. {selectedProduct.discount_price.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                        </span>
                        <span className="text-sm text-slate-400 line-through font-medium">
                          Rs. {selectedProduct.price.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-black text-emerald-950">
                        Rs. {selectedProduct.price.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-900">
                    {isOutOfStock ? (
                      <span className="text-red-600">Out of Stock</span>
                    ) : (
                      <span className="text-emerald-700">{selectedProduct.stock_qty} available in stock</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Detail Tabs */}
              <div className="mb-6">
                <div className="flex border-b border-slate-200 text-xs font-bold gap-4 mb-3">
                  <button
                    onClick={() => setActiveTab('ingredients')}
                    className={`pb-2 border-b-2 transition-colors ${
                      activeTab === 'ingredients'
                        ? 'border-emerald-800 text-emerald-900'
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Key Ingredients
                  </button>
                  <button
                    onClick={() => setActiveTab('usage')}
                    className={`pb-2 border-b-2 transition-colors ${
                      activeTab === 'usage'
                        ? 'border-emerald-800 text-emerald-900'
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    How to Use
                  </button>
                  <button
                    onClick={() => setActiveTab('benefits')}
                    className={`pb-2 border-b-2 transition-colors ${
                      activeTab === 'benefits'
                        ? 'border-emerald-800 text-emerald-900'
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Ayurvedic Benefits
                  </button>
                </div>

                <div className="text-xs text-slate-600 leading-relaxed min-h-[70px]">
                  {activeTab === 'ingredients' && (
                    <div className="bg-white p-3 rounded-lg border border-slate-100">
                      <p className="font-medium text-slate-800">{selectedProduct.ingredients}</p>
                    </div>
                  )}

                  {activeTab === 'usage' && (
                    <div className="bg-white p-3 rounded-lg border border-slate-100">
                      <p className="font-medium text-slate-800">{selectedProduct.usage_info}</p>
                    </div>
                  )}

                  {activeTab === 'benefits' && (
                    <ul className="space-y-1.5">
                      {selectedProduct.health_benefits?.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-800 font-medium">
                          <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-200 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-2 text-xs font-bold text-slate-800">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(selectedProduct.stock_qty, q + 1))}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-200 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  addToCart(selectedProduct, qty);
                  setIsProductModalOpen(false);
                }}
                disabled={isOutOfStock}
                className="flex-1 btn-primary py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                {isOutOfStock ? 'Currently Unavailable' : `Add ${qty} to Cart`}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
