"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  LayoutDashboard,
  Layers3,
  PieChart as PieChartIcon,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import DivergingBarChart from "./visualizations/diverging-bar-chart";
import GroupedBarChart from "./visualizations/grouped-bar-chart";
import PieBreakdownChart from "./visualizations/pie-breakdown-chart";
import NetScoreRanking from "./visualizations/net-score-ranking";
import InsightMatrix from "./visualizations/insight-matrix";

type ViewKey = "diverging" | "grouped" | "donut" | "ranking" | "matrix";

type ViewItem = {
  key: ViewKey;
  label: string;
  description: string;
  icon: LucideIcon;
};

const views: ViewItem[] = [
  {
    key: "diverging",
    label: "Sentiment Balance",
    description: "Compares negative and positive direction across areas.",
    icon: LayoutDashboard,
  },
  {
    key: "grouped",
    label: "Distribution Bars",
    description: "Shows all response categories side by side.",
    icon: BarChart3,
  },
  {
    key: "donut",
    label: "Sector Donut",
    description: "Displays the composition of a selected area.",
    icon: PieChartIcon,
  },
  {
    key: "ranking",
    label: "Net Score Ranking",
    description: "Ranks areas by overall cooperation balance.",
    icon: Trophy,
  },
  {
    key: "matrix",
    label: "Insight Matrix",
    description: "Provides a compact table-style comparison.",
    icon: Layers3,
  },
];

function TabButton({
  item,
  active,
  onClick,
}: {
  item: ViewItem;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      className={`flex min-w-[180px] items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
        active
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      }`}
    >
      <span className={`rounded-xl p-2 ${active ? "bg-white/10" : "bg-slate-100"}`}>
        <Icon className="h-4 w-4" />
      </span>

      <span className="min-w-0">
        <span className="block text-sm font-medium">{item.label}</span>
      </span>
    </button>
  );
}

export default function PresentationSwitcher() {
  const [activeView, setActiveView] = useState<ViewKey>("diverging");

  const currentView = views.find((item) => item.key === activeView) ?? views[0];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
            Visualisation Modes
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">
            Survey views
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            {currentView.description}
          </p>
        </div>

        <div className="-mx-1 overflow-x-auto px-1">
          <div className="flex min-w-max gap-3 pb-1">
            {views.map((item) => (
              <TabButton
                key={item.key}
                item={item}
                active={activeView === item.key}
                onClick={() => setActiveView(item.key)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-3 sm:p-4 lg:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeView === "diverging" && <DivergingBarChart />}
            {activeView === "grouped" && <GroupedBarChart />}
            {activeView === "donut" && <PieBreakdownChart />}
            {activeView === "ranking" && <NetScoreRanking />}
            {activeView === "matrix" && <InsightMatrix />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}