"use client";
import { useState } from "react";

interface LineItem {
  id: number;
  channel: string;
  market: string;
  start: string;
  end: string;
  budget: number;
  fee: number;
  margin: number;
}

const initial: LineItem[] = [
  { id: 1, channel: "Display", market: "US", start: "2024-01-01", end: "2024-01-31", budget: 1000, fee: 50, margin: 10 },
];

export default function PlanEditor() {
  const [items, setItems] = useState<LineItem[]>(initial);
  const addRow = () =>
    setItems((i) => [
      ...i,
      { id: Date.now(), channel: "", market: "", start: "", end: "", budget: 0, fee: 0, margin: 0 },
    ]);
  const update = (id: number, field: keyof LineItem, value: string) =>
    setItems((i) =>
      i.map((row) => (row.id === id ? { ...row, [field]: field === "budget" || field === "fee" || field === "margin" ? Number(value) : value } : row))
    );
  const total = items.reduce((sum, r) => sum + r.budget + r.fee + r.budget * (r.margin / 100), 0);

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const text = e.clipboardData.getData("text/plain");
    const rows = text.trim().split(/\n/).map((line) => line.split(","));
    const parsed: LineItem[] = rows.map((r, idx) => ({
      id: Date.now() + idx,
      channel: r[0] || "",
      market: r[1] || "",
      start: r[2] || "",
      end: r[3] || "",
      budget: Number(r[4] || 0),
      fee: Number(r[5] || 0),
      margin: Number(r[6] || 0),
    }));
    setItems((i) => [...i, ...parsed]);
  };

  return (
    <main style={{ padding: 24 }}>
      <div
        className="sticky top-0 flex gap-2 bg-white border-b p-2"
        role="toolbar"
        aria-label="Plan actions"
      >
        <button>Save</button>
        <button>Create Version</button>
        <button>Submit for Approval</button>
        <button>Export</button>
        <button>More…</button>
      </div>
      <div style={{ overflowX: "auto", marginTop: 16 }}>
        <table role="grid" aria-label="Plan line items" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Channel</th>
              <th>Market</th>
              <th>Start</th>
              <th>End</th>
              <th>Budget</th>
              <th>Fee</th>
              <th>Margin %</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={row.id}>
                <td>
                  <input
                    value={row.channel}
                    onChange={(e) => update(row.id, "channel", e.target.value)}
                  />
                </td>
                <td>
                  <input value={row.market} onChange={(e) => update(row.id, "market", e.target.value)} />
                </td>
                <td>
                  <input
                    type="date"
                    value={row.start}
                    onChange={(e) => update(row.id, "start", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={row.end}
                    onChange={(e) => update(row.id, "end", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.budget}
                    onChange={(e) => update(row.id, "budget", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.fee}
                    onChange={(e) => update(row.id, "fee", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.margin}
                    onChange={(e) => update(row.id, "margin", e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={addRow} style={{ marginTop: 16 }}>
        Quick add line item
      </button>
      <div style={{ marginTop: 16 }}>
        <label>
          Bulk paste CSV
          <textarea onPaste={handlePaste} style={{ display: "block", width: "100%" }} />
        </label>
      </div>
      <div style={{ marginTop: 16, fontWeight: 600 }}>Total Cost: ${" "}
        {total.toFixed(2)}
      </div>
    </main>
  );
}
