"use client";
import { useMemo, useState } from "react";

type Option = { id: string; name: string };

interface SelectProps {
  label: string;
  options: Option[];
  value?: string;
  onChange: (v: string) => void;
  className?: string;
}

export default function Select({ label, options, value, onChange, className = "" }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      query
        ? options.filter(o => o.name.toLowerCase().includes(query.toLowerCase()))
        : options,
    [options, query]
  );
  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full h-10 rounded-xl border border-slate-300 px-3 text-left flex items-center justify-between"
      >
        <span>{options.find(o => o.id === value)?.name ?? "Select…"}</span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="none"
        >
          <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-lg">
          <input
            className="w-full h-9 px-3 border-b outline-none"
            placeholder="Search…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <ul className="max-h-56 overflow-auto">
            {filtered.map(o => (
              <li
                key={o.id}
                className="px-3 h-9 flex items-center hover:bg-slate-50 cursor-pointer"
                onClick={() => {
                  onChange(o.id);
                  setOpen(false);
                }}
              >
                {o.name}
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-slate-500">No results</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
