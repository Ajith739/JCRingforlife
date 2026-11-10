import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowLeft, ArrowRight, Check } from 'lucide-react';

export default function StressGuidePage() {
  useEffect(() => {
    document.title = 'Stress Tracking Ring: How HRV Reveals Daytime Balance | JCRingforlife';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20">
      <article className="container mx-auto px-6 max-w-4xl">
        <nav className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <Link to="/smart-ring-guide" className="hover:text-ink">Smart Ring Guide</Link>
          <span>/</span>
          <span className="text-ink font-medium">Daytime Stress</span>
        </nav>

        <div className="space-y-4 mb-12">
          <span className="eyebrow text-primary">Biometric Deep Dive</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-ink tracking-tight">
            Stress Tracking Ring: How HRV Reveals Daytime Balance
          </h1>
          <p className="text-base text-ink-soft font-light leading-relaxed">
            How continuous photoplethysmography reveals autonomic tension during work, meetings, and recovery pauses.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-border p-8 md:p-14 shadow-card space-y-8 text-sm md:text-base font-light text-ink-soft leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-ink">
              1. The Physiology of Daytime Autonomic Strain
            </h2>
            <p>
              Stress is not inherently toxic — acute stress enables focus, fast problem-solving, and peak physical output. The biological damage occurs when stress remains sustained without autonomic decompression.
            </p>
            <p>
              JCRingforlife evaluates minute-by-minute pulse wave variations throughout the workday. When your sympathetic branch becomes hyperactive, heart rate intervals tighten and high-frequency HRV power contracts.
            </p>
          </section>

          <section className="space-y-4 pt-6 border-t border-border">
            <h2 className="text-2xl font-light text-ink">
              2. Real-Time Intervention: The Box Breathing Reset
            </h2>
            <p>
              Rather than passively recording that you were stressed six hours later, JCRingforlife triggers calm awareness cues. Just 2 to 4 minutes of structured box breathing stimulates the vagus nerve, causing acetylcholine release that slows heart rate and lifts HRV within 90 seconds.
            </p>
          </section>

          <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/smart-ring-guide/recovery-ring" className="text-xs text-ink-muted hover:text-ink flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4" />
              <span>Previous: Recovery Guide</span>
            </Link>
            <Link to="/preorder" className="btn-brand py-2.5 px-6 text-xs flex items-center gap-1.5">
              <span>Pre-order JCRingforlife Ring</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

