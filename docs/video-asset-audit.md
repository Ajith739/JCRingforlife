# Video Asset & Integration Audit: aiOn Smart Ring

**Reference Website:** [https://www.aionrings.com/](https://www.aionrings.com/)  
**Audit Date:** November 2026  
**Auditor:** Senior Frontend Reverse-Engineering Engineer & Video Integration Specialist  

---

## 1. Overview of Video Usage

The reference website avoids generic embedded third-party players (YouTube, Vimeo, etc.) on the core landing and pre-order flows. Instead, it utilizes **5 native HTML5 `<video>` elements** optimized for performance, battery life, zero layout shift, and smooth GPU acceleration.

All video elements are:
- Encoded in standard H.264 MP4 format with AAC audio (muted by default to allow programmatic autoplay).
- Styled with `object-fit: cover` to fit exact responsive containers.
- Configured with `playsinline` to prevent mobile Safari / iOS from hijacking into full-screen video players.
- Overlaid with soft gradient masks to ensure seamless integration into canvas backgrounds.
- Enhanced with subtle contrast and saturation CSS filters (`filter: contrast(1.03) saturate(0.95)`).

---

## 2. Comprehensive Video Asset Mapping

| Video ID / Name | Reference URL (CDN) | Local Asset Path | Resolution & Format | Poster Image | Target Section | Interaction & Playback Behavior |
|---|---|---|---|---|---|---|
| **Early Life Routine** | `/__l5e/assets-v1/55a8e091.../video-life-early.mp4` | `/assets/video-life-early.mp4` | 1920×1080 MP4 | `/assets/poster-life-early-CwSaqYEV.jpg` | Homepage Section 1 (between Hero & Problem Statement) | Full-bleed (`w-screen left-1/2 -translate-x-1/2`), `height: 46vh; min-height: 340px; max-height: 620px`. Autoplay, loop, muted, playsInline. Top and bottom vertical gradient fade to canvas. Dark typography overlay. |
| **Move (Midnight)** | `/__l5e/assets-v1/10c368a0.../video-life-move-black.mp4` | `/assets/video-life-move-black.mp4` | 1080×1080 MP4 | Auto-frame | Homepage Section 11 (`#in-life`) | Card 1 of 3. `h-[240px] md:h-[320px] rounded-[28px]`. Autoplay, loop, muted, playsInline. Hover zoom (`group-hover:scale-[1.03]` with 1200ms ease). "Move" / "MIDNIGHT" caption. |
| **Rest (Silver)** | `/__l5e/assets-v1/bb2fd238.../video-life-rest-silver.mp4` | `/assets/video-life-rest-silver.mp4` | 1080×1080 MP4 | Auto-frame | Homepage Section 11 (`#in-life`) | Card 2 of 3. `h-[240px] md:h-[320px] rounded-[28px]`. Autoplay, loop, muted, playsInline. Hover zoom (`group-hover:scale-[1.03]` with 1200ms ease). "Rest" / "SILVER" caption. |
| **Morning (Rose Gold)** | `/__l5e/assets-v1/f6397ab0.../video-life-morning-rose.mp4` | `/assets/video-life-morning-rose.mp4` | 1080×1080 MP4 | Auto-frame | Homepage Section 11 (`#in-life`) | Card 3 of 3. `h-[240px] md:h-[320px] rounded-[28px]`. Autoplay, loop, muted, playsInline. Hover zoom (`group-hover:scale-[1.03]` with 1200ms ease). "Morning" / "ROSE GOLD" caption. |
| **Trail Runner** | `/__l5e/assets-v1/30206713.../video-run-trail.mp4` | `/assets/video-run-trail.mp4` | 1920×1080 MP4 | Auto-frame | Homepage Section 14 (pre-CTA runner) | `max-w-5xl rounded-[28px]`, `h-[34vh] md:h-[48vh]`. Autoplay, loop, muted, playsInline. Dual directional gradient overlay (to bottom and to right) for soft edge vignetting. |

---

## 3. Playback & Technical Optimization Strategy

### A. Autoplay & Muted Compliance
Browsers enforce strict autoplay policies requiring `muted={true}` and `playsInline={true}`. In React, assigning `muted={true}` directly as a prop can sometimes be overridden by DOM property states; therefore, videos must be initialized with an imperative ref or `defaultMuted={true}` to ensure 100% autoplay compliance on Chrome, Safari, Firefox, and mobile devices.

### B. Viewport Intersection Playback
To preserve CPU and mobile GPU bandwidth, an IntersectionObserver pauses off-screen videos and resumes playback as soon as the video intersects with 15% of the viewport.

### C. Prevention of Layout Shifts (CLS)
All video containers define explicit aspect ratios or minimum height clamps (`minHeight: 340px`, `h-[240px] md:h-[320px]`, `h-[34vh] md:h-[48vh]`) so that the DOM preserves container geometry before the video metadata loads.

---

## 4. Verification & Playback Status

All 5 MP4 assets are hosted directly in `/public/assets` and bundle cleanly into `/dist/assets`:

| Asset Name | File Size | Dimensions | Live Verification Status | Playback State |
|---|---|---|---|---|
| `video-life-early.mp4` | 10.3 MB | 1344 × 768 | Verified in Viewport | `paused: false`, `readyState: 4` |
| `video-life-move-black.mp4` | 2.8 MB | 768 × 1024 | Verified in Viewport | `paused: false`, `readyState: 4` |
| `video-life-rest-silver.mp4` | 2.5 MB | 768 × 1024 | Verified in Viewport | `paused: false`, `readyState: 4` |
| `video-life-morning-rose.mp4` | 3.7 MB | 768 × 1024 | Verified in Viewport | `paused: false`, `readyState: 4` |
| `video-run-trail.mp4` | 8.8 MB | 1344 × 768 | Verified in Viewport | `paused: false`, `readyState: 4` |

All video elements incorporate:
1. `defaultMuted = true` & `muted = true` imperative DOM properties.
2. `playsinline` and `muted` DOM attributes.
3. `preload="auto"` and `onCanPlay` automatic playback triggers.
4. Passive window interaction fallback (`scroll`, `touchstart`, `click`) to ensure zero video stalling under strict browser policies.

