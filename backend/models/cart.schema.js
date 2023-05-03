const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({

    user_id : {
        type : String,
        require:true
    },
    category : {
        type : String,
        require : true
    },
    type : {
        type : String,
    },
    quantity : {
        type : Number,
        require : true
    },

    price : {
        type : Number,
        require : true
    },
    unit : {
        type : String,
        require : true
    },
    trade_amount :{
        type : Number,
        require : true
    },
});




module.exports = mongoose.model('cart', cartSchema)

