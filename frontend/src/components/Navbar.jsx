import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const { user, setUser, setShowUserLogin, navigate , searchQuery, setSearchQuery, getCartCount, axios } = useAppContext();

const logout = async () => {
  try {
    const { data } = await axios.get('/api/user/logout');
    if (data.success) {
      toast.success(data.message);
      setUser(null);      // Clear user state on logout
      navigate("/");      // Redirect to homepage or login
    } else {
      toast.error(data.message || "Logout failed");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Network error");
  }
};


useEffect(() => {
  if (searchQuery.length > 0) {
    navigate('/products');
  }
}, [searchQuery]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 py-4 border-b border-gray-300 bg-white relative">
      {/* Logo */}
      <NavLink
        to="/"
        onClick={() => setOpen(false)}
        className="flex items-center gap-2"
      >
        <img
          src={assets.yarn}
          alt="Crochet logo"
          className="h-10 w-10 object-contain"
        />
        <span className="text-xl font-bold text-emerald-400">Crochet.</span>
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-6">
        <NavLink to="/" className="hover:text-emerald-500">Home</NavLink>
        <NavLink to="/products" className="hover:text-emerald-500">Products</NavLink>
        <NavLink to="/" className="hover:text-emerald-500">Contact</NavLink>

        {/* Search (Desktop only) */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
          onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 bg-transparent outline-none placeholder-gray-500 w-36"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 opacity-75"
          />
          <span className="absolute -top-2 -right-3 text-xs text-white bg-emerald-500 w-5 h-5 rounded-full flex items-center justify-center">
            {getCartCount()}
          </span>
        </div>

        {/* User */}
        {!user ? (
  <button
    onClick={() => {
      setOpen(false);
      setShowUserLogin(true);
    }}
    className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 transition text-white rounded-full"
  >
    Login
  </button>
): (
          <div className="relative group">
            <img src={assets.profile_icon} className="w-9 cursor-pointer" alt="Profile" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2 w-36 rounded-md text-sm z-50">
              <li
                onClick={() => navigate("/my-orders")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={logout}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Toggle */}
      <div className="flex items-center gap-6 sm:hidden">
          <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 opacity-75"
          />
          <span className="absolute -top-2 -right-3 text-xs text-white bg-emerald-500 w-5 h-5 rounded-full flex items-center justify-center">
            {getCartCount()}
          </span>
        </div>
        <button
        onClick={() => setOpen(!open)}
        className=""
        aria-label="Toggle Menu"
      >
        <img src={assets.menu_icon} alt="menu" className="w-6 h-6" />
      </button>
      </div>
      

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md flex flex-col items-start gap-3 px-6 py-4 sm:hidden z-40">
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>Products</NavLink>
          {user && (
            <NavLink to="/my-orders" onClick={() => setOpen(false)}>My Orders</NavLink>
          )}
          <NavLink to="/" onClick={() => setOpen(false)}>Contact</NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-sm w-full mt-2"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-sm w-full mt-2"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;