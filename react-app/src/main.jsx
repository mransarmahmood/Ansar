import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

// BASE_URL is configured in vite.config.js (dev: "/", build: "/Ansar/").
// react-router's basename needs the path without the trailing slash.
const basename = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
