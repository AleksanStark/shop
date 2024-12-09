"use client";

import { CheckoutContextType, ContextProviderProps } from "@/types/types";
import { createContext, useState } from "react";

export const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export function CheckoutProvider({ children }: ContextProviderProps) {
  const [checkoutUrl, setCheckoutUrl] = useState<string>("");

  const handleChangeCheckoutUrl = (checkout_url: string) => {
    setCheckoutUrl(checkout_url);
  };

  return (
    <CheckoutContext.Provider value={{ checkoutUrl, handleChangeCheckoutUrl }}>
      {children}
    </CheckoutContext.Provider>
  );
}
