import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  Search,
  ArrowRight,
  BookOpen,
  Sparkles,
  CornerDownLeft,
  ShieldCheck,
  FileText,
  Image as ImageIcon,
  Type,
  Palette,
  Calculator,
  Wrench,
} from "lucide-react";
import { toolCategories } from "@/data/tools";
import { allGuides } from "@/data/allGuides";

const navCategories = [
  { name: "PDF", category: "Document Tools", icon: FileText, tint: "text-rose-600 bg-rose-50 border-rose-200/70" },
  { name: "Image", category: "Image Tools", icon: ImageIcon, tint: "text-indigo-600 bg-indigo-50 border-indigo-200/70" },
  { name: "Write", category: "Text Tools", icon: Type, tint: "text-emerald-600 bg-emerald-50 border-emerald-200/70" },
  { name: "Color", category: "Color Tools", icon: Palette, tint: "text-sky-600 bg-sky-50 border-sky-200/70" },
  { name: "Calculators", category: "Calculator Tools", icon: Calculator, tint: "text-amber-600 bg-amber-50 border-amber-200/70" },
  { name: "Utility", category: "Utility Tools", icon: Wrench, tint: "text-blue-600 bg-blue-50 border-blue-200/70" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setCommandOpen(false);
  }, [location.pathname, location.search]);

  // Global Cmd+K / Ctrl+K shortcut (instant, zero-latency per Raycast/Emil Kowalski pattern)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      } else if (e.key === "Escape" && commandOpen) {
        setCommandOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [commandOpen]);

  useEffect(() => {
    if (commandOpen) {
      setSelectedIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setSearchQuery("");
    }
  }, [commandOpen]);

  const allToolsFlat = useMemo(() => {
    const seen = new Set<string>();
    const list: Array<{ title: string; description: string; to: string; category: string; icon: any }> = [];
    for (const cat of toolCategories) {
      for (const t of cat.tools) {
        if (!seen.has(t.to)) {
          seen.add(t.to);
          list.push({
            title: t.title,
            description: t.description || "In-browser utility",
            to: t.to,
            category: cat.name,
            icon: t.icon,
          });
        }
      }
    }
    return list;
  }, []);

  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      return {
        tools: allToolsFlat.slice(0, 8),
        guides: allGuides.slice(0, 3),
      };
    }
    return {
      tools: allToolsFlat
        .filter(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q) ||
            t.category.toLowerCase().includes(q),
        )
        .slice(0, 8),
      guides: allGuides
        .filter((g) => g.title.toLowerCase().includes(q) || g.category.toLowerCase().includes(q))
        .slice(0, 4),
    };
  }, [searchQuery, allToolsFlat]);

  const flatSelectable = useMemo(() => {
    return [
      ...searchResults.tools.map((t) => ({ type: "tool" as const, label: t.title, sub: t.description, to: t.to, badge: t.category.replace(" Tools", ""), icon: t.icon })),
      ...searchResults.guides.map((g) => ({ type: "guide" as const, label: g.title, sub: `${g.readTime} · ${g.category}`, to: `/guides/${g.slug}`, badge: "Guide", icon: BookOpen })),
    ];
  }, [searchResults]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  const handleCommandKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (flatSelectable.length ? (prev + 1) % flatSelectable.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (flatSelectable.length ? (prev - 1 + flatSelectable.length) % flatSelectable.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flatSelectable[selectedIndex]) {
        navigate(flatSelectable[selectedIndex].to);
        setCommandOpen(false);
      } else if (searchQuery.trim()) {
        navigate(`/tools?search=${encodeURIComponent(searchQuery.trim())}`);
        setCommandOpen(false);
      }
    }
  };

  const handleMobileSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (searchQuery.trim()) {
      navigate(`/tools?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/tools");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 transition-all duration-200">
        <div className="container mx-auto max-w-6xl p-0">
          <div
            className={`flex items-center gap-2 sm:gap-3 h-14 pl-4 pr-2.5 rounded-2xl transition-all duration-200 ${
              scrolled
                ? "bg-white/90 dark:bg-card/90 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_30px_rgb(15,23,42,0.08)]"
                : "bg-white/80 dark:bg-card/80 backdrop-blur-md border border-slate-200/80 shadow-[0_2px_12px_rgb(15,23,42,0.04)]"
            }`}
          >
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 flex-shrink-0 group focus-visible:outline-none"
              aria-label="uTools.online home"
            >
              <img
                src="/logo.png"
                alt="uTools.online"
                className="h-7 sm:h-8 w-auto object-contain transition-transform duration-150 ease-out-quart group-hover:scale-[1.03]"
              />
            </Link>

            <div className="hidden lg:block h-5 w-px bg-slate-200 mx-1" aria-hidden />

            {/* Category nav */}
            <nav className="hidden lg:flex items-center gap-0.5 flex-1" aria-label="Tool categories">
              {navCategories.map((item) => {
                const isOpen = activeDropdown === item.name;
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      to={`/tools?category=${encodeURIComponent(item.category)}`}
                      className={`flex items-center gap-1 px-3 py-1.5 text-[13px] font-sans font-semibold rounded-xl transition-all duration-150 ${
                        isOpen
                          ? "bg-slate-900 text-white shadow-sm"
                          : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/80"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-150 ${
                          isOpen ? "rotate-180 opacity-100" : "opacity-60"
                        }`}
                      />
                    </Link>

                    {isOpen && (
                      <div className="absolute left-0 top-full pt-2 w-72 z-50">
                        <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-2 shadow-hard-xl origin-top-left animate-scale-in">
                          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 mb-1">
                            <span className="font-display font-bold text-xs uppercase tracking-wider text-slate-500">
                              {item.name} Studio
                            </span>
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${item.tint}`}>
                              {toolCategories.find((c) => c.name === item.category)?.tools.length || 0} tools
                            </span>
                          </div>
                          <div className="space-y-0.5">
                            {toolCategories
                              .find((c) => c.name === item.category)
                              ?.tools.slice(0, 6)
                              .map((tool) => {
                                const Icon = tool.icon;
                                return (
                                  <Link
                                    key={tool.title}
                                    to={tool.to}
                                    onClick={() => setActiveDropdown(null)}
                                    className="flex items-center gap-3 px-2.5 py-2 rounded-xl text-sm font-sans font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors group/item"
                                  >
                                    <span
                                      className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 transition-transform duration-150 group-hover/item:scale-105 ${item.tint}`}
                                    >
                                      <Icon className="w-4 h-4" />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                      <div className="truncate text-[13px] font-bold text-slate-900">
                                        {tool.title}
                                      </div>
                                      {tool.description && (
                                        <div className="truncate text-[11px] font-medium text-slate-500">
                                          {tool.description}
                                        </div>
                                      )}
                                    </div>
                                  </Link>
                                );
                              })}
                          </div>
                          <Link
                            to={`/tools?category=${encodeURIComponent(item.category)}`}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center justify-between px-3 py-2 mt-1 border-t border-slate-100 rounded-b-xl text-xs font-sans font-bold text-primary hover:bg-rose-50/50 transition-colors"
                          >
                            <span>Explore all {item.name.toLowerCase()} tools</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <Link
                to="/guides"
                className="flex items-center gap-1 px-3 py-1.5 text-[13px] font-sans font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 rounded-xl transition-colors"
              >
                <span>Guides</span>
              </Link>
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Command Palette Trigger */}
              <button
                type="button"
                onClick={() => setCommandOpen(true)}
                className="hidden md:flex items-center justify-between gap-3 w-48 lg:w-56 h-9 pl-3 pr-2 text-xs font-sans font-medium bg-slate-50/90 hover:bg-slate-100/80 text-slate-500 rounded-xl border border-slate-200/90 transition-all duration-150 active:scale-[0.98]"
                aria-label="Search tools and guides"
              >
                <span className="flex items-center gap-2 truncate">
                  <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Quick search...</span>
                </span>
                <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-500 bg-white rounded-md border border-slate-200 shadow-[0_1px_0_rgba(0,0,0,0.05)]">
                  ⌘K
                </kbd>
              </button>

              {/* Mobile Search Trigger */}
              <button
                type="button"
                onClick={() => setCommandOpen(true)}
                className="md:hidden w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200/80 active:scale-95 transition-transform"
                aria-label="Search tools"
              >
                <Search className="w-4 h-4" />
              </button>

              <Link
                to="/tools"
                className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-xl bg-primary text-white font-display font-bold text-xs shadow-[0_1px_2px_rgba(237,43,62,0.2),0_4px_12px_-2px_rgba(237,43,62,0.35)] hover:bg-primary/95 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-150"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>All Tools</span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center active:scale-95 transition-transform"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-2 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-4 shadow-hard-xl animate-scale-in origin-top">
              <form onSubmit={handleMobileSearchSubmit} className="relative mb-3" role="search">
                <label htmlFor="mobile-search" className="sr-only">
                  Search tools
                </label>
                <input
                  id="mobile-search"
                  type="text"
                  placeholder="Search 39+ tools & calculators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 text-sm font-sans font-medium bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:bg-white focus:border-primary"
                />
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </form>

              <div className="grid grid-cols-2 gap-2 mb-3">
                {navCategories.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={`/tools?category=${encodeURIComponent(item.category)}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200/80 bg-slate-50/50 text-xs font-sans font-bold text-slate-800 hover:bg-slate-100 transition-colors"
                    >
                      <span className={`w-6 h-6 rounded-md border flex items-center justify-center ${item.tint}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <Link
                  to="/guides"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-display font-bold text-xs border border-slate-200"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Guides</span>
                </Link>
                <Link
                  to="/tools"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary text-white font-display font-bold text-xs shadow-sm"
                >
                  <span>Browse all tools</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Instant Command Palette Overlay (Cmd+K) */}
      {commandOpen && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/40 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4"
          onClick={() => setCommandOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Quick command palette"
        >
          <div
            className="w-full max-w-xl bg-white dark:bg-card border border-slate-200/90 rounded-2xl shadow-hard-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100">
              <Search className="w-4 h-4 text-primary shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleCommandKeyDown}
                placeholder="Type a tool or task (e.g. merge pdf, compress image, emi, qr code)..."
                className="flex-1 bg-transparent text-sm sm:text-base font-sans font-medium text-foreground placeholder:text-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setCommandOpen(false)}
                className="px-2 py-1 text-[11px] font-mono font-semibold text-slate-500 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
              >
                ESC
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
              {flatSelectable.length === 0 ? (
                <div className="py-10 text-center space-y-2">
                  <p className="font-display font-bold text-sm text-slate-700">
                    No matching utilities for "{searchQuery}"
                  </p>
                  <p className="text-xs text-slate-500">
                    Try searching for PDF, Image, Calculator, QR, or Password.
                  </p>
                </div>
              ) : (
                <>
                  <div className="px-2.5 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                    {searchQuery ? "Matching Results" : "Popular Utilities & Guides"}
                  </div>
                  {flatSelectable.map((item, idx) => {
                    const Icon = item.icon;
                    const active = idx === selectedIndex;
                    return (
                      <button
                        key={item.to + idx}
                        type="button"
                        onMouseEnter={() => setSelectedIndex(idx)}
                        onClick={() => {
                          navigate(item.to);
                          setCommandOpen(false);
                        }}
                        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                          active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                              active
                                ? "bg-white/10 border-white/15 text-white"
                                : "bg-slate-50 border-slate-200/80 text-slate-700"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                          <div className="min-w-0">
                            <div className="font-display font-bold text-sm truncate">
                              {item.label}
                            </div>
                            <div
                              className={`text-xs truncate ${
                                active ? "text-slate-300" : "text-slate-500"
                              }`}
                            >
                              {item.sub}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md ${
                              active
                                ? "bg-white/15 text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {item.badge}
                          </span>
                          <CornerDownLeft
                            className={`w-3.5 h-3.5 ${
                              active ? "opacity-100 text-white" : "opacity-0"
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </>
              )}
            </div>

            <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] font-sans font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Client-Side Execution</span>
              </span>
              <span className="hidden sm:inline font-mono">↑↓ to navigate · ↵ to open</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
