import express from "express";

import {

    getDashboardData

} from "../controllers/dashboardController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();


// DASHBOARD ANALYTICS

router.get(

    "/",

    authMiddleware,

    roleMiddleware("admin"),

    getDashboardData

);

export default router;