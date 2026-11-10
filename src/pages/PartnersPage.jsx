import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Handshake,
  Users,
  Building2,
  Sparkles,
  QrCode,
  ArrowRight,
  Check,
  Loader2,
} from 'lucide-react';

const RING_SIZES = [6, 7, 8, 9, 10, 11, 12, 13];

export default function PartnersPage() {
  const [view, setView] = useState('landing'); // 'landing' | 'bulk'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquiryNumber, setInquiryNumber] = useState(null);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    business_name: '',
    contact_person: '',
    email: '',
    phone: '',
    estimated_quantity: 10,
    size_breakdown: {
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0,
    },
    notes: '',
  });

  useEffect(() => {
    document.title = 'JCRingforlife Partner Program - Wellness & Lifestyle Partners';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, inquiryNumber]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSizeChange = (size, val) => {
    const num = Math.max(0, parseInt(val || '0', 10));
    setForm((prev) => ({
      ...prev,
      size_breakdown: {
        ...prev.size_breakdown,
        [size]: num,
      },
    }));
  };

  const isValid =
    form.business_name.trim().length > 0 &&
    form.contact_person.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.phone.trim().length > 0 &&
    form.estimated_quantity >= 1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate submission or call API
      await new Promise((resolve) => setTimeout(resolve, 800));
      const generatedNumber = `JCRING-PARTNER-${Math.floor(100000 + Math.random() * 900000)}`;
      setInquiryNumber(generatedNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <main className="pt-32 pb-32">
        <div className="mx-auto max-w-[1200px] px-6">
          {inquiryNumber ? (
            /* Success View */
            <div className="max-w-2xl mx-auto text-center">
              <div
                className="w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center shadow-lg text-white"
                style={{
                  background: 'linear-gradient(135deg, rgb(0, 169, 224), rgb(24, 120, 224), rgb(109, 40, 217))',
                }}
              >
                <Check className="w-10 h-10" />
              </div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4 text-ink">
                Thank you.
              </h1>
              <p className="text-[16px] text-ink-muted mb-8 max-w-lg mx-auto">
                We've received your bulk inquiry. Our partnerships team will contact you regarding pricing and delivery.
              </p>
              <div className="inline-block rounded-3xl border border-border bg-white px-8 py-6 mb-10 shadow-sm">
                <div className="text-[11px] uppercase tracking-[3px] text-primary mb-2 font-semibold">
                  Inquiry Number
                </div>
                <div className="text-2xl font-medium tracking-[2px] text-ink">
                  {inquiryNumber}
                </div>
              </div>
              <div>
                <Link
                  to="/"
                  className="rounded-full border border-border px-8 py-3 text-[14px] font-medium hover:border-primary transition-colors text-ink inline-block"
                >
                  Back to home
                </Link>
              </div>
            </div>
          ) : view === 'bulk' ? (
            /* Bulk Organization View */
            <div className="max-w-3xl mx-auto">
              <button
                type="button"
                onClick={() => setView('landing')}
                className="text-[13px] text-ink-muted hover:text-ink mb-6 transition-colors"
              >
                ← Back
              </button>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 mb-6 shadow-sm">
                  <Building2 className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[11px] font-semibold uppercase tracking-[3px] text-ink-muted">
                    Bulk Reservation
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4 text-ink">
                  For wellness centers, studios{' '}
                  <span
                    style={{
                      backgroundImage: 'linear-gradient(135deg, rgb(0, 169, 224), rgb(24, 120, 224), rgb(109, 40, 217))',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    & businesses
                  </span>
                  .
                </h1>
                <p className="text-[15px] text-ink-muted max-w-xl mx-auto">
                  Tell us about your organization. We'll contact you regarding pricing and delivery, no payment today.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6 rounded-3xl border border-border bg-white p-6 md:p-10 shadow-sm"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-[13px] text-ink-soft">Business / Organization name</span>
                    <input
                      type="text"
                      required
                      maxLength={200}
                      value={form.business_name}
                      onChange={(e) => handleChange('business_name', e.target.value)}
                      className="mt-1.5 w-full h-12 rounded-xl border border-border bg-white px-4 text-[15px] text-ink focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[13px] text-ink-soft">Contact person</span>
                    <input
                      type="text"
                      required
                      maxLength={200}
                      value={form.contact_person}
                      onChange={(e) => handleChange('contact_person', e.target.value)}
                      className="mt-1.5 w-full h-12 rounded-xl border border-border bg-white px-4 text-[15px] text-ink focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[13px] text-ink-soft">Business email</span>
                    <input
                      type="email"
                      required
                      maxLength={200}
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="mt-1.5 w-full h-12 rounded-xl border border-border bg-white px-4 text-[15px] text-ink focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[13px] text-ink-soft">Phone</span>
                    <input
                      type="tel"
                      required
                      maxLength={200}
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="mt-1.5 w-full h-12 rounded-xl border border-border bg-white px-4 text-[15px] text-ink focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                    />
                  </label>
                </div>

                <div>
                  <label className="text-[13px] text-ink-soft">Estimated total quantity</label>
                  <input
                    type="number"
                    min={1}
                    max={100000}
                    value={form.estimated_quantity}
                    onChange={(e) =>
                      handleChange('estimated_quantity', Math.max(1, parseInt(e.target.value || '0', 10)))
                    }
                    className="mt-1.5 w-full h-12 rounded-xl border border-border bg-white px-4 text-[15px] text-ink focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-[13px] text-ink-soft">Quantity by ring size (optional)</label>
                  <div className="mt-2 grid grid-cols-4 md:grid-cols-8 gap-2">
                    {RING_SIZES.map((size) => (
                      <div key={size} className="rounded-lg border border-border bg-canvas-alt p-2 text-center">
                        <div className="text-[11px] text-ink-muted mb-1">Size {size}</div>
                        <input
                          type="number"
                          min={0}
                          value={form.size_breakdown[size]}
                          onChange={(e) => handleSizeChange(size, e.target.value)}
                          className="w-full h-9 rounded bg-white border border-border text-center text-[13px] text-ink focus:border-primary focus:outline-none transition-all"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[13px] text-ink-soft">Notes (optional)</label>
                  <textarea
                    rows={3}
                    maxLength={2000}
                    value={form.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-[15px] text-ink focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-500/30 bg-red-50 px-4 py-3 text-[13px] text-red-600">
                    {error}
                  </div>
                )}

                <p className="text-[12px] text-ink-muted">We'll contact you regarding pricing and delivery.</p>

                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="w-full h-14 rounded-full font-semibold text-white text-[15px] transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, rgb(0, 169, 224), rgb(24, 120, 224), rgb(109, 40, 217))',
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    'Submit bulk inquiry →'
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Landing View */
            <>
              {/* Header */}
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 mb-6 shadow-sm">
                  <Handshake className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[11px] font-semibold uppercase tracking-[3px] text-ink-muted">
                    JCRingforlife Partner Program
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 text-ink">
                  Bring JCRingforlife to{' '}
                  <span
                    style={{
                      backgroundImage: 'linear-gradient(135deg, rgb(0, 169, 224), rgb(24, 120, 224), rgb(109, 40, 217))',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    your community
                  </span>
                  .
                </h1>
                <p className="text-[17px] text-ink-soft max-w-2xl mx-auto leading-relaxed">
                  Wellness centers, studios, gyms, employers and businesses can invite their customers to reserve the JCRingforlife Ring, no inventory, no upfront cost.
                </p>
              </div>

              {/* 2 Audience Choice Cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-20">
                {/* Individual Card */}
                <Link
                  to="/preorder"
                  className="group rounded-3xl border border-border bg-white p-8 md:p-10 shadow-sm hover:border-primary/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <Users className="w-8 h-8 text-primary mb-6" />
                    <div className="text-[11px] uppercase tracking-[3px] text-primary mb-3 font-semibold">
                      Individual
                    </div>
                    <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-3 text-ink">
                      I'm reserving for myself
                    </h2>
                    <p className="text-[14px] text-ink-muted leading-relaxed mb-6">
                      Reserve your Founder Edition JCRingforlife Ring. No payment today.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-[14px] font-medium text-primary group-hover:gap-3 transition-all">
                    Pre-order your ring <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>

                {/* Organization Card */}
                <button
                  type="button"
                  onClick={() => setView('bulk')}
                  className="text-left group relative overflow-hidden rounded-3xl border border-primary/20 bg-white p-8 md:p-10 shadow-sm hover:border-primary/40 transition-all flex flex-col justify-between"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110 pointer-events-none" />
                  <div>
                    <Building2 className="w-8 h-8 text-primary mb-6" />
                    <div className="text-[11px] uppercase tracking-[3px] text-primary mb-3 font-semibold">
                      Business / Wellness Partner
                    </div>
                    <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-3 text-ink">
                      We're reserving for our organization
                    </h2>
                    <p className="text-[14px] text-ink-muted leading-relaxed mb-6">
                      Bulk reservations for wellness centers, studios, and enterprises. We'll contact you regarding pricing and delivery.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-[14px] font-medium text-primary group-hover:gap-3 transition-all">
                    Request bulk reservation <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </div>

              {/* How The Partner Program Works (3 steps) */}
              <div className="mb-20">
                <div className="text-center mb-12">
                  <div className="text-[11px] uppercase tracking-[3px] text-primary mb-3 font-semibold">
                    How the partner program works
                  </div>
                  <h2 className="text-3xl md:text-5xl font-light tracking-tight text-ink">
                    A dedicated referral link for every partner.
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Step 1 */}
                  <div className="rounded-3xl border border-border bg-white p-8 shadow-sm">
                    <Sparkles className="w-6 h-6 text-primary mb-4" />
                    <h3 className="text-[18px] font-medium mb-2 text-ink">Become a partner</h3>
                    <p className="text-[14px] text-ink-muted leading-relaxed">
                      We create your dedicated partner code, referral link and QR code.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="rounded-3xl border border-border bg-white p-8 shadow-sm">
                    <QrCode className="w-6 h-6 text-primary mb-4" />
                    <h3 className="text-[18px] font-medium mb-2 text-ink">Share with your community</h3>
                    <p className="text-[14px] text-ink-muted leading-relaxed">
                      Invite your customers via your unique link, every reservation is attributed to you automatically.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="rounded-3xl border border-border bg-white p-8 shadow-sm">
                    <Handshake className="w-6 h-6 text-primary mb-4" />
                    <h3 className="text-[18px] font-medium mb-2 text-ink">We handle the rest</h3>
                    <p className="text-[14px] text-ink-muted leading-relaxed">
                      JCRingforlife takes care of confirmations, fulfillment and customer communication end-to-end.
                    </p>
                  </div>
                </div>
              </div>

              {/* Final Partner CTA Box */}
              <div className="rounded-3xl border border-border bg-white p-10 md:p-16 text-center shadow-sm">
                <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4 text-ink">
                  Interested in becoming a JCRingforlife Partner?
                </h2>
                <p className="text-[15px] text-ink-muted mb-8 max-w-xl mx-auto">
                  Reach out to our partnerships team. We'll set up your dedicated partner page and referral link.
                </p>
                <a
                  href="mailto:contact@jcringforlife.com"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold text-white hover:brightness-110 transition-all shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, rgb(0, 169, 224), rgb(24, 120, 224), rgb(109, 40, 217))',
                  }}
                >
                  Contact partnerships →
                </a>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
