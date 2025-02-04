"use client";

import Slider from "rc-slider";
import React, { useEffect } from "react";
import "rc-slider/assets/index.css";
import useProducts from "../services/useGetProducts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/common/store/store";
import {
  filterProducts,
  resetFilters,
  setPriceRange,
  setProducts,
  setSelectedCategory,
  setSelectedCurrency,
} from "@/common/store/productSlice";

const currency = [{ name: "USD" }, { name: "RUB" }, { name: "KGS" }];

export const Sidebar = () => {
  const { data: products, isLoading, error } = useProducts();
  const dispatch = useDispatch<AppDispatch>();
  const {
    maxPrice,
    categories,
    priceRange,
    selectedCategory,
    currentCurrency,
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (products) {
      dispatch(setProducts(products));
    }
  }, [products, dispatch]);

  useEffect(() => {
    dispatch(filterProducts());
  }, [priceRange, selectedCategory, currentCurrency, dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div className="sticky h-[400px] max-w-[300px] w-full top-[50px]">
      <div className="border bg-white p-4 rounded">
        <h2 className="text-2xl font-bold">Filters</h2>
        <div className="mt-4">
          <Slider
            range
            allowCross={false}
            defaultValue={priceRange}
            max={maxPrice}
            onChange={(val) => dispatch(setPriceRange(val as [number, number]))}
          />
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold">Categories</h3>
          <select
            className="mt-2 p-2 border rounded w-full"
            value={selectedCategory}
            onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold">Currency</h3>
          <select
            className="mt-2 p-2 border rounded w-full"
            value={currentCurrency}
            onChange={(e) => dispatch(setSelectedCurrency(e.target.value))}
          >
            {currency.map((currency) => (
              <option key={currency.name} value={currency.name}>
                {currency.name}
              </option>
            ))}
          </select>
        </div>
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          onClick={() => dispatch(resetFilters())}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};
