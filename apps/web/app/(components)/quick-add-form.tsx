"use client";
import { useMemo, useState } from "react";
import Select from "./select";
import NumberField from "./number-field";
import DateField from "./date-field";

export interface Opt { id: string; name: string }
export interface LineItemDraft {
  channelId: string;
  marketId: string;
  formatId: string;
  audienceId: string;
  startDate: string;
  endDate: string;
  budget: number;
  fee: number;
  marginPct: number;
  estCost?: number;
}

interface Props {
  options: {
    channels: Opt[];
    markets: Opt[];
    formats: Opt[];
    audiences: Opt[];
  };
  onAdd: (li: LineItemDraft) => void;
}

const emptyDraft: LineItemDraft = {
  channelId: "",
  marketId: "",
  formatId: "",
  audienceId: "",
  startDate: "",
  endDate: "",
  budget: 0,
  fee: 0,
  marginPct: 10,
};

export default function QuickAddForm({ options, onAdd }: Props) {
  const [draft, setDraft] = useState<LineItemDraft>(emptyDraft);

  const estCost = useMemo(() => {
    const { budget, fee, marginPct } = draft;
    return Number(((budget || 0) * (marginPct || 0) / 100 + (fee || 0)).toFixed(2));
  }, [draft]);

  return (
    <div className="grid grid-cols-12 gap-3">
      <Select
        label="Channel"
        options={options.channels}
        value={draft.channelId}
        onChange={v => setDraft(d => ({ ...d, channelId: v }))}
        className="col-span-2"
      />
      <Select
        label="Market"
        options={options.markets}
        value={draft.marketId}
        onChange={v => setDraft(d => ({ ...d, marketId: v }))}
        className="col-span-2"
      />
      <Select
        label="Format"
        options={options.formats}
        value={draft.formatId}
        onChange={v => setDraft(d => ({ ...d, formatId: v }))}
        className="col-span-2"
      />
      <Select
        label="Audience"
        options={options.audiences}
        value={draft.audienceId}
        onChange={v => setDraft(d => ({ ...d, audienceId: v }))}
        className="col-span-2"
      />

      <DateField
        label="Start"
        value={draft.startDate}
        onChange={v => setDraft(d => ({ ...d, startDate: v }))}
        className="col-span-2"
      />
      <DateField
        label="End"
        value={draft.endDate}
        onChange={v => setDraft(d => ({ ...d, endDate: v }))}
        className="col-span-2"
      />

      <NumberField
        label="Budget"
        value={draft.budget}
        onChange={v => setDraft(d => ({ ...d, budget: v }))}
        className="col-span-2"
        prefix="$"
      />
      <NumberField
        label="Fee"
        value={draft.fee}
        onChange={v => setDraft(d => ({ ...d, fee: v }))}
        className="col-span-2"
        prefix="$"
      />
      <NumberField
        label="Margin %"
        value={draft.marginPct}
        onChange={v => setDraft(d => ({ ...d, marginPct: v }))}
        className="col-span-2"
        suffix="%"
      />

      <div className="col-span-2">
        <label className="block text-sm font-medium text-slate-700 mb-1">Est. Cost</label>
        <div className="h-10 flex items-center rounded-xl border border-slate-300 px-3 bg-slate-50">
          ${'{'}estCost.toLocaleString(){'}'}
        </div>
      </div>

      <div className="col-span-12 flex gap-3 justify-end mt-3">
        <button
          type="button"
          className="rounded-2xl bg-slate-100 px-4 py-2"
          onClick={() => setDraft(emptyDraft)}
        >
          Clear
        </button>
        <button
          type="button"
          className="rounded-2xl bg-indigo-600 text-white px-4 py-2"
          onClick={() => {
            onAdd({ ...draft, estCost });
            setDraft(emptyDraft);
          }}
        >
          Quick add line item
        </button>
      </div>
    </div>
  );
}
