import React from 'react';
import { motion } from 'framer-motion';

const STATEMENTS = [
  { text: 'You feel tired.', strong: true },
  { text: "You don't know why.", strong: false },
  { text: "You're working hard.", strong: true },
  { text: "You're not recovering.", strong: false },
  { text: "You're stressed.", strong: true, hasPulse: true },
  { text: "You can't see what it's doing.", strong: false },
];

export default function ProblemStatementSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-36">
      {/* Centered Ambient Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, #1878E0 0%, #6D28D9 50%, transparent 70%)',
        }}
      />

      <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl">
        <div className="space-y-6 md:space-y-8">
          {STATEMENTS.map((item, idx) => (
            <motion.div
              key={idx}
              className="relative"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
            >
              {item.hasPulse && (
                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-none h-24 opacity-60">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 800 80"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M0,40 L220,40 L250,20 L275,60 L300,10 L325,70 L350,40 L470,40 L500,25 L520,55 L540,40 L800,40"
                      stroke="#1878E0"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.8, ease: 'easeInOut' }}
                    />
                  </svg>
                </div>
              )}

              <p
                className={`text-2xl sm:text-3xl md:text-5xl tracking-tight leading-tight ${
                  item.strong
                    ? 'font-light text-ink'
                    : 'font-extralight text-ink-muted'
                }`}
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

