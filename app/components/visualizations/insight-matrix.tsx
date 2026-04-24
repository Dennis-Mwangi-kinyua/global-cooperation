"use client";

import { alpha, metricMeta, rawData } from "../../lib/survey-data";

export default function InsightMatrix() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-3 sm:p-4">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
          Response matrix
        </h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          A compact comparison of response intensity across all areas.
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[760px] overflow-hidden rounded-2xl border border-slate-200">
          <div className="grid grid-cols-[1.7fr_repeat(5,minmax(0,1fr))] border-b border-slate-200 bg-slate-50">
            <div className="px-4 py-3 text-sm font-semibold text-slate-900">
              Area
            </div>
            {metricMeta.map((metric) => (
              <div
                key={metric.key}
                className="px-4 py-3 text-center text-sm font-semibold text-slate-700"
              >
                {metric.label.replace(" cooperative", "")}
              </div>
            ))}
          </div>

          {rawData.map((row) => (
            <div
              key={row.area}
              className="grid grid-cols-[1.7fr_repeat(5,minmax(0,1fr))] border-b border-slate-100 bg-white last:border-b-0"
            >
              <div className="px-4 py-4 text-sm font-medium text-slate-900">
                {row.area}
              </div>

              {metricMeta.map((metric) => {
                const value = row[metric.key];

                return (
                  <div key={`${row.area}-${metric.key}`} className="px-3 py-3">
                    <div
                      className="flex h-12 items-center justify-center rounded-xl text-sm font-semibold text-slate-900"
                      style={{
                        backgroundColor: alpha(metric.color, 0.14 + value / 120),
                      }}
                    >
                      {value}%
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}