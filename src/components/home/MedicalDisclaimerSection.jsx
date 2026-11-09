import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function MedicalDisclaimerSection() {
  return (
    <section className="relative py-16 md:py-24 bg-white border-t border-border">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="rounded-3xl border border-border/80 bg-canvas p-7 md:p-10 text-center backdrop-blur-xl">
          <div className="mx-auto w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 mb-3">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <p className="eyebrow text-ink-muted">General Wellness Product</p>
          <div className="mt-4 space-y-3 text-xs md:text-sm font-light text-ink-soft leading-relaxed max-w-2xl mx-auto">
            <p>
              aiOn Ring is intended for general wellness and physical fitness awareness only. It is <strong>not a medical device</strong> and is not cleared, approved, or regulated to diagnose, treat, cure, or prevent any illness, disease, or pathological condition.
            </p>
            <p>
              Metrics including estimated blood pressure trends and metabolic indices represent statistical approximations of wellness patterns, not clinical readings. Never make changes to prescribed medications, therapy, or clinical treatment plans without consulting your personal physician or licensed healthcare provider.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

