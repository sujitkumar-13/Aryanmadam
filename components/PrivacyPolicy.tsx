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
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
        style={{ transformOrigin: 'top' }}
    >
        {children}
    </motion.div>
);

const PrivacyPolicy = () => {
    return (
        <section className="relative min-h-screen px-6 py-10 font-serif bg-white text-[rgb(44_95_124)] overflow-hidden">
            <div className="relative z-10 mx-auto max-w-4xl">

                {/* HEADER */}
                <RollBlock>
                    <div className="mb-20 text-center">
                        <span className="inline-block mb-6 px-6 py-2 border border-[#e6cfa7] rounded-full text-[rgb(44_95_124)] tracking-widest uppercase text-sm">
                            Privacy Policy
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Privacy Policy for aryamadamcraftupplies
                        </h1>
                        <div className="my-6 text-[#e6cfa7] tracking-widest">
                            ───── ✦ ─────
                        </div>
                        <p className="mx-auto max-w-3xl text-xl leading-relaxed opacity-90">
                            We value the trust you place in us. That's why we insist upon the highest standards for secure transactions and customer information privacy.
                        </p>
                    </div>
                </RollBlock>

                {/* CONTENT BLOCKS */}
                <div className="space-y-12">
                    <RollBlock>
                        <div className="rounded-2xl p-8 border border-[#e6cfa7]/25 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-all duration-300">
                            <h2 className="text-2xl font-semibold mb-4 text-black">Introduction</h2>
                            <p className="leading-relaxed opacity-90 text-xl mb-4">
                                By visiting this Website (www.aryamadamcraftupplies), you agree to be bound by the terms and conditions of this Privacy Policy. If you do not agree, please do not use or access our Website.
                            </p>
                            <p className="leading-relaxed opacity-90 italic text-lg border-l-2 border-[#e6cfa7] pl-4">
                                Note: Our privacy policy is subject to change at any time without notice. To make sure you are aware of any changes, please review this policy periodically.
                            </p>
                        </div>
                    </RollBlock>

                    <RollBlock>
                        <div className="rounded-2xl p-8 border border-[#e6cfa7]/25 bg-neutral-50/50 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] transition-all duration-300">
                            <h2 className="text-2xl font-semibold mb-4 text-black">Collection of Information</h2>
                            <p className="leading-relaxed opacity-90 text-lg mb-4">
                                When you use our Website, we collect and store your personal information which is provided by you from time to time. Our primary goal in doing so is to provide you a safe, efficient, smooth, and customized experience.
                            </p>
                            <p className="leading-relaxed opacity-90 text-lg">
                                In general, you can browse the Website without telling us who you are or revealing any personal information about yourself. Once you give us your personal information, you are not anonymous to us. Wherever possible, we indicate which fields are required and which fields are optional.
                            </p>
                        </div>
                    </RollBlock>

                    <RollBlock>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="rounded-2xl p-8 border border-[#e6cfa7]/25 bg-white shadow-lg">
                                <h3 className="text-xl font-bold mb-4">Use of Cookies</h3>
                                <p className="text-lg opacity-90 leading-relaxed">
                                    We use data collection devices such as "cookies" on certain pages of the Website to help analyze our web page flow, measure promotional effectiveness, and promote trust and safety. Best of all, "Cookies" help us provide information targeted to your interests.
                                </p>
                            </div>
                            <div className="rounded-2xl p-8 border border-[#e6cfa7]/25 bg-white shadow-lg">
                                <h3 className="text-xl font-bold mb-4">Buying Behavior</h3>
                                <p className="text-lg opacity-90 leading-relaxed">
                                    If you choose to buy on the Website, we collect information about your buying behavior. If you transact with us, we only collect the basic information like billing address, your login ID, email ID, etc.
                                </p>
                            </div>
                        </div>
                    </RollBlock>

                    <RollBlock>
                        <div className="rounded-2xl p-8 border border-[#e6cfa7]/25 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                            <h2 className="text-2xl font-semibold mb-4 text-black">Profile Data & Security</h2>
                            <div className="space-y-4">
                                <div className="flex gap-4 items-start">
                                    <div className="w-2 h-2 rounded-full bg-[#e6cfa7] mt-2 shrink-0" />
                                    <p className="text-lg opacity-90 leading-relaxed">
                                        We identify and use your IP address to help diagnose problems with our server and to administer our Website.
                                    </p>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-2 h-2 rounded-full bg-[#e6cfa7] mt-2 shrink-0" />
                                    <p className="text-lg opacity-90 leading-relaxed">
                                        We disclose personal information with corporate entities and affiliates to help detect/prevent fraud and other potentially illegal acts.
                                    </p>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-2 h-2 rounded-full bg-[#e6cfa7] mt-2 shrink-0" />
                                    <p className="text-lg opacity-90 leading-relaxed">
                                        Our Website has stringent security measures in place to protect the loss, misuse, and alteration of the information under our control.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </RollBlock>

                    <RollBlock>
                        <div className="rounded-2xl p-8 border-2 border-[#e6cfa7]/40 bg-white">
                            <h2 className="text-2xl font-semibold mb-6 text-black text-center">Security Precautions</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                                <div className="p-4 bg-neutral-50 rounded-xl">
                                    <h4 className="font-bold text-[#e6cfa7] mb-2 uppercase text-sm tracking-tighter italic lg:not-italic lg:tracking-wider">Advanced Tech</h4>
                                    <p className="text-base opacity-90">Firewalls, encryption, and data leakage protection.</p>
                                </div>
                                <div className="p-4 bg-neutral-50 rounded-xl">
                                    <h4 className="font-bold text-[#e6cfa7] mb-2 uppercase text-sm tracking-tighter italic lg:not-italic lg:tracking-wider">Vulnerability Fix</h4>
                                    <p className="text-base opacity-90">Continuous monitoring for vulnerabilities and intrusions.</p>
                                </div>
                                <div className="p-4 bg-neutral-50 rounded-xl">
                                    <h4 className="font-bold text-[#e6cfa7] mb-2 uppercase text-sm tracking-tighter italic lg:not-italic lg:tracking-wider">Strict Audits</h4>
                                    <p className="text-base opacity-90">Audit of all vendors and execution of NDAs.</p>
                                </div>
                            </div>
                        </div>
                    </RollBlock>

                    <RollBlock>
                        <div className="rounded-2xl p-8 border border-[#e6cfa7]/25 bg-white shadow-xl">
                            <h2 className="text-2xl font-semibold mb-4 text-black">Choice/Opt-Out</h2>
                            <p className="leading-relaxed opacity-90 mb-6 font-medium text-lg">
                                We provide all users with the opportunity to opt-out of receiving non-essential (promotional, marketing-related) communications from us.
                            </p>
                            <div className="bg-neutral-50 p-6 rounded-xl border-l-4 border-[#e6cfa7] flex justify-between items-center sm:flex-row flex-col gap-4">
                                <span className="text-black font-semibold text-lg">Want to remove your information?</span>
                                <a href="mailto:info@aryamadamcraftupplies.com" className="px-6 py-2 bg-black text-white rounded-full text-lg hover:bg-[#e6cfa7] transition-colors">
                                    Email Us
                                </a>
                            </div>
                        </div>
                    </RollBlock>
                </div>

                {/* FOOTER NOTE */}
                <RollBlock>
                    <div className="mt-24 pt-12 border-t border-[#e6cfa7]/20 text-center">
                        <h2 className="text-2xl font-bold mb-4 italic transition-all duration-300">Your Consent</h2>
                        <p className="max-w-2xl mx-auto text-lg opacity-90 leading-relaxed italic lg:not-italic">
                            By using the Website and/or by providing your information, you consent to the collection and use of the information you disclose on the Website in accordance with this Privacy Policy.
                        </p>
                    </div>
                </RollBlock>
            </div>
        </section>
    );
};

export default PrivacyPolicy;
