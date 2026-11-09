# aiOn Page Inventory & Route Catalog

This document catalogues every verified page and route discovered in the `aionrings.com` production bundle audit.

---

## Verified Route Matrix

| Route | Page Name | Primary Component | Content / Features | Status |
|---|---|---|---|---|
| `/` | Homepage / Landing | `XD` | Full brand story, 15 distinct sections, hero, 3 finishes, interactive signals, pricing, comparison, FAQs | Verified |
| `/shop` | Product Store | `i$` | E-commerce product configurator, finish selector, size selector (6-13 + sizing kit first), gallery thumbnails, add-to-cart, guarantee badges | Verified |
| `/ring` | The Ring Hardware | `S$` | Aerospace titanium deep dive, medical hypoallergenic molding, battery life (7 days), IP68 water resistance, sensor breakdown | Verified |
| `/size-chart` | Ring Size Chart | `C$` | US, UK, and EU cross-conversion chart, millimeters circumference, printable size guide instructions, physical kit timeline | Verified |
| `/faq` | Knowledgebase / FAQ | `Y$` | Categorized accordion FAQs (Hardware, Accuracy, Battery, Subscriptions, Water, Sizing, Returns) | Verified |
| `/preorder` | Founder Pre-Order | `wB` | Direct Founder Edition reservation flow ($149 offer), referral code application, finish/size selection, checkout redirection | Verified |
| `/partners` | Partner Program | `OB` | Wellness clinics, gyms, longevity physicians, corporate wellness bulk reservations, inquiry form | Verified |
| `/support` | Help & Customer Care | `IB` | Help desk topics, order tracking, returns policy, warranty terms, support contact form | Verified |
| `/contact` | Contact aiOn | `LB` | Direct inquiries, press relations, scientific partnership, business address in Delaware/California | Verified |
| `/smart-ring-guide` | Smart Ring Guide (Hub) | `sI` | Comprehensive editorial guide comparing smart rings vs smart watches, sensor technologies, battery trade-offs | Verified |
| `/smart-ring-guide/sleep-tracking-ring` | Sleep Tracking Guide | `iI` | Detailed article on sleep architecture, REM vs Deep, nocturnal HRV dip, SpO2 during sleep | Verified |
| `/smart-ring-guide/recovery-ring` | Recovery Ring Guide | `aI` | Readiness index computation, sympathetic vs parasympathetic nervous balance, overtraining prevention | Verified |
| `/smart-ring-guide/stress-tracking-ring` | Stress Tracking Guide | `oI` | Real-time autonomic nervous system tracking, daytime HRV drops, box breathing interventions | Verified |
| `/app` | Companion App Preview | `lV` | iOS and Android native app showcase, Vitality Score UI, Today's Quest, Sleep graph, Health Age, Nutrition sync | Verified |
| `/social-embeds` | Social Community | `xV` | Real user reviews, community unboxings, influencer health journeys, Instagram/YouTube feeds | Verified |
| `/checkout` | Demonstration Checkout | `J$` | Multi-step checkout: Shipping details, Shipping speed, Payment demonstration, Order summary, Promo codes | Verified |
| `/admin` | Partner / Staff Portal | `PB` | Internal portal login and reservation status dashboard | Verified |
| `/privacy-policy` | Privacy Policy | `uB` | Comprehensive GDPR / CCPA compliant privacy disclosures, health data encryption, zero-sale guarantee | Verified |
| `/cookie-policy` | Cookie Policy | `dB` | Breakdown of Essential, Analytical, and Marketing cookies, preference reset controls | Verified |
| `/cis-policy` | CIS Security Policy | `hB` | Center for Internet Security compliance, SOC2 Type II controls, continuous vulnerability scans, data isolation | Verified |
| `/terms-of-service` | Terms of Service | `fB` | Purchase terms, founder pre-order delivery windows (Q3 2026), 30-day money-back guarantee, arbitration clause | Verified |
| `/accessibility` | Accessibility Policy | `pB` | WCAG 2.1 AA conformance statement, screen reader compatibility, keyboard navigation, color contrast audit | Verified |
| `/trademarks` | Trademarks & IP | `mB` | aiOn™, Vitality Score™, and Mazo Solutions patent protections | Verified |
| `/delete-account` | Account Deletion | `wV` | Self-service biometric and personal data erasure request form | Verified |
| `*` | 404 Not Found | `bV` | Elegant 404 error page with quick links back to homepage and shop | Verified |

---

## Global Overlays & Modals

1. **Cart Slide-Over Drawer (`hm`):**
   - Triggerable from any page via navigation bar cart icon or upon clicking "Add to Cart" / "Pre-Order".
   - Shows live line items, quantity modifiers, subtotal, and direct path to Checkout.
2. **Cookie Consent Dialog (`yV`):**
   - Non-intrusive floating dialog with "Accept All", "Essential Only", and link to `/cookie-policy`.
3. **Interactive Sizing Modal / Camera Try-On:**
   - Card calibration guide (credit/bank card palm reference) and digital millimeter gauge.
4. **Mobile Navigation Drawer:**
   - Smooth full-screen mobile menu accessible on screens `< 768px`.

