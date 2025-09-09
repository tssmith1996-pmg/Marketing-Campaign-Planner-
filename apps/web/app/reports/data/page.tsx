import Sidebar from "../../(components)/sidebar";
import prisma from "../../(components)/prisma";
import { authGuard } from "../../(components)/auth";
import DataClient from "./data-client";

export default async function DataPage() {
  const { orgId } = await authGuard();
  const data = await prisma.actual.findMany({
    where: { campaign: { orgId } },
    orderBy: { date: "asc" },
    take: 100,
  });

  return (
    <main style={{ display: "flex", minHeight: "calc(100vh - 56px)" }}>
      <Sidebar />
      <section style={{ padding: 24, flex: 1 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Actual Metrics</h2>
        <DataClient initialData={data} />
      </section>
    </main>
  );
}
