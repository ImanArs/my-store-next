"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { ProductList } from "./ProductList";

export const MainPage = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mt-8">Products</h1>
      <div className="flex flex-col lg:flex-row gap-10 mt-8">
        <div className="lg:w-1/4 w-full">
          <Sidebar />
        </div>
        <div className="lg:w-3/4 w-full">
          <ProductList />
        </div>
      </div>
    </div>
  );
};
