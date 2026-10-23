import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileText, Image as ImageIcon, Calculator, QrCode } from "lucide-react";

const quickSearches = ["Merge PDF", "Compress PDF", "Image Compressor", "Word Counter", "QR Code"];

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const goSearch = (term: string) => {
    const q = term.trim();
    navigate(q ? `/tools?search=${encodeURIComponent(q)}` : "/tools");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goSearch(searchQuery);
  };

  return (
    <section className="relative pt-32 sm:pt-36 pb-12 sm:pb-16 overflow-hidden">
      {/* Decorative icon coins, hidden on small screens */}
      <span aria-hidden className="coin hidden lg:flex absolute left-[5%] top-40 w-20 h-20 bg-pink -rotate-12">
        <FileText className="w-8 h-8" />
      </span>
      <span aria-hidden className="coin hidden lg:flex absolute right-[6%] top-32 w-20 h-20 bg-yellow rotate-12">
        <ImageIcon className="w-8 h-8" />
      </span>
      <span aria-hidden className="coin hidden lg:flex absolute left-[2%] bottom-4 w-16 h-16 bg-sky rotate-6">
        <Calculator className="w-7 h-7" />
      </span>
      <span aria-hidden className="coin hidden lg:flex absolute right-[2%] bottom-4 w-16 h-16 bg-lime -rotate-6">
        <QrCode className="w-7 h-7" />
      </span>

      <div className="container mx-auto px-4 sm:px-6 relative text-center">
        <h1 className="font-display font-extrabold text-[2.6rem] leading-[0.95] sm:text-7xl lg:text-8xl tracking-tighter max-w-4xl mx-auto">
          Free tools for your{" "}
          <span className="inline-block bg-yellow border-[3px] border-border rounded-2xl px-3 -rotate-1">
            files
          </span>{" "}
          and numbers
        </h1>

        <p className="font-sans font-bold text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mt-6 mb-8">
          Merge PDFs, shrink photos, work out an EMI. Everything runs in your browser, so nothing is uploaded and there is no signup.
        </p>

        <form onSubmit={handleSubmit} role="search" className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 p-1.5 bg-white border-2 border-border rounded-full">
            <Search className="w-5 h-5 ml-3 sm:ml-4 shrink-0" aria-hidden />
            <label htmlFor="hero-search" className="sr-only">Search tools</label>
            <input
              id="hero-search"
              type="text"
              placeholder="Search tools"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 min-w-0 bg-transparent font-sans font-bold text-base text-foreground placeholder:text-muted-foreground focus:outline-none py-2.5"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-foreground text-background font-display font-extrabold text-sm sm:text-base px-5 sm:px-7 py-3 hover:bg-primary transition-colors"
            >
              Find a tool
            </button>
          </div>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          <span className="font-sans font-extrabold text-sm text-muted-foreground mr-1">Try:</span>
          {quickSearches.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => goSearch(tag)}
              className="px-3.5 py-1.5 rounded-full bg-white border-2 border-border font-sans font-extrabold text-sm hover:bg-yellow transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Hero };
export default Hero;
