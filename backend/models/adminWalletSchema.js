const mongoose = require('mongoose');

const adminWalletSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  
});

module.exports = mongoose.model('AdminWallet', adminWalletSchema);
