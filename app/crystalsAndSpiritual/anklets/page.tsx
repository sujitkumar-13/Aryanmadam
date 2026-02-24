"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, type Variants } from "framer-motion";
import ThreeDCard from "@/components/ThreeDCard";
import {
  Heart,
  Mail,
  ShoppingBag,
  Clock,
  Triangle,
  Pencil,
  Box,
  Sparkles,
  Frame,
  Zap,
  Gem,
  PawPrint,
} from "lucide-react";

interface Category {
  id: number;
  title: string;
  slug: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function AnkletsPage() {
  const categories: Category[] = [
    {
      id: 1,
      title: "All Anklets",
      slug: "all-anklets",
      icon: <Sparkles className="w-12 h-12" />,
      color: "text-purple-700",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-100",
      description: "Browse our complete collection of spiritual anklets",
    },
    {
      id: 2,
      title: "Crystal Clocks",
      slug: "crystal-clocks",
      icon: <Clock className="w-12 h-12" />,
      color: "text-blue-700",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-100",
      description: "Beautiful crystal-infused timepieces for your space",
    },
    {
      id: 3,
      title: "Crystal Pyramid",
      slug: "crystal-pyramid",
      icon: <Triangle className="w-12 h-12" />,
      color: "text-amber-700",
      bgColor: "bg-gradient-to-br from-amber-50 to-yellow-100",
      description: "Powerful pyramid shapes for energy amplification",
    },
    {
      id: 4,
      title: "Crystal Pencils",
      slug: "crystal-pencils",
      icon: <Pencil className="w-12 h-12" />,
      color: "text-green-700",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-100",
      description: "Crystal pencils for healing and meditation",
    },
    {
      id: 5,
      title: "Crystal Box",
      slug: "crystal-box",
      icon: <Box className="w-12 h-12" />,
      color: "text-rose-700",
      bgColor: "bg-gradient-to-br from-rose-50 to-pink-100",
      description: "Elegant crystal boxes for storage and display",
    },
    {
      id: 6,
      title: "Crystal Idols",
      slug: "crystal-idols",
      icon: <Sparkles className="w-12 h-12" />,
      color: "text-indigo-700",
      bgColor: "bg-gradient-to-br from-indigo-50 to-purple-100",
      description: "Divine crystal idols for spiritual practices",
    },
    {
      id: 7,
      title: "Pyrite Dust Frames",
      slug: "pyrite-dust-frames",
      icon: <Frame className="w-12 h-12" />,
      color: "text-yellow-700",
      bgColor: "bg-gradient-to-br from-yellow-50 to-orange-100",
      description: "Stunning frames with golden pyrite dust",
    },
    {
      id: 8,
      title: "Seven Chakra Healing Frames",
      slug: "seven-chakra-frames",
      icon: <Zap className="w-12 h-12" />,
      color: "text-violet-700",
      bgColor: "bg-gradient-to-br from-violet-50 to-fuchsia-100",
      description: "Balance your chakras with healing crystal frames",
    },
    {
      id: 9,
      title: "Crystal Strings",
      slug: "crystal-strings",
      icon: <Gem className="w-12 h-12" />,
      color: "text-teal-700",
      bgColor: "bg-gradient-to-br from-teal-50 to-cyan-100",
      description: "Beautiful crystal strings for decoration and healing",
    },
    {
      id: 10,
      title: "Crystal Animals",
      slug: "crystal-animals",
      icon: <PawPrint className="w-12 h-12" />,
      color: "text-emerald-700",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-100",
      description: "Charming crystal animal figurines",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative py-20 px-6 bg-gradient-to-br from-[#fdfaf6] via-[#f5f1e8] to-[#eadbc4]/40">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-[rgb(44_95_124)] mb-6">
              Anklets & Crystal Items
            </h1>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
              Explore our exquisite collection of crystal anklets and spiritual items
            </p>
          </div>
        </section>

        {/* Cards */}
        <section className="py-16 px-6 bg-[#fdfaf6]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={`/crystalsAndSpiritual/anklets/${category.slug}`}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  whileHover={{ rotateX: 6, rotateY: -6, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className={`relative h-full p-8 rounded-2xl ${category.bgColor}
                  border-2 border-gray-200 hover:border-[rgb(44_95_124)]/40
                  transition-all duration-300 hover:shadow-2xl cursor-pointer`}
                >
                  <div className={`${category.color} mb-6`}>
                    {category.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {category.title}
                  </h3>

                  <p className="text-gray-800 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="mt-6 font-semibold text-[rgb(44_95_124)]">
                    Explore →
                  </div>

                  <div className="absolute top-4 right-4 text-6xl font-bold text-gray-900/5">
                    {category.id}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-28 px-4 sm:px-6 bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <ThreeDCard>
              <motion.div
                className="max-w-4xl mx-auto text-center bg-[rgb(44_95_124)] p-8 md:p-12 lg:p-16 rounded-3xl border border-[#e6cfa7]/40 relative overflow-hidden"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Heart className="mx-auto mb-6 text-white" size={48} />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">
                  Join Our Creative Community
                </h2>
                <p className="text-white text-sm sm:text-base mb-8 sm:mb-10">
                  Be part of a growing community of creators.
                </p>

                <form className="flex flex-col sm:flex-row justify-center gap-4 mb-6 w-full max-w-md mx-auto px-2 sm:px-0">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e76f51] w-full sm:flex-1"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#E76F51] text-white rounded-lg hover:bg-[#d65a3d] transition w-full sm:w-auto flex items-center justify-center"
                  >
                    <Mail className="inline mr-2" size={20} /> Subscribe
                  </button>
                </form>

                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full max-w-md mx-auto px-2 sm:px-0">
                  <Link
                    href="/shop"
                    className="px-6 py-3 bg-[#E76F51] text-white rounded-lg inline-flex items-center justify-center hover:bg-[#d65a3d] transition w-full sm:w-auto"
                  >
                    <ShoppingBag className="inline mr-2" size={20} /> Start Shopping
                  </Link>
                </div>
              </motion.div>
            </ThreeDCard>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}