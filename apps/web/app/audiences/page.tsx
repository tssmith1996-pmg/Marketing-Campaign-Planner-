import Sidebar from "../(components)/sidebar";

export default function AudiencesPage() {
  return (
    <main style={{ display: "flex", minHeight: "calc(100vh - 56px)" }}>
      <Sidebar />
      <section style={{ padding: 24, flex: 1 }}>
        <h2>Audiences</h2>
        <p>Manage reusable audience segments here.</p>
      </section>
    </main>
  );
}
