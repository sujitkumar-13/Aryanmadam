'use client';

import { X, Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/providers/CartProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: Props) {
  const { items, totalPrice, increaseQty, decreaseQty, removeItem } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  /* LOCK BODY SCROLL WHEN CART OPEN */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50"
        />
      )}

      {/* DRAWER */}
      <div
        className={`
          fixed top-0 right-0 z-50 h-screen w-full sm:w-[440px]
          bg-white shadow-2xl
          transform transition-transform duration-300
          flex flex-col
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b">
          <div className="flex items-center gap-2 text-lg sm:text-xl font-extrabold text-gray-900">
            <ShoppingCart size={20} className="sm:w-[22px] sm:h-[22px]" />
            Shopping Cart
            <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
              {items.length}
            </span>
          </div>

          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-600 hover:text-black" />
          </button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 sm:space-y-5">
          {items.length === 0 ? (
            <p className="text-sm text-gray-500">Your cart is empty</p>
          ) : (
            items.map(item => (
              <div
                key={item.id}
                className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-50"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                    {item.title}
                  </h4>

                  <p className="text-base sm:text-lg font-bold text-[#1f4f67] mt-0.5">
                    ₹{item.price}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-7 h-7 sm:w-8 sm:h-8 border text-black rounded-md flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="w-6 text-center text-black font-medium text-sm sm:text-base">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="w-7 h-7 sm:w-8 sm:h-8 border rounded-md text-black flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus size={14} />
                    </button>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* SUMMARY */}
        <div className="border-t px-4 sm:px-6 py-4 space-y-3">
          <div className="flex justify-between text-sm sm:text-base text-gray-600">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="flex justify-between text-sm sm:text-base text-gray-600">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">FREE</span>
          </div>

          <div className="flex justify-between text-lg sm:text-xl font-bold pt-2">
            <span className="text-black">Total</span>
            <span className="text-black">₹{totalPrice}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-4 bg-[#E76F51] text-white py-2.5 sm:py-3 rounded-xl
                       text-base sm:text-lg font-semibold hover:bg-[#D55A3A] transition"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={onClose}
            className="w-full border-2 border-[#1f4f67] text-[#1f4f67]
                       py-2.5 sm:py-3 rounded-xl text-base sm:text-lg font-semibold hover:bg-gray-50 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}