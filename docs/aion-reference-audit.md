# aiOn Website Reference Audit

**Reference URL:** `https://www.aionrings.com/`  
**Brand:** aiOn (aiOn Health Science LLC · A Mazo Solutions Inc company)  
**Product:** aiOn Smart Wellness Ring (Founder Edition)  
**Category:** Smart Ring / Wearable Health & Wellness Technology  
**Audit Date:** November 2026  

---

## 1. Executive Summary

aiOn is a premium, AI-native smart wellness ring engineered from aerospace-grade titanium with medical-grade hypoallergenic inner molding. Unlike competitors that overwhelm users with disconnected charts or charge mandatory monthly subscriptions, aiOn's core value proposition is **"The Full Circle of Health"**: synthesising 8 continuous physiological data streams into **one daily Vitality Score (0-100)** and **one personalized daily action (Quest)**.

The website is a high-performance, single-page application built on React, Vite, Tailwind CSS, Framer Motion, and Lucide React. It pairs minimalist luxury aesthetics with medical/scientific clarity, utilizing clean typography, subtle glassmorphism, fluid interactive 3D-like finish selectors, video loops, interactive sizing tools, and a seamless sliding cart drawer.

---

## 2. Technology Stack & Infrastructure

- **Framework:** React 18 / Vite
- **Routing:** React Router v6 (SPA with client-side history, deep hash link smooth scrolling, and scroll-to-top on route change)
- **Styling:** Tailwind CSS with CSS variable design system (`hsl(var(--...))`), custom brand gradients, and ultra-fine border treatments
- **Motion & Transitions:**
  - Framer Motion for cart drawer slide-overs, cookie consent banners, filter switches, and stagger animations
  - GSAP / CSS scroll triggers for parallax photo banners and smooth section transitions
- **Icons:** Lucide React (`ChevronDown`, `ChevronRight`, `Check`, `ShoppingBag`, `Sparkles`, `Shield`, `Heart`, `Moon`, `Activity`, `Thermometer`, `Zap`, `X`, `ExternalLink`, etc.)
- **State Management:** React Context API (`CartProvider`, `ToastProvider`)
- **Metadata & SEO:** Canonical tags, Open Graph, Twitter Cards, JSON-LD Schema (`Product`, `Organization`, `WebSite`, `FAQPage`)

---

## 3. Product Offerings & Commercial Strategy

### aiOn Ring (Founder Edition)
- **Pre-Order Pricing:** \$149 USD (Standard MSRP: \$199 USD) — Saves \$50 (25% off)
- **Finishes:**
  1. **Midnight** (PVD matte deep black)
  2. **Silver** (Brushed aerospace natural titanium)
  3. **Rose Gold** (Warm champagne rose finish)
- **Sizing Strategy:**
  - Standard US Sizes 6 through 13
  - Free Sizing Kit included with every order before ring shipment
  - Option to choose "Send Free Sizing Kit First" or select a confirmed size directly
  - Interactive Digital Sizing Tool (Camera / Card calibration helper)
- **Membership Model:**
  - **aiOn Vitals:** 100% Free Lifetime with Ring (Heart Rate, HRV, SpO₂, Skin Temperature, Sleep Stages, Recovery Score, Stress Balance, Vitality Score, Daily Quest)
  - **aiOn Plus (Optional):** Advanced biomarker AI forecasting, biological age velocity, personalized longevity protocols ($59/year after free 6-month trial)

---

## 4. Key Architectural Components

1. **Global Header & Navigation:**
   - Sticky glassmorphic header (`rgba(255,255,255,0.82)`, `backdrop-blur(20px)`, thin border on scroll)
   - SVG vector brand logo with optional tagline
   - Desktop navigation links (`How It Works`, `Signals`, `The App`, `The Ring`, `FAQ`, `Smart Ring Guide`)
   - Pre-Order gradient action button (`Pre-Order →`)
   - Cart icon with dynamic count badge
   - Mobile slide-down / overlay menu with full navigation routes

2. **Cart Slide-Over Drawer:**
   - Framer Motion spring slide-in from right (`x: 100% -> 0`)
   - Itemized line items with finish thumbnail, size label, unit price, quantity increment/decrement, and remove action
   - Subtotal calculation, free shipping indicator, and checkout action link
   - Cart persistence in React state and local storage

3. **Parallax Media Banners:**
   - Full-bleed widescreen lifestyle imagery (`Movement · Activity: "Health doesn't live in a dashboard."`)
   - Nocturnal rest imagery (`Sleep · Recovery: "The quietest hours shape the loudest days."`)
   - Responsive aspect ratios and smooth background positioning

4. **Interactive Finish & Ring Showcase:**
   - Interactive finish picker (Midnight, Silver, Rose Gold) switching high-res renders and ambient background highlights
   - 3-mode life contextual preview ("Move", "Rest", "Morning")

5. **Science & Signals Interactive Grid:**
   - 4 Core Pillars: Heart & Circulation, Sleep & Recovery, Stress & Autonomic, Temperature & Metabolic
   - Expandable modal/accordion with sensor details (dual PPG, negative temperature coefficient thermistor, 3D accelerometer)

6. **Interactive FAQ Accordion:**
   - Animated open/close states
   - Filterable tabs (All, Hardware, Sizing, Membership, Shipping)

7. **Footer & Compliance System:**
   - 3-column layout with brand story, product links, company legal links, social channels (YouTube, LinkedIn, Facebook, X/Twitter, Instagram), and FDA general wellness disclaimers
   - Cookie consent banner with custom user choices

