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

const App = () => {

  const isSellerPath = useLocation().pathname.includes("seller");
const {showUserLogin} = useAppContext();
  
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
        </Routes>
      </div>
      { !isSellerPath && <Footer/>}
    </div>
  )
}

export default App
