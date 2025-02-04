import React, { useEffect, useState } from "react";
import { Product } from "../types/product";
import { motion } from "motion/react";
import Image from "next/image";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../store/cartSlice";
import Link from "next/link";
import { StarRate } from "./StarRate";
import { ProductLabel } from "./ProductLabel";
import { fetchExchangeRates } from "../utils";

interface Props {
  product: Product;
}

export const ProductCard = (props: Props) => {
  const { product } = props;
  const { currentCurrency } = useSelector((state: RootState) => state.products);
  const [exchangeRates, setExchangeRates] = useState<{
    [key: string]: number;
  } | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  useEffect(() => {
    const getRates = async () => {
      const rates = await fetchExchangeRates();
      setExchangeRates(rates);
    };
    getRates();
  }, []);
  const priceInCurrency = exchangeRates
    ? (exchangeRates[currentCurrency] * product.price).toFixed(2)
    : "Loading...";

  const isInCart = (id: number) => {
    return cartItems.some((item) => item.id === id);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      key={product.id}
      className="p-2 border rounded flex flex-col gap-2 items-center view-transition mx-auto"
    >
      <ProductLabel
        label={product.category}
        className="absolute top-2.5 left-2.5 p-2.5 rounded-[12px]"
      />
      <div className="relative">
        <Image
          src={product.image}
          alt={product.title}
          width={800}
          height={800}
          style={{
            width: "200px",
            height: "200px",
            objectFit: "contain",
          }}
          loading="lazy"
        />

        <StarRate
          starCount={product.rating.count}
          starRate={product.rating.rate}
          className="absolute bottom-2.5 right-2.5 flex gap-4 bg-purple-100 p-2.5 rounded-[12px]"
        />
      </div>
      <h3 className="w-[250px] text-[18px] font-medium overflow-hidden text-ellipsis whitespace-nowrap">
        {product.title}
      </h3>
      <p className="h-[100px]">{truncateText(product.description, 100)}</p>
      <div className="flex gap-4 items-center">
        {isInCart(product.id) ? (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => dispatch(removeItemFromCart(product.id))}
          >
            Remove from Cart
          </button>
        ) : (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => dispatch(addItemToCart(product))}
          >
            Add to Cart
          </button>
        )}
        <Link
          className="bg-blue-300 text-white px-4 py-2 rounded"
          href={`/products/${product.id}`}
        >
          read more
        </Link>
      </div>
      <p>
        Price: {priceInCurrency} {currentCurrency}
      </p>
    </motion.li>
  );
};
