"use client";
import QuickAddForm, { LineItemDraft } from "../(components)/quick-add-form";
import AllocationTable from "../(components)/allocation-table";
import { useState } from "react";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const options = {
  channels: [
    { id: "display", name: "Display" },
    { id: "video", name: "Video" },
  ],
  markets: [
    { id: "us", name: "United States" },
    { id: "au", name: "Australia" },
  ],
  formats: [
    { id: "banner", name: "Banner" },
    { id: "pre", name: "Pre-roll" },
  ],
  audiences: [
    { id: "all", name: "All" },
    { id: "youth", name: "Youth" },
  ],
};

export default function PlannerPage() {
  const [rows, setRows] = useState<
    Array<LineItemDraft & { id: string; allocations: { month: string; value: number }[] }>
  >([]);

  function handleAdd(draft: LineItemDraft) {
    const allocations = months.map(m => ({ month: m, value: 0 }));
    setRows(r => [...r, { id: `${Date.now()}`, allocations, ...draft }]);
  }

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      <QuickAddForm options={options} onAdd={handleAdd} />
      <AllocationTable rows={rows} months={months} />
    </div>
  );
}
