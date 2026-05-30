import {

    useEffect,
    useState,
    useContext

} from "react";

import API from "../services/api";

import Sidebar from "../components/Sidebar";

import Topbar from "../components/Topbar";

import Loader from "../components/Loader";

import {

    ThemeContext

} from "../context/ThemeContext";

import {

    motion

} from "framer-motion";

import toast from "react-hot-toast";

import {

    Trash2,
    UserPlus,
    Search,
    Users

} from "lucide-react";

function Customers() {

    const {
        darkMode
    } = useContext(ThemeContext);

    const [customers,
        setCustomers] = useState([]);

    const [loading,
        setLoading] = useState(true);

    const [search,
        setSearch] = useState("");

    const [formData,
        setFormData] = useState({

        name: "",
        email: "",
        phone: ""

    });

    useEffect(() => {

        fetchCustomers();

    }, []);

    // FETCH CUSTOMERS

    const fetchCustomers = async () => {

        try {

            setLoading(true);

            const res =
                await API.get("/customers");

            setCustomers(res.data);

        } catch (error) {

            toast.error(
                "Failed to fetch customers"
            );

        } finally {

            setLoading(false);

        }

    };

    // HANDLE INPUT

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        });

    };

    // ADD CUSTOMER

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post(

                "/customers/add",

                formData

            );

            toast.success(
                "Customer Added"
            );

            setFormData({

                name: "",
                email: "",
                phone: ""

            });

            fetchCustomers();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to add customer"

            );

        }

    };

    // DELETE CUSTOMER

    const handleDelete = async (id) => {

        try {

            await API.delete(
                `/customers/${id}`
            );

            toast.success(
                "Customer Deleted"
            );

            fetchCustomers();

        } catch (error) {

    toast.error(
        error.response?.data?.message || "Delete Failed"
    );

}

    };

    // FILTERED CUSTOMERS

    const filteredCustomers =

        customers.filter((customer) =>

            customer.name

                .toLowerCase()

                .includes(

                    search.toLowerCase()

                )

            ||

            customer.email

                .toLowerCase()

                .includes(

                    search.toLowerCase()

                )

        );

    return (

        <div className={`flex h-screen overflow-hidden ${
            darkMode
                ? "bg-[#020817]"
                : "bg-[#F8FAFC]"
        }`}>

            {/* SIDEBAR */}

            <Sidebar />

            {/* MAIN */}

            <div className="flex-1 p-8 overflow-y-auto">

                {/* TOPBAR */}

                <Topbar
                    title="Customers"
                    subtitle="Manage customer relationships"
                />

                {/* FORM */}

                <motion.form

                    initial={{
                        opacity: 0,
                        y: 30
                    }}

                    animate={{
                        opacity: 1,
                        y: 0
                    }}

                    onSubmit={handleSubmit}

                    className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 p-8 rounded-3xl shadow-xl mb-8 ${
                        darkMode
                            ? "bg-[#0F172A]"
                            : "bg-white"
                    }`}
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Customer Name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`p-4 rounded-2xl border outline-none ${
                            darkMode
                                ? "bg-[#020817] border-gray-700 text-white"
                                : "bg-gray-50 border-gray-300"
                        }`}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`p-4 rounded-2xl border outline-none ${
                            darkMode
                                ? "bg-[#020817] border-gray-700 text-white"
                                : "bg-gray-50 border-gray-300"
                        }`}
                        required
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`p-4 rounded-2xl border outline-none ${
                            darkMode
                                ? "bg-[#020817] border-gray-700 text-white"
                                : "bg-gray-50 border-gray-300"
                        }`}
                        required
                    />

                    <button
                        type="submit"
                        className="bg-linear-to-r from-purple-500 to-indigo-600 hover:scale-[1.02] transition-all duration-300 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg"
                    >

                        <UserPlus size={20} />

                        Add Customer

                    </button>

                </motion.form>

                {/* SEARCH BAR */}

                <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl border mb-8 ${
                    darkMode
                        ? "bg-[#0F172A] border-gray-700"
                        : "bg-white border-gray-200"
                }`}>

                    <Search
                        className={
                            darkMode
                                ? "text-gray-400"
                                : "text-gray-500"
                        }
                    />

                    <input
                        type="text"
                        placeholder="Search customers..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        className={`w-full bg-transparent outline-none ${
                            darkMode
                                ? "text-white"
                                : "text-gray-800"
                        }`}
                    />

                </div>

                {/* CUSTOMER TABLE */}

                {loading ? (

                    <Loader />

                ) : (

                    <motion.div

                        initial={{
                            opacity: 0
                        }}

                        animate={{
                            opacity: 1
                        }}

                        className={`rounded-3xl shadow-xl overflow-hidden ${
                            darkMode
                                ? "bg-[#0F172A]"
                                : "bg-white"
                        }`}
                    >

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-[#7C3AED] text-white">

                                    <tr>

                                        <th className="p-5 text-left">
                                            Name
                                        </th>

                                        <th className="p-5 text-left">
                                            Email
                                        </th>

                                        <th className="p-5 text-left">
                                            Phone
                                        </th>

                                        <th className="p-5 text-center">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredCustomers.length > 0 ? (

                                        filteredCustomers.map((customer) => (

                                            <tr
                                                key={customer._id}
                                                className={`border-b transition-all duration-300 ${
                                                    darkMode
                                                        ? "border-gray-800 hover:bg-[#172033]"
                                                        : "border-gray-200 hover:bg-gray-50"
                                                }`}
                                            >

                                                {/* NAME */}

                                                <td className={`p-5 font-medium ${
                                                    darkMode
                                                        ? "text-gray-100"
                                                        : "text-gray-800"
                                                }`}>

                                                    {customer.name}

                                                </td>

                                                {/* EMAIL */}

                                                <td className={`p-5 ${
                                                    darkMode
                                                        ? "text-gray-300"
                                                        : "text-gray-700"
                                                }`}>

                                                    {customer.email}

                                                </td>

                                                {/* PHONE */}

                                                <td className={`p-5 ${
                                                    darkMode
                                                        ? "text-gray-300"
                                                        : "text-gray-700"
                                                }`}>

                                                    {customer.phone}

                                                </td>

                                                {/* ACTIONS */}

                                                <td className="p-5">

                                                    <div className="flex justify-center">

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(customer._id)
                                                            }
                                                            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition-all"
                                                        >

                                                            <Trash2 size={18} />

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="py-20"
                                            >

                                                <div className="flex flex-col items-center justify-center">

                                                    <Users
                                                        size={70}
                                                        className={
                                                            darkMode
                                                                ? "text-gray-600"
                                                                : "text-gray-400"
                                                        }
                                                    />

                                                    <h2 className={`text-2xl font-bold mt-5 ${
                                                        darkMode
                                                            ? "text-white"
                                                            : "text-gray-700"
                                                    }`}>

                                                        No Customers Found

                                                    </h2>

                                                    <p className={`mt-2 ${
                                                        darkMode
                                                            ? "text-gray-400"
                                                            : "text-gray-500"
                                                    }`}>

                                                        Add customers to start managing relationships.

                                                    </p>

                                                </div>

                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </motion.div>

                )}

            </div>

        </div>

    );

}

export default Customers;