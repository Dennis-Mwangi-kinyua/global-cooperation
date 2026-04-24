"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { metricMeta, rawData, tooltipLabel } from "../../lib/survey-data";
import ProfessionalTooltip from "../professional-tooltip";

function shortAxisLabel(value: string) {
  if (value === "Innovation & Technology") return "Innovation & Tech";
  if (value === "Climate & Natural Capital") return "Climate & Natural";
  if (value === "Health & Wellness") return "Health & Wellness";
  if (value === "Trade & Capital") return "Trade & Capital";
  if (value === "Peace & Security") return "Peace & Security";
  return value;
}

export default function GroupedBarChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-3 sm:p-4">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
          Response distribution by area
        </h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          Each bar shows the reported percentage for one response category.
        </p>
      </div>

      <div className="h-[360px] w-full sm:h-[430px] lg:h-[520px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={rawData}
            margin={{ top: 8, right: 8, left: 0, bottom: 70 }}
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.08)" />
            <XAxis
              dataKey="area"
              angle={-18}
              textAnchor="end"
              interval={0}
              height={84}
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickFormatter={(value: string) => shortAxisLabel(value)}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              content={
                <ProfessionalTooltip
                  title="Area detail"
                  labelMap={tooltipLabel}
                />
              }
              wrapperStyle={{ outline: "none", zIndex: 40 }}
              offset={14}
            />

            <Legend wrapperStyle={{ fontSize: "12px" }} />

            {metricMeta.map((metric) => (
              <Bar
                key={metric.key}
                dataKey={metric.key}
                fill={metric.color}
                radius={[4, 4, 0, 0]}
                name={metric.key}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}