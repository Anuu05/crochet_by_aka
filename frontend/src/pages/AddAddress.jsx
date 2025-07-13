import React, { useState } from 'react';

// Reusable InputField component
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    type={type}
    placeholder={placeholder}
    name={name}
    value={address[name]}
    onChange={handleChange}
    required
    className="border border-gray-300 rounded-md p-2 w-full mb-3"
  />
);

const AddAddress = () => {
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  // Corrected spelling: handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log('Submitted Address:', address);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <p className="text-xl font-semibold mb-4">
        Add Shipping <span className="text-indigo-500">Address</span>
      </p>
      <form onSubmit={onSubmitHandler}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField handleChange={handleChange} address={address} name="firstName" type="text" placeholder="First Name" />
          <InputField handleChange={handleChange} address={address} name="lastName" type="text" placeholder="Last Name" />
          <InputField handleChange={handleChange} address={address} name="email" type="email" placeholder="Email" />
          <InputField handleChange={handleChange} address={address} name="phone" type="tel" placeholder="Phone Number" />
          <InputField handleChange={handleChange} address={address} name="street" type="text" placeholder="Street Address" />
          <InputField handleChange={handleChange} address={address} name="city" type="text" placeholder="City" />
          <InputField handleChange={handleChange} address={address} name="state" type="text" placeholder="State" />
          <InputField handleChange={handleChange} address={address} name="zipcode" type="number" placeholder="Zip Code" />
          <InputField handleChange={handleChange} address={address} name="country" type="text" placeholder="Country" />
        </div>
        <button
          type="submit"
          className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default AddAddress;
