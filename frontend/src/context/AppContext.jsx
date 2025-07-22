import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); // Changed to string for search input

  // Fetch Seller Auth Status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(data.success);
    } catch (error) {
      console.error("Fetch Seller Auth Error:", error);
      setIsSeller(false);
    }
  };

  // Fetch User Auth Status
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems || {});
        setShowUserLogin(false);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        setUser(null);
        setShowUserLogin(true);
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Fetch User Error:", error);
      setUser(null);
      setShowUserLogin(true);
      localStorage.removeItem("user");
    }
  };

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Cart functions
  const addToCart = (itemId) => {
    const newCart = { ...cartItems };
    newCart[itemId] = (newCart[itemId] || 0) + 1;
    setCartItems(newCart);
    toast.success("Added to Cart");
  };

  const updateCartItems = (itemId, quantity) => {
    const newCart = { ...cartItems };
    newCart[itemId] = quantity;
    setCartItems(newCart);
    toast.success("Cart Updated");
  };

  const removeFromCart = (itemId) => {
    const newCart = { ...cartItems };
    if (newCart[itemId]) {
      newCart[itemId] -= 1;
      if (newCart[itemId] <= 0) {
        delete newCart[itemId];
      }
    }
    setCartItems(newCart);
    toast.success("Removed from Cart");
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((acc, val) => acc + val, 0);
  };

  const getCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (product) {
        total += product.offerPrice * cartItems[id];
      }
    }
    return Math.round(total * 100) / 100;
  };

  // Persist user changes to localStorage and toggle login modal
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setShowUserLogin(false);
    } else {
      localStorage.removeItem("user");
      setShowUserLogin(true);
    }
  }, [user]);

  // Initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setShowUserLogin(false);
    } else {
      fetchUser();
    }
    fetchSeller();
    fetchProducts();
  }, []);

  // Update cart on backend with debounce (500ms)
  useEffect(() => {
    if (!user) return;

    const handler = setTimeout(async () => {
      try {
        const { data } = await axios.post("/api/cart/update", { cartItems });
        if (!data.success) toast.error(data.message);
      } catch (error) {
        toast.error(error.message);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [cartItems, user]);

  const value = {
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItems,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    axios,
    navigate,
    fetchProducts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
