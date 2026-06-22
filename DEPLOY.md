# Deploying to Hostinger — ansarmahmood.org

**Architecture**
- `ansarmahmood.org` → the React build (static SPA) in `public_html`
- `api.ansarmahmood.org` → Laravel API, web root = `laravel/public`
- MySQL database (created in hPanel)
- SMTP via Hostinger mail (`no-reply@ansarmahmood.org`)

---

## 1. Build the front-end (locally)
```bash
cd react-app
cp .env.production.example .env.production      # already points at api.ansarmahmood.org
npm install
npm run build
```
Upload the **contents of `react-app/dist/`** into `public_html/` on Hostinger
(so `index.html` is at `public_html/index.html`).

**SPA routing** — add this `public_html/.htaccess` so deep links work:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 2. Create the API subdomain
hPanel → Subdomains → create `api` → set its **document root to `.../laravel/public`**.
Upload the `laravel/` folder (you can exclude `node_modules`; keep `vendor` or run composer on the server).

## 3. Configure Laravel
```bash
cd laravel
cp .env.production.example .env        # fill DB_*, MAIL_PASSWORD
php artisan key:generate
php artisan config:cache
php artisan route:cache
php artisan migrate --force
php artisan db:seed --class=ExamSeeder --force      # seed the 6 practice exams
```
Make writable: `storage/` and `bootstrap/cache/` (chmod 775).
Create the uploads dir: `laravel/public/uploads/slides` (writable).

## 4. Create the admin user (one-off)
```bash
php artisan tinker
>>> $u = App\Models\User::create(['name'=>'Site Admin','email'=>'admin@ansarmahmood.org','password'=>bcrypt('CHOOSE_A_STRONG_PASSWORD'),'email_verified_at'=>now()]);
>>> $u->role='admin'; $u->save();
```

## 5. Verify
- `https://api.ansarmahmood.org/api/health` → `{"ok":true}`
- `https://ansarmahmood.org` loads, log in at `/login`, dashboard → Billing / Hero Slider / Exam Authoring
- Register a test user → check the verification email arrives (real SMTP now)

---

## What's already env-driven (no code edits needed on deploy)
| Concern | Controlled by |
|---|---|
| React asset base (`/`) | `VITE_BASE` in `react-app/.env.production` |
| React → API URL | `VITE_API_BASE` |
| API own URL / signed links / upload URLs | `APP_URL` |
| Post-verification redirect target | `FRONTEND_URL` |
| CORS allow-list | `FRONTEND_URL` (auto-added) |
| Database | `DB_*` (MySQL) |
| Email sending | `MAIL_*` (Hostinger SMTP) |

## Re-deploying later
- Front-end change → `npm run build` → re-upload `dist/` to `public_html`.
- API change → upload changed files → `php artisan config:cache route:cache` again.
