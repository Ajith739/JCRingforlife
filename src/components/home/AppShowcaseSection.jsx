import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Sparkles, Moon, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const SCREENS = [
  {
    id: 'vitality',
    title: 'Vitality Score',
    subtitle: 'Your number, every morning.',
    description: 'A single 0–100 synthesis calculated from your nocturnal baseline, HRV autonomic readiness, and cumulative sleep debt.',
    image: '/assets/app-screen-vitality-Cxbgi6eV.png',
    icon: Sparkles,
  },
  {
    id: 'quest',
    title: "Today's Quest",
    subtitle: 'One quest a day.',
    description: 'No overwhelming dashboards. aiOn prescribes one achievable habit tailored to today’s recovery state to restore vitality.',
    image: '/assets/app-screen-quest-DwkXzpE0.png',
    icon: Zap,
  },
  {
    id: 'sleep',
    title: 'Sleep Architecture',
    subtitle: 'See what last night did.',
    description: 'Deep sleep, REM phases, tossing and turning, overnight temperature fluctuation, and blood oxygen dips rendered clearly.',
    image: '/assets/app-screen-sleep-CgHpVwG0.png',
    icon: Moon,
  },
];

export default function AppShowcaseSection() {
  const [selectedScreen, setSelectedScreen] = useState(SCREENS[0]);

  return (
    <section className="relative overflow-hidden bg-canvas py-24 md:py-36 border-t border-border">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow text-primary">The Companion Experience</span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-ink">
            A screenless ring. A calm companion.
          </h2>
          <p className="mt-4 text-base font-light text-ink-soft leading-relaxed">
            The aiOn app for iOS and Android is designed for fast, frictionless clarity — open it for 15 seconds in the morning, absorb your direction, and live your day.
          </p>
        </div>

        {/* Screen Selector Tabs */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-14">
          {SCREENS.map((s) => {
            const Icon = s.icon;
            const isSelected = selectedScreen.id === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedScreen(s)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-ink text-white shadow-soft'
                    : 'bg-white text-ink-soft hover:text-ink border border-border'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Display Box */}
        <div className="grid md:grid-cols-2 gap-12 items-center bg-white rounded-3xl p-8 sm:p-12 md:p-16 border border-border shadow-card">
          {/* Phone Mockup Frame */}
          <div className="relative flex justify-center order-2 md:order-1">
            <div className="relative w-64 sm:w-72 md:w-80 rounded-[40px] border-[8px] border-ink bg-ink shadow-2xl overflow-hidden p-1">
              {/* Camera Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 h-4 w-24 rounded-full bg-black z-20" />

              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedScreen.id}
                  src={selectedScreen.image}
                  alt={selectedScreen.title}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-auto rounded-[32px] object-cover"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Text Description */}
          <div className="order-1 md:order-2 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Feature Spotlight
            </span>
            <h3 className="text-3xl md:text-4xl font-light text-ink">
              {selectedScreen.subtitle}
            </h3>
            <p className="text-base font-light text-ink-soft leading-relaxed">
              {selectedScreen.description}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link to="/app" className="btn-brand py-3 px-6 text-sm">
                Explore The App →
              </Link>
              <Link to="/preorder" className="btn-secondary py-3 px-6 text-sm">
                Pre-order Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

