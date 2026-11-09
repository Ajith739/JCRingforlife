import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import LifestyleBannerSection from '../components/home/LifestyleBannerSection';
import ProblemStatementSection from '../components/home/ProblemStatementSection';
import VitalityLoopSection from '../components/home/VitalityLoopSection';
import FourPillarsSection from '../components/home/FourPillarsSection';
import ParallaxBreakBanner from '../components/home/ParallaxBreakBanner';
import QuestsSection from '../components/home/QuestsSection';
import PreorderOfferCard from '../components/home/PreorderOfferCard';
import AppShowcaseSection from '../components/home/AppShowcaseSection';
import HardwareSpecsSection from '../components/home/HardwareSpecsSection';
import FinishesSection from '../components/home/FinishesSection';
import MembershipComparisonSection from '../components/home/MembershipComparisonSection';
import RunningBannerSection from '../components/home/RunningBannerSection';
import FAQAccordionSection from '../components/home/FAQAccordionSection';
import MedicalDisclaimerSection from '../components/home/MedicalDisclaimerSection';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    document.title = 'aiOn Smart Ring - Sleep, Recovery & Stress Tracking Ring';
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 200);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen text-ink bg-canvas">
      <main>
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Lifestyle Banner Video */}
        <LifestyleBannerSection />

        {/* 3. Problem Statement & Heartbeat ECG */}
        <ProblemStatementSection />

        {/* 4. The Vitality Loop: Track, Understand, Act */}
        <VitalityLoopSection />

        {/* 5. Four Pillars of Health Signals */}
        <FourPillarsSection />

        {/* 6. Parallax Media Banner: Movement & Activity */}
        <ParallaxBreakBanner
          src="/assets/nature-walk-ring-BdKlJFoj.jpg"
          eyebrow="Movement · Activity"
          title="Health doesn't live in a dashboard."
          line="It lives in morning trails, fresh air and the steps you actually take."
          position="center 40%"
        />

        {/* 7. Actionable Quests */}
        <QuestsSection />

        {/* 8. Founder Edition Pre-order Offer Card */}
        <PreorderOfferCard />

        {/* 9. Companion App Experience */}
        <AppShowcaseSection />

        {/* 10. Titanium Hardware & Sensors */}
        <HardwareSpecsSection />

        {/* 11. Finishes in Life (Move, Rest, Morning) */}
        <FinishesSection />

        {/* 12. Parallax Media Banner: Sleep & Recovery */}
        <ParallaxBreakBanner
          src="/assets/nature-restful-night-BUfEgpbZ.jpg"
          eyebrow="Sleep · Recovery"
          title="The quietest hours shape the loudest days."
          line="aiOn follows your sleep and recovery patterns, gently, all night."
          position="center 50%"
        />

        {/* 13. Transparent Membership & Competitor Comparison */}
        <MembershipComparisonSection />

        {/* 14. Mountain Trail Runner Banner & Final CTA */}
        <RunningBannerSection />

        {/* 15. FAQ Accordion */}
        <FAQAccordionSection />

        {/* 16. FDA / General Wellness Disclaimer */}
        <MedicalDisclaimerSection />
      </main>
    </div>
  );
}

