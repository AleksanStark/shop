import Stripe from "stripe";

export const getProductPrice = (productId: string, prices: Stripe.Price[]) => {
  const price = prices.find((p) => p.product === productId);
  return Intl.NumberFormat("ru-RU").format((price?.unit_amount || 0) / 100);
};
