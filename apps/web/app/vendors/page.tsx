import Sidebar from "../(components)/sidebar";

export default function VendorsPage() {
  return (
    <main style={{ display: "flex", minHeight: "calc(100vh - 56px)" }}>
      <Sidebar />
      <section style={{ padding: 24, flex: 1 }}>
        <h2>Vendors</h2>
        <p>Manage vendor records here.</p>
      </section>
    </main>
  );
}
