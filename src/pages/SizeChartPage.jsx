import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Ruler, Sparkles, Check, CreditCard, ArrowRight } from 'lucide-react';
import SizingModal from '../components/common/SizingModal';

const FULL_SIZE_TABLE = [
  { us: "6", uk: "L 1/2", eu: "51.8", jp: "11", dia: "16.5 mm", circ: "51.8 mm" },
  { us: "7", uk: "N 1/2", eu: "54.4", jp: "14", dia: "17.3 mm", circ: "54.4 mm" },
  { us: "8", uk: "P 1/2", eu: "56.9", jp: "16", dia: "18.1 mm", circ: "56.9 mm" },
  { us: "9", uk: "R 1/2", eu: "59.5", jp: "19", dia: "18.9 mm", circ: "59.5 mm" },
  { us: "10", uk: "T 1/2", eu: "62.1", jp: "21", dia: "19.8 mm", circ: "62.1 mm" },
  { us: "11", uk: "V 1/2", eu: "64.6", jp: "24", dia: "20.6 mm", circ: "64.6 mm" },
  { us: "12", uk: "X 1/2", eu: "67.2", jp: "26", dia: "21.4 mm", circ: "67.2 mm" },
  { us: "13", uk: "Z 1/2", eu: "69.7", jp: "28", dia: "22.2 mm", circ: "69.7 mm" },
];

export default function SizeChartPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'Ring Size Chart - US, UK & EU Sizes | aiOn';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <nav className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink font-medium">Size Chart</span>
        </nav>

        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="eyebrow text-primary">Sizing & Fit Guide</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-ink mt-1 tracking-tight">
            International Ring Size Chart
          </h1>
          <p className="mt-4 text-base font-light text-ink-soft leading-relaxed">
            A precise fit is essential for continuous sensor contact and overnight sleep tracking. Compare your local ring size or request our free physical kit.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-brand py-3 px-6 text-xs font-semibold flex items-center gap-2 shadow-sm"
            >
              <CreditCard className="w-4 h-4" />
              <span>Launch Interactive Card Calibration Tool</span>
            </button>
          </div>
        </div>

        {/* Free Sizing Kit Hero Callout */}
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-white via-primary/5 to-white p-8 mb-14 shadow-card">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero Risk Recommendation</span>
              </div>
              <h2 className="text-2xl font-light text-ink">
                Order With "Free Sizing Kit First"
              </h2>
              <p className="text-sm text-ink-soft max-w-xl leading-relaxed">
                Your fingers naturally expand and contract between day and night. We send you 8 precision sample plastic sizing rings. Wear your chosen size for 24 hours, confirm fit on our website, and we craft your custom titanium ring.
              </p>
            </div>
            <Link
              to="/preorder"
              className="btn-brand py-3.5 px-6 text-sm shrink-0 shadow-md"
            >
              Reserve With Free Kit →
            </Link>
          </div>
        </div>

        {/* Conversion Table */}
        <div className="rounded-3xl border border-border bg-white shadow-card overflow-hidden mb-16">
          <div className="p-6 border-b border-border bg-canvas/40 flex justify-between items-center">
            <h3 className="text-lg font-medium text-ink">
              Official aiOn Size Cross-Reference Table
            </h3>
            <span className="text-xs text-ink-muted">Standard ISO / US sizing</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-canvas border-b border-border text-xs uppercase tracking-wider text-ink-muted">
                <tr>
                  <th className="py-4 px-6 font-semibold">aiOn / US Size</th>
                  <th className="py-4 px-6 font-semibold">UK / AU</th>
                  <th className="py-4 px-6 font-semibold">Europe (EU)</th>
                  <th className="py-4 px-6 font-semibold">Japan (JP)</th>
                  <th className="py-4 px-6 font-semibold">Inner Diameter</th>
                  <th className="py-4 px-6 font-semibold">Circumference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {FULL_SIZE_TABLE.map((row) => (
                  <tr key={row.us} className="hover:bg-canvas/50 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-ink">Size {row.us}</td>
                    <td className="py-3.5 px-6 text-ink-soft">{row.uk}</td>
                    <td className="py-3.5 px-6 text-ink-soft">{row.eu}</td>
                    <td className="py-3.5 px-6 text-ink-soft">{row.jp}</td>
                    <td className="py-3.5 px-6 font-mono text-xs text-ink">{row.dia}</td>
                    <td className="py-3.5 px-6 font-mono text-xs text-primary font-semibold">{row.circ}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fitting Tips */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-border space-y-2">
            <span className="text-xs font-bold text-primary uppercase">Finger Selection</span>
            <h4 className="text-base font-semibold text-ink">Index Finger Preferred</h4>
            <p className="text-xs text-ink-soft leading-relaxed">
              aiOn works on any finger, but the index or middle finger generally yields the strongest PPG pulse wave due to palm artery proximity.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-border space-y-2">
            <span className="text-xs font-bold text-primary uppercase">Knuckle Clearance</span>
            <h4 className="text-base font-semibold text-ink">Snug Over Knuckle</h4>
            <p className="text-xs text-ink-soft leading-relaxed">
              The ring should slide over your knuckle with slight resistance and rotate smoothly at the base without pinching.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-border space-y-2">
            <span className="text-xs font-bold text-primary uppercase">Day/Night Swelling</span>
            <h4 className="text-base font-semibold text-ink">24-Hour Test</h4>
            <p className="text-xs text-ink-soft leading-relaxed">
              Fingers are typically slightly larger in the morning. Ensure the ring remains comfortable when your body is fully at rest.
            </p>
          </div>
        </div>
      </div>

      <SizingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

