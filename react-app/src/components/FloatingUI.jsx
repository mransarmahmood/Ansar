import { useEffect, useState } from 'react';
import { CONTACT } from '../config';

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${CONTACT.WHATSAPP}?text=Hello%20Ansar%2C%20I%27d%20like%20to%20discuss%20a%20project`}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
      <span className="whatsapp-float__tooltip">Chat with Ansar</span>
    </a>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`back-top${show ? ' show' : ''}`}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <i className="fas fa-chevron-up"></i>
    </button>
  );
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('am_cookie_consent')) return;
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  function dismiss(accepted) {
    localStorage.setItem('am_cookie_consent', accepted ? 'accepted' : 'declined');
    setVisible(false);
  }

  return (
    <div className={`cookie-banner${visible ? ' visible' : ''}`} role="dialog" aria-label="Cookie consent notice" aria-live="polite">
      <div className="container">
        <div className="cookie-banner__content">
          <p>We use cookies to enhance your experience and analyse site traffic. See our <a href="#">Privacy Policy</a>.</p>
          <div className="cookie-banner__actions">
            <button className="btn btn-gold btn-sm" onClick={() => dismiss(true)}>Accept All</button>
            <button className="btn btn-outline-white btn-sm" onClick={() => dismiss(false)}>Decline</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 600);
    document.body.classList.add('page-transition');
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`preloader${hidden ? ' hidden' : ''}`} aria-hidden={hidden}>
      <div className="preloader__logo">Ansar<span>.</span>Mahmood</div>
      <div className="preloader__tagline">Safer &bull; Smarter &bull; Future-Ready</div>
      <div className="preloader__bar"></div>
    </div>
  );
}
