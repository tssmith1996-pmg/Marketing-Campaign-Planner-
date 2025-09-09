import Link from "next/link";
import type { CSSProperties } from "react";

const linkStyle: CSSProperties = {
  display: "block",
  padding: "8px 16px",
  color: "#334155",
  textDecoration: "none",
};

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 200,
        borderRight: "1px solid #e5e7eb",
        paddingTop: 24,
        background: "white",
      }}
    >
      <Link href="/dashboard" style={linkStyle}>
        Dashboard
      </Link>
      <Link href="/clients" style={linkStyle}>
        Clients
      </Link>
      <Link href="/audiences" style={linkStyle}>
        Audiences
      </Link>
      <Link href="/campaigns" style={linkStyle}>
        Campaigns
      </Link>
    </aside>
  );
}
