import React, { useState } from 'react';
import { assets, categories } from '../../assets/assets';

const AddProduct = () => {
    const [files, setFiles] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        // You can handle form submission logic here
    };

    return (
        <div className="no-scrollbar">
            <form
                onSubmit={onSubmitHandler}
                className="md:p-10 p-4 space-y-5 max-w-lg"
                encType="multipart/form-data"
            >
                {/* Upload Images */}
                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input
                                    type="file"
                                    id={`image${index}`}
                                    hidden
                                    onChange={(e) => {
                                        const updatedFiles = [...files];
                                        updatedFiles[index] = e.target.files[0];
                                        setFiles(updatedFiles);
                                    }}
                                />
                                <img
                                    src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                                    alt="uploadArea"
                                    className="max-w-24 cursor-pointer"
                                    width={100}
                                    height={100}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                {/* Product Name */}
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input
                        type="text"
                        id="product-name"
                        placeholder="Type here"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                        required
                    />
                </div>

                {/* Product Description */}
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea
                        id="product-description"
                        rows={4}
                        placeholder="Type here"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
                    ></textarea>
                </div>

                {/* Category */}
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                    >
                        <option value="">Select Category</option>
                        {categories.map((item, index) => (
                            <option key={index} value={item.path}>
                                {item.path}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Price and Offer Price */}
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input
                            type="number"
                            id="product-price"
                            placeholder="0"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                            required
                        />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input
                            type="number"
                            id="offer-price"
                            placeholder="0"
                            value={offerPrice}
                            onChange={(e) => setOfferPrice(e.target.value)}
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
  type="submit"
  className=" cursor-pointer px-8 py-2.5 bg-emerald-400 hover:bg-emerald-600 text-white font-medium  shadow-sm hover:shadow-md transition-all duration-200"
>
  ADD
</button>

            </form>
        </div>
    );
};

export default AddProduct;
