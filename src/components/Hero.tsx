import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Settings2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-14 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Animated gradient blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-600/30 blur-[120px] rounded-full z-0 animate-pulse"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-cyan-500/20 blur-[160px] rounded-full z-0 animate-pulse" style={{ animationDelay: "1s" }}></div>

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
      <div className="relative z-10 text-center max-w-4xl space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Introducing uTools.online</span>
        </div>

        {/* Main heading */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground">
            Your All-in-One
            <span className="block mt-2 bg-gradient-to-r from-primary via-cyan-500 to-primary bg-clip-text text-transparent">
              uTools.online
            </span>
          </h1>
        </div>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A comprehensive suite of free, easy-to-use online tools for image processing, document conversion, text manipulation, color analysis, calculations, and more.
        </p>

        {/* Status indicator */}
        <div className="flex items-center justify-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
          </span>
          <span className="text-sm font-medium text-primary">Available Now</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link to="/tools">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white px-8">
              Explore Tools
            </Button>
          </Link>
          <a href="#features">
            <Button size="lg" variant="outline" className="px-8">
              Learn More
            </Button>
          </a>
        </div>
      </div>

      {/* Feature indicators */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 w-full max-w-3xl">
        {[
          { icon: Zap, title: "Fast & Free", desc: "No installation needed" },
          { icon: Settings2, title: "Customizable", desc: "Adjust settings easily" },
          { icon: Sparkles, title: "Powerful", desc: "50+ tools available" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center p-4 rounded-xl border border-primary/20 bg-card/50 backdrop-blur-sm hover:bg-primary/5 transition-colors"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-3">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
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
