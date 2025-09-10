"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", projected: 200, actual: 180 },
  { month: "Feb", projected: 220, actual: 210 },
  { month: "Mar", projected: 240, actual: 260 },
  { month: "Apr", projected: 260, actual: 300 },
  { month: "May", projected: 280, actual: 320 },
  { month: "Jun", projected: 300, actual: 340 },
];

export default function Home() {
  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          background: "white",
          padding: 24,
          borderRadius: 8,
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Welcome back, Laura.</h2>
        <p style={{ marginTop: 4, marginBottom: 16, color: "#64748b" }}>
          Our goal is to reach €300k/month by year end.
        </p>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="actual" stroke="#2563eb" strokeWidth={2} />
            <Line type="monotone" dataKey="projected" stroke="#94a3b8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
