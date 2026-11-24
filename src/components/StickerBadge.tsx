import React from "react";

interface StickerBadgeProps {
  children: React.ReactNode;
  color?: "yellow" | "red" | "pink" | "blue" | "white" | "green";
  rotation?: number;
  shape?: "pill" | "star" | "circle";
  className?: string;
  icon?: React.ReactNode;
}

export const StickerBadge: React.FC<StickerBadgeProps> = ({
  children,
  color = "white",
  shape = "pill",
  className = "",
  icon,
}) => {
  const colorStyles = {
    red: "bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/60",
    yellow: "bg-amber-50 text-amber-800 border-amber-200/80 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60",
    pink: "bg-pink-50 text-pink-700 border-pink-200/80 dark:bg-pink-950/60 dark:text-pink-300 dark:border-pink-800/60",
    blue: "bg-blue-50 text-blue-700 border-blue-200/80 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60",
    white: "bg-white/90 text-slate-700 border-slate-200/90 dark:bg-slate-900/90 dark:text-slate-200 dark:border-slate-700/80",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60",
  }[color];

  const shapeStyles = {
    pill: "px-3 py-1 rounded-full",
    circle: "w-16 h-16 rounded-2xl flex flex-col items-center justify-center p-2 text-center text-[11px] leading-tight",
    star: "px-3.5 py-1.5 rounded-full",
  }[shape];

  return (
    <span
      className={`inline-flex items-center justify-center gap-1.5 font-sans font-semibold text-xs tracking-tight border shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm select-none ${colorStyles} ${shapeStyles} ${className}`}
    >
      {icon && <span className="shrink-0 flex items-center">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export default StickerBadge;
