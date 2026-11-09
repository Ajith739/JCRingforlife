import React from 'react';
import { motion } from 'framer-motion';

export default function ParallaxBreakBanner({
  src,
  eyebrow,
  title,
  line,
  position = 'center 40%',
}) {
  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24 bg-canvas">
      <div className="mx-auto max-w-[1300px] px-6">
        <div
          className="relative w-full overflow-hidden rounded-3xl shadow-soft"
          style={{ height: '50vh', minHeight: '380px', maxHeight: '580px' }}
        >
          {/* Background Image */}
          <img
            src={src}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            style={{ objectPosition: position }}
            loading="lazy"
          />

          {/* Vignette Overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,22,40,0.6) 0%, rgba(10,22,40,0.25) 50%, rgba(10,22,40,0.7) 100%)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white"
            >
              <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.38em] text-white/80">
                {eyebrow}
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light leading-[1.15] tracking-tight">
                {title}
              </h2>
              <p className="mt-4 text-sm sm:text-base md:text-lg font-light text-white/90 leading-relaxed max-w-xl mx-auto">
                {line}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

