'use client';

import { FC, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const Footer: FC = () => {

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
    <footer
      className="relative font-serif text-black overflow-hidden bg-white border-t border-black/20"
    >
      {/* Main Footer */}
      <div
        data-animate="card"
        className="relative max-w-7xl mx-auto px-6 py-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

          {/* BRAND */}
          <div>
            <div className="mb-6">
              <Image
                src="/assets/logo6.png"
                alt="Arya Madam"
                width={180}
                height={60}
                className="object-contain"
              />
            </div>
            <p className="leading-relaxed mb-8 text-black">
              Professional-grade craft supplies rooted in tradition,
              precision, and timeless craftsmanship.
            </p>

            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank">
                <Facebook className="text-[#2c5f7c]" />
              </a>
              <a href="https://instagram.com" target="_blank">
                <Instagram className="text-[#2c5f7c]" />
              </a>
              <a href="https://linkedin.com" target="_blank">
                <Linkedin className="text-[#2c5f7c]" />
              </a>
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-black">
              Company
            </h3>
            <ul className="space-y-4 text-black">
              <li><Link href="/about#about">About Us</Link></li>
              <li><Link href="/career">Careers</Link></li>
              <li><Link href="/press">Press</Link></li>
              <li><Link href="/experts">Talk to Us</Link></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-black">
              Support
            </h3>
            <ul className="space-y-4 text-black">
              <li><Link href="/faqs">FAQs</Link></li>
              <li><Link href="/shippingPolicy">Shipping Policy</Link></li>
              <li><Link href="/returnsAndExchanges">Returns & Exchanges</Link></li>
              <li><Link href="/termsOfService">Terms of Service</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-black">
              Contact Info
            </h3>
            <ul className="space-y-5 text-black">
              <li className="flex gap-4">
                <MapPin className="text-[rgb(244_162_97)]" />
                Gali No: 1 Rudra Colony, Bhiwani, Haryana - 127021
              </li>
              <li className="flex gap-4">
                <Phone className="text-[rgb(244_162_97)]" />
                +91 93066 62709
              </li>
              <li className="flex gap-4">
                <Mail className="text-[rgb(244_162_97)]" />
                info@aryamadamcraft.com
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div
        data-animate="card"
        className="relative border-t border-black/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-sm sm:text-base text-black font-medium gap-4 relative">
          <p className="sm:flex-1 text-center sm:text-left">
            © 2026 Arya Madam Craft Supplies
          </p>
          <p className="text-center sm:absolute sm:left-1/2 sm:-translate-x-1/2 w-full sm:w-auto mt-2 sm:mt-0">
            All rights are reserved with aryamadamcraftsupplies
          </p>
          <div className="sm:flex-1 flex justify-center sm:justify-end mt-2 sm:mt-0">
            <Link href="/privacyPolicy" className="hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;