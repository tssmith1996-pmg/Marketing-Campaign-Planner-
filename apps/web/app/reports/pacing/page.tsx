export default function PacingPage() {
  const rows = [
    { name: "Line Item A", progress: 0.5, variance: -0.1 },
    { name: "Line Item B", progress: 0.8, variance: 0.05 },
  ];
  return (
    <main style={{ padding: 24 }}>
      <h2>Pacing Dashboard</h2>
      <label>
        Date Range
        <input type="date" /> to <input type="date" />
      </label>
      <table role="table" aria-label="Pacing" style={{ marginTop: 16, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Line Item</th>
            <th>Progress</th>
            <th>Variance</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td>{r.name}</td>
              <td>
                <progress value={r.progress} max={1} />
              </td>
              <td>
                <span style={{ color: r.variance < 0 ? "red" : "green" }}>
                  {(r.variance * 100).toFixed(1)}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
