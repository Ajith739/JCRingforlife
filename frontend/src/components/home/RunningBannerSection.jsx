import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function RunningBannerSection() {
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
    <section className="relative overflow-hidden bg-canvas py-14 sm:py-16 md:py-24">
      {/* Background Nature Image */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src="/assets/nature-forest-trail-o8cpuo5D.jpg"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
          style={{ objectPosition: 'center 30%', opacity: 0.12, filter: 'saturate(0.85)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.8) 40%, rgba(255, 255, 255, 0.94) 100%)',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Runner Video Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto relative w-full max-w-5xl overflow-hidden rounded-[28px]"
        >
          <video
            ref={videoRef}
            src="/assets/video-run-trail.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onCanPlay={(e) => {
              e.currentTarget.muted = true;
              e.currentTarget.play().catch(() => {});
            }}
            aria-label="Person running on a mountain trail wearing the JCRingforlife Ring"
            className="h-[34vh] md:h-[48vh] w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                linear-gradient(to bottom, hsl(var(--canvas)) 0%, transparent 18%, transparent 82%, hsl(var(--canvas)) 100%),
                linear-gradient(to right, hsl(var(--canvas)) 0%, transparent 10%, transparent 90%, hsl(var(--canvas)) 100%)
              `,
            }}
          />
        </motion.div>

        {/* Heading and Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 md:mt-14"
        >
          <h2 className="text-4xl md:text-7xl font-extralight text-ink leading-[1.05]">
            Your body has answers.
          </h2>
          <p
            className="mt-4 text-2xl md:text-4xl font-extralight bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(120deg, rgb(24, 120, 224), rgb(109, 40, 217))',
            }}
          >
            JCRingforlife helps you hear them.
          </p>
        </motion.div>

        {/* Pre-order Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10"
        >
          <Link
            to="/preorder"
            className="relative inline-flex items-center justify-center rounded-full px-10 py-5 text-lg font-medium text-white transition-transform hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(120deg, rgb(24, 120, 224), rgb(109, 40, 217))',
              boxShadow: 'rgba(24, 120, 224, 0.333) 0px 20px 50px -15px',
            }}
          >
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 0 0px rgba(24, 120, 224, 0.4)',
                  '0 0 0 20px rgba(24, 120, 224, 0)',
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
            <span className="relative">Pre-order Now</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
