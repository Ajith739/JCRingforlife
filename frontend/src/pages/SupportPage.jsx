import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HelpCircle, Package, RefreshCw, Shield, Send, Check } from 'lucide-react';

export default function SupportPage() {
  const [orderQuery, setOrderQuery] = useState('');
  const [lookupResult, setLookupResult] = useState(null);

  useEffect(() => {
    document.title = 'Support & Customer Care | JCRingforlife';
    window.scrollTo(0, 0);
  }, []);

  const handleLookup = (e) => {
    e.preventDefault();
    if (!orderQuery) return;
    setLookupResult({
      orderId: orderQuery.toUpperCase(),
      status: 'Confirmed · Founder Edition Batch 1',
      dispatch: 'Physical Sizing Kit dispatches first, Ring ships Q3 2026',
      guarantee: 'Active · 30-Day Money-Back Guarantee from delivery',
    });
  };

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <nav className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink font-medium">Support</span>
        </nav>

        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="eyebrow text-primary">Help Center</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-ink mt-1 tracking-tight">
            How can we assist you?
          </h1>
          <p className="mt-3 text-base font-light text-ink-soft leading-relaxed">
            Find answers regarding your founder pre-order, sizing kit delivery, hardware warranty, and return policies.
          </p>
        </div>

        {/* Quick Order Status Lookup */}
        <div className="p-8 rounded-3xl bg-white border border-border shadow-card mb-12">
          <h2 className="text-xl font-light text-ink mb-2">Check Pre-Order Status</h2>
          <p className="text-xs text-ink-soft mb-6">
            Enter your email or reservation confirmation code (e.g., JCRING-8492).
          </p>

          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter email or Order ID (e.g. JCRING-7281)..."
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-border text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="btn-brand py-3 px-6 text-xs font-semibold shrink-0">
              Lookup Status
            </button>
          </form>

          {lookupResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-2xl bg-canvas border border-border space-y-2 text-xs"
            >
              <div className="flex justify-between font-semibold text-ink">
                <span>Reservation #{lookupResult.orderId}</span>
                <span className="text-primary">{lookupResult.status}</span>
              </div>
              <p className="text-ink-soft">{lookupResult.dispatch}</p>
              <p className="text-emerald-600 font-medium">{lookupResult.guarantee}</p>
            </motion.div>
          )}
        </div>

        {/* Core Topics Grid */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-white border border-border space-y-3">
            <Package className="w-8 h-8 text-primary" />
            <h3 className="text-base font-semibold text-ink">Sizing Kit Process</h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              Learn how to calibrate your sample plastic sizing rings and confirm size in your profile.
            </p>
            <Link to="/size-chart" className="text-xs text-primary font-semibold hover:underline block pt-1">
              Read Sizing Guide →
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-border space-y-3">
            <RefreshCw className="w-8 h-8 text-primary" />
            <h3 className="text-base font-semibold text-ink">Returns & Refunds</h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              Every ring comes with an unconditional 30-day money-back guarantee after product delivery.
            </p>
            <Link to="/terms-of-service" className="text-xs text-primary font-semibold hover:underline block pt-1">
              Refund Policy Details →
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-border space-y-3">
            <Shield className="w-8 h-8 text-primary" />
            <h3 className="text-base font-semibold text-ink">1-Year Warranty</h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              Covers manufacturing defects, battery performance issues, and water seal integrity for 12 months.
            </p>
            <Link to="/contact" className="text-xs text-primary font-semibold hover:underline block pt-1">
              File Warranty Claim →
            </Link>
          </div>
        </div>

        {/* Support Help Request */}
        <div className="p-8 rounded-3xl bg-white border border-border shadow-sm text-center">
          <HelpCircle className="w-10 h-10 text-primary mx-auto mb-3" />
          <h3 className="text-xl font-light text-ink">Need Direct Assistance?</h3>
          <p className="text-sm text-ink-soft max-w-md mx-auto mt-2 leading-relaxed">
            Our support representatives are standing by to help with address corrections or custom sizing inquiries.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link to="/contact" className="btn-brand py-3 px-6 text-xs font-semibold">
              Send Support Message →
            </Link>
            <Link to="/faq" className="btn-secondary py-3 px-6 text-xs font-medium">
              Browse FAQs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

