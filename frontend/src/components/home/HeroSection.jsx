import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HERO_METRICS = [
  { label: 'HR', value: '62 bpm' },
  { label: 'HRV', value: '74 ms' },
  { label: 'SpO₂', value: '98%' },
  { label: 'Temp', value: '36.7°' },
  { label: 'Sleep', value: '87' },
];

const FINISH_LINKS = [
  { name: 'Midnight', img: '/assets/ring-finish-midnight-DK6ZPSTf.png', alt: 'JCRingforlife ring, Midnight finish' },
  { name: 'Silver', img: '/assets/ring-finish-silver-Xrc8Y54a.png', alt: 'JCRingforlife ring, Silver finish' },
  { name: 'Rose Gold', img: '/assets/ring-finish-rose-DTpoQDow.png', alt: 'JCRingforlife ring, Rose Gold finish' },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-canvas">
      {/* Radial Gradient Backgrounds */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 45% at 50% 0%, rgba(24, 120, 224, 0.1) 0%, transparent 60%), radial-gradient(55% 40% at 12% 78%, rgba(0, 169, 224, 0.07) 0%, transparent 60%)',
        }}
      />
      {/* Grid Pattern Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(10, 22, 40, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(10, 22, 40, 0.08) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(black 30%, transparent 75%)',
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        {/* Brand Reveal Logo */}
        <div className="mb-6 flex flex-col items-center md:mb-8">
          <div className="flex items-baseline text-4xl tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-7xl select-none">
            <span className="font-extrabold text-ink">JC</span>
            <span
              className="font-bold bg-clip-text text-transparent px-[0.03em]"
              style={{
                backgroundImage: 'linear-gradient(135deg, #00A9E0 0%, #1878E0 55%, #6D28D9 100%)',
                filter: 'drop-shadow(0 0 24px rgba(24, 120, 224, 0.35))',
              }}
            >
              Ring
            </span>
            <span className="font-light text-ink">forlife</span>
          </div>
          <span className="mt-3 text-[10px] uppercase tracking-[0.42em] text-ink-muted sm:text-xs">
            Vital · Life · Force
          </span>
        </div>

        {/* Headings */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extralight leading-[1.06] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-ink">Your body has been talking.</span>
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(120deg, rgb(24, 120, 224), rgb(109, 40, 217))',
              }}
            >
              You just couldn't hear it.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base font-light text-ink-soft md:text-xl">
            A titanium smart ring that turns sleep, recovery and stress into one clear answer each morning.
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-7 flex flex-col items-center">
          <Link
            to="/preorder"
            className="group relative inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-medium text-white transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              background: 'linear-gradient(120deg, rgb(24, 120, 224), rgb(109, 40, 217))',
              boxShadow: 'rgba(24, 120, 224, 0.4) 0px 14px 40px -10px',
            }}
          >
            Pre-order Now
          </Link>
          <p className="mt-3 text-xs text-ink-muted md:text-sm">
            Free JCRingforlife app included · No subscription required
          </p>
        </div>

        {/* Hero Image Concept Studio with Floating Notification and Telemetry */}
        <div className="relative mt-8 w-full md:mt-12">
          <div className="relative overflow-hidden rounded-[28px]">
            <img
              src="/assets/hero-concept-studio-v3-uDobkO1M.jpg"
              width="1920"
              height="1080"
              alt="Hand wearing the JCRingforlife smart ring, engraved and sensors glowing, in a luxury studio setting"
              className="h-[240px] w-full object-cover sm:h-[340px] md:h-[420px] lg:h-[480px]"
              style={{
                objectPosition: '50% 42%',
                filter: 'contrast(1.04) saturate(1.03)',
                maskImage: 'radial-gradient(82% 84%, rgb(0, 0, 0) 46%, rgba(0, 0, 0, 0.55) 74%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(82% 84%, rgb(0, 0, 0) 46%, rgba(0, 0, 0, 0.55) 74%, transparent 100%)',
              }}
            />
            {/* Edge fades */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, hsl(var(--canvas)) 0%, transparent 16%, transparent 72%, rgba(10,22,40,0.42) 100%),
                  linear-gradient(to right, hsl(var(--canvas)) 0%, transparent 10%, transparent 90%, hsl(var(--canvas)) 100%)`,
              }}
            />

            {/* Top Notification Pill */}
            <div className="pointer-events-none absolute left-1/2 top-4 z-10 -translate-x-1/2 sm:top-6">
              <div className="rounded-full border border-white/10 bg-black/30 px-3 py-1 backdrop-blur-sm sm:px-4 sm:py-1.5">
                <p className="whitespace-nowrap text-[10px] sm:text-xs" style={{ color: 'rgba(255, 255, 255, 0.82)' }}>
                  Recovery is trending up, so your body is ready for more today.
                </p>
              </div>
            </div>

            {/* Bottom Metrics Row */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 pb-4 sm:gap-x-8 md:pb-6">
              {HERO_METRICS.map((m, idx) => (
                <span key={idx} className="flex items-baseline gap-1.5 text-[11px] tracking-wide sm:text-sm">
                  <span style={{ color: 'rgba(255, 255, 255, 0.72)' }}>{m.label}</span>
                  <span style={{ color: 'rgb(255, 255, 255)', fontVariantNumeric: 'tabular-nums' }}>{m.value}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Finish Links */}
        <div className="mt-8 flex items-center justify-center gap-8 sm:gap-12">
          {FINISH_LINKS.map((f, idx) => (
            <a key={idx} href="#ring" className="group flex flex-col items-center">
              <img
                src={f.img}
                alt={f.alt}
                loading="lazy"
                className="h-14 w-14 object-contain transition-transform duration-500 group-hover:scale-110 sm:h-16 sm:w-16"
              />
              <span className="mt-2 text-[10px] uppercase tracking-[0.24em] text-ink-muted">
                {f.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
