"use client";

import { useMemo, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { getPieData, rawData } from "../../lib/survey-data";
import ProfessionalTooltip from "../professional-tooltip";

export default function PieBreakdownChart() {
  const [selectedArea, setSelectedArea] = useState<string>("Overall");
  const pieData = useMemo(() => getPieData(selectedArea), [selectedArea]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-3 sm:p-4">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
          Area composition
        </h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          Select an area to view the composition of responses.
        </p>
      </div>

      <div className="mb-4 -mx-1 overflow-x-auto px-1">
        <div className="flex min-w-max gap-2">
          {rawData.map((item) => (
            <button
              key={item.area}
              onClick={() => setSelectedArea(item.area)}
              className={`rounded-full border px-3 py-2 text-sm transition ${
                selectedArea === item.area
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {item.area}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="h-[340px] rounded-3xl border border-slate-200 bg-slate-50 p-2 sm:h-[420px] lg:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={130}
                paddingAngle={3}
              >
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip
                content={<ProfessionalTooltip title={selectedArea} />}
                wrapperStyle={{ outline: "none", zIndex: 40 }}
                offset={14}
              />

              <Legend wrapperStyle={{ fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Selected area
          </p>
          <h4 className="mt-2 text-lg font-semibold text-slate-900">
            {selectedArea}
          </h4>
          <div className="mt-4 space-y-3">
            {pieData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-2xl border border-slate-200 px-3 py-3"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-slate-700">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-slate-900">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}