import React from 'react';
import { motion } from 'framer-motion';

export default function HrvTrendSection() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-16 md:py-24" style={{ background: 'rgb(255, 255, 255)' }}>
      <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="relative rounded-3xl border p-6 backdrop-blur-xl mx-auto max-w-2xl"
            style={{
              borderColor: 'rgba(24, 120, 224, 0.133)',
              background: 'linear-gradient(rgb(10, 22, 40), rgb(14, 27, 52))',
              boxShadow: 'rgba(10, 22, 40, 0.45) 0px 30px 70px -35px',
            }}
          >
            <div className="text-left text-xs tracking-widest text-white/50 uppercase">
              HRV · LAST 14 DAYS
            </div>
            <svg viewBox="0 0 400 120" className="mt-3 w-full h-32">
              <motion.path
                d="M0,30 L30,32 L60,35 L90,38 L120,42 L150,48 L180,52 L210,58 L240,64 L270,72 L300,80 L330,86 L360,92 L400,96"
                fill="none"
                stroke="#1878E0"
                strokeWidth="2"
                pathLength="1"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
              />
            </svg>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute right-4 top-16 rounded-xl border px-3 py-2 text-xs text-left"
              style={{
                borderColor: 'rgba(180, 135, 11, 0.4)',
                background: 'rgba(10, 22, 40, 0.92)',
                color: 'rgb(180, 135, 11)',
              }}
            >
              Your HRV trend is 22% below your usual range
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10"
        >
          <h2 className="text-3xl md:text-5xl font-extralight text-ink leading-tight">
            The trend showed on Day 11.<br />
            <span className="text-ink-muted">You noticed on Day 14.</span>
          </h2>
          <p
            className="mt-6 text-lg md:text-xl font-light"
            style={{
              color: 'rgb(24, 120, 224)',
              textShadow: 'rgba(24, 120, 224, 0.4) 0px 0px 24px',
            }}
          >
            Wellness trends, made visible.
          </p>
          <p className="mt-4 text-xs text-ink-muted max-w-md mx-auto">
            Trend information is for general wellness and informational purposes only.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

