'use client';

import React from 'react';
import { useCart } from '@/app/providers/CartProvider';
import { ShoppingBag, Trash2 } from 'lucide-react';

export default function CheckoutPage() {
  const { items: cartItems, increaseQty, decreaseQty, removeItem } = useCart();

  const subtotal = cartItems.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  const orderOnWhatsApp = () => {
    if (cartItems.length === 0) return;

    const productText = cartItems
      .map((p) => `• ${p.title} × ${p.quantity} = ₹${p.price * p.quantity}`)
      .join('\n');

    const message = `
🛒 *New Order Request*

${productText}

💰 Subtotal: ₹${subtotal}
🚚 Shipping: ₹${shipping}
━━━━━━━━━━━━━━━
📦 *Total: ₹${total}*

Please confirm my order and share delivery details.
    `.trim();

    const whatsappNumber = '919140257673'; // ✅ Updated number
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#f8f4ed] to-white px-4 sm:px-6 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[rgb(44_95_124)] mb-2 sm:mb-3">
            Your Cart
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Review your items and complete order via WhatsApp
          </p>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart
          <div className="text-center py-12 sm:py-20">
            <ShoppingBag className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-300 mb-4 sm:mb-6" />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
              Your cart is empty
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">
              Add some beautiful products to get started
            </p>
            <a
              href="/shop"
              className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-[rgb(44_95_124)] text-white rounded-full
              hover:bg-[rgb(34_75_104)] transition font-medium text-sm sm:text-base"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            
            {/* Cart Items */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
              {cartItems.map((item, idx) => (
                <div
                  key={item.id}
                  className={`flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 ${
                    idx !== cartItems.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  {/* Image */}
                  <div className="w-full sm:w-24 h-32 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[rgb(44_95_124)] font-bold text-lg sm:text-xl">
                        ₹{item.price}
                      </p>
                    </div>

                    {/* Quantity Controls & Remove Button */}
                    <div className="flex items-center justify-between sm:justify-start gap-4 mt-3">
                      <div className="flex items-center gap-2 sm:gap-3 border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2">
                        <button
                          onClick={() => decreaseQty(String(item.id))}
                          className="text-gray-600 hover:text-[rgb(44_95_124)] font-bold text-lg sm:text-xl w-6 h-6 flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="font-semibold text-gray-900 w-6 sm:w-8 text-center text-sm sm:text-base">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(String(item.id))}
                          className="text-gray-600 hover:text-[rgb(44_95_124)] font-bold text-lg sm:text-xl w-6 h-6 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(String(item.id))}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

                      {/* Item Total - Mobile */}
                      <div className="sm:hidden ml-auto">
                        <p className="font-bold text-gray-900 text-lg">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Item Total - Desktop */}
                  <div className="hidden sm:block text-right">
                    <p className="text-gray-500 text-sm mb-1">Subtotal</p>
                    <p className="font-bold text-gray-900 text-xl">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm sm:text-base text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">₹{shipping}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <button
                onClick={orderOnWhatsApp}
                className="w-full py-3 sm:py-4 bg-[#25D366] text-white rounded-full font-semibold text-base sm:text-lg
                hover:bg-[#20ba5a] transition shadow-lg hover:shadow-xl
                flex items-center justify-center gap-2 sm:gap-3"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Order on WhatsApp
              </button>

              <p className="text-center text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4">
                Click to send your order via WhatsApp
              </p>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}