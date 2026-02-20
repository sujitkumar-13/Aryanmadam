'use client';

import { useEffect } from "react";
import { ShieldCheck, Leaf, Lock, Award } from "lucide-react";

const features = [
  {
    title: "Premium Quality",
    description:
      "Rigorously tested materials meeting professional standards, crafted with timeless precision.",
    icon: Award,
  },
  {
    title: "Sustainable Sourcing",
    description:
      "Ethically sourced materials honoring nature, tradition, and responsible craftsmanship.",
    icon: Leaf,
  },
  {
    title: "Secure Transactions",
    description:
      "Trusted, encrypted transactions ensuring safety, privacy, and peace of mind.",
    icon: Lock,
  },
  {
    title: "Expert Support",
    description:
      "Dedicated guidance and assistance from seasoned artisans and specialists.",
    icon: ShieldCheck,
  },
];

export default function WhyChooseUs() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate="card"]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("visible", entry.isIntersecting);
        });
      },
      { threshold: 0.25 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen py-28 px-6 font-serif overflow-hidden bg-[#1A4A5E] text-white">
      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div data-animate="card" className="mb-20 text-center">
          

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Why Choose Us
          </h2>

          <p className="mx-auto max-w-3xl text-white mt-4 text-lg leading-relaxed">
            Professional-grade materials backed by industry expertise and exceptional service
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              data-animate="card"
              className="group rounded-2xl
                         border border-white/20
                         bg-white/10
                         backdrop-blur
                         p-8 text-center
                         shadow-[0_20px_50px_rgba(0,0,0,0.25)]
                         transition hover:-translate-y-1
                         hover:shadow-[0_30px_70px_rgba(0,0,0,0.35)]"
            >
              {/* Icon */}
              <div
                className="mx-auto mb-6 flex h-14 w-14 items-center justify-center
                           rounded-xl border border-white/30
                           bg-white/10
                           transition group-hover:scale-105"
              >
                <feature.icon className="h-7 w-7 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white tracking-wide">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-4 text-sm text-white leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
