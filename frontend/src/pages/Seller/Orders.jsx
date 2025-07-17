import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { dummyOrders, assets } from '../../assets/assets';

const Orders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    setOrders(dummyOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Orders List</h2>

      {orders.map((order, index) => (
        <div
          key={index}
          className="flex flex-col md:grid md:grid-cols-[2fr_1.5fr_1fr_1fr] gap-5 p-5 border border-gray-300 rounded-md bg-white text-gray-800 max-w-5xl"
        >
          {/* Items Section */}
          <div className="flex gap-4">

            <div className="space-y-1">
              {order.items.map((item, itemIndex) => (
                <p key={itemIndex} className="text-sm font-medium">
                  {item.product.name}{' '}
                  <span
                    className={`text-indigo-500 ${
                      item.quantity < 2 ? 'hidden' : ''
                    }`}
                  >
                    x {item.quantity}
                  </span>
                </p>
              ))}
            </div>
          </div>

          {/* Address Section */}
          <div className="text-sm">
            <p className="font-medium mb-1">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p>
              {order.address.street}, {order.address.city}
            </p>
            <p>
              {order.address.state}, {order.address.zipcode},{' '}
              {order.address.country}
            </p>
            <p>{order.address.phone}</p>
          </div>

          {/* Price */}
          <div className="text-base font-semibold text-black/70 flex items-center">
            {currency} {order.amount}
          </div>

          {/* Order Info */}
          <div className="text-sm flex flex-col justify-center space-y-1">
            <p>Method: {order.paymentType}</p>
            <p>
              Date: {new Date(order.createdAt).toLocaleDateString('en-GB')}
            </p>
            <p>
              Payment:{' '}
              <span
                className={`${
                  order.isPaid ? 'text-green-600' : 'text-red-500'
                } font-medium`}
              >
                {order.isPaid ? 'Paid' : 'Pending'}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
