const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    require: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
  },
  description: {
    type: String,
    require: true
  },
  rating: {
    type: Number,
    default: 0,
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
