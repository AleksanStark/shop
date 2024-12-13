"use client";
import clsx from "clsx";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useContext } from "react";
import scss from "./CartSideBarMobile.module.scss";
import { BiDollar } from "react-icons/bi";
import { CartContext } from "../CartContext/CartContext";
import { cartTotal } from "@/app/utils/cartTotal";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { getProductPrice } from "@/app/utils/getProductPrice";
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";

const CartSideBarMobile = () => {
  const cartContext = useContext(CartContext);
  const router = useRouter();

  const {
    cartItems,
    products,
    prices,
    removeFromCart,
    handleIncrementQuanity,
    handleDecrementQuanity,
  } = cartContext!;

  const fetchClientSession = async () => {
    try {
      const line_items = cartItems.map((item) => ({
        price: item.price.id,
        quantity: item.quantity,
      }));
      const response = await axios.post(
        "https://shop-backend-1-2h0q.onrender.com/checkout",
        {
          line_items: line_items,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={scss.overlay}>
      <div className={scss.content_top}>
        <button onClick={() => router.push("/")} className={scss.close_modal}>
          <RxCross2 size={36} color="white" />
        </button>
        <div className={scss.content_top_box}>
          <h2 className={scss.content_top_title}>Корзина</h2>

          <div className={scss.content_top_total_price_box}>
            <span className={scss.content_top_total_price}>
              {Intl.NumberFormat("ru-RU").format(
                cartTotal(cartItems, products, prices)
              )}
            </span>
            <BiDollar size={"2.4rem"} color="#bb50df" />
          </div>
        </div>
        <h4 className={scss.content_top_subtitle}>
          {`${cartItems.length} товаров`}
        </h4>
        <div className={scss.content_top_btn_box}>
          <button
            onClick={async () => {
              try {
                const stripe = await loadStripe(
                  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
                );
                const data = await fetchClientSession(); // Ждём завершения fetchClientSession
                if (data) {
                  stripe?.redirectToCheckout({
                    sessionId: data.sessionId,
                  });
                } else {
                  console.error(
                    "Ошибка: данные для оформления заказа не получены."
                  );
                }
              } catch (error) {
                console.error("Произошла ошибка:", error);
              }
            }}
            className={clsx(scss.btn_box, scss.checkout)}
          >
            оформить заказ
          </button>
        </div>
      </div>
      <div className={scss.content_bottom}>
        <ul className={scss.content_bottom_list}>
          {cartItems.map((item) => (
            <li className={scss.content_bottom_item} key={item.product.id}>
              <button
                className={scss.content_bottom_item_close_btn}
                onClick={() => removeFromCart(item.product.id)}
              >
                <RxCross2 size={16} />
              </button>
              <div className={scss.content_bottom_item_wrapper}>
                <div className={scss.content_bottom_item_box}>
                  <Image
                    className={scss.content_bottom_item_box_img}
                    width={0}
                    height={0}
                    sizes="100vh"
                    src={item.product.images[0]}
                    alt="product"
                  />
                </div>
                <div className={scss.content_bottom_item_wrapper_info}>
                  <div className={scss.content_bottom_item_price_box}>
                    <h2 className={scss.content_bottom_item_price}>
                      {getProductPrice(item.product.id, prices)}
                    </h2>

                    <BiDollar size={"1.6rem"} color="#bb50df" />
                  </div>
                  <div className={scss.content_bottom_item_description_box}>
                    <p className={scss.content_bottom_item_description}>
                      {item.product.name}
                    </p>
                  </div>
                </div>
              </div>
              <div className={scss.content_bottom_list_quantity_wrapper}>
                <div className={scss.content_bottom_list_quantity_box}>
                  <button
                    onClick={() =>
                      handleDecrementQuanity(item.product, item.quantity)
                    }
                    disabled={item.quantity === 0}
                    className={clsx(
                      scss.content_bottom_list_quantity_box_button,
                      scss.quantity_box_button_minus
                    )}
                  >
                    <FiMinus size={24} />
                  </button>
                  {item.quantity === Number(item.product.metadata.quantity) ? (
                    <span>{`осталось  ${item.product.metadata.quantity}`}</span>
                  ) : item.quantity === 0 ? (
                    <span>{`осталось  ${item.product.metadata.quantity}`}</span>
                  ) : (
                    item.quantity
                  )}
                  <button
                    disabled={
                      item.quantity === Number(item.product.metadata.quantity)
                    }
                    onClick={() =>
                      handleIncrementQuanity(item.product, item.quantity)
                    }
                    className={clsx(
                      scss.content_bottom_list_quantity_box_button,
                      scss.quantity_box_button_plus
                    )}
                  >
                    <FiPlus size={24} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CartSideBarMobile;
