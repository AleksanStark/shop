"use client";
import { ChangeEvent, useContext, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import { IoCartOutline } from "react-icons/io5";
import scss from "./Header.module.scss";
import { Flex, Input } from "@chakra-ui/react";
import { IoSearchSharp } from "react-icons/io5";
import Stripe from "stripe";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";

const Header = () => {
  const cartContext = useContext(CartContext);
  const router = useRouter();
  const { cartItems, handleOpenModal, products } = cartContext!;
  const [query, setQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Stripe.Product[]>(
    []
  );

  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    const result = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(result);
  };

  return (
    <header className={scss.header}>
      <div className={scss.header_content}>
        <Flex justifyContent={"center"} alignItems={"center"}>
          <IoSearchSharp />
          <Input
            onChange={handleChangeQuery}
            variant={"outline"}
            width={"50%"}
          />
          <div>
            {query &&
              filteredProducts.map((item) => (
                <div key={item.id}>{item.name}</div>
              ))}
          </div>
        </Flex>

        {isMobile ? (
          <div
            onClick={() => router.push("/cart")}
            className={scss.header_content_cart}
          >
            <IoCartOutline size={36} />
            <span className={scss.content_cart_counter}>
              {cartItems.length}
            </span>
          </div>
        ) : (
          <div onClick={handleOpenModal} className={scss.header_content_cart}>
            <IoCartOutline size={36} />
            <span className={scss.content_cart_counter}>
              {cartItems.length}
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
