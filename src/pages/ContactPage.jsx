import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Send, Check } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = 'Contact aiOn Health Science';
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <nav className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink font-medium">Contact</span>
        </nav>

        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="eyebrow text-primary">Get in Touch</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-ink mt-1 tracking-tight">
            Contact aiOn
          </h1>
          <p className="mt-3 text-base font-light text-ink-soft leading-relaxed">
            Have questions about pre-orders, sizing, clinical validation, or partnerships? We’re here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl border border-border p-8 md:p-10 shadow-card">
            {sent ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-light text-ink">Message Sent</h3>
                <p className="text-sm text-ink-soft leading-relaxed max-w-sm mx-auto">
                  Thank you for reaching out, {formData.name}. Our customer experience team will reply to {formData.email} shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
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
                      placeholder="Alex Mercer"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Question about sizing kit or pre-order"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can our team help you today?"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-brand py-3.5 text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <div className="p-7 rounded-3xl bg-white border border-border space-y-4">
              <h3 className="text-lg font-semibold text-ink">
                Direct Channels
              </h3>
              <div className="space-y-3 text-xs md:text-sm text-ink-soft">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-ink block">Customer Support</span>
                    <a href="mailto:contact@aionrings.com" className="text-primary hover:underline">
                      contact@aionrings.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-ink block">Press & Partnerships</span>
                    <a href="mailto:press@aionrings.com" className="text-primary hover:underline">
                      press@aionrings.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-border space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div className="text-xs md:text-sm text-ink-soft space-y-1">
                  <span className="font-semibold text-ink block">Corporate Entity</span>
                  <p>aiOn Health Science LLC</p>
                  <p>A Mazo Solutions Inc company</p>
                  <p className="text-xs text-ink-muted">Delaware / California, USA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

