const mongoose = require('mongoose');

const trade = new mongoose.Schema({

    user_id: {
        type: String,
        require: true
    },
    Order_id: {
        type: Number,
        default: function () {
            return Math.floor(Math.random() * 1000000000) 
        }, unique: true
    },
    category: { 
        type: String,
        require: true
    },
    type: {
        type: String,
    },
    quantity: {
        type: Number,
        require: true
    },

    price: {
        type: Number,
        require: true
    },
    unit: {
        type: String,
        require: true
    },
    trade_amount: {
        type: Number,
        require: true
    },
}, { timestamps: true }
);




module.exports = mongoose.model('buymacanism', trade)

