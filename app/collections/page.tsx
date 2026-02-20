import Collections from "@/components/Collections"; 
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JoinComm  from "@/components/JoinCommunity";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ReviewsFloating from "@/components/ReviewsFloating";


export default function Page() {
  return (
    <>
      <Navbar />
      <Collections />
      <JoinComm/>
      <Footer />
      <FloatingWhatsApp /> {/* Floating WhatsApp Button */}
      <ReviewsFloating />
    </>
  );
}
