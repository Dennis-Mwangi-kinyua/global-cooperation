import InsightCard from "./components/insight-card";
import PresentationSwitcher from "./components/presentation-switcher";
import {
  bestPerformer,
  mostStable,
  share,
  totals,
  worstPerformer,
} from "./lib/survey-data";

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
                Survey Summary
              </p>

              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                State of Global Cooperation
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                Comparison of survey responses describing the state of global
                cooperation in 2026 relative to 2025, across six thematic areas.
              </p>
            </div>

            <div className="w-full lg:max-w-md">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Reporting note
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Values are displayed as reported in the survey dataset. Some rows
                  may reflect rounding.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <InsightCard
            title="Strongest positive area"
            value={bestPerformer.area}
            subtitle={`Net cooperation score: +${bestPerformer.net}`}
          />
          <InsightCard
            title="Most challenged area"
            value={worstPerformer.area}
            subtitle={`Net cooperation score: ${worstPerformer.net}`}
          />
          <InsightCard
            title="Most stable area"
            value={mostStable.area}
            subtitle={`${mostStable.same}% said things stayed the same.`}
          />
          <InsightCard
            title="Overall reading"
            value={share(totals.muchLess + totals.less)}
            subtitle="Share of all responses indicating cooperation became less or much less cooperative."
          />
        </section>

        <section className="mt-4">
          <PresentationSwitcher />
        </section>
      </div>
    </main>
  );
}