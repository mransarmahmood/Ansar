// Split a service-page HTML string at the start of <section class="cta-banner ...">
// so the React side can inject conversion enhancements between the main content
// and the closing CTA banner.
export function splitAtCtaBanner(html) {
  if (!html) return [html, ''];
  const marker = html.search(/<section\s+class=["'][^"']*cta-banner[^"']*["']/i);
  if (marker === -1) return [html, ''];
  return [html.slice(0, marker), html.slice(marker)];
}
