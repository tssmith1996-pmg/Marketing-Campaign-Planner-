import Sidebar from "../../(components)/sidebar";
import prisma from "../../(components)/prisma";
import { authGuard } from "../../(components)/auth";
import { computeMetric } from "../../../lib/metrics.js";

export default async function PacingPage() {
  const { orgId } = await authGuard();
  const campaigns = await prisma.campaign.findMany({
    where: { orgId },
    include: { actuals: true },
  });
  const rows = campaigns.map((c) => {
    const metric = c.targetMetric || "IMPRESSIONS";
    const actual = computeMetric(c.actuals, metric);
    const target = Number(c.targetValue || 0);
    const progress = target ? actual / target : 0;
    const variance = target ? (actual - target) / target : 0;
    return { name: c.name, progress, variance };
  });
  return (
    <main style={{ display: "flex", minHeight: "calc(100vh - 56px)" }}>
      <Sidebar />
      <section style={{ padding: 24, flex: 1 }}>
        <h2>Pacing Dashboard</h2>
        <table role="table" aria-label="Pacing" style={{ marginTop: 16, borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Campaign</th>
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
      </section>
    </main>
  );
}
