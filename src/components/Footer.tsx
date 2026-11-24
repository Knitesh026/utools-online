import { Link } from "react-router-dom";
import { ShieldCheck, ArrowUpRight, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-slate-950 text-slate-200 pt-14 pb-12 mt-16 overflow-hidden border-t border-slate-800">
      {/* Subtle Top Glow */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-800/80">
          {/* 1. Brand Column */}
          <div className="col-span-2 space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200/80 shadow-xs hover:-translate-y-0.5 transition-transform"
            >
              <img src="/logo.png" alt="uTools.online" className="h-7 w-auto object-contain" />
            </Link>

            <p className="font-sans font-medium text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              An independent hub of free online tools and guides. File and image tools run in your browser, so your files stay on your device.
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Files processed in your browser</span>
            </div>
          </div>

          {/* 2. Flagship Tools */}
          <div>
            <h4 className="font-mono font-semibold text-xs uppercase tracking-widest text-slate-400 mb-4">
              Popular Tools
            </h4>
            <ul className="space-y-2.5 font-sans font-medium text-xs sm:text-sm text-slate-300">
              <li>
                <Link to="/merge-pdf" className="hover:text-white transition-colors">
                  Merge PDF Files
                </Link>
              </li>
              <li>
                <Link to="/compress-pdf" className="hover:text-white transition-colors">
                  Compress PDF
                </Link>
              </li>
              <li>
                <Link to="/image-compressor" className="hover:text-white transition-colors">
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link to="/remove-background" className="hover:text-white transition-colors">
                  Background Remover
                </Link>
              </li>
              <li>
                <Link to="/word-counter" className="hover:text-white transition-colors">
                  Word Counter
                </Link>
              </li>
              <li>
                <Link to="/qr-code" className="hover:text-white transition-colors">
                  QR Code Generator
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-primary hover:text-rose-400 inline-flex items-center gap-1 pt-1 font-bold">
                  <span>All free tools</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Educational Guides */}
          <div>
            <h4 className="font-mono font-semibold text-xs uppercase tracking-widest text-slate-400 mb-4">
              Guides & Learn
            </h4>
            <ul className="space-y-2.5 font-sans font-medium text-xs sm:text-sm text-slate-300">
              <li>
                <Link to="/guides" className="hover:text-white transition-colors">
                  Knowledge Hub
                </Link>
              </li>
              <li>
                <Link to="/guides/how-to-compress-pdf-images" className="hover:text-white transition-colors">
                  Compress PDF Images
                </Link>
              </li>
              <li>
                <Link to="/guides/how-sip-returns-are-calculated" className="hover:text-white transition-colors">
                  How SIP Returns Work
                </Link>
              </li>
              <li>
                <Link to="/guides/image-formats-jpg-png-webp-explained" className="hover:text-white transition-colors">
                  Image Formats Guide
                </Link>
              </li>
              <li>
                <Link to="/guides/how-to-use-qr-codes-safely" className="hover:text-white transition-colors">
                  QR Codes Safely
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Trust & Legal */}
          <div>
            <h4 className="font-mono font-semibold text-xs uppercase tracking-widest text-slate-400 mb-4">
              Legal & Trust
            </h4>
            <ul className="space-y-2.5 font-sans font-medium text-xs sm:text-sm text-slate-300">
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/advertising-disclosure" className="hover:text-white transition-colors">
                  Advertising Disclosure
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="hover:text-white transition-colors">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="hover:text-white transition-colors">
                  Sitemap
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Attribution Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans font-medium text-xs text-slate-400">
          <p>© {new Date().getFullYear()} uTools.online. All tools are free to use.</p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Designed & maintained by</span>
            <a
              href="https://prematech.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display font-bold text-white hover:text-primary underline underline-offset-4 transition-colors"
            >
              Prematech Digital
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
