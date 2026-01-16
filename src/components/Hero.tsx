import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Settings2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:pt-24 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Animated gradient blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-blue-600/10 rounded-full z-0"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-cyan-500/20 rounded-full z-0" style={{ animationDelay: "1s" }}></div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="20" y="20" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="rgba(59, 130, 246, 0.3)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl space-y-6 sm:space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 sm:px-4 py-2 text-xs sm:text-sm">
          <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="font-medium text-primary">Introducing utools.online</span>
        </div>

        {/* Main heading */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground">
            Your All-in-One
          </h1>
          <img src="/logo.png" alt="utools.online" className="h-16 sm:h-24 lg:h-32 w-auto mx-auto" />
        </div>

        {/* Subheading */}
        <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A comprehensive suite of free, easy-to-use online tools for image processing, document conversion, text manipulation, color analysis, calculations, and more.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link to="/tools">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white px-6 sm:px-8 w-full sm:w-auto">
              Explore Tools
            </Button>
          </Link>
          <a href="#features">
            <Button size="lg" variant="outline" className="px-6 sm:px-8 w-full sm:w-auto">
              Learn More
            </Button>
          </a>
        </div>
      </div>

      {/* Feature indicators */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mt-12 sm:mt-20 w-full max-w-3xl px-4">
        {[
          { icon: Zap, title: "Fast & Free", desc: "No installation needed" },
          { icon: Settings2, title: "Customizable", desc: "Adjust settings easily" },
          { icon: Sparkles, title: "Powerful", desc: "50+ tools available" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center p-3 sm:p-4 rounded-lg sm:rounded-xl sm:border sm:border-primary/20 bg-card/50 sm:bg-card/50 backdrop-blur-sm hover:sm:bg-primary/5 transition-colors"
          >
            <div className="flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-primary/10 mb-2 sm:mb-3">
              <item.icon className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-xs sm:text-base text-foreground">{item.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.4; }
          50% { transform: translateY(-40px) translateX(-10px); opacity: 0.2; }
          75% { transform: translateY(-20px) translateX(10px); opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
