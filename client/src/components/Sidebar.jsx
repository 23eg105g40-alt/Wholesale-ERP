import {

    Link,
    useLocation

} from "react-router-dom";

import {

    useContext,
    useState

} from "react";

import {

    ThemeContext

} from "../context/ThemeContext";

import {

    LayoutDashboard,
    Package,
    Users,
    Receipt,
    FileText,
    ShoppingCart,
    Menu,
    X

} from "lucide-react";

import {

    motion,
    AnimatePresence

} from "framer-motion";

function Sidebar() {

    const location =
        useLocation();

    const {
        darkMode
    } = useContext(ThemeContext);

    const [sidebarOpen,
        setSidebarOpen] = useState(false);

    const role =
        localStorage.getItem("role");

    // MENU ITEMS

    const menuItems = [

        ...(role === "admin"

            ? [

                {
                    name: "Dashboard",
                    path: "/dashboard",
                    icon: LayoutDashboard
                },

                {
                    name: "Products",
                    path: "/products",
                    icon: Package
                },

                {
                    name: "Customers",
                    path: "/customers",
                    icon: Users
                },

                {
                    name: "Reports",
                    path: "/reports",
                    icon: FileText
                }

            ]

            : []),

        {
            name: "Billing",
            path: "/bills",
            icon: ShoppingCart
        },

        {
            name: "Bill History",
            path: "/bill-history",
            icon: Receipt
        }

    ];

    return (

        <>

            {/* MOBILE MENU BUTTON */}

            <button
                onClick={() =>
                    setSidebarOpen(true)
                }
                className={`lg:hidden fixed top-5 left-5 z-50 p-3 rounded-2xl shadow-lg ${
                    darkMode

                        ? "bg-[#111827] text-white"

                        : "bg-white text-black"
                }`}
            >

                <Menu size={24} />

            </button>

            {/* OVERLAY */}

            <AnimatePresence>

                {sidebarOpen && (

                    <motion.div

                        initial={{
                            opacity: 0
                        }}

                        animate={{
                            opacity: 1
                        }}

                        exit={{
                            opacity: 0
                        }}

                        onClick={() =>
                            setSidebarOpen(false)
                        }

                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    />

                )}

            </AnimatePresence>

            {/* SIDEBAR */}

            <AnimatePresence>

                {(sidebarOpen || window.innerWidth >= 1024) && (

                    <motion.div

                        initial={{
                            x: -300
                        }}

                        animate={{
                            x: 0
                        }}

                        exit={{
                            x: -300
                        }}

                        transition={{
                            duration: 0.3
                        }}

                        className={`fixed lg:sticky top-0 left-0 z-50 w-72 h-screen flex flex-col p-6 border-r transition-all duration-300 ${
                            darkMode

                                ? "bg-[#0B1120] text-white border-[#1E293B]"

                                : "bg-white text-black border-gray-200 shadow-xl"
                        }`}
                    >

                        {/* CLOSE BUTTON MOBILE */}

                        <div className="flex justify-end lg:hidden mb-4">

                            <button
                                onClick={() =>
                                    setSidebarOpen(false)
                                }
                                className={`p-2 rounded-full ${
                                    darkMode

                                        ? "hover:bg-[#172033]"

                                        : "hover:bg-gray-100"
                                }`}
                            >

                                <X size={24} />

                            </button>

                        </div>

                        {/* LOGO SECTION */}

                        <div className="flex flex-col items-center mb-12">

                            {/* LOGO ICON */}

                            <div className="w-24 h-24 rounded-3xl bg-linear-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-2xl mb-5">

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-12 h-12 text-white"
                                >

                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 7l9-4 9 4m-9-4v18m9-14l-9 4-9-4m18 0v10l-9 4-9-4V11"
                                    />

                                </svg>

                            </div>

                            {/* BRAND NAME */}

                            <h1 className={`text-3xl font-extrabold tracking-tight text-center leading-tight ${
                                darkMode
                                    ? "text-white"
                                    : "text-gray-900"
                            }`}>

                                Wholesale

                                <span className="text-blue-500">

                                    {" "}ERP

                                </span>

                            </h1>

                            {/* SUBTITLE */}

                            <p className={`text-sm mt-3 text-center leading-relaxed ${
                                darkMode
                                    ? "text-gray-400"
                                    : "text-gray-500"
                            }`}>

                                Business Management System

                            </p>

                        </div>

                        {/* MENU */}

                        <div className="space-y-3 flex-1 overflow-y-auto pr-1">

                            {menuItems.map((item) => {

                                const Icon =
                                    item.icon;

                                return (

                                    <Link
                                        key={item.path}
                                        to={item.path}

                                        onClick={() =>
                                            setSidebarOpen(false)
                                        }

                                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                                            location.pathname === item.path

                                                ? "bg-[#2563EB] text-white shadow-lg"

                                                : darkMode

                                                ? "hover:bg-[#172033] text-gray-300"

                                                : "hover:bg-gray-100 text-gray-700"
                                        }`}
                                    >

                                        <Icon
                                            size={22}
                                            className="group-hover:scale-110 transition-transform duration-300"
                                        />

                                        <span className="font-medium text-lg">

                                            {item.name}

                                        </span>

                                    </Link>

                                );

                            })}

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

        </>

    );

}

export default Sidebar;