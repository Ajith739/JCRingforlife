import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import LifestyleBannerSection from '../components/home/LifestyleBannerSection';
import ProblemStatementSection from '../components/home/ProblemStatementSection';
import VitalityLoopSection from '../components/home/VitalityLoopSection';
import ApproachSection from '../components/home/ApproachSection';
import SignalsSection from '../components/home/SignalsSection';
import ParallaxBreakBanner from '../components/home/ParallaxBreakBanner';
import QuestsSection from '../components/home/QuestsSection';
import HrvTrendSection from '../components/home/HrvTrendSection';
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
    document.title = 'JCRingforlife Smart Ring - Sleep, Recovery & Stress Tracking Ring';
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
        {/* Section 0: Hero Section */}
        <HeroSection />

        {/* Section 1: Lifestyle Banner Video */}
        <LifestyleBannerSection />

        {/* Section 2: Problem Statement & Heartbeat ECG */}
        <ProblemStatementSection />

        {/* Section 3: Vitality Score Loop (id: "how") */}
        <VitalityLoopSection />

        {/* Section 4: Other Rings Track. JCRingforlife Acts (id: "approach") */}
        <ApproachSection />

        {/* Section 5: Everything Your Body Is Telling You - 6 Signals (id: "signals") */}
        <SignalsSection />

        {/* Section 6: Movement · Activity Banner */}
        <ParallaxBreakBanner
          src="/assets/nature-walk-ring-BdKlJFoj.jpg"
          eyebrow="Movement · Activity"
          title="Health doesn't live in a dashboard."
          line="It lives in morning trails, fresh air and the steps you actually take."
          position="center 40%"
        />

        {/* Section 7: Today's Quests */}
        <QuestsSection />

        {/* Section 8: HRV Trend Last 14 Days */}
        <HrvTrendSection />

        {/* Section 9: Companion App Experience (id: "app") */}
        <AppShowcaseSection />

        {/* Section 10: Titanium Hardware Specs & 3 Finishes (id: "ring") */}
        <HardwareSpecsSection />

        {/* Section 11: In Life - 3 Video Moments (id: "in-life") */}
        <FinishesSection />

        {/* Section 12: Sleep · Recovery Banner */}
        <ParallaxBreakBanner
          src="/assets/nature-restful-night-BUfEgpbZ.jpg"
          eyebrow="Sleep · Recovery"
          title="The quietest hours shape the loudest days."
          line="JCRingforlife follows your sleep and recovery patterns, gently, all night."
          position="center 50%"
        />

        {/* Section 13: Membership Tiers & Pricing */}
        <MembershipComparisonSection />

        {/* Section 14: Mountain Trail Runner Banner & Final CTA */}
        <RunningBannerSection />

        {/* Section 15: FAQ Accordion (id: "faq") */}
        <FAQAccordionSection />

        {/* Section 16: FDA / General Wellness Disclaimer */}
        <MedicalDisclaimerSection />
      </main>
    </div>
  );
}
