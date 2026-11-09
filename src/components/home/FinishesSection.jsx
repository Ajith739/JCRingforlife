import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RING_FINISHES } from '../../data/products';
import { Link } from 'react-router-dom';

export default function FinishesSection() {
  const [activeFinish, setActiveFinish] = useState(RING_FINISHES[0]);

  return (
    <section className="relative overflow-hidden bg-canvas py-24 md:py-36 border-t border-border">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow text-primary">In-Life Moments</span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-ink">
            Three Finishes. Every Setting.
          </h2>
          <p className="mt-4 text-base font-light text-ink-soft leading-relaxed">
            Engineered to feel native at black-tie dinners, morning backcountry runs, and uninterrupted midnight rest.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-12">
          {RING_FINISHES.map((finish) => {
            const isActive = activeFinish.id === finish.id;
            return (
              <button
                key={finish.id}
                type="button"
                onClick={() => setActiveFinish(finish)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-ink text-white shadow-soft ring-2 ring-primary/20'
                    : 'bg-white text-ink-soft hover:text-ink border border-border shadow-xs'
                }`}
              >
                <span
                  className="h-3 w-3 rounded-full border border-white/50"
                  style={{ backgroundColor: finish.color }}
                />
                <span>
                  {finish.name} · <span className="opacity-80">{finish.context}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Video & Finish Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFinish.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-border shadow-card"
          >
            {/* Contextual Video */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-ink shadow-inner">
              <video
                key={activeFinish.video}
                autoPlay
                loop
                muted
                playsInline
                poster={activeFinish.poster}
                className="w-full h-full object-cover"
              >
                <source src={activeFinish.video} type="video/mp4" />
                <img
                  src={activeFinish.poster}
                  alt={`${activeFinish.name} context`}
                  className="w-full h-full object-cover"
                />
              </video>
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium">
                Context: {activeFinish.context}
              </div>
            </div>

            {/* Finish Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span
                  className="h-5 w-5 rounded-full border border-border shadow-sm"
                  style={{ backgroundColor: activeFinish.color }}
                />
                <h3 className="text-2xl sm:text-3xl font-light text-ink">
                  {activeFinish.name} Titanium
                </h3>
              </div>
              <p className="text-base font-light text-ink-soft leading-relaxed">
                {activeFinish.description}
              </p>

              <div className="p-4 rounded-xl bg-canvas border border-border/60 text-xs text-ink-soft space-y-1.5">
                <p><strong>Material:</strong> Grade 5 Aerospace Titanium Alloy</p>
                <p><strong>Deposition:</strong> Vacuum Physical Vapor Deposition (PVD)</p>
                <p><strong>Finishing:</strong> Laser-etched interior serial, satin exterior</p>
              </div>

              <div className="pt-2">
                <Link
                  to={`/shop?finish=${activeFinish.id}`}
                  className="btn-brand py-3 px-7 text-sm inline-flex items-center gap-2"
                >
                  <span>Select {activeFinish.name}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

