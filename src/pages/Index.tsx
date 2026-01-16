import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import PopularToolsSection from "@/components/PopularToolsSection";
import TestimonialCard from "@/components/TestimonialCard";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      
      <main className="flex-1 pb-32 sm:pb-0">
        {/* Hero Section */}
        <Hero />

        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-8">

        {/* Most Popular Tools Section with Category Tabs */}
        <PopularToolsSection />

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
      </main>

      <Footer />
    </div>
  );
};

export default Index;
