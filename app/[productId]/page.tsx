"use client";
import { useEffect, useState } from "react";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);
const Page = ({ params }: { params: { productId: string } }) => {
  useEffect(() => {
    const fetchProduct = async () => {
      const product = await stripe.products.retrieve(params.productId);
      setProduct(product);
      return product;
    };
    fetchProduct();
  }, [params.productId]);

  const [product, setProduct] = useState<Stripe.Product | undefined>(undefined);
  if (product) {
    return <div>{product.name}</div>;
  }
};

export default Page;
