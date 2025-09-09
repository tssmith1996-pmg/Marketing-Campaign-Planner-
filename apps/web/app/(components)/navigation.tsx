import Link from "next/link";

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
      }}
    >
      <div style={{ fontWeight: 600 }}>Media Planner</div>
      <nav style={{ display: "flex", gap: 16 }}>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/audiences">Audiences</Link>
      </nav>
    </header>
  );
}
