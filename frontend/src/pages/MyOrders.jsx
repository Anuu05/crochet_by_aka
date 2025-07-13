import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { dummyOrders } from '../assets/assets';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency } = useAppContext();

  const fetchMyOrders = async () => {
    setMyOrders(dummyOrders);
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="px-6 md:px-16 py-10 min-h-screen bg-white">
      <p className="text-2xl font-bold mb-8 text-gray-800">MY ORDERS</p>

      {myOrders.length === 0 ? (
        <p className="text-gray-600 text-lg">No orders found.</p>
      ) : (
        myOrders.map((order, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-xl p-6 mb-8 bg-white shadow-sm"
          >
            {/* Header Line */}
            <div className="flex flex-wrap justify-between text-sm text-gray-600 mb-4">
              <p>Order Id : <span className="font-medium">{order._id}</span></p>
              <p>Payment : <span className="font-medium">{order.paymentType}</span></p>
              <p>Total Amount : <span className="font-medium text-gray-800">{currency} {order.amount}</span></p>
            </div>

            {/* Single Item Display */}
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border border-gray-200 rounded-lg p-4 bg-white"
              >
                {/* Product Left */}
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 border rounded-md overflow-hidden">
                    <img
                      src={item.product.image[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-base text-gray-800">{item.product.name}</h2>
                    <p className="text-gray-500 text-sm">Category: {item.product.category}</p>
                  </div>
                </div>

                {/* Payment Right */}
                <div className="flex flex-col text-sm text-emerald-600 gap-1 min-w-[150px] sm:text-right">
                  <p>Quantity: <span className="font-medium">{item.quantity || 1}</span></p>
                  <p>Status: <span className="font-medium">{order.status}</span></p>
                  <p>Date: <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span></p>
                  <p>Amount: <span className="font-semibold">{currency} {item.product.offerPrice * (item.quantity || 1)}</span></p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
