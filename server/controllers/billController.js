import Bill from "../models/Bill.js";

import Product from "../models/Product.js";

import Customer from "../models/Customer.js";


// CREATE BILL

export const createBill = async (req, res) => {

    try {

        const {

            customerId,
            productId,
            quantity

        } = req.body;

        // VALIDATE CUSTOMER

        const customer =
            await Customer.findById(customerId);

        if (!customer) {

            return res.status(404).json({

                message: "Customer not found"

            });

        }

        // VALIDATE PRODUCT

        const product =
            await Product.findById(productId);

        if (!product) {

            return res.status(404).json({

                message: "Product not found"

            });

        }

        // STOCK VALIDATION

        if (product.stock < quantity) {

            return res.status(400).json({

                message: "Insufficient stock"

            });

        }

        // TOTAL AMOUNT

        const totalAmount =

            product.price * quantity;


        const billCount =
    await Bill.countDocuments();

const today =
    new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");

const invoiceNumber =
    `INV-${today}-${String(
        billCount + 1
    ).padStart(3, "0")}`;

        // CREATE BILL

       const bill = await Bill.create({

    invoiceNumber,

    customer: customerId,

    product: productId,

    quantity,

    totalAmount

});

        // REDUCE STOCK

        product.stock -= quantity;

        await product.save();

        // POPULATE RESPONSE

        const populatedBill =
            await Bill.findById(bill._id)

                .populate("customer")

                .populate("product");

        res.status(201).json({

            message: "Bill Created Successfully",

            bill: populatedBill

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// GET BILLS

export const getBills = async (req, res) => {

    try {

        const bills = await Bill.find()

            .populate("customer")

            .populate("product")

            .sort({

                createdAt: -1

            });

        res.status(200).json(bills);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};