import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  Check,
  Plus,
  Minus,
  Trash2,
  Upload,
  ChevronDown,
  Loader2,
} from 'lucide-react';
import SizingModal from '../components/common/SizingModal.jsx';

const FINISHES = [
  {
    id: 'midnight',
    name: 'Midnight Black',
    image: '/assets/ring-finish-midnight-DK6ZPSTf.png',
    swatch: 'linear-gradient(135deg, rgb(42, 47, 56), rgb(11, 15, 22))',
  },
  {
    id: 'silver',
    name: 'Titanium Silver',
    image: '/assets/ring-finish-silver-Xrc8Y54a.png',
    swatch: 'linear-gradient(135deg, rgb(237, 239, 242), rgb(154, 163, 173))',
  },
  {
    id: 'rose',
    name: 'Rose Gold',
    image: '/assets/ring-finish-rose-DTpoQDow.png',
    swatch: 'linear-gradient(135deg, rgb(243, 196, 174), rgb(201, 141, 110))',
  },
];

const RING_SIZES = [6, 7, 8, 9, 10, 11, 12, 13];

const COUNTRY_DIAL_CODES = [
  { iso: 'US', code: '1' },
  { iso: 'CA', code: '1' },
  { iso: 'GB', code: '44' },
  { iso: 'AU', code: '61' },
  { iso: 'DE', code: '49' },
  { iso: 'FR', code: '33' },
  { iso: 'JP', code: '81' },
  { iso: 'IN', code: '91' },
  { iso: 'IT', code: '39' },
  { iso: 'ES', code: '34' },
  { iso: 'NL', code: '31' },
  { iso: 'SE', code: '46' },
  { iso: 'CH', code: '41' },
  { iso: 'SG', code: '65' },
  { iso: 'AE', code: '971' },
  { iso: 'BR', code: '55' },
  { iso: 'MX', code: '52' },
  { iso: 'NZ', code: '64' },
  { iso: 'ZA', code: '27' },
];

const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'India',
  'Netherlands',
  'Sweden',
  'Switzerland',
  'Singapore',
  'United Arab Emirates',
  'Spain',
  'Italy',
  'Brazil',
  'Mexico',
  'New Zealand',
  'South Africa',
  'Ireland',
  'Norway',
  'Denmark',
  'Austria',
  'Belgium',
  'Finland',
];

export default function PreorderPage() {
  const [searchParams] = useSearchParams();
  const refParam = searchParams.get('ref') || '';
  const partnerParam = searchParams.get('partner') || '';

  const [partnerInfo, setPartnerInfo] = useState(
    partnerParam
      ? { code: partnerParam, name: partnerParam.charAt(0).toUpperCase() + partnerParam.slice(1) }
      : null
  );

  const [rings, setRings] = useState([
    {
      id: 'ring-1',
      ring_size: null,
      ring_color: 'midnight',
      quantity: 1,
    },
  ]);

  const [details, setDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_code: '1',
    phone_iso: 'US',
    phone: '',
    referral_source: refParam || (partnerInfo ? partnerInfo.name : ''),
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: 'United States',
  });

  const [previewFinishIdx, setPreviewFinishIdx] = useState(0);
  const [isSizingModalOpen, setIsSizingModalOpen] = useState(false);
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const reservationRequestId = useRef(crypto.randomUUID());
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState({});

  const countryDropdownRef = useRef(null);
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  useEffect(() => {
    document.title = 'Pre-Order JCRingforlife Ring - Founder Edition';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [submittedData]);

  // Click outside to close country dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target)) {
        setIsCountryOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalRingsCount = rings.reduce((acc, r) => acc + (r.quantity || 1), 0);

  const activePreviewFinish = FINISHES[previewFinishIdx] || FINISHES[0];

  const handleNextFinish = () => {
    setPreviewFinishIdx((prev) => (prev + 1) % FINISHES.length);
  };

  const handlePrevFinish = () => {
    setPreviewFinishIdx((prev) => (prev - 1 + FINISHES.length) % FINISHES.length);
  };

  const handleUpdateRing = (id, updates) => {
    setRings((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const updated = { ...r, ...updates };
          if (updates.ring_color) {
            const fIdx = FINISHES.findIndex((f) => f.id === updates.ring_color);
            if (fIdx !== -1) setPreviewFinishIdx(fIdx);
          }
          return updated;
        }
        return r;
      })
    );
  };

  const handleAddRing = () => {
    if (rings.length >= 10) return;
    setRings((prev) => [
      ...prev,
      {
        id: `ring-${Date.now()}`,
        ring_size: null,
        ring_color: activePreviewFinish.id,
        quantity: 1,
      },
    ]);
  };

  const handleRemoveRing = (id) => {
    if (rings.length <= 1) return;
    setRings((prev) => prev.filter((r) => r.id !== id));
  };

  const handleDetailChange = (field, val) => {
    setDetails((prev) => ({ ...prev, [field]: val }));
  };

  const markTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const errors = {};
  if (!details.first_name.trim()) errors.first_name = 'First name is required';
  if (!details.last_name.trim()) errors.last_name = 'Last name is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim())) errors.email = 'Enter a valid email address';
  if (details.phone.trim().length < 6) errors.phone = 'Enter a valid phone number';
  if (!details.referral_source.trim()) errors.referral_source = 'Required, enter "Self" if no referral';
  if (!details.address.trim()) errors.address = 'Address is required';
  if (!details.city.trim()) errors.city = 'City is required';
  if (!details.state.trim()) errors.state = 'State / region is required';
  if (!details.zip_code.trim()) errors.zip_code = 'ZIP / postal code is required';
  if (!details.country.trim()) errors.country = 'Country is required';
  if (rings.some((r) => !r.ring_size)) errors.ring_size = 'Please select a ring size for each ring';

  const isFormValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) {
      // Mark all fields touched to show validation errors
      const allTouched = { ring_size: true };
      Object.keys(details).forEach((k) => (allTouched[k] = true));
      setTouched(allTouched);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { isLocalDemo, localRequest } = await import('../../../backend/admin/src/services/localDemo.js');
      let reservation;
      if (isLocalDemo()) {
        reservation = await localRequest('/storefront/reservations', {
          method: 'POST', body: JSON.stringify({ requestId: reservationRequestId.current, details, rings }),
        });
      } else {
        const sessionResponse = await fetch('/api/auth/session', { credentials: 'same-origin' });
        if (!sessionResponse.ok) throw new Error('The reservation service is unavailable. Please try again.');
        const session = await sessionResponse.json();
        const response = await fetch('/api/storefront/reservations', {
          method: 'POST', credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': session.csrf },
          body: JSON.stringify({ requestId: reservationRequestId.current, details, rings }),
        });
        reservation = await response.json();
        if (!response.ok) throw new Error(reservation.error || 'Your reservation could not be saved. Please try again.');
      }
      setSubmittedData({
        reservationId: reservation.id,
        development: reservation.demo,
        name: details.first_name,
        partner: partnerInfo?.name || null,
        totalRings: totalRingsCount,
        rings: rings.map((r) => ({
          finish: FINISHES.find((f) => f.id === r.ring_color)?.name || 'Midnight Black',
          size: r.ring_size,
          quantity: r.quantity,
        })),
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reservation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCountries = useMemo(() => {
    const q = details.country.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter((c) => c.toLowerCase().includes(q));
  }, [details.country]);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <main className="pt-32 pb-32">
        <div className="mx-auto max-w-[1360px] px-6">
          {submittedData ? (
            /* Thank You Confirmation Screen */
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
                Thank you, {submittedData.name}.
              </h1>
              <p className="text-[16px] text-ink-soft mb-8 max-w-lg mx-auto">
                Your JCRingforlife Ring reservation has been saved. No payment has been collected.
                <span className="block mt-2 text-sm font-semibold">Reference: {submittedData.reservationId}</span>
                {submittedData.development && <span className="block mt-2 text-xs">Development reservation — saved to the isolated local workspace.</span>}
              </p>

              {submittedData.partner && (
                <div className="inline-block rounded-2xl border border-primary/20 bg-primary/[0.06] px-6 py-4 mb-8">
                  <div className="text-[11px] uppercase tracking-[3px] text-primary mb-1 font-semibold">
                    Referred by
                  </div>
                  <div className="text-[16px] font-medium text-ink">{submittedData.partner}</div>
                </div>
              )}

              <div className="rounded-3xl border border-border bg-white p-6 md:p-8 max-w-md mx-auto mb-10 text-left shadow-sm">
                <div className="text-xs uppercase tracking-wider text-ink-muted mb-4 font-semibold">
                  Reservation Summary ({submittedData.totalRings} ring{submittedData.totalRings === 1 ? '' : 's'})
                </div>
                <div className="space-y-3">
                  {submittedData.rings.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm py-2 border-b border-border/60 last:border-0">
                      <div>
                        <span className="font-medium text-ink">{item.finish}</span>
                        <span className="text-ink-muted ml-2">Size {item.size}</span>
                      </div>
                      <span className="text-ink font-semibold">Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-border flex justify-between text-xs text-ink-muted">
                  <span>Due today</span>
                  <span className="font-semibold text-emerald-600">$0.00</span>
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
          ) : (
            <>
              {/* Partner Welcome Banner (if referral link) */}
              {partnerInfo && (
                <div className="mb-10 max-w-3xl mx-auto rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.05] to-white p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div
                      className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-white"
                      style={{
                        background: 'linear-gradient(135deg, rgb(0, 169, 224), rgb(24, 120, 224), rgb(109, 40, 217))',
                      }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[3px] text-primary mb-2">
                        Welcome
                      </div>
                      <h2 className="text-xl md:text-2xl font-light tracking-tight text-ink">
                        You've been invited by <span className="font-medium">{partnerInfo.name}</span> to reserve your JCRingforlife Ring.
                      </h2>
                      <p className="mt-2 text-[14px] text-ink-soft leading-relaxed">
                        {partnerInfo.name} is an official JCRingforlife Partner helping customers gain early access to AI-powered wellness technology. Complete your reservation below, we'll take care of everything else.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Page Title & Intro */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 mb-6 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[11px] font-semibold uppercase tracking-[3px] text-ink-muted">
                    Founder Edition · Limited to 2000
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4 text-ink">
                  Reserve your{' '}
                  <span
                    style={{
                      backgroundImage: 'linear-gradient(135deg, rgb(0, 169, 224), rgb(24, 120, 224), rgb(109, 40, 217))',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    JCRingforlife Ring
                  </span>
                  .
                </h1>
                <p className="text-[16px] text-ink-soft max-w-xl mx-auto">
                  Be among the first 2,000 to wear the future of everyday wellness. No payment today, your place is held.
                </p>
                <p className="text-[12px] text-ink-muted max-w-xl mx-auto mt-4">
                  JCRingforlife Ring is intended for general wellness purposes only and is not a medical device.
                </p>
              </div>

              {/* 2-Column Preorder Form Layout */}
              <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
                {/* Left Column: Interactive Product Render Preview & Badges */}
                <div className="min-w-0 lg:sticky lg:top-28">
                  <div className="relative aspect-square rounded-3xl border border-border bg-gradient-to-b from-[#EEF3FA] to-white overflow-hidden shadow-sm touch-pan-y select-none">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        key={activePreviewFinish.id}
                        src={activePreviewFinish.image}
                        alt={`JCRingforlife Ring, ${activePreviewFinish.name}`}
                        width={1024}
                        height={1024}
                        draggable={false}
                        className="w-4/5 h-4/5 object-contain drop-shadow-[0_30px_60px_rgba(10,22,40,0.25)] transition-opacity duration-500"
                      />
                    </div>

                    {/* Prev / Next Chevrons */}
                    <button
                      type="button"
                      aria-label="Previous colour"
                      onClick={handlePrevFinish}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/90 text-ink shadow-sm hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next colour"
                      onClick={handleNextFinish}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/90 text-ink shadow-sm hover:bg-white transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Top Swatch Indicator Pills */}
                    <div className="absolute top-5 left-0 right-0 flex justify-center gap-2">
                      {FINISHES.map((f, fIdx) => (
                        <button
                          key={f.id}
                          type="button"
                          aria-label={`Show ${f.name}`}
                          onClick={() => setPreviewFinishIdx(fIdx)}
                          className={`h-2 rounded-full transition-all ${
                            fIdx === previewFinishIdx ? 'w-6 bg-primary' : 'w-2 bg-ink-muted/40'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Bottom Metadata Bar */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] uppercase tracking-[3px] text-ink-muted">Preview</div>
                        <div className="text-[15px] font-medium mt-1 text-ink">{activePreviewFinish.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[11px] uppercase tracking-[3px] text-ink-muted">Total</div>
                        <div className="text-[15px] font-medium mt-1 text-ink">
                          {totalRingsCount} ring{totalRingsCount === 1 ? '' : 's'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3 Trust Badges Row */}
                  <div className="mt-8 grid grid-cols-3 gap-3">
                    <div className="rounded-xl border border-border bg-white px-3 py-3 text-center shadow-sm">
                      <ShieldCheck className="w-4 h-4 text-primary mx-auto mb-1.5" />
                      <div className="text-[11px] text-ink-soft leading-tight">No payment today</div>
                    </div>
                    <div className="rounded-xl border border-border bg-white px-3 py-3 text-center shadow-sm">
                      <Truck className="w-4 h-4 text-primary mx-auto mb-1.5" />
                      <div className="text-[11px] text-ink-soft leading-tight">Priority shipping</div>
                    </div>
                    <div className="rounded-xl border border-border bg-white px-3 py-3 text-center shadow-sm">
                      <Sparkles className="w-4 h-4 text-primary mx-auto mb-1.5" />
                      <div className="text-[11px] text-ink-soft leading-tight">Founder pricing</div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Multi-Step Reservation Form */}
                <form
                  onSubmit={handleSubmit}
                  className="min-w-0 space-y-10 rounded-3xl border border-border bg-white p-6 md:p-10 shadow-sm"
                >
                  {/* Section 1: Your Rings */}
                  <div className="space-y-4">
                    <h2 className="text-[11px] font-semibold uppercase tracking-[3px] text-primary">
                      Your rings
                    </h2>

                    {/* Sizing Guidance Box */}
                    <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/[0.06] to-white p-5 md:p-6 shadow-sm">
                      <div className="text-[18px] md:text-[20px] font-medium text-ink mb-1.5">
                        Not sure of your ring size?
                      </div>
                      <p className="text-[14px] text-ink-soft leading-relaxed">
                        Start with a photo check, then confirm your fit with a physical sizer.
                      </p>

                      {/* Photo check inner panel */}
                      <div className="mt-5 border-y border-border py-5">
                        <div className="relative min-w-0 text-ink">
                          <h3 className="pr-10 text-xl font-medium">Your photo check</h3>
                          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                            Photos check finger width, not US ring size. Confirm fit with a physical sizer.
                          </p>

                          <ol aria-label="Photo check progress" className="mt-5 grid grid-cols-3 border-b border-border pb-4 text-xs">
                            <li className={`flex items-center gap-2 font-medium ${isPhotoUploaded ? 'text-emerald-600' : 'text-primary'}`}>
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current">
                                {isPhotoUploaded ? '✓' : '1'}
                              </span>
                              Photo
                            </li>
                            <li className={`flex items-center gap-2 ${isPhotoUploaded ? 'font-medium text-primary' : 'text-ink-muted'}`}>
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current">
                                2
                              </span>
                              Check
                            </li>
                            <li className="flex items-center gap-2 text-ink-muted">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current">
                                3
                              </span>
                              Confirm fit
                            </li>
                          </ol>

                          <div className="mt-5">
                            <figure>
                              <img
                                src="/assets/hand-card-sample-palm-C2QZUor5.jpg"
                                alt="Open palm with a bank card flat in its center and all fingers visible"
                                className="mx-auto aspect-square w-full max-w-[280px] rounded-lg border border-border object-cover"
                                loading="lazy"
                              />
                              <figcaption className="mt-3 text-center text-sm leading-relaxed text-ink-soft">
                                No rings. Card flat on your palm. All fingers visible.
                                <br />
                                Hold your phone straight above.
                              </figcaption>
                            </figure>

                            <div className="mt-5 grid gap-2">
                              <label className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-white hover:bg-primary/90 px-4 py-2 h-12 w-full cursor-pointer">
                                <Upload className="w-4 h-4" />
                                <span>{isPhotoUploaded ? 'Photo Uploaded (Replace)' : 'Upload a photo'}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="sr-only"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                      setIsPhotoUploaded(true);
                                    }
                                  }}
                                />
                              </label>
                            </div>
                            <p className="mt-2 text-center text-xs text-ink-muted">
                              Camera is phone-only · upload JPG or PNG, up to 12 MB
                            </p>
                          </div>

                          <Link to="/faq" className="mt-4 inline-block text-xs text-primary underline underline-offset-4">
                            Sizing questions?
                          </Link>
                        </div>
                      </div>

                      {/* Manual Sizing Button (Opens SizingModal) */}
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => setIsSizingModalOpen(true)}
                          className="w-full flex items-center gap-3 rounded-xl border border-border bg-white p-3.5 text-left transition-colors hover:border-primary/40"
                        >
                          <span className="w-11 h-11 rounded-full bg-canvas border border-border flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="14" r="6.5" />
                              <path d="M12 7.5 9.5 4.5h5L12 7.5Z" fill="currentColor" stroke="none" />
                            </svg>
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[13px] font-medium text-ink leading-snug">
                              Measure with a ring or a strip of paper
                            </span>
                            <span className="block text-[12px] text-ink-muted leading-snug">
                              Two quick ways to find your size at home
                            </span>
                          </span>
                        </button>
                      </div>

                      <p className="mt-3 text-[12px] text-ink-muted flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 shrink-0" />
                        A free sizing kit ships before your ring, adjust your size anytime.
                      </p>
                    </div>

                    {/* Configured Rings List */}
                    {rings.map((ring, idx) => (
                      <div key={ring.id} className="rounded-2xl border border-border bg-canvas p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="text-[12px] uppercase tracking-[2px] text-ink-muted font-semibold">
                            Ring {idx + 1}
                          </div>
                          {rings.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveRing(ring.id)}
                              className="text-ink-muted hover:text-red-500 transition-colors inline-flex items-center gap-1 text-[12px]"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Remove
                            </button>
                          )}
                        </div>

                        {/* Size Selection */}
                        <div>
                          <label className="text-[13px] text-ink-soft">Ring size</label>
                          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mt-2">
                            {RING_SIZES.map((size) => (
                              <button
                                key={size}
                                type="button"
                                onClick={() => {
                                  handleUpdateRing(ring.id, { ring_size: size });
                                  markTouched('ring_size');
                                }}
                                className={`h-11 rounded-lg border text-[14px] font-medium transition-all ${
                                  ring.ring_size === size
                                    ? 'border-primary bg-primary/10 text-ink'
                                    : 'border-border bg-white text-ink-soft hover:border-primary/40'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                          {!ring.ring_size && touched.ring_size && (
                            <p className="mt-2 text-[12px] text-red-500">Please select a ring size</p>
                          )}
                        </div>

                        {/* Finish Selection */}
                        <div>
                          <label className="text-[13px] text-ink-soft">Finish</label>
                          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-2">
                            {FINISHES.map((f) => {
                              const isSelected = ring.ring_color === f.id;
                              return (
                                <button
                                  key={f.id}
                                  type="button"
                                  aria-pressed={isSelected}
                                  onClick={() => handleUpdateRing(ring.id, { ring_color: f.id })}
                                  className={`relative flex flex-col items-center rounded-xl border p-2 sm:p-3 transition-all ${
                                    isSelected
                                      ? 'border-primary ring-2 ring-primary/30 bg-primary/5'
                                      : 'border-border bg-white hover:border-primary/40'
                                  }`}
                                >
                                  {isSelected && (
                                    <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                                      <Check className="h-3 w-3" />
                                    </span>
                                  )}
                                  <img
                                    src={f.image}
                                    alt={`JCRingforlife Ring, ${f.name}`}
                                    loading="lazy"
                                    className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
                                  />
                                  <span className="mt-1.5 flex items-center gap-1.5 text-[12px] sm:text-[13px] text-ink text-center leading-tight">
                                    <span
                                      className="hidden sm:inline-block w-3 h-3 shrink-0 rounded-full border border-border"
                                      style={{ background: f.swatch }}
                                    />
                                    {f.name}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Quantity */}
                        <div>
                          <label className="text-[13px] text-ink-soft">Quantity</label>
                          <div className="mt-2 inline-flex items-center rounded-full border border-border bg-white p-1">
                            <button
                              type="button"
                              onClick={() => handleUpdateRing(ring.id, { quantity: Math.max(1, (ring.quantity || 1) - 1) })}
                              className="w-10 h-10 rounded-full hover:bg-canvas text-ink flex items-center justify-center"
                              aria-label="Decrease"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center text-[16px] font-medium text-ink">
                              {ring.quantity || 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleUpdateRing(ring.id, { quantity: Math.min(100, (ring.quantity || 1) + 1) })}
                              className="w-10 h-10 rounded-full hover:bg-canvas text-ink flex items-center justify-center"
                              aria-label="Increase"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add Another Ring Button */}
                    {rings.length < 10 && (
                      <button
                        type="button"
                        onClick={handleAddRing}
                        className="w-full h-12 rounded-xl border border-dashed border-border text-[14px] text-ink-soft hover:border-primary/50 hover:text-ink transition-all inline-flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" /> Add another ring
                      </button>
                    )}
                  </div>

                  {/* Section 2: Your Details */}
                  <div className="space-y-4">
                    <h2 className="text-[11px] font-semibold uppercase tracking-[3px] text-primary">
                      Your details
                    </h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <label className="block">
                          <span className="text-[13px] text-ink-soft">First name</span>
                          <input
                            type="text"
                            required
                            placeholder="Jane"
                            maxLength={200}
                            value={details.first_name}
                            onChange={(e) => handleDetailChange('first_name', e.target.value)}
                            onBlur={() => markTouched('first_name')}
                            className={`mt-1.5 w-full h-12 rounded-xl border bg-white px-4 text-[15px] text-ink placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                              touched.first_name && errors.first_name ? 'border-red-400 focus:border-red-500' : 'border-border focus:border-primary'
                            }`}
                          />
                          {touched.first_name && errors.first_name && (
                            <p className="mt-1 text-[12px] text-red-500">{errors.first_name}</p>
                          )}
                        </label>

                        <label className="block">
                          <span className="text-[13px] text-ink-soft">Last name</span>
                          <input
                            type="text"
                            required
                            placeholder="Doe"
                            maxLength={200}
                            value={details.last_name}
                            onChange={(e) => handleDetailChange('last_name', e.target.value)}
                            onBlur={() => markTouched('last_name')}
                            className={`mt-1.5 w-full h-12 rounded-xl border bg-white px-4 text-[15px] text-ink placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                              touched.last_name && errors.last_name ? 'border-red-400 focus:border-red-500' : 'border-border focus:border-primary'
                            }`}
                          />
                          {touched.last_name && errors.last_name && (
                            <p className="mt-1 text-[12px] text-red-500">{errors.last_name}</p>
                          )}
                        </label>
                      </div>

                      <label className="block">
                        <span className="text-[13px] text-ink-soft">Email</span>
                        <input
                          type="email"
                          required
                          placeholder="jane@example.com"
                          maxLength={200}
                          value={details.email}
                          onChange={(e) => handleDetailChange('email', e.target.value)}
                          onBlur={() => markTouched('email')}
                          className={`mt-1.5 w-full h-12 rounded-xl border bg-white px-4 text-[15px] text-ink placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                            touched.email && errors.email ? 'border-red-400 focus:border-red-500' : 'border-border focus:border-primary'
                          }`}
                        />
                        {touched.email && errors.email && (
                          <p className="mt-1 text-[12px] text-red-500">{errors.email}</p>
                        )}
                      </label>

                      <label className="block">
                        <span className="text-[13px] text-ink-soft">Phone</span>
                        <div
                          className={`mt-1.5 flex items-stretch rounded-xl border bg-white overflow-hidden transition-all focus-within:ring-2 focus-within:ring-primary/30 ${
                            touched.phone && errors.phone ? 'border-red-400' : 'border-border focus-within:border-primary'
                          }`}
                        >
                          <div className="relative flex items-center">
                            <select
                              value={`${details.phone_iso}|${details.phone_code}`}
                              onChange={(e) => {
                                const [iso, code] = e.target.value.split('|');
                                setDetails((prev) => ({ ...prev, phone_iso: iso, phone_code: code }));
                              }}
                              aria-label="Country dial code"
                              className="h-12 bg-transparent text-[14px] text-ink pl-3 pr-8 border-r border-border focus:outline-none appearance-none cursor-pointer"
                            >
                              {COUNTRY_DIAL_CODES.map((item) => (
                                <option key={item.iso} value={`${item.iso}|${item.code}`} className="bg-white text-ink">
                                  {item.iso} +{item.code}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-2 w-4 h-4 text-ink-muted pointer-events-none" />
                          </div>
                          <input
                            type="tel"
                            placeholder="(555) 123-4567"
                            maxLength={30}
                            value={details.phone}
                            onChange={(e) => handleDetailChange('phone', e.target.value)}
                            onBlur={() => markTouched('phone')}
                            className="flex-1 h-12 bg-transparent px-3 text-[15px] text-ink placeholder-ink-muted focus:outline-none"
                          />
                        </div>
                        {touched.phone && errors.phone && (
                          <p className="mt-1 text-[12px] text-red-500">{errors.phone}</p>
                        )}
                      </label>

                      {/* Who referred you? */}
                      <div>
                        <label className="block">
                          <span className="text-[13px] text-ink-soft">Who referred you?</span>
                          <input
                            type="text"
                            required
                            placeholder='Name, partner or code, enter "Self" if none'
                            maxLength={200}
                            value={details.referral_source}
                            onChange={(e) => handleDetailChange('referral_source', e.target.value)}
                            onBlur={() => markTouched('referral_source')}
                            className={`mt-1.5 w-full h-12 rounded-xl border bg-white px-4 text-[15px] text-ink placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                              touched.referral_source && errors.referral_source ? 'border-red-400 focus:border-red-500' : 'border-border focus:border-primary'
                            }`}
                          />
                          {touched.referral_source && errors.referral_source && (
                            <p className="mt-1 text-[12px] text-red-500">{errors.referral_source}</p>
                          )}
                        </label>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="text-[12px] text-ink-muted">Quick select:</span>
                          {['Self', 'Friend / Family', 'Social media', 'Healthcare professional'].map((item) => (
                            <button
                              key={item}
                              type="button"
                              onClick={() => {
                                handleDetailChange('referral_source', item);
                                markTouched('referral_source');
                              }}
                              className={`px-3 h-8 rounded-full border text-[12px] transition-all ${
                                details.referral_source === item
                                  ? 'border-primary bg-primary/10 text-ink'
                                  : 'border-border bg-white text-ink-soft hover:border-primary/40'
                              }`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Shipping Address */}
                  <div className="space-y-4">
                    <h2 className="text-[11px] font-semibold uppercase tracking-[3px] text-primary">
                      Shipping address
                    </h2>
                    <div className="space-y-4">
                      <label className="block">
                        <span className="text-[13px] text-ink-soft">Address</span>
                        <input
                          type="text"
                          required
                          placeholder="123 Main Street, Apt 4"
                          maxLength={200}
                          value={details.address}
                          onChange={(e) => handleDetailChange('address', e.target.value)}
                          onBlur={() => markTouched('address')}
                          className={`mt-1.5 w-full h-12 rounded-xl border bg-white px-4 text-[15px] text-ink placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                            touched.address && errors.address ? 'border-red-400 focus:border-red-500' : 'border-border focus:border-primary'
                          }`}
                        />
                        {touched.address && errors.address && (
                          <p className="mt-1 text-[12px] text-red-500">{errors.address}</p>
                        )}
                      </label>

                      <div className="grid grid-cols-2 gap-3">
                        <label className="block">
                          <span className="text-[13px] text-ink-soft">City</span>
                          <input
                            type="text"
                            required
                            placeholder="New York"
                            maxLength={200}
                            value={details.city}
                            onChange={(e) => handleDetailChange('city', e.target.value)}
                            onBlur={() => markTouched('city')}
                            className={`mt-1.5 w-full h-12 rounded-xl border bg-white px-4 text-[15px] text-ink placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                              touched.city && errors.city ? 'border-red-400 focus:border-red-500' : 'border-border focus:border-primary'
                            }`}
                          />
                          {touched.city && errors.city && (
                            <p className="mt-1 text-[12px] text-red-500">{errors.city}</p>
                          )}
                        </label>

                        <label className="block">
                          <span className="text-[13px] text-ink-soft">State / Region</span>
                          <input
                            type="text"
                            required
                            placeholder="NY"
                            maxLength={200}
                            value={details.state}
                            onChange={(e) => handleDetailChange('state', e.target.value)}
                            onBlur={() => markTouched('state')}
                            className={`mt-1.5 w-full h-12 rounded-xl border bg-white px-4 text-[15px] text-ink placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                              touched.state && errors.state ? 'border-red-400 focus:border-red-500' : 'border-border focus:border-primary'
                            }`}
                          />
                          {touched.state && errors.state && (
                            <p className="mt-1 text-[12px] text-red-500">{errors.state}</p>
                          )}
                        </label>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <label className="block">
                          <span className="text-[13px] text-ink-soft">ZIP / Postal code</span>
                          <input
                            type="text"
                            required
                            placeholder="10001"
                            maxLength={200}
                            value={details.zip_code}
                            onChange={(e) => handleDetailChange('zip_code', e.target.value)}
                            onBlur={() => markTouched('zip_code')}
                            className={`mt-1.5 w-full h-12 rounded-xl border bg-white px-4 text-[15px] text-ink placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                              touched.zip_code && errors.zip_code ? 'border-red-400 focus:border-red-500' : 'border-border focus:border-primary'
                            }`}
                          />
                          {touched.zip_code && errors.zip_code && (
                            <p className="mt-1 text-[12px] text-red-500">{errors.zip_code}</p>
                          )}
                        </label>

                        {/* Country Dropdown */}
                        <div className="relative" ref={countryDropdownRef}>
                          <label className="block">
                            <span className="text-[13px] text-ink-soft">Country</span>
                            <div className="relative">
                              <input
                                type="text"
                                required
                                placeholder="Select your country"
                                maxLength={200}
                                autoComplete="off"
                                value={details.country}
                                onChange={(e) => {
                                  handleDetailChange('country', e.target.value);
                                  setIsCountryOpen(true);
                                }}
                                onFocus={() => setIsCountryOpen(true)}
                                onBlur={() => markTouched('country')}
                                className={`mt-1.5 w-full h-12 rounded-xl border bg-white pl-4 pr-10 text-[15px] text-ink placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                                  touched.country && errors.country ? 'border-red-400 focus:border-red-500' : 'border-border focus:border-primary'
                                }`}
                              />
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" />
                            </div>
                          </label>
                          {touched.country && errors.country && (
                            <p className="mt-1 text-[12px] text-red-500">{errors.country}</p>
                          )}

                          {isCountryOpen && filteredCountries.length > 0 && (
                            <div className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto rounded-xl border border-border bg-white shadow-lg">
                              {filteredCountries.map((c) => (
                                <button
                                  key={c}
                                  type="button"
                                  onClick={() => {
                                    handleDetailChange('country', c);
                                    setIsCountryOpen(false);
                                  }}
                                  className="w-full text-left px-4 py-2 text-[14px] text-ink-soft hover:bg-canvas hover:text-ink transition-colors"
                                >
                                  {c}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-[13px] text-red-600">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full h-14 rounded-full font-semibold text-white text-[15px] transition-all inline-flex items-center justify-center gap-2 ${
                      isFormValid
                        ? 'cursor-pointer hover:brightness-110 hover:scale-[1.01]'
                        : 'opacity-60 cursor-not-allowed'
                    } disabled:cursor-not-allowed shadow-lg`}
                    style={{
                      background: 'linear-gradient(135deg, rgb(0, 169, 224), rgb(24, 120, 224), rgb(109, 40, 217))',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Reserving your ring…
                      </>
                    ) : (
                      `Reserve ${totalRingsCount > 1 ? `my ${totalRingsCount} JCRingforlife Rings` : 'my JCRingforlife Ring'} →`
                    )}
                  </button>

                  <p className="text-center text-[12px] text-ink-muted">
                    No charge today. We'll email you before we ship. By reserving, you agree to our{' '}
                    <Link to="/terms-of-service" className="underline hover:text-ink">
                      Terms
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy-policy" className="underline hover:text-ink">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Sizing Modal */}
      <SizingModal
        isOpen={isSizingModalOpen}
        onClose={() => setIsSizingModalOpen(false)}
        onSelectSize={(size) => {
          if (rings.length > 0) {
            handleUpdateRing(rings[0].id, { ring_size: parseInt(size, 10) });
          }
          setIsSizingModalOpen(false);
        }}
      />
    </div>
  );
}
