import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSeller(true);
  };

  useEffect(() => {
    if (isSeller) {
      navigate('/seller');
    }
  }, [isSeller]);

  return (
    !isSeller && (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
        >
          <p className="text-2xl font-bold text-center mb-6 text-gray-800">
            <span className="text-emerald-600">Seller</span> Login
          </p>

          <div className="mb-4">
            <p className="text-sm font-medium mb-1 text-gray-600">Email</p>
            <input
              type="email"
              placeholder="Enter Your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium mb-1 text-gray-600">Password</p>
            <input
              type="password"
              placeholder="Enter Your Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    )
  );
};

export default SellerLogin;
