import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-accent/5 px-4 py-20">
        <div className="text-center max-w-md">
          <h1 className="mb-4 text-5xl sm:text-6xl font-bold text-foreground">404</h1>
          <p className="mb-4 text-lg sm:text-xl text-muted-foreground mb-6">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Please use the navigation menu above to find what you're looking for or return to our home page.
          </p>
          <a 
            href="/" 
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
