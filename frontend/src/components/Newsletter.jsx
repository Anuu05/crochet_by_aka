import React from 'react';

const Newsletter = () => {
  return (
    <div className=" mt-17 pb-15 flex flex-col items-center justify-center text-center px-4 py-12 bg-gradient-to-br from-white via-pink-50 to-indigo-50">
      <h1 className="text-2xl md:text-4xl font-semibold mb-2">Never Miss a Deal!</h1>
      <p className="text-gray-500/70 text-sm md:text-lg mb-6 max-w-xl">
        Subscribe to get the latest offers, new arrivals, and exclusive discounts
      </p>
      
      <form className="flex flex-col md:flex-row items-center w-full max-w-2xl gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="w-full h-12 md:h-13 px-4 text-sm text-gray-700 border border-gray-300 rounded-md md:rounded-r-none outline-none"
        />
        <button
          type="submit"
          className="w-full md:w-auto h-12 md:h-13 px-6 md:px-10 bg-indigo-500 text-white rounded-md md:rounded-l-none hover:bg-indigo-600 transition-all"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
