import React from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="py-8 px-4 md:px-16 bg-gray-50 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
        Categories
      </h2>


      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col items-center"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="w-30 h-35 object-cover mb-4  border border-gray-300"
            />
            <p className=" font-semibold text-gray-700">{category.text}</p>
          </div>
        ))}

      </div>

      
    </div>
  );
};

export default Categories;
