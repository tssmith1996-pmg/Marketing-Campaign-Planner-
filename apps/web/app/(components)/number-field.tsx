"use client";
import type { InputHTMLAttributes } from "react";

interface NumberFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function NumberField({ label, value, onChange, prefix, suffix, className = "", ...rest }: NumberFieldProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div className="flex">
        {prefix && (
          <span className="flex items-center px-2 rounded-l-xl border border-r-0 border-slate-300 bg-slate-50">{prefix}</span>
        )}
        <input
          type="number"
          value={value ?? ""}
          onChange={e => onChange(Number(e.target.value))}
          className={`h-10 w-full border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
            prefix ? "rounded-r-xl" : "rounded-xl"
          } ${suffix ? "rounded-r-none" : ""} border px-3`}
          {...rest}
        />
        {suffix && (
          <span className="flex items-center px-2 rounded-r-xl border border-l-0 border-slate-300 bg-slate-50">{suffix}</span>
        )}
      </div>
    </div>
  );
}
