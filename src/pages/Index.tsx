import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import ToolCard from "@/components/ToolCard";
import PopularToolCard from "@/components/PopularToolCard";
import TestimonialCard from "@/components/TestimonialCard";
import CategoryToolsGrid from "@/components/CategoryToolsGrid";
import { 
  FileText, 
  Image, 
  Type,
  Palette,
  Wrench,
  Mountain,
  Eraser,
  QrCode,
  PenTool,
  FileOutput,
  Files
} from "lucide-react";
import { toolCategories } from "@/data/tools";

const Index = () => {
  const mainTools = [
    { title: "PDF Processor", icon: FileText, to: "/pdf-processor", description: "Merge, split, compress and convert PDF files", color: "rgb(239, 68, 68)" },
    { title: "Image Editor", icon: Mountain, iconColor: "text-primary", to: "/image-editor", description: "Edit and enhance your images with powerful tools", color: "rgb(249, 115, 22)" },
    { title: "Video Converter", icon: FileOutput, to: "/video-converter", description: "Convert videos between different formats", color: "rgb(59, 130, 246)" },
    { title: "AI Content Tools", icon: PenTool, iconColor: "text-accent", to: "/ai-tools", description: "Generate and enhance content with AI", color: "rgb(147, 51, 234)" },
  ];

  const popularTools = [
    { title: "Merge PDF", icon: Files, to: "/merge-pdf", color: "rgb(239, 68, 68)" },
    { title: "MP4 to MP3", icon: Mountain, to: "/mp4-to-mp3", color: "rgb(249, 115, 22)" },
    { title: "Remove Background", icon: Eraser, to: "/remove-background", color: "rgb(34, 197, 94)" },
    { title: "QR Code Maker", icon: QrCode, to: "/qr-code", color: "rgb(59, 130, 246)" },
    { title: "Image Converter", icon: Image, to: "/image-converter", color: "rgb(147, 51, 234)" },
    { title: "PDF to Word", icon: FileText, to: "/pdf-to-word", color: "rgb(219, 39, 119)" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        <div className="container mx-auto px-6 py-16">

        {/* Main Tools Grid */}
        <section className="mb-20">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">
              Featured Tools
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Quick access to our most powerful tools
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
            {mainTools.map((tool, index) => (
              <a key={tool.title} href={tool.to}>
                <div className="relative group h-40 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" style={{ opacity: 0.9 }}></div>
                  
                  {/* Colored accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: tool.color }}></div>
                  
                  {/* Icon background circle */}
                  <div className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-10" style={{ backgroundColor: tool.color }}></div>
                  
                  {/* Content */}
                  <div className="relative h-full p-6 flex flex-col justify-between">
                    <div>
                      <tool.icon className="h-8 w-8 mb-3" style={{ color: tool.color }} />
                      <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
                    </div>
                    <p className="text-sm text-gray-300 line-clamp-2">{tool.description}</p>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-5 transition-opacity"></div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Popular Tools Section */}
        <section className="mb-20">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">
              Popular Tools
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Most used tools by our community
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map((tool) => (
              <a key={tool.title} href={tool.to}>
                <div className="relative group p-6 rounded-xl bg-card shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-l-4" style={{ borderColor: tool.color }}>
                  {/* Background accent */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(135deg, ${tool.color}15, transparent)` }}></div>
                  
                  {/* Content */}
                  <div className="relative flex items-center gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${tool.color}20` }}>
                      <tool.icon className="h-7 w-7" style={{ color: tool.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-opacity-100" style={{ color: tool.color }}>
                        {tool.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">Popular choice</p>
                    </div>
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" style={{ color: tool.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Tool Categories Section */}
        {toolCategories.map((category, index) => (
          <section key={category.name} className="mb-20">
            <CategoryToolsGrid
              categoryName={category.name}
              categoryDescription={category.description}
              tools={category.tools}
              colorTheme={category.colorTheme}
            />
          </section>
        ))}

        {/* Testimonials Section */}
        <section className="mt-20 mb-20">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">Testimonials</h2>
            <p className="text-lg text-muted-foreground">
              This app saved me hours and effort! Simple tools that just work.
              <span className="text-sm ml-2">- A. Patel, Student</span>
            </p>
          </div>
          <TestimonialCard
            name="A. Chen"
            role="Student"
            quote="This app saved me hours! Simple & tool that just works!"
            rating={4.7}
          />
        </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
