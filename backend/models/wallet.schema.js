const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: true,
    },
    transaction: [
      {
        transactionId: {
          type: String,
          required: true,
        },
        amount: {
          type: String,
          required: true,
        },
        paymentMethod: {
          type: String,
        },
        process: {
          // 1 :- Deposit, 0 :- Withdrawl
          type: Number,
          required: true,
        },
        time: {
          type: Date,
          default: Date(),
        },
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Wallet', walletSchema);
