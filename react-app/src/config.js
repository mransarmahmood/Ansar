export const CONTACT = {
  EMAIL: 'ansar@ansarmahmood.com',
  PHONE: '+1 (234) 567-8900',
  WHATSAPP: '12345678900',
};

// API base for the PHP backend. By default it follows the deployment base
// (e.g. "/Ansar"), so forms submit to /Ansar/forms/*.php — the same PHP
// handlers that power the legacy site. Override with VITE_API_BASE env var
// if you deploy the frontend and backend on different hosts.
const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
export const API_BASE = import.meta.env.VITE_API_BASE || BASE || '';
