import Product from "../models/Product.js";
import Bill from "../models/Bill.js";

// ADD PRODUCT
export const addProduct = async (req, res) => {

    try {

        const {
            name,
            category,
            price,
            stock,
            supplier
        } = req.body;

        const product = await Product.create({
            name,
            category,
            price,
            stock,
            supplier
        });

        res.status(201).json({
            message: "Product Added Successfully",
            product
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// GET PRODUCTS
export const getProducts = async (req, res) => {

    try {

        const products = await Product.find();

        res.status(200).json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {

    try {

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        res.status(200).json({
            message: "Product Updated Successfully",
            updatedProduct
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {

    try {

        const billExists = await Bill.findOne({
            product: req.params.id
        });

        if (billExists) {
            return res.status(400).json({
                message: "Cannot delete product. Product exists in bill history."
            });
        }

        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};