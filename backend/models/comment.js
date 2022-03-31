const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  orderItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrderItem",
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

commentSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

commentSchema.set('toJSON', {
  virtuals: true,
});

exports.Comment = mongoose.model('Comment', commentSchema);
