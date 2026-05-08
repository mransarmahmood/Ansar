export default function InvestmentCard({ eyebrow = 'Investment Guidance', range, description, entryNote }) {
  return (
    <aside className="investment-card reveal" aria-label="Investment guidance">
      <div className="investment-card__eyebrow">{eyebrow}</div>
      <div
        className="investment-card__range"
        dangerouslySetInnerHTML={{ __html: range }}
      />
      <p className="investment-card__desc">{description}</p>
      {entryNote && (
        <span className="investment-card__entry">
          <i className="fas fa-flag-checkered"></i>{entryNote}
        </span>
      )}
    </aside>
  );
}
