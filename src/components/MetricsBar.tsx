import React from "react";
import { toolCategories } from "@/data/tools";

const toolCount = new Set(toolCategories.flatMap((c) => c.tools.map((t) => t.to))).size;

const facts = [
  { value: String(toolCount), label: "Free tools across six categories" },
  { value: "0", label: "Accounts or sign-ups needed" },
  { value: "0 B", label: "Of your files stored on our servers" },
  { value: "$0", label: "To use any tool, no watermarks" },
];

export const MetricsBar: React.FC = () => {
  return (
    <section className="py-6 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="bg-foreground text-background rounded-[2rem] px-6 py-8 sm:px-10 sm:py-10 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
          {facts.map((m) => (
            <div key={m.label}>
              <div className="font-display font-extrabold text-4xl sm:text-5xl tracking-tighter leading-none text-yellow">
                {m.value}
              </div>
              <div className="font-sans font-bold text-sm mt-2 opacity-85">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsBar;
