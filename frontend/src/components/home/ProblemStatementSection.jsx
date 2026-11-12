import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ProblemStatementSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Subtle ambient particle/flow dots
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.2 + 0.05,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(24, 120, 224, ${p.alpha})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16 md:py-24">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
      <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
        <div className="space-y-4 md:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <p className="relative text-3xl md:text-5xl font-extralight leading-tight text-ink">
              You feel tired.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <p className="relative text-3xl md:text-5xl font-extralight leading-tight text-ink-muted">
              You don't know why.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <p className="relative text-3xl md:text-5xl font-extralight leading-tight text-ink">
              You're working hard.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <p className="relative text-3xl md:text-5xl font-extralight leading-tight text-ink-muted">
              You're not recovering.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 800 80"
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] max-w-none h-20 opacity-70"
              preserveAspectRatio="none"
            >
              <path
                d="M0,40 L220,40 L250,20 L275,60 L300,10 L325,70 L350,40 L470,40 L500,25 L520,55 L540,40 L800,40"
                stroke="#1878E0"
                strokeWidth="1.5"
                fill="none"
                style={{ filter: 'drop-shadow(rgb(24, 120, 224) 0px 0px 6px)' }}
              />
            </svg>
            <p className="relative text-3xl md:text-5xl font-extralight leading-tight text-ink">
              You're stressed.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative"
          >
            <p className="relative text-3xl md:text-5xl font-extralight leading-tight text-ink-muted">
              You can't see what it's doing.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 md:mt-16 space-y-2 text-ink-muted text-sm md:text-base font-light"
        >
          <p>Your annual physical is once a year.</p>
          <p>Your doctor has 10 minutes.</p>
          <p>Nobody is watching.</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 text-4xl md:text-6xl font-extralight"
          style={{
            color: 'rgb(24, 120, 224)',
            textShadow: 'rgba(24, 120, 224, 0.533) 0px 0px 40px',
          }}
        >
          Until now.
        </motion.p>
      </div>
    </section>
  );
}
