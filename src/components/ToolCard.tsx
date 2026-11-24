import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface CardProps {
  title: string;
  description?: string;
  icon: React.ElementType;
  number?: string | number;
  to?: string;
  category?: string;
  badge?: string;
}

/** Studio color system for each tool's icon badge. Category wins; title keywords are the fallback. */
export function getToolTileStyle(title: string, category?: string) {
  const cat = category?.toLowerCase() ?? "";
  if (cat.includes("document"))
    return "bg-rose-50 text-rose-600 border-rose-200/80 group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600";
  if (cat.includes("image"))
    return "bg-indigo-50 text-indigo-600 border-indigo-200/80 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600";
  if (cat.includes("text"))
    return "bg-emerald-50 text-emerald-600 border-emerald-200/80 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600";
  if (cat.includes("color"))
    return "bg-sky-50 text-sky-600 border-sky-200/80 group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600";
  if (cat.includes("calculator"))
    return "bg-amber-50 text-amber-600 border-amber-200/80 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600";
  if (cat.includes("utility") || cat.includes("developer"))
    return "bg-blue-50 text-blue-600 border-blue-200/80 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600";

  const lower = title.toLowerCase();
  if (lower.includes("pdf") || lower.includes("word") || lower.includes("docx"))
    return "bg-rose-50 text-rose-600 border-rose-200/80 group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600";
  if (lower.includes("image") || lower.includes("jpg") || lower.includes("png") || lower.includes("gif") || lower.includes("face"))
    return "bg-indigo-50 text-indigo-600 border-indigo-200/80 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600";
  if (lower.includes("counter") || lower.includes("text") || lower.includes("case"))
    return "bg-emerald-50 text-emerald-600 border-emerald-200/80 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600";
  if (lower.includes("calculator") || lower.includes("bmi") || lower.includes("emi") || lower.includes("sip"))
    return "bg-amber-50 text-amber-600 border-amber-200/80 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600";
  return "bg-blue-50 text-blue-600 border-blue-200/80 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600";
}

const ToolCard = ({ title, description = "", icon: Icon, to, category, badge }: CardProps) => {
  const tileColor = getToolTileStyle(title, category);

  const cardInner = (
    <div className="card-ink spotlight-card group relative flex items-center gap-3.5 p-4 bg-white dark:bg-card rounded-2xl cursor-pointer h-full">
      {badge && (
        <span className="absolute -top-2.5 right-3 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 rounded-full shadow-2xs">
          {badge}
        </span>
      )}

      <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-200 ease-out-quart ${tileColor}`}>
        <Icon className="w-5 h-5" strokeWidth={2.1} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-display font-bold text-sm sm:text-[15px] text-slate-900 dark:text-foreground leading-snug truncate group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>
        <p className="font-sans font-medium text-xs text-slate-500 dark:text-muted-foreground line-clamp-1 mt-0.5 leading-relaxed">
          {description || "Free in-browser utility"}
        </p>
      </div>

      <span className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200/70 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-150 shrink-0">
        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.25 group-hover:-translate-y-0.25 transition-transform" strokeWidth={2.3} />
      </span>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {cardInner}
      </Link>
    );
  }

  return cardInner;
};

export default ToolCard;
