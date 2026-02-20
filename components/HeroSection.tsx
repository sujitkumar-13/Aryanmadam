'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Shield, Truck, Headphones } from 'lucide-react';
import Link from 'next/link';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // first load fix (mobile)
    setActive(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(false);
          requestAnimationFrame(() => setActive(true));
        }
      },
      {
        threshold: 0.2,
        rootMargin: '-60px 0px -60px 0px',
      }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen font-serif overflow-hidden w-full"
    >
      {/* ✅ GRADIENT BACKGROUND - No image needed */}
      <div
        className="absolute inset-0 bg-gradient-to-br 
                   from-[#1A4A5E] via-[#2C5F7C] to-[#264653]"
      />
      
      {/* Optional: Decorative overlay pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* CONTENT */}
      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 sm:py-28 lg:py-32
          ${active ? 'luxury-reveal' : 'luxury-hidden'}
        `}
      >
        {/* BADGE */}
        <span className="inline-block mb-6 sm:mb-8 px-4 sm:px-6 py-2 border border-white/40
          rounded-full text-white uppercase text-xs sm:text-sm tracking-widest">
          Premium Craft Supplies
        </span>

        {/* HEADING */}
        <h1
          className="
            text-[clamp(2rem,8vw,4.5rem)]
            font-bold text-white mb-4 sm:mb-6
            leading-[1.1]
            tracking-tight
            max-w-3xl
          "
        >
          <span className="block">Arya Madam</span>
          <span className="block text-[#F4A261]">Craft Supplies</span>
        </h1>

        {/* DESCRIPTION */}
        <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 sm:mb-12 max-w-2xl leading-relaxed">
          Professional-grade materials inspired by heritage craftsmanship.
          Carefully curated for artisans who value tradition and quality.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4
              bg-[#F4A261] text-white font-semibold rounded-md text-sm sm:text-base
              hover:bg-[#E76F51] transition-all duration-300"
          >
            Explore Collection
          </Link>

          <Link
            href="/collections"
            className="inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4
              border-2 border-white/40 text-white font-semibold rounded-md text-sm sm:text-base
              hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            View Catalog
          </Link>
        </div>

        {/* FEATURES */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-12">
          {[Shield, Truck, Headphones].map((Icon, i) => (
            <div key={i} className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border border-white/40 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-sm sm:text-base">
                {['Quality Assured', 'Fast Delivery', 'Expert Support'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;