"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/app/providers/CartProvider";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number | null;
  images: string[];
  rating: number;
  stock: number;
  category: string;
}

export default function CreativeCategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart, increaseQty, decreaseQty, items } = useCart();

  const cartItemById = (id: string) =>
    items.find((item) => item.id === id);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!slug) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/creative?category=${slug}`);
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  return (
    <>
      <Navbar />

      <section className="min-h-screen px-6 py-24 bg-[#fdfaf6]">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[rgb(44_95_124)] capitalize">
              {slug?.toString().replace(/-/g, " ")}
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Handpicked creative & handcrafted items
            </p>
          </div>

          {/* CONTENT */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-[#e6cfa7] border-r-transparent"></div>
              <p className="mt-4 text-gray-600 font-medium">
                Loading products...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="text-red-600 text-lg font-medium">{error}</div>
              <p className="text-gray-500 mt-2">Please try again later</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-600 text-xl font-medium">
                No products available yet
              </div>
              <p className="text-gray-500 mt-2">
                New items coming soon ✨
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => {
                const cartItem = cartItemById(p.id);

                return (
                  <div
                    key={p.id}
                    className="bg-white border border-gray-200 text-[rgb(44_95_124)] p-5 rounded-2xl flex flex-col shadow-sm hover:shadow-lg hover:border-gray-300 transition-all"
                  >
                    {/* IMAGE */}
                    <Link href={`/product/${p.id}`} className="block">
                      <div className="relative h-48 w-full mb-4 rounded-xl overflow-hidden bg-gray-50">
                        {p.images?.length > 0 ? (
                          <Image
                            src={p.images[0]}
                            alt={p.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 hover:scale-110"
                          />
                        ) : (
                          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                            No Image
                          </div>
                        )}

                        {p.stock === 0 && (
                          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </Link>

                    {/* TITLE */}
                    <Link href={`/product/${p.id}`}>
                      <h3 className="font-bold min-h-[2.5rem] line-clamp-2 hover:text-[#e6cfa7] transition-colors">
                        {p.title}
                      </h3>
                    </Link>

                    {/* RATING */}
                    <div className="mt-2 flex items-center gap-1">
                      <div className="text-amber-500 text-sm">
                        {"★".repeat(Math.floor(p.rating))}
                        {"☆".repeat(5 - Math.floor(p.rating))}
                      </div>
                      <span className="text-xs text-gray-500">
                        ({p.rating.toFixed(1)})
                      </span>
                    </div>

                    {/* PRICE */}
                    <div className="mt-3 flex items-center gap-2 mb-3">
                      <span className="font-bold text-xl">
                        ₹{p.price.toLocaleString()}
                      </span>
                      {p.oldPrice && (
                        <>
                          <span className="text-sm line-through text-gray-400">
                            ₹{p.oldPrice.toLocaleString()}
                          </span>
                          <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-md">
                            {Math.round(
                              ((p.oldPrice - p.price) / p.oldPrice) * 100
                            )}
                            % OFF
                          </span>
                        </>
                      )}
                    </div>

                    {/* STOCK */}
                    <div className="text-xs mb-4">
                      {p.stock > 0 ? (
                        <span className="text-green-600 font-medium">
                          In Stock ({p.stock})
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {/* CART */}
                    {!cartItem ? (
                      <button
                        onClick={() =>
                          addToCart({
                            id: p.id,
                            title: p.title,
                            price: p.price,
                            image: p.images[0] || "/placeholder.jpg",
                            quantity: 1,
                          })
                        }
                        disabled={p.stock === 0}
                        className="mt-auto bg-[rgb(44_95_124)] text-white py-3 rounded-xl font-semibold hover:bg-[#1a120a] disabled:bg-gray-300"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="mt-auto flex justify-between items-center border rounded-xl px-4 py-3 bg-gray-50">
                        <button
                          onClick={() => decreaseQty(cartItem.id)}
                          className="text-xl font-bold"
                        >
                          −
                        </button>
                        <span className="font-bold">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(cartItem.id)}
                          disabled={cartItem.quantity >= p.stock}
                          className="text-xl font-bold disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}