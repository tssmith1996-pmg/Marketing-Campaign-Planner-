interface Campaign {
  name: string;
  channel: string;
  budget: number;
  status: string;
}

const sample: Campaign[] = [
  { name: "Spring Launch", channel: "Search", budget: 5000, status: "Draft" },
  { name: "Summer Brand", channel: "Display", budget: 8000, status: "Live" },
  { name: "Fall Promo", channel: "Social", budget: 3000, status: "Pending" },
];

export default function CampaignTable() {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
      <thead>
        <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
          <th style={{ padding: "8px 16px" }}>Name</th>
          <th style={{ padding: "8px 16px" }}>Channel</th>
          <th style={{ padding: "8px 16px" }}>Budget</th>
          <th style={{ padding: "8px 16px" }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {sample.map((c) => (
          <tr key={c.name} style={{ borderBottom: "1px solid #f1f5f9" }}>
            <td style={{ padding: "8px 16px" }}>{c.name}</td>
            <td style={{ padding: "8px 16px" }}>{c.channel}</td>
            <td style={{ padding: "8px 16px" }}>{"$" + c.budget.toLocaleString()}</td>
            <td style={{ padding: "8px 16px" }}>{c.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
