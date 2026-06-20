// Shim so ported React-Router components work in Inertia with minimal edits.
// Renders a plain anchor (full-page nav) — safe while pages are still being
// migrated; swap to Inertia <Link> once all routes are Inertia pages.
export function Link({ to, href, children, ...rest }) {
  return <a href={to || href || '#'} {...rest}>{children}</a>;
}
export default Link;
