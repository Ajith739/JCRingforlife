import React, { useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Common Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CartDrawer from './components/common/CartDrawer';
import CookieBanner from './components/common/CookieBanner';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import RingPage from './pages/RingPage';
import SizeChartPage from './pages/SizeChartPage';
import FAQPage from './pages/FAQPage';
import PreorderPage from './pages/PreorderPage';
import PartnersPage from './pages/PartnersPage';
import SupportPage from './pages/SupportPage';
import ContactPage from './pages/ContactPage';
import SmartRingGuidePage from './pages/SmartRingGuidePage';
import SleepGuidePage from './pages/SleepGuidePage';
import RecoveryGuidePage from './pages/RecoveryGuidePage';
import StressGuidePage from './pages/StressGuidePage';
import AppPage from './pages/AppPage';
import SocialEmbedsPage from './pages/SocialEmbedsPage';
import CheckoutPage from './pages/CheckoutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import CISPolicyPage from './pages/CISPolicyPage';
import TermsPage from './pages/TermsPage';
import AccessibilityPage from './pages/AccessibilityPage';
import TrademarksPage from './pages/TrademarksPage';
import DeleteAccountPage from './pages/DeleteAccountPage';
import NotFoundPage from './pages/NotFoundPage';

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

