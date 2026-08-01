import React from 'react';
import { useStore } from '../data/store';
import { ShoppingBag, Eye, Star, AlertCircle, CheckCircle2 } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart, setSelectedProduct, setIsProductModalOpen, setProductModalMode } = useStore();

  const isLowStock = product.stock_qty > 0 && product.stock_qty <= 5;
  const isOutOfStock = product.stock_qty <= 0;

  const hasDiscount = product.discount_price && product.discount_price < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  const handleOpenDetails = () => {
    setSelectedProduct(product);
    setProductModalMode('view');
    setIsProductModalOpen(true);
  };

  return (
    <div className="product-card group flex flex-col justify-between h-full bg-white relative rounded-2xl overflow-hidden border border-emerald-100/70 shadow-sm hover:shadow-xl transition-all">
      
      {/* Image Container & Badges */}
      <div className="relative aspect-[4/3] bg-emerald-50/50 overflow-hidden cursor-pointer" onClick={handleOpenDetails}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 badge-discount flex items-center gap-1 shadow-md">
            <span>{discountPercent}% OFF</span>
          </div>
        )}

        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          {isOutOfStock ? (
            <span className="bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
              <AlertCircle size={12} /> Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="bg-amber-500 text-slate-950 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow animate-pulse">
              <AlertCircle size={12} /> Only {product.stock_qty} left
            </span>
          ) : (
            <span className="bg-emerald-900/80 backdrop-blur-sm text-emerald-200 text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 size={12} /> In Stock
            </span>
          )}
        </div>

        {/* Quick View Floating Overlay Button */}
        <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDetails();
            }}
            className="bg-white/95 text-emerald-950 px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all hover:bg-white"
          >
            <Eye size={16} /> Quick View Details
          </button>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Unit */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400">({product.reviews_count})</span>
            </div>
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium text-[11px]">
              {product.unit}
            </span>
          </div>

          {/* Product Title */}
          <h3
            onClick={handleOpenDetails}
            className="font-heading font-bold text-slate-900 text-base leading-snug cursor-pointer hover:text-emerald-800 transition-colors line-clamp-2 mb-2"
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & Add to Cart Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Price</div>
            <div className="flex items-baseline gap-2">
              {hasDiscount ? (
                <>
                  <span className="text-lg font-extrabold text-emerald-950">
                    Rs. {product.discount_price.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-xs text-slate-400 line-through font-semibold">
                    Rs. {product.price.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                  </span>
                </>
              ) : (
                <span className="text-lg font-extrabold text-emerald-950">
                  Rs. {product.price.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={isOutOfStock}
            className={`btn-primary p-2.5 rounded-xl text-xs font-bold ${
              isOutOfStock ? 'opacity-50 cursor-not-allowed bg-slate-400 shadow-none' : ''
            }`}
            title={isOutOfStock ? 'Item is out of stock' : 'Add item to cart'}
          >
            <ShoppingBag size={18} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

      </div>
    </div>
  );
};
