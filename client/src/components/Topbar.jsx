import {

    useContext,
    useState

} from "react";

import {

    ThemeContext

} from "../context/ThemeContext";

import {

    Sun,
    Moon,
    LogOut,
    X,
    User

} from "lucide-react";

import {

    motion,
    AnimatePresence

} from "framer-motion";
import toast from "react-hot-toast";

function Topbar({

    title,
    subtitle

}) {

    const {
        darkMode,
        setDarkMode
    } = useContext(ThemeContext);

    const [showLogoutModal,
        setShowLogoutModal] = useState(false);

    const role =
    localStorage.getItem("role");

const userName =
    localStorage.getItem("name");

    // CONFIRM LOGOUT

   const confirmLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    localStorage.removeItem("name");

    toast.success(
        "Signed out successfully 👋"
    );

    setTimeout(() => {

        window.location.href = "/";

    }, 1200);

};

    return (

        <>

            {/* TOPBAR */}

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">

                {/* LEFT */}

                <div>

                    <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
                        darkMode
                            ? "text-white"
                            : "text-gray-900"
                    }`}>

                        {title}

                    </h1>

                    <p className={`mt-2 text-sm sm:text-base lg:text-lg ${
                        darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                    }`}>

                        {subtitle}

                    </p>

                </div>

                {/* RIGHT */}

                <div className="flex flex-wrap items-center gap-3 sm:gap-4">

                    {/* ROLE */}

                    <div
    className={`px-4 sm:px-5 py-3 rounded-2xl border w-40 ${
        darkMode
            ? "bg-[#111827] border-[#1E293B]"
            : "bg-white border-gray-200 shadow-md"
    }`}
>

    <div
        className={`font-semibold text-sm ${
            darkMode
                ? "text-violet-300"
                : "text-violet-600"
        }`}
    >
        <div className="flex items-center gap-2">

    <User size={16} />

    <span>{userName}</span>

</div>
    </div>

    <div
        className={`text-xs uppercase tracking-wider ${
            darkMode
                ? "text-gray-400"
                : "text-gray-500"
        }`}
    >
        {role?.charAt(0).toUpperCase() + role?.slice(1)}
    </div>

</div>

                    {/* THEME TOGGLE */}

                    <button
                        onClick={() =>
                            setDarkMode(!darkMode)
                        }
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                            darkMode

                                ? "bg-[#111827] text-yellow-400 hover:bg-[#1E293B]"

                                : "bg-white text-yellow-500 hover:bg-gray-100"
                        }`}
                    >

                        {darkMode

                            ? <Sun size={22} />

                            : <Moon size={22} />
                        }

                    </button>

                    {/* LOGOUT */}

                    <button
    onClick={() =>
        setShowLogoutModal(true)
    }
    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
        darkMode
            ? "bg-[#111827] text-violet-300 hover:bg-[#1E293B]"
            : "bg-white text-violet-600 hover:bg-gray-100"
    }`}
>

    <LogOut size={20} />

</button>

                </div>

            </div>

            {/* LOGOUT MODAL */}

            <AnimatePresence>

                {showLogoutModal && (

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

                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
                    >

                        <motion.div

                            initial={{
                                scale: 0.8,
                                opacity: 0
                            }}

                            animate={{
                                scale: 1,
                                opacity: 1
                            }}

                            exit={{
                                scale: 0.8,
                                opacity: 0
                            }}

                            transition={{
                                duration: 0.2
                            }}

                            className={`w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl ${
                                darkMode
                                    ? "bg-[#0F172A]"
                                    : "bg-white"
                            }`}
                        >

                            {/* CLOSE */}

                            <div className="flex justify-end mb-4">

                                <button
                                    onClick={() =>
                                        setShowLogoutModal(false)
                                    }
                                    className={`p-2 rounded-full ${
                                        darkMode
                                            ? "hover:bg-[#1E293B] text-gray-400"
                                            : "hover:bg-gray-100 text-gray-500"
                                    }`}
                                >

                                    <X size={20} />

                                </button>

                            </div>

                            {/* TITLE */}

                            <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${
                                darkMode
                                    ? "text-white"
                                    : "text-gray-900"
                            }`}>

                                Sign Out

                            </h2>

                            {/* MESSAGE */}

                            <p className={`mb-8 text-sm sm:text-base ${
                                darkMode
                                    ? "text-gray-400"
                                    : "text-gray-600"
                            }`}>

                                Are you sure you want to sign out of your ERP dashboard?

                            </p>

                            {/* BUTTONS */}

                            <div className="flex flex-col sm:flex-row gap-4">

                                <button
                                    onClick={() =>
                                        setShowLogoutModal(false)
                                    }
                                    className={`flex-1 py-4 rounded-2xl font-semibold transition-all ${
                                        darkMode

                                            ? "bg-[#1E293B] hover:bg-[#334155] text-white"

                                            : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                                    }`}
                                >

                                    Cancel

                                </button>

                                <button
                                    onClick={confirmLogout}
                                    className="flex-1 py-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-all"
                                >

                                    Yes, Sign Out

                                </button>

                            </div>

                        </motion.div>

                    </motion.div>

                )}

            </AnimatePresence>

        </>

    );

}

export default Topbar;