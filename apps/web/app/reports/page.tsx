import Sidebar from "../(components)/sidebar";
import Link from "next/link";

export default function ReportsPage() {
  return (
    <main style={{ display: "flex", minHeight: "calc(100vh - 56px)" }}>
      <Sidebar />
      <section style={{ padding: 24, flex: 1 }}>
        <h2>Reports</h2>
        <ul>
          <li>
            <Link href="/reports/pacing">Pacing Dashboard</Link>
          </li>
          <li>
            <Link href="/reports/builder">Report Builder</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
