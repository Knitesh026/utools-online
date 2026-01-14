import { Search, ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { toolCategories } from "@/data/tools";

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);

  // Filter tools based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return toolCategories
      .map((category) => ({
        ...category,
        tools: category.tools.filter((tool) =>
          tool.title.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((category) => category.tools.length > 0);
  }, [searchQuery]);

  return (
    <header className="nav-header py-2 px-4 sm:py-3 sm:px-6 sticky top-0 z-50 backdrop-blur-sm bg-white/80">
      <div className="container mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src="/logo.png" alt="uTools.online" className="h-8 w-auto" />
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {/* All Category Links */}
          {toolCategories.map((category) => (
            <div key={category.name} className="relative group">
              <button
                className="flex items-center gap-1.5 text-black hover:text-primary transition-colors text-sm font-medium py-2"
              >
                {category.name.replace(" Tools", "")}
                <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform" />
              </button>

              {/* Multi-column Category Tools Submenu */}
              <div className="absolute left-0 mt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pt-2">
                <div className="bg-white border border-border rounded-xl shadow-2xl overflow-hidden min-w-max">
                  {/* Header */}
                  <div className="px-6 py-4 border-b border-border/50 bg-gray-50">
                    <h3 className="text-sm font-bold text-gray-900">{category.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{category.description}</p>
                  </div>

                  {/* Tools Grid */}
                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-6">
                      {/* Split tools into 3 columns */}
                      {[0, 1, 2].map((columnIndex) => (
                        <div key={columnIndex} className="space-y-3">
                          {category.tools
                            .slice(
                              columnIndex * Math.ceil(category.tools.length / 3),
                              (columnIndex + 1) * Math.ceil(category.tools.length / 3)
                            )
                            .map((tool) => {
                              const Icon = tool.icon;
                              return (
                                <Link
                                  key={tool.title}
                                  to={tool.to}
                                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-primary/5 transition-colors group/item"
                                >
                                  <div 
                                    className="p-2 rounded-lg flex-shrink-0 mt-0.5"
                                    style={{ backgroundColor: category.colorTheme.accentColor + "15" }}
                                  >
                                    <Icon 
                                      className="h-4 w-4" 
                                      style={{ color: category.colorTheme.accentColor }}
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-900 group-hover/item:text-primary transition-colors">
                                      {tool.title}
                                    </p>
                                    {tool.description && (
                                      <p className="text-xs text-gray-500 mt-0.5">
                                        {tool.description}
                                      </p>
                                    )}
                                  </div>
                                </Link>
                              );
                            })}
                        </div>
                      ))}
                    </div>

                    {/* View All Button */}
                    <Link
                      to="/tools"
                      className="mt-4 pt-4 border-t border-border/50 text-xs font-semibold text-primary hover:text-primary/80 block text-center py-2 transition-colors"
                    >
                      View all {category.tools.length} tools →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Link
            to="/tools"
            className="text-foreground hover:text-primary transition-colors text-sm font-medium"
          >
            Browse All
          </Link>
        </nav>

        {/* Search and Sign Up */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Find any tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input pl-10 w-40 lg:w-56 rounded-lg border border-border bg-card focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all text-sm text-gray-900 dark:text-gray-100"
            />
            
            {/* Search Results Dropdown */}
            {searchQuery.trim() && filteredCategories.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                {filteredCategories.map((category) => (
                  <div key={category.name} className="border-b border-border/50 last:border-b-0">
                    <div
                      className="px-3 py-2 text-xs font-semibold"
                      style={{ color: category.colorTheme.accentColor }}
                    >
                      {category.name}
                    </div>
                    <div className="pl-5 pr-3 pb-2 space-y-1">
                      {category.tools.map((tool) => (
                        <Link
                          key={tool.title}
                          to={tool.to}
                          className="block text-sm text-muted-foreground hover:text-foreground py-1 transition-colors"
                          onClick={() => setSearchQuery("")}
                        >
                          {tool.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="hidden sm:block bg-primary hover:bg-primary/90 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
            Sign Up
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-border pt-2 pb-3">
          <Link
            to="/"
            className="block px-4 py-2 text-foreground hover:text-primary transition-colors text-sm font-medium"
          >
            Home
          </Link>
          
          {/* Mobile Categories */}
          {toolCategories.map((category) => (
            <div key={category.name}>
              <button
                onClick={() =>
                  setExpandedMobileCategory(
                    expandedMobileCategory === category.name ? null : category.name
                  )
                }
                className="w-full text-left px-4 py-2 text-foreground hover:text-primary transition-colors text-sm font-medium flex justify-between items-center"
              >
                {category.name}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    expandedMobileCategory === category.name ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              {expandedMobileCategory === category.name && (
                <div className="pl-6 pb-1 space-y-1">
                  {category.tools.slice(0, 5).map((tool) => (
                    <Link
                      key={tool.title}
                      to={tool.to}
                      className="block text-xs text-muted-foreground hover:text-foreground py-1 transition-colors"
                    >
                      {tool.title}
                    </Link>
                  ))}
                  {category.tools.length > 5 && (
                    <Link
                      to="/tools"
                      className="block text-xs text-primary font-medium py-1 transition-colors"
                    >
                      View all ({category.tools.length})
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
          
          <Link
            to="/tools"
            className="block px-4 py-2 text-foreground hover:text-primary transition-colors text-sm font-medium"
          >
            Browse All
          </Link>
          
          <div className="px-4 pt-2">
            <button className="w-full bg-primary hover:bg-primary/90 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
              Sign Up
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
