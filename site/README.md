# Ansar Mahmood — Premium Multi-Page Marketing Website

A standalone, premium, conversion-focused marketing website for **Ansar Mahmood** —
HSE, Training, Management, AI & Data Science expert. Pure **HTML5 + CSS3 + JavaScript**,
no build step, no backend required. Designed to convert easily to React, Next.js,
WordPress or Laravel later.

Design system: **"Trust & Authority"** · Palette **Navy + Royal Blue + Cyan + Gold** ·
Fonts **Sora** (display) + **Plus Jakarta Sans** (body).

---

## File structure

```
site/
├── index.html                 # Home — 5-slide hero slider, stats, services, coaching, AI, process, testimonials
├── about.html                 # Bio, credentials, philosophy, why Ansar
├── hse-consultancy.html       # HSE systems, audits, contractor, permits, incidents, emergency
├── training.html              # HSE & leadership training, high-risk topics, methodology
├── certification-coaching.html# CSP / ASP / CRSP / PMP coaching + method
├── ai-data-solutions.html     # Dashboards, predictive analytics, AI assistants, digital HSE
├── services.html              # All services + 6 engagement packages
├── resources.html             # Blog/insights layout with category filter (placeholder articles)
├── contact.html               # Contact form (mailto), WhatsApp/Email/LinkedIn, inquiry types
├── README.md
└── assets/
    ├── css/
    │   ├── style.css          # Design tokens + all components
    │   └── responsive.css     # Breakpoints (1024 / 768 / 480)
    └── js/
        ├── main.js            # Shared header+footer injection, nav, scroll-reveal, counters,
        │                      #   back-to-top, card spotlight, mailto forms
        └── slider.js          # Home hero slider (autoplay, dots, arrows, swipe, keyboard)
```

> **Header & footer are rendered from `main.js`** into the `<div id="site-header">` and
> `<div id="site-footer">` placeholders on each page. This keeps navigation consistent
> across all 9 pages from a single source — edit `NAV` in `main.js` to change the menu
> everywhere. The active nav link is set automatically from each page's `<body data-page="...">`.

---

## Run locally

It's already inside XAMPP's web root, so just:

1. Start Apache (XAMPP).
2. Open **http://localhost/Ansar/site/**

No PHP/Node/build needed — it's static. You can also open `index.html` directly,
but serving over http (Apache) is recommended so the JS-injected header/footer behave
identically to production.

---

## What to replace before launch

| Item | Where | Notes |
|------|-------|-------|
| **Contact details** | `assets/js/main.js` → `CONTACT` object | Email, phone, WhatsApp, LinkedIn, location are centralised here. Currently: `mransarmahmood@gmail.com`, `+966 53 485 2341`, Riyadh. |
| **Hero slider images** | `index.html` → each `.hslide__bg img src` | Currently royalty-free Unsplash placeholders. Swap for Ansar's own photography (recommended 1400px+ wide, dark-friendly). |
| **About / portrait photo** | `about.html` → `.about__photo img` | Replace with a professional headshot of Ansar. |
| **Testimonials** | `index.html` → `.testi__grid` | Illustrative quotes — replace with **named, attributable** client/candidate quotes. A note already flags this on the page. |
| **Statistics** | `index.html`, `hse-consultancy.html` (`data-count`) | Numbers (20+, 10,000+, 97%, etc.) are reasonable placeholders — confirm/adjust to verified figures. The `97%` audit metric has a `*` marker. |
| **Resource articles** | `resources.html` → `.post` cards | "Coming soon" placeholders with a working category filter — drop in real articles/links as published. |
| **Package pricing** | `services.html` | Currently "On application" — add real figures or keep enquiry-based. |
| **Favicon / OG image** | add to `assets/` + `<head>` of each page | Not yet wired — add a `favicon.svg`/`.ico` and `og:image` for branding & social sharing. |

---

## Features

- **Premium animated hero slider** — 5 slides, autoplay (6.5s), pause-on-hover, dots,
  arrows, touch-swipe, keyboard arrows, staggered text entrance, **Ken Burns** image zoom.
- **Persistent glass trust card** + floating chips on the hero (desktop), with subtle
  **3D parallax tilt** on cursor move.
- **Brand favicon** (`assets/favicon.svg`), **animated SVG preloader**, **scroll-progress bar**.
- **Magnetic primary buttons** + shine sweep, **animated credential marquee**, gradient-hairline
  card borders on hover, shimmering gradient headline text.
- **Sticky glass navbar** that condenses on scroll, with mega-clean mobile slide-in menu.
- **Scroll-reveal** animations, **animated number counters**, **card cursor-spotlight**,
  hover micro-interactions, **back-to-top** button.
- **Fully responsive** (verified at 375 / 768 / 1024 / 1440px, no horizontal scroll).
- **Accessibility**: semantic HTML, `aria-label`s on icon buttons, visible focus,
  labelled form fields, `prefers-reduced-motion` respected, AA+ contrast on the navy/gold palette.
- **SEO**: unique titles + meta descriptions per page, single H1, semantic headings, `theme-color`.
- **No dependencies** — only Google Fonts via CDN; all icons are inline SVG (no emojis).

---

## Suggested next improvements

1. **Real assets** — replace placeholder photography, add a brand favicon + OG/Twitter cards.
2. **Working form backend** — wire `contact.html` to a real handler (Formspree, a small PHP
   endpoint, or your Laravel app) instead of the `mailto:` fallback.
3. **Live course calendar** — port the existing courses dataset into a `courses.html` with
   upcoming-session cards (mirrors the React app's UpcomingSessions).
4. **Blog CMS** — back `resources.html` with markdown/CMS content and individual article pages.
5. **Analytics & consent** — add privacy-friendly analytics and a cookie notice if required.
6. **Framework port** — the component-style structure (JS-injected header/footer, data-driven
   nav, reusable card classes) is intentionally easy to lift into React/Inertia or WordPress blocks.
