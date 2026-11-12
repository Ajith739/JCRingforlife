import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy - JCRingforlife Health Science';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <nav className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink font-medium">Privacy Policy</span>
        </nav>

        <div className="bg-white rounded-3xl border border-border p-8 md:p-14 shadow-card space-y-8 text-sm md:text-base font-light text-ink-soft leading-relaxed">
          <div>
            <span className="eyebrow text-primary">Data Protection</span>
            <h1 className="text-3xl sm:text-4xl font-light text-ink mt-1 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-ink-muted mt-2">
              Effective Date: November 2026 · JCRingforlife LLC
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 text-xs md:text-sm text-ink-soft flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <strong className="text-ink font-semibold">Our Unconditional Promise:</strong> We never sell, monetize, broker, or rent your biometric signals, sleep data, or heart metrics to health insurance companies, data brokers, or third-party advertisers.
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-ink">1. Information We Collect</h2>
            <p>
              When you use the JCRingforlife smart wellness ring and mobile application, we process:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm">
              <li><strong>Account Identifiers:</strong> Name, email address, password hash, and shipping destination for your sizing kit and ring.</li>
              <li><strong>Physiological Telemetry:</strong> Beat-to-beat photoplethysmography (PPG), resting heart rate, heart rate variability (HRV), peripheral capillary oxygen saturation (SpO₂), micro-thermistor skin temperature deviations, and 3D accelerometer motion vectors.</li>
              <li><strong>Self-Reported Insights:</strong> Sleep quality perceptions, menstrual cycle logs, or custom notes entered within the JCRingforlife app.</li>
            </ul>
          </section>

          <section className="space-y-3 pt-6 border-t border-border">
            <h2 className="text-xl font-medium text-ink">2. How Biometric Data is Processed</h2>
            <p>
              Biometric telemetry is ingested strictly to calculate your personalized daily <strong>Vitality Score</strong> and tailor your morning quest. Baseline modeling occurs on your device and inside dedicated, isolated encrypted database partitions.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-border">
            <h2 className="text-xl font-medium text-ink">3. Data Encryption Standards</h2>
            <p>
              All biometric transmission between the ring and your smartphone utilizes <strong>Bluetooth Low Energy (BLE) AES-128 encryption</strong>. In transit to our sync servers, data is protected by TLS 1.3, and all stationary health logs are encrypted using AES-256.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-border">
            <h2 className="text-xl font-medium text-ink">4. Your GDPR & CCPA Rights</h2>
            <p>
              Regardless of your geographic jurisdiction, you have the absolute right to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm">
              <li>Export a machine-readable archive of all raw physiological records (JSON / CSV).</li>
              <li>Request immediate, permanent erasure of your account and all associated cloud biometric history via our <Link to="/delete-account" className="text-primary hover:underline font-medium">Account Erasure Portal</Link>.</li>
              <li>Opt out of non-essential analytical cookies at any time.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

