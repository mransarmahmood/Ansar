// Client for the Laravel student-platform API (Sanctum bearer tokens).
// The Laravel API runs separately (php artisan serve) on port 8000.
// API base resolution order:
//   1. window.__STUDENT_API__  (runtime override)
//   2. VITE_API_BASE           (build-time env — set to https://api.ansarmahmood.org/api in prod)
//   3. '/ansar-api/api'        (local Apache alias, same-origin dev default)
export const STUDENT_API_BASE =
  (typeof window !== 'undefined' && window.__STUDENT_API__) ||
  import.meta.env.VITE_API_BASE ||
  '/ansar-api/api';

const TOKEN_KEY = 'am_student_token';

export function getToken() {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}
export function setToken(t) {
  try { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ }
}

async function request(path, { method = 'GET', body, form, token } = {}) {
  const headers = { Accept: 'application/json' };
  let payload;
  if (form) { payload = form; }              // FormData — let the browser set the boundary
  else if (body) { headers['Content-Type'] = 'application/json'; payload = JSON.stringify(body); }
  const t = token || getToken();
  if (t) headers.Authorization = `Bearer ${t}`;

  const res = await fetch(`${STUDENT_API_BASE}${path}`, { method, headers, body: payload });
  let data = null;
  try { data = await res.json(); } catch { /* no json */ }
  if (!res.ok) {
    const msg = data?.message || (data?.errors && Object.values(data.errors)[0]?.[0]) || `Request failed (${res.status})`;
    const err = new Error(msg); err.status = res.status; err.data = data; throw err;
  }
  return data;
}

export const studentApi = {
  register: (payload) => request('/register', { method: 'POST', body: payload }),
  login: (payload) => request('/login', { method: 'POST', body: payload }),
  me: (token) => request('/user', { token }),
  logout: () => request('/logout', { method: 'POST' }),
  resendVerification: () => request('/email/resend', { method: 'POST' }),

  // Exam attempts (student results)
  listAttempts: () => request('/attempts'),
  saveAttempt: (payload) => request('/attempts', { method: 'POST', body: payload }),
  attemptStats: () => request('/attempts/stats'),

  // Certificates
  listCertificates: () => request('/certificates'),
  verifyCertificate: (hash) => request(`/verify/${encodeURIComponent(hash)}`),
  certificateDownloadUrl: (hash) => `${STUDENT_API_BASE}/certificates/${encodeURIComponent(hash)}/download`,

  // Exam catalogue (public)
  listExams: () => request('/exams'),
  getExam: (slug) => request(`/exams/${encodeURIComponent(slug)}`),

  // Admin exam authoring (role: admin)
  adminListExams: () => request('/admin/exams'),
  adminCreateExam: (payload) => request('/admin/exams', { method: 'POST', body: payload }),
  adminUpdateExam: (id, payload) => request(`/admin/exams/${id}`, { method: 'PUT', body: payload }),
  adminDeleteExam: (id) => request(`/admin/exams/${id}`, { method: 'DELETE' }),

  // Hero slides — public
  listSlides: () => request('/slides'),

  // Page banners — public + admin (CMS-managed branded heroes)
  listPageBanners: () => request('/page-banners'),
  adminListPageBanners: () => request('/admin/page-banners'),
  adminSavePageBanner: (p) => request('/admin/page-banners', { method: 'POST', body: p }),
  adminUpdatePageBanner: (id, p) => request(`/admin/page-banners/${id}`, { method: 'PUT', body: p }),
  adminDeletePageBanner: (id) => request(`/admin/page-banners/${id}`, { method: 'DELETE' }),
  adminUploadBannerImage: (file) => { const fd = new FormData(); fd.append('image', file); return request('/admin/page-banners/upload', { method: 'POST', form: fd }); },

  // Hero slides — admin (role: admin)
  adminListSlides: () => request('/admin/slides'),
  adminCreateSlide: (payload) => request('/admin/slides', { method: 'POST', body: payload }),
  adminUpdateSlide: (id, payload) => request(`/admin/slides/${id}`, { method: 'PUT', body: payload }),
  adminDeleteSlide: (id) => request(`/admin/slides/${id}`, { method: 'DELETE' }),
  adminUploadSlideImage: (file) => {
    const fd = new FormData();
    fd.append('image', file);
    return request('/admin/slides/upload', { method: 'POST', form: fd });
  },

  // Quotations — public submit
  submitQuotation: (payload) => request('/quotations', { method: 'POST', body: payload }),
  // Public invoice / proposal viewers
  viewInvoice: (token) => request(`/invoices/${encodeURIComponent(token)}`),
  viewProposal: (token) => request(`/proposals/${encodeURIComponent(token)}`),
  invoicePdfUrl: (token) => `${STUDENT_API_BASE}/invoices/${encodeURIComponent(token)}/pdf`,
  proposalPdfUrl: (token) => `${STUDENT_API_BASE}/proposals/${encodeURIComponent(token)}/pdf`,

  // Admin — invoices
  adminListInvoices: () => request('/admin/invoices'),
  adminGetInvoice: (id) => request(`/admin/invoices/${id}`),
  adminCreateInvoice: (p) => request('/admin/invoices', { method: 'POST', body: p }),
  adminUpdateInvoice: (id, p) => request(`/admin/invoices/${id}`, { method: 'PUT', body: p }),
  adminDeleteInvoice: (id) => request(`/admin/invoices/${id}`, { method: 'DELETE' }),
  // Admin — proposals
  adminListProposals: () => request('/admin/proposals'),
  adminGetProposal: (id) => request(`/admin/proposals/${id}`),
  adminCreateProposal: (p) => request('/admin/proposals', { method: 'POST', body: p }),
  adminUpdateProposal: (id, p) => request(`/admin/proposals/${id}`, { method: 'PUT', body: p }),
  adminDeleteProposal: (id) => request(`/admin/proposals/${id}`, { method: 'DELETE' }),
  // Admin — quotations inbox
  adminListQuotations: () => request('/admin/quotations'),
  adminUpdateQuotation: (id, p) => request(`/admin/quotations/${id}`, { method: 'PUT', body: p }),
  adminDeleteQuotation: (id) => request(`/admin/quotations/${id}`, { method: 'DELETE' }),

  // Admin — clients directory
  adminListClients: () => request('/admin/clients'),
  adminCreateClient: (p) => request('/admin/clients', { method: 'POST', body: p }),
  adminUpdateClient: (id, p) => request(`/admin/clients/${id}`, { method: 'PUT', body: p }),
  adminDeleteClient: (id) => request(`/admin/clients/${id}`, { method: 'DELETE' }),

  // Admin — payments + billing summary
  adminBillingSummary: () => request('/admin/billing/summary'),
  adminAddPayment: (invoiceId, p) => request(`/admin/invoices/${invoiceId}/payments`, { method: 'POST', body: p }),
  adminDeletePayment: (invoiceId, paymentId) => request(`/admin/invoices/${invoiceId}/payments/${paymentId}`, { method: 'DELETE' }),
  invoiceReceiptUrl: (token) => `${STUDENT_API_BASE}/invoices/${encodeURIComponent(token)}/receipt`,
};
