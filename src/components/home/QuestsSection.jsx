import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Coffee, Footprints, ArrowUpRight, Sparkles } from 'lucide-react';

const QUESTS = [
  {
    title: 'Box breathing · 4 min',
    tag: 'Autonomic Reset',
    metric: 'HRV +12 ms',
    desc: '4 seconds inhale, 4 hold, 4 exhale, 4 hold. Immediately suppresses midday sympathetic surge.',
    icon: Wind,
    color: 'text-sky-500 bg-sky-50',
  },
  {
    title: 'No caffeine after 2:00 PM',
    tag: 'Adenosine Protection',
    metric: 'Deep Sleep +24 min',
    desc: 'Clears adenosine receptor competition before bedtime, directly lengthening Stage 3 slow-wave sleep.',
    icon: Coffee,
    color: 'text-amber-500 bg-amber-50',
  },
  {
    title: '10-minute post-meal walk',
    tag: 'Metabolic Balance',
    metric: 'Recovery +8%',
    desc: 'Mild muscle contraction flattens glucose excursion spikes without taxing your nervous system.',
    icon: Footprints,
    color: 'text-emerald-500 bg-emerald-50',
  },
];

export default function QuestsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-36 border-t border-border">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="eyebrow text-primary">ACT: Daily Direction</span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-ink">
            One Quest a Day. That’s It.
          </h2>
          <p className="mt-4 text-base font-light text-ink-soft leading-relaxed">
            Other wearables dump endless charts on your screen and leave you guessing. aiOn extracts the single highest-impact action for today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {QUESTS.map((q, idx) => {
            const Icon = q.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative flex flex-col justify-between p-7 rounded-3xl bg-canvas border border-border/80 hover:border-primary/40 hover:bg-white hover:shadow-card transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${q.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-border text-[11px] font-semibold text-primary shadow-xs">
                      <Sparkles className="w-3 h-3" />
                      <span>{q.metric}</span>
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                    {q.tag}
                  </span>
                  <h3 className="text-lg font-semibold text-ink mt-1 mb-2.5">
                    {q.title}
                  </h3>
                  <p className="text-sm font-light text-ink-soft leading-relaxed">
                    {q.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                  <span>View Quest in aiOn App</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

