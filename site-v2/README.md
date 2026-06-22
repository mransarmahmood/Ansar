# Ansar Mahmood — Website V2 "Midnight Aurora"

An ultra-modern, **dark, editorial** redesign of the Ansar Mahmood marketing site —
a completely separate art direction from V1 (`../site/`, navy + gold, light). Same
information, brand-new design. Pure HTML5 + CSS3 + JS, no build, no backend.

**Live:** http://localhost/Ansar/site-v2/

## Art direction
- **Near-black canvas** (`#07070D`) with an ambient **aurora glow** + film grain.
- **Electric violet + cyan + signal-lime** accents (duotone gradients).
- **Oversized display type** (Space Grotesk), **Inter** body, **JetBrains Mono** labels.
- **Bento grids**, glassmorphism, marquee, magnetic buttons, cursor glow, animated counters,
  rotating keyword, scroll progress, line-rise hero headline.

## Pages (same content as V1)
`index` · `about` · `hse-consultancy` · `training` · `certification-coaching` ·
`ai-data-solutions` · `services` (6 packages) · `resources` (filterable) · `contact` (mailto form)

## Architecture
- Header + footer are injected from `assets/js/app.js` (single source — edit `NAV`/`CONTACT` once).
  Active link from each page's `<body data-page="...">`.
- `assets/css/app.css` — all design tokens + components. `assets/favicon.svg` — violet→cyan AM mark.
- Reveal uses a **rect-based** engine + 3s failsafe (never leaves content hidden).
- Asset cache version currently **?v=2** — bump on every CSS/JS edit (use `[IO.File]::ReadAllText/WriteAllText`
  with UTF-8-no-BOM in PowerShell; do NOT use `Set-Content -Encoding utf8`, it mangles em-dashes).

## Replace before launch
Hero/about images (Unsplash placeholders) · testimonials (illustrative, flagged) · the `97%` stat ·
resource articles · package pricing. Contact details (email/phone/WhatsApp/LinkedIn/Riyadh) are wired in `app.js`.

## Verified
Header/footer inject, bento + counters + reveals (30/30), filter, magnetic buttons, mobile slide-in menu,
**no console errors**, **no horizontal overflow** at 390 / 1366px (CTA drops to the burger menu on phones).
> Note: the preview *screenshot* tool times out here because of continuous marquee/aurora animations — verified via live DOM/geometry instead.
