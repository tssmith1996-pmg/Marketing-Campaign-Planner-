import Sidebar from "../(components)/sidebar";
import prisma from "../(components)/prisma";
import { authGuard } from "../(components)/auth";
import { revalidatePath } from "next/cache";

const metrics = [
  "IMPRESSIONS",
  "REACH",
  "WEBSITE_TRAFFIC",
  "CTR",
  "CPC",
  "LEADS",
  "CONVERSION_RATE",
  "CAC",
  "ROI",
];

async function createCampaign(formData: FormData) {
  "use server";
  const name = formData.get("name")?.toString() ?? "";
  const clientId = formData.get("clientId")?.toString() ?? "";
  const start = formData.get("start")?.toString() ?? "";
  const end = formData.get("end")?.toString() ?? "";
  const budget = Number(formData.get("budget") || 0);
  const targetMetric = formData.get("targetMetric")?.toString();
  const targetValue = Number(formData.get("targetValue") || 0);
  const { orgId, userId } = await authGuard();
  if (!name || !clientId) return;
  await prisma.campaign.create({
    data: {
      name,
      clientId,
      startDate: new Date(start || Date.now()),
      endDate: new Date(end || Date.now()),
      budgetTotal: budget,
      targetMetric,
      targetValue,
      orgId,
      createdById: userId,
      status: "DRAFT",
    },
  });
  revalidatePath("/campaigns");
}

export default async function CampaignsPage() {
  const { orgId } = await authGuard();
  const [clients, campaigns] = await Promise.all([
    prisma.client.findMany({ where: { orgId } }),
    prisma.campaign.findMany({ where: { orgId } }),
  ]);
  return (
    <main style={{ display: "flex", minHeight: "calc(100vh - 56px)" }}>
      <Sidebar />
      <section style={{ padding: 24, flex: 1 }}>
        <h2>Campaigns</h2>
        <form action={createCampaign} style={{ marginTop: 16, marginBottom: 24 }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            style={{ border: "1px solid #cbd5e1", padding: 8, marginRight: 8 }}
          />
          <select name="clientId" style={{ border: "1px solid #cbd5e1", padding: 8, marginRight: 8 }}>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <input type="date" name="start" style={{ marginRight: 8 }} />
          <input type="date" name="end" style={{ marginRight: 8 }} />
          <input
            type="number"
            step="any"
            name="budget"
            placeholder="Budget"
            style={{ border: "1px solid #cbd5e1", padding: 8, width: 100, marginRight: 8 }}
          />
          <select name="targetMetric" style={{ border: "1px solid #cbd5e1", padding: 8, marginRight: 8 }}>
            {metrics.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <input
            type="number"
            step="any"
            name="targetValue"
            placeholder="Target"
            style={{ border: "1px solid #cbd5e1", padding: 8, width: 100, marginRight: 8 }}
          />
          <button type="submit" style={{ padding: "8px 16px", background: "#1f2937", color: "white" }}>
            Add
          </button>
        </form>
        <ul>
          {campaigns.map((c) => (
            <li key={c.id} style={{ padding: "4px 0" }}>
              {c.name} – {c.targetMetric || "none"} {c.targetValue ?? ""}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
