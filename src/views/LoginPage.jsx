import React, { useState } from 'react';
import { useStore } from '../data/store';
import { Leaf, User, Shield, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';

export const LoginPage = () => {
  const { login } = useStore();
  const [selectedRole, setSelectedRole] = useState(null); // null | 'customer' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleSignIn = (e) => {
    e.preventDefault();
    setError(null);

    if (!selectedRole) {
      setError('Please select your account type first.');
      return;
    }
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    // Simulate login (no backend yet)
    login({
      name: name.trim(),
      email: email.trim(),
      role: selectedRole,
      avatar: selectedRole === 'admin' ? '🛡️' : '🌿',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-transparent text-white selection:bg-lime-500 selection:text-black">
      {/* Floating ambient glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-emerald-900/30 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-lime-500/10 blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-md space-y-8">
        
        {/* Brand Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-950 border border-lime-500/40 shadow-[0_0_30px_rgba(132,204,22,0.3)] mx-auto">
            <Leaf size={32} className="text-lime-400" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              HerbalMart <span className="text-xs px-2 py-0.5 rounded-full bg-lime-500/20 text-lime-400 border border-lime-500/30 font-mono align-middle">GLASS FOREST</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">Sign in to access your wellness journey</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="glass-card rounded-3xl p-8 space-y-6 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          
          {/* Step 1: Role Selection */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono block">
              Select Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole('customer')}
                className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all duration-300 ${
                  selectedRole === 'customer'
                    ? 'border-lime-500 bg-lime-500/10 shadow-[0_0_20px_rgba(132,204,22,0.2)]'
                    : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/8'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  selectedRole === 'customer' ? 'bg-lime-500/20 text-lime-400' : 'bg-white/10 text-slate-400'
                }`}>
                  <User size={24} />
                </div>
                <div className="text-center">
                  <p className={`text-sm font-bold ${selectedRole === 'customer' ? 'text-lime-400' : 'text-white'}`}>Customer</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Browse & Shop Products</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all duration-300 ${
                  selectedRole === 'admin'
                    ? 'border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(6,78,59,0.3)]'
                    : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/8'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  selectedRole === 'admin' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-slate-400'
                }`}>
                  <Shield size={24} />
                </div>
                <div className="text-center">
                  <p className={`text-sm font-bold ${selectedRole === 'admin' ? 'text-emerald-300' : 'text-white'}`}>Admin</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Manage Store & Analytics</p>
                </div>
              </button>
            </div>
          </div>

          {/* Step 2: Credentials Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#101415] text-white placeholder-slate-500 rounded-xl border border-white/15 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500/50 text-sm transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#101415] text-white placeholder-slate-500 rounded-xl border border-white/15 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500/50 text-sm transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-[#101415] text-white placeholder-slate-500 rounded-xl border border-white/15 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500/50 text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-2.5 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg">
                ⚠️ {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full btn-primary py-3 text-sm font-bold mt-2"
            >
              Sign In {selectedRole === 'admin' ? 'as Administrator' : selectedRole === 'customer' ? 'as Customer' : ''} <ArrowRight size={16} />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <div className="flex-1 h-px bg-white/10" />
            <span>DEMO CREDENTIALS</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Quick Demo Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                login({
                  name: 'Chaminda Silva',
                  email: 'chaminda@herbalmart.lk',
                  role: 'customer',
                  avatar: '🌿'
                });
              }}
              className="btn-secondary py-2.5 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Sparkles size={14} className="text-lime-400" /> Quick Customer
            </button>
            <button
              type="button"
              onClick={() => {
                login({
                  name: 'Admin Perera',
                  email: 'admin@herbalmart.lk',
                  role: 'admin',
                  avatar: '🛡️'
                });
              }}
              className="btn-accent py-2.5 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Shield size={14} /> Quick Admin
            </button>
          </div>

        </div>

        {/* Footer Text */}
        <p className="text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} HerbalMart — Verdant Glass Forest Edition
        </p>

      </div>
    </div>
  );
};
