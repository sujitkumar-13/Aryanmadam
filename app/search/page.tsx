import { Suspense } from "react";
import Navbar from "@/components/admin/Navbar";
import Footer from "@/components/Footer";
import SearchClient from "@/components/SearchClient";

export default function Page() {
  return (
    <>
      <Navbar />

      <Suspense fallback={<div className="py-24 text-center">Loading search...</div>}>
        <SearchClient />
      </Suspense>

      <Footer />
    </>
  );
}
