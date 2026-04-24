# Ansar Mahmood — React Frontend

React + Vite port of the original HTML/PHP site. Deployed to `/Ansar/` on XAMPP Apache alongside the legacy PHP backend (forms, admin, exam portal, CMS JSON).

## Dev

Make sure XAMPP (Apache) is running so the PHP backend (forms, CMS data, exam portal) is reachable at `http://localhost/Ansar/`.

```bash
cd react-app
npm install
npm run dev
```

Open http://localhost:5173. Vite proxies `/Ansar/forms/*`, `/Ansar/data/*`, and the exam PHP endpoints to XAMPP, so forms work end-to-end in dev.

## Build & deploy

From the project root:

```bash
bash deploy.sh        # Git Bash / WSL / macOS / Linux
deploy.bat            # Windows cmd
```

The deploy script does:
1. `port-pages.mjs` — regenerates the 27 legacy pages from `pages/*.html` into `src/pages/*.jsx` (wrapped in `<PageHtml>`).
2. Copies fresh CMS JSON from `data/content/` into `src/data/`.
3. `update-stats.mjs` — applies the 25+→20 Years and 40+→10 Countries overrides.
4. `npm run build` — produces the Vite bundle in `dist/`.
5. Copies `dist/index.html` and `dist/assets/*` over the webroot, leaving PHP handlers in place.

The first run backs up the original PHP `index.html` to `index.old.html`.

## Architecture

- **Routing**: `BrowserRouter` with `basename` from `BASE_URL` (`/Ansar` in prod, `/` in dev). `src/App.jsx` declares the routes; `src/pages/_portedRoutes.js` is the auto-generated manifest.
- **Layout**: `src/components/Layout.jsx` wraps every route with `<Header>`, `<Footer>`, floating UI (WhatsApp, back-to-top, cookie banner, preloader).
- **Page effects**: `src/hooks/usePageEffects.js` re-runs scroll-reveal, stat counters, FAQ accordion, smooth-scroll, and filter-tab behaviour on every route change — replaces the old `assets/js/main.js`.
- **Home page**: `src/pages/Home.jsx` is hand-authored JSX driven by CMS JSON imports (`src/data/*.json`). The deploy script does NOT regenerate this file.
- **Other pages**: `src/pages/*.jsx` are auto-generated from `pages/*.html`, PHP stripped, rendered via `<PageHtml>` which:
  - Rewrites `/assets/...` references through `BASE_URL` so images work under any deployment path.
  - Intercepts internal `<a>` clicks and routes via React Router.
  - Intercepts `contact-form`, `booking-form`, `newsletter-form`, `newsletter-page-form` submissions and POSTs them to the PHP handlers with the correct `X-Requested-With` header.
- **Asset helper**: `src/utils/asset.js` exposes `asset(path)` and `rewriteHtmlAssetPaths(html)`. Always use `asset('assets/...')` for `<img src>` in hand-authored components.
- **Config**: `src/config.js` exports contact details + `API_BASE` (derives from `BASE_URL`; override with `VITE_API_BASE` env var).

## Vite base path

`vite.config.js` sets:
- **dev** (`vite dev`): `base: '/'`
- **build** (`vite build`): `base: '/Ansar/'`

Override via the `VITE_BASE` env var (e.g. `VITE_BASE=/ npm run build` to deploy at the webroot).

## `.htaccess` contract

The root `.htaccess`:
- Serves real files and directories directly.
- Lets `*.php` files execute (forms, admin, exam portal).
- Keeps the legacy `.html` rewrite for `/pages/*.html` (still reachable for backlinks).
- Falls through to `index.html` for any other path (SPA routing).
- Blocks direct access to `/data/*` (CSV logs + settings).

## Migrating a page to idiomatic JSX

Auto-generated pages use `dangerouslySetInnerHTML` to stay visually identical. To upgrade any page:

1. Replace `<PageHtml html={HTML} />` with real JSX.
2. Swap `<a href="/consulting">` for `<Link to="/consulting">`.
3. For forms, follow the pattern in `src/components/NewsletterForm.jsx` — local state + fetch to `${API_BASE}/forms/<handler>.php`.
4. Use `asset()` for any `/assets/...` reference.

The re-port script won't clobber a JSX file you've taken over — it always rewrites its own output, so just keep your hand-authored version. Actually it will overwrite; either move your upgraded component out of `pages/` into its own folder, or let the generator keep the original and create a new component alongside.
