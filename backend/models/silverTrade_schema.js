const mongoose = require('mongoose');

const silverTrade =new mongoose.Schema({

    quantity : {
        type : Number,
        require : true
    },

    price : {
        type : Number,
        require : true
    },

    duration : {
         type : String,
         require : true
    },

    trade_amount : {
        type : Number,
        require : true
    },

});

module.exports = mongoose.model("silverTradeMacanism",silverTrade);