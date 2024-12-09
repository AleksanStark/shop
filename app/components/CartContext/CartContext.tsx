"use client";
import { CartContextType, cartItem, ContextProviderProps } from "@/types/types";

import { createContext, useEffect, useState } from "react";
import Stripe from "stripe";

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const LOCAL_STORAGE_CART_ITEMS_KEY = "cart_items";

export function CartProvider({ children }: ContextProviderProps) {
  const [cartItems, setCartItems] = useState<cartItem[]>([]);
  const [prices, setPrices] = useState<Stripe.Price[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Stripe.Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const savedCartItems = localStorage.getItem(LOCAL_STORAGE_CART_ITEMS_KEY);
    const savedTotalPrice = localStorage.getItem("total_price");
    if (savedCartItems) {
      const items = JSON.parse(savedCartItems);
      setCartItems(items);
    }
    if (savedTotalPrice) {
      setTotalPrice(JSON.parse(savedTotalPrice));
    }
  }, []);
  const addToCart = (
    product: Stripe.Product,
    price: Stripe.Price,
    value: number
  ) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find(
        (item) => item.product.id === product.id
      );

      if (itemExists) {
        const updatedItems = prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + value }
            : item
        );
        localStorage.setItem(
          LOCAL_STORAGE_CART_ITEMS_KEY,
          JSON.stringify(updatedItems)
        );

        return updatedItems;
      } else {
        // Добавляем новый товар в корзину
        localStorage.setItem(
          LOCAL_STORAGE_CART_ITEMS_KEY,
          JSON.stringify([...prevItems, { product, price, quantity: value }])
        );
        return [...prevItems, { product, price, quantity: value }];
      }
    });
    return value;
  };

  const handleIncrementQuanity = (
    product: Stripe.Product,

    quantity: number
  ) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: quantity + 1 }
          : item
      );
    });
  };

  const handleDecrementQuanity = (
    product: Stripe.Product,
    quantity: number
  ) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: quantity - 1 }
          : item
      );
    });
  };

  const handleChangeProducts = (items: Stripe.Product[]) => {
    setProducts(items);
  };

  const handleChangePrices = (items: Stripe.Price[]) => {
    setPrices(items);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) => item.product.id !== itemId
      );
      localStorage.setItem(
        LOCAL_STORAGE_CART_ITEMS_KEY,
        JSON.stringify(updatedItems)
      );
      return updatedItems;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        prices,
        products,
        isOpen,
        totalPrice,
        addToCart,
        removeFromCart,
        handleChangeProducts,
        handleChangePrices,
        handleOpenModal,
        handleCloseModal,
        handleIncrementQuanity,
        handleDecrementQuanity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
