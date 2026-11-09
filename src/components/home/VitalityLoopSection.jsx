import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Compass, Zap } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    label: 'TRACK',
    title: 'Continuous, screenless awareness',
    desc: 'Medical-grade dual PPG sensors, skin thermistor and 3D accelerometer monitor resting heart rate, HRV, SpO₂ and sleep stages 24/7.',
    icon: Activity,
  },
  {
    step: '02',
    label: 'UNDERSTAND',
    title: 'Synthesized to one Vitality Score',
    desc: 'Our proprietary on-device model weights autonomic resilience and sleep debt to calculate a single, intuitive 0-100 baseline score every morning.',
    icon: Compass,
  },
  {
    step: '03',
    label: 'ACT',
    title: 'One daily personalized quest',
    desc: 'No confusing charts or data paralysis. aiOn provides one actionable habit to maximize energy and restore your autonomic balance.',
    icon: Zap,
  },
];

export default function VitalityLoopSection() {
  return (
    <section id="how" className="relative overflow-hidden bg-white py-24 md:py-36 border-t border-border">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="eyebrow text-primary">How aiOn Works</span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-ink">
            The Full Circle of Health
          </h2>
          <p className="mt-4 text-base font-light text-ink-soft leading-relaxed">
            Health should not feel like full-time data analysis. We turn millions of raw data points into one score and one action.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Animated Circular Vitality Gauge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto flex items-center justify-center w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96"
          >
            {/* SVG Circle Progress */}
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <defs>
                <linearGradient id="vitalityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00A9E0" />
                  <stop offset="50%" stopColor="#1878E0" />
                  <stop offset="100%" stopColor="#6D28D9" />
                </linearGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="#E2E8F0"
                strokeWidth="4"
                fill="none"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                stroke="url(#vitalityGrad)"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="264"
                initial={{ strokeDashoffset: 264 }}
                whileInView={{ strokeDashoffset: 42 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
              />
            </svg>

            {/* Inner Vitality Score Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-ink-muted uppercase">
                Vitality Score
              </span>
              <span className="text-6xl sm:text-7xl font-extralight text-ink my-1">
                84
              </span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Prime Recovery</span>
              </div>
              <span className="mt-2 text-[11px] text-ink-muted">
                Readiness elevated +12%
              </span>
            </div>
          </motion.div>

          {/* 3 Step Cards */}
          <div className="space-y-8">
            {STEPS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="group relative flex gap-5 p-5 rounded-2xl bg-canvas border border-border/70 hover:border-primary/40 hover:bg-white hover:shadow-card transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-border/80 flex items-center justify-center shrink-0 text-primary shadow-sm group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-primary tracking-wider">
                        {item.step} · {item.label}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-ink mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-sm font-light text-ink-soft leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

