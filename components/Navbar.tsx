"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/app/providers/CartProvider";
import CartDrawer from "@/components/CartDrawer";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [desktopCreativeOpen, setDesktopCreativeOpen] = useState(false);
  const [desktopCrystalsOpen, setDesktopCrystalsOpen] = useState(false);
  const [desktopRemediesOpen, setDesktopRemediesOpen] = useState(false);

  // Mobile submenu states
  const [mobileCreativeOpen, setMobileCreativeOpen] = useState(false);
  const [mobileCrystalsOpen, setMobileCrystalsOpen] = useState(false);
  const [mobileRemediesOpen, setMobileRemediesOpen] = useState(false);

  // Mobile nested submenu states
  const [mobileCoirOpen, setMobileCoirOpen] = useState(false);
  const [mobileAnkletsOpen, setMobileAnkletsOpen] = useState(false);
  const [mobileSageOpen, setMobileSageOpen] = useState(false);

  const [query, setQuery] = useState("");

  const { items } = useCart();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  const pathname = usePathname();
  const router = useRouter();

  /* ---------------- NAV HANDLER ---------------- */
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: string
  ) => {
    if (item === "Home") {
      e.preventDefault();
      pathname === "/"
        ? window.scrollTo({ top: 0, behavior: "smooth" })
        : router.push("/");
    }
  };

  /* ---------------- SEARCH LOGIC ---------------- */
  const performSearch = () => {
    if (!query.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(query)}`);
    setSearchOpen(false);
  };

  const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") performSearch();
  };

  const handleSearchClick = () => {
    if (searchOpen && query.trim()) {
      performSearch();
    } else {
      setSearchOpen((p) => !p);
    }
  };

  /* ---------------- DATA ---------------- */

  const creativeCategories = [
    { label: "Art & Craft", slug: "creativeAndHandcrafted/art-craft" },
    { label: "Handmade Occasion-Special Items", slug: "creativeAndHandcrafted/handmade-special" },
    { label: "Jutt Item", slug: "creativeAndHandcrafted/jutt-item" },
    { label: "Coir Products", slug: "creativeAndHandcrafted/coir-products" },
    { label: "Dry Flowers", slug: "creativeAndHandcrafted/dry-flowers" },
  ];

  const crystalsCategories = [
    { label: "Natural Crystals", slug: "crystalsAndSpiritual/natural-crystals" },
    { label: "Crystal Frames", slug: "crystalsAndSpiritual/crystal-frames" },
    { label: "Crystal Birds", slug: "crystalsAndSpiritual/crystal-birds" },
    { label: "Crystal Trees", slug: "crystalsAndSpiritual/crystal-trees" },
    { label: "Crystal Angles", slug: "crystalsAndSpiritual/crystal-angles" },
    { label: "Crystal Balls", slug: "crystalsAndSpiritual/crystal-balls" },
    { label: "Crystal Rings", slug: "crystalsAndSpiritual/crystal-rings" },
    { label: "Anklets", slug: "crystalsAndSpiritual/anklets" },
    { label: "Crystal Clocks", slug: "crystalsAndSpiritual/crystal-clocks" },
    { label: "Crystal Pyramid", slug: "crystalsAndSpiritual/crystal-pyramid" },
    { label: "Crystal Pencils", slug: "crystalsAndSpiritual/crystal-pencils" },
    { label: "Crystal Box", slug: "crystalsAndSpiritual/crystal-box" },
    { label: "Crystal Idols", slug: "crystalsAndSpiritual/crystal-idols" },
    { label: "Pyrite Dust Frames", slug: "crystalsAndSpiritual/pyrite-dust-frames" },
    { label: "Crystal Seven Chakra Healing Frames", slug: "crystalsAndSpiritual/seven-chakra-frames" },
    { label: "Crystal Strings", slug: "crystalsAndSpiritual/crystal-strings" },
    { label: "Crystal Animals", slug: "crystalsAndSpiritual/crystal-animals" },
    { label: "Yantras", slug: "crystalsAndSpiritual/yantras" },
    { label: "Thakur Ji Dresses", slug: "crystalsAndSpiritual/thakur-ji-dresses" },
    { label: "Rudraksh", slug: "crystalsAndSpiritual/rudraksh" },
    { label: "Pooja Items", slug: "crystalsAndSpiritual/pooja-items" },
    { label: "Sage", slug: "crystalsAndSpiritual/sage" },
    { label: "God Idols", slug: "crystalsAndSpiritual/god-idols" }

  ];

  const remediesCategories = [
    { label: "All Remedies", slug: "remedies" },
    { label: "Wealth", slug: "remedies/wealth" },
    { label: "Health", slug: "remedies/health" },
    { label: "Relationship", slug: "remedies/relationship" },
    { label: "Protection", slug: "remedies/protection" },
    { label: "Self-Confidence", slug: "remedies/self-confidence" },
    { label: "Education", slug: "remedies/education" },
    { label: "Crown Chakra", slug: "remedies/crown-chakra" },
    { label: "Third Eye Chakra", slug: "remedies/third-eye-chakra" },
    { label: "Throat Chakra", slug: "remedies/throat-chakra" },
    { label: "Heart Chakra", slug: "remedies/heart-chakra" },
    { label: "Solar Plexus Chakra", slug: "remedies/solar-plexus-chakra" },
    { label: "Sacral Chakra", slug: "remedies/sacral-chakra" },
    { label: "Root Chakra", slug: "remedies/root-chakra" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b isolate">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          {/* LOGO */}
          <Link href="/">
            <Image src="/assets/logo6.png" alt="Logo" width={150} height={40} />
          </Link>

          {/* ---------------- DESKTOP NAV ---------------- */}
          <div className="hidden lg:flex items-center gap-5 text-black">
            <Link
              href="/"
              onClick={(e) => handleNavClick(e, "Home")}
            >
              Home
            </Link>
            <Link href="/about">About</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/collections">Collections</Link>

            {/* Creative - Meesho Style Mega Menu */}
            <div
              className="relative group"
              onMouseEnter={() => setDesktopCreativeOpen(true)}
              onMouseLeave={() => setDesktopCreativeOpen(false)}
            >
              <button className="flex items-center gap-1 py-5 hover:text-[#e6cfa7] transition-colors font-medium">
                Creative & Handcrafted <ChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>

              {desktopCreativeOpen && (
                <div className="fixed left-0 right-0 top-[81px] bg-white border-b shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid grid-cols-4 gap-12">
                      {/* Column 1: Arts & Crafts */}
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100">Creative Arts</h3>
                        <div className="space-y-3">
                          {creativeCategories.filter(c =>
                            ["Art & Craft", "Jutt Item"].includes(c.label)
                          ).map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/${cat.slug}`}
                              className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all"
                            >
                              {cat.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 2: Special Items */}
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100">Special Collections</h3>
                        <div className="space-y-3">
                          {creativeCategories.filter(c =>
                            ["Handmade Occasion-Special Items"].includes(c.label)
                          ).map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/${cat.slug}`}
                              className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all"
                            >
                              {cat.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 3: Eco Fibers */}
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100">Eco & Fibers</h3>
                        <div className="space-y-3">
                          {creativeCategories.filter(c =>
                            ["Coir Products", "Dry Flowers"].includes(c.label)
                          ).map((cat) => (
                            <div key={cat.slug}>
                              <Link
                                href={`/${cat.slug}`}
                                className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all"
                              >
                                {cat.label}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Column 4: Handicraft Promo */}
                      <div className="flex flex-col gap-4">
                        <div className="bg-[#f1f8fc] p-6 rounded-2xl relative overflow-hidden group/promo">
                          <div className="relative z-10">
                            <h4 className="font-bold text-gray-900 mb-2">Artisan Crafts</h4>
                            <p className="text-xs text-gray-600 mb-4 leading-relaxed">Unique handcrafted pieces made with love and precision.</p>
                            <Link href="/shop" className="inline-block bg-black text-white px-5 py-2 text-xs font-semibold rounded-full hover:bg-gray-800 transition-colors">
                              View Gallery
                            </Link>
                          </div>
                          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover/promo:scale-110 transition-transform">
                            <ShoppingCart size={120} />
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Crystals - Meesho Style Mega Menu */}
            <div
              className="relative group"
              onMouseEnter={() => setDesktopCrystalsOpen(true)}
              onMouseLeave={() => setDesktopCrystalsOpen(false)}
            >
              <button className="flex items-center gap-1 py-5 hover:text-[#e6cfa7] transition-colors font-medium">
                Crystals & Spiritual <ChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>

              {desktopCrystalsOpen && (
                <div className="fixed left-0 right-0 top-[81px] bg-white border-b shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid grid-cols-4 gap-12">
                      {/* Column 1: Core Crystals */}
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100">Crystals & Frames</h3>
                        <div className="space-y-3">
                          {crystalsCategories.filter(c =>
                            ["Natural Crystals", "Crystal Frames", "Crystal Birds", "Crystal Trees", "Crystal Angles", "Crystal Balls", "Crystal Rings", "Anklets"].includes(c.label)
                          ).map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/${cat.slug}`}
                              className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all"
                            >
                              {cat.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 2: Decorative & Specialty Crystals */}
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100">Crystal Collection</h3>
                        <div className="space-y-3">
                          {crystalsCategories.filter(c =>
                            ["Crystal Clocks", "Crystal Pyramid", "Crystal Pencils", "Crystal Box", "Crystal Idols", "Pyrite Dust Frames", "Crystal Seven Chakra Healing Frames", "Crystal Strings", "Crystal Animals"].includes(c.label)
                          ).map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/${cat.slug}`}
                              className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all"
                            >
                              {cat.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 3: Spiritual & Pooja */}
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100">Spiritual & Pooja</h3>
                        <div className="space-y-3">
                          {crystalsCategories.filter(c =>
                            ["Yantras", "Thakur Ji Dresses", "Rudraksh", "Pooja Items", "Sage", "God Idols"].includes(c.label)
                          ).map((cat) => (
                            <div key={cat.slug}>
                              <Link
                                href={`/${cat.slug}`}
                                className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all"
                              >
                                {cat.label}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Column 4: Promo Space */}
                      <div className="flex flex-col gap-4">
                        <div className="bg-[#fcf8f1] p-6 rounded-2xl relative overflow-hidden group/promo">
                          <div className="relative z-10">
                            <h4 className="font-bold text-gray-900 mb-2">Crystal Healing</h4>
                            <p className="text-xs text-gray-600 mb-4 leading-relaxed">Discover the power of natural crystals for your wellness.</p>
                            <Link href="/shop" className="inline-block bg-black text-white px-5 py-2 text-xs font-semibold rounded-full hover:bg-gray-800 transition-colors">
                              Explore Now
                            </Link>
                          </div>
                          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover/promo:scale-110 transition-transform">
                            <Search size={120} />
                          </div>
                        </div>
                        <div className="border border-gray-100 p-6 rounded-2xl">
                          <h4 className="font-bold text-sm text-gray-900 mb-1">Expert Pick</h4>
                          <p className="text-xs text-gray-500">Hand-selected spiritual items of the month.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Remedies - Meesho Style Mega Menu */}
            <div
              className="relative group"
              onMouseEnter={() => setDesktopRemediesOpen(true)}
              onMouseLeave={() => setDesktopRemediesOpen(false)}
            >
              <button className="flex items-center gap-1 py-5 hover:text-[#e6cfa7] transition-colors font-medium">
                Remedies <ChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>

              {desktopRemediesOpen && (
                <div className="fixed left-0 right-0 top-[81px] bg-white border-b shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid grid-cols-4 gap-12">
                      {/* Column 1: Physical Well-being */}
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100">Health & Wellness</h3>
                        <div className="space-y-3">
                          {remediesCategories.slice(0, 5).map((item) => (
                            <Link
                              key={item.slug}
                              href={`/${item.slug}`}
                              className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 2: Emotional Well-being */}
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100">Success & Growth</h3>
                        <div className="space-y-3">
                          {remediesCategories.slice(5, 8).map((item) => (
                            <Link
                              key={item.slug}
                              href={`/${item.slug}`}
                              className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 3: Chakra Balancing */}
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100">Chakra Alignment</h3>
                        <div className="space-y-3">
                          {remediesCategories.slice(8).map((item) => (
                            <Link
                              key={item.slug}
                              href={`/${item.slug}`}
                              className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 4: CTA */}
                      <div className="border-l border-gray-100 pl-12">
                        <div className="bg-[#fff9f1] p-8 rounded-3xl text-center">
                          <div className="w-16 h-16 bg-[#e6cfa7]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShoppingCart className="text-[#e6cfa7]" size={24} />
                          </div>
                          <h4 className="font-bold text-gray-900 mb-2">Need a Consultation?</h4>
                          <p className="text-xs text-gray-600 mb-6 leading-relaxed">Our specialists can guide you to the perfect remedy.</p>
                          <Link href="/experts" className="text-sm font-bold text-[#e6cfa7] hover:underline">
                            Request Callback
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/experts">Talk to Us</Link>
          </div>

          {/* ---------------- RIGHT ICONS ---------------- */}
          <div className="flex items-center gap-4 relative">
            <Search
              className="w-6 h-6 text-black cursor-pointer"
              onClick={handleSearchClick}
            />

            {searchOpen && (
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearchKey}
                placeholder="Search products..."
                className="absolute top-10 right-0 w-64 px-3 py-2 rounded border 
                bg-white shadow 
                text-black placeholder:text-gray-500 caret-black"
                autoFocus
              />
            )}

            <button onClick={() => setCartOpen(true)} className="relative">
              <ShoppingCart className="w-6 h-6 text-black" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#e6cfa7] h-5 w-5 rounded-full text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              className="lg:hidden text-black"
              onClick={() => setMenuOpen((p) => !p)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {/* ---------------- MOBILE MENU ---------------- */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-4 space-y-3">
              <Link
                href="/"
                className="block py-2 text-black hover:text-[#e6cfa7]"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block py-2 text-black hover:text-[#e6cfa7]"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>

              <Link
                href="/shop"
                className="block py-2 text-black hover:text-[#e6cfa7]"
                onClick={() => setMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/collections"
                className="block py-2 text-black hover:text-[#e6cfa7]"
                onClick={() => setMenuOpen(false)}
              >
                Collections
              </Link>

              {/* Mobile Creative */}
              <div>
                <button
                  onClick={() => setMobileCreativeOpen((p) => !p)}
                  className="w-full flex items-center justify-between py-2 text-black"
                >
                  <span>Creative & Handcrafted</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${mobileCreativeOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {mobileCreativeOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {creativeCategories.map((cat) => (
                      <div key={cat.slug}>
                        <Link
                          href={`/${cat.slug}`}
                          className="block py-1 text-sm text-black hover:text-[#e6cfa7]"
                          onClick={() => setMenuOpen(false)}
                        >
                          {cat.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Crystals */}
              <div>
                <button
                  onClick={() => setMobileCrystalsOpen((p) => !p)}
                  className="w-full flex items-center justify-between py-2 text-black"
                >
                  <span>Crystals & Spiritual</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${mobileCrystalsOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {mobileCrystalsOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {crystalsCategories.map((cat) => (
                      <div key={cat.slug}>
                        <Link
                          href={`/${cat.slug}`}
                          className="block py-1 text-sm text-black hover:text-[#e6cfa7]"
                          onClick={() => setMenuOpen(false)}
                        >
                          {cat.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Remedies */}
              <div>
                <button
                  onClick={() => setMobileRemediesOpen((p) => !p)}
                  className="w-full flex items-center justify-between py-2 text-black"
                >
                  <span>Remedies</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${mobileRemediesOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {mobileRemediesOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {remediesCategories.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/${item.slug}`}
                        className="block py-1 text-sm text-black hover:text-[#e6cfa7]"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>



              <Link
                href="/experts"
                className="block py-2 text-black hover:text-[#e6cfa7]"
                onClick={() => setMenuOpen(false)}
              >
                Talk to Us
              </Link>
            </div>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}