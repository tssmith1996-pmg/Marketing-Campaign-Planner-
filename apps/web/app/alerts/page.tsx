import Sidebar from "../(components)/sidebar";

export default function AlertsPage() {
  return (
    <main style={{ display: "flex", minHeight: "calc(100vh - 56px)" }}>
      <Sidebar />
      <section style={{ padding: 24, flex: 1 }}>
        <h2>Alerts</h2>
        <p>No alerts yet.</p>
      </section>
    </main>
  );
}
