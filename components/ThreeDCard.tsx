"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";

interface ThreeDCardProps {
  children: React.ReactNode;
}

export default function ThreeDCard({ children }: ThreeDCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [18, -18]);
  const rotateY = useTransform(x, [-150, 150], [-18, 18]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className="will-change-transform"
    >
      <div style={{ transform: "translateZ(45px)" }}>
        {children}
      </div>
    </motion.div>
  );
}