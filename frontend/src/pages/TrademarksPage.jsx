import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TrademarksPage() {
  useEffect(() => {
    document.title = 'Trademarks & Intellectual Property - JCRingforlife';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <nav className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink font-medium">Trademarks</span>
        </nav>

        <div className="bg-white rounded-3xl border border-border p-8 md:p-14 shadow-card space-y-8 text-sm md:text-base font-light text-ink-soft leading-relaxed">
          <div>
            <span className="eyebrow text-primary">Legal Notices</span>
            <h1 className="text-3xl sm:text-4xl font-light text-ink mt-1 tracking-tight">
              Trademarks & Intellectual Property
            </h1>
            <p className="text-xs text-ink-muted mt-2">
              JCRingforlife LLC · A Mazo Solutions Inc Company
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-ink">1. Protected Marks</h2>
            <p>
              "JCRingforlife", the stylized JCRingforlife circular ring glyph logo, "Vitality Score", "The Full Circle of Health", and "JCRingforlife Vitals" are registered trademarks or common-law service marks of JCRingforlife LLC and Mazo Solutions Inc. in the United States and international jurisdictions.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-border">
            <h2 className="text-xl font-medium text-ink">2. Hardware & Industrial Design</h2>
            <p>
              The stone-free titanium outer shell curvature, sensor interior molding, and magnetic charging cradle are protected by pending design and utility patents.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-border">
            <h2 className="text-xl font-medium text-ink">3. Third-Party Trademarks</h2>
            <p>
              Bluetooth® is a registered trademark of Bluetooth SIG, Inc. Apple, iOS, and App Store are trademarks of Apple Inc. Google Play and Android are trademarks of Google LLC. Oura and Whoop are trademarks of their respective owners and referenced solely for comparative, nominative fair use.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
