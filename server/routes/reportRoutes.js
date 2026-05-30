import express from "express";

import {
    getSalesReport
} from "../controllers/reportController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// SALES REPORT
router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    getSalesReport
);

export default router;