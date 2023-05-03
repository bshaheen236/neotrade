const mongoose = require('mongoose');

const trade = new mongoose.Schema({

    user_id : {
        type : String,
        require:true
    },
    category : {
        type : String,
        require : true
    },
    quantity : {
        type : Number,
        require : true
    },

    price : {
        type : Number,
        require : true
    },

    trade_amount :{
        type : Number,
        require : true
    },
    type : {
        type : String,
        require : true
    },
    item : {
        type : String,
        require : true
    },
    isSell: {
        type: Boolean,
        default: false
    },
    isSBuy: {
        type: Boolean,
        default: false
    },
    isGold: {
        type: Boolean,
        default: false
    },
    isSilver: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('TradeMacanism', trade)

