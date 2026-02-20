"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* Ripple Effect */}
      <span className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-ping" />
      <span className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-[ping_2.5s_infinite]" />

      {/* Main Button */}
      <motion.a
        href="https://wa.me/919306662709" // apna number yahan daalo
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="
          relative flex items-center justify-center
          w-14 h-14
          bg-green-500 text-white
          rounded-full
          shadow-2xl
        "
        animate={{
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.15,
          y: -4,
        }}
        whileTap={{
          scale: 0.95,
        }}
      >
        <FaWhatsapp className="w-8 h-8" />
      </motion.a>
    </div>
  );
}