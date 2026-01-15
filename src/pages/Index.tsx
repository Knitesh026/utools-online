import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import ToolCard from "@/components/ToolCard";
import PopularToolCard from "@/components/PopularToolCard";
import TestimonialCard from "@/components/TestimonialCard";
import CategoryToolsGrid from "@/components/CategoryToolsGrid";
import AdBanner728x90 from "@/components/AdBanner728x90";
import AdBanner300x250 from "@/components/AdBanner300x250";
import AdBannerSticky320x100 from "@/components/AdBannerSticky320x100";
import AdNativeBanner from "@/components/AdNativeBanner";
import AdPopunder from "@/components/AdPopunder";
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
    { title: "PDF Processor", icon: FileText, to: "/pdf-processor", description: "Merge, split, compress and convert PDF files" },
    { title: "Image Editor", icon: Mountain, iconColor: "text-primary", to: "/image-editor", description: "Edit and enhance your images with powerful tools" },
    { title: "Video Converter", icon: FileOutput, to: "/video-converter", description: "Convert videos between different formats" },
    { title: "AI Content Tools", icon: PenTool, iconColor: "text-accent", to: "/ai-tools", description: "Generate and enhance content with AI" },
  ];

  const popularTools = [
    { title: "Merge PDF", icon: Files, to: "/merge-pdf" },
    { title: "MP4 to MP3", icon: Mountain, to: "/mp4-to-mp3" },
    { title: "Remove Background", icon: Eraser, to: "/remove-background" },
    { title: "QR Code Maker", icon: QrCode, to: "/qr-code" },
    { title: "Image Converter", icon: Image, to: "/image-converter" },
    { title: "PDF to Word", icon: FileText, to: "/pdf-to-word" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Popunder Ad - loads in background */}
      <AdPopunder />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-8">

        {/* Main Tools Grid */}
        <div className="rounded-lg sm:rounded-[0.5rem] p-4 sm:p-6 bg-card shadow-md" style={{ backgroundColor: '#f6fff8' }}>
          <section className="mb-0">
            <div className="mb-4 sm:mb-6 pb-0 border-b-0">
              <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-foreground mb-1 sm:mb-2 leading-tight">
                Featured Tools
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
                Quick access to our most powerful tools
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-6xl">
              {mainTools.map((tool, index) => (
                <ToolCard
                  key={tool.title}
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  number={index + 1}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Top Advertisement Banner - 728x90 */}
        <div className="w-full flex justify-center">
          <AdBanner728x90 key="top-banner"/>
        </div>

        {/* Popular Tools Section */}
        <div className="rounded-lg sm:rounded-[0.5rem] p-4 sm:p-6 bg-card shadow-md" style={{ backgroundColor: '#edf2fb' }}>
          <section className="mb-0">
            <div className="mb-4 sm:mb-6 pb-0 border-b-0">
              <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-foreground mb-1 sm:mb-2 leading-tight">
                Popular Tools
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
                Most used tools by our community
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-4">
              {popularTools.map((tool) => (
                <div key={tool.title} className="w-full sm:w-[calc(50%-0.25rem)] lg:w-[calc(33.333%-0.75rem)] xl:w-[calc(25%-0.75rem)]">
                  <PopularToolCard
                    title={tool.title}
                    icon={tool.icon}
                    to={tool.to}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Middle Advertisement Banner - 728x90 */}
        <div className="w-full flex justify-center mt-0">
          <AdBanner728x90 key="middle-banner" />
        </div>

        {/* Tool Categories Section */}
        <div className="space-y-4 sm:space-y-8">
          {toolCategories.map((category, index) => (
            <CategoryToolsGrid
              key={category.name}
              categoryName={category.name}
              categoryDescription={category.description}
              tools={category.tools}
              colorTheme={category.colorTheme}
            />
          ))}
        </div>

        {/* Testimonials Section */}
        <section className="mt-6 sm:mt-12 mb-6 sm:mb-12">
          <TestimonialCard
            name="A. Chen"
            role="Student"
            quote="This app saved me hours! Simple & tool that just works!"
            rating={4.7}
          />
        </section>

        {/* Bottom Advertisement Banner - Native Banner */}
        <div className="w-full flex justify-center">
          <AdNativeBanner key="bottom-banner" />
        </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
