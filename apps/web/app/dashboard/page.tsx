import Sidebar from "../(components)/sidebar";
import CampaignTable from "../(components)/campaign-table";

export default async function Dashboard() {
  return (
    <main style={{ display: "flex", minHeight: "calc(100vh - 56px)" }}>
      <Sidebar />
      <section style={{ padding: 24, flex: 1 }}>
        <h2>Dashboard</h2>
        <p>This is a starter dashboard with sample campaign data.</p>
        <CampaignTable />
      </section>
    </main>
  );
}
