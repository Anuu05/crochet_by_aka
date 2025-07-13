import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const SellerLayout = () => {
    const { setIsSeller } = useAppContext();
    const navigate = useNavigate();

    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];

    const Logout = () => {
        setIsSeller(false);
        navigate("/"); // redirect to home or login after logout
    };

    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
                <div className="flex items-center gap-3">
                    <Link to="/">
                        <img src={assets.yarn} alt="Logo" className="h-8 md:h-10" />
                    </Link>
                    <span className="text-xl font-bold text-emerald-400">Crochet.</span>
                </div>

                <div className="flex items-center gap-5 text-gray-500">
                    <p className="text-sm md:text-base">Hi! Admin</p>
                    <button
                        onClick={Logout}
                        className="border rounded-full text-sm px-4 py-1 hover:bg-gray-100 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Layout */}
            <div className="flex">
                {/* Sidebar */}
                <div className="md:w-64 w-16 border-r h-screen overflow-y-auto text-base border-gray-300 pt-4 flex flex-col ">
                    {sidebarLinks.map((item) => (
                        <NavLink
                            to={item.path}
                            key={item.name}
                            end={item.path === "/seller"}
                            title={item.name}
                            className={({ isActive }) =>
                                `flex items-center py-3 px-4 gap-3 transition-all 
                                ${isActive
                                    ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                                    : "hover:bg-gray-100/90 border-white text-gray-700"
                                }`
                            }
                        >
                            <img
                                src={item.icon}
                                alt={item.name}
                                className="w-6 h-6"
                            />
                            <p className="md:block hidden text-center">{item.name}</p>
                        </NavLink>
                    ))}
                </div>

                {/* Main content */}
                <div className="flex-1 p-4 bg-gray-50 min-h-screen">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default SellerLayout;
