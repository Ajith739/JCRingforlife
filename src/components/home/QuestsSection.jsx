import React from 'react';
import { motion } from 'framer-motion';

export default function QuestsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src="/assets/nature-calm-water-AzJi5gar.jpg"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
          style={{ objectPosition: 'center 60%', opacity: 0.24, filter: 'saturate(0.85)' }}
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
            The one thing<br />you should do today.
          </h2>
          <p className="mt-4 md:mt-5 text-ink-soft text-base md:text-lg font-light">
            Every morning. Built for your body.<br />Based on your last 7 days.
          </p>
        </motion.div>

        <div className="mt-9 md:mt-12 grid md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border p-6"
            style={{
              borderColor: 'rgb(227, 233, 242)',
              background: 'rgb(255, 255, 255)',
              boxShadow: 'rgba(10, 22, 40, 0.25) 0px 20px 50px -25px',
            }}
          >
            <span className="text-[10px] tracking-[0.25em] text-ink-muted uppercase">
              TODAY'S QUEST · HRV
            </span>
            <h3 className="mt-4 text-2xl font-light text-ink">Box breathing</h3>
            <div className="mt-6 flex items-center justify-end gap-2 text-sm font-light text-ink-soft">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#1878E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0" />
              </svg>
              HRV
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-3xl border p-6"
            style={{
              borderColor: 'rgb(227, 233, 242)',
              background: 'rgb(255, 255, 255)',
              boxShadow: 'rgba(10, 22, 40, 0.25) 0px 20px 50px -25px',
            }}
          >
            <span className="text-[10px] tracking-[0.25em] text-ink-muted uppercase">
              TODAY'S QUEST · SLEEP
            </span>
            <h3 className="mt-4 text-2xl font-light text-ink">No caffeine after 2pm</h3>
            <div className="mt-6 flex items-center justify-end gap-2 text-sm font-light text-ink-soft">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#1878E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 14.4A8 8 0 1 1 9.6 4 6.5 6.5 0 0 0 20 14.4z" />
              </svg>
              Sleep
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="rounded-3xl border p-6"
            style={{
              borderColor: 'rgb(227, 233, 242)',
              background: 'rgb(255, 255, 255)',
              boxShadow: 'rgba(10, 22, 40, 0.25) 0px 20px 50px -25px',
            }}
          >
            <span className="text-[10px] tracking-[0.25em] text-ink-muted uppercase">
              TODAY'S QUEST · STRESS
            </span>
            <h3 className="mt-4 text-2xl font-light text-ink">10-min walk</h3>
            <div className="mt-6 flex items-center justify-end gap-2 text-sm font-light text-ink-soft">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#1878E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M13 3 5.8 13.6H11l-.8 7.4 8-10.9h-5.4z" />
              </svg>
              Stress
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-9 text-center"
        >
          <p className="text-base md:text-lg text-ink-soft font-light">
            Complete it. Earn XP. Build your streak.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
