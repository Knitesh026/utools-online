import { Wrench, X, Facebook, Youtube, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-section py-6 sm:py-6 px-4 sm:px-6 mt-8 sm:mt-12">
      <div className="container mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logod.png" alt="uTools" className="h-8 sm:h-10 w-auto flex-shrink-0" />
            </Link>
            <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
              Your Stack. Simplify your workflow with our powerful suite of free tools and utilities.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-white/90 hover:text-white text-xs sm:text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-white/90 hover:text-white text-xs sm:text-sm transition-colors">
                  GDPR
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms-of-service" className="text-white/90 hover:text-white text-xs sm:text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-white/90 hover:text-white text-xs sm:text-sm transition-colors">
                  CCPA
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Connect</h4>
            <Link to="/privacy-policy" className="text-white/90 hover:text-white text-xs sm:text-sm transition-colors block mb-4">
              Report a Bug
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <a href="#" className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors flex-shrink-0">
                <X className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-white" />
              </a>
              <a href="#" className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors flex-shrink-0">
                <Facebook className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-white" />
              </a>
              <a href="#" className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors flex-shrink-0">
                <Youtube className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-white" />
              </a>
              <a href="#" className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors flex-shrink-0">
                <Linkedin className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom divider and copyright */}
        <div className="border-t border-white/20 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center">
          <p className="text-xs sm:text-sm text-white/80">
            © 2024 uTools.online. All rights reserved. Built with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
