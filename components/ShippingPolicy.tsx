'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';

const sections = [
  {
    title: 'Processing Time',
    text: 'All orders are processed within 1–3 business days. Orders placed on weekends or holidays will be processed on the next business day.',
  },
  {
    title: 'Shipping Methods',
    text: 'We offer standard and expedited shipping options depending on your location. Shipping partners are selected to ensure safe and timely delivery.',
  },
  {
    title: 'Delivery Time',
    text: 'Estimated delivery times range from 5–10 business days depending on destination and shipping method.',
  },
  {
    title: 'Shipping Charges',
    text: 'Shipping charges are calculated at checkout based on order weight, destination, and selected shipping method.',
  },
  {
    title: 'Order Tracking',
    text: 'Once your order ships, you will receive a confirmation email with tracking details.',
  },
  {
    title: 'Delays & Issues',
    text: 'Delays may occur due to weather, customs, or carrier-related issues.',
  },
];

const BLUE = 'rgb(44,95,124)';

export default function ShippingPolicyPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const router = useRouter();

  return (
    <section
      className="relative min-h-screen px-6 py-32 font-serif bg-white overflow-hidden"
      style={{ color: BLUE }}
    >
      {/* SCROLL PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-50"
        style={{ scaleX, backgroundColor: BLUE }}
      />

      <div className="relative z-10 mx-auto max-w-4xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="mb-20 text-center"
        >
          <span
            className="inline-block mb-6 px-6 py-2 rounded-full border tracking-widest uppercase text-xs"
            style={{ borderColor: BLUE, color: BLUE }}
          >
            Shipping Policy
          </span>

          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: BLUE }}
          >
            Shipping & Delivery
          </h1>

          <div className="my-6 tracking-widest">───── ✦ ─────</div>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed opacity-90">
            Everything you need to know about how we ship our products.
          </p>
        </motion.div>

        {/* SECTIONS */}
        <div className="space-y-20">
          {sections.map((item, i) => (
            <motion.div
              key={i}
              viewport={{ once: false, margin: '-120px' }}
              className="relative pl-10"
            >
              {/* VERTICAL LINE */}
              <motion.span
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute left-0 top-0 w-[2px]"
                style={{ backgroundColor: BLUE }}
              />

              {/* CONTENT CARD */}
              <motion.div
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1] }}
                className="rounded-2xl p-8 bg-white border shadow-[0_10px_30px_rgba(44,95,124,0.2)]
                           hover:shadow-[0_15px_40px_rgba(44,95,124,0.35)]
                           transition-all duration-300"
                style={{ borderColor: `${BLUE}40` }}
              >
                <h2 className="text-2xl font-semibold mb-4" style={{ color: BLUE }}>
                  {item.title}
                </h2>

                <p className="leading-relaxed opacity-85">
                  {item.text}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="mt-32 text-center"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: BLUE }}
          >
            Need Help With Shipping?
          </h2>

          <p className="mb-10 text-lg opacity-90">
            Contact our support team for any shipping-related queries.
          </p>

          <motion.button
            onClick={() => router.push('/contact')}
            whileHover={{
              backgroundColor: BLUE,
              color: '#fff',
            }}
            transition={{ duration: 0.3 }}
            className="px-8 py-3 rounded-full border transition font-medium"
            style={{ borderColor: BLUE, color: BLUE }}
          >
            Contact Support
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}