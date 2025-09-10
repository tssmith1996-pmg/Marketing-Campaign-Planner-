"use client";
import type { InputHTMLAttributes } from "react";

interface DateFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}

export default function DateField({ label, value, onChange, className = "", ...rest }: DateFieldProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input
        type="date"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="h-10 w-full rounded-xl border border-slate-300 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        {...rest}
      />
    </div>
  );
}
