import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Shield } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const choice = localStorage.getItem('jcring_cookie_choice') || localStorage.getItem('aion_cookie_choice');
      if (!choice) {
        const timer = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // fallback
    }
  }, []);

  const handleChoice = (type) => {
    try {
      localStorage.setItem(
        'jcring_cookie_choice',
        JSON.stringify({ choice: type, timestamp: new Date().toISOString() })
      );
    } catch (e) {}
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 lg:max-w-xl lg:left-6 z-50"
          role="dialog"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-desc"
        >
          <div className="relative bg-white/95 backdrop-blur-md border border-border rounded-2xl shadow-soft p-5 md:p-6">
            <button
              onClick={() => handleChoice('essential')}
              aria-label="Close cookie banner"
              className="absolute top-3 right-3 text-ink-muted hover:text-ink transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 id="cookie-title" className="text-base font-medium text-ink mb-1.5">
                  We value your privacy
                </h3>
                <p id="cookie-desc" className="text-xs md:text-sm text-ink-soft leading-relaxed mb-4">
                  JCRingforlife uses essential cookies for site functionality and privacy-preserving metrics. We never sell your personal or biometric data. Learn more in our{' '}
                  <Link to="/cookie-policy" className="text-primary hover:underline font-medium">
                    Cookie Policy
                  </Link>
                  .
                </p>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={() => handleChoice('accepted')}
                    className="btn-brand py-2 px-5 text-xs font-semibold"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={() => handleChoice('essential')}
                    className="btn-secondary py-2 px-5 text-xs font-medium"
                  >
                    Essential Only
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

