import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AccessibilityPage() {
  useEffect(() => {
    document.title = 'Accessibility Statement - aiOn';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <nav className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink font-medium">Accessibility</span>
        </nav>

        <div className="bg-white rounded-3xl border border-border p-8 md:p-14 shadow-card space-y-8 text-sm md:text-base font-light text-ink-soft leading-relaxed">
          <div>
            <span className="eyebrow text-primary">Inclusivity Commitment</span>
            <h1 className="text-3xl sm:text-4xl font-light text-ink mt-1 tracking-tight">
              Accessibility Statement
            </h1>
            <p className="text-xs text-ink-muted mt-2">
              Conforming to WCAG 2.1 Level AA Standards
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-ink">1. Our Standard</h2>
            <p>
              aiOn Health Science LLC is dedicated to digital accessibility for individuals of all abilities. We actively continually review and enhance our web applications according to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-border">
            <h2 className="text-xl font-medium text-ink">2. Technical Accommodations</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm">
              <li>High-contrast text tokens exceeding 4.5:1 ratio for body copy and 3:1 for large display headers.</li>
              <li>Semantic HTML elements (`main`, `nav`, `header`, `footer`, `article`, `section`) with proper ARIA attributes.</li>
              <li>Keyboard navigable interactive components with clear visible focus rings.</li>
              <li>Descriptive alt text for all product renders, sizing diagrams, and lifestyle imagery.</li>
            </ul>
          </section>

          <section className="space-y-3 pt-6 border-t border-border">
            <h2 className="text-xl font-medium text-ink">3. Feedback & Contact</h2>
            <p>
              If you experience any accessibility barrier while browsing our site or placing a pre-order, please contact us at <a href="mailto:contact@aionrings.com" className="text-primary hover:underline font-semibold">contact@aionrings.com</a> with "Accessibility Assistance" in the subject line.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

