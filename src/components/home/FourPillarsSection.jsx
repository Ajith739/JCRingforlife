import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Moon, Zap, Thermometer, ChevronRight, Check } from 'lucide-react';

const PILLARS = [
  {
    id: 'heart',
    title: 'Heart & Circulation',
    subtitle: 'Resting HR · HRV · Rhythm insight · BP trend (EST)',
    icon: Heart,
    color: 'from-rose-500 to-red-600',
    lightBg: 'bg-rose-50 border-rose-200 text-rose-600',
    metrics: [
      { label: 'Resting Heart Rate', desc: 'Your nocturnal low points reveal true cardiovascular efficiency and recovery.' },
      { label: 'Heart Rate Variability', desc: 'Milliseconds between heartbeats indicate autonomic nervous system resilience.' },
      { label: 'Rhythm Awareness', desc: 'Continuous wellness monitoring tracks irregular pulse irregularities on demand.' },
      { label: 'BP Trend (EST)', desc: 'Non-clinical directional pulse-wave velocity estimates general cardiovascular load.' },
    ],
  },
  {
    id: 'sleep',
    title: 'Sleep Architecture',
    subtitle: 'Deep · REM · Light · Efficiency · Latency',
    icon: Moon,
    color: 'from-indigo-500 to-sky-600',
    lightBg: 'bg-indigo-50 border-indigo-200 text-indigo-600',
    metrics: [
      { label: 'Sleep Stages', desc: 'Accurately quantifies the critical restorative Deep and REM sleep cycles without wrist bulk.' },
      { label: 'Sleep Quality Score', desc: 'Combines overnight restlessness, duration, and nocturnal HRV dip into one composite score.' },
      { label: 'Blood Oxygen (SpO₂)', desc: 'Infrared LEDs track nocturnal oxygen saturation to ensure uninterrupted breathing.' },
      { label: 'Optimal Sleep Window', desc: 'JCRingforlife recommends your ideal bedtime based on your circadian temperature curve.' },
    ],
  },
  {
    id: 'stress',
    title: 'Stress & Autonomic Balance',
    subtitle: 'Sympathetic load · Recovery intervals · Real-time alerts',
    icon: Zap,
    color: 'from-amber-500 to-orange-600',
    lightBg: 'bg-amber-50 border-amber-200 text-amber-600',
    metrics: [
      { label: 'Autonomic Balance Index', desc: 'Measures the dynamic tug-of-war between fight-or-flight and rest-and-digest.' },
      { label: 'Daytime Stress Spikes', desc: 'Pinpoint exact meetings, tasks, or commutes that elevate physiological strain.' },
      { label: 'Restoration Moments', desc: 'Identifies brief periods during the day when your body successfully recharges.' },
      { label: 'Calm Prompts', desc: 'Get gentle reminders to take a 2-minute box breathing break when stress compounds.' },
    ],
  },
  {
    id: 'temp',
    title: 'Temperature & Metabolic Rhythm',
    subtitle: 'Skin thermistor · Cycle phase · Early immune alerts',
    icon: Thermometer,
    color: 'from-emerald-500 to-teal-600',
    lightBg: 'bg-emerald-50 border-emerald-200 text-emerald-600',
    metrics: [
      { label: '0.05°C Skin Precision', desc: 'Reads temperature continuously at the digital arteries for extreme thermal accuracy.' },
      { label: 'Early Illness Warning', desc: 'Noticeable baseline temperature elevations warn you up to 48 hours before symptoms.' },
      { label: 'Cycle Phase Tracking', desc: 'Maps follicular and luteal phases naturally for comprehensive women’s health insights.' },
      { label: 'Metabolic Heat Flux', desc: 'Monitors thermal dissipation during post-exercise and deep sleep recovery.' },
    ],
  },
];

export default function FourPillarsSection() {
  const [activePillar, setActivePillar] = useState(PILLARS[0]);

  return (
    <section id="signals" className="relative bg-canvas py-24 md:py-36 border-t border-border">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="eyebrow text-primary">TRACK: 24/7 Precision</span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-ink">
            Every metric. Every moment.
          </h2>
          <p className="mt-4 text-base font-light text-ink-soft leading-relaxed">
            Finger-based photoplethysmography provides up to 10× stronger signal quality than wrist sensors due to dense arterial capillary beds.
          </p>
        </div>

        {/* 4 Pillar Selection Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const isActive = activePillar.id === pillar.id;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActivePillar(pillar)}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  isActive
                    ? 'bg-white border-primary shadow-soft ring-1 ring-primary/20'
                    : 'bg-white/60 border-border hover:bg-white hover:border-border/80'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                    isActive ? pillar.lightBg : 'bg-canvas text-ink-muted'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-ink leading-tight">
                  {pillar.title}
                </h3>
                <p className="text-[11px] text-ink-muted mt-1 truncate">
                  {pillar.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Deep Dive Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-white border border-border p-8 md:p-12 shadow-card"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border/70">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Pillar Details
                </span>
                <h3 className="text-2xl md:text-3xl font-light text-ink mt-1">
                  {activePillar.title}
                </h3>
                <p className="text-sm text-ink-soft mt-1">
                  {activePillar.subtitle}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-canvas text-xs font-medium text-ink-soft border border-border">
                <span>Continuously Sampled</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid sm:grid-cols-2 gap-6 pt-8">
              {activePillar.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-canvas border border-border/50 hover:border-border transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-primary" />
                    <h4 className="text-base font-semibold text-ink">
                      {m.label}
                    </h4>
                  </div>
                  <p className="text-sm font-light text-ink-soft leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

