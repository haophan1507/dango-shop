const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

postSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

postSchema.set('toJSON', {
  virtuals: true,
});


exports.Post = mongoose.model('Post', postSchema);
