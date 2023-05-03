const mongoose = require('mongoose');

// define the invoice schema
const invoiceSchema = mongoose.Schema({

    invoiceNumber: {
        type: String,
        unique: true,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    UserEmail: {
        type: String,
        required: true,
    },
    purchasedItems: [
        {
            category: {
                type: String,
                // required: true,
            },
            type: {
                type: String,
                // required: true,
            },
            unit: {
                type: String,
                // required: true,
            },
            quantity: {
                type: Number,
                // required: true,
            },
            price: {
                type: Number,
                // required: true,
            },
        },
    ],
    tax: {
        type: Number,
        // required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },

}, { timestamps: true }
);


module.exports = mongoose.model('Invoice', invoiceSchema);