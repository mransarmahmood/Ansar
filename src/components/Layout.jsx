import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { WhatsAppFloat, BackToTop, CookieBanner, Preloader } from './FloatingUI';
import { usePageEffects } from '../hooks/usePageEffects';

export default function Layout() {
  usePageEffects();

  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
      <CookieBanner />
    </>
  );
}
