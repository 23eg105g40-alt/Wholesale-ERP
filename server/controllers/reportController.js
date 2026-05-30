import Bill from "../models/Bill.js";

// SALES REPORT
export const getSalesReport = async (req, res) => {

    try {

        const bills = await Bill.find()

            .populate("customer")
            .populate("product");

        // TOTAL REVENUE
        const totalRevenue = bills.reduce(

            (acc, bill) =>

                acc + (bill.totalAmount || 0),

            0

        );

        // TOTAL SALES
        const totalSales = bills.length;

        // TOTAL PRODUCTS SOLD
        const totalProductsSold = bills.reduce(

            (acc, bill) =>

                acc + (bill.quantity || 0),

            0

        );

        res.status(200).json({

            totalRevenue,
            totalSales,
            totalProductsSold,
            bills

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};