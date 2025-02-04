"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/common/store/store";
import { ProductCard } from "@/common/components/ProductCard";

export const ProductList = () => {
  const { filteredProducts } = useSelector(
    (state: RootState) => state.products
  );

  const [visibleItems, setVisibleItems] = useState(5);
  const [loading, setLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadMoreItems = () => {
    if (!loading) {
      setLoading(true);
      setTimeout(() => {
        setVisibleItems((prev) => prev + 5);
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreItems();
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto">
      <ul className="grid grid-cols-[360px] gap-4 sm:grid-cols-[360px_360px] lg:grid-cols-[360px_360px_360px]">
        {filteredProducts.slice(0, visibleItems).length ? (
          filteredProducts
            .slice(0, visibleItems)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        ) : (
          <p>Nothing is found</p>
        )}
      </ul>

      {loading && <p>loading</p>}
      <div ref={loadMoreRef} className="h-10"></div>
    </div>
  );
};
