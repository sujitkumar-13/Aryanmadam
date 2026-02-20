// app/product/[id]/page.tsx

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

export default function ProductPage() {
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
        const res = await fetch(`/api/products/${id}`);
        
        if (!res.ok) {
          throw new Error('Product not found');
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Fetch related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product) return;

      try {
        const res = await fetch(`/api/products?category=${product.category}`);
        
        if (res.ok) {
          const data = await res.json();
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
      setQuantity(1);
    }
  };

  const handleWhatsAppOrder = () => {
    if (product) {
      const productUrl = `${window.location.origin}/product/${product.id}`;
      const qty = cartItem?.quantity || quantity;
      const message = `Hello,%0A%0AI want to order the *${product.title}*%0A%0AProduct Link: ${productUrl}%0APrice: ₹${product.price}%0AQuantity: ${qty}`;
      const whatsappUrl = `https://wa.me/919140257673?text=${message}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#fdfaf6]">
          <div className="text-center text-[rgb(44_95_124)]">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#e6cfa7] border-r-transparent mb-4"></div>
            <p className="text-lg sm:text-xl">Loading product...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#fdfaf6] px-4">
          <div className="text-center text-[rgb(44_95_124)]">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Product not found</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
            <a href="/" className="px-6 py-3 bg-[#e6cfa7] text-[rgb(44_95_124)] rounded-lg inline-block hover:bg-[#d4bd95] transition">
              Go Home
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="relative px-4 sm:px-6 py-8 sm:py-12 bg-[#fdfaf6] min-h-screen">
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">

            {/* LEFT - Product Images */}
            <div className="bg-white border border-gray-200 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm">
              {product.images && product.images.length > 0 ? (
                <>
                  <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                    <img
                      src={product.images[selectedImage]}
                      className="w-full max-h-[300px] sm:max-h-[400px] object-contain"
                      alt={product.title}
                    />
                  </div>

                  <div className="flex gap-2 sm:gap-3 justify-center overflow-x-auto pb-2">
                    {product.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        onClick={() => setSelectedImage(i)}
                        className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border-2 cursor-pointer hover:border-[#e6cfa7] transition flex-shrink-0 ${
                          selectedImage === i ? 'border-[#e6cfa7]' : 'border-gray-200'
                        }`}
                        alt={`${product.title} - view ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="w-full h-[300px] sm:h-[400px] flex items-center justify-center bg-gray-100 rounded-xl">
                  <span className="text-gray-400 text-sm">No Image Available</span>
                </div>
              )}
            </div>

            {/* RIGHT - Product Details */}
            <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-sm">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-[rgb(44_95_124)]">
                {product.title}
              </h1>

              {product.details && (
                <p className="text-sm sm:text-base text-gray-600 mb-3">{product.details}</p>
              )}

              {/* Rating */}
              <div className="mb-4 flex items-center gap-2">
                <div className="flex text-amber-500 text-sm sm:text-base">
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </div>
                <span className="text-xs sm:text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <span className="text-2xl sm:text-3xl font-bold text-[rgb(44_95_124)]">
                  ₹{product.price}
                </span>
                {product.oldPrice && (
                  <span className="line-through ml-2 sm:ml-3 text-lg sm:text-xl text-gray-400">
                    ₹{product.oldPrice}
                  </span>
                )}
                {product.exclusive && (
                  <span className="ml-2 sm:ml-3 text-xs sm:text-sm bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full">
                    Exclusive: ₹{product.exclusive}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    <span className="text-xs sm:text-sm font-medium">In Stock ({product.stock} available)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    <span className="text-xs sm:text-sm font-medium">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="mb-6 text-sm sm:text-base text-gray-700 leading-relaxed">
                {product.description}
              </p>

              {/* Color Variants */}
              {product.colour && product.colour.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-semibold mb-3 text-[rgb(44_95_124)]">Available Colors:</p>
                  <div className="flex gap-2 flex-wrap">
                    {product.colour.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-300 hover:border-[#e6cfa7] transition cursor-pointer"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Cart Section */}
              {!cartItem ? (
                <div className="space-y-3 mb-6">
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">Quantity:</span>
                    <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 sm:px-4 py-2 hover:bg-gray-100 transition font-semibold text-gray-700 text-sm sm:text-base"
                        disabled={product.stock === 0}
                      >
                        −
                      </button>
                      <span className="px-4 sm:px-6 py-2 border-x-2 border-gray-200 font-medium min-w-[50px] sm:min-w-[60px] text-center text-black text-sm sm:text-base">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="px-3 sm:px-4 py-2 hover:bg-gray-100 transition font-semibold text-gray-700 text-sm sm:text-base"
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
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-[rgb(44_95_124)] text-white font-semibold rounded-xl 
                               hover:bg-[rgb(34_85_114)] transition-all flex items-center justify-center gap-2
                               disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm sm:text-base"
                  >
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    {product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
                  </button>

                  {/* Order on WhatsApp Button */}
                  <button 
                    onClick={handleWhatsAppOrder}
                    disabled={product.stock === 0}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-[#25D366] text-white font-semibold rounded-xl 
                               hover:bg-[#20BA5A] transition-all flex items-center justify-center gap-2
                               disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm sm:text-base"
                  >
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    ORDER ON WHATSAPP
                  </button>
                </div>
              ) : (
                <div className="mb-6 space-y-3">
                  {/* Cart Item Controls */}
                  <div className="flex items-center justify-between border-2 border-gray-200 rounded-xl px-4 sm:px-6 py-3 sm:py-4 bg-gray-50">
                    <button 
                      onClick={() => decreaseQty(cartItem.id)}
                      className="text-lg sm:text-xl font-bold text-gray-700 hover:text-[rgb(44_95_124)] transition"
                    >
                      −
                    </button>
                    <span className="text-base sm:text-lg font-semibold text-black">{cartItem.quantity} in cart</span>
                    <button 
                      onClick={() => increaseQty(cartItem.id)}
                      disabled={cartItem.quantity >= product.stock}
                      className="text-lg sm:text-xl font-bold text-gray-700 hover:text-[rgb(44_95_124)] transition disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="text-center text-xs sm:text-sm text-green-600 font-medium py-2">
                    ✓ Added to cart
                  </div>

                  {/* Order on WhatsApp Button */}
                  <button 
                    onClick={handleWhatsAppOrder}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-[#25D366] text-white font-semibold rounded-xl 
                               hover:bg-[#20BA5A] transition-all flex items-center justify-center gap-2 shadow-sm text-sm sm:text-base"
                  >
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    ORDER ON WHATSAPP
                  </button>
                </div>
              )}

              {/* Badge */}
              {product.badge && (
                <div className="mb-6">
                  <span className="inline-block bg-[#e6cfa7] text-[rgb(44_95_124)] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Product Meta */}
              <div className="text-xs sm:text-sm text-gray-600 space-y-2 border-t border-gray-200 pt-6">
                <p>
                  <span className="font-semibold text-[rgb(44_95_124)]">SKU:</span> {product.sku}
                </p>
                <p>
                  <span className="font-semibold text-[rgb(44_95_124)]">Category:</span> {product.category}
                </p>
                {product.stone && (
                  <p>
                    <span className="font-semibold text-[rgb(44_95_124)]">Material:</span> {product.stone}
                  </p>
                )}
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-3 sm:p-4 bg-green-50 rounded-xl border border-green-200">
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  ✓ Free shipping on orders above ₹500
                  <br />
                  ✓ Cash on Delivery available
                  <br />
                  ✓ Easy returns within 7 days
                </p>
              </div>
            </div>

          </div>

          {/* Additional Product Info */}
          <div className="mt-8 sm:mt-10 bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-sm">
            <details open className="p-4 sm:p-6">
              <summary className="cursor-pointer text-[rgb(44_95_124)] font-bold text-base sm:text-lg">
                PRODUCT DETAILS
              </summary>

              <div className="mt-4 text-gray-700 text-xs sm:text-sm space-y-3">
                <p>{product.description}</p>
                
                {product.insideBox && product.insideBox.length > 0 && (
                  <div className="mt-4">
                    <p className="font-semibold text-[rgb(44_95_124)] mb-2">What's in the Box:</p>
                    <ul className="list-disc ml-6 space-y-1">
                      {product.insideBox.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <ul className="list-disc ml-6 mt-3 space-y-1">
                  <li>High quality materials</li>
                  <li>Handcrafted with care</li>
                  <li>Perfect for DIY projects</li>
                  <li>Eco-friendly and sustainable</li>
                </ul>
              </div>
            </details>

            {product.video && (
              <details className="p-4 sm:p-6 border-t border-gray-200">
                <summary className="cursor-pointer text-[rgb(44_95_124)] font-bold text-base sm:text-lg">
                  PRODUCT VIDEO
                </summary>
                <div className="mt-4">
                  <video
                    src={product.video}
                    controls
                    className="w-full max-w-2xl rounded-xl"
                  />
                </div>
              </details>
            )}
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-10 sm:mt-14">
              <h2 className="text-xl sm:text-2xl font-bold text-[rgb(44_95_124)] mb-4 sm:mb-6">
                You May Also Like
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
                {relatedProducts.map(relatedProduct => (
                  <a
                    key={relatedProduct.id}
                    href={`/product/${relatedProduct.id}`}
                    className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-[#e6cfa7] hover:shadow-md transition group"
                  >
                    <div className="h-32 sm:h-40 bg-gray-50 rounded-lg mb-2 sm:mb-3 overflow-hidden">
                      {relatedProduct.images && relatedProduct.images.length > 0 ? (
                        <img
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2 font-medium line-clamp-2">
                      {relatedProduct.title}
                    </p>
                    <p className="text-sm sm:text-base text-[rgb(44_95_124)] font-bold">
                      ₹{relatedProduct.price}
                    </p>
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