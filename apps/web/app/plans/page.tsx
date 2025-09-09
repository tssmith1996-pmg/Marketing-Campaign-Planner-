import Link from "next/link";
import Sidebar from "../(components)/sidebar";

export default function PlansPage() {
  return (
    <main style={{ display: "flex", minHeight: "calc(100vh - 56px)" }}>
      <Sidebar />
      <section style={{ padding: 24, flex: 1 }}>
        <h2>Plans</h2>
        <p>Select a plan to edit.</p>
        <ul>
          <li>
            <Link href="/plans/1">Sample Plan</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
