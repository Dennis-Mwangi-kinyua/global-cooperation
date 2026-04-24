export type SurveyMetricKey =
  | "muchLess"
  | "less"
  | "same"
  | "more"
  | "muchMore";

export type SurveyRow = {
  area: string;
  muchLess: number;
  less: number;
  same: number;
  more: number;
  muchMore: number;
};

export type EnrichedSurveyRow = SurveyRow & {
  negative: number;
  positive: number;
  net: number;
  muchLessNeg: number;
  lessNeg: number;
  sameLeft: number;
  sameRight: number;
  morePos: number;
  muchMorePos: number;
};