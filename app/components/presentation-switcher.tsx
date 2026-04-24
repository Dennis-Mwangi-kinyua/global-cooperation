"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import type { ReactElement, SVGProps } from "react";

type ViewKey = "diverging" | "grouped" | "donut" | "ranking" | "matrix";
type IconType = (props: SVGProps<SVGSVGElement>) => ReactElement;

type ViewItem = {
  key: ViewKey;
  label: string;
  description: string;
  icon: IconType;
};

function ChartLoading({ height = "clamp(320px, 55vh, 560px)" }: { height?: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-3 sm:p-4">
      <div className="mb-4">
        <div className="h-5 w-48 rounded bg-slate-200" />
        <div className="mt-2 h-4 w-72 max-w-full rounded bg-slate-100" />
      </div>

      <div className="w-full min-w-0" style={{ height }}>
        <div className="h-full w-full rounded-2xl bg-slate-100" />
      </div>
    </div>
  );
}

const DivergingBarChart = dynamic(
  () => import("./visualizations/diverging-bar-chart"),
  {
    ssr: false,
    loading: () => <ChartLoading />,
  }
);

const GroupedBarChart = dynamic(
  () => import("./visualizations/grouped-bar-chart"),
  {
    ssr: false,
    loading: () => <ChartLoading />,
  }
);

const PieBreakdownChart = dynamic(
  () => import("./visualizations/pie-breakdown-chart"),
  {
    ssr: false,
    loading: () => <ChartLoading height="clamp(320px, 50vh, 520px)" />,
  }
);

const NetScoreRanking = dynamic(
  () => import("./visualizations/net-score-ranking"),
  {
    ssr: false,
    loading: () => <ChartLoading height="clamp(320px, 50vh, 520px)" />,
  }
);

const InsightMatrix = dynamic(
  () => import("./visualizations/insight-matrix"),
  {
    ssr: false,
    loading: () => <ChartLoading height="clamp(320px, 50vh, 520px)" />,
  }
);

function DashboardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="5" rx="2" />
      <rect x="13" y="10" width="8" height="11" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
    </svg>
  );
}

function BarsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-7" />
      <path d="M22 20v-12" />
    </svg>
  );
}

function DonutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M21 12a9 9 0 1 1-9-9" />
      <path d="M21 3v9h-9" />
      <path d="M21 3 12 12" />
    </svg>
  );
}

function TrophyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
      <path d="M5 6H3a2 2 0 0 0 2 2" />
      <path d="M19 6h2a2 2 0 0 1-2 2" />
    </svg>
  );
}

function MatrixIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="5" height="5" rx="1" />
      <rect x="10" y="3" width="5" height="5" rx="1" />
      <rect x="17" y="3" width="4" height="5" rx="1" />
      <rect x="3" y="10" width="5" height="5" rx="1" />
      <rect x="10" y="10" width="5" height="5" rx="1" />
      <rect x="17" y="10" width="4" height="5" rx="1" />
      <rect x="3" y="17" width="5" height="4" rx="1" />
      <rect x="10" y="17" width="5" height="4" rx="1" />
      <rect x="17" y="17" width="4" height="4" rx="1" />
    </svg>
  );
}

const views: ViewItem[] = [
  {
    key: "diverging",
    label: "Sentiment Balance",
    description: "Compares negative and positive direction across areas.",
    icon: DashboardIcon,
  },
  {
    key: "grouped",
    label: "Distribution Bars",
    description: "Shows all response categories side by side.",
    icon: BarsIcon,
  },
  {
    key: "donut",
    label: "Sector Donut",
    description: "Displays the composition of a selected area.",
    icon: DonutIcon,
  },
  {
    key: "ranking",
    label: "Net Score Ranking",
    description: "Ranks areas by overall cooperation balance.",
    icon: TrophyIcon,
  },
  {
    key: "matrix",
    label: "Insight Matrix",
    description: "Provides a compact table-style comparison.",
    icon: MatrixIcon,
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
    <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
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

      <div className="mt-4 min-w-0 rounded-3xl border border-slate-200 bg-slate-50 p-3 sm:p-4 lg:p-6">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="min-w-0"
        >
          {activeView === "diverging" && <DivergingBarChart />}
          {activeView === "grouped" && <GroupedBarChart />}
          {activeView === "donut" && <PieBreakdownChart />}
          {activeView === "ranking" && <NetScoreRanking />}
          {activeView === "matrix" && <InsightMatrix />}
        </motion.div>
      </div>
    </section>
  );
}