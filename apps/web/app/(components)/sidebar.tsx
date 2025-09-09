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
        width: 220,
        borderRight: "1px solid #e5e7eb",
        background: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          style={{
            fontWeight: 600,
            fontSize: 14,
            padding: "16px",
            textTransform: "uppercase",
            color: "#64748b",
          }}
        >
          Organization
        </div>
        <nav>
          <Link href="/dashboard" style={linkStyle}>
            Hub
          </Link>
          <Link href="/targets" style={linkStyle}>
            Targets
          </Link>
          <Link href="/overview" style={linkStyle}>
            Media Overview
          </Link>
          <Link href="/results" style={linkStyle}>
            Results
          </Link>
          <Link href="/reports" style={linkStyle}>
            Reports
          </Link>
          <Link href="/files" style={linkStyle}>
            Files
          </Link>
          <Link href="/settings" style={linkStyle}>
            Settings
          </Link>
        </nav>
      </div>
      <div style={{ borderTop: "1px solid #e5e7eb", padding: 16 }}>
        <Link href="/plans" style={{ ...linkStyle, padding: 0 }}>
          Select plan
        </Link>
      </div>
    </aside>
  );
}
