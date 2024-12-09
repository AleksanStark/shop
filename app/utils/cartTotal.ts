import { cartItem } from "@/types/types";
import Stripe from "stripe";

export const cartTotal = (
  cartItems: cartItem[],
  products: Stripe.Product[],
  prices: Stripe.Price[]
) => {
  return cartItems.reduce((total, cartItem) => {
    const product = products.find((p) => p.id === cartItem.product.id);
    const price = prices.find((p) => p.id === product?.default_price);
    if (price?.unit_amount) {
      return total + (price?.unit_amount * cartItem.quantity || 0) / 100;
    }

    return total;
  }, 0);
};
