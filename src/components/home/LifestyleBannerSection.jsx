import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LifestyleBannerSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    // Attempt immediate playback
    video.play().catch(() => {});

    // Resume/pause based on visibility with comfortable margins
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

    // Fallback: try play on first user interaction if browser blocked initial autoplay
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
    <section
      className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden"
      style={{ height: '46vh', minHeight: '340px', maxHeight: '620px' }}
    >
      <video
        ref={videoRef}
        src="/assets/video-life-early.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/assets/poster-life-early-CwSaqYEV.jpg"
        aria-label="Person wearing the JCRingforlife ring during a calm morning wellness routine"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: 'contrast(1.03) saturate(0.96)' }}
        onCanPlay={(e) => {
          e.currentTarget.muted = true;
          e.currentTarget.play().catch(() => {});
        }}
      >
        <source src="/assets/video-life-early.mp4" type="video/mp4" />
      </video>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, hsl(var(--canvas)) 0%, rgba(246,248,252,0) 18%, rgba(246,248,252,0) 72%, hsl(var(--canvas)) 100%)',
        }}
      />
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl"
        >
          <p className="text-[11px] uppercase tracking-[0.38em] text-ink-muted">A ring for real life</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-extralight text-ink leading-[1.1]">
            From morning light<br />to evening wind-down.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
