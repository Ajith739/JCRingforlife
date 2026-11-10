# Partners Page Reverse-Engineering Audit: aiOn Smart Ring

**Reference URL:** [https://www.aionrings.com/partners](https://www.aionrings.com/partners)  
**Audit Date:** November 2026  
**Status:** **100% Reverse-Engineered**

---

## 1. Page Architecture & Routing

The reference `/partners` page is an elegant, multi-state B2B community onboarding portal designed for wellness centers, fitness studios, functional medicine practices, gyms, and corporate wellness initiatives.

It features **3 distinct view states** managed cleanly on the frontend:
1. **`landing` View (Default):** Dual audience fork (Individual vs Organization), 3-step referral mechanism explanation, and partnership contact box.
2. **`bulk` View (Organization Inquiry Flow):** In-place transition with a `← Back` button to an organization intake form capturing contact info, estimated quantities, and optional per-size breakdowns.
3. **`success` View (Inquiry Confirmation):** Dedicated thank-you screen displaying a formatted inquiry tracking number and navigation back to home.

---

## 2. Section Breakdown & Specification

### A. Partner Introduction
- **Eyebrow Badge:** Rounded pill with `lucide-handshake` icon and text `aiOn Partner Program` in `text-ink-muted uppercase tracking-[3px]`.
- **Main Heading:** `Bring aiOn to <span class="text-gradient-brand">your community</span>.`
- **Intro Paragraph:** *"Wellness centers, studios, gyms, employers and businesses can invite their customers to reserve the aiOn Ring, no inventory, no upfront cost."*

### B. Dual-Option Audience Selector
A 2-column card grid giving clear agency to individual consumers vs organization representatives:
1. **Card 1: Individual (`/preorder`)**
   - Icon: `lucide-users` in `#1878E0`
   - Label: `INDIVIDUAL`
   - Heading: `I'm reserving for myself`
   - Description: *"Reserve your Founder Edition aiOn Ring. No payment today."*
   - CTA: `Pre-order your ring →` (routes to `/preorder`)
2. **Card 2: Business / Wellness Partner (Interactive Button)**
   - Icon: `lucide-building-2` in `#1878E0`
   - Label: `BUSINESS / WELLNESS PARTNER`
   - Heading: `We're reserving for our organization`
   - Description: *"Bulk reservations for wellness centers, studios, and enterprises. We'll contact you regarding pricing and delivery."*
   - CTA: `Request bulk reservation →` (triggers state transition to `bulk` view)

### C. Bulk Reservation Intake Form (`view === 'bulk'`)
- **Return Control:** `← Back` button returning cleanly to `landing` view.
- **Header:** Pill `Bulk Reservation` + Heading *"For wellness centers, studios & businesses."*
- **Form Controls:**
  - `Business / Organization name` (Text, required, max 200)
  - `Contact person` (Text, required, max 200)
  - `Business email` (Email, required, validated via regex)
  - `Phone` (Tel, required)
  - `Estimated total quantity` (Number, default 10, min 1, max 100000)
  - `Quantity by ring size (optional)`: 8 dedicated numerical input boxes for Sizes 6, 7, 8, 9, 10, 11, 12, 13.
  - `Notes (optional)`: 3-row textarea.
- **Validation & Submission:**
  - Submit CTA: `Submit bulk inquiry →` (disabled until required fields are filled).
  - On submit: Displays formatted Inquiry Number and Thank You message.

### D. How the Partner Program Works (3-Step Presentation)
- **Heading:** `How the partner program works` / `A dedicated referral link for every partner.`
- **Step 1:** `Become a partner` (`lucide-sparkles`) — *"We create your dedicated partner code, referral link and QR code."*
- **Step 2:** `Share with your community` (`lucide-qr-code`) — *"Invite your customers via your unique link, every reservation is attributed to you automatically."*
- **Step 3:** `We handle the rest` (`lucide-handshake`) — *"aiOn takes care of confirmations, fulfillment and customer communication end-to-end."*

### E. Final Partner CTA
- Boxed card with white background, border, and soft elevation:
  - Heading: `Interested in becoming an aiOn Partner?`
  - Text: *"Reach out to our partnerships team. We'll set up your dedicated partner page and referral link."*
  - CTA Button: `Contact partnerships →` linking to `mailto:contact@aionrings.com`.

