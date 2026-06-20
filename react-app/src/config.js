export const CONTACT = {
  EMAIL: 'mransarmahmood@gmail.com',
  PHONE: '+966 53 485 2341',
  WHATSAPP: '966534852341',
  LINKEDIN: 'https://www.linkedin.com/in/ansar-mahmood-cmiosh%C2%AE-csp%C2%AE-crsp%C2%AE-csm%C2%AE-pmp%C2%AE-33836864/',
  LOCATION: 'Riyadh, Saudi Arabia',
};

// API base for the PHP backend. By default it follows the deployment base
// (e.g. "/Ansar"), so forms submit to /Ansar/forms/*.php — the same PHP
// handlers that power the legacy site. Override with VITE_API_BASE env var
// if you deploy the frontend and backend on different hosts.
const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
export const API_BASE = import.meta.env.VITE_API_BASE || BASE || '';
