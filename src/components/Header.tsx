import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X, Search, ArrowRight } from "lucide-react";
import { toolCategories } from "@/data/tools";

const navCategories = [
  { name: "PDF", category: "Document Tools" },
  { name: "Image", category: "Image Tools" },
  { name: "Write", category: "Text Tools" },
  { name: "Color", category: "Color Tools" },
  { name: "Calculators", category: "Calculator Tools" },
  { name: "Utility", category: "Utility Tools" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (searchQuery.trim()) {
      navigate(`/tools?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/tools");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3">
      <div className="container mx-auto max-w-6xl p-0">
        <div className="flex items-center gap-2 sm:gap-3 h-14 pl-4 pr-2 bg-white border-2 border-border rounded-full">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0 group" aria-label="uTools.online home">
            <img
              src="/logo.png"
              alt="uTools.online"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Category nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 ml-2" aria-label="Tool categories">
            {navCategories.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={`/tools?category=${encodeURIComponent(item.category)}`}
                  className={`flex items-center gap-1 px-3.5 py-1.5 text-sm font-sans font-extrabold text-foreground rounded-full transition-colors ${
                    activeDropdown === item.name ? "bg-yellow" : "hover:bg-yellow"
                  }`}
                >
                  <span>{item.name}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>

                {activeDropdown === item.name && (
                  <div className="absolute left-0 top-full pt-2 w-64 z-50">
                    <div className="bg-white border-2 border-border rounded-3xl p-2 animate-in fade-in-50 duration-150">
                      <div className="px-3 py-1.5 font-display font-extrabold text-xs uppercase tracking-wider text-muted-foreground">
                        {item.name} tools
                      </div>
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
                              className="flex items-center gap-2.5 px-3 py-2 rounded-2xl text-sm font-sans font-bold text-foreground hover:bg-yellow transition-colors"
                            >
                              <span className="coin w-7 h-7 bg-white">
                                <Icon className="w-3.5 h-3.5" />
                              </span>
                              <span className="truncate">{tool.title}</span>
                            </Link>
                          );
                        })}
                      <Link
                        to={`/tools?category=${encodeURIComponent(item.category)}`}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between px-3 py-2 mt-1 border-t-2 border-border/15 text-xs font-sans font-extrabold text-secondary"
                      >
                        See all {item.name.toLowerCase()} tools <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2 ml-auto">
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="relative hidden md:block" role="search">
              <label htmlFor="header-search" className="sr-only">Search tools</label>
              <input
                id="header-search"
                type="text"
                placeholder="Search tools"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 lg:w-48 h-10 pl-9 pr-3 text-sm font-sans font-bold bg-background text-foreground placeholder:text-muted-foreground rounded-full border-2 border-border focus:outline-none focus:bg-white focus:w-56 transition-all"
              />
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </form>

            <Link
              to="/tools"
              className="hidden sm:inline-flex items-center h-10 px-5 rounded-full bg-primary text-white font-display font-extrabold text-sm border-2 border-border hover:-translate-y-0.5 transition-transform"
            >
              Browse all
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-white border-2 border-border rounded-3xl p-4 animate-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearchSubmit} className="relative mb-3" role="search">
              <label htmlFor="mobile-search" className="sr-only">Search tools</label>
              <input
                id="mobile-search"
                type="text"
                placeholder="Search tools, converters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-11 pr-4 text-base font-sans font-bold bg-background rounded-full border-2 border-border focus:outline-none focus:bg-white"
              />
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </form>

            <div className="grid grid-cols-2 gap-2 mb-3">
              {navCategories.map((item) => (
                <Link
                  key={item.name}
                  to={`/tools?category=${encodeURIComponent(item.category)}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-full border-2 border-border text-sm font-sans font-extrabold text-foreground hover:bg-yellow transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <Link
              to="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-primary text-white font-display font-extrabold border-2 border-border"
            >
              Browse all tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
