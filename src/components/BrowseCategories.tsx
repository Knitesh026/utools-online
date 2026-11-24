import React from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Image as ImageIcon,
  Type,
  Palette,
  Calculator,
  Wrench,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { toolCategories } from "@/data/tools";

interface CategoryMeta {
  icon: React.ElementType;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  gradientGlow: string;
  blurb: string;
  span: string;
}

const categoryMeta: Record<string, CategoryMeta> = {
  "Document Tools": {
    icon: FileText,
    accentBg: "bg-rose-50",
    accentText: "text-rose-600",
    accentBorder: "border-rose-200/80",
    gradientGlow: "from-rose-500/8 via-transparent to-transparent",
    blurb: "Merge, compress, convert, and eSign PDF documents locally in browser memory.",
    span: "md:col-span-3",
  },
  "Image Tools": {
    icon: ImageIcon,
    accentBg: "bg-indigo-50",
    accentText: "text-indigo-600",
    accentBorder: "border-indigo-200/80",
    gradientGlow: "from-indigo-500/8 via-transparent to-transparent",
    blurb: "Resize, compress, remove backgrounds, sharpen, blur faces, and convert formats.",
    span: "md:col-span-3",
  },
  "Text Tools": {
    icon: Type,
    accentBg: "bg-emerald-50",
    accentText: "text-emerald-600",
    accentBorder: "border-emerald-200/80",
    gradientGlow: "from-emerald-500/8 via-transparent to-transparent",
    blurb: "Analyze word counts, reading time, sentence density, and transform text strings.",
    span: "md:col-span-2",
  },
  "Color Tools": {
    icon: Palette,
    accentBg: "bg-sky-50",
    accentText: "text-sky-600",
    accentBorder: "border-sky-200/80",
    gradientGlow: "from-sky-500/8 via-transparent to-transparent",
    blurb: "Extract image palettes, convert HEX/RGB/HSL, and craft CSS gradients.",
    span: "md:col-span-2",
  },
  "Calculator Tools": {
    icon: Calculator,
    accentBg: "bg-amber-50",
    accentText: "text-amber-600",
    accentBorder: "border-amber-200/80",
    gradientGlow: "from-amber-500/8 via-transparent to-transparent",
    blurb: "Compute loan EMI, SIP returns, GST, mortgages, BMI, age, and unit conversions.",
    span: "md:col-span-2",
  },
  "Utility Tools": {
    icon: Wrench,
    accentBg: "bg-blue-50",
    accentText: "text-blue-600",
    accentBorder: "border-blue-200/80",
    gradientGlow: "from-blue-500/8 via-transparent to-transparent",
    blurb: "Generate high-density QR codes, barcodes, cryptographic passwords, UUIDs, and Base64.",
    span: "md:col-span-6",
  },
};

export const BrowseCategories: React.FC = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary block mb-1.5">
              Specialized Workbenches
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-950 leading-none">
              Explore by category
            </h2>
          </div>
          <Link to="/tools" className="btn-white text-xs sm:text-sm px-4 py-2.5">
            <span>Full tool directory</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {toolCategories.map((cat) => {
            const meta = categoryMeta[cat.name] ?? {
              icon: Wrench,
              accentBg: "bg-slate-100",
              accentText: "text-slate-700",
              accentBorder: "border-slate-200",
              gradientGlow: "from-slate-500/5 via-transparent to-transparent",
              blurb: cat.description,
              span: "md:col-span-2",
            };
            const Icon = meta.icon;
            const wide = meta.span === "md:col-span-6";

            return (
              <Link
                key={cat.name}
                to={`/tools?category=${encodeURIComponent(cat.name)}`}
                onMouseMove={handleMouseMove}
                className={`card-ink spotlight-card group relative flex flex-col justify-between gap-5 p-6 bg-gradient-to-br ${meta.gradientGlow} ${meta.span}`}
              >
                <div className="relative z-10 flex items-center justify-between gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-transform duration-200 ease-out-quart group-hover:scale-105 ${meta.accentBg} ${meta.accentText} ${meta.accentBorder}`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={2.1} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-xs text-slate-600 bg-slate-100 border border-slate-200/80 rounded-full px-3 py-1">
                      {cat.tools.length} {cat.tools.length === 1 ? "tool" : "tools"}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors duration-150">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className={`relative z-10 ${wide ? "flex flex-col lg:flex-row lg:items-end justify-between gap-4" : "space-y-3"}`}>
                  <div className="max-w-xl">
                    <h3 className="font-display font-bold text-xl sm:text-2xl tracking-tight text-slate-950 group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                    <p className="font-sans font-medium text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {meta.blurb}
                    </p>
                  </div>

                  {/* Preview chips of actual tools in this category */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cat.tools.slice(0, wide ? 5 : 3).map((t) => (
                      <span
                        key={t.title}
                        className="text-[11px] font-sans font-semibold px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 border border-slate-200/80 group-hover:border-slate-300 transition-colors"
                      >
                        {t.title}
                      </span>
                    ))}
                    {cat.tools.length > (wide ? 5 : 3) && (
                      <span className="text-[11px] font-mono font-semibold px-2 py-1 rounded-lg bg-slate-100 text-slate-500">
                        +{cat.tools.length - (wide ? 5 : 3)} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrowseCategories;
