import { ReactNode } from "react";
import Stripe from "stripe";

export interface cartItem {
  product: Stripe.Product;
  price: Stripe.Price;
  quantity: number;
}

export interface CartContextType {
  cartItems: cartItem[];
  prices: Stripe.Price[];
  products: Stripe.Product[];
  isOpen: boolean;
  totalPrice: number;
  addToCart: (
    product: Stripe.Product,
    price: Stripe.Price,
    value: number
  ) => void;
  removeFromCart: (itemId: string) => void;
  handleChangePrices: (items: Stripe.Price[]) => void;
  handleChangeProducts: (items: Stripe.Product[]) => void;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleIncrementQuanity: (
    product: Stripe.Product,

    quantity: number
  ) => void;
  handleDecrementQuanity: (product: Stripe.Product, quantity: number) => void;
}

export interface SessionContextType {
  sessionId: string;
  handleChangeSessionId: (sessionId: string) => void;
}

export interface CheckoutContextType {
  checkoutUrl: string;
  handleChangeCheckoutUrl: (checkout_url: string) => void;
}

export interface ContextProviderProps {
  children: ReactNode;
}
