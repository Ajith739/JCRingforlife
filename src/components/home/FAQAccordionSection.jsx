import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '../../data/faqs';
import { Link } from 'react-router-dom';

export default function FAQAccordionSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative bg-canvas py-24 md:py-36 border-t border-border">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow text-primary">Questions, Answered</span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-ink">
            Smart ring questions, and what aiOn isn’t
          </h2>
          <p className="mt-4 text-sm md:text-base font-light text-ink-soft leading-relaxed">
            Sleep, recovery, battery, fit and finishes, plus the honest boundaries of a wellness companion.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-2xl border bg-white overflow-hidden transition-all shadow-sm"
                style={{
                  borderColor: isOpen ? 'rgba(24, 120, 224, 0.4)' : '#E2E8F0',
                  boxShadow: isOpen
                    ? '0 16px 36px -20px rgba(24, 120, 224, 0.3)'
                    : '0 1px 2px rgba(10, 22, 40, 0.03)',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-light text-ink pr-4">
                    {faq.q}
                  </span>
                  <span
                    className="shrink-0 text-2xl font-extralight text-ink-muted transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm md:text-[15px] font-light leading-relaxed text-ink-soft border-t border-border/40">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link to="/faq" className="btn-secondary py-3 px-7 text-xs font-semibold">
            Visit the Complete FAQ & Knowledgebase →
          </Link>
        </div>
      </div>
    </section>
  );
}

