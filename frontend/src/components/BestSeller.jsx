import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();

  const bestSellers = products
    .filter((product) => product.inStock)
    .slice(0, 6);

  return (
    <div className="mt-10 px-4 sm:px-6 md:px-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
        Best Sellers
      </h2>

      <div className="overflow-x-auto custom-scrollbar">
        <div className="flex gap-7 md:gap-8 pb-2">
          {bestSellers.map((product, index) => (
            <div
              key={index}
              className="min-w-[240px] sm:min-w-[260px] max-w-xs flex-shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
