"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useCart } from "@/app/providers/CartProvider";

interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  images: string[];
  rating: number;
  reviews: number;
  badge?: string;
}

export default function BestSellers() {
  const { addToCart, increaseQty, decreaseQty, items: cartItems } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products?bestSeller=true");
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        // ✅ Ensure data is always an array
        const productsArray = Array.isArray(data) ? data : [];
        setProducts(productsArray);
        
        console.log(`✅ Loaded ${productsArray.length} best sellers`);
        
      } catch (error) {
        console.error("❌ Failed to fetch products:", error);
        setProducts([]); // ✅ Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 Animation observer
  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate="card"]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.target.classList.toggle("visible", entry.isIntersecting)
        );
      },
      { threshold: 0.3 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [products]);

  const getCartItem = (id: string) =>
    cartItems.find((item) => item.id === id);

  if (loading) {
    return (
      <section className="py-24 text-center">
        <p className="text-lg">Loading best sellers...</p>
      </section>
    );
  }

  // ✅ Show message if no products
  if (products.length === 0) {
    return (
      <section className="py-24 text-center">
        <h2 className="text-3xl font-bold text-[rgb(44_95_124)] mb-4">
          Best Sellers
        </h2>
        <p className="text-gray-600">No best sellers available at the moment.</p>
      </section>
    );
  }

  return (
    <section className="px-8 py-24 font-serif bg-white">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-14">
          <h2 className="text-5xl font-bold text-[rgb(44_95_124)]">
            Best Sellers
          </h2>
          <p className="mt-3 text-black">
            Premium products trusted by professionals
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            const cartItem = getCartItem(product.id);

            return (
              <div
                key={product.id}
                data-animate="card"
                className="relative rounded-xl bg-white p-5
                           border border-black/10
                           shadow-[0_16px_40px_rgba(0,0,0,0.08)]
                           transition hover:-translate-y-1"
              >
                {/* Wishlist */}
                <button className="absolute right-4 top-4 rounded-full bg-white p-2 shadow">
                  <Heart className="h-4 w-4 text-[#8a6a44]" />
                </button>

                {/* Badge */}
                {product.badge && (
                  <span className="absolute left-4 top-4 rounded
                                   bg-[#e6cfa7] px-3 py-1
                                   text-xs font-semibold">
                    {product.badge}
                  </span>
                )}

                <Link href={`/product/${product.id}`}>
                  <div className="relative h-44 mb-4 rounded-lg overflow-hidden bg-[#f5f1ea]">
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={product.images[0]}
                        alt="product-img"
                        fill
                        className="object-cover hover:scale-105 transition"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-sm font-semibold">
                    {product.name}
                  </h3>
                </Link>

                <div className="mt-2 text-xs text-[#8a6a44]">
                  ★ {product.rating} ({product.reviews})
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-2xl font-bold text-[rgb(44_95_124)]">
                    ₹{product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="line-through text-gray-400">
                      ₹{product.oldPrice}
                    </span>
                  )}
                </div>

                {!cartItem ? (
                  <button
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        title: product.name,
                        price: product.price,
                        image: product.images?.[0] || '/placeholder.jpg',
                        quantity: 1,
                      })
                    }
                    className="mt-5 w-full rounded-lg bg-[#E76F51]
                               py-2.5 text-white font-semibold
                               hover:bg-[#D55A3A]"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="mt-5 flex justify-between items-center border rounded-lg px-4 py-2 bg-gray-50">
                    <button 
                      onClick={() => decreaseQty(cartItem.id)}
                      className="text-black font-bold text-xl hover:text-[#E76F51]"
                    >
                      -
                    </button>
                    <span className="text-black font-semibold">{cartItem.quantity}</span>
                    <button 
                      onClick={() => increaseQty(cartItem.id)}
                      className="text-black font-bold text-xl hover:text-[#E76F51]"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}