"use client";
import { useContext, useEffect } from "react";
import Stripe from "stripe";
import { CartContext } from "./components/CartContext/CartContext";
import scss from "./page.module.scss";
import { BiDollar } from "react-icons/bi";
import clsx from "clsx";
import { useRouter } from "next/navigation";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

const Home = () => {
  const cartContext = useContext(CartContext);
  const router = useRouter();

  const {
    prices,
    products,
    cartItems,
    addToCart,
    handleChangeProducts,
    handleChangePrices,
  } = cartContext!;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await stripe.products.list();
        const pricesRes = await stripe.prices.list();
        handleChangeProducts(productsRes.data);
        handleChangePrices(pricesRes.data);
        return pricesRes;
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProductPrice = (productId: string) => {
    const price = prices.find((p) => p.product === productId);
    return price || null;
  };

  return (
    <>
      <main>
        <section>
          <ul className={scss.card_list}>
            {products.map((product: Stripe.Product) => {
              const price = getProductPrice(product.id);
              const cartItem = cartItems.find(
                (item) => item.product.id === product.id
              );
              return (
                <li
                  onClick={() => router.push(`/${product.id}`)}
                  className={scss.card_item}
                  key={product.id}
                >
                  <div className={scss.card_item_price_box}>
                    <span className={clsx(scss.card_item_price)}>
                      {price
                        ? Intl.NumberFormat("ru-RU").format(
                            (price.unit_amount || 0) / 100
                          )
                        : "Цена не указана"}
                    </span>
                    <BiDollar size={"2.4rem"} color="#bb50df" />
                  </div>

                  <p className={scss.card_item_title}>{product.name}</p>
                  <button
                    className={scss.card_item_button}
                    onClick={async (event) => {
                      event.stopPropagation();
                      addToCart(product, price!, 1);
                    }}
                  >
                    В корзину
                  </button>
                  {cartItem ? (
                    <span className={scss.card_item_quantity}>
                      {cartItem.quantity}
                    </span>
                  ) : undefined}
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Home;
