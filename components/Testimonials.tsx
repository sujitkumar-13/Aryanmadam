'use client';

import { FC, useEffect } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  company: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Exceptional quality and consistency. Perfect for professional projects.",
    name: "Sophia Bennett",
    role: "Creative Director",
    company: "Artisan Studios",
    image: "/assets/reviews/girl1.webp",
  },
  {
    id: 2,
    text: "Premium products and outstanding service. Highly recommended.",
    name: "Ethan Hughes",
    role: "Product Designer",
    company: "Craft Innovations",
    image: "/assets/reviews/man1.webp",
  },
  {
    id: 3,
    text: "High-quality materials that make designing a joy.",
    name: "Olivia Parker",
    role: "Lead Illustrator",
    company: "Artisan Studios",
    image: "/assets/reviews/girl2.webp",
  },
  {
    id: 4,
    text: "Reliable and professional service every time.",
    name: "Liam Thompson",
    role: "UX Designer",
    company: "Craft Innovations",
    image: "/assets/reviews/man2.webp",
  },
  {
    id: 5,
    text: "Exceptional quality and fast delivery. Love working with them!",
    name: "Amelia Wilson",
    role: "Fashion Designer",
    company: "Artisan Studios",
    image: "/assets/reviews/girl3.webp",
  },
  {
    id: 6,
    text: "Always delivers more than expected. Top-notch products.",
    name: "Noah Anderson",
    role: "Industrial Designer",
    company: "Craft Innovations",
    image: "/assets/reviews/man3.webp",
  },
];

const Testimonials: FC = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate="card"]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('visible', entry.isIntersecting);
        });
      },
      { threshold: 0.25 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-28 px-6 font-serif overflow-hidden bg-white text-black">
      <div className="absolute inset-0 bg-white" />

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div data-animate="card" className="text-center mb-20">
          

          <h2 className="text-4xl md:text-5xl font-bold text-[rgb(44_95_124)] mb-4">
            Trusted by Professionals
          </h2>

          <p className="text-black/80 text-lg max-w-3xl mx-auto">
            See what industry experts say about our materials and service
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t) => (
            <div
              key={t.id}
              data-animate="card"
              className="rounded-2xl border border-black/20 bg-white p-8
                         shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                         transition hover:-translate-y-1
                         hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
            >
              {/* ⭐ Stars (UPDATED COLOR) */}
              <div className="flex mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-[rgb(244_162_97)] fill-[rgb(244_162_97)]"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-black/80 italic leading-relaxed mb-8">
                “{t.text}”
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 mt-4">
                <div className="w-16 h-16 relative rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-[rgb(44_95_124)]">{t.name}</h4>
                  <p className="text-sm text-black/80">{t.role}</p>
                  <p className="text-sm text-black/60">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
