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
    {
      label: "Coir Products",
      slug: "creativeAndHandcrafted/coir-products",
      submenu: [
        { label: "Dry Flowers", slug: "creativeAndHandcrafted/coir-products/dry-flowers" },
      ],
    },
  ];

  const crystalsCategories = [
    { label: "Natural Crystals", slug: "crystalsAndSpiritual/natural-crystals" },
    { label: "Crystal Frames", slug: "crystalsAndSpiritual/crystal-frames" },
    { label: "Crystal Birds", slug: "crystalsAndSpiritual/crystal-birds" },
    { label: "Crystal Trees", slug: "crystalsAndSpiritual/crystal-trees" },
    { label: "Crystal Angles", slug: "crystalsAndSpiritual/crystal-angles" },
    { label: "Crystal Balls", slug: "crystalsAndSpiritual/crystal-balls" },
    { label: "Crystal Rings", slug: "crystalsAndSpiritual/crystal-rings" },
    {
      label: "Anklets",
      slug: "crystalsAndSpiritual/anklets",
      submenu: [
        { label: "Crystal Clocks", slug: "crystalsAndSpiritual/anklets/crystal-clocks" },
        { label: "Crystal Pyramid", slug: "crystalsAndSpiritual/anklets/crystal-pyramid" },
        { label: "Crystal Pencils", slug: "crystalsAndSpiritual/anklets/crystal-pencils" },
        { label: "Crystal Box", slug: "crystalsAndSpiritual/anklets/crystal-box" },
        { label: "Crystal Idols", slug: "crystalsAndSpiritual/anklets/crystal-idols" },
        { label: "Pyrite Dust Frames", slug: "crystalsAndSpiritual/anklets/pyrite-dust-frames" },
        {
          label: "Crystal Seven Chakra Healing Frames",
          slug: "crystalsAndSpiritual/anklets/seven-chakra-frames",
        },
        { label: "Crystal Strings", slug: "crystalsAndSpiritual/anklets/crystal-strings" },
        { label: "Crystal Animals", slug: "crystalsAndSpiritual/anklets/crystal-animals" },
      ],
    },
    { label: "Yantras", slug: "crystalsAndSpiritual/yantras" },
    { label: "Thakur Ji Dresses", slug: "crystalsAndSpiritual/thakur-ji-dresses" },
    { label: "Rudraksh", slug: "crystalsAndSpiritual/rudraksh" },
    { label: "Pooja Items", slug: "crystalsAndSpiritual/pooja-items" },
    {
      label: "Sage",
      slug: "crystalsAndSpiritual/sage",
      submenu: [{ label: "God Idols", slug: "crystalsAndSpiritual/sage/god-idols" }],
    },
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

            {/* Creative - HOVER with container */}
            <div 
              className="relative"
              onMouseEnter={() => setDesktopCreativeOpen(true)}
            
            >
              <button className="flex items-center gap-1">
                Creative & Handcrafted <ChevronDown size={16} />
              </button>

              {desktopCreativeOpen && (
                <div className="absolute top-full mt-3 left-0 bg-white border rounded shadow-xl min-w-[260px] z-50"   onMouseLeave={() => setDesktopCreativeOpen(false)}>
                  {creativeCategories.map((cat) => (
                    <div key={cat.slug} className="group relative">
                      <Link
                        href={`/${cat.slug}`}
                        className="flex justify-between px-4 py-2 hover:bg-[#e6cfa7]/20"
                      >
                        {cat.label}
                        {cat.submenu && <ChevronRight size={14} />}
                      </Link>

                      {cat.submenu && (
                        <div className="hidden group-hover:block absolute left-full top-0 ml-1 bg-white border rounded shadow-xl min-w-[220px] z-50">
                          {cat.submenu.map((sub) => (
                            <Link
                              key={sub.slug}
                              href={`/${sub.slug}`}
                              className="block px-4 py-2 text-sm hover:bg-[#e6cfa7]/20"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Crystals - HOVER with container */}
            <div 
              className="relative"
              onMouseEnter={() => setDesktopCrystalsOpen(true)}
            >
              <button className="flex items-center gap-1">
                Crystals & Spiritual <ChevronDown size={16} />
              </button>

              {desktopCrystalsOpen && (
                <div className="absolute top-full mt-3 left-0 bg-white border rounded shadow-xl min-w-[320px] z-50" 
              onMouseLeave={() => setDesktopCrystalsOpen(false)}
                
                >
                  {crystalsCategories.map((cat) => (
                    <div key={cat.slug} className="group relative">
                      <Link
                        href={`/${cat.slug}`}
                        className="flex justify-between px-4 py-2 hover:bg-[#e6cfa7]/20"
                      >
                        {cat.label}
                        {cat.submenu && <ChevronRight size={14} />}
                      </Link>

                      {cat.submenu && (
                        <div className="hidden group-hover:block absolute left-full top-0 ml-1 bg-white border rounded shadow-xl min-w-[280px] max-h-[400px] overflow-y-auto z-50" 
                        
                        >
                          {cat.submenu.map((sub) => (
                            <Link
                              key={sub.slug}
                              href={`/${sub.slug}`}
                              className="block px-4 py-2 text-sm hover:bg-[#e6cfa7]/20"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Remedies - HOVER with container */}
            <div 
              className="relative"
              onMouseEnter={() => setDesktopRemediesOpen(true)}
            >
              <button className="flex items-center gap-1">
                Remedies <ChevronDown size={16} />
              </button>

              {desktopRemediesOpen && (
                <div className="absolute top-full mt-3 left-0 bg-white border rounded shadow-xl min-w-[220px] max-h-[500px] overflow-y-auto z-50"
              onMouseLeave={() => setDesktopRemediesOpen(false)}
                
                >
                  {remediesCategories.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/${item.slug}`}
                      className="block px-4 py-2 hover:bg-[#e6cfa7]/20"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/experts">Contact as</Link>
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
           <Link href="/about">About</Link>
              
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
                    className={`transition-transform ${
                      mobileCreativeOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileCreativeOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {creativeCategories.map((cat) => (
                      <div key={cat.slug}>
                        {cat.submenu ? (
                          <>
                            <button
                              onClick={() => setMobileCoirOpen((p) => !p)}
                              className="w-full flex items-center justify-between py-1 text-sm text-black"
                            >
                              <span>{cat.label}</span>
                              <ChevronDown
                                size={14}
                                className={`transition-transform ${
                                  mobileCoirOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {mobileCoirOpen && (
                              <div className="ml-4 mt-1 space-y-1">
                                {cat.submenu.map((sub) => (
                                  <Link
                                    key={sub.slug}
                                    href={`/${sub.slug}`}
                                    className="block py-1 text-xs text-black hover:text-[#e6cfa7]"
                                    onClick={() => setMenuOpen(false)}
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <Link
                            href={`/${cat.slug}`}
                            className="block py-1 text-sm text-black hover:text-[#e6cfa7]"
                            onClick={() => setMenuOpen(false)}
                          >
                            {cat.label}
                          </Link>
                        )}
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
                    className={`transition-transform ${
                      mobileCrystalsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileCrystalsOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {crystalsCategories.map((cat) => (
                      <div key={cat.slug}>
                        {cat.submenu ? (
                          <>
                            <button
                              onClick={() => {
                                if (cat.label === "Anklets") setMobileAnkletsOpen((p) => !p);
                                if (cat.label === "Sage") setMobileSageOpen((p) => !p);
                              }}
                              className="w-full flex items-center justify-between py-1 text-sm text-black"
                            >
                              <span>{cat.label}</span>
                              <ChevronDown
                                size={14}
                                className={`transition-transform ${
                                  (cat.label === "Anklets" && mobileAnkletsOpen) ||
                                  (cat.label === "Sage" && mobileSageOpen)
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </button>
                            {((cat.label === "Anklets" && mobileAnkletsOpen) ||
                              (cat.label === "Sage" && mobileSageOpen)) && (
                              <div className="ml-4 mt-1 space-y-1">
                                {cat.submenu.map((sub) => (
                                  <Link
                                    key={sub.slug}
                                    href={`/${sub.slug}`}
                                    className="block py-1 text-xs text-black hover:text-[#e6cfa7]"
                                    onClick={() => setMenuOpen(false)}
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <Link
                            href={`/${cat.slug}`}
                            className="block py-1 text-sm text-black hover:text-[#e6cfa7]"
                            onClick={() => setMenuOpen(false)}
                          >
                            {cat.label}
                          </Link>
                        )}
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
                    className={`transition-transform ${
                      mobileRemediesOpen ? "rotate-180" : ""
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
                href="/about"
                className="block py-2 text-black hover:text-[#e6cfa7]"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/experts"
                className="block py-2 text-black hover:text-[#e6cfa7]"
                onClick={() => setMenuOpen(false)}
              >
                Contact as
              </Link>
            </div>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}