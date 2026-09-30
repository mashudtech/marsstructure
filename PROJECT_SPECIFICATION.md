# MARS Structure Limited — Modern Website Re-Development
## Executive Layout Blueprint & Technical Requirement Specification (v2.1)

**Project Name**: MARS Structure Limited Web Re-Development  
**Current Phase**: Phase 1 — UI/UX Layout Blueprint & Interactive Static Prototype  
**Future Phase**: Phase 2 — Vue.js Frontend & SQLite Dynamic Architecture  
**Target Domain**: [https://marsstructureltd.com/](https://marsstructureltd.com/)  
**Design References**: [RIO Property](https://www.rioproperty.co.za/) | [Vista Properties](https://www.vistaprops.com/) | [Huts.com](https://huts.com/)

---

## 1. Brand Identity & Color Theme (Derived from New Logo)

The new **MSL (MARS Structure Limited)** identity establishes a refined balance of **structural strength** and **modern architectural luxury**. All elements of the web layout follow this color and styling hierarchy:

### Core Color Palette Table

| Role | Color Name | Hex Code | Purpose / UI Application |
| :--- | :--- | :--- | :--- |
| **Primary Brand** | Royal Maroon / Deep Burgundy | `#7B1824` | Base Roof & Bold Wordmark, Primary CTAs, Dark Accent Elements |
| **Secondary Accent** | Warm Amber / Imperial Gold | `#E5A922` | Metallic 'S' Curve, Active Badges, Spec Accents, Hover Highlights |
| **Gold Hover Tint** | Radiant Champagne Gold | `#F3C843` | Button Hover States, Glow Rings, Subtle Border Shimmers |
| **Rich Dark Accent** | Burgundy Noir (Contrast Deep) | `#14080B` | Preloader Canvas, Prestige Footers, Top Utility Bar, Dark Cards |
| **Luxury Canvas (Light)** | Warm Alabaster / Ivory Linen | `#FAF7F2` | Editorial Artbook Background (eliminates stark pure white) |
| **Card Surface** | Pure Architectural White | `#FFFFFF` | Project Cards, Modals, Light Forms, Technical Spec Cards |
| **Subtle Borders** | Warm Sand / Golden Hairline | `#E8DFD3` | Delicate 1px Section Dividers & Card Edges |
| **Primary Body Text** | Deep Charcoal Slate | `#2B2B2B` | High-contrast, fatigue-free readable body text |
| **Muted Text / Specs** | Refined Slate Bronze | `#6B6560` | Technical Spec Values, Micro-labels, Timestamps |

---

## 2. Standardized High-Performance Typography System

> [!IMPORTANT]
> **Performance & Loading Speed Guarantee**:  
> To prevent web fonts from slowing down page load times or causing Layout Shifts (CLS), we utilize a **streamlined 2-font system** using modern **Variable Font WOFF2 format**, CDN preconnect hints, and `font-display: swap`. Total font payload is kept under **~45KB**.

### Font Family Selection

| Role | Font Family | Formats & Subset | Weights Used | Performance Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Headings & Display** | `Playfair Display` | Variable WOFF2 (`latin`) | 600, 700 | Editorial luxury serif; loaded with `font-display: swap` for instant initial rendering. |
| **Body, Specs, UI & Badges** | `Plus Jakarta Sans` | Variable WOFF2 (`latin`) | 400, 500, 600, 700 | Modern geometric sans-serif; single variable file serves all weights, zero network bloat. |
| **System Fallback Stack** | `system-ui, -apple-system, 'Segoe UI', Georgia, serif` | Native OS Fonts | Instant | Seamless fallback match matching font metrics to prevent layout shifts. |

### Font Optimization Directives in HTML
```html
<!-- DNS Preconnect to Google Font CDN -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Consolidated Single-Request Font Call with font-display: swap -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600..700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Responsive Typography Scale Table (CSS Clamp)
* **Display H1 (Hero)**: `clamp(2.5rem, 5vw + 1rem, 4.25rem)` (40px to 68px) | Line Height: `1.15`
* **Section Title H2**: `clamp(2.0rem, 3.5vw + 0.8rem, 3.0rem)` (32px to 48px) | Line Height: `1.20`
* **Card Title H3**: `clamp(1.35rem, 2vw + 0.5rem, 1.85rem)` (21px to 30px) | Line Height: `1.30`
* **Body Text**: `clamp(0.95rem, 0.25vw + 0.9rem, 1.05rem)` (15px to 17px) | Line Height: `1.65`
* **Stat Numbers**: `clamp(2.0rem, 3vw + 1rem, 3.25rem)` (32px to 52px) | Line Height: `1.00`
* **Capsule Badges**: `0.75rem` (`12px`) | `letter-spacing: 0.15em` | All-Caps

---

## 3. Modern Architectural Preloader Experience

To elevate the first impression and provide a **high-end, modern architectural entrance**, an animated preloader is integrated before the page reveals:

```
+-----------------------------------------------------------------------------------------+
|                                MODERN PRELOADER VISUAL FLOW                             |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|       [Deep Burgundy Noir Canvas #14080B with Ambient Radial Glow]                      |
|                                                                                         |
|                      ┌──────────────────────────┐                                       |
|                      │    MSL ARCHITECTURAL     │   <-- SVG Outline Animation           |
|                      │      GOLDEN EMBLEM       │       (Golden Stroke Draw)            |
|                      └──────────────────────────┘                                       |
|                                                                                         |
|                         MARS STRUCTURE LIMITED                                          |
|                     — Building Dreams, Creating Futures —                               |
|                                                                                         |
|                     [============== 78% =============]   <-- Golden Hairline Loader     |
|                                                                                         |
|       [Curtain Split / Slide-up Curtain Reveal: transform: translateY(-100%)]           |
+-----------------------------------------------------------------------------------------+
```

### Preloader Specifications & Performance Safeguards:
1. **Visual Elements**:
   * Background: Deep Burgundy Noir (`#14080B`) with an ambient central gold illumination.
   * Centerpiece: High-contrast **MSL Logo Icon** with a subtle golden stroke drawing effect.
   * Progress Line: Ultra-thin 2px hairline loader in Imperial Gold (`#E5A922`) with smooth ease-out counter (`0% -> 100%`).
   * Brand Tagline: *"Building Dreams, Creating Futures"* emerging smoothly with a 300ms fade.
2. **Transition Animation (The "Curtain Exit")**:
   * Once assets are initialized (duration: **0.8s to 1.2s max**), the preloader curtain smoothly slides upward (`transform: translateY(-100%)` with `cubic-bezier(0.77, 0, 0.175, 1)`), elegantly unveiling the Hero Viewport beneath.
3. **Performance & UX Failsafe Rules**:
   * **Hard Timeout Safeguard**: Set to a maximum of `1.5s` via `setTimeout()`. Even on slow 3G network connections, the preloader will automatically dismiss itself so the user is never kept waiting.
   * **Session Storage Intelligence**: Once the user views the preloader on their first visit, `sessionStorage.setItem('mars_intro_seen', 'true')` is set. On subsequent inner-page clicks or refreshes, the preloader is bypassed for instant loading.

---

## 4. Unified "Lucrative" Button System

All buttons share a cohesive, high-end architectural aesthetic. They incorporate **liquid fill animations, gold hairline borders, and subtle metallic sheen hover effects**:

### Button Variants

```
+---------------------------------------------------------------------------------------------------+
|  [PRIMARY BUTTON]      Royal Maroon Background (#7B1824) + Gold Sheen Border + Slide-in Arrow    |
|  [SECONDARY BUTTON]    Imperial Gold Background (#E5A922) + Maroon Text + Metallic Shimmer       |
|  [OUTLINE LUXURY]      Transparent BG + 1.5px Gold/Maroon Border + Hover Invert Fill             |
|  [EDITORIAL TEXT LINK] Underline expands dynamically from 0% to 100% on hover with offset        |
+---------------------------------------------------------------------------------------------------+
```

1. **Primary Luxury CTA (The "Signature" Button)**:
   * **Base Style**: Solid Royal Maroon (`#7B1824`), crisp white typography (`Plus Jakarta Sans` 600, 14px uppercase), soft gold outline ring (`1px solid rgba(229, 169, 34, 0.35)`).
   * **Shape**: Rounded Architectural Pill (`border-radius: 50px`) or tailored 4px radius.
   * **Hover Interaction**: Background deepens to `#60111A`, soft gold drop-glow (`box-shadow: 0 8px 24px rgba(123, 24, 36, 0.35)`), and the trailing SVG arrow translates 4px right (`transform: translateX(4px)`).
   * **Usage**: *"Schedule Private Viewing"*, *"Inquire on Project"*, *"Submit Inquiry"*.

2. **Secondary Gold Button (High-Conversion Variant)**:
   * **Base Style**: Radiant Imperial Gold (`#E5A922`), dark burgundy text (`#14080B`), subtle gold drop shadow.
   * **Hover Interaction**: Shifts to Radiant Champagne (`#F3C843`) with subtle scale (`1.02x`).
   * **Usage**: Top utility actions, urgent call-to-actions, featured floor plan downloads.

3. **Outline Luxury Button (Sophisticated Secondary Action)**:
   * **Base Style**: Transparent canvas with a clean 1.5px Maroon or Gold border.
   * **Hover Interaction**: Floods from bottom to top with solid color, inverting text to white.
   * **Usage**: *"Explore All Projects"*, *"Download Architectural Brochure"*, *"View Masterplan"*.

4. **Editorial Text Link**:
   * Clean inline text with animated hairline underline expanding from 0% to 100% from center.

---

## 5. Header Architecture (Two-Tier Structure — Cleaned)

*Note: Head Office Location / Address is removed from the Top Bar to ensure an uncluttered, modern look.*

```
+----------------------------------------------------------------------------------------------------+
| [TOP UTILITY BAR]       📞 +880 1844 020600   |   ✉ info@marsstructureltd.com          [Socials ↗] |
+----------------------------------------------------------------------------------------------------+
| [MAIN STICKY BAR] [NEW MSL LOGO]    Home   About   Properties ▾   Locations   Standards   Contact  [Book Viewing] |
+----------------------------------------------------------------------------------------------------+
```

### A. Top Header Part (Utility Bar)
* **Background**: Deep Charcoal Maroon (`#14080B`) with a delicate bottom border (`1px solid rgba(229, 169, 34, 0.2)`).
* **Left**:
  * **Direct Hotline**: Phone icon with click-to-call link `+880 1844 020600` (Hover: turns imperial gold).
  * **Separator**: Subtle gold dot `•`.
  * **Corporate Email**: `info@marsstructureltd.com` (click-to-mail).
* **Right**:
  * **Social Media Vector Links**: Facebook, Instagram, LinkedIn, YouTube with subtle gold hover states.
* **Responsive Behavior**: On small mobile devices (<576px), email is hidden to prioritize the tap-to-call phone number and social icons.

### B. Main Header Part (Sticky Navigation Bar)
* **Background**: Crisp Pure White (`#FFFFFF`) with frosted glass backdrop on scroll (`rgba(255, 255, 255, 0.95)` with `backdrop-filter: blur(12px)`).
* **Brand Area (Left)**:
  * The new **MSL MARS Structure Limited** logo (high-resolution, correct aspect ratio, linked to `index.html`).
* **Navigation Links (Center)**:
  * `Home`
  * `About Us`
  * `Properties ▾` (Dropdown: *All Projects*, *Ongoing*, *Upcoming*, *Completed*)
  * `Property Locations` (Jolshiri Abashon & Dhaka)
  * `Engineering Standards` (BUET Vetted Structural Integrity & Safety)
  * `Contact Us`
* **Navigation Link Hover**:
  * Animated bottom underline expands from center (`0% -> 100%`) in Imperial Gold (`#E5A922`), accompanied by a 200ms ease color shift.
* **Right CTA**:
  * Primary Luxury Button: `Book a Viewing` or `Inquire Now`.
* **Mobile Hamburger**:
  * Clean architectural 2-line animated menu icon on tablet/mobile screens.

---

## 6. Homepage Layout Scratch (Section-by-Section)

```
+------------------------------------------------------------------------------------------+
| 0. ARCHITECTURAL PRELOADER (MSL Golden Emblem Animation + Curtain Reveal Exit)           |
+------------------------------------------------------------------------------------------+
| 1. TWO-TIER HEADER (Clean Top Contact Bar + Main Sticky Navigation)                      |
+------------------------------------------------------------------------------------------+
| 2. HERO VIEWPORT (Editorial Typography + Parallax Architectural Visual — NO VIDEO)       |
|    - Overline Tag: [ PREMIER REAL ESTATE & ARCHITECTURAL DEVELOPMENT ]                   |
|    - Headline: "Crafting Timeless Living. Engineering Future Legacies."                  |
|    - Subtext: Highlighting single-unit luxury residences in Jolshiri Abashon             |
|    - Button Group: [Explore Residences] (Maroon) | [Request Floor Plans] (Outline)       |
|    - Floating Live Badge: "Featured: Bayt-Al Noor | 2,850 Sft Single-Unit Living"        |
+------------------------------------------------------------------------------------------+
| 3. LIVE CREDIBILITY & METRICS RIBBON (Bootstrap 4-Col Counter Ribbon)                    |
|    25,000+ Sft Built  |  1,50,000+ Sft Pipeline  |  18+ Prime Properties  |  100% Safety |
+------------------------------------------------------------------------------------------+
| 4. BRAND PHILOSOPHY / ABOUT TEASER (Two-Column Asymmetric Architectural Split)           |
|    - Left: Sticky architectural image card with gold accent frame & BUET vetted badge   |
|    - Right: Story of MARS Structure Limited, engineering rigor, sustainable aesthetics   |
|    - Link CTA: "Discover Our Corporate Journey →"                                        |
+------------------------------------------------------------------------------------------+
| 5. SIGNATURE PROJECTS SHOWCASE (Interactive Tabbed Filter + Architectural Cards)         |
|    - Category Tabs: [ All Projects ] [ Ongoing ] [ Upcoming ] [ Jolshiri Abashon ]       |
|    - Featured: Bayt-Al Noor, Nur-Anu Oasis, Monowara, Shanti Nibash, Bayat-Al Barakah     |
|    - Spec Pills: 5 Katha | B+G+9 Floor | 2850 Sft | 9 Apts | 10 Parking | South Facing  |
|    - Button: [ View Specifications & Floor Plans ] (Uniform Primary CTA)                 |
+------------------------------------------------------------------------------------------+
| 6. VALUE PILLARS & SOLUTIONS (4-Card Grid with Hover Sheen)                              |
|    - 01. Architectural Mastery & Single-Unit Exclusivity                                 |
|    - 02. Eco-Friendly, Biophilic & Cross-Ventilated Design                               |
|    - 03. Ironclad Investment Security & Clear Approvals                                  |
|    - 04. Prime Strategic Locations in Jolshiri Smart City                                |
+------------------------------------------------------------------------------------------+
| 7. LOCATION SPOTLIGHT: JOLSHIRI ABASHON (Interactive Masterplan & Sector Directory)      |
|    - Visual map mapping Sector 8, 9, 12, 13A developments + proximity metrics            |
+------------------------------------------------------------------------------------------+
| 8. VIP CONSULTATION & LANDOWNER PARTNERSHIP (High-Contrast Maroon & Charcoal Section)    |
|    - Clean consultation form + Direct WhatsApp hotline link                              |
+------------------------------------------------------------------------------------------+
| 9. PRESTIGE FOOTER (Newsletter Subscription + Project Directory + Office Coordinates)    |
+------------------------------------------------------------------------------------------+
```

---

## 7. Full Responsiveness Specifications (All Devices)

```
+-----------------------------------------------------------------------------------------+
|                               RESPONSIVE BREAKPOINT BEHAVIOR                            |
+-----------------------------------------------------------------------------------------+
|  Device Tier             |  Width Range      |  Layout Adaptations                      |
+--------------------------+-------------------+------------------------------------------+
|  Extra Large Desktop     |  1440px and above |  Container max-width: 1320px;            |
|                          |                   |  Generous white space, full animations.  |
+--------------------------+-------------------+------------------------------------------+
|  Standard Desktop/Laptop |  992px to 1439px  |  Standard 12-col Bootstrap container;    |
|                          |                   |  Full menu, standard hover states.      |
+--------------------------+-------------------+------------------------------------------+
|  Tablets (Landscape/Port)|  768px to 991px   |  Main navigation collapses into drawer;  |
|                          |                   |  Cards stack to 2 columns; spec pills    |
|                          |                   |  wrap cleanly into 3x2 rows.             |
+--------------------------+-------------------+------------------------------------------+
|  Mobile Phones           |  320px to 767px   |  Top bar condenses to phone + socials;   |
|                          |                   |  Single column cards; full-width buttons;|
|                          |                   |  Off-canvas luxury slide-out menu;       |
|                          |                   |  Sticky bottom quick-call bar.           |
+-----------------------------------------------------------------------------------------+
```

### Key Responsive Features:
1. **Off-Canvas Mobile Navigation Drawer**:
   * Smooth slide-in from right with dark backdrop blur.
   * Displays the new logo at the top.
   * Accordion-style sub-menus for property types.
   * Embedded tap-to-call button and social links at drawer bottom.
2. **Touch-Optimized Project Cards**:
   * Spec badges stack into an auto-flowing grid with minimum 44px tap targets.
   * Clean horizontal swiping on mobile for project galleries.
3. **Sticky Bottom Mobile Action Bar**:
   * On mobile screens, a subtle floating bottom bar appears with:
     * `[ 📞 Call Hotline ]` | `[ 💬 WhatsApp ]` | `[ ✉ Inquire ]`

---

## 8. Inner Pages Layout Blueprint

### 1. About Us Page (`about.html`)
* **Hero Banner**: Architectural render with brand philosophy statement.
* **Corporate Journey & Scale**: Timeline from establishment to 1,50,000+ sft development pipeline.
* **Executive Leadership Message**: Dedication to design excellence, customer trust, and transparency.
* **Engineering Standards Matrix**: BUET vetting, Grade 60/500W steel standards, earthquake resilience measures.

### 2. Property Portfolio Page (`property.html`)
* **Filter Ribbon (Sticky below header)**:
  * Status: `All` | `Ongoing Construction` | `Upcoming Projects` | `Completed`
  * Sector: `Sector 08` | `Sector 09` | `Sector 12` | `Sector 13A`
  * View Toggle: `Grid View` vs `Compact Spec List View` (*inspired by RIO Property*).
* **Project Cards Grid**: Responsive 2-column or 3-column cards with uniform buttons and hover states.

### 3. Single Property Detail Page (`property_detail.html`)
* **Gallery & Elevation Preview**: High-res multi-image gallery with lightbox popup.
* **Sticky Spec Ribbon**: Fixed bar displaying Unit Size, Availability, and *"Download Brochure"* button.
* **Architectural Matrix**: Comprehensive table with room breakdowns (4 Bed, 4 Bath, Dining, Family Living, 4 Balconies, Maid Suite).
* **Interactive Floor Plan Viewer**: Switch between Ground Floor Parking, Typical Floor Plan (2850 Sft), and Rooftop Lounge.
* **Direct Property Inquiry Form**: Embedded form pre-filled with the project name for immediate lead capture.

### 4. Property Locations Page (`property-location.html`)
* Interactive sector guide focusing on **Jolshiri Abashon**, connectivity to the 300 Feet Expressway, and nearby schools/hospitals.

### 5. Contact & Consultation Page (`contact.html`)
* Left: Corporate Head Office address, hotline, direct WhatsApp link, and embedded map.
* Right: Clean inquiry form with dropdowns for buyers vs landowners.

---

## 9. Scroll & Motion Specifications (No Video)

| Element | Motion / Scroll Interaction | Reference Inspiration |
| :--- | :--- | :--- |
| **Page Scrolling** | **Lenis Smooth Scroll** provides a frictionless, weighted feel. | *RIO Property / Vista Props* |
| **Hero Image** | Subtle parallax scale (`1.08 -> 1.0`) on initial scroll down. | *Vista Props* |
| **Section Headings** | Split-text mask reveal (`translateY` from hidden overflow). | *Vista Props* |
| **Project Cards** | Micro-zoom on image (`1.0 -> 1.04`) with gold hairline border illumination on hover. | *Huts.com* |
| **Sticky Header** | Main bar sticks smoothly with frosted glass backdrop blur upon scrolling up. | *Huts.com / Vista Props* |
| **Counters** | Smooth ease-out numerical count-up triggered on viewport intersection. | Standard JS / GSAP |

---

## 10. Technology Roadmap & Evolution

* **Current Stage (Static Prototype)**: Semantic HTML5, CSS3 with Custom Variables, Vanilla JS with Lenis scroll, Bootstrap 5 for responsive grid & off-canvas drawer.
* **Next Stage (Dynamic Platform)**: Migration into **Vue.js** for reactive component rendering, dynamic category/location filtering, and lightweight **SQLite** backend database integration for property data and customer inquiry management.
