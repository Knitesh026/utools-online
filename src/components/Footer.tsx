import { Wrench, Twitter, Facebook, Youtube, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-section py-10 px-6 mt-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Wrench className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-secondary-foreground">
                Tool<span className="text-primary">Stack</span>
              </span>
            </Link>
            <p className="text-secondary-foreground/60 text-sm leading-relaxed">
              Your Stack. Simplify your workflow with our powerful suite of free tools and utilities.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-secondary-foreground font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-foreground/60 hover:text-primary text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-secondary-foreground/60 hover:text-primary text-sm transition-colors">
                  GDPR
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-secondary-foreground font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-foreground/60 hover:text-primary text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="text-secondary-foreground/60 hover:text-primary text-sm transition-colors">
                  CCPA
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-secondary-foreground font-semibold mb-4">Connect</h4>
            <Link to="/" className="text-secondary-foreground/60 hover:text-primary text-sm transition-colors block mb-4">
              Report a Bug
            </Link>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
                <Twitter className="h-4 w-4 text-primary" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
                <Facebook className="h-4 w-4 text-primary" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
                <Youtube className="h-4 w-4 text-primary" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
                <Linkedin className="h-4 w-4 text-primary" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
