import {

    useState,
    useContext

} from "react";

import API from "../services/api";
import toast from "react-hot-toast";

import {

    ThemeContext

} from "../context/ThemeContext";

import {

    motion

} from "framer-motion";

import {

    ShieldCheck

} from "lucide-react";

function Login() {

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const {
        darkMode
    } = useContext(ThemeContext);

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const res =
                await API.post(

                    "/auth/login",

                    {
                        email,
                        password
                    }

                );

            // SAVE TOKEN
            localStorage.setItem(

                "token",

                res.data.token

            );

            // SAVE ROLE
            localStorage.setItem(

                "role",

                res.data.user.role

            );
            // SAVE NAME
localStorage.setItem(

    "name",

    res.data.user.name

);

          toast.success(

    `Welcome back, ${res.data.user.name}! 👋`

);

setTimeout(() => {

    window.location.href =
        "/dashboard";

}, 1200);
        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Login Failed"

            );

        }

    };

    return (

        <div className={`min-h-screen flex ${
            darkMode
                ? "bg-[#020817]"
                : "bg-gray-100"
        }`}>

            {/* LEFT SIDE */}

            <div className="hidden lg:flex w-1/2 bg-linear-to-r from-blue-600 via-indigo-700 to-purple-700 items-center justify-center p-16 relative overflow-hidden">

                <motion.div

                    initial={{
                        opacity: 0,
                        y: 40
                    }}

                    animate={{
                        opacity: 1,
                        y: 0
                    }}

                    transition={{
                        duration: 0.8
                    }}

                    className="text-white z-10"
                >

                    <div className="flex items-center gap-4 mb-8">

                        <ShieldCheck size={60} />

                        <h1 className="text-5xl font-extrabold">

                            Wholesale ERP

                        </h1>

                    </div>

                    <p className="text-2xl leading-relaxed max-w-lg text-blue-100">

                        Manage inventory, billing,
                        customers, reports and
                        analytics with a modern
                        enterprise-grade ERP system.

                    </p>

                </motion.div>

                {/* BACKGROUND CIRCLES */}

                <div className="absolute w-96 h-96 bg-white/10 rounded-full top-10 left-10 blur-3xl"></div>

                <div className="absolute w-80 h-80 bg-purple-400/20 rounded-full bottom-10 right-10 blur-3xl"></div>

            </div>

            {/* RIGHT SIDE */}

            <div className="flex-1 flex items-center justify-center p-8">

                <motion.form

                    initial={{
                        opacity: 0,
                        scale: 0.9
                    }}

                    animate={{
                        opacity: 1,
                        scale: 1
                    }}

                    transition={{
                        duration: 0.5
                    }}

                    onSubmit={handleLogin}

                    className={`w-full max-w-md p-10 rounded-3xl shadow-2xl backdrop-blur-xl border ${
                        darkMode

                            ? "bg-white/5 border-gray-800"

                            : "bg-white border-gray-200"
                    }`}
                >

                    <h2 className={`text-4xl font-extrabold mb-3 ${
                        darkMode
                            ? "text-white"
                            : "text-gray-900"
                    }`}>

                        Welcome Back

                    </h2>

                    <p className={`mb-8 ${
                        darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                    }`}>

                        Login to continue managing
                        your business.

                    </p>

                    {/* EMAIL */}

                    <div className="mb-5">

                        <label className={`block mb-2 font-medium ${
                            darkMode
                                ? "text-gray-300"
                                : "text-gray-700"
                        }`}>

                            Email

                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={`w-full p-4 rounded-2xl border outline-none transition-all ${
                                darkMode

                                    ? "bg-[#0F172A] border-gray-700 text-white focus:border-blue-500"

                                    : "bg-gray-50 border-gray-300 text-black focus:border-blue-500"
                            }`}
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    {/* PASSWORD */}

                    <div className="mb-8">

                        <label className={`block mb-2 font-medium ${
                            darkMode
                                ? "text-gray-300"
                                : "text-gray-700"
                        }`}>

                            Password

                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            className={`w-full p-4 rounded-2xl border outline-none transition-all ${
                                darkMode

                                    ? "bg-[#0F172A] border-gray-700 text-white focus:border-blue-500"

                                    : "bg-gray-50 border-gray-300 text-black focus:border-blue-500"
                            }`}
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        className="w-full bg-linear-to-r from-blue-500 to-indigo-600 hover:scale-[1.02] transition-all duration-300 text-white py-4 rounded-2xl text-lg font-semibold shadow-lg"
                    >

                        Login

                    </button>

                    {/* REGISTER */}

                    <p className={`text-center mt-6 ${
                        darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                    }`}>

                        Don't have an account?

                        <a
                            href="/register"
                            className="text-blue-500 font-semibold ml-2 hover:underline"
                        >

                            Register

                        </a>

                    </p>

                </motion.form>

            </div>

        </div>

    );

}

export default Login;