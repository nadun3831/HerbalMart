import React, { useState } from 'react';
import { useStore } from '../data/store';
import { apiLogin, apiRegister } from '../data/api';
import { Leaf, User, Lock, Eye, EyeOff, Mail, LogIn, UserPlus } from 'lucide-react';

export const LoginPage = () => {
  const { login, showToast } = useStore();
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await apiLogin(email.trim(), password);
      login({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        avatar: data.user.role === 'admin' ? '🛡️' : '🌿',
      });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (regPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await apiRegister(
        regName.trim(),
        regEmail.trim(),
        regPassword,
        regConfirmPassword
      );
      login({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        avatar: '🌿',
      });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setError(null);
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
            <p className="text-sm text-slate-400 mt-2">
              {isRegisterMode ? 'Create your account' : 'Sign in to continue'}
            </p>
          </div>
        </div>

        {/* Login / Register Card */}
        <div className="glass-card rounded-3xl p-8 space-y-6 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

          {!isRegisterMode ? (
            /* ── LOGIN FORM ─────────────────────────────── */
            <form onSubmit={handleSignIn} className="space-y-5">

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

              {/* Error */}
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
          ) : (
            /* ── REGISTER FORM ──────────────────────────── */
            <form onSubmit={handleRegister} className="space-y-4">

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    autoFocus
                    className="w-full pl-10 pr-4 py-2.5 bg-[#101415] text-white placeholder-slate-500 rounded-xl border border-white/15 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500/50 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
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
                    placeholder="Min 6 characters"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
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

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Confirm Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#101415] text-white placeholder-slate-500 rounded-xl border border-white/15 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500/50 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Error */}
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
                    Creating Account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <UserPlus size={16} /> Create Account
                  </span>
                )}
              </button>
            </form>
          )}

          {/* Toggle Login / Register */}
          <div className="text-center text-[11px] text-slate-500 border-t border-white/10 pt-4 space-y-2">
            {isRegisterMode ? (
              <p>
                Already have an account?{' '}
                <button onClick={switchMode} className="text-lime-400 font-semibold hover:underline">
                  Sign In
                </button>
              </p>
            ) : (
              <>
                <p>
                  Don't have an account?{' '}
                  <button onClick={switchMode} className="text-lime-400 font-semibold hover:underline">
                    Create one
                  </button>
                </p>

              </>
            )}
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
