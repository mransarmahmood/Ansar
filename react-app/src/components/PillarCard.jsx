import { Link } from 'react-router-dom';

export default function PillarCard({ tone = 'navy', icon, label, title, description, items = [], cta, ctaTo }) {
  return (
    <article className={`pcard pcard--${tone} reveal`}>
      <span className="pcard__bar" aria-hidden="true" />
      <div className="pcard__top">
        <span className="pcard__icon"><i className={`fas ${icon}`}></i></span>
        <span className="pcard__num">{label}</span>
      </div>
      <h3 className="pcard__title">{title}</h3>
      <p className="pcard__desc">{description}</p>
      <ul className="pcard__list">
        {items.map((it) => (
          <li key={it.label}>
            <Link to={it.to}>
              <i className={`fas ${it.icon} pcard__li-ic`}></i>
              <span>{it.label}</span>
              <i className="fas fa-chevron-right pcard__li-go"></i>
            </Link>
          </li>
        ))}
      </ul>
      <Link to={ctaTo} className="pcard__cta">{cta} <i className="fas fa-arrow-right"></i></Link>
    </article>
  );
}
