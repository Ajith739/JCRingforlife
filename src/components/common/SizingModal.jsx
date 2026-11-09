import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Camera, Check, Ruler, Sparkles } from 'lucide-react';
import { RING_SIZES } from '../../data/products';

const SIZE_CONVERSIONS = [
  { us: "6", uk: "L 1/2", eu: "51.8", mm: "16.5" },
  { us: "7", uk: "N 1/2", eu: "54.4", mm: "17.3" },
  { us: "8", uk: "P 1/2", eu: "56.9", mm: "18.1" },
  { us: "9", uk: "R 1/2", eu: "59.5", mm: "18.9" },
  { us: "10", uk: "T 1/2", eu: "62.1", mm: "19.8" },
  { us: "11", uk: "V 1/2", eu: "64.6", mm: "20.6" },
  { us: "12", uk: "X 1/2", eu: "67.2", mm: "21.4" },
  { us: "13", uk: "Z 1/2", eu: "69.7", mm: "22.2" },
];

export default function SizingModal({ isOpen, onClose, onSelectSize }) {
  const [activeTab, setActiveTab] = useState('card'); // 'card' or 'table'
  const [sliderMm, setSliderMm] = useState(18.9);

  if (!isOpen) return null;

  // Find closest size based on slider
  const closestSize = SIZE_CONVERSIONS.reduce((prev, curr) => {
    return Math.abs(parseFloat(curr.mm) - sliderMm) < Math.abs(parseFloat(prev.mm) - sliderMm)
      ? curr
      : prev;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-ink/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-border overflow-hidden z-10 my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/70">
            <div>
              <span className="eyebrow text-primary">Interactive Fit Tool</span>
              <h2 className="text-xl md:text-2xl font-light text-ink mt-0.5">
                Find Your Perfect Ring Size
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-ink-muted hover:text-ink hover:bg-canvas transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-border bg-canvas/60 px-6 pt-3 gap-4">
            <button
              onClick={() => setActiveTab('card')}
              className={`pb-3 text-sm font-medium transition-all relative ${
                activeTab === 'card' ? 'text-primary' : 'text-ink-soft hover:text-ink'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4" />
                <span>Card Calibration Method</span>
              </span>
              {activeTab === 'card' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`pb-3 text-sm font-medium transition-all relative ${
                activeTab === 'table' ? 'text-primary' : 'text-ink-soft hover:text-ink'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Ruler className="w-4 h-4" />
                <span>Size Conversion Table</span>
              </span>
              {activeTab === 'table' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
            {activeTab === 'card' ? (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
                    <img
                      src="/assets/hand-card-sample-palm-C2QZUor5.jpg"
                      alt="Rest a bank card on your palm for digital sizing"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-ink">
                      How It Works
                    </h3>
                    <ol className="space-y-2 text-xs md:text-sm text-ink-soft">
                      <li className="flex gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                          1
                        </span>
                        <span>Remove every ring from your target finger.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                          2
                        </span>
                        <span>Rest any standard bank/credit card flat on your palm.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                          3
                        </span>
                        <span>Confirm your calibrated diameter below.</span>
                      </li>
                    </ol>
                  </div>
                </div>

                {/* Interactive Slider Gauge */}
                <div className="p-5 rounded-2xl bg-canvas border border-border space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-ink uppercase tracking-wider">
                      Inner Diameter Gauge
                    </span>
                    <span className="text-sm font-bold text-primary">
                      {sliderMm.toFixed(1)} mm
                    </span>
                  </div>
                  <input
                    type="range"
                    min="16.0"
                    max="23.0"
                    step="0.1"
                    value={sliderMm}
                    onChange={(e) => setSliderMm(parseFloat(e.target.value))}
                    className="w-full accent-primary h-2 bg-white rounded-lg cursor-pointer"
                  />
                  <div className="p-3 bg-white rounded-xl border border-border/70 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-ink-muted">Suggested Fit:</p>
                      <p className="text-base font-bold text-ink">
                        US Size {closestSize.us} (UK {closestSize.uk} · EU {closestSize.eu})
                      </p>
                    </div>
                    {onSelectSize && (
                      <button
                        onClick={() => {
                          onSelectSize(closestSize.us);
                          onClose();
                        }}
                        className="btn-brand py-2 px-4 text-xs"
                      >
                        Select Size {closestSize.us}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Conversion Table */
              <div className="border border-border rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead className="bg-canvas border-b border-border text-ink-soft">
                    <tr>
                      <th className="py-3 px-4 font-semibold">US Size</th>
                      <th className="py-3 px-4 font-semibold">UK / AU</th>
                      <th className="py-3 px-4 font-semibold">EU Size</th>
                      <th className="py-3 px-4 font-semibold">Diameter (mm)</th>
                      <th className="py-3 px-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {SIZE_CONVERSIONS.map((row) => (
                      <tr key={row.us} className="hover:bg-canvas/50 transition-colors">
                        <td className="py-2.5 px-4 font-bold text-ink">US {row.us}</td>
                        <td className="py-2.5 px-4 text-ink-soft">{row.uk}</td>
                        <td className="py-2.5 px-4 text-ink-soft">{row.eu}</td>
                        <td className="py-2.5 px-4 text-ink-soft">{row.mm} mm</td>
                        <td className="py-2.5 px-4 text-right">
                          {onSelectSize ? (
                            <button
                              onClick={() => {
                                onSelectSize(row.us);
                                onClose();
                              }}
                              className="text-primary hover:underline font-semibold text-xs"
                            >
                              Select
                            </button>
                          ) : (
                            <span className="text-emerald-600 font-medium text-xs">Standard</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Sizing Kit Reassurance */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="text-xs text-ink-soft leading-relaxed">
                <strong className="text-ink font-semibold">Still unsure?</strong> You don't have to guess today. Select <em>"Free Sizing Kit First"</em> at checkout and we will mail you the physical ring sizing kit at zero cost before crafting your ring.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

