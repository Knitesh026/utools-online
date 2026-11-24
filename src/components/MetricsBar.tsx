import React from "react";
import { toolCategories } from "@/data/tools";
import { Cpu, Lock, UserCheck, Sparkles } from "lucide-react";

const toolCount = new Set(toolCategories.flatMap((c) => c.tools.map((t) => t.to))).size;

const facts = [
  {
    value: String(toolCount),
    unit: "Utilities",
    label: "Free tools across six categories",
    icon: Cpu,
  },
  {
    value: "0",
    unit: "Sign-ups",
    label: "Accounts or sign-ups needed",
    icon: UserCheck,
  },
  {
    value: "0 B",
    unit: "Uploaded",
    label: "Of your files stored on our servers",
    icon: Lock,
  },
  {
    value: "$0",
    unit: "Forever",
    label: "To use any tool, no watermarks",
    icon: Sparkles,
  },
];

export const MetricsBar: React.FC = () => {
  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden bg-slate-950 text-white rounded-3xl px-6 py-8 sm:px-10 sm:py-11 border border-slate-800 shadow-hard-xl">
          <div
            aria-hidden
            className="absolute -top-24 -right-24 w-80 h-80 bg-primary/15 blur-3xl rounded-full pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/15 blur-3xl rounded-full pointer-events-none"
          />

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 divide-y sm:divide-y-0 lg:divide-x divide-slate-800/80">
            {facts.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className={`${i > 0 ? "lg:pl-8" : ""} pt-4 sm:pt-0`}>
                  <div className="flex items-center gap-2 text-slate-400 font-mono text-xs uppercase tracking-wider mb-2">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    <span>{m.unit}</span>
                  </div>
                  <div className="font-mono font-bold text-3xl sm:text-5xl tracking-tight text-white leading-none">
                    {m.value}
                  </div>
                  <div className="font-sans font-medium text-xs sm:text-sm text-slate-300 mt-2.5 leading-snug">
                    {m.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsBar;
