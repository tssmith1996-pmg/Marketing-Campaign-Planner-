export default function ReportBuilderPage() {
  const dimensions = ["Date", "Channel", "Vendor"];
  const metrics = ["Impressions", "Clicks", "Spend"];
  return (
    <main style={{ padding: 24 }}>
      <h2>Report Builder</h2>
      <section style={{ display: "flex", gap: 24 }}>
        <div>
          <h3>Fields</h3>
          <div>
            <h4>Dimensions</h4>
            <ul>
              {dimensions.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <h4>Metrics</h4>
            <ul>
              {metrics.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h3>Layout</h3>
          <p>Drag fields here to build your report (placeholder).</p>
        </div>
      </section>
      <button style={{ marginTop: 24 }}>Save Report</button>
    </main>
  );
}
