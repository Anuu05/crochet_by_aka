import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import {Toaster } from "react-hot-toast";
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';
import Login from "./components/Login";
import Products from "./pages/Products"
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import SellerLogin from './components/Seller/SellerLogin';
import SellerLayout from './pages/Seller/SellerLayout';
import AddProduct from './pages/Seller/AddProduct';
import ProductList from './pages/Seller/ProductList';
import Orders from './pages/Seller/Orders';

const App = () => {

  const isSellerPath = useLocation().pathname.includes("seller");
const {showUserLogin, isSeller} = useAppContext();
  
  return (
    <div>

      {isSellerPath ? null : <Navbar/> }
      {showUserLogin ? <Login/> : null}

      <Toaster/>
      
      <div className={` ${isSellerPath ? "" : "px-5 md:px-8 lg:px-13 xl:px-20" } `}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/products/:category' element={<ProductCategory/>}/>
          <Route path='/products/:category/:id' element={<ProductDetails/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/add-address' element={<AddAddress/>}/>
          <Route path='/my-orders' element={<MyOrders/>}/>
          <Route path='/seller' element={isSeller ? <SellerLayout/> : <SellerLogin/> }> 
          <Route index element= {isSeller ? <AddProduct/> : null}/>
          <Route path= 'product-list' element={<ProductList/>} />
          <Route path= 'orders' element={<Orders/>} />
         </Route>
        </Routes>
      </div>
      { !isSellerPath && <Footer/>}
    </div>
  )
}

export default App