import React from 'react';
import { motion } from 'framer-motion';

export default function ApproachSection() {
  return (
    <section id="approach" className="relative overflow-hidden bg-canvas py-14 sm:py-16 md:py-24">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div
            className="mx-auto mb-4 h-3 w-3 rounded-full"
            style={{
              background: 'rgb(24, 120, 224)',
              boxShadow: 'rgb(24, 120, 224) 0px 0px 24px, rgba(24, 120, 224, 0.533) 0px 0px 60px',
            }}
          />
          <p className="text-xs md:text-sm tracking-[0.35em] text-ink-muted uppercase">
            Other rings track. JCRingforlife acts.
          </p>
        </motion.div>

        <div className="mt-9 md:mt-12 grid md:grid-cols-3 gap-6 md:gap-4 items-stretch relative">
          {/* Card 1: TRACK */}
          <div className="relative flex">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full rounded-3xl border backdrop-blur-xl p-8 md:p-10 text-center flex flex-col items-center"
              style={{
                borderColor: 'rgb(227, 233, 242)',
                background: 'rgb(255, 255, 255)',
                boxShadow: 'rgba(24, 120, 224, 0.2) 0px 20px 50px -20px',
              }}
            >
              <div style={{ filter: 'drop-shadow(rgba(24, 120, 224, 0.533) 0px 0px 12px)' }}>
                <svg viewBox="0 0 64 64" className="h-14 w-14" fill="none">
                  <circle
                    cx="32"
                    cy="32"
                    r="22"
                    stroke="#1878E0"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="90 200"
                    transform="rotate(-90 32 32)"
                  />
                </svg>
              </div>
              <h3 className="mt-6 text-2xl md:text-3xl font-light tracking-[0.35em] text-ink">
                TRACK
              </h3>
              <div className="mt-6 space-y-1 text-ink-muted text-sm md:text-base font-light">
                <p>Every metric.</p>
                <p>Every moment.</p>
                <p>24 hours a day.</p>
              </div>
            </motion.div>

            {/* Arrow connector 1 */}
            <div
              aria-hidden="true"
              className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 items-center justify-center text-ink-muted"
            >
              <svg width="26" height="14" viewBox="0 0 26 14" fill="none">
                <path
                  d="M1 7 H23 M17 1 L23 7 L17 13"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Card 2: UNDERSTAND */}
          <div className="relative flex">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="w-full rounded-3xl border backdrop-blur-xl p-8 md:p-10 text-center flex flex-col items-center"
              style={{
                borderColor: 'rgb(227, 233, 242)',
                background: 'rgb(255, 255, 255)',
                boxShadow: 'rgba(109, 40, 217, 0.2) 0px 20px 50px -20px',
              }}
            >
              <div style={{ filter: 'drop-shadow(rgba(109, 40, 217, 0.533) 0px 0px 12px)' }}>
                <svg
                  viewBox="0 0 64 64"
                  className="h-14 w-14"
                  fill="none"
                  stroke="#6D28D9"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="32,14 50,26 44,48 20,48 14,26" />
                  <circle cx="32" cy="14" r="2.5" fill="#6D28D9" />
                  <circle cx="50" cy="26" r="2.5" fill="#6D28D9" />
                  <circle cx="44" cy="48" r="2.5" fill="#6D28D9" />
                  <circle cx="20" cy="48" r="2.5" fill="#6D28D9" />
                  <circle cx="14" cy="26" r="2.5" fill="#6D28D9" />
                </svg>
              </div>
              <h3 className="mt-6 text-2xl md:text-3xl font-light tracking-[0.35em] text-ink">
                UNDERSTAND
              </h3>
              <div className="mt-6 space-y-1 text-ink-muted text-sm md:text-base font-light">
                <p>One daily score.</p>
                <p>Exactly where you stand.</p>
                <p>Every single morning.</p>
              </div>
            </motion.div>

            {/* Arrow connector 2 */}
            <div
              aria-hidden="true"
              className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 items-center justify-center text-ink-muted"
            >
              <svg width="26" height="14" viewBox="0 0 26 14" fill="none">
                <path
                  d="M1 7 H23 M17 1 L23 7 L17 13"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Card 3: ACT */}
          <div className="relative flex">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-full rounded-3xl border backdrop-blur-xl p-8 md:p-10 text-center flex flex-col items-center"
              style={{
                borderColor: 'rgb(227, 233, 242)',
                background: 'rgb(255, 255, 255)',
                boxShadow: 'rgba(34, 176, 125, 0.2) 0px 20px 50px -20px',
              }}
            >
              <div style={{ filter: 'drop-shadow(rgba(34, 176, 125, 0.533) 0px 0px 12px)' }}>
                <svg viewBox="0 0 64 64" className="h-14 w-14" fill="#22B07D">
                  <path d="M36 6 L18 36 h12 l-4 22 22-30 h-12 z" />
                </svg>
              </div>
              <h3 className="mt-6 text-2xl md:text-3xl font-light tracking-[0.35em] text-ink">
                ACT
              </h3>
              <div className="mt-6 space-y-1 text-ink-muted text-sm md:text-base font-light">
                <p>One action.</p>
                <p>Built for your body.</p>
                <p>Assigned every morning.</p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 md:mt-12 text-center"
        >
          <p className="text-xl md:text-2xl font-extralight text-ink-soft leading-relaxed">
            Most wearables stop at the data.
            <br />
            <span className="text-ink font-light">JCRingforlife starts there.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

