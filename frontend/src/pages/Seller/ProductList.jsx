import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ProductList = () => {
  const { currency } = useAppContext();
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/product/list');
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post('/api/product/stock', { id, inStock });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Error updating stock");
    }
  };

  const handleEditClick = (product) => {
    setEditingProductId(product._id);
    setEditedProduct({
      name: product.name,
      category: product.category,
      offerPrice: product.offerPrice,
    });
  };

  const handleSaveClick = async (id) => {
    try {
      const { data } = await axios.put(`/api/product/update/${id}`, editedProduct);
      if (data.success) {
        toast.success("Product updated successfully");
        setEditingProductId(null);
        fetchProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  const handleChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex-1 py-10 flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th>
                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                <th className="px-4 py-3 font-semibold truncate">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.length > 0 ? products.map((product) => {
                const isEditing = editingProductId === product._id;
                return (
                  <tr key={product._id} className="border-t border-gray-500/20">
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <div className="border border-gray-300 rounded overflow-hidden">
                        <img src={product.image[0]} alt="Product" className="w-16" />
                      </div>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={editedProduct.name}
                          onChange={handleChange}
                          className="border p-1 w-full"
                        />
                      ) : (
                        <span className="truncate max-sm:hidden w-full">{product.name}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <input
                          type="text"
                          name="category"
                          value={editedProduct.category}
                          onChange={handleChange}
                          className="border p-1 w-full"
                        />
                      ) : (
                        product.category
                      )}
                    </td>
                    <td className="px-4 py-3 max-sm:hidden">
                      {isEditing ? (
                        <input
                          type="number"
                          name="offerPrice"
                          value={editedProduct.offerPrice}
                          onChange={handleChange}
                          className="border p-1 w-full"
                        />
                      ) : (
                        `${currency} ${product.offerPrice}`
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                        <input
                          onChange={() => toggleStock(product._id, !product.inStock)}
                          checked={product.inStock}
                          type="checkbox"
                          className="sr-only peer"
                        />
                        <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                        <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                      </label>
                    </td>
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <button
                          onClick={() => handleSaveClick(product._id)}
                          className="text-blue-600 font-semibold"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditClick(product)}
                          className="text-blue-600 font-semibold"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan="5" className="text-center p-4">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
