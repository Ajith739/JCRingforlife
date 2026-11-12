import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export default function VitalityLoopSection() {
  const [score, setScore] = useState(0);
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const target = 84;
    const timer = setInterval(() => {
      current += 2;
      if (current >= target) {
        setScore(target);
        clearInterval(timer);
      } else {
        setScore(current);
      }
    }, 25);
    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <section id="how" className="relative overflow-hidden bg-white py-14 sm:py-16 md:py-24" ref={containerRef}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src="/assets/nature-sunrise-ridge-C0cApxPE.jpg"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
          style={{ objectPosition: 'center 40%', opacity: 0.3, filter: 'saturate(0.85)' }}
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
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative mx-auto h-72 w-72 md:h-96 md:w-96">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  stroke="rgba(10,22,40,0.10)"
                  strokeWidth="3"
                  fill="none"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  stroke="url(#v2grad)"
                  pathLength="1"
                  initial={{ strokeDashoffset: 1 }}
                  animate={isInView ? { strokeDashoffset: 1 - 0.84 } : {}}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  strokeDasharray="1 1"
                />
                <defs>
                  <linearGradient id="v2grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1878E0" />
                    <stop offset="100%" stopColor="#22B07D" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-6xl md:text-7xl font-extralight text-ink">
                  <span>{score}</span>
                </div>
                <div className="mt-1 text-xs md:text-sm text-ink-muted tracking-widest uppercase">
                  YOUR VITALITY SCORE
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-ink-soft">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  background: 'rgb(34, 176, 125)',
                  boxShadow: 'rgb(34, 176, 125) 0px 0px 13.5825px',
                }}
              />
              You're ready today
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-6xl font-extralight text-ink leading-[1.05]">
              <span>Wake up knowing</span>
              <br />
              <span>your number.</span>
            </h2>
            <div className="mt-8 space-y-3 text-ink-soft text-lg font-light">
              <p>
                Heart Rate. HRV. Sleep.
                <br />
                Stress. Recovery. SpO₂.
              </p>
              <p className="text-ink font-normal">One score. Every morning.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
