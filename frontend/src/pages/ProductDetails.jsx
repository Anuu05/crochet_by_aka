import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { products, addToCart } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (product && products.length > 0) {
      const related = products
        .filter((item) => item.category === product.category && item._id !== product._id)
        .slice(0, 5);
      setRelatedProducts(related);
    }
  }, [products, product]);

  useEffect(() => {
    setThumbnail(product?.image?.[0] || null);
  }, [product]);

  return product && (
    <div className="mt-10 px-6 md:px-20 py-6 text-gray-800 bg-white rounded-lg shadow-sm">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-600 mb-4">
        <Link to="/" className="hover:underline">Home</Link> /
        <Link to="/products" className="hover:underline"> Products</Link> /
        <Link to={`/products/${product.category.toLowerCase()}`} className="hover:underline"> {product.category}</Link> /
        <span className="text-indigo-600 font-semibold"> {product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Images */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {product.image.map((img, i) => (
              <div
                key={i}
                onClick={() => setThumbnail(img)}
                className="border border-gray-300 w-20 h-20 rounded cursor-pointer overflow-hidden hover:ring-2 ring-indigo-400 transition"
              >
                <img src={img} alt={`Thumbnail ${i}`} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>

          {/* Main image */}
          <div className="border border-gray-300 rounded overflow-hidden w-80 h-80">
            <img src={thumbnail} alt="Product" className="object-contain w-full h-full" />
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {Array(5).fill('').map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt="star"
                className="w-4 h-4"
              />
            ))}
            <span className="text-gray-500 ml-2 text-sm">(4 reviews)</span>
          </div>

          {/* Pricing */}
          <div className="mt-6">
            <p className="text-gray-400 line-through text-base">
              MRP: Rs. {product.price}
            </p>
            <p className="text-2xl font-bold text-indigo-600 mt-1">
              Rs. {product.offerPrice}
            </p>
            <span className="text-sm text-gray-500">(inclusive of all taxes)</span>
          </div>

          {/* Description */}
          <div className="mt-6">
            <p className="text-lg font-medium text-gray-700 mb-2">About Product:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              {product.description.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate('/cart');
              }}
              className="w-full py-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      
    <div className="mt-14 border-t border-gray-200 pt-10">
  <div className="mb-6">
    <p className="text-2xl font-semibold text-gray-800">Related Products</p>
  </div>

  <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5 sm:grid-cols-2">
    {relatedProducts.filter((product) => product.inStock).map((product, index) => (
      <ProductCard key={index} product={product} />
    ))}
  </div>

  <div className="flex justify-center mt-8">
    <button onClick={()=> {navigate('/products') ; scrollTo(0,0)}} className="px-6 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium">
      See More
    </button>
  </div>
</div>


    </div>
  );
};

export default ProductDetails;
