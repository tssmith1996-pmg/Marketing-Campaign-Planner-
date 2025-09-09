"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", planned: 300, actual: 320 },
  { month: "Feb", planned: 280, actual: 260 },
  { month: "Mar", planned: 350, actual: 340 },
  { month: "Apr", planned: 400, actual: 420 },
  { month: "May", planned: 360, actual: 300 },
  { month: "Jun", planned: 380, actual: 390 },
];

export default function MediaOverview() {
  return (
    <div style={{ background: "white", padding: 24, borderRadius: 8, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
      <h2 style={{ margin: 0, marginBottom: 8 }}>Media spend</h2>
      <p style={{ marginTop: 0, marginBottom: 16, color: "#64748b" }}>
        Actual vs projected media spend over time
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="actual" stroke="#2563eb" strokeWidth={2} />
          <Line type="monotone" dataKey="planned" stroke="#94a3b8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
