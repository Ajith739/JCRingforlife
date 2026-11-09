import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BatteryCharging, Droplets, Feather, Cpu, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const SPECS = [
  {
    title: 'Aerospace-Grade Titanium Shell',
    desc: 'Forged from ultra-pure Grade 5 titanium alloy with physical vapor deposition (PVD) coating for extreme scratch and drop resistance.',
    icon: Shield,
  },
  {
    title: 'Hypoallergenic Inner Molding',
    desc: 'Medical-grade, biocompatible inner resin with seamless curvature. Never irritates skin even through intensive perspiration or continuous wear.',
    icon: Sparkles,
  },
  {
    title: 'Up to 7-Day Battery Endurance',
    desc: 'High-density micro lithium-polymer cell ensures a full week of continuous biosensing. Magnetic dock delivers 80% charge in just 20 minutes.',
    icon: BatteryCharging,
  },
  {
    title: '5ATM / 50m Water Resistance',
    desc: 'Hermetically sealed stone-free unibody design. Fully rated for deep swimming, open water sports, hot showers, and saunas.',
    icon: Droplets,
  },
  {
    title: 'Featherlight 4–6 Grams',
    desc: 'Engineered to be virtually undetectable on your finger. Weighs significantly less than a standard wedding band.',
    icon: Feather,
  },
  {
    title: 'Ultra-Low Power Microcontroller',
    desc: 'Custom ARM Cortex dual-core BLE processor processes neural biometric baselines directly on-device with zero radio latency.',
    icon: Cpu,
  },
];

export default function HardwareSpecsSection() {
  return (
    <section id="ring" className="relative overflow-hidden bg-white py-24 md:py-36 border-t border-border">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="eyebrow text-primary">Mastery of Materials</span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-ink">
            Form that disappears into life.
          </h2>
          <p className="mt-4 text-base font-light text-ink-soft leading-relaxed">
            No screens, no notifications, no buzzing. Just pure titanium architecture holding cutting-edge photoplethysmographic sensors against your capillary flow.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SPECS.map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-7 rounded-3xl bg-canvas border border-border/70 hover:border-border hover:shadow-card transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-border/80 flex items-center justify-center mb-5 text-primary shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-ink mb-2">
                  {spec.title}
                </h3>
                <p className="text-sm font-light text-ink-soft leading-relaxed">
                  {spec.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link to="/ring" className="btn-secondary py-3 px-8 text-sm font-medium">
            View Full Technical Specifications & Diagrams →
          </Link>
        </div>
      </div>
    </section>
  );
}

