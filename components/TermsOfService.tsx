'use client';

import React from 'react';
import { motion } from 'framer-motion';

const rollVariant = {
  hidden: {
    opacity: 0,
    scaleY: 0,
  },
  visible: {
    opacity: 1,
    scaleY: 1,
  },
};

const RollBlock = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={rollVariant}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, margin: '-100px' }}
    transition={{ duration: 1, ease: [0.77, 0, 0.18, 1] }}
    style={{ transformOrigin: 'top' }}
  >
    {children}
  </motion.div>
);

const TermsPolicyPage = () => {
  return (
    <section
      className="relative min-h-screen px-6 py-32 font-serif
                 bg-white text-[rgb(44_95_124)] overflow-hidden"
    >
      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-4xl">

        {/* HEADER */}
        <RollBlock>
          <div className="mb-20 text-center">
            <span
              className="inline-block mb-6 px-6 py-2
                         border border-[#e6cfa7]
                         rounded-full
                         text-[rgb(44_95_124)]
                         tracking-widest uppercase text-xs"
            >
              Terms & Policy
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms & Conditions
            </h1>

            <div className="my-6 text-[#e6cfa7] tracking-widest">
              ───── ✦ ─────
            </div>

            <p className="mx-auto max-w-3xl text-lg leading-relaxed opacity-80">
              Please read these terms carefully before using our website
              and purchasing our products.
            </p>
          </div>
        </RollBlock>

        {/* CONTENT BLOCKS */}
        <div className="space-y-12">
          {[
            {
              title: 'Acceptance of Terms',
              text: 'By accessing or using our website, you agree to be bound by these terms and conditions.',
            },
            {
              title: 'Use of Website',
              text: 'You agree to use our website only for lawful purposes and not infringe others\' rights.',
            },
            {
              title: 'Product Information',
              text: 'Product details may slightly vary due to handcrafted nature.',
            },
            {
              title: 'Pricing & Payments',
              text: 'Prices are subject to change without notice.',
            },
            {
              title: 'Intellectual Property',
              text: 'All website content is protected and may not be reused.',
            },
            {
              title: 'Limitation of Liability',
              text: 'We are not liable for indirect or consequential damages.',
            },
            {
              title: 'Changes to Terms',
              text: 'Terms may be updated anytime without prior notice.',
            },
          ].map((item, i) => (
            <RollBlock key={i}>
              <div
                className="rounded-2xl p-8
                           border border-[#e6cfa7]/25
                           bg-white
                           shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                           hover:shadow-[0_15px_40px_rgba(0,0,0,0.16)]
                           transition-all duration-300"
              >
                <h2 className="text-2xl font-semibold mb-4">
                  {item.title}
                </h2>

                <p className="leading-relaxed opacity-80">
                  {item.text}
                </p>
              </div>
            </RollBlock>
          ))}
        </div>

        {/* CTA */}
        <RollBlock>
          <div className="mt-32 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Questions About Our Terms?
            </h2>

            <p className="mb-10 text-lg opacity-80">
              Contact us if you need clarification.
            </p>

            <button
              className="px-8 py-3 rounded-full
                         border border-[#e6cfa7]
                         text-[rgb(44_95_124)]
                         hover:bg-[#e6cfa7]
                         hover:text-white
                         transition"
            >
              Contact Support
            </button>
          </div>
        </RollBlock>

      </div>
    </section>
  );
};

export default TermsPolicyPage;