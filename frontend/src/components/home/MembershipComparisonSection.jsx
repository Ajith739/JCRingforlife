import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const TIERS = [
  {
    id: 'vitals',
    badge: 'FREE WITH EVERY RING',
    badgeStyle: { borderColor: 'rgba(24, 120, 224, 0.533)', color: 'rgb(24, 120, 224)' },
    title: 'JCRingforlife Vitals',
    subtitle: 'The essentials. Free.',
    featured: false,
    buttonStyle: {
      background: 'rgb(241, 245, 250)',
      border: '1px solid rgb(227, 233, 242)',
      color: 'hsl(var(--ink))',
    },
    features: [
      'Heart Rate · HRV',
      'SpO₂ · Temperature',
      'Sleep · Recovery',
      'Stress · Vitality Score',
      'Daily Quest · XP',
      'JCRingforlife Vitals app',
    ],
  },
  {
    id: 'insights',
    badge: null,
    title: 'JCRingforlife Vitals + Insights',
    subtitle: 'Trends. Coaching. History.',
    featured: true,
    buttonStyle: {
      background: 'linear-gradient(120deg, rgb(24, 120, 224), rgb(109, 40, 217))',
      color: '#ffffff',
    },
    features: [
      'Everything in Vitals',
      'Insights · Trends',
      'Sleep Coaching',
      'Goal Tracking',
      'Full History',
    ],
  },
  {
    id: 'premium',
    badge: 'MOST COMPLETE',
    badgeStyle: { borderColor: 'rgba(180, 135, 11, 0.533)', color: 'rgb(180, 135, 11)' },
    title: 'JCRingforlife Vitals + Insights + Premium',
    subtitle: 'AI coaching. Deeper trends.',
    featured: false,
    buttonStyle: {
      background: 'rgb(241, 245, 250)',
      border: '1px solid rgb(227, 233, 242)',
      color: 'hsl(var(--ink))',
    },
    features: [
      'Everything in Insights',
      'AI Wellness Coach',
      'Wellness Trend Alerts',
      'BP trend (EST) · Glucose trend (EST)',
      'Heart Rhythm Insight',
      'Priority Support',
    ],
  },
];

export default function MembershipComparisonSection() {
  const [openFeatures, setOpenFeatures] = useState({});

  const toggleFeatures = (id) => {
    setOpenFeatures((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      className="relative overflow-hidden py-14 sm:py-16 md:py-24"
      style={{
        background: 'linear-gradient(rgb(246, 248, 252) 0%, rgb(255, 255, 255) 100%)',
      }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-extralight text-ink leading-[1.05]">
            Start free.<br />Unlock more when ready.
          </h2>
        </motion.div>

        <div className="mt-10 md:mt-12 grid md:grid-cols-3 gap-6 items-stretch">
          {TIERS.map((tier, idx) => {
            const isOpen = !!openFeatures[tier.id];
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className={`relative rounded-3xl border p-8 backdrop-blur-xl flex flex-col ${
                  tier.featured ? 'md:scale-105' : ''
                }`}
                style={{
                  borderColor: tier.featured
                    ? 'rgba(109, 40, 217, 0.333)'
                    : 'rgb(227, 233, 242)',
                  background: 'rgb(255, 255, 255)',
                  boxShadow: tier.featured
                    ? 'rgba(109, 40, 217, 0.333) 0px 30px 70px -30px'
                    : 'rgba(10, 22, 40, 0.04) 0px 1px 2px, rgba(10, 22, 40, 0.25) 0px 18px 40px -28px',
                }}
              >
                {tier.badge && (
                  <span
                    className="self-start rounded-full border px-3 py-1 text-[10px] tracking-widest uppercase font-medium"
                    style={tier.badgeStyle}
                  >
                    {tier.badge}
                  </span>
                )}

                <h3 className="mt-4 text-2xl font-light text-ink">{tier.title}</h3>
                <p className="mt-3 text-base text-ink-soft font-light">{tier.subtitle}</p>

                <button
                  type="button"
                  onClick={() => toggleFeatures(tier.id)}
                  className="mt-4 self-start text-[11px] tracking-widest text-ink-muted hover:text-ink transition uppercase font-medium"
                >
                  {isOpen ? 'HIDE FEATURES' : 'SEE FEATURES'}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-2 text-sm text-ink-soft font-light overflow-hidden"
                    >
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex gap-2">
                          <span style={{ color: 'rgb(24, 120, 224)' }}>·</span>
                          {feat}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                <div className="flex-1 min-h-[24px]"></div>

                <Link
                  to="/preorder"
                  className="mt-8 inline-flex items-center justify-center rounded-full py-3 text-sm font-medium transition"
                  style={tier.buttonStyle}
                >
                  Pre-order Now
                </Link>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-ink-muted">
          30-day free trial on paid plans
        </p>
        <p className="mt-3 text-center text-[11px] text-ink-muted/80 max-w-xl mx-auto">
          All plans provide general wellness and fitness features only. No plan provides medical advice, diagnosis, or treatment.
        </p>
      </div>
    </section>
  );
}
