#!/usr/bin/env bash
# Deploy the React app to /Ansar/ on XAMPP.
# Rebuilds the bundle, copies dist/ over the webroot, and leaves the PHP
# backend (forms/, data/, admin/, exam-*.php) untouched.
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR/react-app"

echo "→ Regenerating legacy-page JSX from pages/*.html ..."
# NOTE: Home.jsx is manually authored (not regenerated) — it pulls CMS data
# directly from src/data/*.json. Only the 27 content pages in pages/ get ported.
node scripts/port-pages.mjs > /dev/null

echo "→ Re-syncing CMS data into src/data/ ..."
cp "$SCRIPT_DIR/data/content/"*.json src/data/

echo "→ Applying stat overrides (20 Years / 10 Countries) ..."
cd "$SCRIPT_DIR"
node react-app/scripts/update-stats.mjs > /dev/null 2>&1 || true
cp data/content/*.json react-app/src/data/

echo "→ Building React bundle ..."
cd "$SCRIPT_DIR/react-app"
npm run build

echo "→ Deploying to $SCRIPT_DIR ..."
# Back up the legacy PHP index.html the first time only.
if [ -f "$SCRIPT_DIR/index.html" ] && [ ! -f "$SCRIPT_DIR/index.old.html" ]; then
  head -1 "$SCRIPT_DIR/index.html" | grep -q '^<?php' && mv "$SCRIPT_DIR/index.html" "$SCRIPT_DIR/index.old.html"
fi

cp dist/index.html "$SCRIPT_DIR/index.html"
cp -r dist/assets/. "$SCRIPT_DIR/assets/"

echo "✓ Deployed. Visit http://localhost/Ansar/"
