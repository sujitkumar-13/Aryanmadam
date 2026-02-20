"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Leaf,
  Headphones,
  Lightbulb,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, animate, useMotionValue, useInView, AnimatePresence } from "framer-motion";
import ThreeDCard from "@/components/ThreeDCard";

/* ================= Animated Counter ================= */
const AnimatedCounter = ({ value }: { value: string }) => {
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState("0");

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    let controls: any;

    if (isInView) {
      controls = animate(motionValue, numericValue, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest).toLocaleString());
        },
      });
    } else {
      motionValue.set(0);
      setDisplayValue("0");
    }

    return () => controls?.stop();
  }, [isInView, numericValue, motionValue]);

  return <motion.span ref={ref}>{displayValue}{suffix}</motion.span>;
};

/* ================= Gallery Images ================= */
const galleryImages: string[] = [
  '/gallery/g1.jpeg',
  '/gallery/g2.jpeg',
  '/gallery/g3.jpeg',
  '/gallery/g4.jpeg',
  '/gallery/g5.jpeg',
  '/gallery/g6.jpeg',
  '/gallery/g7.jpeg',
  '/gallery/g8.jpeg',
  '/gallery/g9.jpeg',
  '/gallery/g10.jpeg',
  '/gallery/g11.jpeg',
  '/gallery/g12.jpeg',
  '/gallery/g13.jpeg',
  '/gallery/g14.jpeg',
];

/* ================= PAGE ================= */
export default function AboutUs() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Then handle hash navigation if present
    if (window.location.hash === "#about") {
      setTimeout(() => {
        const element = document.getElementById("about");
        if (element) {
          const navbarHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 150);
    }
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentImageIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const stats = [
    { value: "10,000+", label: "Happy Customers" },
    { value: "500+", label: "Premium Products" },
    { value: "15+", label: "Years Experience" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  const values = [
    {
      title: "Quality Assurance",
      description:
        "Every product is carefully inspected to meet our high standards of excellence.",
      icon: ShieldCheck,
    },
    {
      title: "Sustainability",
      description:
        "We prioritize eco-friendly materials and ethical sourcing practices.",
      icon: Leaf,
    },
    {
      title: "Customer First",
      description:
        "Your satisfaction is our priority with dedicated support and easy returns.",
      icon: Headphones,
    },
    {
      title: "Innovation",
      description:
        "We constantly explore new materials and creative techniques to inspire you.",
      icon: Lightbulb,
    },
  ];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div id="about" className="font-serif bg-white">

      {/* ================= HERO ================= */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1505904267569-1fdda0a87a07?auto=format&fit=crop&w=1920&q=80')",
          }}
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2b1d12]/95 via-[#3b2a1a]/85 to-[#2b1d12]/95" />

        <div className="relative z-10 h-full flex items-center bg-[rgb(44_95_124)] justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-7xl mx-auto"
          >
            <span className="inline-block mb-4 px-6 py-2 border border-[#e6cfa7]/60 rounded-full text-white text-xs tracking-widest">
              OUR STORY
            </span>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">About Us</h1>

            <div className="mb-6 text-white tracking-[0.3em] text-sm md:text-base">
              ───── ✦ HANDCRAFTED • TRUSTED • TIMELESS ✦ ─────
            </div>

            <p className="text-white text-lg max-w-4xl mx-auto">
              Blending tradition, quality, and innovation, we deliver thoughtfully crafted materials that help creators
              build lasting, beautiful, and meaningful work. <span className="text-white font-semibold">Since 2010</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-3xl font-bold text-[rgb(44_95_124)] mb-6">Our Story</h2>
              <p className="text-black mb-6 leading-relaxed">
                Arya Madam Art and Craft Services is a purpose-driven initiative founded by
                <span className="text-black font-semibold"> Arya Madam</span>, a highly respected
                educator and master craftsperson with over
                <span className="text-black font-semibold"> 30 years of experience</span>
                in art and craft education.
              </p>

              <p className="text-black mb-6 leading-relaxed">
                Her journey began in <span className="font-semibold">Tumsar, Maharashtra</span>,
                where she spent 15 years nurturing creativity, discipline, and artistic excellence
                among students. She later continued her mission in
                <span className="font-semibold"> Bhiwani, Haryana</span>, serving for more than
                15 years at <span className="italic">Vaish Model Senior Secondary School</span>
                as an Art and Craft Instructor.
              </p>

              <p className="text-black mb-6 leading-relaxed">
                Throughout her career, Arya Madam became known not only for her technical expertise,
                but also for her commitment to holistic education—building confidence, character,
                and self-expression through creative learning.
              </p>

              <p className="text-black mb-6 leading-relaxed">
                After retiring from formal school teaching, she dedicated herself to
                <span className="text-black font-semibold"> community upliftment</span>.
                She initiated free education and awareness programs in
                <span className="font-semibold"> Rudra Colony near TIT School, Bhiwani</span>,
                with a strong focus on girls' education, women empowerment, and social awareness.
              </p>

              <p className="text-black mb-6 leading-relaxed">
                This vision was deeply shared with her late husband,
                <span className="font-semibold"> Lt. Shri Ramakant Arya Ji</span>,
                a dedicated music teacher who believed in uplifting society through education
                and culture. After his retirement and later his untimely demise, Arya Madam
                carried forward their shared mission with even greater resolve.
              </p>

              <p className="text-black leading-relaxed">
                At the heart of Arya Madam Art and Craft Services lies a powerful vision—to empower
                girls, boys, and young individuals through structured degree and diploma programs
                in art and craft. By combining hands-on training, mentorship, and value-based learning,
                the initiative strives to create sustainable livelihoods, financial independence,
                and a sense of purpose—transforming creativity into dignity and long-term success.
              </p>
            </motion.div>

            <ThreeDCard>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Image
                  src="/assets/ourStory1.jpeg"
                  alt="Store Interior"
                  width={800}
                  height={520}
                  className="rounded-2xl object-cover"
                />
              </motion.div>
            </ThreeDCard>
          </div>

          {/* ================= STATS ================= */}
          <motion.div
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="text-5xl font-bold text-[rgb(44_95_124)] mb-2">
                  <AnimatedCounter value={stat.value} />
                </div>
                <p className="text-black">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="py-28 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl text-[rgb(44_95_124)] font-bold mb-4">
            Our Values
          </h2>

          <p className="text-center text-black text-lg mb-20">
            The principles that guide everything we do
          </p>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <ThreeDCard>
                    <div className="p-8 bg-white rounded-2xl text-center border border-[#e6cfa7]/30 h-full">
                      <div className="mx-auto mb-6 w-14 h-14 flex items-center justify-center bg-[rgb(44_95_124)] rounded-xl">
                        <Icon className="text-[#e6cfa7]" />
                      </div>
                      <h3 className="font-semibold text-[rgb(44_95_124)] mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm text-black">
                        {value.description}
                      </p>
                    </div>
                  </ThreeDCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= GALLERY SLIDER ================= */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl font-bold text-[rgb(44_95_124)] mb-4">
            Our Gallery
          </h2>

          <p className="text-center text-black text-lg mb-16">
            Explore our beautiful collection of craft works
          </p>

          {/* Slider Container */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-2xl bg-gray-100">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentImageIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={galleryImages[currentImageIndex]}
                    alt={`Gallery Image ${currentImageIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Previous Button */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6 text-[rgb(44_95_124)]" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6 text-[rgb(44_95_124)]" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm z-10">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>
            </div>

            {/* Thumbnail Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentImageIndex ? 1 : -1);
                    setCurrentImageIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "bg-[rgb(44_95_124)] w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>



    </div>
  );
}