import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, Lock, CheckCircle, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCT_INFO } from '../data/products';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
  });

  const [shippingMethod, setShippingMethod] = useState('free'); // 'free' or 'priority'
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [cardInfo, setCardInfo] = useState({ number: '', expiry: '', cvc: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    document.title = 'Checkout - JCRingforlife Smart Wellness Ring';
    window.scrollTo(0, 0);
  }, []);

  const effectiveItems = items.length > 0 ? items : [
    {
      id: 'default-founder',
      name: 'JCRingforlife Smart Ring (Founder Edition)',
      finishName: 'Midnight',
      size: 'Free Sizing Kit First',
      price: PRODUCT_INFO.preorderPrice,
      originalPrice: PRODUCT_INFO.regularPrice,
      quantity: 1,
      image: '/assets/ring-finish-midnight-DK6ZPSTf.png',
    },
  ];

  const subtotal = effectiveItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const shippingFee = shippingMethod === 'priority' ? 15 : 0;
  const finalTotal = Math.max(0, subtotal - discount + shippingFee);

  const handleApplyPromo = () => {
    if (!promoCode) return;
    const code = promoCode.trim().toUpperCase();
    if (code === 'FOUNDER50' || code === 'SAVE20') {
      setDiscount(20);
      setPromoApplied(true);
    } else {
      setDiscount(10);
      setPromoApplied(true);
    }
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      setOrderNumber('JCRING-' + Math.floor(100000 + Math.random() * 900000));
      clearCart();
    }, 1200);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-canvas pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 rounded-3xl bg-white border border-border shadow-card space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div>
              <span className="eyebrow text-emerald-600 font-bold">Reservation Confirmed</span>
              <h1 className="text-3xl font-light text-ink mt-1">
                Welcome to the Founder Circle
              </h1>
              <p className="text-sm font-semibold text-primary font-mono mt-1">
                Order #{orderNumber}
              </p>
            </div>

            <p className="text-sm text-ink-soft leading-relaxed max-w-md mx-auto">
              We have sent a confirmation receipt to <strong>{shippingInfo.email || 'your email'}</strong>. Your complimentary physical sizing kit is scheduled for dispatch.
            </p>

            <div className="p-5 rounded-2xl bg-canvas border border-border text-left text-xs text-ink-soft space-y-2">
              <div className="flex justify-between font-semibold text-ink">
                <span>Shipping Address</span>
                <span>{shippingInfo.city || 'Los Angeles'}, {shippingInfo.country}</span>
              </div>
              <p>1. Physical sizing kit arrives at your door.</p>
              <p>2. Try the sample rings overnight to confirm size.</p>
              <p>3. Founder Edition titanium ring crafted and ships Q3 2026.</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/" className="btn-brand py-3 px-8 text-sm">
                Return to Homepage
              </Link>
              <Link to="/app" className="btn-secondary py-3 px-8 text-sm">
                Preview Companion App
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <nav className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-ink">Shop</Link>
          <span>/</span>
          <span className="text-ink font-medium">Checkout</span>
        </nav>

        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="eyebrow text-primary">Demonstration Checkout</span>
          <h1 className="text-3xl sm:text-4xl font-light text-ink mt-1 tracking-tight">
            Finalize Your Reservation
          </h1>
          <p className="mt-2 text-xs text-ink-muted">
            End-to-end encrypted checkout demonstration · Ships Q3 2026
          </p>
        </div>

        <form onSubmit={handleCompleteOrder} className="grid lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
          {/* Left Column: Customer & Payment Form */}
          <div className="space-y-8">
            {/* 1. Contact & Shipping */}
            <div className="p-8 rounded-3xl bg-white border border-border shadow-card space-y-5">
              <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
                <span>1. Shipping Information</span>
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">First Name *</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.firstName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                    placeholder="Jane"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.lastName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                    placeholder="Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">Street Address *</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  placeholder="123 Ocean Avenue, Suite 400"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">City *</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    placeholder="San Francisco"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">State / Region *</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                    placeholder="CA"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">Postal Code *</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.postalCode}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                    placeholder="94107"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Speed */}
            <div className="p-8 rounded-3xl bg-white border border-border shadow-card space-y-4">
              <h2 className="text-lg font-semibold text-ink">
                2. Shipping Speed
              </h2>
              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  shippingMethod === 'free' ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-border'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shippingMethod === 'free'}
                      onChange={() => setShippingMethod('free')}
                      className="accent-primary"
                    />
                    <div>
                      <span className="text-sm font-semibold text-ink block">Standard Worldwide Express</span>
                      <span className="text-xs text-ink-soft">Includes free priority sizing kit dispatch</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">FREE</span>
                </label>

                <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  shippingMethod === 'priority' ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-border'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shippingMethod === 'priority'}
                      onChange={() => setShippingMethod('priority')}
                      className="accent-primary"
                    />
                    <div>
                      <span className="text-sm font-semibold text-ink block">Founder Priority White-Glove</span>
                      <span className="text-xs text-ink-soft">Priority air courier & signature confirmation</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-ink">$15.00</span>
                </label>
              </div>
            </div>

            {/* 3. Payment Simulation */}
            <div className="p-8 rounded-3xl bg-white border border-border shadow-card space-y-5">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span>3. Payment Simulation</span>
                </h2>
                <div className="flex items-center gap-1 text-[11px] text-ink-muted">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-Bit SSL</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">Card Number</label>
                <input
                  type="text"
                  required
                  placeholder="4242 •••• •••• 4242"
                  value={cardInfo.number}
                  onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">Expiration (MM/YY)</label>
                  <input
                    type="text"
                    required
                    placeholder="12/28"
                    value={cardInfo.expiry}
                    onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">CVC Security Code</label>
                  <input
                    type="text"
                    required
                    placeholder="382"
                    value={cardInfo.cvc}
                    onChange={(e) => setCardInfo({ ...cardInfo, cvc: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="p-8 rounded-3xl bg-white border border-border shadow-card space-y-6 sticky top-24">
            <h3 className="text-lg font-semibold text-ink">
              Order Summary
            </h3>

            {/* Item List */}
            <div className="space-y-4">
              {effectiveItems.map((item) => (
                <div key={item.id} className="flex gap-3 pb-3 border-b border-border/60">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-contain rounded-xl bg-canvas p-1"
                  />
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-ink">{item.name}</h4>
                    <p className="text-[11px] text-ink-soft">
                      {item.finishName} · {item.size}
                    </p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-ink-muted">Qty: {item.quantity}</span>
                      <span className="text-xs font-bold text-ink">${item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Box */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. FOUNDER50)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-border text-xs uppercase"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="btn-secondary py-2 px-4 text-xs font-semibold"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-xs text-emerald-600 font-medium">
                  ✓ Promotional discount of ${discount} applied!
                </p>
              )}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2 text-xs divide-y divide-border/60">
              <div className="flex justify-between py-1 text-ink-soft">
                <span>Subtotal</span>
                <span className="font-medium text-ink">${subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between py-1 text-emerald-600">
                  <span>Promo Discount</span>
                  <span>-${discount}</span>
                </div>
              )}
              <div className="flex justify-between py-1 text-ink-soft">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee}.00`}</span>
              </div>
              <div className="flex justify-between py-1 text-ink-soft">
                <span>Physical Sizing Kit</span>
                <span className="text-emerald-600 font-medium">Included ($0)</span>
              </div>
              <div className="flex justify-between py-1 text-ink-soft">
                <span>JCRingforlife Vitals Lifetime Access</span>
                <span className="text-emerald-600 font-medium">Included ($0)</span>
              </div>
              <div className="flex justify-between pt-3 text-base font-bold text-ink">
                <span>Total Due Today</span>
                <span className="text-primary text-xl font-bold">${finalTotal}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full btn-brand py-4 text-base font-semibold shadow-glow flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Confirming Founder Reservation...</span>
              ) : (
                <>
                  <span>Complete Pre-Order — ${finalTotal}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-ink-muted text-center pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>30-Day Money-Back Guarantee upon ring receipt</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

