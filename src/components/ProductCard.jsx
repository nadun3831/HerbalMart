import React from 'react';
import { useStore } from '../data/store';
import { ShoppingCart, Eye, Star, CheckCircle, AlertTriangle } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart, setSelectedProduct } = useStore();

  const discountPercentage = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const currentPrice = product.discountPrice || product.price;

  return (
    <div className="product-card group flex flex-col justify-between h-full">
      <div>
        {/* Product Image & Badges Container */}
        <div className="relative aspect-square overflow-hidden bg-emerald-950/40">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {discountPercentage > 0 && (
              <span className="bg-lime-500 text-emerald-950 font-bold px-2.5 py-1 rounded-md text-xs shadow-lg">
                -{discountPercentage}% OFF
              </span>
            )}
            {product.featured && (
              <span className="bg-emerald-900/90 backdrop-blur-md text-lime-300 border border-lime-500/30 font-semibold px-2.5 py-1 rounded-md text-[11px]">
                🌿 Premium
              </span>
            )}
          </div>

          {/* Quick Details Floating Overlay */}
          <div className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedProduct(product)}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-semibold text-xs py-2 px-4 rounded-xl flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Eye size={15} /> Quick View Details
            </button>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="p-5 space-y-3">
          
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span className="uppercase tracking-wider font-mono text-[11px] text-lime-400/80">{product.category}</span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={14} className="fill-amber-400" />
              <span className="font-bold text-slate-200">{product.rating}</span>
              <span className="text-slate-500">({product.reviewsCount})</span>
            </div>
          </div>

          <h3
            onClick={() => setSelectedProduct(product)}
            className="font-semibold text-white text-base leading-snug cursor-pointer hover:text-lime-400 transition-colors line-clamp-2"
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>
      </div>

      {/* Footer Section: Stock & Price */}
      <div className="p-5 pt-0 space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono text-lime-400">
              Rs. {currentPrice.toLocaleString()}
            </span>
            {product.discountPrice && (
              <span className="text-xs text-slate-500 line-through font-mono">
                Rs. {product.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stock Level Badge */}
          {product.stock > 5 ? (
            <span className="text-[11px] font-semibold text-lime-400 flex items-center gap-1 bg-lime-500/10 px-2 py-0.5 rounded-full border border-lime-500/20">
              <CheckCircle size={12} /> In Stock
            </span>
          ) : product.stock > 0 ? (
            <span className="text-[11px] font-semibold text-amber-300 flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              <AlertTriangle size={12} /> Only {product.stock} left
            </span>
          ) : (
            <span className="text-[11px] font-semibold text-rose-400 flex items-center gap-1 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
              Out of stock
            </span>
          )}
        </div>

        <button
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart size={16} /> Add to Cart
        </button>

      </div>
    </div>
  );
};
