import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function StickyMobileCTA({ label = 'Free 30-min strategy call', cta = 'Book Now', to = '/book-consultation' }) {
  useEffect(() => {
    document.body.classList.add('has-mobile-cta');
    return () => document.body.classList.remove('has-mobile-cta');
  }, []);

  return (
    <div className="mobile-cta-bar" role="region" aria-label="Quick contact">
      <div className="mobile-cta-bar__label">
        <small>No cost · No obligation</small>
        {label}
      </div>
      <Link to={to} className="btn btn-gold">
        <i className="fas fa-calendar-check"></i>{cta}
      </Link>
    </div>
  );
}
