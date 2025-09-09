import Link from "next/link";
import OrgSwitcher from "./org-switcher";

export default function Navigation() {
  return (
    <header
      style={{
        background: "#1f2937",
        color: "white",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ fontWeight: 600 }}>Media Planner</div>
        <OrgSwitcher />
      </div>
      <nav style={{ display: "flex", gap: 16 }} aria-label="Global">
        <Link href="/clients">Clients</Link>
        <Link href="/campaigns">Campaigns</Link>
        <Link href="/plans">Plans</Link>
        <Link href="/vendors">Vendors</Link>
        <Link href="/reports">Reports</Link>
        <Link href="/alerts">Alerts</Link>
      </nav>
    </header>
  );
}
