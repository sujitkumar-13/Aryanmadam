import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Collections from "@/components/FeaturedCollections";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import BestSellers from "@/components/BestSellers";
import HomePopup from "@/components/HomePopup";
import JoinComm from "@/components/JoinCommunity";
import WhatsAppFloating from "@/components/FloatingWhatsApp";
import ReviewsFloating from "@/components/ReviewsFloating";

export default function HomePage() {
  return (
    <main>
      <HomePopup />
      <Navbar />
      <HeroSection />
      <Collections />
      <BestSellers />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <JoinComm />
      <Footer />

      {/* Floating Buttons */}
      <WhatsAppFloating />
      <ReviewsFloating />
    </main>
  );
}