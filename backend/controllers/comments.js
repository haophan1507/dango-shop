const { Comment } = require('../models/comment');
const expressAsyncHandler = require("express-async-handler");
const validateMongodbId = require('../helpers/validateMongodbID');
const { Product } = require('../models/product');

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
      const product = await Product.findById(req?.body?.product);
      if (!product) return res.status(400).send('Invalid category');

      let comment = new Comment({
        product: req.body?.product,
        user: req.body?.user,
        description: req.body?.description,
        rating: req.body?.rating
      });

      comment = await comment.save();

      if (!comment) return res.status(400).send('The comment cannot be created');

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