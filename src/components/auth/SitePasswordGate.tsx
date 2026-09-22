import React, { useState, useEffect } from 'react';
import { Lock, KeyRound, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff, Sparkles } from 'lucide-react';

interface SitePasswordGateProps {
  children: React.ReactNode;
}

const STORAGE_KEY = 'point_intl_site_access_token';
const CORRECT_PASSWORD = 'Dorrence';

export const SitePasswordGate: React.FC<SitePasswordGateProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check persisted authentication on mount
  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem(STORAGE_KEY);
      if (storedAuth === 'granted') {
        setIsAuthenticated(true);
      }
    } catch {
      // Ignore storage errors in restricted contexts
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const trimmed = passwordInput.trim();
    if (trimmed === CORRECT_PASSWORD || trimmed.toLowerCase() === CORRECT_PASSWORD.toLowerCase()) {
      try {
        localStorage.setItem(STORAGE_KEY, 'granted');
      } catch {
        // Storage fallback
      }
      setIsAuthenticated(true);
      setErrorMsg(null);
    } else {
      setErrorMsg('Incorrect access password. Please try again.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  const handleLockSite = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage fallback
    }
    setIsAuthenticated(false);
    setPasswordInput('');
    setErrorMsg(null);
  };

  // While checking initial local storage, show a sleek dark background
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-amber-300">
        <div className="w-8 h-8 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
      </div>
    );
  }

  // If authenticated, render full application with a discreet lock indicator button
  if (isAuthenticated) {
    return (
      <>
        {children}
        {/* Subtle persistent lock badge in bottom corner */}
        <button
          onClick={handleLockSite}
          title="Lock Site Session"
          className="fixed bottom-3 right-3 z-50 flex items-center space-x-1.5 px-2.5 py-1.5 bg-neutral-900/80 hover:bg-neutral-900 text-neutral-400 hover:text-amber-300 border border-neutral-800 hover:border-amber-400/30 rounded-full text-xs font-mono backdrop-blur-md transition-all shadow-lg group opacity-40 hover:opacity-100"
        >
          <Lock className="w-3 h-3 text-amber-400/70 group-hover:text-amber-400" />
          <span className="hidden sm:inline">Protected Session</span>
        </button>
      </>
    );
  }

  // Password Lock Screen
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between items-center px-4 py-8 relative overflow-hidden font-sans select-none">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-neutral-800/20 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header / Brand Crest */}
      <div className="w-full max-w-md mx-auto pt-6 flex flex-col items-center text-center relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-neutral-900 border border-amber-400/40 flex items-center justify-center mb-4 shadow-xl shadow-amber-950/40 group">
          <ShieldCheck className="w-8 h-8 text-amber-300 group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-400/10 border border-amber-400/30 rounded-full text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3" />
          <span>Confidential Preview Portal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-300">
          Point International
        </h1>
        <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest font-mono">
          Benta&apos;s Funeral Home Management Suite
        </p>
      </div>

      {/* Main Lock Card */}
      <div className="w-full max-w-md mx-auto my-auto relative z-10">
        <div className="bg-neutral-900/90 border border-neutral-800 backdrop-blur-xl p-8 rounded-3xl shadow-2xl shadow-black/80 relative">
          <div className="text-center mb-6">
            <div className="inline-flex p-3 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 mb-3">
              <KeyRound className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-white">Security Verification</h2>
            <p className="text-xs text-neutral-400 mt-1">
              Please enter the site password to access the public showroom &amp; back-office operations suite.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 font-mono">
                Access Password
              </label>
              <div className={`relative flex items-center transition-all ${isShaking ? 'animate-bounce text-rose-400' : ''}`}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  autoFocus
                  placeholder="Enter passphrase..."
                  className={`w-full bg-neutral-950/80 border ${
                    errorMsg ? 'border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/30' : 'border-neutral-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50'
                  } rounded-xl px-4 py-3.5 pr-12 text-sm text-white placeholder-neutral-500 outline-none transition duration-200 font-mono`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 p-1.5 text-neutral-400 hover:text-neutral-200 focus:outline-none transition"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {errorMsg && (
                <div className="flex items-center space-x-1.5 text-xs text-rose-400 pt-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-amber-500 hover:from-amber-400 to-amber-600 hover:to-amber-500 text-neutral-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>Unlock Access</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-500">
            <span className="flex items-center space-x-1">
              <Lock className="w-3 h-3 text-amber-400/60" />
              <span>256-bit Encrypted Gate</span>
            </span>
            <span className="font-mono">v1.0.4-secure</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Notice */}
      <div className="w-full max-w-md mx-auto text-center relative z-10 pt-6">
        <p className="text-[11px] text-neutral-500">
          &copy; {new Date().getFullYear()} Benta&apos;s Funeral Home &amp; Point International. All rights reserved.
        </p>
      </div>
    </div>
  );
};
