"use client";

import { motion } from "framer-motion";
import { enrichedData, palette } from "../../lib/survey-data";

export default function NetScoreRanking() {
  const sorted = [...enrichedData].sort((a, b) => b.net - a.net);
  const maxMagnitude = Math.max(...sorted.map((item) => Math.abs(item.net)), 1);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-3 sm:p-4">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
          Net cooperation ranking
        </h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          Areas are ordered by net sentiment, based on positive responses minus
          negative responses.
        </p>
      </div>

      <div className="space-y-3">
        {sorted.map((item, index) => {
          const width = `${(Math.abs(item.net) / maxMagnitude) * 100}%`;
          const positive = item.net >= 0;

          return (
            <motion.div
              key={item.area}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.2 }}
              className="rounded-2xl border border-slate-200 bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Rank {index + 1}
                  </p>
                  <h4 className="mt-1 text-base font-semibold text-slate-900">
                    {item.area}
                  </h4>
                  <p className="mt-1 text-sm text-slate-600">
                    Positive {item.positive}% · Negative {item.negative}%
                  </p>
                </div>

                <div className="w-full sm:max-w-sm">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Net score</span>
                    <span
                      className={`font-semibold ${
                        positive ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      {positive ? "+" : ""}
                      {item.net}
                    </span>
                  </div>

                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width,
                        backgroundColor: positive ? palette.muchMore : palette.muchLess,
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}