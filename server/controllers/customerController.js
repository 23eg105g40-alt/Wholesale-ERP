import Customer from "../models/Customer.js";
import Bill from "../models/Bill.js";

// ADD CUSTOMER
export const addCustomer = async (req, res) => {

    try {

        const {
            name,
            phone,
            email,
            address
        } = req.body;

        const customer = await Customer.create({

            name,
            phone,
            email,
            address

        });

        res.status(201).json({

            message: "Customer Added Successfully",
            customer

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// GET CUSTOMERS
export const getCustomers = async (req, res) => {

    try {

        const customers =
            await Customer.find();

        res.status(200).json(customers);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// DELETE CUSTOMER
export const deleteCustomer = async (req, res) => {

    try {

        const billExists = await Bill.findOne({
            customer: req.params.id
        });

        if (billExists) {
            return res.status(400).json({
                message: "Cannot delete customer. Customer exists in bill history."
            });
        }

        const customer = await Customer.findByIdAndDelete(
            req.params.id
        );

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.status(200).json({
            message: "Customer Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};