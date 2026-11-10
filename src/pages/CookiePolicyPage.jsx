import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, RotateCcw, Check } from 'lucide-react';

export default function CookiePolicyPage() {
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    document.title = 'Cookie Policy - JCRingforlife Health Science';
    window.scrollTo(0, 0);
  }, []);

  const handleResetPreferences = () => {
    try {
      localStorage.removeItem('jcring_cookie_choice');
      localStorage.removeItem('aion_cookie_choice');
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <nav className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink font-medium">Cookie Policy</span>
        </nav>

        <div className="bg-white rounded-3xl border border-border p-8 md:p-14 shadow-card space-y-8 text-sm md:text-base font-light text-ink-soft leading-relaxed">
          <div>
            <span className="eyebrow text-primary">Web Transparency</span>
            <h1 className="text-3xl sm:text-4xl font-light text-ink mt-1 tracking-tight">
              Cookie Policy
            </h1>
            <p className="text-xs text-ink-muted mt-2">
              Last Updated: November 2026 · JCRingforlife LLC
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-ink">1. What Are Cookies?</h2>
            <p>
              Cookies are small text fragments stored on your device when you browse websites. They enable essential shopping-cart retention, session security, and aggregate performance analytics.
            </p>
          </section>

          <section className="space-y-4 pt-6 border-t border-border">
            <h2 className="text-xl font-medium text-ink">2. Categories of Cookies Used</h2>
            
            <div className="space-y-3 text-xs md:text-sm">
              <div className="p-4 rounded-2xl bg-canvas border border-border">
                <strong className="text-ink font-semibold block text-sm">Essential Functional Cookies (Required)</strong>
                <p className="mt-1">
                  Required to remember your selected ring finish, sizing kit preferences, and active shopping-cart items. The site cannot function properly without these.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-canvas border border-border">
                <strong className="text-ink font-semibold block text-sm">Privacy-Preserving Analytics (Optional)</strong>
                <p className="mt-1">
                  Helps us understand which guide articles and sizing pages are most helpful. IP addresses are automatically anonymized, and no tracking cookies follow you across external third-party sites.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 pt-6 border-t border-border">
            <h2 className="text-xl font-medium text-ink">3. Manage Your Preferences</h2>
            <p>
              You can reset your cookie consent choices at any time. Clicking the button below clears stored consent and causes the preference banner to reappear on your next reload.
            </p>

            <button
              onClick={handleResetPreferences}
              className="btn-secondary py-2.5 px-6 text-xs font-semibold flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-primary" />
              <span>Reset Cookie Preferences</span>
            </button>

            {resetSuccess && (
              <p className="text-xs text-emerald-600 font-medium">
                ✓ Cookie preferences cleared from local browser storage.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

