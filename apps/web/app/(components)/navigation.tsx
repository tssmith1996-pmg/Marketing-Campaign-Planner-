import OrgSwitcher from "./org-switcher";
import type { CSSProperties } from "react";

const iconButton: CSSProperties = {
  background: "none",
  border: "none",
  fontSize: 18,
  cursor: "pointer",
};

export default function Navigation() {
  return (
    <header
      style={{
        height: 56,
        borderBottom: "1px solid #e5e7eb",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <OrgSwitcher />
        <input
          type="search"
          placeholder="Search..."
          aria-label="Search"
          style={{
            padding: "4px 8px",
            border: "1px solid #d1d5db",
            borderRadius: 4,
            minWidth: 200,
          }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button style={iconButton} aria-label="Notifications">
          🔔
        </button>
        <button style={iconButton} aria-label="Help">
          ❓
        </button>
        <img
          src="https://placehold.co/32x32"
          alt="User avatar"
          style={{ width: 32, height: 32, borderRadius: "50%" }}
        />
      </div>
    </header>
  );
}
