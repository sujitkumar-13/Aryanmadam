import { Suspense } from "react";
import Shop from "@/components/Shop";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JoinComm  from "@/components/JoinCommunity";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Page() {
  return (
    <>
      <Navbar />

      <Suspense fallback={<div className="py-24 text-center">Loading shop...</div>}>
        <Shop />
      </Suspense>

      <JoinComm />

      <Footer />
      <FloatingWhatsApp /> {/* Floating WhatsApp Button */}
    </>
  );
}
