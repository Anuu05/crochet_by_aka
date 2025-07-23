import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useEffect } from "react";

const SellerLayout = () => {
  const { setIsSeller = () => {}, axios } = useAppContext(); // fallback in case undefined
  const navigate = useNavigate();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data.success) {
        setIsSeller(false);
        toast.success(data.message || "Logged out successfully");
        navigate("/");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Logout error");
    }
  };

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <div className="flex items-center gap-3">
          <Link to="/">
            <img src={assets.yarn} alt="Logo" className="h-8 md:h-10" />
          </Link>
          <span className="text-xl font-bold text-emerald-400">Crochet.</span>
        </div>

        <div className="flex items-center gap-5 text-gray-500">
          <p className="text-sm md:text-base">Hi! Admin</p>
          <button
            onClick={handleLogout}
            className="border rounded-full text-sm px-4 py-1 hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="md:w-64 w-16 border-r h-screen overflow-y-auto text-base border-gray-300 pt-4 flex flex-col bg-white">
          {sidebarLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/seller"}
              title={item.name}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 transition-all ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                    : "hover:bg-gray-100/90 border-white text-gray-700"
                }`
              }
            >
              <img src={item.icon} alt={item.name} className="w-6 h-6" />
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 bg-gray-50 min-h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default SellerLayout;