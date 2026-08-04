import React, { useState } from 'react';
import { useStore } from '../data/store';
import { Leaf, User, Lock, Eye, EyeOff, ArrowRight, LogIn } from 'lucide-react';

export const LoginPage = () => {
  const { login } = useStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setIsLoading(true);

    // Simulate a small delay for UX feel
    setTimeout(() => {
      // Admin credentials check
      if (username.trim() === 'admin' && password === '1234') {
        login({
          name: 'HerbalMart Admin',
          email: 'admin@herbalmart.lk',
          role: 'admin',
          avatar: '🛡️',
        });
        return;
      }

      // Any other credentials → login as customer
      login({
        name: username.trim(),
        email: `${username.trim().toLowerCase().replace(/\s+/g, '.')}@herbalmart.lk`,
        role: 'customer',
        avatar: '🌿',
      });
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-transparent text-white selection:bg-lime-500 selection:text-black">
      {/* Floating ambient glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-emerald-900/30 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-lime-500/10 blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-sm space-y-8">
        
        {/* Brand Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-950/80 border border-lime-500/40 shadow-[0_0_30px_rgba(132,204,22,0.3)] mx-auto">
            <Leaf size={40} className="text-lime-400" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              HerbalMart
            </h1>
            <p className="text-xs text-lime-400/80 font-mono mt-1 tracking-wider">VERDANT GLASS FOREST</p>
            <p className="text-sm text-slate-400 mt-2">Sign in to continue</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="glass-card rounded-3xl p-8 space-y-6 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          
          <form onSubmit={handleSignIn} className="space-y-5">
            
            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Username</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
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
                  className="absolute right-3.5 top-2.5 text-slate-400 hover:text-white transition-colors"
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
              disabled={isLoading}
              className="w-full btn-primary py-3 text-sm font-bold mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
                  Signing In...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <LogIn size={16} /> Sign In
                </span>
              )}
            </button>
          </form>

          {/* Info hint */}
          <div className="text-center text-[11px] text-slate-500 border-t border-white/10 pt-4 space-y-1">
            <p>Enter any username & password to sign in as <span className="text-lime-400 font-semibold">Customer</span></p>
            <p className="text-slate-600">Admin access: <span className="font-mono text-slate-400">admin / 1234</span></p>
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
