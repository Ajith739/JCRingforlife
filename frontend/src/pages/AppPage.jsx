import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Smartphone, Sparkles, Moon, Activity, Heart, Shield, Apple } from 'lucide-react';

const APP_MODULES = [
  {
    title: 'Vitality Score & Daily Quest',
    subtitle: '15 seconds each morning',
    desc: 'Waking up to one synthesis number eliminates data anxiety and keeps you focused on one high-leverage habit.',
    img: '/assets/app-screen-vitality-Cxbgi6eV.png',
  },
  {
    title: 'Sleep Architecture Breakdown',
    subtitle: 'REM, Deep, Light & SpO₂',
    desc: 'Minute-by-minute sleep hypnograms chart restorative cycles and flag micro-arousals so you know why you woke up tired.',
    img: '/assets/app-screen-sleep-CgHpVwG0.png',
  },
  {
    title: "Women's Health & Cycle Tracking",
    subtitle: 'Thermal circadian phase awareness',
    desc: 'High-precision 0.05°C temperature tracking maps follicular and luteal phases naturally without invasive sensors.',
    img: '/__l5e/assets-v1/894793c7-a88b-4a7a-bbff-5179746f3e38/app-screen-womens-health.png',
  },
  {
    title: 'Active Energy & Movement',
    subtitle: 'Step cadence & training load',
    desc: 'Continuous 3D accelerometer tracks walks, runs, and workouts automatically without having to start manual timers.',
    img: '/__l5e/assets-v1/b7320481-67bf-48a3-9dfd-9ef29f7887cf/app-screen-activity.png',
  },
  {
    title: 'Long-term Baseline Trends',
    subtitle: 'Rolling 14-day baseline AI',
    desc: 'Compare this week against your 3-month average. Spot systemic burnout or immune vulnerability before symptoms hit.',
    img: '/__l5e/assets-v1/a3d19b06-0944-41f3-b424-3f6a1621f13e/app-screen-insights.png',
  },
  {
    title: 'Biological Health Age',
    subtitle: 'Longevity velocity metric',
    desc: 'Tracks cardiovascular resilience, autonomic flexibility, and sleep restoration to estimate your true cellular vitality.',
    img: '/__l5e/assets-v1/28827995-3ee5-4796-85af-bd76d33cb99f/app-screen-health-age.png',
  },
];

export default function AppPage() {
  const [selectedModule, setSelectedModule] = useState(APP_MODULES[0]);

  useEffect(() => {
    document.title = 'Download the JCRingforlife App | JCRingforlife Smart Ring';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <nav className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink font-medium">The App</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="eyebrow text-primary">Companion Experience</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-ink mt-1 tracking-tight">
            Designed for 15 Seconds of Clarity.
          </h1>
          <p className="mt-4 text-base md:text-lg font-light text-ink-soft leading-relaxed">
            The JCRingforlife app for iOS and Android doesn’t want you glued to your phone. It translates biometric complexity into one daily direction. Included free for life with every ring.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-border shadow-xs text-xs font-semibold text-ink">
              <Apple className="w-5 h-5 text-ink" />
              <div className="text-left">
                <span className="text-[10px] text-ink-muted block uppercase">Available Q3 2026</span>
                <span>Download on iOS App Store</span>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-border shadow-xs text-xs font-semibold text-ink">
              <Smartphone className="w-5 h-5 text-primary" />
              <div className="text-left">
                <span className="text-[10px] text-ink-muted block uppercase">Available Q3 2026</span>
                <span>Get it on Google Play</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive App Gallery Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl p-8 md:p-14 border border-border shadow-card mb-20">
          {/* Phone Frame */}
          <div className="flex justify-center">
            <div className="relative w-64 sm:w-72 md:w-80 rounded-[44px] border-[10px] border-ink bg-ink shadow-2xl p-1 overflow-hidden">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 h-4 w-24 rounded-full bg-black z-20" />
              <motion.img
                key={selectedModule.img}
                src={selectedModule.img}
                alt={selectedModule.title}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full h-auto rounded-[34px] object-cover"
              />
            </div>
          </div>

          {/* Module Selector List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-light text-ink mb-6">
              Explore App Screens & Telemetry
            </h2>
            <div className="space-y-3">
              {APP_MODULES.map((mod, idx) => {
                const isSelected = selectedModule.title === mod.title;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedModule(mod)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-xs ring-1 ring-primary/20'
                        : 'border-border/60 bg-canvas/50 hover:bg-white hover:border-border'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-ink">
                        {mod.title}
                      </h3>
                      <span className="text-xs text-primary font-medium">
                        {mod.subtitle}
                      </span>
                    </div>
                    {isSelected && (
                      <p className="mt-2 text-xs font-light text-ink-soft leading-relaxed animate-in fade-in duration-200">
                        {mod.desc}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* No Subscription Guarantee */}
        <div className="rounded-3xl bg-gradient-to-r from-white via-primary/5 to-white border border-primary/20 p-8 text-center shadow-sm">
          <h3 className="text-2xl font-light text-ink">Zero App Subscription Fees</h3>
          <p className="mt-2 text-sm font-light text-ink-soft max-w-xl mx-auto leading-relaxed">
            Every feature shown above is included with your JCRingforlife Founder Edition ring. We will never hold your health trends or sleep stages behind a monthly paywall.
          </p>
          <div className="mt-6">
            <Link to="/preorder" className="btn-brand py-3.5 px-8 text-sm">
              Pre-Order JCRingforlife Ring ($149) →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

