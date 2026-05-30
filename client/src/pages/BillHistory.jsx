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

    CalendarDays,
    IndianRupee,
    Search,
    ReceiptText

} from "lucide-react";

function BillHistory() {

    const {
        darkMode
    } = useContext(ThemeContext);

    const [bills,
        setBills] = useState([]);

    const [loading,
        setLoading] = useState(true);

    const [search,
        setSearch] = useState("");

    useEffect(() => {

        fetchBills();

    }, []);

    // FETCH BILLS

    const fetchBills = async () => {

        try {

            setLoading(true);

            const res =
                await API.get("/bills");

            setBills(res.data);

        } catch (error) {

            toast.error(
                "Failed to fetch bills"
            );

        } finally {

            setLoading(false);

        }

    };

    // FILTERED BILLS

    const filteredBills =

    bills.filter((bill) =>

        bill.product?.name
            ?.toLowerCase()
            .includes(search.toLowerCase())

        ||

        bill.customer?.name
            ?.toLowerCase()
            .includes(search.toLowerCase())

        ||

        new Date(bill.createdAt)
            .toLocaleDateString()
            .includes(search)
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
                    title="Bill History"
                    subtitle="Track all billing transactions"
                />

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
                        placeholder="Search customer, product or date..."
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

                {/* BILL TABLE */}

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

                                {/* TABLE HEADER */}

                                <thead className="bg-linear-to-r from-blue-600 to-violet-600 text-white">

                                    <tr>
                                        <th className="p-5 text-left">
    Invoice No.
</th>

                                        <th className="p-5 text-left">
    Customer
</th>

                                        <th className="p-5 text-left">
                                            Product
                                        </th>

                                        <th className="p-5 text-left">
                                            Quantity
                                        </th>

                                        <th className="p-5 text-left">
                                            Amount
                                        </th>

                                        <th className="p-5 text-left">
                                            Date
                                        </th>

                                        <th className="p-5 text-center">
                                            Status
                                        </th>

                                    </tr>

                                </thead>

                                {/* TABLE BODY */}

                                <tbody>

                                    {filteredBills.length > 0 ? (

                                        filteredBills.map((bill) => (

                                            <tr
                                                key={bill._id}
                                                className={`border-b transition-all duration-300 ${
                                                    darkMode
                                                        ? "border-gray-800 hover:bg-[#172033]"
                                                        : "border-gray-200 hover:bg-gray-50"
                                                }`}

                                                
                                            >
                                                <td
    className={`p-5 font-mono font-semibold ${
        darkMode
            ? "text-cyan-300"
            : "text-cyan-600"
    }`}
>

    {bill.invoiceNumber}

</td>
                                                {/* CUSTOMER */}

<td
    className={`p-5 font-semibold ${
        darkMode
            ? "text-violet-300"
            : "text-violet-600"
    }`}
>

    {bill.customer?.name || "N/A"}

</td>

                                                {/* PRODUCT */}

                                                <td className={`p-5 font-semibold ${
                                                    darkMode
                                                        ? "text-gray-100"
                                                        : "text-gray-800"
                                                }`}>

                                                    {bill.product?.name || "N/A"}

                                                </td>

                                                {/* QUANTITY */}

                                                <td className={`p-5 ${
                                                    darkMode
                                                        ? "text-gray-300"
                                                        : "text-gray-700"
                                                }`}>

                                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                        darkMode
                                                            ? "bg-blue-500/20 text-blue-400"
                                                            : "bg-blue-100 text-blue-600"
                                                    }`}>

                                                        {bill.quantity}

                                                    </span>

                                                </td>

                                                {/* TOTAL */}

                                                <td className="p-5">

                                                    <div className="flex items-center gap-2 font-bold text-green-500">

                                                        <IndianRupee size={18} />

                                                        {bill.totalAmount}

                                                    </div>

                                                </td>

                                                {/* DATE */}

                                                <td className={`p-5 ${
                                                    darkMode
                                                        ? "text-gray-300"
                                                        : "text-gray-700"
                                                }`}>

                                                    <div className="flex items-center gap-2">

                                                        <CalendarDays size={18} />

                                                        {new Date(

                                                            bill.createdAt

                                                        ).toLocaleString()}

                                                    </div>

                                                </td>

                                                {/* STATUS */}

                                                <td className="p-5 text-center">

                                                    <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold">

                                                        Completed

                                                    </span>

                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="7"
                                                className="py-20"
                                            >

                                                <div className="flex flex-col items-center justify-center">

                                                    <ReceiptText
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

                                                        No Billing History Found

                                                    </h2>

                                                    <p className={`mt-2 ${
                                                        darkMode
                                                            ? "text-gray-400"
                                                            : "text-gray-500"
                                                    }`}>

                                                        Generate invoices to track billing transactions.

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

export default BillHistory;