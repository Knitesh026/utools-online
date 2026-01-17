import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import PopularToolsSection from "@/components/PopularToolsSection";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdBanner728x90 } from "@/components/AdBanner728x90";
import { AdNativeBanner } from "@/components/AdNativeBanner";
import AdSidebar from "@/components/AdSidebar";
import { AdPopunder } from "@/components/AdPopunder";
import { AdSocialBar } from "@/components/AdSocialBar";

const Index = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [filesConverted, setFilesConverted] = useState(0);
  const [onlineTools, setOnlineTools] = useState(0);
  const [pdfsCreated, setPdfsCreated] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);

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

  const handlePrevious = () => {
    setCarouselIndex((prev) => (prev === 0 ? freeTools.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev === freeTools.length - 1 ? 0 : prev + 1));
  };

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
          <div className="absolute top-[-100px] right-[-100px] w-[250px] h-[250px] bg-blue-600/10 rounded-full z-0"></div>
          <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] bg-cyan-500/20 rounded-full z-0"></div>

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
              <div className="py-8 sm:py-10 bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-lg overflow-hidden relative">
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
                      <div className="w-full h-80 rounded-lg">
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Free Tools You'd Usually Pay For
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-1">
                No Limits, No Sign-Up
              </p>
              <p className="text-sm text-muted-foreground">
                Here's our featured tools
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={handlePrevious} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition">
                ←
              </button>
              <button onClick={handleNext} className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition">
                →
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${carouselIndex * 100}%)` }}>
              {freeTools.map((tool, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-2">
                  <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white group">
                    <div className="h-64 overflow-hidden bg-gray-100 relative">
                      <img src={tool.image} alt={tool.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2">{tool.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tool.description}</p>
                      <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold text-sm inline-flex items-center gap-1 transition">
                        Learn more <span>→</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-6 sm:mt-12 mb-6 sm:mb-12">
          <TestimonialCard
            name="A. Chen"
            role="Student"
            quote="This app saved me hours! Simple & tool that just works!"
            rating={4.7}
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
  );
};

export default Index;
