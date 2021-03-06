const { Comment } = require('../models/comment');
const expressAsyncHandler = require("express-async-handler");
const validateMongodbId = require('../helpers/validateMongodbID');
const { Product } = require('../models/product');
const { OrderItem } = require('../models/orderItem');

const fetchCommentsCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const commentList = await Comment.find().populate('user', 'name').populate('product');

      if (!commentList)
        return res.status(500).json({ success: false });

      return res.status(200).send(commentList);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const fetchCommentCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params;
      validateMongodbId(id);
      const comment = await Comment.findById(id).populate('user', 'name').populate('product');

      if (!comment)
        return res.status(500).json({ message: 'The comment ID not found' });

      return res.status(200).send(comment);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const updateCommentCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params;
      validateMongodbId(id);

      if (req.body?.rating <= 0 || req.body?.rating > 5 || !req.body?.rating.toString().trim() || !req.body?.description.trim()) {
        return res.status(500).json({ message: 'Please re-enter' });
      }

      if (req?.user.userId !== id && !req?.user.isAdmin)
        return res.status(400).json({ message: 'The user cannot access' });

      const comment = await Comment.findByIdAndUpdate(
        id,
        {
          description: req.body?.description,
          rating: req.body?.rating
        },
        { new: true },
      );

      if (!comment)
        return res.status(400).json({ message: 'The comment cannot update' });

      return res.status(200).send(comment);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const createCommentCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      if (req?.user.userId !== req.body?.user && !req?.user.isAdmin)
        return res.status(400).json({ message: 'The user cannot access' });

      const product = await Product.findById(req?.body?.product);
      if (!product) return res.status(400).send('Invalid product');

      const orderItem = await OrderItem.findById(req?.body?.orderItem);
      if (!orderItem || orderItem.isReview === true) return res.status(400).send('Invalid order item');

      let comment = new Comment({
        product: req.body?.product,
        user: req.body?.user,
        orderItem: req.body?.orderItem,
        description: req.body?.description,
        rating: req.body?.rating
      });

      comment = await comment.save();

      if (!comment) return res.status(400).send('The comment cannot be created');

      await OrderItem.findByIdAndUpdate(req.body?.orderItem, { isReview: true });

      await Product.findByIdAndUpdate(
        req.body?.product,
        {
          rating: product.rating + req.body?.rating,
          numReviews: product.numReviews + 1
        }
      );

      return res.send(comment);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const deleteCommentCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params;
      validateMongodbId(id);

      if (req?.user.userId !== id && !req?.user.isAdmin)
        return res.status(400).json({ message: 'The user cannot access' });

      const comment = await Comment.findByIdAndRemove(id);
      if (comment) {
        return res.status(200).json({ success: true, message: 'The comment is deleted!' });
      } else {
        return res.status(404).json({ success: false, message: "Comment not found!" });
      }
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

module.exports = {
  fetchCommentsCtrl,
  fetchCommentCtrl,
  updateCommentCtrl,
  createCommentCtrl,
  deleteCommentCtrl
};