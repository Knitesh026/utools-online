import { Link } from "react-router-dom";
import { ShieldCheck, Heart, Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-foreground text-background pt-0 pb-12 mt-10 overflow-hidden rounded-t-[2rem]">
      <div className="container mx-auto px-4 sm:px-6 pt-12">
        
        {/* Compact & Stylish Yellow Wordmark */}
        <div className="overflow-hidden border-b-2 border-white/10 pb-4 mb-8 select-none">
          <div className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-yellow uppercase text-center">
            UTOOLS.ONLINE
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b-2 border-white/10">
          
          {/* 1. Brand Column */}
          <div className="col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 group bg-white px-3.5 py-1.5 rounded-full border-2 border-border hover:-translate-y-0.5 transition-transform">
              <img src="/logo.png" alt="uTools.online" className="h-7 w-auto object-contain" />
            </Link>
            
            <p className="font-sans font-bold text-xs sm:text-sm text-background/80 leading-relaxed max-w-sm mb-5">
              An independent hub of free online tools and guides. File and image tools run in your browser, so your files stay on your device.
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-sans font-extrabold text-white bg-primary border-2 border-background/30 px-3.5 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>Files processed in your browser</span>
            </div>
          </div>

          {/* 2. Flagship Tools */}
          <div>
            <h4 className="font-display font-extrabold text-yellow mb-4 text-sm uppercase tracking-wider">
              Popular Tools
            </h4>
            <ul className="space-y-2.5 font-sans font-bold text-xs sm:text-sm text-background/80">
              <li>
                <Link to="/merge-pdf" className="hover:text-yellow transition-colors">
                  Merge PDF Files
                </Link>
              </li>
              <li>
                <Link to="/compress-pdf" className="hover:text-yellow transition-colors">
                  Compress PDF
                </Link>
              </li>
              <li>
                <Link to="/image-compressor" className="hover:text-yellow transition-colors">
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link to="/remove-background" className="hover:text-yellow transition-colors">
                  Background Remover
                </Link>
              </li>
              <li>
                <Link to="/word-counter" className="hover:text-yellow transition-colors">
                  Word Counter
                </Link>
              </li>
              <li>
                <Link to="/qr-code" className="hover:text-yellow transition-colors">
                  QR Code Generator
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-yellow hover:underline block pt-1 font-extrabold">
                  All free tools →
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Educational Guides */}
          <div>
            <h4 className="font-display font-extrabold text-yellow mb-4 text-sm uppercase tracking-wider">
              Guides & Learn
            </h4>
            <ul className="space-y-2.5 font-sans font-bold text-xs sm:text-sm text-background/80">
              <li>
                <Link to="/guides" className="hover:text-yellow transition-colors">
                  Knowledge Hub
                </Link>
              </li>
              <li>
                <Link to="/guides/how-to-compress-pdf-images" className="hover:text-yellow transition-colors">
                  Compress PDF Images
                </Link>
              </li>
              <li>
                <Link to="/guides/how-sip-returns-are-calculated" className="hover:text-yellow transition-colors">
                  How SIP Returns Work
                </Link>
              </li>
              <li>
                <Link to="/guides/image-formats-jpg-png-webp-explained" className="hover:text-yellow transition-colors">
                  Image Formats Guide
                </Link>
              </li>
              <li>
                <Link to="/guides/how-to-use-qr-codes-safely" className="hover:text-yellow transition-colors">
                  QR Codes Safely
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Trust & Legal */}
          <div>
            <h4 className="font-display font-extrabold text-yellow mb-4 text-sm uppercase tracking-wider">
              Legal & Trust
            </h4>
            <ul className="space-y-2.5 font-sans font-bold text-xs sm:text-sm text-background/80">
              <li>
                <Link to="/privacy-policy" className="hover:text-yellow transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-yellow transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="hover:text-yellow transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-yellow transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/advertising-disclosure" className="hover:text-yellow transition-colors">
                  Advertising Disclosure
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="hover:text-yellow transition-colors">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-yellow transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="hover:text-yellow transition-colors">
                  Sitemap
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-yellow transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans font-bold text-xs text-background/70">
          <p>© {new Date().getFullYear()} uTools.online. All tools are free to use.</p>
          <div className="flex items-center gap-2">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-pink fill-pink" />
            <span>for the web community</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
