import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets'; // ensure defaultProduct is available here
import toast from 'react-hot-toast';

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/seller');
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="md:p-10 p-4 space-y-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold text-gray-800">Orders List</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
          >
            {/* 🛍 Items */}
            <div className="flex flex-col space-y-4 mb-4 md:mb-0">
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded overflow-hidden border">
                    <img
                      src={item.product.image?.[0] || assets.defaultProduct}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {item.product.name}
                      {item.quantity > 1 && (
                        <span className="text-indigo-600 ml-1">x {item.quantity}</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">{item.product.category}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 📦 Address */}
            <div className="text-sm text-gray-700 space-y-1 mb-4 md:mb-0">
              <p className="font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>
                {[order.address.street, order.address.city].filter(Boolean).join(', ')}
              </p>
              <p>
                {[order.address.state, order.address.zipcode, order.address.country]
                  .filter(Boolean)
                  .join(', ')}
              </p>
              <p>{order.address.phone}</p>
            </div>

            {/* 💰 Amount */}
            <div className="text-lg font-semibold text-gray-800 flex items-center mb-4 md:mb-0">
              {currency} {order.amount}
            </div>

            {/* 📄 Order Details */}
            <div className="text-sm text-gray-700 flex flex-col justify-center space-y-1">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString('en-GB')}</p>
              <p>
                Payment:{' '}
                <span className={order.isPaid ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>
                  {order.isPaid ? 'Paid' : 'Pending'}
                </span>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
