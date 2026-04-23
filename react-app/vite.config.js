import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site is deployed under /Ansar/ on XAMPP (e.g. http://localhost/Ansar/).
// Using a relative base lets the built bundle work from any subpath, and the
// dev server proxies /Ansar/forms, /Ansar/data, and the PHP exam portal to
// the local Apache so forms/CMS work end-to-end during development.
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/Ansar/forms':   { target: 'http://localhost', changeOrigin: true },
      '/Ansar/data':    { target: 'http://localhost', changeOrigin: true },
      '/Ansar/exam-login.php':    { target: 'http://localhost', changeOrigin: true },
      '/Ansar/exam-logout.php':   { target: 'http://localhost', changeOrigin: true },
      '/Ansar/exam-register.php': { target: 'http://localhost', changeOrigin: true },
      '/Ansar/exam-take.php':     { target: 'http://localhost', changeOrigin: true },
      '/Ansar/exam-result.php':   { target: 'http://localhost', changeOrigin: true },
      '/Ansar/exams.php':         { target: 'http://localhost', changeOrigin: true },
      '/Ansar/admin':   { target: 'http://localhost', changeOrigin: true },
    },
  },
});
