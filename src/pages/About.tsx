import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ToolCard from "@/components/ToolCard";
import {
  FileText,
  Image,
  Code,
  Zap,
  BarChart3,
  Shield,
  FilePlus,
  Scissors,
  FileDown,
  ImageOff,
  Maximize2,
  Wand2,
  TrendingUp,
  RefreshCw,
  QrCode,
  Lock,
  Lightbulb,
  Palette,
  RotateCw,
  ArrowRightLeft,
  Calculator,
  Calendar,
} from "lucide-react";

const About = () => {
  // Icon mapping for tools
  const iconMap: Record<string, React.ComponentType<any>> = {
    FilePlus,
    Scissors,
    Zap,
    FileText,
    FileDown,
    ImageOff,
    Maximize2,
    Wand2,
    TrendingUp,
    RefreshCw,
    QrCode,
    Code,
    Lock,
    Lightbulb,
    Palette,
    RotateCw,
    BarChart3,
    ArrowRightLeft,
    Calculator,
    Calendar,
  };

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || FileText;
  };
  const mainTools = [
    {
      title: "PDF Tools Suite",
      description: "Merge, split, compress, and convert PDF documents",
      icon: FileText,
      colorTheme: {
        gradient: "from-secondary to-secondary",
        accentColor: "hsl(var(--secondary))",
        iconColor: "hsl(var(--secondary))",
        borderColor: "hsl(var(--secondary))"
      }
    },
    {
      title: "Image Processing Suite",
      description: "Compress, resize, enhance, and convert images with AI",
      icon: Image,
      colorTheme: {
        gradient: "from-secondary to-secondary",
        accentColor: "hsl(var(--secondary))",
        iconColor: "hsl(var(--secondary))",
        borderColor: "hsl(var(--secondary))"
      }
    },
    {
      title: "Data Conversion Tools",
      description: "Convert between different file formats easily",
      icon: Code,
      colorTheme: {
        gradient: "from-secondary to-secondary",
        accentColor: "hsl(var(--secondary))",
        iconColor: "hsl(var(--secondary))",
        borderColor: "hsl(var(--secondary))"
      }
    },
  ];

  const allTools = [
    { name: "PDF Merger", description: "Merge multiple PDF files into a single document", category: "PDF Tools", icon: "FilePlus" },
    { name: "PDF Splitter", description: "Extract specific pages from PDF documents", category: "PDF Tools", icon: "Scissors" },
    { name: "PDF Compressor", description: "Reduce PDF file size while maintaining quality", category: "PDF Tools", icon: "Zap" },
    { name: "PDF to Word Converter", description: "Convert PDF documents to editable Word format", category: "PDF Tools", icon: "FileText" },
    { name: "Word to PDF Converter", description: "Transform Word documents to PDF format", category: "PDF Tools", icon: "FileDown" },
    { name: "Image Compressor", description: "Optimize images for web and email", category: "Image Tools", icon: "ImageOff" },
    { name: "Image Resizer", description: "Resize images to specific dimensions", category: "Image Tools", icon: "Maximize2" },
    { name: "Background Remover", description: "Remove image backgrounds automatically using AI", category: "Image Tools", icon: "Wand2" },
    { name: "Image Upscaler", description: "Enhance image resolution with AI technology", category: "Image Tools", icon: "TrendingUp" },
    { name: "Image Format Converter", description: "Convert between JPEG, PNG, WebP, GIF, and more", category: "Image Tools", icon: "RefreshCw" },
    { name: "QR Code Generator", description: "Create customizable QR codes for URLs and text", category: "Code Tools", icon: "QrCode" },
    { name: "Base64 Encoder/Decoder", description: "Encode and decode Base64 text and files", category: "Code Tools", icon: "Code" },
    { name: "Password Generator", description: "Generate strong, secure passwords", category: "Security Tools", icon: "Lock" },
    { name: "UUID Generator", description: "Create unique identifiers for applications", category: "Code Tools", icon: "Lightbulb" },
    { name: "Hex to RGB Converter", description: "Convert color codes between formats", category: "Converter Tools", icon: "Palette" },
    { name: "Text Reverser", description: "Reverse text and create mirror images", category: "Text Tools", icon: "RotateCw" },
    { name: "Word Counter", description: "Analyze word and character counts", category: "Text Tools", icon: "BarChart3" },
    { name: "Unit Converter", description: "Convert between various measurement units", category: "Converter Tools", icon: "ArrowRightLeft" },
    { name: "Calculator Suite", description: "Advanced calculators for EMI, GST, BMI, and more", category: "Calculator Tools", icon: "Calculator" },
    { name: "Age Calculator", description: "Calculate age and date differences", category: "Calculator Tools", icon: "Calendar" },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-14 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
          {/* Animated gradient blobs */}
          <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-blue-600/10 rounded-full z-0"></div>
          <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-cyan-500/20 rounded-full z-0"></div>

          <div className="relative z-10 text-center max-w-4xl space-y-6 sm:space-y-8">
            <div className="flex items-center justify-center gap-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground">
                About
              </h1>
              <img 
                src="/logo.png" 
                alt="uTools Logo" 
                className="h-16 sm:h-20 lg:h-24 w-auto"
              />
            </div>
            <p className="text-xl text-gray-700">
              Empowering millions with free, powerful online tools
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
          {/* Mission & Vision */}
          <section className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              At uTools, we believe that powerful software should be accessible to everyone. Our mission is to break down barriers to productivity by offering a comprehensive suite of free, easy-to-use online tools designed for professionals, students, and everyday users.
            </p>
            <p className="text-lg text-gray-700">
              We're committed to delivering quality, reliability, and innovation without requiring sign-ups, subscriptions, or hidden costs. Every tool we create is built with you in mind, focusing on simplicity, speed, and security.
            </p>
          </section>

          {/* Why Choose Us */}
          <section>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
              Why Choose uTools?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <Zap className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Fast & Reliable</h3>
                <p className="text-gray-700">
                  Lightning-fast processing with 99.9% uptime. Your data is processed instantly without delays.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <Shield className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Secure & Private</h3>
                <p className="text-gray-700">
                  Your data is encrypted and processed securely. We never store your files or personal information.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <BarChart3 className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Constantly Updated</h3>
                <p className="text-gray-700">
                  We regularly add new features and tools based on user feedback. Staying ahead of the curve.
                </p>
              </div>
            </div>
          </section>

          {/* Main Tools Overview */}
          <section>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
              Our Main Tools
            </h2>
            <div className="flex justify-center px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[80rem] w-full">
                {mainTools.map((tool, index) => (
                  <ToolCard
                    key={index}
                    title={tool.title}
                    description={tool.description}
                    icon={tool.icon}
                    colorTheme={tool.colorTheme}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Complete Tools List */}
          <section className="relative overflow-hidden">
            {/* Animated gradient blobs */}
            <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-secondary/5 rounded-full z-0"></div>
            <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-secondary/10 rounded-full z-0"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
                Complete Tools Catalog
              </h2>
              <p className="text-lg text-gray-700 text-center mb-8 max-w-3xl mx-auto">
                We offer over 200 free online tools covering PDF processing, image manipulation, data conversion, calculations, and much more. All designed for ease of use and maximum productivity.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-3">
              {allTools.map((tool, index) => {
                const IconComponent = getIcon(tool.icon);
                return (
                  <div key={index} className="relative overflow-hidden bg-white rounded-lg p-3 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                    {/* Decorative circles */}
                    <div className="absolute top-[-80px] right-[-80px] w-[200px] h-[200px] bg-blue-600/5 rounded-full z-0"></div>
                    <div className="absolute bottom-[-60px] left-[-60px] w-[150px] h-[150px] bg-cyan-500/10 rounded-full z-0"></div>
                    
                    {/* Card content */}
                    <div className="relative z-10 flex items-center gap-2">
                      <div className="flex-shrink-0 bg-secondary/10 rounded-lg p-2 flex items-center justify-center">
                        <IconComponent size={28} className="text-secondary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-secondary mb-0.5">{tool.category}</p>
                        <h4 className="font-bold text-foreground text-sm mb-0.5 line-clamp-2">{tool.name}</h4>
                        <p className="text-xs text-gray-600 line-clamp-2">{tool.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="relative overflow-hidden rounded-lg p-12 text-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
            {/* Animated gradient blobs */}
            <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-blue-600/5 rounded-full z-0"></div>
            <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-cyan-500/10 rounded-full z-0"></div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
                Start Using Our Tools Today
              </h2>
              <p className="text-lg mb-8 text-gray-700">
                Join millions of users who trust uTools for their everyday tasks.
              </p>
              <Link to="/tools">
                <Button size="lg" className="bg-secondary text-white hover:opacity-90">
                  Explore All Tools
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
