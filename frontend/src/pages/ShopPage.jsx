import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ShieldCheck, Truck, Sparkles, Ruler, ArrowRight } from 'lucide-react';
import { RING_FINISHES, RING_SIZES, PRODUCT_INFO } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import SizingModal from '../components/common/SizingModal.jsx';

export default function ShopPage() {
  const [selectedFinish, setSelectedFinish] = useState(RING_FINISHES[0]);
  const [selectedSize, setSelectedSize] = useState('sizing-kit');
  const [isSizingModalOpen, setIsSizingModalOpen] = useState(false);
  const [activeThumb, setActiveThumb] = useState(0);
  const { addItem } = useCart();

  useEffect(() => {
    document.title = 'Shop the JCRingforlife Smart Wellness Ring';
    window.scrollTo(0, 0);
  }, []);

  const galleryImages = [
    selectedFinish.image,
    '/assets/ring-product-CoCbYrjo.jpg',
    '/assets/hero-concept-studio-v3-uDobkO1M.jpg',
    '/assets/nature-walk-ring-BdKlJFoj.jpg',
  ];

  const handleAddToCart = () => {
    const sizeObj = RING_SIZES.find((s) => s.value === selectedSize);
    addItem({
      name: 'JCRingforlife Smart Ring (Founder Edition)',
      finishId: selectedFinish.id,
      finishName: selectedFinish.name,
      size: sizeObj ? sizeObj.label : 'Free Sizing Kit First',
      price: PRODUCT_INFO.preorderPrice,
      originalPrice: PRODUCT_INFO.regularPrice,
      quantity: 1,
      image: selectedFinish.image,
    });
  };

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink font-medium">Shop</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Product Gallery */}
          <div className="space-y-4">
            <motion.div
              key={activeThumb + selectedFinish.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="aspect-square rounded-3xl bg-white border border-border/70 p-8 flex items-center justify-center shadow-sm overflow-hidden"
            >
              <img
                src={galleryImages[activeThumb]}
                alt={`${PRODUCT_INFO.name} in ${selectedFinish.name}`}
                className="w-full h-full object-contain filter drop-shadow-xl"
              />
            </motion.div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveThumb(idx)}
                  className={`aspect-square rounded-2xl bg-white border p-2 overflow-hidden transition-all ${
                    activeThumb === idx
                      ? 'border-primary ring-2 ring-primary/20 shadow-xs'
                      : 'border-border/60 hover:border-border'
                  }`}
                >
                  <img
                    src={img}
                    alt="Thumbnail preview"
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Configurator & Purchasing */}
          <div className="space-y-8">
            <div>
              <span className="eyebrow text-primary">Pre-Order: Founder Edition</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-ink mt-1 tracking-tight">
                {PRODUCT_INFO.name}
              </h1>
              <p className="mt-3 text-base font-light text-ink-soft leading-relaxed">
                The full circle of everyday wellness. Dual-wavelength photoplethysmography, 7-day battery life, and aerospace-grade titanium.
              </p>

              {/* Price Block */}
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-4xl font-extralight text-ink">
                  ${PRODUCT_INFO.preorderPrice}
                </span>
                <span className="text-lg text-ink-muted line-through">
                  ${PRODUCT_INFO.regularPrice}
                </span>
                <span className="inline-flex px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  Save $50 (25% off)
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-muted">
                Pre-order reservation · Ships globally Q3 2026
              </p>
            </div>

            {/* Step 1: Finish Selector */}
            <div className="space-y-3 pt-6 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink">
                  1. Choose Finish
                </span>
                <span className="text-xs font-medium text-ink-soft">
                  Selected: <strong className="text-ink">{selectedFinish.name}</strong>
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {RING_FINISHES.map((finish) => {
                  const isSelected = selectedFinish.id === finish.id;
                  return (
                    <button
                      key={finish.id}
                      type="button"
                      onClick={() => {
                        setSelectedFinish(finish);
                        setActiveThumb(0);
                      }}
                      className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                        isSelected
                          ? 'border-primary bg-white shadow-soft ring-1 ring-primary/20'
                          : 'border-border bg-white/50 hover:bg-white hover:border-border/80'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
                        style={{ backgroundColor: finish.color }}
                      />
                      <span className="text-xs font-medium text-ink">
                        {finish.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Size Selector */}
            <div className="space-y-3 pt-6 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink">
                  2. Select Size
                </span>
                <button
                  type="button"
                  onClick={() => setIsSizingModalOpen(true)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size guide & card calibration</span>
                </button>
              </div>

              {/* Sizing Kit Option Button */}
              <button
                type="button"
                onClick={() => setSelectedSize('sizing-kit')}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
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
                    We ship 8 sample rings so you can test fit overnight. Confirm size before ring manufacture.
                  </p>
                </div>
                {selectedSize === 'sizing-kit' && (
                  <Check className="w-5 h-5 text-primary shrink-0" />
                )}
              </button>

              {/* Numeric Sizes Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-2">
                {RING_SIZES.slice(1).map((size) => {
                  const isSelected = selectedSize === size.value;
                  return (
                    <button
                      key={size.value}
                      type="button"
                      onClick={() => setSelectedSize(size.value)}
                      className={`py-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'border-primary bg-ink text-white font-semibold shadow-xs'
                          : 'border-border bg-white text-ink hover:border-primary/50'
                      }`}
                    >
                      <span className="text-xs">{size.value}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Add to Cart CTA */}
            <div className="pt-6 border-t border-border space-y-4">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full btn-brand py-4 text-base font-semibold shadow-glow flex items-center justify-center gap-2"
              >
                <span>Add to Cart — ${PRODUCT_INFO.preorderPrice}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-3 text-xs text-ink-muted pt-2">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-primary shrink-0" />
                  <span>Free Worldwide Express</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary shrink-0" />
                  <span>Free Lifetime App Included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>1-Year Hardware Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sizing Modal */}
      <SizingModal
        isOpen={isSizingModalOpen}
        onClose={() => setIsSizingModalOpen(false)}
        onSelectSize={(val) => setSelectedSize(val)}
      />
    </div>
  );
}

