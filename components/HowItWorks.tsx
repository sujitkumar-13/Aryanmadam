'use client';

import { useEffect } from 'react';
import { Search, ShoppingCart, ShieldCheck, Truck } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Browse Catalog",
    description:
      "Explore our carefully curated collection of heritage craft materials.",
    icon: <Search className="w-8 h-8" strokeWidth={2} />,
  },
  {
    id: 2,
    title: "Select Products",
    description:
      "Choose materials with detailed specifications and artisan-approved quality.",
    icon: <ShoppingCart className="w-8 h-8" strokeWidth={2} />,
  },
  {
    id: 3,
    title: "Secure Checkout",
    description:
      "Complete your order through trusted, encrypted payment systems.",
    icon: <ShieldCheck className="w-8 h-8" strokeWidth={2} />,
  },
  {
    id: 4,
    title: "Fast Delivery",
    description:
      "Receive carefully packaged supplies with reliable tracking.",
    icon: <Truck className="w-8 h-8" strokeWidth={2} />,
  },
];

const StepCard: React.FC<{ step: Step; index: number }> = ({ step, index }) => {
  return (
    <div
      data-animate="card"
      className="relative"
    >
      {/* Connector line */}
      {index < steps.length - 1 && (
        <div
          className="hidden lg:block absolute top-10 left-[60%]
                     w-[80%] h-0.5
                     bg-gradient-to-r from-gray-300 to-transparent"
        />
      )}

      {/* 👇 REQUIRED text-center WRAPPER */}
      <div className="text-center font-serif text-black flex flex-col items-center">
        {/* Icon + Number */}
        <div className="relative mb-8 z-10">
          <div
            className="w-24 h-24 rounded-2xl
                       bg-white
                       border border-black/20
                       flex items-center justify-center
                       shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
          >
            {step.icon}
          </div>

          <div
            className="absolute -top-4 -right-4 w-12 h-12
                       bg-[rgb(212_175_55)]
                       rounded-lg flex items-center justify-center
                       shadow-lg"
          >
            <span className="text-black font-bold tracking-wider">
              {step.id.toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-semibold text-black mb-4">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-black/80 leading-relaxed max-w-sm mx-auto">
          {step.description}
        </p>
      </div>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate="card"]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.target.classList.toggle('visible', entry.isIntersecting)
        );
      },
      { threshold: 0.25 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-white font-serif overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div data-animate="card" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 tracking-tight">
            How It Works
          </h2>

          <p className="text-black/80 text-base max-w-2xl mx-auto">
            Streamlined ordering process designed for professional efficiency
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;