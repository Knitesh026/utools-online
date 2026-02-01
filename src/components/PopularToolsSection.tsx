import { useState } from "react";
import { toolCategories } from "@/data/tools";
import PopularToolCard from "@/components/PopularToolCard";
import CategoryToolsGrid from "@/components/CategoryToolsGrid";
import ToolCard from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Mountain, 
  FileOutput,
  PenTool,
  Files,
  Eraser,
  QrCode,
  Image
} from "lucide-react";

const PopularToolsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All Tools");

  const mainTools = [
    { title: "PDF Processor", icon: FileText, to: "/tools?category=Document%20Tools", description: "Merge, split, compress and convert PDF files" },
    { title: "Image Editor", icon: Mountain, to: "/tools?category=Image%20Tools", description: "Edit and enhance your images with powerful tools" },
    { title: "Video Converter", icon: FileOutput, to: "/tools", description: "Convert videos between different formats" },
    { title: "AI Content Tools", icon: PenTool, to: "/tools", description: "Generate and enhance content with AI" },
  ];

  const popularTools = [
    { title: "Merge PDF", icon: Files, to: "/merge-pdf", description: "Merge 2 or more PDF files into a single PDF file" },
    { title: "MP4 to MP3", icon: Mountain, to: "/mp4-to-mp3", description: "Extract audio from MP4 videos" },
    { title: "Remove Background", icon: Eraser, to: "/remove-background", description: "Remove background from images automatically" },
    { title: "QR Code Maker", icon: QrCode, to: "/qr-code", description: "Generate QR codes for URLs" },
    { title: "Image Converter", icon: Image, to: "/image-converter", description: "Convert between image formats" },
    { title: "PDF to Word", icon: FileText, to: "/pdf-to-word", description: "Convert a PDF to Word Document" },
  ];

  // Get all unique categories
  const categories = [
    "All Tools",
    ...toolCategories.map((cat) => cat.name),
  ];

  // Filter tools based on selected category
  const filteredTools =
    activeCategory === "All Tools"
      ? toolCategories.flatMap((cat) => cat.tools).slice(0, 12)
      : toolCategories
          .find((cat) => cat.name === activeCategory)
          ?.tools.slice(0, 12) || [];

  return (
    <section className="relative py-12 sm:py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute top-[-100px] right-[-100px] w-[350px] h-[350px] bg-blue-600/5 rounded-full z-0"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-cyan-500/5 rounded-full z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-4xl font-bold text-foreground mb-1 sm:mb-3">
            Our Most Popular Tools
          </h2>
          <p className="text-xs sm:text-base text-muted-foreground">
            We present the best of the best. All free, no catch
          </p>
        </div>

        {/* Filter Tabs and Tools Container */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Category Tabs - Horizontal on mobile, Vertical on desktop */}
          <div className="w-full sm:w-32 lg:w-40 flex-shrink-0">
            <div className="flex flex-row sm:flex-col gap-1.5 sm:gap-2 overflow-x-auto pb-2 sm:pb-0 sticky top-24">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-2 sm:px-4 py-1.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all text-center sm:text-left whitespace-nowrap sm:whitespace-normal flex-shrink-0 sm:flex-shrink-1 ${
                    activeCategory === category
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category === "All Tools" ? "All Tools" : category.replace(" Tools", "")}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid - Right Side */}
          <div className="flex-1">
            {/* Category-Specific Section */}
            {activeCategory !== "All Tools" && (
              <div className="mb-12 sm:mb-16">
                {toolCategories.map((category) =>
                  category.name === activeCategory ? (
                    <CategoryToolsGrid
                      key={category.name}
                      categoryName={category.name}
                      categoryDescription={category.description}
                      tools={category.tools}
                      colorTheme={category.colorTheme}
                    />
                  ) : null
                )}
              </div>
            )}

            {/* Popular Tools Grid - Show when "All Tools" is selected */}
            {activeCategory === "All Tools" && (
              <div className="space-y-4 sm:space-y-6">
                {/* Featured Tools Section */}
                <div className="rounded-lg sm:rounded-[0.5rem] p-3 sm:p-4 bg-card" style={{ backgroundColor: '#f6fff8' }}>
                  <section className="mb-0">
                    <div className="mb-3 sm:mb-2 pb-0 border-b-0">
                      <h2 className="text-sm sm:text-lg lg:text-xl font-bold text-foreground mb-1 sm:mb-1 leading-tight">
                        Featured Tools
                      </h2>
                      <p className="text-xs sm:text-xs text-muted-foreground max-w-2xl">
                        Quick access to our most powerful tools
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3 max-w-6xl">
                      {mainTools.map((tool, index) => (
                        <ToolCard
                          key={tool.title}
                          title={tool.title}
                          description={tool.description}
                          icon={tool.icon}
                          number={index + 1}
                          to={tool.to}
                        />
                      ))}
                    </div>
                  </section>
                </div>

                {/* Popular Tools Section */}
                <div className="rounded-lg sm:rounded-[0.5rem] p-3 sm:p-4 bg-card" style={{ backgroundColor: '#edf2fb' }}>
                  <section className="mb-0">
                    <div className="mb-3 sm:mb-2 pb-0 border-b-0">
                      <h2 className="text-sm sm:text-lg lg:text-xl font-bold text-foreground mb-1 sm:mb-1 leading-tight">
                        Popular Tools
                      </h2>
                      <p className="text-xs sm:text-xs text-muted-foreground max-w-2xl">
                        Most used tools by our community
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-3">
                      {popularTools.map((tool) => (
                        <div key={tool.title} className="w-full sm:w-[calc(50%-0.25rem)] lg:w-[calc(33.333%-0.75rem)] xl:w-[calc(25%-0.75rem)]">
                          <PopularToolCard
                            title={tool.title}
                            icon={tool.icon}
                            to={tool.to}
                            description={tool.description}
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularToolsSection;
