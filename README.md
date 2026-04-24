# Ansar Mahmood — React Frontend

React + Vite port of the original HTML/PHP site. Lives alongside the legacy site in `/Ansar/react-app/` and reuses the same CSS, images, fonts, and PHP form/CMS backend.

## Dev

Make sure XAMPP (Apache) is running so the PHP backend (forms, CMS data, exam portal) is reachable at `http://localhost/Ansar/`.

```bash
npm install
npm run dev
```

Open http://localhost:5173. Vite proxies `/Ansar/forms/*`, `/Ansar/data/*`, and the exam PHP endpoints to XAMPP — so contact, booking, and newsletter forms work end-to-end in dev.

## Build

```bash
npm run build
```

Output goes to `dist/`. Initial JS bundle is ~305 KB (88 KB gzipped); every route is code-split into its own chunk.

## Architecture

- **Router**: `react-router-dom` BrowserRouter. All routes declared in `src/App.jsx`, page manifest auto-generated in `src/pages/_portedRoutes.js`.
- **Layout**: `src/components/Layout.jsx` wraps every route with `<Header>`, `<Footer>`, and floating UI (WhatsApp, back-to-top, cookie banner, preloader).
- **Page effects**: `src/hooks/usePageEffects.js` re-runs scroll-reveal, stat counters, FAQ accordion, smooth-scroll, and filter-tab behaviour after every route change — this replaces the old `assets/js/main.js`.
- **Pages**: Each page in `src/pages/*.jsx` is auto-generated from the legacy `../pages/*.html` (and `../index.html` for Home). They render their original HTML through `src/components/PageHtml.jsx`, which:
  - Intercepts internal `<a>` clicks and routes via React Router (no full reloads)
  - Intercepts form submissions for `contact-form`, `booking-form`, `newsletter-form`, `newsletter-page-form` and POSTs them to the PHP handlers
- **Config**: `src/config.js` holds contact details + `API_BASE` (override with `VITE_API_BASE` env var).

## Regenerating pages

After editing a legacy HTML file or adding a new one:

```bash
node scripts/port-pages.mjs   # regenerates every page in src/pages/
node scripts/port-home.mjs    # regenerates Home.jsx from ../index.html
```

Generated files are safe to hand-edit once you want a proper JSX version — they'll only get overwritten if you re-run the script.

## Migrating a page to idiomatic JSX

The auto-generated pages use `dangerouslySetInnerHTML` to stay visually identical to the legacy site with zero manual conversion. To upgrade any page to proper JSX:

1. Replace the `<PageHtml html={HTML} />` render with real JSX inside the component.
2. Swap `<a href="/consulting">` for `<Link to="/consulting">` (from `react-router-dom`).
3. For forms, replicate the pattern in `src/components/NewsletterForm.jsx` — local state + `fetch` to `${API_BASE}/forms/<handler>.php`.

The migration is designed so pages can be upgraded one at a time without breaking the rest of the site.

## Deployment

The built `dist/` can be dropped anywhere; `base: './'` in `vite.config.js` means relative paths work from any subdirectory. For XAMPP, point Apache at `dist/` or serve it from a subfolder. You'll still need Apache running to serve `/forms/*.php`, `/data/*`, `/admin/*`, and the exam portal unless you migrate those to a Node API.

## Known follow-ups

- The homepage inlines CMS data that was previously rendered by PHP. Once the CMS is exposed as a JSON endpoint (e.g. `data/content/homepage.json`), load it via `useEffect` in `Home.jsx` and drop the static fallback.
- The auto-generated pages are large (average 10 KB each). Converting hot pages to idiomatic JSX will shrink them further and unlock per-component hooks / props.
- SEO: this is a SPA. For crawlability, consider adding SSG later (e.g. `vite-plugin-ssr` or migrating to Next.js static export).
