const express = require('express');
const router = express.Router();
const uploadOptions = require('../helpers/uploadImage');
const {
  fetchPostsCtrl,
  fetchPostCtrl,
  updatePostCtrl,
  createPostCtrl,
  deletePostCtrl
} = require('../controllers/posts');

router.get(`/`, fetchPostsCtrl);

router.get(`/:id`, fetchPostCtrl);

router.put(`/:id`, uploadOptions.single('image'), updatePostCtrl);

router.post('/', uploadOptions.single('image'), createPostCtrl);

router.delete('/:id', deletePostCtrl);

module.exports = router;