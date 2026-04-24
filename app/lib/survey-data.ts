import type {
  EnrichedSurveyRow,
  SurveyMetricKey,
  SurveyRow,
} from "../types/survey";

export const rawData: SurveyRow[] = [
  { area: "Overall", muchLess: 30, less: 55, same: 8, more: 1, muchMore: 7 },
  { area: "Trade & Capital", muchLess: 30, less: 55, same: 8, more: 1, muchMore: 7 },
  { area: "Innovation & Technology", muchLess: 39, less: 48, same: 5, more: 0, muchMore: 8 },
  { area: "Climate & Natural Capital", muchLess: 10, less: 51, same: 16, more: 1, muchMore: 22 },
  { area: "Health & Wellness", muchLess: 33, less: 38, same: 6, more: 1, muchMore: 22 },
  { area: "Peace & Security", muchLess: 16, less: 31, same: 14, more: 1, muchMore: 38 },
];

export const palette = {
  muchLess: "#8B1E3F",
  less: "#F05D5E",
  same: "#B8C0CC",
  more: "#3DBE8B",
  muchMore: "#0F9D58",
};

export const metricMeta: {
  key: SurveyMetricKey;
  label: string;
  color: string;
}[] = [
  { key: "muchLess", label: "Much less cooperative", color: palette.muchLess },
  { key: "less", label: "Less cooperative", color: palette.less },
  { key: "same", label: "Stayed the same", color: palette.same },
  { key: "more", label: "More cooperative", color: palette.more },
  { key: "muchMore", label: "Much more cooperative", color: palette.muchMore },
];

export const enrichedData: EnrichedSurveyRow[] = rawData.map((row) => {
  const negative = row.muchLess + row.less;
  const positive = row.more + row.muchMore;
  const net = positive - negative;
  const halfSame = row.same / 2;

  return {
    ...row,
    negative,
    positive,
    net,
    muchLessNeg: -row.muchLess,
    lessNeg: -row.less,
    sameLeft: -halfSame,
    sameRight: halfSame,
    morePos: row.more,
    muchMorePos: row.muchMore,
  };
});

export const totals = rawData.reduce(
  (acc, row) => {
    acc.muchLess += row.muchLess;
    acc.less += row.less;
    acc.same += row.same;
    acc.more += row.more;
    acc.muchMore += row.muchMore;
    return acc;
  },
  { muchLess: 0, less: 0, same: 0, more: 0, muchMore: 0 }
);

export const totalResponses =
  totals.muchLess + totals.less + totals.same + totals.more + totals.muchMore;

export const share = (value: number) =>
  `${((value / totalResponses) * 100).toFixed(1)}%`;

export const bestPerformer = [...enrichedData].sort((a, b) => b.net - a.net)[0];
export const worstPerformer = [...enrichedData].sort((a, b) => a.net - b.net)[0];
export const mostStable = [...rawData].sort((a, b) => b.same - a.same)[0];

export function getPieData(area: string) {
  const row = rawData.find((item) => item.area === area) ?? rawData[0];

  return [
    { name: "Much less cooperative", value: row.muchLess, color: palette.muchLess },
    { name: "Less cooperative", value: row.less, color: palette.less },
    { name: "Stayed the same", value: row.same, color: palette.same },
    { name: "More cooperative", value: row.more, color: palette.more },
    { name: "Much more cooperative", value: row.muchMore, color: palette.muchMore },
  ];
}

export function tooltipLabel(key: string) {
  if (key === "muchLess" || key === "muchLessNeg") return "Much less cooperative";
  if (key === "less" || key === "lessNeg") return "Less cooperative";
  if (key === "same" || key === "sameLeft" || key === "sameRight") return "Stayed the same";
  if (key === "more" || key === "morePos") return "More cooperative";
  return "Much more cooperative";
}

export function alpha(hex: string, opacity: number) {
  const safeOpacity = Math.max(0.08, Math.min(0.95, opacity));
  const cleanHex = hex.replace("#", "");
  const bigint = Number.parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${safeOpacity})`;
}