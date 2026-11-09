import React from 'react';
import { motion } from 'framer-motion';

export default function LifestyleBannerSection() {
  return (
    <section className="relative w-full overflow-hidden bg-canvas py-12 md:py-20">
      <div className="mx-auto max-w-[1300px] px-6">
        <div
          className="relative w-full overflow-hidden rounded-3xl shadow-soft"
          style={{ height: '52vh', minHeight: '360px', maxHeight: '620px' }}
        >
          {/* Background Video with Poster Fallback */}
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/poster-life-early-CwSaqYEV.jpg"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: 'contrast(1.04) saturate(0.96)' }}
          >
            <source
              src="/__l5e/assets-v1/55a8e091-0987-4168-80f5-537d57117450/video-life-early.mp4"
              type="video/mp4"
            />
            <img
              src="/assets/poster-life-early-CwSaqYEV.jpg"
              alt="Person wearing the aiOn ring during a calm morning wellness routine"
              className="h-full w-full object-cover"
            />
          </video>

          {/* Vignette Gradients */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,22,40,0.5) 0%, rgba(10,22,40,0.1) 40%, rgba(10,22,40,0.6) 100%)',
            }}
          />

          {/* Centered Overlay Text */}
          <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.38em] text-white/80">
                A ring for real life
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extralight text-white leading-[1.15] tracking-tight">
                From morning light <br /> to evening wind-down.
              </h2>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

