"use client";
import { useState } from "react";

export default function OrgSwitcher() {
  const [org, setOrg] = useState("Acme Agency");
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <span className="sr-only">Select organization</span>
      <select
        value={org}
        onChange={(e) => setOrg(e.target.value)}
        style={{ color: "black", padding: "2px 4px" }}
      >
        <option>Acme Agency</option>
        <option>Globex Media</option>
      </select>
    </label>
  );
}
