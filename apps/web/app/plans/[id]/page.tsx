"use client";
import { useState } from "react";
import { estimateCost } from "../../../lib/cost";

interface LineItem {
  id: number;
  channel: string;
  market: string;
  format: string;
  audience: string;
  start: string;
  end: string;
  budget: number;
  fee: number;
  margin: number;
}

const initial: LineItem[] = [
  {
    id: 1,
    channel: "Display",
    market: "US",
    format: "Banner",
    audience: "18-34",
    start: "2024-01-01",
    end: "2024-01-31",
    budget: 1000,
    fee: 50,
    margin: 10,
  },
];

export default function PlanEditor() {
  const [items, setItems] = useState<LineItem[]>(initial);
  const addRow = () =>
    setItems((i) => [
      ...i,
      {
        id: Date.now(),
        channel: "",
        market: "",
        format: "",
        audience: "",
        start: "",
        end: "",
        budget: 0,
        fee: 0,
        margin: 0,
      },
    ]);
  const update = (id: number, field: keyof LineItem, value: string) =>
    setItems((i) =>
      i.map((row) => (row.id === id ? { ...row, [field]: field === "budget" || field === "fee" || field === "margin" ? Number(value) : value } : row))
    );
  const total = items.reduce(
    (sum, r) => sum + r.budget + r.fee + r.budget * (r.margin / 100),
    0
  );
  const estTotal = items.reduce((sum, r) => sum + estimateCost(r), 0);
  const exportPdf = async () => {
    const withEst = items.map((i) => ({ ...i, estimatedCost: estimateCost(i) }));
    const res = await fetch("/api/plans/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(withEst),
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "media-plan.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const text = e.clipboardData.getData("text/plain");
    const rows = text.trim().split(/\n/).map((line) => line.split(","));
    const parsed: LineItem[] = rows.map((r, idx) => ({
      id: Date.now() + idx,
      channel: r[0] || "",
      market: r[1] || "",
      format: r[2] || "",
      audience: r[3] || "",
      start: r[4] || "",
      end: r[5] || "",
      budget: Number(r[6] || 0),
      fee: Number(r[7] || 0),
      margin: Number(r[8] || 0),
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
        <button onClick={exportPdf}>Export</button>
        <button>More…</button>
      </div>
      <div style={{ overflowX: "auto", marginTop: 16 }}>
        <table role="grid" aria-label="Plan line items" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Channel</th>
              <th>Market</th>
              <th>Format</th>
              <th>Audience</th>
              <th>Start</th>
              <th>End</th>
              <th>Budget</th>
              <th>Fee</th>
              <th>Margin %</th>
              <th>Est. Cost</th>
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
                    value={row.format}
                    onChange={(e) => update(row.id, "format", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={row.audience}
                    onChange={(e) => update(row.id, "audience", e.target.value)}
                  />
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
                <td>${estimateCost(row).toFixed(2)}</td>
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
          <textarea
            onPaste={handlePaste}
            placeholder="channel,market,format,audience,start,end,budget,fee,margin"
            style={{ display: "block", width: "100%" }}
          />
        </label>
      </div>
      <div style={{ marginTop: 16, fontWeight: 600 }}>
        Total Cost: ${total.toFixed(2)}
      </div>
      <div style={{ marginTop: 8, fontWeight: 600 }}>
        Estimated Total: ${estTotal.toFixed(2)}
      </div>
    </main>
  );
}
