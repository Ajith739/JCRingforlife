import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, Building, HeartPulse, Check, Sparkles, Send } from 'lucide-react';

export default function PartnersPage() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    partnerType: 'clinic',
    volume: '25-100',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'aiOn Partner Program - Wellness & Lifestyle Partners';
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <nav className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink font-medium">Partners</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="eyebrow text-primary">Healthcare & Lifestyle Collaborations</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-ink mt-1 tracking-tight">
            The aiOn Partner Ecosystem
          </h1>
          <p className="mt-4 text-base font-light text-ink-soft leading-relaxed">
            Empower your patients, athletes, or team members with continuous physiological awareness. Partner with aiOn for bulk allocations and clinical data access.
          </p>
        </div>

        {/* 3 Partner Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="p-7 rounded-3xl bg-white border border-border shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-ink">Longevity & Wellness Clinics</h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              Integrate continuous nocturnal HRV and temperature baselines into your patient intake and longevity protocols.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white border border-border shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-ink">Corporate Performance</h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              Equip leadership and remote teams with autonomic recovery tracking to counter burnout and sustain peak cognitive stamina.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white border border-border shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-ink">Coaches & Sports Academies</h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              Quantify training load and overtraining risk without invasive wrist devices that impair athletic grip.
            </p>
          </div>
        </div>

        {/* Partner Application Form */}
        <div className="rounded-3xl bg-white border border-border p-8 md:p-12 shadow-card max-w-3xl mx-auto">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="text-2xl font-light text-ink">Partner Request Received</h3>
              <p className="text-sm text-ink-soft max-w-md mx-auto leading-relaxed">
                Thank you for your interest in the aiOn Partner Program. A member of our enterprise partnerships team will respond to {formData.email} within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <span className="eyebrow text-primary">Inquiry Form</span>
                <h2 className="text-2xl font-light text-ink mt-1">
                  Apply for Partner Allocation
                </h2>
                <p className="text-xs text-ink-soft mt-1">
                  Founder tier pricing available for batch orders of 10+ rings.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Dr. Jordan Hayes"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Organization / Clinic *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Integrative Vitality Labs"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Work Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="jordan@vitalitylabs.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Estimated Ring Volume
                  </label>
                  <select
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="10-25">10 – 25 units</option>
                    <option value="25-100">25 – 100 units</option>
                    <option value="100-500">100 – 500 units</option>
                    <option value="500+">500+ units (Enterprise)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Collaboration Scope & Goals
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your patient population, wellness program, or integration timeline..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-brand py-3.5 text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Submit Partner Application</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

