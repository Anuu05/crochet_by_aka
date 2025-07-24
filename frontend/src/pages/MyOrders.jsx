import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/user');
      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="px-4 md:px-20 py-10 min-h-screen bg-white">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">MY ORDERS</h1>

      {myOrders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        myOrders.map((order, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-xl p-4 md:p-6 mb-6 bg-white shadow-sm"
          >
            {/* Header Info */}
            <div className="flex flex-col md:flex-row md:justify-between text-sm text-gray-600 mb-4">
              <p>OrderId : <span className="font-medium">{order._id}</span></p>
              <p>Payment : <span className="font-medium">{order.paymentType}</span></p>
              <p>Total Amount : <span className="font-medium text-gray-800">{currency} {order.amount}</span></p>
            </div>

            {/* Order Items */}
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border border-gray-200 rounded-lg p-4 bg-white"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 border rounded-md overflow-hidden">
                    <img
                      src={item.product.image[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-800 text-base">{item.product.name}</h2>
                    <p className="text-sm text-gray-500">Category: {item.product.category}</p>
                  </div>
                </div>

                {/* Item Details */}
                <div className="flex flex-col text-sm text-emerald-600 min-w-[150px] sm:text-right gap-1">
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
