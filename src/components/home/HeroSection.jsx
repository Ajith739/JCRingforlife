import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Activity, Moon, Thermometer, ShieldCheck } from 'lucide-react';
import { RING_FINISHES } from '../../data/products';

const HERO_METRICS = [
  { label: 'HR', value: '62 bpm', icon: Heart, color: 'text-rose-500' },
  { label: 'HRV', value: '74 ms', icon: Activity, color: 'text-primary' },
  { label: 'SpO₂', value: '98%', icon: Sparkles, color: 'text-sky-500' },
  { label: 'Temp', value: '36.7°', icon: Thermometer, color: 'text-amber-500' },
  { label: 'Sleep', value: '87', icon: Moon, color: 'text-indigo-500' },
];

export default function HeroSection() {
  const [selectedFinish, setSelectedFinish] = useState(RING_FINISHES[0]);

  return (
    <section className="relative overflow-hidden bg-canvas pt-24 pb-16 md:pt-36 md:pb-24">
      {/* Background radial ambient lights */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 50% at 50% 0%, rgba(24, 120, 224, 0.12) 0%, transparent 65%), radial-gradient(ellipse 55% 40% at 12% 78%, rgba(0, 169, 224, 0.08) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        {/* Pre-launch Founder Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-md"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-ink">
            Founder Edition · Pre-Order Live (Save $50)
          </span>
        </motion.div>

        {/* Hero Headline */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            show: { transition: { staggerChildren: 0.15 } },
          }}
          className="max-w-4xl"
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 25 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-extralight leading-[1.08] tracking-tight sm:text-6xl md:text-7xl lg:text-[76px] text-ink"
          >
            Your body has been talking.
            <span
              className="block font-light bg-clip-text text-transparent mt-1"
              style={{
                backgroundImage: 'linear-gradient(120deg, #1878E0 0%, #6D28D9 100%)',
              }}
            >
              You just couldn't hear it.
            </span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.85, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-base font-light text-ink-soft md:text-xl leading-relaxed"
          >
            A titanium smart ring that turns sleep, recovery and stress into one clear answer and one personalized quest each morning.
          </motion.p>
        </motion.div>

        {/* CTA Area */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex flex-col items-center"
        >
          <Link
            to="/preorder"
            className="group relative inline-flex items-center justify-center rounded-full px-9 py-4 text-base font-semibold text-white transition-all duration-200 hover:scale-[1.02] shadow-glow"
            style={{
              background: 'linear-gradient(135deg, #00A9E0, #1878E0, #6D28D9)',
            }}
          >
            <span>Pre-order Now — $149</span>
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <p className="mt-3 text-xs md:text-sm text-ink-muted">
            Free aiOn app included · Free Sizing Kit · No subscription required
          </p>
        </motion.div>

        {/* Live Metrics Floating Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-6"
        >
          {HERO_METRICS.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-2xl border border-border/80 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-md"
              >
                <Icon className={`w-4 h-4 ${m.color}`} />
                <span className="text-xs text-ink-muted font-medium">{m.label}:</span>
                <span className="text-xs font-semibold text-ink">{m.value}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Ring Hero Showcase & Finish Selector */}
        <div className="relative mt-12 w-full max-w-3xl">
          {/* Ambient Glow */}
          <div
            className="absolute inset-0 -top-8 blur-3xl opacity-30 pointer-events-none rounded-full"
            style={{
              background:
                selectedFinish.id === 'midnight'
                  ? 'radial-gradient(circle, #1A1F2C 0%, #1878E0 60%, transparent 80%)'
                  : selectedFinish.id === 'rose'
                  ? 'radial-gradient(circle, #E6B8A2 0%, #6D28D9 60%, transparent 80%)'
                  : 'radial-gradient(circle, #DCDDE1 0%, #00A9E0 60%, transparent 80%)',
            }}
          />

          {/* Interactive Ring Image Render */}
          <motion.div
            key={selectedFinish.id}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative mx-auto h-64 sm:h-80 md:h-96 w-full flex items-center justify-center"
          >
            <img
              src={selectedFinish.image}
              alt={`aiOn Ring in ${selectedFinish.name}`}
              className="h-full w-auto max-w-full object-contain filter drop-shadow-2xl"
            />
          </motion.div>

          {/* Finish Selector Buttons */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <span className="text-xs font-medium text-ink-muted uppercase tracking-wider">
              Selected Finish: <strong className="text-ink">{selectedFinish.name}</strong>
            </span>
            <div className="flex items-center gap-3 p-1.5 rounded-full bg-white/90 border border-border shadow-sm backdrop-blur-md">
              {RING_FINISHES.map((finish) => (
                <button
                  key={finish.id}
                  type="button"
                  onClick={() => setSelectedFinish(finish)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                    selectedFinish.id === finish.id
                      ? 'bg-ink text-white shadow-sm'
                      : 'text-ink-soft hover:text-ink hover:bg-canvas'
                  }`}
                >
                  <span
                    className="h-3 w-3 rounded-full border border-white/40"
                    style={{ backgroundColor: finish.color }}
                  />
                  <span>{finish.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

