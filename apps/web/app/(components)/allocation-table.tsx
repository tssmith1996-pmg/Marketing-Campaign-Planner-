"use client";
import type { LineItemDraft } from "./quick-add-form";
import { useMemo } from "react";

interface Cell {
  month: string; // YYYY-MM
  value: number;
}

interface Row extends LineItemDraft {
  id: string;
  allocations: Cell[];
}

interface Props {
  rows: Row[];
  months: string[];
}

export default function AllocationTable({ rows, months }: Props) {
  const totals = useMemo(() => {
    const monthTotals: Record<string, number> = {};
    for (const m of months) monthTotals[m] = 0;
    let grand = 0;
    for (const row of rows) {
      for (const cell of row.allocations) {
        monthTotals[cell.month] += cell.value;
        grand += cell.value;
      }
    }
    return { monthTotals, grand };
  }, [rows, months]);

  return (
    <div className="mt-6 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
      <table className="w-full">
        <thead className="sticky top-0 bg-slate-50 border-b">
          <tr>
            <th className="w-[320px] text-left px-4 py-3">CHANNEL / PLATFORM / OBJECTIVE</th>
            {months.map(m => (
              <th key={m} className="min-w-[120px] text-right px-3 py-3">
                {m}
              </th>
            ))}
            <th className="min-w-[140px] text-right px-3 py-3">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id} className="border-b last:border-b-0">
              <td className="px-4 py-2 text-sm">{row.channelId}</td>
              {months.map(m => {
                const cell = row.allocations.find(c => c.month === m);
                return (
                  <td key={m} className="px-3 py-2 text-right">
                    <input
                      type="number"
                      value={cell?.value ?? ""}
                      onChange={() => {}}
                      className="min-w-[96px] h-9 px-2 rounded-md border border-slate-200 text-right focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </td>
                );
              })}
              <td className="px-3 py-2 text-right">
                {row.allocations.reduce((s, c) => s + c.value, 0).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t bg-slate-50">
            <td className="px-4 py-3 font-medium text-right">Total</td>
            {months.map(m => (
              <td key={m} className="px-3 py-3 text-right">
                {totals.monthTotals[m].toLocaleString()}
              </td>
            ))}
            <td className="px-3 py-3 text-right font-semibold">
              {totals.grand.toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
