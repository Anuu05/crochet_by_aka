import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category?.toLowerCase()
  );

  const filteredProducts = products.filter(
    (product) =>
      product.category?.toLowerCase().trim() === category?.toLowerCase().trim()
  );

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-20 py-10 min-h-screen bg-white text-gray-800">
      {searchCategory && (
        <div className="mb-8 text-center">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-indigo-600">
            {searchCategory.text.toUpperCase()}
          </h1>
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-10 text-base sm:text-lg">
          <p>No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
