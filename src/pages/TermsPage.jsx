import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  useEffect(() => {
    document.title = 'Terms of Service - JCRingforlife Health Science';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <nav className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink font-medium">Terms of Service</span>
        </nav>

        <div className="bg-white rounded-3xl border border-border p-8 md:p-14 shadow-card space-y-8 text-sm md:text-base font-light text-ink-soft leading-relaxed">
          <div>
            <span className="eyebrow text-primary">Commercial Agreement</span>
            <h1 className="text-3xl sm:text-4xl font-light text-ink mt-1 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs text-ink-muted mt-2">
              Effective Date: November 2026 · JCRingforlife LLC
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-ink">1. Pre-Order & Production Allocation</h2>
            <p>
              Pre-ordering the JCRingforlife Smart Ring represents an advance reservation for our initial Founder Edition production run. Production delivery is targeted for Q3 2026. Prior to ring fabrication, all purchasers receive a complimentary physical sizing kit.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-border">
            <h2 className="text-xl font-medium text-ink">2. 30-Day Money-Back Guarantee</h2>
            <p>
              We stand behind the engineering of the JCRingforlife ring. You may return the ring within 30 days of physical product delivery for a full refund of your purchase price, provided the ring is in its original condition with the magnetic charger dock.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-border">
            <h2 className="text-xl font-medium text-ink">3. Not a Medical Device Disclaimer</h2>
            <p>
              JCRingforlife Ring and the companion mobile software are engineered solely for recreational fitness, sleep hygiene, and general physiological awareness. The system is not cleared by the FDA or medical authorities to diagnose, cure, mitigate, treat, or prevent any cardiovascular, metabolic, or neurological disorder.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-border">
            <h2 className="text-xl font-medium text-ink">4. Lifetime App Access</h2>
            <p>
              Your Founder Edition purchase includes perpetual, royalty-free access to all core JCRingforlife Vitals telemetry without mandatory recurring monthly fees.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
