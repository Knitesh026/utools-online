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
          <div className="flex flex-wrap gap-4 md:gap-6">
            {popularTools.map((tool) => (
              <div key={tool.title} className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.5rem)]">
                <PopularToolCard
                  title={tool.title}
                  icon={tool.icon}
                  to={tool.to}
                />
              </div>
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
