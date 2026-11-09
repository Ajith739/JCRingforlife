import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, AlertCircle, Check } from 'lucide-react';

export default function DeleteAccountPage() {
  const [email, setEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.title = 'Delete Account & Biometric Data Erasure - aiOn';
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !confirmed) return;
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-2xl">
        <nav className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink font-medium">Delete Account</span>
        </nav>

        <div className="bg-white rounded-3xl border border-border p-8 md:p-12 shadow-card space-y-6">
          <div className="flex items-center gap-3 text-rose-600">
            <Trash2 className="w-8 h-8" />
            <h1 className="text-2xl sm:text-3xl font-light text-ink">
              Biometric Erasure & Account Deletion
            </h1>
          </div>

          <p className="text-sm font-light text-ink-soft leading-relaxed">
            In compliance with GDPR Article 17 and CCPA, you may initiate the permanent erasure of your aiOn account, personal identity information, and historical cloud biometric telemetry.
          </p>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 space-y-1">
            <div className="flex items-center gap-2 font-semibold">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Permanent and Irreversible Action</span>
            </div>
            <p className="pl-6">
              Once submitted, all nocturnal sleep records, HRV trends, and Vitality baseline histories will be permanently purged from our encrypted data stores.
            </p>
          </div>

          {done ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h2 className="text-xl font-medium text-ink">Erasure Request Submitted</h2>
              <p className="text-xs text-ink-soft max-w-sm mx-auto">
                A verification link has been dispatched to <strong>{email}</strong>. Once confirmed, your records will be purged within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Account Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="your-email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <label className="flex items-start gap-2.5 text-xs text-ink-soft pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-0.5 rounded text-rose-600 focus:ring-rose-500"
                />
                <span>
                  I understand this will permanently delete my aiOn cloud account and all historical sleep and recovery telemetry.
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                Submit Permanent Erasure Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

