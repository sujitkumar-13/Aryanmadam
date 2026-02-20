'use client';

import React, { useState } from 'react';
import { useCart } from '@/app/providers/CartProvider';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
};

const productsData: Product[] = [
  {
    id: 1,
    name: 'Rainbow Glass Bead Set',
    price: 299,
    image: '/assets/rainbowBead.jpeg',
    category: 'Beads',
  },
  {
    id: 2,
    name: 'Embroidery Thread Collection',
    price: 399,
    image: '/assets/embroideryThread.jpeg',
    category: 'Thread',
  },
  {
    id: 3,
    name: 'Wooden Bead Assortment',
    price: 249,
    image: '/assets/woodenBeads.jpeg',
    category: 'Beads',
  },
  {
    id: 4,
    name: 'DIY Jewelry Making Kit',
    price: 599,
    image: '/assets/DIYJewelry.jpeg',
    category: 'Premium Gift Hampers',
  },
  {
    id: 5,
    name: 'Metallic Charm Collection',
    price: 349,
    image: '/assets/metallicCharm.jpeg',
    category: 'Beads',
  },
  {
    id: 6,
    name: 'Silk Thread Bundle',
    price: 449,
    image: '/assets/silkThread.jpeg',
    category: 'Thread',
  },
  {
    id: 7,
    name: 'Crystal Bead Mix',
    price: 499,
    image: '/assets/crystalBead.jpeg',
    category: 'Crystal Combo Set',
  },
  {
    id: 8,
    name: 'Craft Tool Essentials',
    price: 399,
    image: '/assets/craftTool.jpeg',
    category: 'Tools',
  },
  {
    id: 9,
    name: 'Pearl Bead Collection',
    price: 549,
    image: '/assets/pearlBead.jpeg',
    category: 'Crystal Combo Set',
  },
  {
    id: 10,
    name: 'Luxury Craft Gift Box',
    price: 699,
    image: '/assets/giftHamper.jpeg',
    category: 'Premium Gift Hampers',
  },
];

export default function ProductsPage() {
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Beads',
    'Thread',
    'DIY Kits',
    'Tools',
    'Crystal Combo Set',
    'Premium Gift Hampers',
    'Gifts Under Rs.699',
  ];

  const { addToCart, increaseQty, decreaseQty, items: cartItems } = useCart();
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const filteredProducts = productsData.filter((p) => {
    const matchPrice = p.price <= maxPrice;
    const matchSearch = p.name.toLowerCase().includes(query);

    const matchCategory =
      selectedCategory === 'All' ||
      p.category === selectedCategory ||
      (selectedCategory === 'Gifts Under Rs.699' && p.price <= 699);

    return matchPrice && matchSearch && matchCategory;
  });

  const cartItemById = (id: number) =>
    cartItems.find((item) => item.id === String(id));

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen px-6 py-24 font-serif bg-[rgb(44_95_124)] text-white">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Shop All Products
          </h1>

          {query && (
            <p className="mt-4 text-lg">
              Showing results for{' '}
              <span className="text-[#e6cfa7] font-semibold">
                {query}
              </span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* SIDEBAR */}
          <motion.aside
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white text-[rgb(44_95_124)] p-6 rounded-2xl space-y-10"
          >
            {/* CATEGORY */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Categories
              </h3>

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                      selectedCategory === cat
                        ? 'bg-[#e6cfa7]'
                        : 'bg-[#f5f1ea] hover:bg-[#e6cfa7]/40'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* PRICE */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Price Range
              </h3>

              <div className="flex justify-between text-sm mb-2">
                <span>₹0</span>
                <span>₹{maxPrice}</span>
              </div>

              <input
                type="range"
                min="0"
                max="1000"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Number(e.target.value))
                }
                className="w-full accent-[#e6cfa7]"
              />
            </div>
          </motion.aside>

          {/* PRODUCTS */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {filteredProducts.length === 0 && (
              <p className="col-span-full text-center">
                No products found 😕
              </p>
            )}

            {filteredProducts.map((p) => {
              const cartItem = cartItemById(p.id);

              return (
                <motion.div
                  key={p.id}
                  variants={itemVariants}
                  className="bg-white text-[rgb(44_95_124)] p-6 rounded-2xl flex flex-col"
                >
                  {/* Product Link - Image aur Name pe click karke details page khulega */}
                  <Link href={`/product/${p.id}`}>
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-48 w-full object-cover rounded-xl mb-4 cursor-pointer hover:opacity-90 transition"
                    />

                    <h3 className="font-semibold cursor-pointer hover:text-[#E76F51] transition">
                      {p.name}
                    </h3>
                  </Link>

                  <p className="font-bold mb-4">
                    ₹{p.price}
                  </p>

                  {!cartItem ? (
                    <button
                      onClick={() =>
                        addToCart({
                          id: String(p.id),
                          title: p.name,
                          price: p.price,
                          image: p.image,
                          quantity: 1,
                        })
                      }
                      className="mt-auto bg-[#E76F51] text-white py-2 rounded-lg hover:bg-[#D55A3A]"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="mt-auto flex justify-between items-center border rounded-lg px-4 py-2">
                      <button
                        onClick={() =>
                          decreaseQty(String(p.id))
                        }
                      >
                        -
                      </button>
                      <span>{cartItem.quantity}</span>
                      <button
                        onClick={() =>
                          increaseQty(String(p.id))
                        }
                      >
                        +
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}