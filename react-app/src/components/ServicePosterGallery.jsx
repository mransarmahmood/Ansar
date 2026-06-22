import { Link } from 'react-router-dom';
import { asset } from '../utils/asset';

const POSTERS = [
  { src: 'assets/images/poster-certification.png', to: '/certification-coaching', label: 'Certification Services' },
  { src: 'assets/images/poster-consultancy.png', to: '/consulting', label: 'Consultancy Services' },
  { src: 'assets/images/poster-training.png', to: '/training', label: 'Training Services' },
  { src: 'assets/images/poster-management-systems.png', to: '/management-systems', label: 'Safety Management Systems' },
  { src: 'assets/images/poster-ai.png', to: '/ai-solutions', label: 'AI Integration' },
];

export default function ServicePosterGallery() {
  return (
    <section className="svc-gallery" aria-label="Service overview">
      <div className="container">
        <div className="svc-gallery__head">
          <span className="svc-gallery__eyebrow">What I Deliver</span>
          <h2 className="svc-gallery__title">Services at a Glance</h2>
        </div>
        <div className="svc-gallery__grid">
          {POSTERS.map((p) => (
            <Link key={p.to} to={p.to} className="svc-gallery__item" aria-label={p.label}>
              <img src={asset(p.src)} alt={p.label} loading="lazy" decoding="async" />
              <span className="svc-gallery__bar">{p.label} <i className="fas fa-arrow-right" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
