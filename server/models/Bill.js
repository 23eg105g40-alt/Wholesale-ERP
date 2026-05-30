import mongoose from "mongoose";
const billSchema = new mongoose.Schema(

    {

        // CUSTOMER (OPTIONAL FOR NOW)

        customer: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Customer",

            required: false

        },

        // PRODUCT

        product: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Product",

            required: true

        },

        // QUANTITY

        quantity: {

            type: Number,

            required: true

        },
        invoiceNumber: {

    type: String,

    required: true,

    unique: true

},

        // TOTAL AMOUNT

        totalAmount: {

            type: Number,

            required: true

        }

    },

    {

        timestamps: true

    }

);

const Bill = mongoose.model(

    "Bill",

    billSchema

);

export default Bill;