import React, { useEffect, useState } from "react";
import { Column, Table } from "@/common/components/Table";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/common/store/store";
import { fetchExchangeRates } from "@/common/utils";
import Image from "next/image";
import { removeItemFromCart } from "@/common/store/cartSlice";

export const CartTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentCurrency } = useSelector((state: RootState) => state.products);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [exchangeRates, setExchangeRates] = useState<{
    [key: string]: number;
  } | null>(null);

  useEffect(() => {
    const getRates = async () => {
      const rates = await fetchExchangeRates();
      setExchangeRates(rates);
    };
    getRates();
  }, []);
  return (
    <div className="w-full lg:max-w-[600px] border px-5">
      <Table dataSource={cartItems}>
        <Column
          title="image"
          dataIndex="image"
          render={(value) => (
            <Image src={value} width={80} height={80} alt="Product image" />
          )}
        />
        <Column
          title="title"
          dataIndex="title"
          render={(value) => <span className="w-[300px]">{value}</span>}
        />
        <Column
          title="quantity"
          dataIndex="quantity"
          render={(value) => <span>{value}</span>}
        />
        <Column
          title="price"
          dataIndex="price"
          render={(value) => {
            const priceInCurrency = exchangeRates
              ? (exchangeRates[currentCurrency] * value).toFixed(2)
              : "Loading...";
            return (
              <span>
                {priceInCurrency} {currentCurrency}
              </span>
            );
          }}
        />
        <Column
          title="delete"
          dataIndex="id"
          render={(value) => (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => dispatch(removeItemFromCart(value))}
            >
              Remove
            </button>
          )}
        />
      </Table>
    </div>
  );
};
