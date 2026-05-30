import {

    useState,
    useContext

} from "react";

import {

    useNavigate

} from "react-router-dom";

import API from "../services/api";

import {

    ThemeContext

} from "../context/ThemeContext";

import {

    motion

} from "framer-motion";

import {

    UserPlus

} from "lucide-react";

function Register() {

    const navigate =
        useNavigate();

    const {
        darkMode
    } = useContext(ThemeContext);

    const [formData,
    setFormData] = useState({

    name: "",
    email: "",
    password: "",
    role: "staff"

});

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        });

    };

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            await API.post(

                "/auth/register",

                formData

            );

            alert(
                "Registration Successful"
            );

            navigate("/");

        } catch (error) {

            alert(

                error.response?.data?.message ||

                "Registration Failed"

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

            <div className="hidden lg:flex w-1/2 bg-linear-to-br from-purple-600 via-indigo-700 to-blue-700 items-center justify-center p-16 relative overflow-hidden">

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

                        <UserPlus size={60} />

                        <h1 className="text-5xl font-extrabold">

                            Join ERP

                        </h1>

                    </div>

                    <p className="text-2xl leading-relaxed max-w-lg text-blue-100">

                        Create your account and
                        manage inventory, billing,
                        analytics and customers
                        with a powerful business ERP.

                    </p>

                </motion.div>

                {/* BACKGROUND EFFECTS */}

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

                    onSubmit={handleRegister}

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

                        Create Account

                    </h2>

                    <p className={`mb-8 ${
                        darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                    }`}>

                        Register to start managing
                        your business.

                    </p>

                    {/* NAME */}

                    <div className="mb-5">

                        <label className={`block mb-2 font-medium ${
                            darkMode
                                ? "text-gray-300"
                                : "text-gray-700"
                        }`}>

                            Name

                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className={`w-full p-4 rounded-2xl border outline-none transition-all ${
                                darkMode

                                    ? "bg-[#0F172A] border-gray-700 text-white focus:border-blue-500"

                                    : "bg-gray-50 border-gray-300 text-black focus:border-blue-500"
                            }`}
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                    </div>

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
                            name="email"
                            placeholder="Enter your email"
                            className={`w-full p-4 rounded-2xl border outline-none transition-all ${
                                darkMode

                                    ? "bg-[#0F172A] border-gray-700 text-white focus:border-blue-500"

                                    : "bg-gray-50 border-gray-300 text-black focus:border-blue-500"
                            }`}
                            value={formData.email}
                            onChange={handleChange}
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
                            name="password"
                            placeholder="Create password"
                            className={`w-full p-4 rounded-2xl border outline-none transition-all ${
                                darkMode

                                    ? "bg-[#0F172A] border-gray-700 text-white focus:border-blue-500"

                                    : "bg-gray-50 border-gray-300 text-black focus:border-blue-500"
                            }`}
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                    </div>
                    {/* ROLE */}

<div className="mb-8">

    <label className={`block mb-2 font-medium ${
        darkMode
            ? "text-gray-300"
            : "text-gray-700"
    }`}>

        Role

    </label>

    <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className={`w-full p-4 rounded-2xl border outline-none transition-all ${
            darkMode
                ? "bg-[#0F172A] border-gray-700 text-white focus:border-blue-500"
                : "bg-gray-50 border-gray-300 text-black focus:border-blue-500"
        }`}
    >

        <option value="staff">
            Staff
        </option>

        <option value="admin">
            Admin
        </option>

    </select>

</div>

                    {/* BUTTON */}

                    <button
                        type="submit"
                        className="w-full bg-linear-to-r from-purple-500 to-indigo-600 hover:scale-[1.02] transition-all duration-300 text-white py-4 rounded-2xl text-lg font-semibold shadow-lg"
                    >

                        Register

                    </button>

                    {/* LOGIN */}

                    <p className={`text-center mt-6 ${
                        darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                    }`}>

                        Already have an account?

                        <a
                            href="/"
                            className="text-blue-500 font-semibold ml-2 hover:underline"
                        >

                            Login

                        </a>

                    </p>

                </motion.form>

            </div>

        </div>

    );

}

export default Register;