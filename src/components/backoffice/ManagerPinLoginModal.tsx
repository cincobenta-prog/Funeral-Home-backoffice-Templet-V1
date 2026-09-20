import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Delete, Sparkles, X, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react';

interface ManagerPinLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const VALID_PINS = ['1928', '8850', '2026'];

export const ManagerPinLoginModal: React.FC<ManagerPinLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError(null);
      setIsShaking(false);
      setIsUnlocked(false);
    }
  }, [isOpen]);

  // Keyboard support for numpad / digits
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, pin]);

  const handleDigit = (digit: string) => {
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setError(null);

      if (nextPin.length === 4) {
        validatePin(nextPin);
      }
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError(null);
  };

  const handleClear = () => {
    setPin('');
    setError(null);
  };

  const validatePin = (inputPin: string) => {
    if (VALID_PINS.includes(inputPin)) {
      setIsUnlocked(true);
      setError(null);
      setTimeout(() => {
        onSuccess();
      }, 500);
    } else {
      setIsShaking(true);
      setError('Invalid Manager PIN. Default demo PINs: 1928 (Founding Year) or 8850 (Office Phone).');
      setTimeout(() => {
        setIsShaking(false);
        setPin('');
      }, 700);
    }
  };

  const handleFastDemoUnlock = () => {
    setPin('1928');
    setIsUnlocked(true);
    setTimeout(() => {
      onSuccess();
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className={`bg-white border border-neutral-200 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-300 ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        {/* Top Gold & Crimson Banner Gradient */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#991b1b] via-[#b45309] to-[#991b1b]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex flex-col items-center text-center space-y-3 pt-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-50 to-amber-50 border border-red-200 flex items-center justify-center text-[#991b1b] shadow-inner">
            {isUnlocked ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-600 animate-bounce" />
            ) : (
              <KeyRound className="w-7 h-7 text-[#991b1b]" />
            )}
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-[#991b1b] text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3 h-3" />
              <span>NYS Bureau of Funeral Directing Security Gate</span>
            </div>
            <h3 className="font-serif-title font-bold text-xl text-neutral-900">
              Executive Manager Portal
            </h3>
            <p className="text-xs text-neutral-500 font-light mt-0.5">
              Enter Managing Director Security PIN for staff scheduling, trade guild director dispatch, and 1099 payroll.
            </p>
          </div>
        </div>

        {/* PIN Dot Indicators */}
        <div className="flex justify-center items-center gap-3 my-6">
          {[0, 1, 2, 3].map((index) => {
            const isFilled = pin.length > index;
            return (
              <div
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  isUnlocked
                    ? 'bg-emerald-500 scale-110 shadow-md shadow-emerald-400/50'
                    : isFilled
                    ? 'bg-[#991b1b] scale-110 shadow-md shadow-red-900/30'
                    : 'bg-neutral-200 border border-neutral-300'
                }`}
              />
            );
          })}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-[#991b1b] flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="text-[11px] leading-tight">{error}</span>
          </div>
        )}

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-2.5 max-w-xs mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleDigit(digit)}
              className="h-13 bg-neutral-50 hover:bg-neutral-100 active:bg-red-50 active:text-[#991b1b] border border-neutral-200 rounded-2xl text-lg font-bold text-neutral-800 transition shadow-xs flex items-center justify-center font-mono select-none"
            >
              {digit}
            </button>
          ))}

          {/* Clear / Backspace / 0 */}
          <button
            type="button"
            onClick={handleClear}
            className="h-13 bg-neutral-50 hover:bg-neutral-100 text-neutral-500 active:bg-neutral-200 border border-neutral-200 rounded-2xl text-xs font-semibold transition shadow-xs flex items-center justify-center uppercase tracking-wider select-none"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={() => handleDigit('0')}
            className="h-13 bg-neutral-50 hover:bg-neutral-100 active:bg-red-50 active:text-[#991b1b] border border-neutral-200 rounded-2xl text-lg font-bold text-neutral-800 transition shadow-xs flex items-center justify-center font-mono select-none"
          >
            0
          </button>

          <button
            type="button"
            onClick={handleBackspace}
            className="h-13 bg-neutral-50 hover:bg-neutral-100 text-neutral-600 active:bg-neutral-200 border border-neutral-200 rounded-2xl transition shadow-xs flex items-center justify-center select-none"
            title="Backspace"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        {/* Fast Demo Unlock Helper */}
        <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={handleFastDemoUnlock}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-100" />
            <span>⚡ 1-Tap Demo Unlock (Jason Benta, Managing LFD)</span>
          </button>

          <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-light">
            <Lock className="w-3 h-3" />
            <span>Official BFH PINs: <strong className="text-neutral-600 font-mono">1928</strong> (Founding) or <strong className="text-neutral-600 font-mono">8850</strong> (Office)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
