"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  enrichedData,
  palette,
  tooltipLabel,
  truncateLabel,
} from "../../lib/survey-data";
import ProfessionalTooltip from "../professional-tooltip";

export default function DivergingBarChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-3 sm:p-4">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
          Cooperation balance by area
        </h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          Negative responses extend left, positive responses extend right, and
          neutral responses remain centred.
        </p>
      </div>

      <div
        className="w-full min-w-0"
        style={{ height: "clamp(320px, 55vh, 560px)" }}
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={280} minHeight={320}>
          <BarChart
            data={enrichedData}
            layout="vertical"
            margin={{ top: 4, right: 8, left: 0, bottom: 4 }}
            barCategoryGap={14}
          >
            <CartesianGrid stroke="rgba(15,23,42,0.08)" horizontal={false} />
            <XAxis
              type="number"
              domain={[-100, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickFormatter={(value) => `${Math.abs(Number(value))}%`}
            />
            <YAxis
              dataKey="area"
              type="category"
              width={120}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#0f172a", fontSize: 11 }}
              tickFormatter={(value: string) => truncateLabel(value)}
            />
            <ReferenceLine x={0} stroke="rgba(15,23,42,0.18)" />

            <Tooltip
              cursor={{ fill: "rgba(15,23,42,0.03)" }}
              content={
                <ProfessionalTooltip
                  title="Area detail"
                  labelMap={tooltipLabel}
                />
              }
              wrapperStyle={{ outline: "none", zIndex: 40 }}
              offset={14}
            />

            <Bar dataKey="muchLessNeg" stackId="left" radius={[6, 0, 0, 6]}>
              {enrichedData.map((entry) => (
                <Cell key={`${entry.area}-muchLess`} fill={palette.muchLess} />
              ))}
            </Bar>

            <Bar dataKey="lessNeg" stackId="left" radius={[0, 6, 6, 0]}>
              {enrichedData.map((entry) => (
                <Cell key={`${entry.area}-less`} fill={palette.less} />
              ))}
            </Bar>

            <Bar dataKey="sameLeft" stackId="neutral" radius={[8, 0, 0, 8]}>
              {enrichedData.map((entry) => (
                <Cell key={`${entry.area}-sameLeft`} fill={palette.same} />
              ))}
            </Bar>

            <Bar dataKey="sameRight" stackId="neutral" radius={[0, 8, 8, 0]}>
              {enrichedData.map((entry) => (
                <Cell key={`${entry.area}-sameRight`} fill={palette.same} />
              ))}
            </Bar>

            <Bar dataKey="morePos" stackId="right" radius={[6, 0, 0, 6]}>
              {enrichedData.map((entry) => (
                <Cell key={`${entry.area}-more`} fill={palette.more} />
              ))}
            </Bar>

            <Bar dataKey="muchMorePos" stackId="right" radius={[0, 6, 6, 0]}>
              {enrichedData.map((entry) => (
                <Cell key={`${entry.area}-muchMore`} fill={palette.muchMore} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}