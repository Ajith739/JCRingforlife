import React, { lazy, Suspense, useLayoutEffect } from 'react';
const AdminApp = lazy(() => import('../../backend/admin/src/AdminApp.jsx'));

import { Routes, Route, useLocation } from 'react-router-dom';

// Common Components
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import CartDrawer from './components/common/CartDrawer.jsx';
import CookieBanner from './components/common/CookieBanner.jsx';

// Pages
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const ShopPage = lazy(() => import('./pages/ShopPage.jsx'));
const RingPage = lazy(() => import('./pages/RingPage.jsx'));
const SizeChartPage = lazy(() => import('./pages/SizeChartPage.jsx'));
const FAQPage = lazy(() => import('./pages/FAQPage.jsx'));
const PreorderPage = lazy(() => import('./pages/PreorderPage.jsx'));
const PartnersPage = lazy(() => import('./pages/PartnersPage.jsx'));
const SupportPage = lazy(() => import('./pages/SupportPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const SmartRingGuidePage = lazy(() => import('./pages/SmartRingGuidePage.jsx'));
const SleepGuidePage = lazy(() => import('./pages/SleepGuidePage.jsx'));
const RecoveryGuidePage = lazy(() => import('./pages/RecoveryGuidePage.jsx'));
const StressGuidePage = lazy(() => import('./pages/StressGuidePage.jsx'));
const AppPage = lazy(() => import('./pages/AppPage.jsx'));
const SocialEmbedsPage = lazy(() => import('./pages/SocialEmbedsPage.jsx'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage.jsx'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage.jsx'));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage.jsx'));
const CISPolicyPage = lazy(() => import('./pages/CISPolicyPage.jsx'));
const TermsPage = lazy(() => import('./pages/TermsPage.jsx'));
const AccessibilityPage = lazy(() => import('./pages/AccessibilityPage.jsx'));
const TrademarksPage = lazy(() => import('./pages/TrademarksPage.jsx'));
const DeleteAccountPage = lazy(() => import('./pages/DeleteAccountPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

// ScrollToTop on Route Change
function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if (window.scrollY !== 0) {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const adminRoute = pathname === '/admin' || pathname.startsWith('/admin/') || ['/login', '/forgot-password', '/reset-password', '/verify-email', '/lock-screen', '/logout', '/coming-soon', '/maintenance', '/403', '/404', '/500'].includes(pathname);
  if (adminRoute) return <Suspense fallback={<div role="status" style={{padding: 48}}>Loading JCRingforlife workspace…</div>}><AdminApp /></Suspense>;
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink antialiased">
      <ScrollToTop />
      <Header />
      <CartDrawer />
      <CookieBanner />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/ring" element={<RingPage />} />
          <Route path="/size-chart" element={<SizeChartPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/preorder" element={<PreorderPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/smart-ring-guide" element={<SmartRingGuidePage />} />
          <Route path="/smart-ring-guide/sleep-tracking-ring" element={<SleepGuidePage />} />
          <Route path="/smart-ring-guide/recovery-ring" element={<RecoveryGuidePage />} />
          <Route path="/smart-ring-guide/stress-tracking-ring" element={<StressGuidePage />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/social-embeds" element={<SocialEmbedsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/cis-policy" element={<CISPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="/trademarks" element={<TrademarksPage />} />
          <Route path="/delete-account" element={<DeleteAccountPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

