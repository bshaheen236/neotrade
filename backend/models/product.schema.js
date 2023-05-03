const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
    price : {
        type : String, 
        required : true
    },
    quantity : {
        type : Number, 
        required : true
    }
})

module.exports = mongoose.model('product', productSchema);
