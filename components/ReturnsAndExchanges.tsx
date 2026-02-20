'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/TextReveal';

const ReturnsExchangePage = () => {
  return (
    <section className="relative min-h-screen px-6 py-32 font-serif bg-white overflow-hidden">

      {/* CONTENT */}
      <div className="mx-auto max-w-4xl text-[#3b2a1a]">

        {/* HEADER */}
        <div className="mb-20 text-center">
          <span
            className="inline-block mb-6 px-6 py-2
                       border border-[#2c5f7c]/40
                       rounded-full
                       text-[#2c5f7c]
                       tracking-widest uppercase text-xs"
          >
            Returns & Exchange
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-[#2c5f7c]">
            <TextReveal text="Returns & Exchange Policy" />
          </h1>

          <div className="my-6 text-[#2c5f7c] tracking-widest">
            ───── ✦ ─────
          </div>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
            <TextReveal
              delay={0.2}
              text="Our commitment is to ensure a smooth and transparent return and exchange experience for every customer."
            />
          </p>
        </div>

        {/* CONTENT */}
        <div className="space-y-12">
          {[
            {
              title: 'Eligibility for Returns',
              text: 'Items are eligible for return within 7 days of delivery, provided they are unused, in original condition, and include all original packaging.',
            },
            {
              title: 'Non-Returnable Items',
              text: 'Customized products, clearance items, and items marked as non-returnable are not eligible for return or exchange.',
            },
            {
              title: 'Exchange Process',
              text: 'If you wish to exchange a product, please contact our support team with your order details. Exchanges are subject to product availability.',
            },
            {
              title: 'Refunds',
              text: 'Once the returned item is received and inspected, refunds will be processed within 5–7 business days to the original payment method.',
            },
            {
              title: 'Return Shipping',
              text: 'Customers are responsible for return shipping costs unless the return is due to a damaged or incorrect item received.',
            },
            {
              title: 'Damaged or Incorrect Items',
              text: 'If you receive a damaged or incorrect product, please notify us within 48 hours of delivery so we can resolve the issue promptly.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl
                         border border-gray-200
                         bg-white
                         p-8
                         shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
            >
              <h2 className="text-2xl font-semibold text-[#2c5f7c] mb-4">
                <TextReveal text={item.title} />
              </h2>

              <p className="leading-relaxed text-gray-600">
                <TextReveal delay={0.1} text={item.text} />
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="mt-32 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2c5f7c] mb-6">
            <TextReveal text="Need Help With a Return?" />
          </h2>

          <p className="mb-10 text-lg text-gray-600">
            <TextReveal text="Our support team is here to assist you with returns and exchanges." />
          </p>

          <motion.button
            initial={{ letterSpacing: '0.25em', opacity: 0 }}
            whileInView={{ letterSpacing: '0em', opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="px-8 py-3
                       border border-[#2c5f7c]
                       text-[#2c5f7c]
                       rounded-full
                       tracking-wide
                       hover:bg-[#2c5f7c]
                       hover:text-white
                       transition"
          >
            Contact Support
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default ReturnsExchangePage;