import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  FileText,
  Image as ImageIcon,
  Calculator,
  QrCode,
  ShieldCheck,
  ArrowRight,
  Zap,
  CheckCircle2,
  Layers,
  Lock,
  Sliders,
} from "lucide-react";
import { toolCategories } from "@/data/tools";

const quickLaunches = [
  { label: "Merge PDF", to: "/merge-pdf", icon: FileText, tint: "text-rose-600 bg-rose-50 border-rose-200/70" },
  { label: "Compress PDF", to: "/compress-pdf", icon: Layers, tint: "text-amber-600 bg-amber-50 border-amber-200/70" },
  { label: "Image Compressor", to: "/image-compressor", icon: ImageIcon, tint: "text-indigo-600 bg-indigo-50 border-indigo-200/70" },
  { label: "Background Remover", to: "/remove-background", icon: Sliders, tint: "text-purple-600 bg-purple-50 border-purple-200/70" },
  { label: "EMI Calculator", to: "/emi-calculator", icon: Calculator, tint: "text-emerald-600 bg-emerald-50 border-emerald-200/70" },
  { label: "QR Generator", to: "/qr-code", icon: QrCode, tint: "text-sky-600 bg-sky-50 border-sky-200/70" },
];

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activePreview, setActivePreview] = useState<"pdf" | "image" | "calc">("pdf");
  const [compressionQuality, setCompressionQuality] = useState(76);
  const [loanAmount, setLoanAmount] = useState(1200000);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const allTools = useMemo(() => {
    const seen = new Set<string>();
    const list: Array<{ title: string; description: string; to: string; category: string; icon: any }> = [];
    for (const cat of toolCategories) {
      for (const t of cat.tools) {
        if (!seen.has(t.to)) {
          seen.add(t.to);
          list.push({
            title: t.title,
            description: t.description || "Free in-browser utility",
            to: t.to,
            category: cat.name,
            icon: t.icon,
          });
        }
      }
    }
    return list;
  }, []);

  const liveMatches = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];
    return allTools
      .filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q),
      )
      .slice(0, 6);
  }, [searchQuery, allTools]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const goSearch = (term: string) => {
    const q = term.trim();
    if (liveMatches.length === 1) {
      navigate(liveMatches[0].to);
      return;
    }
    navigate(q ? `/tools?search=${encodeURIComponent(q)}` : "/tools");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goSearch(searchQuery);
  };

  // Interactive mini-workbench math
  const originalKb = 2480;
  const compressedKb = Math.round(originalKb * (0.14 + (compressionQuality / 100) * 0.42));
  const savedPct = Math.round((1 - compressedKb / originalKb) * 100);

  const monthlyRate = 8.5 / 12 / 100;
  const months = 60;
  const sampleEmi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1),
  );

  return (
    <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-20 overflow-hidden border-b border-slate-200/70">
      {/* Architectural Grid & Radial Ambient Glow */}
      <div
        aria-hidden
        className="absolute inset-0 bg-studio-grid [mask-image:radial-gradient(ellipse_80%_70%_at_50%_20%,#000_55%,transparent_100%)] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[48rem] h-[22rem] bg-gradient-to-tr from-rose-500/10 via-blue-500/8 to-amber-400/10 blur-3xl rounded-full pointer-events-none"
      />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status Telemetry Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200/90 shadow-hard-sm mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] sm:text-xs font-semibold text-slate-700 tracking-tight">
              Client-Side WebAssembly Studio · Zero Server Uploads
            </span>
          </div>

          <h1 className="font-display font-extrabold text-[2.5rem] leading-[1.02] sm:text-6xl lg:text-[4.4rem] tracking-[-0.035em] text-slate-950 max-w-4xl mx-auto">
            Free tools for your{" "}
            <span className="relative inline-block text-primary">
              files
              <svg
                aria-hidden
                viewBox="0 0 220 14"
                fill="none"
                className="absolute -bottom-1 left-0 w-full h-2.5 text-primary/30"
              >
                <path
                  d="M3 10.5C58 3.5 154 2.5 217 9.5"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            and numbers
          </h1>

          <p className="font-sans font-medium text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-5 mb-8 leading-relaxed">
            Merge PDFs, compress high-res images, and run financial or developer calculations directly in your browser. No sign-ups, no watermarks, and your files never leave your device.
          </p>

          {/* Interactive Search Bar with Live Autocomplete */}
          <div ref={searchContainerRef} className="relative max-w-2xl mx-auto z-30">
            <form onSubmit={handleSubmit} role="search">
              <div
                className={`flex items-center gap-2 p-2 bg-white rounded-2xl border transition-all duration-200 ${
                  focused
                    ? "border-primary/50 shadow-[0_0_0_4px_rgba(237,43,62,0.08),0_16px_36px_-8px_rgba(15,23,42,0.12)]"
                    : "border-slate-200/95 shadow-studio"
                }`}
              >
                <Search className="w-5 h-5 ml-3 text-slate-400 shrink-0" aria-hidden />
                <label htmlFor="hero-search" className="sr-only">
                  Search tools
                </label>
                <input
                  id="hero-search"
                  type="text"
                  placeholder="Search 39+ tools (e.g. Merge PDF, Image Compressor, EMI, QR Code)..."
                  value={searchQuery}
                  onFocus={() => setFocused(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setFocused(true);
                  }}
                  className="flex-1 min-w-0 bg-transparent font-sans font-medium text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none py-2"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-slate-900 hover:bg-primary text-white font-display font-bold text-xs sm:text-sm px-5 sm:px-6 py-3 shadow-sm active:scale-[0.97] transition-all duration-150"
                >
                  Find tool
                </button>
              </div>
            </form>

            {/* Live Instant Search Dropdown */}
            {focused && liveMatches.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-2 shadow-hard-xl text-left animate-scale-in origin-top">
                <div className="px-3 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Instant Matches ({liveMatches.length})</span>
                  <span>Click to launch</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {liveMatches.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.to}
                        to={tool.to}
                        onClick={() => setFocused(false)}
                        className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-700 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                            <Icon className="w-4 h-4" />
                          </span>
                          <div className="min-w-0">
                            <div className="font-display font-bold text-sm text-slate-900 truncate">
                              {tool.title}
                            </div>
                            <div className="text-xs text-slate-500 truncate">
                              {tool.description}
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors shrink-0">
                          Open →
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Quick-Launch Tool Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <span className="font-mono text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
              Popular:
            </span>
            {quickLaunches.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-hard-sm font-sans font-semibold text-xs text-slate-700 hover:border-slate-300 hover:text-slate-950 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-150"
                >
                  <span className={`w-4 h-4 rounded flex items-center justify-center ${item.tint}`}>
                    <Icon className="w-3 h-3" />
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Interactive Studio Workbench Preview Card */}
        <div className="max-w-4xl mx-auto mt-10 sm:mt-12">
          <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-studio-lg overflow-hidden">
            {/* Workbench Window Chrome */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-3 bg-slate-50/90 border-b border-slate-200/80">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 mr-2" aria-hidden>
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="inline-flex p-0.5 rounded-xl bg-slate-200/70 border border-slate-200">
                  {[
                    { id: "pdf", label: "PDF Engine", icon: FileText },
                    { id: "image", label: "Image Lab", icon: ImageIcon },
                    { id: "calc", label: "Finance & Math", icon: Calculator },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const active = activePreview === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActivePreview(tab.id as "pdf" | "image" | "calc")}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-sans font-semibold transition-all duration-150 ${
                          active
                            ? "bg-white text-slate-900 shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-primary" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-md font-semibold">
                  <Lock className="w-3 h-3" /> Local Memory Only
                </span>
                <span>Latency: &lt;16ms</span>
              </div>
            </div>

            {/* Interactive Preview Body */}
            <div className="p-5 sm:p-6">
              {activePreview === "pdf" && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  <div className="md:col-span-7 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-1">
                      <span>QUEUE · 3 DOCUMENTS READY</span>
                      <span className="text-emerald-600 font-semibold">pdf-lib WebWorker</span>
                    </div>
                    {[
                      { name: "Q4-Financial-Statement.pdf", pages: "14 pages", size: "1.8 MB", tag: "01" },
                      { name: "Signed-Vendor-Agreement.pdf", pages: "4 pages", size: "620 KB", tag: "02" },
                      { name: "Tax-Annexure-2026.pdf", pages: "6 pages", size: "940 KB", tag: "03" },
                    ].map((doc) => (
                      <div
                        key={doc.name}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50/90 border border-slate-200/80 hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-mono text-xs font-bold px-2 py-1 rounded-lg bg-rose-50 text-rose-600 border border-rose-200/60">
                            {doc.tag}
                          </span>
                          <div className="min-w-0">
                            <div className="font-sans font-bold text-xs sm:text-sm text-slate-900 truncate">
                              {doc.name}
                            </div>
                            <div className="font-mono text-[11px] text-slate-500">
                              {doc.pages} · {doc.size}
                            </div>
                          </div>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      </div>
                    ))}
                  </div>

                  <div className="md:col-span-5 bg-slate-900 text-white rounded-2xl p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-rose-400 font-semibold">
                        Zero-Upload PDF Suite
                      </span>
                      <h2 className="font-display font-bold text-lg sm:text-xl leading-snug">
                        Merge, compress, sign & convert PDFs locally
                      </h2>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Combine multi-part reports or shrink PDF attachments directly in RAM without sending sensitive pages to external servers.
                      </p>
                    </div>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <Link
                        to="/merge-pdf"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white font-display font-bold text-xs hover:bg-primary/90 transition-all"
                      >
                        <span>Launch PDF Merger</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to="/compress-pdf"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-sans font-semibold text-xs transition-colors"
                      >
                        <span>Compress PDF</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {activePreview === "image" && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  <div className="md:col-span-7 space-y-4 bg-slate-50/90 border border-slate-200/80 rounded-2xl p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-display font-bold text-sm text-slate-900">
                          Interactive Quality Simulator
                        </div>
                        <div className="text-xs text-slate-500">
                          Drag slider to preview real-time Canvas JPEG/WebP quantization
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
                        Quality: {compressionQuality}%
                      </span>
                    </div>

                    <input
                      type="range"
                      min={20}
                      max={95}
                      value={compressionQuality}
                      onChange={(e) => setCompressionQuality(Number(e.target.value))}
                      aria-label="Simulated compression quality"
                      className="w-full accent-primary cursor-pointer"
                    />

                    <div className="grid grid-cols-3 gap-2.5 pt-1">
                      <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                        <div className="font-mono text-[10px] uppercase text-slate-400">Original</div>
                        <div className="font-mono font-bold text-sm sm:text-base text-slate-800 mt-0.5">
                          2,480 KB
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                        <div className="font-mono text-[10px] uppercase text-slate-400">Compressed</div>
                        <div className="font-mono font-bold text-sm sm:text-base text-indigo-600 mt-0.5">
                          {compressedKb.toLocaleString()} KB
                        </div>
                      </div>
                      <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200/80">
                        <div className="font-mono text-[10px] uppercase text-emerald-700">Saved</div>
                        <div className="font-mono font-bold text-sm sm:text-base text-emerald-700 mt-0.5">
                          -{savedPct}%
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-5 bg-slate-900 text-white rounded-2xl p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-indigo-400 font-semibold">
                        HTML5 Canvas & WebGL
                      </span>
                      <h2 className="font-display font-bold text-lg sm:text-xl leading-snug">
                        13 studio-grade image processors
                      </h2>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Compress, resize, crop, remove backgrounds, blur faces, or inspect RGB histograms with instant visual feedback.
                      </p>
                    </div>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <Link
                        to="/image-compressor"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white font-display font-bold text-xs hover:bg-primary/90 transition-all"
                      >
                        <span>Open Image Compressor</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to="/remove-background"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-sans font-semibold text-xs transition-colors"
                      >
                        <span>Remove BG</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {activePreview === "calc" && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  <div className="md:col-span-7 space-y-4 bg-slate-50/90 border border-slate-200/80 rounded-2xl p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-display font-bold text-sm text-slate-900">
                          Instant EMI & Amortization Preview
                        </div>
                        <div className="text-xs text-slate-500">
                          8.5% p.a. · 5 Years (60 Months)
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                        Principal: ₹{(loanAmount / 100000).toFixed(1)}L
                      </span>
                    </div>

                    <input
                      type="range"
                      min={200000}
                      max={5000000}
                      step={100000}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      aria-label="Simulated loan principal"
                      className="w-full accent-primary cursor-pointer"
                    />

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                        <div className="font-mono text-[10px] uppercase text-slate-400">Monthly EMI</div>
                        <div className="font-mono font-bold text-base sm:text-lg text-slate-900 mt-0.5">
                          ₹{sampleEmi.toLocaleString("en-IN")}/mo
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                        <div className="font-mono text-[10px] uppercase text-slate-400">Total Interest</div>
                        <div className="font-mono font-bold text-base sm:text-lg text-emerald-700 mt-0.5">
                          ₹{(sampleEmi * months - loanAmount).toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-5 bg-slate-900 text-white rounded-2xl p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400 font-semibold">
                        Verified Financial Formulas
                      </span>
                      <h2 className="font-display font-bold text-lg sm:text-xl leading-snug">
                        SIP, EMI, GST, Mortgage & PPP Calculators
                      </h2>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Every calculator includes transparent mathematical formulas, step-by-step worked examples, and zero tracking.
                      </p>
                    </div>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <Link
                        to="/emi-calculator"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white font-display font-bold text-xs hover:bg-primary/90 transition-all"
                      >
                        <span>Open EMI Calculator</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to="/sip-calculator"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-sans font-semibold text-xs transition-colors"
                      >
                        <span>SIP Calculator</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
export default Hero;
