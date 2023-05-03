const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
   
    email : {
        type : String,
        required : true,
        // unique : true
    },

    phone : {
        type : String,
        required : true
    },

    message : {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('contact', contactSchema);