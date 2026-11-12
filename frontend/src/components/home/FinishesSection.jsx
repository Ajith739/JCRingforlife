import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const IN_LIFE_ITEMS = [
  {
    video: '/assets/video-life-move-black.mp4',
    title: 'Move',
    finish: 'Midnight',
    label: 'Midnight, person wearing the JCRingforlife ring',
  },
  {
    video: '/assets/video-life-rest-silver.mp4',
    title: 'Rest',
    finish: 'Silver',
    label: 'Silver, person wearing the JCRingforlife ring',
  },
  {
    video: '/assets/video-life-morning-rose.mp4',
    title: 'Morning',
    finish: 'Rose Gold',
    label: 'Rose Gold, person wearing the JCRingforlife ring',
  },
];

function VideoCard({ item, idx }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    // Attempt playback immediately
    video.play().catch(() => {});

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0, rootMargin: '200px 0px' }
    );

    observer.observe(video);

    const handleUserInteraction = () => {
      if (video && video.paused) {
        video.play().catch(() => {});
      }
    };
    window.addEventListener('scroll', handleUserInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { once: true, passive: true });
    window.addEventListener('click', handleUserInteraction, { once: true, passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: idx * 0.15 }}
      className="group relative overflow-hidden rounded-[28px]"
    >
      <video
        ref={videoRef}
        src={item.video}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={(e) => {
          e.currentTarget.muted = true;
          e.currentTarget.play().catch(() => {});
        }}
        aria-label={item.label}
        className="w-full h-[240px] md:h-[320px] object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
        style={{ filter: 'contrast(1.03) saturate(0.95)' }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(rgba(10, 22, 40, 0) 50%, rgba(10, 22, 40, 0.55) 100%)',
        }}
      />
      <figcaption className="absolute bottom-5 left-5 right-5 flex items-baseline justify-between">
        <span className="text-white text-lg font-light tracking-wide">{item.title}</span>
        <span className="text-white/75 text-xs tracking-[0.2em] uppercase">
          {item.finish}
        </span>
      </figcaption>
    </motion.figure>
  );
}

export default function FinishesSection() {
  return (
    <section id="in-life" className="relative overflow-hidden bg-canvas py-14 sm:py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src="/assets/nature-restful-night-BUfEgpbZ.jpg"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
          style={{ objectPosition: 'center 45%', opacity: 0.16, filter: 'saturate(0.85)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.8) 40%, rgba(255, 255, 255, 0.94) 100%)',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-xs md:text-sm tracking-[0.35em] text-ink-muted uppercase">In life</p>
          <h2 className="mt-4 text-4xl md:text-6xl font-extralight text-ink leading-[1.05]">
            Worn, not watched.
          </h2>
          <p className="mt-4 md:mt-5 text-ink-soft text-base md:text-lg font-light">
            From the first run to the last hour of sleep, JCRingforlife simply stays with you.
          </p>
        </motion.div>

        <div className="mt-9 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {IN_LIFE_ITEMS.map((item, idx) => (
            <VideoCard key={item.title} item={item} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
