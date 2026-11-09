import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function RunningBannerSection() {
  return (
    <section className="relative overflow-hidden bg-canvas py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-6xl text-center">
        {/* Cinematic Runner Banner */}
        <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-3xl shadow-soft">
          <img
            src="/assets/nature-forest-trail-o8cpuo5D.jpg"
            alt="Person running on a mountain trail wearing the aiOn Ring"
            className="h-[34vh] md:h-[46vh] w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                linear-gradient(to bottom, hsl(var(--canvas)) 0%, transparent 18%, transparent 82%, hsl(var(--canvas)) 100%),
                linear-gradient(to right, hsl(var(--canvas)) 0%, transparent 10%, transparent 90%, hsl(var(--canvas)) 100%)
              `,
            }}
          />
        </div>

        {/* Text and Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 md:mt-16 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-ink leading-[1.08] tracking-tight">
            Your body has answers.
          </h2>
          <p
            className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extralight bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(120deg, #1878E0, #6D28D9)',
            }}
          >
            aiOn helps you hear them.
          </p>

          <div className="mt-10 flex flex-col items-center">
            <Link
              to="/preorder"
              className="relative group inline-flex items-center justify-center rounded-full px-10 py-4.5 text-base sm:text-lg font-semibold text-white shadow-glow"
              style={{
                background: 'linear-gradient(135deg, #00A9E0, #1878E0, #6D28D9)',
              }}
            >
              {/* Pulsing ring animation */}
              <motion.span
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 0 0px rgba(24, 120, 224, 0.5)',
                    '0 0 0 18px rgba(24, 120, 224, 0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="relative z-10">Pre-order Founder Edition — $149</span>
              <span className="relative z-10 ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <p className="mt-4 text-xs md:text-sm text-ink-muted">
              Ships globally Q3 2026 · Free Sizing Kit included · 30-Day Money-Back Guarantee
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

