import {

    useEffect,
    useState,
    useContext

} from "react";

import API from "../services/api";

import Sidebar from "../components/Sidebar";

import Topbar from "../components/Topbar";

import {

    ThemeContext

} from "../context/ThemeContext";

import {

    motion

} from "framer-motion";

import toast from "react-hot-toast";

import jsPDF from "jspdf";

import {

    Receipt,
    Download,
    User

} from "lucide-react";

function Bills() {

    const {
        darkMode
    } = useContext(ThemeContext);

    const [products,
        setProducts] = useState([]);

    const [customers,
        setCustomers] = useState([]);

    const [selectedCustomer,
        setSelectedCustomer] = useState("");

    const [selectedProduct,
        setSelectedProduct] = useState("");

    const [quantity,
        setQuantity] = useState(1);

    useEffect(() => {

        fetchProducts();

        fetchCustomers();

    }, []);

    // FETCH PRODUCTS

    const fetchProducts = async () => {

        try {

            const res =
                await API.get("/products");

            setProducts(res.data);

        } catch (error) {

            toast.error(
                "Failed to fetch products"
            );

        }

    };

    // FETCH CUSTOMERS

    const fetchCustomers = async () => {

        try {

            const res =
                await API.get("/customers");

            setCustomers(res.data);

        } catch (error) {

            toast.error(
                "Failed to fetch customers"
            );

        }

    };

    const customer = customers.find(

        (c) =>
            c._id === selectedCustomer

    );

    const product = products.find(

        (p) =>
            p._id === selectedProduct

    );

    const total = product

        ? product.price * quantity

        : 0;

    // CREATE BILL

    const createBill = async () => {

        // VALIDATION

        if (!selectedCustomer) {

            toast.error(
                "Please select a customer"
            );

            return;

        }

        if (!selectedProduct) {

            toast.error(
                "Please select a product"
            );

            return;

        }

        if (quantity <= 0) {

            toast.error(
                "Quantity must be greater than 0"
            );

            return;

        }

        if (quantity > product.stock) {

            toast.error(
                "Insufficient stock"
            );

            return;

        }

        try {

            await API.post(

                "/bills/create",

                {

                    customerId:
                        selectedCustomer,

                    productId:
                        selectedProduct,

                    quantity

                }

            );

            toast.success(
                "Bill Created Successfully"
            );

            fetchProducts();

            setSelectedCustomer("");

            setSelectedProduct("");

            setQuantity(1);

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Billing Failed"

            );

        }

    };

    // DOWNLOAD PDF

    const downloadInvoice = () => {

        if (!customer || !product) {

            toast.error(
                "Select customer and product"
            );

            return;

        }

        const doc = new jsPDF();

        // HEADER

        doc.setFontSize(24);

        doc.text(
            "Wholesale ERP Invoice",
            20,
            25
        );

        doc.setFontSize(12);

        doc.text(
            `Date: ${new Date().toLocaleString()}`,
            20,
            40
        );

        // CUSTOMER DETAILS

        doc.setFontSize(16);

        doc.text(
            "Customer Details",
            20,
            60
        );

        doc.setFontSize(12);

        doc.text(
            `Name: ${customer.name}`,
            20,
            75
        );

        doc.text(
            `Email: ${customer.email}`,
            20,
            90
        );

        doc.text(
            `Phone: ${customer.phone}`,
            20,
            105
        );

        // PRODUCT DETAILS

        doc.setFontSize(16);

        doc.text(
            "Invoice Details",
            20,
            130
        );

        doc.setFontSize(12);

        doc.text(
            `Product: ${product.name}`,
            20,
            145
        );

        doc.text(
            `Category: ${product.category}`,
            20,
            160
        );

        doc.text(
            `Quantity: ${quantity}`,
            20,
            175
        );

        doc.text(
            `Price: ₹${product.price}`,
            20,
            190
        );

        doc.text(
            `Total Amount: ₹${total}`,
            20,
            205
        );

        doc.save("invoice.pdf");

        toast.success(
            "Invoice Downloaded"
        );

    };

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
                    title="Billing System"
                    subtitle="Generate customer invoices professionally"
                />

                {/* BILLING CARD */}

                <motion.div

                    initial={{
                        opacity: 0,
                        y: 30
                    }}

                    animate={{
                        opacity: 1,
                        y: 0
                    }}

                    className={`max-w-5xl rounded-3xl shadow-xl p-10 ${
                        darkMode
                            ? "bg-[#0F172A]"
                            : "bg-white"
                    }`}
                >

                    {/* CUSTOMER SELECT */}

                    <div className="mb-8">

                        <label className={`block mb-3 text-lg font-semibold ${
                            darkMode
                                ? "text-white"
                                : "text-gray-700"
                        }`}>

                            Select Customer

                        </label>

                        <select
                            value={selectedCustomer}
                            onChange={(e) =>
                                setSelectedCustomer(
                                    e.target.value
                                )
                            }
                            className={`w-full p-5 rounded-2xl border outline-none ${
                                darkMode
                                    ? "bg-[#020817] border-gray-700 text-white"
                                    : "bg-gray-50 border-gray-300 text-gray-800"
                            }`}
                        >

                            <option value="">

                                Choose Customer

                            </option>

                            {customers.map((customer) => (

                                <option
                                    key={customer._id}
                                    value={customer._id}
                                >

                                    {customer.name}

                                </option>

                            ))}

                        </select>

                    </div>

                    {/* PRODUCT SELECT */}

                    <div className="mb-8">

                        <label className={`block mb-3 text-lg font-semibold ${
                            darkMode
                                ? "text-white"
                                : "text-gray-700"
                        }`}>

                            Select Product

                        </label>

                        <select
                            value={selectedProduct}
                            onChange={(e) =>
                                setSelectedProduct(
                                    e.target.value
                                )
                            }
                            className={`w-full p-5 rounded-2xl border outline-none ${
                                darkMode
                                    ? "bg-[#020817] border-gray-700 text-white"
                                    : "bg-gray-50 border-gray-300 text-gray-800"
                            }`}
                        >

                            <option value="">

                                Choose Product

                            </option>

                            {products.map((product) => (

                                <option
                                    key={product._id}
                                    value={product._id}
                                >

                                    {product.name}

                                    {" "}-

                                    Stock: {product.stock}

                                </option>

                            ))}

                        </select>

                    </div>

                    {/* QUANTITY */}

                    <div className="mb-10">

                        <label className={`block mb-3 text-lg font-semibold ${
                            darkMode
                                ? "text-white"
                                : "text-gray-700"
                        }`}>

                            Quantity

                        </label>

                        <input
                            type="number"
                            value={quantity}
                            min="1"
                            onChange={(e) =>
                                setQuantity(
                                    Number(e.target.value)
                                )
                            }
                            className={`w-full p-5 rounded-2xl border outline-none ${
                                darkMode
                                    ? "bg-[#020817] border-gray-700 text-white"
                                    : "bg-gray-50 border-gray-300 text-gray-800"
                            }`}
                        />

                    </div>

                    {/* BILL SUMMARY */}

                    {customer && product && (

                        <motion.div

                            initial={{
                                opacity: 0
                            }}

                            animate={{
                                opacity: 1
                            }}

                            className={`rounded-3xl p-8 mb-10 ${
                                darkMode
                                    ? "bg-[#020817] border border-[#1E293B]"
                                    : "bg-gray-50 border border-gray-200"
                            }`}
                        >

                            <div className="flex items-center gap-3 mb-8">

                                <Receipt className="text-green-500" />

                                <h2 className={`text-3xl font-bold ${
                                    darkMode
                                        ? "text-white"
                                        : "text-gray-900"
                                }`}>

                                    Invoice Summary

                                </h2>

                            </div>

                            <div className="space-y-5">

                                <div className="flex justify-between">

                                    <span className={
                                        darkMode
                                            ? "text-gray-400"
                                            : "text-gray-600"
                                    }>

                                        Customer

                                    </span>

                                    <span className={
                                        darkMode
                                            ? "text-white"
                                            : "text-gray-900"
                                    }>

                                        {customer.name}

                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className={
                                        darkMode
                                            ? "text-gray-400"
                                            : "text-gray-600"
                                    }>

                                        Product

                                    </span>

                                    <span className={
                                        darkMode
                                            ? "text-white"
                                            : "text-gray-900"
                                    }>

                                        {product.name}

                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className={
                                        darkMode
                                            ? "text-gray-400"
                                            : "text-gray-600"
                                    }>

                                        Quantity

                                    </span>

                                    <span className={
                                        darkMode
                                            ? "text-white"
                                            : "text-gray-900"
                                    }>

                                        {quantity}

                                    </span>

                                </div>

                                <div className="flex justify-between pt-5 border-t border-gray-700">

                                    <span className={`text-2xl font-bold ${
                                        darkMode
                                            ? "text-white"
                                            : "text-gray-900"
                                    }`}>

                                        Total

                                    </span>

                                    <span className="text-3xl font-extrabold text-green-500">

                                        ₹{total}

                                    </span>

                                </div>

                            </div>

                        </motion.div>

                    )}

                    {/* ACTION BUTTONS */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <button
                            onClick={createBill}
                            className="bg-linear-to-r from-green-500 to-emerald-600 hover:scale-[1.02] transition-all duration-300 text-white py-5 rounded-2xl text-lg font-semibold shadow-lg"
                        >

                            Create Bill

                        </button>

                        <button
                            onClick={downloadInvoice}
                            className="bg-linear-to-r from-blue-500 to-indigo-600 hover:scale-[1.02] transition-all duration-300 text-white py-5 rounded-2xl text-lg font-semibold shadow-lg flex items-center justify-center gap-3"
                        >

                            <Download size={20} />

                            Download Invoice

                        </button>

                    </div>

                </motion.div>

            </div>

        </div>

    );

}

export default Bills;