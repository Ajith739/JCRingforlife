# Animation & Interaction Reference Audit: aiOn Smart Ring

**Reference Website:** [https://www.aionrings.com/](https://www.aionrings.com/)  
**Audit Date:** November 2026  
**Auditor:** Senior GSAP & Motion Design Reverse-Engineering Specialist  

---

## 1. Animation Architecture Overview

The animation philosophy of aiOn is **calm, intentional, and medical-grade**. It strictly avoids dizzying 3D tumbling, aggressive parallax snapping, or distracting UI bouncing. Every motion serves to convey clarity, autonomic calmness, and physiological rhythm.

The implementation utilizes a hybrid stack:
1. **GSAP + ScrollTrigger / Framer Motion:** For scroll-triggered view thresholds, staggered entry timelines, and SVG path drawing.
2. **Hardware-Accelerated CSS Transitions:** For long-duration video zooms (`1200ms`), button brightness states, and swatch pill morphing.
3. **SVG Interpolation:** For circular gauge percentages, ECG pulse tracing, and downward trend line reveals.

---

## 2. Verified Animation Inventory

| Animation | Trigger Point | Start State | End State | Duration / Easing | Verified Technical Implementation |
|---|---|---|---|---|---|
| **Hero Entrance** | Initial Page Load | `opacity: 0, y: 30px` | `opacity: 1, y: 0` | 0.8s easeOut, delay: 0.1s–0.4s | Staggered fade and slide for eyebrow, headline, CTA, and studio image. |
| **Section Entrances** | Scroll enters 15% viewport | `opacity: 0, y: 30px` | `opacity: 1, y: 0` | 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) | Reusable `whileInView` with `viewport: { once: true, margin: '-40px' }`. |
| **Heartbeat ECG Tracing** | Section 2 scroll into view | `pathLength: 0, opacity: 0` | `pathLength: 1, opacity: 1` | 1.8s easeInOut | SVG path stroke animation with blue drop-shadow (`#1878E0`). |
| **Vitality Gauge & Counter** | Section 3 scroll into view | Ring offset: 1.0; Score: 0 | Ring offset: 0.16; Score: 84 | 1.5s easeOut; 25ms timer interval | Circular SVG dual stop gradient `#v2grad` + integer count-up. |
| **Approach Arrow Connectors** | Section 4 scroll into view | `opacity: 0, x: -6px` | `opacity: 1, x: 0` | 0.5s easeOut, delay: 0.3s | Arrow indicator linking Track $\to$ Understand $\to$ Act. |
| **6-Card Signals Expanders** | Card click (`#signals`) | Height: 0, opacity: 0 | Height: auto, opacity: 1 | 0.3s easeInOut | Border turns `#1878E0`, shadow elevates to 50px glow, `TAP TO EXPAND` toggles to `TAP TO CLOSE`. |
| **HRV Trend Line** | Section 8 scroll into view | `pathLength: 0` | `pathLength: 1` | 1.6s easeInOut; alert pill delay 0.8s | Amber alert badge fades in with subtle translateY(10px). |
| **In-Life Video Hover Zoom** | Mouse hover on cards | `scale(1)` | `scale(1.03)` | 1200ms ease | Smooth unhurried zoom preventing video stuttering. |
| **Pre-Order Ring Preview Carousel** | Chevron click / swatch click | `opacity: 0, scale: 0.98` | `opacity: 1, scale: 1` | 500ms fade-in | Active indicator dot expands from `w-2` to `w-6 bg-primary`. |
| **Pulse Beacon on Final CTA** | Continuous infinite loop | `box-shadow: 0 0 0 0px rgba(24, 120, 224, 0.4)` | `box-shadow: 0 0 0 20px rgba(24, 120, 224, 0)` | 2.2s ease-out infinite | Gentle pulsating halo drawing focus to pre-order button. |
| **Accordion Plus-to-Cross** | FAQ toggle click | `rotate(0deg)` | `rotate(45deg)` | 300ms ease | Smooth rotation of `+` symbol into `×`. |

---

## 3. Performance & Stability Guidelines

- **Clean Animation Contexts:** All event listeners and timers must be cleaned up on component unmount.
- **`prefers-reduced-motion` Support:** Critical for accessibility; CSS transitions and Framer Motion respect reduced motion settings.
- **Zero Layout Shift:** Elements with expandable content use height interpolation within `overflow: hidden` wrappers.

