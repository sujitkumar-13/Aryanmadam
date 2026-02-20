import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQClient from "@/components/FaqClient";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ReviewsFloating from "@/components/ReviewsFloating";

export default function Page() {
  return (
    <>
      <Navbar />

      <Suspense fallback={<div className="py-32 text-center">Loading FAQs...</div>}>
        <FAQClient />
      </Suspense>

      <Footer />
      <FloatingWhatsApp /> {/* Floating WhatsApp Button */}
      <ReviewsFloating />
    </>
  );
}
