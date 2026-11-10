import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Battery, Droplets, Cpu, Sparkles, Check, ArrowRight } from 'lucide-react';
import { RING_FINISHES } from '../data/products';

export default function RingPage() {
  useEffect(() => {
    document.title = 'JCRingforlife Ring - Specs, Materials & Size Chart';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink font-medium">The Ring</span>
        </nav>

        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="eyebrow text-primary">Hardware Architecture</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-ink mt-2 tracking-tight">
            Grade 5 Titanium. <br />
            Medical-grade interior.
          </h1>
          <p className="mt-4 text-base md:text-lg font-light text-ink-soft leading-relaxed">
            Every millimeter of the JCRingforlife ring is engineered to capture rich autonomic signals around the clock without demanding your attention.
          </p>
        </div>

        {/* Showcase Render */}
        <div className="relative rounded-3xl bg-white border border-border p-8 md:p-14 shadow-card mb-16 text-center">
          <img
            src="/assets/ring-product-CoCbYrjo.jpg"
            alt="JCRingforlife Smart Ring Hardware Exploded Architecture"
            className="w-full max-w-2xl mx-auto h-auto object-contain rounded-2xl"
          />
        </div>

        {/* Technical Specification Matrix */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-3xl bg-white border border-border space-y-4">
            <h3 className="text-xl font-light text-ink">Physical Dimensions</h3>
            <div className="space-y-3 text-sm divide-y divide-border/60">
              <div className="flex justify-between pt-2">
                <span className="text-ink-soft">Outer Shell Material</span>
                <span className="font-semibold text-ink">Grade 5 Titanium Alloy</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-ink-soft">Interior Molding</span>
                <span className="font-semibold text-ink">Medical-Grade Biocompatible Resin</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-ink-soft">Band Width</span>
                <span className="font-semibold text-ink">7.9 mm</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-ink-soft">Band Thickness</span>
                <span className="font-semibold text-ink">2.8 mm</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-ink-soft">Weight</span>
                <span className="font-semibold text-ink">4.2 to 5.8 grams (by size)</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-ink-soft">Available Sizes</span>
                <span className="font-semibold text-ink">US 6, 7, 8, 9, 10, 11, 12, 13</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-border space-y-4">
            <h3 className="text-xl font-light text-ink">Power & Connectivity</h3>
            <div className="space-y-3 text-sm divide-y divide-border/60">
              <div className="flex justify-between pt-2">
                <span className="text-ink-soft">Battery Chemistry</span>
                <span className="font-semibold text-ink">Rechargeable LiPo Microcell</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-ink-soft">Battery Life</span>
                <span className="font-semibold text-ink">Up to 7 days continuous</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-ink-soft">Charging Method</span>
                <span className="font-semibold text-ink">Custom Magnetic USB-C Dock</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-ink-soft">Charge Time</span>
                <span className="font-semibold text-ink">20–45 minutes</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-ink-soft">Water Resistance</span>
                <span className="font-semibold text-ink">5ATM / 50m (IP68 certified)</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-ink-soft">Wireless Protocol</span>
                <span className="font-semibold text-ink">Bluetooth Low Energy (BLE 5.2)</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="rounded-3xl bg-gradient-to-r from-ink to-[#1E293B] text-white p-8 md:p-12 text-center shadow-soft">
          <h2 className="text-3xl font-light">Experience the JCRingforlife Ring</h2>
          <p className="mt-2 text-sm text-white/80 max-w-xl mx-auto">
            Reserve your Founder Edition ring today. Free worldwide shipping and complimentary sizing kit included.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="btn-brand py-3.5 px-8 text-sm">
              Shop Ring Finishes →
            </Link>
            <Link to="/size-chart" className="btn-secondary py-3.5 px-8 text-sm text-ink bg-white">
              View Sizing Chart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

