import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev: base '/' so the dev server works at http://localhost:5173/
// Build: base '/Ansar/' so assets resolve when deployed under XAMPP's /Ansar/ path
// (override with VITE_BASE=/ when deploying at the webroot instead).
export default defineConfig(({ command }) => {
  const base = process.env.VITE_BASE || (command === 'build' ? '/Ansar/' : '/');
  return {
    base,
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
  };
});
