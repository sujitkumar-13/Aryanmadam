// app/remedy-product/[id]/page.tsx

'use client';

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/app/providers/CartProvider";
import { useParams, useRouter } from "next/navigation";
import { ShoppingCart, MessageCircle } from "lucide-react";

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

export default function RemedyProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  const { addToCart, increaseQty, decreaseQty, items: cartItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/remedies/${id}`);
        
        if (!res.ok) {
          throw new Error('Product not found');
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching remedy product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Fetch related products (same category, different product)
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product) return;

      try {
        const res = await fetch(`/api/remedies?category=${product.category}`);
        
        if (res.ok) {
          const data = await res.json();
          // Filter out current product and take first 4
          const related = data
            .filter((p: Product) => p.id !== product.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    fetchRelatedProducts();
  }, [product]);

  const cartItem = cartItems.find(item => item.id === id);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images[0] || '/placeholder.jpg',
          quantity: 1,
        });
      }
      setQuantity(1); // Reset quantity after adding
    }
  };

  const handleWhatsAppOrder = () => {
    if (product) {
      // Get current website URL dynamically
      const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const productUrl = `${currentUrl}/remedies/product/${product.id}`;
      
      const message = `Hello,%0A%0AI want to order the *${product.title}*%0A%0AProduct Link: ${productUrl}%0APrice: ₹${product.price}%0AQuantity: ${cartItem?.quantity || quantity}`;
      const whatsappUrl = `https://wa.me/919140257673?text=${message}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#fdfaf6]">
          <div className="text-center text-[rgb(44_95_124)]">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#e6cfa7] border-r-transparent mb-4"></div>
            <p className="text-xl">Loading product...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Product not found
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#fdfaf6]">
          <div className="text-center text-[rgb(44_95_124)]">
            <h1 className="text-3xl font-bold mb-4">Product not found</h1>
            <p className="text-gray-600 mb-6">The remedy product you're looking for doesn't exist.</p>
            <a href="/" className="px-6 py-3 bg-[#e6cfa7] text-[rgb(44_95_124)] rounded-lg inline-block hover:bg-[#d4bd95] transition">
              Go Home
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <>
      <Navbar />

      <section className="relative px-6 py-12 bg-[#fdfaf6] min-h-screen">
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* LEFT - Product Images */}
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
              {product.images && product.images.length > 0 ? (
                <>
                  <div className="bg-gray-50 rounded-xl p-4 mb-6 relative">
                    <img
                      src={product.images[selectedImage]}
                      className="w-full max-h-[400px] object-contain"
                      alt={product.title}
                    />
                    
                    {/* Stock Badge */}
                    {product.stock === 0 && (
                      <span className="absolute top-6 right-6 bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-md">
                        Out of Stock
                      </span>
                    )}

                    {/* Discount Badge */}
                    {discount > 0 && (
                      <span className="absolute top-6 left-6 bg-green-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-md">
                        {discount}% OFF
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3 justify-center flex-wrap">
                    {product.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        onClick={() => setSelectedImage(i)}
                        className={`w-20 h-20 object-cover rounded-lg border-2 cursor-pointer hover:border-[#e6cfa7] transition ${
                          selectedImage === i ? 'border-[#e6cfa7]' : 'border-gray-200'
                        }`}
                        alt={`${product.title} - view ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-xl">
                  <span className="text-gray-400">No Image Available</span>
                </div>
              )}
            </div>

            {/* RIGHT - Product Details */}
            <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
              <h1 className="text-3xl font-bold mb-4 text-[rgb(44_95_124)]">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="mb-4 flex items-center gap-2">
                <div className="flex text-amber-500 text-lg">
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {product.rating.toFixed(1)} Rating
                </span>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-4xl font-bold text-[rgb(44_95_124)]">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.oldPrice && (
                    <>
                      <span className="line-through text-xl text-gray-400">
                        ₹{product.oldPrice.toLocaleString()}
                      </span>
                      <span className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-md text-sm">
                        Save ₹{(product.oldPrice - product.price).toLocaleString()} ({discount}% OFF)
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <span className="w-2.5 h-2.5 bg-green-600 rounded-full"></span>
                    <span className="text-sm font-semibold">In Stock ({product.stock} available)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <span className="w-2.5 h-2.5 bg-red-600 rounded-full"></span>
                    <span className="text-sm font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-gray-700 leading-relaxed text-sm">
                  {product.description}
                </p>
              </div>

              {/* Category */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 bg-[#e6cfa7] text-[rgb(44_95_124)] px-4 py-2 rounded-lg text-sm font-semibold">
                  <span className="w-2 h-2 bg-[rgb(44_95_124)] rounded-full"></span>
                  {product.category.replace(/-/g, ' ').toUpperCase()}
                </span>
              </div>

              {/* Cart Section */}
              {!cartItem ? (
                <div className="space-y-3 mb-6">
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-black">Quantity:</span>
                    <div className="flex border-2 border-gray-300 rounded-xl overflow-hidden bg-white">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-5 py-3 hover:bg-gray-100 transition font-bold text-black text-lg"
                        disabled={product.stock === 0}
                      >
                        −
                      </button>
                      <span className="px-8 py-3 border-x-2 border-gray-300 font-bold min-w-[80px] text-center text-lg text-black">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="px-5 py-3 hover:bg-gray-100 transition font-bold text-black text-lg"
                        disabled={product.stock === 0}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button 
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="w-full px-6 py-4 bg-[rgb(44_95_124)] text-white font-bold rounded-xl text-lg
                               hover:bg-[rgb(34_85_114)] transition-all flex items-center justify-center gap-3
                               disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    {product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
                  </button>

                  {/* Order on WhatsApp Button */}
                  <button 
                    onClick={handleWhatsAppOrder}
                    disabled={product.stock === 0}
                    className="w-full px-6 py-4 bg-[#25D366] text-white font-bold rounded-xl text-lg
                               hover:bg-[#20BA5A] transition-all flex items-center justify-center gap-3
                               disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    <MessageCircle className="w-6 h-6" />
                    ORDER ON WHATSAPP
                  </button>
                </div>
              ) : (
                <div className="mb-6 space-y-3">
                  {/* Cart Item Controls */}
                  <div className="flex items-center justify-between border-2 border-gray-300 rounded-xl px-6 py-4 bg-gray-50">
                    <button 
                      onClick={() => decreaseQty(cartItem.id)}
                      className="text-2xl font-bold text-gray-700 hover:text-[rgb(44_95_124)] transition w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-lg"
                    >
                      −
                    </button>
                    <span className="text-xl font-bold text-[rgb(44_95_124)]">{cartItem.quantity} in cart</span>
                    <button 
                      onClick={() => increaseQty(cartItem.id)}
                      disabled={cartItem.quantity >= product.stock}
                      className="text-2xl font-bold text-gray-700 hover:text-[rgb(44_95_124)] transition disabled:opacity-50 w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-lg"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="text-center text-sm text-green-600 font-semibold py-2 bg-green-50 rounded-lg">
                    ✓ Added to cart successfully
                  </div>

                  {/* Order on WhatsApp Button (when item in cart) */}
                  <button 
                    onClick={handleWhatsAppOrder}
                    className="w-full px-6 py-4 bg-[#25D366] text-white font-bold rounded-xl text-lg
                               hover:bg-[#20BA5A] transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
                  >
                    <MessageCircle className="w-6 h-6" />
                    ORDER ON WHATSAPP
                  </button>
                </div>
              )}

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                <p className="text-sm text-gray-700 leading-relaxed space-y-1">
                  <span className="block">✓ Free shipping on orders above ₹500</span>
                  <span className="block">✓ Cash on Delivery available</span>
                  <span className="block">✓ Easy returns within 7 days</span>
                  <span className="block">✓ 100% Authentic spiritual products</span>
                </p>
              </div>
            </div>

          </div>

          {/* Product Description Section */}
          <div className="mt-10 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <details open className="p-6">
              <summary className="cursor-pointer text-[rgb(44_95_124)] font-bold text-xl flex items-center gap-2">
                <span className="text-2xl">📋</span>
                PRODUCT DETAILS
              </summary>

              <div className="mt-6 text-gray-700 text-base space-y-4">
                <p className="leading-relaxed">{product.description}</p>
                
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <p className="font-semibold text-[rgb(44_95_124)] mb-2">✨ Benefits:</p>
                  <ul className="list-disc ml-6 space-y-1.5 text-sm">
                    <li>Carefully selected for spiritual healing</li>
                    <li>High quality and authentic materials</li>
                    <li>Energetically cleansed before dispatch</li>
                    <li>Perfect for personal use or gifting</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="font-semibold text-[rgb(44_95_124)] mb-2">🔮 How to Use:</p>
                  <ul className="list-disc ml-6 space-y-1.5 text-sm">
                    <li>Cleanse with intention before first use</li>
                    <li>Keep in sacred space or carry with you</li>
                    <li>Meditate with the product for best results</li>
                    <li>Follow any specific instructions provided</li>
                  </ul>
                </div>
              </div>
            </details>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-14">
              <h2 className="text-3xl font-bold text-[rgb(44_95_124)] mb-8 text-center">
                You May Also Like
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map(relatedProduct => (
                  <a
                    key={relatedProduct.id}
                    href={`/remedies/product/${relatedProduct.id}`}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#e6cfa7] hover:shadow-lg transition-all group"
                  >
                    <div className="h-48 bg-gray-50 rounded-lg mb-3 overflow-hidden relative">
                      {relatedProduct.images && relatedProduct.images.length > 0 ? (
                        <img
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                      )}
                      
                      {relatedProduct.stock === 0 && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-800 mb-2 font-semibold line-clamp-2 leading-tight">
                      {relatedProduct.title}
                    </p>

                    {/* Rating */}
                    <div className="mb-2 flex items-center gap-1">
                      <div className="flex text-amber-500 text-xs">
                        {'★'.repeat(Math.floor(relatedProduct.rating))}
                        {'☆'.repeat(5 - Math.floor(relatedProduct.rating))}
                      </div>
                      <span className="text-xs text-gray-500">
                        ({relatedProduct.rating.toFixed(1)})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <p className="text-[rgb(44_95_124)] font-bold text-lg">
                        ₹{relatedProduct.price}
                      </p>
                      {relatedProduct.oldPrice && (
                        <span className="text-xs line-through text-gray-400">
                          ₹{relatedProduct.oldPrice}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}