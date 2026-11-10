import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Moon, Activity, Zap, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

const ARTICLES = [
  {
    title: 'Sleep Tracking Ring: How It Works & What to Look For',
    path: '/smart-ring-guide/sleep-tracking-ring',
    category: 'Sleep Architecture',
    desc: 'Why finger-based sensors yield superior nocturnal sleep stage fidelity compared to wristbands, and how nocturnal HRV dips reveal recovery depth.',
    icon: Moon,
    readTime: '6 min read',
  },
  {
    title: 'Recovery Ring: HRV, Readiness & Training Load Explained',
    path: '/smart-ring-guide/recovery-ring',
    category: 'Autonomic Science',
    desc: 'How autonomic balance between sympathetic and parasympathetic branches determines your readiness score, and how to avoid overtraining.',
    icon: Activity,
    readTime: '7 min read',
  },
  {
    title: 'Stress Tracking Ring: How HRV Reveals Daytime Balance',
    path: '/smart-ring-guide/stress-tracking-ring',
    category: 'Daytime Vitality',
    desc: 'Continuous pulse-wave analysis identifies invisible stress spikes in real-time, providing targeted breathwork cues before fatigue settles in.',
    icon: Zap,
    readTime: '5 min read',
  },
];

export default function SmartRingGuidePage() {
  useEffect(() => {
    document.title = 'The Complete Smart Ring Guide | JCRingforlife Science';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <nav className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink font-medium">Smart Ring Guide</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="eyebrow text-primary">Biometric Education</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-ink mt-1 tracking-tight">
            The Ultimate Smart Ring Guide
          </h1>
          <p className="mt-4 text-base font-light text-ink-soft leading-relaxed">
            Everything you need to know about biosensing on the finger, arterial signal strength, optical PPG physics, and why screenless rings represent the future of human longevity.
          </p>
        </div>

        {/* Featured Editorial Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {ARTICLES.map((article, idx) => {
            const Icon = article.icon;
            return (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-8 rounded-3xl bg-white border border-border shadow-card flex flex-col justify-between hover:border-primary/50 transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-canvas border border-border flex items-center justify-center text-primary mb-6 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-ink-muted mb-2">
                    <span className="font-semibold text-primary uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className="text-xl font-light text-ink leading-snug mb-3">
                    {article.title}
                  </h2>
                  <p className="text-xs md:text-sm font-light text-ink-soft leading-relaxed">
                    {article.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-border/60">
                  <Link
                    to={article.path}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Comparison Callout: Ring vs Watch */}
        <div className="rounded-3xl bg-white border border-border p-8 md:p-12 shadow-sm">
          <h2 className="text-2xl font-light text-ink mb-3">
            Why Finger Biosensing Beats Wrist Devices
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-xs md:text-sm font-light text-ink-soft leading-relaxed">
            <p>
              Smartwatches suffer from skin-pigment scattering, loose wrist contact during sleep, and bulky screens that disrupt circadian melatonin production with blue light notifications. Because the wrist has dense tendons and muscles, PPG sensors must shine through thick tissue.
            </p>
            <p>
              By contrast, the finger has dual palmar digital arteries running right along the surface. An inner ring mold provides direct, motion-isolated optical coupling, resulting in <strong>clinical-grade signal-to-noise ratios</strong> while weighing less than 5 grams.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

