const mongoose = require('mongoose');

const holdingSchema = new mongoose.Schema({
    user_id : {
        type : String,
        require:true
    },
    category : {
        type : String,
        required : true
    },
    type : {
        type : String,
    },
    unit : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    trade_amount : {
        type : Number,
        require : true
    },
})

module.exports = mongoose.model('holding', holdingSchema);
