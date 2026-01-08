import { useState, useEffect } from "react";
import type { CartItem, Product } from "../types";

const CART_KEY = "my_cart";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  function addToCart(product: Product, quantity = 1) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  }

  function removeFromCart(productId: number) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  function updateQuantity(productId: number, quantity: number) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }

  function getItemSubtotal(item: CartItem) {
    return item.price * item.quantity;
  }

  function getTotal() {
    return cart.reduce((total, item) => total + getItemSubtotal(item), 0);
  }

  function clearCart() {
    setCart([]);
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getItemSubtotal,
    getTotal,
    clearCart,
  };
}