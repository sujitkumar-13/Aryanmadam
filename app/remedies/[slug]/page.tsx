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

export default function RemedyProductsPage() {
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
        const res = await fetch(`/api/remedies?category=${slug}`);
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
              Carefully curated spiritual products aligned with your energy
            </p>
          </div>

          {/* CONTENT */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-[#e6cfa7] border-r-transparent"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="text-red-600 text-lg font-medium">{error}</div>
              <p className="text-gray-500 mt-2">Please try again later</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-600 text-xl font-medium">No products available yet</div>
              <p className="text-gray-500 mt-2">Check back soon for new items</p>
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
                    {/* IMAGE - Clickable */}
                    <Link href={`/remedies/product/${p.id}`} className="block">
                      <div className="relative h-48 w-full mb-4 rounded-xl overflow-hidden bg-gray-50 cursor-pointer">
                        {p.images?.length > 0 ? (
                          <Image
                            src={p.images[0] || "/placeholder.jpg"}
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
                          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </Link>

                    {/* TITLE - Clickable */}
                    <Link href={`/remedies/product/${p.id}`}>
                      <h3 className="font-bold text-[rgb(44_95_124)] min-h-[2.5rem] line-clamp-2 leading-tight hover:text-[#e6cfa7] transition-colors cursor-pointer">
                        {p.title}
                      </h3>
                    </Link>

                    {/* RATING */}
                    <div className="mt-2 flex items-center gap-1">
                      <div className="flex text-amber-500 text-sm">
                        {'★'.repeat(Math.floor(p.rating))}
                        {'☆'.repeat(5 - Math.floor(p.rating))}
                      </div>
                      <span className="text-xs text-gray-500">
                        ({p.rating.toFixed(1)})
                      </span>
                    </div>

                    {/* PRICE */}
                    <div className="mt-3 flex items-center gap-2 mb-3">
                      <span className="font-bold text-xl text-[rgb(44_95_124)]">
                        ₹{p.price.toLocaleString()}
                      </span>
                      {p.oldPrice && (
                        <>
                          <span className="text-sm line-through text-gray-400">
                            ₹{p.oldPrice.toLocaleString()}
                          </span>
                          <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-md">
                            {Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}% OFF
                          </span>
                        </>
                      )}
                    </div>

                    {/* STOCK */}
                    <div className="text-xs mb-4">
                      {p.stock > 0 ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                          <span className="font-medium">In Stock ({p.stock})</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-600">
                          <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                          <span className="font-semibold">Out of Stock</span>
                        </div>
                      )}
                    </div>

                    {/* CART ACTIONS */}
                    {!cartItem ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart({
                            id: p.id,
                            title: p.title,
                            price: p.price,
                            image: p.images[0] || "/placeholder.jpg",
                            quantity: 1,
                          });
                        }}
                        disabled={p.stock === 0}
                        className="mt-auto bg-[rgb(44_95_124)] text-white py-3 rounded-xl hover:bg-[#1a120a] transition-all font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm"
                      >
                        {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
                      </button>
                    ) : (
                      <div className="mt-auto flex justify-between items-center border-2 border-gray-300 rounded-xl px-4 py-3 bg-gray-50">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            decreaseQty(cartItem.id);
                          }}
                          className="text-xl font-bold text-[rgb(44_95_124)] w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-lg transition"
                        >
                          −
                        </button>
                        <span className="font-bold text-[rgb(44_95_124)]">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            increaseQty(cartItem.id);
                          }}
                          disabled={cartItem.quantity >= p.stock}
                          className="text-xl font-bold text-[rgb(44_95_124)] w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-lg transition disabled:opacity-50"
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