#!/usr/bin/env bash
#
# Ansar Mahmood — React deploy helper
# --------------------------------------------------------------
# Builds the Next.js static site and copies the built files
# (`out/*`) to the REPO ROOT so Hostinger's git auto-deploy
# serves them at ansarmahmood.org.
#
# Usage (from anywhere):
#   cd ansar-next && npm run deploy
#
# What it does:
#   1. Cleans any stale built files at the repo root
#   2. Runs `next build` (static export)
#   3. Copies `out/*` to `..` (repo root)
#   4. Leaves you to git add/commit/push
#
# It does NOT auto-commit or push — you review the diff first,
# then `git add . && git commit -m "deploy: rebuild frontend" && git push`.

set -euo pipefail

# Resolve paths (works whether run from ansar-next/ or its scripts/)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REACT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
REPO_ROOT="$(cd "${REACT_DIR}/.." && pwd)"

echo "→ React project: ${REACT_DIR}"
echo "→ Repo root:     ${REPO_ROOT}"
echo

# ── 1. Clean stale built files at repo root ──────────────────
# Only touch things that React generates; leave PHP folders alone.
echo "→ Cleaning stale React output at repo root…"
rm -rf \
  "${REPO_ROOT}/_next" \
  "${REPO_ROOT}/404.html" \
  "${REPO_ROOT}/_not-found" \
  "${REPO_ROOT}/__next.__PAGE__.txt" \
  "${REPO_ROOT}/__next._full.txt" \
  "${REPO_ROOT}/__next._head.txt" \
  "${REPO_ROOT}/__next._index.txt" \
  "${REPO_ROOT}/__next._tree.txt" \
  "${REPO_ROOT}/index.txt"

# ── 2. Build ────────────────────────────────────────────────
echo "→ Building Next.js static export…"
cd "${REACT_DIR}"
npm run build

# ── 3. Copy out/* to repo root (Stage 2 — full swap) ────────
# The old PHP /pages/*.html files stay; .htaccess rewrites /about/ →
# /pages/about.html for routes React hasn't built yet.
echo "→ Copying ${REACT_DIR}/out/* to ${REPO_ROOT}/"
cp -r "${REACT_DIR}/out/." "${REPO_ROOT}/"

echo
echo "✓ Build complete."
echo
echo "Next steps:"
echo "  cd ${REPO_ROOT}"
echo "  git status"
echo "  git add ."
echo "  git commit -m \"deploy: rebuild React frontend\""
echo "  git push"
echo
echo "Hostinger will auto-pull within ~30 seconds of the push."
