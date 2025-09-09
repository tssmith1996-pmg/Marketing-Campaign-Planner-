export default function VersionDiffPage() {
  const changes = [
    { field: "Budget", before: 1000, after: 1200 },
    { field: "Channel", before: "Display", after: "Video" },
  ];
  return (
    <main style={{ padding: 24 }}>
      <h2>Version Diff</h2>
      <table role="table" aria-label="Version differences" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Field</th>
            <th>Before</th>
            <th>After</th>
            <th>Delta</th>
          </tr>
        </thead>
        <tbody>
          {changes.map((c) => (
            <tr key={c.field}>
              <td>{c.field}</td>
              <td>{c.before}</td>
              <td>{c.after}</td>
              <td style={{ color: c.after > c.before ? "green" : "red" }}>
                {typeof c.after === "number" && typeof c.before === "number"
                  ? (c.after - c.before).toFixed(2)
                  : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <section style={{ marginTop: 24 }}>
        <h3>Approver Trail</h3>
        <ul>
          <li>Alice approved on 2024-02-01</li>
          <li>Bob commented: Looks good</li>
        </ul>
      </section>
    </main>
  );
}
