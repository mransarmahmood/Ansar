#!/usr/bin/env bash
# Deploy the React app to /Ansar/ on XAMPP.
# Rebuilds the bundle, copies dist/ over the webroot, and leaves the PHP
# backend (forms/, data/, admin/, exam-*.php) untouched.
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR/react-app"

echo "→ Regenerating legacy-page JSX from pages/*.html ..."
node scripts/port-pages.mjs > /dev/null
node scripts/port-home.mjs > /dev/null 2>&1 || true
node scripts/update-stats.mjs > /dev/null 2>&1 || true

echo "→ Building React bundle ..."
npm run build

echo "→ Deploying to $SCRIPT_DIR ..."
# Back up the legacy PHP index.html the first time only.
if [ -f "$SCRIPT_DIR/index.html" ] && [ ! -f "$SCRIPT_DIR/index.old.html" ]; then
  head -1 "$SCRIPT_DIR/index.html" | grep -q '^<?php' && mv "$SCRIPT_DIR/index.html" "$SCRIPT_DIR/index.old.html"
fi

cp dist/index.html "$SCRIPT_DIR/index.html"
cp -r dist/assets/. "$SCRIPT_DIR/assets/"

echo "✓ Deployed. Visit http://localhost/Ansar/"
