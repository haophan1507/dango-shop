const { Post } = require('../models/post');
const expressAsyncHandler = require("express-async-handler");
const validateMongodbId = require('../helpers/validateMongodbID');

const fetchPostsCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const postList = await Post.find().populate('user', 'name');

      if (!postList)
        return res.status(500).json({ success: false });

      return res.status(200).send(postList);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const fetchPostCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params;
      validateMongodbId(id);
      const post = await Post.findById(id).populate('user', 'name');

      if (!post)
        return res.status(500).json({ message: 'The post ID not found' });

      return res.status(200).send(post);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const updatePostCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params;
      validateMongodbId(id);
      const post = await Post.findById(id);
      if (!post) return res.status(400).send('Invalid Post!');

      const file = req?.file;
      let imagepath;

      if (file) {
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        imagepath = `${basePath}${fileName}`;
      } else {
        imagepath = post.image;
      }

      const updatePost = await Post.findByIdAndUpdate(
        id,
        {
          title: req.body?.title,
          description: req.body?.description,
          image: imagepath
        },
        { new: true },
      );

      if (!updatePost)
        return res.status(400).json({ message: 'The post cannot update' });

      return res.status(200).send(updatePost);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const createPostCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const file = req?.file;
      if (!file) return res.status(400).send('No image in the request');
      const fileName = req?.file?.filename;
      const basePath = `${req?.protocol}://${req?.get('host')}/public/uploads/`;

      let post = new Post({
        title: req.body?.title,
        description: req.body?.description,
        image: `${basePath}${fileName}`,
        user: req.body?.user
      });

      post = await post.save();

      if (!post) return res.status(400).send('The post cannot be created');

      return res.send(post);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const deletePostCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params;
      validateMongodbId(id);
      const post = await Post.findByIdAndRemove(id);
      if (post) {
        return res.status(200).json({ success: true, message: 'The post is deleted!' });
      } else {
        return res.status(404).json({ success: false, message: "Post not found!" });
      }
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

module.exports = {
  fetchPostsCtrl,
  fetchPostCtrl,
  updatePostCtrl,
  createPostCtrl,
  deletePostCtrl
};