import { useEffect, useState } from 'react';

const COOKIE_STORAGE_KEY = 'synsolarise_cookie_consent';

type ConsentChoice = 'accepted' | 'declined' | null;

export function CookieBanner() {
  const [choice, setChoice] = useState<ConsentChoice>('accepted');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(COOKIE_STORAGE_KEY);
      if (saved === 'accepted' || saved === 'declined') {
        setChoice(saved);
      } else {
        setChoice(null);
      }
    } catch {
      setChoice(null);
    }
  }, []);

  const handleDecision = (decision: 'accepted' | 'declined') => {
    setChoice(decision);
    try {
      window.localStorage.setItem(COOKIE_STORAGE_KEY, decision);
    } catch {
      // Ignore storage write errors in restricted browsing contexts
    }
  };

  if (choice !== null) {
    return null;
  }

  return (
    <aside
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-50 bg-[#0B1F3A] text-slate-100 border-t border-slate-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
        <p className="text-xs sm:text-sm text-slate-200 leading-snug truncate sm:whitespace-normal">
          SYNSOLARISE uses essential browser storage to remember your preferences.
        </p>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleDecision('declined')}
            className="px-3 py-1.5 min-h-[36px] text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => handleDecision('accepted')}
            className="px-3.5 py-1.5 min-h-[36px] text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            Accept
          </button>
        </div>
      </div>
    </aside>
  );
}
