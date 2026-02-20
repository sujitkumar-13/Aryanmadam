'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/app/providers/CartProvider';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  title: string;
  details?: string;
  description: string;
  price: number;
  oldPrice?: number;
  exclusive?: number;
  stock: number;
  images: string[];
  video?: string;
  colour: string[];
  insideBox: string[];
  rating: number;
  reviews: number;
  badge?: string;
  sku: string;
  category: string;
  stone?: string;
  status: string;
}

export default function ProductsPage() {
  // const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  // const [categories, setCategories] = useState<string[]>(['All']);

  const { addToCart, increaseQty, decreaseQty, items: cartItems } = useCart();
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        
        // if (selectedCategory !== 'All') {
        //   params.append('category', selectedCategory);
        // }
        
        if (query) {
          params.append('search', query);
        }

        console.log('🔍 Fetching with params:', params.toString());

        const res = await fetch(`/api/products?${params.toString()}`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await res.json();
        console.log('📦 Products received:', data);
        
        setProducts(data);

        // Extract unique categories from products
        // const uniqueCategories = ['All', ...new Set(data.map((p: Product) => p.category))];
        // setCategories(uniqueCategories as string[]);
      } catch (error) {
        console.error('❌ Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]); // removed selectedCategory dependency

  const cartItemById = (id: string) =>
    cartItems.find((item) => item.id === id);

  return (
    <section className="relative min-h-screen px-6 py-24 font-serif bg-[#fdfaf6] text-[rgb(44_95_124)]">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[rgb(44_95_124)]">
            Shop All Products
          </h1>

          {query && (
            <p className="mt-4 text-lg text-gray-600">
              Showing results for{' '}
              <span className="text-[rgb(44_95_124)] font-semibold">
                "{query}"
              </span>
            </p>
          )}
        </div>

        {/* REMOVED SIDEBAR - Categories Filter Commented Out */}
        {/* 
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <aside className="bg-white border border-gray-200 text-[rgb(44_95_124)] p-6 rounded-2xl space-y-8 shadow-sm h-fit">
            <div>
              <h3 className="text-lg font-bold mb-4 text-[rgb(44_95_124)]">
                Categories
              </h3>

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'bg-[rgb(44_95_124)] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        */}

          {/* PRODUCTS - Full Width Now */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-[#e6cfa7] border-r-transparent"></div>
                <p className="mt-4 text-gray-600 font-medium">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-gray-600">No products found 😕</p>
                <p className="text-sm text-gray-500 mt-2">Try adjusting your search</p>
              </div>
            ) : (
              products.map((p) => {
                const cartItem = cartItemById(p.id);

                return (
                  <div
                    key={p.id}
                    className="bg-white border border-gray-200 text-[rgb(44_95_124)] p-5 rounded-2xl flex flex-col group shadow-sm hover:shadow-lg hover:border-gray-300 transition-all"
                  >
                    {/* Product Link */}
                    <Link href={`/product/${p.id}`} className="block">
                      {/* Image Container */}
                      <div className="relative h-48 w-full mb-4 rounded-xl overflow-hidden bg-gray-50">
                        {p.images && p.images.length > 0 ? (
                          <Image
                            src={p.images[0]}
                            alt={p.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            priority={false}
                            onError={(e) => {
                              console.error('Image failed to load:', p.images[0]);
                              (e.target as HTMLImageElement).src = '/placeholder.jpg';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <span className="text-gray-400 text-sm">No Image</span>
                          </div>
                        )}
                        
                        {/* Badge */}
                        {p.badge && (
                          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                            {p.badge}
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-[rgb(44_95_124)] group-hover:text-[#E76F51] transition min-h-[2.5rem] leading-tight">
                        {p.title}
                      </h3>
                    </Link>

                    {/* Details */}
                    {p.details && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {p.details}
                      </p>
                    )}

                    {/* Rating */}
                    <div className="mt-2 flex items-center gap-1">
                      <div className="flex text-amber-500 text-sm">
                        {'★'.repeat(Math.floor(p.rating))}
                        {'☆'.repeat(5 - Math.floor(p.rating))}
                      </div>
                      <span className="text-xs text-gray-500">
                        ({p.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mt-3 flex items-center gap-2 mb-3">
                      <span className="font-bold text-xl text-[rgb(44_95_124)]">
                        ₹{p.price.toLocaleString()}
                      </span>
                      {p.oldPrice && (
                        <>
                          <span className="text-sm text-gray-400 line-through">
                            ₹{p.oldPrice.toLocaleString()}
                          </span>
                          <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-md">
                            {Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}% OFF
                          </span>
                        </>
                      )}
                    </div>

                    {/* Stock Info */}
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

                    {/* Cart Actions */}
                    {!cartItem ? (
                      <button
                        onClick={() =>
                          addToCart({
                            id: p.id,
                            title: p.title,
                            price: p.price,
                            image: p.images[0] || '/placeholder.jpg',
                            quantity: 1,
                          })
                        }
                        className="mt-auto bg-[rgb(44_95_124)] text-white py-3 rounded-xl hover:bg-[rgb(34_85_114)] transition-all font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm"
                        disabled={p.stock === 0}
                      >
                        {p.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                    ) : (
                      <div className="mt-auto flex justify-between items-center border-2 border-gray-300 rounded-xl px-4 py-3 bg-gray-50">
                        <button
                          onClick={() => decreaseQty(cartItem.id)}
                          className="text-xl font-bold text-[rgb(44_95_124)] w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-lg transition"
                        >
                          −
                        </button>
                        <span className="font-bold text-[rgb(44_95_124)]">{cartItem.quantity}</span>
                        <button
                          onClick={() => increaseQty(cartItem.id)}
                          className="text-xl font-bold text-[rgb(44_95_124)] w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={cartItem.quantity >= p.stock}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        {/* </div> */}
      </div>
    </section>
  );
}