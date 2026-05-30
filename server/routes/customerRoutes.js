import express from "express";

import {
    addCustomer,
    getCustomers,
    deleteCustomer
} from "../controllers/customerController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// ADD CUSTOMER
router.post(
    "/add",
    authMiddleware,
    roleMiddleware("admin"),
    addCustomer
);

// GET CUSTOMERS
router.get(
    "/",
    authMiddleware,
    getCustomers
);

// DELETE CUSTOMER
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteCustomer
);

export default router;