import React from 'react';
import { useStore } from '../data/store';
import { Leaf, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const { setRole, setCustomerTab } = useStore();

  return (
    <footer className="bg-[#101415] text-slate-300 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-lime-500/40 flex items-center justify-center text-lime-400 shadow-[0_0_15px_rgba(132,204,22,0.25)]">
                <Leaf size={22} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">HerbalMart</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              HerbalMart is Sri Lanka's premier web platform for authentic ayurvedic oils, botanical teas, organic root powders, and natural skin elixirs.
            </p>
            <div className="flex items-center gap-2 text-xs text-lime-400 font-semibold">
              <ShieldCheck size={16} /> 100% Certified Organic & Non-GMO
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-lime-400 uppercase tracking-wider font-mono">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <button onClick={() => { setRole('customer'); setCustomerTab('store'); }} className="hover:text-white transition-colors">
                  Product Store Catalog
                </button>
              </li>
              <li>
                <button onClick={() => { setRole('customer'); setCustomerTab('dashboard'); }} className="hover:text-white transition-colors">
                  Customer Dashboard & Offers
                </button>
              </li>
              <li>
                <button onClick={() => setRole('admin')} className="hover:text-white transition-colors">
                  Admin Analytics & Management
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Herbal Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-lime-400 uppercase tracking-wider font-mono">Top Categories</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>Herbal Oils & Scalp Care</li>
              <li>Ayurvedic Immunity Teas</li>
              <li>Ashwagandha & Root Powders</li>
              <li>Gotukola & Moringa Capsules</li>
              <li>Wild Turmeric & Sandalwood Skin Elixirs</li>
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-3 text-xs text-slate-400">
            <h4 className="text-xs font-bold text-lime-400 uppercase tracking-wider font-mono">Customer Support</h4>
            <div className="space-y-2 font-medium">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-lime-400 shrink-0" />
                <span>No 45, Herbal Garden Way, Colombo 07</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-lime-400 shrink-0" />
                <span>+94 11 234 5678 / +94 77 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-lime-400 shrink-0" />
                <span>support@herbalmart.lk</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
          <div>
            © {new Date().getFullYear()} HerbalMart E-Commerce Platform. Verdant Glass Forest Edition.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Ayurvedic Guidelines</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
