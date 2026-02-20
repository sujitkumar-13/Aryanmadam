'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const pressItems = [
  {
    title: 'Celebrating Craftsmanship in Modern Design',
    source: 'Design Heritage Magazine',
    date: 'March 2025',
    content:
      'This article explores how traditional craftsmanship techniques are shaping modern design movements across the world. Experts highlight the importance of heritage in contemporary innovation.',
    image:
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'How Tradition Shapes Contemporary Creativity',
    source: 'Artisan Weekly',
    date: 'January 2025',
    content:
      'Creative industries are rediscovering traditional methods to add authenticity and uniqueness to modern products. This feature story dives deep into the transformation.',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'A New Standard for Premium DIY Materials',
    source: 'Creative Industry Journal',
    date: 'November 2024',
    content:
      'Premium DIY materials are redefining quality expectations in the market. This article examines the innovation behind sustainable material production.',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
  },
];

const MagneticCard = ({ item, onClick }: { item: any; onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 120, damping: 12 });
  const springY = useSpring(y, { stiffness: 120, damping: 12 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    x.set(dx * 0.2);
    y.set(dy * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      style={{
        x: springX,
        y: springY,
        rotateX: springY,
        rotateY: springX,
        transformStyle: 'preserve-3d',
      }}
      className="relative cursor-pointer"
    >
      <div
        className="group overflow-hidden rounded-2xl
                   border border-gray-200
                   bg-white
                   shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                   transition-shadow hover:shadow-[0_30px_80px_rgba(0,0,0,0.18)]"
        style={{ transform: 'translateZ(40px)' }}
      >
        <div className="relative h-64">
          <Image
            src={item.image}
            alt={item.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className="p-6">
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-2">
            {item.source} · {item.date}
          </p>

          <h3 className="text-xl font-semibold text-[#2c5f7c] mb-3">
            {item.title}
          </h3>

          <span className="text-sm font-semibold text-[#2c5f7c]">
            Read Article →
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const PressPage = () => {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  return (
    <section
      className="relative min-h-screen px-6 py-32 font-serif bg-white"
      style={{ perspective: '1200px' }}
    >
      <div className="mx-auto max-w-7xl text-[#3b2a1a]">

        <AnimatePresence mode="wait">
          {!selectedArticle ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-24 text-center max-w-4xl mx-auto">
                <span className="inline-block mb-6 px-6 py-2 border border-[#2c5f7c]/40 rounded-full text-[#2c5f7c] tracking-widest uppercase text-xs">
                  Press
                </span>

                <h1 className="text-4xl md:text-5xl font-bold text-[#2c5f7c]">
                  In the Press
                </h1>

                <div className="my-6 text-[#2c5f7c] tracking-widest">
                  ───── ✦ ─────
                </div>

                <p className="text-lg leading-relaxed text-gray-600">
                  Discover what leading publications are saying about our
                  commitment to craftsmanship and quality.
                </p>
              </div>

              <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-3">
                {pressItems.map((item, i) => (
                  <MagneticCard
                    key={i}
                    item={item}
                    onClick={() => setSelectedArticle(item)}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="article"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="relative h-96 rounded-xl overflow-hidden mb-8">

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 left-4 z-50
                             px-4 py-2
                             rounded-full
                             bg-white/90 backdrop-blur-md
                             border border-gray-300
                             text-[#2c5f7c]
                             shadow-md
                             hover:bg-[#2c5f7c]
                             hover:text-white
                             transition"
                >
                  ← Back
                </button>

                <Image
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">
                {selectedArticle.source} · {selectedArticle.date}
              </p>

              <h2 className="text-3xl font-bold text-[#2c5f7c] mb-6">
                {selectedArticle.title}
              </h2>

              <p className="text-lg leading-relaxed text-gray-700">
                {selectedArticle.content}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default PressPage;