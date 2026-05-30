import express from "express";

import {

    addProduct,
    getProducts,
    updateProduct,
    deleteProduct

} from "../controllers/productController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();


// ADD PRODUCT (ADMIN ONLY)

router.post(
    "/add",
    authMiddleware,
    roleMiddleware("admin"),
    addProduct
);


// GET PRODUCTS (ADMIN + STAFF)

router.get(
    "/",
    authMiddleware,
    getProducts
);


// UPDATE PRODUCT (ADMIN ONLY)

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    updateProduct
);


// DELETE PRODUCT (ADMIN ONLY)

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteProduct
);

export default router;