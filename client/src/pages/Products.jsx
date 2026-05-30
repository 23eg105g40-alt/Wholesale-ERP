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

    Pencil,
    Trash2,
    PlusCircle,
    Search,
    PackageSearch

} from "lucide-react";

function Products() {

    const {
        darkMode
    } = useContext(ThemeContext);

    const [products,
        setProducts] = useState([]);

    const [loading,
        setLoading] = useState(true);

    const [search,
        setSearch] = useState("");

    const [categoryFilter,
        setCategoryFilter] = useState("All");

    const [formData,
        setFormData] = useState({

        name: "",
        category: "",
        price: "",
        stock: ""

    });

    const [editingId,
        setEditingId] = useState(null);

    useEffect(() => {

        fetchProducts();

    }, []);

    // FETCH PRODUCTS

    const fetchProducts = async () => {

        try {

            setLoading(true);

            const res =
                await API.get("/products");

            setProducts(res.data);

        } catch (error) {

            toast.error(
                "Failed to fetch products"
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

    // ADD / UPDATE PRODUCT

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await API.put(

                    `/products/${editingId}`,

                    formData

                );

                toast.success(
                    "Product Updated"
                );

            } else {

                await API.post(

                    "/products/add",

                    formData

                );

                toast.success(
                    "Product Added"
                );

            }

            setFormData({

                name: "",
                category: "",
                price: "",
                stock: ""

            });

            setEditingId(null);

            fetchProducts();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Operation Failed"

            );

        }

    };

    // DELETE PRODUCT

    const handleDelete = async (id) => {

        try {

            await API.delete(
                `/products/${id}`
            );

            toast.success(
                "Product Deleted"
            );

            fetchProducts();

        } catch (error) {
  toast.error(
    error.response?.data?.message || "Delete Failed"
  );
}

    };

    // EDIT PRODUCT

    const handleEdit = (product) => {

        setFormData({

            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock

        });

        setEditingId(product._id);

    };

    // UNIQUE CATEGORIES

    const categories = [

        "All",

        ...new Set(

            products.map(

                (p) => p.category

            )

        )

    ];

    // FILTERED PRODUCTS

    const filteredProducts =

        products.filter((product) => {

            const matchesSearch =

                product.name

                    .toLowerCase()

                    .includes(

                        search.toLowerCase()

                    )

                ||

                product.category

                    .toLowerCase()

                    .includes(

                        search.toLowerCase()

                    );

            const matchesCategory =

                categoryFilter === "All"

                ||

                product.category === categoryFilter;

            return (

                matchesSearch

                &&

                matchesCategory

            );

        });

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
                    title="Products"
                    subtitle="Manage inventory and stock"
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

                    className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 p-8 rounded-3xl shadow-xl mb-10 ${
                        darkMode
                            ? "bg-[#0F172A]"
                            : "bg-white"
                    }`}
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
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
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`p-4 rounded-2xl border outline-none ${
                            darkMode
                                ? "bg-[#020817] border-gray-700 text-white"
                                : "bg-gray-50 border-gray-300"
                        }`}
                        required
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        className={`p-4 rounded-2xl border outline-none ${
                            darkMode
                                ? "bg-[#020817] border-gray-700 text-white"
                                : "bg-gray-50 border-gray-300"
                        }`}
                        required
                    />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={formData.stock}
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
                        className="bg-linear-to-r from-blue-500 to-indigo-600 hover:scale-[1.02] transition-all duration-300 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg"
                    >

                        <PlusCircle size={20} />

                        {editingId
                            ? "Update"
                            : "Add Product"}

                    </button>

                </motion.form>

                {/* SEARCH + FILTER */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

                    <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl border ${
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
                            placeholder="Search products..."
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

                    <select
                        value={categoryFilter}
                        onChange={(e) =>
                            setCategoryFilter(
                                e.target.value
                            )
                        }
                        className={`px-5 py-4 rounded-2xl border outline-none ${
                            darkMode
                                ? "bg-[#0F172A] border-gray-700 text-white"
                                : "bg-white border-gray-200 text-gray-800"
                        }`}
                    >

                        {categories.map((category) => (

                            <option
                                key={category}
                                value={category}
                            >

                                {category}

                            </option>

                        ))}

                    </select>

                </div>

                {/* PRODUCTS TABLE */}

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

                                <thead className="bg-[#2563EB] text-white">

                                    <tr>

                                        <th className="p-5 text-left">
                                            Product
                                        </th>

                                        <th className="p-5 text-left">
                                            Category
                                        </th>

                                        <th className="p-5 text-left">
                                            Price
                                        </th>

                                        <th className="p-5 text-left">
                                            Stock
                                        </th>

                                        <th className="p-5 text-center">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredProducts.length > 0 ? (

                                        filteredProducts.map((product) => (

                                            <tr
                                                key={product._id}
                                                className={`border-b transition-all duration-300 ${
                                                    darkMode
                                                        ? "border-gray-800 hover:bg-[#172033]"
                                                        : "border-gray-200 hover:bg-gray-50"
                                                }`}
                                            >

                                                <td className={`p-5 font-medium ${
                                                    darkMode
                                                        ? "text-gray-100"
                                                        : "text-gray-800"
                                                }`}>

                                                    {product.name}

                                                </td>

                                                <td className={`p-5 ${
                                                    darkMode
                                                        ? "text-gray-300"
                                                        : "text-gray-700"
                                                }`}>

                                                    {product.category}

                                                </td>

                                                <td className={`p-5 font-semibold ${
                                                    darkMode
                                                        ? "text-gray-300"
                                                        : "text-gray-700"
                                                }`}>

                                                    ₹{product.price}

                                                </td>

                                                <td className="p-5">

    <div className="flex items-center gap-3">

        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
            product.stock < 5
                ? "bg-red-500/20 text-red-400"
                : "bg-emerald-500/20 text-emerald-400"
        }`}>

            {product.stock}

        </span>

        {product.stock < 5 && (

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400">

                LOW STOCK

            </span>

        )}

    </div>

</td>

                                                <td className="p-5">

                                                    <div className="flex justify-center gap-4">

                                                        <button
                                                            onClick={() =>
                                                                handleEdit(product)
                                                            }
                                                            className="bg-yellow-400 hover:bg-yellow-500 text-white p-3 rounded-xl transition-all"
                                                        >

                                                            <Pencil size={18} />

                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(product._id)
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
                                                colSpan="5"
                                                className="py-20"
                                            >

                                                <div className="flex flex-col items-center justify-center">

                                                    <PackageSearch
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

                                                        No Products Found

                                                    </h2>

                                                    <p className={`mt-2 ${
                                                        darkMode
                                                            ? "text-gray-400"
                                                            : "text-gray-500"
                                                    }`}>

                                                        Add your first product to begin inventory management.

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

export default Products;