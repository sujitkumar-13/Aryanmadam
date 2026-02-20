'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function CurtainReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: false,
    margin: '-120px',
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        scaleY: 0.6,
        scaleX: 0.85,
        y: 60,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              scaleY: 1,
              scaleX: 1,
              y: 0,
            }
          : {
              opacity: 0,
              scaleY: 0.6,
              scaleX: 0.85,
              y: 60,
            }
      }
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 18,
        delay,
      }}
      style={{
        transformOrigin: 'center',
      }}
    >
      {children}
    </motion.div>
  );
}