# aiOn Design System Specification

## 1. Visual Philosophy & Aesthetic Tenets

The aiOn aesthetic is defined by:
- **Clean Scientific Luxury:** Pure canvas backgrounds (`#F6F8FC`), deep oceanic dark ink (`#0A1628`), soft slate text (`#3F5068`), and precision cyan/violet accents.
- **Glassmorphic Depth:** Subtle backdrops (`backdrop-blur(20px)`), frosted modal overlays, and 1px borders with delicate alpha values.
- **Micro-Delight Motion:** Gentle springs on modals and cart drawers, crisp hover transitions with subtle elevation lifts, and gradient shimmer buttons.

---

## 2. Color Palette & Tokens

### Core Brand Colors
```css
:root {
  /* Canvas & Backgrounds */
  --canvas: 216 44% 98%;          /* #F6F8FC - Signature warm crisp gray-white */
  --canvas-alt: 214 40% 96%;      /* #F0F4F8 - Section alt background */
  --background: 216 44% 98%;
  --card: 0 0% 100%;             /* #FFFFFF - Pure card white */
  --card-foreground: 215 60% 10%;

  /* Inks & Text */
  --ink: 215 60% 10%;            /* #0A1628 - Primary deep midnight ink */
  --ink-soft: 214 22% 32%;       /* #3F5068 - Secondary readable body text */
  --ink-muted: 214 16% 48%;      /* #6B7A8C - Tertiary meta labels & captions */

  /* Borders & Dividers */
  --border: 214 32% 91%;         /* #E2E8F0 - Ultra-fine structure borders */
  --input: 214 32% 91%;
  
  /* Primary & Brand Accents */
  --primary: 211 81% 47%;        /* #1878E0 - aiOn Electric Sapphire Blue */
  --primary-foreground: 0 0% 100%;
  --accent: 262 72% 52%;         /* #6D28D9 - Deep Violet Longevity Accent */
  --accent-foreground: 0 0% 100%;

  /* Hardware Finishes */
  --finish-midnight: #1A1F2C;    /* Matte Deep Midnight */
  --finish-silver: #DCDDE1;      /* Brushed Aerospace Titanium */
  --finish-rose: #E6B8A2;        /* Champagne Rose Gold */
}
```

### Signature Gradients
```css
/* Brand Button & Badge Gradient */
--gradient-brand: linear-gradient(135deg, #00A9E0 0%, #1878E0 50%, #6D28D9 100%);

/* Header & Card Accent Line */
--gradient-line: linear-gradient(90deg, #00A9E0, #1878E0, #6D28D9);

/* Ring Hero Glow */
--gradient-hero: radial-gradient(ellipse at 50% 40%, rgba(24, 120, 224, 0.14), transparent 62%);
```

---

## 3. Typography Hierarchy

- **Font Family:** `Inter`, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- **Scale:**
  - **Hero Display:** `text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-[1.08]`
  - **Section Headings:** `text-3xl md:text-5xl font-light tracking-tight leading-[1.16]`
  - **Subheadings:** `text-xl md:text-2xl font-light text-ink leading-relaxed`
  - **Body Text:** `text-[15px] md:text-[16px] text-[#3F5068] leading-relaxed font-normal`
  - **Meta / Eyebrow:** `text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-[#5A6B80]`

---

## 4. Reusable Component Classes

```css
/* Signature Brand Button */
.btn-brand {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  padding: 0.875rem 1.75rem;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  background: var(--gradient-brand);
  box-shadow: 0 10px 30px -12px rgba(23, 117, 217, 0.65);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-brand:hover {
  filter: brightness(1.06);
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  padding: 0.875rem 1.75rem;
  font-size: 15px;
  font-weight: 500;
  color: hsl(var(--ink));
  border: 1px solid hsl(var(--border));
  background: #ffffff;
  transition: all 0.2s ease;
}
.btn-secondary:hover {
  background: hsl(var(--canvas-alt));
  border-color: hsl(var(--ink-muted) / 0.4);
}
```

---

## 5. Spacing, Radii & Shadows

- **Radii:**
  - Cards: `rounded-2xl` (16px) or `rounded-3xl` (24px)
  - Interactive Pills & Buttons: `rounded-full` (9999px)
  - Micro Badges: `rounded-md` (6px)
- **Shadows:**
  - Card Shadow: `0 1px 2px rgba(10,22,40,0.04), 0 12px 32px -18px rgba(10,22,40,0.14)`
  - Glow Shadow: `0 24px 60px -24px rgba(24, 120, 224, 0.35)`

