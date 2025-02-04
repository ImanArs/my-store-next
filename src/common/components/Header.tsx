"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { AppDispatch, RootState } from "../store/store";
import { loadCartFromStorage } from "../store/cartSlice";
import { filterProducts, setSearchQuery } from "../store/productSlice";
import { Search, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    dispatch(loadCartFromStorage());
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
    dispatch(filterProducts());
  };

  const onFocusInput = () => {
    router.push("/");
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/">
        <h3 className="text-2xl font-bold">MyStore</h3>
      </Link>
      <div className="relative flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          onFocus={onFocusInput}
          placeholder="Search products..."
          onChange={handleSearchChange}
          className="pl-10 pr-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
        />
        <Search className="absolute left-3 text-gray-400" />
      </div>
      <Link href="/cart">
        <div className="relative">
          <ShoppingCart className="mr-2" />
          <div className="absolute bottom-1 -right-1 w-5 h-5 bg-red-400 rounded-full flex items-center justify-center">
            <span className="text-[10px]">{cartItems.length}</span>
          </div>
        </div>
      </Link>
    </header>
  );
};
