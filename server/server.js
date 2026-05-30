import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// ROUTES
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

// CONFIG
dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());

app.use(express.json());

// MONGODB CONNECTION
mongoose.connect(

    process.env.MONGO_URI,

    {
        serverSelectionTimeoutMS: 30000
    }

)

.then(() => {

    console.log(
        "MongoDB Connected Successfully"
    );

})

.catch((err) => {

    console.log(
        "MongoDB Connection Error:",
        err
    );

});

// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/test", testRoutes);

app.use("/api/products", productRoutes);

app.use("/api/bills", billRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/customers", customerRoutes);

app.use("/api/reports", reportRoutes);

// HOME ROUTE
app.get("/", (req, res) => {

    res.send(
        "Wholesale Billing API Running"
    );

});

// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});