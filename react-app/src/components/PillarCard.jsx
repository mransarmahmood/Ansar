import { Link } from 'react-router-dom';

export default function PillarCard({ tone = 'navy', icon, label, title, description, items = [], cta, ctaTo }) {
  return (
    <article className={`pillar-card pillar-card--${tone} reveal`}>
      <div className="pillar-card__head">
        <div className="pillar-card__icon"><i className={`fas ${icon}`}></i></div>
        <div>
          <div className="pillar-card__subtitle">{label}</div>
          <h3 className="pillar-card__title">{title}</h3>
        </div>
      </div>
      <p className="pillar-card__desc">{description}</p>
      <div className="pillar-card__list">
        {items.map((it) => (
          <Link key={it.to} to={it.to}>
            <i className={`fas ${it.icon}`}></i>{it.label}
          </Link>
        ))}
      </div>
      <Link to={ctaTo} className="pillar-card__cta">
        {cta} <i className="fas fa-arrow-right"></i>
      </Link>
    </article>
  );
}
