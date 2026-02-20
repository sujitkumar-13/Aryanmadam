'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: 'How can I apply for a position?',
    a: 'You can apply directly from our Careers page by selecting an open position and submitting your resume.',
  },
  {
    q: 'Do you offer remote work options?',
    a: 'Yes, selected roles offer remote or hybrid work depending on the nature of the position.',
  },
  {
    q: 'What is your hiring process timeline?',
    a: 'Our hiring process typically takes 2–3 weeks, including application review and interviews.',
  },
  {
    q: 'Can I apply if no role matches my profile?',
    a: 'Absolutely. You can send us your resume, and we’ll reach out when a suitable opportunity arises.',
  },
  {
    q: 'What kind of work culture do you promote?',
    a: 'We value craftsmanship, mutual respect, creativity, and long-term growth.',
  },
];

export default function FAQClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const t = setTimeout(() => {
      document.getElementById('faqs')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
    return () => clearTimeout(t);
  }, [searchParams]);

  return (
    <section
      id="faqs"
      className="relative min-h-screen px-6 py-32 font-serif bg-white"
    >
      <div className="mx-auto max-w-4xl text-[#3b2a1a]">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="mb-24 text-center"
        >
          <span
            className="inline-block mb-6 px-6 py-2
                       border border-[#2c5f7c]/40
                       rounded-full
                       text-[#2c5f7c]
                       tracking-widest uppercase text-xs"
          >
            FAQs
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-[#2c5f7c]">
            Frequently Asked Questions
          </h1>

          <div className="my-6 text-[#2c5f7c] tracking-widest">
            ───── ✦ ─────
          </div>

          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Answers to common questions about working with us
          </p>
        </motion.div>

        {/* FAQ LIST */}
        <div className="space-y-6">
          {faqs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="rounded-2xl border border-[#2c5f7c]/20 bg-white
                         shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <h3 className="text-lg font-semibold text-[#2c5f7c]">
                  {item.q}
                </h3>
                <span className="text-2xl text-[#2c5f7c]">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden px-6 pb-6 text-sm text-gray-600 leading-relaxed"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-32 text-center">
          <Link
            href="/contact#contact"
            className="inline-block px-10 py-3
                       border border-[#2c5f7c]
                       text-[#2c5f7c]
                       rounded-full
                       font-semibold
                       hover:bg-[#2c5f7c]
                       hover:text-white
                       transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
