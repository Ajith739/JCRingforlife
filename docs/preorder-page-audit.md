# Pre-Order Page Reverse-Engineering Audit: aiOn Smart Ring

**Reference URL:** [https://www.aionrings.com/preorder](https://www.aionrings.com/preorder)  
**Audit Date:** November 2026  
**Status:** **100% Reverse-Engineered**

---

## 1. Route Discovery & CTA Destinations

Every visible "Pre-order" CTA across the original homepage (Navbar, Hero, Membership comparison cards, Final runner CTA, and Footer) points directly to `/preorder`.

There is no redirect to external platforms (Shopify, Kickstarter, Indiegogo). The reference hosts a **fully bespoke, on-site Founder Edition reservation funnel**.

---

## 2. Page Architecture & Flow

The page is built as a split **2-column desktop layout (`grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16`)**:

### A. Sticky Product Media Gallery (Left Column)
- **Container:** `min-w-0 lg:sticky lg:top-28`.
- **Media Frame:** Aspect-square container with soft radial gradient (`from-[#EEF3FA] to-white`), border, and drop shadow.
- **Dynamic Render Switcher:** Displays high-resolution ring renders (`ring-finish-midnight-DK6ZPSTf.png`, `ring-finish-silver-Xrc8Y54a.png`, `ring-finish-rose-DTpoQDow.png`) responding instantaneously to finish selection or chevron controls.
- **Carousel Controls:**
  - Left & Right chevron buttons with circular white backdrop.
  - Top pagination indicator with expanding active pill (`w-6 bg-primary` vs `w-2 bg-ink-muted/40`).
- **Footer Overlay:** Live metadata displaying currently selected preview finish and total ring count.
- **Trust Badges Row:** 3 pill cards:
  1. `No payment today` (ShieldCheck icon)
  2. `Priority shipping` (Truck icon)
  3. `Founder pricing` (Sparkles icon)

### B. Multi-Ring Reservation Form (Right Column)
The right column presents a white rounded panel (`rounded-3xl border border-border bg-white p-6 md:p-10 shadow-sm`) divided into 3 verified sections:

#### Section 1: "YOUR RINGS"
- **Sizing Guidance Card:**
  - Heading: *"Not sure of your ring size?"*
  - Subhead: *"Start with a photo check, then confirm your fit with a physical sizer."*
  - Sizing Photo Check: Includes hand photo upload guide, bank card scale reference (`hand-card-sample-palm-C2QZUor5.jpg`), and 3-step progress (Photo $\to$ Check $\to$ Confirm).
  - Sizing Modal Trigger: *"Measure with a ring or a strip of paper — Two quick ways to find your size at home"*.
  - Sizing Kit Reassurance: *"A free sizing kit ships before your ring, adjust your size anytime."*
- **Ring Configurator Items:**
  - Supports multiple rings via `+ Add another ring` (up to 10).
  - Ring size selector: Grid of buttons for Sizes 6, 7, 8, 9, 10, 11, 12, 13.
  - Finish cards: 3 selectable cards with finish render, color swatch dot, and checkmark pill on active selection.
  - Quantity control: Decrement / Number / Increment pill.
  - Remove button for items when multiple rings exist.

#### Section 2: "YOUR DETAILS"
- First name & Last name (2-column grid).
- Email address (with live format validation).
- International phone input with custom country code selector dropdown.
- "Who referred you?" input with quick-select pills:
  - `Self`
  - `Friend / Family`
  - `Social media`
  - `Healthcare professional`

#### Section 3: "SHIPPING ADDRESS"
- Address line (123 Main Street, Apt 4).
- City & State / Region.
- ZIP / Postal code.
- Country selector dropdown with search/autocomplete filtering.

#### Submit & Completion State
- **Submit CTA:** `Reserve my aiOn Ring →` (or `Reserve my 2 aiOn Rings →` when multiple rings are configured).
- **Zero Payment Reassurance:** *"No charge today. We'll email you before we ship. By reserving, you agree to our Terms and Privacy Policy."*
- **Success Screen:** Displays *"Thank you, [Name]. Your aiOn Ring reservation has been received. A confirmation email is on its way."* with partner attribution when applicable.

