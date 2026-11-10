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
    <section className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden">
      <div className="relative h-[46vh] md:h-[62vh]">
        <img
          src={src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: position, transform: 'scale(1.08)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(rgba(10, 22, 40, 0.55) 0%, rgba(10, 22, 40, 0.1) 60%, rgba(10, 22, 40, 0) 75%), linear-gradient(rgba(255, 255, 255, 0.96) 0%, rgba(10, 22, 40, 0.2) 26%, rgba(10, 22, 40, 0.45) 70%, rgba(255, 255, 255, 0.96) 100%)',
          }}
        />
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl"
          >
            <p className="text-[11px] tracking-[0.38em] uppercase text-white/70">{eyebrow}</p>
            <h2
              className="mt-4 text-3xl md:text-5xl font-extralight text-white leading-[1.1]"
              style={{ textShadow: 'rgba(10, 22, 40, 0.55) 0px 4px 40px' }}
            >
              {title}
            </h2>
            <p className="mt-5 text-base md:text-lg font-light text-white/80">{line}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
