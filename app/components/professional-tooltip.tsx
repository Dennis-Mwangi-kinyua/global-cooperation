"use client";

import { AnimatePresence, motion } from "framer-motion";

type TooltipItem = {
  name?: string | number;
  value?: string | number | Array<string | number>;
  color?: string;
  fill?: string;
};

type ProfessionalTooltipProps = {
  active?: boolean;
  payload?: TooltipItem[];
  label?: string | number;
  title?: string;
  labelMap?: (key: string) => string;
  valueSuffix?: string;
};

function toNumber(value: TooltipItem["value"]) {
  if (Array.isArray(value)) {
    return Number(value[0] ?? 0);
  }

  return Number(value ?? 0);
}

export default function ProfessionalTooltip({
  active,
  payload,
  label,
  title = "Detail",
  labelMap,
  valueSuffix = "%",
}: ProfessionalTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const grouped = payload.reduce<
    Array<{ label: string; value: number; color: string }>
  >((acc, item) => {
    const rawName = String(item.name ?? "");
    const displayLabel = labelMap ? labelMap(rawName) : rawName;
    const numericValue = Math.abs(toNumber(item.value));
    const color = item.color ?? item.fill ?? "#94a3b8";

    const existing = acc.find((entry) => entry.label === displayLabel);

    if (existing) {
      existing.value += numericValue;
      return acc;
    }

    acc.push({
      label: displayLabel,
      value: numericValue,
      color,
    });

    return acc;
  }, []);

  const total = grouped.reduce((sum, item) => sum + item.value, 0);
  const header = label ? String(label) : title;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.16 }}
        className="min-w-[220px] rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-[0_18px_50px_rgba(15,23,42,0.14)] backdrop-blur-md"
      >
        <div className="border-b border-slate-200 pb-2">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
            {title}
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{header}</p>
        </div>

        <div className="mt-3 space-y-2">
          {grouped.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-slate-700">{item.label}</span>
              </div>

              <span className="text-sm font-semibold text-slate-900">
                {item.value}
                {valueSuffix}
              </span>
            </div>
          ))}
        </div>

        {grouped.length > 1 && (
          <div className="mt-3 border-t border-slate-200 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Total shown
              </span>
              <span className="text-sm font-semibold text-slate-900">
                {total}
                {valueSuffix}
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}