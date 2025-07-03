import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();

  return (
    <div className="mt-9">
      <p className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
        Best Sellers
      </p>

      <div className="overflow-x-auto custom-scrollbar px-2 md:px-4">
  <div className="flex gap-4">
    {products
      .filter((product) => product.inStock)
      .slice(0, 6)
      .map((product, index) => (
        <div key={index} className="min-w-[250px]">
          <ProductCard product={product} />
        </div>
      ))}
  </div>
</div>

    </div>
  );
};

export default BestSeller;
