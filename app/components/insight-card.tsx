type InsightCardProps = {
  title: string;
  value: string;
  subtitle: string;
};

export default function InsightCard({
  title,
  value,
  subtitle,
}: InsightCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
        {title}
      </p>
      <h3 className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">
        {value}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{subtitle}</p>
    </div>
  );
}