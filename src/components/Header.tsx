import { Search, Wrench, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toolCategories } from "@/data/tools";

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <header className="nav-header py-3 px-6 sticky top-0 z-50 backdrop-blur-sm bg-white/80">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-1">
            <Wrench className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">
              uTools<span className="text-primary"> .Online</span>
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            to="/"
            className="text-foreground hover:text-primary transition-colors text-sm font-medium"
          >
            Home
          </Link>

          {/* Tools Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 text-foreground hover:text-primary transition-colors text-sm font-medium py-2">
              Tools
              <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute left-0 mt-0 w-64 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {toolCategories.map((category) => (
                <Link
                  key={category.name}
                  to="/tools"
                  className="block px-4 py-3 text-sm text-foreground hover:bg-primary/10 hover:text-primary border-b border-border last:border-b-0 first:rounded-t-lg last:rounded-b-lg transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/tools"
            className="text-foreground hover:text-primary transition-colors text-sm font-medium"
          >
            Browse All
          </Link>
        </nav>

        {/* Search and Sign Up */}
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Find any tool..."
              className="search-input pl-10 w-40 lg:w-56 rounded-lg border border-border bg-card focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
