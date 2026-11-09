import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const COMPARISON_ROWS = [
  { feature: 'Continuous Heart Rate & HRV', aion: true, oura: true, whoop: true },
  { feature: 'Deep/REM Sleep Architecture', aion: true, oura: true, whoop: true },
  { feature: 'Skin Temperature Sensor (0.05°C)', aion: true, oura: true, whoop: false },
  { feature: 'SpO₂ Blood Oxygen Tracking', aion: true, oura: true, whoop: true },
  { feature: 'Synthesized Daily Vitality Score', aion: true, oura: false, whoop: false },
  { feature: 'Single Actionable Daily Quest', aion: true, oura: false, whoop: false },
  { feature: 'Screenless Titanium Form Factor', aion: true, oura: true, whoop: false },
  { feature: 'No Mandatory Subscription Paywall', aion: true, oura: false, whoop: false },
  { feature: 'Free Lifetime App Access (aiOn Vitals)', aion: true, oura: false, whoop: false },
];

export default function MembershipComparisonSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-36 border-t border-border">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow text-primary">Honest Economics</span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-ink">
            No subscription hostage crisis.
          </h2>
          <p className="mt-4 text-base font-light text-ink-soft leading-relaxed">
            You bought the hardware. Your health data belongs to you. aiOn Vitals is free for life with every ring.
          </p>
        </div>

        {/* Cost Comparison Pill Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* aiOn Ring */}
          <div className="relative p-7 rounded-3xl border-2 border-primary bg-gradient-to-b from-white to-canvas shadow-card flex flex-col justify-between">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
              aiOn Ring (Founder)
            </div>
            <div>
              <span className="text-xs font-semibold text-primary uppercase">Lifetime Vitals</span>
              <div className="mt-2 text-4xl font-extralight text-ink">$149</div>
              <p className="text-xs text-ink-muted mt-1">One-time payment</p>

              <div className="mt-6 space-y-2.5 text-xs text-ink-soft">
                <div className="flex justify-between py-1 border-b border-border/60">
                  <span>Hardware</span>
                  <span className="font-semibold text-ink">$149 (Pre-order)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/60">
                  <span>Monthly Fee</span>
                  <span className="font-bold text-emerald-600">$0 / month</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/60">
                  <span>Sizing Kit</span>
                  <span className="font-semibold text-emerald-600">Free ($0)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border">
              <span className="text-[11px] text-ink-muted uppercase">3-Year Total Cost</span>
              <div className="text-2xl font-bold text-primary mt-0.5">$149</div>
            </div>
          </div>

          {/* Oura Ring Gen 3 */}
          <div className="p-7 rounded-3xl border border-border bg-canvas/60 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-ink-muted uppercase">Competitor O</span>
              <div className="mt-2 text-4xl font-extralight text-ink">$299+</div>
              <p className="text-xs text-ink-muted mt-1">+ $5.99/mo subscription</p>

              <div className="mt-6 space-y-2.5 text-xs text-ink-soft">
                <div className="flex justify-between py-1 border-b border-border/60">
                  <span>Hardware</span>
                  <span className="font-semibold text-ink">$299 - $549</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/60">
                  <span>Monthly Fee</span>
                  <span className="font-semibold text-rose-600">$71.88 / year</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/60">
                  <span>Sizing Kit</span>
                  <span className="text-ink-soft">$10 extra</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border">
              <span className="text-[11px] text-ink-muted uppercase">3-Year Total Cost</span>
              <div className="text-2xl font-light text-ink mt-0.5">$515+</div>
            </div>
          </div>

          {/* Whoop 4.0 */}
          <div className="p-7 rounded-3xl border border-border bg-canvas/60 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-ink-muted uppercase">Competitor W</span>
              <div className="mt-2 text-4xl font-extralight text-ink">$30/mo</div>
              <p className="text-xs text-ink-muted mt-1">Wrist strap only (No ring)</p>

              <div className="mt-6 space-y-2.5 text-xs text-ink-soft">
                <div className="flex justify-between py-1 border-b border-border/60">
                  <span>Hardware</span>
                  <span className="font-semibold text-ink">Included in sub</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/60">
                  <span>Monthly Fee</span>
                  <span className="font-semibold text-rose-600">$239 - $360 / yr</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/60">
                  <span>Ring Format</span>
                  <span className="text-rose-600">None (Wrist only)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border">
              <span className="text-[11px] text-ink-muted uppercase">3-Year Total Cost</span>
              <div className="text-2xl font-light text-ink mt-0.5">$717 - $1,080</div>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="rounded-3xl border border-border overflow-hidden bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-canvas border-b border-border text-ink">
              <tr>
                <th className="py-4 px-6 font-semibold">Capability</th>
                <th className="py-4 px-6 font-bold text-primary text-center">aiOn Ring</th>
                <th className="py-4 px-6 font-medium text-ink-muted text-center hidden sm:table-cell">Oura Ring</th>
                <th className="py-4 px-6 font-medium text-ink-muted text-center hidden md:table-cell">Whoop 4.0</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-canvas/40 transition-colors">
                  <td className="py-3 px-6 font-medium text-ink">{row.feature}</td>
                  <td className="py-3 px-6 text-center">
                    <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                  </td>
                  <td className="py-3 px-6 text-center hidden sm:table-cell">
                    {row.oura ? (
                      <Check className="w-4 h-4 text-ink-muted mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-ink-muted/40 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-6 text-center hidden md:table-cell">
                    {row.whoop ? (
                      <Check className="w-4 h-4 text-ink-muted mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-ink-muted/40 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

