// In Laravel, brand assets live in public/assets and are served from the web root.
export const asset = (p) => '/' + String(p || '').replace(/^\/+/, '');
export default asset;
