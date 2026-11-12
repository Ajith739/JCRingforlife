import React, { lazy, Suspense, useLayoutEffect } from 'react';
const AdminApp = lazy(() => import('../../backend/admin/src/AdminApp.jsx'));

import { Routes, Route, useLocation } from 'react-router-dom';

// Common Components
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import CartDrawer from './components/common/CartDrawer.jsx';
import CookieBanner from './components/common/CookieBanner.jsx';

// Pages
import HomePage from './pages/HomePage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import RingPage from './pages/RingPage.jsx';
import SizeChartPage from './pages/SizeChartPage.jsx';
import FAQPage from './pages/FAQPage.jsx';
import PreorderPage from './pages/PreorderPage.jsx';
import PartnersPage from './pages/PartnersPage.jsx';
import SupportPage from './pages/SupportPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import SmartRingGuidePage from './pages/SmartRingGuidePage.jsx';
import SleepGuidePage from './pages/SleepGuidePage.jsx';
import RecoveryGuidePage from './pages/RecoveryGuidePage.jsx';
import StressGuidePage from './pages/StressGuidePage.jsx';
import AppPage from './pages/AppPage.jsx';
import SocialEmbedsPage from './pages/SocialEmbedsPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';
import CookiePolicyPage from './pages/CookiePolicyPage.jsx';
import CISPolicyPage from './pages/CISPolicyPage.jsx';
import TermsPage from './pages/TermsPage.jsx';
import AccessibilityPage from './pages/AccessibilityPage.jsx';
import TrademarksPage from './pages/TrademarksPage.jsx';
import DeleteAccountPage from './pages/DeleteAccountPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

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

