const mongoose = require('mongoose');

const goldSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  high: {
    type: String,
    required: true,
  },
  low: {
    type: String,
    required: true,
  },
  gold_18_carat : {
    type : String,
  },
  gold_22_carat : {
    type : String,
  },
  gold_24_carat : {
    type : String,
  },
});

module.exports = mongoose.model('NewGold', goldSchema);
