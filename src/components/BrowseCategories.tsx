import React from "react";
import { Link } from "react-router-dom";
import { FileText, Image as ImageIcon, Type, Palette, Calculator, Wrench, ArrowUpRight, ArrowRight } from "lucide-react";
import { toolCategories } from "@/data/tools";

interface Plane {
  icon: React.ElementType;
  bg: string;
  blurb: string;
  span: string;
}

/** Colour, icon and copy per real category in data/tools.ts. */
const planes: Record<string, Plane> = {
  "Document Tools": { icon: FileText, bg: "bg-yellow", blurb: "Merge, compress, convert and sign PDFs", span: "md:col-span-3" },
  "Image Tools": { icon: ImageIcon, bg: "bg-pink", blurb: "Resize, remove backgrounds, convert formats", span: "md:col-span-3" },
  "Text Tools": { icon: Type, bg: "bg-lime", blurb: "Count, reverse and clean up text", span: "md:col-span-2" },
  "Color Tools": { icon: Palette, bg: "bg-sky", blurb: "Pickers, gradients and converters", span: "md:col-span-2" },
  "Calculator Tools": { icon: Calculator, bg: "bg-peach", blurb: "EMI, SIP, GST, BMI and more", span: "md:col-span-2" },
  "Utility Tools": { icon: Wrench, bg: "bg-lilac", blurb: "QR codes, passwords, UUIDs", span: "md:col-span-6" },
};

export const BrowseCategories: React.FC = () => {
  return (
    <section className="py-10 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tighter leading-none">
            Pick a pile
          </h2>
          <Link to="/tools" className="btn-white text-sm px-5 py-2">
            All categories <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 sm:gap-4">
          {toolCategories.map((cat) => {
            const plane = planes[cat.name] ?? { icon: Wrench, bg: "bg-yellow", blurb: "", span: "md:col-span-2" };
            const Icon = plane.icon;
            const wide = plane.span === "md:col-span-6";
            return (
              <Link
                key={cat.name}
                to={`/tools?category=${encodeURIComponent(cat.name)}`}
                className={`card-ink group flex flex-col justify-between gap-6 p-5 sm:p-6 ${wide ? "min-h-[8.5rem]" : "min-h-[10.5rem]"} ${plane.bg} ${plane.span}`}
              >
                <span className="self-start font-display font-extrabold text-xs bg-foreground text-background rounded-full px-3 py-1">
                  {cat.tools.length} {cat.tools.length === 1 ? "tool" : "tools"}
                </span>
                <div className={`flex items-end justify-between gap-3 ${wide ? "flex-1" : ""}`}>
                  <div>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight leading-none">
                      {cat.name}
                    </h3>
                    <p className="font-sans font-bold text-sm mt-1.5">{plane.blurb}</p>
                  </div>
                  <span className="coin w-12 h-12 bg-white group-hover:bg-foreground group-hover:text-background transition-colors">
                    {wide ? <ArrowUpRight className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </span>
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
