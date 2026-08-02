import React, { useState } from 'react';
import { useStore } from '../data/store';
import { X, Star, ShoppingCart, CheckCircle, Leaf, Shield, HeartPulse, Plus, Minus } from 'lucide-react';

export const ProductDetailModal = () => {
  const { selectedProduct, setSelectedProduct, addToCart } = useStore();
  const [activeTab, setActiveTab] = useState('ingredients');
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const currentPrice = selectedProduct.discountPrice || selectedProduct.price;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(selectedProduct);
    }
    setSelectedProduct(null);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content relative p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Product Image */}
          <div className="md:col-span-5 aspect-square rounded-2xl overflow-hidden bg-emerald-950/60 border border-white/10">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div className="md:col-span-7 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono text-lime-400 uppercase tracking-wider">{selectedProduct.category}</span>
              <h2 className="text-2xl font-bold text-white">{selectedProduct.name}</h2>
              
              <div className="flex items-center gap-2 text-xs">
                <div className="flex text-amber-400">
                  <Star size={14} className="fill-amber-400" />
                </div>
                <span className="font-bold text-white">{selectedProduct.rating}</span>
                <span className="text-slate-400">({selectedProduct.reviewsCount} customer reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 pt-2 font-mono">
                <span className="text-2xl font-bold text-lime-400">Rs. {currentPrice.toLocaleString()}</span>
                {selectedProduct.discountPrice && (
                  <span className="text-sm text-slate-500 line-through">Rs. {selectedProduct.price.toLocaleString()}</span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{selectedProduct.shortDescription}</p>
            </div>

            {/* Quantity & Add Button */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-[#101415] border border-white/15 px-3 py-2 rounded-xl text-xs">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover:text-lime-400">
                    <Minus size={14} />
                  </button>
                  <span className="font-mono font-bold w-6 text-center text-white">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="hover:text-lime-400">
                    <Plus size={14} />
                  </button>
                </div>

                <button onClick={handleAddToCart} className="flex-1 btn-primary py-3 text-xs font-bold">
                  <ShoppingCart size={16} /> Add {quantity} to Cart
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed Info (Ingredients, Usage, Health Benefits) */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <div className="flex gap-4 border-b border-white/10 pb-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'ingredients' ? 'border-lime-400 text-lime-400' : 'border-transparent text-slate-400'
              }`}
            >
              🌿 Active Ingredients
            </button>
            <button
              onClick={() => setActiveTab('usage')}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'usage' ? 'border-lime-400 text-lime-400' : 'border-transparent text-slate-400'
              }`}
            >
              📋 Usage Directions
            </button>
            <button
              onClick={() => setActiveTab('benefits')}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'benefits' ? 'border-lime-400 text-lime-400' : 'border-transparent text-slate-400'
              }`}
            >
              💚 Ayurvedic Benefits
            </button>
          </div>

          <div className="text-xs text-slate-300 leading-relaxed">
            {activeTab === 'ingredients' && (
              <div className="flex flex-wrap gap-2">
                {selectedProduct.ingredients.map((ing, idx) => (
                  <span key={idx} className="bg-[#101415] border border-white/15 px-3 py-1 rounded-lg font-mono text-lime-300">
                    {ing}
                  </span>
                ))}
              </div>
            )}
            {activeTab === 'usage' && <p>{selectedProduct.usageInstructions}</p>}
            {activeTab === 'benefits' && (
              <ul className="space-y-1.5 list-disc list-inside">
                {selectedProduct.healthBenefits.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
