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

import {

    Package,
    IndianRupee,
    Receipt,
    AlertTriangle,
    TrendingUp

} from "lucide-react";

import {

    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell

} from "recharts";

function Dashboard() {

    const [dashboardData,
        setDashboardData] = useState({

        totalProducts: 0,
        totalBills: 0,
        totalRevenue: 0,
        lowStockProducts: 0,
        todaySales: 0,
        monthlySales: []

    });

    const {
        darkMode
    } = useContext(ThemeContext);

    const role =
        localStorage.getItem("role");

    useEffect(() => {

        fetchDashboard();

    }, []);

    // FETCH DASHBOARD

    const fetchDashboard = async () => {

        try {

            const res =
                await API.get("/dashboard");

            setDashboardData(
                res.data
            );

        } catch (error) {

            console.log(error);

        }

    };

    // MONTHLY SALES CHART

    const monthlyRevenueData =

        dashboardData.monthlySales.map(

            (item) => ({

                month:
                    `Month ${item._id.month}`,

                revenue:
                    item.revenue

            })

        );

    // PIE CHART

    const pieData = [

        {

            name: "Products",

            value:
                dashboardData.totalProducts

        },

        {

            name: "Bills",

            value:
                dashboardData.totalBills

        }

    ];

    const COLORS = [

        "#3B82F6",
        "#8B5CF6"

    ];

    // CARD DATA

    const cards = [

        {

            title: "Total Products",

            value:
                dashboardData.totalProducts,

            icon: Package,

            gradient: "from-[#2563EB] to-[#3B82F6]"

        },

        {

            title: "Total Bills",

            value:
                dashboardData.totalBills,

            icon: Receipt,

            gradient:
                "from-[#2563EB] to-[#7C3AED]"

        },

        {

            title: "Revenue",

            value:
                `₹${dashboardData.totalRevenue}`,

            icon: IndianRupee,

            gradient:
                "from-[#059669] to-[#10B981]"

        },

        {

            title: "Low Stock",

            value:
                dashboardData.lowStockProducts,

            icon: AlertTriangle,

            gradient: "from-[#DC2626] to-[#EF4444]"

        },

        {

            title: "Today's Sales",

            value:
                dashboardData.todaySales,

            icon: TrendingUp,

            gradient: "from-[#0891B2] to-[#3B82F6]"

        }

    ];

    return (

        <div className={`flex min-h-screen ${
            darkMode
                ? "bg-[#020817]"
                : "bg-[#F8FAFC]"
        }`}>

            {/* SIDEBAR */}

            <Sidebar />

            {/* MAIN */}

            <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">

                {/* TOPBAR */}

                <Topbar
                    title="Dashboard"
                    subtitle="Monitor your business performance"
                />

                {/* WELCOME BANNER */}

                <motion.div

                    initial={{
                        opacity: 0,
                        y: 20
                    }}

                    animate={{
                        opacity: 1,
                        y: 0
                    }}

                    className={`mb-8 p-6 sm:p-8 rounded-3xl shadow-2xl overflow-hidden relative ${
                        darkMode

                            ? "bg-linear-to-r from-[#1E293B] via-[#172554] to-[#0F172A]"

                            : "bg-linear-to-r from-blue-500 to-indigo-600"
                    }`}
                >

                    {/* GLOW EFFECTS */}

                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

                    <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

                    {/* CONTENT */}

                    <div className="relative z-10">

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3">

                            Welcome back, {role} 👋

                        </h2>

                        <p className="text-white/80 text-sm sm:text-lg">

                            Monitor your wholesale business performance in real time.

                        </p>

                    </div>

                </motion.div>

                {/* STATS CARDS */}

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">

                    {cards.map((card, index) => {

                        const Icon =
                            card.icon;

                        return (

                            <motion.div

                                key={index}

                                whileHover={{
                                    scale: 1.04,
                                    y: -5
                                }}

                                transition={{
                                    duration: 0.2
                                }}

                                className={`bg-linear-to-r ${card.gradient}
                                rounded-3xl p-6 shadow-2xl hover:shadow-[0_20px_60px_rgba(37,99,235,0.35)]
                                text-white relative overflow-hidden transition-all duration-500`}
                            >

                                {/* GLOW */}

                                <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-all duration-500" />

                                {/* ICON */}

                                <div className="absolute right-4 top-4 opacity-20">

                                    <Icon size={70} />

                                </div>

                                {/* CONTENT */}

                                <div className="relative z-10">

                                    <p className="text-lg font-medium">

                                        {card.title}

                                    </p>

                                    <h2 className="text-3xl sm:text-4xl font-bold mt-4">

                                        {card.value}

                                    </h2>

                                </div>

                            </motion.div>

                        );

                    })}

                </div>

                {/* CHARTS */}

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">

                    {/* MONTHLY REVENUE */}

                    <motion.div

                        whileHover={{
                            scale: 1.01
                        }}

                        className={`p-6 sm:p-8 rounded-3xl shadow-xl transition-all duration-300 ${
                            darkMode
                                ? "bg-[#0F172A]"
                                : "bg-white"
                        }`}
                    >

                        <h2 className={`text-xl sm:text-2xl font-bold mb-6 ${
                            darkMode
                                ? "text-white"
                                : "text-gray-800"
                        }`}>

                            Monthly Revenue

                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height={350}
                        >

                            <BarChart
                                data={monthlyRevenueData}
                            >

                                <XAxis
                                    dataKey="month"
                                />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="revenue"
                                    radius={[10, 10, 0, 0]}
                                    fill="#3B82F6"
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </motion.div>

                    {/* PIE CHART */}

                    <motion.div

                        whileHover={{
                            scale: 1.01
                        }}

                        className={`p-6 sm:p-8 rounded-3xl shadow-xl transition-all duration-300 ${
                            darkMode
                                ? "bg-[#0F172A]"
                                : "bg-white"
                        }`}
                    >

                        <h2 className={`text-xl sm:text-2xl font-bold mb-6 ${
                            darkMode
                                ? "text-white"
                                : "text-gray-800"
                        }`}>

                            Products vs Bills

                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height={350}
                        >

                            <PieChart>

                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    dataKey="value"
                                    label
                                >

                                    {pieData.map(

                                        (
                                            entry,
                                            index
                                        ) => (

                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    COLORS[index % COLORS.length]
                                                }
                                            />

                                        )

                                    )}

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </motion.div>

                </div>

                {/* LOW STOCK ALERT */}

                {dashboardData.lowStockProducts > 0 && (

                    <motion.div

                        initial={{
                            opacity: 0,
                            y: 20
                        }}

                        animate={{
                            opacity: 1,
                            y: 0
                        }}

                        className="bg-linear-to-r from-[#B91C1C] to-[#DC2626] text-white rounded-3xl p-6 shadow-2xl ..."
                    >

                        <AlertTriangle size={40} />

                        <div>

                            <h2 className="text-2xl font-bold">

                                Low Stock Alert

                            </h2>

                            <p className="text-lg mt-1">

                                {dashboardData.lowStockProducts}

                                {" "}products are running low on stock.

                            </p>

                        </div>

                    </motion.div>

                )}

            </div>

        </div>

    );

}

export default Dashboard;