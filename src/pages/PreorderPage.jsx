import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Check, ShieldCheck, Sparkles, Truck, Ruler, ArrowRight } from 'lucide-react';
import { RING_FINISHES, RING_SIZES, PRODUCT_INFO } from '../data/products';
import { useCart } from '../context/CartContext';
import SizingModal from '../components/common/SizingModal';

export default function PreorderPage() {
  const [searchParams] = useSearchParams();
  const refCode = searchParams.get('ref') || searchParams.get('partner') || '';
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [selectedFinish, setSelectedFinish] = useState(RING_FINISHES[0]);
  const [selectedSize, setSelectedSize] = useState('sizing-kit');
  const [promoCode, setPromoCode] = useState(refCode);
  const [isSizingOpen, setIsSizingOpen] = useState(false);

  useEffect(() => {
    document.title = 'Pre-Order aiOn Ring - Founder Edition';
    window.scrollTo(0, 0);
  }, []);

  const handlePreorder = (e) => {
    e.preventDefault();
    const sizeObj = RING_SIZES.find((s) => s.value === selectedSize);
    addItem({
      name: 'aiOn Smart Ring (Founder Edition)',
      finishId: selectedFinish.id,
      finishName: selectedFinish.name,
      size: sizeObj ? sizeObj.label : 'Free Sizing Kit First',
      price: PRODUCT_INFO.preorderPrice,
      originalPrice: PRODUCT_INFO.regularPrice,
      quantity: 1,
      image: selectedFinish.image,
    });
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <nav className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink font-medium">Pre-Order</span>
        </nav>

        {/* Top Pitch */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Founder Edition Allocation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-ink tracking-tight">
            Reserve Your aiOn Ring
          </h1>
          <p className="mt-3 text-base font-light text-ink-soft leading-relaxed">
            Lock in $50 in Founder savings, zero future subscription costs, and complimentary priority sizing.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
          {/* Configurator Column */}
          <div className="space-y-8 bg-white rounded-3xl border border-border p-8 shadow-card">
            {/* Finish */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink">
                  1. Choose Finish
                </span>
                <span className="text-xs text-ink-soft font-medium">
                  {selectedFinish.name} Titanium
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {RING_FINISHES.map((f) => {
                  const isSelected = selectedFinish.id === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSelectedFinish(f)}
                      className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                        isSelected
                          ? 'border-primary bg-primary/5 shadow-xs ring-1 ring-primary/20'
                          : 'border-border bg-canvas/40 hover:bg-white'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-black/10"
                        style={{ backgroundColor: f.color }}
                      />
                      <span className="text-xs font-semibold text-ink">{f.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size */}
            <div className="pt-6 border-t border-border">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink">
                  2. Select Size
                </span>
                <button
                  type="button"
                  onClick={() => setIsSizingOpen(true)}
                  className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Sizing helper</span>
                </button>
              </div>

              {/* Free Sizing Kit Option */}
              <button
                type="button"
                onClick={() => setSelectedSize('sizing-kit')}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between mb-3 ${
                  selectedSize === 'sizing-kit'
                    ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                    : 'border-border bg-white hover:border-border/80'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-ink">
                      Send Free Sizing Kit First
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-ink-soft mt-0.5">
                    We will send our 8-ring sizing set first so you can test fit at home.
                  </p>
                </div>
                {selectedSize === 'sizing-kit' && (
                  <Check className="w-5 h-5 text-primary shrink-0" />
                )}
              </button>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {RING_SIZES.slice(1).map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setSelectedSize(s.value)}
                    className={`py-2.5 rounded-xl border text-xs font-medium transition-all ${
                      selectedSize === s.value
                        ? 'border-primary bg-ink text-white font-bold'
                        : 'border-border bg-white text-ink hover:border-primary/40'
                    }`}
                  >
                    {s.value}
                  </button>
                ))}
              </div>
            </div>

            {/* Referral / Partner Promo Input */}
            <div className="pt-6 border-t border-border">
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                Referral Code or Partner ID (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. FOUNDER50 or CLINIC-PARTNER"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary uppercase tracking-wider"
              />
              {promoCode && (
                <p className="mt-1 text-xs text-emerald-600 font-medium">
                  ✓ Partner priority queue activated
                </p>
              )}
            </div>
          </div>

          {/* Reservation Summary Column */}
          <div className="p-8 rounded-3xl bg-white border border-border shadow-card space-y-6">
            <h3 className="text-xl font-light text-ink">
              Reservation Summary
            </h3>

            <div className="flex gap-4 p-4 rounded-2xl bg-canvas border border-border/70 items-center">
              <img
                src={selectedFinish.image}
                alt={selectedFinish.name}
                className="w-16 h-16 object-contain"
              />
              <div>
                <h4 className="text-sm font-semibold text-ink">
                  {PRODUCT_INFO.name}
                </h4>
                <p className="text-xs text-ink-soft">
                  Finish: <strong className="text-ink">{selectedFinish.name}</strong> · Size: <strong className="text-ink">{selectedSize === 'sizing-kit' ? 'Sizing Kit First' : `US ${selectedSize}`}</strong>
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-bold text-ink">
                    ${PRODUCT_INFO.preorderPrice}
                  </span>
                  <span className="text-xs text-ink-muted line-through">
                    ${PRODUCT_INFO.regularPrice}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs divide-y divide-border/60">
              <div className="flex justify-between py-1.5">
                <span className="text-ink-soft">Founder Pre-Order</span>
                <span className="font-semibold text-ink">${PRODUCT_INFO.preorderPrice}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-ink-soft">Free Sizing Kit</span>
                <span className="font-semibold text-emerald-600">$0.00</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-ink-soft">Lifetime App Access</span>
                <span className="font-semibold text-emerald-600">Free ($0)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-ink-soft">Worldwide Express Shipping</span>
                <span className="font-semibold text-emerald-600">FREE</span>
              </div>
              <div className="flex justify-between pt-3 text-base font-bold text-ink">
                <span>Total Today</span>
                <span className="text-primary text-xl">${PRODUCT_INFO.preorderPrice}</span>
              </div>
            </div>

            <button
              onClick={handlePreorder}
              className="w-full btn-brand py-4 text-base font-semibold shadow-glow flex items-center justify-center gap-2"
            >
              <span>Continue to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="space-y-2 text-xs text-ink-muted pt-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>30-Day Money-Back Guarantee upon ring receipt</span>
              </div>
              <p>Estimated production batch delivery: Q3 2026</p>
            </div>
          </div>
        </div>
      </div>

      <SizingModal isOpen={isSizingOpen} onClose={() => setIsSizingOpen(false)} />
    </div>
  );
}

