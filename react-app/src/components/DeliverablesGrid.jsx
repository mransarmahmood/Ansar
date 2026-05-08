export default function DeliverablesGrid({ items = [] }) {
  return (
    <div className="deliverables-grid">
      {items.map((d, i) => (
        <div className="deliverable-item reveal" key={i}>
          <div className="deliverable-item__check"><i className="fas fa-check"></i></div>
          <div className="deliverable-item__body">
            <h4>{d.title}</h4>
            <p>{d.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
