import React from 'react';
import { useStore } from '../data/store';
import { Leaf, ShieldCheck, HeartPulse, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const { setRole, setCustomerTab } = useStore();

  return (
    <footer className="bg-emerald-950 text-white pt-16 pb-12 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-900 flex items-center justify-center text-emerald-400">
                <Leaf size={22} />
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight text-white">HerbalMart</span>
            </div>
            <p className="text-emerald-200/80 text-xs leading-relaxed">
              HerbalMart is Sri Lanka's premier web platform for authentic ayurvedic oils, botanical teas, organic root powders, and natural skin elixirs.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold">
              <ShieldCheck size={16} /> 100% Certified Organic & Non-GMO
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-amber-300 uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-emerald-200/80 font-medium">
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
            <h4 className="font-heading text-sm font-bold text-amber-300 uppercase tracking-wider">Top Categories</h4>
            <ul className="space-y-2 text-xs text-emerald-200/80 font-medium">
              <li>Herbal Oils & Scalp Care</li>
              <li>Ayurvedic Immunity Teas</li>
              <li>Ashwagandha & Root Powders</li>
              <li>Gotukola & Moringa Capsules</li>
              <li>Wild Turmeric & Sandalwood Skin Elixirs</li>
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-3 text-xs text-emerald-200/80">
            <h4 className="font-heading text-sm font-bold text-amber-300 uppercase tracking-wider">Customer Support</h4>
            <div className="space-y-2 font-medium">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-emerald-400 shrink-0" />
                <span>No 45, Herbal Garden Way, Colombo 07</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-emerald-400 shrink-0" />
                <span>+94 11 234 5678 / +94 77 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-emerald-400 shrink-0" />
                <span>support@herbalmart.lk</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-emerald-300/70 font-medium">
          <div>
            © {new Date().getFullYear()} HerbalMart E-Commerce Platform. All rights reserved. Built according to PRD Specifications.
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
