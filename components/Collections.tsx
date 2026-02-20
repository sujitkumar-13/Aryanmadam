'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import CurtainReveal from '@/components/CurtainReveal';

const collections = [
  {
    id: 1,
    title: 'Beads & Charms',
    count: '150+ Products',
    desc: 'Glass, crystal, wooden & metal beads for jewelry making.',
    image: '/assets/beadsAndCharms2.jpeg',
  },
  {
    id: 2,
    title: 'DIY Craft Kits',
    count: '40+ Products',
    desc: 'Complete kits to bring your creative ideas to life.',
    image: '/assets/DiyCraft2.jpeg',
  },
  {
    id: 3,
    title: 'Thread & Yarn',
    count: '80+ Products',
    desc: 'Embroidery, silk, cotton & specialty threads.',
    image: '/assets/threadAndYarn2.jpeg',
  },
  {
    id: 4,
    title: 'Decorative & Art',
    count: '60+ Products',
    desc: 'Decorative elements for art & craft projects.',
    image: '/assets/artisanSupplies.jpeg',
  },
  {
    id: 5,
    title: 'Tools & Accessories',
    count: '35+ Products',
    desc: 'Essential tools for precision crafting.',
    image: '/assets/toolsAndAcc.jpeg',
  },
  {
    id: 6,
    title: 'Gift Packs & Bundles',
    count: '25+ Products',
    desc: 'Curated bundles perfect for gifting & beginners.',
    image: '/assets/giftPacks.jpeg',
  },
];

export default function CollectionsPage() {
  const router = useRouter();

  const handleExplore = (title: string) => {
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    router.push(`/shop?collection=${encodeURIComponent(slug)}`);
  };

  return (
    <section className="relative min-h-screen px-6 py-24 font-serif overflow-hidden bg-white text-[#2b1d12]">
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}
        <CurtainReveal>
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Vintage Collections
            </h1>
            <p className="max-w-3xl mx-auto text-lg opacity-90">
              Discover curated collections of premium craft supplies.
            </p>
          </div>
        </CurtainReveal>

        {/* COLLECTION GRID – NO CHANGE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
          {collections.map((c, i) => (
            <CurtainReveal key={c.id} delay={i * 0.12}>
              <div
                className="group relative rounded-3xl overflow-hidden
                           border border-[#e6cfa7]/25
                           bg-white
                           shadow-[0_10px_30px_rgba(0,0,0,0.1)]
                           cursor-pointer
                           hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)]
                           transition-all duration-300"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover
                               group-hover:scale-105
                               transition duration-700"
                  />
                </div>

                <div className="absolute bottom-0 p-6">
                  <span
                    className="inline-block mb-2 px-3 py-1 text-xs
                               rounded-full bg-[#e6cfa7]/20
                               text-[#2b1d12]"
                  >
                    {c.count}
                  </span>

                  <h3 className="text-xl font-semibold mb-2">
                    {c.title}
                  </h3>

                  <p className="text-sm opacity-80 mb-4">
                    {c.desc}
                  </p>

                  <button
                    onClick={() => handleExplore(c.title)}
                    className="px-5 py-2 rounded-full
                               border border-[#e6cfa7]
                               text-[#2b1d12]
                               hover:bg-[#e6cfa7]
                               hover:text-white
                               cursor-pointer
                               transition text-sm"
                  >
                    Explore Collection
                  </button>
                </div>
              </div>
            </CurtainReveal>
          ))}
        </div>

        

      </div>
    </section>
  );
}