import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickerBadge from "@/components/StickerBadge";
import { AlertCircle, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // The host serves the app shell with HTTP 200 for unknown URLs, so tell crawlers this is not a real page.
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, follow";
    document.head.appendChild(meta);
    document.title = "Page not found - uTools.online";
    return () => meta.remove();
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-24 sm:py-32">
        <div className="bg-white border border-slate-200/90 p-8 sm:p-12 rounded-2xl shadow-studio-lg text-center max-w-md w-full space-y-4">
          <div className="flex justify-center">
            <StickerBadge color="red">404 Error</StickerBadge>
          </div>

          <div className="w-14 h-14 bg-rose-50 border border-rose-200 text-primary rounded-2xl flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>

          <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-slate-950 tracking-tight">
            404
          </h1>

          <h2 className="font-display font-bold text-xl text-slate-900">Page Not Found</h2>

          <p className="font-sans font-medium text-xs sm:text-sm text-slate-500 leading-relaxed">
            The page you are looking for does not exist or may have been moved.
          </p>

          <div className="pt-2">
            <Link
              to="/"
              className="btn-primary text-xs sm:text-sm px-6 py-3 w-full inline-flex items-center justify-center gap-2 text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
