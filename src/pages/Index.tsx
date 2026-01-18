import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import PopularToolsSection from "@/components/PopularToolsSection";
import InteractiveBentoGallery from "@/components/InteractiveBentoGallery";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdBanner728x90 } from "@/components/AdBanner728x90";
import { AdNativeBanner } from "@/components/AdNativeBanner";
import AdSidebar from "@/components/AdSidebar";
import { AdPopunder } from "@/components/AdPopunder";
import { AdSocialBar } from "@/components/AdSocialBar";
import { Gallery6 } from "@/components/Gallery6";
import SEOPage from "@/components/SEOPage";
import { websiteSchema } from "@/lib/seoHelpers";

const Index = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [filesConverted, setFilesConverted] = useState(0);
  const [onlineTools, setOnlineTools] = useState(0);
  const [pdfsCreated, setPdfsCreated] = useState(0);

  const freeTools = [
    {
      title: "Profile Photo Maker",
      description: "Style your profile photo for social media",
      image: "https://images.unsplash.com/photo-1516321498122-cfc5e2e4c0c8?w=500&h=300&fit=crop"
    },
    {
      title: "Chart Creator",
      description: "Create charts and download as an image",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop"
    },
    {
      title: "PDF to Word",
      description: "Create a Word Doc or Extract the text using OCR from a PDF",
      image: "https://images.unsplash.com/photo-1432888498266-38c75b13e784?w=500&h=300&fit=crop"
    },
    {
      title: "PDF Creator",
      description: "Create a PDF quickly and creator",
      image: "https://images.unsplash.com/photo-1526374965328-7f5ae4e8a83f?w=500&h=300&fit=crop"
    }
  ];

  useEffect(() => {
    const targets = [1000000, 10000000, 200, 500000];
    const durations = [2000, 2000, 2000, 2000];
    
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      targets.forEach((target, index) => {
        const progress = Math.min(elapsed / durations[index], 1);
        const currentValue = Math.floor(progress * target);
        
        if (index === 0) setActiveUsers(currentValue);
        if (index === 1) setFilesConverted(currentValue);
        if (index === 2) setOnlineTools(currentValue);
        if (index === 3) setPdfsCreated(currentValue);
      });

      if (elapsed < Math.max(...durations)) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, []);
  return (
    <SEOPage
      title="uTools.online - Free Online Utility Tools for File Conversion, Image Editing & More"
      description="Discover free online utility tools for file conversion, image editing, PDF processing, video conversion, and AI-powered solutions. No sign-up required, completely secure."
      canonical="https://utoolss.online/"
      keywords="free online tools, file converter, image editor, PDF tools, video converter, utility tools, online converter, free tools no sign up"
      schema={websiteSchema}
    >
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      {/* Non-intrusive popunder - placed at page load, doesn't interfere with main content */}
      <AdPopunder />
      {/* Social bar for additional monetization */}
      <AdSocialBar />
      
      <main className="flex-1 pb-32 sm:pb-0">
        {/* Hero Section */}
        <Hero />

        {/* Top Banner Ad */}
        <div className="w-full py-3 px-2 flex justify-center">
          <AdBanner728x90 className="max-w-full" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-4 space-y-6 sm:space-y-8">

        {/* Most Popular Tools Section with Category Tabs */}
        <PopularToolsSection />

        {/* Ad Placement - Between Popular and Stats */}
        <div className="px-4 flex justify-center">
          <AdBanner728x90 />
        </div>

        {/* Stats Section */}
        <div className="relative mb-8 sm:mb-12 bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-lg p-6 sm:p-8 overflow-hidden">
          {/* Animated gradient blobs */}
          <div className="absolute top-[-100px] right-[-100px] w-[190px] h-[190px] bg-blue-600/10 rounded-full z-0"></div>
          <div className="absolute bottom-[-100px] left-[-100px] w-[190px] h-[190px] bg-cyan-500/20 rounded-full z-0"></div>

          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-1">
                {activeUsers > 0 ? (activeUsers / 1000000).toFixed(1) + 'm' : '1.0m'}
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-1">
                {filesConverted > 0 ? (filesConverted / 1000000).toFixed(1) + 'm' : '10.0m'}
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Files Converted</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-1">
                {onlineTools > 0 ? onlineTools + '+' : '200+'}
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Online Tools</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-600 mb-1">
                {pdfsCreated > 0 ? (pdfsCreated / 1000).toFixed(0) + 'k' : '500k'}
              </div>
              <p className="text-xs sm:text-sm text-gray-600">PDFs Created</p>
            </div>
          </div>
        </div>

        {/* Who We Are Section with Ad Sidebar */}
        <section className="relative mt-12 sm:mt-16 mb-12 sm:mb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <div className="py-8 sm:pt-10 pb-2 bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-lg overflow-hidden relative">
                {/* Animated gradient blobs */}
                <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-blue-600/10 rounded-full z-0"></div>
                <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-cyan-500/20 rounded-full z-0"></div>

                <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-4 pr-0 md:pr-6">
                      <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                        Who We Are
                      </h2>
                      <div className="space-y-3">
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          At uTools, we believe that powerful software should be accessible to everyone. Our mission is to break down barriers to productivity by offering a comprehensive suite of free, easy-to-use online tools designed for professionals, students, and everyday users.
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          We're committed to delivering quality, reliability, and innovation without requiring sign-ups, subscriptions, or hidden costs. Every tool we create is built with you in mind.
                        </p>
                        <div className="pt-1">
                          <Link to="/about">
                            <Button className="bg-secondary hover:opacity-90 text-white font-semibold px-6 py-2 transition-opacity">
                              Learn More About Us
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Right Image */}
                    <div className="flex items-center justify-center pl-0 md:pl-6">
                      <div className="w-full max-w-xs sm:max-w-sm md:max-w-none h-52 md:h-80 rounded-lg">
                        <img 
                          src="/Who.webp" 
                          alt="Team collaboration" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Ad */}
            <AdSidebar className="hidden lg:block" useSkyscraper={false} />
          </div>
        </section>

        {/* Free Tools Section */}
        <section className="mt-12 sm:mt-16 mb-12 sm:mb-16">
          <div className="relative py-8 sm:py-10 bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-lg overflow-hidden">
            {/* Animated gradient blobs */}
            <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-blue-600/10 rounded-full z-0"></div>
            <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-cyan-500/20 rounded-full z-0"></div>

            <div className="relative z-10 px-4 sm:px-6 md:px-8">
              <div className="mb-2 sm:mb-4 max-w-3xl mx-auto text-center">
                <h2 className="text-xl sm:text-4xl font-bold text-foreground mb-1 sm:mb-2">
                  Free Tools You'd Usually Pay For
                </h2>
                <p className="text-xs sm:text-base text-muted-foreground">
                  No Limits, No Sign-Up. Access powerful tools without any hidden costs or subscriptions.
                </p>
              </div>

              <Gallery6
                heading=""
                showDemoLink={false}
                items={[
                  {
                    id: "tool-1",
                    title: "Profile Photo Maker",
                    summary: "Style your profile photo for social media",
                    url: "#",
                    image: "https://images.unsplash.com/photo-1516321498122-cfc5e2e4c0c8?w=500&h=400&fit=crop"
                  },
                  {
                    id: "tool-2",
                    title: "Chart Creator",
                    summary: "Create charts and download as an image",
                    url: "#",
                    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=400&fit=crop"
                  },
                  {
                    id: "tool-3",
                    title: "PDF to Word",
                    summary: "Extract text using OCR from a PDF",
                    url: "#",
                    image: "https://images.unsplash.com/photo-1432888498266-38c75b13e784?w=500&h=400&fit=crop"
                  },
                  {
                    id: "tool-4",
                    title: "PDF Creator",
                    summary: "Create a PDF quickly and easily",
                    url: "#",
                    image: "https://images.unsplash.com/photo-1526374965328-7f5ae4e8a83f?w=500&h=400&fit=crop"
                  },
                  {
                    id: "tool-5",
                    title: "Image Compressor",
                    summary: "Compress images without losing quality",
                    url: "#",
                    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop"
                  }
                ]}
              />
            </div>
          </div>
        </section>

        {/* Tool Results Gallery Section */}
        <section className="mt-12 sm:mt-16 mb-12 sm:mb-16">
          <InteractiveBentoGallery
            title="Tool Results Gallery"
            description="Explore amazing results created with our tools"
            mediaItems={[
              {
                id: 1,
                type: "image",
                title: "Education",
                desc: "Learning enhancement",
                url: "https://images.pexels.com/photos/1254365/pexels-photo-1254365.jpeg",
                span: "col-span-1 row-span-1"
              },
              {
                id: 2,
                type: "image",
                title: "Dog Portrait",
                desc: "Pet image enhancement",
                url: "https://images.pexels.com/photos/1254365/pexels-photo-1254365.jpeg",
                span: "col-span-2 row-span-2"
              },
              {
                id: 3,
                type: "image",
                title: "Forest Trail",
                desc: "Nature enhancement",
                url: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg",
                span: "col-span-2 row-span-1"
              },
              {
                id: 4,
                type: "image",
                title: "Beach Sunset",
                desc: "Coastal beauty",
                url: "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg",
                span: "col-span-1 row-span-1"
              },
              {
                id: 5,
                type: "image",
                title: "Parrot",
                desc: "Vibrant colors",
                url: "https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg",
                span: "col-span-1 row-span-1"
              },
              {
                id: 6,
                type: "image",
                title: "Mountain Sunrise",
                desc: "Landscape processing",
                url: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg",
                span: "col-span-3 row-span-1"
              }
            ]}
          />
        </section>

        </div>

      {/* Ad Banner Before Footer */}
      <div className="py-4 px-4 sm:py-6 sm:px-6 flex justify-center bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <AdNativeBanner />
      </div>

      </main>

      <Footer />
    </div>
    </SEOPage>
  );
};

export default Index;
