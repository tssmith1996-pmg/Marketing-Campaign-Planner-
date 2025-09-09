import Sidebar from "../(components)/sidebar";

export default function CampaignsPage() {
  return (
    <main style={{ display: "flex", minHeight: "calc(100vh - 56px)" }}>
      <Sidebar />
      <section style={{ padding: 24, flex: 1 }}>
        <h2>Campaigns</h2>
        <p>Manage campaigns here.</p>
      </section>
    </main>
  );
}
