export default function ComparisonTable({ headers = [], rows = [], winnerIndex = 2 }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="compare-table" role="table">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className={i === winnerIndex ? 'compare-table__winner' : ''}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} className={ci === winnerIndex ? 'compare-table__winner' : ''}>
                  {cell === true && <span className="yes" aria-label="Yes"><i className="fas fa-check"></i></span>}
                  {cell === false && <span className="no" aria-label="No"><i className="fas fa-times"></i></span>}
                  {typeof cell === 'string' && cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
