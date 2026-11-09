import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Moon, ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';

export default function SleepGuidePage() {
  useEffect(() => {
    document.title = 'Sleep Tracking Ring: How It Works & What to Look For | aiOn';
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
          <span className="text-ink font-medium">Sleep Tracking</span>
        </nav>

        <div className="space-y-4 mb-12">
          <span className="eyebrow text-primary">Biometric Deep Dive</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-ink tracking-tight">
            Sleep Tracking Ring: How It Works & What to Look For
          </h1>
          <p className="text-base text-ink-soft font-light leading-relaxed">
            How a screenless smart ring captures sleep architecture, nocturnal resting heart rate, and blood oxygen without disturbing your circadian rhythm.
          </p>
        </div>

        {/* Hero Visual Card */}
        <div className="rounded-3xl overflow-hidden border border-border shadow-card mb-12">
          <img
            src="/assets/nature-restful-night-BUfEgpbZ.jpg"
            alt="Restful night sleep tracking with aiOn"
            className="w-full h-72 sm:h-96 object-cover"
          />
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl border border-border p-8 md:p-14 shadow-card space-y-8 text-sm md:text-base font-light text-ink-soft leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-ink">
              1. The Advantage of Finger Capillaries
            </h2>
            <p>
              When tracking sleep, consistency and comfort dictate accuracy. Bulky wristwatches often pinch when sleeping on your side or loosen as you shift positions, generating massive motion artifacts that distort heart rate variability readings.
            </p>
            <p>
              Smart rings like aiOn sit comfortably at the base of your finger, where the digital palmar arteries reside millimeters beneath thin skin. This proximity allows infrared and green PPG sensors to track beat-to-beat intervals with millisecond accuracy.
            </p>
          </section>

          <section className="space-y-4 pt-6 border-t border-border">
            <h2 className="text-2xl font-light text-ink">
              2. Sleep Stages Decoded: Deep vs REM
            </h2>
            <p>
              A quality sleep tracking ring evaluates four distinct physiological markers to classify sleep stages:
            </p>
            <ul className="space-y-3 pl-2">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span><strong>Deep Sleep (Slow Wave):</strong> Marked by physical stillness, lowest body temperature, and lowest resting heart rate. Critical for cellular repair, growth hormone release, and immune restoration.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span><strong>REM Sleep:</strong> High heart-rate variability accompanied by rapid eye movements and micro-twitching. Essential for memory consolidation, neuroplasticity, and emotional processing.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span><strong>Nocturnal SpO₂ Dips:</strong> Monitoring oxygen saturation ensures airway patency throughout the night.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-4 pt-6 border-t border-border">
            <h2 className="text-2xl font-light text-ink">
              3. The Nocturnal "Hammock" Curve
            </h2>
            <p>
              In a healthy recovery profile, resting heart rate should drop to its nadir in the first half of the night, creating a gentle "hammock" or smiling curve. Late-night meals, alcohol, or intense evening workouts delay this drop, causing an "elevator" pattern that robs you of restorative sleep.
            </p>
          </section>

          <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/smart-ring-guide" className="text-xs text-ink-muted hover:text-ink flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Guide Hub</span>
            </Link>
            <Link to="/smart-ring-guide/recovery-ring" className="btn-brand py-2.5 px-6 text-xs flex items-center gap-1.5">
              <span>Next: Recovery Ring Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

