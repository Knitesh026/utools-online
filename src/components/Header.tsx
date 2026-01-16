import { ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toolCategories } from "@/data/tools";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Get featured tools for direct nav buttons
  const getTopToolsFromCategory = (categoryName: string, count: number = 3) => {
    const category = toolCategories.find(c => c.name === categoryName);
    return category ? category.tools.slice(0, count) : [];
  };

  const convertFromTools = toolCategories.find(c => c.name === "Document Tools")?.tools.slice(0, 6) || [];
  const convertToTools = toolCategories.find(c => c.name === "Image Tools")?.tools.slice(0, 6) || [];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 ml-4">
            <img src="/logo.png" alt="uTools.online" className="h-8 w-auto" />
          </Link>

          {/* Navigation - Desktop (Centered) */}
          <nav className="hidden lg:flex items-center gap-0 justify-center flex-1">
            {/* Direct Action Buttons */}
            {toolCategories.slice(0, 3).map((category, idx) => {
              const firstTool = category.tools[0];
              return (
                <Link
                  key={category.name}
                  to={firstTool.to}
                  className="px-4 py-4 text-sm font-bold text-foreground hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary whitespace-nowrap"
                >
                  {category.name.replace(" Tools", "").toUpperCase()}
                </Link>
              );
            })}

            {/* Convert PDF Dropdown */}
            <div className="relative group">
              <button
                onMouseEnter={() => setActiveDropdown("convert")}
                onMouseLeave={() => setActiveDropdown(null)}
                className="flex items-center gap-2 px-4 py-4 text-sm font-bold text-foreground hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary"
              >
                CONVERT PDF
                <ChevronDown className="h-3.5 w-3.5" />
              </button>

              {activeDropdown === "convert" && (
                <>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0 w-4 h-2 z-50 pointer-events-none">
                    <div className="w-4 h-2 bg-gradient-to-b from-primary to-primary" style={{clipPath: "polygon(50% 0, 0 100%, 100% 100%)"}}></div>
                  </div>
                  <div
                    onMouseEnter={() => setActiveDropdown("convert")}
                    onMouseLeave={() => setActiveDropdown(null)}
                     className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white border border-gray-200 shadow-lg z-50 rounded-xl"
                  >
                  <div className="grid grid-cols-2 gap-8 p-6 min-w-max">
                    <div>
                      <h3 className="text-xs font-bold text-gray-600 mb-3 uppercase">Convert To PDF</h3>
                      <div className="space-y-2">
                        {convertToTools.map((tool) => {
                          const IconComponent = tool.icon;
                          return (
                            <Link
                              key={tool.title}
                              to={tool.to}
                              className="flex items-center gap-2 text-sm text-gray-800 hover:text-primary transition-colors py-1"
                            >
                              <IconComponent className="h-4 w-4 flex-shrink-0" />
                              {tool.title}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-600 mb-3 uppercase">Convert From PDF</h3>
                      <div className="space-y-2">
                        {convertFromTools.map((tool) => {
                          const IconComponent = tool.icon;
                          return (
                            <Link
                              key={tool.title}
                              to={tool.to}
                              className="flex items-center gap-2 text-sm text-gray-800 hover:text-primary transition-colors py-1"
                            >
                              <IconComponent className="h-4 w-4 flex-shrink-0" />
                              {tool.title}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                </>
              )}
            </div>

            {/* All Tools Dropdown */}
            <div className="relative group">
              <button
                onMouseEnter={() => setActiveDropdown("all")}
                onMouseLeave={() => setActiveDropdown(null)}
                className="flex items-center gap-2 px-4 py-4 text-sm font-bold text-foreground hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary"
              >
                ALL TOOLS
                <ChevronDown className="h-3.5 w-3.5" />
              </button>

              {activeDropdown === "all" && (
                <>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0 w-4 h-2 z-50 pointer-events-none">
                    <div className="w-4 h-2 bg-gradient-to-b from-primary to-primary" style={{clipPath: "polygon(50% 100%, 0 0, 100% 0)"}}></div>
                  </div>
                    <div
                    onMouseEnter={() => setActiveDropdown("all")}
                    onMouseLeave={() => setActiveDropdown(null)}
                     className="absolute left-1/2 -translate-x-[70%] top-full mt-2 bg-white border border-gray-200 shadow-lg z-50 p-6 rounded-2xl"
                    >
                    <div className="grid grid-cols-6 gap-8 min-w-max">
                    {toolCategories.map((category) => (
                      <div key={category.name}>
                      <h3 className="text-xs font-bold text-gray-600 mb-2 uppercase pb-2 border-b border-gray-200">{category.name}</h3>
                      <div className="space-y-2">
                        {category.tools.slice(0, 8).map((tool)  => {
                        const IconComponent = tool.icon;
                        return (
                          <Link 
                          key={tool.title}
                          to={tool.to}
                          className="flex items-center gap-2 text-sm text-gray-800 hover:text-primary transition-colors py-1"
                          >
                          <IconComponent className="h-4 w-4 flex-shrink-0" />
                          {tool.title}
                          </Link>
                        );
                        })}
                        {category.tools.length > 8 && (
                        <Link
                          to={`/tools?category=${category.name}`}
                          className="block text-sm text-primary font-bold py-1"
                        >
                          View all →
                        </Link>
                        )}
                      </div>
                      </div>
                    ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Right Side - Login, Sign Up, Menu */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <button className="hidden text-gray-900 hover:text-primary transition-colors text-sm font-bold px-3 py-2">
              Login
            </button>

            <button className="hidden bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md text-sm font-bold transition-colors">
              Sign up
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
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-gray-200 bg-white pb-4">
          {/* Main nav items */}
          {toolCategories.slice(0, 3).map((category, idx) => {
            const firstTool = category.tools[0];
            return (
              <Link
                key={category.name}
                to={firstTool.to}
                className="block px-4 py-3 text-foreground hover:bg-gray-50 transition-colors text-sm font-bold border-b border-gray-100"
              >
                {category.name.replace(" Tools", "").toUpperCase()}
              </Link>
            );
          })}

          {/* Convert PDF Section */}
          <Link
            to="/tools?category=Document Tools"
            className="block px-4 py-3 text-foreground hover:bg-gray-50 transition-colors text-sm font-bold border-b border-gray-100"
          >
            CONVERT PDF
          </Link>

          {/* All Tools Section */}
          <Link
            to="/tools"
            className="block px-4 py-3 text-foreground hover:bg-gray-50 transition-colors text-sm font-bold border-b border-gray-100"
          >
            ALL TOOLS
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
