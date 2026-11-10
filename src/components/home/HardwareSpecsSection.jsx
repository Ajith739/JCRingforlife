import React from 'react';
import { motion } from 'framer-motion';

export default function HardwareSpecsSection() {
  return (
    <section
      id="ring"
      className="relative overflow-hidden py-14 sm:py-16 md:py-24"
      style={{
        background: 'linear-gradient(rgb(255, 255, 255) 0%, rgb(246, 248, 252) 100%)',
      }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-xs tracking-[0.3em] text-ink-muted uppercase">The Ring</p>
        </motion.div>
      </div>

      {/* Full-width Ring Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-screen left-1/2 -translate-x-1/2">
          <img
            src="/assets/ring-product-CoCbYrjo.jpg"
            alt="JCRingforlife ring"
            className="w-full h-[40vh] sm:h-[50vh] md:h-[62vh] object-cover object-center"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 65%, rgba(255, 255, 255, 0.92) 100%)',
            }}
          />
        </div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* 6 Hardware Badges */}
        <div className="relative mt-8 md:mt-10 grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 max-w-4xl mx-auto">
          {/* Titanium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="flex justify-center">
              <svg viewBox="0 0 24 24" className="h-7 w-7 md:h-8 md:w-8" fill="none" stroke="#1878E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3.2 20 7.6v8.8L12 20.8 4 16.4V7.6z" />
              </svg>
            </div>
            <div className="mt-2 text-xs md:text-sm text-ink-soft font-light">Titanium</div>
          </motion.div>

          {/* IP68 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-center"
          >
            <div className="flex justify-center">
              <svg viewBox="0 0 24 24" className="h-7 w-7 md:h-8 md:w-8" fill="none" stroke="#1878E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 15c2.2-2 4.3-2 6.5 0s4.3 2 6.5 0 4.3-2 5 -.6" />
                <path d="M3 19c2.2-2 4.3-2 6.5 0s4.3 2 6.5 0 4.3-2 5 -.6" />
                <path d="M12 3v6" />
              </svg>
            </div>
            <div className="mt-2 text-xs md:text-sm text-ink-soft font-light">IP68</div>
          </motion.div>

          {/* 5 days */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-center"
          >
            <div className="flex justify-center">
              <svg viewBox="0 0 24 24" className="h-7 w-7 md:h-8 md:w-8" fill="none" stroke="#1878E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="8" width="15" height="8" rx="2" />
                <path d="M21 11v2" />
              </svg>
            </div>
            <div className="mt-2 text-xs md:text-sm text-ink-soft font-light">5 days</div>
          </motion.div>

          {/* BLE 5.0 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="text-center"
          >
            <div className="flex justify-center">
              <svg viewBox="0 0 24 24" className="h-7 w-7 md:h-8 md:w-8" fill="none" stroke="#1878E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8.5 15a5 5 0 0 1 7 0" />
                <path d="M5.5 12a9 9 0 0 1 13 0" />
                <circle cx="12" cy="18" r="0.8" />
              </svg>
            </div>
            <div className="mt-2 text-xs md:text-sm text-ink-soft font-light">BLE 5.0</div>
          </motion.div>

          {/* Size 6–13 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="text-center"
          >
            <div className="flex justify-center">
              <svg viewBox="0 0 24 24" className="h-7 w-7 md:h-8 md:w-8" fill="none" stroke="#1878E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 14.5 14.5 4 20 9.5 9.5 20z" />
                <path d="M9 9.5 10.8 11.3M12 6.5l1.8 1.8M6.5 12l1.8 1.8" />
              </svg>
            </div>
            <div className="mt-2 text-xs md:text-sm text-ink-soft font-light">Size 6–13</div>
          </motion.div>

          {/* 3 finishes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <div className="flex justify-center">
              <svg viewBox="0 0 24 24" className="h-7 w-7 md:h-8 md:w-8" fill="none" stroke="#1878E0" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="8" cy="12" r="4" />
                <circle cx="16" cy="12" r="4" />
              </svg>
            </div>
            <div className="mt-2 text-xs md:text-sm text-ink-soft font-light">3 finishes</div>
          </motion.div>
        </div>

        {/* Finishes Subsection */}
        <div className="relative mt-12 md:mt-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p className="text-xs tracking-[0.3em] text-ink-muted uppercase">Finishes</p>
            <h3 className="mt-3 text-3xl md:text-4xl font-extralight text-ink">
              Three ways to wear it.
            </h3>
          </motion.div>

          <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-6 md:gap-10">
            {/* Midnight */}
            <motion.figure
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="relative mx-auto w-full max-w-[240px] aspect-square flex items-center justify-center">
                <div
                  className="pointer-events-none absolute inset-6 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(10, 22, 40, 0.07) 0%, rgba(10, 22, 40, 0) 70%)',
                  }}
                />
                <img
                  src="/assets/ring-finish-midnight-DK6ZPSTf.png"
                  alt="JCRingforlife ring in Midnight finish with engraved JCRingforlife wordmark"
                  loading="lazy"
                  className="relative w-[78%] h-[78%] object-contain transition-transform duration-700 hover:scale-[1.05]"
                />
              </div>
              <figcaption className="mt-2">
                <div className="text-sm sm:text-base md:text-lg font-light text-ink">Midnight</div>
                <div className="text-[10px] sm:text-xs tracking-[0.18em] uppercase text-ink-muted mt-1">
                  Matte titanium
                </div>
              </figcaption>
            </motion.figure>

            {/* Silver */}
            <motion.figure
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="text-center"
            >
              <div className="relative mx-auto w-full max-w-[240px] aspect-square flex items-center justify-center">
                <div
                  className="pointer-events-none absolute inset-6 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(10, 22, 40, 0.07) 0%, rgba(10, 22, 40, 0) 70%)',
                  }}
                />
                <img
                  src="/assets/ring-finish-silver-Xrc8Y54a.png"
                  alt="JCRingforlife ring in Silver finish with engraved JCRingforlife wordmark"
                  loading="lazy"
                  className="relative w-[78%] h-[78%] object-contain transition-transform duration-700 hover:scale-[1.05]"
                />
              </div>
              <figcaption className="mt-2">
                <div className="text-sm sm:text-base md:text-lg font-light text-ink">Silver</div>
                <div className="text-[10px] sm:text-xs tracking-[0.18em] uppercase text-ink-muted mt-1">
                  Brushed titanium
                </div>
              </figcaption>
            </motion.figure>

            {/* Rose Gold */}
            <motion.figure
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="text-center"
            >
              <div className="relative mx-auto w-full max-w-[240px] aspect-square flex items-center justify-center">
                <div
                  className="pointer-events-none absolute inset-6 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(10, 22, 40, 0.07) 0%, rgba(10, 22, 40, 0) 70%)',
                  }}
                />
                <img
                  src="/assets/ring-finish-rose-DTpoQDow.png"
                  alt="JCRingforlife ring in Rose Gold finish with engraved JCRingforlife wordmark"
                  loading="lazy"
                  className="relative w-[78%] h-[78%] object-contain transition-transform duration-700 hover:scale-[1.05]"
                />
              </div>
              <figcaption className="mt-2">
                <div className="text-sm sm:text-base md:text-lg font-light text-ink">Rose Gold</div>
                <div className="text-[10px] sm:text-xs tracking-[0.18em] uppercase text-ink-muted mt-1">
                  Warm PVD
                </div>
              </figcaption>
            </motion.figure>
          </div>

          <p className="mt-8 text-center text-sm text-ink-muted font-light">
            Same ring. Same sensors. Your finish.
          </p>
        </div>
      </div>
    </section>
  );
}
