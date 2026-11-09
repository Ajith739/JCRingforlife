import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ShieldCheck, Truck, Sparkles, Clock } from 'lucide-react';
import { PRODUCT_INFO } from '../../data/products';

export default function PreorderOfferCard() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-b from-white to-[#F6F8FC] p-8 md:p-14 shadow-card"
        >
          {/* Ambient Corner Glow */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl opacity-25"
            style={{
              background: 'radial-gradient(circle, #00A9E0 0%, #1878E0 60%, transparent 80%)',
            }}
          />

          <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
            {/* Left Column: Perks & Value Proposition */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Founder Edition Reservation</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-light text-ink tracking-tight">
                Be the first to wear aiOn.
              </h2>
              <p className="mt-3 text-sm md:text-base font-light text-ink-soft leading-relaxed">
                Join our first production run. Lock in permanent founder privileges, zero future subscription costs, and complimentary priority sizing.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-3.5">
                {[
                  'Free Sizing Kit dispatched first',
                  'Lifetime aiOn Vitals app access ($0)',
                  'No recurring monthly fees ever',
                  'Ships globally in Q3 2026',
                  '30-day money-back satisfaction',
                  '1-year full hardware warranty',
                ].map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs md:text-sm text-ink-soft">
                    <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </div>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Pricing & Action Box */}
            <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white border border-border shadow-soft text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Early Reservation Price
              </span>

              <div className="mt-2 flex items-baseline justify-center gap-2">
                <span className="text-5xl font-extralight text-ink">
                  ${PRODUCT_INFO.preorderPrice}
                </span>
                <span className="text-xl text-ink-muted line-through">
                  ${PRODUCT_INFO.regularPrice}
                </span>
              </div>
              <span className="mt-1 text-xs font-semibold text-emerald-600">
                Save $50 (25% Early Founder Discount)
              </span>

              <Link
                to="/preorder"
                className="mt-6 w-full btn-brand py-3.5 text-base shadow-md"
              >
                Pre-order Now →
              </Link>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-ink-muted">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>Production allocation limited to 5,000 units</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

