import Product from "../models/Product.js";

import Bill from "../models/Bill.js";

export const getDashboardData = async (req, res) => {

    try {

        // TOTAL PRODUCTS

        const totalProducts =
            await Product.countDocuments();

        // TOTAL BILLS

        const totalBills =
            await Bill.countDocuments();

        // ALL BILLS

        const bills =
            await Bill.find();

        // TOTAL REVENUE

        const totalRevenue = bills.reduce(

            (acc, bill) =>

                acc + bill.totalAmount,

            0

        );

        // LOW STOCK PRODUCTS COUNT

        const lowStockProducts =
            await Product.countDocuments({

                stock: {

                    $lt: 5

                }

            });

        // TODAY SALES

        const today = new Date();

        today.setHours(

            0,
            0,
            0,
            0

        );

        const todayBills =
            await Bill.find({

                createdAt: {

                    $gte: today

                }

            });

        const todaySales =
            todayBills.length;

        // MONTHLY SALES DATA

        const monthlySales =
            await Bill.aggregate([

                {

                    $group: {

                        _id: {

                            month: {

                                $month: "$createdAt"

                            }

                        },

                        revenue: {

                            $sum: "$totalAmount"

                        }

                    }

                },

                {

                    $sort: {

                        "_id.month": 1

                    }

                }

            ]);

        // RESPONSE

        res.status(200).json({

            totalProducts,

            totalBills,

            totalRevenue,

            lowStockProducts,

            todaySales,

            monthlySales

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};