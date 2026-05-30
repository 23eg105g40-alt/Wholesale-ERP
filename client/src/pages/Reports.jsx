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

import {

    IndianRupee,
    ShoppingBag,
    Package,
    Download

} from "lucide-react";

import {

    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell

} from "recharts";

import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

import jsPDF from "jspdf";

function Reports() {

    const {
        darkMode
    } = useContext(ThemeContext);

    const [reportData,
        setReportData] = useState({

        totalRevenue: 0,
        totalSales: 0,
        totalProductsSold: 0,
        bills: []

    });

    useEffect(() => {

        fetchReports();

    }, []);

    // FETCH REPORTS

    const fetchReports = async () => {

        try {

            const res =
                await API.get("/reports");

            setReportData(res.data);

        } catch (error) {

            toast.error(
                "Failed to fetch reports"
            );

        }

    };

    // EXPORT EXCEL

    const exportExcel = () => {

        const excelData =

            reportData.bills.map((bill) => ({

                Product:
                    bill.product?.name,

                Quantity:
                    bill.quantity,

                Amount:
                    bill.totalAmount,

                Date:
                    new Date(

                        bill.createdAt

                    ).toLocaleString()

            }));

        const worksheet =
            XLSX.utils.json_to_sheet(

                excelData

            );

        const workbook =
            XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(

            workbook,

            worksheet,

            "Sales Report"

        );

        const excelBuffer =
            XLSX.write(

                workbook,

                {

                    bookType: "xlsx",

                    type: "array"

                }

            );

        const data =
            new Blob(

                [excelBuffer],

                {

                    type:

                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"

                }

            );

        saveAs(

            data,

            "sales-report.xlsx"

        );

        toast.success(
            "Excel Report Downloaded"
        );

    };

    // EXPORT PDF

    const exportPDF = () => {

        const doc = new jsPDF();

        doc.setFontSize(22);

        doc.text(
            "Wholesale ERP Report",
            20,
            25
        );

        doc.setFontSize(12);

        doc.text(

            `Generated: ${new Date().toLocaleString()}`,

            20,

            40

        );

        doc.text(

            `Total Revenue: ₹${reportData.totalRevenue}`,

            20,

            60

        );

        doc.text(

            `Total Sales: ${reportData.totalSales}`,

            20,

            75

        );

        doc.text(

            `Products Sold: ${reportData.totalProductsSold}`,

            20,

            90

        );

        let y = 115;

        reportData.bills.forEach((bill, index) => {

            doc.text(

                `${index + 1}. ${bill.product?.name} | Qty: ${bill.quantity} | ₹${bill.totalAmount}`,

                20,

                y

            );

            y += 10;

        });

        doc.save("sales-report.pdf");

        toast.success(
            "PDF Report Downloaded"
        );

    };

    // BAR CHART DATA

    const barData = [

        {

            name: "Revenue",

            value:
                reportData.totalRevenue

        },

        {

            name: "Sales",

            value:
                reportData.totalSales

        },

        {

            name: "Products Sold",

            value:
                reportData.totalProductsSold

        }

    ];

    // PIE DATA

    const pieData = [

        {

            name: "Revenue",

            value:
                reportData.totalRevenue

        },

        {

            name: "Sales",

            value:
                reportData.totalSales

        }

    ];

    const COLORS = [

        "#3B82F6",
        "#8B5CF6"

    ];

    // STATS CARDS

    const cards = [

        {

            title: "Total Revenue",

            value:
                `₹${reportData.totalRevenue}`,

            icon: IndianRupee,

            gradient:
                "from-[#059669] to-[#10B981]"

        },

        {

            title: "Total Sales",

            value:
                reportData.totalSales,

            icon: ShoppingBag,

            gradient: "from-[#2563EB] to-[#7C3AED]"

        },

        {

            title: "Products Sold",

            value:
                reportData.totalProductsSold,

            icon: Package,

            gradient:
                "from-[#0891B2] to-[#3B82F6]"

        }

    ];

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
                    title="Reports & Analytics"
                    subtitle="Monitor business performance and revenue"
                />

                {/* EXPORT BUTTONS */}

                <div className="flex flex-wrap gap-4 mb-8">

                    <button
                        onClick={exportExcel}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-lg transition-all duration-300"
                    >

                        <Download size={20} />

                        Export Excel

                    </button>

                    <button
                        onClick={exportPDF}
                        className="bg-[#DC2626] hover:bg-[#B91C1C] text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-lg transition-all duration-300"
                    >

                        <Download size={20} />

                        Export PDF

                    </button>

                </div>

                {/* STATS CARDS */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">

                    {cards.map((card, index) => {

                        const Icon =
                            card.icon;

                        return (

                            <motion.div

                                key={index}

                                whileHover={{
                                    scale: 1.03
                                }}

                                className={`bg-linear-to-r ${card.gradient}
                                p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden`}
                            >

                                <div className="absolute right-4 top-4 opacity-20">

                                    <Icon size={70} />

                                </div>

                                <p className="text-lg font-medium">

                                    {card.title}

                                </p>

                                <h2 className="text-4xl font-bold mt-4">

                                    {card.value}

                                </h2>

                            </motion.div>

                        );

                    })}

                </div>

                {/* CHARTS */}

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">

                    {/* BAR CHART */}

                    <motion.div

                        whileHover={{
                            scale: 1.01
                        }}

                        className={`p-8 rounded-3xl shadow-xl ${
                            darkMode
                                ? "bg-[#0F172A]"
                                : "bg-white"
                        }`}
                    >

                        <h2 className={`text-2xl font-bold mb-6 ${
                            darkMode
                                ? "text-white"
                                : "text-gray-800"
                        }`}>

                            Sales Analytics

                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height={350}
                        >

                            <BarChart data={barData}>

                                <XAxis dataKey="name" />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="value"
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

                        className={`p-8 rounded-3xl shadow-xl ${
                            darkMode
                                ? "bg-[#0F172A]"
                                : "bg-white"
                        }`}
                    >

                        <h2 className={`text-2xl font-bold mb-6 ${
                            darkMode
                                ? "text-white"
                                : "text-gray-800"
                        }`}>

                            Revenue Distribution

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

            </div>

        </div>

    );

}

export default Reports;