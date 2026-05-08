export default function ProcessSteps({ steps = [] }) {
  return (
    <div className="process-steps">
      {steps.map((s, i) => (
        <div className="process-step reveal" key={i}>
          <div className="process-step__num">{i + 1}</div>
          <div className="process-step__title">{s.title}</div>
          <p className="process-step__outcome">{s.outcome}</p>
        </div>
      ))}
    </div>
  );
}
