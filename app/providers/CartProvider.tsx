"use client"; // 👈👈👈 THIS IS NON-NEGOTIABLE

import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "@/lib/cartReducer";
import { CartItem } from "@/types/cart";

type CartContextType = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  removeItem: (id: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (s, i) => s + i.price * i.quantity,
    0
  );

  const addToCart = (item: CartItem) =>
    dispatch({ type: "ADD_TO_CART", payload: item });

  const increaseQty = (id: string) =>
    dispatch({ type: "INCREASE_QTY", payload: id });

  const decreaseQty = (id: string) =>
    dispatch({ type: "DECREASE_QTY", payload: id });

  const removeItem = (id: string) =>
    dispatch({ type: "REMOVE_ITEM", payload: id });

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        totalPrice,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
