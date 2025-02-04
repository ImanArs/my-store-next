"use client";

import React from "react";
import { clearCart } from "@/common/store/cartSlice";
import { AppDispatch, RootState } from "@/common/store/store";
import { useDispatch, useSelector } from "react-redux";
import { CartForm, CartTable } from "./ui";

export const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mt-8">Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center mt-4">Your cart is empty</p>
      ) : (
        <div className="flex flex-col lg:flex-row justify-between gap-5">
          <CartTable />
          <div className="flex flex-col items-center lg:items-start lg:sticky lg:top-0 w-full lg:w-auto h-auto lg:h-[600px] gap-4">
            <div className="text-center lg:text-left">
              <p>Total Items: {totalItems}</p>
              <p>Total Price: ${totalPrice}</p>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
            <CartForm />
          </div>
        </div>
      )}
    </div>
  );
};
