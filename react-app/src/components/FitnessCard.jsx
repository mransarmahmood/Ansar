export default function FitnessCard({ title = 'This is right for you if', items = [] }) {
  return (
    <div className="fitness-card reveal">
      <div className="fitness-card__title">{title}</div>
      <ul className="fitness-card__list">
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </div>
  );
}
