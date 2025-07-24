import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="relative w-full">
      {/* Background image */}
      <img
        src={assets.main}
        alt="Crochet Banner"
        className="w-full max-h-[500px] h-auto object-cover rounded-md shadow-md"

      />

      {/* Overlay with opacity */}
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-center">
        <div className="px-4 md:px-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Handcrafted Crochet Pieces
          </h1>
          <p className="text-sm md:text-lg mb-6">
            Beautifully designed and made with love.
          </p>
    <Link to="/products">
          <button
            className="
              bg-green-500 hover:bg-green-600
              text-white
              px-8 py-3
              rounded-full
              shadow-lg
              transition
              duration-300
              transform
              hover:scale-105
            "
          >
            Explore Now
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
