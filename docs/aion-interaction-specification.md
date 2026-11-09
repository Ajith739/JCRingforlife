# aiOn Interaction & Motion Specification

This document defines the exact behavioral rules, state machines, animation parameters, and interaction flows for the aiOn web application.

---

## 1. Global Navigation & Header

- **Scroll State Machine:**
  - `window.scrollY <= 60px`: Transparent background, no border, floating seamlessly over hero content.
  - `window.scrollY > 60px`: Transitions to `rgba(255, 255, 255, 0.82)`, `backdrop-filter: blur(20px)`, `border-bottom: 1px solid #E2E8F0`. Transition duration `250ms ease`.
- **Navigation Routing:**
  - Route links (`/shop`, `/ring`, `/app`, `/faq`, `/preorder`) use React Router client-side transitions.
  - Hash links (`/#how`, `/#signals`, `/#ring`) scroll smoothly to target elements via `scrollIntoView({ behavior: 'smooth' })`. If on a subpage, navigate to root with the hash parameter.
  - On route change, window scrolls immediately to top `(0, 0)`.
- **Mobile Drawer:**
  - Hamburger button (`bP` / `Dt` Lucide icons) toggles full-screen mobile menu.
  - Clicking any navigation item closes the drawer before scrolling.

---

## 2. Shopping Cart & Drawer Interaction

- **Trigger Points:**
  - Header Cart Icon with item count badge.
  - "Add to Cart" or "Pre-Order Now" CTA on `/shop`, `/preorder`, or homepage product sections.
- **Drawer State (`CartContext`):**
  - Items array: `[{ id, name, finish, size, price, quantity, image }]`
  - `isOpen`: boolean state
  - Functions: `addItem(item)`, `removeItem(id)`, `updateQuantity(id, delta)`, `clearCart()`, `openCart()`, `closeCart()`
- **Framer Motion Animation:**
  - Overlay backdrop: `initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} duration: 0.3s`
  - Drawer panel: `initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}`
- **Persistence:** LocalStorage key `aion_cart_v1` preserves items across page reloads.

---

## 3. Product Configurator & Finish Selector

- **Finish Selector:**
  - 3 Finishes: Midnight (`#1A1F2C`), Silver (`#DCDDE1`), Rose Gold (`#E6B8A2`).
  - Active finish pill displays ring outline, title, finish description, and dynamically switches the high-resolution render.
- **Sizing Selector:**
  - Option A: "Send Free Sizing Kit First" (Recommended default for pre-orders).
  - Option B: Explicit US Ring Sizes: 6, 7, 8, 9, 10, 11, 12, 13.
- **Interactive Lifestyle Tabs:**
  - Context switch: "Move" (Black / Activity), "Rest" (Silver / Sleep), "Morning" (Rose Gold / Vitality). Each triggers the matching video or high-res photo showcase.

---

## 4. Digital Sizing Guide & Card Calibration

- **Interactive Modal:**
  - Triggered by "Find your size with camera" or "Need help sizing?".
  - 3-Step Guided flow:
    1. Remove all jewelry from target finger.
    2. Place standard credit/bank card flat on palm (calibrated reference standard of 85.6mm).
    3. View comparison guide or interactive ring diameter slider.
  - Full conversion table: US Size, UK letter, EU number, Inner Diameter (mm), Circumference (mm).

---

## 5. FAQ Accordions

- **Component Behavior:**
  - Smooth expansion/collapse via CSS grid / max-height or Framer Motion layout.
  - Filter categories: "All Questions", "The Hardware", "Accuracy & Sensors", "Sizing & Fit", "Pre-Order & Shipping".
  - Clean `ChevronDown` rotation (`rotate-180`) upon toggle.

---

## 6. Checkout Demonstration Flow (`/checkout`)

- **Step 1: Contact & Shipping Address:**
  - Form validation for Email, First Name, Last Name, Street Address, City, Country, ZIP.
- **Step 2: Shipping Method:**
  - Standard Ground (Free, 3-5 business days post-production)
  - Priority Express ($15 USD)
- **Step 3: Payment Simulation:**
  - Card number, Expiry, CVC, ZIP (Frontend validated simulation).
  - Promo code field with support for referral codes (e.g., `FOUNDER50`, `WELLNESS`).
  - Order success screen with reservation confirmation number and sizing kit dispatch notice.

---

## 7. Cookie Banner & Compliance

- **Floating banner** positioned `fixed bottom-4 left-4 right-4 max-w-2xl z-50`.
- Buttons: "Accept All Cookies", "Essential Only".
- Stored in `localStorage` under `aion_cookie_consent`.

