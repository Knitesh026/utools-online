import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickerBadge from "@/components/StickerBadge";
import { AlertCircle, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-24 sm:py-32">
        <div className="card-ink bg-white p-8 sm:p-12 rounded-3xl text-center max-w-md w-full relative">
          <div className="absolute -top-4 -right-2">
            <StickerBadge color="pink" rotation={6}>
              Lost in Space
            </StickerBadge>
          </div>

          <div className="w-14 h-14 bg-primary border-2 border-border text-foreground rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-hard-sm">
            <AlertCircle className="w-7 h-7" />
          </div>

          <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-foreground tracking-tight mb-2">
            404
          </h1>
          
          <h2 className="font-display font-extrabold text-xl text-foreground mb-2">
            Page Not Found
          </h2>

          <p className="font-sans font-medium text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
            The page you are looking for does not exist or may have been moved.
          </p>

          <Link
            to="/" 
            className="btn-blue text-xs sm:text-sm px-6 py-3 w-full inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
