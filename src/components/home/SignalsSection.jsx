import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SIGNALS = [
  {
    id: 'heart',
    title: 'Heart & Circulation',
    subtitle: 'Resting HR · HRV · Rhythm insight · BP trend (EST)',
    svg: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#1878E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20s-7-4.4-7-9.3A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 7 3.3C19 15.6 12 20 12 20z" />
      </svg>
    ),
    details: [
      'HRV, a simple daily read on stress and resilience',
      'Heart rhythm insight, wellness awareness, on demand',
      'BP trend (EST), general direction, not a reading',
    ],
  },
  {
    id: 'sleep',
    title: 'Sleep',
    subtitle: 'Stages · SpO₂ · Breathing · Temperature',
    svg: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#1878E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 14.4A8 8 0 1 1 9.6 4 6.5 6.5 0 0 0 20 14.4z" />
      </svg>
    ),
    details: [
      'Deep, REM, Light, every stage, every night',
      'Breathing rate trends while you sleep',
      '7 hours in bed is not 7 hours of sleep',
    ],
  },
  {
    id: 'women',
    title: "Women's Health",
    subtitle: 'Cycle · Ovulation · Phase coaching',
    svg: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#1878E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 12a8 8 0 1 1-2.6-5.9" />
        <path d="M20 4v4h-4" />
      </svg>
    ),
    details: [
      'Automatic cycle tracking from temperature and HRV',
      'Each phase has different energy and recovery needs',
      'JCRingforlife\'s quests adapt to where you are',
    ],
  },
  {
    id: 'active',
    title: 'Active & Recovery',
    subtitle: 'Recovery · Strain · VO₂ Max',
    svg: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#1878E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 3 5.8 13.6H11l-.8 7.4 8-10.9h-5.4z" />
      </svg>
    ),
    details: [
      'Know when to go hard and when to rest',
      'Training load awareness before you feel drained',
      'The workout doesn\'t make you stronger. Recovery does.',
    ],
  },
  {
    id: 'stress',
    title: 'Stress & Balance',
    subtitle: 'Daily stress · HRV · Recovery balance',
    svg: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#1878E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0" />
      </svg>
    ),
    details: [
      'See how a busy day shows up in your body',
      'Spot the weeks you\'ve been pushing too hard',
      'Stress is easy to ignore until you can see it',
    ],
  },
  {
    id: 'metabolic',
    title: 'Metabolic Wellness',
    subtitle: 'Glucose trend (EST) · BP trend (EST)',
    svg: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#1878E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3.4s6 6.4 6 9.9a6 6 0 0 1-12 0c0-3.5 6-9.9 6-9.9z" />
      </svg>
    ),
    details: [
      'Follow long-term lifestyle trends, not single numbers',
      'EST trends show direction and are not measurements',
      'Build habits around how your body responds',
    ],
  },
];

export default function SignalsSection() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="signals" className="relative overflow-hidden bg-canvas py-14 sm:py-16 md:py-24">
      {/* Background Nature Image with Soft Gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src="/assets/nature-forest-trail-o8cpuo5D.jpg"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
          style={{ objectPosition: 'center 55%', opacity: 0.22, filter: 'saturate(0.85)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.8) 40%, rgba(255, 255, 255, 0.94) 100%)',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-extralight text-ink leading-[1.05]">
            Everything your body<br />is telling you.
          </h2>
        </motion.div>

        <div className="mt-9 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {SIGNALS.map((sig, idx) => {
            const isExpanded = expandedId === sig.id;
            return (
              <motion.button
                key={sig.id}
                type="button"
                aria-expanded={isExpanded}
                onClick={() => toggleExpand(sig.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="text-left rounded-3xl border p-5 md:p-6 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1878E0]"
                style={{
                  borderColor: isExpanded ? 'rgb(24, 120, 224)' : 'rgb(227, 233, 242)',
                  background: 'rgb(255, 255, 255)',
                  boxShadow: isExpanded
                    ? 'rgba(24, 120, 224, 0.333) 0px 20px 50px -20px'
                    : 'rgba(10, 22, 40, 0.04) 0px 1px 2px',
                }}
              >
                {sig.svg}
                <h3 className="mt-3 text-xl font-light text-ink">{sig.title}</h3>
                <p className="mt-1.5 text-sm text-ink-soft font-light">{sig.subtitle}</p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-2 text-sm text-ink-soft font-light overflow-hidden"
                    >
                      {sig.details.map((item, dIdx) => (
                        <li key={dIdx} className="flex gap-2">
                          <span style={{ color: 'rgb(24, 120, 224)' }}>·</span>
                          {item}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                <p className="mt-3 text-[10px] tracking-widest text-ink-muted">
                  {isExpanded ? 'TAP TO CLOSE' : 'TAP TO EXPAND'}
                </p>
              </motion.button>
            );
          })}
        </div>

        <p className="mt-10 text-center text-[11px] text-ink-muted max-w-xl mx-auto">
          JCRingforlife Ring is intended for general wellness purposes only and is not a medical device. Blood Pressure (EST) and Blood Glucose (EST) are non-medical wellness estimates and are not intended to diagnose, treat, cure, or prevent any disease or medical condition.
        </p>
      </div>
    </section>
  );
}

