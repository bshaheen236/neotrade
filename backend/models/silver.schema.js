const mongoose = require('mongoose');

const silverSchema = new mongoose.Schema({
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
  silver_kg : {
    type : String,
  },
  silver_gm : {
    type : String,
  }
});

module.exports = mongoose.model('NewSilver', silverSchema);
