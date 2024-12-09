"use client";
import { useMediaQuery } from "react-responsive";
import CartSideBarMobile from "../CartSideBarMobile/CartSideBarMobile";

const CartSideBar = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  return <>{isMobile && <CartSideBarMobile />}</>;
};

export default CartSideBar;
