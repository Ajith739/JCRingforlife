import React from 'react';
import { motion } from 'framer-motion';

export default function AppShowcaseSection() {
  return (
    <section id="app" className="relative overflow-hidden bg-canvas py-14 sm:py-16 md:py-24">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-xs md:text-sm tracking-[0.35em] text-ink-muted uppercase">The app</p>
          <h2 className="mt-4 text-4xl md:text-6xl font-extralight text-ink leading-[1.05]">
            Your body, on screen.
          </h2>
          <p className="mt-4 md:mt-5 text-ink-soft text-base md:text-lg font-light">
            Clean. Calm. Built to answer one question, what should I do today?
          </p>
        </motion.div>

        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 items-end">
          {/* Phone 1: Vitality */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <div
              className="relative"
              style={{
                filter:
                  'drop-shadow(rgba(0, 0, 0, 0.55) 0px 30px 60px) drop-shadow(rgba(24, 120, 224, 0.2) 0px 0px 40px)',
              }}
            >
              <img
                src="/assets/app-screen-vitality-Cxbgi6eV.png"
                alt="JCRingforlife app, Vitality Score"
                loading="lazy"
                width="768"
                height="1536"
                className="w-[180px] sm:w-[220px] md:w-[260px] h-auto select-none pointer-events-none"
              />
            </div>
            <p className="mt-4 text-sm md:text-base text-ink-muted font-light tracking-wide">
              Your number, every morning.
            </p>
          </motion.div>

          {/* Phone 2: Quest */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col items-center"
          >
            <div
              className="relative"
              style={{
                filter:
                  'drop-shadow(rgba(0, 0, 0, 0.55) 0px 30px 60px) drop-shadow(rgba(24, 120, 224, 0.2) 0px 0px 40px)',
              }}
            >
              <img
                src="/assets/app-screen-quest-DwkXzpE0.png"
                alt="JCRingforlife app, Today's Quest"
                loading="lazy"
                width="768"
                height="1536"
                className="w-[180px] sm:w-[220px] md:w-[260px] h-auto select-none pointer-events-none"
              />
            </div>
            <p className="mt-4 text-sm md:text-base text-ink-muted font-light tracking-wide">
              One quest a day.
            </p>
          </motion.div>

          {/* Phone 3: Sleep */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div
              className="relative"
              style={{
                filter:
                  'drop-shadow(rgba(0, 0, 0, 0.55) 0px 30px 60px) drop-shadow(rgba(24, 120, 224, 0.2) 0px 0px 40px)',
              }}
            >
              <img
                src="/assets/app-screen-sleep-CgHpVwG0.png"
                alt="JCRingforlife app, Sleep insight"
                loading="lazy"
                width="768"
                height="1536"
                className="w-[180px] sm:w-[220px] md:w-[260px] h-auto select-none pointer-events-none"
              />
            </div>
            <p className="mt-4 text-sm md:text-base text-ink-muted font-light tracking-wide">
              See what last night did.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-sm md:text-base text-ink-muted font-light">
            Free with every ring. iOS & Android.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
