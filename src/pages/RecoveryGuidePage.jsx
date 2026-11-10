import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowLeft, ArrowRight, Check } from 'lucide-react';

export default function RecoveryGuidePage() {
  useEffect(() => {
    document.title = 'Recovery Ring: HRV, Readiness & Training Load Explained | JCRingforlife';
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
          <span className="text-ink font-medium">Recovery & HRV</span>
        </nav>

        <div className="space-y-4 mb-12">
          <span className="eyebrow text-primary">Biometric Deep Dive</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-ink tracking-tight">
            Recovery Ring: HRV, Readiness & Training Load Explained
          </h1>
          <p className="text-base text-ink-soft font-light leading-relaxed">
            How a recovery tracking ring synthesizes beat-to-beat variability, baseline resting rate, and autonomic tone into your morning readiness score.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-border p-8 md:p-14 shadow-card space-y-8 text-sm md:text-base font-light text-ink-soft leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-ink">
              1. What is Heart Rate Variability (HRV)?
            </h2>
            <p>
              Contrary to popular intuition, a healthy heart does not tick like an exact metronome. If your pulse is 60 beats per minute, the interval between successive beats fluctuates: 0.92 seconds, 1.08 seconds, 0.97 seconds.
            </p>
            <p>
              This millisecond fluctuation is termed <strong>Heart Rate Variability (HRV)</strong>. Higher baseline HRV reflects dynamic responsiveness in the autonomic nervous system, signaling that your parasympathetic ("rest and digest") branch is flourishing.
            </p>
          </section>

          <section className="space-y-4 pt-6 border-t border-border">
            <h2 className="text-2xl font-light text-ink">
              2. Baseline vs Population Averages
            </h2>
            <p>
              Many wearable apps make the catastrophic error of comparing your HRV against arbitrary population averages. A 25-year-old endurance runner might have an HRV of 90 ms, while an equally healthy 55-year-old executive may average 38 ms.
            </p>
            <p>
              JCRingforlife builds a rolling 14-day statistical baseline calibrated strictly to your personal biology. Your Vitality Score responds solely to deviations from your established normal range.
            </p>
          </section>

          <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/smart-ring-guide/sleep-tracking-ring" className="text-xs text-ink-muted hover:text-ink flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4" />
              <span>Previous: Sleep Tracking Guide</span>
            </Link>
            <Link to="/smart-ring-guide/stress-tracking-ring" className="btn-brand py-2.5 px-6 text-xs flex items-center gap-1.5">
              <span>Next: Stress Tracking Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

