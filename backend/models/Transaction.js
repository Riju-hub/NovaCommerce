import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    commissionFee: {
      type: Number,
      required: true,
      default: 0,
    },
    netVendorPayout: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['sale', 'payout', 'refund'],
      default: 'sale',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    payoutDate: Date,
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;