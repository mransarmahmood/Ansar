import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { portedRoutes } from './pages/_portedRoutes';

function PageFallback() {
  return (
    <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
      <i className="fas fa-spinner fa-spin" style={{ fontSize: 28, color: 'var(--blue)' }}></i>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        {portedRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<PageFallback />}>
                <Component />
              </Suspense>
            }
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
