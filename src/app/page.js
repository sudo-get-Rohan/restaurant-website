import HeroSection from "@/src/components/Home/HeroSection";
import FeaturedDishes from "@/src/components/Home/FeaturedDishes";
import ServiceSection from "@/src/components/Home/ServiceSection";
import ReviewCarousel from "@/src/components/Home/ReviewCarousel";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-text-light overflow-x-hidden">
      {/* 1. Hero with initial load animation */}
      <HeroSection />
      
      {/* 2. Featured Dishes with scroll trigger */}
      <div id="food">
        <FeaturedDishes />
      </div>
      
      {/* 3. Services/Tabs with hover effects */}
      <div id="services">
        <ServiceSection />
      </div>
      
      {/* 4. Reviews/About section */}
      <div id="about-us">
        <ReviewCarousel />
      </div>
    </main>
  );
}