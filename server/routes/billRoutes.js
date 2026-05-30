import express from "express";

import {

    createBill,
    getBills

} from "../controllers/billController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// CREATE BILL
router.post(
    "/create",
    authMiddleware,
    roleMiddleware("admin", "staff"),
    createBill
);

// GET ALL BILLS
router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin", "staff"),
    getBills
);

export default router;